import { useState } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = ["Home", "About", "Projects", "Experience", "Contact"];

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6">
        {/* Logo */}
        <img  
          src={logo}
          alt="Logo"
          className="h-18 w-auto select-none"
        />

        {/* Toggle button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="text-sm uppercase tracking-widest"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`
          fixed inset-0 z-40
          transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />

        {/* Menu content */}
        <div className="relative h-full flex items-center justify-center">
          <nav className="flex flex-col gap-8 text-3xl font-light tracking-wide">
            {links.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="hover:opacity-60 transition-opacity"
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
