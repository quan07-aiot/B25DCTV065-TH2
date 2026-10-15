const FAV_KEY = "favorites";
const THEME_KEY = "theme";
export function loadFavorites() {
    return JSON.parse(localStorage.getItem(FAV_KEY) ?? "[]");
}
export function saveFavorites(list) {
    localStorage.setItem(FAV_KEY, JSON.stringify(list));
}
export function loadTheme() {
    return localStorage.getItem(THEME_KEY) ?? "light";
}
export function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
}
