// Lesetexte zu den Geografie-Themen: zum Einlesen, bevor man mit Karten und Lückentexten übt. Selbst geschrieben, als Zusammenfassung zu Folien, Arbeitsaufträgen und Buch (Geospots 5/6).
// Aufbau: lead (kurze Einführung), sections [{ h: Überschrift, p: [Absätze] }], check [[Leitfrage, Antwort]].
// Wichtige Begriffe stehen in [[doppelten Klammern]]: sie werden fett gezeigt und für den Lückentext aus dem Text verwendet.
window.READ = Object.assign(window.READ || {}, {
  'geo-karten': {
    lead: 'Bevor man die Erde untersucht, muss man sie beschreiben können: Wo liegt etwas, wie bildet man eine Kugel auf Papier ab, und wie teilt man die Welt überhaupt ein?',
    sections: [
      { h: 'Wo liegt etwas? Koordinaten', p: [
        'Jeden Punkt der Erde kann man mit zwei Zahlen festlegen. Die [[Breitengrade]] verlaufen parallel zum Äquator und zählen von 0° bis 90° nach Norden und Süden. Die [[Längengrade]] laufen von Pol zu Pol und werden ab dem [[Nullmeridian]] (durch Greenwich) nach Osten und Westen gezählt. Salzburg liegt bei etwa 48° Nord und 13° Ost.' ] },
      { h: 'Eine Kugel auf einem Blatt', p: [
        'Eine Kugel lässt sich nicht verzerrungsfrei flach abbilden, so wie man eine Orangenschale nicht glatt ausbreiten kann. Jede [[Projektion]] muss sich entscheiden, was sie richtig zeigt: Winkel, Flächen oder Längen. Die [[Mercator-Projektion]] ist winkeltreu und deshalb gut für die Navigation, verzerrt aber zu den Polen hin die Größen stark. Die [[Gall-Peters-Projektion]] ist flächentreu. Die [[Robinson-Projektion]] ist ein Kompromiss und steht in vielen Atlanten.' ] },
      { h: 'Karten sind Modelle', p: [
        'Eine Karte zeigt nie die ganze Wirklichkeit, sondern ein vereinfachtes Modell. Eine [[topographische Karte]] zeigt die Oberfläche (Gelände, Gewässer, Orte). Eine [[thematische Karte]] legt zusätzliche Informationen, zum Beispiel die Einwohnerdichte, auf eine Grundkarte. Ihre Position bestimmen Handys heute über Satelliten (GNSS, etwa GPS, Galileo oder Beidou): Aus der Entfernung zu mindestens drei Satelliten ergibt sich der Standort durch [[Triangulation]].' ] },
      { h: 'Wie teilt man die Welt ein?', p: [
        'Gliederungen sind von Menschen gemacht und verändern sich. Die Zahl der [[Kontinente]] hängt von der Zählweise ab (fünf bis sieben). Das Konzept der „Drei Welten“ (Westen, Ostblock, arme Länder) gilt seit dem Ende des Kalten Krieges 1989 als überholt. Solche Einteilungen zeigen auch, wie man früher auf die Welt geblickt hat.' ] }
    ],
    check: [['Warum ist die Mercator-Karte gut für die Navigation, aber schlecht zum Größenvergleich?', 'Sie ist winkeltreu, verzerrt aber die Flächen zu den Polen hin stark.'], ['Was ist der Unterschied zwischen topographischer und thematischer Karte?', 'Topographisch zeigt die Oberfläche, thematisch legt eine Zusatzinformation auf eine Grundkarte.']]
  },

  'geo-geologie': {
    lead: 'Die Erde ist kein fester Stein, sondern ein Planet in Bewegung. Das erklärt Gebirge, Erdbeben und Vulkane.',
    sections: [
      { h: 'Der Aufbau der Erde', p: [
        'Die Erde besteht aus Schalen. Innen liegt ein fester [[Erdkern]] aus Eisen. Darüber folgt der zähflüssige [[Erdmantel]] mit teilweise flüssigem Magma. Außen liegt die dünne, feste [[Erdkruste]]. Im Mantel steigt heißes Material auf und sinkt abgekühlt wieder ab. Diese [[Konvektionsströme]] bewegen die Platten an der Oberfläche.' ] },
      { h: 'Die Platten und ihre Grenzen', p: [
        'Die Erdkruste ist in sieben große [[Lithosphärenplatten]] zerbrochen. An ihren Rändern geschieht fast alles: An einer [[divergenten Plattengrenze]] bewegen sich die Platten auseinander, es entsteht neue Kruste (Mittelozeanischer Rücken, Rift). An einer [[konvergenten Plattengrenze]] stoßen sie zusammen: Eine Platte taucht ab (Subduktion) oder beide türmen ein Gebirge auf. An einer [[Transformstörung]] gleiten sie aneinander vorbei, wie an der San-Andreas-Verwerfung. Dort entstehen starke Erdbeben.' ] },
      { h: 'Gebirge durch Kollision', p: [
        'Wenn zwei Kontinentalplatten zusammenstoßen, wird die Kruste gestaucht und gefaltet. Die Alpen entstanden durch den Druck von Afrika auf Eurasien, der Himalaya durch den Zusammenstoß von Indien und Eurasien. Die Anden dagegen entstehen, weil die ozeanische Nazca-Platte unter Südamerika abtaucht.' ] },
      { h: 'Gesteine im Kreislauf', p: [
        'Gesteine verändern sich in einem Kreislauf. Erstarrt Magma, entsteht [[Magmatit]]: langsam im Erdinneren als Plutonit (Granit), schnell an der Oberfläche als Vulkanit (Basalt). Verwitterung und Ablagerung machen daraus Sedimente, die zu [[Sedimentgestein]] (zum Beispiel Kalkstein) verfestigt werden. Durch Hitze und Druck wird Gestein zu [[Metamorphit]] umgewandelt, zum Beispiel Kalkstein zu Marmor.' ] }
    ],
    check: [['Wodurch werden die Platten bewegt?', 'Durch Konvektionsströme im zähflüssigen Erdmantel.'], ['Welche drei Arten von Plattengrenzen gibt es?', 'Divergent (auseinander), konvergent (zusammen), Transform (aneinander vorbei).'], ['Wie entstehen die Anden, wie der Himalaya?', 'Anden: ozeanische Platte taucht ab. Himalaya: Kollision zweier Kontinentalplatten.']]
  },

  'geo-vulkane': {
    lead: 'Vulkane sind kein Zufall, sie sitzen dort, wo die Plattentektonik Magma nach oben lässt. Wie ein Vulkan ausbricht, hängt vom Magma ab.',
    sections: [
      { h: 'Wo entstehen Vulkane?', p: [
        'Es gibt drei Entstehungsarten. An [[Riftvulkanen]] driften Platten auseinander und Magma steigt in die Lücke, zum Beispiel auf Island. Bei [[Subduktionsvulkanen]] taucht eine Platte ab, schmilzt teilweise und das Magma steigt auf (Mount St. Helens, Anden). Bei [[Hotspot-Vulkanen]] steht eine Magmaquelle im Mantel wie eine Kerze still, während die Platte darüber wandert. So entsteht eine Inselkette wie auf Hawaii.' ] },
      { h: 'Magma bestimmt den Ausbruch', p: [
        'Entscheidend ist die Kieselsäure im Magma. [[Basisches Magma]] (zum Beispiel Basalt) hat wenig davon, ist dünnflüssig, Gas kann entweichen und der Ausbruch ist eher ruhig. [[Saures Magma]] (zum Beispiel Rhyolith) hat viel Kieselsäure, ist zäh, Gas staut sich und der Ausbruch ist explosiv. Merke: Mehr Kieselsäure bedeutet zäher und explosiver.' ] },
      { h: 'Formen von Vulkanen', p: [
        'Ein [[Stratovulkan]] (Schichtvulkan) besteht aus Lage um Lage Lava und Asche. Er ist steil und sehr explosiv, wie der Vesuv. Ein [[Schildvulkan]] ist flach und besteht fast nur aus dünnflüssiger Lava, die weit und schnell fließt (bis 50 km/h) und weniger explosiv ausbricht. Stürzt ein Krater ein, bleibt eine [[Caldera]], die sich mit Wasser zu einem See füllen kann.' ] }
    ],
    check: [['Warum bricht ein Stratovulkan explosiver aus als ein Schildvulkan?', 'Sein Magma ist saurer und zäher, das Gas staut sich und entweicht plötzlich.'], ['Wie entsteht eine Inselkette wie Hawaii?', 'Die Platte wandert über einen ortsfesten Hotspot.']]
  },

  'geo-atmosphaere': {
    lead: 'Die Atmosphäre ist die dünne Gashülle, in der sich unser Wetter abspielt. Ihre Energie kommt von der Sonne.',
    sections: [
      { h: 'Woraus besteht die Luft und wie ist sie geschichtet?', p: [
        'Die Luft besteht zu 78 % aus Stickstoff und zu 21 % aus Sauerstoff. Das Kohlendioxid macht nur etwa 0,04 % aus, spielt für das Klima aber eine große Rolle. Von unten nach oben folgen die [[Troposphäre]] (bis etwa 13 km, hier ist das Wetter), die [[Stratosphäre]] (mit der Ozonschicht), die Mesosphäre und die Thermosphäre.' ] },
      { h: 'Strahlung und Albedo', p: [
        'Die Sonne liefert die Energie. Nicht jede Fläche nimmt sie gleich auf: Die [[Albedo]] ist der Anteil, der zurückgestrahlt wird. Neuschnee wirft 75 bis 95 % zurück, Wasser dagegen nur 3 bis 10 %. Deshalb erwärmen sich dunkle Flächen stark und helle bleiben kühl. Wenn Eis schmilzt, wird die Fläche dunkler und erwärmt sich noch mehr.' ] },
      { h: 'Der Treibhauseffekt', p: [
        'Die erwärmte Erde strahlt Wärme ab. [[Treibhausgase]] wie Wasserdampf und CO2 halten einen Teil davon zurück und strahlen ihn wieder nach unten (Gegenstrahlung). Dieser natürliche [[Treibhauseffekt]] macht die Erde bewohnbar. Der Mensch verstärkt ihn durch zusätzliches CO2 und Methan.' ] },
      { h: 'Wolken und Niederschlag', p: [
        'Warme Luft kann mehr Wasserdampf aufnehmen als kalte. Steigt sie auf, kühlt sie ab und der Wasserdampf [[kondensiert]] zu Tröpfchen: Wolken entstehen. Trockene Luft kühlt beim Aufsteigen um etwa 1 Grad pro 100 m ab. Man unterscheidet hohe Eiswolken (Cirrus), Nebel und flache Schichten (Stratus), Quellwolken (Cumulus) und Gewitterwolken (Cumulonimbus).' ] }
    ],
    check: [['Warum erwärmt sich dunkler Asphalt stärker als Neuschnee?', 'Er hat eine niedrige Albedo, nimmt also mehr Strahlung auf, Schnee wirft sie zurück.'], ['Wie entstehen Wolken?', 'Warme feuchte Luft steigt auf, kühlt ab und der Wasserdampf kondensiert.']]
  },

  'geo-klima': {
    lead: 'Wetter ist das, was gerade draußen passiert. Klima ist das, was an einem Ort über lange Zeit normal ist.',
    sections: [
      { h: 'Wetter und Klima', p: [
        'Das [[Wetter]] ist der momentane Zustand der Atmosphäre an einem Ort. Das [[Klima]] ist der langjährige Durchschnitt, mindestens über 30 Jahre. Beschrieben wird es mit den Klimaelementen Temperatur, Niederschlag, Wind, Luftdruck, Luftfeuchtigkeit und Bewölkung.' ] },
      { h: 'Das Klimadiagramm lesen', p: [
        'Ein [[Klimadiagramm]] fasst das Klima eines Ortes in einer Grafik zusammen. Die Temperatur ist eine Kurve (Monatsmittel), der Niederschlag sind Säulen (Monatssumme). Außerdem stehen Ortsname, Seehöhe, Jahresmitteltemperatur und Jahresniederschlag dabei. Erst Kurve und Säulen zusammen zeigen, ob es feucht oder trocken ist und wann die kalte Jahreszeit ist.' ] },
      { h: 'Warum ist das Klima überall anders?', p: [
        'Die wichtigsten Einflüsse sind die geografische Breite (am Äquator trifft die Sonne steil, an den Polen flach), die Höhe (mit jedem Kilometer wird es kühler), die Nähe zum Meer und Meeresströmungen. Das Meer wirkt wie ein Wärmespeicher und macht das Klima ausgeglichen. Im Inneren großer Landmassen ist es dagegen [[kontinental]]: heiße Sommer und sehr kalte Winter. Darum haben osteuropäische Länder kältere Winter als westeuropäische.' ] },
      { h: 'Klimazonen', p: [
        'Man teilt die Erde grob in Zonen: Polare Zone und Boreale Zone (Mitteltemperatur unter 0 Grad), die Mittelbreiten (feucht, mäßig warm) und die Subtropen (im Sommer sehr trocken, etwa Mittelmeerklima wie in Catania auf Sizilien) und die Tropen. Aus dem Klima folgt die Vegetation.' ] }
    ],
    check: [['Wie unterscheiden sich Wetter und Klima?', 'Wetter ist der momentane Zustand, Klima der Durchschnitt über mindestens 30 Jahre.'], ['Woran erkennst du im Klimadiagramm Trockenzeiten?', 'An sehr niedrigen Niederschlagssäulen, vor allem wenn die Temperatur hoch ist.']]
  },

  'geo-wind': {
    lead: 'Wind entsteht, weil Luftdruck ungleich verteilt ist. Wenn man das versteht, erklären sich Wetterlagen, Föhn und sogar Wüsten.',
    sections: [
      { h: 'Luftdruck, Hoch und Tief', p: [
        'Luft hat Gewicht. Der [[Luftdruck]] ist die Kraft dieser Luftsäule und nimmt mit der Höhe ab: Auf Meereshöhe sind es etwa 1013 hPa, auf dem Mount Everest nur etwa 325 hPa. In einem [[Tief]] steigt Luft auf, kühlt ab, es bilden sich Wolken und es regnet. In einem [[Hoch]] sinkt Luft ab, Wolken lösen sich auf und es bleibt trocken.' ] },
      { h: 'Wind', p: [
        '[[Wind]] ist Luft, die vom Hoch zum Tief strömt, um den Druck auszugleichen. Weil sich die Erde dreht, wird der Wind abgelenkt (Corioliskraft): Auf der Nordhalbkugel nach rechts. Darum drehen sich Tiefs dort gegen den Uhrzeigersinn. Die Stärke misst man mit der Beaufort-Skala, sie reicht von 0 (Windstille) bis 12 (Orkan, über 118 km/h).' ] },
      { h: 'Wetter in Europa', p: [
        'Unser Wetter wird von zwei Druckgebilden bestimmt: dem [[Islandtief]] und dem [[Azorenhoch]]. Sind beide stark, strömt feuchte Luft vom Atlantik nach Mitteleuropa. Ist das Azorenhoch dominant, ist es sonnig und windstill. Ein [[Genuatief]] im nördlichen Mittelmeer kann kräftige Niederschläge bringen. Der Scirocco ist ein warmer Wind aus der Sahara.' ] },
      { h: 'Lokale Winde und der Föhn', p: [
        'Tagsüber weht der Seewind vom Meer zum Land, an Hängen strömt die Luft tagsüber hinauf und nachts ins Tal. Der [[Föhn]] entsteht, wenn Luft ein Gebirge überqueren muss: Auf der Luvseite steigt sie auf, kühlt ab und regnet ab. Auf der Leeseite sinkt sie als warmer, trockener Wind herab.' ] }
    ],
    check: [['Warum bringt ein Tief meist schlechtes Wetter?', 'Luft steigt auf, kühlt ab, Wasserdampf kondensiert zu Wolken und Regen.'], ['Wie entsteht Föhn?', 'Luft steigt luvseitig auf und regnet ab, sinkt leeseitig trocken und erwärmt sich stark.']]
  },

  'geo-zirkulation': {
    lead: 'Die Luft strömt nicht zufällig. Rund um die Erde läuft ein Kreislauf, der erklärt, warum am Äquator Regenwald und bei 30° Breite Wüsten liegen.',
    sections: [
      { h: 'Die Hadley-Zelle', p: [
        'Am Äquator scheint die Sonne am stärksten. Die Luft erwärmt sich, steigt auf, kühlt ab und regnet in der [[ITC]] (Innertropische Konvergenzzone) ab. Das Ergebnis ist der tropische Regenwald. In der Höhe strömt die Luft zu den Subtropen. Bei etwa 30° Breite sinkt sie ab. Absinkende Luft erwärmt sich und löst Wolken auf, daher liegen dort die Wüsten, zum Beispiel Sahara und Kalahari. Am Boden strömt die Luft als [[Passat]] zurück zum Äquator. Dieser Kreislauf heißt [[Hadley-Zelle]].' ] },
      { h: 'Die Erdrotation lenkt ab', p: [
        'Weil sich die Erde dreht, werden Luftströmungen durch die [[Corioliskraft]] abgelenkt, auf der Nordhalbkugel nach rechts, auf der Südhalbkugel nach links. Deshalb sind die Passate Ostwinde. In den mittleren Breiten wehen Westwinde, die das wechselhafte Wetter zu uns bringen.' ] },
      { h: 'Drei Zirkulationen', p: [
        'Man unterscheidet die außertropische Westwindzirkulation (mit den Jetstreams), die tropische Passatzirkulation und die tropische [[Monsunzirkulation]]. Beim Monsun verschiebt sich die ITC mit dem Sonnenstand. Im Sommer bringt der Wind feuchte Luft vom Meer und damit die Regenzeit.' ] },
      { h: 'Trockene Küsten', p: [
        'Wo der Passat über kalte Meeresströme weht, zum Beispiel den Benguelastrom vor der Namib, kühlt die Luft ab. Es gibt Nebel, aber kaum Regen. So entstehen Küstenwüsten direkt am Meer. Auf Inseln regnet der Passat an der Luvseite ab, die Leeseite bleibt trocken.' ] }
    ],
    check: [['Warum gibt es bei etwa 30° Breite viele Wüsten?', 'Dort sinkt trockene Luft der Hadley-Zelle ab, erwärmt sich und löst Wolken auf.'], ['Warum ist die Namib trotz Meer so trocken?', 'Absinkende Luft und der kalte Benguelastrom: Nebel statt Regen.']]
  },

  'geo-klimawandel': {
    lead: 'Mehr Wärme bedeutet mehr Energie und mehr Wasserdampf in der Atmosphäre. Daraus folgen viele Veränderungen bei Wetter und Klima.',
    sections: [
      { h: 'Der verstärkte Treibhauseffekt', p: [
        'Seit der Industrialisierung gelangen durch Kohle, Öl, Gas, Landwirtschaft und Abholzung mehr Treibhausgase in die Luft. Der [[anthropogene]] (vom Menschen verursachte) Treibhauseffekt verstärkt den natürlichen. Im Pariser Klimaabkommen wurde vereinbart, die Erwärmung deutlich unter 2 °C zu begrenzen.' ] },
      { h: 'Extremwetter', p: [
        'Warme Luft nimmt pro Grad etwa 7 % mehr Wasserdampf auf. Deshalb werden Starkregen häufiger und heftiger. [[Tropische Wirbelstürme]] brauchen warmes Meerwasser. Je nach Region heißen sie Hurrikan (Atlantik), Taifun (Westpazifik), Zyklon (Indischer Ozean) oder Willy-Willy (Australien).' ] },
      { h: 'El Niño', p: [
        '[[El Niño]] ist eine unregelmäßige Veränderung der Meeresströmungen im Pazifik, etwa alle 2 bis 7 Jahre. Sie verschiebt Regen und Trockenheit: Dürren und Waldbrände in Indonesien, Regen und Überschwemmungen in Südamerika.' ] },
      { h: 'Desertifikation', p: [
        '[[Desertifikation]] heißt, dass sich wüstenartige Verhältnisse in Trockengebieten ausbreiten. Ursachen sind Überweidung, Abholzung, falsche Bodennutzung und der Klimawandel. Betroffen ist besonders der Sahel, die Übergangszone südlich der Sahara. Die Great Green Wall will mit einem Gürtel aus Bäumen und Pflanzen quer durch den Sahel gegensteuern.' ] }
    ],
    check: [['Warum nehmen Starkregen zu?', 'Wärmere Luft kann pro Grad etwa 7 % mehr Wasserdampf aufnehmen.'], ['Welche Ursachen hat Desertifikation?', 'Überweidung, Abholzung, falsche Bodennutzung, Klimawandel.']]
  },

  'geo-biogeo': {
    lead: 'Biogeographie fragt, warum wo welche Pflanzen und Tiere leben. Die Antwort liegt in Klima, Gestein, Relief und Boden.',
    sections: [
      { h: 'Ökofaktoren und Ökosystem', p: [
        'Ein [[Ökosystem]] ist ein Wirkungsgefüge aus Lebewesen und ihrer Umwelt. Die Ökofaktoren Gestein (Geologie), Klima (Klimatologie), Relief (Geomorphologie), Boden, Vegetation und Tierwelt wirken wechselseitig aufeinander. Auch der Mensch greift ein. Die [[Flora]] sind alle Pflanzenarten eines Gebiets. Die [[Fauna]] sind alle Tierarten. Die Vegetation ist die Pflanzendecke selbst.' ] },
      { h: 'Höhenstufen', p: [
        'Alexander von Humboldt hat in den Anden gezeigt, dass sich die Vegetation mit der Höhe wie mit der Breite verändert: Je höher man steigt, desto kühler wird es und desto mehr geht der Wald in Matten, Fels und Schnee über. Ein Gebirge ist wie eine senkrechte Reise in Richtung Pol.' ] },
      { h: 'Ökozonen', p: [
        'Die Verteilung der [[Ökozonen]] folgt dem Klima. In den Hohen Breiten liegen Eiswüste, [[Tundra]] und der boreale Nadelwald. In den Mittelbreiten wachsen Laub- und Mischwälder, im trockeneren Inneren Gras- und Steppenlandschaften. In den winterfeuchten Subtropen wachsen [[Hartlaubgehölze]] (Mittelmeerraum, Kalifornien), in den Trockengebieten Wüsten und Savannen (Pampa, Kalahari, Outback). In den Tropen schließlich wächst der immerfeuchte [[Regenwald]]. Jede Zone lässt sich mit Temperatur, Niederschlag und Luftzirkulation erklären.' ] }
    ],
    check: [['Was haben Höhenstufen und Ökozonen gemeinsam?', 'Beide folgen dem Klima: Mit der Höhe und mit der Breite wird es kühler.'], ['Was ist der Unterschied zwischen Flora und Vegetation?', 'Flora sind die Pflanzenarten, Vegetation die Pflanzendecke.']]
  },

  'geo-regenwald': {
    lead: 'Der Regenwald hat die meisten Arten der Erde und trotzdem einen armen Boden. Wie passt das zusammen?',
    sections: [
      { h: 'Ideale Bedingungen', p: [
        'Im immerfeuchten Regenwald gibt es weder Frost noch eine Trockenzeit, Temperatur und Niederschlag schwanken kaum. Mehr als 60 % der Pflanzen sind [[Phanerophyten]], also große, langlebige, verholzte Pflanzen (in den Mittelbreiten nur etwa 10 %). Nirgends gibt es mehr Arten, aber keine Art dominiert. Das macht großflächige Holznutzung ungünstig.' ] },
      { h: 'Ein Kreislauf ohne Boden', p: [
        'Die Nährstoffe stecken in der Pflanzendecke, nicht im Boden. Abgestorbene Blätter werden sofort zersetzt und von den Wurzeln wieder aufgenommen. Der tropische Boden, der [[Ferralsol]], ist tiefgründig verwittert und sehr nährstoffarm.' ] },
      { h: 'Was die Rodung anrichtet', p: [
        'Verschwindet der Wald, fehlt der Schutz vor dem Starkregen. Der Boden wird [[erodiert]], stellenweise um mehr als einen Meter. Oft wird die Fläche nur kurz für Soja oder Palmöl genutzt und dann als [[Badlands]] zurückgelassen, auf denen auf absehbare Zeit nichts mehr wächst. Vom ursprünglichen Regenwald ist nur ein Rest übrig, der aber noch den Großteil der pflanzlichen Biomasse und der Sauerstoffproduktion ausmacht.' ] }
    ],
    check: [['Warum wächst nach einer Rodung oft nichts mehr?', 'Die Nährstoffe lagen in den Pflanzen. Der nährstoffarme Boden wird ohne Wald erodiert.'], ['Wo liegen die großen Regenwälder?', 'Amazonien, Kongobecken, Südostasien.']]
  },

  'geo-exogen-karst': {
    lead: 'Gebirge wachsen durch Kräfte aus dem Erdinneren. Gleichzeitig arbeiten Wasser, Eis und Wind daran, sie wieder abzutragen.',
    sections: [
      { h: 'Gegenspieler der Plattentektonik', p: [
        '[[Endogene Kräfte]] kommen aus dem Erdinneren und bauen auf: Vulkane, Erdbeben, Gebirge. [[Exogene Kräfte]] wirken von außen, vor allem durch Wasser, und tragen ab. Die Wissenschaft, die diese formbildenden Prozesse untersucht, ist die [[Geomorphologie]].' ] },
      { h: 'Drei Schritte', p: [
        'Zuerst zerkleinert oder löst die [[Verwitterung]] das Gestein an Ort und Stelle. Dann transportiert die [[Erosion]] das Material weg, und die [[Akkumulation]] lagert es an anderer Stelle wieder ab. Bei der mechanischen Verwitterung zersprengt Frost, Hitze, Wurzeln oder Salz das Gestein, besonders in trockenen und kalten Regionen. Bei der chemischen Verwitterung löst oder verändert Wasser das Gestein, besonders in feuchten und warmen Regionen.' ] },
      { h: 'Flüsse formen Täler', p: [
        'Fließendes Wasser nimmt Material mit und lagert es weiter unten ab. Bei starkem Gefälle gräbt der Fluss in die Tiefe (Tiefenerosion) und schafft Klamm, Kerbtal oder Canyon. Bei schwachem Gefälle nagt er an den Seiten (Seitenerosion), das Tal wird zum Muldental.' ] },
      { h: 'Karst', p: [
        'Wo wasserlösliches Gestein wie Kalkstein liegt, entsteht [[Karst]]. Einsickerndes, leicht saures Wasser löst den Kalk auf, das ist chemische Verwitterung. So entstehen Senken, die [[Dolinen]], dazu Höhlen und unterirdische Wasserwege. Karstquellen sind wichtige Wasserspeicher.' ] }
    ],
    check: [['In welcher Reihenfolge laufen exogene Prozesse ab?', 'Verwitterung, Erosion, Akkumulation.'], ['Warum ist Karst ein Beispiel für chemische Verwitterung?', 'Das Wasser löst den Kalkstein auf, es wird nicht mechanisch zerbrochen.']]
  }
});
