import React, { useState } from 'react';
import styled from 'styled-components';

const Page = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Hero = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroTitle = styled.h1`
  margin: 0 0 10px 0;
  font-size: 36px;
  font-weight: 800;
`;

const HeroSubtitle = styled.p`
  margin: 0;
  opacity: 0.95;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 24px;
  margin-top: 30px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  padding: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  margin: 0 0 14px 0;
  color: #2c3e50;
`;

const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 14px;
`;

const ImpactCard = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 16px;
`;

const ImpactNumber = styled.div`
  font-size: 26px;
  font-weight: 800;
  color: #667eea;
`;

const ImpactLabel = styled.div`
  color: #666;
  font-size: 13px;
`;

const Story = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 14px;
  align-items: center;
`;

const StoryImg = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
`;

const StoryTitle = styled.h3`
  margin: 0 0 6px 0;
  font-size: 16px;
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Badge = styled.span`
  font-size: 12px;
  background: #eef2ff;
  color: #4654d3;
  padding: 6px 10px;
  border-radius: 999px;
`;

const CTA = styled.a`
  display: inline-block;
  margin-top: 12px;
  background: #e74c3c;
  color: white;
  text-decoration: none;
  padding: 10px 14px;
  border-radius: 8px;
  font-weight: 700;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
`;

const FeatureCard = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 14px;
  border: 1px solid #edf1f5;
`;

const FeatureTitle = styled.div`
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 6px;
`;

const FeatureText = styled.div`
  color: #667;
  font-size: 14px;
`;

const FAQItem = styled.div`
  border: 1px solid #edf1f5;
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
`;

const FAQHeader = styled.button`
  width: 100%;
  text-align: left;
  background: #fff;
  border: none;
  padding: 14px;
  font-weight: 700;
  color: #2c3e50;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FAQBody = styled.div`
  padding: 0 14px 14px 14px;
  color: #667;
  font-size: 14px;
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
          <HeroTitle>{title}</HeroTitle>
          {intro && <HeroSubtitle>{intro}</HeroSubtitle>}
        </Container>
      </Hero>

      <Container>
        <Grid>
          <div>
            <Card>
              <SectionTitle>Overview</SectionTitle>
              <div>{children}</div>
            </Card>

            {features?.length > 0 && (
              <Card style={{ marginTop: 20 }}>
                <SectionTitle>Key Focus Areas</SectionTitle>
                <FeaturesGrid>
                  {features.map((f, i) => (
                    <FeatureCard key={i}>
                      <FeatureTitle>{f.title}</FeatureTitle>
                      <FeatureText>{f.text}</FeatureText>
                    </FeatureCard>
                  ))}
                </FeaturesGrid>
              </Card>
            )}

            {stories?.length > 0 && (
              <Card style={{ marginTop: 20 }}>
                <SectionTitle>Stories of Impact</SectionTitle>
                <div style={{ display: 'grid', gap: 16 }}>
                  {stories.map((s, i) => (
                    <Story key={i}>
                      {s.image ? <StoryImg src={s.image} alt={s.title} /> : <div />}
                      <div>
                        <StoryTitle>{s.title}</StoryTitle>
                        <div style={{ color: '#667', fontSize: 14 }}>{s.text}</div>
                      </div>
                    </Story>
                  ))}
                </div>
              </Card>
            )}

            {faqs?.length > 0 && (
              <Card style={{ marginTop: 20 }}>
                <SectionTitle>Frequently Asked Questions</SectionTitle>
                <div style={{ display: 'grid', gap: 10 }}>
                  {faqs.map((f, i) => (
                    <FAQItem key={i}>
                      <FAQHeader onClick={() => setOpenFaqIndex(openFaqIndex === i ? -1 : i)} aria-expanded={openFaqIndex === i}>
                        <span>{f.q}</span>
                        <span>{openFaqIndex === i ? '−' : '+'}</span>
                      </FAQHeader>
                      {openFaqIndex === i && (
                        <FAQBody>{f.a}</FAQBody>
                      )}
                    </FAQItem>
                  ))}
                </div>
              </Card>
            )}
          </div>

          <div>
            {impact?.length > 0 && (
              <Card>
                <SectionTitle>Impact in Numbers</SectionTitle>
                <ImpactGrid>
                  {impact.map((m, i) => (
                    <ImpactCard key={i}>
                      <ImpactNumber>{m.value}</ImpactNumber>
                      <ImpactLabel>{m.label}</ImpactLabel>
                    </ImpactCard>
                  ))}
                </ImpactGrid>
              </Card>
            )}

            {sdgs?.length > 0 && (
              <Card style={{ marginTop: 20 }}>
                <SectionTitle>Supporting the SDGs</SectionTitle>
                <BadgeRow>
                  {sdgs.map((b, i) => (
                    <Badge key={i}>{b}</Badge>
                  ))}
                </BadgeRow>
              </Card>
            )}

            {cta && (
              <Card style={{ marginTop: 20, textAlign: 'center' }}>
                <SectionTitle>Take Action</SectionTitle>
                <CTA href={cta.href}>{cta.label}</CTA>
              </Card>
            )}
          </div>
        </Grid>
      </Container>
    </Page>
  );
}


