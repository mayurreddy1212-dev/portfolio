import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

import p1Img from "../assets/p1.jpg";
import p2Img from "../assets/p2.jpg";
import p3Img from "../assets/p3.jpg";

import v1 from "../assets/v1.mp4";
import v2 from "../assets/v2.mp4";
import v3 from "../assets/v3.mp4";

const projects = [
  { title: "p1", subtitle: "project1", image: p1Img, video: v1, link: "" },
  { title: "p2", subtitle: "project2", image: p2Img, video: v2, link: "" },
  { title: "p3", subtitle: "project3", image: p3Img, video: v3, link: "" },
];

const swipeConfidenceThreshold = 80;

const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
};

const ProjectSection = () => {
  const [[index, direction], setIndex] = useState([0, 0]);
  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef(null);

  const paginate = (newDirection) => {
    setIndex(([prev]) => [
      (prev + newDirection + projects.length) % projects.length,
      newDirection,
    ]);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => paginate(1), 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  const project = projects[index];

  return (
    <section className="relative h-screen flex flex-col items-center justify-center bg-black/80 text-white overflow-hidden">
      <h1 className="absolute top-12 text-3xl font-semibold tracking-wide">
        My Work
      </h1>

      <div className="relative w-[85%] max-w-6xl h-[65%] rounded-2xl overflow-hidden shadow-2xl">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) paginate(1);
              else if (swipe > swipeConfidenceThreshold) paginate(-1);
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="absolute w-full h-full cursor-grab active:cursor-grabbing"
          >
            {!hovered ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            )}

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute left-12 top-1/2 -translate-y-1/2 max-w-md">
              <h3 className="text-4xl font-bold mb-3">
                {project.title}
              </h3>
              <p className="text-white/80 mb-6">
                {project.subtitle}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-full bg-white text-black font-medium hover:scale-105 transition"
              >
                View Project
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-16 flex gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex([i, i > index ? 1 : -1])}
            className={`h-1 w-10 rounded-full transition ${
              i === index ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
