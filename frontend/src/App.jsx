import { useState, useEffect } from "react";
import Header from "./components/Header";
import Principal from "./components/Principal";
import Footer from "./components/Footer";

function App() {
  const [favoritos, setFavoritos] = useState(() => {
    const salvos = localStorage.getItem("pokemonsFavoritados");
    return salvos ? JSON.parse(salvos) : [];
  });

  const [aba, mudarAba] = useState("explorar");

  function alternarFavorito(item) {
    const jaExiste = favoritos.some((p) => p.idPokemon === item.idPokemon);

    if (jaExiste) {
      setFavoritos(favoritos.filter((p) => p.idPokemon !== item.idPokemon));
    } else {
      setFavoritos([...favoritos, item]);
    }
  }

  useEffect(() => {
    localStorage.setItem("pokemonsFavoritados", JSON.stringify(favoritos));
  }, [favoritos]);

  return (
    <div>
      <Header quantidade={favoritos.length} aba={aba} mudarAba={mudarAba} />

      <Principal favoritos={favoritos} alternarFavorito={alternarFavorito} aba={aba} />

      <Footer />
    </div>
  );
}

export default App;
