import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import ScrollVideoSection from "../components/ScrollVideoSection";
import SeedCompanySection from "../components/SeedCompanySection";
import ScientistsSection from "../components/ScientistsSection";
import MissionSection from "../components/MissionSection";
import EnergySection from "../components/EnergySection";

import { sharedHeadLinks } from "../components/SiteHead";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Beej Gatha — हर खेत में हरियाली" },
      { name: "description", content: "From lab to field — Beej Gatha brings honest, science-tested seeds to every Indian farmer." },
      { property: "og:title", content: "Beej Gatha — हर खेत में हरियाली" },
      { property: "og:description", content: "An immersive scroll experience from seed to harvest, and the science behind every batch." },
    ],
    links: sharedHeadLinks,
  }),
});

function Home() {
  useEffect(() => {
    const pbar = document.getElementById("pbar");
    const onProg = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (pbar) pbar.style.width = pct + "%";
    };
    window.addEventListener("scroll", onProg, { passive: true });
    return () => window.removeEventListener("scroll", onProg);
  }, []);

  return (
    <div style={{ overflowX: "hidden", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`#pbar { position: fixed; top: 0; left: 0; height: 2px; width: 0%; background: linear-gradient(90deg, #3d6b2f, #8cc63f); z-index: 1000; transition: width 60ms linear; }`}</style>
      <Loader />
      <div id="pbar" />
      <Navbar />
  
      <ScrollVideoSection />
      <SeedCompanySection />
      <ScientistsSection />
      <MissionSection />
      <EnergySection />
      <Footer/>
    </div>
  );
}
