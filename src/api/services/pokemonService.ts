import axios from "axios";
import { paylaod, paylaodDetail, PokemonData, Sprites } from "../../dataTypes";

const BASE_URL = "https://beta.pokeapi.co/graphql/v1beta";

const config = {
  headers: {
    "Content-Type": 'application/json'
  }
}

export default class PokemonService {
  static async fetchPokemon (payload : paylaod) {
    try {
      const data = await axios.post(`${BASE_URL}`, {
        query: `query PokeApiQuery ($limit: Int!, $offset: Int!) {
          pokemon_v2_pokemon(limit: $limit, offset: $offset) {
            id
            name
            pokemon_v2_pokemonsprites {
              sprites
            }
          }
        }`,
        variables: payload,
      }, config);

      const dataset = data.data.data.pokemon_v2_pokemon;
      const dataImg = dataset.map((dataObject : PokemonData) => dataObject.pokemon_v2_pokemonsprites)
      dataImg.map((item : Sprites []) => (
        item.map((itemSpirite) => {
          const change = itemSpirite;
          const parseImg = JSON.parse(change?.sprites)
          change.sprites = parseImg.front_default
          itemSpirite = change
          return itemSpirite
        })
      ))
      return dataset
    } catch (err : any) {
      throw err.message;
    }
  }

  static async fetchDetailPokemon (paylod: paylaodDetail) {
    try {
      const data = await axios.post(`${BASE_URL}`, {
        query: `query DetailPokeApiQuery ($id: Int!) {
          pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
            id
            name
            pokemon_v2_pokemonstats {
              base_stat
              pokemon_v2_stat {
                name
              }
            }
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
              }
            }
            pokemon_v2_pokemonabilities {
              pokemon_v2_ability {
                name
              }
            }
            pokemon_v2_pokemonsprites {
              sprites
            }
          }
        }`,
        variables: paylod,
      }, config)

      const dataset = data.data.data.pokemon_v2_pokemon;
      const dataImg = dataset.map((dataObject : PokemonData) => dataObject.pokemon_v2_pokemonsprites)
      dataImg.map((item : Sprites []) => {
        item.map((itemSpirite) => {
          const change = itemSpirite;
          const parseImg = JSON.parse(change?.sprites)
          change.sprites = parseImg.front_default
          itemSpirite = change
          return itemSpirite
        })
      })
      return dataset;
    } catch (err : any) {
      throw err.message
    }
  }
}