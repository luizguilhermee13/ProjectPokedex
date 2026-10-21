import Etiquetas from "./Tipos";

function Cards({ pokemons }) {
  return (
    <>
      {pokemons.map((item) => (
        <div className={`card tipo-${item.tipo[0]}`} key={item.idPokemon}>
          <div className="card-decoration"></div>

          <button type="button" className="card-favorite" aria-label={`Favoritar ${item.nome}`} aria-pressed="false">
            ♡
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

            <button type="button" className="card-details" aria-label={`Ver detalhes de ${item.nome}`}>
              →
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default Cards;
