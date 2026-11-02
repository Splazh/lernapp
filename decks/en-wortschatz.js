// Englisch: Wortschatz "Family and Friends" für den 1st Check-Up (Mi., 4. November 2026).
// Quelle: Unterrichtsfolien (Wörter von S. 20/21, "Relationship words", Peer Support) plus typische Wörter zum Thema.
// Die offizielle Wortliste von Unit 1 und 2 steht hinten im Buch English in Context 5. Dort fehlende Wörter bitte ergänzen.
(function () {
  const G = 'Check-Up: Wortschatz Family and Friends';
  const add = (id, title, icon, labels, info, cards) => (window.DECKS = window.DECKS || []).push(
    { id, subject: 'englisch', group: G, title, icon, labels, defaultSkip: 0, shortOptions: true, info, cards });

  add('en-family-vocab', 'Family and Friends: Wörter', '👨‍👩‍👧', ['English'], {
    kurz: 'Deutsch → Englisch. So fragt der Check-Up auch.',
    use: [
      'Der 1st Check-Up ist am Mittwoch, 4. November. Geprüft werden Wortschatz aus Unit 1 und 2 und die Zeiten Present und Past (Simple und Continuous).',
      'Wortschatz-Teil: Übersetzung Deutsch → Englisch, Definition (die Erklärung ist gegeben, du findest das Wort) und eigene Sätze mit dem Wort.',
      'Tipp der Lehrerin: Wörter aufschreiben, das hilft bei der Rechtschreibung. Darum ist "Selber schreiben" hier die beste Lernart.'
    ],
    tip: 'Eigene Sätze üben: Schreib zu jedem neuen Wort einen kurzen Satz, am besten in einer der vier Zeiten, die geprüft werden.'
  }, [
    ['auf Kinder aufpassen (als Tätigkeit)', 'childminding'],
    ['Hausarbeit, Tätigkeit im Haushalt', 'chore'],
    ['Urenkel', 'great-grandson'],
    ['Schwägerin', 'sister-in-law'],
    ['Elternhaus', 'parental home'],
    ['Altersunterschied', 'age gap'],
    ['Ehemann', 'husband'],
    ['Ehefrau', 'wife'],
    ['Neffe', 'nephew'],
    ['Nichte', 'niece'],
    ['Tante', 'aunt'],
    ['Onkel', 'uncle'],
    ['Cousin / Cousine', 'cousin'],
    ['Großeltern', 'grandparents'],
    ['Enkelkind', 'grandchild'],
    ['Stiefmutter', 'stepmother'],
    ['Halbbruder', 'half-brother'],
    ['Zwilling', 'twin'],
    ['Geschwister', 'siblings'],
    ['Einzelkind', 'only child'],
    ['Alleinerziehende(r)', 'single parent'],
    ['Patchworkfamilie', 'blended family'],
    ['Verwandte(r)', 'relative'],
    ['Schwiegermutter', 'mother-in-law'],
    ['Schwager', 'brother-in-law'],
    ['Scheidung', 'divorce'],
    ['verlobt', 'engaged'],
    ['Hochzeit', 'wedding'],
    ['Erziehung', 'upbringing'],
    ['Freundschaft', 'friendship'],
    ['Nachbar(in)', 'neighbour'],
    ['Kollege / Kollegin', 'colleague'],
    ['Bekannte(r)', 'acquaintance'],
    ['Beziehung', 'relationship'],
    ['Vertrauen', 'trust'],
    ['Streit, Auseinandersetzung', 'argument'],
    ['Mobbing', 'bullying'],
    ['Mentoring (erfahrene Person begleitet eine andere)', 'mentoring'],
    ['Beratung (Gespräche mit Fachleuten)', 'counselling'],
    ['Vermittlung bei Streit', 'mediation'],
    ['Patenprogramm (Ältere helfen Neuen)', 'buddy scheme']
  ]);

  add('en-relationship-verbs', 'Beziehungen: Verben', '🤝', ['English'], {
    kurz: 'Wichtige Verben und feste Wendungen rund um Familie und Freunde.',
    use: ['Das sind feste Wendungen (phrasal verbs). Lerne sie als ganzes Stück, nicht Wort für Wort.'],
    tip: 'Mit "get on with" und "get along with" sagt man dasselbe: sich gut verstehen mit jemandem.'
  }, [
    ['aufwachsen', 'grow up'],
    ['großziehen, erziehen', 'bring up'],
    ['sich gut verstehen mit', 'get on with/get along with'],
    ['sich zerstreiten mit', 'fall out with'],
    ['aufschauen zu, bewundern', 'look up to'],
    ['jemandem ähneln (in der Familie)', 'take after'],
    ['jemanden enttäuschen', 'let down'],
    ['sich verlassen auf', 'rely on/count on'],
    ['in Kontakt bleiben', 'keep in touch'],
    ['sich verlieben', 'fall in love'],
    ['Schluss machen, sich trennen', 'split up/break up'],
    ['heiraten', 'get married'],
    ['sich scheiden lassen', 'get divorced'],
    ['sich kümmern um', 'look after/take care of']
  ]);
})();
