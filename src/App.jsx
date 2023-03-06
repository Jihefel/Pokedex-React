
import Pokedex from "./components/Pokedex";
import PokeInfos from "./components/PokeInfos";
import PokeNav from "./components/PokeNav";
import PokeSearch from "./components/PokeSearch";
import Error from "./components/Error";
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getPokemons, getInfos } from "./api/api";
import axios from "axios";

function App() {
  
  const [originalPokemons, setOriginalPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [pokeApiInfos, setPokeApiInfos] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState(0);
  const [loadingInfos, setLoadingInfos] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchValueSubmited, setSearchValueSubmited] = useState("");

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
    if (selectedPokemon !== null) {
      getInfos()
        .then((pokemons) => {
          axios.get(pokemons.data.results[selectedPokemon.id-1].url)
            .then((poke)=> {
              setPokeApiInfos(poke.data);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [loadingInfos]);
  


useEffect(() => {
    if (region === 0) {
      setPokemons(originalPokemons);
    } else {
      const originalsCopy = [...originalPokemons];
      const filteredPokemons = originalsCopy.filter(
        (pokemon) => parseInt(pokemon.apiGeneration) === region
      );
      setFilteredPokemons(filteredPokemons);
      setPokemons(filteredPokemons);
    }
    navigate(`/${regions[region]}/`)
  }, [region]);
  
  
  const handleFilter = (e) => {
    setRegion(parseInt(e.target.value));
  };

  const search = (event) => {
    setSearchValue(event.target.value);
  }

  const pokeCopy = [...originalPokemons];
  const filterCopy = [...filteredPokemons];
  
  useEffect(() => {
    let newPokemons = pokeCopy;
    
    if (region !== 0) {
      newPokemons = filterCopy;
    }
    
    if (searchValue === "") {
      setPokemons(newPokemons);
    } else {
      const pokemonSearched = newPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchValue.toLowerCase()));
      setPokemons(pokemonSearched);
    }
    
    if (searchValueSubmited !== "") {
      let pokemonFound = newPokemons.find(pokemon => pokemon.name.toLowerCase() === searchValueSubmited.toLowerCase());
      if (pokemonFound) {
        setSearchValue("");
        setSearchValueSubmited("");
        setSelectedPokemon(pokemonFound);
        setPokemons(pokeCopy);
        navigate(`/${regions[region]}/${pokemonFound.name}`);
        pokemonFound = false;
      } else if (newPokemons !== originalPokemons) {
        setPokemons(originalPokemons);
      }
      setLoadingInfos(true)
      setTimeout(() => {
        setLoadingInfos(false)
      }, 1000);
    }
  }, [searchValue, searchValueSubmited]);
  
  

  
  

  const searchSubmit = (e) => {
    e.preventDefault();
    setSearchValueSubmited(e.target[0].value);
  }
  

    return (
      <>
        <Routes>
          {regions.map((reg, index) =>(
          <Route
            path={`/${reg}`}
            key={index}
            element={
              <Pokedex pokemons={pokemons} handleFilter={handleFilter} originalPokemons={originalPokemons} region={region} regions={regions} selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} pokeApiInfos={pokeApiInfos} loadingInfos={loadingInfos} setLoadingInfos={setLoadingInfos} isLoading={isLoading} search={search} searchSubmit={(e) => searchSubmit(e)}/>
            }>  
            {pokemons.map((pokemon, index) => (
              <Route
              key={index}
              path={`${pokemon.name}`}
              element={<PokeInfos  pokemons={pokemons} selectedPokemon={selectedPokemon} loadingInfos={loadingInfos} pokeApiInfos={pokeApiInfos} setLoadingInfos={setLoadingInfos} originalPokemons={originalPokemons} />}
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
