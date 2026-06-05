import { useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { useLoading } from './LoadingContext';
import Loader from '@/components/Loader';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ClientLogos from '@/components/ClientLogos';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  const { isInitialLoad, finishInitialLoad } = useLoading();

  useLenis();

  useEffect(() => {
    // Prevent scroll during loading
    if (isInitialLoad) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isInitialLoad]);

  return (
    <>
      {isInitialLoad && <Loader onComplete={finishInitialLoad} />}

      {!isInitialLoad && (
        <Layout>
          <Hero />
          <About />
          <ClientLogos />
          <Services />
          <Projects />
          <Team />
          <Testimonials />
          <Contact />
          <WhatsAppButton />
        </Layout>
      )}
    </>
  );
};

export default Index;
