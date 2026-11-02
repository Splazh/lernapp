// Englisch: Wortschatz aus "Words in context" Unit 1 (S. 20-27) und Unit 2 (S. 30) von English in Context 5.
// Die Karten sind selbst formuliert. Fehlt etwas aus der offiziellen Liste (scook.at), bitte melden.
(function () {
  const G = 'Check-Up: Wortschatz Family and Friends';
  const add = (id, title, icon, cards) => (window.DECKS = window.DECKS || []).push({
    id, subject: 'englisch', group: G, title, icon, labels: ['English'], defaultSkip: 0, shortOptions: true,
    info: { kurz: 'Deutsch → Englisch, Wörter aus dem Buch.', use: ['Diese Wörter stehen in den Texten von Unit 1 und 2 grün markiert (neue Wörter) oder orange (kennst du vermutlich).', 'Beim Check-Up kommt Wortschatz als Übersetzung, als Definition und in eigenen Sätzen. Schreib die Wörter beim Üben selbst, das hilft bei der Rechtschreibung.'] }, cards });

  add('en-unit1-words', 'Unit 1: Family life', '🏠', [
    ['Haushalt', 'household'], ['mindestens', 'at least'], ['Geschwisterteil', 'sibling'], ['Ein-Eltern-Familie', 'single-parent family'],
    ['Trennung (von Partnern)', 'separation'], ['Stieffamilie', 'stepfamily'], ['Stiefbruder', 'stepbrother'], ['Stiefschwester', 'stepsister'], ['Halbschwester', 'half-sister'],
    ['Urenkelin', 'great-granddaughter'], ['Großvater', 'grandfather'], ['Haustier', 'pet'], ['erwachsen / Erwachsene(r)', 'adult'],
    ['eine Familie gründen', 'start a family'], ['seinen fairen Anteil an der Hausarbeit machen', 'do a fair share of the housework'], ['abwaschen', 'do the washing-up'],
    ['leiblich, biologisch', 'biological'], ['leibliche Mutter', 'birth mother'], ['Adoption', 'adoption'], ['trennen', 'to separate'],
    ['neugierig', 'curious'], ['überreden, überzeugen', 'persuade'], ['angeheiratete Verwandte', 'in-laws'], ['Grafikdesign', 'graphic design'],
    ['praktisch, bequem', 'convenient'], ['vernünftig', 'sensible'], ['unabhängig, selbstständig', 'independent'], ['locker, gelassen', 'easy-going'],
    ['mürrisch', 'grumpy'], ['fröhlich', 'cheerful'], ['frech, vorlaut', 'sassy'], ['Trickbetrug (jemanden mit Vertrauen täuschen)', 'confidence trick'],
    ['Mobber, Tyrann', 'bully'], ['Paar', 'couple'], ['Märchen', 'fairy tale'], ['schuldig', 'guilty'], ['stolz', 'proud'], ['Fernsehserie (Seifenoper)', 'soap opera'], ['Spion(in)', 'spy'],
    ['Herausforderung', 'challenge'], ['kompliziert', 'complicated'], ['Faktor', 'factor'], ['wert', 'worth'], ['Ansehen, Bild in der Öffentlichkeit', 'image']
  ]);

  add('en-unit2-words', 'Unit 2: Friendships', '🫂', [
    ['soziale Wesen', 'social animals'], ['zufrieden', 'contented'], ['geborgen, sicher', 'secure'], ['Gefühl, Emotion', 'emotion'], ['Verhalten', 'behaviour'],
    ['Spannung (zwischen Menschen)', 'tension'], ['Abneigung', 'dislike'], ['Hass', 'hatred'], ['urteilen, verurteilen', 'judge'], ['Geheimnis', 'secret'],
    ['Verantwortung', 'responsibility'], ['sich versöhnen', 'make up'], ['lebenslange Freundschaft', 'lifelong friendship'], ['Freundeskreis', 'circle of friends'],
    ['Clique', 'clique'], ['Gruppe, Menge (Freundesgruppe)', 'crowd'], ['Band, enge Verbindung', 'bond'], ['etwas gemeinsam haben', 'have something in common'],
    ['Rat, Ratschlag', 'advice'], ['Gruppe Gleichaltriger', 'peer group'], ['Gleichaltrige', 'peers'], ['Gruppendruck', 'peer pressure'], ['widerstehen', 'resist'],
    ['freundlich', 'friendly'], ['kooperativ, hilfsbereit', 'cooperative'], ['Lebenskompetenz', 'life skill'], ['jemanden behandeln', 'treat'], ['Respekt', 'respect'],
    ['asoziales Verhalten', 'antisocial behaviour'], ['Gemeinschaft, Gemeinde', 'community'], ['anonym', 'anonymous'], ['Wohlbefinden', 'well-being'], ['isoliert, abgeschieden', 'isolated'],
    ['mit jemandem in Kontakt kommen', 'come into contact with'], ['zufällig treffen', 'bump into'], ['zufällige Begegnung', 'chance meeting'], ['Fremde(r)', 'stranger'], ['Unterhaltung, Gespräch', 'conversation']
  ]);

  add('en-unit2-more', 'Unit 2 weiter und Extra Material', '🧑‍🤝‍🧑', [
    ['etwas als selbstverständlich nehmen', 'take sth. for granted'], ['verwirrt', 'puzzled'], ['so tun als ob', 'pretend'], ['Fehler, Schwäche', 'fault'], ['Ausnahme', 'exception'],
    ['über jemanden tratschen', 'gossip about sb.'], ['im Vertrauen', 'in confidence'], ['Schaden, schaden', 'harm'], ['gelegentlich', 'occasionally'], ['Privatsphäre', 'privacy'],
    ['kritisieren', 'criticize'], ['Aussehen', 'appearance'], ['verlässlich', 'reliable'], ['Fehler verzeihen', 'forgive mistakes'], ['verzweifelt', 'desperate'], ['nötig, notwendig', 'necessary'],
    ['verletzt (seelisch)', 'hurt'], ['eingreifen', 'step in'], ['jemandem Freiraum geben', 'give sb. space'], ['rund um die Uhr, 24 Stunden an 7 Tagen', '24/7'], ['Vorbild', 'role model'],
    ['von der Schule verweisen', 'expel'], ['Eingreifen, Intervention', 'intervention'], ['Opfer', 'victim'],
    ['Kernfamilie (Eltern und Kinder)', 'nuclear family'], ['Stiefvater', 'stepfather'], ['Pflegefamilie', 'foster family'], ['Waise', 'orphan'], ['Abstammung, Vorfahren', 'ancestry'],
    ['Nachkommen', 'descendants'], ['Großfamilie (mit Großeltern und weiteren Verwandten)', 'extended family'], ['die Scheidung einreichen', 'apply for a divorce'],
    ['einen eigenen Haushalt gründen', "set up one's own household"], ['Urgroßmutter', 'great-grandmother'], ['Urgroßeltern', 'great-grandparents'], ['Großonkel', 'great-uncle']
  ]);
})();
