import { Container, Row, Col } from "react-bootstrap";
import PokeNav from "./PokeNav";
import PokeSearch from "./PokeSearch";
import PokeInfos from "./PokeInfos";


function Pokedex(props) {

  return (
    <Container fluid className="Pokedex">
      <Row>
        <Col lg={7} className="PokeInfos">
          <PokeInfos />
        </Col>
        <Col lg={5} className="p-0 PokeNav">
          <>
            <PokeSearch handleFilter={props.handleFilter} />
            <PokeNav pokemons={props.pokemons} />
          </>
        </Col>
      </Row>
    </Container>
  );
}

export default Pokedex;
