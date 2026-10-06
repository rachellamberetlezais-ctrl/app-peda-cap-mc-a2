/* Fonctions indépendantes de l'affichage : validation et tri du catalogue. */
(function (root) {
  'use strict';
  function prepare(applications) {
    if (!Array.isArray(applications)) throw new Error('Catalogue absent ou invalide.');
    const codes = new Set();
    for (const app of applications) {
      if (!app || !['annee', 'semaine', 'activite'].every(key => Number.isInteger(app[key]) && app[key] > 0)
        || !['M', 'P'].includes(app.discipline)
        || app.code !== `A${app.annee}S${app.semaine}${app.discipline}${app.activite}`
        || codes.has(app.code)
        || !['titre', 'description', 'lien'].every(key => typeof app[key] === 'string' && app[key].trim())) {
        throw new Error('Métadonnées invalides ou code dupliqué dans le catalogue.');
      }
      // Liens locaux uniquement ; aucun script, URL externe ou remontée de dossier.
      if (!/^\.\/applications\/[a-zA-Z0-9_./-]+\.html$/.test(app.lien) || app.lien.split('/').includes('..')) {
        throw new Error(`Lien local invalide : ${app.code}`);
      }
      if (app.publication !== undefined && (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+04:00$/.test(app.publication) || !Number.isFinite(Date.parse(app.publication)))) {
        throw new Error('Date de publication invalide : ' + app.code);
      }
      codes.add(app.code);
    }
    return [...applications].sort((a, b) => a.annee - b.annee || a.semaine - b.semaine || a.activite - b.activite || a.code.localeCompare(b.code));
  }
  root.Catalogue = { prepare, isPublished: (app, now = Date.now()) => app.publication === undefined || Date.parse(app.publication) <= now };
})(typeof window === 'undefined' ? globalThis : window);

