# 🎮 Pokédex

Uma Pokédex desenvolvida com **HTML, CSS, JavaScript e Node.js**, utilizando a [PokéAPI](https://pokeapi.co/) para consultar informações dos Pokémon. O projeto exibe os dados em cards, permite buscar por nome ou número, visualizar detalhes e salvar favoritos.

> Projeto pessoal desenvolvido para praticar desenvolvimento web e organização de código.

## 📖 Sobre o projeto

A Pokédex começou como uma página front-end e foi sendo aprimorada ao longo do desenvolvimento. Hoje, conta com um servidor em **Node.js e Express** para consultar a PokéAPI e um front-end organizado em módulos JavaScript.

O layout utiliza **Tailwind CSS v4** e CSS próprio, com cores diferentes para os tipos de Pokémon e adaptação para telas menores.

O fluxo de consulta é simples:

```text
Navegador (front-end)
        ↓
Servidor Express (localhost:3000)
        ↓
PokéAPI
```

## ✨ Funcionalidades

- Catálogo inicial com 12 Pokémon carregados automaticamente;
- Busca de Pokémon por nome ou número;
- Cards com número, nome, imagem oficial e tipos;
- Cores e etiquetas para os 18 tipos, com nomes em português;
- Modal com altura, peso, habilidades e estatísticas;
- Adição e remoção de favoritos, com contador no cabeçalho;
- Favoritos salvos no `localStorage`, mantidos ao recarregar a página;
- Navegação entre as seções **Explorar** e **Favoritos**;
- Contador de resultados e tratamento de erros nas buscas;
- Layout responsivo.

## 🛠 Tecnologias utilizadas

**Front-end:** HTML5, CSS3, Tailwind CSS v4, JavaScript (ES6+) e Google Fonts.

**Back-end:** Node.js, Express e CORS.

**API:** [PokéAPI](https://pokeapi.co/).

**Ferramentas de desenvolvimento:** Git, GitHub, Prettier e ESLint.

## 📁 Estrutura do projeto

```text
ProjectPokedex/
├── assets/
│   ├── css/
│   │   ├── grid-layout.css
│   │   ├── input.css
│   │   ├── main.css
│   │   ├── modal.css
│   │   ├── search-section.css
│   │   └── style.css
│   ├── modules/
│   │   ├── api.js          # Consulta ao servidor
│   │   ├── busca.js        # Pesquisa de Pokémon
│   │   ├── cards.js        # Criação dos cards
│   │   ├── dados.js        # Traduções e listas
│   │   ├── favoritos.js    # Gerenciamento de favoritos
│   │   ├── modal.js        # Detalhes dos Pokémon
│   │   ├── navegacao.js    # Abas Explorar e Favoritos
│   │   ├── pokemon.js      # Classe Pokemon
│   │   ├── script.js       # Inicialização da aplicação
│   │   └── tipos.js        # Etiquetas dos tipos
│   └── logoPokedex.png
├── backend/
│   └── server.js           # Servidor Express
├── index.html
├── output.css             # CSS gerado pelo Tailwind
├── package.json
├── package-lock.json
└── README.md
```

## 🚀 Como executar

**Pré-requisitos:** Node.js 18 ou superior (para usar `fetch` nativo no servidor) e npm.

1. Clone o repositório e entre na pasta:

   ```bash
   git clone https://github.com/luizguilhermee13/ProjectPokedex.git
   cd ProjectPokedex
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   npm run dev
   ```

4. Abra o `index.html` no navegador, preferencialmente utilizando a extensão **Live Server** do VS Code.

O servidor ficará disponível em `http://localhost:3000` e precisa estar em execução para que os Pokémon sejam carregados.

### Comandos úteis

```bash
npm run tailwind      # Recompila o CSS ao salvar alterações
npm run build:css     # Gera o CSS minificado
npm run lint          # Analisa o JavaScript com ESLint
npm run format        # Formata os arquivos com Prettier
npm run format:check  # Verifica a formatação sem alterar arquivos
```

## 🔌 Rotas do servidor

| Método | Rota               | Descrição                                |
| ------ | ------------------ | ---------------------------------------- |
| GET    | `/`                | Confirma que o servidor está funcionando |
| GET    | `/api/pokemon/:id` | Consulta um Pokémon por nome ou número   |

Exemplos:

```text
http://localhost:3000/api/pokemon/25
http://localhost:3000/api/pokemon/pikachu
```

Para Pokémon não encontrados, o servidor retorna uma mensagem de erro. Em falhas na consulta à PokéAPI, retorna o status `500`.

## 💻 O que pratiquei

- Consumo de APIs com `fetch` e `async/await`;
- Criação de rotas e tratamento de erros com Express;
- Manipulação do DOM e eventos em JavaScript;
- Arrays e métodos como `map()`, `some()` e `findIndex()`;
- Armazenamento local com `localStorage`;
- Organização do JavaScript em módulos (`import` e `export`);
- Classes, construtores e métodos com a classe `Pokemon`;
- Estilização responsiva com Tailwind CSS e CSS próprio;
- Formatação e análise do código com Prettier e ESLint;
- Uso de Git e branches durante o desenvolvimento.

## 📌 Melhorias futuras

- [ ] Filtro de Pokémon por tipo;
- [ ] Mensagens de carregamento e erros diretamente na interface;
- [ ] Paginação ou carregamento de mais Pokémon;
- [ ] Atualização imediata da lista ao remover um Pokémon na aba Favoritos;
- [ ] Publicação do front-end e do back-end.

## 🔗 Créditos

Os dados e as imagens dos Pokémon são fornecidos pela [PokéAPI](https://pokeapi.co/). Pokémon pertence à Nintendo, Game Freak e The Pokémon Company. Este é um projeto de estudos, sem fins comerciais.

## 👨‍💻 Autor

Desenvolvido por **Luiz Guilherme**.

[Meu GitHub](https://github.com/luizguilhermee13)
