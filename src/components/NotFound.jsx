import { Link } from "react-router-dom";
import { Home, Compass } from "lucide-react";
import { Button } from "./ui/button";
import { useLang } from "../contexts/LanguageContext";

export default function NotFound() {
  const { lang } = useLang();
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <div
        className="text-8xl leading-none select-none"
        style={{ animation: "float 3s ease-in-out infinite, bounceIn 0.7s cubic-bezier(0.34,1.56,0.64,1) both" }}
      >
        🕌
      </div>
      <div className="flex items-center gap-2">
        {["4", "0", "4"].map((d, i) => (
          <span
            key={i}
            className="font-lemonada font-bold leading-none select-none"
            style={{
              fontSize: "clamp(4rem,15vw,8rem)",
              background: "linear-gradient(135deg,hsl(var(--primary)) 0%,hsl(var(--primary)/0.55) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: `slideInScale 0.5s cubic-bezier(0.34,1.18,0.64,1) ${i * 0.1}s both`,
            }}
          >
            {d}
          </span>
        ))}
      </div>
      <div className="space-y-1.5" style={{ animation: "fadeInUp 0.5s ease 0.35s both" }}>
        <p className="font-lemonada font-semibold text-xl text-foreground">
          {lang === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
        </p>
        <p className="text-muted-foreground text-sm font-lemonada max-w-xs mx-auto">
          {lang === "ar"
            ? "لا يمكن العثور على الصفحة التي تبحث عنها"
            : "The page you're looking for doesn't exist"}
        </p>
      </div>
      <div className="flex gap-3 flex-wrap justify-center" style={{ animation: "fadeInUp 0.5s ease 0.5s both" }}>
        <Button asChild size="lg">
          <Link to="/">
            <Home className="h-4 w-4" />
            {lang === "ar" ? "الرئيسية" : "Go Home"}
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/">
            <Compass className="h-4 w-4" />
            {lang === "ar" ? "أوقات الصلاة" : "Prayer Times"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
