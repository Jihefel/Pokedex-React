import { NavLink } from "react-router-dom";

export default function PokeNav(props) {
  return (
    <nav className="pokemon-list">
      {props.pokemons.map((pokemon) => (
        <NavLink key={pokemon.id} variant="danger" to={`/${pokemon.name}`}>
          {pokemon.name}
          <img src={pokemon.sprite} alt={pokemon.name} />
        </NavLink>
      ))}
    </nav>
  );
}
