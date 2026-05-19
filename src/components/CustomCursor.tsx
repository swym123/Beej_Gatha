import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    const cur = cursorRef.current;
    const ring = ringRef.current;
    if (!cur || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + "px";
      cur.style.top = my + "px";
    };

    window.addEventListener("mousemove", onMouseMove);

    let rafId: number;
    const animRing = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      rafId = requestAnimationFrame(animRing);
    };
    rafId = requestAnimationFrame(animRing);

    const handleMouseEnter = () => {
      cur.style.width = "16px";
      cur.style.height = "16px";
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.borderColor = "#8cc63f";
    };

    const handleMouseLeave = () => {
      cur.style.width = "9px";
      cur.style.height = "9px";
      ring.style.width = "38px";
      ring.style.height = "38px";
      ring.style.borderColor = "rgba(140, 198, 63, 0.35)";
    };

    const attachListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, .pd-card, .sc-card, .sc-m-stack-card, input, select, textarea"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    attachListeners();

    // Re-attach elements dynamically when DOM updates (e.g. route transitions)
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      const interactives = document.querySelectorAll(
        "a, button, .pd-card, .sc-card, .sc-m-stack-card, input, select, textarea"
      );
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="glb-cursor" ref={cursorRef} />
      <div id="glb-cursor-ring" ref={ringRef} />
    </>
  );
}
