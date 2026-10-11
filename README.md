# 🎮 Pokédex

Uma Pokédex em **HTML, CSS (Tailwind), JavaScript e Node.js**, que consome a **PokéAPI** por meio de um servidor próprio feito com **Express**. A página exibe os Pokémon em cards dinâmicos, com cores por tipo, e permite buscar qualquer Pokémon por **nome ou número**.

> 🚧 Projeto em evolução, desenvolvido para fins de estudo.

---

## 📖 Sobre o projeto

O projeto começou como uma página puramente front-end e passou por uma reestruturação:

- **Layout novo**, com cabeçalho, seção de busca (hero) e catálogo de Pokémon;
- **Backend em Node.js/Express**, que atua como intermediário entre o front-end e a PokéAPI;
- **Tailwind CSS** combinado com CSS próprio para o visual.

O fluxo funciona assim:

```text
Navegador (index.html + script.js)
        │  fetch → http://localhost:3000/api/pokemon/:id
        ▼
Servidor Express (backend/server.js)
        │  fetch → https://pokeapi.co/api/v2/pokemon/:id
        ▼
PokéAPI
```

---

## ✨ Funcionalidades

- 🃏 Catálogo inicial com **12 Pokémon** carregados automaticamente ao abrir a página;
- 🔍 **Busca por nome ou número**, exibindo o card do Pokémon encontrado;
- 🎨 Cards criados dinamicamente com **ID**, **nome**, **arte oficial** e **tipos**;
- 🌈 Cor personalizada para cada um dos **18 tipos**, com nomes traduzidos para português;
- 🏷️ Suporte a Pokémon com um ou dois tipos;
- ♡ Botão de favoritar nos cards (apenas visual, por enquanto);
- 🛡️ Tratamento de erro no servidor: retorna "Pokémon não encontrado" para buscas inválidas.

---

## 🛠️ Tecnologias utilizadas

**Front-end**

- HTML5
- CSS3
- [Tailwind CSS](https://tailwindcss.com/) v4 (via CLI)
- JavaScript (ES6+)
- Fontes: Manrope e Space Grotesk (Google Fonts)

**Back-end**

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) 5
- [CORS](https://www.npmjs.com/package/cors)

**API**

- [PokéAPI](https://pokeapi.co/)

---

## 📂 Estrutura do projeto

```text
📁 ProjectPokedex
│
├── 📁 assets
│   ├── 📁 css
│   │   ├── input.css            # Entrada do Tailwind + classes de tipos e fontes
│   │   ├── main.css
│   │   ├── style.css            # Estilos gerais e dos cards
│   │   ├── search-section.css   # Estilos da seção de busca
│   │   └── grid-layout.css      # Layout em grid
│   ├── 📁 modules
│   │   └── script.js            # Lógica do front-end (fetch, cards, busca)
│   └── logoPokedex.png
│
├── 📁 backend
│   └── server.js                # Servidor Express (rota da PokéAPI)
│
├── index.html
├── output.css                   # CSS gerado pelo Tailwind
├── package.json
└── README.md
```

---

## 🚀 Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (recomendado: versão 18 ou superior, por causa do `fetch` nativo);
- Git.

### Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/luizguilhermee13/ProjectPokedex.git
```

2. Entre na pasta do projeto e instale as dependências:

```bash
cd ProjectPokedex
npm install
```

3. Inicie o servidor:

```bash
npm run dev
```

O servidor ficará disponível em `http://localhost:3000`.

4. Abra o arquivo `index.html` no navegador (ou use a extensão **Live Server** do VS Code).

> ⚠️ O servidor precisa estar rodando para os Pokémon aparecerem, pois o front-end busca os dados em `localhost:3000`.

### 🎨 Editando os estilos (opcional)

Se você alterar classes do Tailwind, regenere o `output.css`:

```bash
# modo observação (recompila ao salvar)
npm run tailwind

# build final minificado
npm run build:css
```

---

## 🔌 Rotas da API (backend)

| Método | Rota               | Descrição                                                           |
| ------ | ------------------ | ------------------------------------------------------------------- |
| GET    | `/`                | Verifica se o servidor está funcionando                             |
| GET    | `/api/pokemon/:id` | Retorna os dados de um Pokémon, buscando por **nome** ou **número** |

**Exemplos:**

```text
GET http://localhost:3000/api/pokemon/25
GET http://localhost:3000/api/pokemon/pikachu
```

Se o Pokémon não existir, a resposta é `{ "erro": "Pokémon não encontrado" }`. Em caso de falha ao consultar a PokéAPI, retorna status `500`.

---

## 💻 O que foi praticado

- Consumo de APIs com `fetch` e `async/await`;
- Criação de um servidor com **Express** e rotas com parâmetros;
- Uso de **CORS** e comunicação entre front-end e back-end;
- Tratamento de erros com `try/catch` e códigos de status HTTP;
- Manipulação do DOM e criação dinâmica de elementos;
- Arrays, `map()` e objetos de tradução;
- Estilização com **Tailwind CSS** e variáveis CSS (`--type-color`, `--type-bg`);
- Organização do projeto em pastas e fluxo de trabalho com **branches** no Git.

---

## 📈 Melhorias futuras

- [ ] Filtro por tipo (o botão "todos" já está no layout);
- [ ] Sistema de favoritos funcional (com contador no cabeçalho e persistência);
- [ ] Modal com detalhes, habilidades e estatísticas do Pokémon;
- [ ] Contador de resultados dinâmico;
- [ ] Mensagens de erro e estado de carregamento (loading) para o usuário;
- [ ] Paginação ou carregamento de mais Pokémon;
- [ ] Refatorar a criação dos cards em uma função reutilizável;
- [ ] Responsividade aprimorada;
- [ ] Deploy do front-end e do back-end.

---

## 🔗 Créditos

Todos os dados dos Pokémon são fornecidos pela [PokéAPI](https://pokeapi.co/). Pokémon e seus personagens pertencem à Nintendo, Game Freak e The Pokémon Company; este projeto não tem fins comerciais.

---

## 👨‍💻 Autor

Desenvolvido por **Luiz Guilherme**.

Fique à vontade para visitar meu [GitHub](https://github.com/luizguilhermee13) e acompanhar meus outros projetos.
