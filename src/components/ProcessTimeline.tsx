import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Palette, Code2, Rocket, TrendingUp } from "lucide-react";

const steps = [
  { icon: Lightbulb, title: "Strategy", desc: "Research & planning" },
  { icon: Palette, title: "Design", desc: "UI/UX prototyping" },
  { icon: Code2, title: "Develop", desc: "Agile development" },
  { icon: Rocket, title: "Deploy", desc: "Launch & optimize" },
  { icon: TrendingUp, title: "Scale", desc: "Growth & support" },
];

const ProcessTimeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
        duration: 0.8,
      },
    },
  };

  return (
    <section id="process" className="py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/15 to-transparent pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Our Process
          </h2>
          <p className="text-muted-foreground/90 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            A streamlined, proven approach — designed to turn ideas into scalable, high-impact products.
          </p>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div className="hidden md:flex justify-between items-center relative max-w-6xl mx-auto">
          {/* Animated connecting line with glow */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-blue-500/60 via-purple-500/50 to-transparent rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 2.2, delay: 0.5, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-8 bg-gradient-to-r from-transparent via-blue-600/20 via-purple-600/15 to-transparent blur-xl -translate-y-1/2 pointer-events-none"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.7 } : {}}
            transition={{ duration: 2.5, delay: 0.6 }}
          />

          <motion.div
            className="flex justify-between items-start w-full relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="flex flex-col items-center text-center flex-1 px-4"
                variants={itemVariants}
              >
                <motion.div
                  className={`
                    w-20 h-20 sm:w-24 sm:h-24 rounded-2xl 
                    bg-gradient-to-br from-gray-900/70 to-black/50 
                    backdrop-blur-md border border-white/10
                    flex items-center justify-center mb-6 relative
                    shadow-2xl shadow-black/40
                  `}
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: 6, 
                    y: -12,
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <step.icon className="text-blue-400 w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.7} />

                  {/* Pulsing step number */}
                  <motion.div
                    className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm font-bold flex items-center justify-center shadow-lg border-2 border-white/30"
                    animate={{ 
                      scale: [1, 1.12, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0.4)",
                        "0 0 0 12px rgba(59, 130, 246, 0)",
                        "0 0 0 0 rgba(59, 130, 246, 0)"
                      ]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity, 
                      repeatType: "loop",
                      delay: i * 0.3 
                    }}
                  >
                    {i + 1}
                  </motion.div>
                </motion.div>

                <h3 className="font-display text-xl sm:text-2xl font-semibold text-white mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-gray-400/90 text-base sm:text-lg max-w-[180px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile vertical timeline - with more animation */}
        <div className="md:hidden space-y-8 mt-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className={`
                flex items-start gap-5 glassmorphic 
                rounded-2xl p-6 border border-white/8
                bg-gradient-to-br from-gray-900/50 to-black/40
                backdrop-blur-lg shadow-xl shadow-black/50
              `}
              initial={{ opacity: 0, x: -60, scale: 0.95 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.9, 
                delay: i * 0.2, 
                type: "spring", 
                stiffness: 100, 
                damping: 12 
              }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div className="relative shrink-0">
                <motion.div
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-800/90 to-black/70 flex items-center justify-center border border-white/10 shadow-lg"
                  whileHover={{ rotate: 10, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <step.icon className="text-blue-400 w-8 h-8" strokeWidth={1.8} />
                </motion.div>

                <motion.div
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xs font-bold flex items-center justify-center border-2 border-white/30 shadow-md"
                  animate={{ 
                    scale: [1, 1.15, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    delay: i * 0.4 
                  }}
                >
                  {i + 1}
                </motion.div>
              </div>

              <div className="pt-1">
                <h3 className="font-display text-xl font-semibold text-white mb-1.5">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;