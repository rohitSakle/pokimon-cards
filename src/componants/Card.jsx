export const Card = ({ pokemon }) => {
  return (
    <>
      <li className="pokemon-cards">
        <img
          className="pokemon-img"
          src={
            pokemon.sprites.other.dream_world.front_default ??
            pokemon.sprites.other.home.front_default
          }
          alt={pokemon.name}
        />

        <span className="pokemon-name">{pokemon.name}</span>
      </li>
    </>
  );
};
