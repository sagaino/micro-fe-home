import React, { useEffect, useState } from "react";
import PokemonService from "../api/services/pokemonService";
import { PokemonData } from "../dataTypes";
import PokemonItem from "./pokemonItem";
import "../index.css"

const HomePage = () => {
  const [pokemon, setPokemon] = useState<PokemonData[]>([])
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState<any>(0);
  const [counter, setCounter] = useState<any>(0)
  const [filter, setFilter] = useState({
    limit: 20,
    offset: 0,
  })

  const onScroll = () => {
    const scrollY = window.scrollY;
    setCurrentScrollY(scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, []);

  const fetchPokemon = async () => {
    setCurrentPage(filter.offset)
    try {
      const result = await PokemonService.fetchPokemon(filter)
      if (!result) return;
      const dataResult = [...pokemon, ...result]
      setPokemon(dataResult as any);
      setCounter(currentPage + filter.limit)
      setCurrentPage(currentPage + filter.limit)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchPokemon();
  }, [filter.offset])

  const appendList = async () => {
    const target = document.getElementById("pokemonContainer");
    if (!target) return;
    const dimension = target.getBoundingClientRect();
    const browserHeight = window.innerHeight;
    const top = dimension.top;
    const height = dimension.height;

    if (counter === 0 && currentPage === 0) return;
    if (top + height > browserHeight) return;
    const result = currentPage + filter.limit;
    if (result - counter !== 20) return;
    if (result <= currentPage) return;
    setFilter({ ...filter, offset: result - 20 })
  }

  useEffect(() => {
    appendList();
  }, [currentScrollY])

  return (
    <div>
      <div id="pokemonContainer" className="px-5 gap-5 my-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {
          pokemon.map((item, idx) => (
            <PokemonItem
              key={idx}
              id={item.id}
              name={item.name}
              pokemon_v2_pokemonsprites={item.pokemon_v2_pokemonsprites}
            />
          ))
        }
      </div>
    </div>
  );
};

export default HomePage;
