import ProgramLayout from './ProgramLayout';

const SusanVillage = () => {
  return (
    <ProgramLayout
      title="The Rebirth Susan Village"
      intro="24/7 rescue, temporary and long‑term shelter, clinical and psychosocial support, and reintegration services for girls and young women survivors of sexual abuse and human trafficking."
      impact={[
        { label: 'Survivors sheltered annually', value: '250+' },
        { label: 'Medical & counseling sessions', value: '1,200+' },
        { label: 'Successful reintegrations', value: '85%' },
      ]}
      features={[
        { title: 'Emergency Response', text: '24/7 intake, rapid rescue coordination, safe transportation and immediate support.' },
        { title: 'Shelter & Care', text: 'Safe accommodation, nutrition, clothing, hygiene, and child-friendly spaces.' },
        { title: 'Health & Healing', text: 'Medical treatment, trauma-informed counseling, case management, and peer support.' },
        { title: 'Education & Skills', text: 'Return-to-school pathways, tutoring, vocational training, and life-skills.' },
        { title: 'Legal Support', text: 'Reporting, evidence documentation, legal accompaniment, and protection services.' },
        { title: 'Reintegration', text: 'Family tracing, community follow-up, mentorship, and economic inclusion.' },
      ]}
      stories={[
        {
          title: 'Meet Amina',
          text: 'After emergency rescue and trauma‑informed care at Susan Village, Amina returned to school and now mentors peers in her community.',
          image: 'https://res.cloudinary.com/samokello/image/upload/v1720000000/rebirth/programs/story_amina.jpg'
        },
      ]}
      sdgs={['Good Health & Well‑Being','Gender Equality','Reduced Inequalities']}
      faqs={[
        { q: 'Who can access Susan Village?', a: 'Girls and young women who have experienced sexual abuse or trafficking, referred by community hotlines, authorities, or partners.' },
        { q: 'Is emergency support available?', a: 'Yes. Our team coordinates 24/7 emergency response and safe transport to the shelter.' },
        { q: 'How long is shelter care provided?', a: 'Length of stay is individualized—from emergency and short-term to longer-term care during recovery and reintegration.' },
        { q: 'Do you support schooling?', a: 'Yes. We offer return-to-school pathways, tutoring, and scholarships in partnership with local schools.' }
      ]}
      cta={{ label: 'Support Survivors', href: '/donate' }}
    >
      <p>
        Susan Village offers a continuum of care: emergency intake, medical support, therapy, education catch‑up, legal accompaniment, and community‑based reintegration. Our multidisciplinary team ensures safety, dignity, and long‑term wellbeing.
      </p>
      <p>
        We collaborate with local authorities, health facilities, schools, and community champions to provide survivor‑centered pathways back to school, skills training, and safe homes.
      </p>
    </ProgramLayout>
  );
};

export default SusanVillage;