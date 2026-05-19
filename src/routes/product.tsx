import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { sharedHeadLinks } from "../components/SiteHead";
import "./product.css";

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

export const PRODUCTS = [
  {
    id: 1, category: "Cereal",
    name: "BG Gold Wheat", code: "BGW-204",
    tag: "Best Seller",
    icon: "🌾",
    img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80",
    photos: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&q=80",
      "https://images.unsplash.com/photo-1586771107584-568c569f64bd?w=800&q=80",
      "https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c37?w=800&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"
    ],
    yield: "52–58 q/ha", maturity: "115–120 days", resistance: "Rust, Blight",
    season: "Rabi (Winter)", spacing: "20-22 cm row-to-row",
    desc: "High-yield wheat bred for North Indian plains. Exceptional grain size, strong straw, and outstanding rust resistance.",
    fullDesc: "BG Gold Wheat is the result of over a decade of selective breeding to withstand the unique climatic pressures of the North Indian plains. It boasts an exceptional tillering capacity, meaning each plant produces more grain-bearing heads. The sturdy straw prevents lodging even in high winds, ensuring your crop stays standing until harvest. Its robust genetic profile provides excellent natural resistance to common rust and blight, reducing the need for chemical interventions. Farmers consistently report premium market prices due to its bold, lustrous grains.",
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

    // Convert everything to a string safely and check for nulls
    const name = String(p.name || "").toLowerCase();
    const code = String(p.code || "").toLowerCase();
    const desc = String(p.desc || "").toLowerCase();
    const searchTerm = query.toLowerCase();

    const matchQ =
      query === "" ||
      name.includes(searchTerm) ||
      code.includes(searchTerm) ||
      desc.includes(searchTerm);

    return matchCat && matchQ;
  });

  return (
    <>

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
            <Link to="/product/$id" params={{ id: p.id.toString() }} key={p.id} className="pd-card">
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
            </Link>
          ))}
        </div>

      </main>
      <Footer />
    </>
  );
}
