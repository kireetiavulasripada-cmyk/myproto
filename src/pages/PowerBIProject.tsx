import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Github, BarChart3, Users, TrendingUp, ShoppingCart, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";

const navLinks = [
  { label: "Home", href: "/hero" },
  { label: "About", href: "/about" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

const stats = [
  { value: 4, label: "Dashboard Pages", icon: BarChart3 },
  { value: 12, label: "KPI Metrics", icon: TrendingUp },
  { value: 5, label: "Customer Segments", icon: Users },
  { value: 1000, label: "Records Analyzed", suffix: "+", icon: ShoppingCart },
];

const insights = [
  {
    title: "Customer Segmentation",
    desc: "Identified 5 distinct customer segments based on purchasing behavior, demographics, and engagement patterns to enable targeted retention strategies.",
  },
  {
    title: "Loyalty Program Impact",
    desc: "Measured loyalty program effectiveness showing 23% higher repeat purchase rates among enrolled members vs non-members.",
  },
  {
    title: "Churn Prediction",
    desc: "Built churn analysis identifying at-risk customers using recency, frequency, and monetary value indicators with DAX measures.",
  },
  {
    title: "Store-Level Performance",
    desc: "Compared regional store performance highlighting top-performing locations and underperforming areas needing intervention.",
  },
  {
    title: "Customer Lifetime Value",
    desc: "Calculated CLV segments enabling prioritized marketing spend allocation across high-value and growth-potential customers.",
  },
  {
    title: "Retention Trends",
    desc: "Tracked month-over-month retention rates revealing seasonal patterns and the impact of promotional campaigns on customer return rates.",
  },
];

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-white">
      {count}{suffix}
    </div>
  );
};

const PowerBIProject = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.slice(1));
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <PageTransition>
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
          <Link to="/#projects" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a73e8] transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <h1 className="text-base sm:text-xl font-bold text-[#1a73e8] tracking-wide truncate mx-2">IKEA Retention</h1>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  activeSection === link.href.slice(1)
                    ? "text-[#1a73e8] font-semibold"
                    : "text-gray-500 hover:text-[#1a73e8]"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#dashboard")}
              className="ml-2 px-4 py-1.5 text-sm rounded-full bg-[#f4831f] text-white font-semibold hover:bg-[#e0741a] transition-colors"
            >
              View Dashboard
            </button>
          </nav>
          <button className="md:hidden text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <ChevronDown size={20} className={`transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left text-sm text-gray-600 hover:text-[#1a73e8] py-1.5"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="hero"
        className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center text-center pt-16"
        style={{
          background: "linear-gradient(135deg, #1a73e8 0%, #1557b0 40%, #0d47a1 70%, #f4831f 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4 sm:space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-4">
            <BarChart3 size={16} />
            Power BI Analytics Project
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
            IKEA Customer Retention Analytics
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Interactive Power BI dashboard analyzing customer churn, loyalty program effectiveness, and store-level performance insights
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => scrollTo("#dashboard")}
              className="px-8 py-3 rounded-full bg-[#f4831f] text-white font-semibold hover:bg-[#e0741a] transition-colors text-lg shadow-lg shadow-orange-500/25"
            >
              Explore Dashboard
            </button>
            <a
              href="https://github.com/kireeti30/IKEA-Customer-Retention-PowerBI.git"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold hover:bg-white/25 transition-colors text-lg"
            >
              <span className="flex items-center gap-2">
                <Github size={18} />
                GitHub
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#1a73e8]/10 text-[#1a73e8] text-xs font-semibold uppercase tracking-wider mb-4">
                About the Project
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Data-Driven Customer Retention Strategy
              </h2>
              <p className="text-gray-500 text-lg">
                Built using Power BI with Power Query for data transformation and DAX for advanced analytics
              </p>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                This project presents an interactive Power BI dashboard designed for IKEA's customer retention strategy.
                It analyzes customer segmentation, loyalty program effectiveness, store-level performance, and churn trends
                to provide actionable insights for business decision-making.
              </p>
              <p>
                The dashboard features 4 interactive pages with drill-through navigation, DAX measures for churn rate
                and customer lifetime value calculations, and intuitive visualizations designed for executive-level reporting.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Power BI", "DAX", "Power Query", "Data Modeling", "Customer Analytics"].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-[#1a73e8]/8 text-[#1a73e8] font-medium border border-[#1a73e8]/15">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-[#1a73e8] to-[#0d47a1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="space-y-2">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                    <Icon size={22} className="text-white" />
                  </div>
                </div>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-white/80 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Dashboard */}
      <section id="dashboard" className="py-20 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-[#f4831f]/10 text-[#f4831f] text-xs font-semibold uppercase tracking-wider mb-4">
              Interactive Dashboard
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Power BI Dashboard</h2>
            <p className="text-gray-500 mt-2 max-w-lg mx-auto">
              Explore customer retention metrics, segmentation analysis, and store performance insights
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-1">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  title="Power BI project kireeti"
                  src="https://app.powerbi.com/view?r=eyJrIjoiMmQzNDgzZmMtNWVjOS00ZTdjLWJjM2UtNmE0OTQ2YzU0MjU2IiwidCI6Ijg1ZDBjMTEyLTJjYzAtNDU1ZS04YjMxLTM1NDE1OWQzMDNkNiJ9"
                  className="absolute inset-0 w-full h-full border-0 rounded-xl"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section id="insights" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#1a73e8]/10 text-[#1a73e8] text-xs font-semibold uppercase tracking-wider mb-4">
              Analysis Results
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Key Insights</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#f8f9fa] border border-gray-100 hover:border-[#1a73e8]/30 hover:shadow-lg hover:shadow-[#1a73e8]/5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a73e8] to-[#f4831f] flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-sm">{i + 1}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#1a73e8] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#f4831f] to-[#e06510] text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          <h3 className="text-2xl font-bold text-white">Want to Learn More?</h3>
          <p className="text-white/85">
            Check out the full project on GitHub including the Power BI (.pbix) file, data sources, and documentation.
          </p>
          <a
            href="https://github.com/kireeti30/IKEA-Customer-Retention-PowerBI.git"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-[#f4831f] font-semibold hover:bg-gray-50 transition-colors shadow-lg"
          >
            <Github size={18} />
            View on GitHub
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-[#f8f9fa]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-[#1a73e8]/10 text-[#1a73e8] text-xs font-semibold uppercase tracking-wider mb-4">
            Get in Touch
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact</h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Interested in this project or want to collaborate? Feel free to reach out.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:avulakireeti30@gmail.com"
              className="px-6 py-3 rounded-full bg-[#1a73e8] text-white font-semibold hover:bg-[#1557b0] transition-colors"
            >
              Send Email
            </a>
            <a
              href="https://www.linkedin.com/in/kireeti-avula/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold hover:border-[#1a73e8] hover:text-[#1a73e8] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white/70 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-3">
          <p className="text-white font-semibold text-lg">IKEA Customer Retention Analytics</p>
          <p className="text-sm">Built by Kireeti Avula • Power BI Dashboard Project</p>
          <p className="text-xs text-white/50">© 2026 All rights reserved.</p>
        </div>
      </footer>
    </div>
    </PageTransition>
  );
};

export default PowerBIProject;
