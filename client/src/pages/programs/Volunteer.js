import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaHeart, 
  FaHandsHelping, 
  FaGlobe, 
  FaArrowRight,
  FaPlay,
  FaQuoteLeft,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLightbulb,
  FaRocket,
  FaAward
} from 'react-icons/fa';

// Unique Animations for Volunteer Program
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

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 236, 210, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 236, 210, 0.6);
  }
`;

const wiggle = keyframes`
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

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #a8edea 100%);
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
              url('https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/volunteer-hero.jpg') center/cover;
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
  background: linear-gradient(45deg, #fff, #ffecd2);
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
  background: linear-gradient(45deg, #ffecd2, #fcb69f);
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
  box-shadow: 0 15px 40px rgba(255, 236, 210, 0.4);
  transition: all 0.3s ease;
  animation: ${glow} 3s infinite;
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 20px 50px rgba(255, 236, 210, 0.6);
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
    background: linear-gradient(45deg, #ffecd2, #fcb69f);
    border-radius: 3px;
  }
`;

const VolunteerTypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  margin-bottom: 6rem;
`;

const VolunteerCard = styled(motion.div)`
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
    background: linear-gradient(45deg, #ffecd2, #fcb69f);
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 70px rgba(0,0,0,0.2);
  }
`;

const VolunteerIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #ffecd2, #fcb69f);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: #2c3e50;
  font-size: 2.5rem;
  animation: ${bounce} 2s infinite;
  box-shadow: 0 10px 30px rgba(255, 236, 210, 0.3);
`;

const VolunteerTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-weight: 700;
`;

const VolunteerDescription = styled.p`
  color: #666;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const VolunteerFeatures = styled.ul`
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
      color: #fcb69f;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
`;

const StatsSection = styled.div`
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
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
    background: url('https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/volunteer-pattern.jpg') center/cover;
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

const BenefitsSection = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 6rem 2rem;
  border-radius: 30px;
  margin: 6rem 0;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
`;

const BenefitCard = styled(motion.div)`
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
    background: linear-gradient(45deg, #ffecd2, #fcb69f);
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0,0,0,0.15);
  }
`;

const BenefitIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #ffecd2, #fcb69f);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #2c3e50;
  font-size: 2rem;
  animation: ${wiggle} 2s infinite;
`;

const BenefitTitle = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  font-weight: 700;
`;

const BenefitDescription = styled.p`
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
  color: #fcb69f;
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
  border: 3px solid #fcb69f;
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
  background: linear-gradient(45deg, rgba(255, 236, 210, 0.8), rgba(252, 182, 159, 0.8));
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
    background: url('https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/volunteer-contact-pattern.jpg') center/cover;
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
    color: #fcb69f;
    font-size: 2rem;
  }
`;

const Volunteer = () => {
  const volunteerTypes = [
    {
      icon: <FaHandsHelping />,
      title: "Direct Service Volunteers",
      description: "Work directly with beneficiaries in our programs, providing hands-on support and care to children and young women.",
      features: [
        "Mentoring & Tutoring Sessions",
        "Program Support Activities",
        "Community Outreach Programs",
        "Event Coordination & Planning",
        "Administrative Support Tasks"
      ]
    },
    {
      icon: <FaGlobe />,
      title: "International Volunteers",
      description: "Global volunteers bringing diverse skills and perspectives to our programs from around the world.",
      features: [
        "Cross-cultural Exchange Programs",
        "Skills Transfer & Training",
        "Capacity Building Initiatives",
        "Cultural Immersion Experiences",
        "Global Perspective Sharing"
      ]
    },
    {
      icon: <FaLightbulb />,
      title: "Skills-Based Volunteers",
      description: "Professionals offering specialized skills in areas like healthcare, education, and technology to enhance our programs.",
      features: [
        "Professional Expertise Sharing",
        "Skills Training & Development",
        "Consultation Services",
        "Capacity Building Programs",
        "Knowledge Transfer Activities"
      ]
    }
  ];

  const stats = [
    { number: "500+", label: "Active Volunteers" },
    { number: "25+", label: "Countries Represented" },
    { number: "10,000+", label: "Hours Contributed" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "200+", label: "Projects Completed" },
    { number: "50+", label: "Skills Areas" }
  ];

  const benefits = [
    {
      icon: <FaAward />,
      title: "Personal Growth",
      description: "Develop new skills, gain valuable experience, and make a meaningful impact in the community while growing personally."
    },
    {
      icon: <FaRocket />,
      title: "Career Development",
      description: "Build your resume, gain professional experience, expand your network, and develop leadership skills."
    },
    {
      icon: <FaHeart />,
      title: "Community Impact",
      description: "Make a real difference in the lives of vulnerable children and young women while contributing to social change."
    }
  ];

  const testimonials = [
    {
      text: "Volunteering with Rebirth of a Queen has been the most rewarding experience of my life. I've learned so much and made lifelong friendships while making a real difference.",
      author: "Maria S.",
      title: "International Volunteer",
      image: "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/volunteer-testimonial-1.jpg",
      rating: 5
    },
    {
      text: "As a skills-based volunteer, I was able to use my professional expertise to help build capacity and make a lasting impact. It's incredibly fulfilling work.",
      author: "Dr. James K.",
      title: "Healthcare Volunteer",
      image: "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/volunteer-testimonial-2.jpg",
      rating: 5
    },
    {
      text: "The volunteer program gave me the opportunity to give back to my community while developing new skills and friendships. It's been life-changing.",
      author: "Grace M.",
      title: "Local Volunteer",
      image: "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/volunteer-testimonial-3.jpg",
      rating: 5
    }
  ];

  const galleryImages = [
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/volunteer-1.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/volunteer-2.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/volunteer-3.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/volunteer-4.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/volunteer-5.jpg",
    "https://res.cloudinary.com/dq7l8216n/image/upload/v1704067200/rebirth-of-a-queen/volunteer-6.jpg"
  ];

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Volunteer Program</HeroTitle>
          <HeroSubtitle>
            Join our global village of volunteers and be part of transforming lives through compassion and service
          </HeroSubtitle>
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Become a Volunteer <FaArrowRight />
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionTitle>Volunteer Opportunities</SectionTitle>
        <VolunteerTypesGrid>
          {volunteerTypes.map((type, index) => (
            <VolunteerCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <VolunteerIcon>{type.icon}</VolunteerIcon>
              <VolunteerTitle>{type.title}</VolunteerTitle>
              <VolunteerDescription>{type.description}</VolunteerDescription>
              <VolunteerFeatures>
                {type.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </VolunteerFeatures>
            </VolunteerCard>
          ))}
        </VolunteerTypesGrid>
      </Section>

      <StatsSection>
        <SectionTitle style={{ color: '#2c3e50' }}>Our Volunteer Impact</SectionTitle>
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
        <SectionTitle>Benefits of Volunteering</SectionTitle>
        <BenefitsSection>
          <BenefitsGrid>
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <BenefitIcon>{benefit.icon}</BenefitIcon>
                <BenefitTitle>{benefit.title}</BenefitTitle>
                <BenefitDescription>{benefit.description}</BenefitDescription>
              </BenefitCard>
            ))}
          </BenefitsGrid>
        </BenefitsSection>
      </Section>

      <Section>
        <SectionTitle>Volunteer Stories</SectionTitle>
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
        <SectionTitle>Volunteers in Action</SectionTitle>
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
                <img src={image} alt={`Volunteer Program ${index + 1}`} />
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
          <SectionTitle style={{ color: 'white' }}>Join Our Village</SectionTitle>
          <p style={{ fontSize: '1.3rem', marginBottom: '3rem', opacity: 0.9 }}>
            Ready to make a difference? Join our global village of volunteers and be part of the change.
          </p>
          <ContactGrid>
            <ContactItem>
              <FaPhone />
              <div>
                <div style={{ fontWeight: '700', fontSize: '1.2rem' }}>Volunteer Coordinator</div>
                <div style={{ fontSize: '1.1rem' }}>+254 720 339 204</div>
              </div>
            </ContactItem>
            <ContactItem>
              <FaEnvelope />
              <div>
                <div style={{ fontWeight: '700', fontSize: '1.2rem' }}>Email Applications</div>
                <div style={{ fontSize: '1.1rem' }}>volunteer@rebirthofaqueen.org</div>
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

export default Volunteer;