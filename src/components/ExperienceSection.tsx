import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Calendar, Building2, MapPin } from "lucide-react";

const experience = [
  {
    title: "Programmer Analyst",
    org: "Ramco Systems",
    period: "Sep 2024 – Oct 2025",
    location: "Chennai, India",
    points: [
      "Designed interactive UI screens and implemented backend business logic using SQL",
      "Developed RESTful APIs for enterprise HRP platform finance workflows",
      "Enhanced tax slab configurations and payroll calculation logic",
      "Integrated custom APIs and automated job alerts",
      "Worked in Agile teams on enterprise finance and payroll systems",
      "Delivered critical enhancements within tight sprint deadlines",
    ],
  },
];

const education = [
  {
    title: "B.Tech in CSE (Data Science)",
    org: "VIT Vellore",
    period: "2020 – 2024",
    location: "Vellore, India",
    points: ["Specialization in Data Science", "CGPA: 8.02", "Focus on analytics, ML & data engineering"],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      {/* Grid BG */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(220,70%,60%) 1px, transparent 1px), linear-gradient(90deg, hsl(220,70%,60%) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px]" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-widest mb-4">
            My Journey
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-hero-foreground">
            Experience &{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Education</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Work */}
          <div>
            <h3 className="font-display text-lg font-semibold text-hero-foreground flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              Work Experience
            </h3>
            {experience.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative p-6 rounded-xl bg-hero-foreground/5 backdrop-blur-sm border border-hero-foreground/10 hover:border-secondary/30 transition-all"
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-gradient-to-b from-accent to-secondary" />

                <div className="flex flex-wrap gap-3 mb-3 pl-4">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary">
                    <Calendar className="w-3 h-3" /> {e.period}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-hero-muted/60">
                    <MapPin className="w-3 h-3" /> {e.location}
                  </span>
                </div>
                <h4 className="font-display text-lg font-bold text-hero-foreground pl-4">{e.title}</h4>
                <p className="text-sm text-hero-muted/80 mb-4 pl-4 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> {e.org}
                </p>
                <ul className="space-y-2 pl-4">
                  {e.points.map((p, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.05 }}
                      className="text-sm text-hero-muted/70 flex gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                      {p}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Education */}
          <div>
            <h3 className="font-display text-lg font-semibold text-hero-foreground flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              Education
            </h3>
            {education.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative p-6 rounded-xl bg-hero-foreground/5 backdrop-blur-sm border border-hero-foreground/10 hover:border-accent/30 transition-all"
              >
                <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-gradient-to-b from-secondary to-accent" />

                <div className="flex flex-wrap gap-3 mb-3 pl-4">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
                    <Calendar className="w-3 h-3" /> {e.period}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-hero-muted/60">
                    <MapPin className="w-3 h-3" /> {e.location}
                  </span>
                </div>
                <h4 className="font-display text-lg font-bold text-hero-foreground pl-4">{e.title}</h4>
                <p className="text-sm text-hero-muted/80 mb-4 pl-4 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> {e.org}
                </p>
                <ul className="space-y-2 pl-4">
                  {e.points.map((p, j) => (
                    <li key={j} className="text-sm text-hero-muted/70 flex gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* CGPA highlight card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-6 p-5 rounded-xl bg-gradient-to-br from-accent/10 to-secondary/10 border border-accent/20 text-center"
            >
              <p className="font-display text-4xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                8.02
              </p>
              <p className="text-xs text-hero-muted/60 uppercase tracking-widest mt-1">CGPA</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
