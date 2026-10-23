import Etiquetas from "./Tipos";

function Cards({ pokemons, favoritos = [], alternarFavorito, abrirModal }) {
  return (
    <>
      {pokemons.map((item) => {
        const eFavorito = favoritos.some((p) => p.idPokemon === item.idPokemon);

        return (
          <div className={`card tipo-${item.tipo[0]}`} key={item.idPokemon}>
            <div className="card-decoration"></div>

            <button
              type="button"
              className={`card-favorite ${eFavorito ? "active" : ""}`}
              aria-pressed={eFavorito}
              onClick={() => alternarFavorito(item)}
              aria-label={`Favoritar ${item.nome}`}
            >
              {eFavorito ? "♥" : "♡"}
            </button>

            <div className="card-image">
              <span className="card-number">#{String(item.idPokemon).padStart(3, "0")}</span>
              <img src={item.imagemPokemon} alt={item.nome} />
            </div>

            <div className="card-bottom">
              <div className="card-info">
                <div className="card-types">
                  <Etiquetas tipos={item.tipo} />
                </div>

                <h3 className="card-name">{item.nome}</h3>
              </div>

              <button type="button" className="card-details" aria-label={`Ver detalhes de ${item.nome}`} onClick={() => abrirModal(item)}>
                →
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Cards;
