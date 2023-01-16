import { useState } from "react";
import { PokemonData } from "../dataTypes";
import { Link } from "react-router-dom";

const PokemonItem = (props: PokemonData) => {
  const { name, id, pokemon_v2_pokemonsprites } = props;
  const [img, setImg] = useState(pokemon_v2_pokemonsprites?.map((e) => e.sprites))
  return (
    <Link to={`/pokemon/${id}`}>
      <div
        className="bg-slate-900 rounded-xl flex flex-col items-center justify-center p-5 cursor-pointer"
      >
        <img src={img?.toString()} alt="img-pokemon" />
        <div>{`#${id}`}</div>
        <div className="uppercase font-semibold tracking-wider text-amber-400 text-center">{name}</div>
      </div>
    </Link>
  );
};

export default PokemonItem;
