import { createFileRoute } from "@tanstack/react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MissionSection from "../components/MissionSection";
import { sharedHeadLinks } from "../components/SiteHead";

export const Route = createFileRoute("/mission")({
  component: MissionPage,
  head: () => ({
    meta: [
      { title: "Mission & Core Values — Beej Gatha" },
      { name: "description", content: "Beej Gatha's mission, vision and the values that guide every seed we sell." },
      { property: "og:title", content: "Mission & Core Values — Beej Gatha" },
      { property: "og:description", content: "Honesty, farmer-first, climate resilience and the values we live by." },
    ],
    links: sharedHeadLinks,
  }),
});

function MissionPage() {
  return (
    <>
      <style>{css}</style>
      <Navbar />
      <main className="ms-page">
        <section className="ms-hero">
          <p className="ms-hero-eyebrow">— Our Purpose</p>
          <h1>Why we wake up<br /><i>every morning.</i></h1>
          <p className="ms-hero-lead">
            At Beej Gatha, our mission isn't a tagline — it's the reason every seed is tested, every farmer is heard, and every harvest matters.
          </p>
        </section>
        <MissionSection />
      </main>
      <Footer />
    </>
  );
}

const css = `
.ms-page { background: #f5f0e8; color: #0d1208; font-family: 'DM Sans', sans-serif; padding-top: 80px; }
.ms-hero { padding: clamp(4rem,10vw,8rem) clamp(1.5rem,6vw,5rem); max-width: 900px; margin: 0 auto; text-align: center; }
.ms-hero-eyebrow { font-size: .7rem; letter-spacing: .35em; text-transform: uppercase; color: #3d6b2f; margin-bottom: 1.5rem; }
.ms-hero h1 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: clamp(2.5rem,7vw,5.5rem); line-height: 1.05; margin: 0 0 2rem; color: #0d1208; }
.ms-hero h1 i { color: #3d6b2f; font-style: italic; }
.ms-hero-lead { font-size: clamp(1rem,1.5vw,1.2rem); line-height: 1.7; color: #4a4030; max-width: 600px; margin: 0 auto; }
`;

