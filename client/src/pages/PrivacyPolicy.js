import React from 'react';
import styled from 'styled-components';
import { FaShieldAlt, FaLock, FaUserShield, FaEnvelope } from 'react-icons/fa';

const PrivacyContainer = styled.div`
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

const ContactInfo = styled.div`
  background: #f8fafc;
  padding: 2rem;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  margin-top: 2rem;
`;

const ContactTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PrivacyPolicy = () => {
  return (
    <PrivacyContainer>
      <Header>
        <Title>
          <FaShieldAlt />
          Privacy Policy
        </Title>
        <LastUpdated>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</LastUpdated>
      </Header>

      <Section>
        <Paragraph>
          At Rebirth of a Queen ("we," "our," or "us"), we are committed to protecting your privacy. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
          when you visit our website and use our services.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>
          <FaLock />
          1. Information We Collect
        </SectionTitle>
        
        <Paragraph>
          We collect information that you provide directly to us, including:
        </Paragraph>
        
        <List>
          <li><strong>Personal Information:</strong> Name, email address, phone number, postal address</li>
          <li><strong>Payment Information:</strong> Payment method details (processed securely through third-party payment processors)</li>
          <li><strong>Account Information:</strong> Username, password, profile information</li>
          <li><strong>Communication Data:</strong> Messages sent through contact forms, email correspondence</li>
          <li><strong>Application Data:</strong> Information submitted through program applications</li>
        </List>

        <Paragraph>
          We also automatically collect certain information when you visit our website:
        </Paragraph>
        
        <List>
          <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns</li>
          <li><strong>Device Information:</strong> IP address, browser type, device type, operating system</li>
          <li><strong>Cookies and Tracking:</strong> We use cookies and similar tracking technologies (see Cookie Policy below)</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>
          <FaUserShield />
          2. How We Use Your Information
        </SectionTitle>
        
        <Paragraph>We use the information we collect to:</Paragraph>
        
        <List>
          <li>Process donations and payments</li>
          <li>Manage your account and provide customer support</li>
          <li>Send you important updates about our programs and services</li>
          <li>Respond to your inquiries and requests</li>
          <li>Process program applications</li>
          <li>Improve our website and services</li>
          <li>Send newsletters and marketing communications (with your consent)</li>
          <li>Comply with legal obligations</li>
          <li>Prevent fraud and ensure security</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>
          <FaShieldAlt />
          3. Information Sharing and Disclosure
        </SectionTitle>
        
        <Paragraph>
          We do not sell, trade, or rent your personal information to third parties. We may share your 
          information only in the following circumstances:
        </Paragraph>
        
        <List>
          <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website and conducting our business (e.g., payment processors, email service providers)</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
          <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
          <li><strong>With Your Consent:</strong> When you have given us explicit permission to share your information</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>
          <FaLock />
          4. Data Security
        </SectionTitle>
        
        <Paragraph>
          We implement appropriate technical and organizational security measures to protect your personal 
          information against unauthorized access, alteration, disclosure, or destruction. These measures include:
        </Paragraph>
        
        <List>
          <li>Encryption of sensitive data in transit and at rest</li>
          <li>Secure payment processing through certified payment gateways</li>
          <li>Regular security assessments and updates</li>
          <li>Access controls and authentication requirements</li>
          <li>Regular backups and disaster recovery procedures</li>
        </List>
        
        <Paragraph>
          However, no method of transmission over the Internet or electronic storage is 100% secure. 
          While we strive to use commercially acceptable means to protect your information, we cannot 
          guarantee absolute security.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>
          <FaUserShield />
          5. Your Rights and Choices
        </SectionTitle>
        
        <Paragraph>You have the following rights regarding your personal information:</Paragraph>
        
        <List>
          <li><strong>Access:</strong> Request access to your personal information</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
          <li><strong>Deletion:</strong> Request deletion of your personal information</li>
          <li><strong>Objection:</strong> Object to processing of your personal information</li>
          <li><strong>Data Portability:</strong> Request transfer of your data to another service</li>
          <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
          <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
        </List>
        
        <Paragraph>
          To exercise these rights, please contact us using the information provided in the Contact 
          section below.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>
          <FaShieldAlt />
          6. Cookies and Tracking Technologies
        </SectionTitle>
        
        <Paragraph>
          We use cookies and similar tracking technologies to track activity on our website and store 
          certain information. You can control cookie preferences through your browser settings. 
          However, disabling cookies may limit your ability to use certain features of our website.
        </Paragraph>
        
        <Paragraph>
          We use cookies for:
        </Paragraph>
        
        <List>
          <li>Essential website functionality</li>
          <li>Authentication and security</li>
          <li>Analytics and performance monitoring</li>
          <li>Personalization and user preferences</li>
          <li>Marketing and advertising (with your consent)</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>
          <FaUserShield />
          7. Children's Privacy
        </SectionTitle>
        
        <Paragraph>
          Our website is not intended for children under the age of 13. We do not knowingly collect 
          personal information from children under 13. If you believe we have collected information 
          from a child under 13, please contact us immediately, and we will take steps to delete 
          such information.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>
          <FaLock />
          8. International Data Transfers
        </SectionTitle>
        
        <Paragraph>
          Your information may be transferred to and processed in countries other than your country 
          of residence. These countries may have data protection laws that differ from those in your 
          country. We take appropriate measures to ensure your information is protected in accordance 
          with this Privacy Policy.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>
          <FaShieldAlt />
          9. Changes to This Privacy Policy
        </SectionTitle>
        
        <Paragraph>
          We may update this Privacy Policy from time to time. We will notify you of any changes by 
          posting the new Privacy Policy on this page and updating the "Last Updated" date. You are 
          advised to review this Privacy Policy periodically for any changes.
        </Paragraph>
      </Section>

      <ContactInfo>
        <ContactTitle>
          <FaEnvelope />
          Contact Us
        </ContactTitle>
        <Paragraph>
          If you have any questions about this Privacy Policy or wish to exercise your rights, 
          please contact us:
        </Paragraph>
        <List>
          <li><strong>Email:</strong> privacy@rebirthofaqueen.org</li>
          <li><strong>Phone:</strong> [Your Phone Number]</li>
          <li><strong>Address:</strong> [Your Physical Address]</li>
        </List>
      </ContactInfo>
    </PrivacyContainer>
  );
};

export default PrivacyPolicy;

