import { Container, Row, Col } from "react-bootstrap";
import PokeNav from "./PokeNav";
import PokeSearch from "./PokeSearch";
import PokeInfos from "./PokeInfos";
import Loading from "./Loading";
import BottomButtons from "./BottomButtons";
import React, { useState, useEffect, useRef } from 'react';


function Pokedex(props) {
  const logoPokemon = process.env.PUBLIC_URL + "/assets/images/International_Pokémon_logo.svg.png"

  const [scrollTop, setScrollTop] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

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


  const pokeSound = () => {
    const pokeballSoundFile = process.env.PUBLIC_URL + "/assets/audio/pokeball_move.mp3";

    const pokeballMoveSound = new Audio(pokeballSoundFile)
    if (isMuted) {
      pokeballMoveSound.volume = 0;
    } else {
      pokeballMoveSound.volume = 0.1;
    }
    setTimeout(() => {
      pokeballMoveSound.play();
      
    }, 100);
  }
  

  return (
    <>
    <Loading isLoading={props.isLoading} />
    <Container fluid className={"Pokedex" + (props.isLoading ? " d-none" : "")}>
      <Row>
        <Col lg={7} className="PokeInfos">
          <PokeInfos pokemons={props.pokemons} selectedPokemon={props.selectedPokemon} originalPokemons={props.originalPokemons} loadingInfos={props.loadingInfos} pokeApiInfos={props.pokeApiInfos} setLoadingInfos={props.setLoadingInfos} />
          <BottomButtons visible={visible} goTop={goTop} isMuted={isMuted} setIsMuted={setIsMuted} />
        </Col>
        <Col lg={5} className="pe-0 PokeNav" onScroll={handleScroll} ref={pokeNav} >
          <>
            <img src={logoPokemon} alt="Logo Pokémon" className="img-fluid w-25 d-block mx-auto my-4"/>
            <PokeSearch handleFilter={props.handleFilter} region={props.region} regions={props.regions} search={props.search} searchSubmit={(e) => props.searchSubmit(e)} />
            <PokeNav pokemons={props.pokemons}  setSelectedPokemon={props.setSelectedPokemon} setLoadingInfos={props.setLoadingInfos} pokeSound={pokeSound} />
          </>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Pokedex;
