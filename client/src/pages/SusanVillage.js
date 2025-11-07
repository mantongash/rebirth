import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MediaCarousel from '../components/MediaCarousel';
import ProgramBreadcrumb from '../components/ProgramBreadcrumb';
import ProgramSidebar from '../components/ProgramSidebar';
import { 
  FaHome, 
  FaUsers, 
  FaHeart, 
  FaHandsHelping, 
  FaGraduationCap,
  FaChild,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaPlay,
  FaShieldAlt,
  FaClock,
  FaDownload,
  FaQuoteLeft
} from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  margin: 0;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.85), rgba(118, 75, 162, 0.85)), 
              url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.3));
    z-index: 1;
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 1200px;
  padding: 2rem;
  z-index: 2;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto 3rem;
  opacity: 0.8;
  line-height: 1.6;
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  margin: 0.5rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
    background: linear-gradient(135deg, #ff5252, #d32f2f);
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  margin: 0.5rem;

  &:hover {
    background: white;
    color: #667eea;
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const ContentSection = styled.section`
  padding: 5rem 2rem;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #2c3e50;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 2px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid #f0f0f0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 25px 50px rgba(102, 126, 234, 0.2);
    border-color: #667eea;

    &::before {
      left: 100%;
    }
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
  }

  &:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);

    &::before {
      width: 100%;
      height: 100%;
    }
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const FeatureDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
  font-size: 1rem;
`;

const StatsSection = styled.section`
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 5rem 2rem;
  color: white;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const StatCard = styled(motion.div)`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #ffd700;
`;

const StatLabel = styled.div`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const ContactSection = styled.section`
  padding: 5rem 2rem;
  background: #f8f9fa;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const ContactCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ContactIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 1.5rem;
`;

const ContactTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const ContactInfo = styled.p`
  color: #7f8c8d;
  font-size: 1rem;
  line-height: 1.6;
`;

const ImageGallery = styled.section`
  padding: 5rem 2rem;
  background: #f8f9fa;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: all 0.3s ease;
`;

const GalleryOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 2rem;
  transform: translateY(100%);
  transition: all 0.3s ease;
`;

const GalleryTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const GalleryDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const VideoSection = styled.section`
  padding: 5rem 2rem;
  background: white;
`;

const VideoContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const VideoThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const PlayButton = styled(motion.div)`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  font-size: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const SusanVillage = () => {
  const highlightSlides = [
    {
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Shelter and care',
      caption: 'Safe shelter, healing care, and a path to dignity'
    },
    {
      src: 'https://images.unsplash.com/photo-1533227268428-967d2f65f6df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Community support',
      caption: 'Community support and empowerment for every survivor'
    },
    {
      src: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Wellness and hope',
      caption: 'Wellness, counseling, and hope for a brighter future'
    }
  ];

  // Styled blocks for metrics and quick donate (co-located for clarity)
  const MetricsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  `;

  const MetricCard = styled.div`
    background: #fff;
    border: 1px solid #eef2f7;
    border-radius: 16px;
    padding: 1.25rem 1rem;
    text-align: center;
    box-shadow: 0 6px 18px rgba(0,0,0,0.05);
  `;

  const MetricValue = styled.div`
    font-size: 1.8rem;
    font-weight: 800;
    color: #1f2937;
  `;

  const MetricLabel = styled.div`
    font-size: 0.95rem;
    color: #6b7280;
    margin-top: 0.25rem;
  `;

  const ActionsRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    justify-content: center;
  `;

  const QuickDonateWidget = styled.div`
    background: linear-gradient(135deg, #f8fbff, #f3f6fb);
    border: 1px solid #e5ecf6;
    border-radius: 16px;
    padding: 1.25rem;
    text-align: center;
  `;

  const QuickDonateTitle = styled.h4`
    margin: 0 0 0.75rem 0;
    color: #1f2937;
    font-weight: 700;
  `;

  const AmountRow = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
  `;

  const AmountChip = styled(Link)`
    display: inline-block;
    padding: 0.5rem 0.9rem;
    border-radius: 999px;
    border: 1px solid #dbe5f3;
    background: #fff;
    color: #374151;
    text-decoration: none;
    font-weight: 600;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    &:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
  `;

  const SmallNote = styled.div`
    font-size: 0.85rem;
    color: #6b7280;
  `;

// Partners strip
const PartnersSection = styled.section`
  padding: 3rem 2rem;
  background: #ffffff;
  border-top: 1px solid #eef2f7;
  border-bottom: 1px solid #eef2f7;
`;

const PartnersStrip = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.25rem;
  align-items: center;
`;

const PartnerBadge = styled.div`
  height: 52px;
  border: 1px solid #e5ecf6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  background: linear-gradient(180deg, #fff, #fafbfc);
  font-weight: 700;
  letter-spacing: 0.3px;
`;
  const features = [
    {
      icon: <FaClock />,
      title: "24/7 Rescue & Crisis Response",
      description: "Round-the-clock emergency response services for survivors of sexual abuse and human trafficking. Immediate intervention and safe transportation to our facilities."
    },
    {
      icon: <FaHome />,
      title: "Temporary & Long-term Shelter",
      description: "Secure, comfortable housing facilities providing both emergency shelter and long-term residential care for survivors in need of safe accommodation."
    },
    {
      icon: <FaHandsHelping />,
      title: "Reintegration Support",
      description: "Comprehensive reintegration services including life skills training, job placement assistance, and community connection programs to help survivors rebuild their lives."
    },
    {
      icon: <FaHeart />,
      title: "Trauma Healing & Counseling",
      description: "Professional trauma-informed counseling, therapy sessions, and healing programs designed to support survivors on their journey to recovery and empowerment."
    },
    {
      icon: <FaGraduationCap />,
      title: "Educational Support",
      description: "Access to education, vocational training, and skill development programs to empower survivors with knowledge and opportunities for a better future."
    },
    {
      icon: <FaShieldAlt />,
      title: "Legal & Medical Support",
      description: "Partnerships with legal aid organizations and healthcare providers to ensure survivors receive comprehensive medical care and legal assistance throughout their recovery."
    }
  ];

  const stats = [
    { number: "150+", label: "Children Helped" },
    { number: "50+", label: "Families Reunited" },
    { number: "25+", label: "Years of Service" },
    { number: "95%", label: "Success Rate" }
  ];

  return (
    <PageContainer>
      <ProgramBreadcrumb items={[
        { label: 'Programs', to: '/programs' },
        { label: 'The Rebirth Susan Village' }
      ]} />
      <ProgramSidebar />
      <HeroSection>
        <HeroContent
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            The Rebirth Susan Village
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Restoring Dignity. Rebuilding Lives.
          </HeroSubtitle>
          <HeroDescription
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            The Rebirth Susan Village is a comprehensive residential care facility dedicated to providing 
            safe housing, education, and support services for vulnerable children and families. We create 
            a nurturing environment where every child can heal, grow, and thrive.
          </HeroDescription>
          <ButtonGroup>
            <CTAButton
              as={Link}
              to="/donate"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Donate Now <FaArrowRight />
            </CTAButton>
            <SecondaryButton
              as={Link}
              to="/volunteer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Volunteer <FaHandsHelping />
            </SecondaryButton>
          </ButtonGroup>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Highlights
          </SectionTitle>
          <MediaCarousel items={highlightSlides} />
        </Container>
      </ContentSection>

      {/* Program Metrics + Report + Donation */}
      <ContentSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Impact & Support
          </SectionTitle>

          <MetricsGrid
            as={motion.div}
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MetricCard>
              <MetricValue>150+</MetricValue>
              <MetricLabel>Survivors Supported</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>24/7</MetricValue>
              <MetricLabel>Safe Shelter</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>80%</MetricValue>
              <MetricLabel>Successful Reintegration</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>20+</MetricValue>
              <MetricLabel>Partner Clinics & Legal Aid</MetricLabel>
            </MetricCard>
          </MetricsGrid>

          <ActionsRow>
            <CTAButton
              as={Link}
              to="/donate?program=susan-village"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Support Susan Village
            </CTAButton>
            <SecondaryButton
              as={Link}
              to="/volunteer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Volunteer with Us
            </SecondaryButton>
            <SecondaryButton
              as={Link}
              to="/reports/susan-village.pdf"
              target="_blank"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaDownload /> Download Program Brochure
            </SecondaryButton>
          </ActionsRow>

          <QuickDonateWidget
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <QuickDonateTitle>Quick Donate</QuickDonateTitle>
            <AmountRow>
              {['500', '1000', '2500', '5000'].map(a => (
                <AmountChip key={a} to={`/donate?program=susan-village&amount=${a}`}>KES {a}</AmountChip>
              ))}
            </AmountRow>
            <SmallNote>Your gift funds safe shelter, counseling, and reintegration.</SmallNote>
          </QuickDonateWidget>
        </Container>
      </ContentSection>

      {/* Program Overview Section */}
      <ContentSection style={{ background: '#f8f9fa' }}>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Program Overview
          </SectionTitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              textAlign: 'center',
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#5a6c7d',
              marginBottom: '3rem'
            }}
          >
            <p style={{ marginBottom: '1.5rem' }}>
              The Rebirth Susan Village is dedicated to providing comprehensive rescue, shelter, and reintegration services 
              for survivors of sexual abuse and human trafficking. Our mission is to restore dignity and rebuild lives 
              through compassionate care, professional support, and empowerment programs.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>Our Goals:</strong> To provide immediate safety, long-term healing, and sustainable reintegration 
              for every survivor who comes through our doors. We work tirelessly to ensure survivors have access to 
              shelter, counseling, education, and legal support.
            </p>
            <p>
              <strong>Target Beneficiaries:</strong> Women and girls who have survived sexual abuse, human trafficking, 
              or gender-based violence. We serve survivors of all ages, backgrounds, and circumstances, providing 
              individualized care tailored to each person's unique needs and journey.
            </p>
          </motion.div>
        </Container>
      </ContentSection>

      <ContentSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Services Offered
          </SectionTitle>
          
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Container>
      </ContentSection>

      <StatsSection>
        <Container>
          <SectionTitle
            style={{ color: 'white', marginBottom: '4rem' }}
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Impact
          </SectionTitle>
          
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        </Container>
      </StatsSection>

      <ContactSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Contact Us
          </SectionTitle>
          
          <ContactGrid>
            <ContactCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ContactIcon><FaMapMarkerAlt /></ContactIcon>
              <ContactTitle>Visit Us</ContactTitle>
              <ContactInfo>
                123 Village Road<br />
                Nairobi, Kenya<br />
                East Africa
              </ContactInfo>
            </ContactCard>
            
            <ContactCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ContactIcon><FaPhone /></ContactIcon>
              <ContactTitle>Call Us</ContactTitle>
              <ContactInfo>
                +254 720 339 204<br />
                +254 720 339 204<br />
                Available 24/7
              </ContactInfo>
            </ContactCard>
            
            <ContactCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <ContactIcon><FaEnvelope /></ContactIcon>
              <ContactTitle>Email Us</ContactTitle>
              <ContactInfo>
                info@susanvillage.org<br />
                support@susanvillage.org<br />
                We respond within 24 hours
              </ContactInfo>
            </ContactCard>
          </ContactGrid>
        </Container>
      </ContactSection>

      <ImageGallery>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Village in Action
          </SectionTitle>
          
          <GalleryGrid>
            <GalleryItem
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <GalleryImage 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Children playing in the village"
              />
              <GalleryOverlay>
                <GalleryTitle>Safe Playground</GalleryTitle>
                <GalleryDescription>Children enjoying our secure playground facilities</GalleryDescription>
              </GalleryOverlay>
            </GalleryItem>
            
            <GalleryItem
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <GalleryImage 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Learning activities"
              />
              <GalleryOverlay>
                <GalleryTitle>Learning Center</GalleryTitle>
                <GalleryDescription>Educational activities and tutoring sessions</GalleryDescription>
              </GalleryOverlay>
            </GalleryItem>
            
            <GalleryItem
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <GalleryImage 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Family time"
              />
              <GalleryOverlay>
                <GalleryTitle>Family Reunification</GalleryTitle>
                <GalleryDescription>Supporting families to reunite and thrive together</GalleryDescription>
              </GalleryOverlay>
            </GalleryItem>
          </GalleryGrid>
        </Container>
      </ImageGallery>

      <VideoSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Watch Our Story
          </SectionTitle>
          
          <VideoContainer
            initial={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <VideoThumbnail>
              <PlayButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay />
              </PlayButton>
            </VideoThumbnail>
          </VideoContainer>
        </Container>
      </VideoSection>
      {/* Impact Stories / Testimonies Section */}
      <ContentSection style={{ background: '#f8f9fa' }}>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Impact Stories & Testimonies
          </SectionTitle>
          <FeaturesGrid style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
            {[
              {
                quote: "Susan Village gave me a safe place to heal and rebuild my life. The counseling and support I received helped me find my strength again. Today, I'm working and living independently with confidence.",
                author: "Sarah M.",
                status: "Successfully Reintegrated"
              },
              {
                quote: "After escaping trafficking, I didn't know where to turn. The team at Susan Village welcomed me with open arms, provided shelter, and helped me access education. I'm now studying to become a nurse.",
                author: "Grace K.",
                status: "Student & Graduate"
              },
              {
                quote: "The trauma healing program changed everything for me. I learned to process my experiences and build a future. The life skills training gave me the confidence to start my own small business.",
                author: "Amina W.",
                status: "Entrepreneur"
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #eef2f7'
                }}
              >
                <FaQuoteLeft style={{ color: '#667eea', fontSize: '2rem', marginBottom: '1rem' }} />
                <p style={{ 
                  color: '#5a6c7d', 
                  lineHeight: '1.8', 
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  marginBottom: '1.5rem'
                }}>
                  "{story.quote}"
                </p>
                <div style={{ borderTop: '1px solid #eef2f7', paddingTop: '1rem' }}>
                  <strong style={{ color: '#2c3e50', display: 'block', marginBottom: '0.25rem' }}>
                    {story.author}
                  </strong>
                  <span style={{ color: '#667eea', fontSize: '0.9rem' }}>
                    {story.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </FeaturesGrid>
        </Container>
      </ContentSection>

      <PartnersSection>
        <Container>
          <PartnersStrip>
            {['UNICEF', 'WHO', 'UN Women', 'Red Cross', 'Plan Intl', 'World Vision'].map(name => (
              <PartnerBadge key={name}>{name}</PartnerBadge>
            ))}
          </PartnersStrip>
        </Container>
      </PartnersSection>

      {/* Related Programs Section */}
      <ContentSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Related Programs
          </SectionTitle>
          <FeaturesGrid>
            {[
              {
                title: 'The Rebirth Elimisha Program',
                description: 'Education, mentorship, and scholarships for girls and vulnerable youth.',
                link: '/programs/elimisha',
                icon: <FaGraduationCap />
              },
              {
                title: 'Raising Authentic Voices',
                description: 'Advocacy on menstrual health, GBV prevention, and human trafficking awareness.',
                link: '/programs/authentic-voices',
                icon: <FaHeart />
              },
              {
                title: 'Vocational Training Program',
                description: 'Skills training and employment empowerment for vulnerable youth.',
                link: '/programs/vocational-training',
                icon: <FaHandsHelping />
              }
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <FeatureCard as={Link} to={program.link} style={{ textDecoration: 'none', display: 'block' }}>
                  <FeatureIcon>{program.icon}</FeatureIcon>
                  <FeatureTitle>{program.title}</FeatureTitle>
                  <FeatureDescription>{program.description}</FeatureDescription>
                  <motion.div
                    style={{
                      marginTop: '1rem',
                      color: '#667eea',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    whileHover={{ x: 5 }}
                  >
                    Learn More <FaArrowRight />
                  </motion.div>
                </FeatureCard>
              </motion.div>
            ))}
          </FeaturesGrid>
        </Container>
      </ContentSection>
    </PageContainer>
  );
};

export default SusanVillage;
