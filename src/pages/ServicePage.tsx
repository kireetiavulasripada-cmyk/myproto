import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ImagePlus } from "lucide-react";
import { BarChart3, LayoutDashboard, Database, Globe, Cloud } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import ikeaOverview from "@/assets/dashboards/ikea-overview.png";
import ikeaSegmentation from "@/assets/dashboards/ikea-customer-segmentation.png";
import ikeaLoyalty from "@/assets/dashboards/ikea-loyalty.png";
import ikeaStoreInsights from "@/assets/dashboards/ikea-store-insights.png";

const servicesData: Record<string, { icon: React.ElementType; title: string; description: string; color: string; placeholders: { title: string; desc: string; image?: string }[] }> = {
  "data-analysis": {
    icon: BarChart3,
    title: "Data Analysis & Insights",
    description: "In-depth data exploration and statistical analysis to uncover actionable business insights. I leverage Python, SQL, and advanced analytics to transform raw data into strategic recommendations.",
    color: "from-accent to-accent/70",
    placeholders: [
      { title: "Sales Performance Analysis", desc: "Upload your sales analytics dashboard screenshot here" },
      { title: "Customer Segmentation Report", desc: "Upload your segmentation analysis here" },
      { title: "KPI Tracking Dashboard", desc: "Upload your KPI tracking visuals here" },
    ],
  },
  "dashboard-design": {
    icon: LayoutDashboard,
    title: "Dashboard Design",
    description: "Interactive Power BI and Excel dashboards with compelling visualizations and KPI tracking. I create intuitive, data-rich dashboards that empower decision-makers.",
    color: "from-secondary to-secondary/70",
    placeholders: [
      { title: "IKEA Retention Overview", desc: "Power BI dashboard analyzing customer retention, churn trends, and repeat purchase patterns at IKEA.", image: ikeaOverview },
      { title: "Customer Segmentation", desc: "Segmentation analysis showing customer groups by behavior, demographics, and purchasing patterns.", image: ikeaSegmentation },
      { title: "Loyalty Program Analysis", desc: "Loyalty program impact analysis measuring engagement, rewards utilization, and member retention.", image: ikeaLoyalty },
      { title: "Store Insights Dashboard", desc: "Store-level performance insights including sales trends, footfall analysis, and regional comparisons.", image: ikeaStoreInsights },
    ],
  },
  "data-cleaning": {
    icon: Database,
    title: "Data Cleaning & ETL",
    description: "Data transformation, cleaning, and pipeline solutions for reliable, scalable analytics. I build robust ETL workflows using Python, PySpark, and Databricks.",
    color: "from-accent to-secondary",
    placeholders: [
      { title: "ETL Pipeline Architecture", desc: "Upload your pipeline diagram here" },
      { title: "Data Quality Report", desc: "Upload your data quality analysis here" },
      { title: "Transformation Workflow", desc: "Upload your workflow screenshots here" },
    ],
  },
  "web-development": {
    icon: Globe,
    title: "Web Development",
    description: "Modern, responsive websites and frontend development with clean, performant code. I build polished web experiences using React, JavaScript, and modern tooling.",
    color: "from-secondary to-accent",
    placeholders: [
      { title: "Portfolio Website", desc: "Upload your web project screenshot here" },
      { title: "Dashboard Web App", desc: "Upload your web app screenshot here" },
      { title: "Landing Page Design", desc: "Upload your landing page screenshot here" },
    ],
  },
  "cloud-pipelines": {
    icon: Cloud,
    title: "Cloud & Pipelines",
    description: "AWS cloud solutions and data pipeline architecture for scalable data processing. I design and deploy cloud-native data infrastructure.",
    color: "from-accent/80 to-accent",
    placeholders: [
      { title: "AWS Architecture Diagram", desc: "Upload your cloud architecture here" },
      { title: "Pipeline Monitoring Dashboard", desc: "Upload your monitoring screenshots here" },
      { title: "Infrastructure Overview", desc: "Upload your infra overview here" },
    ],
  },
};

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? servicesData[slug] : null;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Service not found</h1>
          <Link to="/" className="text-secondary hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-hero via-hero/95 to-hero-accent/30" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--secondary)/0.3) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="container mx-auto relative z-10 px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-hero-foreground/70 hover:text-secondary transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-5 mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
              <Icon className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-hero-foreground">{service.title}</h1>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-hero-foreground/70 text-lg max-w-2xl leading-relaxed">
            {service.description}
          </motion.p>
        </div>
      </section>

      {/* Gallery / Placeholders */}
      <section className="section-padding bg-section-alt">
        <div className="container mx-auto px-4">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10">
            Showcase & Work Samples
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.placeholders.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-secondary/30 hover:shadow-xl transition-all duration-300"
              >
                {/* Image area */}
                {item.image ? (
                  <div className="aspect-video overflow-hidden border-b border-border/30">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted flex flex-col items-center justify-center gap-3 border-b border-border/30">
                    <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ImagePlus className="w-7 h-7 text-secondary/60" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">Upload image here</span>
                  </div>
                )}

                <div className="p-5">
                  <h3 className="font-display font-bold text-foreground mb-1.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
