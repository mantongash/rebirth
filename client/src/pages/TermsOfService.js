import React from 'react';
import styled from 'styled-components';
import { FaFileContract, FaGavel, FaShieldAlt, FaExclamationTriangle, FaHandshake } from 'react-icons/fa';

const TermsContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
  line-height: 1.8;
  min-height: 100vh;
  background: #f8fafc;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const LastUpdated = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  margin-top: 1rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #334155;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Paragraph = styled.p`
  color: #475569;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const List = styled.ul`
  color: #475569;
  margin-bottom: 1.5rem;
  padding-left: 2rem;
  
  li {
    margin-bottom: 0.75rem;
  }
`;

const ImportantNotice = styled.div`
  background: #fef3c7;
  border: 2px solid #fbbf24;
  padding: 1.5rem;
  border-radius: 12px;
  margin: 2rem 0;
`;

const NoticeTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #92400e;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TermsOfService = () => {
  return (
    <TermsContainer>
      <Header>
        <Title>
          <FaFileContract />
          Terms of Service
        </Title>
        <LastUpdated>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</LastUpdated>
      </Header>

      <ImportantNotice>
        <NoticeTitle>
          <FaExclamationTriangle />
          Important Notice
        </NoticeTitle>
        <Paragraph style={{ color: '#92400e' }}>
          Please read these Terms of Service carefully before using our website. By accessing or 
          using our website, you agree to be bound by these terms. If you do not agree to these 
          terms, please do not use our website.
        </Paragraph>
      </ImportantNotice>

      <Section>
        <Paragraph>
          Welcome to Rebirth of a Queen. These Terms of Service ("Terms") govern your access to 
          and use of our website, services, and applications (collectively, the "Service"). 
          By accessing or using our Service, you agree to be bound by these Terms.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>
          <FaHandshake />
          1. Acceptance of Terms
        </SectionTitle>
        
        <Paragraph>
          By accessing or using the Rebirth of a Queen website, you acknowledge that you have 
          read, understood, and agree to be bound by these Terms and our Privacy Policy. If you 
          do not agree to these Terms, you must not use our Service.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>
          <FaShieldAlt />
          2. Use of Service
        </SectionTitle>
        
        <Paragraph>You agree to use our Service only for lawful purposes and in accordance with these Terms. You agree not to:</Paragraph>
        
        <List>
          <li>Use the Service in any way that violates any applicable law or regulation</li>
          <li>Transmit any malicious code, viruses, or harmful software</li>
          <li>Attempt to gain unauthorized access to any part of the Service</li>
          <li>Interfere with or disrupt the Service or servers connected to the Service</li>
          <li>Use the Service to send spam, unsolicited messages, or harass others</li>
          <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
          <li>Collect or harvest any information from the Service without our permission</li>
          <li>Use automated systems to access the Service without our prior written consent</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>
          <FaFileContract />
          3. User Accounts
        </SectionTitle>
        
        <Paragraph>
          To access certain features of our Service, you may be required to create an account. 
          You agree to:
        </Paragraph>
        
        <List>
          <li>Provide accurate, current, and complete information when creating your account</li>
          <li>Maintain and update your account information to keep it accurate</li>
          <li>Maintain the security of your account credentials</li>
          <li>Accept responsibility for all activities that occur under your account</li>
          <li>Notify us immediately of any unauthorized use of your account</li>
        </List>
        
        <Paragraph>
          We reserve the right to suspend or terminate your account if you violate these Terms or 
          engage in any fraudulent, abusive, or illegal activity.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>
          <FaShieldAlt />
          4. Donations and Payments
        </SectionTitle>
        
        <Paragraph>
          When making a donation or purchase through our Service:
        </Paragraph>
        
        <List>
          <li>All donations are final and non-refundable unless required by law</li>
          <li>You represent that you have the legal right to use any payment method you provide</li>
          <li>You agree to pay all charges incurred by your account</li>
          <li>We reserve the right to refuse or cancel any transaction</li>
          <li>All prices are in the currency displayed and are subject to change without notice</li>
        </List>
        
        <Paragraph>
          Payment processing is handled by third-party payment processors. We are not responsible 
          for any errors or issues that may arise during the payment process.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>
          <FaGavel />
          5. Intellectual Property
        </SectionTitle>
        
        <Paragraph>
          The Service and its original content, features, and functionality are owned by Rebirth of 
          a Queen and are protected by international copyright, trademark, patent, trade secret, and 
          other intellectual property laws.
        </Paragraph>
        
        <Paragraph>
          You may not:
        </Paragraph>
        
        <List>
          <li>Reproduce, distribute, or create derivative works from our content without permission</li>
          <li>Use our trademarks, logos, or brand names without our written consent</li>
          <li>Remove any copyright or proprietary notices from our content</li>
          <li>Use our content for commercial purposes without authorization</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>
          <FaShieldAlt />
          6. User Content
        </SectionTitle>
        
        <Paragraph>
          You may submit content to our Service, including comments, reviews, and applications. 
          By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to 
          use, reproduce, modify, and distribute your content for the purpose of operating and 
          promoting our Service.
        </Paragraph>
        
        <Paragraph>
          You represent and warrant that:
        </Paragraph>
        
        <List>
          <li>You own or have the right to submit the content</li>
          <li>Your content does not violate any third-party rights</li>
          <li>Your content is not defamatory, obscene, or illegal</li>
          <li>Your content does not contain malicious code or viruses</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>
          <FaExclamationTriangle />
          7. Limitation of Liability
        </SectionTitle>
        
        <Paragraph>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, REBIRTH OF A QUEEN SHALL NOT BE LIABLE FOR ANY 
          INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS 
          OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, 
          OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
        </Paragraph>
        
        <Paragraph>
          Our total liability to you for all claims arising from or related to the Service shall 
          not exceed the amount you paid to us in the twelve (12) months preceding the claim.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>
          <FaShieldAlt />
          8. Indemnification
        </SectionTitle>
        
        <Paragraph>
          You agree to indemnify, defend, and hold harmless Rebirth of a Queen and its officers, 
          directors, employees, and agents from and against any claims, liabilities, damages, 
          losses, and expenses, including reasonable attorneys' fees, arising out of or in any way 
          connected with your use of the Service or violation of these Terms.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>
          <FaGavel />
          9. Dispute Resolution
        </SectionTitle>
        
        <Paragraph>
          Any disputes arising out of or relating to these Terms or the Service shall be resolved 
          through binding arbitration in accordance with the rules of [Arbitration Organization], 
          except where prohibited by law.
        </Paragraph>
        
        <Paragraph>
          You agree to waive any right to a jury trial and to participate in a class-action lawsuit.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>
          <FaShieldAlt />
          10. Termination
        </SectionTitle>
        
        <Paragraph>
          We may terminate or suspend your access to the Service immediately, without prior notice 
          or liability, for any reason, including if you breach these Terms.
        </Paragraph>
        
        <Paragraph>
          Upon termination, your right to use the Service will cease immediately. All provisions 
          of these Terms that by their nature should survive termination shall survive, including 
          ownership provisions, warranty disclaimers, and limitations of liability.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>
          <FaFileContract />
          11. Changes to Terms
        </SectionTitle>
        
        <Paragraph>
          We reserve the right to modify these Terms at any time. We will notify you of any 
          material changes by posting the new Terms on this page and updating the "Last Updated" 
          date. Your continued use of the Service after such modifications constitutes your 
          acceptance of the modified Terms.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>
          <FaGavel />
          12. Governing Law
        </SectionTitle>
        
        <Paragraph>
          These Terms shall be governed by and construed in accordance with the laws of [Your 
          Jurisdiction], without regard to its conflict of law provisions.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>
          <FaHandshake />
          13. Contact Information
        </SectionTitle>
        
        <Paragraph>
          If you have any questions about these Terms of Service, please contact us:
        </Paragraph>
        
        <List>
          <li><strong>Email:</strong> legal@rebirthofaqueen.org</li>
          <li><strong>Phone:</strong> [Your Phone Number]</li>
          <li><strong>Address:</strong> [Your Physical Address]</li>
        </List>
      </Section>
    </TermsContainer>
  );
};

export default TermsOfService;

