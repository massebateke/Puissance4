# Connect 4 - Jeu en JavaScript

## Description
Ce projet est un jeu de Connect 4 développé en JavaScript. Il utilise la manipulation du DOM et la Programmation Orientée Objet (POO) pour gérer les données et l'affichage du plateau de jeu.

## Fonctionnalités

### 1. Affichage du Plateau de Jeu
- Le plateau de jeu est généré dynamiquement et affiché sur la page HTML.
- Il est mis à jour automatiquement après chaque coup joué.

### 2. Gestion des Données du Jeu
Chaque joueur possède :
- Une couleur associée
- Un ID unique

Le système de jeu contient également :
- L'ID du joueur courant
- Un plateau de jeu sous forme de grille contenant des cellules avec :
  - Une coordonnée X
  - Une coordonnée Y
  - Un état (VIDE ou ID du joueur occupant la cellule)

### 3. Gameplay
- Les joueurs jouent à tour de rôle en sélectionnant une colonne.
- Le pion tombe à la position la plus basse disponible dans la colonne sélectionnée.
- L'animation de chute des pions est implémentée.
- L'interface indique clairement quel joueur doit jouer.

### 4. Vérification de la Victoire
Après chaque coup, le système vérifie si un joueur a gagné en contrôlant :
- 4 pions alignés verticalement
- 4 pions alignés horizontalement
- 4 pions alignés en diagonale (gauche et droite)
- Si toutes les cases sont remplies sans gagnant, la partie est déclarée nulle.

### 5. Gestion de la Fin de Partie
- Affichage d'un écran de victoire avec le nom du joueur gagnant.
- Possibilité de relancer une nouvelle partie.
- Historique des scores des parties successives.

### 6. Fonctionnalités Avancées
- Gestion d'un écran de fin de partie en cas d'égalité.
- Possibilité d'annuler le dernier coup joué.

## Technologies utilisées
- HTML, CSS pour la structure et le style
- JavaScript pour la logique du jeu et la manipulation du DOM

## Installation
1. Télécharger ou cloner ce projet.
2. Ouvrir `index.html` dans un navigateur.

## Auteurs
- Développé par Massé BATEKE



