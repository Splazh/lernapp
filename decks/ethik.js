// Ethik: STARTER-Themen aus allgemeinem Grundlagenwissen.
// Auf Eduvidual gibt es keinen Ethik-Kurs. Bitte mit den Themen aus dem Unterricht abgleichen und ergänzen.
(function () {
  const G = 'Starter (bitte mit dem Unterricht abgleichen)';
  const add = (id, title, icon, info, cards) => (window.DECKS = window.DECKS || []).push(
    { id, subject: 'ethik', group: G, title, icon, labels: ['Antwort'], noModes: ['pairs'], info, cards });

  add('ethik-grundbegriffe', 'Ethik: Grundbegriffe', '🤔', {
    kurz: 'Ethik, Moral, Werte und Normen. Das ist die Grundlage für alles Weitere.',
    form: [
      'Ethik ist die Wissenschaft von der Moral: Sie fragt, was gut und richtig ist und wie wir handeln sollen.',
      'Moral sind die Regeln und Werte, die in einer Gesellschaft tatsächlich gelten.',
      'Werte sind das, was uns wichtig ist (Freiheit, Gerechtigkeit). Normen sind Regeln, die sagen, wie man handeln soll.',
      'Ein Dilemma ist eine Entscheidung, bei der jede Möglichkeit einen Wert verletzt.'
    ],
    tip: 'Moral lebt man, Ethik denkt darüber nach.'
  }, [
    ['Was untersucht die Ethik?', 'Was gut und richtig ist und wie man handeln soll', { w: ['Wie das Wetter entsteht', 'Wie Gesetze geschrieben werden', 'Wie Sprache funktioniert'] }],
    ['Was ist Moral?', 'Die tatsächlich geltenden Regeln und Werte einer Gesellschaft', { w: ['Die Wissenschaft von der Natur', 'Ein einzelnes Gesetz', 'Eine Meinung ohne Gründe'] }],
    ['Was ist ein Wert?', 'Etwas, das als wichtig und wünschenswert gilt', { w: ['Ein Preis auf einem Zettel', 'Ein Gesetzestext', 'Eine Strafe'] }],
    ['Was ist eine Norm?', 'Eine Regel, die sagt, wie man handeln soll', { w: ['Ein wichtiger Wert', 'Ein Gefühl', 'Ein Naturgesetz'] }],
    ['Was ist ein moralisches Dilemma?', 'Eine Lage, in der jede Entscheidung einen Wert verletzt', { w: ['Eine Aufgabe mit nur einer richtigen Lösung', 'Ein Streit ohne Folgen', 'Ein Gesetz ohne Strafe'] }],
    ['Was ist das Gewissen?', 'Die innere Stimme, die Handlungen als gut oder schlecht bewertet', { w: ['Ein Gesetzbuch', 'Ein Teil des Körpers', 'Eine Meinung der anderen'] }],
    ['Was bedeutet Menschenwürde?', 'Jeder Mensch hat einen unverlierbaren Wert', { w: ['Nur Erwachsene haben Rechte', 'Würde muss man sich verdienen', 'Würde gibt es nur in der Verfassung'] }],
    ['Was behauptet der Relativismus?', 'Was moralisch richtig ist, hängt von Kultur und Standpunkt ab', { w: ['Es gibt nur eine richtige Moral für alle', 'Moral ist ein Naturgesetz', 'Moral ist unwichtig'] }]
  ]);

  add('ethik-theorien', 'Ethik: wichtige Theorien', '⚖️', {
    kurz: 'Kant, Utilitarismus, Tugendethik, Gesinnungs- und Verantwortungsethik.',
    form: [
      'Kant, kategorischer Imperativ: Handle nur nach der Regel, von der du wollen kannst, dass sie ein allgemeines Gesetz wird.',
      'Goldene Regel: Was du nicht willst, das man dir tu, das füg auch keinem andern zu.',
      'Utilitarismus (Bentham, Mill): Richtig ist, was den größten Nutzen für die meisten bringt.',
      'Tugendethik (Aristoteles): Es geht um den guten Charakter und gute Eigenschaften (Mut, Gerechtigkeit, Besonnenheit).',
      'Gesinnungsethik bewertet eine Handlung nach der Absicht, Verantwortungsethik nach den Folgen.'
    ],
    tip: 'Merksatz: Kant fragt "Darf das für alle gelten?", der Utilitarismus fragt "Was nützt den meisten?".'
  }, [
    ['Von wem stammt der kategorische Imperativ?', 'Immanuel Kant', { w: ['Aristoteles', 'John Stuart Mill', 'Max Weber'] }],
    ['Was verlangt der kategorische Imperativ?', 'Nur nach Regeln handeln, die für alle gelten könnten', { w: ['Immer den eigenen Vorteil suchen', 'Nur nach Gefühl handeln', 'Gesetze nie hinterfragen'] }],
    ['Welche Regel lautet: „Was du nicht willst, dass man dir tu ..."?', 'die Goldene Regel', { w: ['der kategorische Imperativ', 'das Nützlichkeitsprinzip', 'die Tugendregel'] }],
    ['Nach welcher Theorie ist richtig, was den größten Nutzen für die meisten bringt?', 'Utilitarismus', { w: ['Tugendethik', 'Gesinnungsethik', 'Relativismus'] }],
    ['Welche Theorie stellt den guten Charakter in den Mittelpunkt?', 'Tugendethik', { w: ['Utilitarismus', 'Verantwortungsethik', 'Dilemma-Ethik'] }],
    ['Welcher Philosoph steht für die Tugendethik?', 'Aristoteles', { w: ['Kant', 'Bentham', 'Max Weber'] }],
    ['Wonach bewertet die Gesinnungsethik eine Handlung?', 'nach der Absicht', { w: ['nach den Folgen', 'nach dem Gesetz', 'nach der Zahl der Zuschauer'] }],
    ['Wonach bewertet die Verantwortungsethik eine Handlung?', 'nach den Folgen', { w: ['nach der Absicht', 'nach der Tradition', 'nach dem Zufall'] }]
  ]);
})();
