import { Fragment, useState, useEffect } from "react";
import { Card, Carousel } from "react-bootstrap";
import { GiBodyHeight, GiWeight } from "react-icons/gi";
import { MdCatchingPokemon, MdNumbers } from "react-icons/md";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

function PokeInfos(props) {
  const selectedPokemon = props.selectedPokemon;
  const selectedPokeApiInfos = props.pokeApiInfos
  const originalPokemons = props.originalPokemons

  const [index, setIndex] = useState(0)

  const publicUrl = process.env.PUBLIC_URL;

  const types = [
    { name: "acier", color: "#B8B8D0" },
    { name: "combat", color: "#F08030" },
    { name: "dragon", color: "#7038F8" },
    { name: "eau", color: "#6890F0" },
    { name: "électrik", color: "#F8D030" },
    { name: "fée", color: "#EE99AC" },
    { name: "feu", color: "#F08030" },
    { name: "glace", color: "#98D8D8" },
    { name: "insecte", color: "#A8B820" },
    { name: "normal", color: "#A8A878" },
    { name: "plante", color: "#78C850" },
    { name: "poison", color: "#A040A0" },
    { name: "psy", color: "#F85888" },
    { name: "roche", color: "#B8A038" },
    { name: "sol", color: "#E0C068" },
    { name: "spectre", color: "#705898" },
    { name: "ténèbres", color: "#705848" },
    { name: "vol", color: "#A890F0" },
  ]

  let logos = [];
  for (let index = 0; index < types.length; index++) {
    logos.push(publicUrl + "/assets/images/logo-types/" + types[index].name + ".png");
  }
  
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    setIndex(0)
  }, [selectedPokemon]);

  return (
  selectedPokemon !== null ? (
    <>
  <div className={props.loadingInfos ? "pokeball" : "pokeball d-none"}>
    <div className="pokeball__button"></div>
  </div>
    <Card text="white" className={(props.loadingInfos ? "d-none" : "") + " px-4 py-3 rounded-4 shadow-lg"} style={{backgroundColor:  types.find((type) => selectedPokemon.apiTypes[selectedPokemon.apiTypes.length > 1 ? 1 : 0].name.toLowerCase() === type.name)?.color || "transparent"
      }}>
      <Card.Header>
        <h1>{selectedPokemon.name}</h1>
            <div className="types d-flex gap-3 justify-content-center my-3">
                {types.map(type =>
                    selectedPokemon.apiTypes.map((apiType, idx) => (
                        apiType.name.toLowerCase() === type.name ? (
                            <img key={idx} src={apiType.name.toLowerCase() === type.name ? logos[types.indexOf(type)] : ""} alt={type.name}/>
                        ) : null
                    )
                ))}
            </div>
      </Card.Header>
      <Carousel fade activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className="text-center" interval={3000}>
        <img
          src={selectedPokemon.image} 
          className={"pokeImg my-4" + ((parseInt(selectedPokemon.id)) === 133 ?  " w-50" : "")}
          alt={selectedPokemon.name + " default"}
        />
      </Carousel.Item>
      <Carousel.Item className="text-center" interval={3000}>
        <img
          src={selectedPokeApiInfos.sprites?.other?.dream_world?.front_default}
          className={"pokeImg my-4" + ((parseInt(selectedPokemon.id)) === 133 ?  " w-50" : "")}
          alt={selectedPokemon.name + " dream_world"}
        />
      </Carousel.Item>
      <Carousel.Item className="text-center" interval={3000}>
        <img
          src={selectedPokeApiInfos.sprites?.other?.home?.front_default}
          className={"pokeImg my-4" + ((parseInt(selectedPokemon.id)) === 133 ?  " w-50" : "")}
          alt={selectedPokemon.name + " home"}
        />
      </Carousel.Item>
      <Carousel.Item className="text-center" interval={3000}>
        <img
          src={selectedPokeApiInfos.sprites?.other?.['official-artwork']?.front_shiny}
          className={"pokeImg my-4" + ((parseInt(selectedPokemon.id)) === 133 ?  " w-50" : "")}
          alt={selectedPokemon.name + " shiny"}
        />
        <Carousel.Caption>
          <h3>Shiny</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
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
        <div className="infos-right d-flex flex-column align-items-center" style={(parseInt(selectedPokemon.id)) === 133 ? {width: "70%"} : {width: "60%"}}>
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
