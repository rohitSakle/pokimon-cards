import { Card } from "./Card";

export const CardList = ({ filterPokemonsData }) => {
  return (
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
  );
};
