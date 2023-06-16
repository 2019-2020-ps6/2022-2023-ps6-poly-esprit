#!/bin/bash

echo '[+] Lancement du build...\n'
docker-compose -f docker-compose-e2e.yml build
echo '[+] Build fini....Lancement du up \n'
docker-compose -f docker-compose-e2e.yml up
