import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Database, Bot, Smartphone, ShoppingCart, Cloud } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Full-Stack Web Development",
    desc: "Scalable, performant web applications built with cutting-edge frameworks and technologies.",
    theme: {
      borderBase: "border-blue-500/15",
      borderHover: "border-blue-400/80 shadow-[0_0_12px_2px_rgba(59,130,246,0.4)]",
      glow: "glow-primary",
      iconColor: "text-blue-400/70",
      iconHoverColor: "text-blue-300",
      iconBg: "from-blue-900/20 to-indigo-950/20",
    },
  },
  {
    icon: Database,
    title: "Custom CRM Development",
    desc: "Tailored CRM solutions that streamline operations and enhance customer relationships.",
    theme: {
      borderBase: "border-emerald-500/15",
      borderHover: "border-emerald-400/80 shadow-[0_0_12px_2px_rgba(16,185,129,0.4)]",
      glow: "glow-accent",
      iconColor: "text-emerald-400/70",
      iconHoverColor: "text-emerald-300",
      iconBg: "from-emerald-900/20 to-teal-950/20",
    },
  },
  {
    icon: Bot,
    title: "AI & Process Automation", // fixed typo "Automatioan" → "Automation"
    desc: "Intelligent automation systems that optimize workflows and drive efficiency.",
    theme: {
      borderBase: "border-purple-500/15",
      borderHover: "border-purple-400/80 shadow-[0_0_12px_2px_rgba(139,92,246,0.4)]",
      glow: "glow-secondary",
      iconColor: "text-purple-400/70",
      iconHoverColor: "text-purple-300",
      iconBg: "from-purple-900/20 to-violet-950/20",
    },
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile apps with exceptional user experiences.",
    theme: {
      borderBase: "border-pink-500/15",
      borderHover: "border-pink-400/80 shadow-[0_0_12px_2px_rgba(236,72,153,0.4)]",
      glow: "glow-primary",
      iconColor: "text-pink-400/70",
      iconHoverColor: "text-pink-300",
      iconBg: "from-pink-900/20 to-rose-950/20",
    },
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Development",
    desc: "High-converting e-commerce platforms with seamless payment integrations.",
    theme: {
      borderBase: "border-amber-500/15",
      borderHover: "border-amber-400/80 shadow-[0_0_12px_2px_rgba(245,158,11,0.4)]",
      glow: "glow-accent",
      iconColor: "text-amber-400/70",
      iconHoverColor: "text-amber-300",
      iconBg: "from-amber-900/20 to-orange-950/20",
    },
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps Solutions",
    desc: "Robust cloud infrastructure with CI/CD pipelines and scalable architecture.",
    theme: {
      borderBase: "border-cyan-500/15",
      borderHover: "border-cyan-400/80 shadow-[0_0_12px_2px_rgba(6,182,212,0.4)]",
      glow: "glow-accent",
      iconColor: "text-cyan-400/70",
      iconHoverColor: "text-cyan-300",
      iconBg: "from-cyan-900/20 to-sky-950/20",
    },
  },
];

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="services" className="py-16 lg:py-24 relative" ref={ref}>
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 sm:mb-14 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            End-to-end digital solutions engineered for speed, scale & real business impact.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 justify-items-center">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className={`
                glass rounded-xl p-5 pb-6 sm:pb-7
                border ${service.theme.borderBase}
                group relative overflow-hidden
                transition-all duration-400 ease-out
                hover:${service.theme.borderHover}
                hover:scale-[1.015] hover:-translate-y-1
                w-full max-w-[320px] sm:max-w-[340px] lg:max-w-[360px]
                mx-auto
              `}
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="relative z-10">
                <div
                  className={`
                    w-11 h-11 rounded-lg
                    bg-gradient-to-br ${service.theme.iconBg}
                    flex items-center justify-center mb-4
                    transition-all duration-400
                    group-hover:scale-110 group-hover:brightness-110
                    ${service.theme.glow}
                  `}
                >
                  <service.icon
                    className={`
                      ${service.theme.iconColor} 
                      group-hover:${service.theme.iconHoverColor}
                      transition-colors duration-300
                    `}
                    size={22}
                    strokeWidth={2.3}
                  />
                </div>

                <h3 className="font-display text-base sm:text-lg font-semibold mb-2.5 text-foreground group-hover:text-white/95 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-muted-foreground group-hover:text-gray-200/85 text-xs sm:text-sm leading-relaxed transition-colors duration-300">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;