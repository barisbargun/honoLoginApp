export const logo: ILogo = {
  src: "/assets/logo.avif",
  name: "Authzzz"
}

export const heroBackground: IHeroBackground = {
  baseVideo: "/assets/hero/hero_animation.webm",
  baseImg: "/assets/hero/hero1.avif"
}

export type SvgTypes = "news" | "auth" | "authFinish" | "indicator" | "input" | "panel";
export const svgPaths:Record<SvgTypes, {path:string;glow?:string;}> = {
  news: { path: "/svg/buttons/news.svg", glow: "glowButtonNews" },
  auth: { path: "/svg/buttons/auth.svg", glow: "glowButtonAuth" },
  authFinish: { path: "/svg/buttons/auth-finish.svg", glow: "glowButtonAuthFinish" },
  indicator: { path: "/svg/indicator.svg", glow: "glowIndicator" },
  input: { path: "/svg/input.png" },
  panel: { path: "/svg/panel.svg" },
}

export const panelDescription = [
  "Authzz offers seamless authentication solutions for web and mobile applications.",
  "With robust security features and easy integration."
]