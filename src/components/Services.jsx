import { useEffect, useRef, useState } from 'react';

const servicesData = [
  {
    id: 1,
    number: '01',
    title: 'Java Software Development',
    description: 'Building robust backend systems and APIs using Java and related technologies. I focus on creating scalable, maintainable, and efficient solutions that meet business needs.',
    details: ['Spring Boot, Hibernate & JPA', 'Spring Security & JWT Authentication', 'RESTful APIs'],
  },
  {
    id: 2,
    number: '02',
    title: 'Full-Stack Development',
    description: 'From frontend interfaces to backend services, I craft end-to-end solutions that deliver seamless user experiences using modern frameworks and best practices.',
    details: ['React.js, Node.js & Express.js', 'Next.js, JavaScript', 'Git & GitHub, CI/CD'],
  },
  {
    id: 3,
    number: '03',
    title: 'Optimization & System Design',
    description: 'Driven by the challenge of turning complex inputs into reliable systems. I design pipelines that power insights using core CS principles for scale and stability.',
    details: ['Data Structures & Algorithms', 'DBMS, OOP, OS Fundamentals', 'System Design Principles'],
  },
];

const Services = () => {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState([0]);
  const [borderVisible, setBorderVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const container = document.querySelector('.scroll-container');
    if (!container) return;

    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          setVisible(true);
          setTimeout(() => setBorderVisible(true), 300);
        }
      }

      const stickySection = document.getElementById('servicesSection');
      if (!stickySection) return;

      const scrollTop = container.scrollTop;
      const sectionTop = stickySection.offsetTop;
      const sectionHeight = stickySection.offsetHeight;
      const viewportHeight = container.clientHeight;

      const scrollIntoSection = scrollTop - sectionTop + viewportHeight / 2;
      const sectionProgress = Math.max(0, Math.min(1, scrollIntoSection / sectionHeight));
      const total = servicesData.length;
      const itemProgress = sectionProgress * total;
      const currentActive = Math.min(Math.floor(itemProgress), total - 1);
      const numVisible = Math.min(Math.ceil(itemProgress) || 1, total);

      setActiveIndex(currentActive);
      setVisibleItems(Array.from({ length: numVisible }, (_, i) => i));
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ── Services Intro ── */}
      <section
        ref={ref}
        id="service"
        className="w-full mt-20 scroll-mt-20 relative"
      >

        {/* Left border — draws down */}
        <div className="absolute top-0 left-0 h-full flex">
          <div className="w-3 sm:w-6 bg-[#f5f0e8] h-full" />
          <div
            className="w-[2px] bg-gradient-to-b from-transparent via-[#818356] to-transparent transition-all duration-1000 ease-out"
            style={{
              opacity: borderVisible ? 1 : 0,
              transform: borderVisible ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'top',
            }}
          />
        </div>

        {/* Right border — draws down with delay */}
        <div className="absolute top-0 right-0 h-full flex">
          <div
            className="w-[2px] bg-gradient-to-b from-transparent via-[#818356] to-transparent transition-all duration-1000 ease-out"
            style={{
              opacity: borderVisible ? 1 : 0,
              transform: borderVisible ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'top',
              transitionDelay: '200ms',
            }}
          />
          <div className="w-3 sm:w-6 bg-[#f5f0e8] h-full" />
        </div>

        <div className="px-8 sm:px-16 lg:px-20 pt-16 sm:pt-24 lg:pt-32 pb-10 sm:pb-16">
          <div className="max-w-[1500px] mx-auto">

            {/* Label */}
            <div
              className={`flex items-center gap-3 mb-8 sm:mb-12 lg:mb-16 transition-all duration-700 ease-out
                ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
            >
              <div
                className="h-px bg-[#818356] transition-all duration-700 ease-out"
                style={{ width: visible ? '24px' : '0px', transitionDelay: '200ms' }}
              />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#818356] font-semibold">
                Services
              </span>
            </div>

            {/* Heading */}
            <div className="overflow-hidden mb-6 sm:mb-8">
              <h2
                className={`text-[clamp(40px,8vw,100px)] font-extrabold leading-none tracking-tighter text-[#0e0d0b] transition-all duration-700 ease-out
                  ${visible ? 'opacity-100 translate-y-0 skew-y-0' : 'opacity-0 translate-y-full skew-y-1'}`}
                style={{ transitionDelay: '100ms' }}
              >
                WHAT I DO/
              </h2>
            </div>

            {/* Divider */}
            <div
              className={`flex items-center gap-4 mb-8 sm:mb-10 mt-4 transition-all duration-1000 ease-out
                ${visible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
              style={{ transformOrigin: 'left', transitionDelay: '200ms' }}
            >
              <div className="w-2 h-2 rounded-full bg-[#818356] shrink-0" />
              <div className="flex-1 h-px bg-[#818356]/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#818356]/40 shrink-0" />
              <div className="w-1 h-1 rounded-full bg-[#818356]/20 shrink-0" />
            </div>

            {/* Description */}
            <div
              className={`flex justify-end transition-all duration-700 ease-out
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <p className="text-[#6b6560] text-sm sm:text-base leading-relaxed max-w-[280px] sm:max-w-[400px] text-right">
                I specialize in building Java-based applications — efficient,
                scalable, and user-friendly. Helping bring ideas to life for
                startups, businesses, and product teams.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Services Sticky Scroll ── */}
      <div
        className="min-h-[300vh] relative bg-[#f5f0e8]"
        id="servicesSection"
      >
        <div className="sticky top-0 min-h-screen flex pt-10 sm:pt-16 lg:pt-20 items-start overflow-hidden">
          <div className="w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 pb-12 relative">
            {servicesData.map((service, index) => {
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;
              const isVisible = visibleItems.includes(index);

              return (
                <div
                  key={service.id}
                  className={`relative border-b border-[#e0d9ce] transition-all duration-700 ease-out
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >

                  {/* ── Big watermark number ── */}
                  <span
                    className="absolute right-0 top-1/2 font-extrabold leading-none select-none pointer-events-none transition-all duration-700 hidden sm:block"
                    style={{
                      fontSize: 'clamp(80px, 14vw, 180px)',
                      color: '#e8e0d0',
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? 'translateY(-50%) translateX(0) scale(1)'
                        : 'translateY(-50%) translateX(20px) scale(0.95)',
                      transition: 'all 0.7s ease-out',
                      maxWidth: '45%',
                      WebkitMaskImage: 'linear-gradient(to left, black 50%, transparent 100%)',
                      maskImage: 'linear-gradient(to left, black 50%, transparent 100%)',
                    }}
                  >
                    {service.number}
                  </span>

                  {/* Header row */}
                  <div className="flex items-start gap-4 sm:gap-6 lg:gap-8 py-5 sm:py-6 lg:py-7 relative z-10">

                    {/* Number + check stacked */}
                    <div className="flex flex-col items-center gap-3 pt-1 shrink-0">
                      <span
                        className={`text-[11px] sm:text-[13px] tracking-[0.3em] uppercase font-bold transition-all duration-500
                          ${isActive ? 'text-[#818356]' : isPast ? 'text-[#c5bdb2]' : 'text-[#e0d9ce]'}`}
                      >
                        ({service.number})
                      </span>

                      {/* Check circle */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-500
                          ${isPast
                            ? 'border-[#818356] bg-[#818356] scale-100 opacity-100'
                            : 'border-[#e0d9ce] bg-transparent scale-90 opacity-0'
                          }`}
                      >
                        {isPast && (
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            style={{ animation: 'popIn 0.3s ease-out forwards' }}
                          >
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Big title */}
                    <div className="flex-1 relative overflow-hidden">
                      <h2
                        className={`font-extrabold tracking-tighter leading-[1.0] transition-all duration-500
                          text-[clamp(28px,5vw,72px)]
                          ${isActive ? 'text-[#0e0d0b]' : isPast ? 'text-[#c5bdb2]' : 'text-[#e0d9ce]'}`}
                      >
                        {service.title}
                      </h2>

                      {/* Underline — matches title width */}
                      <div className="mt-2 overflow-hidden">
                        <div
                          className="h-[2px] bg-[#818356] transition-all duration-700 ease-out"
                          style={{
                            width: isActive ? 'fit-content' : '0%',
                            maxWidth: '100%',
                          }}
                        >
                          {/* Invisible text to match title width */}
                          <span
                            className="invisible font-extrabold tracking-tighter leading-[1.0] block"
                            style={{ fontSize: 'clamp(28px,5vw,72px)', height: '2px' }}
                          >
                            {service.title}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Expandable content */}
                  <div className={`service-content ${isActive ? 'active' : ''}`}>
                    <div className="pb-6 sm:pb-10 pl-12 sm:pl-16 lg:pl-20 pr-4 sm:pr-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 relative z-10">

                      {/* Description */}
                      <p
                        className={`text-[#6b6560] text-sm sm:text-base leading-relaxed transition-all duration-700 ease-out
                          ${isActive
                            ? 'opacity-100 translate-y-0 blur-none'
                            : 'opacity-0 translate-y-4 blur-sm'
                          }`}
                        style={{ transitionDelay: '150ms' }}
                      >
                        {service.description}
                      </p>

                      {/* Details */}
                      <div className="flex flex-col gap-3 sm:gap-4">
                        {service.details.map((detail, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-3 transition-all duration-500
                              ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
                            style={{ transitionDelay: `${150 + i * 100}ms` }}
                          >
                            <span
                              className={`text-[#818356] text-[10px] font-bold tracking-widest shrink-0 transition-all duration-500
                                ${isActive ? 'opacity-100' : 'opacity-0'}`}
                              style={{ transitionDelay: `${150 + i * 100}ms` }}
                            >
                              0{i + 1}
                            </span>
                            <span className="text-[#0e0d0b] text-sm sm:text-base font-medium tracking-wide">
                              {detail}
                            </span>
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

      <style>{`
        @keyframes popIn {
          from { transform: scale(0) rotate(-10deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Services;