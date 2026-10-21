import Header from "./Header";
import Principal from "./Principal";
import Footer from "./Footer";
import React from "react";

function App() {
  const [favoritos, setFavoritos] = React.useState(() => {
    const salvos = localStorage.getItem("pokemonsFavoritados");
    return salvos ? JSON.parse(salvos) : [];
  });

  function alternarFavorito(item) {
    const jaExiste = favoritos.some((p) => p.idPokemon === item.idPokemon);

    if (jaExiste) {
      setFavoritos(favoritos.filter((p) => p.idPokemon !== item.idPokemon));
    } else {
      setFavoritos([...favoritos, item]);
    }
  }

  React.useEffect(() => {
    localStorage.setItem("pokemonsFavoritados", JSON.stringify(favoritos));
  }, [favoritos]);

  return (
    <div>
      <Header quantidade={favoritos.length} />
      <Principal favoritos={favoritos} alternarFavorito={alternarFavorito} />
      <Footer />
    </div>
  );
}

export default App;
