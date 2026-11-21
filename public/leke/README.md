# Vos photos (Instagram / archives Leke)

Déposez ici vos propres images, puis pointez-les dans `src/lib/images.ts`.

## Comment faire

1. Téléchargez la photo depuis Instagram (ou vos archives) et renommez-la
   simplement, par exemple `zaouli.jpg`, `atelier-korhogo.jpg`.
2. Copiez le fichier dans ce dossier : `public/leke/zaouli.jpg`.
3. Dans `src/lib/images.ts`, remplacez la valeur `url` de l'entrée voulue par le
   chemin local, par exemple :

   ```ts
   zaouli: {
     url: "/leke/zaouli.jpg",      // au lieu de l'URL Wikimedia
     altFr: "…", altEn: "…", captionFr: "…", captionEn: "…",
   },
   ```

Tout fichier dans `public/` est servi à la racine du site (`/leke/...`).

## Pourquoi pas d'import automatique d'Instagram ?

Les pages Instagram sont protégées par un mur de connexion et les URLs d'images
sont signées et expirent : elles ne peuvent pas être récupérées de façon fiable
ni affichées en lien direct. Le dépôt manuel des fichiers ici est la méthode
stable et conforme.
