<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Cartão de Descontos - Santa Casa de Maceió

Sistema de gerenciamento de cartão de descontos para a Santa Casa de Maceió, com interface amigável para usuários e painel administrativo.

## 🚀 Características

- **Autenticação de usuários** com login simples
- **Cartão digital** com informações do usuário
- **Catálogo de benefícios** (consultas, exames, medicamentos)
- **Assistente virtual** para responder dúvidas sobre benefícios
- **Painel administrativo** para gerenciar usuários e promover descontos
- **Integração com WhatsApp** para agendamentos
- **Responsivo** para mobile e desktop

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## 🏃 Como executar localmente

1. **Clone ou baixe o projeto**
   ```bash
   git clone <seu-repositorio>
   cd cartao_santa_casa
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:3000
   ```

## 🔐 Credenciais para teste

- **Usuário comum:**
  - Email: `eudes@exemplo.com`
  - Senha: `123`

- **Administrador:**
  - Email: `admin@santacasa.com`
  - Senha: `admin`

## 📁 Estrutura do projeto

```
├── App.tsx                 # Componente principal
├── index.tsx              # Ponto de entrada
├── vite.config.ts         # Configuração Vite
├── tsconfig.json          # Configuração TypeScript
├── package.json           # Dependências
├── components/            # Componentes reutilizáveis
│   ├── Navbar.tsx
│   └── DiscountCard.tsx
├── pages/                 # Páginas da aplicação
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   └── AdminDashboard.tsx
├── services/              # Serviços e utilitários
│   └── mockAssistant.ts   # Assistente virtual (local, sem API)
└── types.ts               # Definições de tipos TypeScript
```

## 🛠️ Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila para produção
- `npm run preview` - Visualiza a build de produção localmente

## 📝 Notas de desenvolvimento

- Este projeto usa **Vite** como bundler
- Interface construída com **React** e **Tailwind CSS**
- Ícones de **Lucide React**
- Roteamento com **React Router**
- Armazenamento de dados em **localStorage** (para demonstração)
- Assistente virtual utiliza respostas mock (sem dependência de API externa)

## 🔄 Plano futuro

- Integração com API real da Santa Casa
- Autenticação com backend
- Banco de dados para persistência
- Notificações por email/SMS
- Pagamentos e reembolsos

## 📄 Licença

Uso interno - Santa Casa de Maceió

