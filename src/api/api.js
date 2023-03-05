import axios from "axios";

export function getPokemons() {
    return axios.get('https://pokebuildapi.fr/api/v1/pokemon')
}

export function getInfos() {
    return axios.get('https://pokeapi.co/api/v2/pokemon/?limit=898')
}