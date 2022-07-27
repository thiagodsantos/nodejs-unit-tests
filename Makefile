docker_node = docker run -p 4200:4200 --rm --name node-tests -v ${PWD}:/app -w="/app" -it node-ts /bin/bash -c

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
	$(docker_node) "npm run migration:generate ./migrations/$(file)"