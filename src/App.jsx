import React, { useState, useEffect, useRef } from 'react';
import About from './components/About';
import Hero from './components/Hero';
import Services from './components/Services';
import Works from './components/Works';
import Navbar from './components/Navbar';
import Project from './components/Project';
import Footer from './components/Footer';
import FloatingMenu from './components/FloatingMenu';
import GitHub from './components/Github';

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState([0]);
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const scrollTimer = useRef(null);
  const containerRef = useRef(null);

  // ✅ Restore scroll position on refresh
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) container.scrollTop = parseInt(savedPosition);
    const savePosition = () => sessionStorage.setItem('scrollPosition', container.scrollTop);
    container.addEventListener('scroll', savePosition);
    return () => container.removeEventListener('scroll', savePosition);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const servicesSection = document.getElementById('servicesSection');
      const homeSection = document.getElementById('home');
      const footerSection = document.getElementById('contact');
      if (!servicesSection || !homeSection) return;

      const scrollTop = container.scrollTop;
      const homeHeight = homeSection.offsetHeight;

      setShowMenu(scrollTop > homeHeight * 0.8);
      if (footerSection && scrollTop + container.clientHeight >= footerSection.offsetTop) {
        setShowMenu(false);
      }

      if (!isMenuOpen) {
        setHideMenu(false);
        if (scrollTimer.current) clearTimeout(scrollTimer.current);
        scrollTimer.current = setTimeout(() => setHideMenu(true), 2500);
      }

      const sectionTop = servicesSection.offsetTop;
      const sectionHeight = servicesSection.offsetHeight;
      const viewportHeight = container.clientHeight;
      const scrollIntoSection = scrollTop - sectionTop + viewportHeight / 2;
      const sectionProgress = Math.max(0, Math.min(1, scrollIntoSection / sectionHeight));
      const totalSections = 3;
      const itemProgress = sectionProgress * totalSections;
      const currentActive = Math.min(Math.floor(itemProgress), totalSections - 1);
      const numVisible = Math.min(Math.ceil(itemProgress) || 1, totalSections);

      if (activeIndex !== currentActive) setActiveIndex(currentActive);
      const newVisible = Array.from({ length: numVisible }, (_, i) => i);
      if (JSON.stringify(visibleItems) !== JSON.stringify(newVisible)) setVisibleItems(newVisible);
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex, visibleItems, isMenuOpen]);

  const scrollToSection = (sectionId) => {
    const container = containerRef.current;
    const element = document.getElementById(sectionId);
    if (!container || !element) return;
    setIsMenuOpen(false);
    const targetPosition = element.offsetTop - 80;
    const startPosition = container.scrollTop;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let startTime = null;
    const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const animate = (now) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollTop = startPosition + distance * ease(progress);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setHideMenu(false);
  };

  return (
    <div
      ref={containerRef}
      className="scroll-container h-screen w-full overflow-y-scroll bg-[#f5f0e8]"
    >
      <Navbar scrollToSection={scrollToSection} />

      <FloatingMenu scrollToSection={scrollToSection} showMenu={showMenu} />

      <Hero scrollToSection={scrollToSection} />

      {/* Services — passes activeIndex + visibleItems as props */}
      <Services
        activeIndex={activeIndex}
        visibleItems={visibleItems}
      />

      <Works />

      <Project />

      <About />
      <GitHub/>
      <div id="contact">
        <Footer scrollToSection={scrollToSection} />
      </div>

    </div>
  );
};

export default App;