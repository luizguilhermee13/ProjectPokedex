import { pokemonsSelecionados, pokemonsFavoritados } from "./dados.js";

import { renderizarCards } from "./cards.js";

// NAVEGAÇÃO EXPLORAR / FAVORITOS

export function inicializarNavegacao() {
  const sectionAtiva = document.querySelectorAll(".sectionsAtivas li");

  const tituloSection = document.getElementById("tituloSection");

  sectionAtiva.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.innerHTML === "Explorar") {
        renderizarCards(pokemonsSelecionados);

        tituloSection.firstChild.textContent = "Conheça os Pokémon ";
      } else if (item.innerHTML === "Favoritos") {
        renderizarCards(pokemonsFavoritados);

        tituloSection.firstChild.textContent = "Conheça seus favoritos ";
      }
    });
  });
}
