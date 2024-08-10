# Natura E-commerce Platform

## 1. Visão Geral

Este projeto é uma plataforma de e-commerce inspirada na Natura.

A API encontra-se disponível em <a href="https://natura-ecommerce.onrender.com/api#/">https://natura-ecommerce.onrender.com</a>.

OBS. <b>Hospedagem gratuita que pode pode conter oscilações.</b> Qualquer problema encontrado estou disponivel para contato.

## 2. Estrutura do banco de dados

Para o projeto foi utilizado um banco de dados Postgres. Conforme diagrama ER:

<img src="./docs/database-diagram.png" />

## 3. Estrutura do Projeto

### Application

Neste projeto seguimos uma arquitetura onde a aplicação é dividida por camadas. Dentro da pasta application organizamos a lógica da aplicação com os seguintes arquivos:

#### - Entities

A camada entities contém as definições das entidades de domínio, que são os modelos principais do seu sistema. Essas entidades representam os conceitos essenciais e as regras de negócios fundamentais da aplicação.

#### - Use-cases

A camada use-cases define os casos de uso da aplicação. Cada caso de uso representa uma operação específica que a aplicação pode realizar, orquestrando a interação entre entidades e repositórios para atender a uma necessidade do usuário.

#### - Repositories

A camada repositories é responsável por abstrair o acesso aos dados. Ela define interfaces para operações de armazenamento e recuperação de dados, permitindo que a camada de aplicação interaja com diferentes fontes de dados sem conhecer os detalhes específicos da implementação.

### Infra

Dentro da pasta Infra armazenamos as camadas externas as lógicas da aplicação como Banco de dados e protocolos de acesso:

#### - HTTP

Aqui temos os controllers que tem como dependência as use-cases.

#### - Database

Aqui temos a implementação do banco de dados. Neste projeto implementamos um banco de dados Postgres utilizando Prisma como ORM. Para testes unitários utilizamos banco em memória.

### Test

Aqui contém os testes unitários e de integração da aplicação mantendo a mesma estrutura da <i>/src</i>. Foram realizados testes de unidade utilizando banco de dados in-memory. Testes de integração são executados em conjunto com o banco específico para testes configurado via <i>docker-compose-test.yml</i>.

## Organização do repositório

- `src/`
  - `application/`
    - `use-cases/`
    - `entities/`
    - `repositories/`
  - `infra/`
    - `database/`
      - `in-memory/`
      - `prisma/`
    - `http/`
      - `controllers/`
      - `dtos/`
      - `mappers/`
    - `utils/`
- `test/`
  - `application/`
    - `use-cases/`
  - `infra/`
    - `controllers/`

## 4. Configuração e Instalação

### Requisitos

- Node.js >= 16.x
- Docker e docker-compose

### Passos para Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/MarceloAzeved0/natura-ecommerce.git
   cd natura-ecommerce

   ```

2. Instale as dependências:

   ```sh
   yarn install
   ```

3. Configure as variáveis de ambiente:

- Crie um arquivo .env na raiz do projeto com as seguintes configurações:

```sh
DATABASE_URL="postgresql://postgres:password@localhost:5432/natura_ecommerce"
```

4. Inicie o servidor:

```sh
  docker-compose up #ou
  yarn start 
```

5. (Opcional) Seed de produtos:

```sh
  yarn prisma:seed
```

## 5. Endpoints da API

A documentação da API está disponível no Swagger. Para acessar a documentação, inicie o servidor e navegue até:

```sh
  http://localhost:3000/api
```

## 6. Testes

Os testes de unidade e integraçãoforam escritos utilizando o Jest.

Para rodar os testes:

```sh
  yarn test
```

Para rodar o coverage:

```sh
  yarn test:cov
```

## 7. Considerações finais

### Decisões de Design

- Clean Architecture: Escolhi essa implementação para manter a separação de responsabilidades e facilitar a manutenção e evolução do código.
- NestJS: Utilizei NestJS por sua robustez e suporte a TypeScript, além de sua arquitetura modular.
- Prisma: Utilizei Prisma como ORM pela sua facilidade de uso e integrações com TypeScript.

### Melhorias futuras

- Autenticação e Autorização: Implementar autenticação e autorização para restringir o acesso aos endpoints.
- Adição de interfaces e classes para controlar e padronizar exceptions.
- Adição de logs na aplicação.

## 8. Contato

Se tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato:

- Nome: Marcelo Azevedo
- Email: marcelobernardy@gmail.com
