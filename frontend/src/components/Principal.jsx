import { useState, useEffect } from "react";
import { buscarPokemon } from "../services/api";
import SectionSearch from "./SectionSearch";
import SectionPokedex from "./SectionPokedex";
import Modal from "./Modal";

const Principal = ({ favoritos, alternarFavorito, aba }) => {
  const [pokemonsS, setPokemonsS] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [resultado, setResultado] = useState([]);
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null);

  // Carga inicial: 12 Pokémon buscados em paralelo
  useEffect(() => {
    async function carregar() {
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

  function abrirModal(item) {
    setPokemonSelecionado(item);
  }

  // Valores derivados: não precisam de estado próprio
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

export default Principal;
