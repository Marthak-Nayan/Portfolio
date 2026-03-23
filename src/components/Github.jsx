import { useEffect, useRef, useState } from 'react';

const USERNAME = 'Marthak-Nayan';

const GitHub = () => {
  const [visible, setVisible] = useState(false);
  const [borderVisible, setBorderVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const ref = useRef(null);
  const scrollRef = useRef(null);

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

  // Scroll to end whenever imgLoaded becomes true
  useEffect(() => {
    if (imgLoaded && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [imgLoaded]);

  return (
    <section
      ref={ref}
      id="github"
      className="w-full bg-[#f5f0e8] pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 scroll-mt-20"
    >

      {/* ── Title block ── */}
      <div className="relative px-8 sm:px-16 lg:px-20 py-10 sm:py-12 lg:py-16">

        {/* Left strip */}
        <div className="absolute top-0 left-0 h-full flex pointer-events-none">
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

        {/* Right strip */}
        <div className="absolute top-0 right-0 h-full flex pointer-events-none">
          <div
            className="w-[2px] bg-gradient-to-b from-transparent via-[#818356] to-transparent transition-all duration-1000 ease-out"
            style={{
              opacity: borderVisible ? 1 : 0,
              transform: borderVisible ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'top',
              transitionDelay: '150ms',
            }}
          />
          <div className="w-3 sm:w-6 bg-[#f5f0e8] h-full" />
        </div>

        <div className="max-w-[1500px] mx-auto">

          {/* Label */}
          <div
            className={`flex items-center gap-3 mb-8 sm:mb-10 transition-all duration-700 ease-out
              ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
          >
            <div
              className="h-px bg-[#818356] transition-all duration-700 ease-out"
              style={{ width: visible ? '24px' : '0px', transitionDelay: '200ms' }}
            />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#818356] font-semibold">
              GitHub Activity
            </span>
          </div>

          {/* Heading */}
          <div className="overflow-hidden mb-8 sm:mb-10 lg:mb-12">
            <h2
              className={`text-[clamp(40px,8vw,100px)] font-extrabold leading-none tracking-tighter text-[#0e0d0b] transition-all duration-700 ease-out
                ${visible ? 'opacity-100 translate-y-0 skew-y-0' : 'opacity-0 translate-y-full skew-y-1'}`}
              style={{ transitionDelay: '100ms' }}
            >
              GITHUB/
            </h2>
          </div>

          {/* Divider */}
          <div
            className={`flex items-center gap-4 transition-all duration-1000 ease-out
              ${visible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
            style={{ transformOrigin: 'left', transitionDelay: '150ms' }}
          >
            <div className="w-2 h-2 rounded-full bg-[#818356] shrink-0" />
            <div className="flex-1 h-px bg-[#818356]/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#818356]/40 shrink-0" />
            <div className="w-1 h-1 rounded-full bg-[#818356]/20 shrink-0" />
          </div>

        </div>
      </div>

      {/* ── Graph ── */}
      <div className="px-5 sm:px-10 lg:px-12 mt-4">
        <div
          className={`relative transition-all duration-700 ease-out
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '300ms' }}
        >

          {/* Skeleton — shows while loading */}
          {!imgLoaded && (
            <div
              className="w-full rounded-sm overflow-hidden"
              style={{ minHeight: '112px' }}
            >
              <div className="flex gap-1 px-1 pt-1">
                {Array.from({ length: 53 }).map((_, ci) => (
                  <div key={ci} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, ri) => (
                      <div
                        key={ri}
                        className="w-3 h-3 rounded-sm bg-[#e0d9ce] animate-pulse"
                        style={{ animationDelay: `${(ci * 7 + ri) * 5}ms` }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scroll wrapper */}
          <div
            ref={scrollRef}
            className="no-scrollbar overflow-x-auto"
            style={{
              opacity: imgLoaded ? 1 : 0,
              transition: 'opacity 0.6s ease-out',
            }}
          >
            <img
              src={`https://ghchart.rshah.org/818356/${USERNAME}`}
              alt="GitHub contribution chart"
              className="block hover:opacity-100 transition-opacity duration-300"
              style={{
                minWidth: '900px',
                height: 'auto',
                opacity: imgLoaded ? 0.85 : 0,
                transition: 'opacity 0.6s ease-out',
              }}
              onLoad={() => setImgLoaded(true)}
            />
          </div>

          {/* Right fade on mobile */}
          {imgLoaded && (
            <div className="sm:hidden absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#f5f0e8] to-transparent pointer-events-none" />
          )}

        </div>
      </div>

    </section>
  );
};

export default GitHub;