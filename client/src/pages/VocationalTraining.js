import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MediaCarousel from '../components/MediaCarousel';
import ProgramBreadcrumb from '../components/ProgramBreadcrumb';
import ProgramSidebar from '../components/ProgramSidebar';
import { 
  FaHammer, 
  FaLaptop, 
  FaArrowRight,
  FaPlay,
  FaGraduationCap,
  FaHeart,
  FaUsers,
  FaHandsHelping,
  FaDownload,
  FaBriefcase,
  FaCut,
  FaTshirt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
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
              url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
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

const ProgramGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ProgramCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #667eea, #764ba2);
  }
`;

const ProgramIcon = styled.div`
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
`;

const ProgramTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const ProgramDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const ProgramFeatures = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
`;

const ProgramFeature = styled.li`
  color: #7f8c8d;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  
  &::before {
    content: '✓';
    color: #10b981;
    font-weight: bold;
    margin-right: 0.5rem;
  }
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

const SuccessSection = styled.section`
  padding: 5rem 2rem;
  background: #f8f9fa;
`;

const SuccessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const SuccessCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;

  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 4rem;
    color: #667eea;
    opacity: 0.3;
  }
`;

const SuccessText = styled.p`
  font-style: italic;
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const SuccessAuthor = styled.div`
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.1rem;
`;

const SuccessRole = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-top: 0.25rem;
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

const VocationalTraining = () => {
  const highlightSlides = [
    {
      src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Construction training',
      caption: 'Construction and carpentry training for sustainable jobs'
    },
    {
      src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Culinary training',
      caption: 'Culinary arts and hospitality that open global doors'
    },
    {
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Electrical work training',
      caption: 'Electrical and technical skills for the modern workforce'
    }
  ];
  const programs = [
    {
      icon: <FaTshirt />,
      title: "Tailoring & Fashion Design",
      description: "Comprehensive training in tailoring, fashion design, and garment construction for employment or self-employment.",
      features: [
        "Pattern making and cutting",
        "Sewing and garment construction",
        "Fashion design principles",
        "Business skills for fashion entrepreneurs"
      ]
    },
    {
      icon: <FaCut />,
      title: "Hairdressing & Beauty",
      description: "Professional hairdressing and beauty therapy training including hair styling, makeup, and skincare techniques.",
      features: [
        "Hair cutting and styling techniques",
        "Hair coloring and treatments",
        "Makeup application and beauty therapy",
        "Salon management and customer service"
      ]
    },
    {
      icon: <FaHammer />,
      title: "Carpentry, Plumbing & Mechanics",
      description: "Technical training in carpentry, plumbing, and mechanics for skilled trades employment.",
      features: [
        "Carpentry and woodworking skills",
        "Plumbing installation and repair",
        "Auto mechanics and repair",
        "Safety protocols and certification"
      ]
    },
    {
      icon: <FaLaptop />,
      title: "ICT & Entrepreneurship Training",
      description: "Modern ICT skills and entrepreneurship training to prepare graduates for digital careers or business ownership.",
      features: [
        "Computer skills and digital literacy",
        "Software applications and web design",
        "Entrepreneurship and business planning",
        "Financial management and marketing"
      ]
    }
  ];

  const stats = [
    { number: "1,200+", label: "Students Trained" },
    { number: "85%", label: "Employment Rate" },
    { number: "15+", label: "Trade Programs" },
    { number: "500+", label: "Graduates Employed" }
  ];

  const successStories = [
    {
      text: "The automotive program gave me the skills I needed to start my own repair shop. I now employ three other graduates and serve my community.",
      author: "James Mwangi",
      role: "Auto Repair Shop Owner"
    },
    {
      text: "After completing the culinary program, I got a job at a five-star hotel. The training was practical and directly applicable to real-world work.",
      author: "Grace Wanjiku",
      role: "Head Chef"
    },
    {
      text: "The construction program helped me start my own contracting business. I now build homes and employ other program graduates.",
      author: "Peter Otieno",
      role: "Construction Contractor"
    }
  ];

  return (
    <PageContainer>
      <ProgramBreadcrumb items={[
        { label: 'Programs', to: '/programs' },
        { label: 'Vocational Training Program' }
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
            Vocational Training Program
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Skills that Transform Lives.
          </HeroSubtitle>
          <HeroDescription
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Our Vocational Training Program provides hands-on training in various trades and technical 
            skills that lead to meaningful employment opportunities. We focus on practical, marketable 
            skills that enable graduates to secure jobs or start their own businesses.
          </HeroDescription>
          <ButtonGroup>
            <CTAButton
              as={Link}
              to="/contact"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Now <FaArrowRight />
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
              Learn More <FaGraduationCap />
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
              The Rebirth of a Queen Vocational Training Program provides skills training and employment 
              empowerment for vulnerable youth. Our vocational goals are to equip young people with 
              marketable skills that lead to sustainable employment or successful self-employment.
            </p>
            <p>
              <strong>Our Approach:</strong> We combine hands-on technical training with entrepreneurship 
              education, ensuring graduates can either secure employment or start their own businesses. 
              Through partnerships with employers and on-job training opportunities, we bridge the gap 
              between training and employment.
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
            Courses Offered
          </SectionTitle>
          
          <ProgramGrid>
            {programs.map((program, index) => (
              <ProgramCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <ProgramIcon>{program.icon}</ProgramIcon>
                <ProgramTitle>{program.title}</ProgramTitle>
                <ProgramDescription>{program.description}</ProgramDescription>
                <ProgramFeatures>
                  {program.features.map((feature, idx) => (
                    <ProgramFeature key={idx}>{feature}</ProgramFeature>
                  ))}
                </ProgramFeatures>
              </ProgramCard>
            ))}
          </ProgramGrid>
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

      <SuccessSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Success Stories
          </SectionTitle>
          
          <SuccessGrid>
            {successStories.map((story, index) => (
              <SuccessCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <SuccessText>{story.text}</SuccessText>
                <SuccessAuthor>{story.author}</SuccessAuthor>
                <SuccessRole>{story.role}</SuccessRole>
              </SuccessCard>
            ))}
          </SuccessGrid>
        </Container>
      </SuccessSection>

      <ImageGallery>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Training in Action
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
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Vocational training workshop"
              />
              <GalleryOverlay>
                <GalleryTitle>Hands-On Training</GalleryTitle>
                <GalleryDescription>Students learning practical skills in modern workshops</GalleryDescription>
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
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Construction training"
              />
              <GalleryOverlay>
                <GalleryTitle>Construction Skills</GalleryTitle>
                <GalleryDescription>Building practical construction and carpentry skills</GalleryDescription>
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
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Culinary training"
              />
              <GalleryOverlay>
                <GalleryTitle>Culinary Arts</GalleryTitle>
                <GalleryDescription>Professional cooking and hospitality training programs</GalleryDescription>
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
            Watch Our Training
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

      {/* Impact & Support */}
      <ContentSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Impact & Support
          </SectionTitle>

          <VTMetricsGrid
            as={motion.div}
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VTMetricCard>
              <VTMetricValue>450+</VTMetricValue>
              <VTMetricLabel>Youth Trained</VTMetricLabel>
            </VTMetricCard>
            <VTMetricCard>
              <VTMetricValue>70%</VTMetricValue>
              <VTMetricLabel>Job/Business Placement</VTMetricLabel>
            </VTMetricCard>
            <VTMetricCard>
              <VTMetricValue>15+</VTMetricValue>
              <VTMetricLabel>Trade Programs</VTMetricLabel>
            </VTMetricCard>
            <VTMetricCard>
              <VTMetricValue>30+</VTMetricValue>
              <VTMetricLabel>Industry Partners</VTMetricLabel>
            </VTMetricCard>
          </VTMetricsGrid>

          <VTActionsRow>
            <CTAButton
              as={Link}
              to="/contact?intent=enroll"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Enroll Now
            </CTAButton>
            <SecondaryButton
              as={Link}
              to="/donate?program=vocational-training"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Sponsor a Trainee
            </SecondaryButton>
            <SecondaryButton
              as={Link}
              to="/reports/vocational-training.pdf"
              target="_blank"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaDownload /> Download Program Report
            </SecondaryButton>
          </VTActionsRow>

          <VTQuickDonate
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <VTQuickTitle>Quick Donate</VTQuickTitle>
            <VTAmountRow>
              {['1500', '3000', '6000', '12000'].map(a => (
                <VTAmountChip key={a} to={`/donate?program=vocational-training&amount=${a}`}>KES {a}</VTAmountChip>
              ))}
            </VTAmountRow>
            <VTSmallNote>Your gift funds training kits, mentorship, and placements.</VTSmallNote>
          </VTQuickDonate>
        </Container>
      </ContentSection>
      {/* Employability Focus Section */}
      <ContentSection style={{ background: '#f8f9fa' }}>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Employability Focus
          </SectionTitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}
          >
            {[
              {
                title: 'Employer Partnerships',
                description: 'We partner with local employers to provide on-job training and guaranteed employment opportunities for our graduates.',
                icon: <FaBriefcase />
              },
              {
                title: 'On-Job Training',
                description: 'Graduates receive hands-on experience through apprenticeships and internships with partner organizations.',
                icon: <FaGraduationCap />
              },
              {
                title: 'Business Startup Support',
                description: 'For graduates who want to start their own businesses, we provide mentorship, business planning, and startup capital support.',
                icon: <FaHandsHelping />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #eef2f7',
                  textAlign: 'center'
                }}
              >
                <div style={{ color: '#667eea', fontSize: '3rem', marginBottom: '1rem' }}>
                  {item.icon}
                </div>
                <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ color: '#5a6c7d', lineHeight: '1.6' }}>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </ContentSection>

      {/* Graduate Stories Section */}
      <ContentSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Graduate Success Stories
          </SectionTitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem',
              maxWidth: '1200px',
              margin: '0 auto'
            }}
          >
            {[
              {
                quote: "After completing the tailoring program, I started my own fashion business. I now have a small workshop and employ two other graduates. The training gave me the skills and confidence to succeed.",
                author: "Maria Wanjiku",
                status: "Fashion Designer & Business Owner"
              },
              {
                quote: "The hairdressing program changed my life. I completed my training and got a job at a top salon in Nairobi. Today, I'm a senior stylist and mentor other trainees.",
                author: "Grace Nyawira",
                status: "Senior Hair Stylist"
              },
              {
                quote: "Through the carpentry program, I learned valuable skills that helped me start my own construction business. I now build homes and employ three other graduates.",
                author: "Peter Kamau",
                status: "Construction Contractor"
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
          </motion.div>
        </Container>
      </ContentSection>

      {/* Enrollment Information Section */}
      <ContentSection style={{ background: '#f8f9fa' }}>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            How to Apply
          </SectionTitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                border: '1px solid #eef2f7'
              }}
            >
              <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Requirements</h3>
              <ul style={{ color: '#5a6c7d', lineHeight: '2', paddingLeft: '1.5rem' }}>
                <li>Age: 18-35 years</li>
                <li>Basic literacy and numeracy</li>
                <li>Proof of vulnerability status</li>
                <li>Commitment to complete training</li>
                <li>Medical clearance certificate</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                border: '1px solid #eef2f7'
              }}
            >
              <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Application Process</h3>
              <ol style={{ color: '#5a6c7d', lineHeight: '2', paddingLeft: '1.5rem' }}>
                <li>Fill out online application form</li>
                <li>Submit required documents</li>
                <li>Attend interview and assessment</li>
                <li>Receive acceptance notification</li>
                <li>Begin training program</li>
              </ol>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                border: '1px solid #eef2f7'
              }}
            >
              <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Contact Us</h3>
              <div style={{ color: '#5a6c7d', lineHeight: '2' }}>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <FaPhone style={{ color: '#667eea' }} /> +254 720 339 204
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <FaEnvelope style={{ color: '#667eea' }} /> info@rebirthofaqueen.org
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <FaMapMarkerAlt style={{ color: '#667eea' }} /> Nairobi, Kenya
                </p>
                <Link 
                  to="/contact?intent=enroll" 
                  style={{ 
                    display: 'inline-block', 
                    marginTop: '1rem',
                    color: '#667eea',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}
                >
                  Apply Online →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </ContentSection>

      <PartnersSection>
        <Container>
          <PartnersStrip>
            {['UNDP', 'ILO', 'USAID', 'GIZ', 'Safaricom', 'UNICEF'].map(name => (
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
          <ProgramGrid>
            {[
              {
                title: 'The Rebirth Susan Village',
                description: 'Rescue, shelter, and reintegration services for survivors of sexual abuse and human trafficking.',
                link: '/programs/susan-village',
                icon: <FaHeart />
              },
              {
                title: 'The Rebirth Elimisha Program',
                description: 'Education, mentorship, and scholarships for girls and vulnerable youth.',
                link: '/programs/elimisha',
                icon: <FaUsers />
              },
              {
                title: 'Raising Authentic Voices',
                description: 'Advocacy on menstrual health, GBV prevention, and human trafficking awareness.',
                link: '/programs/authentic-voices',
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
                <ProgramCard as={Link} to={program.link} style={{ textDecoration: 'none', display: 'block' }}>
                  <ProgramIcon>{program.icon}</ProgramIcon>
                  <ProgramTitle>{program.title}</ProgramTitle>
                  <ProgramDescription>{program.description}</ProgramDescription>
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
                </ProgramCard>
              </motion.div>
            ))}
          </ProgramGrid>
        </Container>
      </ContentSection>
    </PageContainer>
  );
};

// Local styled blocks for Impact & Support
const VTMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const VTMetricCard = styled.div`
  background: #fff;
  border: 1px solid #eef2f7;
  border-radius: 16px;
  padding: 1.25rem 1rem;
  text-align: center;
  box-shadow: 0 6px 18px rgba(0,0,0,0.05);
`;

const VTMetricValue = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: #1f2937;
`;

const VTMetricLabel = styled.div`
  font-size: 0.95rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const VTActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  justify-content: center;
`;

const VTQuickDonate = styled.div`
  background: linear-gradient(135deg, #f8fbff, #f3f6fb);
  border: 1px solid #e5ecf6;
  border-radius: 16px;
  padding: 1.25rem;
  text-align: center;
`;

const VTQuickTitle = styled.h4`
  margin: 0 0 0.75rem 0;
  color: #1f2937;
  font-weight: 700;
`;

const VTAmountRow = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

const VTAmountChip = styled(Link)`
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

const VTSmallNote = styled.div`
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

export default VocationalTraining;
