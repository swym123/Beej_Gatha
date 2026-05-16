import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { sharedHeadLinks } from "../components/SiteHead";

export const Route = createFileRoute("/product")({
  component: ProductPage,
  head: () => ({
    meta: [
      { title: "Products — Beej Gatha" },
      { name: "description", content: "Explore Beej Gatha's science-backed seed varieties for rice, wheat, pulses, vegetables, and more." },
      { property: "og:title", content: "Products — Beej Gatha" },
      { property: "og:description", content: "High-yield, climate-resilient seeds tested across Indian farms." },
    ],
    links: sharedHeadLinks,
  }),
});

const PRODUCTS = [
  {
    id: 1, category: "Cereal",
    name: "BG Gold Wheat", code: "BGW-204",
    tag: "Best Seller",
    icon: "🌾",
    img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80",
    yield: "52–58 q/ha", maturity: "115–120 days", resistance: "Rust, Blight",
    desc: "High-yield wheat bred for North Indian plains. Exceptional grain size, strong straw, and outstanding rust resistance.",
    badge: "green",
  },
  {
    id: 2, category: "Cereal",
    name: "BG Paddy Select", code: "BGP-117",
    tag: "New",
    icon: "🌾",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",
    yield: "60–70 q/ha", maturity: "130–135 days", resistance: "Blast, BPH",
    desc: "A fine-grain paddy variety with high tillering capacity. Suited for irrigated lowland conditions across central India.",
    badge: "blue",
  },
  {
    id: 3, category: "Pulse",
    name: "BG Chickpea Bold", code: "BGC-310",
    tag: "Drought Tolerant",
    icon: "🫘",
    img: "https://images.unsplash.com/photo-1635575672547-a774b4cd8c27?w=600&q=80",
    yield: "18–22 q/ha", maturity: "95–100 days", resistance: "Fusarium Wilt",
    desc: "Large bold kabuli chickpea designed for dryland farming. Exceptional drought tolerance and premium market appeal.",
    badge: "amber",
  },
  {
    id: 4, category: "Pulse",
    name: "BG Soybean Pro", code: "BGS-420",
    tag: "High Protein",
    icon: "🫘",
    img: "https://images.unsplash.com/photo-1571842805412-97e6eb30c35a?w=600&q=80",
    yield: "28–32 q/ha", maturity: "90–95 days", resistance: "Yellow Mosaic",
    desc: "A high-protein soybean cultivar with broad adaptability across Vidarbha, Madhya Pradesh, and Rajasthan.",
    badge: "green",
  },
  {
    id: 5, category: "Vegetable",
    name: "BG Tomato F1", code: "BGT-501",
    tag: "Best Seller",
    icon: "🍅",
    img: "https://images.unsplash.com/photo-1558818498-28c1e002b655?w=600&q=80",
    yield: "800–900 q/ha", maturity: "65–70 days", resistance: "ToLCV, Root Knot",
    desc: "Heavy-setting hybrid tomato ideal for both fresh market and processing. Firm fruits with a 15-day extended shelf life.",
    badge: "green",
  },
  {
    id: 6, category: "Vegetable",
    name: "BG Brinjal Hybrid", code: "BGB-612",
    tag: "Early Bearing",
    icon: "🍆",
    img: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=600&q=80",
    yield: "400–450 q/ha", maturity: "55–60 days", resistance: "Little Leaf, EFSB",
    desc: "Shiny, long-fruited hybrid brinjal that starts bearing early and holds quality in humid, semi-arid conditions.",
    badge: "blue",
  },
  {
    id: 7, category: "Oilseed",
    name: "BG Sunflower HO", code: "BGSF-711",
    tag: "High Oil",
    icon: "🌻",
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&q=80",
    yield: "22–26 q/ha", maturity: "85–90 days", resistance: "Downy Mildew",
    desc: "High-oleic hybrid sunflower bred for superior oil content and heat adaptability in Kharif and Rabi seasons.",
    badge: "amber",
  },
  {
    id: 8, category: "Oilseed",
    name: "BG Mustard Bold", code: "BGM-820",
    tag: "Winter Crop",
    icon: "🌿",
    img: "https://images.unsplash.com/photo-1525059696034-4967a729002e?w=600&q=80",
    yield: "18–24 q/ha", maturity: "100–110 days", resistance: "Alternaria Blight",
    desc: "A bold-seeded rabi mustard with rich oil content. Strong adaptability across Rajasthan, UP, and Haryana.",
    badge: "green",
  },
  {
    id: 9, category: "Forage",
    name: "BG Sorghum Green", code: "BGSG-910",
    tag: "Multi-Cut",
    icon: "🌱",
    img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80",
    yield: "600–700 q/ha (green)", maturity: "60–65 days", resistance: "Shoot Fly, Aphids",
    desc: "Multi-cut fodder sorghum ideal for dairy farmers. Succulent, low HCN content, and excellent palatability for cattle.",
    badge: "blue",
  },
];

const CATEGORIES = ["All", "Cereal", "Pulse", "Vegetable", "Oilseed", "Forage"];

function ProductPage() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = active === "All" || p.category === active;
    const matchQ = query === "" || p.name.toLowerCase().includes(query.toLowerCase()) || p.code.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <main className="pd-page">

        {/* Filters + Search */}
        <div className="pd-toolbar">
          <div className="pd-cats">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={"pd-cat-btn" + (active === c ? " active" : "")}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <input
            className="pd-search"
            type="search"
            placeholder="Search by name or code…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Product Grid */}
        <div className="pd-grid">
          {filtered.length === 0 && (
            <div className="pd-empty">No products match your search.</div>
          )}
          {filtered.map((p) => (
            <article key={p.id} className="pd-card">
              <div className="pd-card-img" style={{ backgroundImage: `url('${p.img}')` }}>
                <span className={"pd-tag pd-tag-" + p.badge}>{p.tag}</span>
              </div>
              <div className="pd-card-body">
                <div className="pd-card-top">
                  <span className="pd-cat-pill">{p.category}</span>
                  <span className="pd-code">{p.code}</span>
                </div>
                <h2>{p.icon} {p.name}</h2>
                <p className="pd-card-desc">{p.desc}</p>
                <div className="pd-specs">
                  <div className="pd-spec">
                    <span className="pd-spec-label">Yield</span>
                    <span className="pd-spec-val">{p.yield}</span>
                  </div>
                  <div className="pd-spec">
                    <span className="pd-spec-label">Maturity</span>
                    <span className="pd-spec-val">{p.maturity}</span>
                  </div>
                  <div className="pd-spec">
                    <span className="pd-spec-label">Resistance</span>
                    <span className="pd-spec-val">{p.resistance}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </main>
      <Footer />
    </>
  );
}

const css = `
.pd-page { background: #f5f0e8; color: #0d1208; font-family: 'DM Sans', sans-serif; padding-top: 80px; min-height: 100vh; }



/* Toolbar */
.pd-toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; max-width: 1200px; margin: 0 auto; padding: 0 clamp(1.5rem,4vw,3rem) 2rem; }
.pd-cats { display: flex; flex-wrap: wrap; gap: .6rem; }
.pd-cat-btn { padding: .5rem 1.2rem; border: 1px solid #d4c9b5; border-radius: 100px; background: #fff; color: #5a4f3e; font-size: .85rem; cursor: pointer; transition: all .25s; font-family: 'DM Sans', sans-serif; }
.pd-cat-btn:hover { border-color: #8cc63f; color: #3d6b2f; }
.pd-cat-btn.active { background: #8cc63f; border-color: #8cc63f; color: #fff; font-weight: 600; }
.pd-search { padding: .55rem 1.1rem; border: 1px solid #d4c9b5; border-radius: 100px; background: #fff; color: #0d1208; font-size: .88rem; width: 240px; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color .25s; }
.pd-search:focus { border-color: #8cc63f; }

/* Grid */
.pd-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 1200px; margin: 0 auto; padding: 0 clamp(1.5rem,4vw,3rem) clamp(4rem,8vw,6rem); }
@media (max-width: 1000px) { .pd-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px)  { .pd-grid { grid-template-columns: 1fr; } }
.pd-empty { grid-column: 1/-1; text-align: center; padding: 4rem; color: #8c7e6a; font-size: 1.1rem; }

/* Card */
.pd-card { background: #fff; border: 1px solid #e8dcc8; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; transition: transform .3s, box-shadow .3s; }
.pd-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,.1); }
.pd-card-img { height: 200px; background-size: cover; background-position: center; position: relative; }
.pd-tag { position: absolute; top: 12px; left: 12px; font-size: .7rem; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; padding: .3rem .75rem; border-radius: 100px; }
.pd-tag-green  { background: #dcfce7; color: #166534; }
.pd-tag-blue   { background: #dbeafe; color: #1e40af; }
.pd-tag-amber  { background: #fef3c7; color: #92400e; }
.pd-card-body { padding: 1.75rem; display: flex; flex-direction: column; flex: 1; }
.pd-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: .75rem; }
.pd-cat-pill { font-size: .7rem; letter-spacing: .12em; text-transform: uppercase; background: #f5f0e8; color: #3d6b2f; padding: .25rem .65rem; border-radius: 100px; border: 1px solid #d4c9b5; }
.pd-code { font-size: .75rem; color: #8c7e6a; letter-spacing: .08em; }
.pd-card h2 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: 1.3rem; margin: 0 0 .75rem; color: #0d1208; }
.pd-card-desc { font-size: .9rem; line-height: 1.7; color: #5a4f3e; margin: 0 0 1.25rem; flex: 1; }
.pd-specs { display: flex; flex-direction: column; gap: .45rem; border-top: 1px solid #f0e8d8; padding-top: 1rem; }
.pd-spec { display: flex; justify-content: space-between; align-items: baseline; }
.pd-spec-label { font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; color: #8c7e6a; }
.pd-spec-val { font-size: .85rem; color: #0d1208; font-weight: 500; text-align: right; max-width: 60%; }
`;