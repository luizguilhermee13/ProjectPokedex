import Cards from "./Cards";

const SectionPokedex = ({ pokemons, carregando, favoritos, alternarFavorito, titulo, abrirModal }) => {
  return (
    <section>
      <div className="containerPokedex border-2 border-amber-50" id="containerPokedex">
        <div className="catalago-header">
          <p className="font-ManropeBlack text-sm uppercase text-[#0000008C]">Catálogo nacional</p>
          <h2 className="font-spaceBlack text-4xl flex justify-between items-center" id="tituloSection">
            {titulo}
            <span className="font-ManropeWhite text-sm uppercase text-[#0000008C]" id="qtdResultados">
              &#128190; {pokemons.length} resultados
            </span>
          </h2>
          <div>
            <p className="bg-black font-ManropeWhite rounded-2xl flex justify-center items-center w-16 h-8 text-white">todos</p>
          </div>
        </div>

        <div className="catalago-pokemons">
          {carregando && <p className="font-ManropeWhite text-[#0000008C]">Buscando Pokémon...</p>}

          <div id="containerCard">
            <Cards pokemons={pokemons} favoritos={favoritos} alternarFavorito={alternarFavorito} abrirModal={abrirModal} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionPokedex;
