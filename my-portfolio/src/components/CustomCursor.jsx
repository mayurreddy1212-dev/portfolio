import { useEffect, useRef, useState } from "react";

const lerp = (start, end, amt) => start + (end - start) * amt;

const CustomCursor = () => {
  const cursorRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  const size = useRef(18);        // current size
  const targetSize = useRef(18);  // size based on scroll

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = Math.min(scrollY / maxScroll, 1);

      // Cursor grows as user scrolls
      targetSize.current = 18 + progress * 50; // 18px → ~68px
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("scroll", onScroll);

    let rafId;
    const animate = () => {
      // smooth lag follow
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.06);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.06);

      // smooth size change
      size.current = lerp(size.current, targetSize.current, 0.08);

      if (cursorRef.current) {
        const finalSize = clicked ? size.current * 0.85 : size.current;

        cursorRef.current.style.width = `${finalSize}px`;
        cursorRef.current.style.height = `${finalSize}px`;

        cursorRef.current.style.transform = `translate3d(
          ${pos.current.x - finalSize / 2}px,
          ${pos.current.y - finalSize / 2}px,
          0
        )`;
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("scroll", onScroll);
    };
  }, [clicked]);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,

        // ultra-soft transparent glow
        background: clicked
          ? `
            radial-gradient(
              circle,
              transparent 35%,
              rgba(214, 184, 156, 0.45) 45%,
              rgba(214, 184, 156, 0.25) 60%,
              rgba(214, 184, 156, 0.08) 72%,
              transparent 85%
            )
          `
          : `
            radial-gradient(
              circle,
              rgba(201, 151, 105, 0.3) 0%,
              rgba(214, 184, 156, 0.79) 35%,
              rgba(214, 184, 156, 0.51) 55%,
              rgba(214, 184, 156, 0.05) 70%,
              transparent 85%
            )
          `,

        // tiny blur for luxury feel
        filter: "blur(0.4px)",
      }}
    />
  );
};

export default CustomCursor;
