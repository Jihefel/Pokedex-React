
import Pokedex from "./components/Pokedex";
import PokeInfos from "./components/PokeInfos";
import PokeNav from "./components/PokeNav";
import PokeSearch from "./components/PokeSearch";
import Error from "./components/Error";
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getPokemons } from "./api/api";

function App() {
  
  const [originalPokemons, setOriginalPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState(0);
  const [loadingInfos, setLoadingInfos] = useState(false);

  const navigate = useNavigate()
  
  const regions = ["All", "Kanto", "Johto", "Hoenn", "Sinnoh", "Unys", "Kalos", "Alola", "Galar"]

  useEffect(() => {
    getPokemons()
    .then((pokemons) => {
      setPokemons(pokemons.data);
      setOriginalPokemons(pokemons.data);
      setTimeout(() => {
        navigate(`/${regions[0]}`)
        setIsLoading(false); // Définir isLoading sur false lorsque la requête est terminée
        }, 2900);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (region === 0) {
      setPokemons(originalPokemons);
    } else {
      const filteredPokemons = originalPokemons.filter(
        (pokemon) => parseInt(pokemon.apiGeneration) === region
      );
      setPokemons(filteredPokemons);
    }
    navigate(`/${regions[region]}`)
  }, [region]);
  
  
  const handleFilter = (e) => {
    setRegion(parseInt(e.target.value));
  };
  

    return (
      <>
        <Routes>
          {regions.map((reg, index) =>(
          <Route
            path={`/${reg}`}
            key={index}
            element={
              <Pokedex pokemons={pokemons} handleFilter={handleFilter} region={region} regions={regions} selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} loadingInfos={loadingInfos} setLoadingInfos={setLoadingInfos} isLoading={isLoading} />
            }>  
            {pokemons.map((pokemon, index) => (
              <Route
              key={index}
              path={`/${reg}/${pokemon.name}`}
              element={<PokeInfos selectedPokemon={selectedPokemon} loadingInfos={loadingInfos} />}
              />
            ))}
          </Route>
              ))}
          <Route path="/*" element={<Error />} />
        </Routes>
      </>
    );
  }

export default App;
