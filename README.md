Une application web offrant un outil de recherche ainsi qu'un module d'analyse exploratoire (sous forme de dataviz) des différentes associations relevant de la [loi du 1er juillet 1901](https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=LEGITEXT000006069570)

Les données utilisées proviennent des APIs publiques d'opendatasoft.

## Demo

> deployement auto lors de chaque push dans master

https://assoc-finder.herokuapp.com/

## Stack :

-   VueJS
-   NodeJS
-   Heroku

## Lancer l'app

### Afficher la carte

A la racine du projet `touch .env`, puis definir la variable suivante: `GMAP_API_KEY`

> Google does not like string addresses, for now api does not return coordinates (lng,lat), that is why the load of the map is really slow. I temporarily limited the nb records.

### Commandes de build

```bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn dev

# build for production with minification
yarn run build

# run tests
yarn test
```
