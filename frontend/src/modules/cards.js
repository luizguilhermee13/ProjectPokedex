import { criarEtiquetasTipos } from "./tipos.js";
import { configurarFavorito } from "./favoritos.js";
import { abrirModal } from "./modal.js";

const containerCard = document.getElementById("containerCard");

const qtdResultados = document.getElementById("qtdResultados");

// RENDERIZAR OS CARDS

export function renderizarCards(listaPokemons) {
  // Atualizar contador dos resultados
  qtdResultados.innerHTML = `&#128190;${listaPokemons.length} resultados`;

  // Limpar os cards anteriores
  containerCard.replaceChildren();

  listaPokemons.forEach((item) => {
    const cardPokemon = document.createElement("div");

    const tipoPrincipal = item.tipo[0];

    cardPokemon.classList.add("card", `tipo-${tipoPrincipal}`);

    // Etiquetas dos tipos
    const etiquetasTipos = criarEtiquetasTipos(item.tipo);

    // CRIAR HTML DO CARD

    cardPokemon.innerHTML = `
      <div class="card-decoration"></div>

      <button
        type="button"
        class="card-favorite"
        aria-label="Favoritar ${item.nome}"
        aria-pressed="false"
      >
        ♡
      </button>

      <div class="card-image">
        <span class="card-number">
          #${String(item.idPokemon).padStart(3, "0")}
        </span>

        <img
          src="${item.imagemPokemon}"
          alt="${item.nome}"
        />
      </div>

      <div class="card-bottom">
        <div class="card-info">
          <div class="card-types">
            ${etiquetasTipos}
          </div>

          <h3 class="card-name">
            ${item.nome}
          </h3>
        </div>

        <button
          type="button"
          class="card-details"
          aria-label="Ver detalhes de ${item.nome}"
        >
          →
        </button>
      </div>
    `;

    containerCard.appendChild(cardPokemon);

    // CONFIGURAR FAVORITOS

    configurarFavorito(cardPokemon, item);

    // CONFIGURAR BOTÃO DE DETALHES

    const botaoDetalhes = cardPokemon.querySelector(".card-details");

    botaoDetalhes.addEventListener("click", () => {
      abrirModal(item, botaoDetalhes);
    });
  });
}
