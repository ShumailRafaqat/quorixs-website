import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowLogo(true), 200);
    const t2 = setTimeout(() => setShowText(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  const typingText = "Minds Building Futures";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated grid lines */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.07]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Sweeping light beam */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(105deg, transparent 40%, hsl(var(--primary) / 0.08) 45%, hsl(var(--primary) / 0.15) 50%, hsl(var(--primary) / 0.08) 55%, transparent 60%)`,
        }}
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
      />

      {/* Particle background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              background: i % 3 === 0
                ? `hsl(var(--primary))`
                : i % 3 === 1
                ? `hsl(var(--neon-blue))`
                : `hsl(var(--accent))`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -300 - 100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, 0.9, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, hsl(var(--primary) / 0.2) 0%, transparent 60%)` }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbiting rings */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full border border-primary/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-primary"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      <motion.div
        className="absolute w-[220px] h-[220px] rounded-full border border-accent/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute -bottom-1 left-1/2 w-2 h-2 rounded-full bg-accent"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Logo */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotateY: -180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 relative z-10"
          >
            <div className="relative">
              <motion.div
                className="w-24 h-24 rounded-2xl border-2 border-primary/60 flex items-center justify-center glow-border relative overflow-hidden"
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Inner shimmer */}
                <motion.div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, transparent 30%, hsl(var(--primary) / 0.2) 50%, transparent 70%)` }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                />
                <span className="text-4xl font-display font-bold text-gradient relative z-10">Q</span>
              </motion.div>
              {/* Pulsing outer rings */}
              <motion.div
                className="absolute -inset-3 rounded-3xl border border-primary/30"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -inset-6 rounded-[2rem] border border-primary/15"
                animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
              />
            </div>

            {/* Brand name reveal */}
            <motion.h2
              className="text-2xl font-display font-bold text-gradient text-center mt-4 tracking-widest"
              initial={{ opacity: 0, y: 20, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.2em' }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              QUORISX
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Typing text */}
      {showText && (
        <motion.div className="mb-12 h-8 overflow-hidden relative z-10">
          <motion.p
            className="text-lg md:text-xl font-display tracking-wider text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {typingText.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className={char !== " " ? "neon-text" : ""}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>
      )}

      {/* Progress bar */}
      <div className="w-64 md:w-80 relative z-10">
        <div className="h-[3px] w-full bg-secondary rounded-full overflow-hidden relative">
          <motion.div
            className="h-full rounded-full relative"
            style={{
              background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--neon-blue)), hsl(var(--accent)))`,
              width: `${progress}%`,
            }}
            transition={{ ease: "easeOut" }}
          />
          {/* Glow at progress tip */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
            style={{
              left: `${progress}%`,
              background: `radial-gradient(circle, hsl(var(--primary) / 0.8), transparent)`,
              filter: 'blur(4px)',
            }}
          />
        </div>
        <motion.p
          className="text-center mt-3 text-sm font-display text-muted-foreground tabular-nums"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {progress}%
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Preloader;
