import { Card } from "react-bootstrap";

function PokeInfos(props) {
  const selectedPokemon = props.selectedPokemon;

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
      <Card.Body className="d-flex">
        <div className="infos-left">
          
        </div>
        <div className="infos-right">

        </div>
      </Card.Body>
    </Card>
    </>
  ) : null)
}

export default PokeInfos;
