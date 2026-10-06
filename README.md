# CAP Métiers de la Coiffure – Année 2

Portail indépendant CMA Formation Sainte-Clotilde. Arial, bordeaux #A50F23, corail #EE3C3D, logo et visuels originaux du portail Coiffure.

## Installer sur GitHub Pages

1. Créer un nouveau repository public nommé `app-peda-cap-mc-a2`.
2. Déposer le contenu de ce dossier à la racine du repository, sur la branche `main`.
3. Dans Settings → Pages : choisir Deploy from a branch, `main`, `/ (root)`, puis Save.
4. GitHub fournit le lien publié dans Settings → Pages, après la première construction.

Les repositories Coiffure de première année et Métallier ne doivent pas être modifiés.

## Déposer les cinq applications

Déposer chacun de ces dossiers complets, sans modifier son index.html ni ses ressources :

- `applications/A2S3M2/index.html`
- `applications/A2S3P1/index.html`
- `applications/A2S4M1/index.html`
- `applications/A2S4M2/index.html`
- `applications/A2S4P1/index.html`

Les cinq cartes sont déjà inscrites dans applications.js et n'ont aucune date différée. Elles sont visibles dès l'ouverture du portail. Leurs liens fonctionnent après le dépôt des dossiers et la mise à jour GitHub Pages. Les dossiers applicatifs ne sont pas inclus dans ce kit ; aucun faux contenu pédagogique n'a été créé. Les intitulés sont neutres en attendant les titres exacts des activités.

## Ajouter une activité

1. Déposer le dossier complet `applications/A2S5M1/` contenant son index.html et ses ressources.
2. Ajouter cet objet dans le tableau `window.APPLICATIONS` de `applications.js` (séparer les objets par une virgule) :

```javascript
{
  code: 'A2S5M1',
  annee: 2,
  semaine: 5,
  discipline: 'M',
  activite: 1,
  titre: 'Titre exact de ton activité',
  description: 'Une courte présentation pour les apprenants.',
  lien: './applications/A2S5M1/index.html',
  publication: '2026-11-06T08:00:00+04:00'
}
```

Supprimer la ligne publication pour afficher immédiatement la carte. Le code doit correspondre exactement aux quatre champs : A = Année, S = Semaine, M = Mathématiques, P = Physique-Chimie. Le tri est numérique par année, semaine et activité. Il n'est pas nécessaire de modifier index.html.

Le format de publication est strictement `AAAA-MM-JJTHH:MM:SS+04:00`, heure de La Réunion. La carte apparaît à l'échéance, y compris si le portail est déjà ouvert, selon l'horloge de l'appareil. Le catalogue est également actualisé au retour dans l'onglet.

## Accès pédagogique

Code partagé : `CMAFormationSC`. Aucun compte ni donnée nominative. La validation reste mémorisée dans la session de l'onglet ; une nouvelle session demande le code. Cette barrière pédagogique et la publication différée masquent l'interface : les fichiers et liens directs d'un repository public restent accessibles.

## Fichiers

- index.html : page d'accueil, formulaire et deux matières.
- applications.js : catalogue central avec les cinq entrées.
- portail.js : accès, navigation et affichage différé.
- assets/catalogue.js : validation des métadonnées et tri.
- assets/styles.css : mise en page responsive et charte.
- assets/logo.png, fleche_rouge.png, ruban_vague.png, ruban_dna.png : copies des visuels originaux.
- applications/README.md : emplacement des dossiers à déposer.
- .nojekyll : publication statique sans transformation Jekyll.

## Vérification

Syntaxe JavaScript vérifiée. Tri numérique et publication UTC+4 testés avant l'échéance et à l'échéance. Les cinq applications devront être ouvertes après leur dépôt pour vérifier leurs ressources, sans modifier leur contenu.
