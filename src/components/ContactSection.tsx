import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().optional(),
  projectDetails: z
    .string()
    .min(10, { message: "Project details must be at least 10 characters" }),
  budget: z.string().optional(), // we'll store as string like "25000"
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectDetails: "",
      budget: "0",
    },
  });

  // Watch budget value for live display
  const budgetValue = watch("budget") || "0";
  const budgetDisplay =
    Number(budgetValue) >= 100000
      ? "$100K+"
      : Number(budgetValue) === 0
      ? "$0"
      : `$${Number(budgetValue).toLocaleString()}`;

  const onSubmit = (data: FormValues) => {
    // You can format budget nicer here before sending to backend
    // Example: data.budget = budgetDisplay;
    console.log("Form submitted:", data);

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      className="py-24 relative bg-gradient-section"
      ref={ref}
    >
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Ready to bring your vision to life? Get in touch.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Contact Info Cards */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Email */}
            <div className="glass rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail className="text-primary" size={22} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground font-medium">hello@quorixs.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="glass rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Phone className="text-primary" size={22} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-foreground font-medium">201-812-9584</p>
              </div>
            </div>

            {/* WhatsApp - using MessageCircle icon */}
            <div className="glass rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageCircle className="text-primary" size={22} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">WhatsApp</p>
                <a
                  href="https://wa.me/12402882006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-medium hover:underline"
                >
                  240-288-2006
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="glass rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="text-primary" size={22} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <div className="text-foreground font-medium">
                  <p>225 Reformation Pkwy &nbsp;Ste 200</p>
        
                  <p>Canton, GA 30114</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form with validation */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-3 glass rounded-2xl p-8 space-y-5"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("name")}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2 sm:col-span-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("email")}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Company Name"
                {...register("company")}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              {errors.company && (
                <p className="text-destructive text-sm mt-1">{errors.company.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <textarea
                placeholder="Project Details"
                rows={4}
                {...register("projectDetails")}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              />
              {errors.projectDetails && (
                <p className="text-destructive text-sm mt-1">
                  {errors.projectDetails.message}
                </p>
              )}
            </div>

            {/* Budget Range Slider */}
            <div className="space-y-3">
              <label className="text-sm text-muted-foreground block">
                Budget Range (optional): <span className="font-medium">{budgetDisplay}</span>
              </label>
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                {...register("budget")}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
              />
              <div className="flex justify-between text-xs text-muted-foreground px-1">
                <span>$0</span>
                <span>$100K+</span>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting || !isValid || submitted}
              className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg glow-primary hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isValid && !submitted ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
            >
              {submitted ? (
                "Message Sent! ✓"
              ) : isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message
                  <Send size={18} />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
