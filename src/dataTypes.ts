export interface paylaod {
  limit: Number,
  offset: Number,
}
export interface paylaodDetail {
  id: Number,
}

export interface PokemonData {
  id?: Number,
  name: String,
  pokemon_v2_pokemonsprites?: Sprites [] 
}

export interface Sprites {
  sprites: string
}

export interface PokemonState {
  id: Number,
  name: String,
  pokemon_v2_pokemonsprites: Sprites[]
}

export interface PokemonDetail {
  id?: Number,
  name: String,
  pokemon_v2_pokemonsprites?: Sprites []
  pokemon_v2_pokemonabilities?: []
  pokemon_v2_pokemonstats?: []
  pokemon_v2_pokemontypes?: []
}