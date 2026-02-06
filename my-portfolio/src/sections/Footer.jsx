import { useEffect, useRef, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const text = "Thanks for visiting";
  const letters = text.split("");

  const footerRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      {
        threshold: 0.35,
      }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="min-h-[100vh] flex flex-col items-center justify-center gap-12 overflow-hidden bg-black/50"
    >
      {/* Animated text */}
      <h2 className="text-4xl md:text-6xl font-light tracking-wide text-center">
        {letters.map((char, i) => {
          const offsetX = (Math.random() - 0.5) * 60;
          const offsetY = 40 + Math.random() * 40;

          return (
            <span
              key={i}
              className="inline-block"
              style={{
                opacity: active ? 1 : 0,
                transform: active
                  ? "translate3d(0, 0, 0) scale(1)"
                  : `translate3d(${offsetX}px, ${offsetY}px, 0) scale(0.9)`,
                filter: active ? "blur(0px)" : "blur(6px)",
                transition: `
                  opacity 0.8s ease,
                  transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                  filter 0.8s ease
                `,
                transitionDelay: active
                  ? `${i * 90}ms`
                  : `${(letters.length - i) * 40}ms`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </h2>

      {/* Social icons */}
      <div
        className="flex gap-8 text-2xl"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
          transitionDelay: active ? "900ms" : "0ms",
        }}
      >
        <a
          href="https://github.com/mayurreddy1212-dev"
          target="_blank"
          className="hover:scale-125 hover:text-purple-400 transition-all"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/mayur-reddy-28b38124b/"
          target="_blank"
          className="hover:scale-125 hover:text-purple-400 transition-all"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://x.com/ReddyMayur47642"
          target="_blank"
          className="hover:scale-125 hover:text-purple-400 transition-all"
        >
          <FaTwitter />
        </a>
        <a
          href="mailto:mayurreddy5@gmail.com"
          className="hover:scale-125 hover:text-purple-400 transition-all"
        >
          <FaEnvelope />
        </a>
      </div>

      {/* Closing note */}
      <p
        className="text-xs tracking-widest opacity-50"
        style={{
          opacity: active ? 0.6 : 0,
          transition: "opacity 0.8s ease",
          transitionDelay: active ? "1100ms" : "0ms",
        }}
      > 
        Let’s build together
      </p>
    </footer>
  );
};

export default Footer;
