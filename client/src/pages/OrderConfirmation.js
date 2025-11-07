import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { API_MAIN } from '../api';
import { useCart } from '../context/CartContext';
import { 
  FaCheckCircle, 
  FaTruck, 
  FaClock, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaCreditCard,
  FaHome,
  FaShoppingBag,
  FaWhatsapp,
  FaPrint
} from 'react-icons/fa';

// Order Confirmation Page
const ConfirmationPage = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ConfirmationCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 2rem;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto 2rem;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e1e2f;
  margin: 0 0 1rem 0;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0 0 2rem 0;
`;

const OrderNumber = styled.div`
  background: #f8faff;
  border: 2px solid #e0e7ff;
  border-radius: 12px;
  padding: 1rem 2rem;
  margin: 2rem 0;
  display: inline-block;
`;

const OrderNumberLabel = styled.span`
  color: #6b7280;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 0.5rem;
`;

const OrderNumberValue = styled.span`
  color: #667eea;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
`;

// Order Details
const OrderDetails = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e1e2f;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const DetailIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #667eea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
`;

const DetailContent = styled.div`
  flex: 1;
`;

const DetailLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
`;

const DetailValue = styled.div`
  font-size: 1rem;
  color: #1e1e2f;
  font-weight: 600;
`;

// Order Items
const OrderItems = styled.div`
  margin-top: 2rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 1rem;
  background: #fafafa;
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  background: #f3f4f6;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1e1e2f;
  margin: 0 0 0.25rem 0;
`;

const ItemPrice = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
`;

const ItemQuantity = styled.span`
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
`;

// Action Buttons
const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const ActionButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
  }
  
  &.secondary {
    background: white;
    color: #667eea;
    border: 2px solid #667eea;
    
    &:hover {
      background: #667eea;
      color: white;
    }
  }
  
  &.success {
    background: #10b981;
    color: white;
    
    &:hover {
      background: #059669;
      transform: translateY(-2px);
    }
  }
`;

const WhatsAppButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: #25d366;
  color: white;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #128c7e;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3);
  }
`;

// Status Timeline
const StatusTimeline = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;
  
  &:last-child {
    border-bottom: none;
  }
  
  &.completed {
    .timeline-icon {
      background: #10b981;
      color: white;
    }
    .timeline-content {
      color: #1e1e2f;
    }
  }
  
  &.pending {
    .timeline-icon {
      background: #f3f4f6;
      color: #9ca3af;
    }
    .timeline-content {
      color: #6b7280;
    }
  }
`;

const TimelineIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.3s ease;
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
`;

const TimelineDescription = styled.p`
  font-size: 0.875rem;
  margin: 0;
`;

// Order Confirmation Component
const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { clearCart } = useCart();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await API_MAIN.get(`/shop/orders/${orderId}`);
        if (data.success) {
          setOrder(data.data);
          // Clear cart after successful order
          clearCart();
        } else {
          setError('Order not found');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    } else {
      setError('No order ID provided');
      setLoading(false);
    }
  }, [orderId, clearCart]);

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const message = `Hello! I just placed order #${order?.orderNumber}. Please confirm receipt and provide delivery updates.`;
    const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <ConfirmationPage>
        <Container>
          <ConfirmationCard>
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                border: '4px solid #e5e7eb', 
                borderTop: '4px solid #667eea', 
                borderRadius: '50%', 
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1rem'
              }} />
              <h3>Loading order details...</h3>
            </div>
          </ConfirmationCard>
        </Container>
      </ConfirmationPage>
    );
  }

  if (error || !order) {
    return (
      <ConfirmationPage>
        <Container>
          <ConfirmationCard>
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>Error</h2>
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>{error || 'Order not found'}</p>
              <ActionButton to="/" className="primary">
                <FaHome />
                Go Home
              </ActionButton>
            </div>
          </ConfirmationCard>
        </Container>
      </ConfirmationPage>
    );
  }

  return (
    <ConfirmationPage>
      <Container>
        {/* Success Confirmation */}
        <ConfirmationCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SuccessIcon>
            <FaCheckCircle />
          </SuccessIcon>
          <Title>Order Confirmed!</Title>
          <Subtitle>
            Thank you for your order. We've received your payment and will process your order shortly.
          </Subtitle>
          
          <OrderNumber>
            <OrderNumberLabel>Order Number</OrderNumberLabel>
            <OrderNumberValue>#{order.orderNumber}</OrderNumberValue>
          </OrderNumber>
        </ConfirmationCard>

        {/* Order Details */}
        <OrderDetails>
          <SectionTitle>
            <FaTruck />
            Order Details
          </SectionTitle>
          
          <DetailsGrid>
            <DetailGroup>
              <DetailItem>
                <DetailIcon>
                  <FaEnvelope />
                </DetailIcon>
                <DetailContent>
                  <DetailLabel>Email</DetailLabel>
                  <DetailValue>{order.customer?.email}</DetailValue>
                </DetailContent>
              </DetailItem>
              
              <DetailItem>
                <DetailIcon>
                  <FaPhone />
                </DetailIcon>
                <DetailContent>
                  <DetailLabel>Phone</DetailLabel>
                  <DetailValue>{order.customer?.phone}</DetailValue>
                </DetailContent>
              </DetailItem>
            </DetailGroup>
            
            <DetailGroup>
              <DetailItem>
                <DetailIcon>
                  <FaMapMarkerAlt />
                </DetailIcon>
                <DetailContent>
                  <DetailLabel>Delivery Address</DetailLabel>
                  <DetailValue>
                    {order.shippingAddress?.street}, {order.shippingAddress?.city}
                  </DetailValue>
                </DetailContent>
              </DetailItem>
              
              <DetailItem>
                <DetailIcon>
                  <FaCreditCard />
                </DetailIcon>
                <DetailContent>
                  <DetailLabel>Payment Method</DetailLabel>
                  <DetailValue>{order.paymentMethod?.toUpperCase()}</DetailValue>
                </DetailContent>
              </DetailItem>
            </DetailGroup>
          </DetailsGrid>

          <OrderItems>
            <h4 style={{ marginBottom: '1rem', color: '#1e1e2f' }}>Order Items</h4>
            {order.items?.map((item, index) => (
              <OrderItem key={index}>
                <ItemImage 
                  src={item.product?.image || '/images/placeholder.jpg'} 
                  alt={item.name}
                />
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>KSh {item.price?.toLocaleString()} each</ItemPrice>
                </ItemDetails>
                <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
              </OrderItem>
            ))}
          </OrderItems>
        </OrderDetails>

        {/* Order Status Timeline */}
        <StatusTimeline>
          <SectionTitle>
            <FaClock />
            Order Status
          </SectionTitle>
          
          <TimelineItem className="completed">
            <TimelineIcon className="timeline-icon">
              <FaCheckCircle />
            </TimelineIcon>
            <TimelineContent className="timeline-content">
              <TimelineTitle>Order Placed</TimelineTitle>
              <TimelineDescription>Your order has been successfully placed and payment confirmed.</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem className={order.status === 'processing' ? 'completed' : 'pending'}>
            <TimelineIcon className="timeline-icon">
              <FaTruck />
            </TimelineIcon>
            <TimelineContent className="timeline-content">
              <TimelineTitle>Processing</TimelineTitle>
              <TimelineDescription>We're preparing your order for shipment.</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem className="pending">
            <TimelineIcon className="timeline-icon">
              <FaTruck />
            </TimelineIcon>
            <TimelineContent className="timeline-content">
              <TimelineTitle>Shipped</TimelineTitle>
              <TimelineDescription>Your order is on its way to you.</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem className="pending">
            <TimelineIcon className="timeline-icon">
              <FaCheckCircle />
            </TimelineIcon>
            <TimelineContent className="timeline-content">
              <TimelineTitle>Delivered</TimelineTitle>
              <TimelineDescription>Your order has been delivered successfully.</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        </StatusTimeline>

        {/* Action Buttons */}
        <ActionButtons>
          <ActionButton to="/" className="primary">
            <FaHome />
            Continue Shopping
          </ActionButton>
          
          <ActionButton to="/orders" className="secondary">
            <FaShoppingBag />
            View Orders
          </ActionButton>
          
          <ActionButton onClick={handlePrint} className="secondary">
            <FaPrint />
            Print Receipt
          </ActionButton>
          
          <WhatsAppButton onClick={handleWhatsApp}>
            <FaWhatsapp />
            Contact Support
          </WhatsAppButton>
        </ActionButtons>
      </Container>
    </ConfirmationPage>
  );
};

export default OrderConfirmation;
