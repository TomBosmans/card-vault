include .env

start:
	@docker compose start $(service)

stop:
	@docker compose stop $(service)

restart:
	@docker compose restart $(service)

up:
	@docker compose up -d

log:
	@docker compose logs -f --tail 10000 $(service)

build:
	@docker compose build

shell:
	@docker compose run --rm --no-deps $(service) sh

open:
	open http://localhost:$($(shell echo ${service}_PORT | tr '[:lower:]' '[:upper:]'))

use-githooks:
	git config core.hooksPath .githooks

remove-githooks:
	git config --unset core.hooksPath

changelog:
	npx conventional-changelog-cli -p conventionalcommits -i docs/CHANGELOG.md -s -r 0

psql:
	@docker compose exec postgres sh -c "su - postgres -c 'psql $(POSTGRES_DATABASE)'"
