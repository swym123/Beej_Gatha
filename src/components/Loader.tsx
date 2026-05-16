import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/loader-animation.json";

export default function Loader() {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 3000);
    const t2 = setTimeout(() => setHidden(true), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (hidden) return null;

  const word = "Beej Gatha".split("");

  return (
    <>
      <style>{css}</style>
      <div className={`bg-loader ${fadeOut ? "fade-out" : ""}`}>
        <div className="bg-loader-glow" />
        <div className="bg-loader-content">
          <div className="bg-loader-anim">
            <svg className="bg-progress-ring" width="240" height="240">
              <defs>
                <linearGradient id="bgGradStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8cc63f" />
                  <stop offset="100%" stopColor="#3d6b2f" />
                </linearGradient>
              </defs>
              <circle className="bg-progress-circle" cx="120" cy="120" r="105" fill="none" strokeWidth="6" />
            </svg>
            <div className="bg-lottie">
              <Lottie animationData={animationData} loop autoplay />
            </div>
          </div>
          <div className="bg-loader-text">
            {word.map((c, i) => (
              <span key={i} style={{ animationDelay: `${i * 90}ms` }}>{c === " " ? "\u00A0" : c}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const css = `
.bg-loader { position: fixed; inset: 0; z-index: 99999; background: linear-gradient(135deg, #f1f8e9, #dcedc8); display: flex; align-items: center; justify-content: center; transition: opacity .6s ease; }
.bg-loader.fade-out { opacity: 0; pointer-events: none; }
.bg-loader-glow { position: absolute; width: 420px; height: 420px; border-radius: 50%; background: radial-gradient(circle, rgba(140,198,63,.35), transparent 70%); filter: blur(40px); }
.bg-loader-content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; }
.bg-loader-anim { position: relative; width: 240px; height: 240px; margin-bottom: 20px; }
.bg-progress-ring { transform: rotate(-90deg); position: absolute; inset: 0; }
.bg-progress-circle { stroke: url(#bgGradStroke); stroke-dasharray: 659; stroke-dashoffset: 659; animation: bgFill 2.2s ease forwards; stroke-linecap: round; filter: drop-shadow(0 0 6px rgba(76,175,80,.5)); }
@keyframes bgFill { to { stroke-dashoffset: 0; } }
.bg-lottie { position: absolute; inset: 10px; animation: bgBreathe 2s ease-in-out infinite; }
@keyframes bgBreathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
.bg-loader-text { display: flex; gap: .05em; font-family: 'Playfair Display', Georgia, serif; font-size: 2.6rem; font-weight: 700; background: linear-gradient(45deg, #66bb6a, #2e7d32); -webkit-background-clip: text; background-clip: text; color: transparent; }
.bg-loader-text span { opacity: 0; transform: translateY(28px) scale(.85); animation: bgFadeUp .55s forwards; }
@keyframes bgFadeUp { to { opacity: 1; transform: translateY(0) scale(1); } }
`;
