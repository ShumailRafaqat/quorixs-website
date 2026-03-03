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
            ? "glass-strong shadow-lg shadow-black/10 py-3 backdrop-blur-xl"
            : "py-5 backdrop-blur-sm"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="container mx-auto px-5 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <motion.div
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center glow-border-strong relative overflow-hidden"
              whileHover={{ scale: 1.08, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="text-lg font-display font-black text-primary tracking-tight z-10">Q</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            <span className="font-display font-bold text-xl text-foreground tracking-tight group-hover:text-primary transition-colors">
              Quorixs
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-9">
            {links.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative text-sm font-display font-medium text-muted-foreground hover:text-foreground transition-colors group"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-full transition-all duration-400 ease-out" />
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm btn-glow-strong hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-primary/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            className="md:hidden text-foreground p-2 rounded-lg hover:bg-primary/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <motion.div animate={mobileOpen ? { rotate: 90 } : { rotate: 0 }} transition={{ duration: 0.4 }}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: mobileOpen ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => setMobileOpen(false)}
        />

        <motion.div
          className="absolute top-0 left-0 right-0 glass-strong mt-16 border-t border-border/40 overflow-hidden"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{
            y: mobileOpen ? 0 : "-100%",
            opacity: mobileOpen ? 1 : 0,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <div className="p-6 flex flex-col gap-2">
            {links.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-4 px-5 text-lg font-display text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-xl transition-all duration-300"
                whileTap={{ scale: 0.97, backgroundColor: "rgba(var(--primary), 0.1)" }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 py-4 px-5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-display font-semibold text-center text-lg btn-glow-strong shadow-lg"
              whileTap={{ scale: 0.96 }}
            >
              Get Started
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* Optional: subtle glow line when scrolled */}
      {scrolled && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1 }}
        />
      )}
    </>
  );
};

export default Navbar;