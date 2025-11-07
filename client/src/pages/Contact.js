import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaPaperPlane, 
  FaCheckCircle, 
  FaWhatsapp, 
  FaYoutube, 
  FaCalendarAlt 
} from 'react-icons/fa';

// Styled Components
const Page = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const Hero = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 20px 60px;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Section = styled.section`
  padding: 60px 0;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #2c3e50;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1rem;
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactForm = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2c3e50;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #2c3e50;
`;

const InfoText = styled.p`
  color: #666;
  line-height: 1.4;
  margin: 0;
  font-size: 0.9rem;
`;

const InfoLink = styled.a`
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #5a6fd8;
  }
`;

const InfoSecondary = styled.p`
  color: #888;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const SocialSection = styled.div`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 40px 0;
  margin: 40px 0;
  border-radius: 12px;
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SocialCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SocialIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.2rem;
`;

const SocialTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
`;

const SocialDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const SocialButton = styled.a`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const QuickContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const QuickCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const QuickIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
`;

const QuickTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const QuickText = styled.p`
  color: #666;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
`;

const QuickButton = styled(motion.a)`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }
`;

const MapSection = styled.div`
  margin: 40px 0;
`;

const MapContainer = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const MapWrapper = styled.div`
  height: 300px;
  position: relative;
`;

const MapInfo = styled.div`
  padding: 1.5rem;
  background: #f8f9fa;
`;

const LocationTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const LocationAddress = styled.p`
  color: #666;
  line-height: 1.5;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const LocationDescription = styled.p`
  color: #4B5563;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
`;

const SuccessMessage = styled(motion.div)`
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #c3e6cb;
`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        alert(result.message || 'Failed to submit contact form. Please try again.');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      alert('Failed to submit contact form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: "Phone",
      text: "Main Office",
      link: "+254 720 339 204",
      href: "tel:+254720339204",
      secondary: "+254 720 339 204"
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      text: "Quick Support",
      link: "+254 720 339 204",
      href: "https://wa.me/254700000000"
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      text: "General Inquiries",
      link: "info@rebirthofaqueen.org",
      href: "mailto:info@rebirthofaqueen.org",
      secondary: "support@rebirthofaqueen.org"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      text: "Meridian Hospital, Kiserian",
      link: "Magadi Road, Kenya",
      href: "#"
    },
    {
      icon: <FaClock />,
      title: "Office Hours",
      text: "Monday - Friday",
      link: "8:00 AM - 6:00 PM",
      href: "#",
      secondary: "Saturday: 9:00 AM - 2:00 PM"
    }
  ];

  const socialPlatforms = [
    {
      icon: <FaFacebook />,
      title: "Facebook",
      description: "Follow us for updates and community engagement.",
      buttonText: "Follow",
      href: "https://facebook.com/rebirthofaqueen"
    },
    {
      icon: <FaTwitter />,
      title: "Twitter",
      description: "Stay connected with our latest news and events.",
      buttonText: "Follow",
      href: "https://twitter.com/rebirthofaqueen"
    },
    {
      icon: <FaInstagram />,
      title: "Instagram",
      description: "See our work through photos and videos.",
      buttonText: "Follow",
      href: "https://instagram.com/rebirthofaqueen"
    },
    {
      icon: <FaYoutube />,
      title: "YouTube",
      description: "Watch our impact videos and stories.",
      buttonText: "Subscribe",
      href: "https://youtube.com/rebirthofaqueen"
    },
    {
      icon: <FaLinkedin />,
      title: "LinkedIn",
      description: "Connect professionally and learn about opportunities.",
      buttonText: "Connect",
      href: "https://linkedin.com/company/rebirthofaqueen"
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      description: "Join our community for instant updates.",
      buttonText: "Join",
      href: "https://wa.me/254700000000"
    }
  ];

  return (
    <Page>
      <Hero>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get in Touch
          </HeroTitle>
          <HeroDescription
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We'd love to hear from you! Whether you have questions about our programs, want to volunteer, or are interested in partnering with us, we're here to help.
          </HeroDescription>
        </HeroContent>
      </Hero>

      <Container>
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Contact Us
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Reach out to us through any of these channels. We're here to help and answer your questions.
          </SectionSubtitle>
          
          <ContactGrid>
            <ContactForm
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <FormTitle>Send us a Message</FormTitle>
              
              {showSuccess && (
                <SuccessMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaCheckCircle />
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </SuccessMessage>
              )}

              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="message">Message *</Label>
                  <TextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us how we can help you..."
                  />
                </FormGroup>

                <SubmitButton
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <FaPaperPlane />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </SubmitButton>
              </form>
            </ContactForm>

            <ContactInfo
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {contactInfo.map((info, index) => (
                <InfoCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <InfoIcon>{info.icon}</InfoIcon>
                  <InfoContent>
                    <InfoTitle>{info.title}</InfoTitle>
                    <InfoText>{info.text}</InfoText>
                    <InfoLink href={info.href}>{info.link}</InfoLink>
                    {info.secondary && (
                      <InfoSecondary>{info.secondary}</InfoSecondary>
                    )}
                  </InfoContent>
                </InfoCard>
              ))}
            </ContactInfo>
          </ContactGrid>
        </Section>

        <SocialSection>
          <Container>
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ color: 'white' }}
            >
              Connect With Us
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              Follow us on social media to stay updated with our latest news, events, and impact stories
            </SectionSubtitle>
            <SocialGrid>
              {socialPlatforms.map((platform, index) => (
                <SocialCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <SocialIcon>{platform.icon}</SocialIcon>
                  <SocialTitle>{platform.title}</SocialTitle>
                  <SocialDescription>{platform.description}</SocialDescription>
                  <SocialButton href={platform.href} target="_blank" rel="noopener noreferrer">
                    {platform.buttonText}
                  </SocialButton>
                </SocialCard>
              ))}
            </SocialGrid>
          </Container>
        </SocialSection>

        <Section>
          <Container>
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Quick Contact Options
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Choose the most convenient way to reach us based on your needs
            </SectionSubtitle>
            
            <QuickContactGrid>
              <QuickCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <QuickIcon style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}>
                  <FaWhatsapp />
                </QuickIcon>
                <QuickTitle>WhatsApp Support</QuickTitle>
                <QuickText>Get instant help and quick responses to your questions through WhatsApp.</QuickText>
                <QuickButton
                  href="https://wa.me/254700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Chat Now <FaWhatsapp />
                </QuickButton>
              </QuickCard>

              <QuickCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <QuickIcon style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                  <FaPhone />
                </QuickIcon>
                <QuickTitle>Call Us</QuickTitle>
                <QuickText>Speak directly with our team for immediate assistance and detailed information.</QuickText>
                <QuickButton
                  href="tel:+254720339204"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Call Now <FaPhone />
                </QuickButton>
              </QuickCard>

              <QuickCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <QuickIcon style={{ background: 'linear-gradient(135deg, #f39c12, #e67e22)' }}>
                  <FaCalendarAlt />
                </QuickIcon>
                <QuickTitle>Schedule Visit</QuickTitle>
                <QuickText>Book an appointment to visit our facility and meet our team in person.</QuickText>
                <QuickButton
                  href="#"
                  style={{ background: 'linear-gradient(135deg, #f39c12, #e67e22)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Appointment <FaCalendarAlt />
                </QuickButton>
              </QuickCard>
            </QuickContactGrid>
          </Container>
        </Section>

        <MapSection>
          <Container>
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Visit Our Location
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Find us at Meridian Hospital in Kiserian along Magadi Road
            </SectionSubtitle>
            <MapContainer
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <MapWrapper>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819123456789!2d36.8167!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMzEuNiJTIDM2wrA0OScwMC4xIkU!5e0!3m2!1sen!2ske!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Location"
                ></iframe>
              </MapWrapper>
              <MapInfo>
                <LocationTitle>Meridian Hospital</LocationTitle>
                <LocationAddress>📍 Kiserian, Magadi Road, Kenya</LocationAddress>
                <LocationDescription>
                  Our main office is located at Meridian Hospital in Kiserian, providing easy access for visitors and community members. We're open Monday through Friday from 8:00 AM to 6:00 PM.
                </LocationDescription>
              </MapInfo>
            </MapContainer>
          </Container>
        </MapSection>
      </Container>
    </Page>
  );
}