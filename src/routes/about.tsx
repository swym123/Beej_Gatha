import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sharedHeadLinks } from "@/components/SiteHead";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — SeedCraft" },
      { name: "description", content: "Meet SeedCraft — agronomists, scientists and farmers cultivating tomorrow's harvest." },
      { property: "og:title", content: "About — SeedCraft" },
      { property: "og:description", content: "Our story, mission and the team behind every seed." },
    ],
    links: sharedHeadLinks,
  }),
});

function AboutPage() {
  return (
    <>
      <style>{css}</style>
      <Navbar />
      <main className="ab-page">
        <section className="ab-hero">
          <p className="ab-eyebrow">— About Us</p>
          <h1>Rooted in science.<br /><i>Grown for farmers.</i></h1>
          <p className="ab-lead">SeedCraft is a seed-science company connecting cutting-edge research to the soil under your feet. We exist so every farmer plants with confidence.</p>
        </section>

        <section className="ab-grid">
          <div className="ab-card">
            <h3>Our Mission</h3>
            <p>Make high-yield, climate-resilient seeds accessible — from the smallest plot to the largest farm.</p>
          </div>
          <div className="ab-card">
            <h3>Our Vision</h3>
            <p>A world where every harvest is abundant, every field thrives, and farming is the most respected profession.</p>
          </div>
          <div className="ab-card">
            <h3>Our Values</h3>
            <p>Honesty in our science, transparency in our process, and partnership with every farmer we serve.</p>
          </div>
        </section>

        <section className="ab-story">
          <div>
            <h2>Our Story</h2>
            <p>Founded in 2018 by a team of agronomists and biotechnologists, SeedCraft began as a single trial farm in Maharashtra. Today we operate 12+ trial locations, ship to thousands of farmers, and partner with universities to push the science of seed forward.</p>
            <p>Every batch passes through our 5-step process — from genetic selection to final dispatch — so what reaches your field is the strongest expression of what nature can offer.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80" alt="Field of crops" />
        </section>

        <section className="ab-team">
          <h2>Built by people who care</h2>
          <div className="ab-team-grid">
            {[
              { n: "Aanya Patel", r: "Co-founder & Head of Science", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
              { n: "Rohan Kulkarni", r: "Co-founder & Field Operations", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
              { n: "Meera Shah", r: "Lead Agronomist", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
              { n: "Vikram Iyer", r: "Lab Director", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
            ].map((p) => (
              <div key={p.n} className="ab-member">
                <img src={p.img} alt={p.n} />
                <h4>{p.n}</h4>
                <span>{p.r}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const css = `
.ab-page { background: #f5f0e8; color: #0d1208; font-family: 'DM Sans', sans-serif; padding-top: 80px; }
.ab-hero { padding: clamp(4rem,10vw,8rem) clamp(1.5rem,6vw,5rem); max-width: 900px; margin: 0 auto; text-align: center; }
.ab-eyebrow { font-size: .7rem; letter-spacing: .35em; text-transform: uppercase; color: #3d6b2f; margin-bottom: 1.5rem; }
.ab-hero h1 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: clamp(2.5rem,7vw,5.5rem); line-height: 1; margin: 0 0 2rem; }
.ab-hero h1 i { color: #3d6b2f; }
.ab-lead { font-size: clamp(1rem,1.5vw,1.2rem); line-height: 1.7; color: #4a4030; max-width: 600px; margin: 0 auto; }
.ab-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; max-width: 1100px; margin: 0 auto; padding: 2rem clamp(1.5rem,4vw,3rem); }
@media (max-width: 760px) { .ab-grid { grid-template-columns: 1fr; } }
.ab-card { background: #fff; padding: 2.5rem 2rem; border-left: 3px solid #8cc63f; }
.ab-card h3 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: 1.5rem; margin: 0 0 1rem; color: #0d1208; }
.ab-card p { font-size: .95rem; line-height: 1.7; color: #5a4f3e; margin: 0; }
.ab-story { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; max-width: 1100px; margin: 0 auto; padding: clamp(3rem,6vw,5rem) clamp(1.5rem,4vw,3rem); }
@media (max-width: 760px) { .ab-story { grid-template-columns: 1fr; } }
.ab-story h2 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: clamp(2rem,4vw,3rem); margin: 0 0 1.5rem; }
.ab-story p { font-size: .95rem; line-height: 1.85; color: #4a4030; margin-bottom: 1rem; }
.ab-story img { width: 100%; height: 400px; object-fit: cover; border-radius: 4px; }
.ab-team { background: #0d1208; color: #f5f0e8; padding: clamp(4rem,8vw,6rem) clamp(1.5rem,4vw,3rem); text-align: center; }
.ab-team h2 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: clamp(2rem,4vw,3rem); margin: 0 0 3rem; }
.ab-team-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 2rem; max-width: 1100px; margin: 0 auto; }
@media (max-width: 760px) { .ab-team-grid { grid-template-columns: repeat(2,1fr); } }
.ab-member img { width: 140px; height: 140px; object-fit: cover; border-radius: 50%; margin-bottom: 1rem; border: 2px solid #8cc63f; }
.ab-member h4 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: 1.1rem; margin: 0 0 .3rem; }
.ab-member span { font-size: .7rem; letter-spacing: .15em; text-transform: uppercase; color: #8cc63f; }
`;
