export const nomesTipos = {
  normal: "Normal",
  fire: "Fogo",
  water: "Água",
  grass: "Planta",
  electric: "Elétrico",
  psychic: "Psíquico",
  ice: "Gelo",
  dragon: "Dragão",
  dark: "Sombrio",
  fairy: "Fada",
  fighting: "Lutador",
  flying: "Voador",
  poison: "Veneno",
  ground: "Terra",
  rock: "Pedra",
  bug: "Inseto",
  ghost: "Fantasma",
  steel: "Aço",
};

export const nomesStatus = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "Atq. Esp.",
  "special-defense": "Def. Esp.",
  speed: "Velocidade",
};

export const pokemonsSelecionados = [];

export const pokemonsFavoritados =
  JSON.parse(localStorage.getItem("pokemonsFavoritados")) || [];
