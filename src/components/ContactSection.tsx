import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Linkedin, Github, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: Mail, label: "avulakireeti2001@gmail.com", href: "mailto:avulakireeti2001@gmail.com" },
  { icon: Phone, label: "9949540447", href: "tel:9949540447" },
  { icon: Linkedin, label: "LinkedIn Profile", href: "https://www.linkedin.com/in/kireeti-avula-690480245/" },
  { icon: Github, label: "GitHub Profile", href: "https://github.com/kireeti30" },
  { icon: MapPin, label: "Tirupati, India", href: "#" },
];

export default function ContactSection() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      "service_sdqutx7",
      "template_rgpob95",
      {
        from_name: form.name,
        reply_to: form.email,
        message: form.message,
      },
      "GvMZu3XyLSerDe0iZ"
    )
    .then(() => {
      toast({
        title: "Message sent successfully 🚀",
        description: "I will reply to you soon.",
      });
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      toast({
        title: "Failed to send ❌",
        description: "Check EmailJS setup",
      });
      setLoading(false);
    });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="container mx-auto relative z-10">

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-hero-foreground">
            Got a Project?{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Let's Talk
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">

          {/* Left contact info */}
          <div className="space-y-3">
            {contactInfo.map((c) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                className="flex items-center gap-4 p-4 rounded-xl bg-hero-foreground/5 border border-hero-foreground/10 hover:border-secondary/30 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/15 to-secondary/15 flex items-center justify-center">
                  <c.icon className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-sm text-hero-muted flex-1">{c.label}</span>
                <ArrowRight className="w-4 h-4 text-secondary" />
              </motion.a>
            ))}
          </div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl bg-hero-foreground/5 border border-hero-foreground/10 backdrop-blur-sm space-y-4"
          >
            <h4 className="font-display text-lg font-bold text-hero-foreground mb-2">
              Send a Message
            </h4>

            <Input
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <Input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <Textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
            />

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="bg-gradient-to-r from-secondary to-accent text-primary-foreground w-full gap-2"
            >
              <Send className="w-4 h-4" />
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
