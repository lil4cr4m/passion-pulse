/**
 * SKILLCAST DESIGN SYSTEM - Tailwind CSS Configuration
 *
 * This file defines the complete design system for SkillCast, implementing
 * a neo-brutalism aesthetic with consistent colors, spacing, and typography.
 *
 * DESIGN PHILOSOPHY:
 * - Neo-brutalism: Bold, chunky, high-contrast design
 * - Consistent spacing based on 8pt grid system
 * - Limited color palette for brand consistency
 * - Heavy shadows and borders for visual impact
 * - Typography scale that works across devices
 *
 * KEY DESIGN TOKENS:
 * 1. COLORS - Carefully chosen palette for different UI states
 * 2. SHADOWS - "Brutal" shadow system for depth and interaction
 * 3. SPACING - 8pt grid system for consistent layouts
 * 4. TYPOGRAPHY - Responsive type scales for mobile and desktop
 * 5. BORDERS - Custom 3px border width for neo-brutal aesthetic
 *
 * EXTENDING THE DESIGN SYSTEM:
 * - Add new colors by extending the colors object
 * - Create new shadow variants in boxShadow section
 * - Define new spacing values following 8pt grid
 * - Add typography styles using fontSize configuration
 *
 * USAGE IN COMPONENTS:
 * ```jsx
 * <div className="bg-violet text-offwhite shadow-brutal border-3 border-ink">
 * ```
 *
 * RESPONSIVE DESIGN:
 * - Mobile-first approach with desktop overrides
 * - Separate typography scales for mobile (h1-m) and desktop (h1-d)
 * - Consistent spacing across all breakpoints
 */

/** @type {import('tailwindcss').Config} */
export default {
  // 📝 CONTENT PATHS - Where Tailwind should look for class usage
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // 🔒 SAFELIST - Ensure custom color variants are always included
  safelist: [
    // Background colors - using base color names for DEFAULT variants
    "bg-yellow",
    "bg-violet",
    "bg-pink",
    "bg-cyan",
    "bg-danger",
    "bg-neon",
    "bg-yellow-muted",
    "bg-violet-muted",
    "bg-pink-muted",
    "bg-cyan-muted",
    "bg-danger-muted",
    "bg-neon-muted",
    // Text colors - using base color names for DEFAULT variants
    "text-yellow",
    "text-violet",
    "text-pink",
    "text-cyan",
    "text-danger",
    "text-neon",
    "text-yellow-muted",
    "text-violet-muted",
    "text-pink-muted",
    "text-cyan-muted",
    "text-danger-muted",
    "text-neon-muted",
  ],

  theme: {
    extend: {
      // 🎨 COLOR PALETTE - Neo-brutalism Color System (WCAG AA Compliant)
      // Each color serves specific UI purposes and emotional responses
      // All colors meet WCAG AA contrast ratios (4.5:1 normal text, 3:1 large text)
      colors: {
        // ⚪ THE CANVAS
        offwhite: "#F4F4F4", // Slightly more "industrial" grey-white
        ink: "#121212", // "Rich Black" - feels more premium than #000

        // 🟣 PRIMARY BRAND (Creative/Energetic)
        // Deep, saturated purple-violet - more dramatic and vibrant while compliant
        violet: {
          DEFAULT: "#6D28D9", // Deep saturated violet (violet-700) - bold neo-brutal punch
          muted: "#C4B5FD", // Light violet for secondary UI
        },

        // 🟡 REWARDS & CREDIT (Optimistic)
        // Golden-amber with high saturation - cyber-gold feel while accessible
        yellow: {
          DEFAULT: "#B45309", // Deep saturated amber-gold (highly vibrant)
          muted: "#FCD34D", // Light amber for secondary UI
        },

        // 🟢 LIVE STATUS (Vibrant/Active)
        // Deep saturated green - maintains "electric live" feeling despite darker tone
        neon: {
          DEFAULT: "#166534", // Deep saturated green-800 (electric energy)
          muted: "#86EFAC", // Light green for secondary UI
        },

        // 💗 ALERTS & GRATITUDE (Attention)
        // Deep saturated magenta - stronger attention-grab than before
        pink: {
          DEFAULT: "#9D174D", // Deep saturated pink-800 (hot magenta)
          muted: "#F472B6", // Light pink for secondary UI
        },

        // 🔵 SYSTEM ACTIONS (Secondary/Links)
        // Deep saturated cyan - maintains electric blue-cyan aesthetic
        cyan: {
          DEFAULT: "#0E7490", // Deep saturated cyan-700 (electric teal punch)
          muted: "#67E8F9", // Light cyan for secondary UI
        },

        // 🔴 DESTRUCTIVE ACTIONS (Delete/Logout)
        // Deep saturated red - urgent and dramatic
        danger: {
          DEFAULT: "#7F1D1D", // Deep saturated red-900 (high-impact red)
          muted: "#FCA5A5", // Light red for secondary UI
        },
      },

      // 🏗️ SHADOW SYSTEM - "Brutal" depth system
      // Creates the characteristic neo-brutalist depth effect
      boxShadow: {
        brutal: "4px 4px 0px 0px rgba(18, 18, 18, 1)",
        "brutal-lg": "8px 8px 0px 0px rgba(18, 18, 18, 1)",
        "brutal-xl": "12px 12px 0px 0px rgba(18, 18, 18, 1)",
      },

      // 📏 SPACING SYSTEM - 8pt Grid for Consistency
      // All spacing values follow 8pt increments for visual harmony
      spacing: {
        0.5: "0.125rem", // 2px  - micro adjustments
        1: "0.25rem", // 4px  - tiny spacing
        2: "0.5rem", // 8px  - small spacing (base unit)
        3: "0.75rem", // 12px - medium-small spacing
        4: "1rem", // 16px - standard spacing
        6: "1.5rem", // 24px - medium spacing
        8: "2rem", // 32px - large spacing
        10: "2.5rem", // 40px - extra large spacing
        12: "3rem", // 48px - section spacing
        16: "4rem", // 64px - major section spacing
      },

      // ✍️ TYPOGRAPHY SYSTEM - Responsive Type Scale
      // Separate scales for mobile and desktop for optimal readability
      fontSize: {
        // 📱 STANDARD TEXT SIZES
        xs: ["0.75rem", { lineHeight: "1rem" }], // 12px - micro text
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px - small text
        base: ["1rem", { lineHeight: "1.6" }], // 16px - body text
        lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px - large text
        xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px - emphasis
        "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px - subheadings

        // 🖥️ DESKTOP HEADINGS - Larger, more impactful
        "h1-d": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.04em" }], // 64px
        "h2-d": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }], // 40px

        // 📱 MOBILE HEADINGS - Scaled down for smaller screens
        "h1-m": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.04em" }], // 40px
        "h2-m": ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }], // 28px
      },

      // 🔲 BORDER SYSTEM - Neo-brutalist Border Width
      borderWidth: {
        3: "0.1875rem", // 3px - signature neo-brutal border thickness
      },

      // 📏 LAYOUT CONSTRAINTS
      maxWidth: {
        layout: "87.5rem", // 1400px - maximum content width for readability
      },
    },
  },
};
