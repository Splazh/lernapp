---
auto_generated: false
---
# Version 35 — Verfeinerung auf Grundlage von Version 33

Lokaler Vorschlag, keine Veröffentlichung oder visuelle Nutzerfreigabe.

## Gestaltung

Die abgelehnte Version-34-Optik wurde vollständig durch die v33-Grundlage ersetzt. DESIGN.md hält die Vorgaben für weitere Änderungen fest. Verwendet: skill-finder zur Auswahl; design-modus, Modus A (Operate); apple-design für Typografie, Materialien, Vertrautheit und Druckrückmeldung; animate als Prüfung, wo Bewegung sinnvoll ist. Redesign-Skill gesichtet, seine generischen Stilwechselregeln zugunsten des ausdrücklichen Verfeinerungsauftrags nicht angewendet.

Erhalten: originale Seitenstruktur, Begrüßung, mobile 480-px-Breite, violette Farbwelt, helle Lernwegkarte, farbige Fortsetzungskarte, Fächerkennzeichen und untere Navigation. Keine Editorial-Schrift oder neue dunkle Fokuskarte.

Verfeinert: Systemschrift, abgestufte Schriftgewichte, kürzere Schatten, einheitlichere Eingabefelder, Dauer/Start-Gruppe im Lernweg, Suchen/Stoffauswahl mit vorhandenen Strichicons, klarer aktiver Tab samt aria-current, größere Layout-Umschalter, transluzente Navigation mit solidem Fallback. Bewegung nur bei Eingaben, Dauerschleife am Belohnungsknopf entfernt. Kontrast von Aktionstext und Erfolg/Fehler verbessert; reduzierte Bewegung/Transparenz und höherer Kontrast berücksichtigt.

## Technik

Die Änderungen aus v34 an den fünf mehrteiligen englischen Aufgaben bleiben erhalten: explizite Antwortspalten, separate beschriftete Felder in Schreiben/Lückenmodus und Probetest, korrekte Auswertung vollständiger Antworten, Varianten pro Feld, vollständige Erklärsätze und Schutz gegen doppelte Wertung. Die technischen Dateien wurden gegen den v34-Commit abgeglichen; keine neue Bewertungslogik für die Gestaltung eingeführt.

## Validierung

- 45 Node-Tests grün; 46 Produktionsskripte syntaxgeprüft.
- git diff --check ohne Befund.
- Lokaler Design-Detektor mit Profil A: keine Treffer (v33 hatte fünf). Statische Prüfung, kein Qualitätsnachweis des Renderings.
- Repräsentative Kontrastpaare: helle Primäraktion 5,09:1; dunkle Primäraktion 6,62:1; sekundärer Text Hell 5,28:1/Dunkel 6,38:1; Erfolg Hell 4,76:1; Fehler Hell 5,09:1. Kein vollständiger Accessibility-Audit.
- Kein automatisierter visueller Browser-/Handytest: Browserhost weiterhin nicht verfügbar.

## Vergleichsvorschau

Separat vom Produktionsrepo unter dem benachbarten Ordner lernapp-design-review. Auf localhost:8335 laufen Original v33 und Vorschlag v35 mit isolierten Vorschaudaten, ohne Service-Worker-Registrierung. Über gemeinsame Steuerelemente vergleichbar: Startseite, Englisch-Fach, Lernart, Zwei-Lücken-Aufgabe, Profil; Hell/Dunkel; Breite 320/390/430 px; Schrift normal/groß/sehr groß. Die Produktions-App bekommt weder Vorschauprofil noch Vergleichssteuerung.

Offen: visuelle Rückmeldung des Nutzers, Anpassungen daran und echte Handyprüfung. Erst nach ausdrücklicher Freigabe veröffentlichen. V34-Design nicht wiederverwenden.
