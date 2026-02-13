import { motion } from "framer-motion";
import {
  SiPython,
  SiMysql,
  SiApachespark,
  SiDatabricks,
  SiNumpy,
  SiPandas,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiAmazonwebservices,
  SiGit,
  SiGithub,
  SiTableau,
  SiSnowflake,
} from "react-icons/si";
import { BarChart3, Database, PieChart, FileSpreadsheet, LayoutDashboard } from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

type SkillIcon = IconType | LucideIcon;

interface Skill {
  name: string;
  icon: SkillIcon;
  color: string; // tailwind text color token
}

const skills: Skill[] = [
  { name: "Python", icon: SiPython, color: "text-[#3776AB]" },
  { name: "SQL", icon: SiMysql, color: "text-[#4479A1]" },
  { name: "PySpark", icon: SiApachespark, color: "text-[#E25A1C]" },
  { name: "Databricks", icon: SiDatabricks, color: "text-[#FF3621]" },
  { name: "Snowflake", icon: SiSnowflake, color: "text-[#00A1D9]" },
  { name: "NumPy", icon: SiNumpy, color: "text-[#013243]" },
  { name: "Pandas", icon: SiPandas, color: "text-[#150458]" },
  { name: "Power BI", icon: LayoutDashboard, color: "text-[#F2C811]" },
  { name: "Tableau", icon: SiTableau, color: "text-[#0079c1]" },
  { name: "Excel", icon: FileSpreadsheet, color: "text-[#217346]" },
  { name: "Dashboard Design", icon: PieChart, color: "text-secondary" },
  { name: "Data Analysis", icon: BarChart3, color: "text-accent" },
  { name: "ETL", icon: Database, color: "text-secondary" },
  { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
  { name: "HTML", icon: SiHtml5, color: "text-[#E34F26]" },
  { name: "CSS", icon: SiCss3, color: "text-[#1572B6]" },
  { name: "AWS", icon: SiAmazonwebservices, color: "text-[#FF9900]" },
  { name: "Git", icon: SiGit, color: "text-[#F05032]" },
  { name: "GitHub", icon: SiGithub, color: "text-foreground" },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[120px]" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-widest mb-4">
            Expertise
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Skills &{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            A well-rounded toolkit spanning data analytics, visualization, web development, and cloud infrastructure.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, type: "spring", stiffness: 200 }}
                whileHover={{ y: -6, scale: 1.05 }}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-card border border-border/50 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 cursor-default"
              >
                <Icon className={`w-5 h-5 ${skill.color} shrink-0`} />
                <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
