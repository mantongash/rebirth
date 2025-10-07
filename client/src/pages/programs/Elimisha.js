import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGraduationCap, 
  FaBook, 
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
  FaAward,
  FaRocket,
  FaHeart,
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
  FaBars
} from 'react-icons/fa';

// Unique Animations for Elimisha
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

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(78, 205, 196, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(78, 205, 196, 0.6);
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

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 50%, #a8edea 100%);
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
              url('https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/elimisha-hero.jpg') center/cover;
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
  background: linear-gradient(45deg, #fff, #4ecdc4);
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
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  color: white;
  border: none;
  padding: 1.5rem 3rem;
  font-size: 1.3rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 15px 40px rgba(78, 205, 196, 0.4);
  transition: all 0.3s ease;
  animation: ${glow} 3s infinite;
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 20px 50px rgba(78, 205, 196, 0.6);
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
    background: linear-gradient(45deg, #4ecdc4, #44a08d);
    border-radius: 3px;
  }
`;

const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  margin-bottom: 6rem;
`;

const ProgramCard = styled(motion.div)`
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
    background: linear-gradient(45deg, #4ecdc4, #44a08d);
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 70px rgba(0,0,0,0.2);
  }
`;

const ProgramIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: white;
  font-size: 2.5rem;
  animation: ${bounce} 2s infinite;
  box-shadow: 0 10px 30px rgba(78, 205, 196, 0.3);
`;

const ProgramTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-weight: 700;
`;

const ProgramDescription = styled.p`
  color: #666;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const ProgramFeatures = styled.ul`
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
      color: #4ecdc4;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
`;

const StatsSection = styled.div`
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
  color: white;
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
    background: url('https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/elimisha-pattern.jpg') center/cover;
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
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const StatLabel = styled.div`
  font-size: 1.4rem;
  opacity: 0.9;
  font-weight: 600;
`;

const ScholarshipSection = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 6rem 2rem;
  border-radius: 30px;
  margin: 6rem 0;
`;

const ScholarshipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
`;

const ScholarshipCard = styled(motion.div)`
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
    background: linear-gradient(45deg, #4ecdc4, #44a08d);
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0,0,0,0.15);
  }
`;

const ScholarshipIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
  animation: ${rotate} 3s linear infinite;
`;

const ScholarshipTitle = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  font-weight: 700;
`;

const ScholarshipDescription = styled.p`
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
  color: #4ecdc4;
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
  border: 3px solid #4ecdc4;
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
  background: linear-gradient(45deg, rgba(78, 205, 196, 0.8), rgba(68, 160, 141, 0.8));
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
    background: url('https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/elimisha-contact-pattern.jpg') center/cover;
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
    color: #4ecdc4;
    font-size: 2rem;
  }
`;

const Elimisha = () => {
  const programs = [
    {
      icon: <FaGraduationCap />,
      title: "Scholarship Programs",
      description: "Full and partial scholarships for girls and young women to access quality education from primary to university level.",
      features: [
        "Primary & Secondary Education Support",
        "University Scholarships Available",
        "Vocational Training Programs",
        "Study Materials & Supplies Provided",
        "Transportation Support Included"
      ]
    },
    {
      icon: <FaUsers />,
      title: "Mentorship Program",
      description: "One-on-one and group mentorship to guide young women through their educational journey and career development.",
      features: [
        "Academic Mentoring Sessions",
        "Career Guidance & Planning",
        "Life Skills Training",
        "Leadership Development",
        "Peer Support Groups"
      ]
    },
    {
      icon: <FaHandsHelping />,
      title: "Apprenticeship Program",
      description: "Hands-on training and apprenticeship opportunities in various fields to build practical skills and experience.",
      features: [
        "Technical Skills Training",
        "Industry Partnerships",
        "On-the-job Experience",
        "Certification Programs",
        "Job Placement Support"
      ]
    }
  ];

  const stats = [
    { number: "1,200+", label: "Students Supported" },
    { number: "85%", label: "Graduation Rate" },
    { number: "200+", label: "Scholarships Awarded" },
    { number: "15+", label: "Partner Schools" },
    { number: "50+", label: "Mentors" },
    { number: "95%", label: "Success Rate" }
  ];

  const scholarships = [
    {
      icon: <FaAward />,
      title: "Full Scholarship",
      description: "Complete financial support covering tuition, books, uniforms, and other educational expenses for the entire academic year."
    },
    {
      icon: <FaRocket />,
      title: "Merit Scholarship",
      description: "Awarded to students who demonstrate exceptional academic performance and leadership potential in their studies."
    },
    {
      icon: <FaHeart />,
      title: "Need-Based Scholarship",
      description: "Financial assistance for students from vulnerable communities who demonstrate financial need and academic potential."
    }
  ];

  const testimonials = [
    {
      text: "The Elimisha program gave me the opportunity to pursue my dreams. I'm now studying medicine at university, something I never thought possible. Thank you for believing in me.",
      author: "Mary W.",
      title: "Medical Student",
      image: "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/elimisha-testimonial-1.jpg",
      rating: 5
    },
    {
      text: "Through the mentorship program, I gained confidence and leadership skills that helped me become the head girl at my school. I'm now a role model for other girls.",
      author: "Grace M.",
      title: "High School Graduate",
      image: "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/elimisha-testimonial-2.jpg",
      rating: 5
    },
    {
      text: "The apprenticeship program connected me with industry professionals and helped me secure a job in my field of interest. I'm now financially independent.",
      author: "Sarah K.",
      title: "Program Graduate",
      image: "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/elimisha-testimonial-3.jpg",
      rating: 5
    }
  ];

  const galleryImages = [
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/elimisha-1.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/elimisha-2.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/elimisha-3.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/elimisha-4.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/elimisha-5.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/elimisha-6.jpg"
  ];

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <HeroTitle>The Rebirth Elimisha Program</HeroTitle>
          <HeroSubtitle>
            Empowering girls and young women through quality education, mentorship, and comprehensive skills training
          </HeroSubtitle>
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now <FaArrowRight />
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionTitle>Our Educational Programs</SectionTitle>
        <ProgramsGrid>
          {programs.map((program, index) => (
            <ProgramCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProgramIcon>{program.icon}</ProgramIcon>
              <ProgramTitle>{program.title}</ProgramTitle>
              <ProgramDescription>{program.description}</ProgramDescription>
              <ProgramFeatures>
                {program.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ProgramFeatures>
            </ProgramCard>
          ))}
        </ProgramsGrid>
      </Section>

      <StatsSection>
        <SectionTitle style={{ color: 'white' }}>Our Educational Impact</SectionTitle>
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
        <SectionTitle>Scholarship Opportunities</SectionTitle>
        <ScholarshipSection>
          <ScholarshipGrid>
            {scholarships.map((scholarship, index) => (
              <ScholarshipCard
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <ScholarshipIcon>{scholarship.icon}</ScholarshipIcon>
                <ScholarshipTitle>{scholarship.title}</ScholarshipTitle>
                <ScholarshipDescription>{scholarship.description}</ScholarshipDescription>
              </ScholarshipCard>
            ))}
          </ScholarshipGrid>
        </ScholarshipSection>
      </Section>

      <Section>
        <SectionTitle>Success Stories</SectionTitle>
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
        <SectionTitle>Learning in Action</SectionTitle>
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
                <img src={image} alt={`Elimisha Program ${index + 1}`} />
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
          <SectionTitle style={{ color: 'white' }}>Apply Now</SectionTitle>
          <p style={{ fontSize: '1.3rem', marginBottom: '3rem', opacity: 0.9 }}>
            Ready to transform your future through education? Join our Elimisha program today.
          </p>
          <ContactGrid>
            <ContactItem>
              <FaPhone />
              <div>
                <div style={{ fontWeight: '700', fontSize: '1.2rem' }}>Admissions Office</div>
                <div style={{ fontSize: '1.1rem' }}>+254 720 339 204</div>
              </div>
            </ContactItem>
            <ContactItem>
              <FaEnvelope />
              <div>
                <div style={{ fontWeight: '700', fontSize: '1.2rem' }}>Email Applications</div>
                <div style={{ fontSize: '1.1rem' }}>elimisha@rebirthofaqueen.org</div>
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

export default Elimisha;