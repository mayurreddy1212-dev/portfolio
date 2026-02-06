import { motion, useAnimation } from "framer-motion";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { useEffect } from "react";
import robot from "../assets/robot.png";
import resume from "../assets/resume.pdf";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const Home = () => {
  const yMayur = useAnimation();
  const yReddy = useAnimation();

  useEffect(() => {
    const flipSequence = async () => {
      await sleep(4000);

      while (true) {
        await sleep(300);

        await yMayur.start({
          rotateX: Array.from({ length: 13 }, (_, i) => i * 180),
          transition: { duration: 1, ease: "linear" },
        });
        yMayur.set({ rotateX: 0 }); 

        await sleep(350);

        await yReddy.start({
          rotateX: Array.from({ length: 12 }, (_, i) => i * 180),
          transition: { duration: 1, ease: "linear" },
        });
        yReddy.set({ rotateX: 0 });

        await sleep(4000);
      }
    };

    flipSequence();
  }, [yMayur, yReddy]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-between px-16 text-white overflow-hidden bg-black/50"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(168,139,255,0.35),transparent_45%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-xl"
      >
        <motion.p variants={itemUp} className="text-[#b8a1ff] text-lg mb-3">
          Hello, I am
        </motion.p>

        <motion.h1 variants={itemUp} className="text-5xl font-bold leading-tight mb-4">
          Ma
          <motion.span
            animate={yMayur}
            className="inline-block origin-center [transform-style:preserve-3d]"
          >
            y
          </motion.span>
          ur{" "}
          <span className="text-white">
            Redd
            <motion.span
              animate={yReddy}
              className="inline-block origin-center [transform-style:preserve-3d]"
            >
              y
            </motion.span>
          </span>
        </motion.h1>

        <motion.p variants={itemUp} className="text-sm text-gray-300 mb-8 leading-relaxed">
          I am a Full Stack Developer, I create high-impact web experiences,
          building modern, scalable, and lightning-fast applications that make
          a difference.
        </motion.p>

        <motion.div variants={itemUp} className="flex gap-4 mb-6">
          <a
            href="#projects"
            className="px-6 py-2 rounded-full bg-[#b8a1ff] text-black font-medium hover:scale-105 transition"
          >
            View My Work
          </a>
          <a
            href={resume}
            download
            className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition"
          >
            My Resume
          </a>
        </motion.div>

        <motion.div variants={itemUp} className="flex gap-4 text-xl opacity-80">
          <FaXTwitter className="hover:text-white cursor-pointer" />
          <FaLinkedin className="hover:text-white cursor-pointer" />
          <FaGithub className="hover:text-white cursor-pointer" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeIn" }}
        className="relative z-10"
      >
        <motion.img
          src={robot}
          alt="Robot"
          className="w-[780px]"
          animate={{ y: [0, -22, 0], rotate: [0, 1.5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default Home;
