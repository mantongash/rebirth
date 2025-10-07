import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMicrophone, 
  FaHeart, 
  FaUsers, 
  FaLightbulb, 
  FaHandsHelping,
  FaArrowRight,
  FaPlay,
  FaQuoteLeft,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBullhorn,
  FaGraduationCap,
  FaShieldAlt,
  FaComments,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaShare,
  FaCalendar,
  FaClock,
  FaUser,
  FaChalkboard,
  FaLaptop,
  FaMicroscope,
  FaPaintBrush,
  FaMusic,
  FaGamepad,
  FaCamera,
  FaCode,
  FaGlobe,
  FaTrophy,
  FaCertificate,
  FaSchool,
  FaUniversity,
  FaBriefcase,
  FaChartLine,
  FaCheckCircle,
  FaTimes,
  FaBars,
  FaExclamationTriangle,
  FaEye,
  FaVolumeUp,
  FaRocket,
  FaFire,
  FaGem
} from 'react-icons/fa';

// Unique Animations for Authentic Voices
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const wave = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-5deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 154, 158, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 154, 158, 0.6);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
`;

const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #ffecd2 100%);
  position: relative;
  overflow: hidden;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), 
              url('https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/authentic-voices-hero.jpg') center/cover;
  color: white;
  text-align: center;
  padding: 2rem;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  animation: ${fadeInUp} 1s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
  background: linear-gradient(45deg, #fff, #ff9a9e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff9a9e, #fecfef);
  color: #2c3e50;
  border: none;
  padding: 1.5rem 3rem;
  font-size: 1.3rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 15px 40px rgba(255, 154, 158, 0.4);
  transition: all 0.3s ease;
  animation: ${glow} 3s infinite;
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 20px 50px rgba(255, 154, 158, 0.6);
  }
`;

const Section = styled.section`
  padding: 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled.h2`
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 4rem;
  color: #2c3e50;
  position: relative;
  font-weight: 800;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 6px;
    background: linear-gradient(45deg, #ff9a9e, #fecfef);
    border-radius: 3px;
  }
`;

const FocusAreasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  margin-bottom: 6rem;
`;

const FocusCard = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 25px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.15);
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(45deg, #ff9a9e, #fecfef);
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 70px rgba(0,0,0,0.2);
  }
`;

const FocusIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #ff9a9e, #fecfef);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: white;
  font-size: 2.5rem;
  animation: ${wave} 2s infinite;
  box-shadow: 0 10px 30px rgba(255, 154, 158, 0.3);
`;

const FocusTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-weight: 700;
`;

const FocusDescription = styled.p`
  color: #666;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const FocusFeatures = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
  
  li {
    padding: 0.8rem 0;
    color: #555;
    position: relative;
    padding-left: 2rem;
    font-size: 1rem;
    
    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #ff9a9e;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
`;

const StatsSection = styled.div`
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  color: #2c3e50;
  padding: 6rem 2rem;
  margin: 6rem 0;
  border-radius: 30px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/authentic-voices-pattern.jpg') center/cover;
    opacity: 0.1;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const StatItem = styled(motion.div)`
  animation: ${fadeInUp} 0.8s ease-out;
`;

const StatNumber = styled.div`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #2c3e50;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`;

const StatLabel = styled.div`
  font-size: 1.4rem;
  opacity: 0.8;
  font-weight: 600;
`;

const CommunitySection = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 6rem 2rem;
  border-radius: 30px;
  margin: 6rem 0;
`;

const CommunityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
`;

const CommunityCard = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.1);
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(45deg, #ff9a9e, #fecfef);
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0,0,0,0.15);
  }
`;

const CommunityIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #ff9a9e, #fecfef);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
  animation: ${pulse} 2s infinite;
`;

const CommunityTitle = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  font-weight: 700;
`;

const CommunityDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 1.1rem;
`;

const TestimonialsSection = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 6rem 2rem;
  border-radius: 30px;
  margin: 6rem 0;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
`;

const TestimonialCard = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -15px;
    left: 30px;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid white;
  }
`;

const QuoteIcon = styled(FaQuoteLeft)`
  color: #ff9a9e;
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: 2rem;
  color: #555;
  line-height: 1.8;
  font-size: 1.1rem;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const AuthorImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ff9a9e;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.div`
  font-weight: 700;
  color: #2c3e50;
  font-size: 1.2rem;
`;

const AuthorTitle = styled.div`
  color: #666;
  font-size: 1rem;
  margin-top: 0.5rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.3rem;
  margin-top: 0.8rem;
`;

const Star = styled(FaStar)`
  color: #ffd700;
  font-size: 1.1rem;
`;

const GallerySection = styled.div`
  margin: 6rem 0;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  height: 300px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
`;

const GalleryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 154, 158, 0.8), rgba(254, 207, 239, 0.8));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${GalleryItem}:hover & {
    opacity: 1;
  }
`;

const PlayIcon = styled(FaPlay)`
  color: white;
  font-size: 3rem;
`;

const ContactSection = styled.div`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 6rem 2rem;
  border-radius: 30px;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/authentic-voices-contact-pattern.jpg') center/cover;
    opacity: 0.1;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
  position: relative;
  z-index: 2;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.2);
  }
  
  svg {
    color: #ff9a9e;
    font-size: 2rem;
  }
`;

const AuthenticVoices = () => {
  const focusAreas = [
    {
      icon: <FaMicrophone />,
      title: "Menstrual Health Awareness",
      description: "Breaking the silence around menstrual health and providing education and resources to communities across Kenya and East Africa.",
      features: [
        "Community Education Sessions",
        "Menstrual Hygiene Workshops",
        "Resource Distribution Programs",
        "Peer Education Initiatives",
        "Health Facility Partnerships"
      ]
    },
    {
      icon: <FaShieldAlt />,
      title: "Gender-Based Violence Prevention",
      description: "Raising awareness and providing support for survivors of gender-based violence through education and community engagement.",
      features: [
        "Community Awareness Campaigns",
        "Survivor Support Groups",
        "Legal Aid Referrals",
        "Counseling Services",
        "Emergency Response Training"
      ]
    },
    {
      icon: <FaBullhorn />,
      title: "Human Trafficking Prevention",
      description: "Educating communities about human trafficking and providing support for survivors through comprehensive prevention programs.",
      features: [
        "Community Education Programs",
        "Survivor Support Services",
        "Law Enforcement Training",
        "Victim Identification Training",
        "Reintegration Support"
      ]
    }
  ];

  const stats = [
    { number: "5,000+", label: "Community Members Reached" },
    { number: "200+", label: "Awareness Sessions Conducted" },
    { number: "50+", label: "Community Champions Trained" },
    { number: "15+", label: "Partner Organizations" },
    { number: "100+", label: "Survivors Supported" },
    { number: "25+", label: "Communities Served" }
  ];

  const communityPrograms = [
    {
      icon: <FaUsers />,
      title: "Community Champions Training",
      description: "Training local leaders to become advocates for change in their communities, empowering them to address sensitive issues."
    },
    {
      icon: <FaGraduationCap />,
      title: "Peer Education Programs",
      description: "Empowering young people to educate their peers about important health and safety issues through structured programs."
    },
    {
      icon: <FaComments />,
      title: "Community Dialogues",
      description: "Facilitating open discussions about sensitive topics to break down barriers and stigma in communities."
    }
  ];

  const testimonials = [
    {
      text: "The awareness sessions helped me understand my rights and how to protect myself. I now feel empowered to speak up and help other women in my community.",
      author: "Jane M.",
      title: "Community Member",
      image: "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/voices-testimonial-1.jpg",
      rating: 5
    },
    {
      text: "As a community champion, I've been able to help many women in my village access the support they need. The training gave me the confidence to lead change.",
      author: "Grace K.",
      title: "Community Champion",
      image: "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/voices-testimonial-2.jpg",
      rating: 5
    },
    {
      text: "The program has transformed our community. We now have open discussions about issues that were previously taboo. Our girls are safer and more informed.",
      author: "Chief Wanjiku",
      title: "Community Leader",
      image: "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/voices-testimonial-3.jpg",
      rating: 5
    }
  ];

  const galleryImages = [
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/authentic-voices-1.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/authentic-voices-2.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/authentic-voices-3.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/authentic-voices-4.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/authentic-voices-5.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/authentic-voices-6.jpg"
  ];

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Raising Authentic Voices</HeroTitle>
          <HeroSubtitle>
            Advocacy and mentorship program raising awareness on menstrual health, gender-based violence, and human trafficking
          </HeroSubtitle>
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join the Movement <FaArrowRight />
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionTitle>Our Focus Areas</SectionTitle>
        <FocusAreasGrid>
          {focusAreas.map((area, index) => (
            <FocusCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FocusIcon>{area.icon}</FocusIcon>
              <FocusTitle>{area.title}</FocusTitle>
              <FocusDescription>{area.description}</FocusDescription>
              <FocusFeatures>
                {area.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </FocusFeatures>
            </FocusCard>
          ))}
        </FocusAreasGrid>
      </Section>

      <StatsSection>
        <SectionTitle style={{ color: '#2c3e50' }}>Our Advocacy Impact</SectionTitle>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </StatsGrid>
      </StatsSection>

      <Section>
        <SectionTitle>Community Programs</SectionTitle>
        <CommunitySection>
          <CommunityGrid>
            {communityPrograms.map((program, index) => (
              <CommunityCard
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <CommunityIcon>{program.icon}</CommunityIcon>
                <CommunityTitle>{program.title}</CommunityTitle>
                <CommunityDescription>{program.description}</CommunityDescription>
              </CommunityCard>
            ))}
          </CommunityGrid>
        </CommunitySection>
      </Section>

      <Section>
        <SectionTitle>Community Voices</SectionTitle>
        <TestimonialsSection>
          <TestimonialsGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <QuoteIcon />
                <TestimonialText>"{testimonial.text}"</TestimonialText>
                <TestimonialAuthor>
                  <AuthorImage src={testimonial.image} alt={testimonial.author} />
                  <AuthorInfo>
                    <AuthorName>{testimonial.author}</AuthorName>
                    <AuthorTitle>{testimonial.title}</AuthorTitle>
                    <Stars>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} />
                      ))}
                    </Stars>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </TestimonialsSection>
      </Section>

      <Section>
        <SectionTitle>Advocacy in Action</SectionTitle>
        <GallerySection>
          <GalleryGrid>
            {galleryImages.map((image, index) => (
              <GalleryItem
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img src={image} alt={`Authentic Voices ${index + 1}`} />
                <GalleryOverlay>
                  <PlayIcon />
                </GalleryOverlay>
              </GalleryItem>
            ))}
          </GalleryGrid>
        </GallerySection>
      </Section>

      <Section>
        <ContactSection>
          <SectionTitle style={{ color: 'white' }}>Get Involved</SectionTitle>
          <p style={{ fontSize: '1.3rem', marginBottom: '3rem', opacity: 0.9 }}>
            Join us in raising authentic voices and creating change in your community
          </p>
          <ContactGrid>
            <ContactItem>
              <FaPhone />
              <div>
                <div style={{ fontWeight: '700', fontSize: '1.2rem' }}>Program Coordinator</div>
                <div style={{ fontSize: '1.1rem' }}>+254 720 339 204</div>
              </div>
            </ContactItem>
            <ContactItem>
              <FaEnvelope />
              <div>
                <div style={{ fontWeight: '700', fontSize: '1.2rem' }}>Email Us</div>
                <div style={{ fontSize: '1.1rem' }}>voices@rebirthofaqueen.org</div>
              </div>
            </ContactItem>
            <ContactItem>
              <FaMapMarkerAlt />
              <div>
                <div style={{ fontWeight: '700', fontSize: '1.2rem' }}>Visit Us</div>
                <div style={{ fontSize: '1.1rem' }}>Nairobi, Kenya</div>
              </div>
            </ContactItem>
          </ContactGrid>
        </ContactSection>
      </Section>
    </Container>
  );
};

export default AuthenticVoices;