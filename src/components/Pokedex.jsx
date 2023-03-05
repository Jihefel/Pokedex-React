import { Container, Row, Col } from "react-bootstrap";
import PokeNav from "./PokeNav";
import PokeSearch from "./PokeSearch";
import PokeInfos from "./PokeInfos";
import Loading from "./Loading";
import ScrollButton from "./ScrollButton";
import React, { useState, useEffect, useRef } from 'react';


function Pokedex(props) {
  const logoPokemon = process.env.PUBLIC_URL + "/assets/images/International_Pokémon_logo.svg.png"

  const [scrollTop, setScrollTop] = useState(0);
  const [visible, setVisible] = useState(false);

  const pokeNav = useRef(null)

  function handleScroll(event) {
    setScrollTop(event.target.scrollTop);
    if (scrollTop > 180) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }

  const goTop = () =>{
    pokeNav.current.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };


  return (
    <>
    <Loading isLoading={props.isLoading} />
    <Container fluid className={"Pokedex" + (props.isLoading ? " d-none" : "")}>
      <Row>
        <Col lg={7} className="PokeInfos">
          <PokeInfos  selectedPokemon={props.selectedPokemon} loadingInfos={props.loadingInfos} />
          <ScrollButton visible={visible} goTop={goTop} />
        </Col>
        <Col lg={5} className="pe-0 PokeNav" onScroll={handleScroll} ref={pokeNav} >
          <>
            <img src={logoPokemon} alt="Logo Pokémon" className="img-fluid w-25 d-block mx-auto my-4"/>
            <PokeSearch handleFilter={props.handleFilter} region={props.region} regions={props.regions} />
            <PokeNav pokemons={props.pokemons}  setSelectedPokemon={props.setSelectedPokemon} setLoadingInfos={props.setLoadingInfos} />
          </>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Pokedex;
