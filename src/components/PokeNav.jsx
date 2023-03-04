import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function PokeNav(props) {
  return (
    <nav className="pokemon-list">
      {props.pokemons.map((pokemon) => (
        <Button variant="danger" key={pokemon.id}>
          <NavLink variant="danger" to={`${pokemon.name}`}>
            <span className="text-black2">#{pokemon.id}</span>{" "}
            <span>{pokemon.name}</span>
            <img src={pokemon.sprite} alt={pokemon.name} />
          </NavLink>
        </Button>
      ))}
    </nav>
  );
}
