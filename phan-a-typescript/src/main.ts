import type { Book } from "./types.js";
import { fetchBooks } from "./api.js";
import { loadFavorites, saveFavorites, loadTheme, saveTheme } from "./storage.js";
import { renderBooks } from "./render.js";
import { validateTitle, validateAuthor, validateGenre, validateYear } from "./validate.js";
const searchInput = document.querySelector("#search") as HTMLInputElement;
const genreFilter = document.querySelector("#genre-filter") as HTMLSelectElement;
const statusText = document.querySelector("#status") as HTMLElement;
const favCount = document.querySelector("#fav-count") as HTMLElement;
const grid = document.querySelector("#book-grid") as HTMLElement;
const form = document.querySelector("#book-form") as HTMLFormElement;
const genreSelect = document.querySelector("#genre") as HTMLSelectElement;
const themeBtn = document.querySelector("#theme-toggle") as HTMLButtonElement;

let books: Book[] = [];
let favorites: string[] = loadFavorites();

function getFilteredBooks(): Book[] {
  const keyword = searchInput.value.trim().toLowerCase();
  const genre = genreFilter.value;

  return books.filter((book) => {
    const matchName = book.title.toLowerCase().includes(keyword);
    const matchGenre = genre === "" || book.genre === genre;
    return matchName && matchGenre;
  });
}

function render(): void {
  const list = getFilteredBooks();
  renderBooks(list, favorites);
  statusText.textContent = "Đang hiển thị " + list.length + " / " + books.length + " cuốn";
  favCount.textContent = String(favorites.length);
}

searchInput.addEventListener("input", render);
genreFilter.addEventListener("change", render);

grid.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const button = target.closest("button");
  if (!button) return;

  const card = button.closest(".book-card") as HTMLElement;
  const id = card.dataset.id as string;

  if (button.dataset.action === "favorite") {
    if (favorites.includes(id)) {
      favorites = favorites.filter((favId) => favId !== id);
    } else {
      favorites.push(id);
    }
    saveFavorites(favorites);
    render();
  }

  if (button.dataset.action === "delete") {
    const book = books.find((b) => b.id === id);
    if (!book) return;

    if (confirm("Bạn có chắc muốn xóa sách \"" + book.title + "\"?")) {
      books = books.filter((b) => b.id !== id);
      favorites = favorites.filter((favId) => favId !== id);
      saveFavorites(favorites);
      render();
    }
  }
});

interface Field {
  input: HTMLInputElement | HTMLSelectElement;
  error: HTMLElement;
  validate: (value: string) => string;
}

const fields: Field[] = [
  { input: document.querySelector("#title") as HTMLInputElement, error: document.querySelector("#title-error") as HTMLElement, validate: validateTitle },
  { input: document.querySelector("#author") as HTMLInputElement, error: document.querySelector("#author-error") as HTMLElement, validate: validateAuthor },
  { input: genreSelect, error: document.querySelector("#genre-error") as HTMLElement, validate: validateGenre },
  { input: document.querySelector("#year") as HTMLInputElement, error: document.querySelector("#year-error") as HTMLElement, validate: validateYear },
];

function checkField(field: Field): boolean {
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
  if (results.includes(false)) return;

  const newBook: Book = {
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

function applyTheme(theme: string): void {
  document.body.classList.toggle("dark", theme === "dark");
  themeBtn.textContent = theme === "dark" ? "Chế độ sáng" : "Chế độ tối";
}

themeBtn.addEventListener("click", () => {
  const next = document.body.classList.contains("dark") ? "light" : "dark";
  applyTheme(next);
  saveTheme(next);
});

async function init(): Promise<void> {
  applyTheme(loadTheme());
  statusText.textContent = "Đang tải...";

  try {
    books = await fetchBooks();
  } catch (error) {
    statusText.textContent = "Không tải được dữ liệu: " + (error as Error).message;
    return;
  }

  const genres = new Set(books.map((book) => book.genre));
  genres.forEach((genre) => {
    genreFilter.append(new Option(genre, genre));
    genreSelect.append(new Option(genre, genre));
  });

  (fields[3].input as HTMLInputElement).max = String(new Date().getFullYear());

  render();
}

init();
