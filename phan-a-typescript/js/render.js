function createBookCard(book, isFavorite) {
    const card = document.createElement("div");
    card.className = "book-card";
    card.dataset.id = book.id;
    const title = document.createElement("h3");
    title.textContent = book.title;
    const author = document.createElement("p");
    author.textContent = "Tác giả: " + book.author;
    const genre = document.createElement("p");
    genre.textContent = "Thể loại: " + book.genre;
    const year = document.createElement("p");
    year.textContent = "Năm xuất bản: " + book.year;
    const favBtn = document.createElement("button");
    favBtn.dataset.action = "favorite";
    favBtn.textContent = isFavorite ? "♥ Đã thích" : "♡ Yêu thích";
    if (isFavorite)
        favBtn.classList.add("active");
    const deleteBtn = document.createElement("button");
    deleteBtn.dataset.action = "delete";
    deleteBtn.textContent = "Xóa";
    card.append(title, author, genre, year, favBtn, deleteBtn);
    return card;
}
export function renderBooks(books, favorites) {
    const grid = document.querySelector("#book-grid");
    grid.innerHTML = "";
    if (books.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "Không tìm thấy sách nào.";
        grid.append(empty);
        return;
    }
    books.forEach((book) => {
        const isFavorite = favorites.includes(book.id);
        grid.append(createBookCard(book, isFavorite));
    });
}
