# Notas de Estudo Técnico — refund-dashboard

## Português

### 1. Stack Tecnológico e Configuração

**Dependências de Desenvolvimento:**

- **Vite** (v8.0.3): Build tool e dev server, configurado com alias path `@` para imports simplificados em `src/`.
- **ESLint** (v10.3.0) com `@eslint/js`: Linting de código JavaScript com regras customizadas, integrado com globals para browser e Node.
- **Prettier**: Formatação de código com configuração de conflito resolvida via `eslint-config-prettier`.
- **Husky** (v9.1.7): Git hooks para automação. Configurado com `prepare` script.
- **lint-staged** (v16.2.7): Executa ESLint e Prettier apenas em arquivos staged antes do commit.

**Configuração de Build:**
Vite é executado em porta 5173 com alias path `@` resolvido para `src/`, permitindo imports como `import { initTheme } from "@/features/theme/theme.js"`.

### 2. Arquitetura e Modularização

O código segue estrutura modular com separação clara de responsabilidades:

#### **2.1 Componentes (`src/components/`)**

- **ThemeToggle**: Componente isolado que renderiza um botão SVG interativo para alternar temas light/dark. Carrega dinamicamente um SVG sprite e trata erros silenciosamente se falhar. Implementa ARIA labels (`aria-pressed`, `aria-label`) e `role="img"` para acessibilidade.

#### **2.2 Features (`src/features/`)**

- **theme.js**: Lógica de gestão de temas separada do componente de UI. Detecta preferência do sistema operacional via `window.matchMedia("(prefers-color-scheme: dark)")`, persiste escolha do usuário em localStorage com fallback para preferência do sistema. Implementa `applyTheme()`, `initTheme()` e `toggleTheme()` com tratamento de erro para operações de storage.

#### **2.3 Services (`src/services/`)**

- **api.js**: Wrapper pequeno para fetch com método `parseResponse()` que valida o status HTTP e lança erro estruturado. Oferece métodos `get()` e `post()` com error logging via console.error. Importante: sem interceptadores ou autenticação implementada, design simples para escalabilidade futura.
- **storage.js**: Abstração sobre localStorage com constante `EXPENSES_KEY`. Funções `loadExpenses()` e `saveExpenses()` implementam try-catch defensivo, retornando array vazio em caso de erro. Protege contra dados inválidos via `Array.isArray()` check.

#### **2.4 Utils (`src/utils/`)**

- **validators.js**: Três validadores com JSDoc: `isNotEmpty()` (trim + length check), `isEmail()` (regex RFC básica), `isValidAmount()` (parseFloat + comparação > 0).
- **formatters.js**: `formatDate()` usa `toLocaleDateString("pt-BR")` para formato dd/mm/yyyy.
- **helpers.js**: Quatro funções utilitárias:
  - `clamp()`: Restringe valor entre min/max via `Math.min(Math.max())`.
  - `generateId()`: Gera ID único com formato `prefix-timestamp-random` para uso em expense IDs.
  - `escapeHTML()`: Previne XSS ao substituir caracteres especiais (`&`, `<`, `>`, `"`, `'`) durante renderização dinâmica.

#### **2.5 CSS Modular (`src/css/`)**

- **variables.css**: Define 11 variáveis de tema (background, surface, text, muted, border, brand, accent). Implementa dois temas: light (padrão em `:root`) e dark (em `[data-theme="dark"]`). Ambos mantêm cores de accent consistentes.
- **reset.css, global.css, index.css**: Separação clara entre reset (normalização), estilos globais e específicos do index.

### 3. Padrões de Desenvolvimento

**JSDoc:**
Toda função exportada possui JSDoc com `@param`, `@returns`, `@example`. Exemplo: `parseResponse()` documenta throw de erro e retorno JSON.

**Validação de Entrada:**

- Formulário valida: descrição não-vazia (`expense.value.trim()`), categoria selecionada, amount positivo via `isValidAmount()`.
- Amount input implementa lógica two-fold: `oninput` para formatação em tempo real (remove não-dígitos, limita 13 dígitos, converte para BRL), `onblur` para validação final.

**Tratamento de Erros:**

- localStorage: try-catch com console.warn e fallback (localStorage.getItem retorna null tratado).
- ThemeToggle: erro ao carregar SVG sprite não quebra app, apenas console.warn.
- API: erro HTTP lança Error com status code incluído.

**Segurança:**

- `escapeHTML()` em helpers.js: Chamado durante renderização dinâmica de expense info (nome, categoria, amount).
- Validação de tipos: `Array.isArray()` em loadExpenses(), `parseFloat()` em amount validation.

**Acessibilidade:**

- SVG icons com `role="img"` e `aria-label`.
- ThemeToggle com `aria-pressed` (booleano dinâmico), `aria-label` (tooltip traduzido).
- Semantic HTML5 (form, input, select, ul/li).

### 4. Linting e Formatação

**ESLint Rules (eslint.config.mjs):**

- `no-var: "error"`, `prefer-const: "warn"`: Força ES6 declarações.
- `no-unused-vars: "warn"` com `argsIgnorePattern: "^_"`: Permite parâmetros não-usados prefixados com underscore.
- `no-console: "warn"` com whitelist para `console.warn` e `console.error`: console.log em produção é alerta.
- `sort-imports: "warn"`: Imports alfabética e case-insensitively (ignorado em main.js com `/* eslint-disable sort-imports */`).
- Files patterns: `vite.config.*` e `*.config.js` usam `globals.node` para permitir `require()` e `module` em configs.

**Prettier + ESLint Config:**
Prettier é incluído via `eslint-config-prettier` que desativa regras ESLint que conflitam com Prettier (ex: trailing commas, quotes).

**lint-staged (package.json):**

- `**/*.{html,css}`: prettier --write.
- `**/*.js`: primeiro eslint --fix, depois prettier --write (order importa para garantir que ESLint não refaça o que Prettier vai mudar).

### 5. Fluxo de Dados e Estado

**Estado Local (main.js):**

- Array `expenses` carregado via `loadExpenses()` no bootstrap.
- Adição de expense: valida entrada → cria objeto → `expenses = [...expenses, newExpense]` (imutável) → `saveExpenses()` → `expenseAdd()` renderiza novo item.
- Renderização: `renderExpenses()` limpa ul, forEach renderiza cada expense via `renderExpense()`.

**LocalStorage Persistence:**

- Key: `"template-base-expenses"`.
- Salvo após cada adição; carregado no init.
- Fallback seguro: retorna array vazio se load falha.

### 6. Desafios Técnicos Superados

1. **Tema Light/Dark com Persistência e Fallback:**
   - Consulta preferência do SO via Media Query.
   - Persiste em localStorage.
   - Fallback se localStorage indisponível.
   - Aplicado via `dataset.theme` no documentElement (sem CSS-in-JS).

2. **Formatação de Moeda BRL em Tempo Real:**
   - Captura apenas dígitos com regex `/\D/g`.
   - Limita 13 dígitos para evitar overflow.
   - Converte para float dividindo por 100.
   - Aplica `toLocaleString("pt-BR", { style: "currency", currency: "BRL" })` de forma imutável, preservando cursor.
   - Flag `isFormattingAmount` evita recursão infinita.

3. **Gerenciamento de Estado sem Framework:**
   - Array expense mantido em escopo de módulo (`let expenses`).
   - Atualizações imutáveis (`[...expenses, newExpense]`).
   - UI sincronizada manualmente via DOM API.

4. **SVG Sprite Dinâmico com Fallback:**
   - ThemeToggle carrega sprite via fetch.
   - Sprite inserido em div hidden no body.
   - Erros não quebram app (console.warn silencioso).
   - Ícones referenciados por ID via `<use href="#icon-id">`.

5. **Validação Robusta de Entrada:**
   - Cada campo validado separadamente (expense, categoria, amount).
   - Uso de `isValidAmount()` com parseFloat para evitar strings como "abc".
   - Parsing de amount remove caracteres não-numéricos antes de converter para float.

### 7. Performance e Otimizações

- **Vite**: Dev server com HMR, build otimizado com tree-shaking.
- **SVG Sprites**: Único HTTP request para ícones.
- **LocalStorage**: Síncrono e rápido para dados pequenos (array de expenses).
- **Lazy Loading**: SVG sprite carregado sob-demanda ao montar ThemeToggle.
- **CSS Variables**: Alternância de tema sem re-render, apenas aplicação de `data-theme`.

### 8. Estrutura de Commits

Projeto usa Conventional Commits (inferido de devDependencies). Histórico esperado:

- `feat: initial project setup`
- `feat: add theme toggle component`
- `feat: implement expense form and list`
- `feat: add formatters and validators`
- etc.

---

Notas de estudo técnico por [Victor Martins](https://github.com/VictorMartinsD).

---

## English

### 1. Technology Stack and Configuration

**Development Dependencies:**

- **Vite** (v8.0.3): Build tool and dev server, configured with `@` alias path for simplified imports in `src/`.
- **ESLint** (v10.3.0) with `@eslint/js`: JavaScript linting with custom rules, integrated with globals for browser and Node.
- **Prettier**: Code formatting with conflict resolution via `eslint-config-prettier`.
- **Husky** (v9.1.7): Git hooks for automation. Configured with `prepare` script.
- **lint-staged** (v16.2.7): Runs ESLint and Prettier only on staged files before commit.

**Build Configuration:**
Vite runs on port 5173 with `@` alias resolved to `src/`, enabling imports like `import { initTheme } from "@/features/theme/theme.js"`.

### 2. Architecture and Modularization

Code follows modular structure with clear separation of concerns:

#### **2.1 Components (`src/components/`)**

- **ThemeToggle**: Isolated component that renders an interactive SVG button to toggle light/dark themes. Dynamically loads an SVG sprite and silently handles errors on load failure. Implements ARIA labels (`aria-pressed`, `aria-label`) and `role="img"` for accessibility.

#### **2.2 Features (`src/features/`)**

- **theme.js**: Theme management logic separated from UI component. Detects OS preference via `window.matchMedia("(prefers-color-scheme: dark)")`, persists user choice in localStorage with fallback to OS preference. Implements `applyTheme()`, `initTheme()`, and `toggleTheme()` with error handling for storage operations.

#### **2.3 Services (`src/services/`)**

- **api.js**: Small fetch wrapper with `parseResponse()` method that validates HTTP status and throws structured errors. Offers `get()` and `post()` methods with error logging via console.error. Note: no interceptors or authentication implemented; simple design for future scalability.
- **storage.js**: Abstraction over localStorage with constant `EXPENSES_KEY`. Functions `loadExpenses()` and `saveExpenses()` implement defensive try-catch, returning empty array on error. Protects against invalid data via `Array.isArray()` check.

#### **2.4 Utils (`src/utils/`)**

- **validators.js**: Three validators with JSDoc: `isNotEmpty()` (trim + length check), `isEmail()` (basic RFC regex), `isValidAmount()` (parseFloat + comparison > 0).
- **formatters.js**: `formatDate()` uses `toLocaleDateString("pt-BR")` for dd/mm/yyyy format.
- **helpers.js**: Four utility functions:
  - `clamp()`: Restricts value between min/max via `Math.min(Math.max())`.
  - `generateId()`: Generates unique ID with format `prefix-timestamp-random` for expense IDs.
  - `escapeHTML()`: Prevents XSS by replacing special characters (`&`, `<`, `>`, `"`, `'`) during dynamic rendering.

#### **2.5 Modular CSS (`src/css/`)**

- **variables.css**: Defines 11 theme variables (background, surface, text, muted, border, brand, accent). Implements two themes: light (default in `:root`) and dark (in `[data-theme="dark"]`). Both maintain consistent accent colors.
- **reset.css, global.css, index.css**: Clear separation between reset (normalization), global styles, and index-specific styles.

### 3. Development Patterns

**JSDoc:**
Every exported function has JSDoc with `@param`, `@returns`, `@example`. Example: `parseResponse()` documents error throw and JSON return.

**Input Validation:**

- Form validates: non-empty description (`expense.value.trim()`), selected category, positive amount via `isValidAmount()`.
- Amount input implements two-fold logic: `oninput` for real-time formatting (removes non-digits, limits 13 digits, converts to BRL), `onblur` for final validation.

**Error Handling:**

- localStorage: try-catch with console.warn and fallback (localStorage.getItem returns null is handled).
- ThemeToggle: SVG sprite load error doesn't break app, only console.warn.
- API: HTTP error throws Error with status code included.

**Security:**

- `escapeHTML()` in helpers.js: Called during dynamic rendering of expense info (name, category, amount).
- Type validation: `Array.isArray()` in loadExpenses(), `parseFloat()` in amount validation.

**Accessibility:**

- SVG icons with `role="img"` and `aria-label`.
- ThemeToggle with `aria-pressed` (dynamic boolean), `aria-label` (localized tooltip).
- Semantic HTML5 (form, input, select, ul/li).

### 4. Linting and Formatting

**ESLint Rules (eslint.config.mjs):**

- `no-var: "error"`, `prefer-const: "warn"`: Enforces ES6 declarations.
- `no-unused-vars: "warn"` with `argsIgnorePattern: "^_"`: Allows unused parameters prefixed with underscore.
- `no-console: "warn"` with whitelist for `console.warn` and `console.error`: console.log in production is a warning.
- `sort-imports: "warn"`: Alphabetical imports case-insensitively (disabled in main.js with `/* eslint-disable sort-imports */`).
- File patterns: `vite.config.*` and `*.config.js` use `globals.node` to permit `require()` and `module` in configs.

**Prettier + ESLint Config:**
Prettier included via `eslint-config-prettier` which disables ESLint rules conflicting with Prettier (e.g., trailing commas, quotes).

**lint-staged (package.json):**

- `**/*.{html,css}`: prettier --write.
- `**/*.js`: first eslint --fix, then prettier --write (order matters to ensure ESLint doesn't redo what Prettier will change).

### 5. Data Flow and State Management

**Local State (main.js):**

- Array `expenses` loaded via `loadExpenses()` on bootstrap.
- Adding expense: validates input → creates object → `expenses = [...expenses, newExpense]` (immutable) → `saveExpenses()` → `expenseAdd()` renders new item.
- Rendering: `renderExpenses()` clears ul, forEach renders each expense via `renderExpense()`.

**LocalStorage Persistence:**

- Key: `"template-base-expenses"`.
- Saved after each addition; loaded on init.
- Safe fallback: returns empty array if load fails.

### 6. Technical Challenges Overcome

1. **Light/Dark Theme with Persistence and Fallback:**
   - Queries OS preference via Media Query.
   - Persists in localStorage.
   - Falls back if localStorage unavailable.
   - Applied via `dataset.theme` on documentElement (no CSS-in-JS).

2. **Real-Time BRL Currency Formatting:**
   - Captures digits only with regex `/\D/g`.
   - Limits to 13 digits to prevent overflow.
   - Converts to float by dividing by 100.
   - Applies `toLocaleString("pt-BR", { style: "currency", currency: "BRL" })` immutably, preserving cursor.
   - `isFormattingAmount` flag prevents infinite recursion.

3. **State Management Without Framework:**
   - Expense array maintained in module scope (`let expenses`).
   - Immutable updates (`[...expenses, newExpense]`).
   - UI synced manually via DOM API.

4. **Dynamic SVG Sprite with Fallback:**
   - ThemeToggle loads sprite via fetch.
   - Sprite inserted in hidden div in body.
   - Load errors don't break app (silent console.warn).
   - Icons referenced by ID via `<use href="#icon-id">`.

5. **Robust Input Validation:**
   - Each field validated separately (expense, category, amount).
   - Uses `isValidAmount()` with parseFloat to reject strings like "abc".
   - Amount parsing removes non-numeric characters before converting to float.

### 7. Performance and Optimizations

- **Vite**: Dev server with HMR, optimized build with tree-shaking.
- **SVG Sprites**: Single HTTP request for all icons.
- **LocalStorage**: Synchronous and fast for small data (expense array).
- **Lazy Loading**: SVG sprite loaded on-demand when mounting ThemeToggle.
- **CSS Variables**: Theme switching without re-render, just `data-theme` application.

### 8. Commit Structure

Project uses Conventional Commits (inferred from devDependencies). Expected history:

- `feat: initial project setup`
- `feat: add theme toggle component`
- `feat: implement expense form and list`
- `feat: add formatters and validators`
- etc.

---

Technical study notes by [Victor Martins](https://github.com/VictorMartinsD).
