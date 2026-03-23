import { useState, useEffect, useRef } from 'react';
import { Linkedin, Github, Mail, Instagram } from 'lucide-react';

export default function Footer({ scrollToSection }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const container = document.querySelector('.scroll-container');
    if (!container) return;
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) setVisible(true);
    };
    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
    });

  const formatDate = (date) =>
    date.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });

  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'Service', id: 'service' },
    { name: 'Works', id: 'works' },
    { name: 'About', id: 'about' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/marthaknayan59/' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/Marthak-Nayan' },
    { name: 'Gmail', icon: Mail, url: 'mailto:nayankhatri59@gmail.com' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/nayanmarthak_/' },
  ];

  return (
    <footer
      ref={ref}
      id="contact"
      className="w-full bg-[#818356] relative overflow-hidden"
    >

      {/* Top + bottom texture lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-0 left-0 h-px bg-[#6b6d46] transition-all duration-1000 ease-out
            ${visible ? 'w-full' : 'w-0'}`}
        />
        <div
          className={`absolute bottom-0 right-0 h-px bg-[#6b6d46] transition-all duration-1000 ease-out
            ${visible ? 'w-full' : 'w-0'}`}
          style={{ transitionDelay: '200ms' }}
        />
      </div>

      <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 sm:pt-16 lg:pt-20 pb-10">

        {/* ── Top CTA ── */}
        <div
          className={`mb-12 sm:mb-16 lg:mb-20 transition-all duration-700 ease-out
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="h-px bg-[#f5f0e8]/40 transition-all duration-700 ease-out"
              style={{ width: visible ? '24px' : '0px', transitionDelay: '300ms' }}
            />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#f5f0e8]/60 font-semibold">
              Connect
            </span>
          </div>

          {/* Big heading — reveals from below */}
          <div className="overflow-hidden">
            <h2
              className={`text-[clamp(36px,7vw,100px)] font-extrabold leading-none tracking-tighter text-[#f5f0e8] transition-all duration-700 ease-out
                ${visible ? 'opacity-100 translate-y-0 skew-y-0' : 'opacity-0 translate-y-full skew-y-1'}`}
              style={{ transitionDelay: '100ms' }}
            >
              GET IN<br />TOUCH/
            </h2>
          </div>

          {/* Email button */}
          <a
            href="mailto:nayankhatri59@gmail.com"
            className={`group inline-flex items-center gap-2 sm:gap-3 mt-6 sm:mt-8 px-5 sm:px-8 py-3 sm:py-4 border-2 border-[#f5f0e8] text-[#f5f0e8] text-[10px] sm:text-sm tracking-[0.2em] uppercase font-bold overflow-hidden relative hover:text-[#818356] transition-all duration-500
              ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <span className="absolute inset-0 bg-[#f5f0e8] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 break-all sm:break-normal">nayankhatri59@gmail.com</span>
            <span className="relative z-10 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </a>
        </div>

        {/* Divider */}
        <div
          className={`flex items-center gap-4 mb-10 sm:mb-12 lg:mb-16 transition-all duration-1000 ease-out
            ${visible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
          style={{ transformOrigin: 'left', transitionDelay: '300ms' }}
        >
          <div className="w-2 h-2 rounded-full bg-[#f5f0e8]/40 shrink-0" />
          <div className="flex-1 h-px bg-[#f5f0e8]/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#f5f0e8]/20 shrink-0" />
          <div className="w-1 h-1 rounded-full bg-[#f5f0e8]/10 shrink-0" />
        </div>

        {/* ── Bottom row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">

          {/* Navigation */}
          <div
            className={`flex flex-col gap-3 sm:gap-4 transition-all duration-700 ease-out
              ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '350ms' }}
          >
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#f5f0e8]/50 font-semibold mb-1">
              Navigation
            </span>
            {menuItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group flex items-center gap-2 text-[#f5f0e8]/70 text-sm font-medium tracking-wide hover:text-[#f5f0e8] transition-all duration-300 text-left w-fit
                  ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                style={{ transitionDelay: `${400 + i * 60}ms` }}
              >
                <span className="w-0 h-px bg-[#f5f0e8] transition-all duration-300 group-hover:w-4 shrink-0" />
                {item.name}
              </button>
            ))}
          </div>

          {/* Social */}
          <div
            className={`flex flex-col gap-3 sm:gap-4 transition-all duration-700 ease-out
              ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#f5f0e8]/50 font-semibold mb-1">
              Social
            </span>
            <div className="flex flex-col gap-2 sm:gap-3">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-2 sm:gap-3 text-[#f5f0e8]/70 text-sm font-medium tracking-wide hover:text-[#f5f0e8] transition-all duration-300 w-fit
                      ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                    style={{ transitionDelay: `${450 + i * 60}ms` }}
                  >
                    <Icon size={13} className="shrink-0" />
                    <span>{social.name}</span>
                    <span className="text-xs transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Time — full width on mobile, normal on md+ */}
          <div
            className={`col-span-2 sm:col-span-2 md:col-span-1 flex flex-col gap-2 sm:gap-3 transition-all duration-700 ease-out
              ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '450ms' }}
          >
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#f5f0e8]/50 font-semibold mb-1">
              Local Time
            </span>
            <div className="flex flex-col gap-1">
              <span
                className={`font-extrabold font-mono text-[#f5f0e8] leading-none tracking-tight transition-all duration-700 ease-out
                  text-[clamp(20px,4vw,40px)]
                  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                style={{ transitionDelay: '500ms' }}
              >
                {formatTime(currentTime)}
              </span>
              <span className="text-[#f5f0e8]/60 text-xs sm:text-sm tracking-wide">
                {formatDate(currentTime)}
              </span>
              <span className="text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#f5f0e8]/40 font-semibold mt-0.5 sm:mt-1">
                IST — Surat, India
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        {/* <div
          className={`mt-10 sm:mt-12 lg:mt-16 pt-5 sm:pt-6 border-t border-[#f5f0e8]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 transition-all duration-700 ease-out
            ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '550ms' }}
        >
          <span className="text-[#f5f0e8]/40 text-[10px] tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} Nayan Marthak
          </span>
          <span className="text-[#f5f0e8]/40 text-[10px] tracking-[0.2em] uppercase">
            Built with React · Tailwind CSS
          </span>
        </div> */}

      </div>
    </footer>
  );
}