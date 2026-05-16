import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sharedHeadLinks } from "../components/SiteHead";

export const Route = createFileRoute("/careers")({
  component: CareersPage,
  head: () => ({
    meta: [
      { title: "Careers — We're Hiring at Beej Gatha" },
      { name: "description", content: "Join Beej Gatha. Open roles in agronomy, biotech, field operations and engineering." },
      { property: "og:title", content: "Careers — We're Hiring at Beej Gatha" },
      { property: "og:description", content: "Help us cultivate India's next harvest. Apply today." },
    ],
    links: sharedHeadLinks,
  }),
});

const JOBS = [
  { title: "Senior Agronomist", loc: "Pune, India", type: "Full-time", desc: "Lead regional trials, design protocols and mentor field officers." },
  { title: "Seed Biotechnologist", loc: "Pune, India", type: "Full-time", desc: "Run genotyping pipelines and develop climate-resilient lines." },
  { title: "Field Operations Manager", loc: "Maharashtra (Multi-site)", type: "Full-time", desc: "Coordinate farmer partnerships and trial logistics across 12+ sites." },
  { title: "Full-Stack Engineer", loc: "Remote (India)", type: "Full-time", desc: "Build farmer-facing tools, dashboards and ordering systems." },
  { title: "Content & Outreach Lead", loc: "Pune / Remote", type: "Full-time", desc: "Tell our story across regional languages, video and print." },
  { title: "Internship — Plant Sciences", loc: "Pune, India", type: "6 months", desc: "For final-year B.Sc / M.Sc students. Stipend + housing." },
];

function CareersPage() {
  const [form, setForm] = useState({ name: "", email: "", role: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`Role: ${form.role}\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:careers@beejgatha.com?subject=${encodeURIComponent("Application: " + form.role)}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <main className="cr-page">
        <section className="cr-hero">
          <p className="cr-eyebrow">— We are hiring</p>
          <h1>Help us write<br /><i>India's next harvest.</i></h1>
          <p className="cr-lead">We're looking for scientists, agronomists, engineers and storytellers who believe that good seed can change a country. If that's you — come join us.</p>
          <a href="#openings" className="cr-cta">See open roles ↓</a>
        </section>

        <section id="openings" className="cr-jobs">
          <h2>Open roles</h2>
          <div className="cr-grid">
            {JOBS.map((j) => (
              <article key={j.title} className="cr-card">
                <div>
                  <h3>{j.title}</h3>
                  <p className="cr-meta">{j.loc} · {j.type}</p>
                  <p>{j.desc}</p>
                </div>
                <button onClick={() => { setForm((f) => ({ ...f, role: j.title })); document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" }); }} className="cr-apply">Apply →</button>
              </article>
            ))}
          </div>
        </section>

        <section id="apply" className="cr-form-sec">
          <div className="cr-form-wrap">
            <h2>Apply now</h2>
            <p className="cr-form-sub">Send us a note. We read every application.</p>
            {sent && <p className="cr-msg">✓ Your email client should now open with the message prefilled.</p>}
            <form onSubmit={submit}>
              <input placeholder="Your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input placeholder="Role you're applying for" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
              <textarea placeholder="Tell us about yourself" rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <button type="submit" className="cr-submit">Send application</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const css = `
.cr-page { background: #f5f0e8; color: #0d1208; font-family: 'DM Sans', sans-serif; padding-top: 80px; }
.cr-hero { padding: clamp(4rem,9vw,8rem) clamp(1.5rem,6vw,5rem); max-width: 900px; margin: 0 auto; text-align: center; }
.cr-eyebrow { font-size: .7rem; letter-spacing: .35em; text-transform: uppercase; color: #3d6b2f; margin-bottom: 1.5rem; }
.cr-hero h1 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: clamp(2.5rem,7vw,5.5rem); line-height: 1; margin: 0 0 2rem; }
.cr-hero h1 i { color: #3d6b2f; }
.cr-lead { font-size: clamp(1rem,1.5vw,1.2rem); line-height: 1.7; color: #4a4030; max-width: 600px; margin: 0 auto 2.5rem; }
.cr-cta { display: inline-block; padding: .9rem 2.2rem; background: #3d6b2f; color: #f5f0e8; text-decoration: none; border-radius: 999px; font-size: .75rem; letter-spacing: .3em; text-transform: uppercase; transition: all .3s; }
.cr-cta:hover { background: #8cc63f; color: #0d1208; }
.cr-jobs { padding: clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem); max-width: 1100px; margin: 0 auto; }
.cr-jobs h2 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: clamp(1.8rem,4vw,2.8rem); margin: 0 0 2rem; text-align: center; }
.cr-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.2rem; }
@media (max-width: 760px) { .cr-grid { grid-template-columns: 1fr; } }
.cr-card { background: #fff; padding: 1.8rem; border-left: 3px solid #8cc63f; border-radius: 4px; display: flex; flex-direction: column; gap: 1rem; justify-content: space-between; }
.cr-card h3 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: 1.3rem; margin: 0 0 .3rem; }
.cr-meta { font-size: .7rem; letter-spacing: .2em; text-transform: uppercase; color: #3d6b2f; margin: 0 0 .6rem; }
.cr-card p { font-size: .9rem; line-height: 1.6; color: #5a4f3e; margin: 0; }
.cr-apply { align-self: flex-start; background: transparent; border: 1px solid rgba(61,107,47,.3); color: #3d6b2f; padding: .55rem 1.2rem; border-radius: 999px; font: inherit; font-size: .7rem; letter-spacing: .2em; text-transform: uppercase; cursor: pointer; transition: all .25s; }
.cr-apply:hover { background: #3d6b2f; color: #f5f0e8; }
.cr-form-sec { background: #0d1208; color: #f5f0e8; padding: clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,4rem); }
.cr-form-wrap { max-width: 600px; margin: 0 auto; }
.cr-form-wrap h2 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: clamp(1.8rem,4vw,2.8rem); margin: 0 0 .4rem; text-align: center; }
.cr-form-sub { text-align: center; color: rgba(245,240,232,.6); margin: 0 0 2rem; }
.cr-form-wrap form { display: grid; gap: .8rem; }
.cr-form-wrap input, .cr-form-wrap textarea { padding: .9rem 1rem; border: 1px solid rgba(140,198,63,.25); background: rgba(245,240,232,.04); color: #f5f0e8; border-radius: 4px; font: inherit; outline: none; }
.cr-form-wrap input::placeholder, .cr-form-wrap textarea::placeholder { color: rgba(245,240,232,.4); }
.cr-form-wrap input:focus, .cr-form-wrap textarea:focus { border-color: #8cc63f; }
.cr-submit { padding: .9rem; background: #8cc63f; color: #0d1208; border: 0; border-radius: 999px; font: inherit; font-size: .8rem; letter-spacing: .25em; text-transform: uppercase; cursor: pointer; transition: background .25s; }
.cr-submit:hover { background: #f5f0e8; }
.cr-msg { color: #8cc63f; text-align: center; margin: 0 0 1rem; }
`;
