import { useEffect, useRef, useState } from 'react';

const About = () => {
    const [visible, setVisible] = useState(false);
    const [skillsVisible, setSkillsVisible] = useState(false);
    const [expVisible, setExpVisible] = useState(false);
    const [eduVisible, setEduVisible] = useState(false);

    const ref = useRef(null);
    const skillsRef = useRef(null);
    const expRef = useRef(null);
    const eduRef = useRef(null);

    useEffect(() => {
        const container = document.querySelector('.scroll-container');
        if (!container) return;
        const handleScroll = () => {
            const check = (r, setter) => {
                if (!r.current) return;
                const rect = r.current.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.85) setter(true);
            };
            check(ref, setVisible);
            check(skillsRef, setSkillsVisible);
            check(expRef, setExpVisible);
            check(eduRef, setEduVisible);
        };
        container.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const TitleBlock = ({ v, label, heading, bg = 'bg-[#f5f0e8]' }) => (
        <div className={`relative px-8 sm:px-16 lg:px-20 py-12 sm:py-16 ${bg}`}>
            <div className="absolute top-0 left-0 h-full flex pointer-events-none">
                <div className={`w-3 sm:w-6 ${bg} h-full`} />
                <div
                    className="w-[2px] bg-gradient-to-b from-transparent via-[#818356] to-transparent transition-all duration-1000 ease-out"
                    style={{ opacity: v ? 1 : 0, transform: v ? 'scaleY(1)' : 'scaleY(0)', transformOrigin: 'top' }}
                />
            </div>
            <div className="absolute top-0 right-0 h-full flex pointer-events-none">
                <div
                    className="w-[2px] bg-gradient-to-b from-transparent via-[#818356] to-transparent transition-all duration-1000 ease-out"
                    style={{ opacity: v ? 1 : 0, transform: v ? 'scaleY(1)' : 'scaleY(0)', transformOrigin: 'top', transitionDelay: '150ms' }}
                />
                <div className={`w-3 sm:w-6 ${bg} h-full`} />
            </div>
            <div className="max-w-[1500px] mx-auto">
                <div className={`flex items-center gap-3 mb-8 sm:mb-10 transition-all duration-700 ease-out ${v ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>
                    <div className="h-px bg-[#818356] transition-all duration-700 ease-out" style={{ width: v ? '24px' : '0px', transitionDelay: '200ms' }} />
                    <span className="text-[10px] tracking-[0.35em] uppercase text-[#818356] font-semibold">{label}</span>
                </div>
                <div className="overflow-hidden mb-8 sm:mb-10">
                    <h2
                        className={`text-[clamp(32px,6vw,100px)] font-extrabold leading-none tracking-tighter text-[#0e0d0b] transition-all duration-700 ease-out ${v ? 'opacity-100 translate-y-0 skew-y-0' : 'opacity-0 translate-y-full skew-y-1'}`}
                        style={{ transitionDelay: '100ms' }}
                    >
                        {heading}
                    </h2>
                </div>
                <div
                    className={`flex items-center gap-4 transition-all duration-1000 ease-out ${v ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                    style={{ transformOrigin: 'left', transitionDelay: '150ms' }}
                >
                    <div className="w-2 h-2 rounded-full bg-[#818356] shrink-0" />
                    <div className="flex-1 h-px bg-[#818356]/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#818356]/40 shrink-0" />
                    <div className="w-1 h-1 rounded-full bg-[#818356]/20 shrink-0" />
                </div>
            </div>
        </div>
    );

    const skills = [
        {
            category: 'Languages & Tools',
            items: ['Java', 'SQL', 'JavaScript', 'Maven', 'Git', 'GitHub', 'Postman', 'PostgreSQL', 'MongoDB', 'Docker'],
        },
        {
            category: 'Frameworks & Libraries',
            items: ['Spring Boot', 'Hibernate ORM', 'JPA', 'Spring Security', 'JWT', 'RESTful APIs', 'React', 'Next.js', 'Node.js'],
        },
        {
            category: 'Core Concepts',
            items: ['DSA', 'OOP', 'DBMS'],
        },
    ];

    const education = [
        {
            logo: '/images/GTULogo-scaled.jpg',
            name: 'Gujarat Technological University (Affiliated: SVIT)',
            course: 'Master of Computer Application',
            year: '2024 – 2026',
        },
        {
            logo: '/images/atmiya.png',
            name: 'Atmiya Institute of Technology & Science, Rajkot',
            course: 'Bachelor of Computer Application',
            year: '2021 – 2024',
        },
    ];

    return (
        <section id="about">

            {/* ── ABOUT ME ── */}
            <TitleBlock v={visible} label="About Me" heading="WHO I AM/" />

            <div ref={ref} className="w-full px-5 sm:px-10 lg:px-12 pb-16 sm:pb-24 lg:pb-32">
                <div className="max-w-[1500px] mx-auto">
                    <div
                        className={`grid grid-cols-1 lg:grid-cols-[360px_1fr] xl:grid-cols-[400px_1fr] gap-10 sm:gap-14 lg:gap-20 items-start transition-all duration-700 ease-out
              ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '200ms' }}
                    >

                        <div className="relative mx-auto lg:mx-0 w-full group" style={{ maxWidth: '400px' }}>

                            <div
                                className="border border-[#818356]/25 group-hover:border-[#818356]/50 
                                transition-all duration-500 overflow-hidden 
                                rounded-t-[20px] rounded-b-none"
                                style={{
                                    boxShadow: '0 4px 24px rgba(129,131,86,0.08)',
                                }}
                            >
                                <img
                                    src="/images/profile.jpg"
                                    alt="Nayan Marthak"
                                    className="w-full h-[300px] sm:h-[360px] lg:h-[440px] 
                                    object-cover block 
                                    grayscale-[20%] group-hover:grayscale-0 
                                    transition-all duration-700 
                                    group-hover:scale-105"
                                />

                            </div>
                        </div>

                        {/* Text */}
                        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 pt-0 lg:pt-16">
                            <span className="text-[10px] tracking-[0.3em] uppercase text-[#818356] font-semibold">
                                (About Me)
                            </span>
                            <div className="flex flex-col gap-5 sm:gap-6">
                                <p className="text-[#a89f94] text-base sm:text-lg leading-relaxed">
                                    I'm Nayan Marthak — a curious and driven software developer
                                    from Rajkot, currently based in Vadodara. I enjoy turning
                                    complex problems into simple, reliable solutions and take
                                    pride in writing clean, maintainable code.
                                </p>
                                <p className="text-[#6b6560] text-sm sm:text-base leading-relaxed border-l-2 border-[#818356] pl-4 sm:pl-5 italic">
                                    "Whatever I do, I do with all my heart and finish it.
                                    I believe in curiosity, continuous learning, and giving
                                    my best to everything I undertake."
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ── EXPERIENCE ── */}
            <TitleBlock v={expVisible} label="Experience" heading="EXPERIENCE/" />

            <div ref={expRef} className="w-full px-5 sm:px-10 lg:px-12 pb-16 sm:pb-24 lg:pb-32">
                <div className="max-w-[1500px] mx-auto">
                    <div
                        className={`group grid grid-cols-[60px_1fr] sm:grid-cols-[80px_1fr_auto] items-center gap-4 sm:gap-6 lg:gap-8 p-5 sm:p-6 lg:p-8
        border border-[#e0d9ce] rounded-2xl transition-all duration-500 ease-out
        hover:border-[#818356]/40 hover:bg-[#eee8dc] hover:shadow-[0_4px_24px_rgba(129,131,86,0.08)]
        ${expVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '200ms' }}
                    >
                        {/* Logo */}
                        <div className="w-[60px] h-[60px] sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white flex items-center justify-center shrink-0 border border-[#818356]/20 group-hover:border-[#818356]/50 transition-all duration-500">
                            <img src="/images/logo.png" alt="Nomos Insights" className="w-full h-full object-cover" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <h4 className="text-[#0e0d0b] font-bold text-sm sm:text-lg tracking-tight leading-snug">
                                Nomos Insights
                            </h4>
                            <p className="text-[#818356] text-xs sm:text-sm tracking-[0.15em] uppercase font-semibold">
                                Software Engineer Intern
                            </p>
                            <span className="sm:hidden text-[#6b6560] text-xs tracking-[0.15em] uppercase font-medium mt-1">
                                Feb '26 – Present
                            </span>
                        </div>

                        <div className="hidden sm:block text-right">
                            <span className="text-[#6b6560] text-sm tracking-[0.15em] uppercase font-medium whitespace-nowrap">
                                Feb '26 – Present
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── SKILLS ── */}
            <TitleBlock v={skillsVisible} label="Skills" heading="WHAT I KNOW/" bg="bg-[#f5f0e8]" />

            <div ref={skillsRef} className="w-full bg-[#f5f0e8] px-5 sm:px-10 lg:px-12 pb-16 sm:pb-24 lg:pb-32">
                <div className="max-w-[1500px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start">
                        <div
                            className={`transition-all duration-700 ease-out ${skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: '150ms' }}
                        >
                            <h4 className="text-[clamp(1.8rem,4vw,3.5rem)] font-extrabold leading-tight tracking-tighter text-[#0e0d0b]">
                                DEVELOPER<br />DESIGNER<br />CREATOR/
                            </h4>
                        </div>
                        <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-10">
                            {skills.map((cat, ci) => (
                                <div
                                    key={cat.category}
                                    className={`flex flex-col transition-all duration-700 ease-out ${skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                    style={{ transitionDelay: `${200 + ci * 100}ms` }}
                                >
                                    <h5 className="text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#818356] font-semibold mb-3 sm:mb-6 pb-3 sm:pb-4 border-b border-[#e0d9ce] leading-tight">
                                        {cat.category}
                                    </h5>
                                    <div className="flex flex-col">
                                        {cat.items.map((skill, si) => (
                                            <div
                                                key={skill}
                                                className={`text-[11px] sm:text-sm py-2 sm:py-3 border-b border-[#e0d9ce] text-[#6b6560] font-medium tracking-wide transition-all duration-300 hover:text-[#0e0d0b] hover:pl-2 sm:hover:pl-3 hover:border-[#818356] cursor-default
                          ${skillsVisible ? 'opacity-100' : 'opacity-0'}`}
                                                style={{ transitionDelay: `${300 + ci * 100 + si * 40}ms` }}
                                            >
                                                {skill}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── EDUCATION ── */}
            <TitleBlock v={eduVisible} label="Education" heading="EDUCATION/" bg="bg-[#f5f0e8]" />

            <div ref={eduRef} className="w-full bg-[#f5f0e8] px-5 sm:px-10 lg:px-12 pb-16 sm:pb-24 lg:pb-32">
                <div className="max-w-[1500px] mx-auto">
                    <div className="flex flex-col gap-3 sm:gap-4">
                        {education.map((edu, i) => (
                            <div
                                key={edu.name}
                                className={`group grid grid-cols-[60px_1fr] sm:grid-cols-[80px_1fr_auto] items-center gap-4 sm:gap-6 lg:gap-8 p-5 sm:p-6 lg:p-8
                  border border-[#e0d9ce] rounded-2xl transition-all duration-500 ease-out
                  hover:border-[#818356]/40 hover:bg-[#eee8dc] hover:shadow-[0_4px_24px_rgba(129,131,86,0.08)]
                  ${eduVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${200 + i * 120}ms` }}
                            >
                                {/* Logo */}
                                <div className="w-[60px] h-[60px] sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white flex items-center justify-center shrink-0 border border-[#818356]/20 group-hover:border-[#818356]/50 transition-all duration-500">
                                    <img src={edu.logo} alt={edu.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="text-[#0e0d0b] font-bold text-sm sm:text-lg tracking-tight leading-snug">
                                        {edu.name}
                                    </h4>
                                    <p className="text-[#818356] text-xs sm:text-sm tracking-[0.15em] uppercase font-semibold">
                                        {edu.course}
                                    </p>
                                    <span className="sm:hidden text-[#6b6560] text-xs tracking-[0.15em] uppercase font-medium mt-1">
                                        {edu.year}
                                    </span>
                                </div>
                                <div className="hidden sm:block text-right">
                                    <span className="text-[#6b6560] text-sm tracking-[0.15em] uppercase font-medium whitespace-nowrap">
                                        {edu.year}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
};

export default About;