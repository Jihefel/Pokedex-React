import axios from "axios";

export function getPokemons() {
    return axios.get('https://pokebuildapi.fr/api/v1/pokemon')

}