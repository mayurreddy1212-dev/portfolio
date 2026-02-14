import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

import p1Img from "../assets/p1.png";
import p2Img from "../assets/p2.png";
import p3Img from "../assets/p3.png";

const projects = [
  { title: "Employee Management System", subtitle: "Basic chatbot created using flask and sqlite", image: p1Img, link: "https://ems-frontend-pi-five.vercel.app/" },
  { title: "Company Management System", subtitle: "CMS with AI features", image: p2Img, link: "" },
  { title: "Advanced Chatbot", subtitle: "Advanced Chatbot with FastAPI, React. has multiple models", image: p3Img, link: "" },
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
    <section
      id="projects"
      className="relative h-screen flex flex-col items-center 
                 justify-center bg-black/80 text-white overflow-hidden"
    >
      <h1 className="absolute top-12 text-3xl font-semibold tracking-wide">
        My Work
      </h1>

      <div className="relative w-[85%] max-w-6xl h-[65%] 
                      rounded-2xl overflow-hidden shadow-2xl">
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
            className="group absolute w-full h-full 
                       cursor-grab active:cursor-grabbing"
          >
            {/* Image */}
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-r 
                         from-black/70 via-black/40 to-black/70
                         opacity-80 group-hover:opacity-90 
                         transition-opacity duration-300"
            />

            {/* Content */}
            <div
              className="absolute left-12 top-1/2 
                         -translate-y-1/2 max-w-md"
            >
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
                className="inline-block px-6 py-3 rounded-full 
                           bg-white text-black font-medium
                           hover:scale-105 transition"
              >
                View Project
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination */}
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
