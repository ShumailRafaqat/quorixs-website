import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Rocket, Users, Clock, Headphones } from "lucide-react";

const stats = [
  {
    icon: Rocket,
    value: 150,
    suffix: "+",
    label: "Projects Delivered",
    theme: {
      borderBase: "border-blue-500/15",
      borderHover: "border-blue-400/80 shadow-[0_0_12px_2px_rgba(59,130,246,0.35)]",
      iconColor: "text-blue-400/80",
      iconHoverColor: "text-blue-300",
      iconBg: "from-blue-900/25 to-indigo-950/20",
      glow: "glow-primary",
    },
  },
  {
    icon: Users,
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    theme: {
      borderBase: "border-emerald-500/15",
      borderHover: "border-emerald-400/80 shadow-[0_0_12px_2px_rgba(16,185,129,0.35)]",
      iconColor: "text-emerald-400/80",
      iconHoverColor: "text-emerald-300",
      iconBg: "from-emerald-900/25 to-teal-950/20",
      glow: "glow-accent",
    },
  },
  {
    icon: Clock,
    value: 5,
    suffix: "+",
    label: "Years Experience",
    theme: {
      borderBase: "border-purple-500/15",
      borderHover: "border-purple-400/80 shadow-[0_0_12px_2px_rgba(139,92,246,0.35)]",
      iconColor: "text-purple-400/80",
      iconHoverColor: "text-purple-300",
      iconBg: "from-purple-900/25 to-violet-950/20",
      glow: "glow-secondary",
    },
  },
  {
    icon: Headphones,
    value: 24,
    suffix: "/7",
    label: "Support",
    theme: {
      borderBase: "border-cyan-500/15",
      borderHover: "border-cyan-400/80 shadow-[0_0_12px_2px_rgba(6,182,212,0.35)]",
      iconColor: "text-cyan-400/80",
      iconHoverColor: "text-cyan-300",
      iconBg: "from-cyan-900/25 to-sky-950/20",
      glow: "glow-accent",
    },
  },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-2xl md:text-3xl font-bold font-display text-gradient">
      {count}
      {suffix}
    </span>
  );
};

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 lg:py-20 relative bg-gradient-section" ref={ref}>
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-10 sm:mb-12 lg:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Why Choose <span className="text-gradient">Quorixs</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto">
            We build fast, reliable, and scalable digital products that help businesses grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={`
                glass rounded-xl p-4 sm:p-5 text-center
                border ${stat.theme.borderBase}
                group relative overflow-hidden
                transition-all duration-400 ease-out
                hover:${stat.theme.borderHover}
                hover:scale-[1.02] hover:-translate-y-1
              `}
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div
                className={`
                  w-10 h-10 mx-auto mb-3 
                  rounded-lg bg-gradient-to-br ${stat.theme.iconBg}
                  flex items-center justify-center
                  transition-all duration-400
                  group-hover:scale-110 group-hover:brightness-110
                  ${stat.theme.glow}
                `}
              >
                <stat.icon
                  className={`
                    ${stat.theme.iconColor} 
                    group-hover:${stat.theme.iconHoverColor}
                    transition-colors duration-300
                  `}
                  size={20}
                  strokeWidth={2.2}
                />
              </div>

              <Counter target={stat.value} suffix={stat.suffix} />

              <p className="text-muted-foreground group-hover:text-gray-200/90 mt-1.5 text-xs sm:text-xs transition-colors duration-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;