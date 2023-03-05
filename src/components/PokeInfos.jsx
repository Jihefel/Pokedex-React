import { Fragment } from "react";
import { Card } from "react-bootstrap";

function PokeInfos(props) {
  const selectedPokemon = props.selectedPokemon;
  const selectedPokeApiInfos = props.pokeApiInfos

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
    <Card text="white" className={props.loadingInfos ? "d-none" : null}>
      <Card.Header>
        <h1>{selectedPokemon.name}</h1>
            <div className="types d-flex gap-3 justify-content-center my-3">
                {types.map(type =>
                    selectedPokemon.apiTypes.map((apiType, idx) => (
                        apiType.name.toLowerCase() === type ? (
                            <img key={idx} src={apiType.name.toLowerCase() === type ? logos[types.indexOf(type)] : null} alt={type}/>
                        ) : null
                    )
                ))}
            </div>
      </Card.Header>
      <Card.Img variant="top" src={selectedPokemon.image} />
      <Card.Body className="d-flex justify-content-between align-items-stretch">
        <div className="infos-left">
          <dl>
            <dt>ID :</dt>
            <dd>#{selectedPokemon.id}</dd>
            <dt>Taille :</dt>
            <dd>{(parseInt(selectedPokeApiInfos.height)/10).toFixed(1)}m</dd>
            <dt>Poids :</dt>
            <dd>{(parseInt(selectedPokeApiInfos.weight)/10).toFixed(1)}kg</dd>
          </dl>
        </div>
        <div className="infos-right">

            <fieldset>

            <legend>Evolution{selectedPokemon.apiPreEvolution !== "none" && selectedPokemon.apiEvolutions.length !== 0 ? "s" : ""} :</legend>
            {selectedPokemon.apiPreEvolution !== "none" ? (
              <Fragment key={selectedPokemon.name}>
              <dt>Précédente</dt>
                <dd>
                  {selectedPokemon.apiPreEvolution.name}
                </dd>
                  <img src={props.pokemons[selectedPokemon.apiPreEvolution.pokedexIdd-1].sprite} alt="" />
            </Fragment>
            ) : null}
            {selectedPokemon.apiEvolutions.length !== 0 ? (
              <>
            <dt>Suivante :</dt>
            {selectedPokemon.apiEvolutions.map((evolution, index) => (
              <Fragment key={evolution.pokedexId}>
                <dd key={index}>
                  {evolution.name}
                </dd>
                  <img key={evolution.pokedexId} src={props.pokemons[evolution.pokedexId-1].sprite} alt="" />
              </Fragment>
            ))}
            </>
            ) : null}
            </fieldset>
        </div>
      </Card.Body>
    </Card>
    </>
  ) : null)
}

export default PokeInfos;
