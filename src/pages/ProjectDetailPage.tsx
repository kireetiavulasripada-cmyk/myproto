import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Download, FileText, Database, BarChart3, Brain } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";


import logisticsSlide2 from "@/assets/projects/logistics-slide-2.jpg";
import logisticsSlide7 from "@/assets/projects/logistics-slide-7.jpg";
import logisticsSlide30 from "@/assets/projects/logistics-slide-30.jpg";
import logisticsSlide34 from "@/assets/projects/logistics-slide-34.jpg";

import ikeaOverview from "@/assets/dashboards/overview.png";
import ikeaSegmentation from "@/assets/dashboards/ikea-customer-segmentation.png";
import ikeaLoyalty from "@/assets/dashboards/ikea-loyalty.png";
import ikeaStoreInsights from "@/assets/dashboards/ikea-store-insights.png";

interface ProjectData {
  title: string;
  date: string;
  description: string;
  longDescription: string;
  tags: string[];
  icon: React.ElementType;
  accent: string;
  github: string;
  tools: string[];
  highlights: string[];
  images: { src: string; title: string; desc: string }[];
  downloads?: { label: string; path: string }[];
  videoLink?: string;
}

const projectsData: Record<string, ProjectData> = {
  "logistics-optimization": {
    title: "Logistics Optimization for Delivery Routes",
    date: "Feb 2026",
    description: "Built SQL-based analytics system to improve e-commerce delivery efficiency.",
    longDescription:
      "Developed a comprehensive SQL analytics system for UPS logistics operations. The project involved creating a relational database with Orders, Routes, Warehouses, Delivery Agents, and Shipment Tracking tables. Performed data cleaning (duplicate removal, NULL handling, date validation), calculated delivery delays, identified bottleneck routes, and built KPIs including on-time delivery percentage (56%) and average traffic delays per route.",
    tags: ["SQL", "Data Analysis", "ETL", "Database Design"],
    icon: Database,
    accent: "from-accent to-accent/60",
    github: "https://github.com/kireeti30/logistics-operations-sql-analysis.git",
    tools: ["MySQL", "SQL Server", "Data Cleaning", "KPI Analysis"],
    highlights: [
      "Designed 5-table relational schema with foreign key constraints",
      "Cleaned & validated 100+ order records with NULL handling",
      "Calculated delivery delays & identified top delayed routes",
      "Built KPIs: 56% on-time delivery rate across all routes",
      "Ranked warehouses and agents by performance metrics",
      "Analyzed shipment checkpoint delays and bottleneck patterns",
    ],
    images: [
      { src: logisticsSlide2, title: "Data Cleaning & Preparation", desc: "Duplicate checks, NULL handling, date format validation" },
      { src: logisticsSlide7, title: "Delay Analysis", desc: "Calculated delivery delays and ranked routes by performance" },
      { src: logisticsSlide30, title: "KPI Dashboard", desc: "Average traffic delay, on-time delivery percentage metrics" },
      { src: logisticsSlide34, title: "Conclusion", desc: "Data-driven optimization insights for smarter deliveries" },
    ],
    downloads: [
      { label: "SQL Queries", path: "/projects/Sql_Project.sql" },
      { label: "Presentation (PPTX)", path: "/projects/UPS_Logistics_SQL_Project_KIREETI.pptx" },
    ],
  },
  "retail-customer-retention": {
    title: "Retail Customer Retention Analytics",
    date: "Jan 2026",
    description: "Developed Power BI dashboard analyzing churn, loyalty, and customer behavior.",
    longDescription:
      "Created an interactive Power BI dashboard for IKEA's customer retention strategy. Analyzed customer segmentation, loyalty program effectiveness, store-level performance, and churn trends. Used Power Query for data transformation and DAX for complex measures including repeat purchase rates, customer lifetime value segments, and regional comparisons.",
    tags: ["Power BI", "DAX", "Analytics", "Power Query"],
    icon: BarChart3,
    accent: "from-secondary to-secondary/60",
    github: "https://github.com/kireeti30/IKEA-Customer-Retention-PowerBI.git",
    tools: ["Power BI", "DAX", "Power Query", "Data Modeling"],
    highlights: [
      "Built 4 interactive dashboard pages with drill-through navigation",
      "Analyzed customer segmentation by behavior and demographics",
      "Measured loyalty program impact on engagement and retention",
      "Created store-level performance insights with regional comparisons",
      "Implemented DAX measures for churn rate and CLV calculations",
      "Designed intuitive visualizations for executive decision-making",
    ],
    images: [
      { src: ikeaOverview, title: "Retention Overview", desc: "Customer retention trends, churn analysis, and repeat purchase patterns" },
      { src: ikeaSegmentation, title: "Customer Segmentation", desc: "Behavioral and demographic customer groupings" },
      { src: ikeaLoyalty, title: "Loyalty Program Analysis", desc: "Rewards utilization, member engagement metrics" },
      { src: ikeaStoreInsights, title: "Store Insights", desc: "Store-level sales trends and regional comparisons" },
    ],
    downloads: [
      { label: "Power BI File (.pbix)", path: "/projects/Power_BI_project_kireeti_1.pbix" },
    ],
  
  },
  "rag-genai-assistant": {
    title: "RAG-based GenAI Knowledge Assistant",
    date: "Research Project",
    description: "Built end-to-end RAG system using Python, OpenAI APIs, LangChain, and Pinecone.",
    longDescription:
      "Developed an end-to-end Retrieval-Augmented Generation (RAG) system as a research project. The system uses document ingestion pipelines to process and embed documents into Pinecone vector database. At query time, it retrieves relevant context and generates accurate responses using OpenAI's LLM via LangChain orchestration. The architecture ensures factual, grounded responses by combining retrieval with generation.",
    tags: ["Python", "LangChain", "GenAI", "Pinecone", "OpenAI"],
    icon: Brain,
    accent: "from-accent/80 to-accent",
    github: "https://github.com/kireeti30",
    tools: ["Python", "LangChain", "OpenAI API", "Pinecone", "Vector Embeddings"],
    highlights: [
      "Built document ingestion pipeline with chunking and embedding",
      "Integrated Pinecone vector database for semantic search",
      "Orchestrated retrieval and generation with LangChain",
      "Achieved factual, context-grounded LLM responses",
      "Implemented real-time query processing with streaming output",
    ],
    images: [],
  },
};

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectsData[slug] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project not found</h1>
          <Link to="/#projects" className="text-secondary hover:underline">Back to projects</Link>
        </div>
      </div>
    );
  }

  const Icon = project.icon;

  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-hero via-hero/95 to-hero-accent/30" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--secondary)/0.3) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="container mx-auto relative z-10 px-4">
          <a href="/#projects" className="inline-flex items-center gap-2 text-hero-foreground/70 hover:text-secondary transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Projects</span>
          </a>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-5 mb-6">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.accent} flex items-center justify-center shadow-lg flex-shrink-0`}>
              <Icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-hero-foreground leading-tight">{project.title}</h1>
              <span className="text-secondary font-medium text-sm mt-2 inline-block">{project.date}</span>
            </div>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-hero-foreground/70 text-lg max-w-3xl leading-relaxed">
            {project.longDescription}
          </motion.p>

          {/* Action buttons */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-3 mt-8">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card/10 border border-hero-foreground/20 text-hero-foreground hover:border-secondary hover:text-secondary transition-all text-sm font-medium">
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
            {project.videoLink && (
              <a href={project.videoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all text-sm font-medium">
                <ExternalLink className="w-4 h-4" />
                Watch Video
              </a>
            )}
            {project.downloads?.map((d) => (
              <a key={d.label} href={d.path} download className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card/10 border border-hero-foreground/20 text-hero-foreground hover:border-accent hover:text-accent transition-all text-sm font-medium">
                <Download className="w-4 h-4" />
                {d.label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tags & Tools */}
      <section className="py-12 bg-section-alt border-b border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            <div>
              <h3 className="font-display font-bold text-foreground mb-3 text-sm uppercase tracking-wider">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-accent/10 text-accent font-medium">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground mb-3 text-sm uppercase tracking-wider">Tools Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-secondary/10 text-secondary font-medium">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">Key Highlights</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50"
              >
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{h}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.images.length > 0 && (
        <section className="py-16 bg-section-alt">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl font-bold text-foreground mb-10">Project Showcase</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
              {project.images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-secondary/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden border-b border-border/30">
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-foreground text-sm mb-1">{img.title}</h3>
                    <p className="text-xs text-muted-foreground">{img.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
    </PageTransition>
  );
}
