Une application web offrant un outil de recherche ainsi qu'un module d'analyse exploratoire (sous forme de dataviz) des différentes associations relevant de la [loi du 1er juillet 1901](https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=LEGITEXT000006069570)

Les données utilisées proviennent des APIs publiques d'opendatasoft.

## Demo

> deployement auto lors de chaque push dans master

https://assoc-finder.herokuapp.com/

## Stack :

-   VueJS (Nuxt)
-   NodeJS (Express)
-   Heroku


## Variables d'environnement

A la racine du projet `touch .env`, puis definir la variable suivante: `GMAP_API_KEY`

## Commandes de build

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

## Remarques:
  Pour des raisons de contraintes d'apis, le mapping des markers sur la carte se fait pour l'instant avec des adresses ce qui réduit très très fortement l'affichage de la carte.
  
