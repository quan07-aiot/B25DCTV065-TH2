function BookCard({ id, title, author, genre, year, isFavorite, onToggleFavorite }) {
  return (
    <div className="book-card">
      <h3>{title}</h3>
      <p>Tác giả: {author}</p>
      <p>Thể loại: {genre}</p>
      <p>Năm xuất bản: {year}</p>
      <button
        className={isFavorite ? "active" : ""}
        onClick={() => onToggleFavorite(id)}
      >
        {isFavorite ? "♥ Đã thích" : "♡ Yêu thích"}
      </button>
    </div>
  );
}

export default BookCard;
