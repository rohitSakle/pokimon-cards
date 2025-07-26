export const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="header">
      <h1>Pokemon cards</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault;
        }}
      >
        <input
          type="text"
          placeholder="search pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
