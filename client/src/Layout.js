import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingDonateButton from './components/FloatingDonateButton';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { GlobalStyle } from './styles/GlobalStyle';

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingDonateButton />
      <FloatingWhatsApp />
    </>
  );
} 