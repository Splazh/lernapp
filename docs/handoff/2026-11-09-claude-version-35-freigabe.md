---
auto_generated: false
---
# Übergabe an Claude: Lernapp Version 35 freigegeben

Stand: 2026-11-09. Nutzer hat die Vergleichsvorschau v33/v35 angesehen, v35 akzeptiert und Commit, Push und Veröffentlichung ausdrücklich beauftragt. Dieses Dokument ersetzt die vorherigen Hinweise auf fehlende Veröffentlichungsfreigabe.

## Bitte beachten

- Version 33 ist die gestalterische Grundlage. Version-34-Optik wurde ausdrücklich abgelehnt und ist verworfen. Nicht wiederherstellen!
- Akzeptierter Vorschlag: 57e3e89, Dokumentation a93ebf1. Maßgeblich sind DESIGN.md und docs/version-35.md.
- Apple Design und Design-Modus A: vertraute violette Farbwelt, Seitenstruktur und Fächerkarten erhalten; Schrift, Schatten, Eingaben, Navigation und Feedback gezielt verfeinert. Keine neue Editorial-Schrift oder dunkle Marketingkarte.
- Technische Korrekturen aus 030f50b bleiben erhalten. Fünf englische Zweilücken-Karten enthielten zwei notwendige Antworten mit '/', das die Prüfung als Alternativen behandelte. Jetzt separate Antwortspalten und beschriftete Eingabefelder, auch im Probetest; nur beide korrekten Antworten in richtiger Reihenfolge zählen. Echte Varianten bleiben je Feld erlaubt, Doppelauswertung gesperrt, Erklärungen füllen alle Lücken.
- Nur die fünf geänderten Karten erhalten neue Inhaltskennungen und beginnen ihren Wiederholungsstand neu. Andere Karten/XP nicht zurückgesetzt.

## Validierung

45 automatische Tests grün, 46 Produktionsskripte syntaxgeprüft, git diff --check sauber. Design-Detektor Profil A ohne Treffer; repräsentative Kontraste rechnerisch geprüft. Der Nutzer hat die visuelle Vorschau akzeptiert. Codex konnte wegen fehlendem Browserhost keinen automatisierten Rendering-/Handytest durchführen.

## Nächster sinnvoller Schritt

Nutzer möchte mit Claude noch einmal darübergehen. Auf dem tatsächlichen Handy prüfen: Hell/Dunkel, große Schrift, Tastatur mit beiden Lücken, Offline-Update auf Version 35. Bestehenden Lernstand erhalten, keine Zurücksetzung. Erst Nutzerfeedback sammeln, keine eigenmächtige neue Gestaltungsrichtung.

## Lokale Vorschau

Separater Ordner ../lernapp-design-review, bei Bedarf python -m http.server 8335 --bind 127.0.0.1. Vergleich mit isolierten Demo-Daten und ohne Service Worker. Diese Vorschau-Sonderdateien sind nicht Teil der veröffentlichten App.

## Veröffentlichung

Freigegebener Branch wird per Fast-forward nach main übernommen und auf origin/main veröffentlicht. Laufendes Deployment/Online-Kennung nach Push überprüfen; finale Bestätigung steht im Codex-State und im Chat. Historische v34-Commits bleiben nachvollziehbar, ausgeliefert wird ausschließlich der finale v35-Dateistand.
