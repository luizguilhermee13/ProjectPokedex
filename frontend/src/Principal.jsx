import Cards from "./cards";
import { buscarPokemon } from "./modules/api";
import Modal from "./Modal";
import React, { useState, useEffect } from "react";

const Principal = ({ favoritos, alternarFavorito, aba, mudarAba }) => {
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null);

  function abrirModal(item) {
    setPokemonSelecionado(item);
  }
  const [resultado, setResultado] = React.useState([]);

  async function buscar(termo) {
    const valor = termo.trim().toLowerCase();

    if (!valor) {
      setResultado([]);
      return;
    }

    try {
      const pokemon = await buscarPokemon(valor);
      setResultado([pokemon]);
    } catch (erro) {
      console.error(erro);
      alert("Pokémon não encontrado. Verifique o nome ou ID.");
    }
  }

  const [pokemonsS, setPokemonsS] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true);

  React.useEffect(() => {
    async function carregar() {
      // Dispara todas as buscas em paralelo (mais rápido)
      const ids = Array.from({ length: 12 }, (_, i) => (i + 1) * 80);
      const buscas = ids.map((id) => buscarPokemon(id));

      const resultados = await Promise.allSettled(buscas);

      const lista = resultados.filter((r) => r.status === "fulfilled").map((r) => r.value);

      resultados.filter((r) => r.status === "rejected").forEach((r) => console.error(r.reason));

      setPokemonsS(lista);
      setCarregando(false);
    }

    carregar();
  }, []);

  const listaExibida = aba === "favoritos" ? favoritos : resultado.length > 0 ? resultado : pokemonsS;

  const titulo = aba === "favoritos" ? "Conheça seus favoritos" : "Conheça os Pokémon";

  return (
    <main>
      <SectionSearch aoBuscar={buscar} />
      <SectionPokedex
        pokemons={listaExibida}
        carregando={aba === "explorar" && carregando}
        favoritos={favoritos}
        alternarFavorito={alternarFavorito}
        titulo={titulo}
        abrirModal={abrirModal}
      />
      <Modal pokemon={pokemonSelecionado} fechar={() => setPokemonSelecionado(null)} />
    </main>
  );
};

const SectionSearch = ({ aoBuscar }) => {
  const [termo, setTermo] = React.useState("");
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

export default Principal;
