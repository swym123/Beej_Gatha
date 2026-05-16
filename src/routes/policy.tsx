import { createFileRoute } from "@tanstack/react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sharedHeadLinks } from "../components/SiteHead";

export const Route = createFileRoute("/policy")({
  component: PolicyPage,
  head: () => ({
    meta: [
      { title: "Our Policy — Beej Gatha" },
      { name: "description", content: "Beej Gatha privacy, quality, shipping, returns and farmer protection policies." },
      { property: "og:title", content: "Our Policy — Beej Gatha" },
      { property: "og:description", content: "How we protect your data, your seeds and your trust." },
    ],
    links: sharedHeadLinks,
  }),
});

const SECTIONS = [
  {
    h: "Quality Promise",
    p: "Every seed batch is tested for purity (≥99%), germination (≥85%) and genetic identity before dispatch. If a batch fails our internal QA, it never leaves the lab — full stop.",
  },
  {
    h: "Privacy Policy",
    p: "We collect only the data needed to serve you — your name, contact, farm location and order history. We never sell or share personal data with third parties. You may request export or deletion of your data at any time by emailing privacy@beejgatha.com.",
  },
  {
    h: "Shipping & Dispatch",
    p: "Orders are dispatched within 24 hours of payment confirmation. Pan-India delivery in 3–7 business days. Live tracking is shared via WhatsApp and email.",
  },
  {
    h: "Returns & Replacements",
    p: "If a seed batch fails to germinate at the rate guaranteed on the pack, we replace it free of cost. Report within 21 days of sowing with photos and a soil-sample log.",
  },
  {
    h: "Farmer Protection",
    p: "We never lock farmers into exclusive contracts. Our seeds are yours — replant, save, share. Open-pollinated lines are clearly marked, and we publish detailed agronomy guides in regional languages.",
  },
  {
    h: "Reviews & User Content",
    p: "Reviews posted on this site reflect the views of individual users. We moderate for spam and abuse, but we do not edit or remove negative feedback. Users may edit or delete their own reviews at any time.",
  },
  {
    h: "Contact",
    p: "For any policy question, write to legal@beejgatha.com or call +91 12345 67890. We respond within 2 business days.",
  },
];

function PolicyPage() {
  return (
    <>
      <style>{css}</style>
      <Navbar />
      <main className="pl-page">
        <section className="pl-hero">
          <p className="pl-eyebrow">— Our Policy</p>
          <h1>Honest seeds.<br /><i>Honest policy.</i></h1>
          <p className="pl-lead">Everything we promise — written down, in plain language.</p>
        </section>
        <section className="pl-body">
          {SECTIONS.map((s) => (
            <article key={s.h}>
              <h2>{s.h}</h2>
              <p>{s.p}</p>
            </article>
          ))}
          <p className="pl-foot">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long" })}</p>
        </section>
      </main>
      <Footer />
    </>
  );
}

const css = `
.pl-page { background: #f5f0e8; color: #0d1208; font-family: 'DM Sans', sans-serif; padding-top: 80px; }
.pl-hero { padding: clamp(4rem,9vw,7rem) clamp(1.5rem,6vw,5rem) 3rem; max-width: 900px; margin: 0 auto; text-align: center; }
.pl-eyebrow { font-size: .7rem; letter-spacing: .35em; text-transform: uppercase; color: #3d6b2f; margin-bottom: 1.5rem; }
.pl-hero h1 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: clamp(2.5rem,7vw,5rem); line-height: 1; margin: 0 0 1.5rem; }
.pl-hero h1 i { color: #3d6b2f; }
.pl-lead { font-size: 1.1rem; color: #5a4f3e; }
.pl-body { max-width: 780px; margin: 0 auto; padding: 2rem clamp(1.5rem,4vw,2rem) 5rem; }
.pl-body article { padding: 1.8rem 0; border-bottom: 1px solid rgba(13,18,8,.08); }
.pl-body h2 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: 1.5rem; margin: 0 0 .8rem; color: #3d6b2f; }
.pl-body p { font-size: 1rem; line-height: 1.85; color: #4a4030; margin: 0; }
.pl-foot { text-align: center; color: #8a7d68; font-size: .8rem; letter-spacing: .15em; text-transform: uppercase; margin: 3rem 0 0; }
`;
