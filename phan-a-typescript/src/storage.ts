const FAV_KEY = "favorites";
const THEME_KEY = "theme";

export function loadFavorites(): string[] {
  return JSON.parse(localStorage.getItem(FAV_KEY) ?? "[]");
}

export function saveFavorites(list: string[]): void {
  localStorage.setItem(FAV_KEY, JSON.stringify(list));
}

export function loadTheme(): string {
  return localStorage.getItem(THEME_KEY) ?? "light";
}

export function saveTheme(theme: string): void {
  localStorage.setItem(THEME_KEY, theme);
}
