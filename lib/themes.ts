export type ThemeName = "minimal" | "rustic" | "bold";
export function getTheme(name: string | undefined): ThemeName {
  if (name === "rustic" || name === "bold" || name === "minimal") return name;
  return "rustic";
}
export function themeClasses(theme: ThemeName) {
  switch (theme) {
    case "rustic": return { pageBg:"bg-amber-50", card:"bg-white border border-amber-200", accent:"text-amber-900", button:"bg-amber-700 hover:bg-amber-800 text-white", btnSecondary:"border border-amber-700 text-amber-700 hover:bg-amber-50", badge:"bg-amber-100 text-amber-800", input:"border-amber-200 focus:ring-amber-500", heading:"text-amber-900" };
    case "bold": return { pageBg:"bg-zinc-950", card:"bg-zinc-900 border border-zinc-800", accent:"text-lime-300", button:"bg-lime-400 hover:bg-lime-300 text-zinc-950", btnSecondary:"border border-lime-400 text-lime-400 hover:bg-zinc-800", badge:"bg-zinc-800 text-zinc-100", input:"border-zinc-700 bg-zinc-800 text-white focus:ring-lime-400", heading:"text-lime-300" };
    default: return { pageBg:"bg-slate-50", card:"bg-white border border-slate-200", accent:"text-slate-900", button:"bg-slate-900 hover:bg-slate-800 text-white", btnSecondary:"border border-slate-300 text-slate-700 hover:bg-slate-50", badge:"bg-slate-100 text-slate-700", input:"border-slate-300 focus:ring-slate-500", heading:"text-slate-900" };
  }
}
