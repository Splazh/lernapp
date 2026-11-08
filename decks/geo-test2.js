// Geographie: Einheit 13 bis 15 (Biogeographie, Karst, exogene Kräfte) und Übungen im Stil der Testvorschau.
// Grundlage: Folien Einheit 13, Arbeitsauftrag Einheit 14, Vorschau zum 1. Test, Geospots 5/6 S. 40 bis 41. Karten und Sätze sind selbst geschrieben.
(function () {
  const G = 'Test Geografie: Einheit 13 bis 15 und Testaufgaben';
  const add = (id, title, icon, info, cards) => (window.DECKS = window.DECKS || []).push(
    { id, subject: 'geografie', group: G, title, icon, labels: ['Antwort'], noModes: ['pairs'], info, cards });

  add('geo-biogeo', 'Biogeographie und Ökozonen', '🌿', {
    kurz: 'Einheit 13: Wie Gestein, Klima, Relief, Boden und Lebewesen zusammenhängen.',
    form: [
      'Biogeographie untersucht Vegetation (Pflanzendecke) und Tierwelt im Zusammenspiel mit Gestein, Klima, Relief und Boden. Auch der Mensch greift ein.',
      'Flora = alle Pflanzenarten eines Gebiets, Fauna = alle Tierarten. Vegetation = die Pflanzendecke selbst, Tierwelt = die Tiere eines Gebiets.',
      'Ein Ökosystem ist ein Wirkungsgefüge aus Lebewesen und ihrer Umwelt, das man als Modell vereinfacht darstellt.',
      'Alexander von Humboldt (1769 bis 1859) zeichnete ein Vegetationsprofil durch die Anden. Mit der Höhe ändert sich die Vegetation ähnlich wie mit der Breite Richtung Pol.',
      'Ökozonen (Vegetationszonen) folgen dem Klima: Hohe Breiten (Eiswüste, Tundra, borealer Nadelwald), Mittelbreiten (Laub- und Mischwald, Steppe), Subtropen (Hartlaubgehölze, Trockengebiete), Tropen (Savanne, Regenwald).'
    ],
    tip: 'Merke: Die Ökozonen sind keine zufälligen Streifen. Jede lässt sich mit Temperatur, Niederschlag und Luftzirkulation erklären (Verbindung zu Einheit 5 bis 9).'
  }, [
    ['Was untersucht die Biogeographie?', 'Vegetation und Tierwelt im Zusammenspiel mit Gestein, Klima, Relief und Boden', { w: ['Nur Gesteine und Vulkane', 'Nur das Wetter', 'Nur die Bevölkerung'] }],
    ['Was bedeutet Flora?', 'alle Pflanzenarten eines Gebiets', { w: ['alle Tierarten eines Gebiets', 'nur Bäume', 'nur Blumen im Garten'] }],
    ['Was bedeutet Fauna?', 'alle Tierarten eines Gebiets', { w: ['alle Pflanzenarten', 'nur Haustiere', 'nur Vögel'] }],
    ['Was ist ein Ökosystem?', 'ein Wirkungsgefüge aus Lebewesen und ihrer Umwelt', { w: ['eine Wetterkarte', 'ein Gesteinstyp', 'eine politische Grenze'] }],
    ['Welche Wissenschaft steht hinter dem Ökofaktor Gestein?', 'Geologie', { w: ['Meteorologie', 'Geomorphologie', 'Hydrologie'] }],
    ['Welche Wissenschaft steht hinter dem Ökofaktor Relief?', 'Geomorphologie', { w: ['Geologie', 'Klimatologie', 'Botanik'] }],
    ['Welche Wissenschaft steht hinter dem Ökofaktor Klima?', 'Klimatologie / Meteorologie', { w: ['Geologie', 'Geomorphologie', 'Zoologie'] }],
    ['Wer zeichnete das berühmte Vegetationsprofil durch die Anden?', 'Alexander von Humboldt', { w: ['Alfred Wegener', 'Charles Darwin', 'Gerhard Mercator'] }],
    ['Wie nennt man Vegetationszonen noch?', 'Ökozonen', { w: ['Zeitzonen', 'Klimadiagramme', 'Plattengrenzen'] }],
    ['Welche Ökozone liegt in den Hohen Breiten südlich der Tundra?', 'Boreale Zone (Nadelwald)', { w: ['Savanne', 'Regenwald', 'Hartlaubgehölze'] }],
    ['Wo findet man winterfeuchte Subtropen mit Hartlaubgehölzen?', 'Mittelmeerraum und Kalifornien', { w: ['Sibirien', 'Amazonas', 'Antarktis'] }],
    ['Welche Ökozone liegt in den Tropen um den Äquator mit ganzjährig viel Regen?', 'immerfeuchter Regenwald', { w: ['Tundra', 'Steppe', 'Halbwüste'] }],
    ['Welche trockenen Gebiete zeigen die Folien in den Subtropen?', 'Pampa, Kalahari und Outback', { w: ['Tongass, Neufundland und Syöte', 'Amazonas, Kongo und Borneo', 'Alpen, Anden und Rocky Mountains'] }],
    ['Warum ändert sich die Vegetation im Gebirge mit der Höhe?', 'Weil die Temperatur mit der Höhe sinkt', { w: ['Weil es dort mehr Menschen gibt', 'Weil das Gestein farbig ist', 'Weil dort keine Sonne scheint'] }]
  ]);

  add('geo-regenwald', 'Tropischer Regenwald und Rodung', '🌴', {
    kurz: 'Einheit 13: Besonderheiten des Regenwalds und was nach der Abholzung passiert.',
    form: [
      'Im immerfeuchten Regenwald gibt es keinen Frost, keine Trockenheit und kaum Schwankungen bei Niederschlag und Temperatur. Das sind ideale Bedingungen für Pflanzen.',
      'Über 60 % der Pflanzen sind Phanerophyten (große, langlebige, verholzte Pflanzen). In den Mittelbreiten sind es nur etwa 10 %.',
      'Nirgendwo gibt es mehr Artenvielfalt. Keine einzelne Art dominiert, deshalb ist großflächige Holznutzung ungünstig.',
      'Vom ursprünglichen Regenwald ist durch Abholzung nur ein Rest übrig. Er liefert aber noch den Großteil der pflanzlichen Biomasse und der Sauerstoffproduktion.',
      'Wird der Wald gerodet, wird der nährstoffarme Boden (Ferralsol) rasch erodiert. Danach wächst auf absehbare Zeit nichts mehr, die Fläche bleibt als Badlands zurück.'
    ],
    tip: 'Typische Prüffrage: Warum ist der Regenwald so artenreich, aber sein Boden so nährstoffarm? Antwort: Die Nährstoffe stecken in der Pflanzendecke, nicht im Boden.'
  }, [
    ['Wie viel Prozent der Pflanzen im immerfeuchten Regenwald sind Phanerophyten?', 'über 60 %', { w: ['etwa 10 %', 'etwa 25 %', 'unter 5 %'] }],
    ['Was sind Phanerophyten?', 'große, langlebige, verholzte Pflanzen', { w: ['einjährige Gräser', 'Moose und Flechten', 'Zwiebelpflanzen'] }],
    ['Wie viel Prozent Phanerophyten gibt es in den Mittelbreiten?', 'etwa 10 %', { w: ['über 60 %', 'etwa 50 %', 'etwa 90 %'] }],
    ['Warum ist der Regenwald so artenreich?', 'kein Frost, keine Trockenheit, kaum Schwankungen', { w: ['wegen starkem Frost im Winter', 'weil es dort nie regnet', 'weil es nur wenige Tiere gibt'] }],
    ['Warum ist großflächige Holznutzung im Regenwald ungünstig?', 'Keine Art dominiert, die Arten sind weit verstreut', { w: ['Es gibt dort kein Holz', 'Die Bäume sind zu klein', 'Alle Bäume gehören einer Art'] }],
    ['Wie heißt der typische nährstoffarme Boden der Tropen?', 'Ferralsol', { w: ['Schwarzerde', 'Braunerde', 'Rendzina'] }],
    ['Was passiert mit dem Ferralsol, wenn der Regenwald verschwindet?', 'Er wird stark erodiert', { w: ['Er wird fruchtbarer', 'Er friert ein', 'Er verwandelt sich in Schwarzerde'] }],
    ['Wofür wird gerodeter Regenwaldboden häufig kurzfristig genutzt?', 'Soja- und Palmöl-Plantagen', { w: ['Weinbau', 'Skigebiete', 'Salzabbau'] }],
    ['Wie nennt man Flächen, auf denen nach Erosion nichts mehr wächst?', 'Badlands', { w: ['Heidelandschaft', 'Tundra', 'Auwald'] }],
    ['Wo liegen die großen Regenwaldgebiete?', 'Amazonien, Kongobecken, Südostasien', { w: ['Sahara, Arabien, Gobi', 'Alpen, Pyrenäen, Karpaten', 'Grönland, Island, Spitzbergen'] }]
  ]);

  add('geo-exogen-karst', 'Exogene Kräfte, Flüsse und Karst', '⛰️', {
    kurz: 'Einheit 14 und 15: Wie Wasser und Wetter die Erdoberfläche formen.',
    form: [
      'Endogene Kräfte (aus dem Erdinneren) bauen auf: Plattentektonik, Vulkane, Gebirge. Exogene Kräfte (von außen, vor allem Wasser) tragen ab und formen um. Sie sind die Gegenspieler.',
      'Reihenfolge der Prozesse: Verwitterung (Gestein wird vor Ort zerkleinert oder aufgelöst) dann Erosion (Abtrag und Transport) dann Akkumulation (Ablagerung).',
      'Mechanische (physikalische) Verwitterung: Frost-, Hitze-, Wurzel- und Salzsprengung, besonders in trockenen oder kalten Regionen. Chemische Verwitterung: Lösung und Umwandlung, besonders in feuchten, warmen Regionen.',
      'Die Wissenschaft von den formbildenden Prozessen der Erdoberfläche heißt Geomorphologie.',
      'Karst entsteht, wo wasserlösliche Gesteine wie Kalkstein liegen. Einsickerndes Wasser löst das Gestein: Dolinen (Senken), Höhlen und unterirdische Wasserwege.',
      'Flusstäler: starkes Gefälle gibt Tiefenerosion (Klamm, Kerbtal, Canyon), schwaches Gefälle gibt Seitenerosion (Muldental, Mäander).'
    ],
    tip: 'Karst ist ein Beispiel für chemische Verwitterung. Das Gestein wird gelöst, nicht zerbrochen.'
  }, [
    ['Was sind exogene Kräfte?', 'Kräfte, die von außen auf die Erdoberfläche wirken (zum Beispiel Wasser)', { w: ['Kräfte aus dem Erdinneren', 'nur Vulkane', 'nur Erdbeben'] }],
    ['Wer ist der Gegenspieler der Plattentektonik?', 'die exogenen Kräfte', { w: ['die Sonne allein', 'die Gezeiten', 'der Mensch allein'] }],
    ['Was bedeutet Verwitterung?', 'Zerkleinerung oder Auflösung von Gestein an Ort und Stelle', { w: ['Abtransport von Sedimenten', 'Ablagerung von Sedimenten', 'Entstehung von Magma'] }],
    ['Was bedeutet Erosion?', 'Abtragen und Wegtransportieren von Sedimenten', { w: ['Zerkleinern vor Ort', 'Ablagern von Sedimenten', 'Auffalten von Gebirgen'] }],
    ['Was bedeutet Akkumulation?', 'Ablagerung transportierter Sedimente', { w: ['Abtrag von Sedimenten', 'Zerkleinern von Gestein', 'Schmelzen von Gestein'] }],
    ['In welcher Reihenfolge laufen die exogenen Prozesse ab?', 'Verwitterung, Erosion, Akkumulation', { w: ['Akkumulation, Erosion, Verwitterung', 'Erosion, Verwitterung, Akkumulation', 'Erosion, Akkumulation, Verwitterung'] }],
    ['Welche Wissenschaft erforscht formbildende Prozesse der Erdoberfläche?', 'Geomorphologie', { w: ['Geologie', 'Biogeographie', 'Klimatologie'] }],
    ['Beispiel für mechanische Verwitterung?', 'Frostsprengung', { w: ['Lösung von Kalk durch Wasser', 'Umwandlung durch Säuren', 'Karstbildung'] }],
    ['Wo herrscht vor allem chemische Verwitterung?', 'in feuchten und warmen Regionen', { w: ['in trockenen Regionen', 'in kalten Regionen', 'in der Antarktis'] }],
    ['Welche Gesteine bilden Karst?', 'wasserlösliche Gesteine wie Kalkstein', { w: ['Granit', 'Basalt', 'Gneis'] }],
    ['Wie nennt man Senken im Karst?', 'Dolinen', { w: ['Klammen', 'Moränen', 'Mäander'] }],
    ['Welche Art der Verwitterung passiert im Karst?', 'chemische (Lösung)', { w: ['mechanische (Frostsprengung)', 'keine', 'nur biologische'] }],
    ['Wie nennt man ein enges, tief eingeschnittenes Tal mit steilen Wänden in hartem Gestein?', 'Klamm', { w: ['Muldental', 'Delta', 'Mäander'] }],
    ['Bei starkem Gefälle wirkt vor allem ...', 'Tiefenerosion', { w: ['Seitenerosion', 'Akkumulation', 'Frostsprengung'] }],
    ['Wie viel Prozent des Wassers der Erde sind Süßwasser?', 'etwa 2,6 %', { w: ['etwa 50 %', 'etwa 25 %', 'etwa 10 %'] }],
    ['Wie viel Prozent der Erdoberfläche sind von Meeren bedeckt?', 'etwa 71 %', { w: ['etwa 50 %', 'etwa 90 %', 'etwa 30 %'] }]
  ]);

  add('geo-testaufgaben', 'Testaufgaben wie in der Vorschau', '📝', {
    kurz: 'Beispiele für Fragen, wie sie die Vorschau zum 1. Test zeigt: Begriffe, Aussagen, Zusammenhänge.',
    form: [
      'Der Test dauert etwa 20 bis 30 Minuten und ist handschriftlich, 20 bis 30 BE. Note: unter 50 % Nicht genügend, ab 50 % Genügend, ab 65 % Befriedigend, ab 80 % Gut, ab 90 % Sehr gut.',
      'Begriffe erklärst du in ein bis zwei vollständigen Sätzen. Aussagen werden angekreuzt oder richtiggestellt (oft reicht ein Wort).',
      'Größere Fragen verlangen Zusammenhänge zwischen Einheiten. Lies die Aufgabe zweimal, markiere was gefragt ist und beachte die BE-Zahl.'
    ],
    tip: 'Schreib nicht alles auf, was du weißt. Beantworte genau die Frage. Die BE-Zahl zeigt dir, wie viele Aspekte gefragt sind.'
  }, [
    ['Wie lang dauert der Test etwa?', '20 bis 30 Minuten', { w: ['90 Minuten', '45 Minuten', '2 Stunden'] }],
    ['Wie viele BE kann man etwa erreichen?', '20 bis 30', { w: ['100', '5 bis 10', '50 bis 60'] }],
    ['Ab wie viel Prozent der BE ist der Test positiv (Genügend)?', 'ab 50 %', { w: ['ab 33 %', 'ab 60 %', 'ab 65 %'] }],
    ['Welche Einheiten umfasst der Stoff?', 'Einheiten 1 bis 16', { w: ['Einheiten 1 bis 8', 'Einheiten 5 bis 20', 'nur Einheit 16'] }],
    ['In wie vielen Sätzen sollst du Fachbegriffe definieren?', 'ein bis zwei', { w: ['mindestens fünf', 'gar nicht', 'eine ganze Seite'] }],
    ['Kondensation: Was ist das?', 'Übergang von Wasserdampf zu flüssigem Wasser (Tröpfchen)', { w: ['Verdunstung von Wasser', 'Gefrieren von Wasser', 'Schmelzen von Eis'] }],
    ['Albedo: Was ist das?', 'Rückstrahlvermögen einer Fläche (Anteil reflektierter Sonnenstrahlung)', { w: ['Menge des Niederschlags', 'Wärmespeicherung des Meeres', 'Stärke des Windes'] }],
    ['Treibhausgas: Was ist das?', 'Gas, das Wärmestrahlung in der Atmosphäre zurückhält (zum Beispiel CO2)', { w: ['Gas, das Sauerstoff erzeugt', 'Gas, das Wolken auflöst', 'Gas, das Vulkane ausstoßen und nur dort vorkommt'] }],
    ['Turbulenz: Was ist das?', 'Verwirbelung von Luft (oder Wasser)', { w: ['Stillstand der Luft', 'Gleichmäßige Strömung', 'Temperaturanstieg'] }],
    ['Richtig oder falsch? Osteuropäische Länder haben wegen des kontinentalen Klimas mildere Winter als westeuropäische.', 'falsch: kältere Winter', { w: ['richtig', 'falsch: wärmere Sommer', 'falsch: mehr Regen im Winter'] }],
    ['Küstenwüste Namib: Warum ist es direkt am Meer trocken?', 'Absteigende Luft der Hadley-Zelle (Passat) ist trocken, dazu kommt ein kalter Meeresstrom', { w: ['Weil dort keine Sonne scheint', 'Weil das Meer süß ist', 'Weil dort ein Vulkan liegt'] }],
    ['Welche Plattengrenze: Eine Platte taucht unter die andere (zum Beispiel Nazca- unter Südamerika-Platte)?', 'konvergente Plattengrenze (Subduktion)', { w: ['divergente Plattengrenze', 'Transformstörung', 'Hotspot'] }],
    ['Warum kommt es an solchen Plattengrenzen häufig zu Vulkanen?', 'Die abtauchende Platte schmilzt teilweise, das Magma steigt auf', { w: ['Weil dort Wüsten liegen', 'Weil sich Platten voneinander entfernen', 'Weil dort keine Erdbeben sind'] }],
    ['Nenne ein Beispiel für eine konvergente Plattengrenze.', 'Anden (Südamerika) oder Japan', { w: ['Mittelatlantischer Rücken', 'Island', 'Ostafrikanischer Graben'] }]
  ]);
})();
