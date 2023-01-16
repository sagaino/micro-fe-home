import { useEffect, useState } from "react";
import PokemonService from "../api/services/pokemonService";
import { PokemonDetail } from "../dataTypes";
import DetailPokemonItem from "./detailPokemonItem";
import "../index.css"

const DetailPokemon = () => {
  const [detailPokemon, setDetailPokemon] = useState([])

  const fetchDetailPokemon = async () => {
    const params = window.location.pathname.split("/").pop()
    const payload = {
      id: parseInt(params as string, 10)
    }
    try {
      const result = await PokemonService.fetchDetailPokemon(payload);
      setDetailPokemon(result);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchDetailPokemon();
  }, [])

  const handleBack = () => {
    window.location.href = "/";
  }

  return (
    <div>
      <div className="p-4 md:p-20 lg:p-20">
        {
          detailPokemon.map((item: PokemonDetail, idx: any) => (
            <DetailPokemonItem
              key={idx}
              id={item.id}
              name={item.name}
              pokemon_v2_pokemonsprites={item.pokemon_v2_pokemonsprites}
              pokemon_v2_pokemontypes={item.pokemon_v2_pokemontypes}
              pokemon_v2_pokemonabilities={item.pokemon_v2_pokemonabilities}
              pokemon_v2_pokemonstats={item.pokemon_v2_pokemonstats}
            />
          ))
        }
      </div>
    </div>
  );
};

export default DetailPokemon;
