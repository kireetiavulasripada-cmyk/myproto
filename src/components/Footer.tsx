import { Linkedin, Github, Mail } from "lucide-react";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/kireeti-avula-690480245/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/kireeti30", label: "GitHub" },
  { icon: Mail, href: "mailto:avulakireeti2001@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-primary py-10 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-secondary/5" />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-xl font-bold text-primary-foreground">
              Kireeti<span className="text-secondary">.</span>
            </p>
            <p className="text-xs text-primary-foreground/40 mt-1">
              Data Analyst & Engineer
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center hover:bg-secondary/20 hover:border-secondary/30 transition-all group"
              >
                <s.icon className="w-4 h-4 text-primary-foreground/60 group-hover:text-secondary transition-colors" />
              </a>
            ))}
          </div>

          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Kireeti Avula. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
