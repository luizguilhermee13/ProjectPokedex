export async function buscarPokemon(identificador) {
  const response = await fetch(`http://localhost:3000/api/pokemon/${encodeURIComponent(identificador)}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar Pokémon ${identificador}`);
  }

  const data = await response.json();

  const pokemon = {
    idPokemon: data.id,
    nome: data.name,

    tipo: data.types.map((item) => item.type.name),

    imagemPokemon: data.sprites.other["official-artwork"].front_default,

    altura: data.height,
    peso: data.weight,

    habilidades: data.abilities.map((item) => item.ability.name),

    status: data.stats,
  };

  return pokemon;
}
