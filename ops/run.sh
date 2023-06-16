#!/bin/bash

echo '[+] Lancement du build...\n'
docker-compose -f  docker-compose.yml build
echo '[+] Fin du build, lancement du up \n'
docker-compose -f docker-compose.yml up
