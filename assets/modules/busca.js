import { buscarPokemon } from "./api.js";
import { renderizarCards } from "./cards.js";
import { pokemonsSelecionados } from "./dados.js";

// INICIALIZAR EVENTO DE PESQUISA

export function inicializarBusca() {
  const buttonSearch = document.getElementById("searchButton");

  const inputSearch = document.getElementById("searchPokemon");

  buttonSearch.addEventListener("click", async (event) => {
    event.preventDefault();

    const inputValue = inputSearch.value.trim().toLowerCase();

    // Caso o campo esteja vazio
    if (!inputValue) {
      renderizarCards(pokemonsSelecionados);
      return;
    }

    try {
      // Buscar Pokémon por nome ou ID
      const pokemon = await buscarPokemon(inputValue);

      // Exibir somente o Pokémon pesquisado
      renderizarCards([pokemon]);
    } catch (erro) {
      console.error(erro);

      alert("Pokémon não encontrado. Verifique o nome ou ID.");
    }
  });
}
