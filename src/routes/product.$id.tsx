import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PRODUCTS } from "./product";
import { sharedHeadLinks } from "../components/SiteHead";
import "./product.css";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetail,
  head: () => ({
    meta: [
      { title: "Product Detail — Beej Gatha" }
    ],
    links: sharedHeadLinks,
  }),
});

function ProductDetail() {
  const { id } = Route.useParams();
  const product = PRODUCTS.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "120px 20px", textAlign: "center", minHeight: "60vh", background: "#f5f0e8" }}>
          <h2>Product not found</h2>
          <Link to="/product" style={{ color: "#3d6b2f" }}>Return to Products</Link>
        </div>
        <Footer />
      </>
    );
  }

  // Use the defined photos array or default to repeating the main image
  const photos = product.photos || [product.img, product.img, product.img, product.img];
  const fullDesc = product.fullDesc || product.desc;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev(); }, [emblaApi]);
  const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext(); }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <main className="pdetail-page">
        {/* Hero Section */}
        <div className="pdetail-hero">
          <div className="pdetail-container">
            <Link to="/product" className="pdetail-back">← Back to Catalog</Link>
            <div className="pdetail-header">
              <div className="pdetail-header-text">
                <div className="pdetail-tags">
                  <span className="pdetail-cat">{product.category}</span>
                  <span className={"pdetail-badge pdetail-badge-" + product.badge}>{product.tag}</span>
                </div>
                <h1>{product.icon} {product.name}</h1>
                <p className="pdetail-code">Product Code: {product.code}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="pdetail-container pdetail-content">
          <div className="pdetail-main">
            <div className="pdetail-gallery-wrapper">
              <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                  {photos.map((photo, idx) => (
                    <div key={idx} className="embla__slide">
                      <div className="pdetail-img-carousel" style={{ backgroundImage: `url('${photo}')` }} />
                    </div>
                  ))}
                </div>
              </div>
              <button className="embla__prev" onClick={scrollPrev}>←</button>
              <button className="embla__next" onClick={scrollNext}>→</button>
            </div>

            <div className="pdetail-description">
              <h2>About {product.name}</h2>
              <p>{fullDesc}</p>
            </div>
          </div>

          <aside className="pdetail-sidebar">
            <div className="pdetail-specs-card">
              <h3>Agronomic Specifications</h3>
              <ul className="pdetail-specs-list">
                <li>
                  <span>Yield Potential</span>
                  <strong>{product.yield}</strong>
                </li>
                <li>
                  <span>Maturity Duration</span>
                  <strong>{product.maturity}</strong>
                </li>
                <li>
                  <span>Disease Resistance</span>
                  <strong>{product.resistance}</strong>
                </li>
                <li>
                  <span>Sowing Season</span>
                  <strong>{product.season || "Kharif & Rabi"}</strong>
                </li>
                <li>
                  <span>Plant Spacing</span>
                  <strong>{product.spacing || "Standard spacing"}</strong>
                </li>
              </ul>
              <button className="pdetail-enquire">Enquire Now</button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

const css = `
.pdetail-page { background: #f5f0e8; color: #0d1208; font-family: 'DM Sans', sans-serif; padding-top: 80px; min-height: 100vh; }
.pdetail-container { max-width: 1200px; margin: 0 auto; padding: 0 clamp(1.5rem, 4vw, 3rem); }

.pdetail-hero { padding: 3rem 0; border-bottom: 1px solid #e8dcc8; margin-bottom: 3rem; }
.pdetail-back { display: inline-block; color: #5a4f3e; font-size: 0.9rem; text-decoration: none; margin-bottom: 2rem; transition: color 0.2s; }
.pdetail-back:hover { color: #3d6b2f; }

.pdetail-tags { display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem; }
.pdetail-cat { font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; color: #8c7e6a; }
.pdetail-badge { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.3rem 0.75rem; border-radius: 100px; }
.pdetail-badge-green  { background: #dcfce7; color: #166534; }
.pdetail-badge-blue   { background: #dbeafe; color: #1e40af; }
.pdetail-badge-amber  { background: #fef3c7; color: #92400e; }

.pdetail-header h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 400; line-height: 1.1; margin: 0 0 0.5rem; color: #0d1208; }
.pdetail-code { font-family: 'DM Sans', sans-serif; color: #8c7e6a; font-size: 1rem; letter-spacing: 0.05em; }

.pdetail-content { display: grid; grid-template-columns: 2fr 1fr; gap: 4rem; padding-bottom: 6rem; }
@media (max-width: 900px) { .pdetail-content { grid-template-columns: 1fr; gap: 3rem; } }

.pdetail-gallery-wrapper { position: relative; margin-bottom: 3rem; }
.embla { overflow: hidden; border-radius: 8px; }
.embla__container { display: flex; gap: 1rem; }
.embla__slide { flex: 0 0 100%; min-width: 0; }
.pdetail-img-carousel { background-size: cover; background-position: center; border-radius: 8px; border: 1px solid #e8dcc8; height: 500px; width: 100%; }

.embla__prev, .embla__next { 
  position: absolute; top: 50%; transform: translateY(-50%); 
  width: 44px; height: 44px; border-radius: 50%; 
  background: #fff; border: 1px solid #e8dcc8; 
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  color: #3d6b2f; font-size: 1.2rem; cursor: pointer; 
  display: flex; align-items: center; justify-content: center;
  z-index: 2; transition: all 0.2s;
}
.embla__prev:hover, .embla__next:hover { background: #8cc63f; color: #fff; border-color: #8cc63f; }
.embla__prev { left: -22px; }
.embla__next { right: -22px; }

.pdetail-description h2 { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 400; margin: 0 0 1.5rem; }
.pdetail-description p { font-size: 1.1rem; line-height: 1.8; color: #5a4f3e; }

.pdetail-specs-card { background: #fff; border: 1px solid #e8dcc8; border-radius: 12px; padding: 2.5rem; position: sticky; top: 120px; box-shadow: 0 10px 40px rgba(0,0,0,0.03); }
.pdetail-specs-card h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; margin: 0 0 1.5rem; font-weight: 400; border-bottom: 1px solid #e8dcc8; padding-bottom: 1rem; }
.pdetail-specs-list { list-style: none; padding: 0; margin: 0 0 2rem; display: flex; flex-direction: column; gap: 1.25rem; }
.pdetail-specs-list li { display: flex; flex-direction: column; gap: 0.25rem; }
.pdetail-specs-list span { font-size: 0.8rem; letter-spacing: 0.05em; text-transform: uppercase; color: #8c7e6a; }
.pdetail-specs-list strong { font-size: 1.1rem; font-weight: 500; color: #0d1208; }

.pdetail-enquire { width: 100%; background: #8cc63f; color: #fff; border: none; padding: 1rem; border-radius: 100px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background 0.2s; font-family: 'DM Sans', sans-serif; }
.pdetail-enquire:hover { background: #7ab32e; }

@media (max-width: 600px) {
  .pdetail-img-carousel { height: 350px; }
  .pdetail-specs-card { padding: 1.5rem; }
}
`;
