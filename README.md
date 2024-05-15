# RMS Order Microservice

## Executar via kubernetes
1. O arquivo .env é ignorado na execuçao do K8. O build do dockerfile não copia o mesmo para a imagem, então a leitura de váriaveis vem dos configmap do k8. Atençao especial ao valor de `DB_HOST` que deve ser o mesmo usado na configuraçao do nome do serviço de banco de dados nos yaml. Caso vc não altere, o valor é `svc-db-order`, e deve funcionar sem nenhuma alteração.
2. Execute o comando `docker build -t esantiagovieira\rms-api-order:latest .` para buildar a imagem localmente. Se vc não a executar localmente a mesma será baixada do Hub.
3. Navegue até o diretório ./k8/dev e execute o comando `kubectl apply -f .`
4. A aplicaçao deverá ficar disponível após alguns segundos em `http://localhost:30000/docs`