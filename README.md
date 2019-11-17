# D3, WebCrawler Challange - Frontend

Aplicação [WebCrawler](https://en.wikipedia.org/wiki/Web_crawler)  desenvolvida em [React](https://reactjs.org/), focada no rastreamento de todas urls que fazem parte de um determinado domínio. Conta também com a captação dos assets disponíveis em cada uma das urls rastreadas.

# Instalação

A forma recomendada para obter uma cópia de trabalho do projeto é clonar o Branch [WebCrawler-frontend](https://github.com/RempelOliveira/D3-BackendChallenge/tree/WebCrawler-frontend), entrar no Branch e usar `npm` para instalar as dependências usando o comando `npm install`.

# Configuração

É necessário um arquivo `.env` para armazenar o endereço da API necessária para o funcionamento desta aplicação.

Ex:

```
REACT_APP_API_URI = http://localhost/D3/Github/WebCrawler/backend/index.php
```

# Utilização

Uma vez que todas as dependências estejam devidamente instaladas e configuradas, basta rodar o comando `npm start` para rodar a aplicação em modo de desenvolvimento. Se preferir gerar uma versão para produção, siga as instruções no console após rodar o comando `npm run build`.

É necessário que a API esteja devidamente instalada para que esta aplicação funcione corretamente, caso ainda não tenha feito, siga as instruções através deste link: [WebCrawler-backend](https://github.com/RempelOliveira/D3-BackendChallenge/tree/WebCrawler-backend).

# Demo

Esta aplicação foi hospedada em uma Cloud Plataform, "*Platform as a Service*" **Heroku** e encontra-se disponível em produção através do seguinte link: [WebCrawler App](https://d3-webcrawler-frontend.herokuapp.com).