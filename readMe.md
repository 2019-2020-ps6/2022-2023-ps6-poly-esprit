# Rapport final projet PS6 : Poly'Esprit 
Membres du groupe : 
- BEUREL Simon 
- MAUROIS Quentin 
- FROMENT Lorenzo 
- DELIAS Théo 
- LARGUIER Tristan

## Préambule : 
Au cours du projet PS6 réalisé dans le cadre de la formation Ingénieur en Informatique à Polytech Nice-Sophia, nous avons du réaliser un site internet proposant des quizs pouvant être réalisés par des personnes âgées comportant une pathologie particulière.  
Notre groupe a décidé de traiter la maladie de Parkinson. Selon l'OMS (Organisation Mondiale de la Santé), la maladie de Parkinson est "une maladie **dégénérative** du cerveau associée à des **symptômes moteurs** (mouvements lents, **tremblements**, rigidité et déséquilibre) et à d'autres complications, notamment des troubles cognitifs, de la santé mentale, du sommeil ainsi que des douleurs et des troubles sensoriels."
Le but de notre site web sera donc de permettre aux différents patients d'un EPHAD ou maison de santé de pouvoir jouer à différents quizs en faisant en sorte d'implémenter différentes fonctionnalités pour faciliter l'utilisation du site aux patients gravement atteint de la maladie de Parkinson. Ce site sera également utile et utilisé par le personnel de santé pour que ces derniers puissent gérer la liste des patients, mais également évoluer les différentes statistiques liées à un utilisateur comme par exemple le *pourcentage de bonnes réponses* ou alors le *pourcentage de clics ratés*. 
## Partie 1 : Personas et scénarios réalisés
Pour pouvoir réaliser une conception centrée utilisateur, nous avons du réaliser différents personas ainsi que des scénarios d'utilisation du site qui sont associés aux personas en question. 
Les personas sont des représentation fictive d'utilisateurs "type" qui utiliseront notre site internet. Dans notre cas, nous avons décider de créer 4 personas différents : 
### Persona n°1 : Patient atteint de la maladie de Parkinson
||  |
|--|--|
|  Nom|Jean-Marc Dupont
Âge | 87 ans
Famille | Jean-Marc a une fille de 52 ans et un fils de 48 ans. Peu après le décès de sa femme, ils l'ont transféré dans ce centre à cause de ses problèmes moteurs qui ont l'empêchent de conduire ou simplement de se faire à manger 
Travail | Dans le passé, il a travaillé à la construction des chemins de fer en France et en Europe. Il a dû arrêter sa carrière plus tôt que prévu à cause des problèmes moteur importants qui sont apparus au fil du temp. En effet, les geste peu précis empêchent de travailler correctement et sont même dangereux dans ce milieu.
Passions et loisirs | Aujourd’hui, il aime regarder la télévision pour être au courant de l’actualité et pour regarder du foot. Il joue également aux échecs de temps en temps.
Utilisation des technologies | Jean-Marc utilise de temps en temps un ordinateur pour aller sur internet. Il possède également un smartphone offert par son fils qu’il utilise pour garder contact avec ses enfants et petits enfants
Connaissances des technologies | Bien qu’il utilise les technologies, il ne comprends pas du tout leur fonctionnement
Pathologie |  |Maladie de Parkinson, il ne contrôle pas forcément bien ses mains et possède beaucoup de tremblements. Il est très peu précis et ne peux pas notamment utiliser une souris d’ordinateur sur 95% des sites.

#### Persona n°2 : Psychomotricienne 
|  |  |
|--|--|
| Nom | Micheline Martin
Âge| 45 ans
But avec l'application | Elle utilise l’application pour créer des tests pour ses patients. Elle est également à disposition des résidants pour les aider à utiliser l’application.
Famille | Micheline est mariée et a deux enfants adolescents, un garçon et une fille. Elle vit à proximité du centre où elle travaille en tant qu'aide soignante.
Travail | Micheline travaille depuis 10 ans dans le centre pour personnes âgées en tant qu'aide soignante. Elle s'occupe principalement de la toilette et des repas des résidents, ainsi que de leur bien-être général. Elle apprécie son travail et s'engage à offrir un environnement sûr et confortable aux résidents.
Passion et loisirs | En dehors de son travail, Micheline aime faire de la randonnée et passer du temps en famille. Elle aime également essayer de nouvelles recettes de cuisine et s'inscrire à des cours de cuisine.
Utilisation des technologies | Bien qu'elle ne soit pas très à l'aise avec la technologie, Micheline utilise un ordinateur pour saisir les informations médicales des résidents et communique avec les médecins et infirmières via l'application de suivi des patients. Elle utilise également un smartphone pour communiquer avec sa famille et ses amis, et pour prendre des photos lors de ses randonnées.
Connaissance des technologies   | Elle utilise les technologies tous les jours mais ne comprends pas vraiment leur fonctionnement réel. Elle arrive toujours à se débrouiller pour faire ce qu’elle veut
### Persona n°3 : Patient atteinte de la maladie de Parkinson (Stade 4) 
|  |  |
|--|--|
| Nom | Yvette LUCKAS 
Âge | 73 ans
Famille | Yvette a un fils de 49 ans résidant aux États Unis. Lors du départ de son fils à l’étranger il y a 25 ans elle s’est débrouillée seule. Cependant quand les symptomes sont devenus très importants au point de l’handicaper au quotidien- il a été décidé de l’envoyer dans le centre, il y a 5 ans.
Travail | Dans le passé, elle a travaillé a été psychologue en lycées. Elle a beaucoup aidé les jeunes à rebondir après des épisodes difficiles.
Passions et loisirs | Elle aime beaucoup lire des récits fantastiques et regarder des films d’auteurs.
Utilisation des technologies | Dans le temps quand elle n’était pas malade,elle utilisait son téléphone pour appeler son fils, prendre des photos et jouer a des jeux. Yvette a utilisé un ordinateur pour surfer sur internet, lire et envoyer des emails et lire des articles. Cependant, depuis l’aggravation de sa maladie, elle est dans la quasi incapacité de pouvoir faire des tâches complexes sur un ordinateur
Connaissance des technologies | Elle ne sait pas comment fonctionne un ordinateur mais sait les utiliser. Elle a besoin d’aide pour certaines tâches de maintenance.
Pathologie |Elle ne sait pas comment fonctionne un ordinateur mais sait les utiliser. Elle a besoin d’aide pour certaines tâches de maintenance.

En résumé, nous avons donc 3 personas réprésentant chacun un utilisateur "type" de notre site web : 
	- Un personnel de santé 
	- Un patient avec "peu" de rigité dans les membres et une utilisation facile d'une souris
	- Un patient atteint par la maladie de Parkinson en stade 4 et donc qui a des difficultés pour bouger la souris 

Suite à la définition de nos personas, nous avons dû implémenter des scénarios qui ont pour but de mettre en scène ces personas dans des cas concrets d'utilisation de notre site web. Ainsi, grâce à ces scénarios, nous pouvoir mieux détecter les différentes tâches propres à tel ou te persona mais également essayer de réfléchir à une hiérarchie des tâches à réaliser. 
Nous avons réaliser au total 5 scénarios : 
### Scénario n°1 : Micheline doit créer un nouveau quiz 
Micheline doit créer un nouveau quizz pour l’activité de demain. Certains résidants lui ont spécifiquement demandé que le prochain quizz porte sur les fleurs méditerranéennes de jardin. Elle se connecte et ce thème n’existant pas encore, elle crée alors une nouvelle catégorie. Après ça, elle rentre le nom de son quizz et elle peut enfin créer ses questions ou alors sélectionner des questions qui existent déjà pour ce thème (Mais dans ce cas là comme le thème n’existant pas auparavant, il n’y a pas de questions liées à ce thème) . Pour chacune des questions que Micheline crée, elle doit renseigner 4 réponses et elle doit également dire qu’elle est la bonne réponse.
**Spécifictés mises en avant lors de ce scénario** : 
Connexion en tant que personnel de santé -> création d'un thème/quiz -> création de questions avec les réponses liées 

### Scénario n°2 : Micheline doit ajouter un nouveau résident 
Dans l’exercice de ses fonctions, Micheline doit ajouter le nouveau résidant du centre : Jean-Marc Dupont. Pour se faire, dès sa connection, elle choisit d’ajouter un utilisateur. Ensuite, elle rentre les informations concernant Jean-Marc comme son nom, prénom, un ou plusieurs numéros de téléphone de la famille, sa pathologie et une photo. Comme Jean-Marc a des problèmes moteur dûs à parkinson elle rentre sa pathologie et le système lui attribue des paramètres de base comme une aide à la visée sur les boutons, de plus gros boutons (bien sûr Jean-Marc peut désactiver ces paramètres si il ne les aimes pas et inversement, tout autre utilisateur peut les activer séparément).
**Spécificités mises en avant lors de ce scénario** : 
Connexion en tant que personnel de santé -> gestion des patients -> ajout d'un nouveau patient (identité, pathologie, photo, spécification de différents paramètres...)

### Scénario n°3 : Micheline veut regarder les statistiques de Patrick 
Au bout d’un an de pratique et après avoir pris goût au site Poly’Quiz, Micheline souhaite faire le point sur l'évolution des "performances" de Patrick sur le site. Pour cela, elle va d'abord se connecter à son compte, cliquer ensuite sur la gestion des patients, puis cliquer sur le bouton permettant de regarder les différentes statistiques de Patrick comme le pourcentage de clics ratés ou alors le pourcentage de bonnes réponses 
**Spécificités mises en avant lors de ce scénario** : 
Connexion en tant que personnel de santé -> gestion des patients -> observation des statistiques d'un patient en particulier 

### Scénario n°4 : Jean-Marc souhaite jouer à un quiz et changer les paramètres 
Jean-Marc se connecte pour la première fois mais il est très frustré par les paramètres de base car il a bien du mal à viser les boutons. Il se rends donc sur la page de paramètres pour les modifier. Il augmente encore ainsi la taille des boutons et également la taille du texte présent dans les boutons. Une fois de retour sur le site, il se rend compte des changements. Il remarque également qu'on lui demande pour ce quiz de choisir entre le mode *Duo (2 choix possibles)* et le mode *Carré (4 choix possibles)*. 
**Spécificités mises en avant lors de ce scénario** : 
Connexion en tant que patient -> lancement d'un quiz -> modification des paramètres & choix du mode Carré ou Duo

### Scénario 5 : Yvettes (Stade 4 de Parkinson) souhaite réaliser un quiz sur les Acteurs 
Lors des vacances de Noël, Yvette reçois dans sa chambre son petit-fils. Ensembles, ils veulent faire un quizz chacun. Son petit-fils l’aide donc à se connecter avec les identifiants d’Yvette. Yvette veut faire le quizz sur les Acteurs, son petit-fils l’aide alors à lancer le quizz. Comme Yvette possède le stade 4 de parkinson elle ne possède que 2 choix de réponse possible devant elle. 
**Spécificités mises en avant lors de ce scénario** : 
Connexion en tant que patient -> lancement d'un quiz -> 2 réponses possibles proposées directement 

A la suite de ces différents scénarios, nous avons pu établir une liste de fonctionnalités qui sont essentielles à implémenter sur notre site : 

 1. Connexion sur un compte propre à des patients ou a un personnel de santé 
 2. Pour un personnel de santé : 
	 2.1. Gestion des membres (Ajout / Modification / Suppression) 
	 2.2. Gestion des quizs (Ajout / Modification / Suppression)
	 2.4. Gestion des questions (Ajout / Modification / Suppression)
	 2.5. Observation des statistiques
 3. Pour un patient : 
	 3.1. Jouer à un quiz après avoir parcouru un catalogue de quiz rangés par thèmes
	 3.2. Pouvoir modifier des paramètres sur un site
	 3.3. Pouvoir choisir son "mode" de jeu => Carré ou Duo 

En plus de ces différentes fonctionnalités "basiques", nous avons également décidé d'implémenter une fonctionnalité qui permet aux différents patients et notamment à ceux atteint par la maladie de Parkinson de pouvoir utiliser le site internet plus "facilement". En effet, quand on regarde les différentes conséquences provoquées par la maladie de Parkinson, on remarque que la **rigidité des membres** est une conséquence directe et assez grave. Ainsi, sur notre quiz lorsque les patients joueront à un quiz, les boutons sur lesquels ils voudront se diriger verront leur taille s'agrandir avant même que la souris ne passe dessus. Cela est notamment dû à une zone présente autour de chacun des boutons de réponse qui "détecte" quand la souris s'approche ou non d'un bouton. Voici un exemple avec ce schéma : 
![enter image description here](https://drive.google.com/file/d/1jzs8UlcUcumrV_ip0Mes9Ju3JcDym6cD/view?usp=sharing)
## Partie 2 : Scénarios des tests mis en place et pertinence
Pour pouvoir tester les différentes fonctionnalités vues dans la Partie 1 de ce document, nous avons utilisé la bibliothèque Playwright qui nous permet de faire d'écrire des codes de tests permettant de réaliser des tests en récupérant l'interface de notre site internet.
Avant de commencer à écrire tous ces tests, nous avons du commencer par réfléchir à une stratégie de test.
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
