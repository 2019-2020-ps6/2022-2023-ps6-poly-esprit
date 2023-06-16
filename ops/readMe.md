# Rapport final projet PS6 : Poly'Esprit 
Membres du groupe : 
- BEUREL Simon 
- MAUROIS Quentin 
- FROMENT Lorenzo 
- DELIAS Théo 
- LARGUIER Tristan

## Préambule : 
Au cours du projet PS6 réalisé dans le cadre de la formation Ingénieur en Informatique à Polytech Nice-Sophia, nous avons dû réaliser un site internet adapté, pour permettre à des personnes âgées et atteintes d'une pathologie particulière de jouer à des quiz.  
Notre groupe a décidé de traiter la maladie de Parkinson.  
Selon l'OMS (Organisation Mondiale de la Santé), la maladie de Parkinson est :  
> une maladie **dégénérative** du cerveau associée à des **symptômes moteurs** (mouvements lents, **tremblements**, rigidité et déséquilibre) et à d'autres complications, notamment des troubles cognitifs, de la santé mentale, du sommeil ainsi que des douleurs et des troubles sensoriels.

Notre site web doit permettre aux différents patients d'un EHPAD, ou d'une maison de santé, de jouer à des quiz.
Pour cela, nous avons implémenté différentes fonctionnalités visant à faciliter l'utilisation du site aux patients atteint de la maladie de Parkinson.
Chaque résident peut avoir son propre compte, créé par le personnel de santé, permettant d'avoir un suivi de différentes statistiques, comme  le *pourcentage de bonnes réponses* ou le *pourcentage de clics ratés*.

## Partie 1 : persona et scénarios réalisés
Pour pouvoir réaliser une conception centrée utilisateur, nous avons dû réaliser différents persona, ainsi que des scénarios d'utilisation du site qui sont associés aux persona en question. 
Les persona sont des représentations fictives d'utilisateurs "type" de notre site internet.
Dans notre cas, nous avons décidé de créer 3 persona différents : 
### Persona n°1 : Patient atteint de la maladie de Parkinson (Stade 1)

| | |
|--|--|
| Nom | Jean-Marc DUPONT |
| Âge | 87 ans|
| Pathologie | Jean-Marc est atteint de la maladie de Parkinson au stade 1. Il ne contrôle pas bien ses mains et a régulièrement des tremblements. Il est très peu précis et ne peut notamment pas utiliser une souris d’ordinateur sur l'immense majorité des sites. |
| Utilisation des technologies | Jean-Marc utilise de temps en temps un ordinateur pour aller sur internet. Il possède également un smartphone offert par son fils, qu’il utilise pour garder contact avec ses enfants et petits enfants. |
| Connaissance des technologies | Bien qu’il utilise les technologies, il ne comprend pas du tout leur fonctionnement. |
| Passions et loisirs | Aujourd’hui, Jean-Marc aime regarder le foot et les infos à la télévision. Il joue également aux échecs de temps en temps. |
| Famille | Jean-Marc a une fille de 52 ans et un fils de 48 ans. Peu après le décès de sa femme, il a été transféré dans un EHPAD à cause de ses problèmes moteurs, qui l'empêchent de conduire ou simplement de se faire à manger. |
| Travail | Dans le passé, Jean-Marc a travaillé à la construction des chemins de fer en France et en Europe. Il a dû arrêter sa carrière plus tôt que prévu à cause des problèmes moteur importants, qui sont apparus au fil du temp. En effet, les gestes peu précis empêchent de travailler correctement et sont même dangereux dans ce milieu. |

### Persona n°2 : Patiente atteinte de la maladie de Parkinson (Stade 4) 

|  |  |
|--|--|
| Nom | Yvette LUCKAS |
| Âge | 73 ans |
|Pathologie | Elle ne sait pas comment fonctionne un ordinateur mais sait les utiliser. Elle a besoin d’aide pour certaines tâches de maintenance. |
| Utilisation des technologies | Dans le temps quand elle n’était pas malade,elle utilisait son téléphone pour appeler son fils, prendre des photos et jouer a des jeux. Yvette a utilisé un ordinateur pour surfer sur internet, lire et envoyer des emails et lire des articles. Cependant, depuis l’aggravation de sa maladie, elle est dans la quasi incapacité de pouvoir faire des tâches complexes sur un ordinateur. |
|Connaissance des technologies | Elle ne sait pas comment fonctionne un ordinateur mais sait les utiliser. Elle a besoin d’aide pour certaines tâches de maintenance. |
| Passions et loisirs | Elle aime beaucoup lire des récits fantastiques et regarder des films d’auteurs. |
| Famille | Yvette a un fils de 49 ans résidant aux États Unis. Lors du départ de son fils à l’étranger il y a 25 ans elle s’est débrouillée seule. Cependant quand les symptomes sont devenus très importants au point de l’handicaper au quotidien- il a été décidé de l’envoyer dans le centre, il y a 5 ans.
| Travail | Dans le passé, elle a travaillé a été psychologue en lycées. Elle a beaucoup aidé les jeunes à rebondir après des épisodes difficiles.


#### Persona n°3 : Psychomotricienne

|  |  |
|--|--|
| Nom | Micheline MARTIN |
| Âge | 45 ans |
| But avec le site | Elle utilise le site pour créer des tests pour ses patients. Elle est également à disposition des résidants pour les aider à l'utiliser. |
| Utilisation des technologies | Bien qu'elle ne soit pas très à l'aise avec la technologie, Micheline utilise un ordinateur pour saisir les informations médicales des résidents et communique avec les médecins et infirmières via l'application de suivi des patients. Elle utilise également un smartphone pour communiquer avec sa famille et ses amis, et pour prendre des photos lors de ses randonnées.
| Connaissance des technologies | Elle utilise les technologies tous les jours mais ne comprends pas vraiment leur fonctionnement réel. Elle arrive toujours à se débrouiller pour faire ce qu’elle veut. |
| Travail | Micheline travaille depuis 10 ans dans le centre pour personnes âgées en tant qu'aide-soignante. Elle s'occupe principalement de la toilette et des repas des résidents, ainsi que de leur bien-être général. Elle apprécie son travail et s'engage à offrir un environnement sûr et confortable aux résidents. |
| Passion et loisirs | En dehors de son travail, Micheline aime faire de la randonnée et passer du temps en famille. Elle aime également essayer de nouvelles recettes de cuisine et s'inscrire à des cours de cuisine. |

---

En résumé, nous avons donc 3 persona représentant chacun un utilisateur "type" de notre site web :
- Un patient avec "peu" de rigidité dans les membres et une utilisation facile d'une souris,
- Un patient atteint par la maladie de Parkinson en stade 4 et donc qui a des difficultés pour bouger la souris,
- Un personnel de santé.

Suite à la définition de nos persona, nous avons implémenté des scénarios qui les mettent en scène dans des cas concrets d'utilisation de notre site web.
Ainsi, grâce à ces scénarios, nous pouvons mieux détecter les différentes tâches propres à tel ou tel persona ; mais également essayer de prioriser les tâches à réaliser en fonction du besoin utilisateur.

Nous avons réalisé au total 5 scénarios.

### Scénario n°1 : Micheline doit créer un nouveau quiz
Micheline veut créer un nouveau quiz pour l’activité de demain. Certains résidents lui ont spécifiquement demandé que le prochain quiz porte sur "les fleurs méditerranéennes de jardin". Elle se connecte rentre le nom de son quiz, avec le thème "Botanique". Elle accède alors à son quiz et ajoute des questions, avec pour chacune une bonne réponse et 3 mauvaises.
**Spécificités mises en avant lors de ce scénario** :
Connexion en tant que personnel de santé, création d'un quiz et de questions.

### Scénario n°2 : Micheline veut ajouter un nouveau résident
Jean-Marc, un nouveau résident, arrive à l'EHPAD. Micheline veut alors l'ajouter sur le site. Pour ce faire, dès sa connexion, elle choisit d’ajouter un utilisateur. Ensuite, elle rentre les informations concernant Jean-Marc comme son nom, prénom, sa pathologie et une photo. Comme Jean-Marc a des problèmes moteurs légers dûs à parkinson elle rentre sa pathologie et ne lui active pas les gros boutons et le gros texte par défaut.
**Spécificités mises en avant lors de ce scénario** :
Connexion en tant que personnel de santé, ajout d'un nouveau patient (identité, pathologie, photo, spécification de différents paramètres...)

### Scénario n°3 : Micheline veut regarder les statistiques de Patrick
Au bout d’un an de pratique et après avoir pris goût au site Poly’Quiz, Micheline souhaite faire le point sur l'évolution des "performances" de Patrick sur le site. Pour cela, elle va d'abord se connecter à son compte, cliquer ensuite sur la gestion des patients, puis cliquer sur le bouton permettant de regarder les différentes statistiques de Patrick comme le pourcentage de clics ratés ou alors le pourcentage de bonnes réponses.
**Spécificités mises en avant lors de ce scénario** :
Affichage des statistiques, moyennes et min-max, clics et réponses.

### Scénario n°4 : Jean-Marc souhaite jouer à un quiz et changer les paramètres
Jean-Marc se connecte pour la première fois, mais il se rend compte qu'il a du mal à cliquer sur les boutons. Il se rend donc sur la page de paramètres pour les modifier. Il augmente ainsi la taille des boutons et la taille du texte présent dans les boutons. Une fois de retour sur le site, il se rend compte des changements. Il remarque également qu'on lui demande pour ce quiz de choisir entre le mode *Duo (2 choix possibles)* et le mode *Carré (4 choix possibles)*.
**Spécificités mises en avant lors de ce scénario** :
Connexion en tant que patient, lancement d'un quiz, modification des paramètres et choix du mode Carré ou Duo

### Scénario 5 : Yvettes (Stade 4 de Parkinson) souhaite réaliser un quiz sur les Acteurs
Lors des vacances de Noël, Yvette reçoit dans sa chambre son petit-fils. Ensemble, ils veulent effectuer un quiz chacun leur tour. Yvette veut faire le quiz sur les Acteurs, son petit-fils l’aide alors à lancer le quiz. Comme Yvette est atteinte du stade 4 de parkinson elle ne voit que 2 choix de réponse possible devant elle.
**Spécificités mises en avant lors de ce scénario** :
Adaptation au stade 4, en ne proposant que 2 réponses.

Ces 4 scénarios reprennent globalement l'ensemble des fonctionnalités de notre site : 

 1. Connexion sur un compte propre à des patients ou à un personnel de santé 
 2. Pour un personnel de santé : 
	 2.1. Gestion des membres (Ajout / Modification / Suppression) 
	 2.2. Gestion des quiz (Ajout / Modification / Suppression)
	 2.4. Gestion des questions (Ajout / Modification / Suppression)
	 2.5. Observation des statistiques
 3. Pour un patient : 
	 3.1. Jouer à un quiz après avoir parcouru (ou recherché) les quiz rangés par thèmes
	 3.2. Pouvoir modifier ses paramètres d'affichage
	 3.3. Pouvoir choisir son "mode" de jeu, Carré ou Duo 

L'adaptation la plus importante de notre site est l'augmentation de la taille des boutons à l'approche de la souris.
En effet, quand on regarde les différentes conséquences provoquées par la maladie de Parkinson, on peut voir la **rigidité des membres**.
Ainsi, sur notre quiz, lorsque les patients joueront à un quiz, les boutons sur lesquels ils voudront se diriger verront leur taille s'agrandir avant même que la souris ne passe dessus. 
Voici un exemple avec ce schéma : 
![enter image description here](https://drive.google.com/file/d/1jzs8UlcUcumrV_ip0Mes9Ju3JcDym6cD/view?usp=sharing)

## Partie 2 : scénarios des tests mis en place et pertinence
Pour pouvoir tester les différentes fonctionnalités vues dans la Partie 1 de ce document, nous avons utilisé la bibliothèque Playwright qui nous permet d'écrire des codes de tests dans le but de tester notre site en analysant son interface.

### Stratégie de test : 
Comme nous l'avons vu lors en cours, il est très important de se mettre d'accord sur une bonne stratégie de test à appliquer avant même de commencer à coder car tous les membres d'une équipe peuvent avoir une philosophie différente sur la manière de tester, il est donc important d' "accorder les violons" avant de commencer. 
Pour notre groupe, nous avons décidé de tester chacune des fonctionnalités présentées précédemment mais avec des tests poussés et précis permettant de certifier la garantie de la bonne réalisation d'une méthode. Par exemple, si je prend la fonctionnalité "Modifier un quiz", voici le code du test correspondant : 
```typescript
test("Modifier une question dans un quiz", async({page}) => {  
  const AdminMainPageFI = new AdminMainPageFixture(page);  
  const EditQuizFI = new EditQuizFixture(page);  
  const EditQuestionFI = new EditQuestionComponentFixture(page);  
  
  await page.click('text=Admin Admin');  
  
  await AdminMainPageFI.goOnEditQuiz('Les Acteurs', 'Acteurs');  
  await EditQuizFI.goOnEditQuestion('Donner un film avec Will Smith');  
  
  
  let tab = ['Pamela rose !', "", "", ""];  
  await EditQuestionFI.changeValuesQuestionAndGoBack("Quel personnage meurt dans la comédie policière de Kad&Olivier ?",tab);  
  
  await AdminMainPageFI.launchQuiz('Les acteurs', 'Acteurs');  
  
  //PLAY THE GAME  
  await page.click('text=Duo (2 choix affichés)');  
  await page.click('text=François Cluzet');  
  await page.click('text=Valider');  
  
  await expect(page.getByRole('button', { name: 'Pamela rose !' })).toBeVisible();  
  await expect(page.getByText('Quel personnage meurt dans la comédie policière de Kad&Olivier ?')).toBeVisible();  
  
});
```

Pour tester nos scénarios nous avons donc écrit 30 tests au total : 
- admin test
1) Redirection page admin depuis liste patient

- initial test
2) Basic test

- lorenzo test scenario
3) Jouer un quiz et avoir 2 points sur 2
4) Jouer un quiz et avoir 1 point sur 2
5) Jouer un quiz et avoir 0 point sur 2
6) Test input filtrage, autres thèmes disparaissent
7) Test input filtrage et defiltrage en vidant le input

- player test scenario
8) Jouer un quiz et avoir 2 points sur 2 (stade 4)
9) Jouer un quiz et avoir 1 point sur 2 (stade 4)
10) Jouer un quiz et avoir 0 point sur 2 (stade 4)
11) Jouer un quiz et avoir 2 points sur 2 (stade 0)
12) Jouer un quiz et avoir 1 point sur 2 (stade 0)
13) Jouer un quiz et avoir 0 point sur 2 (stade 0)
14) Vérifier que les boutons deviennent plus gros
15) Vérifier l' aggrandissement du bouton lorsque la souris est dessus


- quiz questions test scenario
16) Ajouter un quiz à la base de donnée
17) Modifier un quiz déjà présent
18) Modifier une question dans un quiz
19) Ajouter une question dans un quiz
20) Supprimer un quiz déjà présent
21) Supprimer une question (quiz acteur)

- test Stats
22) Vérification fonctionnement comparaison d'image
23) test pour un nouvel utilisateur
24) Test pour un utilisateur avec bonnes réponses et bon clicks
25) Test pour un utilisateur avec mauvaises réponses et bon clicks
26) Test pour un utilisateur avec bonnes réponses et mauvais clicks
27) Test pour un utilisateur avec mauvaises réponses et mauvais clicks

- Utilisateurs test scénario
28) Test Creation Utilisateurs
29) Test Modification Utilisateurs
30) Test Suppression Utilisateurs


Ces tests se rapprochent de tests unitaires pour la plupart et permettent de détecter rapidement la moindre défaillance, en ciblant précisément l'élément à corriger.
En associant plusieurs de ces tests nous pouvons reconstituer les scénarios prévus dans la partie 1.

### Scénario 1
Les tests 16, 17, 18, 19 et 21 peuvent être utilisés pour reconstituer le scénario de création de quiz par un personnel de santé.

### Scénario 2
Le test 28 consiste à créer le compte d'un nouveau résident. Ce scénario est également repris dans le test 23, avec une vérification de l'initialisation des statistiques du nouveau résident.

### Scénario 3
Les tests 22 à 27 correspondent à ce scénario.
Pour fonctionner ces tests utilisent des captures d'écran et les comparent à des captures d'écran témoins. Une marge d'erreur (en nombre de pixels) est autorisée pour ne pas interpréter le changement de la date comme une différence.
Il n'était pas possible de tester une année de pratique comme désiré initialement vu qu'il a été retenu que la date devrait être gérée par le backend.
Les tests 24 à 27 sont quasiment identiques, pour tester toutes les combinaisons possibles (chaque test intégrant la création du résident, une partie jouée, la consultation de toutes les statistiques et la suppression du résident).
Le plus pertinent est très certainement le test 26. 
En effet, celui-ci détecte que l'utilisateur a cliqué une fois sur deux en dehors et bouton mais que celui-ci a eu le maximum de points.
Il permet donc de tester à la fois de tester la détection des clics ratés (statistique intéressante dans la gestion de Parkinson) et si les points sont correctement comptés.

### Scénario 4
Les tests 6 et 7 peuvent représenter Jean-Marc cherchant un quiz par son nom.
Les tests 11, 12 et 13 correspondent à Jean-Marc qui joue à un quiz avec plus ou moins de réussite et le test 14 vérifie l'adaptation du site selon les paramètres sélectionnés par l'utilisateur.
Comme Jean-Marc est au stade 1 de parkinson à chaque question il peut choisir entre duo et carré.
Les tests 3, 4 et 5 sont les originaux des tests 11, 12 et 13, initialement écrits dans un fichier pour prendre en main playwright.

### Scénario 5
Les tests 8, 9 et 10 correspondent à Yvette qui joue à un quiz avec plus ou moins de réussite et le test 15 vérifie, comme pour le scénario précédent, que les boutons grossissent à l'approche de la souris.

---
### Conclusion : 
Cette stratégie de test a été choisie pour être plus efficace et plus complets sur les différentes fonctionnalités de gestion du trouble, mais ne nous a pas permis d'élaborer les tests exactement comme nous le voulions dans le temps imparti.
Quasiment tous les tests sont cependant au service des scénarios d'utilisation que nous avons mis en place.


## Partie 3 : Présentation de l’évaluation coopérative (procédure, résultats) et de l'analyse des résultats obtenus

Au cours de notre projet, nous avons pu effectuer une évaluation coopérative dans le but de faire tester notre site à six personnes externes au groupe pour qu'elles jouent le rôle d'utilisateur, qu'elles puissent nous donner des retours et que nous puissions également observer leur façon d'agir.
Cette évaluation coopérative s'est déroulée de la manière suivante :
Il y avait tout d'abord un membre externe à notre groupe face au site, l'utilisateur, qui se devait de penser à voix haute.
De notre côté, nous avions un directeur qui s'occupait de donner une instruction à l'utilisateur (instructions tirées des scénarios comme par exemple ajouter un quiz).
Deux autres membres du groupe faisaient office d'observateur et s'occupaient donc d'observer l'utilisateur et de noter ses réactions, le cheminement de sa pensée et ses réflexions.

Suite à cet exercice, nous avons rassemblé dans un Word, les différentes informations/remarques des utilisateurs ayant testé notre site. Voici un tableau représentant ces données :


| Nicolas| Points Positifs| Points Négatifs/Remarques|
| ------------------------------ | ------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Création d'un quiz             | Trouve facilement/intuitif                                          | Taille des inputs un peu petit                                                   |
| Ajout d'un patient             | Trouve le formulaire simple et efficace                             | Après la validation de création, il faudrait revenir sur la liste des patients   |
| Jouer à un quiz                | Apprécie le grandissement des boutons en s'approchant               | Pense qu'il faudrait que la réponse se valide quand on appuie dessus             |
| Regarder des statistiques      | Trouve directement qu'il faut aller sur le compte personnel de santé |Aucune remarque spéciale|
| Changer les paramètres         | Trouve directement le bouton paramètre                              | N'a pas compris comment valider les modifications car le bouton s'appelle retour |
| Ajouter une question à un quiz | Se rend facilement dans le quiz et ajoute la question               | Changer la couleur des boutons qui ressemblent à la couleur en arrière           |




| Clément | Points Positifs | Points Négatifs/Remarques |
| -------- | -------- | -------- |
|Création d'un quiz|Trouve facilement|Aucune remarque spéciale|
|Ajout d'un patient|Se rend directement sur le compte personnel de santé|Ne trouve pas clair qu'il faille aller dans la liste des patients pour en ajouter un|
|Jouez à un quiz|Aucune remarque spéciale|Il y a la question alors qu'il fait le choix entre carré et duo, il faudrait déplacer l'image, préciser que boutton retour =quitter le quiz|
|Regarder des statistiques|Trouve facilement|Aucune remarque spéciale|
|Changer les paramètres|Boutton paramètre trouvé facilement|Aucune remarque spéciale|
|Ajouter une question à un quiz|Se rend facilement au bon endroit|Pense qu'il faudrait rediriger sur la liste des questions après la modification|

| Aubin | Points Positifs | Points Négatifs/Remarques |
| -------- | -------- | -------- |
|Création d'un quiz| Trouve facilement |Peut-être les boutons un peu petits|
|Ajout d'un patient|Facile à trouver |Trouve qu'il faudrait rediriger sur la liste des patients après création|
|Jouez à un quiz| Apprécie le choix du thème puis du quiz|Désaprouve le fait de scroller si la liste est longue|
|Regarder des statistiques|Aucune remarque spéciale|Va sur le profil utilisateur au lieu du profil personnel de santé|
|Changer les paramètres|Trouve le bouton directement|Aucune remarque spéciale|
|Ajouter une question à un quiz|Intuitif, aime la partie modification de quiz|Couleur de bouton trop grisée|


| Virginie (Ergothérapeute) | Points Positifs | Points Négatifs/Remarques |
| -------- | -------- | -------- |
|Création d'un quiz|Trouve facilement|S'il y a trop de quiz, il faut beaucoup scroller sur la page|
|Ajout d'un patient|Se rend facilement à l'ajout de patient|Bouton trop gris, pas intuitif de cliquer sur retour après la création du patient|
|Jouez à un quiz|Phrase à la fin positive, à garder|Mettre le score en plus petit, diminuer la vitesse de la souris|
|Regarder des statistiques|Aucune remarque spéciale|Demande la possibilité de voir les stats en fonction d'un quiz plutôt qu'en globalité|
|Changer les paramètres|Aucune remarque spéciale|Les patients sont rarement seuls, c'est donc le personnel de santé qui fera le changement. Changer bouton retour par valider|
|Ajouter une question à un quiz|Trouve rapidement comment faire| Trouve les boutons trop grisés|

| Rémy (Professeur de web) | Points Positifs | Points Négatifs/Remarques |
| -------- | -------- | -------- |
|Création d'un quiz|Trouve facilement|Ajouter une liste déroulante pour ne pas avoir à réécrire le thème|
|Ajout d'un patient|Se rend facilement à l'ajout de patient|Devrait revenir à la liste après création|
|Jouez à un quiz|Aucune remarque spéciale |Bouton déconnexion pas forcément intuitif, disposition des boutons mauvaise|
|Regarder des statistiques|Aucune remarque spéciale|Aucune remarque spéciale|
|Changer les paramètres|Aucune remarque spéciale|Probleme: l'image est cliquable. Disposition des boutons/image mauvaise. Changer bouton retour par valider|
|Ajouter une question à un quiz|Trouve rapidement comment faire| Trouve les boutons trop grisés|


Pour résumer un peu ces 5 tests croisés, plusieurs remarques pertinentes ont été évoquées ce qui nous a permis d'apporter des modifications à notre site pour l'améliorer, voici un condensé des remarques prises en comptes, mais également de celles qui ne l'ont pas été:

1. La remarque bouton trop grisé est souvent revenu, nous avons donc rendu le bouton plus foncé pour qu'on le remarque plus facilement:![](https://hackmd.io/_uploads/HybjYFtPn.png)

2. Le fait que l'image dans un quiz soit cliquable et ouvre une nouvelle fenêtre internet aurait pu perdre les utilisateurs, nous avons donc changé ceci en priorité.
3. Les boutons de réponse lors d'un quiz étaient mal positionnés avec l'image au-dessus. Nous avons donc repensé ce placement:


| ![](https://hackmd.io/_uploads/BkVnL9tv3.png)| ![](https://hackmd.io/_uploads/r1Ewrotvh.png) |
| -------- | -------- |



4. Nous avons amélioré la page personnel de santé où la liste de quiz pouvait être longue et donc obliger la personne à scroller vers le bas pour retrouver un quiz. Nous avons donc ajouté une liste déroulante par thème:
![](https://hackmd.io/_uploads/r13WKqtD2.png)
5. Pour le fait de ramener directement sur la liste des patients après l'ajout d'un nouveau, nous n'avons pas eu le temps de l'implémenter, mais nous savons pertinemment que c'est un axe d'amélioration important d'un point de vue utilisateur.
6. La remarque de Nicolas disant de valider une réponse de quiz dès sa sélection ne nous a pas paru logique. En effet, nous avons bien réfléchi sur ce point et le fait de devoir valider une réponse sélectionnée nous paraît  logique pour des personnes souffrant de rigidité des membres. Elles pourraient cliquer sur une réponse sans faire exprès et finir par être frustré, d'où le fait de valider après la sélection pour éviter cela.  

  Avoir la chance de faire tester notre site à Virginie (Ergothérapeute) a été très bénéfique pour nous, car elle était la plus apte à comprendre les besoins utilisateur (patient) et également ceux pour le personnel de santé. Nous regrettons également de ne pas avoir demandé son avis sur notre site plus tôt lors du développement du projet, ce qui nous aurait permis d'éviter certaines erreurs de conception IHM.


## Annexes : 


### Répartition du travail : 
- Simon Beurel
- Théo Delias
- Quentin Maurois
- Lorenzo Froment
- Tristan Larguier
Implémentation de la visualisation des statistiques à l'aide du module ApexCharts. Ajout du chemin d'accès vers la page de tests.
Implémentation de la gestion des résultats par le back.
À la fin de chaque partie le score est récupéré et envoyé au back, qui se charge de le stocker en fonction de la date.
Lorsque les statistiques sont appelées pour être affichées le back recherche le minimum, le maximum et calcul la moyenne avant de tout envoyer dans un format adapté pour être directement affiché.
Rédaction de tests de création, modification et suppression d'utilisateurs. Création des tests relatifs aux statistiques, c'est tests implémentant la comparaison d'images (CF scénario 3 Partie 2).
Co-Rédaction du rapport final.



### Sources : 
- Article de l'OMS sur Parkinson : [https://www.who.int/fr/news-room/fact-sheets/detail/parkinson-disease](https://www.who.int/fr/news-room/fact-sheets/detail/parkinson-disease)

---

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
# Partie I : Dockériser le Front et le Back
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


## Partie II : Orchestrer le front et le back !
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

## Partie III : Dockeriser l'exécution des tests !
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
