// Geographie und wirtschaftliche Bildung 1 (WS 2026/27), Einheiten 1 bis 12 (Geoökosysteme).
// Grundlage: Folien und Arbeitsaufträge auf Eduvidual und der Leitfaden. Karten und Sätze sind selbst geschrieben.
// Der 1. Test ist laut Leitfaden am 27.11. (handschriftlich, ca. 20-30 Minuten).
(function () {
  const G = 'Geoökosysteme (Einheiten 1 bis 12)';
  const add = (id, title, icon, info, cards) => (window.DECKS = window.DECKS || []).push(
    { id, subject: 'geografie', group: G, title, icon, labels: ['Antwort'], noModes: ['pairs'], info, cards });

  add('geo-karten', 'Karten und Gliederung der Erde', '🗺️', {
    kurz: 'Einheit 1 und 2: Wie wir die Erde einteilen, messen und auf Karten abbilden.',
    form: [
      'Geographie liegt zwischen Natur- und Sozialwissenschaft: Sie erforscht Orte und die Beziehung zwischen Mensch und Umwelt.',
      'Koordinaten: Breitengrade (parallel zum Äquator) und Längengrade (ab dem Nullmeridian). Salzburg liegt bei etwa 48° N und 13° O.',
      'Eine Kugel lässt sich nicht verzerrungsfrei auf ein Blatt legen. Projektionen müssen abwägen zwischen winkeltreu, flächentreu und längentreu.',
      'Mercator: winkeltreu (Navigation), zu den Polen hin stark verzerrt. Gall-Peters: flächentreu. Robinson: Kompromiss, Standard in Atlanten.',
      'Topographische Karten sind vereinfachte Modelle und werden generalisiert. Thematische Karten legen zusätzliche Informationen (zum Beispiel Einwohnerdichte) auf eine Grundkarte.',
      'Navigation per Satellit (GNSS): GPS (USA), Glonass (Russland), Galileo (EU), Beidou (China). Die Position entsteht durch Triangulation mit mindestens 3 Satelliten.'
    ],
    tip: 'Überholte Gliederungen (Kontinente, Kulturerdteile, "Drei Welten") zeigen, wie man früher auf die Welt geblickt hat. Das Drei-Welten-Modell ist seit 1989 nicht mehr üblich.'
  }, [
    ['Wie nennt man die Linien parallel zum Äquator?', 'Breitengrade', { w: ['Längengrade', 'Meridiane', 'Wendekreise'] }],
    ['Von welcher Linie aus zählt man die Längengrade?', 'Nullmeridian', { w: ['Äquator', 'Wendekreis', 'Polarkreis'] }],
    ['Welche Projektion ist winkeltreu und wichtig für die Navigation?', 'Mercator-Projektion', { w: ['Gall-Peters-Projektion', 'Robinson-Projektion', 'Globus-Projektion'] }],
    ['Welche Projektion zeigt die Flächen der Länder richtig (flächentreu)?', 'Gall-Peters-Projektion', { w: ['Mercator-Projektion', 'Robinson-Projektion', 'Winkelprojektion'] }],
    ['Welche Projektion ist ein Kompromiss und steht in vielen Atlanten?', 'Robinson-Projektion', { w: ['Mercator-Projektion', 'Gall-Peters-Projektion', 'Zylinderprojektion'] }],
    ['Was zeigt die Mercator-Karte zu den Polen hin?', 'Starke Verzerrung der Größen', { w: ['Genaue Größen', 'Keine Länder', 'Kleinere Winkel'] }],
    ['Was ist die Aufgabe einer topographischen Karte?', 'Ein vereinfachtes Modell der Wirklichkeit zeigen', { w: ['Nur Grenzen zeigen', 'Nur Wetter zeigen', 'Alles genau wie in der Wirklichkeit zeigen'] }],
    ['Was macht eine thematische Karte aus?', 'Sie legt zusätzliche Informationen auf eine Grundkarte', { w: ['Sie zeigt nur Höhenlinien', 'Sie ist immer flächentreu', 'Sie besteht nur aus Luftbildern'] }],
    ['Wie nennt man die Satelliten-Navigation allgemein?', 'GNSS', { w: ['GPRS', 'WLAN', 'LTE'] }],
    ['Das Navigationssystem der EU heißt ...', 'Galileo', { w: ['GPS', 'Glonass', 'Beidou'] }],
    ['Das Navigationssystem Chinas heißt ...', 'Beidou', { w: ['Galileo', 'Glonass', 'GPS'] }],
    ['Mit wie vielen Satelliten (mindestens) bestimmt man die Position per Triangulation?', '3', { w: ['1', '2', '10'] }],
    ['Seit wann gilt das Konzept der „Drei Welten" nicht mehr?', 'seit 1989', { w: ['seit 1945', 'seit 2001', 'seit 1970'] }],
    ['Wie viele Kontinente zählt man je nach Zählweise?', 'zwischen 5 und 7', { w: ['immer genau 4', 'zwischen 2 und 3', 'zwischen 9 und 12'] }]
  ]);

  add('geo-geologie', 'Geologie und Plattentektonik', '🌋', {
    kurz: 'Einheit 3: Aufbau der Erde, Gesteinskreislauf und bewegte Platten.',
    form: [
      'Schalenaufbau: fester innerer Kern (Eisen), zähflüssiger Erdmantel mit teilweise flüssigem Magma, feste Erdkruste. Konvektionsströme im Mantel bewegen die Platten.',
      'Gesteinskreislauf: Magma kühlt zu Magmatit, Verwitterung macht Sedimente, Druck macht Sedimentgestein, Hitze und Druck machen Metamorphit.',
      'Sedimente nach Korngröße: Ton (bis 0,002 mm), Schluff, Sand (0,063 bis 2 mm), Kies (2 bis 63 mm), Steine (über 63 mm).',
      'Magmatit: Plutonite kühlen im Erdinneren langsam ab (Granit), Vulkanite an der Oberfläche (Basalt). Sediment: Kalkstein. Metamorphit: Marmor.',
      'Die Erdkruste besteht aus 7 großen Platten (mit kleineren bis zu 14).',
      'Divergierende Platten bewegen sich voneinander weg (Mittelozeanischer Rücken, Rift). Konvergierende Platten bewegen sich aufeinander zu (Subduktionszone, Gebirgsbildung). Bei Transformstörungen gleiten sie aneinander vorbei (San-Andreas-Verwerfung).'
    ],
    tip: 'Beispiele für Gebirge durch Plattenkollision: Alpen (Afrika und Eurasien), Himalaya (Indien und Eurasien), Anden (Pazifik- und Südamerikanische Platte).'
  }, [
    ['Welcher Teil der Erde ist fest und besteht aus Eisen?', 'der innere Kern', { w: ['der Erdmantel', 'die Erdkruste', 'der äußere Kern'] }],
    ['Welche Schale ist zähflüssig und enthält teilweise flüssiges Magma?', 'der Erdmantel', { w: ['der innere Kern', 'die Erdkruste', 'die Atmosphäre'] }],
    ['Was bewegt die Platten der Erdkruste?', 'Konvektionsströme im Erdmantel', { w: ['Gezeiten des Mondes', 'Wind', 'Gletscher'] }],
    ['Welche Korngröße hat Sand?', '0,063 bis 2 mm', { w: ['bis 0,002 mm', '2 bis 63 mm', 'über 63 mm'] }],
    ['Welche Korngröße hat Kies?', '2 bis 63 mm', { w: ['0,063 bis 2 mm', 'über 63 mm', 'bis 0,002 mm'] }],
    ['Wie nennt man Gestein, das im Erdinneren langsam abkühlt?', 'Plutonit', { w: ['Vulkanit', 'Sediment', 'Metamorphit'] }],
    ['Wie nennt man Gestein, das an der Oberfläche erstarrt?', 'Vulkanit', { w: ['Plutonit', 'Sedimentgestein', 'Metamorphit'] }],
    ['Kalkstein ist ein ...', 'Sedimentgestein', { w: ['Plutonit', 'Vulkanit', 'Metamorphit'] }],
    ['Marmor ist ein ...', 'Metamorphit', { w: ['Sedimentgestein', 'Plutonit', 'Vulkanit'] }],
    ['Granit ist ein ...', 'Plutonit', { w: ['Vulkanit', 'Sedimentgestein', 'Metamorphit'] }],
    ['Basalt ist ein ...', 'Vulkanit', { w: ['Plutonit', 'Sedimentgestein', 'Metamorphit'] }],
    ['Wie nennt man Platten, die sich voneinander wegbewegen?', 'divergierende Platten', { w: ['konvergierende Platten', 'Transformplatten', 'stehende Platten'] }],
    ['Wie nennt man Platten, die sich aufeinander zubewegen?', 'konvergierende Platten', { w: ['divergierende Platten', 'Transformplatten', 'stehende Platten'] }],
    ['Was entsteht an divergierenden Platten im Meer?', 'ein Mittelozeanischer Rücken', { w: ['eine Subduktionszone', 'ein Hochgebirge', 'eine Seitenverschiebung'] }],
    ['Was geschieht in einer Subduktionszone?', 'Eine Platte schiebt sich unter die andere', { w: ['Zwei Platten reißen auseinander', 'Zwei Platten gleiten seitlich vorbei', 'Magma kühlt zu Sand ab'] }],
    ['Welche Plattengrenze ist die San-Andreas-Verwerfung?', 'eine Seitenverschiebung (Transform)', { w: ['ein Mittelozeanischer Rücken', 'eine Subduktionszone', 'ein Hotspot'] }],
    ['Durch welche Kollision sind die Alpen entstanden?', 'Afrikanische und Eurasische Platte', { w: ['Indische und Eurasische Platte', 'Pazifische und Nordamerikanische Platte', 'Antarktische und Australische Platte'] }],
    ['Wo gibt es besonders viele Erdbeben und Vulkane?', 'am Pazifischen Feuerring', { w: ['am Mittelmeer allein', 'in der Antarktis', 'in der Sahara'] }]
  ]);

  add('geo-vulkane', 'Vulkanismus', '🔥', {
    kurz: 'Einheit 4: Vulkantypen, Formen und Eruptionen.',
    form: [
      'Drei Vulkantypen nach der Entstehung: Riftvulkane (Island), Hotspot-Vulkane (Hawaii) und Subduktionsvulkane (Mount St. Helens).',
      'Ein Hotspot ist wie eine Kerze im Mantel: Er steht still, die Platte wandert darüber und es entsteht eine Inselkette.',
      'Basisches Magma (viel Calcium und Magnesium, zum Beispiel Basalt) ist dünnflüssig und wenig explosiv. Saures Magma (viel Kieselsäure, zum Beispiel Granit, Rhyolith) ist zäh und explosiv.',
      'Stratovulkan (Schichtvulkan): Schichten aus Lava und Asche, steil, sehr explosiv. Eruptionen plinianisch (Vesuv) oder strombolianisch.',
      'Schildvulkan: flach, nur Lava, dünnflüssig und schnell (bis 50 km/h), weniger explosiv. Eruption hawaiianisch.',
      'Weitere Formen: Caldera (eingestürzter Krater, kann ein See werden), Aschekegel, Tafelvulkan.'
    ],
    tip: 'Merke: Mehr Kieselsäure macht das Magma zäher und den Ausbruch explosiver.'
  }, [
    ['Welcher Vulkantyp entsteht an divergierenden Platten (Beispiel Island)?', 'Riftvulkan', { w: ['Hotspot-Vulkan', 'Subduktionsvulkan', 'Schildvulkan'] }],
    ['Welcher Vulkantyp liegt über einer Stelle im Mantel, die ortsfest bleibt (Beispiel Hawaii)?', 'Hotspot-Vulkan', { w: ['Riftvulkan', 'Subduktionsvulkan', 'Tafelvulkan'] }],
    ['Mount St. Helens ist ein ...', 'Subduktionsvulkan', { w: ['Riftvulkan', 'Hotspot-Vulkan', 'Schildvulkan'] }],
    ['Wie entsteht eine Vulkan-Inselkette wie Hawaii?', 'Die Platte wandert über einen ortsfesten Hotspot', { w: ['Zwei Platten kollidieren', 'Der Mond zieht am Meer', 'Ein Vulkan wandert durch das Wasser'] }],
    ['Basisches Magma ist ...', 'dünnflüssig und wenig explosiv', { w: ['zäh und sehr explosiv', 'kalt und fest', 'reich an Kieselsäure'] }],
    ['Saures Magma ist ...', 'zäh und explosiv', { w: ['dünnflüssig und harmlos', 'reich an Calcium und Magnesium', 'immer schwarz'] }],
    ['Welcher Stoff macht Magma zäher und explosiver?', 'Kieselsäure', { w: ['Calcium', 'Magnesium', 'Wasserstoff'] }],
    ['Welcher Vulkan besteht aus Schichten von Lava und Asche und ist steil?', 'Stratovulkan', { w: ['Schildvulkan', 'Tafelvulkan', 'Aschekegel'] }],
    ['Welcher Vulkan ist flach und besteht nur aus Lava?', 'Schildvulkan', { w: ['Stratovulkan', 'Caldera', 'Aschekegel'] }],
    ['Wie nennt man die Eruption auf Hawaii mit fließender Lava?', 'hawaiianisch', { w: ['plinianisch', 'strombolianisch', 'explosiv'] }],
    ['Welche Eruption hat hohe Aschewolken, zum Beispiel beim Vesuv?', 'plinianisch', { w: ['hawaiianisch', 'strombolianisch', 'effusiv'] }],
    ['Wie nennt man einen eingestürzten Vulkankrater, der zum See werden kann?', 'Caldera', { w: ['Tafelvulkan', 'Aschekegel', 'Rift'] }],
    ['Wie schnell kann Lava eines Schildvulkans fließen (bis zu)?', '50 km/h', { w: ['5 km/h', '500 km/h', '1 km/h'] }]
  ]);

  add('geo-atmosphaere', 'Atmosphäre und Strahlung', '🌤️', {
    kurz: 'Einheit 5: Aufbau der Lufthülle, Wolken, Temperatur mit der Höhe und Treibhauseffekt.',
    form: [
      'Zusammensetzung: Stickstoff 78,1 %, Sauerstoff 20,9 %, Argon 0,93 %, Kohlendioxid 0,04 %.',
      'Schichten von unten: Troposphäre (0 bis 13 km, hier ist das Wetter), Stratosphäre (13 bis 48 km, mit Ozonschicht), Mesosphäre (48 bis 80 km), Thermosphäre (80 bis 500 km).',
      'Warme Luft kann mehr Wasser aufnehmen als kalte. Steigt sie auf und kühlt ab, kondensiert das Wasser: Wolken entstehen.',
      'Wolken: Cirrus (hohe Eiswolken), Stratus (Nebel), Cumulus (Quellwolken), Cumulonimbus (Gewitter).',
      'Trockene Luft kühlt beim Aufsteigen um etwa 1 K pro 100 m ab (trockenadiabatisch), feuchte weniger. Bei einer Inversion wird es nach oben wärmer.',
      'Albedo ist das Rückstrahlvermögen: Neuschnee 75 bis 95 %, Gras 15 bis 25 %, Asphalt 5 bis 20 %, Wasser 3 bis 10 %.',
      'Treibhausgase werfen einen Teil der Erdausstrahlung (Gegenstrahlung) zurück. Zu viel CO₂ verstärkt das: anthropogener Treibhauseffekt.'
    ],
    tip: 'Energie geht nie verloren, sie wandelt sich nur um: Sonnenenergie wird Wärmeenergie, Verdunstung bindet Energie als latente Wärme.'
  }, [
    ['Wie viel Prozent der Luft ist Stickstoff?', '78,1 %', { w: ['20,9 %', '0,93 %', '50 %'] }],
    ['Wie viel Prozent der Luft ist Sauerstoff?', '20,9 %', { w: ['78,1 %', '0,04 %', '50 %'] }],
    ['Wie viel Prozent der Luft ist Kohlendioxid?', '0,04 %', { w: ['4 %', '0,93 %', '20 %'] }],
    ['In welcher Schicht findet das Wetter statt?', 'Troposphäre', { w: ['Stratosphäre', 'Mesosphäre', 'Thermosphäre'] }],
    ['In welcher Schicht liegt die Ozonschicht?', 'Stratosphäre', { w: ['Troposphäre', 'Mesosphäre', 'Thermosphäre'] }],
    ['Wie reihen sich die Schichten von unten nach oben?', 'Tropo-, Strato-, Meso-, Thermosphäre', { w: ['Strato-, Tropo-, Meso-, Thermosphäre', 'Thermo-, Meso-, Strato-, Troposphäre', 'Meso-, Tropo-, Thermo-, Stratosphäre'] }],
    ['Wie hoch reicht die Troposphäre (laut Folien)?', 'bis 13 km', { w: ['bis 5 km', 'bis 48 km', 'bis 80 km'] }],
    ['Was kann warme Luft besser als kalte Luft?', 'mehr Wasser aufnehmen', { w: ['weniger Wasser aufnehmen', 'schneller gefrieren', 'schwerer werden'] }],
    ['Wie heißt der Übergang von Wasserdampf zu Wasser?', 'Kondensation', { w: ['Verdunstung', 'Erstarrung', 'Sublimation'] }],
    ['Wie heißt der Übergang von flüssig zu gasförmig?', 'Verdunstung', { w: ['Kondensation', 'Erstarrung', 'Resublimation'] }],
    ['Welche Wolke bringt Gewitter?', 'Cumulonimbus', { w: ['Cirrus', 'Stratus', 'Cumulus'] }],
    ['Welche Wolke ist Nebel in Bodennähe?', 'Stratus', { w: ['Cirrus', 'Cumulonimbus', 'Cumulus'] }],
    ['Um wie viel kühlt trockene Luft beim Aufsteigen ab?', 'um 1 K pro 100 m', { w: ['um 10 K pro 100 m', 'um 0,1 K pro 100 m', 'gar nicht'] }],
    ['Was ist eine Inversion?', 'Es wird nach oben hin wärmer', { w: ['Es wird nach oben hin kälter', 'Die Luft steigt schnell auf', 'Es regnet stark'] }],
    ['Welche Fläche hat die höchste Albedo?', 'Neuschnee', { w: ['Gras', 'Asphalt', 'Wasser'] }],
    ['Welches Phänomen verstärkt CO₂ in der Atmosphäre?', 'die Gegenstrahlung', { w: ['die Albedo', 'die Verdunstung', 'den Wind'] }]
  ]);

  add('geo-klima', 'Wetter, Klima und Klimadiagramm', '📊', {
    kurz: 'Einheit 6: Klimaelemente, Klimadiagramm und Klimazonen.',
    form: [
      'Wetter: der momentane Zustand der Atmosphäre an einem Ort. Klima: der langfristige Durchschnitt des Wetters, mindestens 30 Jahre.',
      'Klimaelemente: Temperatur (°C), Niederschlag (mm bzw. Liter pro m²), Wind (km/h), Luftdruck (hPa), Luftfeuchtigkeit (%), Bewölkung (wolkenlos bis bedeckt).',
      'Klimadiagramm: Temperatur als Kurve (Tagesmittel), Niederschlag als Säulen (Monatssumme). Angegeben sind Ortsname, Seehöhe, Jahresdurchschnittstemperatur und Jahresniederschlag.',
      'Klimazonen (Beispiele): Boreale Zone und Tundra (Mitteltemperatur unter 0°), Mittelbreiten (immer feucht, bis 12°), Subtropen (im Sommer sehr trocken, 12° bis 24°).'
    ],
    tip: 'Catania liegt in Italien (Sizilien): Mittelmeerklima mit heißem, trockenem Sommer und milden, feuchteren Wintern.'
  }, [
    ['Wie nennt man den momentanen Zustand der Atmosphäre an einem Ort?', 'Wetter', { w: ['Klima', 'Witterung', 'Jahreszeit'] }],
    ['Wie nennt man den langfristigen Durchschnitt des Wetters?', 'Klima', { w: ['Wetter', 'Jahreszeit', 'Großwetterlage'] }],
    ['Über wie viele Jahre mittelt man mindestens für das Klima?', '30 Jahre', { w: ['3 Jahre', '10 Jahre', '100 Jahre'] }],
    ['Mit welcher Einheit misst man den Niederschlag?', 'mm (Liter pro m²)', { w: ['°C', 'km/h', 'hPa'] }],
    ['Mit welcher Einheit misst man den Luftdruck?', 'hPa', { w: ['mm', 'km/h', '%'] }],
    ['Mit welcher Einheit misst man die Luftfeuchtigkeit?', 'Prozent', { w: ['Millimeter', 'Hektopascal', 'Grad Celsius'] }],
    ['Welche Klimaelemente gibt es? (Beispiel)', 'Temperatur, Niederschlag, Wind, Luftdruck, Feuchte, Bewölkung', { w: ['Wetter, Klima, Boden, Wasser', 'Nord, Süd, Ost, West', 'Sommer, Winter, Frühling, Herbst'] }],
    ['Wie zeigt ein Klimadiagramm die Temperatur?', 'als Kurve', { w: ['als Säulen', 'als Kreis', 'als Tabelle'] }],
    ['Wie zeigt ein Klimadiagramm den Niederschlag?', 'als Säulen', { w: ['als Kurve', 'als Pfeile', 'als Kreis'] }],
    ['Welcher Wert für die Temperatur wird gemessen: Mittelwert oder Summe?', 'Mittelwert des Tages', { w: ['Summe des Monats', 'Höchstwert des Jahres', 'Tiefstwert des Jahres'] }],
    ['Welcher Wert für den Niederschlag wird gebildet?', 'Summe des Monats', { w: ['Mittelwert des Tages', 'Höchstwert', 'Durchschnitt der Woche'] }],
    ['Klimazone mit Mitteltemperatur unter 0°?', 'Boreale Zone und Tundra', { w: ['Mittelbreiten', 'Subtropen', 'Tropen'] }],
    ['Klimazone, die immer feucht ist (bis 12°)?', 'Mittelbreiten', { w: ['Subtropen', 'Boreale Zone', 'Wüste'] }],
    ['Klimazone mit sehr trockenem Sommer (12° bis 24°)?', 'Subtropen', { w: ['Mittelbreiten', 'Tundra', 'Tropen'] }],
    ['In welchem Land liegt Catania?', 'Italien', { w: ['Spanien', 'Griechenland', 'Frankreich'] }]
  ]);

  add('geo-wind', 'Luftdruck, Wind und Wetterlagen', '💨', {
    kurz: 'Einheit 7 und 8: Hoch und Tief, Großwetterlagen, Winde und Föhn.',
    form: [
      'Luftdruck ist die Kraft durch das Gewicht der Luft über einem Punkt. Er nimmt mit der Höhe ab: Meereshöhe ca. 1013 hPa, Salzburg ca. 960, Gaisberg ca. 870, Mount Everest ca. 325 hPa.',
      'Wind ist Luft, die vom Hoch zum Tief strömt. Ein Tief saugt Luft an, sie steigt auf, kühlt ab, es gibt Wolken und Regen. Ein Hoch drückt Luft weg, sie sinkt ab, Wolken lösen sich auf.',
      'Auf der Nordhalbkugel drehen sich Tiefs gegen den Uhrzeigersinn.',
      'Großwetterlagen Europas: Islandtief und Azorenhoch. Sind beide stark, kommt feuchter, starker Westwind vom Atlantik. Ein dominantes Azorenhoch bringt Mittel- und Südeuropa sonniges, windstilles Wetter.',
      'Genuatief: Tief im nördlichen Mittelmeer. Scirocco: Wind bei einem Tief über der nördlichen Sahara.',
      'Beaufort-Skala: 0 Windstille, 3 schwache Brise, 6 starker Wind, 9 Sturm, 10 schwerer Sturm, 12 Orkan (über 118 km/h).',
      'Lokale Winde: Seewind (tagsüber Meer zu Land), Hangwind (tagsüber den Hang hinauf, nachts ins Tal), Föhn (warmer, trockener Fallwind auf der Leeseite von Gebirgen).'
    ],
    tip: 'Föhn: Die feuchte Luft steigt an der Luvseite auf, regnet ab, kommt trocken auf der Leeseite an und erwärmt sich beim Absinken stark.'
  }, [
    ['Wie nennt man Luftbewegung vom Hoch zum Tief?', 'Wind', { w: ['Konvektion', 'Inversion', 'Strömung im Boden'] }],
    ['Was passiert mit dem Luftdruck, wenn man höher steigt?', 'Er nimmt ab', { w: ['Er nimmt zu', 'Er bleibt gleich', 'Er schwankt nicht'] }],
    ['Wie hoch ist der Luftdruck auf Meereshöhe etwa?', 'ca. 1013 hPa', { w: ['ca. 325 hPa', 'ca. 870 hPa', 'ca. 2000 hPa'] }],
    ['Wie hoch ist der Luftdruck auf dem Mount Everest etwa?', 'ca. 325 hPa', { w: ['ca. 1013 hPa', 'ca. 870 hPa', 'ca. 100 hPa'] }],
    ['Was macht ein Tiefdruckgebiet mit der Luft in Bodennähe?', 'Es saugt Luft an, sie steigt auf', { w: ['Es drückt Luft weg', 'Es hält Luft am Boden', 'Es kühlt Luft nicht ab'] }],
    ['Welches Wetter bringt ein Hochdruckgebiet meist?', 'sonnig, Wolken lösen sich auf', { w: ['Regen und Sturm', 'immer Nebel', 'Gewitter'] }],
    ['In welche Richtung drehen sich Tiefs auf der Nordhalbkugel?', 'gegen den Uhrzeigersinn', { w: ['im Uhrzeigersinn', 'gar nicht', 'hin und her'] }],
    ['Welche zwei Druckgebiete steuern das Wetter Europas?', 'Islandtief und Azorenhoch', { w: ['Sibirienhoch und Genuatief', 'Alpenhoch und Nordseetief', 'Saharatief und Polarhoch'] }],
    ['Woher kommt der Wind bei starkem Islandtief und Azorenhoch?', 'aus Westen vom Atlantik', { w: ['aus Osten', 'aus Süden von der Sahara', 'aus Norden vom Pol'] }],
    ['Was bringt ein dominantes Azorenhoch?', 'sonniges, windstilles Wetter', { w: ['viel Regen', 'Kälte aus dem Norden', 'Schneestürme'] }],
    ['Wie heißt ein Tief im nördlichen Mittelmeer?', 'Genuatief', { w: ['Islandtief', 'Azorenhoch', 'Saharatief'] }],
    ['Wie heißt der Wind bei einem Tief über der nördlichen Sahara?', 'Scirocco', { w: ['Föhn', 'Passat', 'Bora'] }],
    ['Welche Windstärke ist 12 auf der Beaufort-Skala?', 'Orkan', { w: ['Sturm', 'schwache Brise', 'Windstille'] }],
    ['Was ist Föhn?', 'ein warmer, trockener Fallwind auf der Leeseite', { w: ['ein kalter Wind vom Meer', 'ein Wind der Wüste', 'ein tropischer Sturm'] }],
    ['Wohin weht der Hangwind tagsüber?', 'den Hang hinauf', { w: ['den Hang hinunter', 'zum Meer', 'in die Wolken'] }],
    ['Woher weht der Seewind tagsüber?', 'vom Meer zum Land', { w: ['vom Land zum Meer', 'vom Berg ins Tal', 'aus der Höhe'] }]
  ]);

  add('geo-zirkulation', 'Globale Zirkulation', '🌀', {
    kurz: 'Einheit 9: Wie Luft rund um die Erde zirkuliert und warum es Regenwälder und Wüsten gibt.',
    form: [
      'Die Erde dreht sich. Am Äquator ist die Drehgeschwindigkeit größer als an den Polen. Die Corioliskraft lenkt Luft auf der Nordhalbkugel nach rechts ab.',
      'Hadley-Zelle: Am Äquator (ITC, Innertropische Konvergenzzone) steigt feuchte Luft auf, es regnet viel: tropischer Regenwald. In den Subtropen sinkt die trockene Luft ab: Wüsten.',
      'Passate sind Ostwinde in den Tropen. In den mittleren Breiten herrschen Westwinde (Ferrel-Zelle).',
      'Drei Zirkulationen: außertropische Westwindzirkulation (Jetstreams), tropische Passatzirkulation und tropische Monsunzirkulation (Verschiebung der ITC, Sommermonsun).',
      'Trockenes Passatregime: Kalte Meeresströme (Kanaren-, Benguelastrom) und absinkende Luft bringen Nebel, aber kaum Regen.'
    ],
    tip: 'Rätsel Insel: Auf der Luvseite (wo der Passat herkommt) regnet es ab, dort ist es grün. Auf der Leeseite bleibt es trocken und braun.'
  }, [
    ['Wie heißt die Kraft, die Luft durch die Erddrehung ablenkt?', 'Corioliskraft', { w: ['Schwerkraft', 'Zentrifugalkraft', 'Gezeitenkraft'] }],
    ['Wohin lenkt die Corioliskraft Luft auf der Nordhalbkugel ab?', 'nach rechts', { w: ['nach links', 'nach oben', 'gar nicht'] }],
    ['Wo ist die Drehgeschwindigkeit der Erde am größten?', 'am Äquator', { w: ['an den Polen', 'in den mittleren Breiten', 'überall gleich'] }],
    ['Wofür steht ITC?', 'Innertropische Konvergenzzone', { w: ['Internationale Temperaturzone', 'Innere Tiefdruckzone', 'Inselklima-Trockenzone'] }],
    ['Was passiert mit der Luft an der ITC?', 'Sie steigt auf', { w: ['Sie sinkt ab', 'Sie steht still', 'Sie fließt zum Pol'] }],
    ['Warum gibt es am Äquator Regenwald?', 'Aufsteigende Luft bringt viel Wolken und Regen', { w: ['Absinkende Luft bringt Regen', 'Der Passat bringt Schnee', 'Es gibt dort keine Sonne'] }],
    ['Was passiert mit der Luft in den Subtropen?', 'Sie sinkt ab', { w: ['Sie steigt auf', 'Sie friert', 'Sie dreht um'] }],
    ['Welche Folge hat absinkende Luft in den Subtropen?', 'Trockenheit, es entstehen Wüsten', { w: ['Regenwald', 'Gletscher', 'Monsun'] }],
    ['Passate sind in den Tropen ...', 'Ostwinde', { w: ['Westwinde', 'Nordwinde', 'Südwinde'] }],
    ['In den mittleren Breiten herrschen ...', 'Westwinde', { w: ['Ostwinde', 'Passate', 'Monsune'] }],
    ['Wie heißt die Zelle am Äquator?', 'Hadley-Zelle', { w: ['Ferrel-Zelle', 'Polarzelle', 'Walker-Zelle'] }],
    ['Welche Zirkulation ist an die Verschiebung der ITC gebunden?', 'Monsunzirkulation', { w: ['Passatzirkulation', 'Westwindzirkulation', 'Polarzirkulation'] }],
    ['Welche Winde gehören zur Westwindzirkulation?', 'Jetstreams in der Höhe', { w: ['Passate', 'Seewind', 'Föhn'] }],
    ['Warum ist eine Insel auf der Luvseite des Passats grün?', 'Dort regnet die aufsteigende Luft ab', { w: ['Dort scheint nie die Sonne', 'Dort gibt es keinen Wind', 'Dort ist es immer kalt'] }]
  ]);

  add('geo-klimawandel', 'Klimawandel, Extremwetter, Desertifikation', '🌡️', {
    kurz: 'Einheit 10 bis 12: Ursachen und Folgen von Klimawandel, tropische Stürme, El Niño und Desertifikation.',
    form: [
      'Treibhausgase wie CO₂ verstärken den Treibhauseffekt. Pariser Klimaabkommen: Erwärmung auf deutlich unter 2 °C begrenzen.',
      'Warme Luft nimmt mehr Wasserdampf auf (etwa 7 % pro Grad). Darum werden Starkregen häufiger und intensiver.',
      'Tropische Wirbelstürme tragen je nach Region verschiedene Namen: Hurrikan (Atlantik, Karibik), Taifun (Westpazifik), Zyklon (Indischer Ozean), Willy-Willy (Australien). Sie brauchen warmes Meerwasser.',
      'El Niño (ENSO): ungewöhnliche Meeresströmungen im südlichen Pazifik, unregelmäßig alle 2 bis 7 Jahre. Folgen: Dürren und Waldbrände (Indonesien), Regen und Überschwemmungen (Südamerika).',
      'Desertifikation: Ausbreitung wüstenartiger Verhältnisse in Trockengebieten. Gründe: Überweidung, Abholzung, falsche Bodennutzung, Klimawandel.',
      'Sahel = Übergangszone südlich der Sahara. Sahara = Wüste. Savanne = allgemeiner Name einer Vegetationszone (nicht nur in Afrika).',
      'Gegenmaßnahme: Great Green Wall Initiative, ein Baum- und Pflanzenband quer durch den Sahel.'
    ],
    tip: 'Das Grundprinzip bei Extremwetter: Mehr Wärme bedeutet mehr Energie und mehr Wasserdampf in der Atmosphäre.'
  }, [
    ['Welches Gas verstärkt vor allem den Treibhauseffekt durch den Menschen?', 'Kohlendioxid (CO₂)', { w: ['Stickstoff', 'Sauerstoff', 'Argon'] }],
    ['Welches Ziel setzt das Pariser Klimaabkommen?', 'Erwärmung deutlich unter 2 °C halten', { w: ['Erwärmung auf 10 °C erlauben', 'Alle Autos verbieten', 'Das Klima nicht mehr messen'] }],
    ['Wie viel mehr Wasserdampf kann Luft pro Grad Erwärmung aufnehmen?', 'ca. 7 %', { w: ['ca. 70 %', 'ca. 0,7 %', 'gar nichts'] }],
    ['Was ist die Folge davon?', 'Starkregen wird häufiger und stärker', { w: ['Es regnet nie mehr', 'Es schneit überall', 'Wind hört auf'] }],
    ['Wie heißen tropische Wirbelstürme im Atlantik?', 'Hurrikan', { w: ['Taifun', 'Zyklon', 'Willy-Willy'] }],
    ['Wie heißen tropische Wirbelstürme im Westpazifik?', 'Taifun', { w: ['Hurrikan', 'Zyklon', 'Monsun'] }],
    ['Wie heißen tropische Wirbelstürme im Indischen Ozean?', 'Zyklon', { w: ['Hurrikan', 'Taifun', 'Willy-Willy'] }],
    ['Was brauchen tropische Wirbelstürme zur Entstehung?', 'warmes Meerwasser', { w: ['kaltes Meerwasser', 'hohe Berge', 'trockene Luft'] }],
    ['Wie oft tritt El Niño etwa auf?', 'alle 2 bis 7 Jahre', { w: ['jedes Jahr', 'alle 50 Jahre', 'alle 100 Jahre'] }],
    ['Wo entsteht El Niño?', 'im südlichen Pazifik', { w: ['im Nordatlantik', 'im Mittelmeer', 'im Indischen Ozean'] }],
    ['Welche Folgen hat El Niño?', 'Dürren und Waldbrände in Indonesien, Fluten in Südamerika', { w: ['Gletscher wachsen in Afrika', 'Vulkane brechen aus', 'Der Meeresspiegel sinkt überall'] }],
    ['Was bedeutet Desertifikation?', 'Ausbreitung wüstenartiger Verhältnisse', { w: ['Entstehung von Regenwald', 'Bau von Staudämmen', 'Zunahme der Gletscher'] }],
    ['Welches Gebiet liegt als Übergangszone südlich der Sahara?', 'Sahel', { w: ['Savanne', 'Tundra', 'Kalahari'] }],
    ['Welcher Begriff für Vegetation ist nicht auf Afrika beschränkt?', 'Savanne', { w: ['Sahel', 'Sahara', 'Serengeti'] }],
    ['Was ist eine Ursache von Desertifikation?', 'Überweidung und Abholzung', { w: ['Zu viele Gletscher', 'Zu viel Schneefall', 'Zu viele Wälder'] }],
    ['Wie heißt die Initiative gegen Desertifikation im Sahel?', 'Great Green Wall', { w: ['Great Blue Sea', 'Red Desert Plan', 'Green Rain Project'] }]
  ]);
})();
