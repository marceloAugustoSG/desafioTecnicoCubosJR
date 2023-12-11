# Backend Junior Test
Este repositório contém o código fonte para um teste prático realizado como parte do processo de seleção para a posição de Backend Junior. O objetivo deste teste foi implementar uma aplicação que gerencia pessoas, contas, cartões e transações, seguindo as especificações fornecidas.

### Tecnologias Utilizadas
Express
JWT (JSON Web Tokens)
TypeScript
Prisma ORM
#### Funcionalidades Implementadas
##### 1. Criar uma pessoa
Criação de um documento único por pessoa, que pode ser um CPF ou CNPJ.
#####  2. Adicionar e Listar Contas de uma Pessoa
Capacidade de adicionar contas associadas a uma pessoa.
Listagem das contas pertencentes a uma pessoa.
##### 3. Adicionar e Listar Cartões de uma Conta
Adição de cartões vinculados a uma conta.
Listagem dos cartões associados a uma conta.
##### 4. Listar Cartões de uma Pessoa
Exibição de todos os cartões pertencentes a uma pessoa, considerando todas as suas contas.
##### 5. Realizar Transações em uma Conta
Execução de transações em uma conta.
Validação do saldo para evitar valores negativos.
##### 6. Listar Transações em uma Conta com Filtros
Listagem de transações em uma conta com a capacidade de aplicar filtros.
##### 7. Consultar o Saldo de uma Conta
Recuperação do saldo atual de uma conta.
Como Executar o Projeto
Instale as Dependências
```bash
yarn install
```
Execute o Servidor de Desenvolvimento
```bash
yarn dev
```
Executar o Prisma Studio para Gerenciamento de Banco de Dados
```bash
yarn prisma studio
```
Executar as Migrações do Prisma
```bash
yarn prisma migrate dev
```

Este projeto foi desenvolvido com o intuito de demonstrar as habilidades na construção de aplicativos backend utilizando as tecnologias mencionadas. Sinta-se à vontade para explorar o código fonte e entrar em contato para qualquer esclarecimento adicional.
