import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "GitHub", href: "#github" },
  { name: "Certifications", href: "#certifications" },
  { name: "Code Activity", href: "#code-activity" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="relative flex items-center justify-between">
            <motion.a
              href="#home"
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/35 bg-background/40 shadow-[0_0_22px_rgba(139,92,246,0.24)]">
                <span className="absolute inset-1 rounded-[14px] bg-primary/15 blur-md" />
                <img
                  src="/favicon.svg?v=2"
                  alt="Sachin logo"
                  className="relative z-10 h-9 w-9 object-contain"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-xl font-bold font-display gradient-text">Sachin95</span>
                <span className="mt-1 text-[10px] uppercase tracking-[0.38em] text-foreground/55">
                  Portfolio
                </span>
              </span>
            </motion.a>

            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 px-8 py-3 rounded-full bg-background/30 backdrop-blur-xl border border-primary/40 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium transition-all text-foreground/70 hover:text-foreground"
                  whileHover={{
                    textShadow: "0 0 15px rgba(255, 255, 255, 0.8)",
                    scale: 1.05,
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.a
                href="#contact"
                className="hidden lg:flex items-center gap-2 relative px-6 py-2.5 rounded-full font-semibold text-sm overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #D946EF, #8B5CF6)",
                  backgroundSize: "200% 200%",
                  boxShadow:
                    "0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(217, 70, 239, 0.3)",
                }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <Sparkles size={15} className="relative z-10 text-white" />
                <span className="relative z-10 text-white">Hire Me</span>
              </motion.a>

              <motion.button
                className="lg:hidden text-foreground p-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu size={22} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 z-[70] bg-background/95 backdrop-blur-2xl border-l border-primary/20 shadow-[-10px_0_40px_rgba(139,92,246,0.2)]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/35 bg-background/40 shadow-[0_0_18px_rgba(139,92,246,0.24)]">
                    <span className="absolute inset-1 rounded-[14px] bg-primary/15 blur-md" />
                    <img
                      src="/favicon.svg?v=2"
                      alt="Sachin logo"
                      className="relative z-10 h-8 w-8 object-contain"
                    />
                  </span>
                  <div className="leading-none">
                    <div className="text-lg font-bold gradient-text">Sachin95</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.32em] text-foreground/55">
                      Portfolio
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-foreground transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="flex flex-col gap-2 p-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all font-medium text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 transition-colors" />
                    {link.name}
                  </motion.a>
                ))}

                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * navLinks.length + 0.1, duration: 0.3 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #8B5CF6, #D946EF)",
                    boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
                  }}
                >
                  <Sparkles size={16} />
                  Hire Me
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
