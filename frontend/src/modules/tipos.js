import { nomesTipos } from "./dados.js";

export function criarEtiquetasTipos(tipos) {
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
