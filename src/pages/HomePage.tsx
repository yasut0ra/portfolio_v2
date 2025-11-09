import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import { useLocation, useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');

    if (!section) {
      return;
    }

    // Support links such as "/?section=projects" by scrolling after the page loads.
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      window.scrollTo({
        top: sectionElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }

    navigate('/', { replace: true });
  }, [location, navigate]);

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
};

export default HomePage;
