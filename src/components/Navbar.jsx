import { useState, useEffect } from 'react';

const Navbar = ({ scrollToSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const container = document.querySelector('.scroll-container');
    if (!container) return;
    const handleScroll = () => {
      const home = document.getElementById('home');
      if (!home) return;
      const scrollTop = container.scrollTop;
      setScrolled(scrollTop > 60);
      setHidden(scrollTop > home.offsetHeight * 0.5);
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Service', id: 'service' },
    { label: 'Works', id: 'works' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* Top progress line — draws across on mount */}
      <div
        className={`fixed top-0 left-0 h-[2px] bg-[#818356] z-[60] transition-all duration-1000 ease-out
          ${mounted ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
      />

      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-700
          ${scrolled
            ? 'bg-[#f5f0e8]/95 backdrop-blur-sm border-b border-[#e0d9ce]'
            : 'bg-transparent'
          }
          ${hidden
            ? '-translate-y-full opacity-0 pointer-events-none'
            : 'translate-y-0 opacity-100'
          }`}
      >
        {/* Nav content fades down from top on load */}
        <div
          className={`w-full mx-auto px-5 sm:px-8 lg:px-12 py-4 sm:py-5 flex items-center justify-between gap-4
            transition-all duration-700 ease-out
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        >

          {/* Left — role slides in from left */}
          <div
            className={`shrink-0 transition-all ease-out
              ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            style={{ transitionDuration: '800ms', transitionDelay: '200ms' }}
          >
            <span className="text-[#0e0d0b] font-bold text-base sm:text-lg lg:text-xl tracking-tight leading-none">
              Software Engineer
            </span>
          </div>

          {/* Desktop links — each slides + fades from right with stagger */}
          <ul className="hidden lg:flex items-center gap-10 xl:gap-12 list-none">
            {links.map(({ label, id }, i) => (
              <li
                key={id}
                className={`transition-all ease-out
                  ${mounted ? 'opacity-100 translate-y-0 translate-x-0' : 'opacity-0 translate-y-3 translate-x-6'}`}
                style={{
                  transitionDuration: '700ms',
                  transitionDelay: `${300 + i * 100}ms`,
                }}
              >
                <button
                  onClick={() => scrollToSection(id)}
                  className="relative flex flex-col items-start gap-0.5 group"
                >
                  {/* Number counts up feel — fades in slightly after label */}
                  <span
                    className={`text-[#c5bdb2] text-[9px] tracking-[0.2em] uppercase font-medium transition-all duration-300 group-hover:text-[#818356]
                      ${mounted ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${500 + i * 100}ms` }}
                  >
                    0{i + 1}
                  </span>
                  <span className="text-[#6b6560] text-sm tracking-[0.15em] uppercase font-semibold group-hover:text-[#0e0d0b] transition-colors duration-300">
                    {label}
                  </span>
                  {/* Underline draws from left on hover */}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#818356] transition-all duration-500 group-hover:w-full rounded-full" />
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile links — fade up staggered */}
          <ul className="flex lg:hidden items-center gap-3 sm:gap-5 list-none flex-wrap justify-end">
            {links.map(({ label, id }, i) => (
              <li
                key={id}
                className={`transition-all ease-out
                  ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                style={{
                  transitionDuration: '600ms',
                  transitionDelay: `${250 + i * 80}ms`,
                }}
              >
                <button
                  onClick={() => scrollToSection(id)}
                  className="flex items-center gap-1 group"
                >
                  <span className="text-[#c5bdb2] text-[8px] tracking-[0.15em] uppercase font-bold transition-colors duration-300 group-hover:text-[#818356]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[#6b6560] text-[10px] sm:text-[11px] tracking-[0.12em] uppercase font-semibold group-hover:text-[#0e0d0b] transition-colors duration-300">
                    {label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

        </div>

        {/* Bottom border on scroll */}
        <div
          className={`absolute bottom-0 left-0 h-px w-full bg-[#e0d9ce] transition-opacity duration-700
            ${scrolled ? 'opacity-100' : 'opacity-0'}`}
        />
      </nav>
    </>
  );
};

export default Navbar;