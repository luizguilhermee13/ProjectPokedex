document.addEventListener("DOMContentLoaded", async () => {
  const containerCard = document.getElementById("containerCard");
  const quantidade = 12;
  const pokemonsSelecionados = [];

  for (let i = 1; i <= quantidade; i++) {
    try {
      const response = await fetch(`http://localhost:3000/api/pokemon/${i * 4}`); //Buscando os Pokémon

      if (!response.ok) {
        throw new Error(`Erro ao buscar Pokémon ${i}`);
      }

      const data = await response.json();

      const pokemons = {
        idPokemon: data.id,
        nome: data.name,
        tipo: data.types.map((types) => types.type.name),
        imagemPokemon: data.sprites.other["official-artwork"].front_default,
      };

      pokemonsSelecionados.push(pokemons);
    } catch (erro) {
      console.error(erro);
    }
  }

  // Percorrendo os Pokémon armazenados no array de objeto
  pokemonsSelecionados.forEach((item) => {
    const cardPokemon = document.createElement("div");

    cardPokemon.classList.add("card", `tipo-${item.tipo[0]}`);

    cardPokemon.innerHTML = `
    <p class="flex justify-between">${item.idPokemon} <span>&#10084;&#65039;&#65039;</span></p>
      <img src="${item.imagemPokemon}" alt="${item.nome}" />
      <p>${item.tipo.join(", ")}</p>
      <p class="text-2xl font-bold to-black">${item.nome}</p>
      
    `;

    containerCard.appendChild(cardPokemon);

    // Evento de clique para o modal
    cardPokemon.addEventListener("click", () => {
      console.log(item.idPokemon, item.nome, item.tipo);
    });
  });
});
