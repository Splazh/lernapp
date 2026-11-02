// Englisch: Testformate (SRDP) und Word formation.
// Die Formate stammen aus den Folien "SRDP Test Formats" der Lehrerin, die Wortbildungs-Sätze sind eigene.
(function () {
  const G = 'Test-Vorbereitung';
  const add = (id, title, icon, labels, info, cards, extra) => (window.DECKS = window.DECKS || []).push(
    Object.assign({ id, subject: 'englisch', group: G, title, icon, labels, noModes: ['pairs'], info, cards }, extra));

  add('en-srdp-formate', 'SRDP-Testformate', '📋', ['Antwort'], {
    kurz: 'So ist der Englisch-Test (Matura-Format) aufgebaut.',
    form: [
      'Vier Prüfungsteile, jeder zählt 1/4: Reading, Listening, Language in Use, Writing.',
      'Reading: 60 Minuten, 4 Teilaufgaben. Listening: B1 max. 40 Minuten, 4 Teilaufgaben.',
      'Language in Use: 45 Minuten, 4 Teilaufgaben. Writing: B1 125 Minuten, 2 Aufgaben.'
    ],
    use: [
      'Note form: Fragen beantworten oder Sätze ergänzen, höchstens 4 Wörter, meist mit eigenen Wörtern.',
      'Multiple choice: eine richtige Antwort (A bis D), die falschen kommen auch im Text vor.',
      'Multiple matching: Textteile oder Überschriften zuordnen, zwei sind übrig. Bei mehreren Texten darf man einen Text mehrfach benutzen.',
      'True/false with justification: richtig oder falsch und die ersten 4 Wörter des passenden Satzes.',
      'Language in Use: Word formation, Banked gap fill (zwei Extra-Wörter), Open gap fill (ein Wort pro Lücke), Multiple choice.',
      'Writing: Formal e-mail (Enquiry, Complaint), Blog (Entry, Comment), Report, Article, Essay.'
    ],
    tip: 'Bei Note form und Open gap fill zählt die Rechtschreibung. Bei Multiple choice kommen falsche Antworten oft wörtlich im Text vor, achte auf Synonyme.'
  }, [
    ['Wie viele Prüfungsteile hat die SRDP?', '4', { w: ['3', '5', '6'] }],
    ['Wie heißt "Sprachverwendung im Kontext" auf Englisch?', 'Language in Use', { w: ['Use of Speech', 'Grammar Test', 'Writing Skills'] }],
    ['Wie lange dauert das Reading?', '60 Minuten', { w: ['45 Minuten', '40 Minuten', '125 Minuten'] }],
    ['Wie lange dauert Language in Use?', '45 Minuten', { w: ['60 Minuten', '40 Minuten', '90 Minuten'] }],
    ['Wie lange dauert Writing (B1)?', '125 Minuten', { w: ['60 Minuten', '45 Minuten', '90 Minuten'] }],
    ['Wie lange dauert Listening (B1) höchstens?', '40 Minuten', { w: ['60 Minuten', '45 Minuten', '125 Minuten'] }],
    ['Wie viel zählt jeder der vier Teile?', 'ein Viertel', { w: ['ein Drittel', 'ein Fünftel', 'die Hälfte'] }],
    ['Note form: Wie viele Wörter darf eine Antwort höchstens haben?', '4', { w: ['2', '3', '6'] }],
    ['Multiple matching (gap-fill): Wie viele Textteile sind übrig?', '2', { w: ['0', '1', '3'] }],
    ['Multiple matching mit mehreren Texten: Darf man einen Text mehrfach wählen?', 'Ja', { w: ['Nein', 'Nur zweimal', 'Nur bei Überschriften'] }],
    ['True/false with justification: Was schreibst du als Begründung?', 'die ersten 4 Wörter des Satzes', { w: ['den ganzen Satz', 'ein eigenes Wort', 'nur die Zeilennummer'] }],
    ['Open gap fill: Wie viele Wörter kommen in jede Lücke?', 'ein Wort', { w: ['zwei Wörter', 'bis zu vier Wörter', 'ein Satz'] }],
    ['Banked gap fill: Wie viele Wörter sind zu viel (Extra-Wörter)?', '2', { w: ['0', '1', '5'] }],
    ['Welche Textsorte gehört NICHT zu Writing?', 'Dating profile', { w: ['Report', 'Essay', 'Blog comment'] }],
    ['Ab wie viel Prozent gibt es in den Englischkursen eine 1?', '90 %', { w: ['80 %', '95 %', '85 %'] }],
    ['Ab wie viel Prozent gibt es eine 4 (Sufficient)?', '60 %', { w: ['50 %', '65 %', '70 %'] }]
  ]);

  add('en-word-formation', 'Word formation', '🧱', ['Wort'], {
    kurz: 'Bilde aus dem Wort in Klammern das Wort, das in die Lücke passt.',
    form: [
      'Erst fragen: Welche Wortart fehlt? Nomen, Verb, Adjektiv oder Adverb?',
      'Typische Endungen: Nomen -tion, -ment, -ness, -ship, -ence; Adjektive -ive, -ful, -y, -able, -ing/-ed; Adverb -ly.',
      'Manchmal braucht man das Gegenteil: un-, im-, in-, dis- oder eine Zahlform (two → twice).'
    ],
    tip: '-ing beschreibt die Sache (The film was boring). -ed beschreibt das Gefühl der Person (I was bored).'
  }, [
    ['She is a very ___ (create) person.', 'creative', { w: ['creation', 'creatively', 'creator'] }],
    ['His ___ (friend) with Tom is very important to him.', 'friendship', { w: ['friendly', 'friendliness', 'friends'] }],
    ['The ___ (decide) was difficult for everyone.', 'decision', { w: ['decisive', 'decided', 'decidely'] }],
    ['He speaks very ___ (quiet).', 'quietly', { w: ['quiet', 'quietness', 'quieter'] }],
    ['I was ___ (disappoint) by the film.', 'disappointed', { w: ['disappointing', 'disappointment', 'disappointedly'] }],
    ['My grandfather is a very ___ (health) man.', 'healthy', { w: ['healthily', 'health', 'healthful'] }],
    ['The ___ (invent) of the telephone changed the world.', 'invention', { w: ['inventor', 'inventive', 'inventing'] }],
    ['She ___ (usual) gets up at six.', 'usually', { w: ['usual', 'usualness', 'unusual'] }],
    ['There are many ___ (differ) between the two cultures.', 'differences', { w: ['different', 'differently', 'differing'] }],
    ['He was ___ (luck) to find a seat on the train.', 'lucky', { w: ['luckily', 'luck', 'luckiness'] }],
    ['They live in a ___ (peace) village in the mountains.', 'peaceful', { w: ['peacefully', 'peace', 'peaceable'] }],
    ['We need more ___ (inform) about the course.', 'information', { w: ['informative', 'informed', 'informal'] }]
  ]);
})();
