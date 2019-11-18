# D3, Logic Challenge - Frontend

Aplicação [Caminho Mínimo](https://pt.wikipedia.org/wiki/Problema_do_caminho_m%C3%ADnimo) desenvolvida em [React](https://reactjs.org/), focada na exibição do menor caminho possível dentre as variadas possibilidades dadas em uma matriz multidimensional.

# Instalação

A forma recomendada para obter uma cópia de trabalho do projeto é clonar o Branch [Logic-frontend](https://github.com/RempelOliveira/D3-BackendChallenge/tree/Logic-frontend), entrar no Branch e usar `npm` para instalar as dependências usando o comando `npm install`.

# Configuração

É necessário gerar um arquivo `.env` no diretório raiz para armazenar o endereço da API necessária para o funcionamento desta aplicação.

Ex:

```
REACT_APP_API_URI = http://localhost/D3/Github/Logic/backend/index.php
```

# Utilização

Uma vez que todas as dependências estejam devidamente instaladas e configuradas, basta rodar o comando `npm start` para rodar a aplicação em modo de desenvolvimento. Se preferir gerar uma versão para produção, siga as instruções no console após rodar o comando `npm run build`.

É necessário que a API esteja devidamente instalada para que esta aplicação funcione corretamente, caso ainda não o tenha feito, siga as instruções através deste link: [Logic-backend](https://github.com/RempelOliveira/D3-BackendChallenge/tree/Logic-backend).

Como exemplo, para os dados de entrada no formulário do frontend, é desejável a utilização de duas matrizes distintas, são elas:

Matriz 2d

```
[[1,1,1,1],[0,1,1,0],[0,1,0,1],[0,1,9,1],[1,1,1,1]]
```

Origem
```
[0,0]
```

** O destino sempre será o número 9 na Matriz 2d.

# Demo

Esta aplicação foi hospedada em uma Cloud Plataform, "*Platform as a Service*" **Heroku** e encontra-se disponível em produção através do seguinte link: [Logic App](https://d3-logic-frontend.herokuapp.com).

** Devido ao **Heroku** manter a aplicação em suspensão, o primeiro acesso pode apresentar demora na resposta do servidor.

[D3 - Logic Challenge](https://github.com/d3estudio/backend-challenge/blob/master/LOGIC.md)