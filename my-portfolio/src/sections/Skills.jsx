import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import {
  SiReact,
  SiTailwindcss,
  SiFastapi,
  SiOpenai,
  SiGithub,
  SiDocker,
} from "react-icons/si";
import { useRef } from "react";

const skills = [
  { Icon: SiReact, label: "React" },
  { Icon: SiTailwindcss, label: "Tailwind" },
  { Icon: SiFastapi, label: "FastAPI" },
  { Icon: SiOpenai, label: "Gen AI" },
  { Icon: SiGithub, label: "GitHub" },
  { Icon: SiDocker, label: "Docker" },
];

const RADIUS = 240;
const AUTO_SPEED = 0.0004;
const SCROLL_MULTIPLIER = 0.025;

const Skills = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const velocity = useVelocity(scrollYProgress);
  const rotation = useMotionValue(0);

  useAnimationFrame(() => {
    const v = velocity.get();
    rotation.set(
      rotation.get() + AUTO_SPEED + v * SCROLL_MULTIPLIER
    );
  });

  return (
    <section
      ref={ref}
      id="skills"
      className="relative h-[180vh] flex items-center justify-center bg-black/70 text-white overflow-hidden"
    >
      <h2 className="absolute top-24 text-4xl font-bold text-[#b8a1ff]">
        My Skills
      </h2>

      <div className="relative w-[520px] h-[520px]">
        {skills.map(({ Icon, label }, i) => {
          const baseAngle = (360 / skills.length) * i;

          const angle = useTransform(rotation, (r) => baseAngle + r * 360);

          const x = useTransform(angle, (a) =>
            Math.cos((a * Math.PI) / 180) * RADIUS
          );

          const y = useTransform(angle, (a) =>
            Math.sin((a * Math.PI) / 180) * RADIUS
          );

          const opacity = useTransform(
            scrollYProgress,
            [0.05, 0.15],
            [0, 1]
          );

          return (
            <motion.div
              key={i}
              style={{ x, y, opacity }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-lg flex flex-col items-center justify-center gap-1">
                <Icon className="text-4xl text-[#b8a1ff]" />
                <span className="text-xs text-white/70">{label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
