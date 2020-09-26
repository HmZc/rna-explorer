<img src="https://i.servimg.com/u/f45/12/16/25/08/openas11.png" height="210" align="right"><img src="https://i45.servimg.com/u/f45/12/16/25/08/openas10.png" height="210" align="right">Une application web open source offrant un outil de recherche ainsi qu'un module d'analyse exploratoire (sous forme de dataviz) des différentes associations relevant de la [loi du 1er juillet 1901](https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=LEGITEXT000006069570)
. Les données utilisées proviennent actuellement des APIs (V1) publiques d'Opendatasoft.

<div style="clear: both;"></div>

## A venir

-   Migration vers OpenStreetMap (solution cartographique open source).
-   Contruction d'une API REST en se basant sur un jeu de donnée plus récent.

## Demo

> Dans une optique de minimisation de consommation d'énergie et etant donné que l'app n'est pas en prod, cette dernière tourne dans un container setup en mode "sleep", d'où le delai d'attente conséquent lors du chargement de l'app.

https://assoc-finder.herokuapp.com/

## Stack :

-   VueJS (Nuxt)
-   NodeJS (Express)
-   Heroku

## Variables d'environnement

A la racine du projet `touch .env`, puis definir la variable suivante : `GMAP_API_KEY`

## Commandes de build

```bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn dev

# run tests
yarn test
```
