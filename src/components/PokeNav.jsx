import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { MdNumbers } from "react-icons/md";


export default function PokeNav(props) {

  
  const handleClick = (poke) => {
    props.setLoadingInfos(true)
    props.setSelectedPokemon(poke)
    setTimeout(() => {
      props.setLoadingInfos(false)
    }, 1000);

    props.pokeSound()
    
  }
  
  
  return (
    <nav className="pokemon-list pb-3">
      {props.pokemons.map((pokemon) => (
        <Button variant="danger" key={pokemon.id}>
          <NavLink variant="danger" to={`${pokemon.name}`} onClick={() => handleClick(pokemon)} >
            <small className="text-black2 d-flex align-items-center py-2"><MdNumbers/>{pokemon.id}</small>{" "}
            <h6 className="pokename">{pokemon.name}</h6>
            <img src={pokemon.sprite} alt={pokemon.name} className="sprite" loading="lazy" width="96" height="96" />
          </NavLink>
        </Button>
      ))}
    </nav>
  );
}
