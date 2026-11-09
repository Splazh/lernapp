---
auto_generated: false
---
# Übergabe: Lernapp Version 33 (2026-11-09)

Agent: codex  
Branch: main  
Implementierung: dbbc0c33e7ddba9077fe31ea02f9bbd4585fcafb  
Sperre: nach Abschluss freigegeben

## Auftrag und Ergebnis

Der Nutzer beauftragte die Umsetzung der zuvor besprochenen Verbesserungen einschließlich automatischer Tests. Version 33 wurde implementiert, committet und auf origin/main gepusht. GitHub Pages liefert core.js mit Version 33, sw.js mit lernapp-v33 sowie die neuen Module aus (HTTP 200). GitHub Actions „Lernapp checks“ für dbbc0c3 erfolgreich: https://github.com/Splazh/lernapp/actions/runs/42552352456.

Funktionen, Bedienung, Migrationen und Grenzen: [Version 33](../version-33.md).

## Architekturentscheidungen

- Vanilla JavaScript und statische Offline-App beibehalten; keine Produktions- oder Test-Abhängigkeiten, kein Backend, keine Konten.
- `schema.js` validiert Startzustand/Backups; `core.js` meldet Speicherfehler und ersetzt beim Restore den Zustand erst nach erfolgreichem Schreiben. Backup v2 unterstützt v1-Import.
- Lernfortschritt: Inhaltskennung für eingebaute Karten; persistente IDs für eigene Karten. Alte Positionsschlüssel werden migriert. Inhaltsänderung setzt betroffene Karten zurück, Umordnen/Verschieben erhält Fortschritt.
- `mine.js`: mehrere eigene Themen (`S.topics`), bestehende `S.mine`-Karten werden übernommen. Bearbeiten, Sortieren, Verschieben, eigene Lesetexte und Paketexport.
- `content.js`: Auswahl von Fächern/Themen, Suche, Paketimport mit Vorschau und neuen IDs, differenzierte Lernstandsanzeige.
- `journey.js`: persistierter Lernweg in `S.journey`; Lesen/Verstehen/Abrufen, variable ungefähre Dauer. Kein Zeitdruck.
- `exam.js`: gemischte Aufgaben, absolute Zeitgrenze, Bewertung erst nach Abgabe, explizite Selbstbewertung offener Antworten und fünf letzte Ergebnisse im Profil. Englisch-Beispielmaterial in `decks/practice.js`; kein Anspruch auf vollständige Nachbildung eines schulischen Prüfungsformats. TTS-Listening mit Lesealternative.
- `visuals.js`: eigenes SVG-Vulkanschema und Bruchrechen-Schritte. Fachlich falsche Vereinfachung „abtauchende Platte schmilzt“ in drei bestehenden Geo-Dateien korrigiert; USGS-Referenz in Version-33-Doku.
- `sw.js`: vollständiger Versionscache, keine HTML-Antwort als Ersatz für fehlende Skripte, Aktivierung wartender Updates auf Nutzeraktion außerhalb einer Runde; fremde Caches bleiben erhalten.
- Kursbezogene Datum-/Themenmigrationen aus `tests.js` entfernt, damit eigene Termine nicht verändert werden. `tests.js` bleibt das UI für Testtermine, automatische Tests liegen unter `qa/`.

## Validierung

- 38 Tests erfolgreich: Node-eigene Testbibliothek, deterministische In-Memory-DOM-Integration und Service-Worker-Cache-/Netzsimulation.
- Alle 46 Produktions-JavaScript-Dateien bestehen `node --check`; `git diff --check` ohne Befund.
- Abgedeckt: Wiederholungstage/Fehler/Serienschutz, lokaler Tageswechsel einschließlich Sommerzeitende, alte Zustände und doppelte eigene Karten, Speicherfehler, Sicherungsabbruch/-wiederherstellung, Suche/Stoffauswahl, Editieren/Verschieben/Import, vollständige Lernrunde, gemischter Probetest samt Selbstbewertung/Timeout, Offline-Installationsfehler und Cache-Isolation.
- CI bei Push/PR: `.github/workflows/test.yml`; lokal `npm run check` und `npm test`.

## Offen / Grenzen

- Kein visueller Browser- oder echter Mobilgerätetest möglich: Browserhost nicht verfügbar, nativer Chrome-Zugriff am minimierten Fenster gescheitert. Test-DOM ist kein Rendering- oder Accessibility-Audit.
- Nächste Geräteabnahme: iPhone Safari und Android Chrome, große Schrift/Tastatur, Fotoauswahl, reale Backup-Datei, Audio, Offline und Update von Version 32.
- Alte Version 32 kann die neuen eigenen Themen nicht darstellen. Nicht unbesehen mit neuerem Datenstand zurückrollen; Sicherung vorher behalten.
- Offene Antworten sind Selbstbewertungen; TTS ist keine professionelle Listening-Aufnahme. Neue Inhaltsformate zunächst für ausgewählte passende Themen, nicht flächendeckend für alle Fächer.

## Nächster sinnvoller Schritt

Feedback nach echten Lernrunden sammeln und die Geräteabnahme durchführen. Danach bei Bedarf weitere Lesetexte, offene Fragen und fachbezogene Illustrationen ergänzen. Kein weiterer Architekturumbau erforderlich.
