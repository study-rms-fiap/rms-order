# RMS Order Microservice

## Executar via kubernetes
1. Crie um arquivo .env na raiz do projeto e preencha os valores a serem utilizados. Atençao especial ao valor de `DB_HOST` que deve ser o mesmo usado na configuraçao do nome do serviço de banco de dados nos yaml. Caso vc não altere, o valor `svc-db-order`
1. Execute o comando `docker build -t rms-api-order:latest .` para buildar a imagem localmente. 
2. Navegue até o diretório ./k8/dev e execute o comando kubectl apply -f .