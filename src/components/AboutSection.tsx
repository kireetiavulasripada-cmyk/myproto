import { MapPin, GraduationCap, Briefcase, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import profileImg from "@/assets/profile.jpg";

const highlights = [
  { icon: Briefcase, label: "1 Year Experience", sub: "Programmer Analyst at Ramco Systems" },
  { icon: GraduationCap, label: "B.Tech CSE (Data Science)", sub: "VIT Vellore • 8.02 CGPA" },
  { icon: MapPin, label: "Tirupati, India", sub: "Open to remote & relocation" },
];

const checkpoints = [
  "Enterprise-grade analytics & finance solutions",
  "Interactive dashboards with Power BI & Excel",
  "RESTful API development & system integration",
  "Data-driven decision making & business insights",
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px]" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-widest mb-4"
          >
            About Me
          </motion.span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Crafting Data Into{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Meaningful Solutions
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Decorative frame */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/20 via-transparent to-secondary/20 blur-sm" />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-border/50">
                <img src={profileImg} alt="Kireeti Avula" className="w-full h-full object-cover" />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
              </div>

              {/* Floating stats card */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-card border border-border/60 backdrop-blur-md rounded-xl p-4 shadow-lg"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                    <BarChartIcon />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Data Analyst</p>
                    <p className="text-xs text-muted-foreground">VIT Vellore Alumni</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-5 text-lg">
              I'm a dedicated Data Analyst with 1 year of professional experience and a strong
              foundation in Computer Science and Data Science from VIT Vellore.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              My passion lies in leveraging data to solve real-world problems and drive business
              insights. From building interactive Power BI dashboards to developing RESTful APIs
              for enterprise platforms, I bring a blend of analytical thinking and technical execution.
            </p>

            {/* Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {checkpoints.map((cp, i) => (
                <motion.div
                  key={cp}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground">{cp}</span>
                </motion.div>
              ))}
            </div>

            {/* Info cards */}
            <div className="grid gap-3">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-secondary/30 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-secondary/10 flex items-center justify-center shrink-0 group-hover:from-accent/20 group-hover:to-secondary/20 transition-all">
                    <h.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{h.label}</p>
                    <p className="text-xs text-muted-foreground">{h.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BarChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
