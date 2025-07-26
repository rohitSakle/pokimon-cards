import { useState, useEffect } from "react";
import { Loading } from "./loading";
import { Error } from "./Error";
import "./style.css";
import { Card } from "./Card";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CardList } from "./cardList";

export const PokemonCards = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // search term state
  const [searchTerm, setSearchTerm] = useState("");

  //  pagination
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 25; // or any number you want per page
  const [totalPages, setTotalPages] = useState(0);

  // API URL with pagination
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

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <CardList filterPokemonsData={filterPokemonsData} />

      <Footer
        currentPage={currentPage}
        totalPages={totalPages}
        pageHandler={pageHandler}
      />
    </>
  );
};
