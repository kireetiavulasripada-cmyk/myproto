import { motion } from "framer-motion";
import { Folder, ArrowUpRight, Github, ExternalLink, FileText } from "lucide-react";
import { Link } from "react-router-dom";

import logisticsCover from "@/assets/projects/logistics-cover.jpg";
import ikeaOverview from "@/assets/dashboards/ikea-overview.png";

const projects = [

  {
    title: "Logistics Optimization for Delivery Routes",
    date: "Feb 2026",
    desc: "Built SQL-based analytics system to improve e-commerce delivery efficiency, performed data cleaning, and analyzed delays and route optimization.",
    tags: ["SQL", "Data Analysis", "ETL"],
    accent: "from-accent to-accent/60",
    github: "https://github.com/kireeti30/logistics-operations-sql-analysis.git",
    slug: "logistics-optimization",
    image: logisticsCover,
  },
  {
  title: "India Agriculture Crop Production Analysis",
  date: "Feb 2026",
  desc: "Analyzed India's agricultural crop production (1997–2021) using Tableau dashboards with interactive filters, state-wise comparisons, and crop trend visualizations.",
  tags: ["Tableau", "Data Visualization", "Analytics"],
  accent: "from-blue-500 to-cyan-500",
  github: "https://github.com/kireeti30",
  slug: "agriculture-project",
  image: "/images/agriculture-tableau.png",
},
  {
    title: "Retail Customer Retention Analytics",
    date: "Jan 2026",
    desc: "Developed Power BI dashboard analyzing churn, loyalty, and customer behavior using Power Query and DAX.",
    tags: ["Power BI", "DAX", "Analytics"],
    accent: "from-secondary to-secondary/60",
    github: "https://github.com/kireeti30/IKEA-Customer-Retention-PowerBI.git",
    slug: "retail-customer-retention",
    image: ikeaOverview,
  },
  {
    title: "Social Media Analytics for Strategic Branding",
    date: "Dec 2025",
    desc: "Built Excel analytics solution linking ad spend with follower growth and campaign success.",
    tags: ["Excel", "Data Analysis", "Marketing"],
    accent: "from-accent to-secondary",
    github: "https://github.com/kireeti30/MyntraProject-Excel.git",
    slug: "social-media-analytics",
  },
  {
    title: "RAG-based GenAI Knowledge Assistant",
    date: "Research Paper",
    desc: "Built end-to-end RAG system using Python, OpenAI APIs, LangChain, and Pinecone with document ingestion pipelines and real-time LLM responses.",
    tags: ["Python", "LangChain", "GenAI", "Pinecone"],
    accent: "from-accent/80 to-accent",
    github: "https://github.com/kireeti30",
    slug: "rag-genai-assistant",
    badge: "Research Paper",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-secondary/3 rounded-full blur-[100px]" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-widest mb-4">
            Portfolio
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Featured{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Real-world projects showcasing data analytics, enterprise solutions, and AI applications.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative flex flex-col rounded-2xl bg-card border border-border/50 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 overflow-hidden"
            >
              {/* Image thumbnail */}
              {p.image ? (
                <div className="aspect-video overflow-hidden border-b border-border/30">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className={`h-1.5 w-full bg-gradient-to-r ${p.accent}`} />
              )}

              {/* Badge */}
              {p.badge && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/90 text-accent-foreground text-xs font-semibold">
                    <FileText className="w-3 h-3" />
                    {p.badge}
                  </span>
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Folder className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-xs font-medium text-secondary">{p.date}</span>
                </div>

                <h3 className="font-display font-bold text-foreground mb-2 leading-snug group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{p.desc}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium group-hover:bg-accent/10 group-hover:text-accent transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 pt-3 border-t border-border/30">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <Link
                    to={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-secondary transition-colors ml-auto"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Project
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
