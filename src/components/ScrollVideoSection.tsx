import { useEffect, useRef } from "react";

const SEED_VIDEO_SRC = "public/seed_plant copy.mp4";

const CHAPTERS: [number, number, string, string][] = [
  [0.0,  0.25, "The Seed",   "Dormant · Patient · Ready"],
  [0.25, 0.5,  "Awakening",  "Breaking Ground · First Light"],
  [0.5,  0.75, "Rising",     "Reaching · Unfolding · Stretching"],
  [0.75, 1.0,  "Full Bloom", "Alive · Flourishing · Complete"],
];

// Smoothing factor: lower = smoother but more lag (0.06–0.12 is the sweet spot)
const LERP_FACTOR = 0.09;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function ScrollVideoSection() {
  const wrapRef     = useRef<HTMLDivElement>(null);
  const vidRef      = useRef<HTMLVideoElement>(null);
  const stageRef    = useRef<HTMLElement>(null);
  const pctNumRef   = useRef<HTMLDivElement>(null);
  const chapNameRef = useRef<HTMLDivElement>(null);
  const chapSubRef  = useRef<HTMLDivElement>(null);
  const dirArrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap     = wrapRef.current;
    const vid      = vidRef.current;
    const stage    = stageRef.current;
    const pctNum   = pctNumRef.current;
    const chapName = chapNameRef.current;
    const chapSub  = chapSubRef.current;
    const dirArrow = dirArrowRef.current;

    if (!wrap || !vid || !stage) return;

    /* ── Intersection observer ── */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      },
      { root: wrap, threshold: 0.15 },
    );
    wrap.querySelectorAll(".a-item").forEach((el) => io.observe(el));

    let lastChapIdx = -1;
    let lastProg    = 0;

    // ── Smooth scrub state ──
    // targetTime: where scroll says we SHOULD be
    // The rAF loop lerps currentTime toward it each frame
    let targetTime = 0;
    let rafId      = 0;
    let isSeeking  = false;

    const updateChapter = (prog: number) => {
      for (let i = 0; i < CHAPTERS.length; i++) {
        const [s, e] = CHAPTERS[i];
        if (prog >= s && (prog < e || i === CHAPTERS.length - 1)) {
          if (i === lastChapIdx) return;
          lastChapIdx = i;
          chapName?.classList.remove("show");
          chapSub?.classList.remove("show");
          requestAnimationFrame(() => {
            if (chapName) chapName.textContent = CHAPTERS[i][2];
            if (chapSub)  chapSub.textContent  = CHAPTERS[i][3];
            requestAnimationFrame(() => {
              chapName?.classList.add("show");
              chapSub?.classList.add("show");
            });
          });
          return;
        }
      }
    };

    // ── rAF loop: runs every frame, smoothly moves currentTime → targetTime ──
    const tick = () => {
      if (vid.duration && !isNaN(vid.duration) && !isSeeking) {
        const diff = targetTime - vid.currentTime;

        if (Math.abs(diff) > 0.001) {
          // Lerp: each frame we close 9% of the remaining gap → silky smooth
          const next = lerp(vid.currentTime, targetTime, LERP_FACTOR);
          try {
            // fastSeek() (Safari) is less accurate but much faster for scrubbing
            if ((vid as any).fastSeek) {
              (vid as any).fastSeek(next);
            } else {
              vid.currentTime = next;
            }
          } catch { /* ignore seek errors during rapid scroll */ }
        }

        // Update progress % display in the loop so it also interpolates smoothly
        const prog = vid.duration > 0 ? vid.currentTime / vid.duration : 0;
        if (pctNum) {
          pctNum.innerHTML = Math.round(prog * 100) + '<small style="font-size:.45em">%</small>';
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    // ── Scroll handler: only updates targetTime and UI, no direct seeking ──
    const onScroll = () => {
      if (!vid.duration || isNaN(vid.duration)) return;

      const scrolled = wrap.scrollTop - stage.offsetTop;
      const total    = stage.offsetHeight - wrap.clientHeight;
      const prog     = Math.max(0, Math.min(1, scrolled / total));

      // Just set the target — the rAF loop handles the actual seek
      targetTime = prog * vid.duration;

      // Direction arrow (instant feedback is fine here)
      if (dirArrow) {
        dirArrow.style.transform = prog >= lastProg ? "rotate(0deg)" : "rotate(180deg)";
      }
      lastProg = prog;

      updateChapter(prog);
    };

    // Prevent overlapping seeks from firing during a seek operation
    vid.addEventListener("seeking",  () => { isSeeking = true;  });
    vid.addEventListener("seeked",   () => { isSeeking = false; });
    vid.addEventListener("loadedmetadata", onScroll);

    wrap.addEventListener("scroll", onScroll, { passive: true });

    // Start the rAF loop immediately
    rafId = requestAnimationFrame(tick);

    if (vid.readyState >= 1) onScroll();

    return () => {
      cancelAnimationFrame(rafId);
      wrap.removeEventListener("scroll", onScroll);
      vid.removeEventListener("loadedmetadata", onScroll);
      vid.removeEventListener("seeking",  () => { isSeeking = true; });
      vid.removeEventListener("seeked",   () => { isSeeking = false; });
      io.disconnect();
    };
  }, []);

  return (
    <>
      <style>{css}</style>

      <div className="sv-wrap" ref={wrapRef}>

        {/* ══ INTRO ══ */}
        <section className="sv-intro">
          <p className="sv-intro-tag">A scroll experience</p>
          <h1 className="sv-intro-h1">
            From Seed<br />to <span>Life</span>
          </h1>
          <div className="sv-intro-hint">
            <p>Scroll to explore</p>
            <div className="sv-ticker" />
          </div>
        </section>

        {/* ══ VIDEO SCRUB ══ */}
        <section
          className="sv-scrub-stage"
          ref={stageRef as React.RefObject<HTMLElement>}
        >
          <div className="sv-video-sticky">
            <video
              ref={vidRef}
              muted
              playsInline
              preload="auto"
              crossOrigin="anonymous"
            >
              <source src={SEED_VIDEO_SRC} type="video/mp4" />
            </video>

            <div className="sv-chap-wrap">
              <div className="sv-chap-name" ref={chapNameRef}>The Seed</div>
              <div className="sv-chap-sub"  ref={chapSubRef}>Dormant · Patient · Ready</div>
            </div>

            <div className="sv-pct-badge">
              <div className="sv-pct-num" ref={pctNumRef}>
                0<small style={{ fontSize: ".45em" }}>%</small>
              </div>
              <div className="sv-pct-label">Growth</div>
            </div>

            <div className="sv-dir-arrow" ref={dirArrowRef}>
              <svg viewBox="0 0 24 24">
                <polyline points="12 5 12 19" />
                <polyline points="6 13 12 19 18 13" />
              </svg>
            </div>
          </div>
        </section>

        {/* ══ IMAGE REVEAL ══ */}
        <section className="sv-reveal">
          <div className="sv-reveal-inner">
            <div className="sv-reveal-img">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&auto=format&fit=crop&q=85"
                alt="Young plant growing from rich earth"
                loading="lazy"
              />
            </div>
            <div className="sv-reveal-text">
              <div className="sv-tag-line a-item">
                <div className="sv-dash" />
                <span>Nature's Miracle</span>
              </div>
              <h2 className="a-item" style={{ transitionDelay: ".1s" }}>
                Every great<br />forest begins<br />with one <i>seed.</i>
              </h2>
              <p className="a-item" style={{ transitionDelay: ".2s" }}>
                Buried in darkness, nourished by rain, warmed by the sun — a tiny
                seed carries within it the blueprint of an entire tree. Growth is
                not sudden. It is steady, deliberate, and inevitable.
              </p>
              <div className="sv-facts">
                <div className="sv-fact a-item" style={{ transitionDelay: ".3s" }}>
                  <div className="sv-fact-n">48<small>h</small></div>
                  <div className="sv-fact-l">First Sprout</div>
                </div>
                <div className="sv-fact a-item" style={{ transitionDelay: ".4s" }}>
                  <div className="sv-fact-n">7<small>d</small></div>
                  <div className="sv-fact-l">First Leaf</div>
                </div>
                <div className="sv-fact a-item" style={{ transitionDelay: ".5s" }}>
                  <div className="sv-fact-n">∞</div>
                  <div className="sv-fact-l">Potential</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ QUOTE ══ */}
        <section className="sv-quote-sec">
          <blockquote>"The creation of a thousand forests is in one acorn."</blockquote>
          <cite>— Ralph Waldo Emerson</cite>
        </section>

      </div>
    </>
  );
}

const css = `
.sv-wrap {
  --sv-ink:   #0d1208;
  --sv-leaf:  #3d6b2f;
  --sv-lime:  #8cc63f;
  --sv-cream: #f5f0e8;
  --sv-sand:  #e8dcc8;

  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;

  background: var(--sv-ink);
  color: var(--sv-cream);
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;

  scrollbar-width: thin;
  scrollbar-color: var(--sv-leaf) var(--sv-ink);
}
.sv-wrap::-webkit-scrollbar { width: 3px; }
.sv-wrap::-webkit-scrollbar-track { background: var(--sv-ink); }
.sv-wrap::-webkit-scrollbar-thumb { background: var(--sv-leaf); border-radius: 2px; }

.sv-wrap *, .sv-wrap *::before, .sv-wrap *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}

/* ─── INTRO ─── */
.sv-intro {
  height: 100vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  position: relative; overflow: hidden;
  background: radial-gradient(ellipse 80% 60% at 50% 110%, #1e3d0f, var(--sv-ink));
}
.sv-intro-tag {
  font-size: clamp(.6rem,1.5vw,.75rem);
  letter-spacing: .4em; text-transform: uppercase; color: var(--sv-lime);
  margin-bottom: 1.6rem;
  opacity: 0; animation: sv-rise .9s .4s ease forwards;
}
.sv-intro-h1 {
  font-family: 'Playfair Display', serif;
  font-weight: 400; font-size: clamp(3rem,10vw,8.5rem);
  line-height: .95; text-align: center;
  opacity: 0; animation: sv-rise .9s .65s ease forwards;
}
.sv-intro-h1 span { font-style: italic; color: var(--sv-lime); }
.sv-intro-hint {
  position: absolute; bottom: 2.5rem;
  display: flex; flex-direction: column; align-items: center; gap: .6rem;
  opacity: 0; animation: sv-rise .9s 1.2s ease forwards;
}
.sv-intro-hint p {
  font-size: .62rem; letter-spacing: .35em;
  text-transform: uppercase; color: rgba(245,240,232,.4);
}
.sv-ticker {
  width: 1px; height: 50px;
  background: linear-gradient(to bottom, var(--sv-lime), transparent);
  animation: sv-tick 1.6s ease-in-out infinite;
}
@keyframes sv-tick {
  0%,100% { transform: scaleY(1); opacity: .5; }
  50%      { transform: scaleY(1.2); opacity: 1; }
}
@keyframes sv-rise {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─── VIDEO SCRUB ─── */
.sv-scrub-stage { position: relative; height: 600vh; }

.sv-video-sticky {
  position: sticky; top: 0;
  width: 100%; height: 100vh;
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  background: #040904;
}
.sv-video-sticky video {
  width: 100%; height: 100%; object-fit: cover; display: block;
  /* GPU-accelerate the video element for smoother repaints */
  will-change: contents;
  transform: translateZ(0);
}
.sv-video-sticky::before {
  content: ''; position: absolute; inset: 0; z-index: 2; pointer-events: none;
  background: radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(4,9,4,.8) 100%);
}
.sv-video-sticky::after {
  content: ''; position: absolute; inset: 0; z-index: 2; pointer-events: none;
  background:
    linear-gradient(to bottom, rgba(4,9,4,.55) 0%, transparent 16%),
    linear-gradient(to top,    rgba(4,9,4,.55) 0%, transparent 16%);
}

.sv-chap-wrap {
  position: absolute;
  left: clamp(1.2rem,4vw,4rem); bottom: clamp(1.8rem,5vh,4rem);
  z-index: 10; pointer-events: none;
}
.sv-chap-name {
  font-family: 'Playfair Display', serif; font-style: italic;
  font-size: clamp(1.4rem,3.5vw,2.8rem); color: var(--sv-cream);
  opacity: 0; transform: translateY(10px);
  transition: opacity .45s, transform .45s;
}
.sv-chap-name.show { opacity: 1; transform: translateY(0); }
.sv-chap-sub {
  font-size: clamp(.58rem,1.2vw,.68rem);
  letter-spacing: .3em; text-transform: uppercase; color: var(--sv-lime);
  margin-top: .4rem;
  opacity: 0; transform: translateY(8px);
  transition: opacity .5s .08s, transform .5s .08s;
}
.sv-chap-sub.show { opacity: 1; transform: translateY(0); }

.sv-pct-badge {
  position: absolute;
  top: clamp(1.2rem,3vh,2.5rem); right: clamp(1.2rem,3vw,3rem);
  z-index: 10; text-align: right; pointer-events: none;
}
.sv-pct-num {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem,5vw,4rem); color: var(--sv-lime); line-height: 1;
}
.sv-pct-label {
  font-size: .6rem; letter-spacing: .3em; text-transform: uppercase;
  color: rgba(245,240,232,.35); margin-top: .3rem;
}
.sv-dir-arrow {
  position: absolute;
  bottom: clamp(1.8rem,5vh,4rem); right: clamp(1.2rem,3vw,3rem);
  z-index: 10; width: 28px; height: 28px; pointer-events: none;
  transition: transform .35s ease;
}
.sv-dir-arrow svg {
  width: 100%; height: 100%; fill: none;
  stroke: var(--sv-lime); stroke-width: 1.5;
  stroke-linecap: round; stroke-linejoin: round;
}

/* ─── IMAGE REVEAL ─── */
.sv-reveal { background: var(--sv-cream); color: var(--sv-ink); overflow: hidden; }
.sv-reveal-inner { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
@media (max-width: 680px) { .sv-reveal-inner { grid-template-columns: 1fr; } }

.sv-reveal-img { position: relative; overflow: hidden; min-height: 50vh; }
.sv-reveal-img img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transform: scale(1.06); transition: transform 1.2s ease;
}
.sv-reveal-img:hover img { transform: scale(1); }
.sv-reveal-img::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(160deg, rgba(61,107,47,.2) 0%, transparent 55%);
}

.sv-reveal-text {
  display: flex; flex-direction: column; justify-content: center;
  padding: clamp(2.5rem,6vw,6rem) clamp(2rem,5vw,5rem);
  position: relative;
}
.sv-reveal-text::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--sv-leaf), var(--sv-lime));
}

.sv-wrap .a-item {
  opacity: 0; transform: translateY(24px);
  transition: opacity .75s ease, transform .75s ease;
}
.sv-wrap .a-item.in { opacity: 1; transform: translateY(0); }

.sv-tag-line { display: flex; align-items: center; gap: .8rem; margin-bottom: 2rem; }
.sv-dash { width: 24px; height: 1px; background: var(--sv-leaf); }
.sv-tag-line span {
  font-size: .62rem; letter-spacing: .38em;
  text-transform: uppercase; color: var(--sv-leaf);
}
.sv-reveal-text h2 {
  font-family: 'Playfair Display', serif; font-weight: 400;
  font-size: clamp(2rem,5vw,4.2rem); line-height: 1.05; color: var(--sv-ink);
  margin-bottom: 1.6rem;
}
.sv-reveal-text h2 i { color: var(--sv-leaf); }
.sv-reveal-text p {
  font-size: clamp(.82rem,1.6vw,.98rem); line-height: 1.85;
  color: #3a3328; max-width: 36ch; margin-bottom: 2.8rem;
}

.sv-facts { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
@media (max-width: 400px) { .sv-facts { grid-template-columns: 1fr 1fr; } }
.sv-fact { border-top: 1px solid rgba(13,18,8,.15); padding-top: 1rem; }
.sv-fact-n {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem,3vw,2.4rem); color: var(--sv-leaf); line-height: 1;
}
.sv-fact-n small { font-size: .5em; }
.sv-fact-l {
  font-size: .6rem; letter-spacing: .22em;
  text-transform: uppercase; color: #7a6e62; margin-top: .3rem;
}

/* ─── QUOTE ─── */
.sv-quote-sec {
  background: var(--sv-leaf);
  padding: clamp(4rem,8vh,7rem) clamp(1.5rem,6vw,6rem);
  text-align: center; position: relative; overflow: hidden;
}
.sv-quote-sec::before {
  content: '\\201C'; font-family: 'Playfair Display', serif; font-size: 16rem;
  color: rgba(255,255,255,.06); position: absolute;
  top: -3rem; left: 1rem; line-height: 1; pointer-events: none;
}
.sv-quote-sec blockquote {
  font-family: 'Playfair Display', serif; font-style: italic;
  font-size: clamp(1.2rem,3vw,2rem); color: var(--sv-cream);
  max-width: 650px; margin: 0 auto 1.2rem; line-height: 1.55;
}
.sv-quote-sec cite {
  font-size: .62rem; letter-spacing: .35em;
  text-transform: uppercase; color: var(--sv-lime); font-style: normal;
}
`;