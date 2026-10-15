import { useState } from "react";
import { books } from "./data/books";
import Header from "./components/Header";
import Section from "./components/Section";
import GenreFilter from "./components/GenreFilter";
import BookList from "./components/BookList";
import Footer from "./components/Footer";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("Tất cả");
  const [favoriteIds, setFavoriteIds] = useState([]);
  const genres = ["Tất cả", ...new Set(books.map((book) => book.genre))];
  const filteredBooks =
    selectedGenre === "Tất cả"
      ? books
      : books.filter((book) => book.genre === selectedGenre);
  function toggleFavorite(id) {
    if (favoriteIds.includes(id)) {
      setFavoriteIds(favoriteIds.filter((favId) => favId !== id));
    } else {
      setFavoriteIds([...favoriteIds, id]);
    }
  }

  return (
    <div className="app">
      <Header name="Thư viện lớp" favoriteCount={favoriteIds.length} />

      <main className="container">
        <Section title="Thể loại">
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onSelect={setSelectedGenre}
          />
        </Section>

        <Section title="Danh sách sách">
          <BookList
            books={filteredBooks}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />
        </Section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
