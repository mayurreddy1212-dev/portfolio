import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const planets = [
  { orbit: 140, size: 5, duration: 12, color: "#a3a3a3" },
  { orbit: 170, size: 6, duration: 18, color: "#facc15" },
  { orbit: 200, size: 6, duration: 24, color: "#60a5fa" },
  { orbit: 230, size: 5, duration: 32, color: "#f87171" },
  { orbit: 280, size: 10, duration: 48, color: "#fdba74" },
  { orbit: 330, size: 9, duration: 60, color: "#fde68a" },
  { orbit: 380, size: 8, duration: 72, color: "#67e8f9" },
  { orbit: 430, size: 8, duration: 90, color: "#818cf8" },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center px-16 md:px-24 text-white overflow-hidden bg-black"
    >
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(168,139,255,0.35),transparent_45%)]" />

      <div className="relative z-10 flex flex-col md:flex-row items-center w-full gap-24">
        <div className="flex-1 flex justify-center md:justify-start relative group">
          <div
            className="absolute left-1/2 top-1/2 w-36 h-36 rounded-full
                       -translate-x-1/2 -translate-y-1/2
                       bg-[radial-gradient(circle,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.15)_35%,transparent_65%)]
                       blur-xl"
          />

          {planets.map((p, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full
                         border border-white/10
                         -translate-x-1/2 -translate-y-1/2
                         transition-[animation-duration] duration-700
                         group-hover:[animation-duration:calc(var(--d)*3)]"
              style={{
                width: p.orbit,
                height: p.orbit,
                animation: `spin ${p.duration}s linear infinite`,
                "--d": `${p.duration}s`,
              }}
            >
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  boxShadow: `0 0 6px ${p.color}`,
                }}
              />
            </div>
          ))}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex-1 max-w-2xl relative"
        >
          <motion.div
            className="absolute -inset-6 rounded-3xl
                       bg-gradient-to-br from-[#b8a1ff]/20 to-cyan-400/10
                       blur-2xl opacity-60"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <div className="relative z-10">
            <motion.h2
              variants={itemUp}
              className="text-4xl md:text-5xl font-bold mb-2 text-[#b8a1ff]"
            >
              Mayur Reddy
            </motion.h2>

            <motion.p
              variants={itemUp}
              className="text-xl text-gray-300 mb-6"
            >
              Full Stack Developer
            </motion.p>

            <motion.p
              variants={itemUp}
              className="text-gray-400 text-lg leading-relaxed mb-10"
            >
              I build scalable, modern applications with a strong focus on clean
              architecture, delightful UX, and performance.
            </motion.p>

            <motion.div
              variants={itemUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
            >
              {[
                { title: "Experience", value: "1+ years" },
                { title: "Stack", value: "Full Stack Dev" },
                { title: "Projects", value: "10+" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6, scale: 1.04 }}
                  className="rounded-xl bg-white/5 border border-white/10
                             px-4 py-4 text-center backdrop-blur
                             hover:border-[#b8a1ff]/40 transition"
                >
                  <p className="text-sm text-gray-400">{item.title}</p>
                  <p className="text-lg font-semibold text-white">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemUp} className="flex gap-4">
              <a
                href="#projects"
                className="px-6 py-3 rounded-lg bg-white text-black
                           font-medium hover:bg-gray-200 transition"
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="px-6 py-3 rounded-lg border border-white/20
                           text-white hover:bg-white/10 transition"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
