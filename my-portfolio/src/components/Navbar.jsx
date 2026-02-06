import { useState } from "react";
import logo from "./assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = ["Home", "About", "Projects", "Experience", "Skills", "Testimonials", "Contact"];

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-4">
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="h-12 w-auto select-none"
        />

        {/* Menu button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="text-sm uppercase tracking-widest"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-500 ease-out
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />

        {/* Menu content */}
        <div
          className={`relative h-full flex items-center justify-center
          transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
          ${open ? "translate-y-0" : "translate-y-20"}`}
        >
          <nav className="flex flex-col gap-8 text-3xl font-light tracking-wide">
            {links.map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className={`transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
                ${open
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
