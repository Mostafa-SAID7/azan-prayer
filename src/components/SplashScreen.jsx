import { useEffect, useState } from "react";

const TOTAL_MS = 2800;
const EXIT_MS  = 2100;

export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), EXIT_MS);
    const t2 = setTimeout(() => onFinish(),       TOTAL_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onFinish]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg,#3b0808 0%,#6b0f0f 35%,#9b1c1c 70%,#7f1d1d 100%)",
        animation: phase === "exit"
          ? "splashExit 0.7s cubic-bezier(0.4,0,0.2,1) forwards"
          : "splashEnter 0.35s ease forwards",
      }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 65% 55% at 50% 48%, rgba(255,200,200,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Star-field dots overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: [
            "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "60px 60px, 40px 40px",
          backgroundPosition: "0 0, 30px 30px",
        }}
      />

      {/* Expanding ripple rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 300, height: 300,
            border: "1.5px solid rgba(255,180,180,0.18)",
            animation: `splashRipple 2.6s cubic-bezier(0,0.2,0.8,1) ${i * 0.85}s infinite`,
          }}
        />
      ))}

      {/* Mosque icon */}
      <div
        className="relative z-10 leading-none mb-5"
        style={{
          fontSize: "5.5rem",
          animation: "splashIconIn 0.75s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
          filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.45))",
        }}
      >
        🕌
      </div>

      {/* Title */}
      <div
        className="relative z-10 text-center"
        style={{ animation: "splashTextIn 0.6s cubic-bezier(0.34,1.2,0.64,1) 0.3s both" }}
      >
        <p className="font-lemonada font-bold text-white text-4xl leading-none mb-2 drop-shadow-md">
          أوقات الصلاة
        </p>
        <p className="font-lemonada text-white/55 text-[11px] tracking-[0.4em] uppercase">
          Prayer Times
        </p>
      </div>

      {/* Loading dots */}
      <div
        className="flex gap-2.5 mt-9 relative z-10"
        style={{ animation: "splashTextIn 0.6s ease 0.5s both" }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: "rgba(255,200,200,0.75)",
              animation: `splashDot 1.4s ease-in-out ${i * 0.22}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes splashEnter  { from{opacity:0} to{opacity:1} }
        @keyframes splashExit   { from{opacity:1;transform:scale(1)} to{opacity:0;transform:scale(1.05)} }
        @keyframes splashRipple { 0%{transform:scale(0.5);opacity:0.6} 100%{transform:scale(2.5);opacity:0} }
        @keyframes splashIconIn { from{opacity:0;transform:scale(0.35) translateY(24px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes splashTextIn { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes splashDot    { 0%,80%,100%{transform:scale(0.55);opacity:0.35} 40%{transform:scale(1.1);opacity:1} }
      `}</style>
    </div>
  );
}
