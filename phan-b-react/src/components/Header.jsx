function Header({ name, favoriteCount }) {
  return (
    <header className="header">
      <h1>{name}</h1>
      <p>Yêu thích: {favoriteCount}</p>
    </header>
  );
}

export default Header;
