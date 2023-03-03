import Pokedex from "./components/Pokedex";
import Test from "./components/Test";
import PokeInfos from "./components/PokeInfos";
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getPokemons } from "./api/api";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons()
      .then((pokemons) => setPokemons(pokemons.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Pokedex pokemons={pokemons} />}>
          {pokemons.map((pokemon, index) => (
          <Route key={index} path={`/${pokemon.name}`} element={<PokeInfos />} />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
