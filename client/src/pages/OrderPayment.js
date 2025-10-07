import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_MAIN } from '../api';
import { useCart } from '../context/CartContext';

export default function OrderPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying your payment...');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const reference = params.get('reference') || params.get('trxref');
    const success = params.get('status') === 'success';

    const verify = async () => {
      try {
        if (!reference || !success) {
          setStatus('failed');
          setMessage('Payment not completed.');
          return;
        }
        const res = await API_MAIN.post('/paystack/orders/verify', { reference });
        if (res.data?.success) {
          setStatus('success');
          setMessage('Payment verified!');
          try { await clearCart(); } catch (_) {}
          setTimeout(() => navigate('/order-success'), 1200);
        } else {
          setStatus('failed');
          setMessage(res.data?.message || 'Payment verification failed');
        }
      } catch (err) {
        setStatus('failed');
        setMessage('Payment verification failed');
      }
    };
    verify();
  }, [location.search, clearCart, navigate]);

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 48 }}>{status === 'success' ? '✅' : status === 'failed' ? '❌' : '⏳'}</div>
      <h2 style={{ margin: 0 }}>{message}</h2>
      {status !== 'verifying' && (
        <button onClick={() => navigate('/orders')} style={{ marginTop: 12, padding: '10px 16px', borderRadius: 8, border: 'none', background: '#3498db', color: 'white', fontWeight: 600, cursor: 'pointer' }}>View Orders</button>
      )}
    </div>
  );
}


