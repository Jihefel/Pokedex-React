import { Container, Row, Col } from "react-bootstrap";
import PokeNav from "./PokeNav";
import PokeInfos from "./PokeInfos";

function Pokedex(props) {
  return (
    <Container fluid className="Pokedex">
      <Row>
        <Col sm={7}>
          <PokeInfos />
        </Col>
        <Col sm={5}>
          <PokeNav pokemons={props.pokemons} />
        </Col>
      </Row>
    </Container>
  );
}

export default Pokedex;
