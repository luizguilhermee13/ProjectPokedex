export class Pokemon {
  constructor(data) {
    this.idPokemon = data.id;
    this.nome = data.name;
    this.tipo = data.types.map((item) => item.type.name);
    this.imagemPokemon = data.sprites.other["official-artwork"].front_default;
    this.altura = data.height;
    this.peso = data.weight;
    this.habilidades = data.abilities.map((item) => item.ability.name);
    this.status = data.stats;
  }

  // Converter altura para metros
  alturaEmMetros() {
    return (this.altura / 10).toFixed(1);
  }

  // Converter peso para quilogramas
  pesoEmKg() {
    return (this.peso / 10).toFixed(1);
  }

  // Verificar se pertence a determinado tipo
  possuiTipo(tipo) {
    return this.tipo.includes(tipo);
  }
}
