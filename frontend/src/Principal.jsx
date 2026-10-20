import React from "react";

const Principal = () => {
  return (
    <main>
      <SectionSearch />
      <SectionPokedex />
    </main>
  );
};

const SectionSearch = () => {
  return (
    <section>
      <div className="search hero-grid">
        <div className="pokeball-decoration" aria-hidden="true">
          <span className="pokeball-mark"></span>
        </div>

        <div className="search-text">
          <span className="font-ManropeBlack text-[#ef4035]">&#128165; Explore o mundo Pokémon</span>

          <h1 className="font-spaceBlack text-8xl">
            Descubra.
            <span className="text-[#ef4035]">Colecione.</span>
          </h1>

          <p className="font-ManropeWhite text-2xl text-[#0000008C] leading-6">
            Encontre informações, habilidades e estatísticas de cada Pokémon em um só lugar.
          </p>

          <form className="search-inputs gap-3">
            <label htmlFor="searchPokemon" className="search-field bg-white rounded-2xl px-5 py-4">
              🔎
              <input className="font-ManropeWhite" type="text" id="searchPokemon" placeholder="Busque por nome ou número..." />
            </label>

            <button type="submit" id="searchButton" className="search-button bg-black font-ManropeWhite rounded-lg px-8 py-4">
              Buscar <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const SectionPokedex = () => {
  return (
    <section>
      <div className="containerPokedex border-2 border-amber-50" id="containerPokedex">
        <div className="catalago-header">
          <p className="font-ManropeBlack text-sm uppercase text-[#0000008C]">Catálogo nacional</p>
          <h2 className="font-spaceBlack text-4xl flex justify-between items-center" id="tituloSection">
            Conheça os Pokémon
            <span className="font-ManropeWhite text-sm uppercase text-[#0000008C]" id="qtdResultados"></span>
          </h2>
          <div>
            <p className="bg-black font-ManropeWhite rounded-2xl flex justify-center items-center w-16 h-8 text-white">todos</p>
          </div>
        </div>

        <div className="catalago-pokemons">
          <div id="containerCard"></div>

          <div id="containerCard2"></div>
        </div>
      </div>
    </section>
  );
};

export default Principal;
