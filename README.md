# proxySoapServer

Modernize seu servidor SOAP legado usando o Amazon API Gateway e o AWS Lambd

# No terminal do Cloud9, altere o diretório para ./src e execute o seguinte comando para instalar as bibliotecas externas:

cd src && npm install

# Construindo o serviço

cd .. && sam build

# Emulando localmente Amazon API Gateway

sam local start-api

# Testando a API local

curl -i -X POST localhost:3000/ -H "Content-Type: application/json" -d '{"data": "40325465"}'

# Deploy

Para a execução: sam local start-api

# E executa

sam deploy -g
