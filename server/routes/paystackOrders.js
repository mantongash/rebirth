const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { authenticateToken } = require('../middleware/auth');
const EmailService = require('../services/emailService');
const SMSService = require('../services/smsService');
const User = require('../models/User');

// Initialize Paystack for an order
router.post('/orders/initialize', authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return res.status(503).json({ success: false, message: 'Paystack not configured' });
    }

    if (!orderId) {
      return res.status(400).json({ success: false, message: 'orderId is required' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Ensure the requester owns the order
    if (order.customer?.email !== req.user.email) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (order.paymentStatus === 'paid') {
      return res.status(400).json({ success: false, message: 'Order already paid' });
    }

    const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);

    const reference = `order_${order._id}_${Date.now()}`;
    const paymentData = {
      amount: Math.round(order.total * 100),
      email: order.customer.email,
      currency: order.currency === 'KES' ? 'NGN' : order.currency || 'NGN',
      reference,
      metadata: {
        orderId: order._id.toString(),
        orderNumber: order.orderNumber,
        customerEmail: order.customer.email,
        type: 'order'
      },
      callback_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/order/payment?status=success`
    };

    const response = await paystack.transaction.initialize(paymentData);
    if (!response.status) {
      return res.status(400).json({ success: false, message: response.message || 'Failed to initialize Paystack' });
    }

    // Store reference on order for later verification
    order.paymentMethod = 'paystack';
    order.transactionId = reference;
    await order.save();

    res.json({
      success: true,
      data: {
        authorizationUrl: response.data.authorization_url,
        accessCode: response.data.access_code,
        reference: response.data.reference,
        orderId: order._id
      }
    });
  } catch (error) {
    console.error('Paystack order initialize error:', error);
    res.status(500).json({ success: false, message: 'Failed to initialize Paystack payment' });
  }
});

// Verify Paystack payment for an order
router.post('/orders/verify', authenticateToken, async (req, res) => {
  try {
    const { reference } = req.body;

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return res.status(503).json({ success: false, message: 'Paystack not configured' });
    }

    if (!reference) {
      return res.status(400).json({ success: false, message: 'reference is required' });
    }

    const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);
    const response = await paystack.transaction.verify(reference);

    if (!response.status || response.data.status !== 'success') {
      return res.status(400).json({ success: false, message: 'Payment verification failed', data: response.data });
    }

    // Find order by reference
    const order = await Order.findOne({ transactionId: reference });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Ensure the requester owns the order
    if (order.customer?.email !== req.user.email) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    // Mark as paid
    order.paymentStatus = 'paid';
    order.paymentDate = new Date(response.data.paid_at);
    order.status = 'confirmed';
    await order.save();

    // Send receipt to buyer
    try {
      if (EmailService.sendOrderReceipt) {
        await EmailService.sendOrderReceipt(order.toObject());
      }
    } catch (_) {}

  // Send SMS to buyer and admin (best-effort)
  try { if (SMSService.sendOrderReceiptSMS) await SMSService.sendOrderReceiptSMS(order.toObject()); } catch (_) {}
  try { if (SMSService.sendOrderPaidAdminSMS) await SMSService.sendOrderPaidAdminSMS(order.toObject()); } catch (_) {}

  // Clear user's server cart after successful payment
  try {
    const user = await User.findOne({ email: order.customer?.email });
    if (user) {
      await user.clearCart();
    }
  } catch (_) {}

    res.json({ success: true, message: 'Payment verified', data: { orderId: order._id, status: order.paymentStatus } });
  } catch (error) {
    console.error('Paystack order verify error:', error);
    res.status(500).json({ success: false, message: 'Failed to verify Paystack payment' });
  }
});

module.exports = router;


