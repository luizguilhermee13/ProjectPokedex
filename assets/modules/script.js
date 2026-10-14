const containerCard = document.getElementById("containerCard");
const containerModal = document.getElementById("modal-pokemon");
const modalInfo = document.getElementById("modal-info");

const buttonSearch = document.getElementById("searchButton");
const inputSearch = document.getElementById("searchPokemon");

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

const nomesStatus = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "Atq. Esp.",
  "special-defense": "Def. Esp.",
  speed: "Velocidade",
};

const pokemonsSelecionados = [];
const pokemonsFavoritados = [];

let ultimoBotaoDetalhes = null;

// ==========================================
// 1. BUSCAR POKÉMON NA API
// ==========================================

async function buscarPokemon(identificador) {
  const response = await fetch(`http://localhost:3000/api/pokemon/${encodeURIComponent(identificador)}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar Pokémon ${identificador}`);
  }

  const data = await response.json();

  // Organizando os dados recebidos da API
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

// ==========================================
// 2. CARREGAMENTO AUTOMÁTICO
// ==========================================

document.addEventListener("DOMContentLoaded", async () => {
  const quantidade = 12;

  for (let i = 1; i <= quantidade; i++) {
    try {
      // Mantendo sua lógica de IDs: 4, 8, 12...
      const pokemon = await buscarPokemon(i * 4);

      pokemonsSelecionados.push(pokemon);
    } catch (erro) {
      console.error(erro);
    }
  }

  renderizarCards(pokemonsSelecionados);
});

// ==========================================
// 3. PESQUISA POR NOME OU ID
// ==========================================

buttonSearch.addEventListener("click", async (event) => {
  event.preventDefault();

  const inputValue = inputSearch.value.trim().toLowerCase();

  if (!inputValue) {
    renderizarCards(pokemonsSelecionados);
    return;
  }

  try {
    const pokemon = await buscarPokemon(inputValue);

    // Mostra apenas o Pokémon pesquisado
    renderizarCards([pokemon]);
  } catch (erro) {
    console.error(erro);
    alert("Pokémon não encontrado. Verifique o nome ou ID.");
  }
});

// ==========================================
// 4. FUNÇÃO PARA GERAR ETIQUETAS DOS TIPOS
// ==========================================

function criarEtiquetasTipos(tipos) {
  return tipos
    .map((tipo) => {
      return `
        <span class="type-pill tipo-${tipo}">
          ${nomesTipos[tipo] || tipo}
        </span>
      `;
    })
    .join("");
}

// ==========================================
// 5. RENDERIZAR OS CARDS
// ==========================================

const qtdResultados = document.getElementById("qtdResultados");
const tituloSection = document.getElementById("tituloSection");

function renderizarCards(listaPokemons) {
  qtdResultados.innerHTML = `&#128190;${listaPokemons.length} resultados`;
  // Limpa os cards anteriores
  containerCard.replaceChildren();

  listaPokemons.forEach((item) => {
    const cardPokemon = document.createElement("div");

    const tipoPrincipal = item.tipo[0];

    cardPokemon.classList.add("card", `tipo-${tipoPrincipal}`);

    const etiquetasTipos = criarEtiquetasTipos(item.tipo);

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

    // --------------------------------------
    // BOTÃO FAVORITOS (VISUAL TEMPORÁRIO)
    // --------------------------------------

    const botaoFavorito = cardPokemon.querySelector(".card-favorite");
    let qtdFavoritos = document.querySelector("#qtdFavoritos");

    // Verifica se esse Pokémon já está nos favoritos
    const jaFavoritado = pokemonsFavoritados.some((pokemon) => pokemon.idPokemon === item.idPokemon);

    // Mantém o coração correto ao renderizar o card
    botaoFavorito.classList.toggle("active", jaFavoritado);
    botaoFavorito.textContent = jaFavoritado ? "♥" : "♡";
    botaoFavorito.setAttribute("aria-pressed", String(jaFavoritado));

    botaoFavorito.addEventListener("click", (event) => {
      event.stopPropagation();

      botaoFavorito.classList.toggle("active");

      const ativo = botaoFavorito.classList.contains("active");

      botaoFavorito.textContent = ativo ? "♥" : "♡";
      botaoFavorito.setAttribute("aria-pressed", String(ativo));

      if (ativo) {
        const existe = pokemonsFavoritados.some((pokemon) => pokemon.idPokemon === item.idPokemon);

        if (!existe) {
          pokemonsFavoritados.push(item);
        }
      } else {
        const index = pokemonsFavoritados.findIndex((pokemon) => pokemon.idPokemon === item.idPokemon);

        // Remover somente o Pokémon selecionado
        if (index !== -1) {
          pokemonsFavoritados.splice(index, 1);
        }
      }
      qtdFavoritos.textContent = pokemonsFavoritados.length;
      console.log("Favoritos:", pokemonsFavoritados);
    });

    // --------------------------------------
    // BOTÃO PARA ABRIR O MODAL
    // --------------------------------------

    const botaoDetalhes = cardPokemon.querySelector(".card-details");

    botaoDetalhes.addEventListener("click", () => {
      ultimoBotaoDetalhes = botaoDetalhes;

      abrirModal(item);
    });
  });
}

// ==========================================
// 6. ABRIR MODAL DE DETALHES
// ==========================================

function abrirModal(item) {
  const tipoPrincipal = item.tipo[0];

  // Etiquetas dos tipos
  const etiquetasTipos = criarEtiquetasTipos(item.tipo);

  // Altura em metros
  const altura = (item.altura / 10).toFixed(1);

  // Peso em quilogramas
  const peso = (item.peso / 10).toFixed(1);

  // Habilidades do Pokémon
  const habilidades = item.habilidades
    .map((habilidade) => {
      return habilidade.replace(/-/g, " ");
    })
    .join(", ");

  // --------------------------------------
  // GERAR AS SEIS ESTATÍSTICAS
  // --------------------------------------

  const estatisticas = item.status
    .map((status) => {
      const nome = nomesStatus[status.stat.name] || status.stat.name;

      const valor = status.base_stat;

      // Porcentagem para a barra visual
      const porcentagem = Math.min((valor / 255) * 100, 100);

      return `
        <div class="modal-stat-row">
          <span class="stat-name">
            ${nome}
          </span>

          <span class="stat-value">
            ${valor}
          </span>

          <div class="stat-track">
            <div
              class="stat-progress"
              style="width: ${porcentagem}%"
            ></div>
          </div>
        </div>
      `;
    })
    .join("");

  // --------------------------------------
  // APLICAR TIPO PRINCIPAL NO MODAL
  // --------------------------------------

  modalInfo.className = `modal-dialog tipo-${tipoPrincipal}`;

  // --------------------------------------
  // CONSTRUIR O HTML DO MODAL
  // --------------------------------------

  modalInfo.innerHTML = `
    <!-- Botão fechar -->
    <button
      type="button"
      class="modal-close"
      aria-label="Fechar detalhes"
    >
      &times;
    </button>

    <!-- COLUNA 1: IMAGEM -->
    <div class="modal-visual">
      <img
        src="${item.imagemPokemon}"
        alt="${item.nome}"
      />
    </div>

    <!-- COLUNA 2: LINHA 1 -->
    <div class="modal-heading">

      <span class="modal-number">
        #${String(item.idPokemon).padStart(3, "0")}
      </span>

      <h2 id="modal-nome" class="modal-name">
        ${item.nome}
      </h2>

      <div class="modal-types">
        ${etiquetasTipos}
      </div>

    </div>

    <!-- COLUNA 2: LINHA 2 -->
    <div class="modal-facts">

      <div class="modal-fact">
        <span>ALTURA</span>
        <strong>${altura} m</strong>
      </div>

      <div class="modal-fact">
        <span>PESO</span>
        <strong>${peso} kg</strong>
      </div>

      <div class="modal-fact">
        <span>HABILIDADES</span>
        <strong>${habilidades}</strong>
      </div>

    </div>

    <!-- COLUNA 2: LINHA 3 -->
    <div class="modal-stats">

      <h3>ESTATÍSTICAS BASE</h3>

      <div class="modal-stats-list">
        ${estatisticas}
      </div>

    </div>
  `;

  // --------------------------------------
  // EXIBIR MODAL
  // --------------------------------------

  containerModal.classList.add("is-open");

  containerModal.setAttribute("aria-hidden", "false");

  // Impedir a rolagem do fundo
  document.body.style.overflow = "hidden";

  // Evento para fechar pelo botão X
  const botaoFechar = modalInfo.querySelector(".modal-close");

  botaoFechar.addEventListener("click", fecharModal);
  botaoFechar.focus();
}

// ==========================================
// 7. FECHAR MODAL
// ==========================================

function fecharModal() {
  containerModal.classList.remove("is-open");

  containerModal.setAttribute("aria-hidden", "true");

  // Habilitar novamente a rolagem da página
  document.body.style.overflow = "";

  // Devolver o foco ao botão de detalhes
  ultimoBotaoDetalhes?.focus();
}

// ==========================================
// 8. FECHAR CLICANDO FORA DO MODAL
// ==========================================

containerModal.addEventListener("click", (event) => {
  if (event.target === containerModal) {
    fecharModal();
  }
});

// ==========================================
// 9. FECHAR COM A TECLA ESC
// ==========================================

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && containerModal.classList.contains("is-open")) {
    fecharModal();
  }
});

// ==========================================
// 10. MANTER O FOCO DENTRO DO MODAL
// ==========================================

document.addEventListener("keydown", (event) => {
  if (event.key !== "Tab" || !containerModal.classList.contains("is-open")) {
    return;
  }

  const elementos = Array.from(
    modalInfo.querySelectorAll(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );

  if (elementos.length === 0) {
    event.preventDefault();
    return;
  }

  const primeiro = elementos[0];
  const ultimo = elementos[elementos.length - 1];

  if (event.shiftKey && document.activeElement === primeiro) {
    event.preventDefault();
    ultimo.focus();
  } else if (!event.shiftKey && document.activeElement === ultimo) {
    event.preventDefault();
    primeiro.focus();
  }
});

// ==========================================
// 11 . SECTION FAVORITOS
// ==========================================
const sectionAtiva = document.querySelectorAll(".sectionsAtivas li");

console.log(sectionAtiva);

sectionAtiva.forEach((item) => {
  item.addEventListener("click", () => {
    console.log(item);
    if (item.innerHTML == "Explorar") {
      renderizarCards(pokemonsSelecionados);
      tituloSection.firstChild.textContent = "Conheça os Pokémon "; //first para alterar somente o h2
    } else if (item.innerHTML == "Favoritos") {
      renderizarCards(pokemonsFavoritados);
      tituloSection.firstChild.textContent = "Conheça seus favoritos ";
    }
  });
});
