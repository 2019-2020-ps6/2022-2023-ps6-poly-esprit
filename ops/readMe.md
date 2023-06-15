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
# Partie I : Dockériser le Front et le Back 
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
## Partie II : Orchestrer le front et le back ! 
