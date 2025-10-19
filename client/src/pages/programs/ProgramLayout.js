import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowRight,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

// Modern Animations
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
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(102, 126, 234, 0.6);
  }
`;

// Modern Styled Components
const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
`;

const Hero = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
  color: white;
  text-align: center;
  padding: 2rem;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://res.cloudinary.com/samokello/image/upload/v1720000000/rebirth/programs/hero-pattern.jpg') center/cover;
    opacity: 0.1;
    z-index: 1;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const HeroContent = styled.div`
  animation: ${fadeInUp} 1s ease-out;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
  background: linear-gradient(45deg, #fff, #667eea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeInUp} 1s ease-out;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  line-height: 1.6;
  animation: ${fadeInUp} 1.2s ease-out;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  padding: 1.5rem 3rem;
  font-size: 1.3rem;
  font-weight: 700;
  border-radius: 50px;
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  animation: ${glow} 3s infinite;
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 20px 50px rgba(102, 126, 234, 0.6);
  }
`;

const MainContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 6rem 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 3rem;
  margin-top: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 70px rgba(0,0,0,0.15);
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 1.8rem;
  margin: 0 0 1.5rem 0;
  color: #2c3e50;
  font-weight: 700;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    border-radius: 2px;
    animation: ${fadeInUp} 0.8s ease-out;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const ImpactCard = styled(motion.div)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  padding: 2rem;
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
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="white" opacity="0.1"/></svg>');
    opacity: 0.3;
  }
`;

const ImpactNumber = styled(motion.div)`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  animation: ${bounce} 2s infinite;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ImpactLabel = styled(motion.div)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Story = styled(motion.div)`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 2rem;
  align-items: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 2rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(10px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.1);
  }
`;

const StoryImg = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;
  
  ${Story}:hover & {
    transform: scale(1.05);
  }
`;

const StoryTitle = styled(motion.h3)`
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: #2c3e50;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const StoryText = styled(motion.p)`
  color: #666;
  line-height: 1.8;
  font-size: 0.95rem;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Badge = styled(motion.span)`
  font-size: 0.85rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-weight: 600;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
`;

const CTA = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  text-decoration: none;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 10px 30px rgba(231, 76, 60, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(231, 76, 60, 0.4);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled(motion.div)`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(45deg, #667eea, #764ba2);
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.1);
  }
`;

const FeatureTitle = styled(motion.div)`
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  &::before {
    content: '✓';
    color: #667eea;
    font-weight: bold;
    font-size: 1.2rem;
    animation: ${bounce} 2s infinite;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FeatureText = styled(motion.div)`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.8;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const FAQItem = styled(motion.div)`
  border: 1px solid rgba(102, 126, 234, 0.1);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  overflow: hidden;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }
`;

const FAQHeader = styled.button`
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  padding: 2rem;
  font-weight: 700;
  color: #2c3e50;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(102, 126, 234, 0.05);
  }
`;

const FAQBody = styled(motion.div)`
  padding: 0 2rem 2rem 2rem;
  color: #666;
  font-size: 0.95rem;
  line-height: 1.8;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;


export default function ProgramLayout({
  title,
  intro,
  impact = [], // [{label, value}]
  stories = [], // [{title, text, image}]
  sdgs = [], // ["Quality Education", ...]
  cta = { label: 'Donate', href: '/donate' },
  features = [], // [{title, text}]
  faqs = [], // [{q, a}]
  children
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  
  return (
    <Page>
      <Hero>
        <Container>
          <HeroContent>
            <HeroTitle
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {title}
            </HeroTitle>
            {intro && (
              <HeroSubtitle
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {intro}
              </HeroSubtitle>
            )}
            {cta && (
              <CTAButton
                href={cta.href}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 60px rgba(102, 126, 234, 0.7)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {cta.label} <FaArrowRight />
              </CTAButton>
            )}
          </HeroContent>
        </Container>
      </Hero>

      <MainContent>
        <Container>
          <Grid>
            <div>
              <Card
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <SectionTitle
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Program Overview
                </SectionTitle>
                <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555' }}>
                  {children}
                </div>
              </Card>

              {features?.length > 0 && (
                <Card
                  style={{ marginTop: '2rem' }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <SectionTitle
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Key Focus Areas
                  </SectionTitle>
                  <FeaturesGrid>
                    {features.map((f, i) => (
                      <FeatureCard
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <FeatureTitle>{f.title}</FeatureTitle>
                        <FeatureText>{f.text}</FeatureText>
                      </FeatureCard>
                    ))}
                  </FeaturesGrid>
                </Card>
              )}

              {stories?.length > 0 && (
                <Card
                  style={{ marginTop: '2rem' }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <SectionTitle
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    Stories of Impact
                  </SectionTitle>
                  <div style={{ display: 'grid', gap: '2rem' }}>
                    {stories.map((s, i) => (
                      <Story
                        key={i}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.2 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {s.image ? <StoryImg src={s.image} alt={s.title} /> : <div />}
                        <div>
                          <StoryTitle>{s.title}</StoryTitle>
                          <StoryText>{s.text}</StoryText>
                        </div>
                      </Story>
                    ))}
                  </div>
                </Card>
              )}

              {faqs?.length > 0 && (
                <Card
                  style={{ marginTop: '2rem' }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <SectionTitle
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    Frequently Asked Questions
                  </SectionTitle>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {faqs.map((f, i) => (
                      <FAQItem
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <FAQHeader 
                          onClick={() => setOpenFaqIndex(openFaqIndex === i ? -1 : i)} 
                          aria-expanded={openFaqIndex === i}
                        >
                          <span>{f.q}</span>
                          <span>{openFaqIndex === i ? <FaChevronUp /> : <FaChevronDown />}</span>
                        </FAQHeader>
                        <AnimatePresence>
                          {openFaqIndex === i && (
                            <FAQBody
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {f.a}
                            </FAQBody>
                          )}
                        </AnimatePresence>
                      </FAQItem>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            <div>
              {impact?.length > 0 && (
                <Card
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <SectionTitle
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Impact in Numbers
                  </SectionTitle>
                  <ImpactGrid>
                    {impact.map((m, i) => (
                      <ImpactCard
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <ImpactNumber>{m.value}</ImpactNumber>
                        <ImpactLabel>{m.label}</ImpactLabel>
                      </ImpactCard>
                    ))}
                  </ImpactGrid>
                </Card>
              )}

              {sdgs?.length > 0 && (
                <Card
                  style={{ marginTop: '2rem' }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <SectionTitle
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Supporting the SDGs
                  </SectionTitle>
                  <BadgeRow>
                    {sdgs.map((b, i) => (
                      <Badge
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {b}
                      </Badge>
                    ))}
                  </BadgeRow>
                </Card>
              )}

              {cta && (
                <Card
                  style={{ marginTop: '2rem', textAlign: 'center' }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <SectionTitle
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    Take Action
                  </SectionTitle>
                  <CTA
                    href={cta.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cta.label} <FaArrowRight />
                  </CTA>
                </Card>
              )}
            </div>
          </Grid>
        </Container>
      </MainContent>
    </Page>
  );
}


