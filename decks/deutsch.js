// Deutsch 1 (Modul 1): Wortgrammatik, Fälle, Kommunikation, Lesestile und Selbstbild/Fremdbild.
// Grundlage: Unterrichtsfolien und Arbeitsblätter auf Eduvidual. Alle Karten und Beispielsätze sind selbst geschrieben.
(function () {
  const add = (group, id, title, icon, labels, extra, info, cards) => (window.DECKS = window.DECKS || []).push(
    Object.assign({ id, subject: 'deutsch', group, title, icon, labels, noModes: ['pairs'], info, cards }, extra));
  const W = 'Wortgrammatik';
  const K = 'Kommunikation und Lesen';

  add(W, 'de-wortarten', 'Wortarten bestimmen', '🔤', ['Wortart'], {
    pool: ['Verb', 'Nomen', 'Artikel', 'Pronomen', 'Adjektiv', 'Numerale', 'Adverb', 'Präposition', 'Konjunktion', 'Interjektion']
  }, {
    kurz: 'Es gibt zehn Wortarten. Dieses Thema übt, sie zu erkennen.',
    form: [
      'Verb (Tun-Wort): wird klein geschrieben und konjugiert (Person, Zahl, Zeit).',
      'Nomen (Hauptwort): wird groß geschrieben und dekliniert (Geschlecht, Zahl, Fall).',
      'Artikel (Begleiter): der, die, das, ein, eine ... Er trägt Geschlecht, Zahl und Fall des Nomens.',
      'Pronomen (Fürwort): ersetzt oder begleitet ein Nomen: ich, du, mein, dieser ...',
      'Adjektiv (Wiewort): beschreibt Nomen (das große Auto) und kann gesteigert werden (groß, größer, am größten).',
      'Numerale (Zahlwort): zwanzig, dritter, dreifach, ein Drittel.',
      'Adverb (Umstandswort): Angaben zu Ort, Zeit, Grund, Art und Weise: dort, gestern, deshalb, plötzlich.',
      'Präposition (Vorwort): steht vor Nomen oder Pronomen und bestimmt den Fall: mit, in, wegen.',
      'Konjunktion (Bindewort): verbindet Wörter und Sätze: und, oder, weil, dass.',
      'Interjektion: Ausruf oder Empfindung, steht meist außerhalb des Satzes: Oh! Hurra! Autsch!'
    ],
    use: ['Veränderlich (konjugiert oder dekliniert) sind Verb, Nomen, Artikel, Pronomen, Adjektiv und teils Numerale. Unveränderlich sind Adverb, Präposition, Konjunktion und Interjektion.'],
    tip: 'Verschiebeprobe: Ein Adverb kann man allein im Satz verschieben (Morgen gehe ich ins Kino / Ich gehe morgen ins Kino). Eine Präposition nicht.'
  }, [
    ['„gestern" (Wir waren gestern im Kino.)', 'Adverb'],
    ['„weil" (Ich lerne, weil ich Matura mache.)', 'Konjunktion'],
    ['„Student" (Der Student lernt.)', 'Nomen'],
    ['„die" (die Wohnung)', 'Artikel'],
    ['„ich" (Ich lerne.)', 'Pronomen'],
    ['„laufen" (Wir laufen nach Hause.)', 'Verb'],
    ['„Oh" (Oh, das habe ich nicht gewusst!)', 'Interjektion'],
    ['„drei" (drei Bücher)', 'Numerale'],
    ['„mit" (mit dem Auto)', 'Präposition'],
    ['„schönes" (ein schönes Haus)', 'Adjektiv'],
    ['„und" (Tee und Kaffee)', 'Konjunktion'],
    ['„Liebe" (Die Liebe ist stark.)', 'Nomen'],
    ['„dort" (Dort steht ein Baum.)', 'Adverb'],
    ['„dass" (Ich glaube, dass du recht hast.)', 'Konjunktion'],
    ['„wegen" (wegen des Regens)', 'Präposition'],
    ['„sein" (Er will Arzt sein.)', 'Verb'],
    ['„mein" (mein Buch)', 'Pronomen'],
    ['„ein" (ein Auto)', 'Artikel'],
    ['„Hurra" (Hurra, wir haben gewonnen!)', 'Interjektion'],
    ['„zehn" (zehn Minuten)', 'Numerale'],
    ['„plötzlich" (Plötzlich ging das Licht aus.)', 'Adverb'],
    ['„unter" (unter dem Tisch)', 'Präposition'],
    ['„wir" (Wir kommen später.)', 'Pronomen'],
    ['„groß" (das große Auto)', 'Adjektiv'],
    ['„Autsch" (Autsch, das tut weh!)', 'Interjektion'],
    ['„obwohl" (Er kam, obwohl er müde war.)', 'Konjunktion'],
    ['„heute" (Wir lernen heute.)', 'Adverb'],
    ['„Verzweiflung" (Seine Verzweiflung war groß.)', 'Nomen']
  ]);

  add(W, 'de-wortarten-unter', 'Wortarten: Unterarten', '🧩', ['Antwort'], {}, {
    kurz: 'Pronomen, Adverbien, Verben und Konjunktionen haben Unterarten. Die prüft man gern.',
    form: [
      'Pronomen (7): Personal- (ich), Possessiv- (mein), Reflexiv- (sich), Demonstrativ- (diese), Relativ- (der, die, das), Interrogativ- (wer, was), Indefinit- (man, alle, jemand).',
      'Adverbien (6): lokal (dort), temporal (gestern), kausal (deshalb), modal (plötzlich), Pronominaladverb (dadurch), Konjunktionaladverb (allerdings).',
      'Verben (3): Vollverb, Modalverb (können, müssen, wollen, sollen, dürfen, mögen, lassen), Hilfsverb (haben, sein, werden).',
      'Konjunktionen (2): nebenordnend (und, oder) und unterordnend (weil, obwohl, dass; sie leiten einen Nebensatz ein).',
      'Nomen (2): konkret (Stein, Flasche) und abstrakt (Liebe, Verzweiflung). Ein Kompositum ist zusammengesetzt (Taschengeld).'
    ]
  }, [
    ['Wie viele Arten von Pronomen gibt es?', '7', { w: ['5', '6', '10'] }],
    ['„mein, dein, sein" sind ...', 'Possessivpronomen', { w: ['Personalpronomen', 'Reflexivpronomen', 'Demonstrativpronomen'] }],
    ['„mich, dich, sich" sind ...', 'Reflexivpronomen', { w: ['Possessivpronomen', 'Personalpronomen', 'Relativpronomen'] }],
    ['„diese, jene, das" (hinweisend) sind ...', 'Demonstrativpronomen', { w: ['Indefinitpronomen', 'Possessivpronomen', 'Reflexivpronomen'] }],
    ['„der, die, das" leiten einen Nebensatz ein: ...', 'Relativpronomen', { w: ['Demonstrativpronomen', 'Personalpronomen', 'Interrogativpronomen'] }],
    ['„wer, was, wem, wen, wessen" sind ...', 'Interrogativpronomen', { w: ['Relativpronomen', 'Indefinitpronomen', 'Personalpronomen'] }],
    ['„kein, alle, jemand, man, nichts" sind ...', 'Indefinitpronomen', { w: ['Interrogativpronomen', 'Demonstrativpronomen', 'Possessivpronomen'] }],
    ['„ich, du, er, sie, es" sind ...', 'Personalpronomen', { w: ['Possessivpronomen', 'Reflexivpronomen', 'Indefinitpronomen'] }],
    ['Adverb „dort" (Wo?) ist ein ...', 'Lokaladverb', { w: ['Temporaladverb', 'Kausaladverb', 'Modaladverb'] }],
    ['Adverb „gestern" (Wann?) ist ein ...', 'Temporaladverb', { w: ['Lokaladverb', 'Modaladverb', 'Kausaladverb'] }],
    ['Adverb „deshalb" (Warum?) ist ein ...', 'Kausaladverb', { w: ['Temporaladverb', 'Lokaladverb', 'Modaladverb'] }],
    ['Adverb „plötzlich" oder „leider" (Wie?) ist ein ...', 'Modaladverb', { w: ['Kausaladverb', 'Lokaladverb', 'Temporaladverb'] }],
    ['„können, müssen, wollen" sind ...', 'Modalverben', { w: ['Hilfsverben', 'Vollverben', 'Reflexivverben'] }],
    ['„haben, sein, werden" helfen bei der Zeitform. Sie sind ...', 'Hilfsverben', { w: ['Modalverben', 'Vollverben', 'Kompositumverben'] }],
    ['Ein Verb, das das einzige Verb im Satz ist, heißt ...', 'Vollverb', { w: ['Hilfsverb', 'Modalverb', 'Reflexivverb'] }],
    ['„und, oder" sind ...', 'nebenordnende Konjunktionen', { w: ['unterordnende Konjunktionen', 'Adverbien', 'Präpositionen'] }],
    ['„weil, obwohl, dass" leiten einen Nebensatz ein. Sie sind ...', 'unterordnende Konjunktionen', { w: ['nebenordnende Konjunktionen', 'Adverbien', 'Präpositionen'] }],
    ['„Stein" und „Flasche" sind ...', 'konkrete Nomen', { w: ['abstrakte Nomen', 'Komposita', 'Adjektive'] }],
    ['„Liebe" und „Verzweiflung" sind ...', 'abstrakte Nomen', { w: ['konkrete Nomen', 'Komposita', 'Verben'] }],
    ['„Taschengeld" ist ein zusammengesetztes Nomen, also ein ...', 'Kompositum', { w: ['Konkretum', 'Abstraktum', 'Artikel'] }],
    ['Wie erkennst du ein Adverb (statt einer Präposition)?', 'Es lässt sich allein im Satz verschieben', { w: ['Es steht immer vor einem Nomen', 'Es wird immer groß geschrieben', 'Es lässt sich konjugieren'] }]
  ]);

  add(W, 'de-faelle', 'Die vier Fälle', '🎯', ['Fall'], {
    pool: ['Nominativ', 'Genitiv', 'Dativ', 'Akkusativ']
  }, {
    kurz: 'Jeder Fall hat eine Frage. Mit ihr findest du den Fall.',
    form: [
      '1. Fall Nominativ: Wer oder was? Der Student lernt für die Prüfung.',
      '2. Fall Genitiv: Wessen? Die Prüfung des Studenten war schwer.',
      '3. Fall Dativ: Wem? Der Professor gibt dem Studenten seine Unterlagen.',
      '4. Fall Akkusativ: Wen oder was? Der Professor unterstützt den Studenten.'
    ],
    tip: 'Stell die Frage zum markierten Wort: Wer oder was? ist Nominativ, Wessen? ist Genitiv, Wem? ist Dativ, Wen oder was? ist Akkusativ.'
  }, [
    ['Der Hund bellt laut. Fall von „Der Hund"?', 'Nominativ'],
    ['Ich sehe den Hund. Fall von „den Hund"?', 'Akkusativ'],
    ['Ich gebe dem Hund Wasser. Fall von „dem Hund"?', 'Dativ'],
    ['Das Fell des Hundes ist braun. Fall von „des Hundes"?', 'Genitiv'],
    ['Die Katze schläft. Fall von „Die Katze"?', 'Nominativ'],
    ['Wir besuchen die Oma. Fall von „die Oma"?', 'Akkusativ'],
    ['Ich helfe der Nachbarin. Fall von „der Nachbarin"?', 'Dativ'],
    ['Das Auto meines Vaters ist alt. Fall von „meines Vaters"?', 'Genitiv'],
    ['Er schenkt seiner Mutter Blumen. Fall von „seiner Mutter"?', 'Dativ'],
    ['Wir kaufen einen Apfel. Fall von „einen Apfel"?', 'Akkusativ'],
    ['Der Lärm der Kinder stört mich. Fall von „der Kinder"?', 'Genitiv'],
    ['Das Kind spielt im Garten. Fall von „Das Kind"?', 'Nominativ'],
    ['Welcher Fall antwortet auf „Wessen?"', 'Genitiv'],
    ['Welcher Fall antwortet auf „Wem?"', 'Dativ'],
    ['Welcher Fall antwortet auf „Wen oder was?"', 'Akkusativ'],
    ['Welcher Fall antwortet auf „Wer oder was?"', 'Nominativ']
  ]);

  add(K, 'de-kommunikation', 'Kommunikation', '💬', ['Antwort'], {}, {
    kurz: 'Wie wir kommunizieren, warum wir es tun und wie Missverständnisse entstehen.',
    form: [
      'Nonverbal (Gesten, Körperhaltung), verbal (gesprochene Worte), analog (Zeichnungen, Schrift), digital (Textnachrichten, Fotos, Videos, Sprachnachrichten).',
      'Menschen sind soziale Wesen. Kommunikation gibt Informationen und Wissen weiter und sichert so das Überleben der Gruppe.',
      'Gemeinsame Normen (Wortschatz, Grammatik, Rechtschreibung, Höflichkeit, Gesprächsregeln) machen Verständnis möglich.'
    ],
    use: [
      'Paul Watzlawick: "Man kann nicht nicht kommunizieren." Jede Kommunikation hat einen Inhalts- und einen Beziehungsaspekt.',
      'Eisberg-Modell (nach Sigmund Freud): Der Inhalt ist nur die sichtbare Spitze, die Beziehung liegt darunter.',
      'Das 4-Ohren-Modell von Schulz von Thun zeigt vier Seiten einer Nachricht: Sache, Selbstoffenbarung, Beziehung, Appell.'
    ],
    tip: 'Gegen Missverständnisse: sachlich bleiben, aktiv zuhören (Blickkontakt, nachfragen, ausreden lassen, Gesagtes wiederholen) und Ich-Botschaften verwenden.'
  }, [
    ['Von wem stammt der Satz „Man kann nicht nicht kommunizieren"?', 'Paul Watzlawick', { w: ['Sigmund Freud', 'Schulz von Thun', 'Loriot'] }],
    ['Jede Kommunikation hat einen ___ und einen Beziehungsaspekt.', 'Inhaltsaspekt', { w: ['Gefühlsaspekt', 'Sprachaspekt', 'Zeitaspekt'] }],
    ['Welches Modell vergleicht Kommunikation mit einem Eisberg?', 'Eisberg-Modell', { w: ['4-Ohren-Modell', 'Sender-Modell', 'Watzlawick-Regel'] }],
    ['Von wem stammt das 4-Ohren-Modell?', 'Schulz von Thun', { w: ['Paul Watzlawick', 'Sigmund Freud', 'Loriot'] }],
    ['Welches Ohr hört: „Was ist die Information?"', 'Sachohr', { w: ['Appellohr', 'Beziehungsohr', 'Selbstoffenbarungsohr'] }],
    ['Welches Ohr hört: „Was sagt der andere über sich?"', 'Selbstoffenbarungsohr', { w: ['Sachohr', 'Appellohr', 'Beziehungsohr'] }],
    ['Welches Ohr hört: „Was hält der andere von mir?"', 'Beziehungsohr', { w: ['Sachohr', 'Appellohr', 'Selbstoffenbarungsohr'] }],
    ['Welches Ohr hört: „Was soll ich tun?"', 'Appellohr', { w: ['Sachohr', 'Beziehungsohr', 'Selbstoffenbarungsohr'] }],
    ['Zeigegesten und Körperhaltung sind ___ Kommunikation.', 'nonverbale', { w: ['verbale', 'digitale', 'analoge'] }],
    ['Zeichnungen und Schrift sind ___ Kommunikation.', 'analoge', { w: ['digitale', 'nonverbale', 'verbale'] }],
    ['Textnachrichten, Fotos und Sprachnachrichten sind ___ Kommunikation.', 'digitale', { w: ['analoge', 'nonverbale', 'verbale'] }],
    ['Menschen sind ___ Wesen und kommunizieren deshalb.', 'soziale', { w: ['einsame', 'stumme', 'digitale'] }],
    ['Was gehört NICHT zum aktiven Zuhören?', 'Dem anderen ins Wort fallen', { w: ['Blickkontakt halten', 'Bei Unklarheiten nachfragen', 'Das Gesagte in eigenen Worten wiederholen'] }],
    ['Womit sagt man seine Meinung, ohne zu beschuldigen?', 'Mit Ich-Botschaften', { w: ['Mit Du-Botschaften', 'Mit Befehlen', 'Mit Schweigen'] }],
    ['Warum kann man „nicht nicht kommunizieren"?', 'Auch Schweigen und Körperhaltung senden eine Botschaft', { w: ['Weil man immer sprechen muss', 'Weil nur Worte zählen', 'Weil Schreiben Pflicht ist'] }]
  ]);

  add(K, 'de-lesestile', 'Lesestile und PQ4R', '📖', ['Antwort'], {}, {
    kurz: 'Je nach Ziel liest man anders. PQ4R ist eine Methode, einen Text zu lernen.',
    form: [
      'Überfliegendes Lesen: einen Überblick gewinnen (Titel, Überschriften, erste Sätze).',
      'Suchendes Lesen: gezielt eine bestimmte Information finden (eine Zahl, einen Namen).',
      'Detailliertes Lesen: genau lesen, um alles zu verstehen.',
      'Analytisches Lesen: Aufbau, Absicht und Wirkung eines Textes untersuchen.'
    ],
    use: [
      'PQ4R heißt: Preview (Überblick), Questions (Fragen stellen), Read (lesen), Reflect (nachdenken, verstehen), Recite (in eigenen Worten wiedergeben), Review (Rückblick und Wiederholung).'
    ],
    tip: 'Erst überfliegen, dann Fragen stellen, dann genau lesen. So bleibt mehr hängen als beim bloßen Durchlesen.'
  }, [
    ['Ich will nur wissen, worum es geht: Titel und Überschriften anschauen.', 'überfliegendes Lesen', { w: ['suchendes Lesen', 'detailliertes Lesen', 'analytisches Lesen'] }],
    ['Ich suche im Text eine bestimmte Jahreszahl.', 'suchendes Lesen', { w: ['überfliegendes Lesen', 'detailliertes Lesen', 'analytisches Lesen'] }],
    ['Ich lese genau, damit ich alles verstehe.', 'detailliertes Lesen', { w: ['überfliegendes Lesen', 'suchendes Lesen', 'analytisches Lesen'] }],
    ['Ich untersuche Aufbau, Absicht und Wirkung des Textes.', 'analytisches Lesen', { w: ['überfliegendes Lesen', 'suchendes Lesen', 'detailliertes Lesen'] }],
    ['PQ4R: Überblick verschaffen (Überschriften, Gliederung).', 'Preview', { w: ['Questions', 'Recite', 'Review'] }],
    ['PQ4R: eigene Fragen zum Text formulieren.', 'Questions', { w: ['Preview', 'Reflect', 'Review'] }],
    ['PQ4R: den Text lesen und dabei die Fragen beantworten.', 'Read', { w: ['Recite', 'Review', 'Preview'] }],
    ['PQ4R: verstehen und mit dem eigenen Wissen verknüpfen.', 'Reflect', { w: ['Recite', 'Preview', 'Questions'] }],
    ['PQ4R: das Gelesene in eigenen Worten wiedergeben.', 'Recite', { w: ['Reflect', 'Read', 'Preview'] }],
    ['PQ4R: Rückblick und Wiederholung am Ende.', 'Review', { w: ['Recite', 'Questions', 'Reflect'] }],
    ['Wofür steht das P bei PQ4R?', 'Preview', { w: ['Plan', 'Present', 'Practice'] }],
    ['Wie viele R hat PQ4R?', '4', { w: ['2', '3', '6'] }]
  ]);

  add(K, 'de-selbstbild', 'Selbstbild und Fremdbild', '🪞', ['Antwort'], {}, {
    kurz: 'Wie ich mich sehe, wie andere mich sehen und wie man eine Figur im Text beschreibt.',
    form: [
      'Selbstbild: So sieht sich ein Mensch selbst.',
      'Fremdbild: So sehen andere diesen Menschen.',
      'Bei literarischen Texten gibt es zwei Arten von Informationen: Was direkt im Text steht und was man daraus erschließen kann.'
    ],
    use: ['Beispiel: Wenn eine Figur viel lacht und keine Angst vor Hunden hat, kann man erschließen, dass sie humorvoll und tierlieb ist.'],
    tip: 'Belege immer mit der Textstelle (Zeile angeben), dann beschreibe, was du daraus erschließt.'
  }, [
    ['Wie nennt man das Bild, das jemand von sich selbst hat?', 'Selbstbild', { w: ['Fremdbild', 'Vorbild', 'Leitbild'] }],
    ['Wie nennt man das Bild, das andere von jemandem haben?', 'Fremdbild', { w: ['Selbstbild', 'Wunschbild', 'Spiegelbild'] }],
    ['Was steht „direkt im Text"?', 'Aussagen, die man wörtlich belegen kann', { w: ['Meine Vermutungen', 'Dinge, die zwischen den Zeilen stehen', 'Meine Meinung zum Text'] }],
    ['Was bedeutet „etwas erschließen"?', 'Aus dem Text etwas ableiten, das nicht wörtlich dasteht', { w: ['Eine Textstelle abschreiben', 'Den Text auswendig lernen', 'Den Text kürzen'] }],
    ['Eine Figur lacht viel und hat keine Angst vor Hunden. Was kann man erschließen?', 'humorvoll und tierlieb', { w: ['traurig und ängstlich', 'streng und kalt', 'unsportlich und faul'] }],
    ['Eine Figur glaubt, die falschen Eltern zu haben, und träumt von den Sternen. Was kann man erschließen?', 'verträumt', { w: ['sportlich', 'nüchtern', 'wütend'] }]
  ]);
})();
