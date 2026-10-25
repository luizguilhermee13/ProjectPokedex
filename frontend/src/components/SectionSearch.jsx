import { useState } from "react";

const SectionSearch = ({ aoBuscar }) => {
  const [termo, setTermo] = useState("");

  function aoEnviar(event) {
    event.preventDefault();
    aoBuscar(termo);
  }

  return (
    <section>
      <div className="search hero-grid">
        <div className="pokeball-decoration" aria-hidden="true">
          <span className="pokeball-mark"></span>
        </div>

        <div className="search-text">
          <span className="font-ManropeBlack text-[#ef4035]">&#128165; Explore o mundo Pokémon</span>

          <h1 className="font-spaceBlack text-8xl">
            Descubra. <span className="text-[#ef4035]">Colecione.</span>
          </h1>

          <p className="font-ManropeWhite text-2xl text-[#0000008C] leading-6">
            Encontre informações, habilidades e estatísticas de cada Pokémon em um só lugar.
          </p>

          <form className="search-inputs gap-3" onSubmit={aoEnviar}>
            <label htmlFor="searchPokemon" className="search-field bg-white rounded-2xl px-5 py-4">
              🔎
              <input
                className="font-ManropeWhite"
                type="text"
                id="searchPokemon"
                placeholder="Busque por nome ou número..."
                value={termo}
                onChange={(e) => setTermo(e.target.value)}
              />
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

export default SectionSearch;
