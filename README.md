# Habit Tracker

Aplicação full-stack para acompanhamento de hábitos diários com streak, gráfico de progresso e modo escuro.

## Tecnologias

**Frontend**

- React + Vite
- Tailwind CSS v4
- Recharts
- Axios

**Backend**

- Node.js + Express
- MySQL
- JWT + Bcryptjs

## Funcionalidades

- Cadastro e login de usuário com autenticação JWT
- Criar, arquivar e listar hábitos com cor personalizada
- Check diário de hábitos
- Streak de dias consecutivos
- Gráfico de progresso dos últimos 7 dias
- Modo escuro persistido no localStorage

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- MySQL 8+

### Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` em `backend/`:

```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=habit_tracker
JWT_SECRET=sua_chave_secreta
```

Execute o schema no MySQL:

```bash
mysql -u root -p < database/schema.sql
```

Inicie o servidor:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Crie o arquivo `.env` em `frontend/`:

```env
VITE_API_URL=http://localhost:3001
```

Inicie o servidor:

```bash
npm run dev
```

Acesse `http://localhost:5173`
