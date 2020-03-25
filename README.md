une application web offrant une recherche et une data visualisation des d'associations relevant de la [loi du 1er juillet 1901](https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=LEGITEXT000006069570)

Les données sont principalement issues du répertoire national des associations
https://www.data.gouv.fr/fr/datasets/repertoire-national-des-associations/

L'app disposera dans un premier temps d'un système de recherche d'associations comportant des filtres (secteurs/régions... ), de différentes représentations graphiques permettant d'offrir différents overviews sur différentes mailles.

## Demo

> deployement auto lors de chaque push dans master

https://assoc-finder.herokuapp.com/

## Stack :

-   VueJS
-   NodeJS
-   Heroku

## Lancer l'app

```bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn dev
```

## Features +++ :

-   L'utilisateur peut partager sa géolocalisation. Afficher par la suite (sous forme de carte et liste)
    les associations autour de ce dernier, sur un rayon à définir.
    proposer également plusieurs filtres.
    [https://developer.mozilla.org/fr/docs/Web/API/Geolocation_API](https://developer.mozilla.org/fr/docs/Web/API/Geolocation_API)

-   Automatiser la récupération des bases de données externes mises à jour
