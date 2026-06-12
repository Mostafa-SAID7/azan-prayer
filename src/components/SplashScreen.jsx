import { useEffect, useState } from "react";

const TOTAL_MS = 2800;
const EXIT_MS  = 2100;

export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"),  EXIT_MS);
    const t2 = setTimeout(() => onFinish(),        TOTAL_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onFinish]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg,#043A04 0%,#0A5C0A 40%,#107C10 75%,#1B8A1B 100%)",
        animation: phase === "exit"
          ? "splashExit 0.7s cubic-bezier(0.4,0,0.2,1) forwards"
          : "splashEnter 0.4s ease forwards",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 48%, rgba(255,255,255,0.07) 0%, transparent 70%)" }}
      />

      {/* Ripple rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 320, height: 320,
            border: "1.5px solid rgba(255,255,255,0.14)",
            animation: `splashRipple 2.4s cubic-bezier(0,0.2,0.8,1) ${i * 0.8}s infinite`,
          }}
        />
      ))}

      {/* Mosque icon */}
      <div
        className="relative z-10 text-[5.5rem] leading-none mb-4"
        style={{
          animation: "splashIconIn 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.35))",
        }}
      >
        🕌
      </div>

      {/* Title */}
      <div
        className="relative z-10 text-center"
        style={{ animation: "splashTextIn 0.6s cubic-bezier(0.34,1.2,0.64,1) 0.3s both" }}
      >
        <p className="font-lemonada font-bold text-white text-4xl leading-none mb-1.5">
          أوقات الصلاة
        </p>
        <p className="font-lemonada text-white/60 text-sm tracking-[0.3em] uppercase">
          Prayer Times
        </p>
      </div>

      {/* Loading dots */}
      <div
        className="flex gap-2 mt-8 relative z-10"
        style={{ animation: "splashTextIn 0.6s ease 0.55s both" }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-white/70"
            style={{ animation: `splashDot 1.4s ease-in-out ${i * 0.22}s infinite` }}
          />
        ))}
      </div>

      <style>{`
        @keyframes splashEnter   { from{opacity:0} to{opacity:1} }
        @keyframes splashExit    { from{opacity:1;transform:scale(1)} to{opacity:0;transform:scale(1.04)} }
        @keyframes splashRipple  { 0%{transform:scale(0.6);opacity:0.5} 100%{transform:scale(2.4);opacity:0} }
        @keyframes splashIconIn  { from{opacity:0;transform:scale(0.4) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes splashTextIn  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes splashDot     { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1.1);opacity:1} }
      `}</style>
    </div>
  );
}
