import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const createSvgIcon = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const powerBiIcon = createSvgIcon(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect x="8" y="28" width="10" height="24" rx="4" fill="#F2C811" />
    <rect x="21" y="20" width="10" height="32" rx="4" fill="#F2C811" />
    <rect x="34" y="13" width="10" height="39" rx="4" fill="#F2C811" />
    <rect x="47" y="8" width="9" height="44" rx="4" fill="#F2C811" />
  </svg>
`);

const tableauIcon = createSvgIcon(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <g fill="#E97627">
      <rect x="29" y="8" width="6" height="16" rx="2" />
      <rect x="24" y="13" width="16" height="6" rx="2" />
    </g>
    <g fill="#1F5AA6">
      <rect x="29" y="40" width="6" height="16" rx="2" />
      <rect x="24" y="45" width="16" height="6" rx="2" />
    </g>
    <g fill="#D94F70">
      <rect x="8" y="29" width="6" height="16" rx="2" />
      <rect x="3" y="34" width="16" height="6" rx="2" />
    </g>
    <g fill="#13B5EA">
      <rect x="50" y="29" width="6" height="16" rx="2" />
      <rect x="45" y="34" width="16" height="6" rx="2" />
    </g>
    <g fill="#7A4FD1">
      <rect x="19" y="22" width="5" height="12" rx="2" />
      <rect x="15.5" y="25.5" width="12" height="5" rx="2" />
      <rect x="40" y="22" width="5" height="12" rx="2" />
      <rect x="36.5" y="25.5" width="12" height="5" rx="2" />
      <rect x="19" y="32" width="5" height="12" rx="2" />
      <rect x="15.5" y="35.5" width="12" height="5" rx="2" />
      <rect x="40" y="32" width="5" height="12" rx="2" />
      <rect x="36.5" y="35.5" width="12" height="5" rx="2" />
    </g>
  </svg>
`);

const excelIcon = createSvgIcon(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect x="18" y="10" width="34" height="44" rx="6" fill="#21A366" />
    <rect x="30" y="10" width="22" height="44" rx="6" fill="#33C481" />
    <path d="M24 18h22M24 28h22M24 38h22M24 48h22M36 18v30" stroke="#107C41" stroke-width="2.8" />
    <rect x="8" y="16" width="24" height="32" rx="5" fill="#185C37" />
    <path d="M15 24l10 16M25 24L15 40" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />
  </svg>
`);

const googleSheetsIcon = createSvgIcon(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <path d="M16 8h22l10 10v38H16z" fill="#34A853" />
    <path d="M38 8v10h10" fill="#8BD5A0" />
    <rect x="22" y="26" width="20" height="18" rx="2" fill="none" stroke="#ffffff" stroke-width="3" />
    <path d="M22 32h20M22 38h20M28 26v18M35 26v18" stroke="#ffffff" stroke-width="2.4" />
  </svg>
`);

const antigravityIcon = createSvgIcon(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="10" fill="#7C3AED" />
    <path d="M14 34c4-11 14-18 26-18 5 0 8 1 13 3" fill="none" stroke="#A78BFA" stroke-width="4" stroke-linecap="round" />
    <path d="M50 20l4-1-1-4" fill="none" stroke="#A78BFA" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M50 30c-4 11-14 18-26 18-5 0-8-1-13-3" fill="none" stroke="#C4B5FD" stroke-width="4" stroke-linecap="round" />
    <path d="M14 44l-4 1 1 4" fill="none" stroke="#C4B5FD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="32" cy="32" r="3" fill="#ffffff" />
  </svg>
`);

const codexIcon = createSvgIcon(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect x="10" y="10" width="44" height="44" rx="12" fill="#111827" />
    <path d="M25 23l-8 9 8 9M39 23l8 9-8 9" fill="none" stroke="#10B981" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M33 20l-4 24" stroke="#7DD3FC" stroke-width="3.5" stroke-linecap="round" />
  </svg>
`);

const chatGptIcon = createSvgIcon(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <g fill="none" stroke="#10A37F" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 11c4 0 7 2 9 5l7 1c4 1 7 4 8 8 1 4 0 8-2 11l2 7c1 4 0 8-3 11-3 3-7 4-11 3l-6 2c-4 1-8 0-11-3-3-3-4-7-3-11l-2-6c-3-3-4-7-3-11 1-4 4-7 8-8l6-2c2-4 5-7 9-7z" opacity="0.16" />
      <path d="M32 13c4 0 7 2 8 5l-6 4c-2-2-5-2-8 0l-6-4c2-3 6-5 12-5z" />
      <path d="M48 18c4 2 6 5 6 9s-2 7-5 9l-6-4c2-2 2-5 0-8l5-6z" />
      <path d="M49 37c2 4 2 8 0 11-2 4-5 6-9 6l-1-7c3 0 5-2 7-5l3-5z" />
      <path d="M31 51c-4 0-8-2-10-5l6-4c2 2 5 2 8 0l6 4c-2 3-5 5-10 5z" />
      <path d="M16 46c-4-2-6-5-6-9s2-7 5-9l6 4c-2 2-2 5 0 8l-5 6z" />
      <path d="M15 27c-2-4-2-8 0-11 2-4 5-6 9-6l1 7c-3 0-5 2-7 5l-3 5z" />
    </g>
  </svg>
`);

const githubIcon = createSvgIcon(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <path
      fill="#F8FAFC"
      d="M32 10C19.8 10 10 19.9 10 32.2c0 9.8 6.3 18.1 15 21 1.1.2 1.5-.5 1.5-1.1 0-.6 0-2 0-4-6.1 1.3-7.4-2.6-7.4-2.6-1-2.6-2.5-3.3-2.5-3.3-2-.1.1-.1.1-.1 2.2.2 3.3 2.2 3.3 2.2 1.9 3.4 5.1 2.4 6.3 1.8.2-1.4.8-2.4 1.4-2.9-4.9-.6-10-2.5-10-11 0-2.4.9-4.4 2.2-6-.2-.6-1-3 .2-6.1 0 0 1.8-.6 6.1 2.3 1.8-.5 3.6-.8 5.5-.8s3.8.2 5.5.8c4.2-2.9 6.1-2.3 6.1-2.3 1.2 3.1.5 5.5.2 6.1 1.4 1.6 2.2 3.7 2.2 6 0 8.5-5.2 10.3-10.1 10.9.8.7 1.5 2 1.5 4.1 0 3 0 5.4 0 6.1 0 .6.4 1.3 1.5 1.1 8.7-2.9 15-11.2 15-21C54 19.9 44.2 10 32 10z"
    />
  </svg>
`);

const allSkills = [
  // Programming Languages
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", category: "Programming Languages" },
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", category: "Programming Languages" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "Programming Languages" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Programming Languages" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Programming Languages" },

  // Web and Frameworks
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Web and Frameworks" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "Web and Frameworks" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Web and Frameworks" },
  { name: "Tailwind CSS", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", category: "Web and Frameworks" },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "Web and Frameworks" },

  // Backend and Databases
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend and Databases" },
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", category: "Backend and Databases" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Backend and Databases" },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "Backend and Databases" },

  // Tools and Platforms
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "Tools and Platforms" },
  { name: "GitHub", icon: githubIcon, category: "Tools and Platforms" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", category: "Tools and Platforms" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", category: "Tools and Platforms" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", category: "Tools and Platforms" },
];

// Split into two rows for opposite-direction marquees
const row1 = allSkills.slice(0, Math.ceil(allSkills.length / 2));
const row2 = allSkills.slice(Math.ceil(allSkills.length / 2));

const SkillCard = ({ skill }: { skill: typeof allSkills[0] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.12, y: -6, rotate: [0, -2, 2, 0] }}
      transition={{ rotate: { duration: 0.3 } }}
      className="flex-shrink-0 flex flex-col items-center justify-center gap-2 px-5 py-4 w-28 rounded-2xl cursor-pointer relative overflow-hidden mx-2"
      style={{
        background: hovered
          ? "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(217,70,239,0.15))"
          : "rgba(255,255,255,0.03)",
        border: hovered
          ? "1px solid rgba(139,92,246,0.5)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: hovered
          ? "0 0 20px rgba(139,92,246,0.3), 0 8px 20px rgba(0,0,0,0.3)"
          : "0 2px 10px rgba(0,0,0,0.2)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Glow behind icon on hover */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-2xl"
          style={{ background: "radial-gradient(circle at center, rgba(139,92,246,0.2), transparent 70%)" }}
        />
      )}
      <div className="w-10 h-10 relative z-10">
        <img
          src={skill.icon}
          alt={skill.name}
          className="w-full h-full object-contain"
          style={{ filter: hovered ? "brightness(1.3) drop-shadow(0 0 6px rgba(139,92,246,0.6))" : "brightness(0.9)" }}
        />
      </div>
      <span className="text-xs font-medium text-foreground/70 text-center relative z-10 group-hover:text-foreground transition-colors">
        {skill.name}
      </span>
    </motion.div>
  );
};

// A single infinite-marquee row
const MarqueeRow = ({ skills, direction = "left", speed = 30 }: {
  skills: typeof allSkills,
  direction?: "left" | "right",
  speed?: number
}) => {
  const doubled = [...skills, ...skills, ...skills]; // triple to ensure seamless loop

  return (
    <div className="overflow-hidden relative w-full">
      {/* Left fade */}
      <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }} />

      <motion.div
        className="flex"
        animate={{
          x: direction === "left" ? ["0%", `-${100 / 3}%`] : [`-${100 / 3}%`, "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {doubled.map((skill, i) => (
          <SkillCard key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </motion.div>
    </div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = ["All", "Programming Languages", "Web and Frameworks", "Backend and Databases", "Tools and Platforms"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = activeCategory === "All"
    ? allSkills
    : allSkills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">My Skills</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Carousel Marquee (shown when All is selected) */}
        {activeCategory === "All" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Row 1 → left */}
            <MarqueeRow skills={row1} direction="left" speed={12} />
            {/* Row 2 → right */}
            <MarqueeRow skills={row2} direction="right" speed={8} />
          </motion.div>
        ) : (
          /* One-time left-to-right slide for filtered category */
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
