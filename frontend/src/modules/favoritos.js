import { pokemonsFavoritados } from "./dados.js";

// CONFIGURAR BOTÃO DE FAVORITOS

export function configurarFavorito(cardPokemon, item) {
  const botaoFavorito = cardPokemon.querySelector(".card-favorite");

  const qtdFavoritos = document.getElementById("qtdFavoritos");

  // Verificar se já está nos favoritos
  const jaFavoritado = pokemonsFavoritados.some(
    (pokemon) => pokemon.idPokemon === item.idPokemon,
  );

  // Manter o coração correto ao renderizar o card
  botaoFavorito.classList.toggle("active", jaFavoritado);

  botaoFavorito.textContent = jaFavoritado ? "♥" : "♡";

  botaoFavorito.setAttribute("aria-pressed", String(jaFavoritado));

  // Evento de clique no coração
  botaoFavorito.addEventListener("click", (event) => {
    event.stopPropagation();

    botaoFavorito.classList.toggle("active");

    const ativo = botaoFavorito.classList.contains("active");

    botaoFavorito.textContent = ativo ? "♥" : "♡";

    botaoFavorito.setAttribute("aria-pressed", String(ativo));

    if (ativo) {
      // Verificar se já existe no array
      const existe = pokemonsFavoritados.some(
        (pokemon) => pokemon.idPokemon === item.idPokemon,
      );

      if (!existe) {
        pokemonsFavoritados.push(item);
      }
    } else {
      // Encontrar a posição do Pokémon
      const index = pokemonsFavoritados.findIndex(
        (pokemon) => pokemon.idPokemon === item.idPokemon,
      );

      // Remover somente o Pokémon selecionado
      if (index !== -1) {
        pokemonsFavoritados.splice(index, 1);
      }
    }

    // SALVAR FAVORITOS NO LOCALSTORAGE

    localStorage.setItem(
      "pokemonsFavoritados",
      JSON.stringify(pokemonsFavoritados),
    );

    // Atualizar contador de favoritos
    qtdFavoritos.textContent = pokemonsFavoritados.length;

    console.log("Favoritos:", pokemonsFavoritados);
  });
}
