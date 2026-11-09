// auto_generated: false
// Original practice material. Synthetic listening is labelled explicitly in the UI.
(() => {
  const links = {
    'o-geo-namib': ['geo-zirkulation', 'geo-wind'], 'o-geo-platten': ['geo-geologie', 'geo-vulkane'],
    'o-geo-begriffe': ['geo-atmosphaere', 'geo-klima'], 'o-geo-klimawandel': ['geo-klimawandel'],
    'o-geo-desert': ['geo-klimawandel', 'geo-biogeo'], 'o-geo-regenwald': ['geo-regenwald'],
    'o-geo-karst': ['geo-exogen-karst'], 'o-geo-zonen': ['geo-zirkulation', 'geo-biogeo'], 'o-geo-krafte': ['geo-exogen-karst']
  };
  for (const o of window.OPEN || []) o.decks = links[o.id] || [];
  const english = ['en-family-vocab', 'en-unit1-words', 'en-unit2-words', 'en-sa-peer'];
  window.OPEN.push({ id: 'o-en-friend', subject: 'englisch', decks: english, title: 'Helping a friend', be: 4,
    q: 'Write 50–80 words to a friend who feels lonely at a new school. Describe one thing you did when you were new, suggest an activity and explain why it could help.',
    punkte: ['Du gehst auf die Situation der Freundin/des Freundes ein.', 'Du beschreibst eine eigene vergangene Erfahrung.', 'Du schlägst eine konkrete gemeinsame Aktivität vor und begründest sie.', 'Deine Sätze sind verständlich; Vergangenheit und Vorschläge sind passend formuliert.'],
    muster: 'I know starting at a new school can feel lonely. When I was new, I joined the art club and met two classmates there. Why don’t we try the photography club together on Thursday? We could work on a project with other students. Sharing an activity gives us something to talk about.' });
  window.READ = window.READ || {};
  window.READ['en-family-vocab'] = {
    lead: 'Freundschaft bedeutet nicht, immer derselben Meinung zu sein. Lies das Beispiel und erkläre danach, wie man einen Konflikt fair lösen kann.',
    sections: [{ h: 'A small misunderstanding', p: ['Mia and Alex usually [[get on well]]. One afternoon, Alex did not answer a message. Mia thought Alex was angry. Instead of sending an angry reply, she decided to [[ask]] what had happened.', 'Alex was helping a younger brother with homework. Mia learned that it is important to [[listen]] before making a judgement. They agreed to [[support]] each other and talk honestly.'] }],
    check: [['Why did Alex not answer?', 'Alex was helping a younger brother with homework.'], ['What could Mia do before judging Alex?', 'Ask what happened and listen to the answer.']]
  };
  window.PRACTICE = [{ id: 'en-reading-club', subject: 'englisch', decks: english, kind: 'reading', title: 'Reading: A new club',
    text: 'When Sam moved to a new town, lunch breaks felt lonely. His classmate Jo invited him to the school garden club. Sam did not know anything about plants, but he liked taking photos. He offered to photograph the plants every week. After a month, the group used his photos in a presentation. Sam was happy because he had found a useful role in the team.',
    questions: [{ q: 'Why did Sam feel happy at the end?', options: ['He contributed to the team.', 'He won a photography competition.', 'He became an expert gardener.'], answer: 0 }, { q: 'What did Sam offer to do?', options: ['Buy new plants.', 'Take photos every week.', 'Move to another town.'], answer: 1 }] },
  { id: 'en-listening-weekend', subject: 'englisch', decks: english, kind: 'listening', title: 'Listening: Weekend plans',
    text: 'Hi Jamie, it is Taylor. Our picnic on Saturday is cancelled because of the rain. Let us meet at the library on Sunday at two instead. Bring the photos from our school trip. We can choose some for the class website. You do not need to bring food. See you on Sunday!',
    questions: [{ q: 'When and where will they meet?', options: ['Saturday at the park.', 'Sunday at two at the library.', 'Sunday at school.'], answer: 1 }, { q: 'What should Jamie bring?', options: ['Food for the picnic.', 'Photos from the school trip.', 'A new camera.'], answer: 1 }] }];
})();
