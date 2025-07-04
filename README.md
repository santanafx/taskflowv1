# TaskFlow - Sistema de Gerenciamento de Projetos

## 📋 Descrição do Projeto

O **TaskFlow** é uma aplicação web moderna para gerenciamento de projetos e coordenação de equipes, inspirada no Jira. O sistema oferece funcionalidades essenciais para gestão de projetos, incluindo:

- **Quadro Kanban**: Visualização e gerenciamento de tarefas em colunas organizadas por status
- **Dashboard**: Página com métricas e gráficos para acompanhamento do progresso dos projetos
- **Gestão de Equipes**: Organização e coordenação de membros da equipe
- **Relatórios**: Análises e insights sobre o desempenho dos projetos

O projeto foi desenvolvido utilizando **Next.js 15** com TypeScript, seguindo as melhores práticas de desenvolvimento moderno.

## 📸 Screenshots e Vídeos

### Screenshots

_[Seção para adicionar screenshots do projeto]_

### Vídeos

_[Seção para adicionar vídeos demonstrativos]_

## 🛠️ Tecnologias Utilizadas

### Frontend e Framework

- **Next.js 15**: Framework React com App Router, oferecendo SSR, SSG e otimizações de performance
- **React 19**: Biblioteca para construção de interfaces de usuário
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática

### Gerenciamento de Estado

- **Redux Toolkit (@reduxjs/toolkit)**: Biblioteca oficial para gerenciamento de estado global com ferramentas simplificadas
- **React Redux (react-redux)**: Integração do Redux com React para gerenciamento de estado da aplicação

### Gerenciamento de Dados e Cache

- **@tanstack/react-query**: Biblioteca para gerenciamento de estado do servidor, cache, sincronização e atualizações
- **Axios**: Cliente HTTP baseado em Promise para fazer requisições à API

### Formulários e Validação

- **React Hook Form**: Biblioteca performática para gerenciamento de formulários com validação
- **Zod**: Biblioteca de validação de esquemas TypeScript-first
- **@hookform/resolvers**: Integração entre React Hook Form e bibliotecas de validação

### UI/UX e Estilização

- **Tailwind CSS**: Framework CSS utilitário para desenvolvimento rápido de interfaces
- **Shadcn/ui**: Biblioteca de componentes React reutilizáveis e acessíveis
- **Radix UI**: Primitivos de UI acessíveis e não estilizados
- **Lucide React**: Biblioteca de ícones SVG para React
- **Recharts**: Biblioteca de gráficos para React

### Mock e Desenvolvimento

- **JSON Server**: Servidor REST API fake para desenvolvimento e prototipagem

## 🏗️ Arquitetura e Estrutura do Projeto

### Atomic Design

O projeto segue a metodologia **Atomic Design**, que organiza os componentes em uma hierarquia clara e escalável:

- **Atoms**: Componentes básicos e indivisíveis (botões, inputs, labels)
- **Molecules**: Combinações simples de atoms (formulários, cards)
- **Organisms**: Componentes complexos que formam seções da interface (headers, sidebars)
- **Layouts**: Estruturas que organizam organisms (páginas, templates)

**Benefícios do Atomic Design:**

- **Reutilização**: Componentes podem ser facilmente reutilizados em diferentes contextos
- **Manutenibilidade**: Mudanças em componentes básicos se propagam automaticamente
- **Consistência**: Garante uniformidade visual e comportamental
- **Escalabilidade**: Facilita o crescimento do projeto de forma organizada
- **Colaboração**: Equipes podem trabalhar em paralelo sem conflitos

### Camada de Serviços

A camada de serviços foi criada para centralizar toda a lógica de comunicação com APIs e gerenciamento de dados:

```
src/services/
├── api/
│   ├── config.ts          # Configurações do Axios
│   └── queryKeys.ts       # Enum para chaves de cache do React Query
├── hooks/                 # Custom hooks para gerenciamento de dados
├── types/                 # Definições de tipos TypeScript
└── mocks/                 # Dados mockados para desenvolvimento
    ├── db.json           # Banco de dados fake
    └── routes.json       # Configuração de rotas do JSON Server
```

**Características da Camada de Serviços:**

- **Tipos Centralizados**: Todas as interfaces e tipos ficam organizados em `types/`
- **Mocks Estruturados**: Dados fake organizados para simular um backend real
- **Hooks Customizados**: Encapsulam a lógica de chamadas de API e cache
- **Configuração do Axios**: Centraliza interceptors, headers e configurações
- **Query Keys Organizadas**: Enum para gerenciar cache, refetch e invalidação

### Gerenciamento de Estado com Redux

O Redux é utilizado para gerenciar o estado global da aplicação:

- **Store Centralizado**: Estado compartilhado entre componentes
- **Slices**: Organização modular do estado por funcionalidade
- **Actions**: Disparadas para modificar o estado
- **Selectors**: Funções para acessar dados do estado de forma otimizada

### React Query para Cache e Sincronização

O @tanstack/react-query gerencia:

- **Cache Inteligente**: Armazena dados de forma otimizada
- **Sincronização Automática**: Mantém dados atualizados
- **Gerenciamento de Loading States**: Estados de carregamento automáticos
- **Refetch Inteligente**: Revalidação automática de dados

## 📁 Estrutura de Diretórios

```
src/
├── app/                   # App Router do Next.js
│   ├── globals.css       # Estilos globais e configuração do Tailwind
│   ├── layout.tsx        # Layout principal da aplicação
│   ├── page.tsx          # Página inicial
│   ├── providers.tsx     # Providers (Redux, React Query)
│   ├── projects/         # Páginas de projetos
│   ├── reports/          # Páginas de relatórios
│   └── team/             # Páginas de equipe
├── components/           # Componentes organizados por Atomic Design
│   ├── atoms/           # Componentes básicos
│   ├── molecules/       # Combinações de atoms
│   ├── organisms/       # Componentes complexos
│   ├── layouts/         # Layouts e templates
│   └── ui/              # Componentes do Shadcn/ui
├── services/            # Camada de serviços (API, hooks, tipos)
├── store/               # Configuração do Redux
├── utils/               # Utilitários e funções auxiliares
├── hooks/               # Custom hooks gerais
└── lib/                 # Configurações de bibliotecas
```

## 🎨 Estilização e UI

### Tailwind CSS

- **Sistema de Design**: Cores, tipografia e espaçamentos padronizados
- **Responsividade**: Design mobile-first
- **Dark Mode**: Suporte completo a tema escuro
- **Customização**: Variáveis CSS customizadas para branding

### Shadcn/ui

- **Componentes Acessíveis**: Seguindo padrões de acessibilidade
- **Customizáveis**: Fácil personalização via CSS
- **Consistentes**: Design system unificado
- **Performáticos**: Otimizados para performance

### globals.css

O arquivo `globals.css` contém:

- **Configuração do Tailwind**: Importações e configurações
- **Variáveis CSS**: Sistema de cores e tokens de design
- **Tema Claro/Escuro**: Definição de variáveis para ambos os temas
- **Reset CSS**: Normalização de estilos entre navegadores

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**

### Instalação

1. **Clone o repositório**

   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd taskflowv1
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   ```bash
   cp .env.example .env
   ```

   Edite o arquivo `.env` com as configurações necessárias.

4. **Execute o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

5. **Em outro terminal, execute o servidor de mocks**
   ```bash
   npm run mocks
   ```

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento com Turbopack
- `npm run build`: Gera a build de produção
- `npm run start`: Inicia o servidor de produção
- `npm run lint`: Executa o linter para verificar código
- `npm run mocks`: Inicia o JSON Server na porta 5000

### Acessando a Aplicação

- **Frontend**: http://localhost:3000
- **API Mock**: http://localhost:5000

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Lucas Santana Figueiredo
