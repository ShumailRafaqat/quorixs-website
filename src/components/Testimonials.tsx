import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO, TechVentures",
    text: "Honestly, we were pretty skeptical at first we'd been burned by agencies before. But Quorisx actually delivered. Their automation stuff cut our monthly cloud bill by almost 38% without breaking anything. Still using it daily.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Engineering, FinFlow",
    text: "The custom CRM they built for us is honestly the best piece of internal software we've ever had. Sales + support teams are actually using it instead of complaining about it for once. Productivity went up noticeably in like 6–7 weeks.",
    rating: 5,
    avatar: "MR",
  },
  {
    name: "Emily Nakamura",
    role: "Co-founder, ShopWave",
    text: "We needed to launch fast or lose the market window. They turned our messy Figma prototype into a working Shopify + custom backend store in under 9 weeks. The checkout flow is buttery smooth  conversion rate jumped 22% in the first month.",
    rating: 5,
    avatar: "EN",
  },
  {
    name: "David Park",
    role: "VP of Platform Engineering, CloudSync",
    text: "99.3% → 99.97% uptime after they redid our CI/CD and infra. No heroics, just solid boring reliability. When something does go wrong (rarely), their team actually picks up the phone at 2 a.m. That matters more than anything.",
    rating: 5,
    avatar: "DP",
  },
];

interface FloatingParticleProps {
  delay: number;
  x: string;
  y: string;
}

const FloatingParticle = ({ delay, x, y }: FloatingParticleProps) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-primary/30 pointer-events-none"
    style={{ left: x, top: y }}
    animate={{
      y: [0, -40, 0],
      opacity: [0, 0.7, 0],
      scale: [0.6, 1.5, 0.6],
    }}
    transition={{
      duration: 5 + Math.random() * 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const goTo = useCallback((index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  }, [active]);

  const next = useCallback(() => {
    setDirection(1);
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isHovered, next]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.94,
      rotateY: dir > 0 ? 8 : -8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.94,
      rotateY: dir > 0 ? -8 : 8,
    }),
  };

  const particles = Array.from({ length: 12 }, (_, i) => ({
    delay: i * 0.8 + Math.random() * 1.2,
    x: `${6 + Math.random() * 88}%`,
    y: `${6 + Math.random() * 88}%`,
  }));

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Slightly smaller background orbs */}
      <div
        className="absolute w-[480px] h-[480px] bg-primary/10 rounded-full blur-3xl -top-16 -right-32 animate-pulse-slow"
      />
      <div
        className="absolute w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl -bottom-24 -left-32 animate-pulse-slow delay-1500"
      />

      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      <div className="container mx-auto px-5 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-muted-foreground">
              TESTIMONIALS
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            What Our Clients <span className="text-gradient">Say</span>
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from teams who transformed their business with us.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.9 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative" style={{ perspective: "1300px" }}>
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10 md:-translate-x-16 z-20 
                         w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center 
                         text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 md:translate-x-16 z-20 
                         w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center 
                         text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="min-h-[340px] md:min-h-[300px] flex items-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full glass-strong glow-border rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl"
                >
                  <div className="absolute inset-0 shimmer rounded-3xl pointer-events-none opacity-50" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <Quote className="text-primary/35" size={44} />
                      <div className="flex gap-1">
                        {Array(testimonials[active].rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 fill-primary text-primary"
                            />
                          ))}
                      </div>
                    </div>

                    <p className="text-lg md:text-xl leading-relaxed mb-10 font-light text-foreground/90">
                      "{testimonials[active].text}"
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent 
                                      flex items-center justify-center text-primary-foreground font-bold text-lg shadow-md">
                        {testimonials[active].avatar}
                      </div>
                      <div>
                        <p className="font-bold text-lg">{testimonials[active].name}</p>
                        <p className="text-muted-foreground">{testimonials[active].role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center gap-3.5 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="group relative p-1.5"
              >
                <motion.div
                  className="rounded-full transition-all"
                  animate={{
                    width: i === active ? 32 : 10,
                    height: 10,
                    backgroundColor: i === active ? "hsl(var(--primary))" : "hsl(240 5% 30%)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
                {i === active && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20 blur-sm -z-10"
                    layoutId="glow-dot"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
