import React, { useState } from "react";
import { PokemonDetail } from "../dataTypes";

const DetailPokemonItem = (props: PokemonDetail) => {
  const { name, id, pokemon_v2_pokemonsprites, pokemon_v2_pokemontypes, pokemon_v2_pokemonabilities, pokemon_v2_pokemonstats } = props
  const [img, setImg] = useState(pokemon_v2_pokemonsprites?.map((e) => e.sprites))

  return (
    <div className="flex flex-col items-center gap-10 md:flex-col md:items-center lg:flex-row lg:items-start">
      <div className="bg-slate-900 h-[330px] relative rounded-lg max-w-xs flex flex-col items-center p-5">
        <div className="absolute left-[20px]">{`#${id}`}</div>
        <img src={img?.toString()} width={250} height={250} alt="img-pokemon" />
        <div className="uppercase font-semibold text-[30px] tracking-wider text-amber-400 text-center">{name}</div>
      </div>

      <div className="bg-slate-900 w-full h-auto rounded-lg p-[20px]">
        <div className="flex items-center gap-3 pb-[10px]">
          <div className="md:w-1/6 lg:w-[11%]">
            Type :
          </div>
          <ul className="flex gap-3 h-[36px]">
            {
              pokemon_v2_pokemontypes?.map((item: any, idx: any) => (
                <li key={idx} className="bg-slate-700 px-2 py-1 h-full rounded">
                  {item?.pokemon_v2_type?.name}
                </li>
              ))
            }
          </ul>
        </div>

        <div className="flex items-center gap-3 pb-[10px]">
          <div className="md:w-1/6 lg:w-[11%]">
            Abilities :
          </div>
          <ul className="flex gap-3 h-[36px]">
            {
              pokemon_v2_pokemonabilities?.map((item: any, idx: any) => (
                <li key={idx} className="bg-slate-700 px-2 py-1 h-full rounded">
                  {item?.pokemon_v2_ability?.name}
                </li>
              ))
            }
          </ul>
        </div>

        <div>
          {
            pokemon_v2_pokemonstats?.map((item: any, idx: any) => (
              <div key={idx}>
                <div className="text-[14px]">
                  {`${item.pokemon_v2_stat.name} :`}
                </div>
                <div key={idx} className="bg-slate-700 my-2 rounded p-1">

                  <div className="bg-slate-900 rounded p-1" style={{ width: `${item.base_stat > 100 ? 100 : item.base_stat}%` }}>
                    {item.base_stat}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default DetailPokemonItem;
