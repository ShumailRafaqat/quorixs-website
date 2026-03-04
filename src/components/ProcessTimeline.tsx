import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Lightbulb, Palette, Code2, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Strategy",
    desc: "Research & planning",
    tag: "01",
    detail: "We dig deep into your market, users, and goals to craft a roadmap that actually works.",
  },
  {
    icon: Palette,
    title: "Design",
    desc: "UI/UX prototyping",
    tag: "02",
    detail: "Pixel-perfect interfaces designed for delight. Every interaction is intentional.",
  },
  {
    icon: Code2,
    title: "Develop",
    desc: "Agile development",
    tag: "03",
    detail: "Clean, scalable code built in sprints. You see progress every week.",
  },
  {
    icon: Rocket,
    title: "Deploy",
    desc: "Launch & optimize",
    tag: "04",
    detail: "Battle-tested deployment with monitoring, CI/CD, and zero-downtime releases.",
  },
  {
    icon: TrendingUp,
    title: "Scale",
    desc: "Growth & support",
    tag: "05",
    detail: "Continuous iteration driven by real data. We grow with you.",
  },
];

const HexIcon = ({ icon: Icon, isActive, index }: { icon: any; isActive: boolean; index: number }) => {
  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <motion.div
        className="absolute inset-[-8px] rounded-2xl border border-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20 + index * 4, repeat: Infinity, ease: "linear" }}
        style={{ borderRadius: "24px" }}
      />
      
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-primary"
        style={{ top: -4, left: "50%", marginLeft: -4 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6 + index * 2, repeat: Infinity, ease: "linear" }}
      />

      <div
        className={`
          relative w-20 h-20 rounded-2xl overflow-hidden
          flex items-center justify-center
          transition-all duration-500
          ${isActive ? "glow-primary" : ""}
        `}
        style={{
          background: isActive
            ? "linear-gradient(135deg, hsl(165 80% 48% / 0.15), hsl(270 60% 60% / 0.1))"
            : "hsl(240 12% 10% / 0.8)",
          border: `1px solid ${isActive ? "hsl(165 80% 48% / 0.4)" : "hsl(240 8% 18% / 0.6)"}`,
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(hsl(165 80% 48% / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(165 80% 48% / 0.1) 1px, transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        />
        <Icon
          className={`relative z-10 w-9 h-9 transition-colors duration-300 ${
            isActive ? "text-primary" : "text-muted-foreground"
          }`}
          strokeWidth={1.5}
        />
      </div>

      <div
        className="absolute -bottom-2 -right-2 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md border"
        style={{
          background: isActive ? "hsl(165 80% 48%)" : "hsl(240 12% 10%)",
          color: isActive ? "hsl(240 15% 5%)" : "hsl(240 5% 55%)",
          borderColor: isActive ? "hsl(165 80% 48%)" : "hsl(240 8% 18%)",
        }}
      >
        {steps[index]?.tag}
      </div>
    </motion.div>
  );
};

const ProcessTimeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isInView || isPaused) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000); // 4 seconds per step – padhne ke liye comfortable

    return () => clearInterval(interval);
  }, [isInView, isPaused]);

  const handleInteraction = (index: number) => {
    setActiveStep(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <section
      id="process"
      className="py-24 lg:py-32 relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, hsl(165 80% 48% / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-primary/50" />
            <span className="font-mono text-sm text-primary tracking-widest uppercase">
              // how we work
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            <span className="text-foreground">From idea to </span>
            <span className="text-gradient-primary">reality</span>
            <span className="text-primary animate-pulse">_</span>
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-xl leading-relaxed">
            Five phases. One seamless journey. Every step engineered for maximum impact.
          </p>
        </motion.div>

        {/* Single active step container */}
        <div className="relative min-h-[380px] lg:min-h-[480px] flex items-start justify-center">
          {steps.map((step, i) => {
            const isActive = activeStep === i;

            if (!isActive) return null;

            return (
              <motion.div
                key={step.title}
                className="w-full max-w-4xl opacity-0 animate-in fade-in duration-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {/* Vertical connecting line (only desktop, centered-ish) */}
                <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px z-0">
                  <div
                    className="h-full w-px"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent, hsl(165 80% 48% / 0.3) 10%, hsl(270 60% 60% / 0.2) 90%, transparent)",
                    }}
                  />
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 relative z-10">
                  {/* Icon - centered on mobile, left on desktop */}
                  <div className="flex-shrink-0">
                    <HexIcon icon={step.icon} isActive={true} index={i} />
                  </div>

                  {/* Content */}
                  <div className="glass-surface rounded-2xl p-6 lg:p-10 w-full max-w-3xl relative">
                    <div className="relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
                        <h3 className="font-display text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                          {step.title}
                        </h3>
                        <span className="font-mono text-sm lg:text-base text-muted-foreground tracking-wider">
                          {step.desc}
                        </span>
                      </div>

                      <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                        {step.detail}
                      </p>
                    </div>

                    {/* Large step number watermark */}
                    <div className="absolute top-4 right-6 lg:top-6 lg:right-8 font-display text-8xl lg:text-9xl font-bold text-border/15 select-none opacity-70">
                      {step.tag}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Step indicators (dots) */}
        <div className="flex justify-center gap-4 mt-12">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => handleInteraction(i)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                activeStep === i
                  ? "bg-primary scale-125 shadow-lg shadow-primary/40"
                  : "bg-primary/30 hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
