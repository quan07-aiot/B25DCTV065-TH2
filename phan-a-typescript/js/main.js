import { fetchBooks } from "./api.js";
import { loadFavorites, saveFavorites, loadTheme, saveTheme } from "./storage.js";
import { renderBooks } from "./render.js";
import { validateTitle, validateAuthor, validateGenre, validateYear } from "./validate.js";
const searchInput = document.querySelector("#search");
const genreFilter = document.querySelector("#genre-filter");
const statusText = document.querySelector("#status");
const favCount = document.querySelector("#fav-count");
const grid = document.querySelector("#book-grid");
const form = document.querySelector("#book-form");
const genreSelect = document.querySelector("#genre");
const themeBtn = document.querySelector("#theme-toggle");
let books = [];
let favorites = loadFavorites();
function getFilteredBooks() {
    const keyword = searchInput.value.trim().toLowerCase();
    const genre = genreFilter.value;
    return books.filter((book) => {
        const matchName = book.title.toLowerCase().includes(keyword);
        const matchGenre = genre === "" || book.genre === genre;
        return matchName && matchGenre;
    });
}
function render() {
    const list = getFilteredBooks();
    renderBooks(list, favorites);
    statusText.textContent = "Đang hiển thị " + list.length + " / " + books.length + " cuốn";
    favCount.textContent = String(favorites.length);
}
searchInput.addEventListener("input", render);
genreFilter.addEventListener("change", render);
grid.addEventListener("click", (e) => {
    const target = e.target;
    const button = target.closest("button");
    if (!button)
        return;
    const card = button.closest(".book-card");
    const id = card.dataset.id;
    if (button.dataset.action === "favorite") {
        if (favorites.includes(id)) {
            favorites = favorites.filter((favId) => favId !== id);
        }
        else {
            favorites.push(id);
        }
        saveFavorites(favorites);
        render();
    }
    if (button.dataset.action === "delete") {
        const book = books.find((b) => b.id === id);
        if (!book)
            return;
        if (confirm("Bạn có chắc muốn xóa sách \"" + book.title + "\"?")) {
            books = books.filter((b) => b.id !== id);
            favorites = favorites.filter((favId) => favId !== id);
            saveFavorites(favorites);
            render();
        }
    }
});
const fields = [
    { input: document.querySelector("#title"), error: document.querySelector("#title-error"), validate: validateTitle },
    { input: document.querySelector("#author"), error: document.querySelector("#author-error"), validate: validateAuthor },
    { input: genreSelect, error: document.querySelector("#genre-error"), validate: validateGenre },
    { input: document.querySelector("#year"), error: document.querySelector("#year-error"), validate: validateYear },
];
function checkField(field) {
    const message = field.validate(field.input.value);
    field.error.textContent = message;
    return message === "";
}
fields.forEach((field) => {
    field.input.addEventListener("input", () => checkField(field));
    field.input.addEventListener("change", () => checkField(field));
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const results = fields.map(checkField);
    if (results.includes(false))
        return;
    const newBook = {
        id: String(Date.now()),
        title: fields[0].input.value.trim(),
        author: fields[1].input.value.trim(),
        genre: fields[2].input.value,
        year: Number(fields[3].input.value),
    };
    books.unshift(newBook);
    searchInput.value = "";
    genreFilter.value = "";
    form.reset();
    render();
});

function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    themeBtn.textContent = theme === "dark" ? "Chế độ sáng" : "Chế độ tối";
}
themeBtn.addEventListener("click", () => {
    const next = document.body.classList.contains("dark") ? "light" : "dark";
    applyTheme(next);
    saveTheme(next);
});
async function init() {
    applyTheme(loadTheme());
    statusText.textContent = "Đang tải...";
    try {
        books = await fetchBooks();
    }
    catch (error) {
        statusText.textContent = "Không tải được dữ liệu: " + error.message;
        return;
    }
    const genres = new Set(books.map((book) => book.genre));
    genres.forEach((genre) => {
        genreFilter.append(new Option(genre, genre));
        genreSelect.append(new Option(genre, genre));
    });
    fields[3].input.max = String(new Date().getFullYear());
    render();
}
init();
