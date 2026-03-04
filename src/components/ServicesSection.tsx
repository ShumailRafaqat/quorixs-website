import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Globe, Database, Bot, Smartphone, ShoppingCart, Cloud, ArrowUpRight, Sparkles } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Full-Stack Web Development",
    desc: "Scalable, performant web applications built with cutting-edge frameworks and technologies.",
    details: ["React & Next.js", "Node.js & Python", "REST & GraphQL APIs", "Real-time Applications"],
    color: "217 91% 60%",
    number: "01",
    stat: "100+",
    statLabel: "Projects Delivered",
  },
  {
    icon: Database,
    title: "Custom CRM Development",
    desc: "Tailored CRM solutions that streamline operations and enhance customer relationships.",
    details: ["Sales Pipeline Automation", "Customer Analytics", "Third-party Integrations", "Custom Dashboards"],
    color: "160 84% 39%",
    number: "02",
    stat: "50+",
    statLabel: "CRM Systems Built",
  },
  {
    icon: Bot,
    title: "AI & Process Automation",
    desc: "Intelligent automation systems that optimize workflows and drive efficiency.",
    details: ["Machine Learning Models", "Chatbot Development", "Workflow Automation", "Data Processing"],
    color: "263 70% 50%",
    number: "03",
    stat: "60k+",
    statLabel: "Tasks Automated",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile apps with exceptional user experiences.",
    details: ["React Native", "iOS & Android", "App Store Optimization", "Push Notifications"],
    color: "330 81% 60%",
    number: "04",
    stat: "80+",
    statLabel: "Apps Launched",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Development",
    desc: "High-converting e-commerce platforms with seamless payment integrations.",
    details: ["Shopify & Custom Stores", "Payment Gateways", "Inventory Management", "Analytics & Reports"],
    color: "38 92% 50%",
    number: "05",
    stat: "$5M+",
    statLabel: "Revenue Generated",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps Solutions",
    desc: "Robust cloud infrastructure with CI/CD pipelines and scalable architecture.",
    details: ["AWS & Azure", "Docker & Kubernetes", "CI/CD Pipelines", "Monitoring & Logging"],
    color: "187 85% 43%",
    number: "06",
    stat: "99.9%",
    statLabel: "Uptime Guaranteed",
  },
];

// Animated particles for active panel
const FloatingParticles = ({ color }: { color: string }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full"
        style={{ background: `hsl(${color})` }}
        initial={{
          x: Math.random() * 400,
          y: Math.random() * 400,
          opacity: 0,
        }}
        animate={{
          y: [Math.random() * 300, Math.random() * 100, Math.random() * 300],
          x: [Math.random() * 300, Math.random() * 200, Math.random() * 400],
          opacity: [0, 0.6, 0],
          scale: [0.5, 1.5, 0.5],
        }}
        transition={{
          duration: 4 + Math.random() * 3,
          repeat: Infinity,
          delay: i * 0.5,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Animated counter
const AnimatedNumber = ({ value }: { value: string }) => {
  return (
    <motion.span
      key={value}
      className="inline-block font-display"
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
      transition={{ duration: 0.5 }}
    >
      {value}
    </motion.span>
  );
};

const ServicesSection = () => {
  const [active, setActive] = useState(0);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const activeService = services[active];
  const ActiveIcon = activeService.icon;
  const containerRef = useRef<HTMLDivElement>(null);

  // Progress indicator
  const progress = ((active + 1) / services.length) * 100;

  return (
    <section id="services" className="py-20 lg:py-32 relative noise-bg overflow-hidden">
      {/* Animated mesh gradient bg */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${active}`}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div
            className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full blur-[150px] opacity-[0.08]"
            style={{ background: `hsl(${activeService.color})` }}
          />
          <div
            className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.05]"
            style={{ background: `hsl(${activeService.color})` }}
          />
          {/* Diagonal accent line */}
          <motion.div
            className="absolute top-0 left-1/2 w-[1px] h-full opacity-[0.06] origin-top"
            style={{ background: `linear-gradient(to bottom, transparent, hsl(${activeService.color}), transparent)` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 lg:mb-20 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <motion.div
              className="flex items-center gap-2 mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
                What We Do
              </span>
            </motion.div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Our <span className="text-gradient">Services</span>
            </h2>
          </div>

          {/* Progress indicator */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-xs text-muted-foreground font-medium">
              <AnimatePresence mode="wait">
                <AnimatedNumber key={active} value={`${active + 1}`} />
              </AnimatePresence>
              <span className="mx-1">/</span>
              <span>{services.length}</span>
            </span>
            <div className="w-24 h-[3px] rounded-full bg-border overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `hsl(${activeService.color})` }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-0">
          {/* Left: Interactive vertical tabs */}
          <div className="lg:w-[42%] relative">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border" />

            {services.map((service, i) => {
              const isActive = active === i;
              const isHovered = hoveredTab === i;
              const Icon = service.icon;

              return (
                <motion.button
                  key={service.title}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setHoveredTab(i)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className="w-full text-left relative group py-4 sm:py-5 pl-7 sm:pl-9 pr-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  {/* Active indicator dot on the line */}
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                    animate={{
                      scale: isActive ? 1 : isHovered ? 0.7 : 0,
                      opacity: isActive || isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: `hsl(${service.color})`,
                        boxShadow: isActive ? `0 0 12px 3px hsl(${service.color} / 0.4)` : 'none',
                      }}
                    />
                  </motion.div>

                  {/* Active line segment */}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[2px]"
                      style={{ background: `hsl(${service.color})` }}
                      layoutId="active-line"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Hover/active bg */}
                  <motion.div
                    className="absolute inset-0 rounded-r-xl"
                    style={{ background: `hsl(${service.color} / 0.04)` }}
                    animate={{ opacity: isActive ? 1 : isHovered ? 0.5 : 0 }}
                    transition={{ duration: 0.2 }}
                  />

                  <div className="relative z-10 flex items-center gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <motion.div
                        animate={{
                          scale: isActive ? 1.1 : 1,
                          rotate: isActive ? 360 : 0,
                        }}
                        transition={{ duration: 0.6, type: "spring" }}
                      >
                        <Icon
                          size={18}
                          className="flex-shrink-0 transition-all duration-300"
                          style={{ color: isActive ? `hsl(${service.color})` : undefined }}
                          strokeWidth={isActive ? 2.2 : 1.5}
                        />
                      </motion.div>
                      <span
                        className={`font-display text-sm sm:text-[15px] font-semibold transition-colors duration-300 truncate ${
                          isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground/70"
                        }`}
                      >
                        {service.title}
                      </span>
                    </div>

                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : -8,
                        rotate: isActive ? 0 : -45,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight size={14} style={{ color: `hsl(${service.color})` }} />
                    </motion.div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right: Detail panel */}
          <div className="lg:w-[58%] mt-10 lg:mt-0 lg:pl-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="relative rounded-2xl overflow-hidden border border-border min-h-[380px] sm:min-h-[420px]"
                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.96 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="absolute inset-0 bg-card" />

                {/* Floating particles */}
                <FloatingParticles color={activeService.color} />

                {/* Top gradient line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, hsl(${activeService.color}), hsl(${activeService.color} / 0.3), transparent)`,
                  }}
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                />

                {/* Corner accent */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32"
                  style={{
                    background: `radial-gradient(circle at top right, hsl(${activeService.color} / 0.1), transparent 70%)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                />

                {/* Watermark number */}
                <motion.div
                  className="absolute -top-6 -right-2 font-display text-[180px] sm:text-[220px] font-bold leading-none select-none"
                  style={{ color: `hsl(${activeService.color} / 0.03)` }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  {activeService.number}
                </motion.div>

                <div className="relative z-10 p-7 sm:p-9 lg:p-10 flex flex-col h-full justify-between min-h-[380px] sm:min-h-[420px]">
                  <div>
                    {/* Icon with glow ring */}
                    <motion.div
                      className="relative w-16 h-16 mb-7"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
                    >
                      {/* Pulsing ring */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{ border: `1.5px solid hsl(${activeService.color} / 0.3)` }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <div
                        className="w-full h-full rounded-2xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, hsl(${activeService.color} / 0.15), hsl(${activeService.color} / 0.05))`,
                          boxShadow: `0 0 30px -5px hsl(${activeService.color} / 0.2)`,
                        }}
                      >
                        <ActiveIcon size={28} style={{ color: `hsl(${activeService.color})` }} strokeWidth={2} />
                      </div>
                    </motion.div>

                    <motion.h3
                      className="font-display text-xl sm:text-2xl lg:text-[26px] font-bold text-foreground mb-3"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {activeService.title}
                    </motion.h3>

                    <motion.p
                      className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8 max-w-lg"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {activeService.desc}
                    </motion.p>
                  </div>

                  <div>
                    {/* Stat highlight */}
                    <motion.div
                      className="flex items-baseline gap-2 mb-6"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <span
                        className="font-display text-3xl sm:text-4xl font-bold"
                        style={{ color: `hsl(${activeService.color})` }}
                      >
                        {activeService.stat}
                      </span>
                      <span className="text-muted-foreground text-xs sm:text-sm">
                        {activeService.statLabel}
                      </span>
                    </motion.div>

                    {/* Detail tags */}
                    <motion.div
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {activeService.details.map((detail, i) => (
                        <motion.span
                          key={detail}
                          className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border backdrop-blur-sm"
                          style={{
                            borderColor: `hsl(${activeService.color} / 0.15)`,
                            color: `hsl(${activeService.color})`,
                            background: `hsl(${activeService.color} / 0.06)`,
                          }}
                          initial={{ opacity: 0, scale: 0.7, y: 15 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{
                            delay: 0.4 + i * 0.08,
                            duration: 0.4,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          {detail}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
