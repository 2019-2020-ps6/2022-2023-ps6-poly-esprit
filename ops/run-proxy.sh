#!/bin/bash

echo '[+] Lancement du build...\n'
docker compose -f docker-compose-proxy.yml build
echo '[+] Build fini....Lancement du up \n'
docker compose -f docker-compose-proxy.yml up
