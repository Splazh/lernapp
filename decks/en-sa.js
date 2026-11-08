// Englisch: Schularbeit 11.11. (Topic 1 Family and Friends). Aufbau laut Folien vom 4.11., Aufgaben selbst formuliert.
(function () {
  const G = 'Schularbeit 11.11.';
  const add = (id, title, icon, labels, info, cards) => (window.DECKS = window.DECKS || []).push(
    { id, subject: 'englisch', group: G, title, icon, labels, noModes: ['pairs'], info, cards });

  add('en-sa-aufbau', 'Schularbeit: Aufbau und Tipps', '🗓️', ['Antwort'], {
    kurz: 'Was dich am Mittwoch erwartet.',
    form: [
      'Dauer: 45 Minuten (eine Unterrichtsstunde).',
      'Aufgaben: 1 x Listening, 1 x Reading, 2 x Language in Use (Grammatik und Wortschatz).',
      'Thema aller Aufgaben: Family and Friends.',
      'Stoff: Wortschatz Unit 1 und 2 (hinten im Buch), Present Simple, Present Continuous, Past Simple, Past Continuous.'
    ],
    use: [
      'Vorbereiten: Extra Material und Test Yourself von Topic 1 machen, Lösungen stehen hinten im Buch.',
      'Alle Übungen von Topic 1 machen, die ihr in der Klasse nicht gemacht habt.',
      'Bei Fragen oder fehlenden Lösungen: E-Mail oder Nachricht auf Eduvidual an die Lehrerin.'
    ],
    tip: 'Lies bei Listening die Fragen vorher, dann weißt du, worauf du achten musst. Bei Open gap fill zählt die Rechtschreibung.'
  }, [
    ['Wie lange dauert die Schularbeit?', '45 Minuten', { w: ['60 Minuten', '90 Minuten', '30 Minuten'] }],
    ['Wie viele Listening-Aufgaben gibt es?', '1', { w: ['2', '3', '0'] }],
    ['Wie viele Reading-Aufgaben gibt es?', '1', { w: ['2', '3', '4'] }],
    ['Wie viele Language-in-Use-Aufgaben gibt es?', '2', { w: ['1', '3', '4'] }],
    ['Was bedeutet Language in Use?', 'Grammatik und Wortschatz anwenden', { w: ['Texte schreiben', 'Hörverstehen', 'Sprechen'] }],
    ['Welches Thema haben die Aufgaben?', 'Family and Friends', { w: ['School', 'Travel', 'Work'] }],
    ['Welche Zeitformen kommen dran?', 'Present Simple, Present Continuous, Past Simple, Past Continuous', { w: ['Present Perfect und Future', 'nur Past Simple', 'alle englischen Zeiten'] }],
    ['Wo steht der Wortschatz von Unit 1 und 2?', 'hinten im Buch', { w: ['nur auf Eduvidual', 'in den Folien', 'im Workbook'] }],
    ['Wann ist die Schularbeit?', 'Mittwoch, 11. November', { w: ['Mittwoch, 4. November', 'Mittwoch, 20. Jänner', 'Freitag, 13. November'] }]
  ]);

  add('en-sa-gapfill', 'Language in Use: Lückentext', '✍️', ['Lücke'], {
    kurz: 'Ein Wort pro Lücke, typische Sätze zu Family and Friends.',
    form: [
      'Open gap fill: ein passendes Wort pro Lücke, oft Präposition, Hilfsverb oder Teil einer festen Wendung.',
      'Erst die Zeitform bestimmen (Signalwörter!), dann die richtige Form bilden.',
      'Wendungen und Phrasal Verbs auswendig kennen: get on with, fall out with, look after, bring up.'
    ],
    tip: 'Lies den ganzen Satz, auch den Teil nach der Lücke. Dort steht oft das Signalwort für die Zeitform.'
  }, [
    ['My sister ___ on very well with her stepbrother.', 'gets', { w: ['get', 'is getting', 'got'] }],
    ['We ___ up in a small village in the mountains.', 'grew', { w: ['grow', 'were growing', 'growed'] }],
    ['I always ___ after my little cousin when my aunt is at work.', 'look', { w: ['looks', 'am looking', 'looked'] }],
    ['Last year they ___ out with each other and did not speak for months.', 'fell', { w: ['fall', 'falled', 'were falling'] }],
    ['He ___ up to his older brother when he was a child.', 'looked', { w: ['looks', 'was looking', 'look'] }],
    ['My parents ___ (not/let) us stay out late when we were teenagers.', "didn't let", { w: ["don't let", "weren't letting", "didn't let us"] }],
    ['Where ___ your grandparents live before they moved here?', 'did', { w: ['do', 'were', 'are'] }],
    ['I ___ (talk) to my best friend on the phone when you rang.', 'was talking', { w: ['talked', 'am talking', 'were talking'] }],
    ['Be quiet, please! The baby ___ (sleep).', 'is sleeping', { w: ['sleeps', 'was sleeping', 'sleep'] }],
    ['She usually ___ (have) dinner with her family at seven.', 'has', { w: ['is having', 'have', 'had'] }],
    ['While Dad ___ (cook), the children ___ (set) the table.', 'was cooking / were setting', { w: ['cooked / set', 'is cooking / are setting', 'was cooking / set'] }],
    ['Last July, my cousins ___ (visit) us for two weeks.', 'visited', { w: ['visit', 'were visiting', 'visits'] }],
    ['My brother is ___ (always/borrow) my clothes! It is so annoying.', 'always borrowing', { w: ['always borrows', 'always borrowed', 'always borrow'] }],
    ['At nine o\'clock last night I ___ (watch) a film with my parents.', 'was watching', { w: ['watched', 'am watching', 'watch'] }]
  ]);

  add('en-sa-mc', 'Language in Use: Multiple Choice', '🔘', ['Antwort'], {
    kurz: 'Eine richtige Antwort, Wortschatz und Grammatik gemischt.',
    use: ['Streiche zuerst die Antworten, die grammatikalisch nicht passen. Dann entscheidet die Bedeutung.'],
    tip: 'Prüfe bei Zeitformen immer die Signalwörter: usually, now, yesterday, while, at that moment.'
  }, [
    ['Her parents are divorced, so she lives in a ___ family.', 'single-parent', { w: ['nuclear', 'extended', 'great'] }],
    ['My mother\'s sister is my ___.', 'aunt', { w: ['niece', 'cousin', 'sister-in-law'] }],
    ['My brother\'s daughter is my ___.', 'niece', { w: ['nephew', 'aunt', 'cousin'] }],
    ['Doing a ___ share of the housework means everyone helps equally.', 'fair', { w: ['little', 'fine', 'right'] }],
    ['After the wedding, the couple ___ their own household.', 'set up', { w: ['put up', 'took up', 'broke up'] }],
    ['I can\'t ___ his rude behaviour any longer.', 'put up with', { w: ['look up to', 'get on with', 'take after'] }],
    ['A ___ is a chore you do around the house.', 'task', { w: ['gripe', 'bill', 'attitude'] }],
    ['The ___ between my grandma and me is 60 years.', 'age gap', { w: ['arrangement', 'attitude', 'separation'] }],
    ['Every Saturday he ___ his grandmother.', 'visits', { w: ['is visiting', 'visited', 'visit'] }],
    ['Look! The children ___ in the garden.', 'are playing', { w: ['play', 'played', 'were playing'] }],
    ['When I was little, I ___ to eat ice cream every day.', 'used', { w: ['use', 'was using', 'am used'] }],
    ['I ___ the phone when the doorbell rang. (zwei Handlungen)', 'was answering', { w: ['answered', 'am answering', 'answer'] }]
  ]);

  add('en-sa-peer', 'Peer Support und Bullying', '🤝', ['Wort'], {
    kurz: 'Wörter aus den Hörtexten von Lesson 4 (Buch S. 36 bis 43).',
    use: ['Zu jedem Fall passt eine Form von Unterstützung: buddy scheme, counselling, mediation, mentoring.'],
    tip: 'Mediation heißt, ein Dritter hilft bei einem Streit. Counselling ist Beratung, Mentoring ist längere Begleitung durch jemanden mit Erfahrung.'
  }, [
    ['Schülerhilfe unter Gleichaltrigen', 'peer support'], ['Patenschaft für neue Schüler', 'buddy scheme'], ['Beratung', 'counselling'],
    ['Vermittlung bei Streit', 'mediation'], ['Begleitung durch eine erfahrene Person', 'mentoring'], ['Mobbing', 'bullying'],
    ['Opfer', 'victim'], ['Täter(in), Schikanierer(in)', 'bully'], ['Zuhören', 'listen'], ['Streit schlichten', 'settle an argument'],
    ['sich ausgeschlossen fühlen', 'feel left out'], ['jemandem zur Seite stehen, unterstützen', 'support']
  ]);
})();
