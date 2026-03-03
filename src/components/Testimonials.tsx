import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, TechVentures",
    text: "Quorixs transformed our entire digital infrastructure. Their AI automation solutions saved us 40% in operational costs.",
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO, FinFlow",
    text: "The CRM they built is phenomenal. Our team productivity doubled within the first quarter of implementation.",
  },
  {
    name: "Emily Nakamura",
    role: "Founder, ShopWave",
    text: "Our e-commerce platform went from concept to launch in record time. The attention to detail is unmatched.",
  },
  {
    name: "David Park",
    role: "VP Engineering, CloudSync",
    text: "Their DevOps expertise helped us achieve 99.99% uptime. Quorixs is our go-to technology partner.",
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            What our clients say about working with us.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            key={active}
            className="glass rounded-2xl p-10 md:p-12 text-center relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Quote className="text-primary/30 mx-auto mb-6" size={48} />
            <p className="text-foreground text-lg md:text-xl leading-relaxed mb-8">
              "{testimonials[active].text}"
            </p>
            <div>
              <p className="font-display font-semibold text-foreground">
                {testimonials[active].name}
              </p>
              <p className="text-muted-foreground text-sm">
                {testimonials[active].role}
              </p>
            </div>
          </motion.div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === active ? "bg-primary w-8" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
