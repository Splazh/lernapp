// Mathematik Modul 1: Zahlenmengen, Bruchrechnen, Prozent, Potenzen, Terme und Gleichungen, Geometrie.
// Grundlage: Inhaltsverzeichnis des Skripts "Mathematik Modul 1" und der Modulinhalt. Alle Aufgaben sind selbst geschrieben.
// mathInput: Leerzeichen sind egal, "/" ist der Bruchstrich, Komma und Punkt zählen gleich.
(function () {
  const G = 'Mathematik Modul 1';
  const add = (id, title, icon, labels, extra, info, cards) => (window.DECKS = window.DECKS || []).push(
    Object.assign({ id, subject: 'mathe', group: G, title, icon, labels, noModes: ['pairs'], mathInput: true, info, cards }, extra));

  add('ma-zahlenmengen', 'Zahlenmengen', '🔢', ['Zahlenmenge'], {
    pool: ['natürliche Zahlen', 'ganze Zahlen', 'rationale Zahlen', 'irrationale Zahlen', 'komplexe Zahlen']
  }, {
    kurz: 'ℕ, ℤ, ℚ, ℝ, ℂ: Jede Menge enthält die vorherige.',
    form: [
      'ℕ natürliche Zahlen: 1, 2, 3, ...',
      'ℤ ganze Zahlen: ..., −2, −1, 0, 1, 2, ... (auch negativ).',
      'ℚ rationale Zahlen: alle Brüche aus ganzen Zahlen, auch endliche und periodische Dezimalzahlen (1/2, 0,75, 0,333...).',
      'Irrationale Zahlen: Dezimalzahlen, die weder enden noch sich wiederholen (√2, π).',
      'ℝ reelle Zahlen: rationale und irrationale Zahlen zusammen.',
      'ℂ komplexe Zahlen: haben einen Teil mit i, wobei i² = −1 (zum Beispiel 3 + 2i).'
    ],
    use: ['Teilmengen: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ.', 'Der Betrag |a| ist der Abstand zur Null und nie negativ: |−5| = 5. Die Gegenzahl von 5 ist −5.'],
    tip: 'Frage dich bei einer Zahl: Kleinste Menge, in der sie vorkommt? 7 → ℕ, −3 → ℤ, 1/2 → ℚ, √2 → irrational.'
  }, [
    ['7', 'natürliche Zahlen'],
    ['−3', 'ganze Zahlen'],
    ['1/2', 'rationale Zahlen'],
    ['0,75', 'rationale Zahlen'],
    ['√2', 'irrationale Zahlen'],
    ['π', 'irrationale Zahlen'],
    ['√9', 'natürliche Zahlen'],
    ['−10', 'ganze Zahlen'],
    ['0,333... (die 3 wiederholt sich immer)', 'rationale Zahlen'],
    ['3 + 2i', 'komplexe Zahlen'],
    ['Menge aller Brüche aus ganzen Zahlen', 'rationale Zahlen'],
    ['Dezimalzahlen, die nie enden und sich nie wiederholen', 'irrationale Zahlen'],
    ['Die Zahlen 1, 2, 3, ... (zum Zählen)', 'natürliche Zahlen'],
    ['Zahlen mit negativen Zahlen, aber ohne Brüche', 'ganze Zahlen'],
    ['Betrag von −5: |−5| = ?', '5', { w: ['−5', '0', '1/5'] }],
    ['Gegenzahl von 8', '−8', { w: ['8', '1/8', '0'] }]
  ]);

  add('ma-brueche', 'Bruchrechnen', '🍕', ['Ergebnis'], {}, {
    kurz: 'Kürzen, erweitern, addieren, multiplizieren, dividieren.',
    form: [
      'Erweitern: Zähler und Nenner mit derselben Zahl multiplizieren. Kürzen: durch dieselbe Zahl dividieren.',
      'Addieren und Subtrahieren: erst auf gemeinsamen Nenner bringen, dann nur die Zähler rechnen.',
      'Multiplizieren: Zähler mal Zähler, Nenner mal Nenner.',
      'Dividieren: mit dem Kehrbruch multiplizieren (a/b : c/d = a/b · d/c).',
      'Umwandeln: Bruch → Dezimalzahl durch Zähler : Nenner (3/4 = 0,75).'
    ],
    use: [
      'Durch 2 teilbar: Endziffer gerade. Durch 5: Endziffer 0 oder 5. Durch 10: Endziffer 0.',
      'Durch 3 oder 9 teilbar: Quersumme ist durch 3 bzw. 9 teilbar. Durch 4: die letzten zwei Ziffern sind durch 4 teilbar.'
    ],
    tip: 'Gib Brüche gekürzt an, in der Form 3/4, ohne Leerzeichen. Dezimalzahlen mit Komma oder Punkt.'
  }, [
    ['1/2 + 1/3 = ?', '5/6', { w: ['2/5', '1/5', '2/6'] }],
    ['3/4 − 1/4 = ? (gekürzt)', '1/2', { w: ['1/4', '3/8', '1'] }],
    ['2/3 · 3/4 = ? (gekürzt)', '1/2', { w: ['5/7', '6/7', '1/3'] }],
    ['1/2 : 1/4 = ?', '2', { w: ['1/8', '1/2', '4'] }],
    ['2/5 + 1/10 = ? (gekürzt)', '1/2', { w: ['3/15', '3/10', '2/5'] }],
    ['3/8 + 1/4 = ?', '5/8', { w: ['4/12', '1/2', '4/8'] }],
    ['5/6 − 1/3 = ? (gekürzt)', '1/2', { w: ['4/3', '2/3', '1/3'] }],
    ['4/5 · 5/8 = ? (gekürzt)', '1/2', { w: ['9/13', '20/13', '1/4'] }],
    ['Kürze 12/18 vollständig.', '2/3', { w: ['1/3', '3/5', '4/9'] }],
    ['Erweitere 2/3 mit 4.', '8/12', { w: ['6/7', '2/12', '8/3'] }],
    ['0,25 als Bruch (gekürzt)', '1/4', { w: ['1/25', '25/10', '2/5'] }],
    ['3/4 als Dezimalzahl', '0,75', { w: ['0,34', '0,43', '7,5'] }],
    ['1/8 als Dezimalzahl', '0,125', { w: ['0,18', '0,8', '1,25'] }],
    ['Welcher Bruch ist größer: 3/4 oder 2/3?', '3/4', { w: ['2/3', 'gleich groß', 'nicht vergleichbar'] }],
    ['Durch 3 teilbar, wenn ...', 'die Quersumme durch 3 teilbar ist', { w: ['die Endziffer 3 ist', 'die Endziffer gerade ist', 'die Zahl ungerade ist'] }],
    ['Durch 5 teilbar, wenn ...', 'die Endziffer 0 oder 5 ist', { w: ['die Endziffer 5 oder 6 ist', 'die Quersumme 5 ist', 'die Zahl ungerade ist'] }]
  ]);

  add('ma-prozent', 'Prozentrechnung', '💯', ['Ergebnis'], {}, {
    kurz: 'Grundwert, Prozentsatz und Prozentwert: Zwei kennst du, den dritten suchst du.',
    form: [
      'Grundwert G: das Ganze (100 %). Prozentsatz p: die Prozente. Prozentwert W: der Teil.',
      'Prozentwert: W = G · p / 100. Prozentsatz: p = W / G · 100. Grundwert: G = W / p · 100.',
      'Eine Erhöhung um p % bedeutet: Preis mal (1 + p/100). Eine Senkung: Preis mal (1 − p/100).'
    ],
    tip: 'Trick: 10 % sind ein Zehntel, 25 % ein Viertel, 50 % die Hälfte. Mit 10 % und 1 % kommst du schnell auf vieles.'
  }, [
    ['20 % von 150 = ?', '30', { w: ['3', '300', '75'] }],
    ['10 % von 80 = ?', '8', { w: ['80', '0,8', '18'] }],
    ['25 % von 240 = ?', '60', { w: ['6', '120', '100'] }],
    ['Wie viel Prozent sind 12 von 48? (in %)', '25', { w: ['12', '4', '40'] }],
    ['Wie viel Prozent sind 45 von 150? (in %)', '30', { w: ['3', '45', '33'] }],
    ['Wie viel Prozent sind 7 von 20? (in %)', '35', { w: ['7', '27', '70'] }],
    ['Wie viel Prozent sind 60 von 80? (in %)', '75', { w: ['60', '25', '80'] }],
    ['15 % sind 45. Wie groß ist der Grundwert?', '300', { w: ['30', '675', '60'] }],
    ['8 % sind 16. Wie groß ist der Grundwert?', '200', { w: ['128', '20', '2'] }],
    ['50 % sind 35. Wie groß ist der Grundwert?', '70', { w: ['17,5', '35', '7'] }],
    ['Ein Preis von 80 € steigt um 10 %. Neuer Preis in €?', '88', { w: ['90', '8', '72'] }],
    ['Ein Pullover kostet 60 €, minus 25 %. Neuer Preis in €?', '45', { w: ['35', '15', '85'] }],
    ['Nettopreis 100 €, dazu 20 % Mehrwertsteuer. Bruttopreis in €?', '120', { w: ['20', '110', '80'] }],
    ['Der Grundwert ist ...', 'das Ganze, das 100 % entspricht', { w: ['der Teil vom Ganzen', 'die Zahl mit dem Prozentzeichen', 'immer kleiner als der Prozentwert'] }],
    ['Der Prozentwert ist ...', 'der Teil vom Ganzen', { w: ['das Ganze, das 100 % entspricht', 'die Zahl vor dem Prozentzeichen', 'immer gleich dem Grundwert'] }]
  ]);

  add('ma-potenzen', 'Potenzen', '⚡', ['Ergebnis'], {}, {
    kurz: 'Hochzahlen: a^n heißt a wird n-mal mit sich selbst multipliziert.',
    form: [
      'a^m · a^n = a^(m+n) (gleiche Basis: Hochzahlen addieren).',
      'a^m : a^n = a^(m−n) (Hochzahlen subtrahieren).',
      '(a^m)^n = a^(m·n) (Hochzahlen multiplizieren).',
      'a^0 = 1 und a^(−n) = 1 / a^n.'
    ],
    use: ['Zehnerpotenzen schreiben sehr große und sehr kleine Zahlen kurz: 10⁴ = 10000, 10⁻² = 0,01.'],
    tip: 'Bei negativer Basis zählt die Klammer: (−2)² = 4, aber −2² = −4. Ungerade Hochzahl bleibt negativ.'
  }, [
    ['2³ = ?', '8', { w: ['6', '9', '16'] }],
    ['5² = ?', '25', { w: ['10', '52', '7'] }],
    ['10⁴ = ?', '10000', { w: ['1000', '40', '100000'] }],
    ['3⁴ = ?', '81', { w: ['12', '64', '27'] }],
    ['2⁵ = ?', '32', { w: ['10', '25', '16'] }],
    ['2³ · 2⁴ = 2^?  (Hochzahl)', '7', { w: ['12', '1', '8'] }],
    ['(2³)² = 2^?  (Hochzahl)', '6', { w: ['5', '9', '8'] }],
    ['x⁵ : x² = x^?  (Hochzahl)', '3', { w: ['7', '10', '2,5'] }],
    ['7⁰ = ?', '1', { w: ['0', '7', 'nicht definiert'] }],
    ['2⁻¹ = ?', '0,5', { w: ['−2', '2', '−0,5'] }],
    ['10⁻² = ?', '0,01', { w: ['0,1', '−100', '−20'] }],
    ['(−2)³ = ?', '−8', { w: ['8', '−6', '6'] }],
    ['(−3)² = ?', '9', { w: ['−9', '6', '−6'] }],
    ['a^m · a^n = ?', 'a^(m+n)', { w: ['a^(m·n)', 'a^(m−n)', '(2a)^(m+n)'] }],
    ['a^0 = ? (für a ungleich 0)', '1', { w: ['0', 'a', '−1'] }]
  ]);

  add('ma-gleichungen', 'Terme und Gleichungen', '⚖️', ['Ergebnis'], {}, {
    kurz: 'Terme vereinfachen, Klammern auflösen und lineare Gleichungen lösen.',
    form: [
      'Gleichungen lösen: auf beiden Seiten dasselbe tun (addieren, subtrahieren, multiplizieren, dividieren), bis x allein steht.',
      'Gleichartige Terme zusammenfassen: 3a + 5a = 8a.',
      'Klammern auflösen: a · (b + c) = a·b + a·c.',
      'Binomische Formeln: (a+b)² = a² + 2ab + b², (a−b)² = a² − 2ab + b², (a+b)(a−b) = a² − b².',
      'Herausheben: gemeinsamen Faktor vor die Klammer: 6x + 9 = 3(2x + 3).'
    ],
    tip: 'Schreibweise zum Tippen: Hochzahl mit ^ (a^2), kein Leerzeichen nötig. Bei Summen zuerst x, dann y: 6x+3y.'
  }, [
    ['3x + 5 = 20.  x = ?', '5', { w: ['25', '15', '8'] }],
    ['2x − 4 = 10.  x = ?', '7', { w: ['3', '14', '6'] }],
    ['5x = 35.  x = ?', '7', { w: ['30', '175', '40'] }],
    ['x / 3 = 6.  x = ?', '18', { w: ['2', '9', '3'] }],
    ['4x + 2 = 2x + 10.  x = ?', '4', { w: ['6', '2', '8'] }],
    ['x + 7 = 3.  x = ?', '-4', { w: ['4', '10', '-10'] }],
    ['2(x + 3) = 14.  x = ?', '4', { w: ['7', '11', '8'] }],
    ['Vereinfache: 3a + 5a', '8a', { w: ['15a', '8a²', '35a'] }],
    ['Vereinfache: 7b − 2b', '5b', { w: ['9b', '14b', '5'] }],
    ['Vereinfache: 2x + 3y + 4x', '6x+3y', { w: ['9xy', '5x+4y', '6x+7y'] }],
    ['Multipliziere aus: 3(x + 4)', '3x+12', { w: ['3x+4', 'x+12', '3x+7'] }],
    ['(a + b)² = ?', 'a^2+2ab+b^2', { w: ['a^2+b^2', 'a^2+ab+b^2', 'a^2-2ab+b^2'] }],
    ['(a − b)² = ?', 'a^2-2ab+b^2', { w: ['a^2-b^2', 'a^2+2ab+b^2', 'a^2-ab+b^2'] }],
    ['(a + b)(a − b) = ?', 'a^2-b^2', { w: ['a^2+b^2', 'a^2-2ab+b^2', 'a^2+2ab+b^2'] }],
    ['Hebe den gemeinsamen Faktor heraus: 6x + 9', '3(2x+3)', { w: ['6(x+9)', '3(2x+9)', '9(x+1)'] }]
  ]);

  add('ma-geometrie', 'Geometrie: Dreieck, Viereck, Kreis', '📐', ['Antwort'], {}, {
    kurz: 'Winkel, Dreiecksarten, besondere Punkte und Flächenformeln.',
    form: [
      'Winkelsumme: Dreieck 180°, Viereck 360°. Nebenwinkel ergänzen sich zu 180°, Scheitelwinkel sind gleich groß.',
      'Nach Seiten: gleichseitig (3 gleiche Seiten), gleichschenkelig (2 gleiche Seiten), allgemein.',
      'Nach Winkeln: spitzwinkelig (alle unter 90°), rechtwinkelig (ein Winkel 90°), stumpfwinkelig (ein Winkel über 90°).',
      'Besondere Punkte: Höhenschnittpunkt, Schwerpunkt (Seitenhalbierende), Inkreismittelpunkt (Winkelhalbierende), Umkreismittelpunkt (Streckensymmetralen).',
      'Flächen: Rechteck a·b, Quadrat a², Dreieck g·h/2, Parallelogramm g·h, Trapez (a+c)·h/2, Kreis r²·π. Kreisumfang 2·r·π.'
    ],
    tip: 'Zeichne eine Skizze zur Aufgabe. Die Höhe steht immer normal (im rechten Winkel) auf der Grundseite.'
  }, [
    ['Winkelsumme im Dreieck (in Grad)', '180', { w: ['90', '270', '360'] }],
    ['Winkelsumme im Viereck (in Grad)', '360', { w: ['180', '270', '720'] }],
    ['Dreieck mit drei gleich langen Seiten', 'gleichseitiges Dreieck', { w: ['gleichschenkeliges Dreieck', 'rechtwinkeliges Dreieck', 'stumpfwinkeliges Dreieck'] }],
    ['Dreieck mit zwei gleich langen Seiten', 'gleichschenkeliges Dreieck', { w: ['gleichseitiges Dreieck', 'rechtwinkeliges Dreieck', 'spitzwinkeliges Dreieck'] }],
    ['Dreieck mit einem 90°-Winkel', 'rechtwinkeliges Dreieck', { w: ['spitzwinkeliges Dreieck', 'stumpfwinkeliges Dreieck', 'gleichseitiges Dreieck'] }],
    ['Dreieck mit einem Winkel über 90°', 'stumpfwinkeliges Dreieck', { w: ['spitzwinkeliges Dreieck', 'rechtwinkeliges Dreieck', 'gleichschenkeliges Dreieck'] }],
    ['Schnittpunkt der Seitenhalbierenden', 'Schwerpunkt', { w: ['Höhenschnittpunkt', 'Inkreismittelpunkt', 'Umkreismittelpunkt'] }],
    ['Schnittpunkt der Höhen', 'Höhenschnittpunkt', { w: ['Schwerpunkt', 'Inkreismittelpunkt', 'Umkreismittelpunkt'] }],
    ['Schnittpunkt der Winkelhalbierenden (Mittelpunkt des Inkreises)', 'Inkreismittelpunkt', { w: ['Schwerpunkt', 'Höhenschnittpunkt', 'Umkreismittelpunkt'] }],
    ['Schnittpunkt der Streckensymmetralen (Mittelpunkt des Umkreises)', 'Umkreismittelpunkt', { w: ['Schwerpunkt', 'Höhenschnittpunkt', 'Inkreismittelpunkt'] }],
    ['Fläche Rechteck 5 × 3 (in cm²)', '15', { w: ['8', '16', '30'] }],
    ['Fläche Dreieck: Grundseite 8, Höhe 5', '20', { w: ['40', '13', '10'] }],
    ['Fläche Quadrat mit Seite 6', '36', { w: ['24', '12', '6'] }],
    ['Fläche Parallelogramm: g = 7, h = 4', '28', { w: ['14', '11', '56'] }],
    ['Fläche Trapez: a = 6, c = 4, h = 3', '15', { w: ['30', '13', '12'] }],
    ['Kreisfläche (Formel)', 'r^2·π', { w: ['2·r·π', 'r·π', 'd·π'] }],
    ['Kreisumfang (Formel)', '2·r·π', { w: ['r^2·π', 'r·π/2', 'd^2·π'] }]
  ]);
})();
