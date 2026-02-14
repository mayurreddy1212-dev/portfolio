import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = [
  { main: "WELCOME", sub: "ENGLISH" },
   { main: "ようこそ", sub: "JAPANESE" },
  { main: "स्वागतम्", sub: "HINDI" },
];

const Intro = ({ onFinish }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const wordDuration = 600;
    const stagger = 100;
    const total = (words.length - 1) * stagger + wordDuration;

    const timer = setTimeout(() => {
      setShow(false);
      onFinish();
    }, total + 10);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black overflow-hidden"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {words.map((word, i) => (
              <motion.div
                key={i}
                className="absolute flex flex-col items-center"
                initial={{ y: "120%", opacity: 0, filter: "blur(16px)" }}
                animate={{
                  y: "-120%",
                  opacity: [0, 1, 1, 0],
                  filter: ["blur(16px)", "blur(0px)", "blur(0px)", "blur(10px)"],
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  delay: i * 0.28,
                }}
              >
                <h1 className="text-white text-6xl md:text-7xl font-extrabold tracking-widest">
                  {word.main}
                </h1>
                <span className="mt-2 text-white/70 text-2xl tracking-wider">
                  {word.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Intro;
