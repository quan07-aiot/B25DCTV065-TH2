import type { Book } from "./types.js";
export async function fetchBooks(): Promise<Book[]> {
  const res = await fetch("./books.json");
  if (!res.ok) {
    throw new Error("Lỗi " + res.status);
  }
  return await res.json();
}
