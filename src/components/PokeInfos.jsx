import { Fragment, useState, useEffect } from "react";
import { Card, Carousel } from "react-bootstrap";
import { GiBodyHeight, GiWeight } from "react-icons/gi";
import { MdCatchingPokemon, MdNumbers } from "react-icons/md";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BsStars } from "react-icons/bs";


function PokeInfos(props) {
  const selectedPokemon = props.selectedPokemon;
  const selectedPokeApiInfos = props.pokeApiInfos
  const originalPokemons = props.originalPokemons

  const [index, setIndex] = useState(0)

  const publicUrl = process.env.PUBLIC_URL;

  const types = [
    { name: "acier", color: "#60a2b950" },
    { name: "combat", color: "#ff810050" },
    { name: "dragon", color: "#7038F850" },
    { name: "eau", color: "#2481f050" },
    { name: "électrik", color: "#fac10050" },
    { name: "fée", color: "#ef71f050" },
    { name: "feu", color: "#e7232450" },
    { name: "glace", color: "#3dd9ff50" },
    { name: "insecte", color: "#A8B82050" },
    { name: "normal", color: "#a0a2a050" },
    { name: "plante", color: "#3da22450" },
    { name: "poison", color: "#A040A050" },
    { name: "psy", color: "#ef3f7a50" },
    { name: "roche", color: "#B8A03850" },
    { name: "sol", color: "#92501b50" },
    { name: "spectre", color: "#70589850" },
    { name: "ténèbres", color: "#00084850" },
    { name: "vol", color: "#A890F050" },
  ]

  let logos = [];
  for (let index = 0; index < types.length; index++) {
    logos.push(publicUrl + "/assets/images/logo-types/" + types[index].name + ".png");
  }
  
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  const bgColor1 = types.find((type) => selectedPokemon?.apiTypes[0].name.toLowerCase() === type.name)?.color || "transparent";
  const bgColor2 = types.find((type) => selectedPokemon?.apiTypes[1]?.name.toLowerCase() === type.name)?.color || bgColor1;

  useEffect(() => {
    setIndex(0)
  }, [selectedPokemon]);

  return (
  selectedPokemon !== null ? (
    <>
  <div className={props.loadingInfos ? "pokeball" : "pokeball d-none"}>
    <div className="pokeball__button"></div>
  </div>
    <Card text="white" className={(props.loadingInfos ? "d-none" : "") + " px-4 py-3 rounded-4 shadow-lg"} style={{background: `linear-gradient(${bgColor2},${bgColor1})`}}>
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
        <Carousel.Caption className="pb-0">
          <h5 className="m-0"><BsStars/>{" "}Shiny</h5>
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
