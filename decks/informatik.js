// Informatik: STARTER-Themen aus allgemeinem Grundlagenwissen.
// Auf Eduvidual gibt es keinen Informatik-Kurs. Bitte mit den Themen aus dem Unterricht abgleichen und ergänzen.
(function () {
  const G = 'Starter (bitte mit dem Unterricht abgleichen)';
  const add = (id, title, icon, extra, info, cards) => (window.DECKS = window.DECKS || []).push(
    Object.assign({ id, subject: 'informatik', group: G, title, icon, labels: ['Antwort'], noModes: ['pairs'], info, cards }, extra));

  add('info-grundlagen', 'Informatik: Grundlagen', '💻', {}, {
    kurz: 'Hardware, Software, Netzwerk und Sicherheit im Überblick.',
    form: [
      'Hardware ist alles, was man anfassen kann (Prozessor, Speicher, Bildschirm). Software sind die Programme.',
      'CPU = Prozessor, rechnet. RAM = Arbeitsspeicher, schnell, aber leer nach dem Ausschalten. SSD/Festplatte speichern dauerhaft.',
      'Ein Algorithmus ist eine eindeutige Schritt-für-Schritt-Anleitung zur Lösung einer Aufgabe.',
      'Jedes Gerät im Netz hat eine IP-Adresse. Das DNS übersetzt Namen (www.beispiel.at) in IP-Adressen.'
    ],
    tip: 'Sichere Passwörter sind lang, gemischt und für jedes Konto anders. Phishing-Mails erkennt man an Druck, Tippfehlern und falschen Links.'
  }, [
    ['Wie nennt man alle anfassbaren Teile eines Computers?', 'Hardware', { w: ['Software', 'Firmware', 'Netzwerk'] }],
    ['Wie nennt man Programme und Daten?', 'Software', { w: ['Hardware', 'Zubehör', 'Gehäuse'] }],
    ['Wofür steht CPU?', 'Prozessor (Central Processing Unit)', { w: ['Festplatte', 'Bildschirm', 'Netzteil'] }],
    ['Was ist der RAM?', 'der schnelle Arbeitsspeicher', { w: ['die dauerhafte Festplatte', 'die Grafikkarte', 'das Netzteil'] }],
    ['Wann verliert der RAM seinen Inhalt?', 'beim Ausschalten', { w: ['nie', 'nach einer Woche', 'beim Speichern'] }],
    ['Was speichert Daten dauerhaft?', 'SSD oder Festplatte', { w: ['RAM', 'Prozessor', 'Tastatur'] }],
    ['Was ist ein Betriebssystem?', 'Software, die den Computer steuert (zum Beispiel Windows)', { w: ['Ein Virenschutz', 'Ein Drucker', 'Ein Textprogramm'] }],
    ['Was ist ein Algorithmus?', 'eine eindeutige Folge von Schritten zur Lösung einer Aufgabe', { w: ['ein Computervirus', 'ein Stück Hardware', 'eine Internetseite'] }],
    ['Was ist eine IP-Adresse?', 'die Adresse eines Geräts im Netzwerk', { w: ['ein Passwort', 'ein Programm', 'ein Dateityp'] }],
    ['Was macht das DNS?', 'Es übersetzt Namen in IP-Adressen', { w: ['Es verschlüsselt Dateien', 'Es lädt Videos', 'Es repariert Router'] }],
    ['Was ist 1 Byte?', '8 Bit', { w: ['2 Bit', '10 Bit', '1000 Bit'] }],
    ['Was ist größer: ein Megabyte oder ein Gigabyte?', 'ein Gigabyte', { w: ['ein Megabyte', 'beide gleich', 'ein Kilobyte'] }],
    ['Was ist Phishing?', 'Betrug, bei dem man zur Preisgabe von Daten gebracht wird', { w: ['Ein schneller Computer', 'Ein Backup-Programm', 'Ein Fischen im Netz für Spaß'] }],
    ['Was macht ein sicheres Passwort aus?', 'lang, gemischt und für jedes Konto anders', { w: ['kurz und leicht zu merken', 'der eigene Name', 'überall dasselbe'] }],
    ['Wofür steht die Dateiendung .pdf?', 'ein Dokument (Portable Document Format)', { w: ['ein Bild', 'ein Lied', 'ein Programm'] }],
    ['Was bedeutet Cloud-Speicher?', 'Daten liegen auf Servern im Internet', { w: ['Daten liegen nur auf dem USB-Stick', 'Daten werden gelöscht', 'Daten liegen im Prozessor'] }]
  ]);

  add('info-binaer', 'Binärzahlen', '🔟', { mathInput: true }, {
    kurz: 'Computer rechnen mit 0 und 1. Hier übst du Umrechnen zwischen Binär und Dezimal.',
    form: [
      'Binär hat nur die Ziffern 0 und 1. Von rechts nach links stehen die Stellenwerte 1, 2, 4, 8, 16, 32, 64, 128.',
      'Binär → dezimal: Stellenwerte der Einsen addieren. 1010 = 8 + 2 = 10.',
      'Dezimal → binär: Zahl in Stellenwerte zerlegen. 13 = 8 + 4 + 1 = 1101.',
      'Mit n Bit lassen sich 2^n Werte darstellen. Mit 8 Bit sind das 256 (0 bis 255).'
    ],
    tip: 'Schreib dir die Zweierpotenzen auf: 1, 2, 4, 8, 16, 32, 64, 128. Damit klappt jede Umrechnung.'
  }, [
    ['Dezimal 5 als Binärzahl', '101', { w: ['110', '11', '1001'] }],
    ['Dezimal 8 als Binärzahl', '1000', { w: ['100', '1010', '10000'] }],
    ['Dezimal 10 als Binärzahl', '1010', { w: ['1001', '1100', '101'] }],
    ['Dezimal 13 als Binärzahl', '1101', { w: ['1011', '1110', '1001'] }],
    ['Dezimal 15 als Binärzahl', '1111', { w: ['1110', '11111', '1011'] }],
    ['Dezimal 16 als Binärzahl', '10000', { w: ['1000', '11111', '10001'] }],
    ['Binär 110 als Dezimalzahl', '6', { w: ['5', '7', '8'] }],
    ['Binär 1001 als Dezimalzahl', '9', { w: ['8', '10', '11'] }],
    ['Binär 1111 als Dezimalzahl', '15', { w: ['16', '14', '8'] }],
    ['Binär 10000 als Dezimalzahl', '16', { w: ['10', '15', '32'] }],
    ['Binär 11111111 als Dezimalzahl', '255', { w: ['256', '128', '127'] }],
    ['Wie viele Werte lassen sich mit 8 Bit darstellen?', '256', { w: ['255', '128', '8'] }]
  ]);
})();
