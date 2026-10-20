import { Pokemon } from "./pokemon.js";

export async function buscarPokemon(identificador) {
  const response = await fetch(`http://localhost:3000/api/pokemon/${encodeURIComponent(identificador)}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar Pokémon ${identificador}`);
  }

  const data = await response.json();

  return new Pokemon(data);
}
