// Spanisch 1 (Nuevas Perspectivas A1-A2): Unidad 1 und Vorschau auf Unidad 2.
// Grundlage: Unidad-1-Zusammenfassung, Plan del semestre und Fernauftrag vom 14.10. Karten und Sätze sind selbst geschrieben.
// Beim Tippen sind Akzente und Satzzeichen (¿ ¡) egal, damit es am Handy leichter geht.
(function () {
  const add = (group, id, title, icon, labels, extra, info, cards) => (window.DECKS = window.DECKS || []).push(
    Object.assign({ id, subject: 'spanisch', group, title, icon, labels, looseAccents: true, shortOptions: true, info, cards }, extra));
  const U1 = 'Unidad 1: Hola, ¿qué tal?';
  const U2 = 'Unidad 2 (Vorschau): ¡A comer!';

  add(U1, 'es-saludos', 'Begrüßen und vorstellen', '👋', ['Español'], { noModes: ['pairs'] }, {
    kurz: 'Deutsch → Spanisch: grüßen, sich vorstellen, nach Namen und Herkunft fragen.',
    form: [
      'Fragezeichen und Ausrufezeichen stehen im Spanischen am Anfang (¿ ¡) und am Ende des Satzes.',
      'Verneinung: Nein und nicht heißen beide no. Die Verneinung steht immer vor dem Verb: No soy de Perú.',
      'Formell sagt man usted (Sie): ¿Cómo se llama usted? Informell tú: ¿Cómo te llamas?'
    ],
    tip: 'Beim Tippen musst du keine Akzente und kein ¿ ¡ schreiben. Beim Lernen schau sie dir aber gut an.'
  }, [
    ['Hallo, wie geht\'s?', '¿Qué tal?'],
    ['Guten Morgen / Guten Tag (vormittags)', 'Buenos días'],
    ['Guten Tag (nachmittags)', 'Buenas tardes'],
    ['Guten Abend / Gute Nacht', 'Buenas noches'],
    ['Bis später', 'Hasta luego'],
    ['Bis morgen', 'Hasta mañana'],
    ['Bis bald', 'Hasta pronto'],
    ['Bis nächste Woche', 'Hasta la próxima semana'],
    ['Auf Wiedersehen', 'Adiós'],
    ['Tschüss (locker)', 'Chao'],
    ['Wir sehen uns!', 'Nos vemos'],
    ['Ich heiße Juan.', 'Me llamo Juan'],
    ['Wie heißt du?', '¿Cómo te llamas?'],
    ['Wie heißen Sie?', '¿Cómo se llama usted?'],
    ['Und du?', '¿Y tú?'],
    ['Und wie ist dein Nachname?', '¿Y de apellido?'],
    ['Woher kommst du?', '¿De dónde eres?'],
    ['Ich komme aus Spanien.', 'Soy de España'],
    ['Woher kommen Sie?', '¿De dónde es usted?'],
    ['Aus welchem Land kommst du?', '¿De qué país eres?'],
    ['Aus welcher Stadt kommen Sie?', '¿De qué ciudad es usted?'],
    ['Wie schreibt man deinen Nachnamen?', '¿Cómo se escribe tu apellido?'],
    ['Schau, das ist Angela.', 'Mira, esta es Angela'],
    ['Schau, das ist Pedro.', 'Mira, este es Pedro'],
    ['Nein, ich bin nicht Miguel.', 'No, no soy Miguel'],
    ['Du bist Miguel, stimmt\'s?', 'Eres Miguel, ¿verdad?'],
    ['Wie geht es dir?', '¿Cómo estás?']
  ]);

  add(U1, 'es-ser-llamarse', 'ser und llamarse', '🔁', ['ser (sein)', 'llamarse (heißen)'], { defaultSkip: 0, noModes: ['pairs'] }, {
    kurz: 'Die zwei wichtigsten Verben in Unidad 1 in allen Personen.',
    form: [
      'ser: soy, eres, es, somos, sois, son. Damit sagst du, wer du bist und woher du kommst: Soy de Viena.',
      'llamarse: me llamo, te llamas, se llama, nos llamamos, os llamáis, se llaman. Es braucht immer das kleine Wort davor (me, te, se ...).'
    ],
    tip: 'Die Formen für él, ella und usted sind gleich (es, se llama). Ebenso gilt ellos, ellas und ustedes für dieselbe Form (son, se llaman).'
  }, [
    ['yo (ich)', 'soy', 'me llamo'],
    ['tú (du)', 'eres', 'te llamas'],
    ['él / ella / usted', 'es', 'se llama'],
    ['nosotros / nosotras (wir)', 'somos', 'nos llamamos'],
    ['vosotros / vosotras (ihr)', 'sois', 'os llamáis'],
    ['ellos / ellas / ustedes', 'son', 'se llaman']
  ]);

  add(U1, 'es-luecken', 'Lücken: ser, llamarse, este/esta', '✍️', ['Lücke'], { noModes: ['pairs'] }, {
    kurz: 'Setz die richtige Form ein.',
    tip: 'este = männlich (este es Pedro), esta = weiblich (esta es Carmen). el / la = der / die: el señor, la señora.'
  }, [
    ['Yo ___ de Madrid. (ser)', 'soy', { w: ['eres', 'es', 'son'] }],
    ['Nosotros ___ de Austria. (ser)', 'somos', { w: ['sois', 'son', 'soy'] }],
    ['¿___ tú de Perú? (ser)', 'Eres', { w: ['Es', 'Soy', 'Sois'] }],
    ['Juan ___ de Sevilla. (ser)', 'es', { w: ['son', 'eres', 'soy'] }],
    ['Jorge y Teresa ___ de Burgos. (ser)', 'son', { w: ['es', 'somos', 'sois'] }],
    ['¿De dónde ___ vosotros? (ser)', 'sois', { w: ['somos', 'son', 'eres'] }],
    ['Me ___ Bárbara. (llamarse)', 'llamo', { w: ['llamas', 'llama', 'llamáis'] }],
    ['¿Cómo te ___? (llamarse)', 'llamas', { w: ['llamo', 'llama', 'llaman'] }],
    ['Él se ___ Miguel. (llamarse)', 'llama', { w: ['llamo', 'llamas', 'llaman'] }],
    ['Nosotros nos ___ González. (llamarse)', 'llamamos', { w: ['llamáis', 'llaman', 'llamo'] }],
    ['Ellos se ___ Rodríguez. (llamarse)', 'llaman', { w: ['llama', 'llamamos', 'llamáis'] }],
    ['¿Cómo os ___, chicos? (llamarse)', 'llamáis', { w: ['llamamos', 'llaman', 'llamas'] }],
    ['Mira, ___ es Carmen. (weiblich)', 'esta', { w: ['este', 'esto', 'estas'] }],
    ['Mira, ___ es Tomás. (männlich)', 'este', { w: ['esta', 'esto', 'estos'] }],
    ['___ señor (der Herr)', 'el', { w: ['la', 'un', 'una'] }],
    ['___ señora (die Dame)', 'la', { w: ['el', 'un', 'los'] }],
    ['¿Eres de Austria? – No, ___ soy de Austria.', 'no', { w: ['nein', 'nunca', 'nada'] }]
  ]);

  add(U1, 'es-paises', 'Länder (países)', '🌎', ['País'], {}, {
    kurz: 'Deutsch → Spanisch: Länder in Europa und Lateinamerika.',
    tip: 'Viele Namen sehen fast gleich aus, achte auf Akzente: Perú, Panamá, México, Turquía, Hungría.'
  }, [
    ['Österreich', 'Austria'],
    ['Deutschland', 'Alemania'],
    ['Tschechien', 'la República Checa/República Checa'],
    ['Slowakei', 'Eslovaquia'],
    ['Ungarn', 'Hungría'],
    ['Slowenien', 'Eslovenia'],
    ['Italien', 'Italia'],
    ['Schweiz', 'Suiza'],
    ['Kroatien', 'Croacia'],
    ['Türkei', 'Turquía'],
    ['Serbien', 'Serbia'],
    ['Frankreich', 'Francia'],
    ['Spanien', 'España'],
    ['USA', 'Estados Unidos'],
    ['Mexiko', 'México'],
    ['Kolumbien', 'Colombia'],
    ['Peru', 'Perú'],
    ['Panama', 'Panamá'],
    ['Kuba', 'Cuba'],
    ['Argentinien', 'Argentina'],
    ['Bolivien', 'Bolivia'],
    ['Dominikanische Republik', 'la República Dominicana/República Dominicana'],
    ['Belize', 'Belice']
  ]);

  add(U1, 'es-aussprache', 'Aussprache', '🗣️', ['Wie gesprochen'], { noModes: ['pairs'] }, {
    kurz: 'Welcher Buchstabe wird wie gesprochen? Die Beispiele: Gibraltar, Cuba, Guernica, Valencia.',
    tip: 'Das h ist stumm (hola = ola). b und v klingen gleich.'
  }, [
    ['c vor a, o, u (Cuba, Colombia)', 'wie k', { w: ['wie th', 'wie ch', 'wie s'] }],
    ['c vor e, i (Ceuta, Valencia) in Spanien', 'wie englisches th', { w: ['wie k', 'wie ch', 'wie sch'] }],
    ['g vor e, i (Gibraltar, Gerona)', 'wie ch in ach', { w: ['wie g in gut', 'wie sch', 'wie k'] }],
    ['gu vor e, i (Guernica, guitarra)', 'wie g in gut', { w: ['wie ch in ach', 'wie gu in Guave', 'wie k'] }],
    ['g vor a, o, u (Granada, gazpacho)', 'wie g in gut', { w: ['wie ch in ach', 'wie th', 'wie j'] }],
    ['qu (que, Quito)', 'wie k', { w: ['wie kw', 'wie ch', 'wie g'] }],
    ['h (hola, hospital)', 'stumm', { w: ['wie ch', 'wie h in Haus', 'wie g'] }],
    ['j (Jerez, jamón)', 'wie ch in ach', { w: ['wie j in Jahr', 'wie sch', 'wie g'] }],
    ['ll (paella, llamo)', 'wie j in Jahr', { w: ['wie l', 'wie ll in Wall', 'wie ch'] }],
    ['ñ (España, Señor)', 'wie nj', { w: ['wie n', 'wie ng', 'wie nk'] }],
    ['z (Zaragoza, gazpacho) in Spanien', 'wie englisches th', { w: ['wie ts', 'wie s', 'wie sch'] }],
    ['v (Valencia, Venezuela)', 'wie b', { w: ['wie w', 'wie f', 'wie v in Vase'] }]
  ]);

  add(U2, 'es-zahlen', 'Zahlen 0 bis 100', '🔢', ['Español'], {}, {
    kurz: 'Zahl → spanisches Wort. Ab 31 wird mit y verbunden: treinta y uno.',
    form: [
      '0 bis 10: cero, uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez.',
      '11 bis 15: once, doce, trece, catorce, quince. 16 bis 19: dieciséis, diecisiete, dieciocho, diecinueve.',
      '20 bis 29 in einem Wort: veinte, veintiuno, veintidós ... veintinueve.',
      'Zehner: treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa, cien. Dazwischen: cuarenta y cinco.'
    ]
  }, [
    ['0', 'cero'], ['1', 'uno'], ['2', 'dos'], ['3', 'tres'], ['4', 'cuatro'], ['5', 'cinco'], ['6', 'seis'],
    ['7', 'siete'], ['8', 'ocho'], ['9', 'nueve'], ['10', 'diez'], ['11', 'once'], ['12', 'doce'], ['13', 'trece'],
    ['14', 'catorce'], ['15', 'quince'], ['16', 'dieciséis'], ['17', 'diecisiete'], ['18', 'dieciocho'], ['19', 'diecinueve'],
    ['20', 'veinte'], ['21', 'veintiuno'], ['22', 'veintidós'], ['25', 'veinticinco'], ['29', 'veintinueve'],
    ['30', 'treinta'], ['31', 'treinta y uno'], ['40', 'cuarenta'], ['45', 'cuarenta y cinco'], ['50', 'cincuenta'],
    ['60', 'sesenta'], ['68', 'sesenta y ocho'], ['70', 'setenta'], ['80', 'ochenta'], ['99', 'noventa y nueve'], ['100', 'cien']
  ]);

  add(U2, 'es-fragewoerter', 'Fragewörter', '❓', ['Español'], {}, {
    kurz: 'Fragewörter haben im Spanischen immer einen Akzent und ein ¿ davor.',
    tip: '¿Qué? fragt nach Sachen (Was?), ¿Cómo? nach Art und Weise (Wie?). In der Übung vom 14.10. ging es genau um den Unterschied: ¿Cómo te llamas? und ¿Qué tal?'
  }, [
    ['Was?', '¿Qué?'], ['Wie?', '¿Cómo?'], ['Wo?', '¿Dónde?'], ['Woher?', '¿De dónde?'], ['Wohin?', '¿Adónde?'],
    ['Wie viel?', '¿Cuánto?'], ['Wer?', '¿Quién?'], ['Wann?', '¿Cuándo?'], ['Warum?', '¿Por qué?']
  ]);

  add(U2, 'es-comida', 'Essen und Trinken (Vorschau)', '🍽️', ['Español'], {}, {
    kurz: 'Häufige Wörter für Unidad 2. Bitte mit der Wortliste im Buch abgleichen, ab Seite 152.',
    tip: 'Der Plan nennt für Unidad 2 Lebensmittel, Tapas, Speisekarte, Einkaufsliste und Mengenangaben mit de.'
  }, [
    ['das Wasser', 'el agua'], ['das Brot', 'el pan'], ['der Käse', 'el queso'], ['der Schinken', 'el jamón'],
    ['die Milch', 'la leche'], ['der Kaffee', 'el café'], ['der Tee', 'el té'], ['der Saft', 'el zumo'],
    ['das Bier', 'la cerveza'], ['der Wein', 'el vino'], ['der Salat', 'la ensalada'], ['die Kartoffeln', 'las patatas'],
    ['das Ei', 'el huevo'], ['das Obst', 'la fruta'], ['der Apfel', 'la manzana'], ['die Orange', 'la naranja'],
    ['das Fleisch', 'la carne'], ['der Fisch', 'el pescado'], ['der Reis', 'el arroz'], ['die Speisekarte', 'la carta']
  ]);

  add(U2, 'es-hablar', 'Verben auf -ar: hablar', '💬', ['hablar (sprechen)'], { defaultSkip: 0, noModes: ['pairs'] }, {
    kurz: 'Regelmäßige Verben auf -ar: Stamm bleibt, die Endung ändert sich.',
    form: ['Endungen: -o, -as, -a, -amos, -áis, -an. Beispiel hablar: hablo, hablas, habla, hablamos, habláis, hablan.'],
    tip: 'Dieselben Endungen gelten für viele Verben: trabajar, comprar, necesitar, tomar ...'
  }, [
    ['yo', 'hablo'], ['tú', 'hablas'], ['él / ella / usted', 'habla'],
    ['nosotros / nosotras', 'hablamos'], ['vosotros / vosotras', 'habláis'], ['ellos / ellas / ustedes', 'hablan']
  ]);
})();
