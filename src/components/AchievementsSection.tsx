import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Star, Rocket, Zap, Gamepad2, BarChart3, User, Users } from "lucide-react";

const achievements = [
  {
    title: "GATE 2026",
    subtitle: "All India Rank 5711",
    description:
      "Achieved an All India Rank 5711 among 200,000+ candidates in the Graduate Aptitude Test in Engineering.",
    date: "2026",
    emoji: "🎓",
    icon: <Trophy size={22} />,
    gradient: "from-blue-500/20 to-cyan-800/10",
    glow: "rgba(59,130,246,0.3)",
    border: "border-blue-500/30",
    badge: "#3B82F6",
    tag: "Exam",
    image: "/gate-scorecard.png", // <--- PLACE YOUR IMAGE IN THE 'public' FOLDER AS 'gate-scorecard.png'
  },
  {
    title: "LeetCode",
    subtitle: "300+ Problems Solved",
    description:
      "Solved 300+ problems in Data Structures and Algorithms, demonstrating proficiency in competitive programming and algorithmic problem-solving.",
    date: "Current",
    emoji: "💻",
    icon: <BarChart3 size={22} />,
    gradient: "from-green-500/20 to-emerald-800/10",
    glow: "rgba(34,197,94,0.3)",
    border: "border-green-500/30",
    badge: "#22C55E",
    tag: "Coding",
  },
  {
    title: "Public Speaking",
    subtitle: "Speak for India",
    description: "Represented Parul University at Speak for India - Gujarat Edition, organized by Divya Bhaskar and sponsored by Federal Bank.",
    date: "Event",
    emoji: "🎙️",
    icon: <User size={22} />,
    gradient: "from-purple-500/20 to-pink-800/10",
    glow: "rgba(168,85,247,0.3)",
    border: "border-purple-500/30",
    badge: "#A855F7",
    tag: "Speaking",
  },
  {
    title: "Chess",
    subtitle: "Zonal Level Runner-up",
    description: "Secured runner-up position in Zonal Level Chess at DAV National Sports Championship.",
    date: "Sports",
    emoji: "♟️",
    icon: <Star size={22} />,
    gradient: "from-blue-500/20 to-indigo-800/10",
    glow: "rgba(59,130,246,0.3)",
    border: "border-blue-500/30",
    badge: "#3B82F6",
    tag: "Sports",
  },
];

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

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
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-6 mx-auto"
          >
            <Star size={30} className="text-yellow-400" />
          </motion.div>
          <h2 className="section-title">Achievements</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            My Accomplishments
          </p>
        </motion.div>

        {/* Achievement cards */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent pointer-events-none" />

          <div className="flex flex-col gap-12">
            {achievements.map((achievement, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.18 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-background z-10"
                    style={{ backgroundColor: achievement.badge, boxShadow: `0 0 12px ${achievement.glow}` }}
                  />

                  {/* Date pill (hidden on mobile, shown on desktop beside the card) */}
                  <div className={`hidden md:flex md:w-[calc(50%-2rem)] ${isLeft ? "justify-end pr-8" : "justify-start pl-8"}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white"
                      style={{ background: achievement.badge, boxShadow: `0 0 15px ${achievement.glow}` }}
                    >
                      <span className="text-lg">{achievement.emoji}</span>
                      {achievement.date}
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div className={`md:w-[calc(50%-2rem)] ${isLeft ? "md:pl-8" : "md:pr-8"} pl-16 md:pl-8`}>
                    <motion.div
                      whileHover={{ y: -6, scale: 1.01 }}
                      className={`relative rounded-2xl border ${achievement.border} overflow-hidden group`}
                      style={{ transition: "box-shadow 0.3s ease" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${achievement.glow}, 0 8px 30px rgba(0,0,0,0.3)`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "";
                      }}
                    >
                      {/* Top accent bar */}
                      <div className="h-1" style={{ background: `linear-gradient(90deg, ${achievement.badge}, transparent)` }} />

                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                      <div className="relative z-10 p-6 flex flex-col gap-3">
                        {/* Mobile date */}
                        <div className="flex items-center justify-between md:hidden">
                          <span
                            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white"
                            style={{ backgroundColor: achievement.badge }}
                          >
                            {achievement.emoji} {achievement.date}
                          </span>
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium border"
                            style={{ color: achievement.badge, borderColor: `${achievement.badge}50` }}
                          >
                            {achievement.tag}
                          </span>
                        </div>

                        {/* Title row */}
                        <div className="flex items-start gap-3">
                          <div
                            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white mt-0.5"
                            style={{ background: achievement.badge, boxShadow: `0 0 15px ${achievement.glow}` }}
                          >
                            {achievement.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                              {achievement.title}
                            </h3>
                            <p className="text-sm font-medium mt-0.5" style={{ color: achievement.badge }}>
                              {achievement.subtitle}
                            </p>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed ml-13">
                          {achievement.description}
                        </p>

                        {/* Achievement Image */}
                        {achievement.image && (
                          <div className="mt-3 ml-13 overflow-hidden rounded-xl border border-white/10 shadow-sm">
                            <img 
                              src={achievement.image} 
                              alt={`${achievement.title} representation`} 
                              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500" 
                            />
                          </div>
                        )}

                        {/* Desktop tag */}
                        <div className="hidden md:flex">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-semibold border"
                            style={{ color: achievement.badge, borderColor: `${achievement.badge}50`, background: `${achievement.badge}10` }}
                          >
                            {achievement.tag}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
