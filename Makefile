docker_name = --name node-tests
docker_port = -p 4200:4200
docker_network = --network nodejs-unit-tests_default
docker_command = -it node-ts /bin/bash -c
docker_env = --env APP_PORT=4200 --env DB_HOST=192.168.160.2 --env DB_NAME=car_dealer --env DB_PASSWD=passwd --env DB_PORT=3306 --env DB_USER=car_dealer
docker_node = docker run ${docker_port} --rm ${docker_name} ${docker_env} ${docker_network} -v ${PWD}:/app -w="/app" ${docker_command}

build:
	docker build -t node-ts .

npm:
	$(docker_node) "npm $(arg)"

npm-install:
	$(docker_node) "npm install $(pkg)"

npm-run:
	$(docker_node) "npm run $(script)"

tsc:
	$(docker_node) "tsc $(arg)"

migration-generate:
	$(docker_node) "npm run migration:generate ./src/migrations/$(file)"

migration-run:
	$(docker_node) "npm run migration:run"