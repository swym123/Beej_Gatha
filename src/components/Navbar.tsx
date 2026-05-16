import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const applyScrolledStyle = scrolled || !isHome;

  return (
    <>
      <style>{css}</style>

      <header className={"nav " + (applyScrolledStyle ? "nav-scrolled" : "")}>
        <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
          Seed<span>Craft</span>
        </Link>

        <nav className={"nav-links " + (open ? "open" : "")}>
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
           <Link to="/product" onClick={() => setOpen(false)}>
            Product
          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link to="/mission" onClick={() => setOpen(false)}>
            Mission
          </Link>
          <Link to="/policy" onClick={() => setOpen(false)}>
            Policy
          </Link>
          <Link to="/careers" onClick={() => setOpen(false)}>
            Careers
          </Link>
          <Link to="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>

        <button
          className="nav-burger"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
    </>
  );
}

const css = `
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem clamp(2rem, 5vw, 4rem);
  font-family: 'Inter', 'DM Sans', sans-serif;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
}

.nav-scrolled {
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 1200px;
  background: rgba(18, 18, 18, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 0.8rem 2rem;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.nav-logo {
  font-family: 'Outfit', 'Playfair Display', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
  letter-spacing: -0.03em;
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-logo span {
  font-style: normal;
  font-weight: 800;
  background: linear-gradient(135deg, #a3e635, #22c55e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.nav-links a {
  position: relative;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #a3e635;
  transition: all 0.3s ease;
  transform: translateX(-50%);
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(163, 230, 53, 0.5);
}

.nav-links a:hover {
  color: #ffffff;
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-burger {
  display: none;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 46px;
  height: 46px;
  transition: all 0.3s ease;
}

.nav-burger:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.nav-burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: #ffffff;
  border-radius: 2px;
  transition: all 0.3s ease;
}

@media (max-width: 860px) {
  .nav-burger {
    display: flex;
  }

  .nav-links {
    position: absolute;
    top: calc(100% + 20px);
    right: 0;
    left: 0;
    flex-direction: column;
    gap: 0;
    background: rgba(18, 18, 18, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 1.5rem;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px) scale(0.95);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
  }

  .nav-links.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scale(1);
  }

  .nav-links a {
    width: 100%;
    padding: 1.2rem;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 1.1rem;
  }
  
  .nav-links a:last-child {
    border-bottom: none;
  }

  .nav-links a::after {
    display: none;
  }

  .nav-links a:hover {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
  }
}
`;