import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";


const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll effect (works perfectly in Safari too)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-5 sm:px-6 lg:px-10">
        {/* Logo */}
        <a href="#home" className="font-display text-xl md:text-2xl font-bold">
          <span className={scrolled ? "text-foreground" : "text-hero-foreground"}>
            Kireeti
          </span>
          <span className="text-secondary">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-all hover:bg-secondary/10 hover:text-secondary ${
                scrolled
                  ? "text-foreground"
                  : "text-hero-foreground/80 hover:text-hero-foreground"
              }`}
            >
              {l.label}
            </a>
          ))}

         {/* Resume desktop */}
<a href="/Kireeti_Avula_Resume.pdf" target="_blank" rel="noopener noreferrer">
  <Button
    size="sm"
    className="ml-3 bg-gradient-to-r from-secondary to-accent text-primary-foreground hover:opacity-90 gap-2 shadow-md shadow-secondary/20"
  >
    <Eye className="w-4 h-4" />  Resume
  </Button>
</a>


        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden ${scrolled ? "text-foreground" : "text-hero-foreground"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border shadow-lg"
          >
            <div className="flex flex-col p-5 gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground font-medium hover:text-secondary hover:bg-secondary/10 rounded-lg px-3 py-3 transition-all"
                >
                  {l.label}
                </a>
              ))}

           

<a href="/Kireeti_Avula_Resume.pdf" target="_blank" rel="noopener noreferrer">
  <Button
    size="sm"
    className="ml-3 bg-gradient-to-r from-secondary to-accent text-primary-foreground gap-2"
  >
    <Eye className="w-4 h-4" /> View Resume
  </Button>
</a>

            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
