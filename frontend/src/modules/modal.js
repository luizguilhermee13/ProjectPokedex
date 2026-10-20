import { nomesStatus } from "./dados.js";
import { criarEtiquetasTipos } from "./tipos.js";

const containerModal = document.getElementById("modal-pokemon");

const modalInfo = document.getElementById("modal-info");

let ultimoBotaoDetalhes = null;

// ABRIR MODAL

export function abrirModal(item, botaoDetalhes) {
  ultimoBotaoDetalhes = botaoDetalhes;

  const tipoPrincipal = item.tipo[0];

  // Etiquetas dos tipos
  const etiquetasTipos = criarEtiquetasTipos(item.tipo);

  // Conversão das medidas
  const altura = (item.altura / 10).toFixed(1);
  const peso = (item.peso / 10).toFixed(1);

  // Habilidades
  const habilidades = item.habilidades
    .map((habilidade) => {
      return habilidade.replace(/-/g, " ");
    })
    .join(", ");

  // GERAR AS SEIS ESTATÍSTICAS

  const estatisticas = item.status
    .map((status) => {
      const nome = nomesStatus[status.stat.name] || status.stat.name;

      const valor = status.base_stat;

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

  // Aplicar a cor do tipo principal
  modalInfo.className = `modal-dialog tipo-${tipoPrincipal}`;

  // CONSTRUIR O HTML DO MODAL

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

  // Exibir modal
  containerModal.classList.add("is-open");

  containerModal.setAttribute("aria-hidden", "false");

  // Impedir rolagem do fundo
  document.body.style.overflow = "hidden";

  // Fechar pelo botão X
  const botaoFechar = modalInfo.querySelector(".modal-close");

  botaoFechar.addEventListener("click", fecharModal);

  botaoFechar.focus();
}

// FECHAR MODAL

export function fecharModal() {
  containerModal.classList.remove("is-open");

  containerModal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  // Devolver o foco ao botão de detalhes
  ultimoBotaoDetalhes?.focus();
}

// EVENTOS DE FECHAMENTO E FOCO

export function inicializarModal() {
  // Clicar fora do conteúdo
  containerModal.addEventListener("click", (event) => {
    if (event.target === containerModal) {
      fecharModal();
    }
  });

  // Teclas ESC e TAB
  document.addEventListener("keydown", (event) => {
    const aberto = containerModal.classList.contains("is-open");

    if (!aberto) {
      return;
    }

    // Fechar com ESC
    if (event.key === "Escape") {
      fecharModal();
      return;
    }

    // Manter foco dentro do modal
    if (event.key !== "Tab") {
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
}
