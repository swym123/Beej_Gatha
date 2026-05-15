import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{css}</style>
      <header className={"nav " + (scrolled ? "nav-scrolled" : "")}>
        <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
          Seed<span>Craft</span>
        </Link>
        <nav className={"nav-links " + (open ? "open" : "")}>
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "active" }} onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" activeProps={{ className: "active" }} onClick={() => setOpen(false)}>About</Link>
          <Link to="/contact" activeProps={{ className: "active" }} onClick={() => setOpen(false)}>Contact</Link>
        </nav>
        <button className="nav-burger" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          <span /><span /><span />
        </button>
      </header>
    </>
  );
}

const css = `
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 999;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.1rem clamp(1.2rem, 4vw, 3rem);
  font-family: 'DM Sans', sans-serif;
  transition: background .35s ease, backdrop-filter .35s ease, padding .35s ease;
  background: transparent;
}
.nav-scrolled { background: rgba(13,18,8,.78); backdrop-filter: blur(14px); padding: .65rem clamp(1.2rem,4vw,3rem); border-bottom: 1px solid rgba(140,198,63,.15); }
.nav-logo { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #f5f0e8; text-decoration: none; letter-spacing: .02em; }
.nav-logo span { color: #8cc63f; font-style: italic; }
.nav-links { display: flex; gap: 2rem; }
.nav-links a { color: rgba(245,240,232,.75); text-decoration: none; font-size: .78rem; letter-spacing: .22em; text-transform: uppercase; transition: color .25s; }
.nav-links a:hover, .nav-links a.active { color: #8cc63f; }
.nav-burger { display: none; background: none; border: 0; cursor: pointer; flex-direction: column; gap: 5px; padding: 8px; }
.nav-burger span { display: block; width: 22px; height: 1.5px; background: #f5f0e8; }
@media (max-width: 720px) {
  .nav-burger { display: flex; }
  .nav-links { position: absolute; top: 100%; right: 0; left: 0; flex-direction: column; gap: 0; background: rgba(13,18,8,.96); backdrop-filter: blur(14px); padding: 1.5rem 2rem; transform: translateY(-110%); transition: transform .35s ease; }
  .nav-links.open { transform: translateY(0); }
  .nav-links a { padding: .9rem 0; border-bottom: 1px solid rgba(140,198,63,.08); }
}
`;
