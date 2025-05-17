# API de Produtos NestJS

Esta é uma aplicação NestJS que se integra com a API DummyJSON para realizar operações CRUD em produtos.

## Funcionalidades

- Operações CRUD para produtos
- Integração com a API DummyJSON
- Registro de logs abrangente
- Tratamento de erros


## Pré-requisitos

- Node.js (v14 ou superior)
- npm (v6 ou superior)

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

## Executando a Aplicação

Para iniciar a aplicação em modo de desenvolvimento:

```bash
npm run start:dev
```


A aplicação estará disponível em `http://localhost:3001`

## Endpoints da API

### Integração com API Externa

- `GET /api/products` - Obter todos os produtos da API DummyJSON
- `GET /api/products/:id` - Obter um produto específico por ID
- `POST /api/products` - Criar um novo produto
- `PUT /api/products/:id` - Atualizar um produto
- `DELETE /api/products/:id` - Excluir um produto

### Operações no Banco de Dados Local

- `GET /api/products/local` - Obter todos os produtos do banco de dados local
- `GET /api/products/local/:id` - Obter um produto específico do banco de dados local
- `POST /api/products/local` - Salvar um produto no banco de dados local
- `DELETE /api/products/local/:id` - Excluir um produto do banco de dados local

