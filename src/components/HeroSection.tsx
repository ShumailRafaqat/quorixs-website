import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Sparkles, Zap, Globe, Code2 } from "lucide-react";
import ParticleField from "./ParticleField";

const headlines = [
  "Full-Stack Web Applications",
  "AI & Automation Solutions",
  "Custom CRM Systems",
  "App Development",
  "E-commerce Platforms",
  "Cloud Development",
];

const floatingIcons = [
  { icon: Zap, x: "85%", y: "15%", delay: 0, size: 18 },
  { icon: Globe, x: "10%", y: "70%", delay: 0.2, size: 16 },
  { icon: Code2, x: "90%", y: "75%", delay: 0.4, size: 20 },
  { icon: Sparkles, x: "15%", y: "20%", delay: 0.6, size: 14 },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Smooth scroll function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient">
      <ParticleField />

      {/* Animated gradient orbs — very fast */}
      <motion.div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20"
        style={{ background: "hsl(var(--primary))" }}
        animate={{ x: [0, 140, 0], y: [0, 100, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15"
        style={{ background: "hsl(var(--accent))" }}
        animate={{ x: [0, -130, 0], y: [0, -80, 0], scale: [1, 1.4, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-10"
        style={{ background: "hsl(var(--neon-blue))" }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.05, 0.22, 0.05] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating icons — fast bounce & rotate */}
      {floatingIcons.map(({ icon: Icon, x, y, delay, size }, i) => (
        <motion.div
          key={i}
          className="absolute glass w-10 h-10 rounded-xl flex items-center justify-center glow-border"
          style={{ left: x, top: y }}
          animate={{ y: [0, -40, 0], rotate: [0, 20, -20, 0] }}
          transition={{ duration: 2.6 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <Icon className="text-primary" size={size} />
        </motion.div>
      ))}

      <motion.div
        className="container relative z-10 mx-auto px-6 py-20"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-primary"
                animate={{
                  boxShadow: [
                    "0 0 0px hsl(var(--primary))",
                    "0 0 18px hsl(var(--primary))",
                    "0 0 0px hsl(var(--primary))",
                  ],
                }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <span className="text-sm font-display text-muted-foreground">
                Next-Gen Digital Solutions
              </span>
              <Sparkles className="w-3 h-3 text-primary" />
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-display font-bold leading-snug mb-6">
              <motion.span
                className="text-foreground inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                We Build
              </motion.span>
              <br />
              <div className="h-[1.15em] overflow-hidden relative mt-1">
                {headlines.map((headline, i) => (
                  <motion.span
                    key={headline}
                    className="text-gradient absolute left-0 top-0 text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold"
                    initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
                    animate={{
                      y: currentIndex === i ? "0%" : "-100%",
                      opacity: currentIndex === i ? 1 : 0,
                      filter: currentIndex === i ? "blur(0px)" : "blur(8px)",
                    }}
                    transition={{
                      duration: 0.75,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {headline}
                  </motion.span>
                ))}
              </div>
            </h1>

            <motion.p
              className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              We transform ideas into scalable, cutting-edge digital products that drive growth and innovation.
            </motion.p>

            {/* Buttons - now with scroll functionality */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold btn-glow transition-all duration-300 hover:gap-3.5 text-sm sm:text-base"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection("contact")}
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                className="group flex items-center gap-2 px-6 py-3 rounded-xl glass font-display font-medium text-foreground hover:glow-border transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection("services")}
              >
                <Play className="w-4 h-4" />
                Explore Services
              </motion.button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex items-center gap-6 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold"
                    style={{ background: `hsl(${217 + i * 15} 70% ${50 + i * 5}%)` }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.3 + i * 0.1 }}
                  >
                    {["JD", "AK", "MS", "RB"][i]}
                  </motion.div>
                ))}
              </div>
              <div>
                <p className="text-sm font-display font-semibold text-foreground">
                  150+ Projects Delivered
                </p>
                <p className="text-xs text-muted-foreground">
                  Trusted by startups & enterprises
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - floating mockup — fast movement */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="absolute w-[350px] h-[250px] rounded-3xl blur-[80px]"
              style={{ background: `hsl(var(--primary) / 0.2)` }}
              animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <motion.div
              className="relative w-[420px] h-[320px] rounded-2xl glass-strong overflow-hidden glow-border"
              animate={{ y: [0, -35, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.04, rotateY: 8 }}
              style={{ perspective: 1000 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />

              <motion.div
                className="absolute left-0 right-0 h-[1px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)",
                }}
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
              />

              <div className="p-6 relative z-10">
                <div className="flex gap-2 mb-4">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-destructive/60"
                    whileHover={{ scale: 1.5 }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-yellow-500/60"
                    whileHover={{ scale: 1.5 }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-green-500/60"
                    whileHover={{ scale: 1.5 }}
                  />
                </div>

                <div className="space-y-3 font-mono text-sm">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <span className="text-primary/70">const</span>{" "}
                    <span style={{ color: "hsl(var(--neon-blue))" }}>
                      innovation
                    </span>{" "}
                    <span className="text-muted-foreground">=</span>{" "}
                    <span style={{ color: "hsl(var(--accent))" }}>await</span>
                  </motion.div>

                  <motion.div
                    className="pl-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 }}
                  >
                    <span className="text-primary">quorisx</span>.
                    <span className="text-foreground">create</span>(
                    <span style={{ color: "hsl(120 60% 50%)" }}>
                      "future"
                    </span>
                    )
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6 }}
                  >
                    <span className="text-muted-foreground">
                      // ✨ Result:
                    </span>{" "}
                    <motion.span
                      style={{ color: "hsl(var(--neon-blue))" }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      Amazing_
                    </motion.span>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-4 pt-3 border-t border-border/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-green-500"
                      animate={{ opacity: [1, 0.15, 1] }}
                      transition={{ duration: 0.9, repeat: Infinity }}
                    />
                    <span className="text-xs font-mono text-muted-foreground">
                      output
                    </span>
                  </div>
                  <div className="h-1.5 w-3/4 rounded bg-primary/20 mb-1.5" />
                  <div className="h-1.5 w-1/2 rounded bg-accent/20" />
                </motion.div>
              </div>
            </motion.div>

            {/* Floating emoji elements — very fast */}
            <motion.div
              className="absolute -top-8 -right-4 w-16 h-16 rounded-xl glass flex items-center justify-center glow-border"
              animate={{ y: [0, -24, 0], rotate: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            >
              <span className="text-2xl">⚡</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-8 w-14 h-14 rounded-xl glass flex items-center justify-center glow-border"
              animate={{ y: [0, 28, 0], rotate: [0, -12, 0] }}
              transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <span className="text-xl">🚀</span>
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-12 w-12 h-12 rounded-xl glass flex items-center justify-center glow-border"
              animate={{ y: [0, -22, 0], x: [0, 12, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
            >
              <span className="text-lg">🧠</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
