#!/bin/bash

echo '[+] Lancement du build...'
docker compose -f docker-compose-e2e.yml build
echo '[+] Fin du build, compose up'
docker compose -f docker-compose-e2e.yml up --abort-on-container-exit
