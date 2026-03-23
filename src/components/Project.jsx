import { useState, useEffect, useRef } from 'react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    number: '01',
    title: 'Support Desk',
    type: 'Full Stack',
    year: '2024',
    description:
      'A ticketing system that helps organizations manage and resolve customer issues efficiently. Built with real-time WebSocket communication and Redis caching for performance.',
    technologies: ['Java', 'Spring Boot', 'WebSocket', 'Redis', 'Spring Security', 'JWT', 'PostgreSQL', 'React.js'],
    link: 'https://github.com/Marthak-Nayan/Support-Desk',
  },
  {
    id: 2,
    number: '02',
    title: 'MediQueue',
    type: 'Backend',
    year: '2024',
    description:
      'A healthcare management system that streamlines appointment scheduling, patient flow, and overall administrative operations for better service delivery.',
    technologies: ['Java', 'Spring Boot', 'Hibernate ORM', 'Spring Security', 'JWT', 'PostgreSQL'],
    link: 'https://github.com/Marthak-Nayan/MediQueue-Backend',
  },
  {
    id: 3,
    number: '03',
    title: 'University Management System',
    type: 'Desktop',
    year: '2023',
    description:
      'A comprehensive platform for managing university operations including student enrollment, course management, and faculty collaboration.',
    technologies: ['Java', 'Swing', 'MySQL', 'Netbeans'],
    link: 'https://github.com/Marthak-Nayan/University-Management-System',
  },
  {
    id: 4,
    number: '04',
    title: 'TeamSpace',
    type: 'Web',
    year: '2024',
    description:
      'A collaborative platform for teams to connect, communicate and conduct meetings in real-time. Facilitates seamless project management and team collaboration.',
    technologies: ['Next.js', 'React', 'MongoDB', 'Node.js', 'Socket.io', 'Tailwind CSS', 'GetStream.io'],
    link: 'https://github.com/Marthak-Nayan/TeamSpace',
  },
];

const Project = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [visibleRows, setVisibleRows] = useState([]);
  const ref = useRef(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const container = document.querySelector('.scroll-container');
    if (!container) return;

    const handleScroll = () => {
      if (!ref.current || hasTriggered.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        hasTriggered.current = true;
        projects.forEach((_, i) => {
          setTimeout(() => {
            setVisibleRows((prev) => [...prev, i]);
          }, i * 150);
        });
      }
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      ref={ref}
      className="w-full bg-[#f5f0e8] px-4 sm:px-8 lg:px-12 pt-4 pb-20 sm:pb-32 scroll-mt-20"
    >
      <div className="max-w-[1500px] mx-auto">

        {/* Label */}
        <div
          className={`flex items-center gap-3 mb-10 sm:mb-16 transition-all duration-700 ease-out
            ${visibleRows.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="w-6 h-px bg-[#818356]" />
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#818356] font-semibold">
            Selected Projects
          </span>
        </div>

        {/* Top border */}
        <div className="w-full h-px bg-[#e0d9ce]" />

        {/* Project rows */}
        <div className="flex flex-col">
          {projects.map((project, i) => {
            const isOpen = openIndex === i;
            const isVisible = visibleRows.includes(i);

            return (
              <div
                key={project.id}
                className={`relative border-b border-[#e0d9ce] transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >

                {/* Watermark number */}
                <span
                  className={`absolute right-0 top-1/2 -translate-y-1/2 font-extrabold leading-none select-none pointer-events-none transition-all duration-700 hidden sm:block
                    text-[80px] sm:text-[120px] lg:text-[160px]
                    ${isOpen
                      ? 'text-[#e8e0d0] opacity-100 translate-x-0 scale-100'
                      : 'opacity-0 translate-x-4 scale-95'
                    }`}
                  style={{
                    maxWidth: '40%',
                    overflow: 'hidden',
                    WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 100%)',
                    maskImage: 'linear-gradient(to left, black 60%, transparent 100%)',
                  }}
                >
                  {project.number}
                </span>

                {/* Row header */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center gap-3 sm:gap-6 py-5 sm:py-8 group text-left relative z-10"
                >
                  {/* Number */}
                  <span
                    className={`text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-bold min-w-[28px] sm:min-w-[32px] transition-colors duration-300
                      ${isOpen ? 'text-[#818356]' : 'text-[#c5bdb2]'} group-hover:text-[#818356]`}
                  >
                    {project.number}
                  </span>

                  {/* Title */}
                  <h3
                    className={`flex-1 font-extrabold tracking-tighter leading-tight transition-all duration-500
                      text-[clamp(18px,3.5vw,48px)]
                      ${isOpen ? 'text-[#0e0d0b]' : 'text-[#c5bdb2]'} group-hover:text-[#0e0d0b]`}
                  >
                    {project.title}
                  </h3>

                  {/* Type + Year — hidden on small, shown md+ */}
                  <div className="hidden md:flex items-center gap-6 lg:gap-10">
                    <span
                      className={`text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-300
                        ${isOpen ? 'text-[#818356]' : 'text-[#c5bdb2]'} group-hover:text-[#6b6560]`}
                    >
                      {project.type}
                    </span>
                    <span
                      className={`text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-300
                        ${isOpen ? 'text-[#6b6560]' : 'text-[#c5bdb2]'} group-hover:text-[#6b6560]`}
                    >
                      {project.year}
                    </span>
                  </div>

                  {/* Type only on small screens */}
                  <span
                    className={`md:hidden text-[9px] tracking-[0.15em] uppercase font-medium transition-colors duration-300 shrink-0
                      ${isOpen ? 'text-[#818356]' : 'text-[#c5bdb2]'}`}
                  >
                    {project.type}
                  </span>

                  {/* Circle toggle */}
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500
                      ${isOpen
                        ? 'border-[#818356] bg-[#818356] rotate-45'
                        : 'border-[#c5bdb2] bg-transparent'
                      } group-hover:border-[#818356]`}
                  >
                    <span
                      className={`text-base sm:text-xl font-light leading-none pb-0.5 transition-colors duration-300
                        ${isOpen ? 'text-[#f5f0e8]' : 'text-[#c5bdb2]'} group-hover:text-[#818356]`}
                    >
                      +
                    </span>
                  </div>
                </button>

                {/* Expandable content */}
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out
                    ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="pb-8 sm:pb-12 pl-8 sm:pl-14 pr-2 sm:pr-4 flex flex-col md:flex-row gap-8 sm:gap-12 items-start">

                    {/* Description */}
                    <p className="text-[#6b6560] text-sm sm:text-base leading-relaxed flex-1 max-w-[480px]">
                      {project.description}
                    </p>

                    {/* Right — tags + github */}
                    <div className="flex flex-col gap-4 sm:gap-6 w-full md:min-w-[220px] md:w-auto">

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 sm:px-3 py-1 border border-[#e0d9ce] text-[#a89f94] text-[9px] sm:text-[10px] tracking-[0.15em] uppercase font-medium hover:border-[#818356] hover:text-[#818356] transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* GitHub */}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center gap-2 sm:gap-3 self-start px-4 sm:px-6 py-2.5 sm:py-3 border border-[#0e0d0b] text-[#0e0d0b] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold overflow-hidden relative transition-all duration-300 hover:text-[#f5f0e8]"
                      >
                        <span className="absolute inset-0 bg-[#0e0d0b] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                        <FaGithub size={12} className="relative z-10" />
                        <span className="relative z-10">View Source</span>
                        <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                      </a>

                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Project;