Depuis des stores Vuex (js ou ts):

1. Génération de fichiers de déclaration
2. Utilisation de ces fichiers pour fusionner tous les stores en un
3. On peut utiliser le méga store pour typer `commit`, `dispatch` etc...

Note: On créé des fichiers .d.ts pour chaque store au lieu de juste `typeof import('fichier-source.js')` pour éviter les références circulaires.
