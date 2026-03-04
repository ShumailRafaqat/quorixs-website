import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { Rocket, Users, Clock, Headphones } from "lucide-react";

const stats = [
  { icon: Rocket, value: 150, suffix: "+", label: "Projects Delivered", accent: "217 91% 60%" },
  { icon: Users, value: 98, suffix: "%", label: "Client Satisfaction", accent: "160 84% 39%" },
  { icon: Clock, value: 5, suffix: "+", label: "Years Experience", accent: "270 76% 58%" },
  { icon: Headphones, value: 24, suffix: "/7", label: "Always On Support", accent: "187 92% 43%" },
];

const GlitchCounter = ({ target, suffix, active }: { target: number; suffix: string; active: boolean }) => {
  const [display, setDisplay] = useState("0");
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplay(String(target)); // show final value when not active
      setGlitching(false);
      return;
    }

    // Re-trigger glitch every time card becomes active
    setDisplay("0");
    setGlitching(true);

    const chars = "0123456789#$%&";
    let frame = 0;
    const totalFrames = 18;

    const interval = setInterval(() => {
      frame++;
      if (frame < totalFrames * 0.5) {
        const len = String(target).length;
        setDisplay(Array(len).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join(""));
      } else if (frame < totalFrames) {
        const str = String(target);
        const resolved = Math.floor(((frame - totalFrames * 0.5) / (totalFrames * 0.5)) * str.length);
        setDisplay(
          str.slice(0, resolved) +
            Array(str.length - resolved).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join("")
        );
      } else {
        setDisplay(String(target));
        setGlitching(false);
        clearInterval(interval);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [active, target]);

  return (
    <div className="relative">
      <span
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-display tabular-nums leading-none transition-all duration-150 ${
          glitching ? "text-foreground/90" : "text-gradient"
        }`}
      >
        {display}
        <span className="text-lg sm:text-xl lg:text-2xl">{suffix}</span>
      </span>
      {glitching && (
        <>
          <span className="absolute inset-0 text-3xl sm:text-4xl lg:text-5xl font-bold font-display tabular-nums leading-none text-primary/30 translate-x-[1px] translate-y-[-1px] pointer-events-none">
            {display}
            <span className="text-lg sm:text-xl lg:text-2xl">{suffix}</span>
          </span>
          <span className="absolute inset-0 text-3xl sm:text-4xl lg:text-5xl font-bold font-display tabular-nums leading-none text-accent/30 -translate-x-[1px] translate-y-[1px] pointer-events-none">
            {display}
            <span className="text-lg sm:text-xl lg:text-2xl">{suffix}</span>
          </span>
        </>
      )}
    </div>
  );
};

const HoloCard = ({
  stat,
  index,
  isAutoActive,
}: {
  stat: (typeof stats)[0];
  index: number;
  isAutoActive: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  // Entrance sirf ek baar (once: true)
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(0, { stiffness: 220, damping: 16 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 16 });

  const sheenX = useTransform(mouseX, [0, 1], [-60, 160]);
  const sheenY = useTransform(mouseY, [0, 1], [-60, 160]);

  const [hovered, setHovered] = useState(false);
  const effectiveActive = hovered || isAutoActive;

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
      rotateX.set((y - 0.5) * -14);
      rotateY.set((x - 0.5) * 14);
    },
    [mouseX, mouseY, rotateX, rotateY]
  );

  const handleLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  }, [rotateX, rotateY]);

  const entrances = [
    { initial: { opacity: 0, x: -40, rotateY: -15 }, animate: { opacity: 1, x: 0, rotateY: 0 } },
    { initial: { opacity: 0, y: 40, scale: 0.78 }, animate: { opacity: 1, y: 0, scale: 1 } },
    { initial: { opacity: 0, y: -40, scale: 0.78 }, animate: { opacity: 1, y: 0, scale: 1 } },
    { initial: { opacity: 0, x: 40, rotateY: 15 }, animate: { opacity: 1, x: 0, rotateY: 0 } },
  ];

  const Icon = stat.icon;

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      style={{ perspective: 900 }}
      initial={entrances[index].initial}
      animate={isInView ? entrances[index].animate : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        className="relative rounded-xl overflow-hidden cursor-default"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouse}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-80 transition-opacity duration-300 mix-blend-overlay"
          style={{
            background: useTransform(
              [sheenX, sheenY],
              ([x, y]) =>
                `linear-gradient(${135 + Number(x) * 0.2}deg, transparent ${Number(x) - 25}%, hsl(${stat.accent} / 0.4) ${Number(x) - 6}%, hsl(280 80% 75% / 0.3) ${Number(x)}%, hsl(187 92% 70% / 0.4) ${Number(x) + 6}%, transparent ${Number(x) + 25}%)`
            ),
          }}
        />

        <div
          className="absolute inset-0 rounded-xl transition-all duration-300"
          style={{
            opacity: effectiveActive ? 0.65 : 0,
            padding: "1.2px",
            background: `conic-gradient(from ${index * 90 + Date.now() / 120}deg at 50% 50%, hsl(${stat.accent}), hsl(280 80% 75%), hsl(187 92% 70%), hsl(160 84% 60%), hsl(${stat.accent}))`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        <div className="relative glass rounded-xl border border-border/25 p-5 sm:p-6 flex flex-col items-center text-center min-h-[180px] sm:min-h-[200px] justify-center gap-2.5 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border"
                style={{ borderColor: `hsl(${stat.accent} / ${effectiveActive ? 0.18 : 0.05})` }}
                initial={{ width: 70 + i * 50, height: 70 + i * 50 }}
                animate={
                  effectiveActive
                    ? { scale: [1, 1.22, 1], opacity: [0.4, 0.15, 0.4] }
                    : {}
                }
                transition={{ duration: 1.4 + i * 0.3, repeat: Infinity, delay: i * 0.25 }}
              />
            ))}
          </div>

          <motion.div
            className="relative z-10"
            animate={effectiveActive ? { y: -4, scale: 1.1 } : { y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 16 }}
          >
            <div className="relative">
              <div
                className="absolute inset-0 blur-md rounded-full transition-opacity duration-300"
                style={{ background: `hsl(${stat.accent} / ${effectiveActive ? 0.5 : 0.12})`, transform: "scale(2.2)" }}
              />
              <div
                className="relative w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-250"
                style={{
                  borderColor: `hsl(${stat.accent} / ${effectiveActive ? 0.6 : 0.2})`,
                  background: `linear-gradient(135deg, hsl(${stat.accent} / 0.15), transparent)`,
                }}
              >
                <Icon size={20} strokeWidth={2} style={{ color: `hsl(${stat.accent})` }} />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative z-10"
            animate={effectiveActive ? { scale: [0.95, 1.06, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <GlitchCounter target={stat.value} suffix={stat.suffix} active={effectiveActive} />
          </motion.div>

          <motion.p
            className="text-muted-foreground font-medium text-xs tracking-wide uppercase mt-1"
            initial={{ y: 16, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.35 }}
          >
            {stat.label}
          </motion.p>

          <motion.div
            className="absolute bottom-0 left-0 h-[2px] rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, hsl(${stat.accent}), transparent)` }}
            initial={{ width: "0%", left: "50%" }}
            animate={effectiveActive ? { width: "75%", left: "12.5%" } : { width: "0%", left: "50%" }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          />
        </div>
      </motion.div>

      <div
        className="absolute -bottom-2 left-[15%] right-[15%] h-5 blur-md rounded-full transition-opacity duration-300"
        style={{ background: `hsl(${stat.accent} / ${effectiveActive ? 0.18 : 0.06})` }}
      />
    </motion.div>
  );
};

const WhyChooseUs = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [activeCard, setActiveCard] = useState(0); // start from first card

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % stats.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []); // ← no dependency on isInView → hamesha chalega, scroll par bhi

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-8" />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[90px]"
          style={{ background: "hsl(217 91% 60% / 0.04)", top: "18%", left: "6%" }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[340px] h-[340px] rounded-full blur-[80px]"
          style={{ background: "hsl(270 76% 58% / 0.04)", bottom: "15%", right: "8%" }}
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full border border-border/25 mb-5"
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-secondary"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Our Impact
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gradient"
              initial={{ y: 60, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            >
              Why Choose Us
            </motion.h2>
          </div>

          <motion.p
            className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto mt-4"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            We build fast, reliable, and scalable digital products that help businesses grow
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 relative z-10">
            {stats.map((stat, i) => (
              <HoloCard
                key={stat.label}
                stat={stat}
                index={i}
                isAutoActive={activeCard === i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
