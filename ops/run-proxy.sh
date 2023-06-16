#!/bin/bash

echo '[+] Lancement du build...'
docker compose -f docker-compose-proxy.yml build
echo '[+] Fin du build, compose up'
docker compose -f docker-compose-proxy.yml up
