# tests unitaires kanap

## Il faut verifier les regex

il faut verifier qu'on ne puisse pas ajouter n'importe quellle requete au backend : 

- comme des requetes a champ nul, 
- des requetes avec des chiffres dans les noms.

## Page panier vide

- vérifier que quend le panier est VIDE, la page affiche le panier est vide
- vérifier que quend le panier est VID(é), la page affiche le panier est vide

## JSON envoyé

Il faut verifier la qualité du json envoyé au backend : 

- dans l'inspecteur onglet source, cart.js, il faut trouver jsonData à la ligne 264 et comparer a ce qui est demandé dans le backend, recopié dans cart.js a la ligne 188
- il ne faut pas qu'il y ait de doublons d'ids dans products ni de quantité ou de couleurs.
- les regex devraient suffire a verifier contact, mais verifier qu'ils correspondent toujours