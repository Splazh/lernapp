// Stoffpakete: jede Zeitform einzeln, mit Erklärung ("info") und eigenen Lückentext-Karten.
// Karte = [Satz mit ___, richtige Antwort (Varianten mit "/"), { w: [3 falsche Auswahl-Antworten] }]
(function () {
  const G = 'Zeitformen einzeln lernen';
  const add = (id, title, icon, info, cards) => (window.DECKS = window.DECKS || []).push(
    { id, subject: 'englisch', group: G, title, icon, labels: ['Lücke'], noModes: ['pairs'], info, cards });

  add('t-present-simple', 'Present Simple', '🔁', {
    kurz: 'Für alles, was regelmäßig oder immer so ist.',
    form: [
      'Bejahung: Grundform des Verbs. Bei he/she/it kommt ein -s dazu: I work, she works.',
      "Verneinung: do not (don't) / does not (doesn't) + Grundform: I don't work, she doesn't work.",
      'Frage: Do / Does + Person + Grundform: Do you work? Does she work?',
      'Schreibung: go → goes, watch → watches, study → studies.'
    ],
    use: ['Gewohnheiten und Routinen: I get up at seven.', 'Allgemeine Wahrheiten: Water boils at 100 degrees.', 'Fahrpläne und feste Termine: The train leaves at 8.'],
    signals: 'always, usually, often, sometimes, never, every day, on Mondays',
    examples: [['She plays tennis every Sunday.', 'Sie spielt jeden Sonntag Tennis.'], ["He doesn't eat meat.", 'Er isst kein Fleisch.'], ['Does the shop open at nine?', 'Öffnet das Geschäft um neun?']],
    tip: 'Das -s steckt in Frage und Verneinung im does, nicht im Verb: Does she work? (nicht: Does she works?)'
  }, [
    ['Lana ___ (go) to school by bus every day.', 'goes', { w: ['go', 'is going', 'going'] }],
    ['My parents ___ (work) in a hospital.', 'work', { w: ['works', 'are working', 'working'] }],
    ['She ___ (not like) coffee.', "doesn't like/does not like", { w: ["don't like", "isn't like", "doesn't likes"] }],
    ['Water ___ (boil) at 100 degrees.', 'boils', { w: ['boil', 'is boiling', 'boiled'] }],
    ['He always ___ (watch) a film on Fridays.', 'watches', { w: ['watch', 'watchs', 'is watching'] }],
    ["The shop ___ (open) at 9 o'clock.", 'opens', { w: ['open', 'is opening', 'opened'] }],
    ['We ___ (not play) football in winter.', "don't play/do not play", { w: ["doesn't play", "aren't play", "don't plays"] }],
    ['My sister ___ (study) French at university.', 'studies', { w: ['studys', 'study', 'is studying'] }],
    ['I usually ___ (get) up at seven.', 'get', { w: ['am getting', 'gets', 'got'] }],
    ['Tom ___ (not eat) meat.', "doesn't eat/does not eat", { w: ["don't eat", "isn't eat", "doesn't eats"] }],
    ['The train to Vienna ___ (leave) at 8:15 every morning.', 'leaves', { w: ['leave', 'is leaving', 'left'] }],
    ['She ___ (teach) English at a school.', 'teaches', { w: ['teachs', 'teach', 'is teaching'] }]
  ]);

  add('t-present-progressive', 'Present Progressive', '▶️', {
    kurz: 'Für das, was gerade jetzt passiert oder nur vorübergehend gilt.',
    form: [
      'am / is / are + Verb mit -ing: I am working, she is working, we are working.',
      "Verneinung: am not / isn't / aren't + -ing: She isn't working.",
      'Frage: Am / Is / Are + Person + -ing: Are you working?',
      'Schreibung: run → running, make → making, lie → lying.'
    ],
    use: ['Etwas passiert genau jetzt: Look! It is raining.', 'Vorübergehende Situation: I am staying with my aunt this week.', 'Feste Verabredung in der Zukunft: We are meeting Tom at five.'],
    signals: 'now, right now, at the moment, today, this week, Look!, Listen!',
    examples: [['The baby is sleeping right now.', 'Das Baby schläft gerade.'], ["They aren't watching TV.", 'Sie sehen nicht fern.'], ['What are you doing?', 'Was machst du gerade?']],
    tip: 'Verben für Zustände (know, like, want, love) stehen meistens NICHT in der -ing-Form: I know him (nicht: I am knowing him).'
  }, [
    ['Be quiet! The baby ___ (sleep).', 'is sleeping', { w: ['sleeps', 'sleeping', 'are sleeping'] }],
    ['Look! It ___ (rain).', 'is raining', { w: ['rains', 'raining', 'are raining'] }],
    ['I ___ (write) an email right now.', 'am writing', { w: ['write', 'is writing', 'am write'] }],
    ['They ___ (not watch) TV at the moment.', "aren't watching/are not watching", { w: ["don't watching", "aren't watch", 'not watching'] }],
    ['She ___ (study) for her exam this week.', 'is studying', { w: ['studies', 'studying', 'study'] }],
    ['Listen! Someone ___ (knock) at the door.', 'is knocking', { w: ['knocks', 'knocking', 'are knocking'] }],
    ['We ___ (meet) Tom at 5 pm tomorrow. It is arranged.', 'are meeting', { w: ['meet', 'will meeting', 'meets'] }],
    ['He ___ (run) in the park now.', 'is running', { w: ['is runing', 'runs', 'is run'] }],
    ['My brother ___ (not do) his homework. He is playing games.', "isn't doing/is not doing", { w: ["doesn't doing", "isn't do", "don't doing"] }],
    ['The children ___ (play) in the garden at the moment.', 'are playing', { w: ['plays', 'is playing', 'play'] }],
    ['Jack ___ (live) with his aunt this month.', 'is living', { w: ['lives', 'living', 'are living'] }],
    ['She ___ (make) dinner right now.', 'is making', { w: ['is makeing', 'makes', 'making'] }]
  ]);

  add('t-past-simple', 'Past Simple', '⏪', {
    kurz: 'Für Abgeschlossenes in der Vergangenheit.',
    form: [
      'Regelmäßige Verben: Grundform + -ed: visit → visited, study → studied, stop → stopped.',
      'Unregelmäßige Verben: eigene 2. Form: go → went, see → saw (siehe Irregular Verbs).',
      "Verneinung: did not (didn't) + Grundform: She didn't go.",
      'Frage: Did + Person + Grundform: Did you see it?'
    ],
    use: ['Abgeschlossene Handlung mit klarem Zeitpunkt: I saw a film yesterday.', 'Handlungen nacheinander in einer Geschichte: He opened the door and went in.', 'Gewohnheiten früher: We played tennis every Sunday.'],
    signals: 'yesterday, last week / year, two days ago, in 2010, when I was a child',
    examples: [['We visited London last summer.', 'Wir haben letzten Sommer London besucht.'], ["She didn't go to school.", 'Sie ging nicht zur Schule.'], ['Did you eat breakfast?', 'Hast du gefrühstückt?']],
    tip: 'Nach did / didn\'t steht immer die Grundform: Did she go? (nicht: Did she went?)'
  }, [
    ['We ___ (visit) London last summer.', 'visited', { w: ['visit', 'have visited', 'were visiting'] }],
    ['I ___ (see) a great film yesterday.', 'saw', { w: ['seen', 'have seen', 'was seeing'] }],
    ['She ___ (not go) to school last Monday.', "didn't go/did not go", { w: ["didn't went", "wasn't go", "doesn't go"] }],
    ['Last year we ___ (buy) a new car.', 'bought', { w: ['buyed', 'have bought', 'buy'] }],
    ['I ___ (break) my arm two years ago.', 'broke', { w: ['broken', 'have broken', 'breaked'] }],
    ['He ___ (study) hard for the test yesterday.', 'studied', { w: ['studyed', 'studies', 'has studied'] }],
    ['They ___ (stop) the car and got out.', 'stopped', { w: ['stoped', 'stop', 'have stopped'] }],
    ['Did you ___ (eat) breakfast this morning?', 'eat', { w: ['ate', 'eaten', 'eating'] }],
    ['We ___ (not have) time yesterday.', "didn't have/did not have", { w: ["didn't had", "haven't had", "don't have"] }],
    ['Mozart ___ (write) over 600 works.', 'wrote', { w: ['has written', 'writes', 'was writing'] }],
    ['When I was a child, I ___ (live) in Graz.', 'lived', { w: ['live', 'have lived', 'was live'] }],
    ['She ___ (give) me a present for my birthday.', 'gave', { w: ['gived', 'given', 'has given'] }]
  ]);

  add('t-past-progressive', 'Past Progressive', '🎞️', {
    kurz: 'Für etwas, das in der Vergangenheit gerade lief.',
    form: [
      'was / were + Verb mit -ing: I was working, we were working.',
      "Verneinung: wasn't / weren't + -ing.",
      'Frage: Was / Were + Person + -ing: Were you working?'
    ],
    use: ['Handlung lief zu einem bestimmten Zeitpunkt: At 8 pm I was doing my homework.', 'Lange Handlung wird von kurzer unterbrochen: I was cooking when the phone rang.', 'Zwei Handlungen liefen gleichzeitig: While I was reading, he was playing.'],
    signals: 'while, when, as, at 8 pm yesterday, all morning',
    examples: [['He was watching TV when the phone rang.', 'Er sah fern, als das Telefon klingelte.'], ['They were playing all afternoon.', 'Sie spielten den ganzen Nachmittag.']],
    tip: 'Die lange Handlung steht im Past Progressive, die kurze Unterbrechung im Past Simple: I was cooking (lang) when the phone rang (kurz).'
  }, [
    ['He ___ (watch) TV when the phone rang.', 'was watching', { w: ['watched', 'is watching', 'has watched'] }],
    ['It ___ (rain) hard when I woke up.', 'was raining', { w: ['rains', 'has rained', 'is raining'] }],
    ['When I arrived, they ___ (have) dinner.', 'were having', { w: ['had', 'have had', 'are having'] }],
    ['While I ___ (cook), the phone rang.', 'was cooking', { w: ['cooked', 'cook', 'am cooking'] }],
    ['At 8 pm yesterday I ___ (do) my homework.', 'was doing', { w: ['did', 'were doing', 'am doing'] }],
    ['She ___ (not sleep) when I called.', "wasn't sleeping/was not sleeping", { w: ["didn't sleeping", "weren't sleeping", "wasn't sleep"] }],
    ['We ___ (walk) home when it started to rain.', 'were walking', { w: ['walked', 'was walking', 'are walking'] }],
    ['While their mother ___ (read), the children were playing.', 'was reading', { w: ['read', 'were reading', 'is reading'] }],
    ['I ___ (listen) to music when you came in.', 'was listening', { w: ['listened', 'were listening', 'am listening'] }],
    ['He ___ (drive) too fast when the accident happened.', 'was driving', { w: ['drove', 'were driving', 'has driven'] }],
    ['I ___ (talk) to Anna when the lights went out.', 'was talking', { w: ['talked', 'were talking', 'am talking'] }],
    ['While she ___ (wait) for the bus, she met an old friend.', 'was waiting', { w: ['waited', 'were waiting', 'is waiting'] }]
  ]);

  add('t-present-perfect', 'Present Perfect', '✅', {
    kurz: 'Für Vergangenes, das jetzt noch wichtig ist.',
    form: [
      'have / has + 3. Form des Verbs (Past Participle): I have worked, she has worked, I have seen.',
      "Verneinung: haven't / hasn't + 3. Form.",
      'Frage: Have / Has + Person + 3. Form: Have you finished?'
    ],
    use: ['Ergebnis ist jetzt sichtbar: I have lost my keys.', 'Erfahrungen im Leben: Have you ever eaten sushi?', 'Etwas hat begonnen und dauert bis jetzt an: I have lived here for five years.', 'Gerade erst passiert: She has just left.'],
    signals: 'already, yet, just, ever, never, so far, for, since, recently',
    examples: [['I have lived in Salzburg since 2015.', 'Ich wohne seit 2015 in Salzburg.'], ["He hasn't seen that film yet.", 'Er hat den Film noch nicht gesehen.'], ['Have you ever been to Spain?', 'Warst du schon einmal in Spanien?']],
    tip: 'Bei einem genauen Zeitpunkt (yesterday, last week, in 2010) nimmt man IMMER Past Simple. for = Zeitspanne (for 5 years), since = Startpunkt (since 2015).'
  }, [
    ['I ___ (live) in Salzburg since 2015.', 'have lived', { w: ['lived', 'am living', 'have living'] }],
    ['She has just ___ (finish) her homework.', 'finished', { w: ['finish', 'finishes', 'finishing'] }],
    ['Have you ever ___ (eat) sushi?', 'eaten', { w: ['ate', 'eat', 'eating'] }],
    ['We have ___ (know) each other for ten years.', 'known', { w: ['knew', 'know', 'knowing'] }],
    ["He hasn't ___ (see) that film yet.", 'seen', { w: ['saw', 'see', 'seeing'] }],
    ['They have already ___ (leave).', 'left', { w: ['leaved', 'leave', 'leaving'] }],
    ['I have ___ (write) three emails this morning.', 'written', { w: ['wrote', 'write', 'writed'] }],
    ['He ___ (live) in Vienna for five years now.', 'has lived', { w: ['lived', 'have lived', 'is living'] }],
    ['I have ___ (lose) my keys. Can you help me?', 'lost', { w: ['loose', 'losed', 'lose'] }],
    ['She has never ___ (be) to Spain.', 'been', { w: ['was', 'be', 'being'] }],
    ['We have just ___ (buy) a new house.', 'bought', { w: ['buy', 'buyed', 'buys'] }],
    ['My sister ___ (not call) me yet.', "hasn't called/has not called", { w: ["haven't called", "didn't called", "hasn't call"] }]
  ]);

  add('t-present-perfect-progressive', 'Present Perfect Progressive', '⏳', {
    kurz: 'Für etwas, das schon eine Weile läuft und noch andauert.',
    form: [
      'have / has + been + Verb mit -ing: I have been waiting, she has been waiting.',
      "Verneinung: haven't / hasn't + been + -ing.",
      'Frage: Have / Has + Person + been + -ing: Have you been waiting long?'
    ],
    use: ['Eine Handlung hat begonnen und läuft bis jetzt, die Dauer ist wichtig: I have been waiting for an hour.', 'Gerade beendet, Folgen sieht man noch: Her eyes are red. She has been crying.'],
    signals: 'for, since, all day, all week, how long, lately, recently',
    examples: [['It has been raining since this morning.', 'Es regnet seit heute Morgen.'], ['How long have you been learning English?', 'Wie lange lernst du schon Englisch?']],
    tip: 'Dauer ("wie lange schon?") → mit -ing. Ergebnis oder Anzahl ("wie viele?") → Present Perfect Simple: I have read three books.'
  }, [
    ['I ___ (wait) for you for an hour!', 'have been waiting', { w: ['have waited', 'am waiting', 'was waiting'] }],
    ['She has been ___ (learn) Spanish since January.', 'learning', { w: ['learned', 'learn', 'learnt'] }],
    ['It has been ___ (snow) all day.', 'snowing', { w: ['snowed', 'snow', 'snows'] }],
    ['He ___ (run) for an hour, so he is very tired.', 'has been running', { w: ['is running', 'has ran', 'was running'] }],
    ['We ___ (work) on this project all week.', 'have been working', { w: ['are working', 'works', 'have being working'] }],
    ['Her eyes are red. She ___ (cry).', 'has been crying', { w: ['is crying', 'cried', 'has cry'] }],
    ['I have been ___ (read) this book since Monday.', 'reading', { w: ['read', 'readed', 'to read'] }],
    ['It ___ (rain) since this morning.', 'has been raining', { w: ['was raining', 'rains', 'have been raining'] }],
    ['The kids ___ (play) outside all afternoon.', 'have been playing', { w: ['are playing', 'has been playing', 'were playing'] }],
    ['Tom has been ___ (play) the guitar for ten years.', 'playing', { w: ['played', 'play', 'plays'] }],
    ['They ___ (talk) on the phone for two hours.', 'have been talking', { w: ['are talking', 'talks', 'has been talking'] }],
    ['My neighbour ___ (paint) his house all week.', 'has been painting', { w: ['paints', 'has been paint', 'is painting'] }]
  ]);

  add('t-past-perfect', 'Past Perfect', '⏮️', {
    kurz: 'Für das, was vor etwas anderem in der Vergangenheit schon passiert war.',
    form: [
      'had + 3. Form des Verbs: I had finished, she had seen.',
      "Verneinung: hadn't + 3. Form.",
      'Frage: Had + Person + 3. Form: Had you finished?'
    ],
    use: ['Die frühere von zwei Vergangenheitshandlungen: When we arrived, the film had already started.', 'Grund für etwas in der Vergangenheit: He was sad because he had lost the game.'],
    signals: 'before, after, already, by the time, until, never ... before',
    examples: [['After she had finished, she went home.', 'Nachdem sie fertig war, ging sie heim.'], ["I hadn't eaten, so I was hungry.", 'Ich hatte nichts gegessen, also war ich hungrig.']],
    tip: 'Zwei Handlungen in der Vergangenheit: die frühere im Past Perfect (had ...), die spätere im Past Simple.'
  }, [
    ['After she ___ (finish) her work, she went home.', 'had finished', { w: ['finished', 'has finished', 'was finishing'] }],
    ['He was sad because he ___ (lose) the game.', 'had lost', { w: ['lost', 'has lost', 'was losing'] }],
    ['I ___ (not eat) anything before the party, so I was hungry.', "hadn't eaten/had not eaten", { w: ["didn't eat", "haven't eaten", "wasn't eating"] }],
    ['By the time the police came, the thief ___ (run) away.', 'had run', { w: ['ran', 'has run', 'was running'] }],
    ['When we arrived, the film had already ___ (start).', 'started', { w: ['start', 'starts', 'starting'] }],
    ['She had never ___ (see) snow before she moved to Canada.', 'seen', { w: ['saw', 'see', 'seeing'] }],
    ['They ___ (eat) all the cake before I got there.', 'had eaten', { w: ['ate', 'have eaten', 'were eating'] }],
    ["I couldn't open the door because I ___ (forget) my key.", 'had forgotten', { w: ['forgot', 'have forgotten', 'was forgetting'] }],
    ['The teacher was angry because we ___ (not do) our homework.', "hadn't done/had not done", { w: ["didn't done", "haven't done", "hadn't did"] }],
    ['He told me he ___ (visit) Rome the year before.', 'had visited', { w: ['visited', 'has visited', 'was visiting'] }],
    ['When I got to the station, the train ___ (leave).', 'had left', { w: ['left', 'has left', 'was leaving'] }],
    ['We had just ___ (sit) down when the bell rang.', 'sat', { w: ['sit', 'sitted', 'sitting'] }]
  ]);

  add('t-future-will', 'Future mit will', '🔮', {
    kurz: 'Für spontane Entscheidungen, Vermutungen und Versprechen.',
    form: [
      'will + Grundform, für alle Personen gleich: I will go, she will go.',
      "Verneinung: will not (won't) + Grundform.",
      'Frage: Will + Person + Grundform: Will you help me?',
      "Kurzform: I'll, you'll, she'll ..."
    ],
    use: ['Spontane Entscheidung im Moment des Sprechens: The phone is ringing. I will answer it.', 'Vermutung oder Vorhersage: I think it will be sunny tomorrow.', 'Versprechen und Angebote: Don\'t worry. I will help you.'],
    signals: 'tomorrow, next week, in 2050, I think, probably, perhaps, I am sure',
    examples: [["I'm thirsty. I'll get some water.", 'Ich habe Durst. Ich hole mir Wasser.'], ["She won't come to the party.", 'Sie wird nicht zur Party kommen.']],
    tip: 'will = spontan jetzt entschieden oder eine Vermutung. Ein schon geplantes Vorhaben sagt man mit going to.'
  }, [
    ['Tomorrow I ___ (visit) my grandma.', 'will visit', { w: ['visited', 'am visit', 'will visiting'] }],
    ["I'm thirsty. I ___ (get) a glass of water.", "will get/'ll get", { w: ['am getting', 'got', 'am going get'] }],
    ['I think it ___ (be) sunny tomorrow.', 'will be', { w: ['is being', 'will being', 'be going'] }],
    ["Don't worry. I ___ (help) you.", "will help/'ll help", { w: ['helped', 'am help', 'will helping'] }],
    ['She ___ (not come) to the party tomorrow.', "won't come/will not come", { w: ["doesn't will come", "won't comes", "isn't come"] }],
    ['Perhaps we ___ (see) each other next year.', 'will see', { w: ['saw', 'will saw', 'are see'] }],
    ['In 2050, people ___ (live) on Mars, I think.', 'will live', { w: ['lived', 'will lives', 'are live'] }],
    ['Wait here. I ___ (call) the manager.', "will call/'ll call", { w: ['called', 'am call', 'will calling'] }],
    ['The phone is ringing. I ___ (answer) it.', "will answer/'ll answer", { w: ['answered', 'will answering', 'am answer'] }],
    ['I promise I ___ (not tell) anyone.', "won't tell/will not tell", { w: ["don't will tell", 'not will tell', "won't told"] }],
    ['It will probably ___ (rain) tomorrow.', 'rain', { w: ['rains', 'raining', 'rained'] }],
    ['Will you ___ (help) me with this bag?', 'help', { w: ['helps', 'helping', 'helped'] }]
  ]);

  add('t-future-going-to', 'Future mit going to', '🎯', {
    kurz: 'Für Pläne und für Dinge, die man schon kommen sieht.',
    form: [
      'am / is / are + going to + Grundform: I am going to learn, she is going to learn.',
      "Verneinung: am not / isn't / aren't + going to + Grundform.",
      'Frage: Am / Is / Are + Person + going to + Grundform: Are you going to come?'
    ],
    use: ['Pläne und Absichten, schon vorher entschieden: I am going to learn Spanish.', 'Vorhersage mit sichtbaren Anzeichen: Look at the clouds! It is going to rain.'],
    signals: 'tomorrow, next year, soon, this weekend, Look!, Watch out!',
    examples: [['My sister is going to have a baby in May.', 'Meine Schwester bekommt im Mai ein Baby.'], ["He isn't going to play tomorrow.", 'Er wird morgen nicht spielen.']],
    tip: 'Plan, schon vorher entschieden → going to. Spontan jetzt entschieden → will. Feste Verabredung → Present Progressive (We are meeting Tom at five).'
  }, [
    ['Look at the clouds! It ___ (rain).', 'is going to rain', { w: ['will rain', 'rains', 'is going to raining'] }],
    ['My sister ___ (have) a baby in May.', 'is going to have', { w: ['is going to has', 'will having', 'has going to'] }],
    ['We ___ (visit) Rome next summer. We have already booked the hotel.', 'are going to visit', { w: ['is going to visit', 'are going visit', 'will visiting'] }],
    ['I ___ (learn) Spanish. I have already signed up for a course.', 'am going to learn', { w: ['am going learn', 'going to learn', 'is going to learn'] }],
    ['He ___ (not play) in the match tomorrow because he is injured.', "isn't going to play/is not going to play", { w: ["doesn't going to play", "isn't going play", "won't going to play"] }],
    ['Watch out! You ___ (fall)!', 'are going to fall', { w: ['will falling', 'is going to fall', 'are going fall'] }],
    ['They ___ (build) a new school next year.', 'are going to build', { w: ['is going to build', 'are going build', 'going to build'] }],
    ['I ___ (study) medicine after school. That is my plan.', 'am going to study', { w: ['am going study', 'going to study', 'is going to study'] }],
    ['Look at the time! We ___ (miss) the bus.', 'are going to miss', { w: ['are going miss', 'will missing', 'is going to miss'] }],
    ['She ___ (not buy) a new phone. She likes her old one.', "isn't going to buy/is not going to buy", { w: ["doesn't going to buy", "isn't going buy", 'not going to buy'] }],
    ['The film starts in ten minutes. We ___ (be) late.', 'are going to be', { w: ['are going be', 'is going to be', 'will being'] }],
    ['He ___ (paint) his room blue this weekend.', 'is going to paint', { w: ['is going paint', 'are going to paint', 'going to paint'] }]
  ]);
})();
