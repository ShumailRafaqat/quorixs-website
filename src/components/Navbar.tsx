import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-lg shadow-black/10 py-4 backdrop-blur-xl"
            : "py-6 backdrop-blur-sm"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="container mx-auto px-5 sm:px-6 flex items-center justify-between">
          {/* Logo – AB BAHUT BADA version */}
          <a href="#" className="flex items-center gap-4 sm:gap-6 group">
            <motion.div
              className="relative flex-shrink-0"
              whileHover={{ scale: 1.15, rotate: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
            >
              <img
                src="/logo.png"
                alt="Quorisx Logo"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-[0_10px_40px_rgba(59,130,246,0.6)] brightness-130 contrast-115 saturate-130"
                // ↑ Yeh sabse bada change:
                // h-16 → h-24 (64px → 96px desktop pe)
                // custom drop-shadow blue glow wala → dark pe shine karega
                // brightness + contrast + saturate → logo dull na rahe
              />
            </motion.div>

            {/* Text optional – agar saath chahiye to uncomment + size badha diya */}
            {/* 
            <span className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight group-hover:text-primary transition-colors drop-shadow-lg">
              Quorisx
            </span>
            */}
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative text-base font-display font-medium text-muted-foreground hover:text-foreground transition-colors group"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-full transition-all duration-400 ease-out" />
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              className="px-7 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-base btn-glow-strong hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-primary/30"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            className="md:hidden text-foreground p-3 rounded-lg hover:bg-primary/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <motion.div animate={mobileOpen ? { rotate: 90 } : { rotate: 0 }} transition={{ duration: 0.4 }}>
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden pointer-events-none"
        animate={mobileOpen ? { pointerEvents: "auto" } : { pointerEvents: "none" }}
      >
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: mobileOpen ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => setMobileOpen(false)}
        />

        <motion.div
          className="absolute top-0 left-0 right-0 glass-strong mt-20 border-t border-border/40 overflow-hidden"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{
            y: mobileOpen ? 0 : "-100%",
            opacity: mobileOpen ? 1 : 0,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 180 }}
        >
          <div className="p-8 flex flex-col gap-3">
            {links.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-5 px-6 text-xl font-display text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-2xl transition-all duration-300"
                whileTap={{ scale: 0.97 }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-6 py-5 px-6 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-display font-semibold text-center text-xl shadow-xl"
              whileTap={{ scale: 0.96 }}
            >
              Get Started
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {scrolled && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1 }}
        />
      )}
    </>
  );
};

export default Navbar;
