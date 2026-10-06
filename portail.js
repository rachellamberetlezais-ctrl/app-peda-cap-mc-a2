(() => {
  'use strict';
  // Verrou pédagogique seulement : le code et les fichiers sont publics.
  // Clé distincte des portails de première année ; aucune donnée nominative n'est enregistrée.
  const storageKey = 'cap-mc-a2-access-v1';
  const access = document.getElementById('acces');
  const portal = document.getElementById('portail');
  const subjects = document.getElementById('matieres');
  const discipline = document.getElementById('discipline');
  const input = document.getElementById('access-code');
  const error = document.getElementById('access-error');
  const catalogue = document.getElementById('catalogue');
  const titles = { M: 'Mathématiques', P: 'Physique-Chimie' };
  let unlocked = false;
  let applications = [];
  let catalogueError = false;
  try { applications = Catalogue.prepare(window.APPLICATIONS); }
  catch (err) { catalogueError = true; console.error(err); }


  // Masquage des cartes uniquement, selon l'horloge du navigateur.
  function isPublished(app, now) {
    return Catalogue.isPublished(app, now);
  }
  let publicationTimer;
  function schedulePublication(apps, refresh) {
    clearTimeout(publicationTimer);
    const now = Date.now();
    const upcoming = apps.map(app => Date.parse(app.publication)).filter(date => date > now);
    if (upcoming.length) {
      publicationTimer = setTimeout(refresh, Math.min(Math.min(...upcoming) - now, 2147483647));
    }
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    node.className = className;
    node.textContent = text;
    return node;
  }
  function render(focus = true) {
    if (!unlocked) return;
    schedulePublication(applications, () => render(false));
    const now = Date.now();
    const key = { '#mathematiques': 'M', '#physique-chimie': 'P' }[location.hash];
    subjects.hidden = Boolean(key);
    discipline.hidden = !key;
    if (!key) {
      if (focus) document.getElementById('welcome-title').focus();
      return;
    }
    document.getElementById('discipline-title').textContent = titles[key];
    const selected = applications.filter(app => app.discipline === key && isPublished(app, now));
    document.getElementById('discipline-description').textContent = selected.length
      ? 'Choisis une activité pour commencer.' : 'Ton espace est prêt à accueillir les prochaines activités.';
    catalogue.replaceChildren();
    if (catalogueError || !selected.length) {
      const empty = element('div', 'empty', '');
      empty.append(element('h3', '', catalogueError ? 'Catalogue indisponible' : 'Les activités arrivent bientôt'),
        element('p', '', catalogueError ? 'Le catalogue ne peut pas être chargé. Signale-le à ton formateur.' : 'Ton formateur ajoutera ici les ressources de cette matière. Reviens prochainement !'));
      catalogue.append(empty);
    } else {
      for (const app of selected) {
        const card = element('article', 'card', '');
        const link = element('a', '', 'Lancer l’activité →');
        link.href = app.lien;
        link.setAttribute('aria-label', `Lancer l’activité : ${app.titre}`);
        card.append(element('span', 'code', app.code), element('span', 'metadata', `Année ${app.annee} · Semaine ${app.semaine} · Activité ${app.activite}`),
          element('h3', 'arrow-title', app.titre), element('p', '', app.description), link);
        catalogue.append(card);
      }
    }
    if (focus) document.getElementById('discipline-title').focus();
  }
  function unlock(focus) {
    unlocked = true;
    access.hidden = true;
    portal.hidden = false;
    input.value = '';
    try { sessionStorage.setItem(storageKey, 'granted'); } catch { /* Navigation utilisable même sans stockage. */ }
    render(focus);
  }
  document.getElementById('access-form').addEventListener('submit', event => {
    event.preventDefault();
    if (input.value.trim() !== 'CMAFormationSC') {
      error.textContent = 'Code incorrect. Vérifie le code communiqué par ton formateur.';
      input.setAttribute('aria-invalid', 'true');
      input.focus(); input.select();
      return;
    }
    input.removeAttribute('aria-invalid'); error.textContent = '';
    unlock(true);
  });
  input.addEventListener('input', () => { input.removeAttribute('aria-invalid'); error.textContent = ''; });
  document.querySelectorAll('[data-discipline]').forEach(button => button.addEventListener('click', () => {
    location.hash = button.dataset.discipline === 'M' ? 'mathematiques' : 'physique-chimie';
  }));
  document.getElementById('retour').addEventListener('click', () => { location.hash = 'matieres'; });
  window.addEventListener('hashchange', () => render());
  window.addEventListener('pageshow', () => render(false));
  document.addEventListener('visibilitychange', () => { if (!document.hidden) render(false); });
  try { if (sessionStorage.getItem(storageKey) === 'granted') unlock(false); }
  catch { /* Le formulaire reste utilisable si le stockage est désactivé. */ }
})();

