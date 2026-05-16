import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sharedHeadLinks } from "../components/SiteHead";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — SeedCraft" },
      { name: "description", content: "Talk to our agronomy team about seeds, trials, partnerships and bulk orders." },
      { property: "og:title", content: "Contact — SeedCraft" },
      { property: "og:description", content: "Reach the SeedCraft team — we usually respond within 24 hours." },
    ],
    links: sharedHeadLinks,
  }),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <main className="ct-page">
        <section className="ct-hero">
          <p className="ct-eyebrow">— Get in touch</p>
          <h1>Let's grow<br /><i>something together.</i></h1>
          <p className="ct-lead">Whether you have 1 acre or 1000, our team is here to help you pick the right seed and squeeze every drop of yield from your soil.</p>
        </section>

        <section className="ct-body">
          <aside className="ct-info">
            <h3>Reach us</h3>
            <div className="ct-info-row"><strong>Email</strong><a href="mailto:hello@seedcraft.com">hello@seedcraft.com</a></div>
            <div className="ct-info-row"><strong>Phone</strong><a href="tel:+911234567890">+91 12345 67890</a></div>
            <div className="ct-info-row"><strong>Office</strong><span>Hinjewadi Phase II<br />Pune, MH 411057<br />India</span></div>
            <div className="ct-info-row"><strong>Hours</strong><span>Mon–Sat · 9am–6pm IST</span></div>
          </aside>

          <form className="ct-form" onSubmit={onSubmit}>
            <div className="ct-grid">
              <label>
                <span>Your name</span>
                <input name="name" value={form.name} onChange={onChange} required placeholder="Jane Farmer" />
              </label>
              <label>
                <span>Email address</span>
                <input name="email" type="email" value={form.email} onChange={onChange} required placeholder="you@email.com" />
              </label>
            </div>
            <label>
              <span>Subject</span>
              <input name="subject" value={form.subject} onChange={onChange} required placeholder="I'd like to know about..." />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" rows={6} value={form.message} onChange={onChange} required placeholder="Tell us a bit about your farm and what you need." />
            </label>
            <button type="submit" className="ct-btn">Send Message →</button>
            {sent && <div className="ct-toast">✓ Thanks! We'll be in touch within 24 hours.</div>}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

const css = `
.ct-page { background: #f5f0e8; color: #0d1208; font-family: 'DM Sans', sans-serif; padding-top: 80px; min-height: 100vh; }
.ct-hero { text-align: center; padding: clamp(3rem,8vw,6rem) clamp(1.5rem,5vw,4rem) 2rem; max-width: 800px; margin: 0 auto; }
.ct-eyebrow { font-size: .7rem; letter-spacing: .35em; text-transform: uppercase; color: #3d6b2f; margin-bottom: 1.5rem; }
.ct-hero h1 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: clamp(2.4rem,6vw,5rem); line-height: 1; margin: 0 0 1.5rem; }
.ct-hero h1 i { color: #3d6b2f; }
.ct-lead { font-size: 1.05rem; line-height: 1.7; color: #4a4030; }
.ct-body { display: grid; grid-template-columns: 1fr 2fr; gap: 3rem; max-width: 1100px; margin: 0 auto; padding: clamp(2rem,5vw,4rem) clamp(1.5rem,4vw,3rem) clamp(4rem,8vw,6rem); }
@media (max-width: 760px) { .ct-body { grid-template-columns: 1fr; } }
.ct-info { background: #0d1208; color: #f5f0e8; padding: 2.5rem 2rem; border-radius: 4px; }
.ct-info h3 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: 1.4rem; margin: 0 0 2rem; color: #8cc63f; }
.ct-info-row { display: flex; flex-direction: column; gap: .3rem; padding: 1rem 0; border-top: 1px solid rgba(140,198,63,.15); }
.ct-info-row strong { font-size: .65rem; letter-spacing: .25em; text-transform: uppercase; color: #8cc63f; font-weight: 500; }
.ct-info-row a, .ct-info-row span { color: rgba(245,240,232,.85); text-decoration: none; font-size: .9rem; line-height: 1.5; }
.ct-info-row a:hover { color: #8cc63f; }
.ct-form { background: #fff; padding: clamp(1.8rem,4vw,2.8rem); border-radius: 4px; box-shadow: 0 10px 40px rgba(0,0,0,.06); display: flex; flex-direction: column; gap: 1.2rem; }
.ct-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
@media (max-width: 540px) { .ct-grid { grid-template-columns: 1fr; } }
.ct-form label { display: flex; flex-direction: column; gap: .4rem; }
.ct-form span { font-size: .68rem; letter-spacing: .2em; text-transform: uppercase; color: #5a4f3e; font-weight: 500; }
.ct-form input, .ct-form textarea { font-family: inherit; font-size: .95rem; padding: .85rem 1rem; border: 1px solid #e8dcc8; background: #faf7f2; color: #0d1208; border-radius: 3px; transition: border-color .2s, background .2s; resize: vertical; }
.ct-form input:focus, .ct-form textarea:focus { outline: none; border-color: #3d6b2f; background: #fff; }
.ct-btn { background: #0d1208; color: #f5f0e8; border: 0; padding: 1rem 2rem; font-family: inherit; font-size: .8rem; letter-spacing: .2em; text-transform: uppercase; cursor: pointer; transition: background .25s, transform .15s; align-self: flex-start; border-radius: 3px; }
.ct-btn:hover { background: #3d6b2f; }
.ct-btn:active { transform: scale(.98); }
.ct-toast { background: #e8f5d8; color: #1f3d0f; padding: .85rem 1rem; border-radius: 3px; font-size: .85rem; border-left: 3px solid #3d6b2f; }
`;
