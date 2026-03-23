import { useEffect, useRef, useState } from 'react';

const Works = () => {
  const [visible, setVisible] = useState(false);
  const [borderVisible, setBorderVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const container = document.querySelector('.scroll-container');
    if (!container) return;
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        setVisible(true);
        setTimeout(() => setBorderVisible(true), 300);
      }
    };
    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={ref}
      id="works"
      className="w-full scroll-mt-20 relative"
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

      {/* Content */}
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
              Selected Work
            </span>
          </div>

          {/* Heading — overflow hidden so it clips cleanly */}
          <div className="overflow-hidden mb-6 sm:mb-8">
            <h2
              className={`text-[clamp(40px,8vw,100px)] font-extrabold leading-none tracking-tighter text-[#0e0b0d] transition-all duration-700 ease-out
                ${visible ? 'opacity-100 translate-y-0 skew-y-0' : 'opacity-0 translate-y-full skew-y-1'}`}
              style={{ transitionDelay: '100ms' }}
            >
              PROJECTS/
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
              Thoughtfully crafted digital experiences that blend utility and
              aesthetics — functional, memorable, and refined.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Works;