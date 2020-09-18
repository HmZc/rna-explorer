Une application web open source offrant un outil de recherche ainsi qu'un module d'analyse exploratoire (sous forme de dataviz) des différentes associations relevant de la [loi du 1er juillet 1901](https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=LEGITEXT000006069570)
. Les données utilisées proviennent actuellement des APIs (V1) publiques d'Opendatasoft.

<img src="https://i.servimg.com/u/f45/12/16/25/08/openas11.png" height="210" >
<img src="https://i45.servimg.com/u/f45/12/16/25/08/openas10.png" height="210">

## A venir

-   Migration vers OpenStreetMap (solution cartographique open source).
-   Contruction d'une API REST en se basant sur un jeu de donnée plus récent. 

## Demo

> deployement auto lors de chaque push dans master

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
