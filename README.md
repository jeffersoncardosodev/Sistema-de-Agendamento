# Sistema de Agendamento – Barbearia

Aplicação web simples para agendamentos de barbearia.

- React 18 + Vite
- React Router (rotas e proteção de rota)
- Tailwind CSS (estilização)
- Persistência em `localStorage`

## Funcionalidades

- Login simples com perfil de administrador
  - Qualquer outro usuário e senha acessa como cliente
- Agendamento de horário pelo cliente
  - Campos: nome, telefone, data, hora, serviço, barbeiro, observações
  - Regras de negócio:
    - Só permite agendar em segundas e sábados
    - Horário permitido: entre 09:00 e 19:00
  - Seleção do barbeiro (lista estática)
- Área do administrador (rota protegida)
  - Listagem dos agendamentos com filtro por data
  - Remoção de agendamento e limpeza total
  - Visualização responsiva: cards no mobile e tabela no desktop
- Totalmente responsivo (navbar com menu hambúrguer no mobile)

## Requisitos

- Node.js 18+
- NPM 9+

## Como rodar

```bash
npm install
npm run dev
```

Acesse: `http://localhost:5173`

Para gerar build de produção:

```bash
npm run build
npm run preview
```

## Estrutura de pastas (principal)

```
.
├─ index.html
├─ package.json
├─ postcss.config.cjs
├─ tailwind.config.cjs
├─ vite.config.js
├─ src/
│  ├─ main.jsx
│  ├─ index.css
│  ├─ App.jsx
│  ├─ pages/
│  │  ├─ Login.jsx
│  │  ├─ Schedule.jsx
│  │  └─ Admin.jsx
│  ├─ routes/
│  │  └─ ProtectedRoute.jsx
│  └─ shared/
│     ├─ AuthContext.jsx
│     ├─ appointments.js
│     └─ barbers.js
```

## Detalhes de implementação

- `src/shared/AuthContext.jsx`: autenticação mínima, persiste estado no `localStorage`. Define papéis `admin` e `cliente`.
- `src/routes/ProtectedRoute.jsx`: protege a rota `/admin` exigindo papel `admin`.
- `src/shared/appointments.js`: CRUD básico dos agendamentos no `localStorage`.
- `src/shared/barbers.js`: lista estática de barbeiros.
- `src/pages/Schedule.jsx`:
  - Formulário de agendamento com validação de data e horário (09:00–19:00)
  - Permite agendar apenas em segundas (1) e sábados (6)
  - Salva também o barbeiro escolhido
- `src/pages/Admin.jsx`:
  - Lista agendamentos, filtra por data, remove e limpa todos
  - Mostra o barbeiro no mobile (cards) e desktop (tabela)
- `src/App.jsx`:
  - Navbar responsiva com menu hambúrguer
  - Rotas: `/`, `/login`, `/agendar`, `/admin`

## Estilos (Tailwind)

- Configuração em `tailwind.config.cjs` e `postcss.config.cjs`
- Diretivas no `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Regras de negócio atuais

- Apenas agendamentos às segundas e sábados
- Horário permitido: entre 09:00 e 19:00
- Seleção obrigatória de barbeiro

## Possíveis melhorias

- Gerenciamento de barbeiros no Admin (criar/editar/ativar)
- Agenda por barbeiro e bloqueio de horários ocupados
- Exportar agendamentos (CSV/Excel)
- Máscara/validação avançada para telefone
- Backend real (API + banco) e autenticação robusta

## Licença

Uso livre para fins educacionais e testes. 