# 🎮 Pokédex

Uma Pokédex feita com **React, Vite e Tailwind CSS**, que consome a [PokéAPI](https://pokeapi.co/) por meio de um servidor próprio em **Node.js/Express**. Os Pokémon aparecem em cards coloridos por tipo, e é possível buscar por nome ou número, salvar favoritos e abrir um modal com os detalhes de cada um.

> 🚧 Projeto pessoal, desenvolvido para estudar React e organização de código.

---

## 📖 Sobre o projeto

A Pokédex nasceu como uma página em **HTML, CSS e JavaScript puro**, com o código dividido em módulos que manipulavam o DOM. Depois foi **migrada para React**, trocando `getElementById`, `innerHTML` e `addEventListener` por **componentes, estado e props**.

Fluxo de uma consulta:

```text
React (localhost:5173)
        │  fetch → http://localhost:3000/api/pokemon/:id
        ▼
Servidor Express (backend/server.js)
        │  fetch → https://pokeapi.co/api/v2/pokemon/:id
        ▼
PokéAPI
```

---

## ✨ Funcionalidades

- 🃏 **12 Pokémon** carregados automaticamente ao abrir a página, com indicador de carregamento;
- 🔍 **Busca por nome ou número**, com tratamento de espaços e maiúsculas (campo vazio volta à lista inicial);
- 🧭 **Duas abas**: Explorar (catálogo) e Favoritos, com título e contagem de resultados dinâmicos;
- ❤️ **Favoritos** com contador no cabeçalho, salvos no `localStorage` (continuam após recarregar a página);
- 📋 **Modal de detalhes** com altura, peso, habilidades e as seis estatísticas base em barras, fechado pelo botão × ou clicando fora;
- 🎨 Cor própria para cada um dos **18 tipos**, com nomes traduzidos para português;
- 🛡️ Servidor com tratamento de erro: retorna "Pokémon não encontrado" para buscas inválidas.

---

## 🛠️ Tecnologias

**Front-end**

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) v4 (plugin do Vite) + CSS próprio
- JavaScript (ES6+)
- Fontes Manrope e Space Grotesk (Google Fonts)

**Back-end**

- [Node.js](https://nodejs.org/) 18 ou superior
- [Express](https://expressjs.com/) 5
- [CORS](https://www.npmjs.com/package/cors)

**API**

- [PokéAPI](https://pokeapi.co/)

---

## 📂 Estrutura do projeto

O repositório tem **dois projetos Node independentes**: o servidor (na raiz) e o React (em `frontend/`), cada um com seu `package.json`.

```text
📁 ProjectPokedex
│
├── 📁 backend
│   └── server.js                # Servidor Express (rota da PokéAPI)
│
├── 📁 frontend
│   ├── 📁 src
│   │   ├── 📁 assets            # Imagens (logo)
│   │   ├── 📁 components        # Componentes React
│   │   │   ├── Cards.jsx
│   │   │   ├── Etiquetas.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Principal.jsx
│   │   │   ├── SectionPokedex.jsx
│   │   │   └── SectionSearch.jsx
│   │   ├── 📁 data              # Constantes (nomes dos tipos e estatísticas)
│   │   │   └── dados.js
│   │   ├── 📁 models            # Classe Pokemon (converte o JSON da API)
│   │   │   └── pokemon.js
│   │   ├── 📁 services          # Comunicação com o backend
│   │   │   └── api.js
│   │   ├── 📁 styles            # CSS dividido por parte da tela
│   │   │   ├── base.css         # Reset e corpo da página
│   │   │   ├── layout.css       # Estrutura: header, main e footer
│   │   │   ├── header.css       # Cabeçalho (logo, abas, contador)
│   │   │   ├── catalogo.css     # Seção do catálogo
│   │   │   ├── cards.css        # Cards e etiquetas de tipo
│   │   │   ├── tipos.css        # Cores de cada tipo
│   │   │   ├── search.css       # Seção de busca e pokébola decorativa
│   │   │   ├── modal.css        # Modal de detalhes
│   │   │   └── fonts.css        # Classes de fonte
│   │   ├── App.jsx
│   │   ├── index.css            # Importa fontes, Tailwind e os arquivos de styles/
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── eslint.config.mjs
├── package.json                 # Dependências do backend
└── README.md
```

### 🧩 Árvore de componentes e estado

```text
App                      ← estado: favoritos, aba
 ├─ Header               (contador de favoritos e troca de aba)
 ├─ Principal            ← estado: lista inicial, resultado da busca, carregando, Pokémon selecionado
 │   ├─ SectionSearch    (campo de busca controlado)
 │   ├─ SectionPokedex   (título, contagem e catálogo)
 │   │   └─ Cards
 │   │       └─ Etiquetas
 │   └─ Modal
 │       └─ Etiquetas
 └─ Footer
```

A lista exibida na tela, o título e a contagem de resultados são **valores derivados** do estado, calculados a cada renderização.

---

## 🚀 Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- Git

### Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/luizguilhermee13/ProjectPokedex.git
cd ProjectPokedex
```

2. Instale as dependências do **servidor** (na raiz) e do **React** (em `frontend`):

```bash
npm install
cd frontend
npm install
cd ..
```

3. Em um terminal, inicie o **servidor** (porta 3000):

```bash
npm run dev
```

4. Em **outro terminal**, inicie o **front-end** (porta 5173):

```bash
cd frontend
npm run dev
```

5. Acesse o endereço mostrado pelo Vite, normalmente `http://localhost:5173`.

> ⚠️ O servidor precisa estar rodando para os Pokémon aparecerem, pois o front-end busca os dados em `localhost:3000`.

### Build de produção do front-end

```bash
cd frontend
npm run build
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

**React**

- Componentes, props e composição;
- Estado com `useState` e efeitos com `useEffect`;
- **Elevação de estado** (lifting state up) para compartilhar favoritos e aba entre componentes;
- **Estado derivado**: lista exibida, título e contagem calculados, sem estado extra;
- Renderização condicional e listas com `.map` e `key`;
- Formulário com **input controlado** e `onSubmit`;
- Persistência com `localStorage` e inicialização preguiçosa do estado.

**JavaScript e Node.js**

- Requisições com `fetch` e `async/await`;
- `Promise.allSettled` para buscar vários Pokémon em paralelo;
- Servidor com Express, rotas com parâmetros, CORS e tratamento de erros;
- Orientação a objetos com a classe `Pokemon`.

**Organização**

- Separação em `components`, `services`, `models`, `data` e `styles`;
- Migração de um projeto em JavaScript puro para React;
- Fluxo de trabalho com branches no Git.

---

## 📈 Melhorias futuras

- [ ] Modal: fechar com `Esc`, bloquear a rolagem do fundo e gerenciar o foco (acessibilidade);
- [ ] Voltar para a aba Explorar ao buscar estando em Favoritos;
- [ ] Mensagens na tela para erro de busca e para "nenhum favorito" (no lugar do `alert`);
- [ ] Filtro por tipo;
- [ ] Carregar mais Pokémon ou paginação;
- [ ] URL do backend em variável de ambiente (`VITE_API_URL`);
- [ ] Extrair o card em um componente próprio e criar um hook `usePokemons`;
- [ ] Deploy do front-end e do back-end.

---

## 🔗 Créditos

Todos os dados dos Pokémon são fornecidos pela [PokéAPI](https://pokeapi.co/). Pokémon e seus personagens pertencem à Nintendo, Game Freak e The Pokémon Company; este projeto não tem fins comerciais.

---

## 👨‍💻 Autor

Desenvolvido por **Luiz Guilherme**.

Fique à vontade para visitar meu [GitHub](https://github.com/luizguilhermee13) e acompanhar meus outros projetos.
