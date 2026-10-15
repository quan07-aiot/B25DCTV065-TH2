import BookCard from "./BookCard";

function BookList({ books, favoriteIds, onToggleFavorite }) {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          genre={book.genre}
          year={book.year}
          isFavorite={favoriteIds.includes(book.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default BookList;
