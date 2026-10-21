import React from "react";
import Etiquetas from "./Tipos";

function Cards({ pokemons }) {
  console.log(pokemons);

  //qtdResultados.innerHTML = `&#128190;${listaPokemons.length} resultados`; containerCard.replaceChildren(); console.log(listaPokemons);
  return (
    <>
      {pokemons.map((item) => (
        <div className="card" key={item.idPokemon}>
          <div className="card-decoration"></div>
          <button type="button" className="card-favorite" aria-label={`Favoritar ${item.nome}`} aria-pressed="false">
            ♡
          </button>
          <div className="card-image">
            <span className="card-number">{`#${String(item.idPokemon).padStart(3, "0")}`}</span>

            <img src={item.imagemPokemon} alt={`${item.nome}`} />
          </div>
          <div className="card-bottom">
            <div className="card-info">
              <div className="card-types">
                <Etiquetas tipos={item.tipo} />
              </div>

              <h3 className="card-name">{`${item.nome}`}</h3>
            </div>

            <button type="button" className="card-details" aria-label={`Ver detalhes de ${item.nome}`}>
              →
            </button>
          </div>
        </div>
        //const tipoPrincipal = item.tipo[0];
        //botaoDetalhes.addEventListener("click", () => {
        //   abrirModal(item, botaoDetalhes)}
        // cardPokemon.classNameList.add("card", `tipo-${tipoPrincipal}`); const etiquetasTipos = criarEtiquetasTipos(item.tipo);
        // configurarFavorito(cardPokemon, item);
      ))}
    </>
  );
}

export default Cards;
