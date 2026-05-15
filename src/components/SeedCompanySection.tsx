"use client";
import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const CARDS_DATA = [
  {
    id: 0,
    tag: "Step 01 · Selection",
    em: "Choosing the",
    h1: "Finest",
    h2: "Seeds",
    desc: "Our agronomists hand-pick parent seeds from the best crop varieties — evaluating yield history, disease resistance, and regional adaptability before a single seed enters our lab.",
    stat: "1000+",
    statLabel: "varieties screened",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1400&auto=format&fit=crop&q=80",
    imgMob: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=70&auto=format&fit=crop",
    mTitle1: "Choosing the",
    mTitle2: "Finest Seeds",
    mDesc: "Hand-picked varieties screened for yield, resistance, and regional adaptability.",
  },
  {
    id: 1,
    tag: "Step 02 · Lab Testing",
    em: "Tested in our",
    h1: "State-of-Art",
    h2: "Laboratory",
    desc: "Every batch undergoes rigorous germination tests, purity analysis, moisture checks, and pathogen screening in our ISO-certified lab — ensuring only the strongest seeds pass through.",
    stat: "99.2%",
    statLabel: "purity standard",
    img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1400&auto=format&fit=crop&q=80",
    imgMob: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=70&auto=format&fit=crop",
    mTitle1: "Tested in our",
    mTitle2: "State-of-Art Lab",
    mDesc: "ISO-certified germination, purity, moisture and pathogen screening on every batch.",
  },
  {
    id: 2,
    tag: "Step 03 · Field Trials",
    em: "Proven in the",
    h1: "Real",
    h2: "Field",
    desc: "Approved seeds are planted across our trial farms in different soil types and climates. We measure growth rate, resistance to stress, and final yield — season after season.",
    stat: "12+",
    statLabel: "trial locations",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1400&auto=format&fit=crop&q=80",
    imgMob: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=70&auto=format&fit=crop",
    mTitle1: "Proven in the",
    mTitle2: "Real Field",
    mDesc: "Trialed across 12+ locations in varying soils and climates before approval.",
  },
  {
    id: 3,
    tag: "Step 04 · Processing & Packaging",
    em: "Cleaned &",
    h1: "Sealed for",
    h2: "Freshness",
    desc: "Seeds are cleaned, graded by size and weight, treated for long shelf life, and sealed in moisture-proof packaging. Every packet is batch-coded and traceable back to its origin.",
    stat: "48hr",
    statLabel: "processing cycle",
    img: "https://images.unsplash.com/photo-1628352081506-83d5b2b60b6e?w=1400&auto=format&fit=crop&q=80",
    imgMob: "https://images.unsplash.com/photo-1628352081506-83d5b2b60b6e?w=800&q=70&auto=format&fit=crop",
    mTitle1: "Cleaned &",
    mTitle2: "Sealed Fresh",
    mDesc: "Graded, treated and moisture-sealed with full batch traceability in 48 hours.",
  },
  {
    id: 4,
    tag: "Step 05 · Delivery to You",
    em: "Straight from",
    h1: "Our Lab",
    h2: "to Your Farm",
    desc: "Orders are dispatched within 24 hours in temperature-controlled packaging. We deliver directly to farmers across India — with full support from our agronomy team at every step.",
    stat: "24hr",
    statLabel: "dispatch guarantee",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&auto=format&fit=crop&q=80",
    imgMob: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=70&auto=format&fit=crop",
    mTitle1: "Straight to",
    mTitle2: "Your Farm",
    mDesc: "Dispatched within 24 hours in temperature-controlled packs, across India.",
  },
];

const STEPS = [
  { n: "01", label: "Seed Selection",  phase: "Selection"    },
  { n: "02", label: "Lab Testing",     phase: "Lab Testing"  },
  { n: "03", label: "Field Trials",    phase: "Field Trials" },
  { n: "04", label: "Processing",      phase: "Processing"   },
  { n: "05", label: "Delivery to You", phase: "Delivery"     },
];

const N = CARDS_DATA.length;
const DEPTHS = [0.018, 0.025, 0.015, 0.022, 0.02];

/* ─────────────────────────────────────────
   SCRIPT LOADER  (loads once, resolves on repeat calls)
───────────────────────────────────────── */
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      // Script tag exists — wait for it to finish if still loading
      if ((window as any).gsap && src.includes("gsap.min")) { resolve(); return; }
      if ((window as any).ScrollTrigger && src.includes("ScrollTrigger")) { resolve(); return; }
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject());
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload  = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.head.appendChild(s);
  });
}

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function SeedCompanySection() {
  const cursorRef  = useRef<HTMLDivElement>(null);
  const ringRef    = useRef<HTMLDivElement>(null);
  const flashRef   = useRef<HTMLDivElement>(null);
  const pBarRef    = useRef<HTMLDivElement>(null);
  const hintRef    = useRef<HTMLDivElement>(null);
  const phLabelRef = useRef<HTMLSpanElement>(null);
  const spacerRef  = useRef<HTMLDivElement>(null);  // ← outer scroll-height container
  const stageRef   = useRef<HTMLDivElement>(null);
  const heroRef    = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const dotRefs  = useRef<Array<HTMLDivElement   | null>>(Array(N).fill(null));
  const stepRefs = useRef<Array<HTMLDivElement   | null>>(Array(N).fill(null));
  const cardRefs = useRef<Array<HTMLDivElement   | null>>(Array(N).fill(null));
  const infoRefs = useRef<Array<HTMLDivElement   | null>>(Array(N).fill(null));
  const imgRefs  = useRef<Array<HTMLImageElement | null>>(Array(N).fill(null));

  useEffect(() => {
    let dead = false;
    const disposers: Array<() => void> = [];

    (async () => {
      /* ── Load GSAP in order ── */
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");
      if (dead) return;

      const gsap: any          = (window as any).gsap;
      const ScrollTrigger: any = (window as any).ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const isMobile = () => window.innerWidth <= 768;

      /* ══ CURSOR (desktop only) ══ */
      if (!isMobile()) {
        const cur  = cursorRef.current;
        const ring = ringRef.current;
        if (cur && ring) {
          let mx = 0, my = 0, rx = 0, ry = 0;
          const onMM = (e: MouseEvent) => {
            mx = e.clientX; my = e.clientY;
            cur.style.left = mx + "px";
            cur.style.top  = my + "px";
          };
          document.addEventListener("mousemove", onMM);
          disposers.push(() => document.removeEventListener("mousemove", onMM));

          let craf: number;
          const animRing = () => {
            rx += (mx - rx) * 0.1;
            ry += (my - ry) * 0.1;
            ring.style.left = rx + "px";
            ring.style.top  = ry + "px";
            craf = requestAnimationFrame(animRing);
          };
          craf = requestAnimationFrame(animRing);
          disposers.push(() => cancelAnimationFrame(craf));

          cardRefs.current.forEach(c => {
            if (!c) return;
            const enter = () => { cur.style.width = "16px"; cur.style.height = "16px"; ring.style.width = "56px"; ring.style.height = "56px"; };
            const leave = () => { cur.style.width =  "9px"; cur.style.height =  "9px"; ring.style.width = "38px"; ring.style.height = "38px"; };
            c.addEventListener("mouseenter", enter);
            c.addEventListener("mouseleave", leave);
            disposers.push(() => { c.removeEventListener("mouseenter", enter); c.removeEventListener("mouseleave", leave); });
          });
        }
      }

      if (isMobile()) return;

      /* ══ DESKTOP ENGINE ══ */
      // Grab DOM nodes — bail early if any are missing (SSR / unmount race)
      const cards     = cardRefs.current;
      const infos     = infoRefs.current;
      const imgs      = imgRefs.current;
      const heroSteps = stepRefs.current;
      const dots      = dotRefs.current;
      const gallery   = galleryRef.current;
      const stageEl   = stageRef.current;
      const spacerEl  = spacerRef.current;
      const stageHero = heroRef.current;
      const hint      = hintRef.current;
      const pBar      = pBarRef.current;
      const flash     = flashRef.current;
      const phLabel   = phLabelRef.current;

      if (!gallery || !stageEl || !spacerEl || !stageHero || !hint || !pBar || !flash || !phLabel) return;
      if (cards.some(c => !c) || imgs.some(img => !img)) return;

      /* ── SCATTER POSITIONS ── */
      function getScattered(VW: number, VH: number, tW: number, tH: number) {
        return [
          { leftFrac: 0.450, topFrac: 0.080 },
          { leftFrac: 0.680, topFrac: 0.180 },
          { leftFrac: 0.460, topFrac: 0.400 },
          { leftFrac: 0.680, topFrac: 0.530 },
          { leftFrac: 0.460, topFrac: 0.710 },
        ].map(({ leftFrac, topFrac }) => ({
          left: Math.min(VW * leftFrac, VW - tW - 20),
          top:  Math.min(VH * topFrac,  VH - tH - 20),
          w: tW,
          h: tH,
        }));
      }

      /* ── MOUSE PARALLAX (scatter phase only) ── */
      let mouseX = 0, mouseY = 0, lerpX = 0, lerpY = 0;
      let basePos: Array<{ left: number; top: number }> = [];
      let scrollPhase = 0;
      let rafId: number | null = null;

      const onMM2 = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      document.addEventListener("mousemove", onMM2);
      disposers.push(() => document.removeEventListener("mousemove", onMM2));

      function startParallaxLoop() {
        if (rafId) return;
        const loop = () => {
          rafId = requestAnimationFrame(loop);
          if (scrollPhase > 0.05) return;
          lerpX += (mouseX - lerpX) * 0.08;
          lerpY += (mouseY - lerpY) * 0.08;
          cards.forEach((card, i) => {
            if (!card || !basePos[i]) return;
            gsap.set(card, {
              x: lerpX * DEPTHS[i] * window.innerWidth,
              y: lerpY * DEPTHS[i] * window.innerHeight,
            });
          });
        };
        loop();
      }
      disposers.push(() => { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } });

      /* ── LAYOUT ── */
      let st: any = null;
      let tl: any = null;
      let lastActive = -1;

      function buildLayout() {
        const VW = window.innerWidth;
        const VH = window.innerHeight;
        const tW       = Math.max(120, Math.min(Math.round(VW * 0.155), 200));
        const tH       = Math.round(tW * 0.66);
        const CARD_W   = VW * 0.8;
        const CARD_H   = VH * 0.65;
        const CARD_GAP = VH * 0.2;
        const stackLeft = (VW - CARD_W) / 2;
        const STACK_TOP = (VH - CARD_H) / 2;
        const cardTop   = (i: number) => STACK_TOP + i * (CARD_H + CARD_GAP);
        const panAmt    = (N - 1) * (CARD_H + CARD_GAP);
        const scattered = getScattered(VW, VH, tW, tH);
        basePos = scattered.map(s => ({ left: s.left, top: s.top }));
        const snapPoints = Array.from({ length: N }, (_, i) =>
          0.5 + (i / (N - 1)) * 0.5
        );

        // ── KEY FIX: give the spacer div exactly the scroll height GSAP needs.
        // This ensures the page has enough room for the full 9×VH animation
        // regardless of what other sections exist above/below in your React app.
        const scrollDist = VH * 9;
        spacerEl.style.height = `${VH + scrollDist}px`;

        return { VW, VH, tW, tH, CARD_W, CARD_H, CARD_GAP, stackLeft, STACK_TOP, cardTop, panAmt, scattered, snapPoints, scrollDist };
      }

      /* ── PER-TICK UPDATE ── */
      function updateActiveCard(progress: number, L: ReturnType<typeof buildLayout>) {
        scrollPhase = progress;
        const panProgress = Math.max(0, (progress - 0.5) / 0.5);

        pBar.style.width  = progress * 100 + "%";
        hint.style.opacity = progress < 0.04 ? "1" : "0";

        gsap.set(stageHero, {
          opacity: Math.max(0, 1 - progress * 3.5),
          y: progress * -60,
        });

        const idx = Math.min(N - 1, Math.round(panProgress * (N - 1)));
        if (idx !== lastActive) {
          dots.forEach((d, j)  => d?.classList.toggle("active", j === idx));
          phLabel.textContent  = STEPS[idx].phase;
          heroSteps.forEach((s, j) => s?.classList.toggle("active", j === idx));
          lastActive = idx;
          if (progress > 0.5) {
            gsap.fromTo(flash, { opacity: 0.08 }, { opacity: 0, duration: 0.5, ease: "power2.out" });
          }
        }

        /* Pre-stack: reset all cards */
        if (progress < 0.45) {
          cards.forEach((card, i) => {
            if (!card) return;
            gsap.set(card,     { scale: 1, opacity: 1 });
            gsap.set(infos[i], { opacity: 0, y: 0 });
            gsap.set(imgs[i],  { yPercent: -10 });
          });
          return;
        }

        /* Pan phase: scale + text + parallax */
        const galY = gsap.getProperty(gallery, "y") as number;
        cards.forEach((card, i) => {
          if (!card) return;
          const cardCentre  = L.cardTop(i) + L.CARD_H / 2 + galY;
          const normDist    = (cardCentre - L.VH / 2) / L.VH;
          const absDist     = Math.abs(normDist);
          const scaleFactor = 1 - 0.2 * Math.min(absDist / 0.5, 1);
          const cardOpacity = Math.max(0, 1 - absDist * 2.0);
          gsap.set(card, { scale: scaleFactor, opacity: cardOpacity });
          const textOpacity = Math.max(0, 1 - absDist * 3);
          gsap.set(infos[i], { opacity: textOpacity, y: normDist * -20 });
          gsap.set(imgs[i],  { yPercent: normDist * 20 - 10 });
        });
      }

      /* ── INIT ── */
      function init() {
        if (st) { st.kill(); st = null; }
        if (tl) { tl.kill(); tl = null; }
        ScrollTrigger.clearScrollMemory();
        ScrollTrigger.refresh();
        lastActive = -1; scrollPhase = 0; lerpX = 0; lerpY = 0;

        const L = buildLayout();

        cards.forEach((card, i) => {
          if (!card) return;
          const s = L.scattered[i];
          gsap.set(card, {
            left: s.left, top: s.top,
            width: s.w,   height: s.h,
            borderRadius: 6, zIndex: i + 1,
            x: 0, y: 0, opacity: 1,
            clearProps: "boxShadow",
          });
          card.classList.remove("sc-expanded");
          gsap.set(infos[i], { opacity: 0, y: 12 });
          gsap.set(imgs[i],  { yPercent: -10 });
        });
        gsap.set(gallery,   { y: 0 });
        gsap.set(stageHero, { opacity: 1, y: 0 });

        /* Timeline */
        tl = gsap.timeline({ defaults: { overwrite: "auto" } });

        /* Phase 1 (0→1): scatter → stack */
        cards.forEach((card, i) => {
          if (!card) return;
          const s = L.scattered[i];
          tl.fromTo(
            card,
            { left: s.left, top: s.top, width: s.w, height: s.h, borderRadius: 6, x: 0, y: 0, scale: 1, opacity: 1 },
            {
              left: L.stackLeft, top: L.cardTop(i),
              width: L.CARD_W,   height: L.CARD_H,
              borderRadius: 12, x: 0, y: 0, scale: 1, opacity: 1,
              ease: "power3.inOut", duration: 1, overwrite: "auto",
              onUpdate() {
                card.classList.toggle("sc-expanded", card.offsetWidth / L.CARD_W > 0.5);
              },
              onReverseComplete() { card.classList.remove("sc-expanded"); },
            },
            0
          );
        });

        /* Phase 2 (1→2): pan gallery upward */
        tl.fromTo(
          gallery,
          { y: 0 },
          { y: -L.panAmt, ease: "none", duration: 1, overwrite: "auto" },
          1
        );

        /* ── THE CORE HEIGHT FIX ──
           trigger  = spacerEl  → ScrollTrigger watches the spacer's scroll position.
                                   The spacer has explicit height (VH + 9×VH) so
                                   the browser always allocates the full scroll range.
           pin      = stageEl   → The visible stage gets pinned (stays on screen).
           pinSpacing: false    → Don't let GSAP insert its own spacer div — we
                                   already have one. Without this, GSAP doubles the
                                   scroll height and the section ends at the wrong time.
        ── */
        st = ScrollTrigger.create({
          trigger:    spacerEl,
          start:      "top top",
          end:        `+=${L.scrollDist}`,
          pin:        stageEl,
          pinSpacing: false,
          scrub:      0.8,
          animation:  tl,
          anticipatePin:       1,
          invalidateOnRefresh: true,
          snap: {
            snapTo(value: number) {
              if (value < 0.48) return value;
              let closest = L.snapPoints[0], minDist = Infinity;
              for (const p of L.snapPoints) {
                const d = Math.abs(value - p);
                if (d < minDist) { minDist = d; closest = p; }
              }
              return closest;
            },
            duration: { min: 0.2, max: 0.6 },
            delay: 0.05,
            ease: "power2.inOut",
          },
          onUpdate(self: any) { updateActiveCard(self.progress, L); },
        });

        startParallaxLoop();
      }

      /* ── DOT NAV ── */
      dots.forEach((dot, i) => {
        if (!dot) return;
        const onClick = () => {
          if (!st) return;
          const tp = 0.5 + (i / (N - 1)) * 0.5;
          window.scrollTo({ top: st.start + tp * (st.end - st.start), behavior: "smooth" });
        };
        dot.addEventListener("click", onClick);
        disposers.push(() => dot.removeEventListener("click", onClick));
      });

      /* ── RESIZE ── */
      let resizeTimer: ReturnType<typeof setTimeout> | null = null;
      const onResize = () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (isMobile()) { location.reload(); return; }
          init();
        }, 220);
      };
      window.addEventListener("resize", onResize);
      disposers.push(() => { window.removeEventListener("resize", onResize); if (resizeTimer) clearTimeout(resizeTimer); });

      disposers.push(() => {
        if (st) { st.kill(); st = null; }
        if (tl) { tl.kill(); tl = null; }
        ScrollTrigger.getAll().forEach((t: any) => t.kill());
      });

      init();
    })();

    return () => {
      dead = true;
      disposers.forEach(fn => fn());
    };
  }, []);

  /* ─────────────────────────────────────────
     RENDER
  ───────────────────────────────────────── */
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Cursor */}
      <div id="sc-cursor"      ref={cursorRef} />
      <div id="sc-cursor-ring" ref={ringRef}   />

      {/* Fixed overlays */}
      <div id="sc-flash"    ref={flashRef} />
      <div id="sc-progress" ref={pBarRef}  />

      {/* Scroll hint */}
      <div id="sc-hint" ref={hintRef}>
        <div className="sc-hint-line" />
        <span>Scroll</span>
      </div>

      {/* Top nav */}
      <nav id="sc-nav">
        <div className="sc-nav-logo">SeedCraft Labs</div>
        <div className="sc-nav-right">
          <div className="sc-nav-phase">
            <span ref={phLabelRef}>Explore</span> our seed journey
          </div>
          <div className="sc-nav-lines"><i /><i /><i /></div>
        </div>
      </nav>

      {/* Dot nav */}
      <div id="sc-dotnav">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={"sc-dot" + (i === 0 ? " active" : "")}
            ref={el => { dotRefs.current[i] = el; }}
          />
        ))}
      </div>

      {/* ── SCROLL SPACER: reserves exact scroll height for GSAP pin ── */}
      {/* ── DESKTOP STAGE ── */}
      <div id="sc-spacer" ref={spacerRef}>
      <div id="sc-stage" ref={stageRef}>

        {/* Left hero panel */}
        <div id="sc-hero" ref={heroRef}>
          <div className="sc-hero-eyebrow">Our Process</div>
          <div className="sc-hero-title">
            From Lab<br />to <em>Your</em><br />Farm.
          </div>
          <p className="sc-hero-desc">
            Every seed we deliver has passed through five rigorous steps — ensuring
            the crop you grow is the strongest it can be.
          </p>
          <div className="sc-hero-steps">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={"sc-hero-step" + (i === 0 ? " active" : "")}
                data-n={s.n}
                ref={el => { stepRefs.current[i] = el; }}
              >
                {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* Gallery — cards positioned by GSAP */}
        <div id="sc-gallery" ref={galleryRef}>
          {CARDS_DATA.map((c, i) => (
            <div
              key={c.id}
              className="sc-card"
              ref={el => { cardRefs.current[i] = el; }}
            >
              {/* Oversized image wrapper for parallax headroom */}
              <div className="sc-card-imgwrap">
                <img
                  src={c.img}
                  alt={c.tag}
                  ref={el => { imgRefs.current[i] = el; }}
                />
              </div>

              <div
                className="sc-card-info"
                ref={el => { infoRefs.current[i] = el; }}
              >
                <div className="sc-card-eyebrow">{c.tag}</div>
                <div className="sc-card-title">
                  <em>{c.em}</em>
                  {c.h1}<br />{c.h2}
                </div>
                <div className="sc-card-bottom">
                  <p className="sc-card-desc">{c.desc}</p>
                  <div className="sc-card-stat">
                    <strong>{c.stat}</strong>
                    <span>{c.statLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>{/* /sc-spacer */}

      {/* After section */}
      <div id="sc-after">
        <h2>One Seed.<br /><em>Infinite Potential.</em></h2>
        <p>
          Every seed we send you has been selected, tested, trialed, and packed with
          care — because we believe the future of farming begins with a seed you can trust.
        </p>
        <div className="sc-after-grid">
          <div className="sc-after-stat"><strong>5</strong><span>Step Process</span></div>
          <div className="sc-after-stat"><strong>200+</strong><span>Varieties</span></div>
          <div className="sc-after-stat"><strong>24hr</strong><span>Dispatch</span></div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div id="sc-mobile">
        <div className="sc-m-hero">
          <div>
            <p className="sc-m-eyebrow">SeedCraft Labs</p>
            <h1>Five steps.<br /><em>One promise.</em></h1>
            <div className="sc-m-scrollhint">Scroll to explore</div>
          </div>
        </div>
        <div className="sc-m-cards">
          {CARDS_DATA.map(c => (
            <div key={c.id} className="sc-m-card">
              <img src={c.imgMob} alt={c.tag} />
              <div className="sc-m-card-info">
                <span className="sc-m-tag">{c.tag}</span>
                <div className="sc-m-title">
                  <em>{c.mTitle1}</em>{c.mTitle2}
                </div>
                <p className="sc-m-desc">{c.mDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

:root {
  --sc-accent: #c8f000;
  --sc-bg:     #151412;
  --sc-text:   #f0ede6;
  --sc-muted:  rgba(240,237,230,0.42);
}

/* ── CURSOR ── */
#sc-cursor {
  position: fixed; width: 9px; height: 9px;
  background: var(--sc-accent); border-radius: 50%;
  pointer-events: none; z-index: 8999;
  transform: translate(-50%,-50%);
  transition: width .3s cubic-bezier(.22,1,.36,1), height .3s cubic-bezier(.22,1,.36,1);
  mix-blend-mode: difference; will-change: left, top;
}
#sc-cursor-ring {
  position: fixed; width: 38px; height: 38px;
  border: 1px solid rgba(200,240,0,.35); border-radius: 50%;
  pointer-events: none; z-index: 8998;
  transform: translate(-50%,-50%); will-change: left, top;
}

/* ── NAV ── */
#sc-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 700;
  display: flex; justify-content: space-between; align-items: center;
  padding: clamp(1rem,2.5vw,1.8rem) clamp(1.2rem,4vw,3rem);
  pointer-events: none; font-family: 'DM Sans', sans-serif;
}
.sc-nav-logo {
  font-size: clamp(8px,1vw,10px); letter-spacing: .22em;
  text-transform: uppercase; color: rgba(240,237,230,.55);
}
.sc-nav-right { display: flex; align-items: center; gap: clamp(1rem,2.5vw,2.5rem); }
.sc-nav-phase {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(10px,1.2vw,12px); font-style: italic; color: var(--sc-muted);
}
.sc-nav-phase span { color: var(--sc-accent); font-style: normal; }
.sc-nav-lines { display: flex; flex-direction: column; gap: 5px; }
.sc-nav-lines i { display: block; height: 1px; background: rgba(240,237,230,.35); }
.sc-nav-lines i:nth-child(1) { width: 22px; }
.sc-nav-lines i:nth-child(2) { width: 14px; }
.sc-nav-lines i:nth-child(3) { width: 22px; }

/* ── PROGRESS BAR ── */
#sc-progress {
  position: fixed; bottom: 0; left: 0; height: 2px;
  background: var(--sc-accent); width: 0%; z-index: 700;
  pointer-events: none; transition: width .12s linear;
}

/* ── SCROLL HINT ── */
#sc-hint {
  position: fixed; bottom: 2.5rem; left: 50%;
  transform: translateX(-50%); z-index: 700; pointer-events: none;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  transition: opacity .6s; font-family: 'DM Sans', sans-serif;
}
#sc-hint span { font-size: 9px; letter-spacing: .22em; text-transform: uppercase; color: var(--sc-muted); }
.sc-hint-line {
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, var(--sc-accent), transparent);
  animation: sc-hint-drop 2.2s ease-in-out infinite;
}
@keyframes sc-hint-drop {
  0%   { transform: scaleY(0); transform-origin: top;    opacity: 0; }
  40%  { transform: scaleY(1); transform-origin: top;    opacity: 1; }
  80%  { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
  100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
}

/* ── DOT NAV ── */
#sc-dotnav {
  position: fixed; right: clamp(1rem,2.5vw,2.2rem); top: 50%;
  transform: translateY(-50%); z-index: 700;
  display: flex; flex-direction: column; gap: 14px;
}
.sc-dot {
  width: 6px; height: 6px; border-radius: 50%;
  border: 1px solid rgba(240,237,230,.3);
  background: transparent; cursor: pointer;
  transition: all .4s cubic-bezier(.22,1,.36,1);
}
.sc-dot.active { background: var(--sc-accent); border-color: var(--sc-accent); transform: scale(1.5); }

/* ── FLASH ── */
#sc-flash {
  position: fixed; inset: 0; z-index: 600;
  background: var(--sc-bg); opacity: 0; pointer-events: none;
}

/* ── SCROLL SPACER ──
   Reserves the full scroll height (100vh stage + 9×VH animation).
   Height is also set dynamically in JS on init/resize.
   pinSpacing:false on ScrollTrigger means GSAP won't add its own spacer.
── */
#sc-spacer {
  position: relative;
  height: 1000vh;   /* fallback before JS runs: 100vh + 9×100vh */
  width: 100%;
}

/* ── STAGE ── */
#sc-stage {
  position: relative; width: 100%; height: 100vh;
  overflow: hidden; background: var(--sc-bg);
  font-family: 'DM Sans', sans-serif; color: var(--sc-text);
}

/* ── LEFT HERO ── */
#sc-hero {
  position: absolute;
  left: clamp(2rem, 5vw, 5rem); top: 50%;
  transform: translateY(-50%);
  z-index: 10; max-width: min(380px, 38vw);
  pointer-events: none; will-change: opacity, transform;
}
.sc-hero-eyebrow {
  font-size: clamp(8px, .85vw, 10px); letter-spacing: .22em;
  text-transform: uppercase; color: var(--sc-accent);
  margin-bottom: clamp(.8rem, 1.5vw, 1.4rem);
  display: flex; align-items: center; gap: 12px;
}
.sc-hero-eyebrow::before {
  content: ''; display: block; width: 28px; height: 1px;
  background: var(--sc-accent); flex-shrink: 0;
}
.sc-hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.8rem, 5.5vw, 6.5rem);
  font-weight: 300; line-height: .92;
  color: var(--sc-text); letter-spacing: -.01em;
  margin-bottom: clamp(1rem, 2vw, 2rem);
}
.sc-hero-title em { font-style: italic; color: var(--sc-accent); }
.sc-hero-desc {
  font-size: clamp(12px, 1.1vw, 14px); line-height: 1.8;
  color: rgba(240,237,230,.55); font-weight: 300;
  margin-bottom: clamp(1.5rem, 2.5vw, 2.5rem);
}
.sc-hero-steps { display: flex; flex-direction: column; gap: 10px; }
.sc-hero-step {
  display: flex; align-items: center; gap: 12px;
  font-size: clamp(9px, .9vw, 11px); letter-spacing: .12em;
  text-transform: uppercase; color: rgba(240,237,230,.35); transition: color .3s;
}
.sc-hero-step::before {
  content: attr(data-n);
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1rem, 1.8vw, 1.4rem); font-weight: 300;
  color: var(--sc-accent); opacity: .5; min-width: 1.4rem; line-height: 1;
}
.sc-hero-step.active { color: rgba(240,237,230,.75); }
.sc-hero-step.active::before { opacity: 1; }

/* ── GALLERY ──
   FIX: overflow must be visible so cards that start outside the stage
   boundary during the scatter phase are not clipped.
   GSAP positions them via absolute left/top, so we need the gallery
   itself to not clip its children.
── */
#sc-gallery {
  position: absolute; inset: 0;
  overflow: visible;       /* ← was missing; cards outside stage were invisible */
  pointer-events: none;
  z-index: 1;
}

/* ── CARD ── */
.sc-card {
  position: absolute; overflow: hidden;
  will-change: transform, opacity; pointer-events: all;
  backface-visibility: hidden; -webkit-backface-visibility: hidden;
  transform: translateZ(0);
}

/* ── IMAGE WRAPPER — 120% tall for parallax headroom ── */
.sc-card-imgwrap {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;     /* matches card */
  overflow: hidden;              /* clips the oversized img to the card */
  will-change: transform;
  backface-visibility: hidden; -webkit-backface-visibility: hidden;
}
.sc-card-imgwrap img {
  width: 100%;
  height: 120%;                  /* extra 20% gives parallax room */
  object-fit: cover; display: block;
  pointer-events: none; user-select: none;
  will-change: transform;
  transform: translate3d(0, -10%, 0);   /* GPU start position */
  backface-visibility: hidden; -webkit-backface-visibility: hidden;
}

/* ── VIGNETTE ── */
.sc-card::after {
  content: ''; position: absolute; inset: 0; z-index: 1;
  background:
    linear-gradient(to right, rgba(0,0,0,.72) 0%, rgba(0,0,0,.15) 55%, rgba(0,0,0,.42) 100%),
    linear-gradient(to top,   rgba(0,0,0,.72) 0%, transparent 55%);
  opacity: 0; transition: opacity .6s;
}
.sc-card.sc-expanded::after { opacity: 1; }

/* ── CARD INFO ── */
.sc-card-info {
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
  padding: clamp(1.2rem,3vw,2.8rem) clamp(1.4rem,3.5vw,3.2rem) clamp(1rem,2.5vw,2.4rem);
  opacity: 0; pointer-events: none; will-change: opacity, transform;
}
.sc-card-eyebrow {
  font-size: clamp(8px,.9vw,10px); letter-spacing: .22em; text-transform: uppercase;
  color: var(--sc-accent); margin-bottom: clamp(.5rem,1vw,1rem);
  display: flex; align-items: center; gap: 12px;
}
.sc-card-eyebrow::before {
  content: ''; display: block; width: 28px; height: 1px;
  background: var(--sc-accent); flex-shrink: 0;
}
.sc-card-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem,6vw,7.5rem);
  font-weight: 300; line-height: .9; color: var(--sc-text); letter-spacing: -.01em;
}
.sc-card-title em {
  font-style: italic; color: rgba(240,237,230,.5);
  font-size: .6em; display: block; margin-bottom: .1em; letter-spacing: .02em;
}
.sc-card-bottom {
  display: flex; align-items: flex-end; justify-content: space-between;
  margin-top: clamp(.8rem,2vw,2rem); gap: 1rem; flex-wrap: wrap;
}
.sc-card-desc {
  max-width: min(440px, 55%); font-size: clamp(11px,1.1vw,13.5px);
  line-height: 1.75; color: rgba(240,237,230,.65); font-weight: 300;
}
.sc-card-stat { text-align: right; flex-shrink: 0; }
.sc-card-stat strong {
  display: block; font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem,4.5vw,4.2rem); font-weight: 300;
  color: var(--sc-accent); line-height: 1;
}
.sc-card-stat span {
  font-size: clamp(8px,.8vw,9px); letter-spacing: .16em;
  text-transform: uppercase; color: var(--sc-muted);
}

/* ── AFTER SECTION ── */
#sc-after {
  background: var(--sc-bg);
  padding: clamp(6rem,12vw,12rem) 5vw clamp(4rem,8vw,10rem);
  text-align: center; font-family: 'DM Sans', sans-serif; color: var(--sc-text);
}
#sc-after h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem,8vw,10rem);
  font-weight: 300; line-height: .9; letter-spacing: -.01em;
}
#sc-after h2 em { font-style: italic; color: var(--sc-accent); }
#sc-after p {
  margin: 2rem auto 0; max-width: 480px;
  font-size: clamp(13px,1.2vw,15px); color: var(--sc-muted);
  line-height: 1.85; font-weight: 300;
}
.sc-after-grid {
  display: grid; grid-template-columns: repeat(3,1fr);
  gap: 1px; background: rgba(255,255,255,.06);
  margin: clamp(3rem,6vw,6rem) auto 0; max-width: 660px;
}
.sc-after-stat { padding: clamp(1.5rem,3vw,3rem) 1rem; background: var(--sc-bg); text-align: center; }
.sc-after-stat strong {
  display: block; font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem,5vw,4rem); font-weight: 300; color: var(--sc-accent);
}
.sc-after-stat span { font-size: 10px; color: var(--sc-muted); letter-spacing: .12em; text-transform: uppercase; }

/* ── MOBILE ── */
#sc-mobile { display: none; }

@media (max-width: 768px) {
  body { cursor: auto; }
  #sc-cursor, #sc-cursor-ring, #sc-dotnav,
  #sc-hint, #sc-flash, #sc-progress, #sc-nav { display: none; }
  #sc-spacer, #sc-stage, #sc-after { display: none; }
  #sc-mobile { display: block; background: var(--sc-bg); }

  .sc-m-hero {
    min-height: 100svh; display: flex; align-items: flex-end;
    padding: 2rem 1.4rem 3.5rem; background: var(--sc-bg);
    font-family: 'DM Sans', sans-serif; color: var(--sc-text);
  }
  .sc-m-eyebrow { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--sc-accent); margin-bottom: 1.1rem; }
  .sc-m-hero h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(3.5rem,16vw,5.5rem); font-weight: 300; line-height: .92; color: var(--sc-text); }
  .sc-m-hero h1 em { font-style: italic; color: var(--sc-accent); }
  .sc-m-scrollhint {
    margin-top: 2.2rem; display: flex; align-items: center; gap: 10px;
    font-size: 9px; letter-spacing: .18em; text-transform: uppercase; color: var(--sc-muted);
  }
  .sc-m-scrollhint::before {
    content: ''; width: 1px; height: 32px;
    background: linear-gradient(to bottom, transparent, var(--sc-accent));
    animation: sc-pulse 2s ease-in-out infinite;
  }
  @keyframes sc-pulse { 0%,100%{opacity:.4} 50%{opacity:1} }

  .sc-m-cards { display: flex; flex-direction: column; gap: 4px; }
  .sc-m-card { position: relative; overflow: hidden; width: 100%; height: 72vw; max-height: 360px; }
  .sc-m-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .sc-m-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.78) 0%, transparent 55%); }
  .sc-m-card-info { position: absolute; bottom: 0; left: 0; right: 0; z-index: 1; padding: 1.8rem 1.4rem 1.4rem; font-family: 'DM Sans', sans-serif; }
  .sc-m-tag { display: inline-block; font-size: 9px; letter-spacing: .15em; text-transform: uppercase; color: var(--sc-accent); border: 1px solid var(--sc-accent); padding: 2px 8px; border-radius: 2px; margin-bottom: .6rem; }
  .sc-m-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.4rem,11vw,4rem); font-weight: 300; line-height: .9; color: var(--sc-text); }
  .sc-m-title em { font-style: italic; color: rgba(240,237,230,.55); font-size: .7em; display: block; }
  .sc-m-desc { margin-top: .5rem; font-size: 12px; line-height: 1.65; color: rgba(240,237,230,.65); }
}
`;