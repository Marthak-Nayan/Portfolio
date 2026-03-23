import { useEffect, useState } from 'react';

const codeLines = [
  { indent: 0, token: 'class', name: 'NayanMarthak', brace: '{' },
  { indent: 1, token: 'String', name: 'location', value: '"Surat, India 📍"' },
  { indent: 1, token: 'String', name: 'motto', value: '"Whatever I do, I do with all my heart"' },
  { indent: 1, token: 'String', name: 'funFact', value: '"Debugs better after chai ☕"' },
  { indent: 1, token: 'String', name: 'status', value: '"Always learning, never stopping 🚀"' },
  { indent: 0, token: '}', name: '', value: '' },
];

const Hero = ({ scrollToSection }) => {
  const [mounted, setMounted] = useState(false);
  const [typedLines, setTypedLines] = useState(0);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Vertical divider draws down after mount
  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(() => setLineVisible(true), 600);
    return () => clearTimeout(t);
  }, [mounted]);

  // Code lines type in one by one
  useEffect(() => {
    if (!mounted) return;
    if (typedLines >= codeLines.length) return;
    const t = setTimeout(() => {
      setTypedLines((prev) => prev + 1);
    }, 250);
    return () => clearTimeout(t);
  }, [mounted, typedLines]);

  return (
    <section
      id="home"
      className="min-h-[calc(100vh-80px)] w-full bg-[#f5f0e8] flex items-center relative overflow-hidden"
    >

      {/* Vertical divider — draws down */}
      <div
        className="absolute top-0 left-[58%] w-px bg-[#e0d9ce] hidden lg:block transition-all duration-1000 ease-out"
        style={{ height: lineVisible ? '100%' : '0%' }}
      />

      {/* Top horizontal line — draws right */}
      <div
        className="absolute top-0 left-0 h-px bg-[#e0d9ce] transition-all duration-1000 ease-out"
        style={{ width: mounted ? '100%' : '0%' }}
      />

      {/* Bottom horizontal line — draws left from right */}
      <div
        className="absolute bottom-0 right-0 h-px bg-[#e0d9ce] transition-all duration-1000 ease-out"
        style={{
          width: mounted ? '100%' : '0%',
          transitionDelay: '400ms',
        }}
      />

      <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 w-full grid grid-cols-1 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_460px] gap-8 lg:gap-16 items-center py-12 lg:py-16">

        {/* ── LEFT ── */}
        <div className="flex flex-col gap-6 lg:gap-8">

          {/* Label — slides in from left */}
          <div
            className={`flex items-center gap-3 transition-all duration-700 ease-out
              ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <div
              className="h-px bg-[#818356] transition-all duration-700 ease-out"
              style={{ width: mounted ? '24px' : '0px', transitionDelay: '200ms' }}
            />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#818356] font-semibold">
              Intern · Nomos Insights · MAR 2026
            </span>
          </div>

          {/* Name — word by word reveal from below */}
          <div className="flex flex-col gap-0 overflow-hidden">
            {['NAYAN', 'MARTHAK'].map((word, i) => (
              <div key={word} className="overflow-hidden">
                <h1
                  className={`text-[clamp(48px,8.5vw,130px)] font-extrabold leading-[0.92] tracking-tighter text-[#0e0d0b] transition-all duration-700 ease-out
                    ${mounted ? 'opacity-100 translate-y-0 skew-y-0' : 'opacity-0 translate-y-full skew-y-2'}`}
                  style={{ transitionDelay: `${180 + i * 130}ms` }}
                >
                  {word}
                </h1>
              </div>
            ))}
          </div>

          {/* Description — fades up */}
          <p
            className={`text-[#6b6560] text-sm sm:text-base leading-relaxed max-w-[420px] transition-all duration-700 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '460ms' }}
          >
            I build clean, reliable software — from robust Java backends
            to full‑stack web applications. Curious by nature, precise by habit.
          </p>

          {/* CTA row — slides up */}
          <div
            className={`flex flex-wrap items-center gap-5 sm:gap-8 transition-all duration-700 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '560ms' }}
          >
            {/* Primary button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="group relative flex items-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 bg-[#0e0d0b] text-[#f5f0e8] text-xs tracking-[0.2em] uppercase font-bold overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(14,13,11,0.15)]"
            >
              <span className="absolute inset-0 bg-[#818356] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10">Get in Touch</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </button>

            {/* Ghost link */}
            <button
              onClick={() => scrollToSection('service')}
              className="flex items-center gap-2 text-[#6b6560] text-xs tracking-[0.2em] uppercase font-semibold hover:text-[#0e0d0b] transition-colors duration-300 group"
            >
              <span>View Work</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </button>
          </div>

        </div>

        {/* ── RIGHT — Code snippet ── */}
        <div
          className={`hidden md:block transition-all duration-1000 ease-out
          ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="relative bg-[#0e0d0b] rounded-sm overflow-hidden shadow-[0_20px_60px_rgba(14,13,11,0.25)]">

            {/* Window bar */}
            <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5">
              {/* Traffic lights — stagger in */}
              {[
                { color: '#ff5f57', delay: '600ms' },
                { color: '#febc2e', delay: '700ms' },
                { color: '#28c840', delay: '800ms' },
              ].map((dot) => (
                <div
                  key={dot.color}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ease-out
                    ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                  style={{ backgroundColor: dot.color, transitionDelay: dot.delay }}
                />
              ))}
              <span
                className={`ml-4 text-[11px] text-white/20 tracking-widest uppercase transition-all duration-500 ease-out
                  ${mounted ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '900ms' }}
              >
                Nayan.java
              </span>
            </div>

            {/* Code body */}
            <div className="px-6 py-6 font-mono text-sm leading-8 min-h-[280px]">
              {codeLines.slice(0, typedLines).map((line, i) => (
                <div
                  key={i}
                  className="flex gap-4"
                  style={{
                    paddingLeft: `${line.indent * 20}px`,
                    animation: 'fadeSlideIn 0.3s ease-out forwards',
                  }}
                >
                  <span className="text-white/15 select-none w-4 text-right shrink-0 text-xs mt-0.5">
                    {i + 1}
                  </span>
                  <span>
                    {line.token === '}' ? (
                      <span className="text-[#f5f0e8]/60">{'}'}</span>
                    ) : line.brace ? (
                      <>
                        <span className="text-[#818356]">{line.token} </span>
                        <span className="text-[#f5f0e8]">{line.name} </span>
                        <span className="text-[#f5f0e8]/40">{'{'}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-[#818356]">{line.token} </span>
                        <span className="text-[#c5bdb2]">{line.name}</span>
                        <span className="text-white/30"> = </span>
                        <span className="text-[#a8c5a0]">{line.value}</span>
                        <span className="text-white/20">;</span>
                      </>
                    )}
                  </span>
                </div>
              ))}

              {/* Blinking cursor */}
              {typedLines < codeLines.length && (
                <div
                  className="flex gap-4"
                  style={{ paddingLeft: `${(codeLines[typedLines]?.indent || 0) * 20 + 36}px` }}
                >
                  <span className="inline-block w-2 h-5 bg-[#818356] animate-pulse" />
                </div>
              )}
            </div>

            {/* Bottom tag */}
            <div
              className={`px-6 py-3 border-t border-white/5 flex justify-between items-center transition-all duration-500 ease-out
                ${typedLines >= codeLines.length ? 'opacity-100' : 'opacity-0'}`}
            >
              <span className="text-[10px] text-white/15 tracking-widest uppercase">Java</span>
              <span className="text-[10px] text-[#818356]/60 tracking-widest uppercase">Ready to build</span>
            </div>

          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-700 ease-out
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="bg-[#0e0d0b] rounded-sm px-5 py-4">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-[10px] text-white/20 tracking-widest uppercase">Nayan.java</span>
            </div>
            <div className="font-mono text-xs leading-7">
              <div className="text-[#818356]">class <span className="text-[#f5f0e8]">NayanMarthak</span> {'{'}</div>
              <div className="pl-4 text-[#818356]">String <span className="text-[#c5bdb2]">status</span><span className="text-white/30"> = </span><span className="text-[#a8c5a0]">"Always learning, never stopping 🚀"</span><span className="text-white/20">;</span></div>
              <div className="pl-4 text-[#818356]">String <span className="text-[#c5bdb2]">location</span><span className="text-white/30"> = </span><span className="text-[#a8c5a0]">"Surat, India 📍"</span><span className="text-white/20">;</span></div>
              <div className="text-[#f5f0e8]/60">{'}'}</div>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator — bounces in */}
      <div
        className={`absolute bottom-2 sm:bottom-8 left-5 sm:left-12 flex items-center gap-3 transition-all duration-700
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: '1000ms' }}
      >
        <div className="w-5 h-8 border border-[#c5bdb2] rounded-full flex items-start justify-center pt-1.5">
          <div className="w-0.5 h-2 bg-[#818356] rounded-full animate-bounce" />
        </div>
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#c5bdb2]">Scroll</span>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </section>
  );
};

export default Hero;