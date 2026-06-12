/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        lg:  "var(--radius)",
        md:  "calc(var(--radius) - 2px)",
        sm:  "calc(var(--radius) - 4px)",
        xl:  "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      fontFamily: {
        lemonada: ["Lemonada", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        fadeInUp:   { from: { opacity:"0", transform:"translateY(16px)" }, to: { opacity:"1", transform:"translateY(0)" } },
        fadeInDown: { from: { opacity:"0", transform:"translateY(-16px)" }, to: { opacity:"1", transform:"translateY(0)" } },
        slideInScale: {
          "0%":   { opacity:"0", transform:"scale(0.9) translateY(10px)" },
          "70%":  { opacity:"1", transform:"scale(1.02) translateY(-2px)" },
          "100%": { opacity:"1", transform:"scale(1) translateY(0)" },
        },
        slideInDown: {
          "0%":   { opacity:"0", transform:"translateY(-24px) scale(0.98)" },
          "65%":  { opacity:"1", transform:"translateY(3px)" },
          "100%": { opacity:"1", transform:"translateY(0) scale(1)" },
        },
        slideInUp: {
          "0%":   { opacity:"0", transform:"translateY(24px) scale(0.98)" },
          "65%":  { opacity:"1", transform:"translateY(-3px)" },
          "100%": { opacity:"1", transform:"translateY(0) scale(1)" },
        },
        float: {
          "0%,100%": { transform:"translateY(0)" },
          "50%":     { transform:"translateY(-10px)" },
        },
        pulseGlow: {
          "0%,100%": { boxShadow:"0 0 0 0 hsl(var(--primary)/0)" },
          "50%":     { boxShadow:"0 0 0 8px hsl(var(--primary)/0.15)" },
        },
        shimmer: {
          "0%":   { backgroundPosition:"-400px 0" },
          "100%": { backgroundPosition:"400px 0" },
        },
        countdownTick: {
          "0%":   { opacity:"0.6", transform:"scale(0.97)" },
          "20%":  { opacity:"1",   transform:"scale(1.01)" },
          "100%": { opacity:"1",   transform:"scale(1)" },
        },
        bounceIn: {
          "0%":   { opacity:"0", transform:"scale(0.3)" },
          "50%":  { opacity:"1", transform:"scale(1.06)" },
          "70%":  { transform:"scale(0.95)" },
          "100%": { opacity:"1", transform:"scale(1)" },
        },
        ripple: {
          "0%":   { transform:"scale(0)", opacity:"0.6" },
          "100%": { transform:"scale(2.5)", opacity:"0" },
        },
        splashFadeOut: {
          from: { opacity:"1" },
          to:   { opacity:"0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-in-up":     "fadeInUp 0.4s ease both",
        "fade-in-down":   "fadeInDown 0.4s ease both",
        "slide-in-down":  "slideInDown 0.5s cubic-bezier(0.34,1.2,0.64,1) both",
        "slide-in-up":    "slideInUp 0.5s cubic-bezier(0.34,1.2,0.64,1) both",
        "slide-in-scale": "slideInScale 0.45s cubic-bezier(0.34,1.18,0.64,1) both",
        "float":          "float 3.5s ease-in-out infinite",
        "pulse-glow":     "pulseGlow 2.5s ease-in-out infinite",
        "shimmer":        "shimmer 1.6s linear infinite",
        "countdown-tick": "countdownTick 1s ease both",
        "bounce-in":      "bounceIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both",
        "ripple":         "ripple 2s cubic-bezier(0,0.2,0.8,1) infinite",
      },
    },
  },
  plugins: [],
};
