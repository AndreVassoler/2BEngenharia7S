# API de Produtos NestJS

Esta é uma aplicação NestJS que se integra com a API DummyJSON para realizar operações CRUD em produtos. O projeto oferece uma interface completa para gerenciamento de produtos, combinando dados da API externa com armazenamento local.

## 🚀 Funcionalidades

- Operações CRUD completas para produtos
- Integração com a API DummyJSON
- Sistema de registro de logs abrangente
- Tratamento de erros robusto
- Armazenamento local de produtos
- Documentação clara dos endpoints

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)
- Um editor de código (recomendado: VS Code)
- Git (para clonar o repositório)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd [NOME_DO_DIRETÓRIO]
```

2. Instale as dependências do projeto:
```bash
npm install
```

3. Configure as variáveis de ambiente (se necessário):
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione as configurações necessárias (exemplo):
     ```
     PORT=3001
     DATABASE_URL=sua_url_do_banco_de_dados
     ```

## 🏃‍♂️ Executando a Aplicação

### Modo de Desenvolvimento

Para iniciar a aplicação em modo de desenvolvimento com hot-reload:

```bash
npm run start:dev
```

### Modo de Produção

Para iniciar a aplicação em modo de produção:

```bash
npm run build
npm run start:prod
```

A aplicação estará disponível em `http://localhost:3001`

## 📡 Endpoints da API

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/login` | Realiza o login do usuário |
| POST | `/api/auth/register` | Registra um novo usuário |
| POST | `/api/auth/refresh` | Atualiza o token de acesso |
| POST | `/api/auth/logout` | Realiza o logout do usuário |

### Integração com API Externa (DummyJSON)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/products` | Lista todos os produtos da API DummyJSON |
| GET | `/api/products/:id` | Obtém um produto específico por ID |
| POST | `/api/products` | Cria um novo produto |
| PUT | `/api/products/:id` | Atualiza um produto existente |
| DELETE | `/api/products/:id` | Remove um produto |

### Operações no Banco de Dados Local

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/products/local` | Lista todos os produtos armazenados localmente |
| GET | `/api/products/local/:id` | Obtém um produto específico do banco local |
| POST | `/api/products/local` | Salva um novo produto no banco local |
| DELETE | `/api/products/local/:id` | Remove um produto do banco local |

## 🛠️ Tecnologias Utilizadas

- NestJS
- TypeScript
- Node.js
- DummyJSON API
- TypeORM (para banco de dados local)

## 📝 Exemplos de Uso

### Criar um novo produto
```bash
curl -X POST http://localhost:3001/api/products/local \
-H "Content-Type: application/json" \
-d '{
  "title": "Novo Produto",
  "price": 99.99,
  "description": "Descrição do produto"
}'
```

### Listar todos os produtos
```bash
curl http://localhost:3001/api/products/local
```

