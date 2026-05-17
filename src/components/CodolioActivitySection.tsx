import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Flame, Trophy, Star, Activity, ExternalLink, RefreshCw } from "lucide-react";
import { CodolioApiService } from "@/lib/codolioApi";

interface HeatmapDay {
  date: string;
  count: number;
}

interface CodolioStats {
  maxStreak: number;
  currentStreak: number;
  totalActiveDays: number;
  totalSubmissions: number;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const getIntensityClass = (count: number) => {
  if (count === 0) return "bg-white/[0.04] border border-white/[0.06]";
  if (count <= 2) return "bg-green-500/20 border border-green-500/15";
  if (count <= 5) return "bg-green-500/40 border border-green-500/30";
  if (count <= 8) return "bg-green-500/60 border border-green-500/40 shadow-[0_0_6px_rgba(34,197,94,0.4)]";
  return "bg-green-500 border border-green-400/50 shadow-[0_0_10px_rgba(34,197,94,0.6)]";
};

const generateMockHeatmapData = (): HeatmapDay[] => {
  const data: HeatmapDay[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const r = Math.random();
    let count = 0;
    if (r > 0.55) count = Math.floor(Math.random() * 3) + 1;
    if (r > 0.8) count = Math.floor(Math.random() * 5) + 3;
    if (r > 0.95) count = Math.floor(Math.random() * 6) + 8;
    data.push({ date: date.toISOString().split("T")[0], count });
  }
  return data;
};

const parseCodolioPayload = (response: any): { heatmapData: HeatmapDay[]; stats: CodolioStats; platformStats: any } | null => {
  try {
    const platforms = response?.data?.platformProfiles?.platformProfiles;
    if (!platforms || !Array.isArray(platforms)) {
      console.warn("Invalid Codolio payload structure:", response);
      return null;
    }

    let platformStats = null;
    let totalSubmissions = 0;
    let overallMaxStreak = 0;
    let overallCurrentStreak = 0;
    let overallTotalActiveDays = 0;

    let totalEasy = 0;
    let totalMedium = 0;
    let totalHard = 0;
    let totalDSA = 0;

    const aggregatedCalendar: { [timestamp: string]: number } = {};

    platforms.forEach((p: any) => {
      if (p.platform === "geeksforgeeks" || p.platform === "interviewbit" || p.platform === "leetcode") {
        if (!platformStats && (p.userStats?.handle || p.totalQuestionStats?.totalQuestionCounts)) {
          platformStats = {
            platform: p.platform,
            handle: p.userStats?.handle || "N/A",
            rating: p.userStats?.currentRating || p.userStats?.maxRating || 0,
            highestRating: p.userStats?.maxRating || 0,
            totalQuestions: p.totalQuestionStats?.totalQuestionCounts || 0,
            easy: p.totalQuestionStats?.easyQuestionCounts || 0,
            medium: p.totalQuestionStats?.mediumQuestionCounts || 0,
            hard: p.totalQuestionStats?.hardQuestionCounts || 0,
          };
        }
      }

      const platformSubmissions = p.totalQuestionStats?.totalQuestionCounts || 0;
      totalSubmissions += platformSubmissions;

      const easy = p.totalQuestionStats?.easyQuestionCounts || 0;
      const medium = p.totalQuestionStats?.mediumQuestionCounts || 0;
      const hard = p.totalQuestionStats?.hardQuestionCounts || 0;

      totalEasy += easy;
      totalMedium += medium;
      totalHard += hard;
      totalDSA += easy + medium + hard;

      const maxStreak = p.dailyActivityStatsResponse?.maxStreak;
      if (maxStreak && maxStreak > overallMaxStreak) overallMaxStreak = maxStreak;

      const currentStreak = p.dailyActivityStatsResponse?.currentStreak;
      if (currentStreak && currentStreak > overallCurrentStreak) overallCurrentStreak = currentStreak;

      const totalActiveDays = p.dailyActivityStatsResponse?.totalActiveDays;
      if (totalActiveDays && totalActiveDays > overallTotalActiveDays) overallTotalActiveDays = totalActiveDays;

      const cal = p.dailyActivityStatsResponse?.submissionCalendar;
      if (cal && typeof cal === "object") {
        Object.entries(cal).forEach(([timestamp, count]) => {
          const countNum = Number(count);
          if (!isNaN(countNum) && countNum > 0) {
            aggregatedCalendar[timestamp] = (aggregatedCalendar[timestamp] || 0) + countNum;
          }
        });
      }
    });

    const heatmapData: HeatmapDay[] = Object.entries(aggregatedCalendar).map(([timestamp, count]) => {
      const date = new Date(parseInt(timestamp) * 1000);
      return {
        date: date.toISOString().split("T")[0],
        count: count as number,
      };
    });

    heatmapData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const activeDaysCount = overallTotalActiveDays || Object.keys(aggregatedCalendar).length;

    console.log("Parsed Codolio Data:", {
      heatmapDataPoints: heatmapData.length,
      maxStreak: overallMaxStreak,
      totalSubmissions,
      platformStats,
      calendarEntries: Object.keys(aggregatedCalendar).length,
      dsaStats: { totalEasy, totalMedium, totalHard, totalDSA },
    });

    return {
      heatmapData,
      stats: {
        maxStreak: overallMaxStreak,
        currentStreak: overallCurrentStreak,
        totalActiveDays: activeDaysCount,
        totalSubmissions,
      },
      platformStats: {
        ...platformStats,
        dsaStats: {
          easy: totalEasy,
          medium: totalMedium,
          hard: totalHard,
          total: totalDSA,
        },
      },
    };
  } catch (e) {
    console.error("Failed to parse Codolio payload:", e);
    return null;
  }
};

const CodolioActivitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [heatmapData, setHeatmapData] = useState<HeatmapDay[]>([]);
  const [stats, setStats] = useState<CodolioStats>({
    maxStreak: 0,
    currentStreak: 0,
    totalActiveDays: 0,
    totalSubmissions: 0,
  });
  const [platformStats, setPlatformStats] = useState<any>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; date: string; count: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const fetchCodolioData = async () => {
    setIsLoading(true);
    try {
      const response = await CodolioApiService.fetchProfileData();
      const parsed = parseCodolioPayload(response);
      if (parsed && parsed.heatmapData.length > 0) {
        const today = new Date();
        const dayMap = new Map(parsed.heatmapData.map((d) => [d.date, d.count]));
        const fullData: HeatmapDay[] = [];

        for (let i = 364; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split("T")[0];
          fullData.push({ date: dateStr, count: dayMap.get(dateStr) || 0 });
        }

        setHeatmapData(fullData);
        setStats(parsed.stats);
        setPlatformStats(parsed.platformStats);
        setIsLive(true);
        setIsLoading(false);
        return;
      }
      throw new Error("No usable data found");
    } catch (error) {
      console.warn("Codolio fetch failed, using mock data:", error);
      const mockData = generateMockHeatmapData();
      setHeatmapData(mockData);
      const activeDays = mockData.filter((d) => d.count > 0).length;
      setStats({
        maxStreak: 42,
        currentStreak: 5,
        totalActiveDays: activeDays,
        totalSubmissions: mockData.reduce((a, b) => a + b.count, 0),
      });
      setIsLive(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCodolioData();
  }, []);

  const weeks: HeatmapDay[][] = [];
  const monthLabels: { month: string; weekIndex: number }[] = [];
  let currentMonth = -1;

  if (heatmapData.length > 0) {
    const firstDay = new Date(heatmapData[0].date).getDay();
    const padded: HeatmapDay[] = [];
    for (let i = 0; i < firstDay; i++) {
      padded.push({ date: "", count: -1 });
    }
    const allDays = [...padded, ...heatmapData];

    for (let i = 0; i < allDays.length; i += 7) {
      const week = allDays.slice(i, i + 7);
      weeks.push(week);

      const firstValid = week.find((d) => d.date !== "");
      if (firstValid) {
        const month = new Date(firstValid.date).getMonth();
        if (month !== currentMonth) {
          currentMonth = month;
          monthLabels.push({ month: MONTHS[month], weekIndex: weeks.length - 1 });
        }
      }
    }
  }

  const handleCellHover = (e: React.MouseEvent, day: HeatmapDay) => {
    if (day.count < 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
      date: day.date,
      count: day.count,
    });
  };

  const statCards = [
    { label: "Rating", value: platformStats?.rating || "N/A", icon: Trophy, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { label: "Problems Solved", value: stats.totalSubmissions, icon: Activity, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Active Days", value: stats.totalActiveDays, icon: Activity, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Max Streak", value: `${stats.maxStreak}`, icon: Flame, color: "text-orange-400", bg: "bg-orange-400/10" },
  ];

  return (
    <section id="code-activity" className="py-20 relative" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-4"
          >
            <Activity size={48} className="text-primary mx-auto" />
          </motion.div>
          <h2 className="section-title text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            Code Activity
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Real-time coding consistency and submission heatmap from{" "}
            <a
              href={CodolioApiService.getProfileUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              Codolio <ExternalLink size={13} />
            </a>
          </p>
        </motion.div>

        {/* Stats Row with DSA Chart */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-10">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="glass-card p-5 md:p-6 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-all border border-white/10 hover:border-primary/30"
            >
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {isLoading ? (
                  <div className="w-12 h-7 rounded bg-white/10 animate-pulse" />
                ) : (
                  stat.value
                )}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}

          {/* DSA Circular Chart */}
          {platformStats?.dsaStats && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: statCards.length * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="glass-card p-5 md:p-6 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-all border border-white/10 hover:border-primary/30"
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 mb-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                  <circle
                    cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="8" fill="none"
                    strokeDasharray={String((platformStats.dsaStats.easy / platformStats.dsaStats.total) * 251.33) + " 251.33"}
                    strokeLinecap="round"
                  />
                  <circle
                    cx="50" cy="50" r="40" stroke="#eab308" strokeWidth="8" fill="none"
                    strokeDasharray={String((platformStats.dsaStats.medium / platformStats.dsaStats.total) * 251.33) + " 251.33"}
                    strokeDashoffset={String(-((platformStats.dsaStats.easy / platformStats.dsaStats.total) * 251.33))}
                    strokeLinecap="round"
                  />
                  <circle
                    cx="50" cy="50" r="40" stroke="#ef4444" strokeWidth="8" fill="none"
                    strokeDasharray={String((platformStats.dsaStats.hard / platformStats.dsaStats.total) * 251.33) + " 251.33"}
                    strokeDashoffset={String(-(((platformStats.dsaStats.easy + platformStats.dsaStats.medium) / platformStats.dsaStats.total) * 251.33))}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-foreground">{platformStats.dsaStats.total}</span>
                  <span className="text-xs text-muted-foreground">DSA</span>
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 text-xs mt-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">Easy: {platformStats.dsaStats.easy}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="text-muted-foreground">Medium: {platformStats.dsaStats.medium}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-muted-foreground">Hard: {platformStats.dsaStats.hard}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 via-emerald-500/10 to-teal-500/5 rounded-3xl blur opacity-15 group-hover:opacity-25 transition duration-1000" />

          <div className="relative glass-card rounded-3xl p-6 md:p-8 bg-card/60 backdrop-blur-xl border border-white/10">
            {/* Heatmap Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-2.5 h-2.5 rounded-full ${isLive ? "bg-green-400" : "bg-yellow-400"}`} />
                  {isLive && (
                    <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-400 animate-ping opacity-75" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Activity Heatmap</h3>
                  <p className="text-xs text-muted-foreground">Past 365 days of code</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={fetchCodolioData}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-foreground hover:bg-white/10 transition-colors disabled:opacity-50"
                  title="Live Sync"
                >
                  <RefreshCw size={12} className={isLoading ? "animate-spin" : ""} />
                  <span>Sync</span>
                </button>
                <div className="hidden md:flex px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                  {isLive ? "✨ Live Data" : "📊 Sample Data"}
                </div>
              </div>
            </div>

            {/* Heatmap Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto custom-scrollbar pb-2">
                <div className="inline-block min-w-max">
                  {/* Month labels */}
                  <div className="flex ml-8 mb-1.5">
                    {monthLabels.map((label, idx) => {
                      const prevWeekIdx = idx > 0 ? monthLabels[idx - 1].weekIndex : 0;
                      const gap = idx === 0 ? label.weekIndex : label.weekIndex - prevWeekIdx;
                      return (
                        <div
                          key={`${label.month}-${idx}`}
                          className="text-[10px] text-muted-foreground/70"
                          style={{ width: `${gap * 14}px` }}
                        >
                          {label.month}
                        </div>
                      );
                    })}
                  </div>

                  {/* Grid with day labels */}
                  <div className="flex gap-0">
                    <div className="flex flex-col gap-[2px] pr-1.5 pt-0">
                      {DAY_LABELS.map((label, i) => (
                        <div key={i} className="h-[11px] flex items-center">
                          <span className="text-[9px] text-muted-foreground/60 w-6 text-right">{label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-[2px]">
                      {weeks.map((week, colIndex) => (
                        <div key={colIndex} className="flex flex-col gap-[2px]">
                          {week.map((day, rowIndex) => (
                            <div
                              key={`${colIndex}-${rowIndex}`}
                              className={`w-[11px] h-[11px] rounded-[2px] transition-all duration-150 ${
                                day.count < 0
                                  ? "bg-transparent"
                                  : `${getIntensityClass(day.count)} hover:scale-[1.6] hover:z-20 cursor-pointer`
                              }`}
                              onMouseEnter={(e) => day.count >= 0 && handleCellHover(e, day)}
                              onMouseLeave={() => setTooltip(null)}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-[100] pointer-events-none px-3 py-2 rounded-lg bg-gray-900/95 backdrop-blur border border-white/10 shadow-xl text-xs"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="font-semibold text-foreground">
            {tooltip.count} submission{tooltip.count !== 1 ? "s" : ""}
          </div>
          <div className="text-muted-foreground">
            {new Date(tooltip.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default CodolioActivitySection;
