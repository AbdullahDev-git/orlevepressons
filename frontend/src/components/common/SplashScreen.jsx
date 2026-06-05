import { useState, useEffect } from "react";

export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 2000);
    const t2 = setTimeout(() => onFinish(), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080E1A] transition-all duration-700 ${
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <h1
          className={`font-serif text-6xl md:text-8xl font-bold text-white tracking-wider transition-all duration-700 ${
            phase === "enter" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          ORLEV
        </h1>
      </div>
      <p
        className={`mt-4 text-accent-500 text-sm md:text-base tracking-[0.3em] uppercase transition-all duration-700 delay-300 ${
          phase === "enter" ? "opacity-100" : "opacity-0"
        }`}
      >
        Digital Couture
      </p>
      <div className="mt-8 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
          />
        ))}
      </div>
    </div>
  );
}
