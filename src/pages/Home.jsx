import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../sections/Hero.jsx';
import Features from '../sections/Features.jsx';
import Demo from '../sections/Demo.jsx';
import TechStack from '../sections/TechStack.jsx';
import TeamSection from '../sections/TeamSection.jsx';
import ContactForm from '../sections/ContactForm.jsx';
import Stats from '../sections/Stats.jsx';
import FAQ from '../sections/FAQ.jsx';
import FeedbackForm from '../sections/FeedbackForm.jsx';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const location = useLocation();
  const [welcome, setWelcome] = React.useState('');
  React.useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    if (location.state && location.state.welcomeName) {
      setWelcome(`Welcome ${location.state.welcomeName}!`);
      setTimeout(() => setWelcome(''), 4000);
    }
  }, []);

  return (
    <div>
      {welcome && (
        <div className="container-max pt-6">
          <div className="rounded-xl border border-emerald-300/40 bg-emerald-50/60 dark:border-emerald-700/40 dark:bg-emerald-900/20 px-4 py-3 text-emerald-800 dark:text-emerald-200">
            {welcome}
          </div>
        </div>
      )}
      <Hero />
      <section id="features" className="container-max py-16 sm:py-24">
        <Features />
      </section>
      <section id="demo" className="container-max py-16 sm:py-24">
        <Demo />
      </section>
      <section id="stats" className="container-max py-8 sm:py-16">
        <Stats />
      </section>
      <section id="tech" className="container-max py-16 sm:py-24">
        <TechStack />
      </section>
      <section id="team" className="container-max py-16 sm:py-24">
        <TeamSection />
      </section>
      <section id="faq" className="container-max py-16 sm:py-24">
        <FAQ />
      </section>
      <section id="feedback" className="container-max py-16 sm:py-24">
        <FeedbackForm />
      </section>
      <section id="contact" className="container-max py-16 sm:py-24">
        <ContactForm />
      </section>
    </div>
  );
}


