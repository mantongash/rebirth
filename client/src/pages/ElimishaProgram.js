import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MediaCarousel from '../components/MediaCarousel';
import ProgramBreadcrumb from '../components/ProgramBreadcrumb';
import ProgramSidebar from '../components/ProgramSidebar';
import { 
  FaGlobe,
  FaArrowRight,
  FaPlay,
  FaHandsHelping,
  FaGraduationCap,
  FaUsers,
  FaHeart,
  FaDownload,
  FaUserGraduate,
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
              url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
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
  opacity: 1;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.35);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto 3rem;
  opacity: 0.95;
  color: #ffffff;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.35);
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
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #667eea, #764ba2);
  }

  &::after {
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

    &::after {
      left: 100%;
    }
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

const ElimishaProgram = () => {
  const heroSlides = [
    {
      src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Students in classroom',
      caption: 'Interactive learning that builds strong academic foundations'
    },
    {
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Digital skills training',
      caption: 'Digital skills for the future: coding, creativity, and confidence'
    },
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Teacher development',
      caption: 'Teacher development that elevates learning outcomes'
    }
  ];

  // Local styled blocks for Impact & Support (scoped to this file)
  const ElimishaMetricsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  `;

  const ElimishaMetricCard = styled.div`
    background: #fff;
    border: 1px solid #eef2f7;
    border-radius: 16px;
    padding: 1.25rem 1rem;
    text-align: center;
    box-shadow: 0 6px 18px rgba(0,0,0,0.05);
  `;

  const ElimishaMetricValue = styled.div`
    font-size: 1.8rem;
    font-weight: 800;
    color: #1f2937;
  `;

  const ElimishaMetricLabel = styled.div`
    font-size: 0.95rem;
    color: #6b7280;
    margin-top: 0.25rem;
  `;

  const ElimishaActionsRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    justify-content: center;
  `;

  const ElimishaQuickDonate = styled.div`
    background: linear-gradient(135deg, #f8fbff, #f3f6fb);
    border: 1px solid #e5ecf6;
    border-radius: 16px;
    padding: 1.25rem;
    text-align: center;
  `;

  const ElimishaQuickTitle = styled.h4`
    margin: 0 0 0.75rem 0;
    color: #1f2937;
    font-weight: 700;
  `;

  const ElimishaAmountRow = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
  `;

  const ElimishaAmountChip = styled(Link)`
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

  const ElimishaSmallNote = styled.div`
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
  const programs = [
    {
      icon: <FaGraduationCap />,
      title: "Scholarship Program",
      description: "Comprehensive scholarship support for girls and vulnerable youth to access quality education at all levels.",
      features: [
        "Primary and secondary school scholarships",
        "University and college funding",
        "Educational materials and supplies",
        "Transportation and meal support"
      ]
    },
    {
      icon: <FaUsers />,
      title: "Mentorship Program",
      description: "One-on-one and group mentorship opportunities connecting students with experienced professionals and role models.",
      features: [
        "Academic mentorship and tutoring",
        "Career guidance and counseling",
        "Life skills development",
        "Personal growth support"
      ]
    },
    {
      icon: <FaUserGraduate />,
      title: "Apprenticeship Opportunities",
      description: "Hands-on apprenticeship programs that provide practical work experience and skill development.",
      features: [
        "Industry partnerships for placements",
        "Skill-based training programs",
        "Professional certification support",
        "Employment pathway development"
      ]
    },
    {
      icon: <FaGlobe />,
      title: "Community Outreach Education",
      description: "Educational programs that reach underserved communities and provide learning opportunities for all.",
      features: [
        "Mobile learning centers",
        "Community education workshops",
        "Literacy and numeracy programs",
        "Parent and caregiver education"
      ]
    }
  ];

  const stats = [
    { number: "2,500+", label: "Students Enrolled" },
    { number: "150+", label: "Teachers Trained" },
    { number: "95%", label: "Graduation Rate" },
    { number: "85%", label: "Employment Rate" }
  ];

  const testimonials = [
    {
      text: "The Elimisha Program transformed my life. I went from struggling with basic reading to becoming a confident student with dreams of becoming a teacher.",
      author: "Sarah Mwangi",
      role: "Former Student, Now Teacher"
    },
    {
      text: "As a teacher, the training I received through Elimisha helped me become more effective in the classroom. My students are more engaged and learning better.",
      author: "John Kimani",
      role: "Primary School Teacher"
    },
    {
      text: "The digital skills I learned opened doors I never thought possible. I now work as a web developer and help other young people learn technology.",
      author: "Grace Wanjiku",
      role: "Web Developer & Mentor"
    }
  ];

  return (
    <PageContainer>
      <ProgramBreadcrumb items={[
        { label: 'Programs', to: '/programs' },
        { label: 'The Rebirth Elimisha Program' }
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
            Empowering Through Education
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            The Rebirth Elimisha Program
          </HeroSubtitle>
          <HeroDescription
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            The Elimisha Program is our flagship education initiative that provides quality education, 
            digital skills training, and teacher development programs. We believe that education is the 
            key to breaking the cycle of poverty and creating lasting change in communities.
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
              Enroll Now <FaArrowRight />
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
          <MediaCarousel items={heroSlides} />
        </Container>
      </ContentSection>

      {/* Program Overview Section */}
      <ContentSection style={{ background: '#f8f9fa' }}>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Program Description
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
              The Rebirth Elimisha Program provides education, mentorship, and scholarships for girls and vulnerable youth 
              across Kenya. We believe that education is the key to breaking the cycle of poverty and creating lasting 
              change in communities.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>Who We Serve:</strong> Girls and young women from vulnerable backgrounds, including those affected by 
              poverty, gender-based violence, or displacement. We also serve vulnerable youth who face barriers to 
              accessing quality education.
            </p>
            <p>
              <strong>Why It Matters:</strong> Education empowers individuals to make informed choices, access better 
              opportunities, and contribute meaningfully to their communities. Through our comprehensive programs, we ensure 
              that every child has the chance to learn, grow, and succeed.
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
            Core Components
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

      <TestimonialSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Success Stories
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
            Education in Action
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
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Students in classroom"
              />
              <GalleryOverlay>
                <GalleryTitle>Interactive Learning</GalleryTitle>
                <GalleryDescription>Students engaged in modern educational activities</GalleryDescription>
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
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Digital skills training"
              />
              <GalleryOverlay>
                <GalleryTitle>Digital Skills</GalleryTitle>
                <GalleryDescription>Students learning modern technology and computer skills</GalleryDescription>
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
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Teacher training"
              />
              <GalleryOverlay>
                <GalleryTitle>Teacher Development</GalleryTitle>
                <GalleryDescription>Professional development programs for educators</GalleryDescription>
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

      {/* Program Metrics + Report + Donation */}
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

          <ElimishaMetricsGrid
            as={motion.div}
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ElimishaMetricCard>
              <ElimishaMetricValue>45</ElimishaMetricValue>
              <ElimishaMetricLabel>Students on Scholarships</ElimishaMetricLabel>
            </ElimishaMetricCard>
            <ElimishaMetricCard>
              <ElimishaMetricValue>120+</ElimishaMetricValue>
              <ElimishaMetricLabel>Active Mentors</ElimishaMetricLabel>
            </ElimishaMetricCard>
            <ElimishaMetricCard>
              <ElimishaMetricValue>85%</ElimishaMetricValue>
              <ElimishaMetricLabel>Graduate Placement</ElimishaMetricLabel>
            </ElimishaMetricCard>
            <ElimishaMetricCard>
              <ElimishaMetricValue>25+</ElimishaMetricValue>
              <ElimishaMetricLabel>Schools Partnered</ElimishaMetricLabel>
            </ElimishaMetricCard>
          </ElimishaMetricsGrid>

          <ElimishaActionsRow>
            <CTAButton
              as={Link}
              to="/donate?program=elimisha"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Sponsor a Student
            </CTAButton>
            <SecondaryButton
              as={Link}
              to="/contact?intent=mentor"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Become a Mentor
            </SecondaryButton>
            <SecondaryButton
              as={Link}
              to="/reports/elimisha-program.pdf"
              target="_blank"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaDownload /> Download Program Report
            </SecondaryButton>
            <SecondaryButton
              as={Link}
              to="/contact?intent=partner"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Partner with Us
            </SecondaryButton>
          </ElimishaActionsRow>

          <ElimishaQuickDonate
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <ElimishaQuickTitle>Quick Donate</ElimishaQuickTitle>
            <ElimishaAmountRow>
              {['1000', '2500', '5000', '10000'].map(a => (
                <ElimishaAmountChip key={a} to={`/donate?program=elimisha&amount=${a}`}>KES {a}</ElimishaAmountChip>
              ))}
            </ElimishaAmountRow>
            <ElimishaSmallNote>Your gift funds scholarships, mentorship, and apprenticeships.</ElimishaSmallNote>
          </ElimishaQuickDonate>
        </Container>
      </ContentSection>
      {/* Enhanced Testimonial Section */}
      <ContentSection style={{ background: '#f8f9fa' }}>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Student Success Stories
          </SectionTitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              maxWidth: '900px',
              margin: '0 auto 3rem',
              background: 'white',
              padding: '3rem',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid #eef2f7'
            }}
          >
            <FaQuoteLeft style={{ color: '#667eea', fontSize: '3rem', marginBottom: '1.5rem' }} />
            <p style={{ 
              color: '#5a6c7d', 
              lineHeight: '1.8', 
              fontSize: '1.2rem',
              fontStyle: 'italic',
              marginBottom: '2rem'
            }}>
              "I was a young girl from a poor family with no hope of continuing my education. The Elimisha Program 
              provided me with a scholarship that covered my school fees, books, and even transportation. Through 
              the mentorship program, I found a mentor who guided me through my studies and helped me discover my 
              passion for teaching. Today, I'm a teacher at a primary school, and I'm also mentoring other girls 
              through the Elimisha Program. Education truly changed my life, and I'm grateful for the opportunity 
              to pass that gift on to others."
            </p>
            <div style={{ borderTop: '1px solid #eef2f7', paddingTop: '1.5rem' }}>
              <strong style={{ color: '#2c3e50', display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                Jane Wanjiru
              </strong>
              <span style={{ color: '#667eea', fontSize: '1rem' }}>
                Former Elimisha Scholar, Now Teacher & Mentor
              </span>
            </div>
          </motion.div>
        </Container>
      </ContentSection>

      <PartnersSection>
        <Container>
          <PartnersStrip>
            {['UNICEF', 'WHO', 'UNESCO', 'Microsoft', 'Safaricom', 'Google'].map(name => (
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
                title: 'Raising Authentic Voices',
                description: 'Advocacy on menstrual health, GBV prevention, and human trafficking awareness.',
                link: '/programs/authentic-voices',
                icon: <FaUsers />
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

export default ElimishaProgram;
