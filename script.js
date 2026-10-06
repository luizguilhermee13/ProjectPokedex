document.addEventListener("DOMContentLoaded", async function pokedexFull() {
  let containerCard = document.getElementById("containerCard");
  const quantidade = 100;

  for (let i = 1; i <= quantidade; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    const data = await response.json();

    console.log(data);

    const idPokemon = data.id;
    const nome = data.name;
    const tipo = data.types.map((types) => types.type.name);

    const imagemPokemon = document.createElement("img");
    imagemPokemon.src = data.sprites.other["official-artwork"].front_default;

    let idText = document.createElement("p");
    idText.textContent = idPokemon;
    let nomeText = document.createElement("p");
    nomeText.textContent = nome;
    let tipoText = document.createElement("p");
    tipoText.textContent = tipo;

    let cardPokemon = document.createElement("div");
    cardPokemon.classList.add("card");
    containerCard.appendChild(cardPokemon);
    cardPokemon.appendChild(imagemPokemon);
    cardPokemon.appendChild(idText);
    cardPokemon.appendChild(nomeText);
    cardPokemon.appendChild(tipoText);

    function BackgroundColor(cardElement, types) {
      if (types.includes("normal")) {
        cardElement.style.backgroundColor = "#F5F5DC";
        cardElement.classList.add("tipo-normal");
      } else if (types.includes("fire")) {
        cardElement.style.backgroundColor = "#FFA500";
        cardElement.classList.add("tipo-fire");
      } else if (types.includes("water")) {
        cardElement.style.backgroundColor = "#00008B";
        cardElement.classList.add("tipo-water");
      } else if (types.includes("grass")) {
        cardElement.style.backgroundColor = "#008000";
        cardElement.classList.add("tipo-grass");
      } else if (types.includes("electric")) {
        cardElement.style.backgroundColor = "#FFFF00";
        cardElement.classList.add("tipo-electric");
      } else if (types.includes("psychic")) {
        cardElement.style.backgroundColor = "#FFC0CB";
        cardElement.classList.add("tipo-psychic");
      } else if (types.includes("ice")) {
        cardElement.style.backgroundColor = "#ADD8E6";
        cardElement.classList.add("tipo-ice");
      } else if (types.includes("dragon")) {
        cardElement.style.backgroundColor = "#800080";
        cardElement.classList.add("tipo-dragon");
      } else if (types.includes("dark")) {
        cardElement.style.backgroundColor = "#000000";
        cardElement.classList.add("tipo-dark");
        cardElement.style.color = "white";
      } else if (types.includes("fairy")) {
        cardElement.style.backgroundColor = "#FFB6C1";
        cardElement.classList.add("tipo-fairy");
      } else if (types.includes("fighting")) {
        cardElement.style.backgroundColor = "#8B4513";
        cardElement.classList.add("tipo-fighting");
        cardElement.style.color = "white";
      } else if (types.includes("flying")) {
        cardElement.style.backgroundColor = "#ADD8E6";
        cardElement.classList.add("tipo-flying");
      } else if (types.includes("poison")) {
        cardElement.style.backgroundColor = "#800080";
        cardElement.classList.add("tipo-poison");
        cardElement.style.color = "white";
      } else if (types.includes("ground")) {
        cardElement.style.backgroundColor = "#D2B48C";
        cardElement.classList.add("tipo-ground");
      } else if (types.includes("rock")) {
        cardElement.style.backgroundColor = "#8B4513";
        cardElement.classList.add("tipo-rock");
        cardElement.style.color = "white";
      } else if (types.includes("bug")) {
        cardElement.style.backgroundColor = "#90EE90";
        cardElement.classList.add("tipo-bug");
      } else if (types.includes("ghost")) {
        cardElement.style.backgroundColor = "#DDA0DD";
        cardElement.classList.add("tipo-ghost");
      } else if (types.includes("steel")) {
        cardElement.style.backgroundColor = "#B0C4DE";
        cardElement.classList.add("tipo-steel");
      }
    }

    BackgroundColor(cardPokemon, tipo);

    cardPokemon.addEventListener("click", () => {
      console.log(idPokemon, nome, tipo);
    });
  }
});

/* cores
Normal: Bege (#F5F5DC), Cinza claro (#D3D3D3)
Fire: Laranja (#FFA500), Vermelho (#FF0000)
Water: Azul escuro (#00008B), Azul claro (#ADD8E6)
Grass: Verde (#008000)
Electric: Amarelo (#FFFF00)
Psychic: Rosa (#FFC0CB), Roxo claro (#DDA0DD)
Ice: Azul claro (#ADD8E6), Branco (#FFFFFF)
Dragon: Roxo escuro (#800080), Azul royal (#4169E1)
Dark: Preto (#000000), Roxo escuro (#551A8B)
Fairy: Rosa claro (#FFB6C1), Branco (#FFFFFF)
Fighting: Marrom (#8B4513), Vermelho escuro (#8B0000)
Flying: Azul claro (#ADD8E6), Branco (#FFFFFF)
Poison: Roxo (#800080), Verde escuro (#006400)
Ground: Marrom claro (#D2B48C), Amarelo arenoso (#F4A460)
Rock: Marrom escuro (#8B4513), Cinza (#808080)
Bug: Verde claro (#90EE90), Marrom amarelado (#B8860B)
Ghost: Roxo pálido (#DDA0DD), Cinza escuro (#696969)
Steel: Cinza metálico (#B0C4DE) 
*/
