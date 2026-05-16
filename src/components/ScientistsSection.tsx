export default function ScientistsSection() {
  const scientists = [
    { name: "Dr. M. S. Swaminathan", role: "Father of Indian Green Revolution", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80" },
    { name: "Dr. Verghese Kurien", role: "Pioneer of Operation Flood", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80" },
    { name: "Dr. R. S. Paroda", role: "Architect of Indian Agri-Research", img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80" },
    { name: "Dr. Raj Kumar", role: "Seed Biotechnology Lead", img: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400&q=80" },
  ];
  return (
    <>
      <style>{css}</style>
      <section className="sci-sec">
        <div className="sci-head">
          <p className="sci-eyebrow">— Indian Body of Science</p>
          <h2>Standing on the shoulders of giants</h2>
          <p className="sci-lead">Our lab is built on the legacy of India's greatest agricultural scientists. We continue their mission with modern genetics, climate-resilient breeding, and farmer-first research — right here, on Indian soil, for Indian farmers.</p>
        </div>
        <div className="sci-grid">
          {scientists.map((s) => (
            <article key={s.name} className="sci-card">
              <img src={s.img} alt={s.name} />
              <div className="sci-meta">
                <h4>{s.name}</h4>
                <p>{s.role}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="sci-lab">
          <div>
            <p className="sci-eyebrow">— About our lab</p>
            <h3>Indigenous research. Global standards.</h3>
            <p>Our Pune-based seed laboratory operates under ISTA-aligned protocols, partnering with ICAR institutes and state agricultural universities. From genotyping to germination trials, every batch is examined by Indian scientists who understand local soil, monsoon, and farmer needs.</p>
            <ul>
              <li>✓ ICAR-aligned testing protocols</li>
              <li>✓ 12+ regional trial farms across India</li>
              <li>✓ Climate-resilient varieties for every zone</li>
              <li>✓ Open partnerships with agricultural universities</li>
            </ul>
          </div>
          <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80" alt="Lab scientist examining seeds" />
        </div>
      </section>
    </>
  );
}

const css = `
.sci-sec { background: #f5f0e8; color: #0d1208; padding: clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem); font-family: 'DM Sans', sans-serif; }
.sci-head { max-width: 800px; margin: 0 auto 3.5rem; text-align: center; }
.sci-eyebrow { font-size: .7rem; letter-spacing: .35em; text-transform: uppercase; color: #3d6b2f; margin: 0 0 1rem; }
.sci-head h2 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: clamp(2rem,5vw,3.5rem); line-height: 1.1; margin: 0 0 1.2rem; }
.sci-lead { font-size: clamp(.95rem,1.4vw,1.1rem); line-height: 1.8; color: #5a4f3e; margin: 0; }
.sci-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; max-width: 1200px; margin: 0 auto 5rem; }
@media (max-width: 880px) { .sci-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .sci-grid { grid-template-columns: 1fr; } }
.sci-card { background: #fff; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 24px rgba(13,18,8,.06); }
.sci-card img { width: 100%; height: 240px; object-fit: cover; filter: grayscale(20%); }
.sci-meta { padding: 1.3rem 1.2rem; border-top: 3px solid #8cc63f; }
.sci-meta h4 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: 1.1rem; margin: 0 0 .3rem; }
.sci-meta p { font-size: .75rem; letter-spacing: .1em; text-transform: uppercase; color: #3d6b2f; margin: 0; }
.sci-lab { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; max-width: 1200px; margin: 0 auto; }
@media (max-width: 760px) { .sci-lab { grid-template-columns: 1fr; } }
.sci-lab h3 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: clamp(1.8rem,3.5vw,2.6rem); margin: 0 0 1.2rem; }
.sci-lab p { font-size: .95rem; line-height: 1.85; color: #4a4030; margin: 0 0 1.5rem; }
.sci-lab ul { list-style: none; padding: 0; margin: 0; }
.sci-lab li { padding: .6rem 0; border-bottom: 1px solid rgba(140,198,63,.18); color: #3d6b2f; font-size: .9rem; }
.sci-lab img { width: 100%; height: 480px; object-fit: cover; border-radius: 4px; }
`;
