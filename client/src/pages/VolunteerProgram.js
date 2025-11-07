import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MediaCarousel from '../components/MediaCarousel';
import ProgramBreadcrumb from '../components/ProgramBreadcrumb';
import ProgramSidebar from '../components/ProgramSidebar';
import { 
  FaHandsHelping, 
  FaHeart, 
  FaUsers, 
  FaGraduationCap,
  FaArrowRight,
  FaPlay,
  FaDownload,
  FaCertificate,
  FaExchangeAlt,
  FaBriefcase,
  FaUserMd,
  FaDollarSign,
  FaPalette,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  margin: 0;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.85), rgba(118, 75, 162, 0.85)), 
              url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
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

const OpportunityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const OpportunityCard = styled(motion.div)`
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

const OpportunityIcon = styled.div`
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

const OpportunityTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const OpportunityDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const OpportunityFeatures = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
`;

const OpportunityFeature = styled.li`
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

const BenefitsSection = styled.section`
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 5rem 2rem;
  color: white;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const BenefitCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
`;

const BenefitIcon = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
`;

const BenefitTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
`;

const BenefitDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.5;
`;

const TestimonialSection = styled.section`
  padding: 5rem 2rem;
  background: #f8f9fa;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const TestimonialCard = styled(motion.div)`
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

const TestimonialText = styled.p`
  font-style: italic;
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const TestimonialAuthor = styled.div`
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.1rem;
`;

const TestimonialRole = styled.div`
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

const VolunteerProgram = () => {
  const highlightSlides = [
    {
      src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Volunteers with children',
      caption: 'Volunteers creating safe spaces and joyful memories'
    },
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Teaching support',
      caption: 'Supporting learning through mentorship and tutoring'
    },
    {
      src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Skills training',
      caption: 'Sharing professional skills that change lives'
    }
  ];
  const opportunities = [
    {
      icon: <FaGraduationCap />,
      title: "Teaching or Mentorship",
      description: "Support our Elimisha Program by teaching, tutoring, and mentoring students in various subjects and skills.",
      features: [
        "Teach academic subjects",
        "Provide one-on-one tutoring",
        "Mentor students in career development",
        "Support digital literacy training"
      ]
    },
    {
      icon: <FaUserMd />,
      title: "Health & Wellness",
      description: "Provide health and wellness support including medical care, counseling, nutrition, and wellness programs.",
      features: [
        "Medical and health services",
        "Counseling and therapy support",
        "Nutrition and wellness programs",
        "Health education workshops"
      ]
    },
    {
      icon: <FaDollarSign />,
      title: "Fundraising & Administration",
      description: "Support our operations through fundraising, administrative tasks, event planning, and donor relations.",
      features: [
        "Fundraising and donor relations",
        "Event planning and coordination",
        "Data entry and record keeping",
        "Communication and outreach"
      ]
    },
    {
      icon: <FaPalette />,
      title: "Creative Arts & Counseling",
      description: "Support our Authentic Voices program and provide counseling through creative arts, storytelling, and therapy.",
      features: [
        "Creative writing and storytelling",
        "Podcast and video production",
        "Photography and visual arts",
        "Counseling and therapy support"
      ]
    }
  ];

  const benefits = [
    {
      icon: <FaExchangeAlt />,
      title: "Cultural Exchange",
      description: "Experience rich cultural exchange with local communities and learn about Kenyan culture and traditions"
    },
    {
      icon: <FaBriefcase />,
      title: "Professional Experience",
      description: "Gain valuable professional experience in education, social work, healthcare, and community development"
    },
    {
      icon: <FaCertificate />,
      title: "Certificate of Service",
      description: "Receive a certificate of service recognizing your contribution and volunteer hours completed"
    },
    {
      icon: <FaHeart />,
      title: "Make a Difference",
      description: "Directly impact the lives of children, families, and communities through meaningful volunteer work"
    }
  ];

  const testimonials = [
    {
      text: "Volunteering with The Rebirth has been one of the most rewarding experiences of my life. Seeing the children grow and thrive because of our support is incredible.",
      author: "Sarah Johnson",
      role: "Education Volunteer"
    },
    {
      text: "As a professional carpenter, I was able to share my skills with young people in the vocational program. It's amazing to see them start their own businesses.",
      author: "Michael Chen",
      role: "Vocational Training Volunteer"
    },
    {
      text: "The remote volunteering program allowed me to contribute from my home country. I tutored students online and helped with program coordination.",
      author: "Emma Rodriguez",
      role: "International Volunteer"
    }
  ];

  return (
    <PageContainer>
      <ProgramBreadcrumb items={[
        { label: 'Programs', to: '/programs' },
        { label: 'Volunteer Program' }
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
            Volunteer Program
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Be Part of the Village.
          </HeroSubtitle>
          <HeroDescription
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            A Survivor is Raised by a Village. Join our global and local volunteer network to support 
            programs and beneficiaries. Whether you're passionate about teaching, health, fundraising, 
            or creative arts, there's a place for you in our mission.
          </HeroDescription>
          <ButtonGroup>
            <CTAButton
              as={Link}
              to="/volunteer/apply"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply to Volunteer <FaArrowRight />
            </CTAButton>
            <SecondaryButton
              as={Link}
              to="/contact?intent=volunteer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More <FaHeart />
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

      {/* Introduction Section */}
      <ContentSection style={{ background: '#f8f9fa' }}>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Philosophy
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
            <p style={{ marginBottom: '1.5rem', fontSize: '1.3rem', fontWeight: '600', color: '#2c3e50' }}>
              "A Survivor is Raised by a Village."
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              This philosophy guides everything we do. We believe that healing, growth, and empowerment 
              happen through community support. Our Volunteer Program invites global and local volunteers 
              to be part of this village, supporting our programs and beneficiaries.
            </p>
            <p>
              Whether you can give a few hours a week or commit to a longer-term placement, your 
              contribution makes a real difference. Volunteers are the heart of our organization, 
              bringing skills, compassion, and dedication that transform lives.
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
            Volunteer Opportunities
          </SectionTitle>
          
          <OpportunityGrid>
            {opportunities.map((opportunity, index) => (
              <OpportunityCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <OpportunityIcon>{opportunity.icon}</OpportunityIcon>
                <OpportunityTitle>{opportunity.title}</OpportunityTitle>
                <OpportunityDescription>{opportunity.description}</OpportunityDescription>
                <OpportunityFeatures>
                  {opportunity.features.map((feature, idx) => (
                    <OpportunityFeature key={idx}>{feature}</OpportunityFeature>
                  ))}
                </OpportunityFeatures>
              </OpportunityCard>
            ))}
          </OpportunityGrid>
        </Container>
      </ContentSection>

      <BenefitsSection>
        <Container>
          <SectionTitle
            style={{ color: 'white', marginBottom: '4rem' }}
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Why Volunteer With Us?
          </SectionTitle>
          
          <BenefitsGrid>
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <BenefitIcon>{benefit.icon}</BenefitIcon>
                <BenefitTitle>{benefit.title}</BenefitTitle>
                <BenefitDescription>{benefit.description}</BenefitDescription>
              </BenefitCard>
            ))}
          </BenefitsGrid>
        </Container>
      </BenefitsSection>

      <TestimonialSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Volunteer Stories
          </SectionTitle>
          
          <TestimonialGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialText>{testimonial.text}</TestimonialText>
                <TestimonialAuthor>{testimonial.author}</TestimonialAuthor>
                <TestimonialRole>{testimonial.role}</TestimonialRole>
              </TestimonialCard>
            ))}
          </TestimonialGrid>
        </Container>
      </TestimonialSection>

      <ImageGallery>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Volunteers in Action
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
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Volunteers working with children"
              />
              <GalleryOverlay>
                <GalleryTitle>Community Impact</GalleryTitle>
                <GalleryDescription>Volunteers making a difference in children's lives</GalleryDescription>
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
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Education volunteers"
              />
              <GalleryOverlay>
                <GalleryTitle>Education Support</GalleryTitle>
                <GalleryDescription>Volunteers helping with teaching and mentoring</GalleryDescription>
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
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Vocational training volunteers"
              />
              <GalleryOverlay>
                <GalleryTitle>Skills Training</GalleryTitle>
                <GalleryDescription>Volunteers sharing professional skills and expertise</GalleryDescription>
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
            Watch Our Impact
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

          <VLMetricsGrid
            as={motion.div}
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VLMetricCard>
              <VLMetricValue>200+</VLMetricValue>
              <VLMetricLabel>Active Volunteers</VLMetricLabel>
            </VLMetricCard>
            <VLMetricCard>
              <VLMetricValue>30+</VLMetricValue>
              <VLMetricLabel>Countries Represented</VLMetricLabel>
            </VLMetricCard>
            <VLMetricCard>
              <VLMetricValue>10K+</VLMetricValue>
              <VLMetricLabel>Volunteer Hours</VLMetricLabel>
            </VLMetricCard>
            <VLMetricCard>
              <VLMetricValue>50+</VLMetricValue>
              <VLMetricLabel>Projects Supported</VLMetricLabel>
            </VLMetricCard>
          </VLMetricsGrid>

          <VLActionsRow>
            <CTAButton
              as={Link}
              to="/volunteer/apply"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Apply to Volunteer
            </CTAButton>
            <SecondaryButton
              as={Link}
              to="/contact?intent=volunteer-coordinator"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Our Volunteer Coordinator
            </SecondaryButton>
            <SecondaryButton
              as={Link}
              to="/reports/volunteer-program.pdf"
              target="_blank"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaDownload /> Download Program Report
            </SecondaryButton>
          </VLActionsRow>

          <VLQuickDonate
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <VLQuickTitle>Quick Donate</VLQuickTitle>
            <VLAmountRow>
              {['1000', '3000', '6000', '12000'].map(a => (
                <VLAmountChip key={a} to={`/donate?program=volunteer&amount=${a}`}>KES {a}</VLAmountChip>
              ))}
            </VLAmountRow>
            <VLSmallNote>Your gift funds volunteer logistics and community projects.</VLSmallNote>
          </VLQuickDonate>
        </Container>
      </ContentSection>

      {/* How to Apply Section */}
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
              <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Step-by-Step Guide</h3>
              <ol style={{ color: '#5a6c7d', lineHeight: '2', paddingLeft: '1.5rem' }}>
                <li>Review volunteer opportunities and requirements</li>
                <li>Fill out the online volunteer application form</li>
                <li>Submit your resume and references</li>
                <li>Attend a virtual or in-person interview</li>
                <li>Complete orientation and training program</li>
                <li>Begin your volunteer placement</li>
              </ol>
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
              <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Contact Us</h3>
              <div style={{ color: '#5a6c7d', lineHeight: '2' }}>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <FaPhone style={{ color: '#667eea' }} /> +254 720 339 204
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <FaEnvelope style={{ color: '#667eea' }} /> volunteer@rebirthofaqueen.org
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <FaMapMarkerAlt style={{ color: '#667eea' }} /> Nairobi, Kenya
                </p>
                <Link 
                  to="/volunteer/apply" 
                  style={{ 
                    display: 'inline-block',
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
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
          <OpportunityGrid>
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
                <OpportunityCard as={Link} to={program.link} style={{ textDecoration: 'none', display: 'block' }}>
                  <OpportunityIcon>{program.icon}</OpportunityIcon>
                  <OpportunityTitle>{program.title}</OpportunityTitle>
                  <OpportunityDescription>{program.description}</OpportunityDescription>
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
                </OpportunityCard>
              </motion.div>
            ))}
          </OpportunityGrid>
        </Container>
      </ContentSection>
    </PageContainer>
  );
};

// Local styled blocks for Impact & Support
const VLMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const VLMetricCard = styled.div`
  background: #fff;
  border: 1px solid #eef2f7;
  border-radius: 16px;
  padding: 1.25rem 1rem;
  text-align: center;
  box-shadow: 0 6px 18px rgba(0,0,0,0.05);
`;

const VLMetricValue = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: #1f2937;
`;

const VLMetricLabel = styled.div`
  font-size: 0.95rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const VLActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  justify-content: center;
`;

const VLQuickDonate = styled.div`
  background: linear-gradient(135deg, #f8fbff, #f3f6fb);
  border: 1px solid #e5ecf6;
  border-radius: 16px;
  padding: 1.25rem;
  text-align: center;
`;

const VLQuickTitle = styled.h4`
  margin: 0 0 0.75rem 0;
  color: #1f2937;
  font-weight: 700;
`;

const VLAmountRow = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

const VLAmountChip = styled(Link)`
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

const VLSmallNote = styled.div`
  font-size: 0.85rem;
  color: #6b7280;
`;

// Partners strip for trusted brand section
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

export default VolunteerProgram;
