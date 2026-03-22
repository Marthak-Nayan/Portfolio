import React, { useState, useEffect, useRef } from 'react';
import Footer from './components/Footer';
import About from './components/About';
import Hero from './components/Hero';
import FloatingMenu from './components/FloatingMenu';
import Services from './components/Services';
import Works from './components/Works';
import Navbar from './components/Navbar';
import Project from './components/Project';

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState([0]);
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const scrollTimer = useRef(null);
  const containerRef = useRef(null);

  const services = [
    {
      id: 1,
      number: "(01)",
      title: "Java Software Development",
      description: "Building robust backend systems and APIs using Java and related technologies. I focus on creating scalable, maintainable, and efficient solutions that meet business needs.",
      details: ["Spring Boot, Hibernate & JPA", "Spring Security & JWT Authentication", "RESTful APIs"]
    },
    {
      id: 2,
      number: "(02)",
      title: "Full-Stack Development",
      description: "From frontend interfaces to backend services, I craft end-to-end solutions that deliver seamless user experiences using modern frameworks and best practices.",
      details: ["React.js, Node.js & Express.js", "Next.js, JavaScript", "Git & GitHub, CI/CD"]
    },
    {
      id: 3,
      number: "(03)",
      title: "Optimization & System Design",
      description: "Driven by the challenge of turning complex raw inputs into reliable systems. I design pipelines that power insights using core CS principles for scale and stability.",
      details: ["Data Structures & Algorithms", "DBMS, OOP, OS Fundamentals", "System Design Principles"]
    }
  ];

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
      const totalSections = services.length;
      const itemProgress = sectionProgress * totalSections;
      const currentActive = Math.min(Math.floor(itemProgress), totalSections - 1);
      const numVisible = Math.min(Math.ceil(itemProgress) || 1, totalSections);

      if (activeIndex !== currentActive) setActiveIndex(currentActive);
      const newVisibleItems = Array.from({ length: numVisible }, (_, i) => i);
      if (JSON.stringify(visibleItems) !== JSON.stringify(newVisibleItems)) setVisibleItems(newVisibleItems);
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex, visibleItems, services.length, isMenuOpen]);

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

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateScroll = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollTop = startPosition + distance * easeInOutCubic(progress);
      if (progress < 1) requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setHideMenu(false);
  };

  return (
    <div
      ref={containerRef}
      className="scroll-container h-screen w-full overflow-y-scroll"
    >
      <Navbar scrollToSection={scrollToSection} />

      <FloatingMenu
        scrollToSection={scrollToSection}
        setIsMenuOpen={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        showMenu={showMenu}
        hideMenu={hideMenu}
        toggleMenu={toggleMenu}
      />

      <Hero scrollToSection={scrollToSection} />

      <div className="bg-[#0a0a0f] pt-10 pb-10 rounded-[40px] -mt-10 relative z-10">
        <Services />

        {/* Services Sticky Section */}
        <div className="min-h-[300vh] relative rounded-[30px]" id="servicesSection">
          <div className="sticky top-0 min-h-screen flex items-center">
            <div className="w-full max-w-[90rem] mx-auto px-8 py-8">
              {services.map((service, index) => {
                const isActive = index === activeIndex;
                const isPast = index < activeIndex;
                const isVisible = visibleItems.includes(index);
                return (
                  <div
                    key={service.id}
                    className={`border-b border-white/5 transition-all duration-700 ease-out
                      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                  >
                    <div className="flex items-center gap-8 py-8">
                      <span className={`text-[2.5rem] font-bold transition-all duration-500
                        ${isActive ? 'text-violet-400' : isPast ? 'text-white/30' : 'text-white/10'}`}>
                        {service.number}
                      </span>
                      <div className="flex-1">
                        <h2 className={`text-[3rem] font-bold transition-all duration-500 max-sm:text-[1.8rem]
                          ${isActive ? 'text-white' : isPast ? 'text-white/30' : 'text-white/10'}`}>
                          {service.title}
                        </h2>
                      </div>
                      <div className={`text-violet-400 transition-opacity duration-500 ${isPast ? 'opacity-100' : 'opacity-0'}`}>
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className={`service-content ${isActive ? 'active' : ''}`}>
                      <div className="pb-12 pl-32 max-md:pl-8">
                        <p className="text-lg text-white/50 leading-relaxed mb-8 max-w-[64rem]">
                          {service.description}
                        </p>
                        <div className="grid grid-cols-2 gap-6 max-w-[64rem] max-md:grid-cols-1">
                          {service.details.map((detail, i) => (
                            <div
                              key={i}
                              className={`flex items-start gap-3 transition-all duration-500
                                ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                              style={{ transitionDelay: `${i * 100}ms` }}
                            >
                              <span className="text-violet-400 text-sm mt-1 font-bold">0{i + 1}</span>
                              <span className="text-white/60">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Works />
        <div className="pb-10"><Project /></div>
        <About />
      </div>

      <div id="contact">
        <Footer scrollToSection={scrollToSection} />
      </div>
    </div>
  );
};

export default App;