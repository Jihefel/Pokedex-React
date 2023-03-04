import Loading from "./components/Loading";
import Pokedex from "./components/Pokedex";
import PokeInfos from "./components/PokeInfos";
import Error from "./components/Error";
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getPokemons } from "./api/api";

function App() {
  const [originalPokemons, setOriginalPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState(0);

  useEffect(() => {
    getPokemons()
      .then((pokemons) => {
        setPokemons(pokemons.data);
        setOriginalPokemons(pokemons.data);
        setTimeout(() => {
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
  }, [region, originalPokemons]);

  const handleFilter = (e) => {
    setRegion(parseInt(e.target.value));
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <Routes>
          <Route
            path="/"
            element={
              <Pokedex pokemons={pokemons} handleFilter={handleFilter} />
            }
          >
            {pokemons.map((pokemon, index) => (
              <Route
                key={index}
                path={`/${pokemon.name}`}
                element={<PokeInfos />}
              />
            ))}
          </Route>
          <Route path="/*" element={<Error />} />
        </Routes>
      </>
    );
  }
}

export default App;
