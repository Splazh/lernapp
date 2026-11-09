---
auto_generated: false
---
# Design: Lernapp — Verfeinerung von Version 33

## Verbindliche Richtung

Auftrag vom 9. November 2026: Version 33 ist die gestalterische Grundlage. Die Optik von Version 34 ist ausdrücklich abgelehnt. Nur deren unabhängig geprüfte technischen Korrekturen übernehmen. Keine Veröffentlichung ohne visuelle Nutzerfreigabe.

Modus A (Operate), Apple Design: Vertrautheit, Klarheit und unmittelbare Rückmeldung. Bestehende Navigation, Startseitenreihenfolge, Begrüßung, Fächerfarben, Emojis als bekannte Fachkennzeichen und violette Fortsetzungskarte erhalten. Keine Editorial-Schrift, keine dunkle Marketingkarte, keine neue Informationsarchitektur.

## System

- Originale Palette: Lavendel #F3F4FF, Weiß #FFFFFF, Text #1B1A3B, Sekundärtext #5F6389, Violett #6D4CFF, zarte Kontur #E4E6F7. Violetter Verlauf nur in der bestehenden Fortsetzungskarte.
- System-Sans, auf Apple-Geräten die native Systemschrift. Überschriften 28/20 px mit 700; UI 14–17 px mit 500–650; Fließtext 16–18 px. Keine neue Display-Familie.
- Originale mobile Breite 480 px. Bestehende 2-spaltige Fachauswahl, unter 360 px einspaltig. Lange Texte dürfen umbrechen. Inhalte und Bedienelemente behalten ihre vertrauten Positionen.
- Radien: 24–28 px große Karten, 14–18 px Bedienelemente, 10–14 px innenliegende Zeichen/Chips. Weiche, kurze Schatten statt großflächigem Leuchten.
- Transparenz nur auf der funktionalen unteren Navigation/Prüfen-Leiste. Solider Fallback, reduzierte Transparenz und hoher Kontrast werden berücksichtigt. Antwortkarten bleiben deckend.
- Vorhandene Hell-/Dunkel-/Auto-Auswahl erhalten. Dunkle Primärbuttons erhalten dunkle Schrift auf hellem Violett. Erfolg/Fehler in Hell dunkler für lesbare Rückmeldungen.
- Bewegung nur bei Interaktion: Druckrückmeldung 140 ms, Farbe 180 ms. Kein Lade-Auftritt, kein Dauerschweben, kein pulsierender Belohnungsknopf. Reduzierte Bewegung bleibt respektiert. Keine neuen Gesten oder Animationsbibliotheken.

## Prüfung und Freigabe

Automatische Logiktests sind keine visuelle Abnahme. Vorschau neben unveränderter v33 vergleichen: Startseite, Fach, Lernart, Zwei-Lücken-Aufgabe und Profil; 320/390/430 px; Hell/Dunkel; normale und große Schrift. Echte Tastatur, Safari und Offline-Update separat prüfen. Keine Bewertung als „besser“ oder „Premium fertig“ ohne visuelle Bestätigung.
