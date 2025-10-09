# Pedidos e Produtos Teste

Código que envovolve backend em Laravel 11 e FrontEnd Next.JS. API processa requisições e realize operações no banco de dados PostgreSQL.

## Installation - Backend

Na pasta /backend, fica localizada  a API. Para instalar todas as dependências, copie o `.env.example`para `.env`e execute os comandos abaixo

```bash
composer install
```
Após, execute o Laravel usando o Sail(recomendado) ou Artisan
```
sail up -d
php artisan serve
```
Para executar o `queue` do laravel, execute o comando abaixo
```
sail artisan queue:work
```
