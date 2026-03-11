import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const socialLinks = [
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Github, href: "#" },
  { icon: Instagram, href: "#" },
];

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-12 md:py-16 bg-gradient-to-b from-background/80 to-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 md:gap-10 mb-12">
          {/* Logo + Description Section */}
          <div className="flex flex-col items-start">
            <a href="#" className="flex items-center gap-3 mb-4 group">
              <img
                src="/logo.png"
                alt="Quorisx Logo"
                className="h-12 md:h-14 lg:h-16 w-auto object-contain drop-shadow-2xl brightness-110 contrast-[1.05]"
                // Size bada rakha footer ke liye – agar aur bada chahiye to h-16 → h-20 kar dena
              />
              {/* Optional: Text saath mein chahiye to uncomment kar do */}
              {/* 
              <span className="font-display font-bold text-2xl md:text-3xl text-foreground tracking-tight group-hover:text-primary transition-colors">
                Quorisx
              </span>
              */}
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Engineering the future with intelligent digital solutions. We build scalable, high-performance systems that drive business growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-5">Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect / Socials */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-5">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-11 h-11 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 hover:glow-primary transition-all duration-300 shadow-md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/30 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © Quorisx 2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
