import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Github, MapPin, Mail, Phone, Users, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import agricultureHero from "@/assets/agriculture-hero.jpg";

const navLinks = [
  { label: "Home", href: "/hero" },
  { label: "About", href: "/about" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Story", href: "/story" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

const stats = [
  { value: 36, label: "States" },
  { value: 56, label: "Crops" },
  { value: 6, label: "Seasons" },
  { value: 300, label: "Production in billion", suffix: "+" },
];

const crops = [
  { name: "Coconut", img: "https://images.pexels.com/photos/5945745/pexels-photo-5945745.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Wheat", img: "https://images.pexels.com/photos/1600139/pexels-photo-1600139.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Peas", img: "https://images.pexels.com/photos/768093/pexels-photo-768093.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Sugarcane", img: "https://images.pexels.com/photos/9622885/pexels-photo-9622885.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Rice", img: "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Sunflower", img: "https://images.pexels.com/photos/1338724/pexels-photo-1338724.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

const team = [
  { name: "Avula Kireeti", email: "avula.kireeti2020@vitstudent.ac.in", role: "Team Member" },
  { name: "Pothuluru Navya Reddy", email: "navyareddy.p2020@vitstudent.ac.in", role: "Team Member" },
  { name: "Prasanth kodakanti ", email: "navyareddy.p2020@vitstudent.ac.in", role: "Team Member" },
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
          let start = 0;
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

  return <div ref={ref} className="text-4xl md:text-5xl font-bold text-primary">{count}{suffix}</div>;
};

const AgricultureProject = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(l => l.href.slice(1));
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
    <div className="min-h-screen bg-[#1a5632] text-foreground">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a5632]/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="/#projects" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
            <ArrowLeft size={16} />
          </a>
          <h1 className="text-xl font-bold text-white tracking-wide">sasyam</h1>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  activeSection === link.href.slice(1)
                    ? "text-white font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#about")}
              className="ml-2 px-4 py-1.5 text-sm rounded-full bg-[#5fcf80] text-[#1a5632] font-semibold hover:bg-[#4dbf6e] transition-colors"
            >
              Get Started
            </button>
          </nav>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <ChevronDown size={20} className={`transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1a5632] border-t border-white/10 px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left text-sm text-white/80 hover:text-white py-1.5"
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
        className="relative min-h-screen flex items-center justify-center text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${agricultureHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            India Agriculture Crop Production Analysis (1997 - 2021)
          </h1>
          <p className="text-lg md:text-xl text-white/80">
            Second largest crop production country in world wide
          </p>
          <button
            onClick={() => scrollTo("#about")}
            className="inline-block px-8 py-3 rounded-full bg-[#5fcf80] text-[#1a5632] font-semibold hover:bg-[#4dbf6e] transition-colors text-lg"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-[#1a5632] mb-4">
                Agriculture is the fundamental source of national prosperity
              </h2>
              <p className="text-[#555] text-lg">
                Dataset that we used for analysis is taken from the kaggle sources
              </p>
            </div>
            <div className="space-y-4 text-[#444]">
              <p>
                The Agriculture business domain, as a vital part of the overall supply chain, is expected
                to highly evolve in the upcoming years via the developments, which are taking place on
                the side of the Future Internet. This page presents a novel Business-to-Business
                collaboration platform from the agri-food sector perspective, which aims to facilitate the
                collaboration of numerous stakeholders belonging to associated business domains, in an
                effective and flexible manner.
              </p>
              <p className="italic text-[#555]">
                This dataset provides a huge amount of information on crop production in India ranging
                from several years. Based on the Information the ultimate goal would be to predict crop
                production and find important insights highlighting key indicators and metrics that
                influence the crop production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#1a5632]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-white/80 mt-2 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#5fcf80] text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          <h3 className="text-2xl font-bold text-[#1a5632]">Call To Action</h3>
          <p className="text-[#1a5632]/80">
            Join us in cultivating a greener future! Explore our agricultural resources, connect with experts,
            and unlock the secrets to successful farming. Start sowing the seeds of knowledge today!
          </p>
          <button className="px-8 py-3 rounded-full bg-[#1a5632] text-white font-semibold hover:bg-[#155228] transition-colors">
            Call To Action
          </button>
        </div>
      </section>

      {/* Dashboard */}
      <section id="dashboard" className="py-20 bg-[#f6f9fe]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#1a5632] mb-8">Dashboard</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden p-4">
            <div className="relative w-full" style={{ paddingBottom: "95%" }}>
              <iframe
                src="https://public.tableau.com/views/indianagriculturecropproduction_dashboard/Dashboard1?:embed=y&:display_count=yes&:showVizHome=no"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                title="India Agriculture Dashboard"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#1a5632] mb-8">Story</h2>
          <div className="bg-[#f6f9fe] rounded-xl shadow-lg overflow-hidden p-4">
            <div className="relative w-full" style={{ paddingBottom: "97%" }}>
              <iframe
                src="https://public.tableau.com/views/indianagriculturecropproduction_story/Story1?:embed=y&:display_count=yes&:showVizHome=no"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                title="India Agriculture Story"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Crop Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#1a5632] mb-8 text-center">Crops</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {crops.map((crop) => (
              <div key={crop.name} className="group relative overflow-hidden rounded-xl shadow-md">
                <img
                  src={crop.img}
                  alt={crop.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                  <h4 className="text-white text-lg font-semibold">{crop.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 bg-[#f6f9fe]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-[#1a5632] mb-4">Team</h2>
              <p className="text-[#555]">Data Analytics students</p>
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
              {team.map((member) => (
                <div key={member.name} className="bg-white rounded-xl shadow-md overflow-hidden text-center p-6 space-y-3">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#1a5632] flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <h4 className="font-semibold text-[#1a5632] text-lg">{member.name}</h4>
                  <p className="text-sm text-[#777]">{member.role}</p>
                  <p className="text-xs text-[#999] break-all">{member.email}</p>
                  <div className="flex justify-center gap-3 pt-2">
                    {["twitter", "facebook", "instagram", "linkedin"].map((s) => (
                      <span key={s} className="w-8 h-8 rounded-full bg-[#1a5632]/10 flex items-center justify-center text-[#1a5632] text-xs hover:bg-[#5fcf80] hover:text-white transition-colors cursor-pointer">
                        {s.charAt(0).toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-[#1a5632] mb-4">Contact</h2>
              <p className="text-[#555]">For more information always feel free to reach us.</p>
            </div>
            <div className="md:col-span-2 space-y-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d79.1534!3d12.9692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad47a0!2sVIT+Vellore!5e0!3m2!1sen!2sin"
                className="w-full h-64 rounded-xl border-0"
                allowFullScreen
                loading="lazy"
                title="VIT Vellore Map"
              />
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-4 bg-[#f6f9fe] rounded-xl">
                  <MapPin size={18} className="text-[#1a5632] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm text-[#1a5632]">Location</h4>
                    <p className="text-xs text-[#555]">VIT Vellore, TN 632001, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-[#f6f9fe] rounded-xl">
                  <Mail size={18} className="text-[#1a5632] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm text-[#1a5632]">Email</h4>
                    <p className="text-xs text-[#555] break-all">kireeti.avula2020@vitstudent.ac.in</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-[#f6f9fe] rounded-xl">
                  <Phone size={18} className="text-[#1a5632] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm text-[#1a5632]">Call</h4>
                    <p className="text-xs text-[#555]">+91 9949540447</p>
                  </div>
                </div>
              </div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-[#ddd] text-sm text-[#333] focus:outline-none focus:border-[#5fcf80]" />
                  <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg border border-[#ddd] text-sm text-[#333] focus:outline-none focus:border-[#5fcf80]" />
                </div>
                <input type="text" placeholder="Subject" className="w-full px-4 py-3 rounded-lg border border-[#ddd] text-sm text-[#333] focus:outline-none focus:border-[#5fcf80]" />
                <textarea placeholder="Message" rows={5} className="w-full px-4 py-3 rounded-lg border border-[#ddd] text-sm text-[#333] focus:outline-none focus:border-[#5fcf80] resize-none" />
                <div className="text-center">
                  <button type="submit" className="px-8 py-3 rounded-full bg-[#5fcf80] text-[#1a5632] font-semibold hover:bg-[#4dbf6e] transition-colors">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] text-white/70 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Sasyam:</h3>
              <p className="text-sm leading-relaxed">
                VIT Vellore<br />
                Tamil Nadu, 632001<br />
                India<br /><br />
                <strong className="text-white">Phone:</strong> +91 9949540447<br />
                <strong className="text-white">Email:</strong> kireeti.avula2020@vitstudent.ac.in
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Useful Links</h4>
              <ul className="space-y-2 text-sm">
                {["Home", "About us", "Dashboard", "Team"].map((l) => (
                  <li key={l} className="hover:text-[#5fcf80] cursor-pointer transition-colors">→ {l}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                {["Kaggle Dataset", "Tableau Public", "GitHub Repo"].map((l) => (
                  <li key={l} className="hover:text-[#5fcf80] cursor-pointer transition-colors">→ {l}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Source Code</h4>
              <a
                href="https://github.com/kireeti30/India-Agriculture-crop-production-analysis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
              >
                <Github size={16} /> View on GitHub
              </a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-xs">
            © 2026 Kireeti Avula. All rights reserved. | Designed with ❤️ using Bethany Bootstrap Template
          </div>
        </div>
      </footer>
    </div>
    </PageTransition>
  );
};

export default AgricultureProject;