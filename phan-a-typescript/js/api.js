export async function fetchBooks() {
    const res = await fetch("./books.json");
    if (!res.ok) {
        throw new Error("Lỗi " + res.status);
    }
    return await res.json();
}
