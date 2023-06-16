# Rapport sur la partie DevOps - PS6 : 
Membres de l'équipes responsables de la partie DevOps : 
- Quentin MAUROIS
- Simon BEUREL 
## Introduction : 
Au cours du projet PS6 réalisé dans le cadre de la formation Ingénieur en Informatique à Polytech Nice-Sophia, nous avons dû réaliser un site internet adapté, pour permettre à des personnes âgées et atteintes d'une pathologie particulière de jouer à des quiz.  
Notre groupe a décidé de traiter la maladie de Parkinson. 

Avant la semaine à plein temps, nous devions utiliser 3 commandes terminales sur notre site web : 
- Pour lancer le backend, nous devions exécuter : 
 ```bash
 npm run start:e2e
 ```
 - Pour lancer le frontend, nous devions exécuter : 
 ```bash
 npm run start
 ```
 - Pour lancer les différents tests, nous devions exécuter cette commande après les deux précédentes :
 ```bash
 npm run test:e2e
 ```
 
 Le site utilisant différents modules et différentes bibliothèques non standard, il faut trouver une solution pour que le site soit déployable sur une machine sans avoir à gérer leur import.
 Cela a pour but de déployer notre solution sur des machines en centre de santé, sans que le personnel n'ait besoin d'une quelconque qualification technique.
 Pour résoudre ce problème, nous avons implémenté des conteneur Docker qui permettront de gérer tout cela de manière totalement transparente pour le client.
 ![enter image description here](https://lumao.eu/images/partners/docker.svg)
# Partie I : Dockériser le Front et le Back (Done)
La première partie de cette période DevOps a été consacrée à la dockerisation des parties Frontend et Backend. Le résultat attendu est donc deux Dockerfiles avec lesquels nous créerons des images puis instancierons des containeurs pour que notre application web tourne correctement en local. 

Le premier Dockerfile que nous avons créé est celui qui s'occupe de la partie Backend du site, nous l'avons réalisé en suivant les étapes suivantes dans son Dockerfile : 
- On importe l'image de base node:16.16.0-alpine . Cette image est une image stable et connue avec une bonne documentation, de plus elle contient les commandes npm.
- On installe la commande *curl* (commande importante pour regarder le healthcheck).
- Après avoir spécifié le workdir et l'utilisateur, on copie les fichiers depuis le Backend vers l'image que nous voulons créer
- On installe les dépendances avec un `RUN npm install`
- On appelle en ENTRYPOINT la commande `npm run start`, qui exécute `node app/index.js` (d'après le *package.json*)

Il est important de noter que comme nous installons tous les fichiers et dossiers présents dans la partie Backend, quand nous lancerons le serveur backend celui-ci contiendra toutes les données présentes dans la BDD. Nous pourrons également spécifier différents lancement avec la commande `npm run start` comme par exemple `npm run start:e2e` pour lancer le backend en mode "test".

Le deuxième Dockerfile que nous avons créé est celui qui s'occupe de la partie Frontend du site. nous l'avons réalisé en suivant les étapes suivantes : 
- On part également de l'image node:16.16.0-alpine  pour les mêmes raisons.
- On spécifie 3 arguments ENVIRONMENT, TESTURL, DOMAIN.
- Après avoir spécifié le workdir, on copie les fichiers depuis le Frontend vers notre image docker. 
- (Partie que nous verrons lors de la partie 2 : installation de sed et son utilisation).
- On utilise un fichier *default.conf* que l'on va modifier.
- On installe les dépendances avec un `RUN npm install`.
- On lance un build, en spécifiant le "mode" dans lequel le build sera lancé. On peut choisir build:production, build:e2e etc....
- On importe une nouvelle image qui est une image nginx, utile pour déployer un serveur web.
- Dans cette nouvelle image, nous copions le résultat de la commande build dans le dossier html de nginx. Ensuite on copie le fichier *default.conf* pour remplacer celui présent par défaut dans la configuration de nginx. 

Le *default.conf* remplaçant la configuration par défaut nous a été fourni par Mr Bounouas. Le voici : 
```conf
server {  
    listen       80;  
    listen  [::]:80;  
    server_name  <DOMAIN>;  
  
    index index.html;  
    location / {  
        root   /usr/share/nginx/html;  
        try_files $uri$args $uri$args/ /index.html;  
    }  
  
}
```
(On peut notamment noter que l'on pourra spécifier le contenu de DOMAIN grâce à la commande sed, celle-ci étant *localhost* par défaut. 

Une fois que ces deux fichiers ont été créé, nous pouvons construire les images : 
```bash
INTEGRER COMMMANDE POUR BUILD LES DEUX IMAGES
```
Une fois les deux images créées, nous pouvons lancer les conteneurs avec : 
```bash
docker run -p 9428:9428 back-poly-esprit:e1 
docker run -p 8080:8080 front-poly-esprit:e1
```
<INTEGRER IMAGE CAPTURE D'ECRAN>
Après avoir lancé les conteneurs et vérifié que les comportements sont ceux attendus, nous pouvons rendre cette exécution plus "simple" grâce à Docker Compose.


## Partie II : Orchestrer le front et le back ! (Done)
Dans la seconde partie du DevOps, nous allons simplifier le déploiement des conteneurs docker que nous avons créé jusque là en utilisant docker compose. C'est un moyen de décrire et gérer des applications multi-conteneurs avec Docker. Nous allons donc nous en servir pour lancer le back et le front avec une seule commande. Nous avons créé un fichier *docker-compose.yml* dans le répertoire *ops*.
**Docker compose** permet de lancer plusieurs conteneurs et de les build avec des paramètres spécifiés dedans. Ainsi, le *docker-compose.yml* spécifie pour chaque conteneur : 
- le nom de l'image,
- le contexte de build,
- l'utilisateur de l'image,
- le mappage des ports,
- les dépendances : de quel(s) conteneurs ce conteneur a-t-il besoins pour se lancer ?
- le healthcheck,
- les volumes éventuels utilisés.

Le back est monté avec un volume pour permettre de sauvegarder les données sur la machine. Dans cette partie, le front et le back sont toujours port forwarded sur les ports de la machine. Nous avons donc toujours le front et le back qui discutent entre eux via le réseau de la machine hôte et les conteneurs sont donc toujours accessibles par l'extérieur.

Voici le code de notre Docker compose : 
```Docker
version: '3'  
services:  
  front:  
    image: front-poly-esprit:e1  
    build:  
      context: ../front-end  
      dockerfile: ../front-end/Dockerfile  
      args:  
        ENVIRONMENT: production  
    user: nginx  
    ports:  
      - 8080:80  
    depends_on:  
      back:  
        condition: service_healthy  
    healthcheck:  
      test: ["CMD-SHELL", "curl -f http://localhost:80/ || exit 1"]  
      interval: 10s  
      timeout: 10s  
      retries: 5  
  back:  
    image: back-poly-esprit:e1  
    build:  
      context: ../backend  
      dockerfile: ../backend/Dockerfile  
    user: node  
    ports:  
      - 9428:9428  
    volumes:  
      - back-storage:/home/node/database  
    healthcheck:  
      test: [ "CMD-SHELL", "curl -f http://localhost:9428/api/status || exit 1" ]  
      interval: 10s  
      timeout: 10s  
      start_period: 5s  
      retries: 5  
volumes:  
  back-storage:
  ```

## Partie III : Dockeriser l'exécution des tests ! (Done)
Grâce aux deux dernières parties, nous avons pu observer plus en profondeur la notion de Dockerfile et nous avons également pu découvrir le fonctionnement de *Dockercompose* qui permet de gérer plusieurs Dockerfile différents.
Dans cette partie nous allons devoir dockeriser l'implémentation des différents tests que nous avons réalisé durant la première partie de la semaine à plein temps.
Ces tests ont été implémenté grâce à la bibliothèque Playwright, il faut donc que l'on soit capable de lancer ces tests grâce à un Docker compose. Il faut également gérer de passer une base de données pré-définie pour réaliser ces différents tests.
Nous avons donc créé 3 fichiers Dockerfile, un premier pour gérer le front, un second pour gérer le back et un dernier pour gérer l'exécution des tests.

Voici la composition du fichier Dockerfile qui s'occupe du backend :
- Pour ce fichier, on reprend exactement le Dockerfile que l'on a créé dans les parties 1 et 2, en modifiant la commande entrypoin. Cela permet de lancer la commande *ENTRYPOINT ["npm", "run", "start:e2e"]* pour lancer le backend en version "test", en prenant les données contenues dans le dossier e2e-starter. Ces données sont présentes pour gérer les tests.

Pour le Dockerfile du front de notre site, nous avons repris exactement le même fichier Dockerfile que nous avons créé dans les parties 1 et 2. Nous avons simplement eu besoin de rajouter ces lignes :
```Dockerfile
RUN apk add sed  
RUN sed -i "s/<TESTURL>/${TESTURL}/g" /usr/local/app/src/environments/environment.e2e.ts  
RUN cat /usr/local/app/src/environments/environment.e2e.ts
```
Ces lignes de codes sont importantes car elles permettent de spécifier l'adresse du back dans les arguments lors de notre compose. Cette adresse sera utilisée par le front pour se connecter au back. Dans notre cas cela sera http://back:9428, on peut directement spécifier "back" car ils seront présents dans le même réseau grâce au Docker compose donc il y'a un système de DNS.

Maintenant, intéressons-nous au Dockerfile-e2e que nous avons créé : 
- On part de l'image de Microsoft permettant d'utiliser Playwright correctement. Cette image est : mcr.microsoft.com/playwright:v1.35.0-jammy.
- On spécifie que l'on veut utiliser pwuser comme utilisateur (spécifié dans la documentation de l'image).
- On copie les fichiers présents dans le front-end, et on copie la configuration de playwright 
- On construit deux dossiers "test-results" et "playwright-report", qui nous permettent de stocker les résultats des tests.
- On exécute la commande `npm install` pour installer les dépendances nécessaires.
- On exécute la commande en ENTRYPOINT : `npx playwright test --config playwright.config.ts`

Grâce à ce docker, les tests seront joués automatiquement à l'exécution, cependant (nous allons le voir tout de suite) il est nécessaire que les Dockers correspondants au frontend au backend soient activés et déjà prêts.
Maintenant, intéressons nous à notre fichier Docker-compose-e2e pour voir comment ce dernier orchestre l'organisation des différentes images : 
```Docker
version: '3'  
services:  
  front:  
    image: front-poly-esprit:e1  
    build:  
      context: ../front-end  
      dockerfile: ../front-end/Dockerfile  
      args:  
        TESTURL: "http:\\/\\/back:9428"  
  ENVIRONMENT: e2e  
    user: nginx  
    ports:  
      - 8080:80  
    depends_on:  
      back:  
        condition: service_healthy  
    healthcheck:  
      test: ["CMD-SHELL", "curl -f http://localhost:80/ || exit 1"]  
      interval: 10s  
      timeout: 10s  
      retries: 5  
  back:  
    image: back-poly-esprit:e1  
    build:  
      context: ../backend  
      dockerfile: ../backend/Dockerfile-e2e  
    user: node  
    ports:  
      - 9428:9428  
    healthcheck:  
      test: [ "CMD-SHELL", "curl -f http://localhost:9428/api/status || exit 1" ]  
      interval: 10s  
      timeout: 10s  
      start_period: 5s  
      retries: 5  
  tests:  
    image: tests-poly-esprit:e3  
    build:  
      context: ../front-end  
      dockerfile: ../front-end/Dockerfile-e2e  
    user: pwuser  
    ports:  
      - 45625:45625  
      - 9323:9323  
    depends_on:  
      front:  
        condition: service_healthy  
    volumes:  
      - test-results:/usr/local/app/test-results  
      - playwright-report:/usr/local/app/playwright-report  
volumes:  
  test-results:  
  playwright-report:
  ```
Quand on regarde la partie front, on remarque qu'on devra lui fournir 2 arguments, *TESTURL* et *ENVIRONMENT*. 
L'argument TESTURL spécifie l'adresse url du backend, et l'argument ENVIRONMENT spécifie dans quel environnement l'application web sera construite. L'environnement est important car en fonction de celui-ci, des variables risquent de changer. C'est pour cela que dans le Dockerfile du front on fait une commande sed (pour changer potentiellement un placeholder du fichier d'environnement).
On fait ensuite une redirection des ports 8080:80, depuis le port 80 du conteneur sur le port 8080 de notre machine. On spécifie également que le service front doit attendre que le back soit "healthy" pour se lancer (ie. On attend que le back est opérationnel pour lancer le front).  
Pour vérifier l'état de notre front (le **healthcheck**), on exécute une commande curl sur l'adresse http://localhost:80/ pour récupérer l'état du front. Si on récupère un résultat, on obtiendra la valeur 0, sinon on obtiendra la valeur 1).

Intéressons-nous maintenant à la partie du service back.  Après avoir spécifié le contexte, le dockerfile etc.. on exécute une redirection de ports 9428:9428. Cette redirection nous permet de regarder potentiellement l'état du backend depuis notre propre machine. Comme nous l'avons décrit précédemment, il faut que le back soit en vie pour que le front démarre. Pour faire le **healthcheck** du back, on exécute une commande curl sur l'adresse "http://localhost:9428/api/status", pour récupérer une valeur 0 ou 1 de manière analogue au front décrit ci-dessus. 

Pour finir sur cette partie, nous nous intéressons au service tests. Pour construire ce conteneur, nous devons établir une redirection de 2 ports : 45625:45625 et 9323:9323. La redirection du port 9323 nous permet d'avoir accès au rapport de résultats sur notre propre machine. Cela nous évite d'avoir à rentrer directement dans le conteneur pour ouvrir le rapport ou voir les screenshots.
On déclare 2 volumes : *test-results* et *playwright-report*. Ces deux volumes nous permettent de stocker les résultats des tests une fois la commande d'exécution lancée. On spécifie que le service *tests* ne doit démarrer que quand le front est healthy. On a donc en ordre de lancement : 
backend -> frontend -> tests

## Partie IV : Proxifier l'ensemble des appels (En cours)
Le but de cette partie finale est de reprendre la partie 2 et d'intégrer un nouveau conteneur pour pouvoir accéder au site internet depuis notre machine via un lien prédéfini et non via le localhost.

## Partie V : Conclusion 
Lors des 3 jours consacrés à la partie DevOps de notre semaine à plein temps sur le projet PS6, nous avons réussi à réaliser les 3 premières parties et nous avons bien entamés la dernière partie sur la "proxification" de l'ensemble des appels. 
Comment fonctionne notre healthcheck ? 
	- Pour le frontend : Commande *curl -f http://localhost:80 || exit 1* avec une start_period de 5 secondes, un interval de 10 secondes, un timeout de 10 secondes et 5 essais.
	- Pour le backend : Commande *curl -f http://localhost:9428/api/status || exit 1* avec une start_period de 5 secondes, un interval de 10 secondes, un timeout de 10 secondes et 5 essais
Dans ce dossier OPS, en plus de ce document et des différents fichiers compose, vous trouverez 2 scripts bash : 
- run.sh : Script permettant de build et de lancer le Docker-compose.yml 
- run-e2e.sh : Script permettant de build et de lancer le Docker-compose-e2e.yml
