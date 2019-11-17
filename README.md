# D3, Logic Challenge - Backend

Aplicação [Caminho Mínimo](https://pt.wikipedia.org/wiki/Problema_do_caminho_m%C3%ADnimo) desenvolvida em [PHP 7.1.3](https://php.net/), focada na exibição do menor caminho possível dentre as variadas possibilidades dadas em uma matriz multidimensional.

# Instalação

A forma recomendada para obter uma cópia de trabalho do projeto é clonar o Branch [Logic-backend](https://github.com/RempelOliveira/D3-BackendChallenge/tree/Logic-backend), e disponibilizar o serviço através de um servidor web, tal como o [Apache](https://www.apache.org/).

# Configuração

É necessário gerar um arquivo `.env` no diretório raiz para armazenar o endereço do frontend necessário para o funcionamento desta aplicação.

Ex:

```
REACT_APP_URI = http://localhost:3001
```

Por se tratar de um serviço, é necessário configurar o frontend vinculado a esta aplicação. Caso ainda não o tenha instalado e configurado, siga as instruções neste link: [Logic-frontend](https://github.com/RempelOliveira/D3-BackendChallenge/tree/Logic-frontend).

# Utilização

Uma vez que todas as dependências estejam devidamente instaladas e configuradas, basta acessar o frontend. Caso o acesso direto a API seja realizado, ocorrerá redirecionado ao frontend.

# Demo

Esta aplicação foi hospedada em uma Cloud Plataform, "*Platform as a Service*" **Heroku** e encontra-se disponível em produção através do seguinte link: [Logic App](https://d3-logic-backend.herokuapp.com).

** Devido ao **Heroku** manter a aplicação em suspensão, o primeiro acesso pode apresentar demora na resposta do servidor.

[D3 - Logic Challenge](https://github.com/d3estudio/backend-challenge/blob/master/LOGIC.md)