import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTools, 
  FaGraduationCap, 
  FaUsers, 
  FaBriefcase, 
  FaHandsHelping,
  FaArrowRight,
  FaPlay,
  FaQuoteLeft,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCog,
  FaLaptop,
  FaPaintBrush,
  FaUtensils,
  FaCar,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaShare,
  FaCalendar,
  FaClock,
  FaUser,
  FaChalkboard,
  FaMicroscope,
  FaMusic,
  FaGamepad,
  FaCamera,
  FaCode,
  FaGlobe,
  FaTrophy,
  FaCertificate,
  FaSchool,
  FaUniversity,
  FaChartLine,
  FaCheckCircle,
  FaTimes,
  FaBars,
  FaWrench,
  FaHammer,
  FaScrewdriver,
  FaCog as FaGear,
  FaIndustry,
  FaBuilding,
  FaRocket,
  FaFire,
  FaGem,
  FaAward,
  FaMedal
} from 'react-icons/fa';

// Unique Animations for Vocational Training
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

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
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
    box-shadow: 0 0 20px rgba(168, 237, 234, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(168, 237, 234, 0.6);
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

const hammer = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-15deg);
  }
  75% {
    transform: rotate(15deg);
  }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d299c2 100%);
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
              url('https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/vocational-training-hero.jpg') center/cover;
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
  background: linear-gradient(45deg, #fff, #a8edea);
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
  background: linear-gradient(45deg, #a8edea, #fed6e3);
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
  box-shadow: 0 15px 40px rgba(168, 237, 234, 0.4);
  transition: all 0.3s ease;
  animation: ${glow} 3s infinite;
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 20px 50px rgba(168, 237, 234, 0.6);
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
    background: linear-gradient(45deg, #a8edea, #fed6e3);
    border-radius: 3px;
  }
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  margin-bottom: 6rem;
`;

const CourseCard = styled(motion.div)`
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
    background: linear-gradient(45deg, #a8edea, #fed6e3);
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 70px rgba(0,0,0,0.2);
  }
`;

const CourseIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #a8edea, #fed6e3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: #2c3e50;
  font-size: 2.5rem;
  animation: ${rotate} 3s linear infinite;
  box-shadow: 0 10px 30px rgba(168, 237, 234, 0.3);
`;

const CourseTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-weight: 700;
`;

const CourseDescription = styled.p`
  color: #666;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const CourseFeatures = styled.ul`
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
      color: #a8edea;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
`;

const StatsSection = styled.div`
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
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
    background: url('https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/vocational-training-pattern.jpg') center/cover;
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

const TrainingSection = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 6rem 2rem;
  border-radius: 30px;
  margin: 6rem 0;
`;

const TrainingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
`;

const TrainingCard = styled(motion.div)`
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
    background: linear-gradient(45deg, #a8edea, #fed6e3);
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0,0,0,0.15);
  }
`;

const TrainingIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #a8edea, #fed6e3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #2c3e50;
  font-size: 2rem;
  animation: ${hammer} 2s infinite;
`;

const TrainingTitle = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  font-weight: 700;
`;

const TrainingDescription = styled.p`
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
  color: #a8edea;
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
  border: 3px solid #a8edea;
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
  background: linear-gradient(45deg, rgba(168, 237, 234, 0.8), rgba(254, 214, 227, 0.8));
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
    background: url('https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/vocational-training-contact-pattern.jpg') center/cover;
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
    color: #a8edea;
    font-size: 2rem;
  }
`;

const VocationalTraining = () => {
  const courses = [
    {
      icon: <FaTools />,
      title: "Technical Skills Training",
      description: "Comprehensive training in various technical fields including mechanics, electrical work, and construction to build practical skills.",
      features: [
        "Automotive Mechanics & Repair",
        "Electrical Installation & Maintenance",
        "Plumbing & Pipefitting",
        "Construction & Carpentry",
        "Welding & Metalwork"
      ]
    },
    {
      icon: <FaLaptop />,
      title: "Digital Skills",
      description: "Modern digital skills training including computer literacy, programming, and digital marketing for the digital economy.",
      features: [
        "Computer Literacy & Basics",
        "Basic Programming & Coding",
        "Digital Marketing & Social Media",
        "Graphic Design & Multimedia",
        "Web Development & Design"
      ]
    },
    {
      icon: <FaUtensils />,
      title: "Hospitality & Culinary",
      description: "Training in hospitality, culinary arts, and food service management for the growing hospitality industry.",
      features: [
        "Culinary Arts & Cooking",
        "Food Service Management",
        "Hotel Operations & Management",
        "Customer Service Excellence",
        "Event Planning & Coordination"
      ]
    },
    {
      icon: <FaPaintBrush />,
      title: "Creative Arts",
      description: "Training in creative fields including fashion design, beauty, and arts and crafts for creative entrepreneurship.",
      features: [
        "Fashion Design & Tailoring",
        "Beauty & Cosmetology",
        "Arts & Crafts Production",
        "Interior Design & Decoration",
        "Photography & Videography"
      ]
    }
  ];

  const stats = [
    { number: "800+", label: "Students Trained" },
    { number: "75%", label: "Employment Rate" },
    { number: "12+", label: "Training Programs" },
    { number: "50+", label: "Industry Partners" },
    { number: "200+", label: "Certificates Issued" },
    { number: "90%", label: "Job Placement" }
  ];

  const trainingPrograms = [
    {
      icon: <FaBriefcase />,
      title: "Employability Skills",
      description: "Soft skills training including communication, teamwork, and professional development to enhance workplace readiness."
    },
    {
      icon: <FaHandsHelping />,
      title: "On-the-Job Training",
      description: "Practical training opportunities with industry partners and real-world experience in professional environments."
    },
    {
      icon: <FaCertificate />,
      title: "Certification Programs",
      description: "Industry-recognized certification programs to enhance employability and career prospects in various fields."
    }
  ];

  const testimonials = [
    {
      text: "The vocational training program gave me the skills I needed to start my own business. I'm now a successful mechanic in my community with 5 employees.",
      author: "John M.",
      title: "Mechanic & Business Owner",
      image: "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/vocational-testimonial-1.jpg",
      rating: 5
    },
    {
      text: "Through the digital skills training, I learned programming and now work as a web developer. It changed my life completely and gave me financial independence.",
      author: "Sarah K.",
      title: "Web Developer",
      image: "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/vocational-testimonial-2.jpg",
      rating: 5
    },
    {
      text: "The culinary program helped me start my own restaurant. I now employ 15 people and serve my community with delicious, affordable meals.",
      author: "Grace W.",
      title: "Restaurant Owner",
      image: "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/vocational-testimonial-3.jpg",
      rating: 5
    }
  ];

  const galleryImages = [
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/vocational-1.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/vocational-2.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/vocational-3.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/vocational-4.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/vocational-5.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/vocational-6.jpg"
  ];

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Vocational Training Program</HeroTitle>
          <HeroSubtitle>
            Skills training program for young people offering technical skills, employability training, and job placement support
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
        <SectionTitle>Training Courses</SectionTitle>
        <CoursesGrid>
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CourseIcon>{course.icon}</CourseIcon>
              <CourseTitle>{course.title}</CourseTitle>
              <CourseDescription>{course.description}</CourseDescription>
              <CourseFeatures>
                {course.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </CourseFeatures>
            </CourseCard>
          ))}
        </CoursesGrid>
      </Section>

      <StatsSection>
        <SectionTitle style={{ color: '#2c3e50' }}>Our Training Impact</SectionTitle>
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
        <SectionTitle>Training Programs</SectionTitle>
        <TrainingSection>
          <TrainingGrid>
            {trainingPrograms.map((program, index) => (
              <TrainingCard
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <TrainingIcon>{program.icon}</TrainingIcon>
                <TrainingTitle>{program.title}</TrainingTitle>
                <TrainingDescription>{program.description}</TrainingDescription>
              </TrainingCard>
            ))}
          </TrainingGrid>
        </TrainingSection>
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
        <SectionTitle>Training in Action</SectionTitle>
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
                <img src={image} alt={`Vocational Training ${index + 1}`} />
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
          <SectionTitle style={{ color: 'white' }}>Enroll Now</SectionTitle>
          <p style={{ fontSize: '1.3rem', marginBottom: '3rem', opacity: 0.9 }}>
            Ready to learn new skills and build your future? Join our vocational training program today.
          </p>
          <ContactGrid>
            <ContactItem>
              <FaPhone />
              <div>
                <div style={{ fontWeight: '700', fontSize: '1.2rem' }}>Training Center</div>
                <div style={{ fontSize: '1.1rem' }}>+254 720 339 204</div>
              </div>
            </ContactItem>
            <ContactItem>
              <FaEnvelope />
              <div>
                <div style={{ fontWeight: '700', fontSize: '1.2rem' }}>Email Applications</div>
                <div style={{ fontSize: '1.1rem' }}>training@rebirthofaqueen.org</div>
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

export default VocationalTraining;