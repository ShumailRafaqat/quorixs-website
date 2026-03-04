import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Globe, Database, Bot, Smartphone, ShoppingCart, Cloud, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Full-Stack Web Development",
    desc: "Scalable, performant web applications built with cutting-edge frameworks and technologies.",
    details: ["React & Next.js", "Node.js & Python", "REST & GraphQL APIs", "Real-time Applications"],
    color: "217 91% 60%",
    number: "01",
  },
  {
    icon: Database,
    title: "Custom CRM Development",
    desc: "Tailored CRM solutions that streamline operations and enhance customer relationships.",
    details: ["Sales Pipeline Automation", "Customer Analytics", "Third-party Integrations", "Custom Dashboards"],
    color: "160 84% 39%",
    number: "02",
  },
  {
    icon: Bot,
    title: "AI & Process Automation",
    desc: "Intelligent automation systems that optimize workflows and drive efficiency.",
    details: ["Machine Learning Models", "Chatbot Development", "Workflow Automation", "Data Processing"],
    color: "263 70% 50%",
    number: "03",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile apps with exceptional user experiences.",
    details: ["React Native", "iOS & Android", "App Store Optimization", "Push Notifications"],
    color: "330 81% 60%",
    number: "04",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Development",
    desc: "High-converting e-commerce platforms with seamless payment integrations.",
    details: ["Shopify & Custom Stores", "Payment Gateways", "Inventory Management", "Analytics & Reports"],
    color: "38 92% 50%",
    number: "05",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps Solutions",
    desc: "Robust cloud infrastructure with CI/CD pipelines and scalable architecture.",
    details: ["AWS & Azure", "Docker & Kubernetes", "CI/CD Pipelines", "Monitoring & Logging"],
    color: "187 85% 43%",
    number: "06",
  },
];

const ServicesSection = () => {
  const [active, setActive] = useState(0);
  const activeService = services[active];
  const ActiveIcon = activeService.icon;

  return (
    <section id="services" className="py-20 lg:py-32 relative noise-bg overflow-hidden">
      {/* Ambient background blobs */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.07]"
            style={{ background: `hsl(${activeService.color})` }}
          />
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.05]"
            style={{ background: `hsl(${activeService.color})` }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase mb-6 border border-border text-primary"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            What We Do
          </motion.span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Our <span className="text-gradient">Services</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-0 lg:gap-0">
          {/* Left: Service list - interactive vertical tabs */}
          <div className="lg:w-[45%] relative">
            {services.map((service, i) => {
              const isActive = active === i;
              const Icon = service.icon;

              return (
                <motion.button
                  key={service.title}
                  onClick={() => setActive(i)}
                  className={`
                    w-full text-left relative group
                    border-l-2 transition-all duration-500
                    py-4 sm:py-5 pl-6 sm:pl-8 pr-4
                    ${isActive ? "border-l-current" : "border-l-border hover:border-l-muted-foreground/40"}
                  `}
                  style={isActive ? { borderLeftColor: `hsl(${service.color})` } : {}}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  {/* Active background highlight */}
                  <motion.div
                    className="absolute inset-0 rounded-r-lg"
                    style={{ background: `hsl(${service.color} / 0.05)` }}
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10 flex items-center gap-4">
                    <span
                      className="font-display text-xs font-bold tracking-widest transition-colors duration-300"
                      style={{ color: isActive ? `hsl(${service.color})` : undefined }}
                    >
                      {isActive ? (
                        <motion.span layoutId="service-number">{service.number}</motion.span>
                      ) : (
                        <span className="text-muted-foreground/40">{service.number}</span>
                      )}
                    </span>

                    <div className="flex items-center gap-3 flex-1">
                      <Icon
                        size={18}
                        className="transition-colors duration-300 flex-shrink-0"
                        style={{ color: isActive ? `hsl(${service.color})` : undefined }}
                        strokeWidth={isActive ? 2.2 : 1.5}
                      />
                      <span
                        className={`font-display text-sm sm:text-base font-semibold transition-colors duration-300 ${
                          isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground/70"
                        }`}
                      >
                        {service.title}
                      </span>
                    </div>

                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowUpRight size={16} style={{ color: `hsl(${service.color})` }} />
                    </motion.div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right: Active service detail panel */}
          <div className="lg:w-[55%] mt-8 lg:mt-0 lg:pl-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="relative rounded-2xl overflow-hidden border border-border min-h-[320px] sm:min-h-[360px]"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Panel bg */}
                <div className="absolute inset-0 bg-card" />
                
                {/* Top accent line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `hsl(${activeService.color})` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />

                {/* Large watermark number */}
                <div
                  className="absolute -top-8 -right-4 font-display text-[160px] sm:text-[200px] font-bold leading-none select-none opacity-[0.03]"
                  style={{ color: `hsl(${activeService.color})` }}
                >
                  {activeService.number}
                </div>

                <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Icon */}
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{
                        background: `linear-gradient(135deg, hsl(${activeService.color} / 0.15), hsl(${activeService.color} / 0.05))`,
                      }}
                      initial={{ scale: 0.8, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <ActiveIcon size={28} style={{ color: `hsl(${activeService.color})` }} strokeWidth={2} />
                    </motion.div>

                    <motion.h3
                      className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      {activeService.title}
                    </motion.h3>

                    <motion.p
                      className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8 max-w-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      {activeService.desc}
                    </motion.p>
                  </div>

                  {/* Detail tags */}
                  <motion.div
                    className="flex flex-wrap gap-2.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    {activeService.details.map((detail, i) => (
                      <motion.span
                        key={detail}
                        className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border"
                        style={{
                          borderColor: `hsl(${activeService.color} / 0.2)`,
                          color: `hsl(${activeService.color})`,
                          background: `hsl(${activeService.color} / 0.06)`,
                        }}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.35 + i * 0.07, duration: 0.4 }}
                      >
                        {detail}
                      </motion.span>
                    ))}
                  </motion.div>
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
