import { buscarPokemon } from "./api.js";
import { pokemonsSelecionados, pokemonsFavoritados } from "./dados.js";
import { renderizarCards } from "./cards.js";
import { inicializarBusca } from "./busca.js";
import { inicializarNavegacao } from "./navegacao.js";
import { inicializarModal } from "./modal.js";

// INICIALIZAÇÃO DA POKÉDEX

document.addEventListener("DOMContentLoaded", async () => {
  // Inicializar os eventos da aplicação
  inicializarBusca();
  inicializarNavegacao();
  inicializarModal();

  // Quantidade inicial de Pokémon
  const quantidade = 12;

  // Recuperar quantidade de favoritos ao carregar a página
  const qtdFavoritos = document.getElementById("qtdFavoritos");

  qtdFavoritos.textContent = pokemonsFavoritados.length;

  // CARREGAMENTO AUTOMÁTICO

  for (let i = 1; i <= quantidade; i++) {
    try {
      // Mantida a lógica original: i * 80
      const pokemon = await buscarPokemon(i * 80);

      pokemonsSelecionados.push(pokemon);
    } catch (erro) {
      console.error(erro);
    }
  }

  // Exibir todos os Pokémon carregados
  renderizarCards(pokemonsSelecionados);
});
