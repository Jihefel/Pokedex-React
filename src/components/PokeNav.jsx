import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function PokeNav(props) {

  const handleClick = (pokemon) => {
    props.setLoadingInfos(true)
    props.setSelectedPokemon(pokemon)
    setTimeout(() => {
      props.setLoadingInfos(false)
    }, 1000);
  }
  

  return (
    <nav className="pokemon-list">
      {props.pokemons.map((pokemon) => (
        <Button variant="danger" key={pokemon.id}>
          <NavLink variant="danger" to={`${pokemon.name}`} onClick={() => handleClick(pokemon)} >
            <span className="text-black2">#{pokemon.id}</span>{" "}
            <span>{pokemon.name}</span>
            <img src={pokemon.sprite} alt={pokemon.name} className="sprite" />
          </NavLink>
        </Button>
      ))}
    </nav>
  );
}
