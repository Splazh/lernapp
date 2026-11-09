---
auto_generated: false
---
# Lernapp Version 33

## Bedienung

- **Geführte Lernrunde** auf der Startseite: ungefähre Dauer wählen, lesen/verstehen, selbst erklären und Karten abrufen. Verlassene Runden lassen sich fortsetzen; die Dauer ist ein Richtwert, kein Countdown.
- **Suchen** durchsucht ausgewählte Themen, Karten und Lesetexte.
- **Mein Lernstoff** blendet Fächer/Themen aus, ohne Fortschritt oder Termine zu löschen. Einträge bereits angelegter Testtermine bleiben bewusst erhalten.
- **Eigene Themen** unter Üben oder im Fach: Themen anlegen, Titel/Lesetext ändern, Karten mit Fotos erstellen, bearbeiten, sortieren und in andere Themen verschieben. Eine Inhaltsänderung setzt den Fortschritt der betroffenen Karte zurück. Sortieren und Verschieben erhalten ihn.
- **Themenpaket exportieren** gibt ausschließlich das eigene Thema weiter. Import unter Mein Lernstoff legt nach einer Vorschau eine neue Kopie mit eigenen Kennungen an.
- **Gemischter Probetest** auf einer Testseite: Auswahl und Texteingabe, passende offene Fragen und vorhandene Leseaufgaben. Englisch enthält zusätzlich originale Reading-/Listening-Übungen zum Thema Freundschaft. Hörtexte werden mit der Gerätestimme gesprochen; ohne Audio ist eine gekennzeichnete Lesealternative möglich. Offene Antworten werden nach Abgabe anhand einer Checkliste selbst bewertet. Die Übungsnote ist keine Prognose der Schulnote.
- **Lernstand** am Thema zeigt gesehen, wiedererkannt und selbst abgerufen. Karteikarten-Selbstbewertungen zählen als selbst abgerufen und sind entsprechend erläutert. Historische Antworten werden nicht nachträglich einer Lernart zugeschrieben.
- **Anschauliche Erklärungen**: Vulkanschnitt mit Beschriftung und schrittweises Bruchrechnen. Fachlicher Hintergrund zum Vulkanismus: [USGS](https://www.usgs.gov/special-topics/subduction-zone-science/science/introduction-subduction-zones-amazing-events). Die Subduktions-Erklärung in den bestehenden Geografie-Materialien wurde entsprechend präzisiert.

## Zuverlässigkeit

- Wiederholungsbox steigt höchstens einmal pro lokalem Kalendertag; Fehler bleiben kurzfristig fällig. Serien und Wiederholungen verwenden lokale Tage.
- Fortschritt wird über Kartenidentitäten statt Listenpositionen zugeordnet. Bestehende numerische Zuordnungen werden beim ersten Start übernommen. Bestehende eigene Karten werden in Themen überführt; auch doppelte eigene Karten behalten getrennte Fortschritte.
- Speicherfehler erscheinen dauerhaft sichtbar. Beschädigte vorhandene Daten werden nicht durch einen leeren Stand überschrieben. Wiederherstellung ersetzt den aktuellen Zustand erst nach erfolgreichem Speichern.
- Sicherungsversion 2; Version 1 bleibt lesbar. Verschachtelte Daten werden validiert. Abgebrochenes Teilen markiert keine Sicherung. Bei gewöhnlichen Downloads muss die gespeicherte Datei bestätigt werden. Maximal 30 MB pro Sicherungsimport, 20 MB pro Themenpaket.
- Version 32 versteht die neuen Themen und Lernwege nicht. Nach dem Upgrade keine alten App-Dateien über den neuen Datenstand legen. Vor einer Rückkehr zu einer alten Version die Sicherung aufbewahren.
- Offline-Dateien gehören zu einem gemeinsamen Versionscache; fehlgeschlagene Installationen werden verworfen. Ein Update wird über „Speichern und aktualisieren“ außerhalb einer Lernrunde aktiviert. Nur alte Caches dieser App werden entfernt.
- Historische kursbezogene Terminmigrationen ändern keine selbst angelegten Termine mehr.

## Entwicklung und Tests

Keine Produktions- oder Test-Abhängigkeiten erforderlich. Node.js 20 oder neuer:

```text
npm run check
npm test
python -m http.server 8333 --bind 127.0.0.1
```

Lokale Vorschau: `http://127.0.0.1:8333`. Testdaten auf dieser Adresse sind vom veröffentlichten Lernstand getrennt.

Die Tests prüfen Logik und DOM-Abläufe in einer kleinen In-Memory-Umgebung sowie den Service Worker mit simuliertem Cache/Netz. Sie prüfen keine Browserdarstellung oder echte Audioausgabe. GitHub Actions führt Syntaxprüfung und Tests bei Push und Pull Request aus.

Vorbereitung eines Updates: Versionsnummern in `core.js`, `sw.js` und `package.json` gemeinsam erhöhen; neue Produktionsdateien in `index.html` und `sw.js` aufnehmen.

## Verbleibende Geräteprüfung

Echte iPhone-/Android-Durchläufe bleiben nötig: Fotoauswahl, tatsächliches Speichern/Teilen, Sprachausgabe, große Schrift, Tastatur und Offline-Update. In der Entwicklungssitzung war der Browserhost nicht verfügbar; auch der native Chrome-Zugang scheiterte am minimierten Fenster. Die automatischen Tests ersetzen diese Geräteprüfung nicht.
