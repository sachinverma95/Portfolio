import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Campaign Team Leader",
    company: "Projection 2025 - Gujarat's Largest Technical Fest",
    location: "Vadodara, Gujarat",
    duration: "2025",
    tools: ["Leadership", "Event Management", "Marketing"],
    description: [
      "Led a cross-functional campaign team of 8+ members, managing end-to-end promotional execution and student outreach operations for Gujarat's largest technical fest with 5,000+ attendees.",
      "Coordinated outreach across 10+ colleges, increasing event participation by 25% through targeted student engagement campaigns and social media strategy."
    ],
    gradient: "from-blue-500/20 to-indigo-900/10",
    borderColor: "border-blue-500/30",
    glowColor: "rgba(59,130,246,0.3)",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6 mx-auto"
          >
            <Briefcase size={30} className="text-blue-400" />
          </motion.div>
          <h2 className="section-title">Experience</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Professional journey and work experience
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)",
                borderColor: "rgba(59, 130, 246, 0.4)"
              }}
              className={`glass-card p-8 relative overflow-hidden transition-all duration-300 border ${exp.borderColor}`}
            >
              {/* Decorative corner glow */}
              <div 
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl pointer-events-none"
                style={{ background: exp.glowColor }}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {exp.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                      <span className="font-medium text-foreground">{exp.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground mt-4 md:mt-0">
                    <Calendar size={16} />
                    <span className="text-sm">{exp.duration}</span>
                  </div>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {exp.tools.map((tool, toolIndex) => (
                    <motion.span
                      key={toolIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + toolIndex * 0.1 }}
                      className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium"
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>

                {/* Description */}
                <ul className="space-y-3">
                  {exp.description.map((point, pointIndex) => (
                    <motion.li
                      key={pointIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + pointIndex * 0.1 }}
                      className="flex items-start gap-3 text-foreground/80 leading-relaxed"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
