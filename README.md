<div align="center">

# refund-dashboard

</div>

<div align="center">

[![Acessar Deploy](https://img.shields.io/badge/Acessar%20Deploy-Github%20Pages-blue?style=for-the-badge)](https://victormartinsd.github.io/refund-dashboard/)
[![Figma Design](https://img.shields.io/badge/Figma%20Design-811?style=for-the-badge&logo=figma&logoColor=white&color=FC4A1A)](https://www.figma.com/design/bocHYggZtNDCaWhsub0XHe/Sistema-de-reembolso--Community-?node-id=3-376&t=0Z9rnRE2ioMsoJZK-0)
[![Notas de Estudo](https://img.shields.io/badge/%F0%9F%93%98%20Notas%20de%20Estudo-Documenta%C3%A7%C3%A3o-0ea5e9?style=for-the-badge)](./docs/notas-de-estudo.md)
[![Especificação do Produto](https://img.shields.io/badge/Especifica%C3%A7%C3%A3o%20do%20Produto-Documenta%C3%A7%C3%A3o-111827?style=for-the-badge)](./docs/PRODUCT_SPEC.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

</div>

---

<div align="center">

## Sumário | Summary

| Português                                       | English                                   |
| ----------------------------------------------- | ----------------------------------------- |
| [Sobre o Projeto](#sobre-o-projeto)             | [About the Project](#about-the-project)   |
| [Preview](#preview-pt)                          | [Preview](#preview-en)                    |
| [Visão de Produto](#visao-de-produto)           | [Product Vision](#product-vision)         |
| [Casos de Uso](#casos-de-uso)                   | [Use Cases](#use-cases)                   |
| [Funcionalidades](#funcionalidades)             | [Features](#features)                     |
| [Tecnologias](#tecnologias)                     | [Technologies](#technologies)             |
| [Arquitetura](#arquitetura)                     | [Architecture](#architecture)             |
| [Como rodar localmente](#como-rodar-localmente) | [How to run locally](#how-to-run-locally) |
| [Limitações conhecidas](#limitacoes-conhecidas) | [Known Limitations](#known-limitations)   |
| [Aprendizado](#aprendizado)                     | [Learning](#learning)                     |

</div>

<a name="sobre-o-projeto"></a>

## Sobre o Projeto

O `refund-dashboard` é um dashboard local para registrar despesas corporativas, organizar lançamentos por categoria e acompanhar o total acumulado de reembolso. O foco do projeto é manter a experiência simples, rápida e dependente apenas do navegador.

A aplicação trabalha com estado local, persistência no próprio dispositivo e uma interface pensada para operação direta, sem autenticação e sem backend no fluxo atual.

<a name="preview-pt"></a>

<div align="center">

## Preview

</div>

<div align="center">

<img width="1146" height="644" alt="Captura de tela do Dashboard de Reembolso no tema escuro, exibindo o formulário de solicitação e uma lista de 6 despesas com totalizador." src="https://github.com/user-attachments/assets/12bfb293-24b2-4253-b81b-8bd7cb68a8bf" />

</div>

<a name="visao-de-produto"></a>

## Visão de Produto

O sistema resolve o controle manual de despesas usadas em solicitações de reembolso. Ele centraliza o registro dos lançamentos, reduz perda de informação e mostra o total acumulado para apoiar a conferência do valor final.

O produto atende principalmente usuários que precisam registrar gastos corporativos de forma rápida e acompanhar a soma final sem depender de planilhas ou anotações paralelas. Para detalhes sobre as regras de negócio e os requisitos, acesse a [Especificação do Produto](./docs/PRODUCT_SPEC.md).

<a name="casos-de-uso"></a>

## Casos de Uso

- Registrar despesas de viagem ou deslocamento no momento em que elas acontecem.
- Conferir o valor total antes de enviar uma solicitação de reembolso.
- Organizar gastos por categoria para facilitar a revisão posterior.
- Remover lançamentos incorretos e recalcular o total imediatamente.
- Manter o histórico local mesmo sem conexão com a internet.

<a name="funcionalidades"></a>

## Funcionalidades

- Cadastro de despesas com nome, categoria e valor obrigatórios.
- Remoção imediata de itens já lançados na lista.
- Cálculo automático do total acumulado em reais.
- Contagem dinâmica da quantidade de despesas registradas.
- Formatação automática do campo de valor no padrão BRL.
- Alternância entre tema claro e tema escuro com preferência persistida.
- Recuperação automática dos dados salvos no navegador.

<a name="tecnologias"></a>

## Tecnologias

### Core

| Tecnologia              | Versão | Função                                                                          |
| ----------------------- | ------ | ------------------------------------------------------------------------------- |
| HTML5                   | Nativo | Estrutura semântica do documento, formulários e áreas principais da interface.  |
| JavaScript (ES Modules) | Nativo | Orquestra a renderização, as validações, o estado local e os eventos da página. |
| Vite                    | 8.0.3  | Servidor de desenvolvimento, build e empacotamento da aplicação.                |

### Styling

| Tecnologia            | Versão    | Função                                                                    |
| --------------------- | --------- | ------------------------------------------------------------------------- |
| CSS3                  | Nativo    | Define layout, responsividade, estados visuais e composição da interface. |
| CSS Custom Properties | Nativo    | Centraliza tokens de tema e facilita a troca entre modos claro e escuro.  |
| Google Fonts          | Open Sans | Carrega a tipografia usada na interface para manter consistência visual.  |
| SVG                   | Nativo    | Sustenta ícones e sprites usados nos controles e na identidade visual.    |

### Infrastructure / API

| Tecnologia   | Versão | Função                                                                                         |
| ------------ | ------ | ---------------------------------------------------------------------------------------------- |
| Fetch API    | Nativo | Carrega o sprite SVG do componente de tema e sustenta a abstração de requisições reutilizável. |
| localStorage | Nativo | Persiste despesas e preferência de tema diretamente no navegador.                              |

### Tooling

| Tecnologia             | Versão | Função                                                                |
| ---------------------- | ------ | --------------------------------------------------------------------- |
| ESLint                 | 10.3.0 | Aplica regras de qualidade e consistência no JavaScript.              |
| @eslint/js             | 10.0.1 | Fornece a base oficial de regras recomendadas para o lint do projeto. |
| eslint-config-prettier | 10.1.8 | Remove conflitos entre ESLint e Prettier.                             |
| Prettier               | Latest | Padroniza a formatação de arquivos do projeto.                        |
| Husky                  | 9.1.7  | Executa o hook de pre-commit antes de cada commit.                    |
| lint-staged            | 16.2.7 | Roda lint e formatação apenas nos arquivos staged.                    |
| globals                | 17.6.0 | Define os globals de browser e Node usados nas configurações de lint. |

<a name="arquitetura"></a>

## Arquitetura

```text
refund-dashboard/
├── index.html                      # Entry point com metadados, fontes, ícones e bootstrap do app
├── package.json                    # Scripts npm, dependências e configuração de hooks
├── package-lock.json               # Lockfile de dependências
├── eslint.config.mjs               # Regras de lint e escopos de globals
├── vite.config.js                  # Configuração do Vite com porta e alias
├── .editorconfig                   # Padrões do editor
├── .env.example                    # Exemplo de variáveis de ambiente
├── .gitignore                      # Arquivos ignorados pelo Git
├── .prettierignore                 # Arquivos excluídos da formatação
├── .prettierrc                     # Regras de formatação
├── .husky/
│   └── pre-commit                  # Hook que chama lint-staged
├── docs/
│   ├── PRODUCT_SPEC.md             # Especificação de produto
│   └── notas-de-estudo.md          # Notas técnicas e aprendizados
├── src/
│   ├── main.js                     # Orquestra a aplicação, formulários, lista e totais
│   ├── assets/img/
│   │   ├── favicon.png             # Ícone do navegador
│   │   ├── icons.svg               # Sprite de ícones usado pela interface
│   │   └── preview.png             # Imagem de preview social
│   ├── components/ThemeToggle/
│   │   ├── ThemeToggle.js          # Componente do alternador de tema
│   │   ├── ThemeToggle.css         # Estilos do componente de tema
│   │   └── icons.svg               # Ícones do componente
│   ├── css/
│   │   ├── reset.css               # Reset base
│   │   ├── variables.css           # Tokens de cor e temas
│   │   ├── global.css              # Estilos globais e layout principal
│   │   └── index.css               # Camada de importação dos estilos
│   ├── features/theme/theme.js     # Regras de tema e persistência da preferência
│   ├── services/
│   │   ├── api.js                  # Abstração reutilizável para requisições HTTP
│   │   └── storage.js              # Persistência local das despesas
│   └── utils/
│       ├── formatters.js           # Formatação de datas
│       ├── helpers.js              # Helpers genéricos
│       └── validators.js           # Validações de entrada
├── dist/                           # Saída gerada no build
├── draft.html                      # Página auxiliar de rascunho
├── eslint-report.json              # Relatório local de lint
└── node_modules/                   # Dependências instaladas localmente
```

A aplicação usa uma organização por responsabilidade: `main.js` concentra a composição do fluxo, `components/` isola a interface reutilizável, `features/` agrupa regras de domínio, `services/` concentra persistência e acesso a dados, `utils/` reúne funções genéricas e `css/` separa reset, tokens e estilos globais.

O projeto também mantém arquivos de suporte que reforçam consistência de desenvolvimento, como `.editorconfig`, `.prettierrc`, `.prettierignore`, `eslint.config.mjs` e o hook do Husky. Não há suíte de testes automatizados configurada atualmente.

<a name="como-rodar-localmente"></a>

## Como rodar localmente

O projeto usa `npm`, porque o repositório contém `package-lock.json`.

1. Clone o repositório:

```bash
git clone https://github.com/VictorMartinsD/refund-dashboard.git
```

2. Entre no diretório do projeto:

```bash
cd refund-dashboard
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Gere a versão de produção:

```bash
npm run build
```

<a name="limitacoes-conhecidas"></a>

## Limitações conhecidas

- Não possui autenticação.
- Não suporta múltiplos usuários.
- Não oferece edição direta de despesas existentes.
- Não possui integração com API externa no fluxo atual.
- Não possui exportação para CSV ou PDF.
- Não tem testes automatizados configurados.

<a name="aprendizado"></a>

## Aprendizado

O principal aprendizado foi organizar uma interface funcional com foco em clareza de estado, validação de entrada e persistência local. O projeto reforça a construção de módulos pequenos com responsabilidades bem definidas e a relação entre produto e experiência de uso.

Também serviu como prática de estruturação de uma base simples, mas consistente, para evoluir sem acoplamento excessivo. Os detalhes técnicos completos estão em [Notas de Estudo](./docs/notas-de-estudo.md).

---

<div align="center">

## ENGLISH VERSION

</div>

<a name="about-the-project"></a>

## About the Project

`refund-dashboard` is a local dashboard for recording corporate expenses, organizing entries by category, and tracking the accumulated reimbursement total. The project focuses on keeping the experience simple, fast, and browser-based.

The application works with local state, persistence on the device itself, and an interface designed for direct use, without authentication and without a backend in the current flow.

<a name="preview-en"></a>

## Preview

See the preview in the Portuguese section above: [Preview](#preview-pt).

<a name="product-vision"></a>

## Product Vision

The system solves the manual tracking of expenses used in reimbursement requests. It centralizes entries, reduces information loss, and shows the accumulated total to support the final amount review.

The product mainly serves users who need to register corporate expenses quickly and verify the final sum without relying on spreadsheets or separate notes. For details on business rules and requirements, access the [Product Specification](./docs/PRODUCT_SPEC.md).

<a name="use-cases"></a>

## Use Cases

- Register travel or commuting expenses as they happen.
- Check the total amount before submitting a reimbursement request.
- Organize expenses by category for later review.
- Remove incorrect entries and recalculate the total immediately.
- Keep a local record even without internet access.

<a name="features"></a>

## Features

- Expense registration with required name, category, and amount.
- Immediate removal of items already added to the list.
- Automatic calculation of the total amount in Brazilian real.
- Dynamic counter for the number of registered expenses.
- Automatic formatting of the amount field in BRL.
- Light and dark theme switching with persisted preference.
- Automatic recovery of data saved in the browser.

<a name="technologies"></a>

## Technologies

### Core

| Technology              | Version | Function                                                           |
| ----------------------- | ------- | ------------------------------------------------------------------ |
| HTML5                   | Native  | Semantic document structure, forms, and main interface areas.      |
| JavaScript (ES Modules) | Native  | Orchestrates rendering, validations, local state, and page events. |
| Vite                    | 8.0.3   | Development server, build pipeline, and application bundling.      |

### Styling

| Technology            | Version   | Function                                                                  |
| --------------------- | --------- | ------------------------------------------------------------------------- |
| CSS3                  | Native    | Defines layout, responsiveness, visual states, and interface composition. |
| CSS Custom Properties | Native    | Centralizes theme tokens and supports light/dark switching.               |
| Google Fonts          | Open Sans | Loads the typeface used in the interface for visual consistency.          |
| SVG                   | Native    | Supports icons and sprites used in controls and visual identity.          |

### Infrastructure / API

| Technology   | Version | Function                                                                         |
| ------------ | ------- | -------------------------------------------------------------------------------- |
| Fetch API    | Native  | Loads the theme component SVG sprite and supports the reusable HTTP abstraction. |
| localStorage | Native  | Persists expenses and theme preference directly in the browser.                  |

### Tooling

| Technology             | Version | Function                                                              |
| ---------------------- | ------- | --------------------------------------------------------------------- |
| ESLint                 | 10.3.0  | Applies quality and consistency rules to JavaScript.                  |
| @eslint/js             | 10.0.1  | Provides the official base of recommended lint rules for the project. |
| eslint-config-prettier | 10.1.8  | Removes conflicts between ESLint and Prettier.                        |
| Prettier               | Latest  | Standardizes project file formatting.                                 |
| Husky                  | 9.1.7   | Runs the pre-commit hook before each commit.                          |
| lint-staged            | 16.2.7  | Runs lint and formatting only on staged files.                        |
| globals                | 17.6.0  | Defines the browser and Node globals used in lint configuration.      |

<a name="architecture"></a>

## Architecture

```text
refund-dashboard/
├── index.html                      # Entry point with metadata, fonts, icons, and app bootstrap
├── package.json                    # npm scripts, dependencies, and hook configuration
├── package-lock.json               # Dependency lockfile
├── eslint.config.mjs               # Lint rules and global scopes
├── vite.config.js                  # Vite configuration with port and alias
├── .editorconfig                   # Editor standards
├── .env.example                    # Example environment variables
├── .gitignore                      # Git ignored files
├── .prettierignore                 # Files excluded from formatting
├── .prettierrc                     # Formatting rules
├── .husky/
│   └── pre-commit                  # Hook that calls lint-staged
├── docs/
│   ├── PRODUCT_SPEC.md             # Product specification
│   └── notas-de-estudo.md          # Technical notes and learnings
├── src/
│   ├── main.js                     # Orchestrates the app, form, list, and totals
│   ├── assets/img/
│   │   ├── favicon.png             # Browser icon
│   │   ├── icons.svg               # Icon sprite used by the interface
│   │   └── preview.png             # Social preview image
│   ├── components/ThemeToggle/
│   │   ├── ThemeToggle.js          # Theme toggle component
│   │   ├── ThemeToggle.css         # Theme component styles
│   │   └── icons.svg               # Component icons
│   ├── css/
│   │   ├── reset.css               # Base reset
│   │   ├── variables.css           # Color tokens and themes
│   │   ├── global.css              # Global styles and main layout
│   │   └── index.css               # Style import layer
│   ├── features/theme/theme.js     # Theme rules and preference persistence
│   ├── services/
│   │   ├── api.js                  # Reusable HTTP request abstraction
│   │   └── storage.js              # Local expense persistence
│   └── utils/
│       ├── formatters.js           # Date formatting
│       ├── helpers.js              # Generic helpers
│       └── validators.js           # Input validation
├── dist/                           # Build output
├── draft.html                      # Auxiliary draft page
├── eslint-report.json              # Local lint report
└── node_modules/                   # Installed local dependencies
```

The application uses a responsibility-based organization: `main.js` concentrates the flow composition, `components/` isolates reusable interface pieces, `features/` groups domain rules, `services/` concentrates persistence and data access, `utils/` collects generic functions, and `css/` separates reset, tokens, and global styles.

The project also keeps support files that reinforce development consistency, such as `.editorconfig`, `.prettierrc`, `.prettierignore`, `eslint.config.mjs`, and the Husky hook. There is no automated test suite configured at the moment.

<a name="how-to-run-locally"></a>

## How to run locally

The project uses `npm` because the repository contains `package-lock.json`.

1. Clone the repository:

```bash
git clone https://github.com/VictorMartinsD/refund-dashboard.git
```

2. Enter the project directory:

```bash
cd refund-dashboard
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Build the production version:

```bash
npm run build
```

<a name="known-limitations"></a>

## Known Limitations

- No authentication.
- No support for multiple users.
- No direct editing of existing expenses.
- No external API integration in the current flow.
- No export to CSV or PDF.
- No automated tests configured.

<a name="learning"></a>

## Learning

The main learning outcome was organizing a functional interface with a clear focus on state, input validation, and local persistence. The project reinforces how to build small modules with well-defined responsibilities and how product decisions connect to user experience.

It also served as practice in structuring a simple but consistent foundation that can evolve without excessive coupling. The complete technical notes are available in [Study Notes](./docs/notas-de-estudo.md).
