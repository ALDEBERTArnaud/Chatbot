# Chatbot
Cette application de chatbot permet aux utilisateurs d'interagir avec différents bots pour obtenir des informations sur les cryptomonnaies, les actions boursières et des faits amusants.

## Contexte
Ce projet a été réalisé dans le cadre de ma formation sur la programmation fonctionnelle. L'objectif était de créer une application interactive en utilisant des concepts de programmation fonctionnelle et de structurer le code selon les normes actuelles de type MVC (Model-View-Controller).

## Installation et Lancement en Local
### Clonez le dépôt GitHub : git clone https://github.com/ALDEBERTArnaud/Chatbot.git
### Accédez au répertoire du projet et effectuez ces commandes dans votre terminal :
#### npm i
#### npm run dev

## Fonctionnalités
### Interaction avec les bots
Tapez votre message dans le champ de saisie et cliquez sur "Envoyer" ou appuyez sur "Entrée".
### Liste des bots
Cliquez sur un bot dans la barre latérale pour voir ses commandes disponibles.
### Gestion des messages
Cliquez sur "Supprimer les messages" pour effacer l'historique des messages.

### Une commande secrète "au rapport" permet de vérifier si tous les bots sont à nos ordres

Si jamais vous effectuez trop rapidement des commandes crypto ou bourse, il se peut que les bots vous renvoient une erreur.
Patientez quelques minutes et effectuer à nouveau vos actions.
#### (Ces bots communiquent avec des apis gratuites et limitent les appels par minute)

## Structure du Projet
### Le projet est structuré selon les normes MVC pour une meilleure organisation et maintenabilité du code.

#### chatbot/
#### ├── index.html
#### ├── style.css
#### ├── js/
#### │├── main.js
#### │├── models/
#### ││├── bot.js
#### │├── controllers/
#### ││├── messageController.js
#### ││├── botController.js