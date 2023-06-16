# Rapport sur la partie DevOps - PS6 : 
Membres de l'équipes responsables de la partie DevOps : 
- Quentin MAUROIS
- Simon BEUREL 
## Introduction : 
Au cours du projet PS6, nous avons du réaliser un site internet permettant de pouvoir jouer à des quizs. Le but du site est que ce site doit être adapté pour des personnes atteintes de la maladie de Parkinson, mais également pour des membres du personnel de santé qui auront pour but de gérer les patients, quizs, etc.... Bien évidemment, le site devait contenir des tests, nous avons donc décidé d'implémenter des tests grâce à la bibliothèque Playwright qui est une bibliothèque qui nous permet de pouvoir "simuler" l'interface de notre site internet et également de "simuler" des actions sur cette interface
Avant la semaine à plein temps, nous devions utiliser 3 commandes terminales sur notre site web : 
- Pour lancer le backend, nous devions exécuter : 
 ```bash
 npm run start:e2e
 ```
 - Pour lancer le frontend, nous devions exécuter : 
 ```bash
 npm run start
 ```
 - Pour lancer les différents tests, nous devions exécuter cette commande après avoir exécuter les deux précédentes :
 ```bash
 npm run test:e2e
 ```
 La problématique qui se pose face à nous est que pour que le site fonctionne, il faut que l'utilisateur possède de nombreuses librairies, différents modules node.js etc.. ce qui est donc très contraignant notamment pour les différents centre de santé qui ne sont pas des spécialistes et qui ne souhaitent forcément pas installer un par un toutes les dépendances. Pour résoudre ce problème, nous avons implémenter des conteneur Docker qui permettront au personnel de santé de prendre directement en charge l'installation des librairies, des modules et également de lancer directement l'application web. 
 ![enter image description here](https://lumao.eu/images/partners/docker.svg)
# Partie I : Dockériser le Front et le Back (Done)
La première partie de cette période DevOps aura été consacrée à la dockerisation de la partie Frontend et également de la partie Backend. Le résultat attendu est donc deux Dockerfile avec lesquels nous créerons des images puis instancierons des containeurs pour que notre application web tourne correctement sur notre localhost. 

Le premier Dockerfile que nous avons crée est celui qui s'occupe de la partie Backend du site, nous l'avons réalisé en suivant les étapes suivantes dans son Dockerfile : 
- On importe l'image de base node:16.16.0-alpine . Cette image est une image stable et connue avec une bonne documentation, de plus elle contient la possibilité de pouvoir directement réaliser des commandes npm
- On va installer la commande *curl* (commande importante pour pouvoir regarder le healthcheck)
- Après avoir spécifié le workdir et l'utilisateur, on va copier les fichiers présents dans notre partie Backend dans l'image que nous voulons créer
- On va installer les dépendances avec un *RUN npm install*
- On appelle en ENTRYPOINT la commande *npm run start*, qui est une commande qui selon le package.json va exécuter : *node app/index.js*

Ce qui est important de noter dans ce fichier Dockerfile est que comme nous installons tous les fichiers et dossiers présents dans la partie Backend, quand nous lancerons le serveur backend celui-ci contiendra toutes les données présentes dans la BDD, et nous pourrons également spécifier différents lancement avec la commande *npm run start* comme par exemple *npm run start:e2e* pour lancer le backend en mode "test"

Le deuxième Dockerfile que nous avons crée est donc celui qui s'occupe de la partie Frontend du site, nous l'avons réalisé en suivant les étapes suivantes dans son Dockerfile : 
- On va partir également de l'image node:16.16.0-alpine  
- On va spécifier 3 arguments ENVIRONMENT, TESTURL, DOMAIN
- Après avoir spécifier le workdir, on va copier les fichiers présents dans la partie Frontend dans notre image docker 
- (Partie que nous verrons lors de la partie 2 : installation de sed et son utilisation)
- On va utiliser un fichier default.conf que l'on va modifier
- On va installer les dépendances avec un *RUN npm install*
- On va lancer un build, cependant nous allons spécifier le "mode" dans lequel le build sera lancé. Par exemple, si on lance un build:production, build:e2e etc....
- Ensuite, nous allons importer une nouvelle image qui est une image nginx. Nginx va être très utile pour déployer un serveur web
- Une fois présent dans cette nouvelle image, nous allons copier le résultat de la commande build dans le dossier html de nginx, puis nous allons également copier le fichier default.conf pour remplacer celui présent par défaut dans la configuration de nginx. 

Ce qui est important dans ce fichier est notamment le fichier default.conf qui nous a été fournis par Mr Bounouas que voilà : 
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
(On peut notamment noter que l'on pourra spécifier grâce à la commande sed le contenu de DOMAIN, et que par défaut cela est localhost. 

Une fois que ces deux fichiers ont été crées nous pouvons construire les images grâce à ces commandes : 
```bash
INTEGRER COMMMANDE POUR BUILD LES DEUX IMAGES
```
Une fois les deux images crées, nous pouvons lancer les conteneurs avec : 
```bash
docker run -p 9428:9428 back-poly-esprit:e1 
docker run -p 8080:8080 front-poly-esprit:e1
```
INTEGRER IMAGE CAPTURE D'ECRAN
Maintenant que nous arrivons à lancer ces deux conteneurs et que l'on vérifie que le comportement réalisé est bien celui attendu, nous pouvons donc encore rendre cette exécution plus "simple" grâce à Docker Compose 
## Partie II : Orchestrer le front et le back ! (Done)
Dans la seconde partie du développement DevOps, nous allons simplifier le déploiement des conteneurs docker que nous avons créé jusque là en utilisant docker compose. C'est un moyen de décrire et gérer des applications multi-conteneurs avec Docker. Nous allons donc nous en servir pour lancer le back et le front avec une seule commande. Nous avons créé un fichier docker-compose.yml dans le répertoire ops.
Docker compose permet de lancer plusieurs conteneurs et de les build avec des paramètres spécifiés dans le docker compose. Ainsi, le docker-compose.yml spécifie pour chaque conteneur : 
- le nom de l'image 
- le contexte de build 
-  l'utilisateur utilisé dans l'image 
-  le mappage des ports 
- les dépendances : de quel(s) conteneurs ce conteneur a-t-il besoins pour se lancer 
- le healthcheck 
- les volumes éventuels utilisés 

Le back est monté avec un volume pour permettre de sauvegarder les données sur la machine. Dans cette partie, le front et le back sont toujours port forwarded sur les ports de la machine. Nous avons donc toujours le front et le back qui discutent entre eux via le réseau de la machine hôte et les conteneurs sont donc toujours accessibles par l'extérieur

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
Grâce aux deux dernières parties, nous avons pu observer plus en profondeur la notion de Dockerfile et nous avons également pu découvrir le fonctionnement de Dockercompose qui nous permet donc de pouvoir gérer plusieurs Dockerfile différents.
Maintenant, dans cette partie III, nous allons devoir dockeriser l'implémentation des différents tests que nous avons réalisés durant la première partie de la semaine à plein temps. Ces tests ont été implémentés grâce à la bibliothèque Playwright, il faut donc que l'on soit capables de pouvoir lancer ces tests grâce à un Docker compose tout en sachant que nous passons directement une base de données pré-définie pour pouvoir réaliser les différents tests
Nous avons donc créer 3 fichiers Dockerfile, un fichier Dockerfile pour gérer le front, un fichier Dockerfile pour gérer le back et un fichier Dockerfile pour gérer l'exécution des tests.

Voici la composition du fichier Dockerfile qui s'occupe du backend :
- Pour ce fichier, on reprend exactement le Dockerfile que l'on a créer dans la partie 1&2 seulement la commande entrypoint est différente, pour lancer une la commande *ENTRYPOINT ["npm", "run", "start:e2e"]* pour lancer le backend en version "test" en prenant les données contenues dans le dossier e2e-starter (données présentes pour gérer les tests)

Pour le premier fichier Dockerfile présent dans la partie front de notre site, nous avons repris exactement le même fichier Dockerfile que nous avons crée dans la partie 1&2. Nous n'avons pas eu besoin de modifier ce fichier car son comportement ne change pas. Cependant, dans ce Dockerfile nous avons rajouté ces lignes importantes :
```Dockerfile
RUN apk add sed  
RUN sed -i "s/<TESTURL>/${TESTURL}/g" /usr/local/app/src/environments/environment.e2e.ts  
RUN cat /usr/local/app/src/environments/environment.e2e.ts
```
Ces lignes de codes seront importantes car elles permettront de pouvoir spécifier dans les arguments lors de notre compose l'adresse du back sur laquelle notre front doit aller chercher les informations. Dans notre cas cela sera http://back:9428, on peut directement spécifier "back" car ils seront présents dans le même réseau grâce au Docker compose donc il y'a un système de DNS

Maintenant, intéressons nous au Dockerfile-e2e que nous avons créer : 
- On va partir de l'image de Microsoft permettant de pouvoir utiliser Playwright correctement, cette image est : mcr.microsoft.com/playwright:v1.35.0-jammy 
- On va spécifier que l'on va utiliser comme utilisateur pwuser (spécifié dans la documentation de l'image)
- On va copier les fichiers présents dans le front-end, et l'on va également copier la configuration souhaitée de playwright 
- On va construire deux dossiers "test-results" et "playwright-report" qui vont nous permettre de stocker les résultats des tests 
- On run la commande *npm install* pour pouvoir installer les dépendances nécessaires 
- On exécute la commande en ENTRYPOINT : *npx playwright test --config playwright.config.ts*

Grâce à ce docker, cela va directement lancer les tests playwright quand on va lancer notre Docker, cependant (nous allons le voir tout de suite) il est important de s'assurer que le Docker correspondant au frontend et le Docker correspondant à notre backend soient activés et déjà prêts.
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
Quand on regarde la partie front, on remarque que on va lui fournir 2 arguments, TESTURL et ENVIRONMENT : l'argument TESTURL spécifie l'adresse url du backend, et l'argument ENVIRONMENT spécifié dans quel environnement on va devoir build l'application web, l'environnement des importants car en fonction de l'environnement, on va spécifier que des variables vont changer, c'est pour cela par exemple que dans le Dockerfile du front on fait une commande sed (pour changer potentiellement un placeholder du fichier d'environnement). Ensuite, on va faire une redirection des ports 8080:80 pour rediriger le port 80 du conteneur sur le port 8080 de notre machine. On va également spécifier que le service front va devoir attendre que le back est "healthy" pour pouvoir lancer le front (ie. On attend que le back est opérationnel pour lancer le front)
Pour vérifier l'état de notre front (le **healthcheck**), on va réaliser une commande curl sur l'adresse http://localhost:80/ pour pouvoir récupérer l'état du front, si on récupère un résultat, alors on obtiendra la valeur 0, sinon on obtiendra la valeur 1).

Maintenant, intéressons nous à la partie du service back.  Pour cette partie, après avoir spécifié le contexte le dockerfile etc.. on va exécuter une redirection de ports de 9428:9428, cette redirection va nous permettre de pouvoir potentiellement regarder l'état du backend depuis notre propre machine. Comme nous l'avons décrit précédemment, il faut que le back soit en vie pour que le front démarre, ainsi, pour faire le **healthcheck** du back, on va exécuter une commande curl sur l'adresse "http://localhost:9428/api/status", ce qui va comme pour notre front nous renvoyer une valeur 0 ou 1 en fonction de la vie du back. 

Pour finir sur cette partie, nous allons nous intéresser sur le service tests. Pour construire ce conteneur, nous allons devoir établir une redirection de 2 ports : 45625:45625 et également 9323:9323. La redirection du port 9323 va nous permettre de pouvoir avoir accès au rapport de résultats sur notre propre machine et donc ne pas à avoir rentrer directement dans le conteneur pour ouvrir le rapport ou voir les screenshots etc...
On va également déclarer 2 volumes : test-results et playwright-report. Ces deux volumes vont nous permettre de pouvoir stocker les résultats des tests une fois la commande d'exécution lancée. Il est également important de noter que l'on spécifie que le service *tests* ne doit démarrer que quand le front est healthy. On a donc en ordre de lancement : 
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
