import { Fragment } from "react";
import { Card, Dropdown, DropdownButton } from "react-bootstrap";
import { GiBodyHeight, GiWeight } from "react-icons/gi";
import { MdCatchingPokemon, MdNumbers } from "react-icons/md";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

function PokeInfos(props) {
  const selectedPokemon = props.selectedPokemon;
  const selectedPokeApiInfos = props.pokeApiInfos
  const originalPokemons = props.originalPokemons


  const publicUrl = process.env.PUBLIC_URL;

  const types = [
    "acier",
    "combat",
    "dragon",
    "eau",
    "électrik",
    "fée",
    "feu",
    "glace",
    "insecte",
    "normal",
    "plante",
    "poison",
    "psy",
    "roche",
    "sol",
    "spectre",
    "ténèbres",
    "vol",
  ];

  let logos = [];
  for (let index = 0; index < types.length; index++) {
    logos.push(publicUrl + "/assets/images/logo-types/" + types[index] + ".png");
  }
  
  return (
  selectedPokemon !== null ? (
    <>
  <div className={props.loadingInfos ? "pokeball" : "pokeball d-none"}>
    <div className="pokeball__button"></div>
  </div>
    <Card text="white" className={(props.loadingInfos ? "d-none" : "") + " px-4 py-3 rounded-4 shadow-lg"}>
      <Card.Header>
        <h1>{selectedPokemon.name}</h1>
            <div className="types d-flex gap-3 justify-content-center my-3">
                {types.map(type =>
                    selectedPokemon.apiTypes.map((apiType, idx) => (
                        apiType.name.toLowerCase() === type ? (
                            <img key={idx} src={apiType.name.toLowerCase() === type ? logos[types.indexOf(type)] : ""} alt={type}/>
                        ) : null
                    )
                ))}
            </div>
      </Card.Header>
      <Card.Img variant="top" src={selectedPokemon.image} className=" pokeImg my-4" />
      <Card.Body className="d-flex justify-content-between px-0">
        <div className="infos-left px-4">
          <dl className="d-flex flex-column gap-4 pt-1 pb-3">
            <div>
              <dt className="d-flex align-items-center gap-2"><MdNumbers/>ID Pokédex :</dt>
              <dd>{selectedPokemon.id}</dd>
            </div>
            <div>
              <dt className="d-flex align-items-center gap-2"> <GiBodyHeight/>Taille :</dt>
              <dd>{(parseInt(selectedPokeApiInfos.height)/10).toFixed(1)} &#x6D;</dd>
            </div>
            <div>
              <dt className="d-flex align-items-center gap-2"><GiWeight/> Poids :</dt>
              <dd>{(parseInt(selectedPokeApiInfos.weight)/10).toFixed(1)} &#x338F;</dd>
            </div>
          </dl>
        </div>
        <div className="infos-right d-flex flex-column align-items-center">
            <fieldset>
              <legend className="d-flex align-items-center gap-2 mb-3"><MdCatchingPokemon/>Evolution{selectedPokemon.apiPreEvolution !== "none" && selectedPokemon.apiEvolutions.length !== 0 ? "s" : ""} :</legend>
              { selectedPokemon.apiEvolutions.length === 0 && selectedPokemon.apiPreEvolution === "none" ? 
              <p>Aucune</p> : (
                <div className="d-flex gap-5 justify-content-center">
                {selectedPokemon.apiPreEvolution !== "none" ? (
                  <Fragment key={selectedPokemon.name}>
                  <div className="d-flex flex-column align-items-center gap-2">
                    <GrFormPrevious />
                      <figure className="text-center mt-2">
                        <figcaption>
                        <small className="id-evolution">{"# " + originalPokemons[selectedPokemon.apiPreEvolution.pokedexIdd-1].id}</small>
                          {selectedPokemon.apiPreEvolution.name}
                          </figcaption>
                        <img src={originalPokemons[selectedPokemon.apiPreEvolution.pokedexIdd-1].sprite} alt={originalPokemons[selectedPokemon.apiPreEvolution.pokedexIdd-1].name} />
                      </figure>
                  </div>
                </Fragment>
                ) : null}
                {selectedPokemon.apiEvolutions.length !== 0 ? (
                    <div className="d-flex flex-column align-items-center gap-2" key={selectedPokemon.name + " " + selectedPokemon.id}>
                      <GrFormNext/>
                      <div className={"d-flex align-items-center" + (selectedPokemon.apiEvolutions.length > 2 ? " flex-wrap justify-content-around" : " flex-column")}>
                      {selectedPokemon.apiEvolutions.map((evolution, index) => (
                        <Fragment key={evolution.pokedexId}>
                      <figure  className={"text-center mt-2" + (selectedPokemon.apiEvolutions.length > 2 ? " mb-0" : "")}>
                          <figcaption key={index}>
                            <small className="id-evolution">{"# " + originalPokemons[evolution.pokedexId-1].id}</small>
                            {evolution.name}
                          </figcaption>
                          <img src={originalPokemons[evolution.pokedexId-1].sprite} alt={originalPokemons[evolution.pokedexId-1].name} />
                      </figure>
                      </Fragment>
                      ))}
                      </div>
                    </div>
                ) : null}
              </div>
                )
              }
            </fieldset>
        </div>
      </Card.Body>
    </Card>
    </>
  ) : null)
}

export default PokeInfos;
