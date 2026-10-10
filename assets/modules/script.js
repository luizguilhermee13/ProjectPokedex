const containerCard = document.getElementById("containerCard");

const nomesTipos = {
  normal: "Normal",
  fire: "Fogo",
  water: "Água",
  grass: "Planta",
  electric: "Elétrico",
  psychic: "Psíquico",
  ice: "Gelo",
  dragon: "Dragão",
  dark: "Sombrio",
  fairy: "Fada",
  fighting: "Lutador",
  flying: "Voador",
  poison: "Veneno",
  ground: "Terra",
  rock: "Pedra",
  bug: "Inseto",
  ghost: "Fantasma",
  steel: "Aço",
};
const pokemonsSelecionados = [];
const buttonSearch = document.querySelector("#teste");

document.addEventListener("DOMContentLoaded", async () => {
  const quantidade = 12;

  // Buscar Pokémon
  for (let i = 1; i <= quantidade; i++) {
    try {
      const response = await fetch(`http://localhost:3000/api/pokemon/${i * 4}`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar Pokémon ${i}`);
      }

      const data = await response.json();

      const pokemon = {
        idPokemon: data.id,
        nome: data.name,
        tipo: data.types.map((item) => item.type.name),
        imagemPokemon: data.sprites.other["official-artwork"].front_default,
      };

      pokemonsSelecionados.push(pokemon);
    } catch (erro) {
      console.error(erro);
    }
  }

  // Criar cards
  pokemonsSelecionados.forEach((item) => {
    const cardPokemon = document.createElement("div");

    const tipoPrincipal = item.tipo[0];

    cardPokemon.classList.add("card", `tipo-${tipoPrincipal}`);

    // etiquetas dos tipos
    const etiquetasTipos = item.tipo
      .map((tipo) => {
        return `
          <span class="type-pill tipo-${tipo}">
            ${nomesTipos[tipo] || tipo}
          </span>
        `;
      })
      .join("");

    cardPokemon.innerHTML = `
      <div class="card-decoration"></div>

      <button
        type="button"
        class="card-favorite"
        aria-label="Favoritar ${item.nome}"
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

    // click para favoritar (visual temporário)
    const botaoFavorito = cardPokemon.querySelector(".card-favorite");

    botaoFavorito.addEventListener("click", (event) => {
      event.stopPropagation();

      botaoFavorito.classList.toggle("active");

      const ativo = botaoFavorito.classList.contains("active");

      botaoFavorito.textContent = ativo ? "♥" : "♡";
      botaoFavorito.setAttribute("aria-pressed", String(ativo));
    });

    // Clique para detalhes (futuro modal)
    cardPokemon.querySelector(".card-details").addEventListener("click", () => {
      console.log(item.idPokemon, item.nome, item.tipo);
    });
  });
});

buttonSearch.addEventListener("click", async (event) => {
  event.preventDefault();
  const inputValue = document.getElementById("searchPokemon").value;
  console.log(inputValue);

  try {
    const response = await fetch(`http://localhost:3000/api/pokemon/${inputValue}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar Pokémon ${inputValue}`);
    }

    const data = await response.json();
    console.log(data);
    const pokemon = {
      idPokemon: data.id,
      nome: data.name,
      tipo: data.types.map((item) => item.type.name),
      imagemPokemon: data.sprites.other["official-artwork"].front_default,
    };

    pokemonsSelecionados.push(pokemon);
  } catch (erro) {
    console.error(erro);
  }

  // Criar cards
  pokemonsSelecionados.forEach((item) => {
    const cardPokemon = document.createElement("div");

    const tipoPrincipal = item.tipo[0];

    cardPokemon.classList.add("card", `tipo-${tipoPrincipal}`);

    // etiquetas dos tipos
    const etiquetasTipos = item.tipo
      .map((tipo) => {
        return `
          <span class="type-pill tipo-${tipo}">
            ${nomesTipos[tipo] || tipo}
          </span>
        `;
      })
      .join("");

    cardPokemon.innerHTML = `
      <div class="card-decoration"></div>

      <button
        type="button"
        class="card-favorite"
        aria-label="Favoritar ${item.nome}"
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

    containerCard.replaceChildren(cardPokemon);

    // click para favoritar (visual temporário)
    const botaoFavorito = cardPokemon.querySelector(".card-favorite");

    botaoFavorito.addEventListener("click", (event) => {
      event.stopPropagation();

      botaoFavorito.classList.toggle("active");

      const ativo = botaoFavorito.classList.contains("active");

      botaoFavorito.textContent = ativo ? "♥" : "♡";
      botaoFavorito.setAttribute("aria-pressed", String(ativo));
    });

    // Clique para detalhes (futuro modal)
    cardPokemon.querySelector(".card-details").addEventListener("click", () => {
      console.log(item.idPokemon, item.nome, item.tipo);
    });
  });
});
