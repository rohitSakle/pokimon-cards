import { useState, useEffect } from "react";
import { Loading } from "./loading";
import { Error } from "./Error";
import "./Pokemons.css";
import { Card } from "./Card";
// import { Header } from "./Header";

export const PokemonCards = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  //  pagination
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 25; // or any number you want per page
  const [totalPages, setTotalPages] = useState(0);

  const API = `https://pokeapi.co/api/v2/pokemon?offset=${
    cardsPerPage * currentPage
  }&limit=${cardsPerPage}`;

  const pageHandler = (value) => {
    setCurrentPage((preveous) => {
      return preveous + value < 0 ? 0 : preveous + value;
    });
  };

  const fetchPokimons = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();

      const pokemonData = data.results.map(async (pokemon, index) => {
        const response = await fetch(pokemon.url);
        return await response.json();
      });
      const detailedPokenmonsData = await Promise.all(pokemonData);
      setPokemons(detailedPokenmonsData);
      setTotalPages(Math.floor(data.count / cardsPerPage));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokimons();
  }, [currentPage]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const filterPokemonsData = pokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  console.log("Filtered Pokemons: ", filterPokemonsData);
  return (
    <>
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
      <div className="pokemon-list-container">
        <ul className="pokemon-list">
          {filterPokemonsData.length > 0 ? (
            filterPokemonsData.map((pokemon, index) => (
              <Card key={index} pokemon={pokemon} />
            ))
          ) : (
            <img
              src="/—Pngtree—site 404 error page_3407766.png"
              alt="Data not found"
              className="not-found-image"
            />
          )}
        </ul>
      </div>
      <div className="footer">
        <div className="pagination">
          <button onClick={() => pageHandler(-1)} disabled={currentPage <= 0}>
            {"<< Prev"}
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => pageHandler(+1)}
            disabled={currentPage >= totalPages}
          >
            {"Next >>"}
          </button>
        </div>
      </div>
    </>
  );
};
