// Set VITE_BREVO_API_KEY in .env — get key from Brevo Dashboard > Settings > API Keys
import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SEO from "@/components/shared/SEO";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactUs = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": import.meta.env.VITE_BREVO_API_KEY,
        },
        body: JSON.stringify({
          email: data.email,
          attributes: {
            FIRSTNAME: data.firstName,
            LASTNAME: data.lastName,
            COMPANY: data.company || "",
            MESSAGE: data.message,
            SOURCE: "Contact Form",
          },
          listIds: [2],
          updateEnabled: true,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      navigate("/contact-us/thank-you");
    } catch {
      toast.error("Something went wrong. Please try again or email info@alphatrack.digital");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Contact Us | AlphaTrack Digital" description="Have a question or ready to get started? Reach out to AlphaTrack Digital. Offices in Accra and Lagos." />
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
            <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">First Name</label>
                  <Input placeholder="John" className="border-white/10 bg-white/5" {...register("firstName")} />
                  {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Last Name</label>
                  <Input placeholder="Doe" className="border-white/10 bg-white/5" {...register("lastName")} />
                  {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Email</label>
                <Input type="email" placeholder="john@example.com" className="border-white/10 bg-white/5" {...register("email")} />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Company</label>
                <Input placeholder="Your company" className="border-white/10 bg-white/5" {...register("company")} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Message</label>
                <Textarea placeholder="Tell us about your project..." rows={4} className="border-white/10 bg-white/5" {...register("message")} />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full gap-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  "Send Message →"
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
