import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MediaCarousel from '../components/MediaCarousel';
import ProgramBreadcrumb from '../components/ProgramBreadcrumb';
import ProgramSidebar from '../components/ProgramSidebar';
import { 
  FaVideo, 
  FaArrowRight,
  FaPlay,
  FaUsers,
  FaHeart,
  FaHandsHelping,
  FaDownload,
  FaCalendarAlt,
  FaFileDownload,
  FaBullhorn,
  FaShieldAlt
} from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  margin: 0;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.85), rgba(118, 75, 162, 0.85)), 
              url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
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

const InitiativeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const InitiativeCard = styled(motion.div)`
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

const InitiativeIcon = styled.div`
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

const InitiativeTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const InitiativeDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const InitiativeFeatures = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
`;

const InitiativeFeature = styled.li`
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

const ImpactSection = styled.section`
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 5rem 2rem;
  color: white;
`;

const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const ImpactCard = styled(motion.div)`
  text-align: center;
`;

const ImpactNumber = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #ffd700;
`;

const ImpactLabel = styled.div`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const StorySection = styled.section`
  padding: 5rem 2rem;
  background: #f8f9fa;
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const StoryCard = styled(motion.div)`
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

const StoryText = styled.p`
  font-style: italic;
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const StoryAuthor = styled.div`
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.1rem;
`;

const StoryRole = styled.div`
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

const AuthenticVoices = () => {
  const highlightSlides = [
    {
      src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Storytelling workshop',
      caption: 'Storytelling workshops empowering youth to share their voices'
    },
    {
      src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Podcasting session',
      caption: 'Podcasting sessions that amplify perspectives for change'
    },
    {
      src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Creative writing',
      caption: 'Creative writing that transforms experiences into impact'
    }
  ];
  const initiatives = [
    {
      icon: <FaBullhorn />,
      title: "Community Awareness Forums",
      description: "Organizing community forums and workshops to raise awareness about menstrual health, GBV prevention, and human trafficking.",
      features: [
        "Monthly community forums",
        "Interactive awareness workshops",
        "Educational presentations",
        "Q&A sessions and discussions"
      ]
    },
    {
      icon: <FaUsers />,
      title: "Training Community Champions",
      description: "Training community members to become champions who advocate for menstrual health, GBV prevention, and anti-trafficking in their communities.",
      features: [
        "Comprehensive champion training",
        "Leadership development programs",
        "Advocacy skill building",
        "Ongoing mentorship and support"
      ]
    },
    {
      icon: <FaHeart />,
      title: "Menstrual Health Campaigns",
      description: "Running campaigns to break stigma around menstruation and ensure access to menstrual health products and education.",
      features: [
        "Menstrual health education",
        "Product distribution programs",
        "Stigma reduction campaigns",
        "School-based initiatives"
      ]
    },
    {
      icon: <FaShieldAlt />,
      title: "GBV & Human Rights Advocacy",
      description: "Advocating for human rights and raising awareness about gender-based violence and human trafficking prevention.",
      features: [
        "GBV prevention workshops",
        "Human trafficking awareness",
        "Legal rights education",
        "Support services referrals"
      ]
    }
  ];

  const impactStats = [
    { number: "500+", label: "Stories Shared" },
    { number: "200+", label: "Youth Trained" },
    { number: "50+", label: "Communities Reached" },
    { number: "1M+", label: "Online Views" }
  ];

  const successStories = [
    {
      text: "Through the Authentic Voices program, I learned to share my story of overcoming adversity. My podcast now reaches thousands of young people who face similar challenges.",
      author: "Maria Santos",
      role: "Youth Advocate & Podcaster"
    },
    {
      text: "The creative writing workshops helped me find my voice and express my experiences as a young woman in my community. I now mentor other young writers.",
      author: "Aisha Hassan",
      role: "Writer & Mentor"
    },
    {
      text: "The photography program taught me to capture the beauty and struggles of my community. My photos have been featured in local exhibitions and online campaigns.",
      author: "David Kimani",
      role: "Photographer & Activist"
    }
  ];

  return (
    <PageContainer>
      <ProgramBreadcrumb items={[
        { label: 'Programs', to: '/programs' },
        { label: 'Raising Authentic Voices' }
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
            Raising Authentic Voices
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Empowering Communities Through Advocacy
          </HeroSubtitle>
          <HeroDescription
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Raising Authentic Voices is our advocacy and mentorship program focused on menstrual health, 
            gender-based violence prevention, and human trafficking awareness. We empower communities 
            through education, awareness campaigns, and champion training.
          </HeroDescription>
          <ButtonGroup>
            <CTAButton
              as={Link}
              to="/contact?intent=champion"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join the Movement <FaArrowRight />
            </CTAButton>
            <SecondaryButton
              as={Link}
              to="/volunteer?role=community-champion"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Become a Community Champion <FaUsers />
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
            About the Program
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
              Raising Authentic Voices is our advocacy and mentorship program focused on menstrual health, 
              gender-based violence prevention, and human trafficking awareness. We work to empower 
              communities through education, awareness campaigns, and champion training.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>Objectives:</strong> To raise awareness about menstrual health, prevent gender-based 
              violence, combat human trafficking, and empower communities through education and advocacy. 
              We train community champions who can advocate for these causes in their own communities.
            </p>
            <p>
              <strong>Community Impact:</strong> Through our programs, we've trained over 500 community 
              champions who have reached thousands of people across Kenya. Our awareness campaigns have 
              broken down stigma around menstruation and empowered communities to stand against GBV and trafficking.
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
            Key Activities
          </SectionTitle>
          
          <InitiativeGrid>
            {initiatives.map((initiative, index) => (
              <InitiativeCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <InitiativeIcon>{initiative.icon}</InitiativeIcon>
                <InitiativeTitle>{initiative.title}</InitiativeTitle>
                <InitiativeDescription>{initiative.description}</InitiativeDescription>
                <InitiativeFeatures>
                  {initiative.features.map((feature, idx) => (
                    <InitiativeFeature key={idx}>{feature}</InitiativeFeature>
                  ))}
                </InitiativeFeatures>
              </InitiativeCard>
            ))}
          </InitiativeGrid>
        </Container>
      </ContentSection>

      <ImpactSection>
        <Container>
          <SectionTitle
            style={{ color: 'white', marginBottom: '4rem' }}
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Impact
          </SectionTitle>
          
          <ImpactGrid>
            {impactStats.map((stat, index) => (
              <ImpactCard
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ImpactNumber>{stat.number}</ImpactNumber>
                <ImpactLabel>{stat.label}</ImpactLabel>
              </ImpactCard>
            ))}
          </ImpactGrid>
        </Container>
      </ImpactSection>

      <StorySection>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Success Stories
          </SectionTitle>
          
          <StoryGrid>
            {successStories.map((story, index) => (
              <StoryCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StoryText>{story.text}</StoryText>
                <StoryAuthor>{story.author}</StoryAuthor>
                <StoryRole>{story.role}</StoryRole>
              </StoryCard>
            ))}
          </StoryGrid>
        </Container>
      </StorySection>

      <ImageGallery>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Creative Voices in Action
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
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Youth storytelling workshop"
              />
              <GalleryOverlay>
                <GalleryTitle>Storytelling Workshop</GalleryTitle>
                <GalleryDescription>Young people learning to share their stories through creative expression</GalleryDescription>
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
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Podcast recording session"
              />
              <GalleryOverlay>
                <GalleryTitle>Podcast Recording</GalleryTitle>
                <GalleryDescription>Youth creating audio content to share their perspectives</GalleryDescription>
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
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Creative writing session"
              />
              <GalleryOverlay>
                <GalleryTitle>Creative Writing</GalleryTitle>
                <GalleryDescription>Young writers expressing their thoughts and experiences</GalleryDescription>
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
            Watch Our Stories
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

          <AVMetricsGrid
            as={motion.div}
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AVMetricCard>
              <AVMetricValue>500+</AVMetricValue>
              <AVMetricLabel>Youth Trained</AVMetricLabel>
            </AVMetricCard>
            <AVMetricCard>
              <AVMetricValue>12</AVMetricValue>
              <AVMetricLabel>Counties Reached</AVMetricLabel>
            </AVMetricCard>
            <AVMetricCard>
              <AVMetricValue>500+</AVMetricValue>
              <AVMetricLabel>Community Champions Trained</AVMetricLabel>
            </AVMetricCard>
            <AVMetricCard>
              <AVMetricValue>100K+</AVMetricValue>
              <AVMetricLabel>Online Reach</AVMetricLabel>
            </AVMetricCard>
          </AVMetricsGrid>

          <AVActionsRow>
            <CTAButton
              as={Link}
              to="/volunteer?role=community-champion"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Join as a Community Champion
            </CTAButton>
            <SecondaryButton
              as={Link}
              to="/donate?program=authentic-voices"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Support Awareness Work
            </SecondaryButton>
            <SecondaryButton
              as={Link}
              to="/reports/raising-authentic-voices.pdf"
              target="_blank"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaDownload /> Download Program Report
            </SecondaryButton>
          </AVActionsRow>

          <AVQuickDonate
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <AVQuickTitle>Quick Donate</AVQuickTitle>
            <AVAmountRow>
              {['1000', '3000', '5000', '10000'].map(a => (
                <AVAmountChip key={a} to={`/donate?program=authentic-voices&amount=${a}`}>KES {a}</AVAmountChip>
              ))}
            </AVAmountRow>
            <AVSmallNote>Your gift funds campaigns, training, and advocacy.</AVSmallNote>
          </AVQuickDonate>
        </Container>
      </ContentSection>
      {/* Resources Section */}
      <ContentSection style={{ background: '#f8f9fa' }}>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Resources
          </SectionTitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}
          >
            {[
              { title: 'Menstrual Health Flyer', type: 'PDF', icon: <FaFileDownload /> },
              { title: 'GBV Prevention Guide', type: 'PDF', icon: <FaFileDownload /> },
              { title: 'Human Trafficking Awareness Video', type: 'Video', icon: <FaVideo /> },
              { title: 'Community Champion Handbook', type: 'PDF', icon: <FaFileDownload /> }
            ].map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #eef2f7',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
              >
                <div style={{ color: '#667eea', fontSize: '2rem', marginBottom: '1rem' }}>
                  {resource.icon}
                </div>
                <h4 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>{resource.title}</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{resource.type}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </ContentSection>

      {/* Events Calendar Section */}
      <ContentSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Upcoming Advocacy Events
          </SectionTitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}
          >
            {[
              { title: 'Community Awareness Forum', date: 'March 15, 2024', location: 'Nairobi', type: 'Forum' },
              { title: 'Menstrual Health Campaign', date: 'March 20, 2024', location: 'Kisumu', type: 'Campaign' },
              { title: 'GBV Prevention Workshop', date: 'March 25, 2024', location: 'Mombasa', type: 'Workshop' },
              { title: 'Champion Training Session', date: 'April 1, 2024', location: 'Nairobi', type: 'Training' }
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #eef2f7'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <FaCalendarAlt style={{ color: '#667eea', fontSize: '1.5rem' }} />
                  <div>
                    <h4 style={{ color: '#2c3e50', margin: 0 }}>{event.title}</h4>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '0.25rem 0 0 0' }}>{event.type}</p>
                  </div>
                </div>
                <p style={{ color: '#5a6c7d', marginBottom: '0.5rem' }}>
                  <strong>Date:</strong> {event.date}
                </p>
                <p style={{ color: '#5a6c7d', margin: 0 }}>
                  <strong>Location:</strong> {event.location}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </ContentSection>

      <PartnersSection>
        <Container>
          <PartnersStrip>
            {['UNICEF', 'UNFPA', 'UNESCO', 'UN Women', 'Plan Intl', 'BBC Media'].map(name => (
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
          <InitiativeGrid>
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
                <InitiativeCard as={Link} to={program.link} style={{ textDecoration: 'none', display: 'block' }}>
                  <InitiativeIcon>{program.icon}</InitiativeIcon>
                  <InitiativeTitle>{program.title}</InitiativeTitle>
                  <InitiativeDescription>{program.description}</InitiativeDescription>
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
                </InitiativeCard>
              </motion.div>
            ))}
          </InitiativeGrid>
        </Container>
      </ContentSection>
    </PageContainer>
  );
};

// Local styled blocks for Impact & Support
const AVMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const AVMetricCard = styled.div`
  background: #fff;
  border: 1px solid #eef2f7;
  border-radius: 16px;
  padding: 1.25rem 1rem;
  text-align: center;
  box-shadow: 0 6px 18px rgba(0,0,0,0.05);
`;

const AVMetricValue = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: #1f2937;
`;

const AVMetricLabel = styled.div`
  font-size: 0.95rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const AVActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  justify-content: center;
`;

const AVQuickDonate = styled.div`
  background: linear-gradient(135deg, #f8fbff, #f3f6fb);
  border: 1px solid #e5ecf6;
  border-radius: 16px;
  padding: 1.25rem;
  text-align: center;
`;

const AVQuickTitle = styled.h4`
  margin: 0 0 0.75rem 0;
  color: #1f2937;
  font-weight: 700;
`;

const AVAmountRow = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

const AVAmountChip = styled(Link)`
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

const AVSmallNote = styled.div`
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

export default AuthenticVoices;
