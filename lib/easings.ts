export const EASE_CINEMA = "cubic-bezier(0.22, 1, 0.36, 1)" as const;
export const EASE_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)" as const;

export const gsapEase = {
  cinema: "power3.out",
  expo: "expo.out",
  swift: "power4.out",
} as const;

export const fmSpring = {
  soft: { type: "spring", stiffness: 120, damping: 22, mass: 0.9 },
  snappy: { type: "spring", stiffness: 220, damping: 26, mass: 0.6 },
  drift: { type: "spring", stiffness: 60, damping: 18, mass: 1.2 },
} as const;
