# Switch Manager -  Backend
Essa é parte responsável por gerenciar o backend da aplicação do Switch Manager.
Aqui estão as regras de autenticação JWT, conexão com o Banco de Dados, conexão com os switches e a API para comunicação com o Frontend.

## Instalação
Esse modulo usa como banco de dados o MySQL, então será necessário realizar a instação e configuração do mesmo, os passos de instalação e configuração aqui descritos foram executados em um sistema Ubuntu 20.04.

A Aplicação de backend, banco de dados e frontend estarão rodando na mesma máquina, mas fique à vontade para separar os serviços, caso seu cenário precise. 

### Instalação - MySQL

```bash
#Atualizando as dependencias
apt update && apt upgrade -y

#Instalação do MySQL
apt install mysql-server mysql-client -y

#Acesse o MySQL (Por padrão o acesso root não tem senha pois usa as credenciais do Linux para o Login)

mysql -uroot -p

#Crie o banco de dados da aplicação, bem como o seu usuário

CREATE DATABASE switchmanager CHARACTER SET utf8 collate utf8_bin;
CREATE USER switchmanager@localhost IDENTIFIED BY 'senhadobancodedados';
GRANT ALL PRIVILEGES ON switchmanager.* TO switchmanager@localhost;
FLUSH PRIVILEGES;
QUIT;

```
### Instalação - NodeJS
> Caso ja tenha o NodeJS instalado, pode pular essa parte.

```bash
curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
chmod +x nodesource_setup.sh
./nodesource_setup.sh
apt -y install nodejs

```

### Instalação - Python3
> Pyhton já vem instalado por padrão em distribuições Ubuntu, mas caso esteja usando WSL, ou algum container pode ter algum problema com isso. Então instale o Python3 e o gerenciador de pacotes pip.

```bash
apt install python3 python3-pip -y

```