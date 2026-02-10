"use client";

import * as React from "react";
import { Section } from "@/components/Section";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Timeline } from "@/components/Timeline";
import { ProjectCard } from "@/components/ProjectCard";
import { Carousel } from "@/components/Carousel";
import { TestimonialCard } from "@/components/TestimonialCard";
import { StickyCTA } from "@/components/StickyCTA";
import { Input } from "@/components/form/Input";
import { Textarea } from "@/components/form/Textarea";
import { useToast } from "@/components/Toast";
import { scrollToHash } from "@/lib/scroll";
import { fetchJsonOptional } from "@/lib/api";

import { profile as localProfile, type Profile } from "@/data/profile";
import { experience as localExperience, type ExperienceItem } from "@/data/experience";
import { projects as localProjects, type Project } from "@/data/projects";
import { certifications as localCerts, type Certification } from "@/data/certifications";
import { testimonials as localTestimonials, type Testimonial } from "@/data/testimonials";

type ContactState = {
  name: string;
  email: string;
  message: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function HomePage() {
  const toast = useToast();

  const [profile, setProfile] = React.useState<Profile>(localProfile);
  const [experience, setExperience] =
    React.useState<ExperienceItem[]>(localExperience);
  const [projects, setProjects] = React.useState<Project[]>(localProjects);
  const [certifications, setCertifications] =
    React.useState<Certification[]>(localCerts);
  const [testimonials, setTestimonials] =
    React.useState<Testimonial[]>(localTestimonials);

  // Optional client-side dataset replacement
  React.useEffect(() => {
    const abort = new AbortController();

    (async () => {
      const p = await fetchJsonOptional<Profile>("/profile", {
        signal: abort.signal,
      });
      if (p) setProfile(p);

      const e = await fetchJsonOptional<ExperienceItem[]>("/experience", {
        signal: abort.signal,
      });
      if (e) setExperience(e);

      const pr = await fetchJsonOptional<Project[]>("/projects", {
        signal: abort.signal,
      });
      if (pr) setProjects(pr);

      const c = await fetchJsonOptional<Certification[]>("/certifications", {
        signal: abort.signal,
      });
      if (c) setCertifications(c);

      const t = await fetchJsonOptional<Testimonial[]>("/testimonials", {
        signal: abort.signal,
      });
      if (t) setTestimonials(t);
    })();

    return () => abort.abort();
  }, []);

  // Hero particles (subtle, optional)
  const [particleSeed] = React.useState(() => Math.random());

  const [contact, setContact] = React.useState<ContactState>({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<Partial<ContactState>>({});

  function validate(values: ContactState) {
    const next: Partial<ContactState> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim() || !isEmail(values.email))
      next.email = "Please enter a valid email address.";
    if (!values.message.trim() || values.message.trim().length < 10)
      next.message = "Please enter a message (10+ characters).";
    return next;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(contact);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "";
      if (!apiBase) {
        toast.push({
          tone: "info",
          title: "Message ready (no API configured)",
          description:
            "Set NEXT_PUBLIC_API_BASE to send messages to a backend. For now, this is a no-op.",
        });
        setContact({ name: "", email: "", message: "" });
        return;
      }

      // If a backend exists, this assumes POST /contact accepts JSON.
      const res = await fetch(`${apiBase.replace(/\/+$/, "")}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(contact),
      });

      if (!res.ok) {
        toast.push({
          tone: "error",
          title: "Could not send message",
          description: "Please try again later, or contact via email/LinkedIn.",
        });
        return;
      }

      toast.push({
        tone: "success",
        title: "Message sent",
        description: "Thanks for reaching out. I’ll reply soon.",
      });
      setContact({ name: "", email: "", message: "" });
    } catch {
      toast.push({
        tone: "error",
        title: "Network error",
        description: "Please try again later, or contact via email/LinkedIn.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <StickyCTA email={profile.email} />

      {/* HERO */}
      <section
        id="home"
        className="relative overflow-hidden border-b border-black/10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-amber-600/10" />
        <div className="absolute inset-0 opacity-70">
          {/* subtle "particles" using CSS gradients; respects reduced motion via global rules */}
          <div
            className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-900/10 blur-2xl"
            style={{ transform: `translateY(${particleSeed * 2}px)` }}
          />
          <div
            className="absolute top-20 right-10 h-72 w-72 rounded-full bg-amber-600/10 blur-2xl"
            style={{ transform: `translateY(${particleSeed * -2}px)` }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="primary">{profile.badge}</Badge>
                <Badge tone="secondary">{profile.location}</Badge>
              </div>

              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-black sm:text-4xl lg:text-5xl">
                {profile.name}
              </h1>
              <p className="mt-3 text-base font-semibold text-black/70">
                {profile.title}
              </p>

              <p className="mt-5 max-w-2xl text-sm text-black/75">
                {profile.bio}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a className="focus-ring rounded-xl" href={profile.resumeUrl}>
                  <Button variant="secondary" type="button">
                    View Resume
                  </Button>
                </a>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => scrollToHash("#contact")}
                >
                  Contact
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {profile.highlights.map((h) => (
                  <Badge key={h} tone="success">
                    {h}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="surface p-6">
              <h2 className="text-sm font-extrabold text-black">
                Quick Links
              </h2>
              <div className="mt-4 grid gap-2">
                <a
                  className="focus-ring rounded-xl px-3 py-2 text-sm font-semibold text-black/70 hover:bg-black/5"
                  href={`mailto:${profile.email}`}
                >
                  Email: {profile.email}
                </a>
                <a
                  className="focus-ring rounded-xl px-3 py-2 text-sm font-semibold text-black/70 hover:bg-black/5"
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="focus-ring rounded-xl px-3 py-2 text-sm font-semibold text-black/70 hover:bg-black/5"
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </div>

              <div className="mt-6 border-t border-black/10 pt-5">
                <p className="text-xs font-semibold text-black/60">
                  Use the navigation bar to jump between sections. Active section
                  highlights as you scroll.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="experience"
        title="Experience"
        description="A decade of hands-on delivery across ML, MLOps, LLM applications, and production reliability."
      >
        <Timeline items={experience} />
      </Section>

      <Section
        id="projects"
        title="Projects"
        description="Selected work spanning LLMs, streaming analytics, computer vision, and production platform engineering."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </Section>

      <Section
        id="certifications"
        title="Certifications"
        description="Credentials and ongoing learning—validated where possible."
      >
        <Carousel ariaLabel="Certifications carousel" autoplayMs={4500}>
          {certifications.map((c) => (
            <div key={`${c.name}-${c.year}`} className="surface p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-extrabold text-black">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-black/60">
                    {c.issuer} • {c.year}
                  </p>
                </div>
                {c.verifyUrl ? (
                  <a
                    className="focus-ring rounded-xl"
                    href={c.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button variant="ghost" size="sm" type="button">
                      Verify
                    </Button>
                  </a>
                ) : null}
              </div>
              <p className="mt-4 text-sm text-black/75">
                Focused on production ML, cloud infrastructure, and dependable delivery.
              </p>
            </div>
          ))}
        </Carousel>
      </Section>

      <Section
        id="testimonials"
        title="Testimonials"
        description="Feedback from leaders and partners across product and engineering."
      >
        <Carousel ariaLabel="Testimonials slider" autoplayMs={5200} pauseOnHover>
          {testimonials.map((t, idx) => (
            <TestimonialCard key={`${t.name}-${idx}`} testimonial={t} />
          ))}
        </Carousel>
      </Section>

      <Section
        id="contact"
        title="Contact"
        description="Reach out for consulting, full-time roles, speaking engagements, or collaboration."
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="surface p-6">
            <h3 className="text-base font-extrabold text-black">Send a message</h3>
            <p className="mt-2 text-sm text-black/70">
              This form validates in the browser. If <code className="font-semibold">NEXT_PUBLIC_API_BASE</code> is set, it will POST to <code className="font-semibold">/contact</code>.
            </p>

            <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
              <Input
                label="Name"
                name="name"
                value={contact.name}
                onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                error={errors.name}
                placeholder="Your name"
                autoComplete="name"
              />
              <Input
                label="Email"
                name="email"
                value={contact.email}
                onChange={(e) =>
                  setContact((c) => ({ ...c, email: e.target.value }))
                }
                error={errors.email}
                placeholder="you@company.com"
                autoComplete="email"
                inputMode="email"
              />
              <Textarea
                label="Message"
                name="message"
                rows={5}
                value={contact.message}
                onChange={(e) =>
                  setContact((c) => ({ ...c, message: e.target.value }))
                }
                error={errors.message}
                placeholder="Tell me what you’re building and how I can help..."
              />

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" variant="primary" disabled={submitting}>
                  {submitting ? "Sending…" : "Send Message"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setContact({ name: "", email: "", message: "" });
                    setErrors({});
                    toast.push({
                      tone: "info",
                      title: "Cleared",
                      description: "Form fields have been reset.",
                    });
                  }}
                >
                  Clear
                </Button>
              </div>
            </form>
          </div>

          <div className="surface p-6">
            <h3 className="text-base font-extrabold text-black">Direct links</h3>
            <div className="mt-4 grid gap-2">
              <a
                className="focus-ring rounded-xl px-3 py-2 text-sm font-semibold text-black/70 hover:bg-black/5"
                href={`mailto:${profile.email}`}
              >
                Email
              </a>
              <a
                className="focus-ring rounded-xl px-3 py-2 text-sm font-semibold text-black/70 hover:bg-black/5"
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="focus-ring rounded-xl px-3 py-2 text-sm font-semibold text-black/70 hover:bg-black/5"
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>

            <div className="mt-6 rounded-xl border border-black/10 bg-gradient-to-br from-blue-900/10 to-amber-600/10 p-4">
              <p className="text-sm font-semibold text-black/75">
                Prefer a quick jump?
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => scrollToHash("#projects")}>
                  View Projects
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => scrollToHash("#experience")}>
                  Experience
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <footer className="border-t border-black/10 bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 text-sm text-black/60 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {new Date().getFullYear()} {profile.name}. Ocean Professional theme.
            </span>
            <button
              className="focus-ring w-fit rounded-xl px-3 py-2 font-semibold text-black/70 hover:bg-black/5"
              type="button"
              onClick={() => scrollToHash("#home")}
              aria-label="Back to top"
            >
              Back to top
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
