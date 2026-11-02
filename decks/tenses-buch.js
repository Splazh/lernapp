// Stoffpakete passend zum Schulbuch (Unit 1 und 2): Stative Verbs, used to, und die Vergleiche Simple/Progressive.
// Eigene Sätze. Karte = [Satz mit ___, richtige Antwort (Varianten mit "/"), { w: [3 falsche Auswahl-Antworten] }]
(function () {
  const G = 'Dazu aus dem Buch (Unit 1 und 2)';
  const add = (id, title, icon, info, cards) => (window.DECKS = window.DECKS || []).push(
    { id, subject: 'englisch', group: G, title, icon, labels: ['Lücke'], noModes: ['pairs'], info, cards });

  add('t-stative-verbs', 'Stative Verbs', '🧠', {
    kurz: 'Verben für Zustände stehen meistens nicht in der -ing-Form.',
    form: [
      'Stative Verbs beschreiben Zustände (Gefühle, Gedanken, Besitz), keine Handlungen.',
      'Typische Beispiele: appear, be, believe, belong to, hate, have, include, know, like, love, need, prefer, see, seem, taste, think, understand, want.',
      'Sie stehen im Present Simple, auch wenn es um "jetzt" geht: I like this song. (nicht: I am liking this song.)',
      'be, have und think können mit -ing stehen, wenn sie eine Handlung meinen.'
    ],
    use: [
      'think = glauben (Zustand): I think she is right. / think = nachdenken (Handlung): I am thinking about my holiday.',
      'have = besitzen (Zustand): He has two brothers. / have = essen, duschen (Handlung): We are having pizza.',
      'Faustregel: Passt "Ich bin gerade dabei zu ..."? Dann ist es eine Handlung und -ing ist möglich. Wenn nicht, ist es ein Zustand.'
    ],
    signals: 'Gefühle und Gedanken: like, love, hate, want, need, know, understand, believe',
    examples: [['I like reading books in my free time.', 'Ich lese in meiner Freizeit gern Bücher.'], ['Do you understand the question?', 'Verstehst du die Frage?'], ['She is having a shower.', 'Sie duscht gerade.']],
    tip: 'Typischer Fehler: "I am wanting a coffee." Richtig: I want a coffee.'
  }, [
    ['I ___ (love) this song!', 'love', { w: ['am loving', 'loves', 'loved'] }],
    ['She ___ (want) a new phone right now.', 'wants', { w: ['is wanting', 'want', 'wanting'] }],
    ['Do you ___ (understand) the question?', 'understand', { w: ['understanding', 'understood', 'understands'] }],
    ['He ___ (not/know) the answer.', "doesn't know/does not know", { w: ["isn't knowing", "don't know", "doesn't knows"] }],
    ['These shoes ___ (belong) to my sister.', 'belong', { w: ['are belonging', 'belongs', 'is belong'] }],
    ['I ___ (think) about my holiday right now. [Handlung]', 'am thinking', { w: ['think', 'thinks', 'am think'] }],
    ['I ___ (think) she is right. [Meinung]', 'think', { w: ['am thinking', 'thinks', 'thought'] }],
    ['We ___ (have) pizza at the moment. [essen]', 'are having', { w: ['have', 'has', 'having'] }],
    ['He ___ (have) two brothers. [besitzen]', 'has', { w: ['is having', 'have', 'having'] }],
    ['The soup ___ (taste) great.', 'tastes', { w: ['is tasting', 'taste', 'tasted'] }],
    ['I ___ (hate) getting up early.', 'hate', { w: ['am hating', 'hates', 'hated'] }],
    ['She ___ (seem) tired today.', 'seems', { w: ['is seeming', 'seem', 'seemed'] }],
    ['This book ___ (include) many pictures.', 'includes', { w: ['is including', 'include', 'including'] }]
  ]);

  add('t-used-to', 'used to', '🧓', {
    kurz: 'Für Gewohnheiten und Zustände früher, die es jetzt nicht mehr gibt.',
    form: [
      'used to + Grundform: I used to eat ice cream every day.',
      "Verneinung: didn't use to + Grundform (oder: never used to).",
      'Frage: Did + Person + use to + Grundform: Did you use to play football?',
      'Achtung: In Frage und Verneinung heißt es use to (ohne -d), weil did schon die Vergangenheit zeigt.'
    ],
    use: [
      'Gewohnheiten früher: When I was four, I used to eat ice cream every day.',
      'Zustände früher: Rick used to have blond hair. (Jetzt nicht mehr.)'
    ],
    signals: 'when I was young, as a child, years ago, in those days',
    examples: [['My grandfather used to smoke.', 'Mein Opa hat früher geraucht.'], ["She didn't use to like coffee.", 'Früher mochte sie keinen Kaffee.'], ['Did you use to play with dolls?', 'Hast du früher mit Puppen gespielt?']],
    tip: 'Für etwas, das nur einmal oder genau drei Mal passiert ist, nimmt man Past Simple: Last year I went to Rome three times. (nicht: used to go)'
  }, [
    ['When I was younger, I ___ (eat) pizza almost every day.', 'used to eat', { w: ['use to eat', 'was used to eat', 'used to eating'] }],
    ['Did you ___ play with dolls when you were small?', 'use to', { w: ['used to', 'using to', 'use for'] }],
    ['She ___ (not/like) coffee, but now she loves it.', "didn't use to like/did not use to like", { w: ["didn't used to like", 'not used to like', "doesn't use to like"] }],
    ['We ___ (live) in a small village when I was a child.', 'used to live', { w: ['use to live', 'were used to live', 'used to living'] }],
    ['My grandfather ___ (smoke), but he stopped ten years ago.', 'used to smoke', { w: ['uses to smoke', 'use to smoke', 'used to smoking'] }],
    ['There ___ (be) a cinema here, but it closed.', 'used to be', { w: ['use to be', 'used to being', 'was used to be'] }],
    ['He ___ (not/have) a car, so he took the bus.', "didn't use to have/did not use to have", { w: ["didn't used to have", "doesn't use to have", 'not use to have'] }],
    ['Did he ___ wear glasses when he was a boy?', 'use to', { w: ['used to', 'using to', 'uses to'] }],
    ['I ___ (play) the guitar every evening, but now I have no time.', 'used to play', { w: ['use to play', 'am used to play', 'used to playing'] }],
    ['Tom ___ (be) very shy, but now he is confident.', 'used to be', { w: ['use to be', 'was used to be', 'used to being'] }],
    ["They ___ (not/go) on holiday every year when the kids were small.", "didn't use to go/did not use to go", { w: ["didn't used to go", "don't use to go", 'not used to go'] }],
    ['In the 1990s people ___ (write) letters more often than emails.', 'used to write', { w: ['use to write', 'writed to', 'used to writing'] }]
  ]);

  add('t-present-vergleich', 'Present: Simple oder Progressive?', '⚖️', {
    kurz: 'Hier musst du dich entscheiden: Gewohnheit oder gerade jetzt?',
    form: [
      'Present Simple: Gewohnheit, Dauerhaftes, Fakten (Signalwörter: always, usually, often, every day).',
      'Present Progressive: jetzt gerade oder vorübergehend (Signalwörter: now, at the moment, today, this week, Look!).',
      'Stative Verbs (know, like, want ...) bleiben immer im Present Simple.'
    ],
    use: ['Frag dich: Passiert es regelmäßig / dauerhaft (Simple) oder gerade jetzt / nur für kurze Zeit (Progressive)?'],
    examples: [['Gary usually walks to work.', 'Gary geht normalerweise zu Fuß zur Arbeit.'], ['Gary is walking to work today because his car is broken.', 'Gary geht heute zu Fuß, weil sein Auto kaputt ist.']],
    tip: 'Dasselbe Verb, anderer Sinn: Sam lives in Linz (dauerhaft). Sam is living with his parents at the moment (vorübergehend).'
  }, [
    ['Gary usually ___ (walk) to work.', 'walks', { w: ['is walking', 'walk', 'walking'] }],
    ['Gary ___ (walk) to work today because his car is broken.', 'is walking', { w: ['walks', 'walk', 'walking'] }],
    ['Shh! The teacher ___ (talk).', 'is talking', { w: ['talks', 'talk', 'talking'] }],
    ['The sun ___ (rise) in the east.', 'rises', { w: ['is rising', 'rise', 'rising'] }],
    ['Look! The sun ___ (rise).', 'is rising', { w: ['rises', 'rise', 'are rising'] }],
    ['I ___ (work) in a bakery this summer, just for a few weeks.', 'am working', { w: ['work', 'works', 'am work'] }],
    ['My mother ___ (work) in a bakery. It is her job.', 'works', { w: ['is working', 'work', 'working'] }],
    ['We ___ (not watch) TV in the evenings.', "don't watch/do not watch", { w: ["aren't watching", "doesn't watch", "don't watching"] }],
    ['Be quiet! We ___ (not watch) TV. We are studying.', "aren't watching/are not watching", { w: ["don't watch", "isn't watching", "aren't watch"] }],
    ['Sam ___ (live) with his parents at the moment, but he is looking for a flat.', 'is living', { w: ['lives', 'live', 'living'] }],
    ['Sam ___ (live) in Linz. He was born there.', 'lives', { w: ['is living', 'live', 'living'] }],
    ['Dad ___ (cook) dinner right now.', 'is cooking', { w: ['cooks', 'cook', 'is cook'] }]
  ]);

  add('t-past-vergleich', 'Past: Simple oder Progressive?', '⚖️', {
    kurz: 'Hier musst du dich entscheiden: abgeschlossen oder gerade im Gange?',
    form: [
      'Past Simple: abgeschlossene Handlung, Handlungen nacheinander, wiederholte Handlung früher.',
      'Past Progressive: Handlung lief gerade (zu einem Zeitpunkt oder als eine andere dazwischenkam).',
      'Beide zusammen: Lange Handlung = Past Progressive, kurze Unterbrechung = Past Simple.'
    ],
    use: ['Frag dich: Ist die Handlung fertig und kurz (Simple)? Oder lief sie gerade, als etwas anderes passierte (Progressive)?'],
    examples: [['The phone rang while I was having a shower.', 'Das Telefon klingelte, während ich duschte.'], ['We went skiing every winter.', 'Wir sind jeden Winter Skifahren gegangen.']],
    tip: 'Wiederholte Handlungen in der Vergangenheit stehen im Past Simple, nicht im Past Progressive: We went skiing every winter. (nicht: We were going)'
  }, [
    ['When I was a child, we ___ (go) skiing every winter.', 'went', { w: ['were going', 'go', 'was going'] }],
    ['At nine o\'clock I ___ (watch) a film, so I did not hear the doorbell.', 'was watching', { w: ['watched', 'were watching', 'have watched'] }],
    ['I ___ (open) the door and walked in.', 'opened', { w: ['was opening', 'open', 'have opened'] }],
    ['She ___ (open) the door when the lights went out.', 'was opening', { w: ['opened', 'were opening', 'is opening'] }],
    ['The phone ___ (ring) while I was having a shower.', 'rang', { w: ['was ringing', 'rung', 'rings'] }],
    ['While I ___ (have) a shower, the phone rang.', 'was having', { w: ['had', 'were having', 'have'] }],
    ['The birds ___ (sing) when I left the house.', 'were singing', { w: ['sang', 'was singing', 'sing'] }],
    ['We ___ (visit) Rome three times last year.', 'visited', { w: ['were visiting', 'visit', 'was visiting'] }],
    ['Two men ___ (argue) outside when I came home.', 'were arguing', { w: ['argued', 'was arguing', 'argue'] }],
    ['Josh ___ (push) the door open and looked inside.', 'pushed', { w: ['was pushing', 'push', 'pushing'] }],
    ['I ___ (sleep) at midnight, so I did not hear the noise.', 'was sleeping', { w: ['slept', 'were sleeping', 'sleep'] }],
    ['He ___ (finish) his homework and went to bed.', 'finished', { w: ['was finishing', 'finish', 'were finishing'] }]
  ]);
})();
