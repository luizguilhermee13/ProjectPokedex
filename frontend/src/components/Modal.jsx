import Etiquetas from "./Etiquetas";
import { nomesStatus } from "../data/dados.js";

function Modal({ pokemon, fechar }) {
  if (!pokemon) return null;

  const altura = (pokemon.altura / 10).toFixed(1);
  const peso = (pokemon.peso / 10).toFixed(1);

  const habilidades = pokemon.habilidades.map((habilidade) => habilidade.replace(/-/g, " ")).join(", ");

  return (
    <div
      className="modal-overlay is-open"
      aria-hidden="false"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          fechar();
        }
      }}
    >
      <section className={`modal-dialog tipo-${pokemon.tipo[0]}`} role="dialog" aria-modal="true" aria-labelledby="modal-nome">
        <button type="button" className="modal-close" aria-label="Fechar detalhes" onClick={fechar}>
          &times;
        </button>

        <div className="modal-visual">
          <img src={pokemon.imagemPokemon} alt={pokemon.nome} />
        </div>

        <div className="modal-heading">
          <span className="modal-number">#{String(pokemon.idPokemon).padStart(3, "0")}</span>

          <h2 id="modal-nome" className="modal-name">
            {pokemon.nome}
          </h2>

          <div className="modal-types">
            <Etiquetas tipos={pokemon.tipo} />
          </div>
        </div>

        <div className="modal-facts">
          <div className="modal-fact">
            <span>ALTURA</span>
            <strong>{altura} m</strong>
          </div>

          <div className="modal-fact">
            <span>PESO</span>
            <strong>{peso} kg</strong>
          </div>

          <div className="modal-fact">
            <span>HABILIDADES</span>
            <strong>{habilidades}</strong>
          </div>
        </div>

        <div className="modal-stats">
          <h3>ESTATÍSTICAS BASE</h3>

          <div className="modal-stats-list">
            {pokemon.status.map((status) => {
              const nome = nomesStatus[status.stat.name] || status.stat.name;

              const valor = status.base_stat;
              const porcentagem = Math.min((valor / 255) * 100, 100);

              return (
                <div className="modal-stat-row" key={status.stat.name}>
                  <span className="stat-name">{nome}</span>

                  <span className="stat-value">{valor}</span>

                  <div className="stat-track">
                    <div className="stat-progress" style={{ width: `${porcentagem}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Modal;
