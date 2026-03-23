import { useEffect, useState, useCallback } from 'react';

const navItems = [
  { label: 'Home', id: 'home', number: '01' },
  { label: 'Service', id: 'service', number: '02' },
  { label: 'Works', id: 'works', number: '03' },
  { label: 'About', id: 'about', number: '04' },
  { label: 'Contact', id: 'contact', number: '05' },
];

const FloatingMenu = ({ scrollToSection, showMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const [autoHide, setAutoHide] = useState(false);
  const [hideTimer, setHideTimer] = useState(null);

  // ── Auto hide after 4s of no activity ──
  const resetHideTimer = useCallback(() => {
    if (!showMenu || isOpen) return;
    setAutoHide(false);
    if (hideTimer) clearTimeout(hideTimer);
    const t = setTimeout(() => {
      if (!isOpen) setAutoHide(true);
    }, 4000);
    setHideTimer(t);
  }, [showMenu, isOpen, hideTimer]);

  // Mount/unmount based on showMenu
  useEffect(() => {
    if (showMenu) {
      const t = setTimeout(() => setMounted(true), 50);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
      setIsOpen(false);
      setAutoHide(false);
    }
  }, [showMenu]);

  // Start hide timer when mounted
  useEffect(() => {
    if (mounted && !isOpen) {
      resetHideTimer();
    }
    return () => { if (hideTimer) clearTimeout(hideTimer); };
  }, [mounted]);

  // Reset timer on any user activity
  useEffect(() => {
    if (!showMenu) return;

    const events = ['scroll', 'mousemove', 'touchstart', 'keydown', 'click'];
    const container = document.querySelector('.scroll-container');

    const handleActivity = () => {
      if (!isOpen) resetHideTimer();
    };

    events.forEach((e) => window.addEventListener(e, handleActivity));
    if (container) container.addEventListener('scroll', handleActivity);

    return () => {
      events.forEach((e) => window.removeEventListener(e, handleActivity));
      if (container) container.removeEventListener('scroll', handleActivity);
    };
  }, [showMenu, isOpen, resetHideTimer]);

  // Keep visible when menu is open
  useEffect(() => {
    if (isOpen) {
      setAutoHide(false);
      if (hideTimer) clearTimeout(hideTimer);
    } else if (mounted && showMenu) {
      resetHideTimer();
    }
  }, [isOpen]);

  // Active section tracking
  useEffect(() => {
    const container = document.querySelector('.scroll-container');
    if (!container) return;
    const handleScroll = () => {
      const sections = ['home', 'service', 'works', 'about', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveId(id);
            break;
          }
        }
      }
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Is button visible
  const buttonVisible = mounted && !autoHide;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 transition-all duration-500
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(14,13,11,0.3)', backdropFilter: 'blur(3px)' }}
      />

      {/* Menu panel */}
      <div
        className={`fixed top-0 right-0 h-full z-50 flex flex-col
          transition-all duration-500 ease-out
          w-[260px] sm:w-[280px]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          background: 'rgba(14,13,11,0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderLeft: '2px solid #818356',
        }}
      >
        {/* Top olive line — draws right on open */}
        <div
          className="h-[2px] bg-[#818356] transition-all duration-700 ease-out"
          style={{ width: isOpen ? '100%' : '0%' }}
        />

        {/* Header */}
        <div
          className={`px-6 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 border-b border-[#818356]/30 transition-all duration-500 ease-out
            ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
          style={{ transitionDelay: isOpen ? '150ms' : '0ms' }}
        >
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#818356] font-semibold">
            Navigation
          </span>
        </div>

        {/* Nav items */}
        <div className="flex flex-col flex-1 px-4 sm:px-6 pt-4 sm:pt-6 gap-1 overflow-y-auto">
          {navItems.map(({ label, id, number }, i) => {
            const isActive = activeId === id;
            return (
              <button
                key={id}
                onClick={() => {
                  scrollToSection(id);
                  setIsOpen(false);
                }}
                className={`group flex items-center gap-4 sm:gap-5 px-3 sm:px-4 py-3 sm:py-4 text-left rounded-sm transition-all duration-300
                  ${isActive
                    ? 'border-l-2 border-[#818356] pl-2 sm:pl-3 bg-[#818356]/5'
                    : 'border-l-2 border-transparent hover:border-[#818356]/40 hover:pl-2 sm:hover:pl-3'
                  }`}
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(24px)',
                  transition: `opacity 0.4s ease ${isOpen ? i * 60 : 0}ms,
                               transform 0.4s ease ${isOpen ? i * 60 : 0}ms,
                               border-color 0.3s ease,
                               padding 0.3s ease,
                               background-color 0.3s ease`,
                }}
              >
                <span
                  className={`text-[9px] tracking-[0.3em] uppercase font-bold min-w-[22px] transition-colors duration-300
                    ${isActive ? 'text-[#818356]' : 'text-[#818356]/30'}`}
                >
                  {number}
                </span>
                <span
                  className={`text-sm sm:text-base font-semibold tracking-wide transition-colors duration-300
                    ${isActive ? 'text-[#f5f0e8]' : 'text-[#f5f0e8]/40 group-hover:text-[#f5f0e8]'}`}
                >
                  {label}
                </span>
                {/* Active dot — scales in */}
                <span
                  className={`ml-auto w-1.5 h-1.5 rounded-full bg-[#818356] transition-all duration-300
                    ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                />
              </button>
            );
          })}
        </div>

        {/* Bottom */}
        <div
          className={`px-6 sm:px-8 py-4 sm:py-6 border-t border-[#818356]/30 transition-all duration-500 ease-out
            ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          style={{ transitionDelay: isOpen ? '350ms' : '0ms' }}
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#818356]/50 font-medium">
            Nayan Marthak · 2025
          </span>
        </div>

        {/* Bottom olive line — draws left on open */}
        <div className="flex justify-end">
          <div
            className="h-[2px] bg-[#818356] transition-all duration-700 ease-out"
            style={{
              width: isOpen ? '100%' : '0%',
              transitionDelay: isOpen ? '100ms' : '0ms',
            }}
          />
        </div>
      </div>

      {/* ── Hamburger button ── */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setAutoHide(false);
          resetHideTimer();
        }}
        className="fixed z-[60] flex flex-col items-center justify-center gap-[5px] rounded-full transition-all duration-500 ease-out hover:scale-110 active:scale-95"
        style={{
          top: 'clamp(16px, 3vw, 24px)',
          right: 'clamp(16px, 4vw, 32px)',
          width: 'clamp(38px, 5vw, 44px)',
          height: 'clamp(38px, 5vw, 44px)',
          background: 'transparent',
          border: '2px solid #818356',
          boxShadow: isOpen ? '0 0 0 4px rgba(129,131,86,0.15)' : 'none',
          opacity: buttonVisible ? 1 : 0,
          transform: buttonVisible
            ? 'translateX(0) scale(1)'
            : 'translateX(60px) scale(0.8)',
          pointerEvents: buttonVisible ? 'auto' : 'none',
          transition: 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease',
        }}
      >
        <span
          className="bg-[#818356] rounded-full transition-all duration-300 origin-center"
          style={{
            width: '18px',
            height: '1.5px',
            transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }}
        />
        <span
          className="bg-[#818356] rounded-full transition-all duration-300"
          style={{
            width: '18px',
            height: '1.5px',
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? 'scaleX(0)' : 'scaleX(1)',
          }}
        />
        <span
          className="bg-[#818356] rounded-full transition-all duration-300 origin-center"
          style={{
            width: '18px',
            height: '1.5px',
            transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }}
        />
      </button>
    </>
  );
};

export default FloatingMenu;