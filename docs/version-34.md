---
auto_generated: false
---
# Lernapp Version 34

## Oberfläche

Ruhiger Lernraum mit Lavendel (#F5F4F8), Tinte (#282636), Violett (#6554A4), Weiß und zurückhaltenden Linien (#E5E2EC). Dunkelmodus mit neutraleren Flächen und helleren Akzenten. Systemschrift für Bedienelemente, lokale Buchschrift für Begrüßung und die Einladung zur Lernrunde; keine externen Font- oder Bildabrufe.

Die Startseite zeigt Suche und Stoffauswahl direkt unter der Begrüßung. Eine dunkle Lernkarte bildet den Schwerpunkt; zuletzt geübte Themen sind eine ruhigere Fortsetzungskarte. Statistiken sind als kompakte Zeile gestaltet, Fächer und Lernkarten haben feinere Konturen. Aufgaben, Eingabefelder, Navigation, Lesetexte und Feedback verwenden dieselben Farben und Abstände. Bewegungsreduktion und große Schrift bleiben verfügbar. Auf größeren Bildschirmen wächst die App auf 600 px.

## Englische Aufgaben mit mehreren Lücken

Fünf Aufgaben in `decks/en-sa.js` enthielten zwei erforderliche Antworten, getrennt durch `/`. Dieses Zeichen bedeutet in der Antwortprüfung jedoch „alternative Lösung“. Die Daten enthalten jetzt je Lücke eine eigene Antwort; Auswahloptionen enthalten immer beide Formen.

- Selber schreiben und Lücken füllen zeigen Lücke 1 und Lücke 2.
- Der Lückenmodus zeigt den vollständigen Satz mit nummerierten Lücken und separater Rückmeldung.
- Auch der gemischte Probetest hat getrennte Eingabefelder.
- Nur beide richtigen Antworten in richtiger Reihenfolge ergeben eine richtige Aufgabe.
- Echte Varianten bleiben erlaubt, etwa `didn't want` und `did not want`.
- Mehrfaches Auslösen derselben Prüfung zählt die Antwort nur einmal.
- Erklärungen füllen alle Lücken des Satzes.

Die korrigierten Karten erhalten durch die geänderten Antworten neue Inhaltskennungen. Nur diese fünf Karten beginnen dadurch beim Wiederholungsstand neu; andere Karten behalten ihre Kennungen. Frühere Gesamt-XP werden nicht rückwirkend verändert.

## Prüfung

45 automatische Tests erfolgreich, darunter Datenprüfung aller fünf Karten, vollständige/unvollständige Antworten, Reihenfolge, Varianten, Auswahl, beide Eingabemodi und Probetest. 46 Produktionsskripte bestehen die Syntaxprüfung; Offline-Cache für Version 34 geprüft.

Keine visuelle Browserabnahme: Der Computer-Use-Browserhost war nicht verfügbar. Die DOM-Tests prüfen Abläufe, kein Rendering. Offen bleibt die Geräteabnahme von Hell/Dunkel, schmalem Bildschirm, großer Schrift, eingeblendeter Tastatur und Offline-Update. Kein Anspruch auf bereits visuell geprüfte Darstellung.
