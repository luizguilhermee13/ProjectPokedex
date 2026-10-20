const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor da Pokédex funcionando!");
});

app.get("/api/pokemon/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(id.toLowerCase())}`);

    if (!resposta.ok) {
      return res.status(resposta.status).json({
        erro: "Pokémon não encontrado",
      });
    }

    const pokemon = await resposta.json();
    res.json(pokemon);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao consultar a PokéAPI" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
