<div align="center">

# Especificação de Produto — refund-dashboard

</div>

<div align="center">

## Sumário | Summary

</div>

<div align="center">

| Português                                         | English                                     |
| ------------------------------------------------- | ------------------------------------------- |
| [Visão Geral do Produto](#visão-geral-do-produto) | [Product Overview](#product-overview)       |
| [Problema](#problema)                             | [Problem](#problem)                         |
| [Objetivo do Produto](#objetivo-do-produto)       | [Product Objective](#product-objective)     |
| [Usuário-Alvo](#usuário-alvo)                     | [Target User](#target-user)                 |
| [Funcionalidades](#funcionalidades)               | [Features](#features)                       |
| [Regras de Negócio](#regras-de-negócio)           | [Business Rules](#business-rules)           |
| [Fluxo do Usuário](#fluxo-do-usuário)             | [User Flow](#user-flow)                     |
| [MVP](#mvp)                                       | [MVP](#mvp-1)                               |
| [Decisões de Produto](#decisões-de-produto)       | [Product Decisions](#product-decisions)     |
| [Limitações Atuais](#limitações-atuais)           | [Current Limitations](#current-limitations) |
| [Próximos Passos](#próximos-passos)               | [Next Steps](#next-steps)                   |
| [Métricas de Sucesso](#métricas-de-sucesso)       | [Success Metrics](#success-metrics)         |

</div>

---

## Visão Geral do Produto

O **refund-dashboard** é um sistema de controle e solicitação de reembolsos corporativos. Permite ao usuário registrar despesas realizadas, categorizá-las e visualizar o total acumulado. O produto oferece persistência de dados local, interface responsiva e alternância entre temas claro e escuro.

**Valor entregue ao usuário:**

- Registro simples e rápido de despesas corporativas
- Visualização imediata do total de reembolso solicitado
- Gerenciamento local dos gastos com disponibilidade offline
- Experiência adaptável entre dois temas de interface

---

## Problema

Profissionais que viajam a trabalho ou precisam se deslocar para realizar tarefas precisam controlar suas despesas para solicitar reembolso. Sem um sistema centralizado e acessível, essas despesas se perdem, são anotadas em papel ou em múltiplas ferramentas diferentes. O processo manual de rastreamento cria:

- Risco de perda de dados
- Dificuldade de recuperar informações sobre gastos passados
- Incerteza sobre o valor total a ser reembolsado
- Falta de padronização nas categorias de despesa

---

## Objetivo do Produto

O sistema permite que o usuário:

1. Registre cada despesa no momento em que ocorre (ou em seguida)
2. Categorize automaticamente pela natureza do gasto
3. Acompanhe o total acumulado em tempo real
4. Tenha acesso aos seus dados mesmo sem conexão
5. Limpe a lista manualmente quando necessário

O resultado final é um registro confiável de todas as despesas, pronto para solicitar reembolso.

---

## Usuário-Alvo

- Profissionais que realizam despesas corporativas frequentemente
- Viajantes a trabalho
- Freelancers e consultores que necessitam rastrear gastos
- Usuários que necessitam de acesso offline à informação
- Usuários que preferem simplicidade sobre funcionalidades avançadas

Nível técnico: qualquer pessoa que consiga usar um navegador web. Sem necessidade de conhecimentos especiais.

---

## Funcionalidades

### 1. Adicionar Despesa

O usuário preenche um formulário com três campos obrigatórios: nome da despesa, categoria e valor. Ao clicar em "Adicionar despesa", o sistema processa os dados, valida as entradas e adiciona o item à lista.

### 2. Remover Despesa

Cada item na lista exibe um ícone de remoção. Ao clicá-lo, o item é excluído imediatamente e o total é recalculado.

### 3. Visualizar Lista de Despesas

A lista exibe todos os itens adicionados com nome, categoria e valor. A interface mostra quantidade de despesas (com pluralização: "1 despesa" ou "2 despesas") e o total acumulado em reais.

### 4. Formatação Automática de Moeda

O campo de valor é formatado automaticamente em BRL (brasileiro) conforme o usuário digita, sem necessidade de digitação manual de símbolo ou separadores.

### 5. Alternância de Tema

Um botão permite ao usuário alternar entre modo claro e modo escuro. A preferência é memorizada para próximas visitas.

### 6. Persistência de Dados

Todos os dados são armazenados localmente no navegador. Ao recarregar a página, as despesas são recuperadas automaticamente.

---

## Regras de Negócio

- O sistema não permite envio do formulário se o nome da despesa estiver vazio
- O sistema não permite envio do formulário se nenhuma categoria foi selecionada
- O sistema não permite valores menores ou iguais a zero
- O sistema limita nomes de despesas a 60 caracteres
- O sistema limita valores a 13 dígitos (proteção contra overflow)
- O sistema oferece exatamente 5 categorias de despesa: Alimentação, Hospedagem, Serviços, Transporte e Outros
- O sistema recalcula o total e a quantidade automaticamente após cada adição ou remoção
- O sistema respeita a preferência de tema do sistema operacional no primeiro acesso
- O sistema valida que o valor seja um número positivo
- O sistema persiste dados indefinidamente até que o usuário os remova
- Cada despesa recebe um identificador único gerado no momento da criação

---

## Fluxo do Usuário

1. Usuário acessa a página do sistema
2. Sistema carrega despesas salvas anteriormente (se existirem)
3. Sistema exibe lista vazia ou com despesas anteriores
4. Usuário preenche o formulário: nome da despesa, categoria e valor
5. Usuário clica em "Adicionar despesa"
6. Sistema valida entrada
7. Se inválido, exibe mensagem de erro específica
8. Se válido, adiciona à lista, limpa formulário e atualiza totais
9. Usuário pode remover itens clicando no ícone de remoção
10. Usuário pode alternar tema clicando no botão de tema
11. Ao recarregar a página, dados persistem

---

## MVP

O MVP (Minimum Viable Product) é composto pela funcionalidade central de adicionar, listar e remover despesas com cálculo automático de totais. Sem essa funcionalidade, o produto deixa de existir.

As funcionalidades de tema e persistência complementam a experiência mas não são absolutamente essenciais para o núcleo funcional.

---

## Decisões de Produto

**Validação imediata e feedback ao usuário:** Ao invés de aceitar dados inválidos silenciosamente, o sistema exibe mensagens claras indicando qual campo está incompleto ou inválido. Isso reduz retrabalho e frustração do usuário.

**Formatação automática de moeda:** O sistema formata o valor em BRL conforme o usuário digita. Isso elimina a necessidade de aprender formatação, reduz erros de entrada e melhora a confiança no dado inserido.

**Persistência local sem backend:** A ausência de autenticação e backend simplifica o sistema, reduz complexidade técnica e permite uso completamente offline. O tradeoff é que dados não sincronizam entre devices.

**Categorias pré-definidas:** Em vez de permitir categorias livres, o sistema oferece exatamente 5 categorias. Isso padroniza os dados, facilita análise e evita duplicação de categorias com nomes ligeiramente diferentes.

**Remoção direta, sem confirmação:** Remover uma despesa é imediato, sem pop-up de confirmação. Isso acelera a experiência, mas assume que o usuário é o único com acesso aos dados.

**Dois temas de interface:** Respeitar preferência do SO e permitir alternância manual oferece conforto visual sem adicionar complexidade significativa.

---

## Limitações Atuais

- Não possui autenticação ou múltiplos usuários
- Não sincroniza dados entre devices
- Não possibilita edição de despesas (apenas remoção e re-adição)
- Não possui histórico de alterações
- Não integra com sistemas de backend ou APIs externas
- Não exporta dados em formatos como CSV ou PDF
- Dados não sincronizam automaticamente com contas em nuvem
- Não possui backup automático
- Funciona apenas no navegador local

---

## Próximos Passos

- Implementar backend para sincronização entre devices
- Adicionar autenticação de usuário
- Permitir edição direta de despesas existentes
- Implementar histórico de alterações e visualização de tendências
- Adicionar exportação de dados em formatos como PDF e CSV
- Implementar filtros e busca na lista de despesas
- Adicionar gráficos de gastos por categoria
- Sincronizar dados com serviços em nuvem (Google Drive, Dropbox, etc.)
- Implementar backup automático
- Adicionar notificações de reembolso

---

## Métricas de Sucesso

**Usabilidade:**

- Usuário consegue adicionar uma despesa completa (nome, categoria, valor) em menos de 30 segundos
- Usuário localiza e remove uma despesa sem ajuda em menos de 10 segundos
- Taxa de abandono do formulário é inferior a 20%

**Funcionalidade:**

- Total exibido corresponde exatamente à soma das despesas adicionadas
- Quantidade de despesas reflete exatamente o número de itens listados
- Dados persistem após recarregar a página sem perda

**Confiabilidade:**

- Sistema não exibe erros ao adicionar despesas válidas
- Sistema não perde dados durante a sessão
- Validações impedem 100% das entradas inválidas

**Experiência:**

- Usuário consegue alternar temas sem dificuldade
- Formatação de moeda ocorre sem delay visível
- Interface responde em menos de 100ms em qualquer ação

---

Documento de produto elaborado por [Victor Martins](https://github.com/VictorMartinsD).

Este documento descreve a visão funcional e estratégica do sistema.

---

# Product Specification — Refund Dashboard

## Product Overview

**Refund Dashboard** is a corporate expense tracking and reimbursement request system. It enables users to register expenses, categorize them, and visualize accumulated totals. The product offers local data persistence, responsive interface, and toggling between light and dark themes.

**Value delivered to the user:**

- Simple and quick registration of corporate expenses
- Immediate visualization of total reimbursement requested
- Local expense management with offline availability
- Adaptable experience across two interface themes

---

## Problem

Professionals who travel for work or need to commute for tasks must track their expenses to request reimbursement. Without a centralized and accessible system, these expenses get lost, noted on paper, or scattered across multiple tools. The manual tracking process creates:

- Risk of data loss
- Difficulty retrieving information about past expenses
- Uncertainty about total reimbursement amount
- Lack of standardization in expense categories

---

## Product Objective

The system enables users to:

1. Register each expense when it occurs (or shortly after)
2. Automatically categorize by expense type
3. Track accumulated total in real time
4. Access data even without connectivity
5. Manually clear the list when necessary

The end result is a reliable record of all expenses, ready to request reimbursement.

---

## Target User

- Professionals who frequently incur corporate expenses
- Business travelers
- Freelancers and consultants who need to track expenses
- Users who require offline access to information
- Users who prefer simplicity over advanced features

Technical level: anyone who can use a web browser. No special knowledge required.

---

## Features

### 1. Add Expense

User fills a form with three mandatory fields: expense name, category, and amount. Upon clicking "Add expense", the system processes data, validates inputs, and adds the item to the list.

### 2. Remove Expense

Each item in the list displays a remove icon. Clicking it immediately deletes the item and recalculates the total.

### 3. View Expense List

The list displays all added items with name, category, and amount. The interface shows expense count (with pluralization: "1 expense" or "2 expenses") and accumulated total in Brazilian real.

### 4. Automatic Currency Formatting

The amount field is automatically formatted in BRL (Brazilian real) as the user types, without manual entry of symbol or separators needed.

### 5. Theme Toggling

A button allows users to switch between light and dark mode. The preference is remembered for future visits.

### 6. Data Persistence

All data is stored locally in the browser. Upon page reload, expenses are automatically recovered.

---

## Business Rules

- System does not allow form submission if expense name is empty
- System does not allow form submission if no category is selected
- System does not allow values less than or equal to zero
- System limits expense names to 60 characters
- System limits values to 13 digits (overflow protection)
- System offers exactly 5 expense categories: Food, Accommodation, Services, Transport, and Others
- System recalculates total and quantity automatically after each addition or removal
- System respects operating system theme preference on first access
- System validates that amount is a positive number
- System persists data indefinitely until user removes it
- Each expense receives a unique identifier generated at creation time

---

## User Flow

1. User accesses the system page
2. System loads previously saved expenses (if any)
3. System displays empty list or list with previous expenses
4. User fills the form: expense name, category, and amount
5. User clicks "Add expense"
6. System validates input
7. If invalid, displays specific error message
8. If valid, adds to list, clears form, and updates totals
9. User can remove items by clicking the remove icon
10. User can toggle theme by clicking the theme button
11. Upon page reload, data persists

---

## MVP

The MVP (Minimum Viable Product) consists of the core functionality of adding, listing, and removing expenses with automatic total calculation. Without this functionality, the product ceases to exist.

Theme and persistence features complement the experience but are not absolutely essential to core functionality.

---

## Product Decisions

**Immediate validation and user feedback:** Instead of silently accepting invalid data, the system displays clear messages indicating which field is incomplete or invalid. This reduces rework and user frustration.

**Automatic currency formatting:** The system formats the amount in BRL as the user types. This eliminates the need to learn formatting, reduces entry errors, and improves confidence in entered data.

**Local persistence without backend:** The absence of authentication and backend simplifies the system, reduces technical complexity, and allows completely offline use. The tradeoff is that data does not sync across devices.

**Predefined categories:** Instead of allowing free-form categories, the system offers exactly 5 categories. This standardizes data, facilitates analysis, and prevents category duplication with slightly different names.

**Direct removal without confirmation:** Removing an expense is immediate, without confirmation popup. This accelerates the experience but assumes the user is the only one with access to the data.

**Two interface themes:** Respecting OS preference and allowing manual switching offers visual comfort without adding significant complexity.

---

## Current Limitations

- No authentication or multiple users support
- No data synchronization across devices
- No ability to edit expenses (only removal and re-addition)
- No change history
- No integration with backend systems or external APIs
- No data export in formats like CSV or PDF
- No automatic synchronization with cloud accounts
- No automatic backup
- Works only in local browser

---

## Next Steps

- Implement backend for device synchronization
- Add user authentication
- Enable direct editing of existing expenses
- Implement change history and trend visualization
- Add data export in PDF and CSV formats
- Implement filtering and search in expense list
- Add spending charts by category
- Synchronize data with cloud services (Google Drive, Dropbox, etc.)
- Implement automatic backup
- Add reimbursement notifications

---

## Success Metrics

**Usability:**

- User can add a complete expense (name, category, amount) in less than 30 seconds
- User can locate and remove an expense without help in less than 10 seconds
- Form abandonment rate is below 20%

**Functionality:**

- Displayed total exactly matches the sum of added expenses
- Expense count exactly reflects the number of listed items
- Data persists after page reload without loss

**Reliability:**

- System displays no errors when adding valid expenses
- System does not lose data during the session
- Validations prevent 100% of invalid inputs

**Experience:**

- User can toggle themes without difficulty
- Currency formatting occurs without visible delay
- Interface responds in less than 100ms on any action

---

Product document prepared by [Victor Martins](https://github.com/VictorMartinsD).

This document describes the functional and strategic vision of the system.
