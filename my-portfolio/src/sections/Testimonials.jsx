import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Yash",
    role: "Associate Engineer, Tech Mahindra",
    feedback:
      "Good",
  },
  {
    name: "Neeraj",
    role: "Associate Engineer, Tech Mahidra",
    feedback:
      "Excellent",
  },
  {
    name: "Swami Panjala",
    role: "CEO, Elite Softwares",
    feedback:
      "Excellent",
  },
];

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 2500);

    return () => clearInterval(id);
  }, [hovered]);

  return (
    <section id="testimonials" className="relative min-h-screen bg-black/60 text-white flex items-center justify-center overflow-hidden">
      <h2 className="absolute top-16 text-4xl font-semibold tracking-wide">
        Testimonials
      </h2>

      <div
        className="relative w-[80%] max-w-3xl mt-32"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.6 }}
            className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <p className="text-lg text-white/85 leading-relaxed mb-8">
              “{testimonials[index].feedback}”
            </p>

            <div className="flex flex-col">
              <span className="font-semibold text-white">
                {testimonials[index].name}
              </span>
              <span className="text-sm text-white/60">
                {testimonials[index].role}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-20 flex gap-3">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition ${
              i === index
                ? "bg-white scale-125"
                : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(184,161,255,0.12),transparent_65%)]" />
    </section>
  );
};

export default TestimonialsSection;
