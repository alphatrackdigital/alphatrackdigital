import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

const ContactUs = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, submit form data here
    navigate("/contact-us/thank-you");
  };

  return (
    <>
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-secondary/5 blur-[120px]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Contact Us</span>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold md:text-5xl">
              Let's Start a <span className="text-gradient">Conversation</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Have a question, or ready to get started? Reach out — we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto grid gap-12 px-4 md:grid-cols-2 lg:px-8">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold">Get In Touch</h2>
              <p className="mt-2 text-muted-foreground">We're here to help and answer any questions you might have.</p>
            </div>

            <div className="space-y-6">
              <div className="glass-card flex items-start gap-4 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Our Offices</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Accra, Ghana</p>
                  <p className="text-sm text-muted-foreground">Lagos, Nigeria</p>
                </div>
              </div>

              <div className="glass-card flex items-start gap-4 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a href="mailto:info@alphatrack.digital" className="mt-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                    info@alphatrack.digital
                  </a>
                </div>
              </div>

              <div className="glass-card flex items-start gap-4 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a href="tel:+233530985334" className="mt-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                    +233 530 985 334
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-8 md:p-10">
            <h2 className="text-xl font-bold">Send Us a Message</h2>
            <p className="mt-1 text-sm text-muted-foreground">Fill out the form and we'll get back to you soon.</p>
            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">First Name</label>
                  <Input placeholder="John" className="border-white/10 bg-white/5" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Last Name</label>
                  <Input placeholder="Doe" className="border-white/10 bg-white/5" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Email</label>
                <Input type="email" placeholder="john@example.com" className="border-white/10 bg-white/5" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Company</label>
                <Input placeholder="Your company" className="border-white/10 bg-white/5" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Message</label>
                <Textarea placeholder="Tell us about your project..." rows={4} className="border-white/10 bg-white/5" />
              </div>
              <Button type="submit" className="w-full gap-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                Send Message <ArrowUpRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
