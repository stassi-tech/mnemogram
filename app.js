/* ============================================================
   MNEMOGRAM — programme de l'application
   Jeu 1 : Reconnaissance des natures.
   ============================================================ */
'use strict';

/* Numéro de version affiché à l'écran (bandeau du haut) : à augmenter à chaque modification. */
const APP_VERSION = 'v81';

const $ = (id) => document.getElementById(id);

/* ------------------------------------------------------------
   LES DIX NATURES (d'après la fiche « Classe et fonctions des mots »)
   5 natures de mots variables, 5 natures de mots invariables.
   « explication » : une phrase simple pour un enfant de 7 ans, tirée de la colonne « rôle » de la fiche.
   ------------------------------------------------------------ */
const NATURES = [
  { code: 'N',  nom: 'Nom commun', article: 'un nom commun', groupe: 'variables',
    explication: "Le nom commun désigne une personne, un animal, une chose ou une idée : un chat, une chaise, l'amitié. Il a souvent un déterminant devant lui.",
    exemples: 'un paysage, une couleur, une chaise, une odeur, l\'amitié' },
  { code: 'VE', nom: 'Verbe d\'état', article: 'un verbe d\'état', groupe: 'variables',
    explication: "Le verbe d'état dit comment est quelqu'un ou quelque chose : être, paraître, sembler, devenir, rester.",
    exemples: 'être, paraître, sembler, devenir, rester, avoir l\'air' },
  { code: 'VA', nom: 'Verbe d\'action', article: 'un verbe d\'action', groupe: 'variables',
    explication: "Le verbe d'action dit ce que l'on fait : manger, courir, tomber, chanter.",
    exemples: 'manger, tomber, courir' },
  { code: 'A',  nom: 'Adjectif qualificatif', article: 'un adjectif qualificatif', groupe: 'variables',
    explication: "L'adjectif qualificatif décrit : il dit comment est quelqu'un ou quelque chose (grand, rouge, gentil).",
    exemples: 'maigre, grand, jaune, heureux' },
  { code: 'D',  nom: 'Déterminant', article: 'un déterminant', groupe: 'variables',
    explication: "Le déterminant se place devant le nom pour l'annoncer : le, une, mon, ce, des…",
    exemples: 'le, la, les, un, une, des, mon, ma, ce, cette, deux, chaque, quel' },
  { code: 'Pr', nom: 'Pronom', article: 'un pronom', groupe: 'variables',
    explication: "Le pronom remplace un nom, pour ne pas le répéter : je, tu, il, elle, nous, vous, ils…",
    exemples: 'je, tu, il, le, en, y, le mien, celui, chacun, qui, que' },
  { code: 'NP', nom: 'Nom propre', article: 'un nom propre', groupe: 'invariables',
    explication: "Le nom propre est le nom particulier d'une personne, d'un animal ou d'un lieu : Léa, Paris, la Loire. Il commence toujours par une majuscule.",
    exemples: 'Léa, Paul, Paris, la Loire' },
  { code: 'Av', nom: 'Adverbe', article: 'un adverbe', groupe: 'invariables',
    explication: "L'adverbe précise comment, quand ou combien : vite, demain, très, ne… pas.",
    exemples: 'demain, joyeusement, bientôt, pourquoi, ne… pas, trop, assez, très' },
  { code: 'P',  nom: 'Préposition', article: 'une préposition', groupe: 'invariables',
    explication: "La préposition est un petit mot qui sert de lien : à, de, dans, sur, avec, pour, sous…",
    exemples: 'à, de, dans, par, pour, sur, avec' },
  { code: 'CC', nom: 'Conjonction de coordination', article: 'une conjonction de coordination', groupe: 'invariables',
    explication: "La conjonction de coordination relie deux mots ou deux morceaux de phrase : mais, ou, et, donc, or, ni, car.",
    exemples: 'mais, ou, et, donc, or, ni, car' },
  { code: 'CS', nom: 'Conjonction de subordination', article: 'une conjonction de subordination', groupe: 'invariables',
    explication: "La conjonction de subordination ouvre une deuxième partie de phrase, reliée au verbe principal : quand, si, lorsque, comme, puisque…",
    exemples: 'que, quand, comme, si, lorsque, puisque, parce que' },
  { code: 'I',  nom: 'Interjection', article: 'une interjection', groupe: 'invariables',
    explication: "L'interjection est un cri qui exprime un sentiment : oh ! aïe ! bravo ! ouf !",
    exemples: 'aïe ! oh ! bravo ! chut ! ouf !' },
  { code: 'O',  nom: 'Onomatopée', article: 'une onomatopée', groupe: 'invariables',
    explication: "L'onomatopée est un mot qui imite un bruit : boum ! crac ! miaou ! tic-tac !",
    exemples: 'crac ! boum ! miaou ! atchoum !' },
];
/* v9 : JEU 2 — les sept natures de déterminants et les sept natures de pronoms de la fiche « Classe et fonctions
   des mots ». « court » = le nom écrit sur le petit bouton (le groupe « Déterminant » ou « Pronom » est écrit au-dessus). */
const NATURES_DETAIL = [
  { code: 'D.def', court: 'Article défini', nom: 'Article défini', article: 'un article défini', groupe: 'details',
    explication: "L'article défini se place devant un nom précis, que l'on connaît : *le*, *la*, *les*, *l'*.", exemples: "le, la, les, l'" },
  { code: 'D.ind', court: 'Article indéfini', nom: 'Article indéfini', article: 'un article indéfini', groupe: 'details',
    explication: "L'article indéfini se place devant un nom que l'on ne précise pas : *un*, *une*, *des*.", exemples: 'un, une, des' },
  { code: 'D.pos', court: 'Posses&shy;sif', nom: 'Déterminant possessif', article: 'un déterminant possessif', groupe: 'details',
    explication: "Le déterminant possessif dit à qui est la chose : *mon*, *ma*, *mes*, *ton*, *son*, *nos*…", exemples: 'mon, ma, mes, ton, son, notre, leur' },
  { code: 'D.dem', court: 'Démons&shy;tratif', nom: 'Déterminant démonstratif', article: 'un déterminant démonstratif', groupe: 'details',
    explication: "Le déterminant démonstratif montre ce dont on parle : *ce*, *cet*, *cette*, *ces*.", exemples: 'ce, cet, cette, ces' },
  { code: 'D.num', court: 'Numéral', nom: 'Déterminant numéral', article: 'un déterminant numéral', groupe: 'details',
    explication: "Le déterminant numéral dit combien il y en a : *deux*, *trois*, *cinq*…", exemples: 'un, deux, trois' },
  { code: 'D.idf', court: 'Indéfini', nom: 'Déterminant indéfini', article: 'un déterminant indéfini', groupe: 'details',
    explication: "Le déterminant indéfini parle d'une quantité que l'on ne compte pas précisément : *chaque*, *plusieurs*, *quelques*…", exemples: 'tout, chaque, plusieurs, quelques' },
  { code: 'D.int', court: 'Interro&shy;gatif', nom: 'Déterminant interrogatif', article: 'un déterminant interrogatif', groupe: 'details',
    explication: "Le déterminant interrogatif sert à poser une question sur le nom qui le suit : *quel*, *quelle*, *quels*, *quelles* ?", exemples: 'quel, quelle, quels, quelles' },
  { code: 'Pr.per', court: 'Person&shy;nel', nom: 'Pronom personnel', article: 'un pronom personnel', groupe: 'details',
    explication: "Le pronom personnel désigne les personnes qui parlent ou dont on parle : *je*, *tu*, *il*, *elle*, *nous*, *vous*, *ils*, *me*, *se*…", exemples: 'je, tu, il, la, le, y, en' },
  { code: 'Pr.pos', court: 'Posses&shy;sif', nom: 'Pronom possessif', article: 'un pronom possessif', groupe: 'details',
    explication: "Le pronom possessif remplace un nom en disant à qui il est : *le mien*, *le tien*, *la sienne*, *les nôtres*…", exemples: 'le mien, la mienne, le tien' },
  { code: 'Pr.dem', court: 'Démons&shy;tratif', nom: 'Pronom démonstratif', article: 'un pronom démonstratif', groupe: 'details',
    explication: "Le pronom démonstratif remplace un nom en le montrant : *celui*, *celle*, *celui-ci*, *celle-là*, *cela*…", exemples: 'celui, celle, cela, ça' },
  { code: 'Pr.num', court: 'Numéral', nom: 'Pronom numéral', article: 'un pronom numéral', groupe: 'details',
    explication: "Le pronom numéral remplace un nom par un nombre ou un rang : *deux*, *les deux*, *le premier*, *le deuxième*…", exemples: 'le premier, le deuxième' },
  { code: 'Pr.idf', court: 'Indéfini', nom: 'Pronom indéfini', article: 'un pronom indéfini', groupe: 'details',
    explication: "Le pronom indéfini remplace un nom que l'on ne précise pas : *chacun*, *quelqu'un*, *personne*, *certains*…", exemples: 'chacun, tous' },
  { code: 'Pr.int', court: 'Interro&shy;gatif', nom: 'Pronom interrogatif', article: 'un pronom interrogatif', groupe: 'details',
    explication: "Le pronom interrogatif sert à poser une question : *qui* ? *que* ? *lequel* ? *laquelle* ?", exemples: 'lequel ? qui ?' },
  { code: 'Pr.rel', court: 'Relatif', nom: 'Pronom relatif', article: 'un pronom relatif', groupe: 'details',
    explication: "Le pronom relatif remplace un nom et ouvre une partie de phrase qui le complète : *qui*, *que*, *quoi*, *dont*, *où*.", exemples: 'qui, que, quoi, dont, où' },
];
/* Disposition des boutons : une ligne par sous-tableau (deux boutons côte à côte quand il y en a deux). */
const BUTTON_ROWS = {
  variables: [['N'], ['VE', 'VA'], ['A'], ['D'], ['Pr']],
  invariables: [['NP'], ['Av'], ['P'], ['CC'], ['CS'], ['I', 'O']],
};
/* Jeu 2 : mêmes boutons, sauf Déterminant et Pronom, remplacés chacun par une ligne de 7 petits boutons. */
const BUTTON_ROWS_2 = {
  /* v10 : les couples sont alignés en colonnes (possessif au-dessus de possessif, démonstratif au-dessus de
     démonstratif…) ; en tête, les deux articles au-dessus des pronoms personnel et relatif. */
  variables: [['N'], ['VE', 'VA'], ['A'], { titre: 'Déterminant', codes: ['D.def', 'D.ind', 'D.pos', 'D.dem', 'D.num', 'D.idf', 'D.int'] },
    { titre: 'Pronom', codes: ['Pr.per', 'Pr.rel', 'Pr.pos', 'Pr.dem', 'Pr.num', 'Pr.idf', 'Pr.int'] }],
  invariables: [['NP'], ['Av'], ['P'], ['CC'], ['CS'], ['I', 'O']],
};
/* v15 : JEU 3 — les fonctions des mots dans le groupe verbal (boutons rouges : le rouge est la couleur des fonctions).
   « formule » = la question à se poser (elle est écrite dans la « Fiche fonction des mots ») ;
   « q » fabrique cette question avec le verbe de la phrase, pour la correction. */
const FONCTIONS = [
  { code: 'F.suj', court: 'Sujet', nom: 'Sujet', article: 'le sujet', groupe: 'fnom',
    exemples: 'verbe + qui est-ce qui ? = sujet',
    explication: "Le sujet dit qui fait l'action, ou de qui l'on parle. On le trouve en posant la question « qui est-ce qui ? » devant le verbe : *Qui est-ce qui dort ?* → *le chat*.",
    q: (v) => `Qui est-ce qui ${v} ?` },
  { code: 'F.cod', court: 'COD', nom: "Complément d'objet direct (COD)", article: 'un COD', groupe: 'fnom',
    exemples: 'verbe d\'action + quoi ? = COD',
    explication: "Le COD complète le verbe directement, sans petit mot entre les deux. On le trouve avec la question « quoi ? » (ou « qui ? ») après le verbe : *La fille mange quoi ?* → *une pomme*.",
    q: (v) => `${v} + quoi ?` },
  { code: 'F.coi', court: 'COI', nom: "Complément d'objet indirect (COI)", article: 'un COI', groupe: 'fnom',
    exemples: 'verbe d\'action + de quoi ? à quoi ? = COI',
    explication: "Le COI complète le verbe avec un petit mot entre les deux (*à*, *de*). On le trouve avec la question « à quoi ? » ou « de quoi ? » après le verbe : *Je parle à qui ?* → *à mon ami*.",
    q: (v, p) => `${v} + ${p === 'de' || p === 'd\'' ? 'de qui ? de quoi' : 'à qui ? à quoi'} ?` },
  { code: 'F.cos', court: 'COS', nom: "Complément d'objet second (COS)", article: 'un COS', groupe: 'fnom',
    exemples: 'verbe + COD + de quoi ? à quoi ? = COS',
    explication: "Le COS vient en plus du COD : on donne quelque chose à quelqu'un. On le trouve avec « à qui ? » ou « à quoi ? » après le verbe et le COD : *Je donne une pomme à qui ?* → *à ma sœur*.",
    q: (v) => `${v} + quelque chose + à qui ?` },
  { code: 'F.att', court: 'Attribut du sujet', nom: 'Attribut du sujet', article: 'un attribut du sujet', groupe: 'fnom',
    exemples: 'verbe d\'état + quoi ? (comment ?) = attribut du sujet',
    explication: "L'attribut du sujet vient après un verbe d'état (être, paraître, sembler, devenir, rester) et dit ce qu'est le sujet : *L'éléphant est quoi ?* → *un animal*. Un adjectif peut aussi être attribut : *Le chien est comment ?* → *blanc*.",
    q: (v) => `${v} + quoi ?` },
  { code: 'F.ccl', court: 'CC de lieu', nom: 'Complément circonstanciel de lieu', article: 'un complément circonstanciel de lieu', groupe: 'fnom',
    exemples: 'verbe + où ? = CC de lieu',
    remarque: "Les compléments circonstanciels (on dit aussi compléments de phrase) peuvent souvent être déplacés ou supprimés : *Sur la terrasse, le chat dort.*",
    explication: "Le complément circonstanciel de lieu dit où se passe l'action : *Le chat dort où ?* → *sur la terrasse*. Un adverbe peut l'être aussi : *ici*, *dehors*, *loin*.",
    q: (v) => `${v} + où ?` },
  { code: 'F.cct', court: 'CC de temps', nom: 'Complément circonstanciel de temps', article: 'un complément circonstanciel de temps', groupe: 'fnom',
    exemples: 'verbe + quand ? = CC de temps',
    explication: "Le complément circonstanciel de temps dit quand se passe l'action : *Les oiseaux chantent quand ?* → *le matin*. Un adverbe peut l'être aussi : *demain*, *bientôt*, *souvent*.",
    q: (v) => `${v} + quand ?` },
  { code: 'F.ccm', court: 'CC de manière', nom: 'Complément circonstanciel de manière', article: 'un complément circonstanciel de manière', groupe: 'fnom',
    exemples: 'verbe + comment ? = CC de manière',
    explication: "Le complément circonstanciel de manière dit comment se passe l'action : *Le camion roule comment ?* → *lentement*.",
    q: (v) => `${v} + comment ?` },
  { code: 'F.ccc', court: 'CC de cause', nom: 'Complément circonstanciel de cause', article: 'un complément circonstanciel de cause', groupe: 'fnom',
    exemples: 'verbe + pourquoi ? = CC de cause',
    explication: "Le complément circonstanciel de cause dit pourquoi l'action se passe : *Le bébé pleure pourquoi ?* → *de faim*.",
    q: (v) => `${v} + pourquoi ?` },
  { code: 'F.cdn', court: 'Complément du nom', nom: 'Complément du nom', article: 'un complément du nom', groupe: 'fgn',
    exemples: 'nom + de (d\', du) + nom = complément du nom',
    explication: "Le complément du nom complète un nom ; il est relié à lui par un petit mot (*de*, *d'*, *du*) : *le chat de mon voisin*, *un jus d'orange*. Il fait partie du groupe nominal.",
    q: () => '' },
  { code: 'F.epi', court: 'Épithète', nom: 'Épithète', article: 'un adjectif épithète', groupe: 'fadj',
    exemples: 'nom + adjectif collé à lui = épithète',
    explication: "L'adjectif épithète est tout près du nom, juste avant ou juste après lui : *un chien blanc*, *une petite souris*.",
    q: () => '' },
  { code: 'F.app', court: 'Apposé', nom: 'Apposé', article: 'un adjectif apposé', groupe: 'fadj',
    exemples: 'nom , adjectif , = apposé (séparé par une virgule)',
    explication: "L'adjectif apposé est séparé du nom (ou du pronom) par au moins une virgule : *Fatigué, le lion dort.*",
    q: () => '' },
  { code: 'F.mod', court: 'Modifie le sens', nom: 'Modifie le sens', article: 'un adverbe qui modifie le sens', groupe: 'fadv',
    exemples: 'adverbe + verbe, adjectif ou adverbe = modifie le sens',
    explication: "L'adverbe modifie le sens d'un verbe, d'un adjectif ou d'un autre adverbe : *très bon*, *ne… pas*. Si on l'enlève, la phrase reste juste, mais elle ne veut plus dire la même chose.",
    remarque: "Ce sont les adverbes interrogatifs, de négation (*ne… pas*, *ne… plus*) et de quantité (*trop*, *assez*, *très*). Les adverbes de circonstance (*demain*, *joyeusement*, *ici*), eux, sont compléments circonstanciels.\nL'adverbe peut ainsi être complément circonstanciel de lieu (*ici*), de temps (*demain*) ou de manière (*vite*).",
    q: () => '' },
];
/* Les fonctions proposées selon la nature : le nom commun, le nom propre et le pronom ont toutes les fonctions
   du nom ; l'adverbe modifie le sens ou est complément circonstanciel ; les autres natures n'ont pas de fonction ici. */
const FONCTIONS_PAR_NATURE = {
  N: ['F.suj', 'F.cod', 'F.coi', 'F.cos', 'F.att', 'F.ccl', 'F.cct', 'F.ccm', 'F.ccc'],
  Av: ['F.mod', 'F.ccl', 'F.cct', 'F.ccm'],
};
FONCTIONS_PAR_NATURE.NP = FONCTIONS_PAR_NATURE.N; FONCTIONS_PAR_NATURE.Pr = FONCTIONS_PAR_NATURE.N;
/* v18 : jeu 4 (groupe nominal) : seulement nom commun, nom propre, déterminant (7 sortes), adjectif qualificatif, pronom (7 sortes) */
const BUTTON_ROWS_4 = {
  variables: [['N'], ['A'], { titre: 'Déterminant', codes: ['D.def', 'D.ind', 'D.pos', 'D.dem', 'D.num', 'D.idf', 'D.int'] },
    { titre: 'Pronom', codes: ['Pr.per', 'Pr.rel', 'Pr.pos', 'Pr.dem', 'Pr.num', 'Pr.idf', 'Pr.int'] }],
  invariables: [['NP']],
};
const NATURE_BY_CODE = Object.fromEntries([...NATURES, ...NATURES_DETAIL, ...FONCTIONS].map((n) => [n.code, n]));
/* Les deux jeux. « priorite » : natures demandées au moins une fois par partie ; le reste des 20 questions
   est tiré au hasard parmi « reste ». « reponse » : la nature attendue pour une étiquette de mot. */
const GAMES = {
  natures: { titre: 'Exercice 1 : reconnaissance des natures de mots, niveau 1', type: 'Reconnaissance des natures, niveau 1', rows: BUTTON_ROWS,
    priorite: NATURES.map((n) => n.code), reste: NATURES.map((n) => n.code),
    reponse: (tag) => tag.split('.')[0] },
  natures2: { titre: 'Exercice 2 : reconnaissance des natures de mots, niveau 2', type: 'Reconnaissance des natures, niveau 2', rows: BUTTON_ROWS_2,
    priorite: NATURES_DETAIL.map((n) => n.code),
    reste: ['N', 'VE', 'VA', 'A', 'NP', 'Av', 'P', 'CC', 'CS', 'I', 'O'],
    reponse: (tag) => tag,
    pieges: {
      'D.pos': ['Pr.pos'], 'Pr.pos': ['D.pos'], 'D.dem': ['Pr.dem'], 'Pr.dem': ['D.dem'],
      'D.num': ['Pr.num'], 'Pr.num': ['D.num'], 'D.idf': ['Pr.idf'], 'Pr.idf': ['D.idf'],
      'D.int': ['Pr.int'], 'Pr.int': ['D.int', 'Pr.rel'], 'D.def': ['Pr.per'], 'Pr.per': ['D.def'],
      'Pr.rel': ['Pr.int', 'CS'], 'CS': ['Pr.rel'],
    } },
  /* v15 : jeu 3. On ne demande que des mots qui ont une fonction dans le groupe verbal (nom, nom propre,
     pronom, adverbe) : pas d'adjectif (il ira dans le jeu 4). Une question = la nature (0,5 point) puis la
     fonction (0,5 point). */
  fonctions: { titre: 'Exercice 3 : reconnaissance des natures et fonctions des mots dans le groupe verbal', type: 'Natures et fonctions (groupe verbal), niveau 3', rows: BUTTON_ROWS,
    reponse: (tag) => tag.split('.')[0], niveau: 3,
    /* les 20 questions se répartissent entre les fonctions (au moins une fois chacune), puis au hasard */
    priorite: ['suj', 'suj', 'suj', 'cod', 'cod', 'cod', 'ccl', 'ccl', 'cct', 'cct', 'ccm', 'ccm', 'mod', 'mod', 'coi', 'cos', 'att', 'ccc'],
    reste: ['suj', 'cod', 'ccl', 'cct', 'ccm', 'coi', 'cos'],
    cle: (m) => m.fn || null, gv: true, nb: 10 },
  /* v18 : jeu 4. Les boutons clignotent, et c'est dans la phrase que l'on clique : le nom, puis son déterminant
     (et la sorte exacte de déterminant, sur les boutons), son adjectif s'il y en a, son complément du nom s'il y en a. */
  gn: { titre: 'Exercice 4 : reconnaissance des natures et fonctions des mots dans le groupe nominal', type: 'Natures et fonctions (groupe nominal), niveau 4', rows: BUTTON_ROWS_4,
    reponse: (tag) => tag, niveau: 4, nb: 10, gn: true },
  /* v32 : jeu 5, le bilan : un tableau de vingt cases à remplir en suivant la méthode des jeux 3 et 4 */
  tableau: { titre: 'Exercice 5 : bilan, le tableau des 20 cases avec guide', type: 'Bilan : le tableau des vingt cases, niveau 5', rows: BUTTON_ROWS,
    reponse: (tag) => tag, niveau: 5, nb: 1, tab: true, total: 20 },
  /* v35 : jeu 6, le même tableau, mais sans guide : l'enfant remplit les cases dans l'ordre qu'il veut, puis corrige */
  libre: { titre: 'Exercice 6 : bilan, le tableau des 20 cases sans guide', type: 'Bilan sans guide : le tableau des vingt cases, niveau 6', rows: BUTTON_ROWS,
    reponse: (tag) => tag, niveau: 6, nb: 1, tab: true, total: 20 },
  /* v39 : les temps et les modes, exercice 1 */
  temps1: { titre: 'Temps et modes, exercice 1 : reconnaissance des temps et des modes dans un texte au système du présent', type: 'Temps et modes dans un texte au système du présent, niveau 7', rows: BUTTON_ROWS,
    reponse: (tag) => tag, niveau: 7, nb: 1, tm: true, total: 20, partie: 'temps' },
  /* v40 : exercice 2, au système du passé : 1re partie dans la langue du 19e siècle, 2e partie dans celle d'aujourd'hui */
  temps2: { titre: 'Temps et modes, exercice 2 : reconnaissance des temps et des modes dans un texte au système du passé', type: 'Temps et modes dans un texte au système du passé, niveau 8', rows: BUTTON_ROWS,
    reponse: (tag) => tag, niveau: 8, nb: 1, tm: true, texte: 1, total: 26, partie: 'temps' },
  /* v42 : exercice 3 : temps, mode, et leurs valeurs */
  temps3: { titre: 'Temps et modes, exercice 3 : analyse des temps et des modes personnels dans un texte au système du présent', type: 'Analyse des temps et des modes personnels au système du présent, niveau 9', rows: BUTTON_ROWS,
    reponse: (tag) => tag, niveau: 9, nb: 1, tm: true, texte: 2, total: 20, valeurs: true, partie: 'temps' },
  /* v45 : exercice 4 : le même travail au système du passé, en français classique puis contemporain */
  /* v50 : la phrase, exercice 1 : syntaxe de la phrase (bandes à étirer) */
  phrase1: { titre: 'La phrase, exercice 1 : syntaxe de la phrase', type: 'Syntaxe de la phrase, niveau 13', rows: BUTTON_ROWS,
    reponse: (tag) => tag, niveau: 13, nb: 1, sx: true, texte: 0, total: 20, partie: 'phrase' },
  /* v54 : la phrase, exercice 2 : nature précise et fonction des propositions (bandes bleues, vertes, rouges) */
  phrase2: { titre: 'La phrase, exercice 2 : analyse, nature et fonction des propositions', type: 'Nature et fonction des propositions, niveau 14', rows: BUTTON_ROWS,
    reponse: (tag) => tag, niveau: 14, nb: 1, sx: true, sxFn: true, texte: 1, total: 37, partie: 'phrase' },
  /* v65 : les temps et les modes au CE1 – CE2, en douze exercices */
  'ce-verbe': { titre: 'Trouver le verbe conjugué', type: 'Trouver le verbe conjugué, niveau 17', rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 17, nb: 1, tv: 'ce-verbe', total: 6, partie: 'temps' },
  'ce-inf': { titre: 'Trouver l\'infinitif du verbe', type: 'Trouver l\'infinitif, niveau 18', rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 18, nb: 1, tf: 'ce-inf', total: 6, partie: 'temps' },
  'ce-quand': { titre: 'Passé, présent ou futur', type: 'Passé, présent ou futur, niveau 19', rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 19, nb: 1, tm: true, total: 6, partie: 'temps' },
  'ce-pres': { titre: 'Le présent', type: 'Conjuguer au présent, niveau 20', rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 20, nb: 1, tf: 'ce-pres', total: 6, partie: 'temps' },
  'ce-fut': { titre: 'Le futur', type: 'Conjuguer au futur, niveau 21', rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 21, nb: 1, tf: 'ce-fut', total: 6, partie: 'temps' },
  'ce-imp': { titre: 'L\'imparfait', type: 'Conjuguer à l\'imparfait, niveau 22', rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 22, nb: 1, tf: 'ce-imp', total: 6, partie: 'temps' },
  'ce-pca': { titre: 'Le passé composé avec avoir', type: 'Passé composé avec avoir, niveau 23', rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 23, nb: 1, tf: 'ce-pca', total: 5, partie: 'temps' },
  'ce-pce': { titre: 'Le passé composé avec être', type: 'Passé composé avec être, niveau 24', rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 24, nb: 1, tf: 'ce-pce', total: 5, partie: 'temps' },
  'ce-etav': { titre: 'Les verbes être et avoir', type: 'Être et avoir, niveau 25', rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 25, nb: 1, tf: 'ce-etav', total: 6, partie: 'temps' },
  'ce-groupes': { titre: 'Les trois groupes de verbes', type: 'Les trois groupes, niveau 26', rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 26, nb: 1, tm: true, total: 6, partie: 'temps' },
  'ce-bontemps': { titre: 'Écrire les verbes au bon temps', type: 'Écrire les verbes au bon temps, niveau 27', rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 27, nb: 1, tf: 'ce-bontemps', total: 10, partie: 'temps' },
  /* v74 : les mots au CE1 – CE2, en douze exercices (dix exercices de quatre textes, deux bilans de douze textes) */
  'ce-noms': { titre: "Trouver les noms", type: "Trouver les noms, niveau 28", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 28, nb: 1, tv: 'ce-noms', total: 10, partie: 'mots' },
  'ce-ncnp': { titre: "Nom commun ou nom propre", type: "Nom commun ou nom propre, niveau 29", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 29, nb: 1, tm: true, total: 10, partie: 'mots' },
  'ce-dets': { titre: "Trouver les déterminants", type: "Trouver les déterminants, niveau 30", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 30, nb: 1, tv: 'ce-dets', total: 10, partie: 'mots' },
  'ce-det3': { titre: "Les sortes de déterminants", type: "Les sortes de déterminants, niveau 31", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 31, nb: 1, tm: true, total: 10, partie: 'mots' },
  'ce-adjs': { titre: "Trouver les adjectifs", type: "Trouver les adjectifs, niveau 32", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 32, nb: 1, tv: 'ce-adjs', total: 10, partie: 'mots' },
  'ce-genre': { titre: "Le genre et le nombre des noms", type: "Le genre et le nombre des noms, niveau 33", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 33, nb: 1, tm: true, total: 10, partie: 'mots' },
  'ce-accord': { titre: "Accorder dans le groupe nominal", type: "Accorder dans le groupe nominal, niveau 34", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 34, nb: 1, tf: 'ce-accord', total: 10, partie: 'mots' },
  'ce-prons': { titre: "Les pronoms personnels sujets", type: "Les pronoms personnels sujets, niveau 35", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 35, nb: 1, tv: 'ce-prons', total: 10, partie: 'mots' },
  'ce-sujets': { titre: "Trouver le sujet du verbe", type: "Trouver le sujet du verbe, niveau 36", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 36, nb: 1, tv: 'ce-sujets', total: 10, partie: 'mots' },
  'ce-nat5': { titre: "Nom commun, nom propre, déterminant, adjectif, verbe ou pronom", type: "Nature des mots, niveau 37", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 37, nb: 1, tm: true, total: 10, partie: 'mots' },
  'ce-bilannat': { titre: "Reconnaître la nature des mots", type: "Reconnaître la nature des mots, niveau 38", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 38, nb: 1, tm: true, total: 10, partie: 'mots' },
  'ce-bilanacc': { titre: "Accorder le groupe nominal et le verbe", type: "Accorder le groupe nominal et le verbe, niveau 39", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 39, nb: 1, tf: 'ce-bilanacc', total: 10, partie: 'mots' },
  /* v75 : la phrase au CE1 – CE2, en douze exercices */
  'ce-phr': { titre: "Phrase ou pas phrase ?", type: "Phrase ou pas phrase ?, niveau 40", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 40, nb: 1, tm: true, total: 10, partie: 'phrase' },
  'ce-ponct': { titre: "La ponctuation de fin de phrase", type: "La ponctuation de fin de phrase, niveau 41", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 41, nb: 1, tm: true, total: 10, partie: 'phrase' },
  'ce-types': { titre: "Les trois types de phrases", type: "Les trois types de phrases, niveau 42", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 42, nb: 1, tm: true, total: 10, partie: 'phrase' },
  'ce-int': { titre: "Transformer en phrase interrogative", type: "Transformer en phrase interrogative, niveau 43", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 43, nb: 1, tf: 'ce-int', total: 10, partie: 'phrase' },
  'ce-imper': { titre: "Transformer en phrase impérative", type: "Transformer en phrase impérative, niveau 44", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 44, nb: 1, tf: 'ce-imper', total: 10, partie: 'phrase' },
  'ce-formes': { titre: "Forme affirmative ou forme négative", type: "Forme affirmative ou forme négative, niveau 45", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 45, nb: 1, tm: true, total: 10, partie: 'phrase' },
  'ce-neg': { titre: "Transformer à la forme négative", type: "Transformer à la forme négative, niveau 46", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 46, nb: 1, tf: 'ce-neg', total: 10, partie: 'phrase' },
  'ce-paroles': { titre: "Les paroles des personnages", type: "Les paroles des personnages, niveau 47", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 47, nb: 1, tv: 'ce-paroles', total: 10, partie: 'phrase' },
  'ce-svc': { titre: "Sujet, verbe, complément", type: "Sujet, verbe, complément, niveau 48", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 48, nb: 1, tm: true, total: 10, partie: 'phrase' },
  'ce-ccp': { titre: "Les compléments de phrase", type: "Les compléments de phrase, niveau 49", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 49, nb: 1, tv: 'ce-ccp', total: 10, partie: 'phrase' },
  'ce-transfo': { titre: "Transformer les phrases", type: "Transformer les phrases, niveau 50", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 50, nb: 1, tf: 'ce-transfo', total: 10, partie: 'phrase' },
  /* v79 : les mots au CM1 – CM2, en douze exercices */
  'cm-nat': { titre: "Les natures des mots variables", type: "Les natures des mots variables, niveau 51", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 51, nb: 1, tm: true, total: 10, partie: 'mots' },
  'cm-inv': { titre: "Les mots invariables", type: "Les mots invariables, niveau 52", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 52, nb: 1, tm: true, total: 10, partie: 'mots' },
  'cm-detpron': { titre: "Déterminant ou pronom ?", type: "Déterminant ou pronom ?, niveau 53", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 53, nb: 1, tm: true, total: 10, partie: 'mots' },
  'cm-sujet': { titre: "Trouver le sujet du verbe", type: "Trouver le sujet du verbe, niveau 54", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 54, nb: 1, tv: 'cm-sujet', total: 10, partie: 'mots' },
  'cm-cvcp': { titre: "Complément du verbe ou complément de phrase ?", type: "Complément du verbe ou complément de phrase ?, niveau 55", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 55, nb: 1, tm: true, total: 10, partie: 'mots' },
  'cm-attcv': { titre: "Attribut du sujet ou complément du verbe ?", type: "Attribut du sujet ou complément du verbe ?, niveau 56", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 56, nb: 1, tm: true, total: 10, partie: 'mots' },
  'cm-epcn': { titre: "Épithète ou complément du nom ?", type: "Épithète ou complément du nom ?, niveau 57", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 57, nb: 1, tm: true, total: 10, partie: 'mots' },
  'cm-accgn': { titre: "Accorder dans le groupe nominal", type: "Accorder dans le groupe nominal, niveau 58", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 58, nb: 1, tf: 'cm-accgn', total: 10, partie: 'mots' },
  'cm-accsv': { titre: "Accorder le verbe avec son sujet", type: "Accorder le verbe avec son sujet, niveau 59", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 59, nb: 1, tf: 'cm-accsv', total: 10, partie: 'mots' },
  'cm-accatt': { titre: "Accorder l'attribut et le participe passé", type: "Accorder l'attribut et le participe passé, niveau 60", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 60, nb: 1, tf: 'cm-accatt', total: 10, partie: 'mots' },
  'cm-bilannf': { titre: "Nature et fonction des mots", type: "Nature et fonction des mots, niveau 61", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 61, nb: 1, tm: true, total: 10, partie: 'mots' },
  'cm-bilanacc': { titre: "Tous les accords", type: "Tous les accords, niveau 62", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 62, nb: 1, tf: 'cm-bilanacc', total: 10, partie: 'mots' },
  /* v80 : les temps et les modes au CM1 – CM2 */
  'cm-pres': { titre: "Le présent des verbes irréguliers", type: "Le présent des verbes irréguliers, niveau 63", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 63, nb: 1, tf: 'cm-pres', total: 10, partie: 'temps' },
  'cm-fut': { titre: "Le futur", type: "Le futur, niveau 64", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 64, nb: 1, tf: 'cm-fut', total: 10, partie: 'temps' },
  'cm-imp': { titre: "L'imparfait", type: "L'imparfait, niveau 65", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 65, nb: 1, tf: 'cm-imp', total: 10, partie: 'temps' },
  'cm-ps': { titre: "Le passé simple", type: "Le passé simple, niveau 66", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 66, nb: 1, tf: 'cm-ps', total: 10, partie: 'temps' },
  'cm-imps': { titre: "Imparfait ou passé simple ?", type: "Imparfait ou passé simple ?, niveau 67", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 67, nb: 1, tm: true, total: 10, partie: 'temps' },
  'cm-pc': { titre: "Le passé composé", type: "Le passé composé, niveau 68", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 68, nb: 1, tf: 'cm-pc', total: 10, partie: 'temps' },
  'cm-pqp': { titre: "Le plus-que-parfait", type: "Le plus-que-parfait, niveau 69", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 69, nb: 1, tf: 'cm-pqp', total: 10, partie: 'temps' },
  'cm-cond': { titre: "Le conditionnel présent", type: "Le conditionnel présent, niveau 70", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 70, nb: 1, tf: 'cm-cond', total: 10, partie: 'temps' },
  'cm-imper': { titre: "L'impératif présent", type: "L'impératif présent, niveau 71", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 71, nb: 1, tf: 'cm-imper', total: 10, partie: 'temps' },
  'cm-recit': { titre: "Les temps du récit au passé", type: "Les temps du récit au passé, niveau 72", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 72, nb: 1, tm: true, total: 10, partie: 'temps' },
  'cm-bontemps': { titre: "Écrire un récit au passé", type: "Écrire un récit au passé, niveau 73", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 73, nb: 1, tf: 'cm-bontemps', total: 10, partie: 'temps' },
  /* v81 : la phrase au CM1 – CM2 */
  'cm-phnv': { titre: "Phrase verbale ou phrase nominale ?", type: "Phrase verbale ou phrase nominale ?, niveau 74", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 74, nb: 1, tm: true, total: 10, partie: 'phrase' },
  'cm-types': { titre: "Les trois types de phrases", type: "Les trois types de phrases, niveau 75", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 75, nb: 1, tm: true, total: 10, partie: 'phrase' },
  'cm-formes4': { titre: "Les formes de phrases", type: "Les formes de phrases, niveau 76", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 76, nb: 1, tm: true, total: 10, partie: 'phrase' },
  'cm-neg2': { titre: "Les mots de la négation", type: "Les mots de la négation, niveau 77", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 77, nb: 1, tf: 'cm-neg2', total: 10, partie: 'phrase' },
  'cm-int2': { titre: "Poser une question", type: "Poser une question, niveau 78", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 78, nb: 1, tf: 'cm-int2', total: 10, partie: 'phrase' },
  'cm-simcomp': { titre: "Phrase simple ou phrase complexe ?", type: "Phrase simple ou phrase complexe ?, niveau 79", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 79, nb: 1, tm: true, total: 10, partie: 'phrase' },
  'cm-jc': { titre: "Propositions juxtaposées ou coordonnées ?", type: "Propositions juxtaposées ou coordonnées ?, niveau 80", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 80, nb: 1, tm: true, total: 10, partie: 'phrase' },
  'cm-paroles': { titre: "Le dialogue", type: "Le dialogue, niveau 81", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 81, nb: 1, tv: 'cm-paroles', total: 10, partie: 'phrase' },
  'cm-disc': { titre: "Discours direct ou discours indirect ?", type: "Discours direct ou discours indirect ?, niveau 82", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 82, nb: 1, tm: true, total: 10, partie: 'phrase' },
  'cm-cc3': { titre: "Les compléments de lieu, de temps, de manière", type: "Les compléments de lieu, de temps, de manière, niveau 83", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 83, nb: 1, tm: true, total: 10, partie: 'phrase' },
  'cm-transfo': { titre: "Transformer les phrases", type: "Transformer les phrases, niveau 84", rows: BUTTON_ROWS, reponse: (tag) => tag, niveau: 84, nb: 1, tf: 'cm-transfo', total: 10, partie: 'phrase' },
  /* v62 : la phrase : types et formes de phrases (bandes bleues, vertes, et rouges au collège) */
  formes: { titre: 'La phrase : types et formes de phrases', type: 'Types et formes de phrases, niveau 16', rows: BUTTON_ROWS,
    reponse: (tag) => tag, niveau: 16, nb: 1, sx: true, sxTF: true, total: 20, partie: 'phrase' },
  /* v58 : la phrase, exercice 3 : transformer les paroles rapportées (discours direct ↔ discours indirect) */
  phrase3: { titre: 'La phrase, exercice 3 : du discours direct au discours indirect, et inversement', type: 'Discours direct et discours indirect, niveau 15', rows: BUTTON_ROWS,
    reponse: (tag) => tag, niveau: 15, nb: 1, dr: true, total: 12, partie: 'phrase' },
  /* v47 : transformer un texte */
  temps5: { titre: 'Temps et modes, exercice 5 : transformer un texte au système du passé en texte au système du présent', type: 'Transformer un texte du passé au présent, niveau 11', rows: BUTTON_ROWS,
    reponse: (tag) => tag, niveau: 11, nb: 1, tf: 'passe2pres', total: 10, partie: 'temps' },
  temps6: { titre: 'Temps et modes, exercice 6 : transformer un texte au système du présent en texte au système du passé', type: 'Transformer un texte du présent au passé, niveau 12', rows: BUTTON_ROWS,
    reponse: (tag) => tag, niveau: 12, nb: 1, tf: 'pres2passe', total: 10, partie: 'temps' },
  temps4: { titre: 'Temps et modes, exercice 4 : analyse des temps et des modes personnels dans un texte au système du passé', type: 'Analyse des temps et des modes personnels au système du passé, niveau 10', rows: BUTTON_ROWS,
    reponse: (tag) => tag, niveau: 10, nb: 1, tm: true, texte: 3, total: 26, valeurs: true, partie: 'temps' },
};
GAMES.natures.niveau = 1; GAMES.natures2.niveau = 2;
const nbQuestions = () => currentGame.nb || NB_QUESTIONS;
let currentGame = GAMES.natures;
const answerCodeOf = (tag) => currentGame.reponse(tag);

/* ------------------------------------------------------------
   LES PHRASES
   Chaque mot est suivi de « / » et du code de sa nature. La ponctuation reste seule.
   Un mot qui finit par une apostrophe (l', j', n') se colle au mot suivant.
   Codes : N nom commun, VE verbe d'état, VA verbe d'action, A adjectif qualificatif,
           D.def / D.ind (articles défini et indéfini), D.pos, D.dem, D.num, D.idf, D.int (déterminants possessif,
           démonstratif, numéral, indéfini, interrogatif),
           Pr.per, Pr.pos, Pr.dem, Pr.num, Pr.idf, Pr.int, Pr.rel (pronoms personnel, possessif, démonstratif,
           numéral, indéfini, interrogatif, relatif),
           NP nom propre, Av adverbe, P préposition, CC conj. de coordination, CS conj. de subordination,
           I interjection, O onomatopée.
   Dans le jeu 1, tous les D.xxx comptent comme « déterminant » et tous les Pr.xxx comme « pronom ».
   v9 : un « _ » relie les mots d'un même groupe (le_mien = « le mien ») ; un mot qui commence par « - » se
   colle au précédent (préfères -tu = « préfères-tu »).
   ------------------------------------------------------------ */
const PHRASES = [
  'Le/D.def chat/N=suj de/P mon/D.pos voisin/N dort/VA tranquillement/Av=ccm sur/P la/D.def terrasse/N=ccl .',
  'La/D.def petite/A fille/N=suj mange/VA une/D.ind pomme/N=cod rouge/A .',
  'Mon/D.pos frère/N=suj et/CC ma/D.pos sœur/N=suj jouent/VA dans/P le/D.def jardin/N=ccl .',
  'Oh/I ! Le/D.def gâteau/N=suj est/VE très/Av=mod bon/A .',
  'Quand/CS il/Pr.per pleut/VA , nous/Pr.per=suj jouons/VA à/P la/D.def maison/N=ccl .',
  'Le/D.def chien/N=suj aboie/VA car/CC il/Pr.per=suj entend/VA un/D.ind bruit/N=cod .',
  'Aïe/I ! Cette/D.dem porte/N=suj est/VE lourde/A .',
  'Le/D.def soleil/N=suj brille/VA dans/P le/D.def ciel/N=ccl bleu/A .',
  'Mon/D.pos papa/N=suj prépare/VA une/D.ind soupe/N=cod chaude/A .',
  'Les/D.def oiseaux/N=suj chantent/VA joyeusement/Av=ccm le/D.def matin/N=cct .',
  'Tu/Pr.per=suj lis/VA un/D.ind livre/N=cod ou/CC tu/Pr.per=suj dessines/VA ?',
  'Elle/Pr.per=suj porte/VA une/D.ind jolie/A robe/N=cod verte/A .',
  'Le/D.def bébé/N=suj pleure/VA car/CC il/Pr.per=suj veut/VA son/D.pos biberon/N=cod .',
  'Nous/Pr.per=suj allons/VA à/P l\'/D.def école/N=ccl avec/P nos/D.pos amis/N .',
  'Bravo/I ! Tu/Pr.per=suj gagnes/VA la/D.def course/N=cod .',
  'Le/D.def lapin/N=suj mange/VA une/D.ind carotte/N=cod et/CC une/D.ind salade/N=cod .',
  'Ce/D.dem gros/A camion/N=suj roule/VA lentement/Av=ccm .',
  'Si/CS tu/Pr.per=suj veux/VA , nous/Pr.per=suj jouerons/VA ensemble/Av=ccm .',
  'Lorsque/CS la/D.def cloche/N=suj sonne/VA , les/D.def élèves/N=suj sortent/VA .',
  'Ma/D.pos grand-mère/N=suj tricote/VA une/D.ind écharpe/N=cod pour/P moi/Pr.per .',
  'Le/D.def poisson/N=suj nage/VA vite/Av=ccm dans/P l\'/D.def eau/N=ccl froide/A .',
  'Hourra/I ! Les/D.def vacances/N=suj commencent/VA demain/Av=cct .',
  'Le/D.def ciel/N=suj est/VE gris/A mais/CC il/Pr.per ne/Av=mod pleut/VA pas/Av=mod .',
  'Je/Pr.per=suj cherche/VA mon/D.pos ballon/N=cod sous/P le/D.def lit/N=ccl .',
  'La/D.def maîtresse/N=suj raconte/VA une/D.ind belle/A histoire/N=cod .',
  'Comme/CS la/D.def nuit/N=suj tombe/VA , j\'/Pr.per=suj allume/VA la/D.def lampe/N=cod .',
  'Mon/D.pos chat/N=suj noir/A dort/VA souvent/Av=cct sur/P le/D.def canapé/N=ccl .',
  'Nous/Pr.per=suj mangeons/VA des/D.ind fraises/N=cod sucrées/A avec/P Léa/NP .',
  'Le/D.def cheval/N=suj galope/VA dans/P la/D.def prairie/N=ccl verte/A .',
  'Chut/I ! Le/D.def bébé/N=suj dort/VA .',
  'Paul/NP=suj ouvre/VA la/D.def fenêtre/N=cod et/CC regarde/VA le/D.def jardin/N=cod .',
  'Elle/Pr.per=suj sourit/VA quand/CS elle/Pr.per=suj voit/VA son/D.pos ami/N=cod .',
  'Les/D.def enfants/N=suj courent/VA dans/P la/D.def cour/N=ccl .',
  'Ce/D.dem petit/A garçon/N=suj est/VE gentil/A .',
  'Le/D.def train/N=suj arrive/VA bientôt/Av=cct à/P la/D.def gare/N=ccl .',
  'Je/Pr.per=suj mets/VA mes/D.pos bottes/N=cod car/CC il/Pr.per pleut/VA .',
  'Ouf/I ! Nous/Pr.per=suj arrivons/VA enfin/Av=cct .',
  'La/D.def souris/N=suj se/Pr.per cache/VA derrière/P le/D.def placard/N=ccl .',
  'Mon/D.pos ami/N=suj habite/VA une/D.ind grande/A maison/N blanche/A .',
  'Le/D.def vent/N=suj souffle/VA fort/Av=ccm cette/D.dem nuit/N=cct .',
  'Puisque/CS tu/Pr.per=suj es/VE sage/A , tu/Pr.per=suj choisis/VA un/D.ind bonbon/N=cod .',
  'La/D.def lune/N=suj éclaire/VA doucement/Av=ccm la/D.def forêt/N=cod .',
  'Je/Pr.per=suj bois/VA un/D.ind grand/A verre/N=cod de/P lait/N .',
  'Ils/Pr.per=suj jouent/VA avec/P un/D.ind ballon/N jaune/A .',
  'Hé/I ! Tu/Pr.per=suj oublies/VA ton/D.pos cartable/N=cod .',
  'Ma/D.pos tante/N=suj arrive/VA ce/D.dem soir/N=cct avec/P son/D.pos chien/N .',
  'L\'/D.def éléphant/N=suj est/VE un/D.ind animal/N=att énorme/A .',
  'Nous/Pr.per=suj partons/VA maintenant/Av=cct ou/CC nous/Pr.per=suj attendons/VA Léa/NP=cod ?',
  'Lorsque/CS le/D.def chat/N=suj dort/VA , la/D.def souris/N=suj danse/VA .',
  'Je/Pr.per=suj ne/Av=mod trouve/VA pas/Av=mod mes/D.pos lunettes/N=cod .',
  'Il/Pr.per pleut/VA , donc/CC je/Pr.per=suj prends/VA mon/D.pos parapluie/N=cod .',
  'Quand/CS la/D.def nuit/N=suj tombe/VA , les/D.def étoiles/N=suj brillent/VA .',
  'Le/D.def boulanger/N=suj fabrique/VA le/D.def pain/N=cod très/Av=mod tôt/Av=cct .',
  'Ma/D.pos sœur/N=suj chante/VA une/D.ind chanson/N=cod avec/P moi/Pr.per .',
  'Boum/O ! Le/D.def vase/N=suj tombe/VA par/P terre/N=ccl .',
  /* Verbes d'état */
  'Le/D.def chat/N=suj semble/VE fatigué/A .',
  'Ma/D.pos sœur/N=suj devient/VE très/Av=mod grande/A .',
  'Tu/Pr.per=suj parais/VE content/A aujourd\'hui/Av=cct .',
  'Les/D.def fleurs/N=suj restent/VE fraîches/A .',
  'Le/D.def lion/N=suj paraît/VE calme/A dans/P sa/D.pos cage/N=ccl .',
  /* Noms propres */
  'Paris/NP=suj est/VE une/D.ind grande/A ville/N=att .',
  'Marie/NP=suj lit/VA un/D.ind livre/N=cod avec/P Hugo/NP .',
  'Le/D.def chien/N=suj de/P Lucie/NP est/VE noir/A .',
  'La/D.def Loire/NP=suj traverse/VA la/D.def ville/N=cod de/P Tours/NP .',
  /* Onomatopées */
  'Crac/O ! La/D.def branche/N=suj casse/VA .',
  'Miaou/O ! Le/D.def chat/N=suj réclame/VA son/D.pos lait/N=cod .',
  'Tic-tac/O ! L\'/D.def horloge/N=suj sonne/VA midi/N .',
  'Atchoum/O ! Mon/D.pos frère/N=suj est/VE malade/A .',
  'Ouaf/O ! Le/D.def chien/N=suj court/VA vers/P la/D.def porte/N=ccl .',
  'Ding-dong/O ! Mon/D.pos ami/N=suj sonne/VA à/P la/D.def porte/N .',

  /* v9 : phrases pour le jeu 2 (déterminants et pronoms en détail) */
  /* déterminants numéraux */
  'Deux/D.num chats/N jouent/VA dans/P le/D.def jardin/N .',
  'Mon/D.pos frère/N lance/VA trois/D.num ballons/N rouges/A .',
  'J\'/Pr.per achète/VA quatre/D.num pommes/N .',
  'Cinq/D.num canards/N nagent/VA sur/P l\'/D.def étang/N .',
  /* déterminants indéfinis */
  'Chaque/D.idf enfant/N porte/VA un/D.ind cartable/N .',
  'Plusieurs/D.idf oiseaux/N chantent/VA dans/P l\'/D.def arbre/N .',
  'Quelques/D.idf feuilles/N tombent/VA .',
  'Chaque/D.idf matin/N , je/Pr.per bois/VA un/D.ind jus/N d\'/P orange/N .',
  /* déterminants interrogatifs */
  'Quel/D.int jeu/N préfères/VA -tu/Pr.per ?',
  'Quelle/D.int robe/N choisis/VA -tu/Pr.per ?',
  'Quels/D.int amis/N invites/VA -tu/Pr.per ?',
  'Quelle/D.int heure/N est/VE -il/Pr.per ?',
  /* déterminants démonstratifs */
  'Cet/D.dem arbre/N est/VE très/Av vieux/A .',
  'Ces/D.dem fleurs/N sentent/VA bon/Av .',
  /* pronoms possessifs */
  'Ce/D.dem vélo/N est/VE le_mien/Pr.pos .',
  'Mon/D.pos stylo/N est/VE bleu/A , le_tien/Pr.pos est/VE vert/A .',
  'Ces/D.dem billes/N sont/VE les_siennes/Pr.pos .',
  'Ta/D.pos maison/N est/VE belle/A , la_nôtre/Pr.pos est/VE petite/A .',
  /* pronoms démonstratifs */
  'Je/Pr.per prends/VA celui-ci/Pr.dem .',
  'Regarde/VA ces/D.dem chiots/N : celui-là/Pr.dem dort/VA .',
  'Cela/Pr.dem me/Pr.per plaît/VA beaucoup/Av .',
  'Ma/D.pos robe/N est/VE rouge/A , celle/Pr.dem de/P Léa/NP est/VE bleue/A .',
  /* pronoms numéraux */
  'Le_premier/Pr.num arrive/VA , le_second/Pr.num attend/VA .',
  'Deux/Pr.num de/P mes/D.pos amis/N viennent/VA ce/D.dem soir/N .',
  'Le_troisième/Pr.num gagne/VA un/D.ind livre/N .',
  'J\'/Pr.per vois/VA deux/D.num chats/N : les_deux/Pr.num dorment/VA .',
  /* pronoms indéfinis */
  'Chacun/Pr.idf mange/VA sa/D.pos part/N .',
  'Quelqu\'un/Pr.idf frappe/VA à/P la/D.def porte/N .',
  'Personne/Pr.idf ne/Av répond/VA .',
  'Certains/Pr.idf dorment/VA déjà/Av .',
  /* pronoms interrogatifs */
  'Qui/Pr.int frappe/VA à/P la/D.def porte/N ?',
  'Que/Pr.int dis/VA -tu/Pr.per ?',
  'Lequel/Pr.int préfères/VA -tu/Pr.per ?',
  'Laquelle/Pr.int choisis/VA -tu/Pr.per ?',
  /* pronoms relatifs */
  'Le/D.def chat/N qui/Pr.rel dort/VA est/VE noir/A .',
  'Le/D.def livre/N que/Pr.rel je/Pr.per lis/VA est/VE drôle/A .',
  'La/D.def maison/N où/Pr.rel j\'/Pr.per habite/VA est/VE grande/A .',
  'L\'/D.def ami/N dont/Pr.rel je/Pr.per parle/VA arrive/VA .',
  /* v9 : PHRASES PIÈGES — déterminant et pronom de la même sorte dans la même phrase, là où les enfants se trompent */
  /* possessifs : mon chien… le mien */
  'Mon/D.pos chien/N est/VE noir/A , le_tien/Pr.pos est/VE blanc/A .',
  'C\'/Pr.dem est/VE mon/D.pos chien/N , pas/Av le_tien/Pr.pos .',
  'Ta/D.pos trousse/N est/VE rouge/A et/CC la_mienne/Pr.pos est/VE verte/A .',
  'Je/Pr.per prête/VA mes/D.pos crayons/N , Léa/NP garde/VA les_siens/Pr.pos .',
  'Son/D.pos vélo/N roule/VA vite/Av , le_nôtre/Pr.pos roule/VA lentement/Av .',
  /* démonstratifs : ce gâteau… celui-ci */
  'Ce/D.dem gâteau/N est/VE bon/A , mais/CC celui-ci/Pr.dem est/VE meilleur/A .',
  'Cette/D.dem fleur/N est/VE jaune/A , celle-là/Pr.dem est/VE rose/A .',
  'Ces/D.dem livres/N sont/VE à/P moi/Pr.per , ceux-là/Pr.dem sont/VE à/P Paul/NP .',
  'Cet/D.dem oiseau/N chante/VA , celui-là/Pr.dem dort/VA .',
  /* numéraux : deux chats… les deux */
  'Deux/D.num chats/N jouent/VA , les_deux/Pr.num sont/VE gris/A .',
  'Trois/D.num élèves/N chantent/VA , deux/Pr.num dansent/VA .',
  'Quatre/D.num enfants/N courent/VA : le_premier/Pr.num gagne/VA .',
  /* indéfinis : chaque enfant… chacun */
  'Chaque/D.idf enfant/N reçoit/VA un/D.ind livre/N , et/CC chacun/Pr.idf le/Pr.per lit/VA .',
  'Plusieurs/D.idf amis/N viennent/VA , certains/Pr.idf restent/VA longtemps/Av .',
  'Quelques/D.idf pommes/N tombent/VA , plusieurs/Pr.idf sont/VE rouges/A .',
  /* interrogatifs : quel livre… lequel */
  'Quel/D.int livre/N veux/VA -tu/Pr.per ? Lequel/Pr.int ?',
  'Quelle/D.int glace/N prends/VA -tu/Pr.per ? Laquelle/Pr.int préfères/VA -tu/Pr.per ?',
  /* le, la, les : article défini ou pronom personnel */
  'Je/Pr.per prends/VA le/D.def ballon/N et/CC je/Pr.per le/Pr.per lance/VA .',
  'La/D.def chatte/N miaule/VA : je/Pr.per la/Pr.per nourris/VA .',
  'Les/D.def fleurs/N sont/VE belles/A , je/Pr.per les/Pr.per cueille/VA .',
  /* que et qui : relatif, interrogatif ou conjonction */
  'Je/Pr.per sais/VA que/CS tu/Pr.per viens/VA .',
  'Le/D.def gâteau/N que/Pr.rel tu/Pr.per manges/VA est/VE bon/A .',
  'Qui/Pr.int connaît/VA l\'/D.def enfant/N qui/Pr.rel chante/VA ?',
  /* v15 : phrases en plus pour le jeu 3 (COI, COS, CC de cause, adverbes de lieu, pronoms compléments) */
  'Je/Pr.per=suj parle/VA à/P mon/D.pos ami/N=coi .',
  'Le/D.def chien/N=suj obéit/VA à/P son/D.pos maître/N=coi .',
  'Léa/NP=suj pense/VA à/P ses/D.pos vacances/N=coi .',
  'Nous/Pr.per=suj parlons/VA de/P notre/D.pos voyage/N=coi .',
  'Je/Pr.per=suj donne/VA une/D.ind pomme/N=cod à/P ma/D.pos sœur/N=cos .',
  'Mon/D.pos papa/N=suj offre/VA un/D.ind livre/N=cod à/P Joseph/NP=cos .',
  'La/D.def maîtresse/N=suj prête/VA un/D.ind crayon/N=cod à/P Hugo/NP=cos .',
  'Je/Pr.per=suj lui/Pr.per=cos donne/VA un/D.ind bonbon/N=cod .',
  'Je/Pr.per=suj lui/Pr.per=coi parle/VA souvent/Av=cct .',
  'Je/Pr.per=suj le/Pr.per=cod vois/VA dans/P le/D.def jardin/N=ccl .',
  'Ma/D.pos maman/N=suj nous/Pr.per=cod appelle/VA .',
  'Le/D.def bébé/N=suj pleure/VA de/P faim/N=ccc .',
  'Je/Pr.per=suj tremble/VA de/P froid/N=ccc .',
  'Paul/NP=suj rougit/VA de/P honte/N=ccc .',
  'Le/D.def chat/N=suj dort/VA ici/Av=ccl .',
  'Mon/D.pos ami/N=suj habite/VA loin/Av=ccl .',
  'Nous/Pr.per=suj jouons/VA dehors/Av=ccl .',
  'Le/D.def lion/N=suj marche/VA avec/P prudence/N=ccm .',
  /* v18 : phrases en plus pour le jeu 4 (adjectifs et compléments du nom dans le groupe nominal) */
  'La/D.def petite/A maison/N de/P ma/D.pos grand-mère/N est/VE jolie/A .',
  'Le/D.def vélo/N rouge/A de/P Paul/NP roule/VA vite/Av .',
  'Cette/D.dem jolie/A robe/N de/P soie/N brille/VA .',
  'Chaque/D.idf élève/N range/VA son/D.pos cahier/N de/P dessin/N .',
  'Trois/D.num petits/A chats/N noirs/A jouent/VA .',
  'Plusieurs/D.idf enfants/N de/P la/D.def classe/N chantent/VA .',
  'Le/D.def jardin/N de/P Léa/NP est/VE fleuri/A .',
  'Un/D.ind grand/A verre/N de/P lait/N froid/A attend/VA Joseph/NP .',
  'Quelle/D.int belle/A histoire/N racontes/VA -tu/Pr.per ?',
  'Ma/D.pos sœur/N porte/VA une/D.ind longue/A écharpe/N de/P laine/N .',
];

/* Découpe une phrase en mots : { texte, tag } (tag vide pour la ponctuation). */
function parsePhrase(src) {
  return src.split(' ').map((tok) => {
    const i = tok.lastIndexOf('/');
    if (i <= 0) return { texte: tok, tag: '' };
    /* v15 : « mot/N=cod » : la nature (N) puis, après « = », la fonction dans le groupe verbal (jeu 3). */
    const [tag, fn] = tok.slice(i + 1).split('=');
    return { texte: tok.slice(0, i).replace(/_/g, ' '), tag, fn: fn || '' };
  });
}
const PARSED = PHRASES.map(parsePhrase);

/* Écrit la phrase en HTML, avec les espaces à la française (espace insécable avant ! et ?). */
function phraseHtml(mots, cible) {
  /* v18 : la cible peut être un groupe de mots (« ne… pas » clignote en entier) */
  const cibles = Array.isArray(cible) ? cible : [cible];
  let html = '';
  mots.forEach((m, i) => {
    if (i > 0) {
      const prev = mots[i - 1].texte;
      if (m.texte === ',' || m.texte === '.') html += '';
      else if (m.texte === '!' || m.texte === '?') html += '&nbsp;';
      else if (!/'$/.test(prev) && !/^-/.test(m.texte)) html += ' ';
    }
    if (!m.tag) { html += `<span class="pn${m.texte === '(…)' ? ' suite' : ''}">${m.texte}</span>`; return; }
    html += `<span class="w${cibles.includes(i) ? ' target' : ''}${/'$/.test(m.texte) ? ' apos' : ''}" data-i="${i}">${m.texte}</span>`;
  });
  return html;
}
function phraseTexte(mots) {
  return mots.map((m) => m.texte).join(' ').replace(/ ([,.])/g, '$1').replace(/' /g, "'").replace(/ -/g, '-');
}

/* ------------------------------------------------------------
   LES QUATRE PERSONNAGES (dessins originaux, dans l'esprit d'une école de sorciers)
   ------------------------------------------------------------ */
/* Trois sortes de messages par personnage :
   - « messages » : pour tout le monde (joueur sans compte) ;
   - « perso » : avec le prénom de l'enfant ({E}) ;
   - « famille » : avec un adulte de la fiche ({adulte} = « ton papa Marc », {Adulte} = « Ton papa Marc »,
     {fier} = fier / fière selon l'adulte).
   {nature} / {Nature} = « un nom », « une préposition »… */
const CHARACTERS = {
  bonaccord: {
    nom: 'Maître Bonaccord', camp: 'good', voix: 'homme',
    messages: [
      'Bravo ! C\'est bien {nature} !',
      'Magnifique ! Ta baguette grammaticale fait des étincelles !',
      'Exactement ! {Nature}, tu l\'as trouvé !',
      'Quelle mémoire ! Je suis fier de toi.',
      'Parfait ! Tu as trouvé !',
    ],
    perso: [
      '{E}, c\'est parfait, tu as réussi !',
      '{E}, tu es un génie de la grammaire !',
      'Bravo {E} ! C\'est bien {nature} !',
      'Bien joué, {E} ! Tu as trouvé !',
    ],
    famille: [
      'Bravo {E} ! {Adulte} sera {fier} de toi !',
      '{Adulte} sera très {fier} de toi, {E} !',
    ],
  },
  virgule: {
    nom: 'Dame Virgule', camp: 'good', voix: 'femme',
    messages: [
      'Bravo ! C\'est bien {nature} !',
      'Formidable ! Tu deviens un vrai petit sorcier de la grammaire !',
      'Oui ! {Nature} ! Tu as tout compris.',
      'Superbe ! Continue comme ça !',
      'Excellent ! Ce sortilège est réussi !',
    ],
    perso: [
      '{E}, c\'est parfait, tu as réussi !',
      'Formidable, {E} ! C\'est bien {nature} !',
      '{E}, tu es un vrai petit sorcier de la grammaire !',
      'Superbe, {E} ! Continue comme ça !',
    ],
    famille: [
      '{Adulte} sera très {fier} de toi, {E} !',
      'Bravo {E} ! Il faudra raconter ça à {adulte} !',
    ],
  },
  rature: {
    nom: 'Maître Rature', camp: 'bad', voix: 'homme',
    messages: [
      'Hum… Ce n\'est pas ça. Relis bien la phrase et recommence.',
      'Grrr… Raté ! Mais je suis sûr que tu peux trouver.',
      'Pas tout à fait… Allez, encore un petit effort !',
      'Tss tss… Réfléchis encore un peu, tu vas y arriver.',
    ],
    perso: [
      'Hum… Ce n\'est pas ça, {E}. Relis bien la phrase et recommence.',
      'Grrr… Raté, {E} ! Mais je suis sûr que tu peux trouver.',
      'Allez {E}, encore un petit effort !',
    ],
    famille: [
      'Pas tout à fait, {E}… {Adulte} sait que tu peux trouver !',
    ],
  },
  gribouille: {
    nom: 'Dame Gribouille', camp: 'bad', voix: 'femme',
    messages: [
      'Oh là là… Ce n\'est pas la bonne réponse. Recommence !',
      'Perdu ! Mais ne te décourage pas, essaie encore.',
      'Hmm… Regarde bien le mot qui clignote, et réessaie.',
      'Raté ! Courage, la bonne réponse n\'est pas loin.',
    ],
    perso: [
      'Oh là là, {E}… Ce n\'est pas la bonne réponse. Recommence !',
      'Perdu, {E} ! Mais ne te décourage pas, essaie encore.',
      'Courage {E}, la bonne réponse n\'est pas loin !',
    ],
    famille: [
      'Raté, {E}… Mais {adulte} compte sur toi : essaie encore !',
    ],
  },
};

/* Dessins en SVG : un sorcier et une sorcière gentils, un sorcier et une sorcière grincheux. */
function characterSvg(id) {
  const peauClaire = '#f6cfa8', peauPale = '#efe2cf';
  const etoile = (x, y, s, c) => `<path transform="translate(${x} ${y}) scale(${s})" fill="${c}" d="M0-10 2.9-3.1 10-3.1 4.3 1.2 6.5 8.1 0 3.9-6.5 8.1-4.3 1.2-10-3.1-2.9-3.1Z"/>`;
  if (id === 'bonaccord') {
    return `<svg class="character" viewBox="0 0 220 320" xmlns="http://www.w3.org/2000/svg" aria-label="Maître Bonaccord">
      <path d="M60 165 Q40 240 34 318 H186 Q180 240 160 165 Z" fill="#5b3fa0"/>
      <path d="M100 168 L110 318 H120 L114 168Z" fill="#4a3285"/>
      ${etoile(62, 250, .9, '#f2c94c')}${etoile(150, 220, .7, '#f2c94c')}${etoile(140, 290, .8, '#f2c94c')}${etoile(75, 300, .6, '#f2c94c')}
      <path d="M150 190 Q178 205 186 180" stroke="#5b3fa0" stroke-width="20" fill="none" stroke-linecap="round"/>
      <circle cx="188" cy="178" r="10" fill="${peauClaire}"/>
      <line x1="188" y1="176" x2="212" y2="120" stroke="#6b4423" stroke-width="5" stroke-linecap="round"/>
      ${etoile(212, 116, .9, '#ffe066')}<circle cx="212" cy="116" r="14" fill="#ffe066" opacity=".25"/>
      <circle cx="110" cy="128" r="34" fill="${peauClaire}"/>
      <path d="M78 132 Q74 210 110 236 Q146 210 142 132 Q132 160 110 160 Q88 160 78 132Z" fill="#fbfbf7" stroke="#e2e2da" stroke-width="2"/>
      <path d="M92 150 Q110 140 128 150 Q118 158 110 152 Q102 158 92 150Z" fill="#fbfbf7" stroke="#e2e2da" stroke-width="1.5"/>
      <path d="M100 163 Q110 170 120 163" stroke="#b5544a" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="97" cy="126" r="11" fill="none" stroke="#c9a227" stroke-width="3"/><circle cx="123" cy="126" r="11" fill="none" stroke="#c9a227" stroke-width="3"/>
      <line x1="108" y1="126" x2="112" y2="126" stroke="#c9a227" stroke-width="3"/>
      <path d="M92 127 Q97 122 102 127" stroke="#3a2a20" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M118 127 Q123 122 128 127" stroke="#3a2a20" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M88 112 Q96 106 104 110" stroke="#e8e8e0" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M116 110 Q124 106 132 112" stroke="#e8e8e0" stroke-width="4" fill="none" stroke-linecap="round"/>
      <ellipse cx="110" cy="138" rx="5" ry="6" fill="#eab08a"/>
      <circle cx="88" cy="142" r="5" fill="#f4a3a3" opacity=".6"/><circle cx="132" cy="142" r="5" fill="#f4a3a3" opacity=".6"/>
      <ellipse cx="110" cy="100" rx="62" ry="12" fill="#3f2b78"/>
      <path d="M68 98 Q90 60 104 20 Q112 2 140 6 Q122 12 120 34 Q132 70 152 98Z" fill="#5b3fa0"/>
      <path d="M72 92 Q110 82 150 92 L148 99 Q110 89 74 99Z" fill="#f2c94c"/>
      ${etoile(110, 60, .8, '#f2c94c')}${etoile(128, 30, .5, '#f2c94c')}
    </svg>`;
  }
  if (id === 'virgule') {
    return `<svg class="character" viewBox="0 0 220 320" xmlns="http://www.w3.org/2000/svg" aria-label="Dame Virgule">
      <path d="M58 175 Q40 250 30 318 H190 Q180 250 162 175 Z" fill="#1f8a7a"/>
      <path d="M86 175 L110 230 L134 175Z" fill="#f2e6c9"/>
      <path d="M30 318 Q110 300 190 318" stroke="#f2c94c" stroke-width="5" fill="none"/>
      <path d="M150 200 Q180 210 190 184" stroke="#1f8a7a" stroke-width="18" fill="none" stroke-linecap="round"/>
      <circle cx="191" cy="182" r="9" fill="${peauClaire}"/>
      <line x1="191" y1="180" x2="210" y2="128" stroke="#3a2416" stroke-width="5" stroke-linecap="round"/>
      ${etoile(210, 124, .9, '#ffe066')}<circle cx="210" cy="124" r="14" fill="#ffe066" opacity=".25"/>
      <path d="M72 120 Q66 190 84 200 L136 200 Q154 190 148 120Z" fill="#a8502a"/>
      <circle cx="110" cy="132" r="33" fill="${peauClaire}"/>
      <path d="M78 122 Q90 98 112 104 Q132 100 142 124 Q128 112 110 114 Q92 112 78 122Z" fill="#a8502a"/>
      <path d="M95 130 Q100 124 105 130" stroke="#3a2a20" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M115 130 Q120 124 125 130" stroke="#3a2a20" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M93 125 l-3 -3 M127 125 l3 -3" stroke="#3a2a20" stroke-width="2" stroke-linecap="round"/>
      <path d="M100 148 Q110 158 120 148" stroke="#c0392b" stroke-width="3.5" fill="#e8746a" stroke-linecap="round"/>
      <circle cx="90" cy="142" r="6" fill="#f4a3a3" opacity=".7"/><circle cx="130" cy="142" r="6" fill="#f4a3a3" opacity=".7"/>
      <ellipse cx="110" cy="104" rx="64" ry="12" fill="#145c51"/>
      <path d="M70 102 Q92 66 104 28 Q110 10 136 16 Q118 22 120 40 Q130 74 150 102Z" fill="#1f8a7a"/>
      <path d="M74 96 Q110 86 148 96 L147 104 Q110 94 75 104Z" fill="#7b2d5b"/>
      <rect x="102" y="90" width="16" height="13" rx="2" fill="none" stroke="#f2c94c" stroke-width="3"/>
      ${etoile(122, 60, .6, '#f2c94c')}
    </svg>`;
  }
  if (id === 'rature') {
    return `<svg class="character" viewBox="0 0 220 320" xmlns="http://www.w3.org/2000/svg" aria-label="Maître Rature">
      <path d="M62 165 Q44 240 36 318 H184 Q176 240 158 165 Z" fill="#23272d"/>
      <path d="M92 165 L110 200 L128 165Z" fill="#2f6b45"/>
      <path d="M70 200 Q110 230 150 200 Q140 220 110 226 Q80 220 70 200Z" fill="#1a1d22"/>
      <path d="M150 210 Q120 222 100 214" stroke="#23272d" stroke-width="18" fill="none" stroke-linecap="round"/>
      <path d="M70 210 Q100 222 120 214" stroke="#2b3037" stroke-width="18" fill="none" stroke-linecap="round"/>
      <path d="M76 118 Q70 175 80 182 L92 182 L92 130Z M144 118 Q150 175 140 182 L128 182 L128 130Z" fill="#15171a"/>
      <circle cx="110" cy="130" r="32" fill="${peauPale}"/>
      <path d="M78 128 Q80 96 110 96 Q140 96 142 128 Q132 108 110 108 Q88 108 78 128Z" fill="#15171a"/>
      <path d="M92 120 L106 126 M128 120 L114 126" stroke="#15171a" stroke-width="4" stroke-linecap="round"/>
      <circle cx="99" cy="131" r="3.5" fill="#15171a"/><circle cx="121" cy="131" r="3.5" fill="#15171a"/>
      <path d="M110 128 Q118 146 108 150" stroke="#c9b59a" stroke-width="3" fill="#e6d3bb" stroke-linejoin="round"/>
      <path d="M99 160 Q110 153 121 160" stroke="#6b3a34" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="110" cy="100" rx="56" ry="10" fill="#15171a"/>
      <path d="M74 98 Q94 64 106 26 Q112 10 150 30 Q124 28 122 44 Q130 74 146 98Z" fill="#23272d"/>
      <path d="M76 92 Q110 84 144 92 L143 98 Q110 90 77 98Z" fill="#2f6b45"/>
    </svg>`;
  }
  /* gribouille */
  return `<svg class="character" viewBox="0 0 220 320" xmlns="http://www.w3.org/2000/svg" aria-label="Dame Gribouille">
      <path d="M60 172 Q42 248 32 318 H188 Q178 248 160 172 Z" fill="#4a2350"/>
      <path d="M88 172 L110 196 L132 172Z" fill="#2d1430"/>
      <path d="M32 318 Q110 304 188 318" stroke="#7a3f80" stroke-width="5" fill="none"/>
      <path d="M152 200 Q176 196 178 164" stroke="#4a2350" stroke-width="18" fill="none" stroke-linecap="round"/>
      <circle cx="178" cy="160" r="9" fill="${peauPale}"/>
      <line x1="178" y1="152" x2="180" y2="134" stroke="${peauPale}" stroke-width="5" stroke-linecap="round"/>
      <path d="M72 128 Q66 176 82 182 L138 182 Q154 176 148 128Z" fill="#9aa0a6"/>
      <circle cx="110" cy="132" r="32" fill="${peauPale}"/>
      <path d="M78 126 Q86 100 110 102 Q134 100 142 126 Q128 112 110 114 Q92 112 78 126Z" fill="#b3b8bd"/>
      <path d="M92 120 L106 124 M128 120 L114 124" stroke="#5e6266" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="99" cy="131" r="3.5" fill="#2d1430"/><circle cx="121" cy="131" r="3.5" fill="#2d1430"/>
      <path d="M110 130 Q126 148 112 152" stroke="#c9b59a" stroke-width="3" fill="#e6d3bb" stroke-linejoin="round"/>
      <circle cx="120" cy="146" r="2.6" fill="#a08a6a"/>
      <path d="M100 162 Q110 156 120 162" stroke="#6b3a54" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="110" cy="104" rx="60" ry="11" fill="#2d1430"/>
      <path d="M72 102 Q90 70 100 40 Q104 24 96 8 Q120 14 120 40 Q128 76 148 102Z" fill="#4a2350"/>
      <path d="M76 96 Q110 88 146 96 L145 103 Q110 95 77 103Z" fill="#7a3f80"/>
      <circle cx="112" cy="64" r="4" fill="#9b8bb0" opacity=".7"/>
    </svg>`;
}

/* ------------------------------------------------------------
   VOIX DE SYNTHÈSE (5 niveaux de volume, 0 = muet), réglage gardé d'une visite à l'autre
   ------------------------------------------------------------ */
let volumeLevel = 3;
try { const v = localStorage.getItem('mnemogram-volume'); if (v !== null) volumeLevel = Number(v); } catch (e) {}
function refreshVolumeBars() {
  document.querySelectorAll('.volume-bar').forEach((b) => b.classList.toggle('on', Number(b.dataset.level) <= volumeLevel));
}
document.querySelectorAll('.volume-bar').forEach((b) => b.addEventListener('click', () => {
  const lvl = Number(b.dataset.level);
  volumeLevel = (lvl === volumeLevel) ? lvl - 1 : lvl;   /* un clic sur la dernière barre allumée baisse d'un cran (jusqu'à muet) */
  try { localStorage.setItem('mnemogram-volume', String(volumeLevel)); } catch (e) {}
  refreshVolumeBars();
  if (volumeLevel === 0 && 'speechSynthesis' in window) speechSynthesis.cancel();
}));
refreshVolumeBars();

function pickFrenchVoice(prefer) {
  if (!('speechSynthesis' in window)) return null;
  const voices = speechSynthesis.getVoices().filter((v) => /^fr/i.test(v.lang));
  if (!voices.length) return null;
  const fr = voices.filter((v) => /fr[-_]FR/i.test(v.lang));
  const pool = fr.length ? fr : voices;
  const femmes = /(amélie|amelie|audrey|aurélie|aurelie|julie|marie|denise|hortense|virginie|céline|celine|léa|lea|female|femme)/i;
  const hommes = /(thomas|paul|henri|claude|nicolas|mathieu|daniel|male|homme)/i;
  const re = prefer === 'femme' ? femmes : hommes;
  return pool.find((v) => re.test(v.name)) || pool[0];
}
/* ------------------------------------------------------------
   PRONONCIATION (v6) : même principe que Mnemart et son atelier phonétique.
   PRON_COMMUNE : écritures valables pour toutes les voix (« sœur » → « seur », sinon certaines voix disent « sourd »).
   PRON_PAR_VOIX : écritures propres à une voix, repérée par un morceau de son nom ; '' = lire le mot tel quel.
   Point de départ : les réglages de l'atelier de Mnemart pour les mots que MNEMOGRAM utilise. Les exports de
   l'atelier MNEMOGRAM (bouton « Copier pour Claude ») viendront compléter ces deux tables.
   Un nom commun se dit pareil au singulier et au pluriel : régler « sœur » règle aussi « sœurs ».
   ------------------------------------------------------------ */
const PRON_COMMUNE = {
  'sœur': 'seur',
  'soeur': 'seur',
  'poisson': 'Pouasson',
  'paul': 'pol',
};
const PRON_PAR_VOIX = {
  'français france': { 'paul': '' },
  'français canada': { 'paul': '' },
  'hortense': { 'paul': '' },
  'julie': { 'paul': '' },
  'paul': { 'paul': '' },
  'vivienne': { 'poisson': 'Poisson' },
  'rémy': { 'poisson': 'Poisson' },
};
const sansAccents = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[()\-_]+/g, ' ').replace(/\s+/g, ' ').trim();
function pronOverrides(voice) {
  const name = sansAccents(voice?.name);
  if (!name) return null;
  const hit = Object.keys(PRON_PAR_VOIX).find((part) => name.includes(sansAccents(part)));
  return hit ? PRON_PAR_VOIX[hit] : null;
}
const reEsc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function fixPronunciation(text, voice) {
  let out = String(text || '');
  const NB = '(?<![\\p{L}\\p{N}])', NA = '(?![\\p{L}\\p{N}])';
  const vo = pronOverrides(voice) || {};
  const keys = [...new Set([...Object.keys(PRON_COMMUNE), ...Object.keys(vo)])].sort((a, b) => b.length - a.length);   /* expressions avant les mots seuls */
  keys.forEach((k) => {
    const right = Object.prototype.hasOwnProperty.call(vo, k) ? vo[k] : PRON_COMMUNE[k];
    if (right === '' || right === undefined) return;
    const pluriel = /\s/.test(k) ? '' : '(?:s|x)?';
    out = out.replace(new RegExp(`${NB}${reEsc(k)}${pluriel}${NA}`, 'giu'), right);
  });
  return out;
}

/* v5 : voix plus dynamiques. Les sorciers parlent vite et avec entrain (débit 1,25 ; voix un peu plus aiguë
   pour les gentils, un peu plus grave pour les grincheux). La phrase de l'exercice, elle, reste lue à un débit
   normal (1,05), pour que l'enfant ait le temps de suivre les mots. */
const VOICE_STYLES = {
  good: { rate: 1.25, pitch: 1.2 },
  bad: { rate: 1.2, pitch: 0.9 },
  phrase: { rate: 1.05, pitch: 1 },
};
function speak(text, prefer, style = 'good', enchaine = false) {
  if (!volumeLevel || !('speechSynthesis' in window)) return;
  if (!enchaine) speechSynthesis.cancel();   /* enchaine = true : se dit après la phrase en cours, sans la couper */
  const v = pickFrenchVoice(prefer);
  const u = new SpeechSynthesisUtterance(fixPronunciation(text, v).replace(/…/g, ', '));
  u.lang = 'fr-FR';
  if (v) u.voice = v;
  const st = VOICE_STYLES[style] || VOICE_STYLES.good;
  u.volume = volumeLevel / 5;
  u.rate = st.rate;
  u.pitch = st.pitch;
  speechSynthesis.speak(u);
}
if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = () => {};

/* ------------------------------------------------------------
   ÉCRANS
   ------------------------------------------------------------ */
/* v60 : LE PORTAIL DES NIVEAUX. Quatre onglets (CE1 – CE2, CM1 – CM2, 6e – 5e, 4e – 3e) au-dessus des trois parties.
   Selon l'onglet, on montre ou non chaque exercice, on le renumérote, et on adapte certains (titre, consigne, étapes).
   Tous les onglets restent ouverts : un élève de CE1 peut aller jouer en CM ou au collège.
   « avenir » : un exercice prévu, pas encore construit (bouton grisé). */
const CLASSES = [
  { id: 'ce', nom: 'CE1 – CE2', cycle: 'cycle 2' },
  { id: 'cm', nom: 'CM1 – CM2', cycle: 'cycle 3' },
  { id: '65', nom: '6e – 5e', cycle: 'fin du cycle 3, début du cycle 4' },
  { id: '43', nom: '4e – 3e', cycle: 'cycle 4' },
];
const TOUS = ['ce', 'cm', '65', '43'];
const PARTIES_NOM = { mots: 'Les mots', temps: 'Les temps et les modes', phrase: 'La phrase' };
const PARCOURS = {
  mots: [
    { jeu: 'ce-noms', titre: 'Trouver les noms', classes: ['ce'],
      consigne: 'Dans ce petit texte, touche tous les <strong>noms</strong>. Un nom désigne une personne, un animal, une chose ou une idée ; on peut mettre devant lui <em>le, la, un, une</em>. Les prénoms et les noms de villes (<em>Léa, Paris</em>) sont aussi des noms. Chaque nom trouvé vaut 1 point ; si tu touches un mot qui n\'est pas un nom, tu perds un demi-point.' },
    { jeu: 'ce-ncnp', titre: 'Nom commun ou nom propre', classes: ['ce'], tmNiv: 'ce-ncnp', sansMode: true, tmListe: 'ncnp',
      tmQuestion: 'est-ce un <strong>nom commun</strong> ou un <strong>nom propre</strong> ?', tmBilan: 'Un <strong>nom commun</strong> désigne n\'importe quel être ou objet d\'une même sorte (<em>un chat, une ville</em>) : il a un déterminant devant lui. Un <strong>nom propre</strong> désigne un être ou un lieu unique (<em>Moustache, Paris, la Seine</em>) : il commence toujours par une <strong>majuscule</strong>.',
      consigne: 'Des <strong>noms</strong> sont soulignés. Appuie sur chacun et dis si c\'est un <strong>nom commun</strong> (<em>un chat, une ville</em>) ou un <strong>nom propre</strong> (<em>Moustache, Paris</em>), qui commence par une majuscule. Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'ce-dets', titre: 'Trouver les déterminants', classes: ['ce'],
      consigne: 'Dans ce petit texte, touche tous les <strong>déterminants</strong> : ce sont les petits mots placés devant le nom (<em>le, la, les, un, une, des, mon, ta, ses, ce, cette, ces…</em>). Chaque déterminant trouvé vaut 1 point ; si tu touches un autre mot, tu perds un demi-point.' },
    { jeu: 'ce-det3', titre: 'Les sortes de déterminants', classes: ['ce'], tmNiv: 'ce-det3', sansMode: true, tmListe: 'det3',
      tmQuestion: 'quelle sorte de <strong>déterminant</strong> ?', tmBilan: 'Les <strong>articles</strong> : <em>le, la, l\', les</em> (articles définis), <em>un, une, des</em> (articles indéfinis). Les <strong>déterminants possessifs</strong> disent à qui est la chose : <em>mon, ton, son, ma, ta, sa, mes, tes, ses, notre, votre, leur, nos, vos, leurs</em>. Les <strong>déterminants démonstratifs</strong> montrent la chose : <em>ce, cet, cette, ces</em>.',
      consigne: 'Des <strong>déterminants</strong> sont soulignés. Pour chacun, dis si c\'est un <strong>article</strong> (<em>le, la, les, un, une, des</em>), un <strong>déterminant possessif</strong> (<em>mon, ta, ses, leur…</em> : à qui est-ce ?) ou un <strong>déterminant démonstratif</strong> (<em>ce, cette, ces</em> : on montre). Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'ce-adjs', titre: 'Trouver les adjectifs', classes: ['ce'],
      consigne: 'Dans ce petit texte, touche tous les <strong>adjectifs</strong> : ce sont les mots qui disent <strong>comment est</strong> le nom (<em>un chat <strong>noir</strong>, une <strong>grande</strong> maison, le ciel est <strong>bleu</strong></em>). Chaque adjectif trouvé vaut 1 point ; si tu touches un autre mot, tu perds un demi-point.' },
    { jeu: 'ce-genre', titre: 'Le genre et le nombre des noms', classes: ['ce'], tmNiv: 'ce-genre', sansMode: true, tmListe: 'genre',
      tmQuestion: 'quel est son <strong>genre</strong> et son <strong>nombre</strong> ?', tmBilan: 'Le <strong>genre</strong> : un nom est <strong>masculin</strong> si l\'on peut dire <em>un</em> ou <em>le</em> devant lui, <strong>féminin</strong> si l\'on dit <em>une</em> ou <em>la</em>. Le <strong>nombre</strong> : il est <strong>singulier</strong> s\'il y en a un seul, <strong>pluriel</strong> s\'il y en a plusieurs (<em>les, des, mes</em>…) ; au pluriel, il prend souvent un <strong>s</strong> ou un <strong>x</strong>.',
      consigne: 'Des <strong>noms</strong> sont soulignés. Pour chacun, dis s\'il est <strong>masculin</strong> ou <strong>féminin</strong>, <strong>singulier</strong> ou <strong>pluriel</strong>. Aide-toi du déterminant : <em>un, le</em> (masculin), <em>une, la</em> (féminin), <em>les, des</em> (pluriel). Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'ce-accord', titre: 'Accorder dans le groupe nominal', classes: ['ce'] },
    { jeu: 'ce-prons', titre: 'Les pronoms personnels sujets', classes: ['ce'],
      consigne: 'Dans ce petit texte, touche tous les <strong>pronoms personnels sujets</strong> : <em>je, tu, il, elle, on, nous, vous, ils, elles</em>. Ils remplacent le nom de celui qui fait l\'action. Attention : un pronom qui n\'est pas sujet (<em>il <strong>me</strong> regarde, je <strong>le</strong> vois</em>) ne compte pas. Chaque pronom trouvé vaut 1 point ; si tu touches un autre mot, tu perds un demi-point.' },
    { jeu: 'ce-sujets', titre: 'Trouver le sujet du verbe', classes: ['ce'],
      consigne: 'Dans ce petit texte, touche le <strong>sujet</strong> de chaque verbe. Pour le trouver, pose la question « <strong>Qui est-ce qui</strong>… ? » devant le verbe (<em>Qui est-ce qui dort ? Le chat</em>). Le sujet peut être un nom, un groupe de mots ou un pronom, et parfois il est placé <strong>après</strong> le verbe. Chaque sujet trouvé vaut 1 point ; si tu touches un autre mot, tu perds un demi-point.' },
    { jeu: 'ce-nat5', titre: 'Nom commun, nom propre, déterminant, adjectif, verbe ou pronom ?', classes: ['ce'], tmNiv: 'ce-nat5', sansMode: true, tmListe: 'nat5',
      tmQuestion: 'quelle est sa <strong>nature</strong> ?', tmBilan: 'Le <strong>nom commun</strong> désigne une personne, un animal, une chose (<em>un chat, une maison</em>) ; le <strong>nom propre</strong> désigne une personne ou un lieu unique et commence par une majuscule (<em>Léo, Paris</em>) ; le <strong>déterminant</strong> est le petit mot devant le nom (<em>le, une, mon, ce</em>) ; l\'<strong>adjectif</strong> dit comment est le nom ; le <strong>verbe</strong> dit ce qu\'on fait ou ce qui se passe, et il change avec le moment ; le <strong>pronom</strong> remplace un nom (<em>il, elle, nous, le, les</em>).',
      consigne: 'Des mots sont soulignés. Pour chacun, dis quelle est sa <strong>nature</strong> : <strong>nom commun</strong>, <strong>nom propre</strong>, <strong>déterminant</strong>, <strong>adjectif</strong>, <strong>verbe</strong> ou <strong>pronom</strong>. Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'ce-bilannat', titre: 'Reconnaître la nature des mots', classes: ['ce'], bilan: true, tmNiv: 'ce-bilannat', sansMode: true, tmListe: 'nat5',
      tmQuestion: 'quelle est sa <strong>nature</strong> ?', tmBilan: 'Tu as reconnu les grandes natures de mots. Le <strong>nom commun</strong> désigne une personne, un animal, une chose ; le <strong>nom propre</strong> désigne un être ou un lieu unique, avec une majuscule ; le <strong>déterminant</strong> l\'annonce (<em>le, une, mon, ce</em>) ; l\'<strong>adjectif</strong> dit comment il est ; le <strong>verbe</strong> dit l\'action et change avec le moment ; le <strong>pronom</strong> remplace un nom.',
      consigne: '<strong>Bilan</strong> : tout ce que tu as appris sur les mots. Des mots sont soulignés : pour chacun, dis s\'il est <strong>nom commun</strong>, <strong>nom propre</strong>, <strong>déterminant</strong>, <strong>adjectif</strong>, <strong>verbe</strong> ou <strong>pronom</strong>. Douze textes, du plus court au plus long. Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'ce-bilanacc', titre: 'Accorder le groupe nominal et le verbe', classes: ['ce'], bilan: true },
    { jeu: 'cm-nat', titre: 'Les natures des mots variables', classes: ['cm'], tmNiv: 'cm-nat', sansMode: true, tmListe: 'nat5',
      tmQuestion: 'quelle est sa <strong>nature</strong> ?', tmBilan: 'Les mots <strong>variables</strong> changent de forme selon le genre, le nombre ou la personne : le <strong>nom commun</strong> et le <strong>nom propre</strong> (qui commence par une majuscule), le <strong>déterminant</strong>, l\'<strong>adjectif</strong>, le <strong>pronom</strong> et le <strong>verbe</strong>.',
      consigne: 'Des mots sont soulignés. Pour chacun, dis quelle est sa <strong>nature</strong> : nom commun, nom propre, déterminant, adjectif, pronom ou verbe. On travaille phrase par phrase : lis toute la phrase avant de choisir. Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'cm-inv', titre: 'Les mots invariables', classes: ['cm'], tmNiv: 'cm-inv', sansMode: true, tmListe: 'inv',
      tmQuestion: 'quelle est sa <strong>nature</strong> ?', tmBilan: 'Les mots <strong>invariables</strong> ne changent jamais de forme. L\'<strong>adverbe</strong> précise un verbe, un adjectif ou un autre adverbe (<em>lentement, très, hier, soudain</em>). La <strong>préposition</strong> introduit un complément (<em>à, de, dans, sur, pour, avec, pendant</em>). La <strong>conjonction de coordination</strong> relie deux mots ou deux groupes de même fonction : <em>mais, ou, et, donc, or, ni, car</em>.',
      consigne: 'Des mots <strong>invariables</strong> sont soulignés. Pour chacun, dis si c\'est un <strong>adverbe</strong>, une <strong>préposition</strong> ou une <strong>conjonction de coordination</strong> (<em>mais, ou, et, donc, or, ni, car</em>). Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'cm-detpron', titre: 'Déterminant ou pronom ?', classes: ['cm'], tmNiv: 'cm-detpron', sansMode: true, tmListe: 'detpron',
      tmQuestion: 'déterminant ou pronom ? et de quelle sorte ?', tmBilan: 'Le <strong>déterminant</strong> se place <strong>devant un nom</strong> (<em>mon vélo, ce casque</em>). Le <strong>pronom</strong> <strong>remplace</strong> un nom ou un groupe nominal (<em>le mien, celui-ci, il, les</em>). Possessif : à qui est-ce ? (<em>mon / le mien</em>). Démonstratif : on montre (<em>ce / celui-ci</em>). Pronom personnel : <em>je, tu, il, nous, le, la, les, lui…</em>',
      consigne: 'Des mots sont soulignés. Pour chacun, dis si c\'est un <strong>déterminant</strong> (il est devant un nom) ou un <strong>pronom</strong> (il remplace un nom), et de quelle sorte : <em>mon vélo</em> (déterminant possessif) / <em>le mien</em> (pronom possessif). Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'cm-sujet', titre: 'Trouver le sujet du verbe', classes: ['cm'],
      consigne: 'Touche le <strong>sujet</strong> de chaque verbe conjugué. Attention : il peut être loin du verbe, placé <strong>après</strong> lui (<em>Dans la ruche règne une reine</em>), ou fait de plusieurs noms (<em>Mon frère et moi</em>). Pose la question « Qui est-ce qui… ? » ou encadre avec « C\'est… qui ». Chaque sujet trouvé vaut 1 point ; si tu touches un autre mot, tu perds un demi-point.' },
    { jeu: 'cm-cvcp', titre: 'Complément du verbe ou complément de phrase ?', classes: ['cm'], tmNiv: 'cm-cvcp', sansMode: true, tmListe: 'cvcp',
      tmQuestion: 'complément du verbe ou complément de phrase ?', tmBilan: 'Le <strong>complément du verbe</strong> complète le verbe : on ne peut ni le déplacer ni, souvent, le supprimer (<em>il arrose <strong>les fleurs</strong></em> ; <em>elle écrit <strong>à son amie</strong></em>). Le <strong>complément de phrase</strong> dit où, quand, comment : on peut le <strong>déplacer</strong> et le <strong>supprimer</strong> (<em><strong>Chaque matin</strong>, il arrose les fleurs</em>).',
      consigne: 'Des groupes de mots sont soulignés. Pour chacun, dis si c\'est un <strong>complément du verbe</strong> (on ne peut pas le déplacer) ou un <strong>complément de phrase</strong> (on peut le déplacer ou le supprimer). Essaie de le déplacer dans ta tête, en gardant le sens de la phrase. Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'cm-attcv', titre: 'Attribut du sujet ou complément du verbe ?', classes: ['cm'], tmNiv: 'cm-attcv', sansMode: true, tmListe: 'attcv',
      tmQuestion: 'attribut du sujet ou complément du verbe ?', tmBilan: 'Dans une phrase de <strong>description</strong>, le verbe d\'état (<em>être, paraître, sembler, devenir, rester, demeurer</em>) relie le sujet à son <strong>attribut</strong> : l\'attribut dit comment est le sujet, et il s\'accorde avec lui (<em>la vue est <strong>magnifique</strong></em>). Dans une phrase de <strong>récit</strong>, le verbe d\'action a un <strong>complément du verbe</strong> : la personne ou la chose sur qui porte l\'action (<em>il ferme <strong>les grilles</strong></em>).',
      consigne: 'Des groupes de mots sont soulignés. Pour chacun, regarde d\'abord le verbe : est-ce un verbe d\'état (<em>être, sembler, devenir…</em>) ou un verbe d\'action ? Puis dis si le groupe est <strong>attribut du sujet</strong> ou <strong>complément du verbe</strong>. Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'cm-epcn', titre: 'Épithète ou complément du nom ?', classes: ['cm'], tmNiv: 'cm-epcn', sansMode: true, tmListe: 'epcn',
      tmQuestion: 'épithète ou complément du nom ?', tmBilan: 'Dans le groupe nominal, le nom peut être complété par un <strong>adjectif épithète</strong>, collé au nom, avant ou après lui (<em>une <strong>petite</strong> maison, des volets <strong>bleus</strong></em>), ou par un <strong>complément du nom</strong>, un groupe introduit le plus souvent par une préposition (<em>une maison <strong>de pierre</strong>, un gâteau <strong>au chocolat</strong></em>).',
      consigne: 'Dans les groupes nominaux, des mots ou des groupes sont soulignés. Pour chacun, dis si c\'est un <strong>adjectif épithète</strong> ou un <strong>complément du nom</strong>. Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'cm-accgn', titre: 'Accorder dans le groupe nominal', classes: ['cm'] },
    { jeu: 'cm-accsv', titre: 'Accorder le verbe avec son sujet', classes: ['cm'] },
    { jeu: 'cm-accatt', titre: 'Accorder l\'attribut et le participe passé', classes: ['cm'] },
    { jeu: 'cm-bilannf', titre: 'Nature et fonction des mots', classes: ['cm'], bilan: true, tmNiv: 'cm-bilannf', tmListe: 'natf', tmListe2: 'fn6',
      tmQuestion: 'quelle est sa <strong>nature</strong> ?', tmQuestion2: 'Quelle est sa <strong>fonction</strong> ?', tmBilan: 'La <strong>nature</strong> d\'un mot (étiquette verte) ne change pas : c\'est ce qu\'il est, comme dans le dictionnaire. Sa <strong>fonction</strong> (étiquette rouge) dépend de la phrase : c\'est le rôle qu\'il y joue. Le même nom peut être sujet, complément du verbe, complément de phrase ou complément du nom.',
      consigne: '<strong>Bilan</strong> : tout ce que tu as appris sur les mots. Des mots sont soulignés. Pour chacun, donne sa <strong>nature</strong> (étiquette verte : ce qu\'il est) puis sa <strong>fonction</strong> (étiquette rouge : le rôle qu\'il joue dans la phrase). 0,5 point pour la nature, 0,5 pour la fonction, si elles sont justes du premier coup.' },
    { jeu: 'cm-bilanacc', titre: 'Tous les accords', classes: ['cm'], bilan: true },
    { jeu: 'natures', titre: 'Reconnaissance des natures de mots, niveau 1', classes: ['65', '43'] },
    { jeu: 'natures2', titre: 'Reconnaissance des natures de mots, niveau 2', classes: ['65', '43'] },
    { jeu: 'fonctions', titre: 'Reconnaissance des natures et fonctions des mots dans le groupe verbal', classes: ['65', '43'] },
    { jeu: 'gn', titre: 'Reconnaissance des natures et fonctions des mots dans le groupe nominal', classes: ['65', '43'] },
    { jeu: 'tableau', titre: 'Le tableau des 20 cases avec guide', classes: ['65', '43'], bilan: true },
    { jeu: 'libre', titre: 'Le tableau des 20 cases sans guide', classes: ['65', '43'], bilan: true },
  ],
  temps: [
    { jeu: 'ce-verbe', titre: 'Trouver le verbe conjugué', classes: ['ce'],
      consigne: 'Dans ce petit texte, touche tous les <strong>verbes conjugués</strong>. Pour les reconnaître, change le moment de la phrase : le mot qui change, c\'est le verbe (<em>il court → hier il courait</em>). Chaque verbe trouvé vaut 1 point ; si tu touches un mot qui n\'est pas un verbe conjugué, tu perds un demi-point.' },
    { jeu: 'ce-inf', titre: 'Trouver l\'infinitif du verbe', classes: ['ce'] },
    { jeu: 'ce-quand', titre: 'Passé, présent ou futur : quand se passe l\'action ?', classes: ['ce'], tmNiv: 'ce-quand', sansMode: true, tmListe: 'quand',
      tmQuestion: 'quand se passe l\'action ?', tmBilan: 'Pour savoir <strong>quand se passe l\'action</strong>, on regarde les petits mots qui donnent le moment (<em>hier, aujourd\'hui, demain, autrefois, bientôt</em>) et la forme du verbe : <strong>passé</strong> (<em>il a fait, il faisait</em>), <strong>présent</strong> (<em>il fait</em>), <strong>futur</strong> (<em>il fera</em>).',
      consigne: 'Dans ce petit texte, des <strong>verbes</strong> sont soulignés. Pour chacun, dis <strong>quand se passe l\'action</strong> : dans le <strong>passé</strong>, au <strong>présent</strong> (maintenant) ou dans le <strong>futur</strong>. Aide-toi des mots <em>hier, aujourd\'hui, demain</em>. Chaque verbe vaut 1 point.' },
    { jeu: 'ce-pres', titre: 'Le présent', classes: ['ce'] },
    { jeu: 'ce-fut', titre: 'Le futur', classes: ['ce'] },
    { jeu: 'ce-imp', titre: 'L\'imparfait', classes: ['ce'] },
    { jeu: 'ce-pca', titre: 'Le passé composé avec avoir', classes: ['ce'] },
    { jeu: 'ce-pce', titre: 'Le passé composé avec être', classes: ['ce'] },
    { jeu: 'ce-etav', titre: 'Les verbes être et avoir', classes: ['ce'] },
    { jeu: 'ce-groupes', titre: 'Les trois groupes de verbes', classes: ['ce'], tmNiv: 'ce-groupes', sansMode: true, tmListe: 'groupes',
      tmQuestion: 'à quel <strong>groupe</strong> appartient ce verbe ?', tmBilan: 'Le <strong>1er groupe</strong> : les verbes en <em>-er</em> (<em>chanter, aboyer</em>), sauf <em>aller</em>. Le <strong>2e groupe</strong> : les verbes en <em>-ir</em> qui font <em>-issons</em> avec « nous » (<em>finir → nous finissons</em>). Le <strong>3e groupe</strong> : tous les autres (<em>aller, prendre, voir, partir → nous partons, courir</em>…).',
      consigne: 'Des <strong>verbes</strong> sont soulignés. Pour chacun, cherche son infinitif dans ta tête, puis dis à quel <strong>groupe</strong> il appartient : <strong>1er groupe</strong> (verbes en -er), <strong>2e groupe</strong> (verbes en -ir, qui font -issons avec « nous »), <strong>3e groupe</strong> (tous les autres, et <em>aller</em>). Chaque verbe vaut 1 point.' },
    { jeu: 'temps1', titre: 'Reconnaître le présent, l\'imparfait, le futur et le passé composé dans un texte', classes: ['ce'], bilan: true,
      tmNiv: 'ce', sansMode: true, tmChoix: { tps: ['TPS.pres', 'TPS.imp', 'TPS.fut', 'TPS.pc'] },
      consigne: 'Voici une petite histoire qui se passe <strong>aujourd\'hui</strong>. Les <strong>verbes conjugués</strong> sont soulignés. Appuie sur chacun, dans l\'ordre que tu veux, et dis à quel <strong>temps</strong> il est : <strong>présent</strong>, <strong>imparfait</strong>, <strong>futur</strong> ou <strong>passé composé</strong>. Chaque verbe vaut 1 point, si tu trouves du premier coup.' },
    { jeu: 'ce-bontemps', titre: 'Écrire les verbes au bon temps dans un texte', classes: ['ce'], bilan: true },
    { jeu: 'cm-pres', titre: 'Le présent des verbes irréguliers', classes: ['cm'] },
    { jeu: 'cm-fut', titre: 'Le futur', classes: ['cm'] },
    { jeu: 'cm-imp', titre: 'L\'imparfait', classes: ['cm'] },
    { jeu: 'cm-ps', titre: 'Le passé simple', classes: ['cm'] },
    { jeu: 'cm-imps', titre: 'Imparfait ou passé simple ?', classes: ['cm'], tmNiv: 'cm-imps', sansMode: true, tmListe: 'imps',
      tmQuestion: 'imparfait ou passé simple ?', tmBilan: 'Dans un récit au passé, l\'<strong>imparfait</strong> peint le <strong>décor</strong> : ce qui dure, ce qu\'on décrit, les habitudes (<em>il faisait sombre</em>). Le <strong>passé simple</strong> raconte les <strong>actions</strong> qui font avancer l\'histoire, l\'une après l\'autre (<em>soudain, il entendit un cri</em>).',
      consigne: 'Voici un récit au passé. Des verbes sont soulignés : pour chacun, dis s\'il est à l\'<strong>imparfait</strong> ou au <strong>passé simple</strong>. Demande-toi aussi pourquoi : décor ou action ? Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'cm-pc', titre: 'Le passé composé', classes: ['cm'] },
    { jeu: 'cm-pqp', titre: 'Le plus-que-parfait', classes: ['cm'] },
    { jeu: 'cm-cond', titre: 'Le conditionnel présent', classes: ['cm'] },
    { jeu: 'cm-imper', titre: 'L\'impératif présent', classes: ['cm'] },
    { jeu: 'cm-recit', titre: 'Les temps du récit au passé', classes: ['cm'], tmNiv: 'cm-recit', sansMode: true, tmListe: 'recit3',
      tmQuestion: 'quel est son <strong>temps</strong> ?', tmBilan: 'Un récit au passé utilise trois temps. Le <strong>passé simple</strong> pour les actions principales, le <strong>premier plan</strong>. L\'<strong>imparfait</strong> pour le décor et les descriptions, l\'<strong>arrière-plan</strong>. Le <strong>plus-que-parfait</strong> pour ce qui s\'était passé <strong>avant</strong> : c\'est le passé du passé (<em>il avait reçu un cerf-volant</em>).',
      consigne: 'Voici un récit au passé. Des verbes sont soulignés : pour chacun, dis s\'il est à l\'<strong>imparfait</strong>, au <strong>passé simple</strong> ou au <strong>plus-que-parfait</strong>. Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'temps1', titre: 'Reconnaître les temps et les modes', classes: ['cm'], bilan: true,
      tmNiv: 'cm', tmChoix: { tps: ['TPS.pres', 'TPS.imp', 'TPS.ps', 'TPS.fut', 'TPS.pc', 'TPS.pqp'], mode: ['MODE.ind', 'MODE.cond', 'MODE.imp'] },
      consigne: '<strong>Bilan</strong> : tout ce que tu as appris sur les temps et les modes. Voici un texte au <strong>système du présent</strong> : l\'action se passe au moment où on le lit. Les <strong>verbes conjugués</strong> sont soulignés. Appuie sur chacun, dans l\'ordre que tu veux, et donne son <strong>temps</strong> (étiquette verte) puis son <strong>mode</strong> (étiquette rouge) : <strong>indicatif</strong>, <strong>conditionnel</strong> ou <strong>impératif</strong>. Chaque verbe vaut 1 point : 0,5 pour le temps, 0,5 pour le mode, s\'ils sont justes du premier coup.' },
    { jeu: 'cm-bontemps', titre: 'Écrire un récit au passé', classes: ['cm'], bilan: true },
    { jeu: 'temps1', titre: 'Reconnaissance des temps et des modes dans un texte au système du présent', classes: ['65', '43'], tmNiv: 'col',
      consigne: 'Voici un texte au <strong>système du présent</strong> : l\'action se passe au moment où on le lit. Des <strong>formes verbales</strong> y sont soulignées, à tous les modes, personnels ou non. Appuie sur chacune, dans l\'ordre que tu veux, et donne son <strong>temps</strong> (étiquette verte) puis son <strong>mode</strong> (étiquette rouge). Chaque forme vaut 1 point : 0,5 pour le temps, 0,5 pour le mode, s\'ils sont justes du premier coup.' },
    { jeu: 'temps2', titre: 'Reconnaissance des temps et des modes dans un texte au système du passé (français classique, puis contemporain)', classes: ['43'] },
    { jeu: 'temps3', titre: 'Analyse des temps et des modes personnels dans un texte au système du présent', classes: ['65', '43'] },
    { jeu: 'temps4', titre: 'Analyse des temps et des modes personnels dans un texte au système du passé', classes: ['43'] },
    { jeu: 'temps5', titre: 'Transformer un texte au système du passé en texte au système du présent', classes: ['65', '43'] },
    { jeu: 'temps6', titre: 'Transformer un texte au système du présent en texte au système du passé', classes: ['43'] },
  ],
  phrase: [
    { jeu: 'ce-phr', titre: 'Phrase ou pas phrase ?', classes: ['ce'], tmNiv: 'ce-phr', sansMode: true, tmListe: 'phr',
      tmQuestion: 'est-ce une <strong>phrase</strong> ?', tmBilan: 'Une <strong>phrase</strong> est une suite de mots <strong>rangés dans le bon ordre</strong>, qui a du <strong>sens</strong>. À l\'écrit, elle commence par une <strong>majuscule</strong> et se termine par un <strong>point</strong> ( . ? ! ). Des mots mélangés, ou sans majuscule ni point, ne font pas une phrase.',
      consigne: 'Des groupes de mots sont soulignés. Pour chacun, dis si c\'est <strong>une phrase</strong> ou <strong>pas une phrase</strong>. Une phrase a du sens : ses mots sont dans le bon ordre. À l\'écrit, elle commence par une <strong>majuscule</strong> et finit par un <strong>point</strong>. Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'ce-ponct', titre: 'La ponctuation de fin de phrase', classes: ['ce'], tmNiv: 'ce-ponct', sansMode: true, tmListe: 'ponct',
      tmQuestion: 'quel <strong>point</strong> faut-il à la fin ?', tmBilan: 'Le <strong>point</strong> ( . ) termine une phrase qui raconte ou qui explique. Le <strong>point d\'interrogation</strong> ( ? ) termine une <strong>question</strong>. Le <strong>point d\'exclamation</strong> ( ! ) termine une phrase qui montre une <strong>émotion</strong> : la surprise, la joie, la colère (<em>Comme il est grand ! Quel beau chat !</em>).',
      consigne: 'Dans ce texte, on a oublié les points à la fin des phrases ! Appuie sur chaque phrase soulignée et choisis le bon signe : le <strong>point</strong> ( . ), le <strong>point d\'interrogation</strong> ( ? ) ou le <strong>point d\'exclamation</strong> ( ! ). Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'ce-types', titre: 'Les trois types de phrases', classes: ['ce'], tmNiv: 'ce-types', sansMode: true, tmListe: 'types',
      tmQuestion: 'quel est son <strong>type</strong> ?', tmBilan: 'Il y a <strong>trois types</strong> de phrases. La phrase <strong>déclarative</strong> donne une information ; elle finit par un point. La phrase <strong>interrogative</strong> pose une question ; elle finit par un point d\'interrogation. La phrase <strong>impérative</strong> donne un ordre ou un conseil ; elle n\'a pas de sujet (<em>Ferme la porte.</em>).',
      consigne: 'Des phrases sont soulignées. Pour chacune, dis son <strong>type</strong> : <strong>déclarative</strong> (on donne une information), <strong>interrogative</strong> (on pose une question) ou <strong>impérative</strong> (on donne un ordre ou un conseil). Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'ce-int', titre: 'Transformer en phrase interrogative', classes: ['ce'] },
    { jeu: 'ce-imper', titre: 'Transformer en phrase impérative', classes: ['ce'] },
    { jeu: 'ce-formes', titre: 'Forme affirmative ou forme négative', classes: ['ce'], tmNiv: 'ce-formes', sansMode: true, tmListe: 'formes2',
      tmQuestion: 'quelle est sa <strong>forme</strong> ?', tmBilan: 'Une phrase à la <strong>forme négative</strong> dit le contraire d\'une phrase à la <strong>forme affirmative</strong>. La négation a <strong>deux mots</strong> qui entourent le verbe : <em>ne… pas</em>, <em>ne… plus</em>, <em>ne… jamais</em>, <em>ne… rien</em>, <em>personne ne…</em> Devant une voyelle, <em>ne</em> devient <em>n\'</em> (<em>il n\'a pas peur</em>).',
      consigne: 'Des phrases sont soulignées. Pour chacune, dis si elle est à la <strong>forme affirmative</strong> ou à la <strong>forme négative</strong>. Cherche les deux mots de la négation autour du verbe : <em>ne… pas</em>, <em>ne… plus</em>, <em>ne… jamais</em>, <em>ne… rien</em>. Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'ce-neg', titre: 'Transformer à la forme négative', classes: ['ce'] },
    { jeu: 'ce-paroles', titre: 'Les paroles des personnages', classes: ['ce'],
      consigne: 'Dans une histoire, les personnages parlent. On écrit leurs paroles <strong>entre guillemets</strong> « … » : c\'est le <strong>discours direct</strong>. Touche toutes les <strong>paroles des personnages</strong>. Chaque parole trouvée vaut 1 point ; si tu touches un mot du récit, tu perds un demi-point.' },
    { jeu: 'ce-svc', titre: 'Sujet, verbe, complément', classes: ['ce'], tmNiv: 'ce-svc', sansMode: true, tmListe: 'svc',
      tmQuestion: 'est-ce le <strong>sujet</strong>, le <strong>verbe</strong> ou un <strong>complément</strong> ?', tmBilan: 'Dans une phrase, le <strong>verbe</strong> dit l\'action ; il change avec le moment. Le <strong>sujet</strong> dit <strong>qui</strong> fait l\'action : on le trouve avec « <em>Qui est-ce qui… ?</em> ». Le <strong>complément</strong> complète le verbe : <em>le chat attrape <strong>une souris</strong></em>.',
      consigne: 'Des groupes de mots sont soulignés. Pour chacun, dis si c\'est le <strong>sujet</strong>, le <strong>verbe</strong> ou un <strong>complément</strong>. Commence par trouver le verbe, puis demande « Qui est-ce qui… ? » pour trouver le sujet. Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'ce-ccp', titre: 'Les compléments de phrase', classes: ['ce'],
      consigne: 'Touche tous les <strong>compléments de phrase</strong> : ils disent <strong>où</strong>, <strong>quand</strong> ou <strong>comment</strong> se passe l\'action. On peut les <strong>déplacer</strong> ou les <strong>supprimer</strong> : la phrase garde son sens (<em>Ce matin, je me lève → Je me lève ce matin → Je me lève</em>). Chaque complément trouvé vaut 1 point ; si tu touches un autre mot, tu perds un demi-point.' },
    { jeu: 'formes', titre: 'Reconnaître le type et la forme des phrases', classes: ['ce'], tfNiv: 'ce', bilan: true,
      consigne: '<strong>Bilan</strong> : tout ce que tu as appris sur la phrase. Douze textes, du plus court au plus long. Sous chaque phrase du texte, deux bandes vierges sont déjà tracées. En <strong>bleu</strong>, le <strong>type</strong> de la phrase : pourquoi parle-t-on ? Pour informer (<strong>déclarative</strong>), pour poser une question (<strong>interrogative</strong>), pour donner un ordre (<strong>impérative</strong>). En <strong>vert</strong>, sa <strong>forme</strong> : <strong>affirmative</strong> ou <strong>négative</strong> (ne… pas), et <strong>exclamative</strong> si elle exprime un sentiment (!). Touche une bande, puis choisis à droite. Chaque bande juste vaut 1 point.' },
    { jeu: 'ce-transfo', titre: 'Transformer les phrases', classes: ['ce'], bilan: true },
    { jeu: 'cm-phnv', titre: 'Phrase verbale ou phrase nominale ?', classes: ['cm'], tmNiv: 'cm-phnv', sansMode: true, tmListe: 'phnv',
      tmQuestion: 'phrase verbale ou phrase nominale ?', tmBilan: 'Une <strong>phrase verbale</strong> est construite autour d\'un <strong>verbe conjugué</strong> (<em>Les élèves arrivent dans la cour.</em>). Une <strong>phrase nominale</strong> n\'a pas de verbe conjugué : elle est construite autour d\'un nom (<em>Rentrée des classes.</em>). On la trouve dans les titres, les journaux de bord, les exclamations (<em>Quel bruit !</em>).',
      consigne: 'Des phrases sont soulignées. Pour chacune, cherche s\'il y a un <strong>verbe conjugué</strong> : si oui, c\'est une <strong>phrase verbale</strong> ; sinon, c\'est une <strong>phrase nominale</strong>. Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'cm-types', titre: 'Les trois types de phrases', classes: ['cm'], tmNiv: 'cm-types', sansMode: true, tmListe: 'types',
      tmQuestion: 'quel est son <strong>type</strong> ?', tmBilan: 'Il y a <strong>trois types</strong> de phrases : <strong>déclarative</strong> (on informe), <strong>interrogative</strong> (on questionne), <strong>impérative</strong> (on ordonne, on conseille). L\'exclamation n\'est pas un type, c\'est une <strong>forme</strong> (autrefois : le type exclamatif) : <em>Comme il est mignon !</em> est une phrase <strong>déclarative</strong> à la forme exclamative ; <em>Regarde le lionceau !</em> est une phrase <strong>impérative</strong>.',
      consigne: 'Des phrases sont soulignées. Pour chacune, dis son <strong>type</strong> : <strong>déclarative</strong>, <strong>interrogative</strong> ou <strong>impérative</strong>. Attention : un point d\'exclamation ne suffit pas à donner le type. <em>Comme il est mignon !</em> informe : elle est déclarative. Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'cm-formes4', titre: 'Les formes de phrases', classes: ['cm'], tmNiv: 'cm-formes4', sansMode: true, tmListe: 'formes4',
      tmQuestion: 'quelle est sa <strong>forme</strong> ?', tmBilan: 'Une phrase est à la forme <strong>affirmative</strong> ou à la forme <strong>négative</strong> (<em>ne… pas, ne… jamais, ne… plus, ne… rien, personne ne…</em>). Elle peut être <strong>aussi</strong> à la forme <strong>exclamative</strong> quand elle exprime une émotion forte (<em>Comme il est paresseux ! Il ne veut jamais jouer !</em>).',
      consigne: 'Des phrases sont soulignées. Pour chacune, dis sa <strong>forme</strong> : affirmative ou négative, et, si elle exprime une émotion forte, exclamative en plus. Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'cm-neg2', titre: 'Les mots de la négation', classes: ['cm'] },
    { jeu: 'cm-int2', titre: 'Poser une question', classes: ['cm'] },
    { jeu: 'cm-simcomp', titre: 'Phrase simple ou phrase complexe ?', classes: ['cm'], tmNiv: 'cm-simcomp', sansMode: true, tmListe: 'simcomp',
      tmQuestion: 'phrase simple ou phrase complexe ?', tmBilan: 'Pour le savoir, on compte les <strong>verbes conjugués</strong>. Un seul : la phrase est <strong>simple</strong>. Deux ou plus : la phrase est <strong>complexe</strong>, elle a autant de <strong>propositions</strong> que de verbes conjugués (<em>Les abeilles butinent et les papillons volent</em> : deux propositions).',
      consigne: 'Des phrases sont soulignées. Pour chacune, compte les <strong>verbes conjugués</strong> : un seul, c\'est une <strong>phrase simple</strong> ; deux ou plus, c\'est une <strong>phrase complexe</strong>. Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'cm-jc', titre: 'Propositions juxtaposées ou coordonnées ?', classes: ['cm'], tmNiv: 'cm-jc', sansMode: true, tmListe: 'jc',
      tmQuestion: 'juxtaposées ou coordonnées ?', tmBilan: 'Dans une phrase complexe, les propositions peuvent être <strong>juxtaposées</strong> : simplement posées l\'une à côté de l\'autre, séparées par une <strong>virgule</strong>, un <strong>point-virgule</strong> ou deux-points (<em>Le vent souffle, les feuilles tombent.</em>). Elles peuvent être <strong>coordonnées</strong> : reliées par une <strong>conjonction de coordination</strong> : <em>mais, ou, et, donc, or, ni, car</em>.',
      consigne: 'Des phrases complexes sont soulignées. Pour chacune, regarde ce qui relie les deux propositions : une simple ponctuation (<strong>juxtaposées</strong>) ou une conjonction de coordination, <em>mais, ou, et, donc, or, ni, car</em> (<strong>coordonnées</strong>). Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'cm-paroles', titre: 'Le dialogue', classes: ['cm'],
      consigne: 'Dans un dialogue, chaque réplique commence par un <strong>tiret</strong>. Touche toutes les <strong>répliques des personnages</strong>. Attention : les petits groupes comme <em>crie-t-il</em>, <em>demande Théo</em> ne sont pas des paroles, ils appartiennent au récit. Chaque réplique trouvée vaut 1 point ; si tu touches un mot du récit, tu perds un demi-point.' },
    { jeu: 'cm-disc', titre: 'Discours direct ou discours indirect ?', classes: ['cm'], tmNiv: 'cm-disc', sansMode: true, tmListe: 'disc',
      tmQuestion: 'discours direct ou discours indirect ?', tmBilan: 'Au <strong>discours direct</strong>, on cite les paroles telles qu\'elles ont été dites, <strong>entre guillemets</strong>, avec leurs propres mots (<em>« J\'ai faim ! » dit Tom</em>). Au <strong>discours indirect</strong>, le narrateur les rapporte dans une proposition introduite par <em>que</em> ou <em>si</em>, sans guillemets (<em>Tom dit qu\'il a faim</em>).',
      consigne: 'Des paroles rapportées sont soulignées. Pour chacune, dis si elle est au <strong>discours direct</strong> (entre guillemets, telle qu\'elle a été dite) ou au <strong>discours indirect</strong> (rapportée par le narrateur, après <em>que</em> ou <em>si</em>). Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'cm-cc3', titre: 'Les compléments de lieu, de temps, de manière', classes: ['cm'], tmNiv: 'cm-cc3', sansMode: true, tmListe: 'cc3',
      tmQuestion: 'que précise ce complément ?', tmBilan: 'Les <strong>compléments de phrase</strong> (autrefois : compléments circonstanciels) précisent les circonstances de l\'action. Le complément de <strong>lieu</strong> répond à « où ? », celui de <strong>temps</strong> à « quand ? », celui de <strong>manière</strong> à « comment ? ». On peut les déplacer ou les supprimer.',
      consigne: 'Des compléments de phrase sont soulignés. Pour chacun, pose les questions <strong>où ?</strong>, <strong>quand ?</strong> ou <strong>comment ?</strong> et dis s\'il est complément de <strong>lieu</strong>, de <strong>temps</strong> ou de <strong>manière</strong>. Chaque bonne réponse du premier coup vaut 1 point.' },
    { jeu: 'formes', titre: 'Reconnaître le type et la forme des phrases', classes: ['cm'], tfNiv: 'cm', bilan: true,
      consigne: 'Sous chaque phrase, deux bandes vierges. En <strong>bleu</strong>, le <strong>type</strong> : <strong>déclarative</strong>, <strong>interrogative</strong> ou <strong>impérative</strong>. En <strong>vert</strong>, la <strong>forme</strong> : <strong>affirmative</strong> ou <strong>négative</strong> (ne… pas, ne… plus, ne… jamais, ne… rien, personne ne…), et <strong>exclamative</strong> quand la phrase exprime un sentiment. Attention : la phrase exclamative était autrefois un type ; c\'est aujourd\'hui une forme. Et un ordre qui finit par « ! » n\'est pas forcément exclamatif. Chaque bande juste vaut 1 point.' },
    { jeu: 'cm-transfo', titre: 'Transformer les phrases', classes: ['cm'], bilan: true },
    { jeu: 'formes', titre: 'Les types et les formes de phrases', classes: ['65'], tfNiv: '65',
      consigne: 'En <strong>bleu</strong>, sous chaque phrase, son <strong>type</strong> (déclarative, interrogative, impérative). En <strong>vert</strong>, sous chaque <strong>proposition</strong>, sa <strong>forme</strong> (affirmative ou négative, et parfois exclamative) : dans une phrase complexe, une proposition peut être affirmative et l\'autre négative. Dans les derniers textes, une bande <strong>rouge</strong> demande en plus si la proposition est à la <strong>forme active</strong> ou à la <strong>forme passive</strong> (autrefois : la voix active ou passive). Chaque bande juste vaut 1 point.' },
    { jeu: 'formes', titre: 'Les types et les formes de phrases', classes: ['43'], tfNiv: '43',
      consigne: 'En <strong>bleu</strong>, sous chaque phrase, son <strong>type</strong> (déclarative, interrogative, impérative). En <strong>vert</strong>, sous chaque <strong>proposition</strong>, sa <strong>forme</strong> (affirmative ou négative, et parfois exclamative). En <strong>rouge</strong>, la <strong>forme active</strong> ou la <strong>forme passive</strong> (autrefois : la voix active ou passive) : attention aux pièges, « il est arrivé » ou « il est content » ne sont pas des formes passives. Chaque bande juste vaut 1 point.' },
    { jeu: 'phrase1', titre: 'Syntaxe de la phrase', classes: ['65', '43'] },
    { jeu: 'phrase3', titre: 'Repérer le discours direct et le discours indirect', classes: ['65'], drMode: 'reperage',
      consigne: 'Dans un récit, on peut rapporter les paroles des personnages de deux façons. Au <strong>discours direct</strong>, on les cite telles qu\'elles ont été prononcées, <strong>entre guillemets</strong>. Au <strong>discours indirect</strong>, on les rapporte dans une <strong>proposition subordonnée</strong>, après un verbe de parole (<em>il dit que…</em>, <em>il demanda si…</em>), sans guillemets. Deux étapes : <strong>1.</strong> trouve les paroles au discours direct ; <strong>2.</strong> trouve les paroles au discours indirect. Chaque passage trouvé vaut 1 point ; une erreur coûte 0,5 point.' },
    { jeu: 'phrase2', titre: 'Analyse, nature et fonction des propositions', classes: ['43'] },
    { jeu: 'phrase3', titre: 'Du discours direct au discours indirect, et inversement', classes: ['43'] },
    { avenir: true, titre: 'La forme active et la forme passive (autrefois : la voix active et la voix passive)', classes: ['65', '43'] },
    { avenir: true, titre: 'L\'expression des rapports logiques', classes: ['43'] },
  ],
};
let classeAccueil = (() => { try { return localStorage.getItem('mnemogram-classe') || 'ce'; } catch (e) { return 'ce'; } })();
if (!CLASSES.some((c) => c.id === classeAccueil)) classeAccueil = 'ce';
let exerciceChoisi = null;   /* l'entrée du parcours qu'on vient d'ouvrir : titre et adaptations */
function dessinePortail() {
  const C = CLASSES.find((c) => c.id === classeAccueil);
  $('home-classes').innerHTML = CLASSES.map((c) => `<button type="button" class="classe-onglet${c.id === classeAccueil ? ' on' : ''}" data-classe="${c.id}" role="tab" aria-selected="${c.id === classeAccueil}">${c.nom}</button>`).join('');
  $('home-classes-note').textContent = `Exercices pour le ${C.cycle}. Les autres onglets restent ouverts : tu peux aller voir plus facile ou plus difficile.`;
  Object.keys(PARCOURS).forEach((partie) => {
    /* v66 : les bilans viennent à la fin de la liste, numérotés à part (Bilan 1, Bilan 2) */
    let n = 0, nb = 0;
    const L0 = PARCOURS[partie].map((e, k) => ({ e, k })).filter(({ e }) => e.classes.includes(classeAccueil));
    const L = [...L0.filter(({ e }) => !e.bilan), ...L0.filter(({ e }) => e.bilan)];
    const premierBilan = L.findIndex(({ e }) => e.bilan);
    const titreEx = n0 => `<p class="home-etape"><strong>Apprendre pas à pas</strong> : ${n0 >= 10 ? 'dix exercices' : 'des exercices'}, une notion à la fois, avec quatre textes de plus en plus longs.</p>`;
    const titreBilan = '<p class="home-etape"><strong>Faire le bilan</strong> : le bilan 1 vérifie qu\'on <strong>reconnaît</strong> tout ce qu\'on a étudié ; le bilan 2, qu\'on sait l\'<strong>utiliser</strong> à bon escient. Douze textes chacun, du plus court au plus long.</p>';
    const nEx = L.filter(({ e }) => !e.bilan).length;
    document.querySelector(`[data-liste="${partie}"]`).innerHTML = (premierBilan > 0 ? titreEx(nEx) : '') + L.map(({ e, k }, idx) => {
      const nom = e.bilan ? `Bilan ${++nb}` : `Exercice ${++n}`;
      return (idx === premierBilan && premierBilan > 0 ? titreBilan : '') + (e.avenir
        ? `<button type="button" class="home-mode-button avenir" disabled><span class="label"><strong>${nom}</strong><br>${e.titre}</span><span class="desc">bientôt</span></button>`
        : `<button type="button" class="home-mode-button${e.bilan ? ' bilan' : ''}" data-partie-ex="${partie}" data-k="${k}" data-nom="${nom}"><span class="label"><strong>${nom}</strong><br>${e.titre}</span></button>`);
    }).join('') || '<p class="sous">Pas encore d\'exercice à ce niveau.</p>';
  });
  document.querySelectorAll('[data-classe]').forEach((b) => b.addEventListener('click', () => {
    classeAccueil = b.dataset.classe;
    try { localStorage.setItem('mnemogram-classe', classeAccueil); } catch (e) {}
    dessinePortail();
  }));
  document.querySelectorAll('[data-partie-ex]').forEach((b) => b.addEventListener('click', () => {
    const p = b.dataset.partieEx, e = PARCOURS[p][Number(b.dataset.k)];
    const C = CLASSES.find((c) => c.id === classeAccueil);
    exerciceChoisi = { ...e, partie: p, titreComplet: `${C.nom} · ${PARTIES_NOM[p]} · ${b.dataset.nom.toLowerCase()} : ${e.titre}` };
    openGame(e.jeu);
  }));
}

/* v66 : le texte occupe toute l'ardoise : on cherche la plus grande taille de lettres qui tient dans le cadre.
   Un texte court s'écrit donc en très gros (plus facile à lire), un texte long en plus petit. On réserve la place
   des étiquettes et des formes barrées qui viendront s'ajouter pendant l'exercice. */
function ajusteArdoise() {
  const s = $('nat-sentence'), card = $('nat-sentence-card');
  if (!s || !card) return;
  if (!currentGame || !isT1() || $('natures-panel').classList.contains('hidden')) { s.style.fontSize = ''; return; }
  const cs = getComputedStyle(card);
  const H = Math.max(200, (parseFloat(cs.minHeight) || card.clientHeight) - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - 6);
  const ajouts = [], marques = [];
  if (currentGame.tm) s.querySelectorAll('.w.forme:not(.fige)').forEach((w) => { if (!w.querySelector('.labs')) { w.insertAdjacentHTML('beforeend', `<span class="labs fit-tmp">${'<span class="lab">passé composé</span>'.repeat(currentGame.sansMode ? 1 : 2)}</span>`); ajouts.push(w.lastElementChild); } });
  /* v70 : dans les exercices à écrire, la forme d'origine s'affiche en petit au-dessus du mot, dans l'interligne : pas de place à réserver */
  let lo = 14, hi = 96;
  for (let k = 0; k < 10; k++) {
    const m = (lo + hi) / 2;
    s.style.fontSize = `${m}px`;
    if (s.scrollHeight <= H && s.scrollWidth <= s.clientWidth + 2) lo = m; else hi = m;
  }
  s.style.fontSize = `${Math.floor(lo)}px`;
  ajouts.forEach((x) => x.remove()); marques.forEach((x) => { x.textContent = ''; });
}
window.addEventListener('resize', () => { if (currentGame && isT1()) ajusteArdoise(); });

/* v38 : l'accueil a trois parties (les mots, les temps et les modes, la phrase) ; chacune a sa page d'exercices */
let partieAccueil = '';
function montrePartie(p) {
  partieAccueil = p || '';
  /* v78 : les trois parties restent toujours visibles ; celle qu'on a choisie passe en premier, en grand */
  $('home-parties').classList.toggle('choisie', !!partieAccueil);
  document.querySelectorAll('#home-parties .home-partie').forEach((b) => { const on = b.dataset.partie === partieAccueil; b.classList.toggle('on', on); b.setAttribute('aria-current', on ? 'true' : 'false'); });
  ['mots', 'temps', 'phrase'].forEach((k) => $(`home-${k}`).classList.toggle('hidden', partieAccueil !== k));
  window.scrollTo(0, partieAccueil ? $('home-classes').getBoundingClientRect().top + window.scrollY - 70 : 0);
}
document.querySelectorAll('[data-partie]').forEach((b) => b.addEventListener('click', () => montrePartie(b.dataset.partie)));
dessinePortail();
function showPanel(name) {
  $('welcome-panel').classList.toggle('hidden', name !== 'welcome');
  $('natures-panel').classList.toggle('hidden', name !== 'natures');
  $('results-panel').classList.toggle('hidden', name !== 'results');
  $('bg-mosaic').classList.toggle('hidden', name !== 'welcome');
  document.body.classList.toggle('in-exercise', name !== 'welcome');
  window.scrollTo(0, 0);
}

/* Mosaïque de l'accueil : les 12 images du dossier « Allégories grammaire » (4 × 3 sur ordinateur,
   3 × 4 sur smartphone), floutées et pâlies, nettes et agrandies au survol, comme dans Mnemart. */
/* v8 : les cases dont l'image n'est pas en ligne (Palazzo Trinci, Le Bon usage, Grevisse) reprennent des images
   déjà présentes ailleurs : la fresque de l'accueil, et deux images de la mosaïque, placées loin de leur double. */
const BG_MOSAIC_FILES = [
  '../accueil.jpg', 'ardoises.jpg', 'grammaire-pierrot.jpg', 'grammatica-campanile.jpg',
  'garcon-abc.jpg', 'grammaire-arts-liberaux.jpg', 'ecole-honduras.jpg', 'larive-fleury.jpg',
  'grammatik-kinder.jpg', 'grammatica-campanile.jpg', 'eleve-cahier.jpg', 'grammaire-pierrot.jpg',
];
function initMosaic() {
  const c = $('bg-mosaic');
  c.innerHTML = BG_MOSAIC_FILES.map((f) =>
    `<div class="bg-tile"><img src="assets/mosaique/${f}" alt="" loading="lazy" draggable="false" onerror="this.style.visibility='hidden'" /></div>`).join('');
  c.querySelectorAll('.bg-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      const was = tile.classList.contains('touched');
      c.querySelectorAll('.bg-tile.touched').forEach((t) => t.classList.remove('touched'));
      if (!was) tile.classList.add('touched');
    });
    tile.addEventListener('mouseenter', () => tile.classList.add('touched'));
    tile.addEventListener('mouseleave', () => tile.classList.remove('touched'));
  });
}

/* ------------------------------------------------------------
   JEU 1 : RECONNAISSANCE DES NATURES
   20 questions : chacune des 13 natures est demandée au moins une fois, dans un ordre tiré au hasard.
   Mauvaise réponse : un personnage grincheux encourage à recommencer (2e essai).
   Après deux erreurs, la bonne réponse est montrée. Le score compte les réussites du premier coup.
   ------------------------------------------------------------ */
const NB_QUESTIONS = 20;
const game = { questions: [], index: 0, score: 0, essais: 0, fini: false, erreurs: [], parNature: {} };

const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* 20 questions : les 13 natures une fois chacune, puis 7 natures tirées au hasard en plus ;
   le tout mélangé, sans deux fois de suite la même nature. */
function buildNatureSequence() {
  let liste = shuffle(currentGame.priorite).slice(0, NB_QUESTIONS);
  while (liste.length < NB_QUESTIONS) liste = liste.concat(shuffle(currentGame.reste).slice(0, NB_QUESTIONS - liste.length));
  for (let essai = 0; essai < 50; essai++) {
    const m = shuffle(liste);
    if (m.every((c, i) => i === 0 || c !== m[i - 1])) return m;
  }
  return shuffle(liste);
}
function buildQuestions() {
  if (currentGame.tv) { marqueTexte(texteChoisi); return [{ tv: true, t: texteChoisi }]; }
  if (currentGame.dr) { marqueTexte(texteChoisi); return [{ dr: true, t: texteChoisi }]; }
  if (currentGame.sx) { marqueTexte(texteChoisi); return [{ sx: true, t: texteChoisi }]; }
  if (currentGame.tf) { marqueTexte(texteChoisi); return [{ tf: true, t: texteChoisi }]; }
  if (currentGame.tm && currentGame.tmNiv) { marqueTexte(texteChoisi); return [{ tm: true, t: TEXTES_TM.indexOf(listeTextes()[texteChoisi]) }]; }
  if (currentGame.tm) return [{ tm: true, t: currentGame.tmTexte ?? currentGame.texte ?? 0 }];
  if (currentGame.tab) { marqueTexte(texteChoisi); return [{ tab: true, t: texteChoisi }]; }
  if (currentGame.gn) return buildQuestionsGN();
  if (currentGame.gv) return buildQuestionsGV();
  const natures = buildNatureSequence();
  const used = new Set();
  return natures.map((code) => {
    const cle = currentGame.cle || ((m) => answerCodeOf(m.tag));
    let candidats = PARSED.map((mots, p) => ({ p, idx: mots.map((m, i) => (m.tag && cle(m) === code ? i : -1)).filter((i) => i >= 0) }))
      .filter((c) => c.idx.length);
    const libres = candidats.filter((c) => !used.has(c.p));
    if (libres.length) candidats = libres;
    /* v9 : dans le jeu 2, une phrase « piège » (où l'on trouve aussi la nature qu'on confond avec celle-ci :
       mon / le mien, ce / celui-ci, le article / le pronom…) a trois fois plus de chances d'être choisie. */
    const piege = currentGame.pieges && currentGame.pieges[code];
    if (piege) candidats = candidats.flatMap((c) => (PARSED[c.p].some((m) => piege.includes(m.tag)) ? [c, c, c] : [c]));
    const c = pick(candidats);
    used.add(c.p);
    const mot = pick(c.idx.filter((i) => !finDeNegation(PARSED[c.p], i)).length ? c.idx.filter((i) => !finDeNegation(PARSED[c.p], i)) : c.idx);
    /* v18 : la négation se prend en entier : « ne… pas » (les deux mots clignotent) */
    const neg = currentGame.cle ? negationDe(PARSED[c.p], mot) : null;
    if (neg) return { phrase: c.p, mot, mots: [mot, neg], texte: `${PARSED[c.p][mot].texte.replace(/'$/, 'e')}… ${PARSED[c.p][neg].texte}`, code: 'Av', fn: 'F.mod' };
    /* jeu 3 : la question garde la nature (code) et la fonction (fn) du mot */
    if (currentGame.cle) return { phrase: c.p, mot, code: answerCodeOf(PARSED[c.p][mot].tag), fn: `F.${code}` };
    return { phrase: c.p, mot, code };
  });
}

/* v18 : négations en deux mots : ne… pas, ne… plus, ne… jamais, ne… rien */
const FINS_NEG = ['pas', 'plus', 'jamais', 'rien', 'guère'];
function negationDe(mots, i) {
  if (!/^n(e|')$/i.test(mots[i].texte) || mots[i].tag !== 'Av') return null;
  for (let k = i + 1; k < mots.length; k++) if (mots[k].tag === 'Av' && FINS_NEG.includes(mots[k].texte.toLowerCase())) return k;
  return null;
}
function finDeNegation(mots, i) {
  if (mots[i].tag !== 'Av' || !FINS_NEG.includes(mots[i].texte.toLowerCase())) return false;
  return mots.slice(0, i).some((m, k) => negationDe(mots, k) === i);
}
const motTexte = (q) => q.texte || PARSED[q.phrase][q.mot].texte;

function buildNatureButtons() {
  const btn = (code, small) => `<button type="button" class="nature-button${small ? ' small' : ''}" data-code="${code}">${small ? NATURE_BY_CODE[code].court : NATURE_BY_CODE[code].nom}</button>`;
  const html = (groupe) => currentGame.rows[groupe].map((row) => Array.isArray(row)
    ? `<div class="nature-row nature-row-${row.length}">` + row.map((c) => btn(c, false)).join('') + '</div>'
    : `<div class="nature-subgroup" data-titre="${row.titre}"><span class="nature-subtitle">${row.titre}</span><div class="nature-row nature-row-7">` + row.codes.map((c) => btn(c, true)).join('') + '</div></div>').join('');
  $('nat-buttons-variables').innerHTML = html('variables');
  $('nat-buttons-invariables').innerHTML = html('invariables');
  $('nat-buttons-fonctions').innerHTML = '';
  document.querySelectorAll('#nat-nature-column .nature-button').forEach((b) => b.addEventListener('click', () => answer(b.dataset.code, b)));
}

/* v36 : vingt textes numérotés, du plus facile au plus difficile. L'écran de départ propose le texte qui suit
   le dernier joué ; les textes déjà faits portent une coche. On garde ces souvenirs dans le navigateur. */
let texteChoisi = 0;
const NIVEAU_TEXTE = (k, n = 20) => { const q = k / n; return q < 0.25 ? 'facile' : q < 0.5 ? 'moyen' : q < 0.75 ? 'difficile' : 'très difficile'; };
const cleTextes = () => `mnemogram-textes-${currentGame === GAMES.libre ? 'libre' : currentGame.tv ? currentGame.tv : currentGame.tf ? currentGame.tf : currentGame.dr ? 'phrase3' : currentGame.sxTF ? `formes-${currentGame.tfNiv}` : currentGame.sx ? (currentGame.sxFn ? 'phrase2' : 'phrase1') : currentGame.tmNiv ? `temps1-${currentGame.tmNiv}` : 'tableau'}`;
/* v47 : la liste des textes au choix : les tableaux (exercices 5 et 6 des mots) ou les textes à transformer */
const listeTextes = () => (currentGame.tv ? TROUVE[currentGame.tv] : currentGame.tab ? TABLEAUX : currentGame.tf ? TRANSFOS[currentGame.tf] : currentGame.dr ? TEXTES_DR : currentGame.sxTF ? TEXTES_TF[currentGame.tfNiv] : currentGame.sx ? TEXTES_SX[currentGame.sxFn ? 'fn' : 'syn'] : currentGame.tmNiv ? TEXTES_TM.filter((x) => x.niv === currentGame.tmNiv).sort((x, y) => (x.texte.match(/\{/g) || []).length - (y.texte.match(/\{/g) || []).length) : null);
function textesFaits() { try { return JSON.parse(localStorage.getItem(cleTextes()) || '{"faits":[],"dernier":-1}'); } catch (e) { return { faits: [], dernier: -1 }; } }
function marqueTexte(k) {
  const m = textesFaits();
  if (!m.faits.includes(k)) m.faits.push(k);
  m.dernier = k;
  try { localStorage.setItem(cleTextes(), JSON.stringify(m)); } catch (e) {}
}
function choixTexte() {
  const box = $('nat-texte-choix');
  const L = listeTextes();
  if (!L) { box.classList.add('hidden'); box.innerHTML = ''; return; }
  const m = textesFaits(), N = L.length;
  texteChoisi = (m.dernier + 1) % N;
  const NIV = (k) => NIVEAU_TEXTE(k, N);
  const debuts = [...new Set(L.map((x, k) => NIV(k)))].map((nv) => L.findIndex((x, k) => NIV(k) === nv));
  const dessine = () => {
    const groupes = debuts.map((d, g) => `<div class="texte-groupe"><span class="texte-niveau">${NIV(d)}</span>${L.slice(d, g + 1 < debuts.length ? debuts[g + 1] : N).map((x, j) => {
      const k = d + j;
      return `<button type="button" class="texte-num${k === texteChoisi ? ' choisi' : ''}${m.faits.includes(k) ? ' fait' : ''}" data-texte="${k}" title="${m.faits.includes(k) ? 'déjà fait' : 'pas encore fait'}">${k + 1}</button>`;
    }).join('')}</div>`).join('');
    $('nat-progress-label').textContent = `Texte n° ${texteChoisi + 1} (${NIV(texteChoisi)})`;
    if (currentGame.tf) { currentGame.total = decoupeTF(L[texteChoisi].texte).elts.length; $('nat-score-label').textContent = scoreLabel(0); }
    if (currentGame.tv) { currentGame.total = (L[texteChoisi].texte.match(/\{/g) || []).length; $('nat-score-label').textContent = scoreLabel(0); }
    if (currentGame.tmNiv) { currentGame.total = decoupeTM(L[texteChoisi].texte).formes.length; $('nat-score-label').textContent = scoreLabel(0); }
    if (currentGame.dr) { currentGame.total = totalDR(L[texteChoisi]); $('nat-score-label').textContent = scoreLabel(0); }
    if (currentGame.sx) { const dd = decoupeSX(L[texteChoisi].texte); currentGame.total = dd.phrases.length + dd.props.length + (currentGame.sxFn || currentGame.sxTF ? dd.props.filter((p) => p.fn).length : 0); $('nat-score-label').textContent = scoreLabel(0); }
    box.innerHTML = `<p class="texte-titre">Choisis ton texte : le <strong>texte n° ${texteChoisi + 1}</strong>${L[texteChoisi].titre ? ` « ${esc(L[texteChoisi].titre)} »` : ''} (${NIV(texteChoisi)}) t'attend. Les textes déjà faits sont cochés.</p><div class="texte-grille">${groupes}</div>`;
    box.querySelectorAll('[data-texte]').forEach((b) => b.addEventListener('click', () => { texteChoisi = Number(b.dataset.texte); dessine(); }));
  };
  box.classList.remove('hidden');
  dessine();
}
function openGame(id) {
  currentGame = GAMES[id];
  /* v60 : l'exercice ouvert depuis le portail : son numéro dans l'onglet, et ses adaptations au niveau */
  const adapte = exerciceChoisi && exerciceChoisi.jeu === id ? exerciceChoisi : null;
  currentGame.drMode = adapte?.drMode || 'complet';
  /* v61 : temps et modes simplifiés selon le niveau : un autre texte, moins d'étiquettes, parfois pas de mode */
  currentGame.tmTexte = adapte?.tmTexte ? TEXTES_TM.findIndex((x) => x.cle === adapte.tmTexte) : undefined;
  currentGame.tmChoix = adapte?.tmChoix || null;
  currentGame.sansMode = !!adapte?.sansMode;
  currentGame.tmNiv = adapte?.tmNiv || null;
  currentGame.tmListe = adapte?.tmListe || null; currentGame.tmListe2 = adapte?.tmListe2 || null; currentGame.tmQuestion2 = adapte?.tmQuestion2 || null; currentGame.tmQuestion = adapte?.tmQuestion || null; currentGame.tmBilan = adapte?.tmBilan || null;
  if (currentGame.sxTF) currentGame.tfNiv = adapte?.tfNiv || '43';
  if (currentGame.tm && currentGame.tmTexte !== undefined) currentGame.total = decoupeTM(TEXTES_TM[currentGame.tmTexte].texte).formes.length;
  else if (id === 'temps1') currentGame.total = 20;
  $('natures-panel').classList.toggle('game2', id === 'natures2');
  $('natures-panel').classList.toggle('game3', id === 'fonctions' || id === 'gn' || id === 'tableau' || id === 'libre');
  /* v27 : le jeu 3 marche maintenant comme le jeu 4 (consignes, carrés verts et rouges sous les mots) */
  $('natures-panel').classList.toggle('game4', id === 'gn' || id === 'fonctions' || id === 'tableau' || id === 'libre');
  $('natures-panel').classList.toggle('game5', id === 'tableau' || id === 'libre');
  ['game3', 'game4'].forEach((c) => { if (GAMES[id].tm || GAMES[id].tf || GAMES[id].sx || GAMES[id].dr || GAMES[id].tv) $('natures-panel').classList.add(c); });
  $('natures-panel').classList.toggle('game7', !!(GAMES[id].tm || GAMES[id].tf || GAMES[id].sx || GAMES[id].dr || GAMES[id].tv));
  $('natures-panel').classList.toggle('game9', !!(GAMES[id].dr || GAMES[id].tv));
  $('natures-panel').classList.toggle('game8', !!GAMES[id].sx);
  $('natures-panel').classList.toggle('game7v', !!GAMES[id].valeurs);
  $('nat-ready-explanation').innerHTML = adapte?.consigne ? adapte.consigne
    : TFCFG[GAMES[id].tf] ? `${TFCFG[GAMES[id].tf].intro} Tu as trois essais : une réponse juste du premier coup vaut 1 point, ensuite un demi-point. Si tu te trompes, ${TFCFG[GAMES[id].tf].essais || 'on te dit ce qui ne va pas : le temps, la terminaison (l\'accord avec le sujet) ou l\'orthographe du verbe.'} La voix lit chaque phrase avec ta réponse : écoute bien si elle sonne juste !`
    : id === 'phrase3'
    ? 'Dans un récit, on peut rapporter les paroles des personnages de deux façons. Au <strong>discours direct</strong>, on les cite telles qu\'elles ont été prononcées, <strong>entre guillemets</strong>. Au <strong>discours indirect</strong>, on les rapporte dans une <strong>proposition subordonnée</strong>, après un verbe de parole, en changeant les personnes et les temps. Quatre étapes : <strong>1.</strong> trouve les paroles au discours direct ; <strong>2.</strong> mets-les au discours indirect ; <strong>3.</strong> trouve les paroles au discours indirect ; <strong>4.</strong> mets-les au discours direct. Chaque passage trouvé vaut 1 point (une erreur coûte 0,5 point), chaque transformation réussie du premier coup vaut 1 point.'
    : id === 'phrase2'
    ? 'On va plus loin dans l\'analyse des propositions. Sous le texte, trois rangées de bandes vierges : en <strong>bleu</strong>, la <strong>syntaxe</strong> de chaque phrase ; en <strong>vert</strong>, la <strong>nature précise</strong> de chaque proposition (indépendante, principale, subordonnée relative, conjonctive complétive, conjonctive circonstancielle…) ; en <strong>rouge</strong>, la <strong>fonction</strong> de chaque subordonnée (complément de l\'antécédent, COD du verbe, complément circonstanciel…). Touche une bande, puis choisis à droite. Chaque bande juste du premier coup vaut 1 point.'
    : id === 'phrase1'
    ? 'Dans ce petit texte, décris la <strong>syntaxe</strong> de chaque phrase et la <strong>nature</strong> de ses propositions. Sous le texte, des bandes vierges sont déjà tracées : en <strong>bleu</strong> sous chaque phrase, en <strong>vert</strong> sous chaque proposition. Touche une bande, puis choisis à droite ce qu\'elle est : phrase nominale, verbale simple ou verbale complexe ; proposition indépendante, principale ou subordonnée. Chaque bande juste du premier coup vaut 1 point.'
    : id === 'temps5'
    ? 'Voici un texte au <strong>système du passé</strong>. Réécris-le au <strong>système du présent</strong>, comme si les choses se passaient au moment où on les lit. Les mots soulignés doivent changer : des <strong>formes verbales</strong>, mais aussi des <strong>indicateurs de temps</strong> (<em>ce jour-là</em> devient <em>aujourd\'hui</em>, <em>la veille</em> devient <em>hier</em>, <em>le lendemain</em> devient <em>demain</em>…). Appuie sur chacun et écris ce qu\'il devient. Chaque changement réussi vaut 1 point.'
    : id === 'temps6'
    ? 'Voici un texte au <strong>système du présent</strong>. Réécris-le <strong>au passé</strong>, comme un souvenir, en <strong>français classique</strong> (passé simple, subjonctif imparfait…) ou en <strong>français contemporain</strong> (passé composé, « aller » + infinitif…) : tu choisiras. Les mots soulignés doivent changer : des formes verbales et des indicateurs de temps (<em>aujourd\'hui</em> devient <em>ce jour-là</em>…). Chaque changement réussi vaut 1 point. C\'est le plus difficile !'
    : id === 'temps4'
    ? 'Voici un texte au <strong>système du passé</strong>, d\'abord en <strong>français classique</strong>. Ses dix verbes sont conjugués à un <strong>mode personnel</strong> : pour chacun, donne son <strong>temps</strong> et son <strong>mode</strong>, puis la <strong>valeur du temps</strong> et la <strong>valeur du mode</strong>. Ensuite, le même texte apparaîtra en <strong>français contemporain</strong> : tu analyseras de la même façon les formes qui ont changé. Chaque réponse juste du premier coup vaut 0,5 point : 26 points en tout.'
    : id === 'temps3'
    ? 'Dans ce texte au <strong>système du présent</strong>, dix verbes sont conjugués à un <strong>mode personnel</strong> : indicatif, conditionnel, subjonctif ou impératif. Pour chacun, tu donneras quatre choses : son <strong>temps</strong> et son <strong>mode</strong>, puis la <strong>valeur du temps</strong> (pourquoi on emploie ce temps) et la <strong>valeur du mode</strong> (pourquoi on emploie ce mode). Chaque réponse juste du premier coup vaut 0,5 point : 2 points par verbe, 20 points en tout.'
    : id === 'temps2'
    ? 'Voici un texte au <strong>système du passé</strong> : il se présente comme un <strong>souvenir</strong>. Il est d\'abord écrit en <strong>français classique</strong>, avec des passés simples et des subjonctifs imparfaits : donne le <strong>temps</strong> (étiquette verte) et le <strong>mode</strong> (étiquette rouge) de ses vingt formes verbales. Ensuite, le même texte apparaîtra en <strong>français contemporain</strong> : tu donneras le temps et le mode des formes qui ont changé. 0,5 point pour chaque temps, 0,5 pour chaque mode, s\'ils sont justes du premier coup : 26 points en tout.'
    : id === 'temps1'
    ? 'Voici un texte au <strong>système du présent</strong> : l\'action se passe au moment où on le lit. Vingt <strong>formes verbales</strong> y sont soulignées. Appuie sur chacune, dans l\'ordre que tu veux, et donne son <strong>temps</strong> (étiquette verte) puis son <strong>mode</strong> (étiquette rouge). Chaque forme vaut 1 point : 0,5 pour le temps, 0,5 pour le mode, s\'ils sont justes du premier coup.'
    : id === 'libre'
    ? 'Cette fois, <strong>pas de guide</strong> : remplis le tableau de vingt cases <strong>seul</strong>, dans l\'ordre que tu veux. Appuie sur une case, choisis la <strong>nature</strong> du mot (en vert) et sa <strong>fonction</strong> (en rouge), puis appuie sur le mot dont elle dépend (le verbe, le sujet ou le nom). Tu peux revenir sur une case autant que tu veux. Quand tu as fini, appuie sur <strong>« Corriger mon tableau »</strong> : chaque case vaut 1 point, 0,5 pour la nature et 0,5 pour la fonction.'
    : id === 'tableau'
    ? 'Voici un <strong>tableau de vingt cases</strong> : chaque case contient un mot (ou un verbe en deux mots). Remplis-le en suivant la méthode, étape par étape : d\'abord les <strong>verbes</strong>, puis leurs <strong>sujets</strong>, puis leurs <strong>compléments</strong> ; ensuite les <strong>groupes nominaux</strong> ; enfin les <strong>mots invariables</strong>. Chaque case vaut 1 point : 0,5 pour trouver le mot (et sa fonction), 0,5 pour sa nature. Attention : une erreur, et la moitié de point est perdue, même si tu trouves ensuite.'
    : id === 'fonctions'
    ? 'Des <strong>consignes</strong> apparaissent à droite, l\'une après l\'autre : <strong>vertes</strong> pour la nature, <strong>rouges</strong> pour la fonction. Trouve d\'abord le <strong>verbe</strong> et sa nature, puis son <strong>sujet</strong>, puis ses <strong>compléments</strong> (COD, COI, COS, attribut, compléments circonstanciels). Tu réponds en appuyant sur le bon mot de la phrase, ou sur les cases de la consigne. Ta réponse se pose sous le mot : dans un <strong>carré vert</strong> pour une nature, dans un <strong>carré rouge</strong> pour une fonction.'
    : id === 'gn' ? 'Cette fois, des <strong>consignes</strong> apparaissent à droite, l\'une après l\'autre : <strong>vertes</strong> pour la nature, <strong>rouges</strong> pour la fonction. Tu réponds en appuyant sur le bon mot de la phrase, ou sur les cases de la consigne. Les petits points « (…) » montrent que la phrase continue : on ne garde que le groupe nominal. Ta réponse se pose sous le mot : dans un <strong>carré vert</strong> si c\'est une nature (nom commun, déterminant, adjectif qualificatif…), dans un <strong>carré rouge</strong> si c\'est une fonction (épithète, complément du nom…).'
    : 'Dans chaque phrase, un mot clignote. Trouve sa <strong>nature</strong> parmi les boutons verts. Si tu te trompes, tu as droit à un deuxième essai.';
  buildNatureButtons();
  choixTexte();
  $('nat-game-title').textContent = adapte ? adapte.titreComplet : currentGame.titre;
  showPanel('natures');
  $('nat-ready-screen').classList.remove('hidden');
  $('nat-quiz-grid').classList.add('hidden');
  if (!listeTextes()) $('nat-progress-label').textContent = `Question 1 / ${nbQuestions()}`;
  $('nat-score-label').textContent = scoreLabel(0);
  $('nat-progress-bar').style.width = '0';
}
/* v15 : les points du jeu 3 vont de 0,5 en 0,5 : on les écrit avec une virgule (14,5). */
const fmtPts = (n) => String(Math.round((n || 0) * 10) / 10).replace('.', ',');
const isG3 = () => currentGame === GAMES.fonctions;
const isG4 = () => currentGame === GAMES.gn;
const isG5 = () => currentGame === GAMES.tableau;
const isG6 = () => currentGame === GAMES.libre;
function scoreLabel(n) {
  if (isG5() || isG6() || isT1()) return `${fmtPts(n)} point${n >= 2 ? 's' : ''} sur ${currentGame.total || 20}`;
  if (isG3() || isG4()) return `${fmtPts(n)} point${n >= 2 ? 's' : ''}`;
  return `${n} bonne${n > 1 ? 's' : ''} réponse${n > 1 ? 's' : ''}`;
}
function startGame() {
  game.questions = buildQuestions();
  game.index = 0; game.score = 0; game.fini = false; game.erreurs = []; game.parNature = {};
  showPanel('natures');
  $('nat-ready-screen').classList.add('hidden');
  $('nat-quiz-grid').classList.remove('hidden');
  showQuestion();
}

function updateProgress() {
  $('nat-progress-label').textContent = `Question ${game.index + 1} / ${game.questions.length}`;
  $('nat-score-label').textContent = scoreLabel(game.score);
  $('nat-progress-bar').style.width = `${(game.index / game.questions.length) * 100}%`;
}

function showQuestion() {
  $('nat-sentence').style.fontSize = '';
  if (isT1()) boutonVoix(false); else { $('nat-listen-button').textContent = '🔊 Écouter la phrase'; game.texteFini = false; }
  /* v7 : on coupe la voix (bulle + explication) dès qu'on passe au mot suivant, pour qu'elle ne déborde pas. */
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (isG4()) { showQuestionGN(); return; }
  if (isG3()) { showQuestionGV(); return; }
  if (isG5()) { showQuestionTab(); return; }
  if (isG6()) { showQuestionLibre(); return; }
  if (isT1()) { (currentGame.tv ? showQuestionTV : currentGame.dr ? showQuestionDR : currentGame.sx ? showQuestionSX : currentGame.tf ? showQuestionTF : showQuestionTM)(); return; }
  const q = game.questions[game.index];
  game.essais = 0;
  $('nat-sentence').innerHTML = phraseHtml(PARSED[q.phrase], q.mots || q.mot);
  $('nat-character-stage').innerHTML = '';
  $('nat-correction').classList.add('hidden');
  $('nat-verdict-square').className = 'verdict-square';
  document.querySelectorAll('.nature-button').forEach((b) => { b.disabled = false; b.classList.remove('wrong', 'correct', 'faded', 'gone'); });
  document.querySelectorAll('#nat-nature-column .gone').forEach((el) => el.classList.remove('gone'));
  game.step = 'nature'; game.essaisFn = 0; game.natureOk = false;
  $('nat-fn-column').classList.add('hidden');
  $('nat-buttons-fonctions').innerHTML = '';
  $('nat-instruction').textContent = 'Quelle est la nature du mot qui clignote ?';
  updateProgress();
}

const recentMessages = [];
/* v12 : espaces insécables à la française (guillemets, ! ? : ;), pour qu'un « » ou un ! ne passe jamais seul à la ligne. */
const nbspFr = (h) => String(h).replace(/« /g, '«\u00a0').replace(/ »/g, '\u00a0»').replace(/ ([!?:;])/g, '\u00a0$1');
const capitalize = (t) => t.charAt(0).toUpperCase() + t.slice(1);
/* Choisit un message du personnage : avec une fiche d'enfant, les messages personnalisés reviennent
   souvent (environ 3 fois sur 4), mais pas toujours, pour ne pas lasser. Un adulte différent de la fiche
   est tiré à chaque fois. */
function chooseMessage(ch) {
  const enfant = playerProfile?.enfant?.prenom;
  const adultes = (playerProfile?.adultes || []).filter((a) => a.lien);
  const r = Math.random();
  if (enfant && adultes.length && r < 0.3) { const a = pick(adultes); return { tpl: pick(ch.famille), adulte: a, photo: a.photo || playerProfile.enfant.photo }; }
  if (enfant && r < 0.75) return { tpl: pick(ch.perso), photo: playerProfile.enfant.photo };
  return { tpl: pick(ch.messages) };
}
function fillMessage(tpl, nature, adulte) {
  let msg = tpl;
  if (nature) msg = msg.replace('{nature}', nature.article).replace('{Nature}', capitalize(nature.article));
  msg = msg.replace(/\{E\}/g, playerProfile?.enfant?.prenom || '');
  if (adulte) {
    const l = LIENS[adulte.lien] || LIENS.papa;
    const ga = adulte.prenom ? `${l.ton} ${adulte.prenom}` : l.ton;
    msg = msg.replace('{adulte}', ga).replace('{Adulte}', capitalize(ga)).replace('{fier}', l.f ? 'fière' : 'fier');
  }
  return msg;
}
function showCharacter(camp, nature) {
  /* v12 : option « Les sorciers encouragent le joueur » décochée : pas de sorcier ; la voix lit seulement l'explication. */
  if (!optSorciers(playerProfile)) {
    $('nat-character-stage').innerHTML = '';
    if (!$('nat-correction').classList.contains('hidden')) speak(explanationSpoken(), 'femme', 'phrase');
    return;
  }
  const ids = Object.keys(CHARACTERS).filter((k) => CHARACTERS[k].camp === camp);
  const id = pick(ids);
  const ch = CHARACTERS[id];
  /* On évite de répéter une phrase déjà dite dans les 4 dernières réponses. */
  let msg = '', photo = '';
  for (let essai = 0; essai < 8; essai++) {
    const choix = chooseMessage(ch);
    msg = fillMessage(choix.tpl, nature, choix.adulte);
    photo = choix.photo || '';
    if (!nature && /\{[nN]ature\}/.test(msg)) continue;
    if (!recentMessages.includes(msg)) break;
  }
  recentMessages.push(msg); if (recentMessages.length > 4) recentMessages.shift();
  const stage = $('nat-character-stage');
  stage.className = `character-stage ${camp}`;
  stage.innerHTML = `<div class="bubble${photo ? ' has-photo' : ''}">${photo ? `<img class="bubble-photo" src="${photo}" alt="" />` : ''}<div><span class="who">${ch.nom}</span>${nbspFr(msg)}</div></div>${characterSvg(id)}`;
  speak(msg, ch.voix, camp);
  /* v6 : quand l'explication s'affiche sous les boutons (bonne réponse, ou deuxième erreur), la voix la lit
     juste après la bulle, à débit normal : « Hourra est une interjection. L'interjection est un cri… » */
  if (!$('nat-correction').classList.contains('hidden')) speak(explanationSpoken(), 'femme', 'phrase', true);
}
function explanationSpoken() {
  const q = game.questions[game.index];
  if (isG4()) return resumeGN(q, false).replace(/«|»/g, '');
  if (isG5() || isG6() || isT1()) return '';
  if (isG3()) return resumeGV(q, false).replace(/«|»/g, '').replace(/\bCO([DIS])\b/g, 'C O $1');
  const n = NATURE_BY_CODE[q.code];
  if (q.fn) {
    const f = NATURE_BY_CODE[q.fn];
    const quest = questionFonction(q);
    return `${motTexte(q).replace('…', '')} est ${n.article}. Sa fonction : ${f.nom.replace(/\s*\(.*\)/, '').toLowerCase()}. ${quest.replace(/ \+ /g, ' ')} ${f.explication.replace(/\*/g, '')}`.replace(/\bCO([DIS])\b/g, 'C O $1');
  }
  return `${PARSED[q.phrase][q.mot].texte} est ${n.article}. ${n.explication}`;
}

function answer(code, btn) {
  if (game.fini) return;
  if (isG4()) { answerBoutonGN(code, btn); return; }
  if (isG3() && currentGame.gv) return;
  if (isG5() || isG6() || isT1()) return;
  if (isG3()) { answerNature3(code, btn); return; }
  const q = game.questions[game.index];
  const bonne = NATURE_BY_CODE[q.code];
  const mot = PARSED[q.phrase][q.mot];
  if (code === q.code) {
    if (game.essais === 0) game.score += 1;
    btn.classList.add('correct');
    finishQuestion(true, bonne, mot);
    showCharacter('good', bonne);
  } else {
    if (game.essais === 0) game.erreurs.push({ mot: mot.texte, bonne: bonne.article, choisie: NATURE_BY_CODE[code].article, codeBonne: q.code, codeChoisi: code, phrase: phraseTexte(PARSED[q.phrase]) });
    game.essais += 1;
    btn.classList.add('wrong');
    btn.disabled = true;
    if (game.essais >= 2) {
      document.querySelector(`.nature-button[data-code="${q.code}"]`).classList.add('correct');
      finishQuestion(false, bonne, mot);
    }
    showCharacter('bad', NATURE_BY_CODE[code]);
  }
}

/* ------------------------------------------------------------
   v15 : JEU 3 — d'abord la nature (boutons verts), puis la fonction (boutons rouges)
   ------------------------------------------------------------ */
const estVerbe = (m) => m.tag === 'VA' || m.tag === 'VE';
/* Le verbe dont dépend le mot : celui qui suit pour un sujet (ou un pronom complément placé devant le verbe :
   « je le vois »), celui qui précède pour un complément. */
function verbeDe(q) {
  const mots = PARSED[q.phrase], i = q.mot;
  const avant = q.fn === 'F.suj' || (q.code === 'Pr' && ['F.cod', 'F.coi', 'F.cos'].includes(q.fn));
  const chercher = (pas) => { for (let k = i + pas; k >= 0 && k < mots.length; k += pas) if (estVerbe(mots[k])) return mots[k].texte; return ''; };
  return (avant ? chercher(1) || chercher(-1) : chercher(-1) || chercher(1)).toLowerCase();
}
/* La question à se poser, écrite avec le verbe de la phrase : « Qui est-ce qui dort ? », « Mange quoi ? »… */
function questionFonction(q) {
  const f = NATURE_BY_CODE[q.fn]; const v = verbeDe(q);
  if (!v || !f.q) return '';
  const mots = PARSED[q.phrase]; let p = '';
  for (let k = q.mot - 1; k >= 0 && !estVerbe(mots[k]); k--) if (mots[k].tag === 'P') { p = mots[k].texte.toLowerCase(); break; }
  return f.q(v, p);
}
function natureFound3(reussi) {
  const q = game.questions[game.index];
  const pn = game.parNature[q.code] || (game.parNature[q.code] = { c: 0, p: 0 });
  pn.p += 1; if (reussi) pn.c += 1;
  game.natureOk = reussi;
  /* les autres natures disparaissent ; la colonne des fonctions apparaît à côté */
  document.querySelectorAll('#nat-nature-column .nature-button').forEach((b) => { b.disabled = true; if (!b.classList.contains('correct')) b.classList.add('gone'); });
  document.querySelectorAll('#nat-nature-column .nature-row').forEach((r) => { if (!r.querySelector('.nature-button:not(.gone)')) r.classList.add('gone'); });
  ['variables', 'invariables'].forEach((g) => { if (!$(`nat-buttons-${g}`).querySelector('.nature-button:not(.gone)')) $(`nat-title-${g}`).classList.add('gone'); });
  game.step = 'fn'; game.essaisFn = 0;
  const codes = FONCTIONS_PAR_NATURE[q.code] || [];
  $('nat-buttons-fonctions').innerHTML = codes.map((c) => `<button type="button" class="nature-button fonction-button" data-code="${c}">${NATURE_BY_CODE[c].court}</button>`).join('');
  $('nat-buttons-fonctions').querySelectorAll('.fonction-button').forEach((b) => b.addEventListener('click', () => answerFn3(b.dataset.code, b)));
  $('nat-fn-column').classList.remove('hidden');
  $('nat-instruction').textContent = 'Et quelle est sa fonction ?';
  $('nat-score-label').textContent = scoreLabel(game.score);
}
function answerNature3(code, btn) {
  if (game.step !== 'nature') return;
  const q = game.questions[game.index];
  const bonne = NATURE_BY_CODE[q.code];
  const mot = PARSED[q.phrase][q.mot];
  if (code === q.code) {
    if (game.essais === 0) game.score += 0.5;
    btn.classList.add('correct');
    natureFound3(game.essais === 0);
    showCharacter('good', bonne);
  } else {
    if (game.essais === 0) game.erreurs.push({ mot: motTexte(q), bonne: bonne.article, choisie: NATURE_BY_CODE[code].article, codeBonne: q.code, codeChoisi: code, phrase: phraseTexte(PARSED[q.phrase]), etape: 'nature' });
    game.essais += 1;
    btn.classList.add('wrong');
    btn.disabled = true;
    if (game.essais >= 2) {
      document.querySelector(`#nat-nature-column .nature-button[data-code="${q.code}"]`).classList.add('correct');
      natureFound3(false);
    }
    showCharacter('bad', NATURE_BY_CODE[code]);
  }
}
function answerFn3(code, btn) {
  if (game.fini || game.step !== 'fn') return;
  const q = game.questions[game.index];
  const bonne = NATURE_BY_CODE[q.fn];
  const mot = PARSED[q.phrase][q.mot];
  if (code === q.fn) {
    if (game.essaisFn === 0) game.score += 0.5;
    btn.classList.add('correct');
    finishQuestion3(game.essaisFn === 0);
    showCharacter('good', bonne);
  } else {
    if (game.essaisFn === 0) game.erreurs.push({ mot: motTexte(q), bonne: bonne.article, choisie: NATURE_BY_CODE[code].article, codeBonne: q.fn, codeChoisi: code, phrase: phraseTexte(PARSED[q.phrase]), etape: 'fonction' });
    game.essaisFn += 1;
    btn.classList.add('wrong');
    btn.disabled = true;
    if (game.essaisFn >= 2) {
      document.querySelector(`.fonction-button[data-code="${q.fn}"]`).classList.add('correct');
      finishQuestion3(false);
    }
    showCharacter('bad', NATURE_BY_CODE[code]);
  }
}
function finishQuestion3(reussi) {
  const q = game.questions[game.index];
  const nature = NATURE_BY_CODE[q.code], f = NATURE_BY_CODE[q.fn], mot = { texte: motTexte(q) };
  const pn = game.parNature[q.fn] || (game.parNature[q.fn] = { c: 0, p: 0 });
  pn.p += 1; if (reussi) pn.c += 1;
  game.step = 'fini';
  document.querySelectorAll('.fonction-button').forEach((b) => {
    b.disabled = true;
    if (!b.classList.contains('correct') && !b.classList.contains('wrong')) b.classList.add('faded');
  });
  document.querySelectorAll('.sentence .w.target').forEach((w) => w.classList.add('found'));
  const quest = questionFonction(q);
  const rich = (t) => esc(t).replace(/\*([^*]+)\*/g, '<em>$1</em>');
  $('nat-correction-details').innerHTML = nbspFr(`« <strong>${mot.texte}</strong> » est ${nature.article}. Sa fonction : <strong class="fn-red">${esc(f.nom.charAt(0).toLowerCase() + f.nom.slice(1))}</strong>.`
    + (quest ? `<br>La question à se poser : « ${esc(quest)} »` : '')
    + `<br><span class="formule">${esc(f.exemples)}</span><br>${f.explicationHtml || rich(f.explication)}`);
  $('nat-correction').classList.remove('hidden');
  const tout = reussi && game.natureOk, rien = !reussi && !game.natureOk;
  $('nat-verdict-square').className = `verdict-square ${tout ? 'correct' : rien ? 'wrong' : 'half'}`;
  $('nat-next-button').textContent = game.index + 1 < game.questions.length ? 'Suivant →' : 'Voir mon résultat →';
  $('nat-score-label').textContent = scoreLabel(game.score);
  $('nat-progress-bar').style.width = `${((game.index + 1) / game.questions.length) * 100}%`;
}

/* ------------------------------------------------------------
   v20 : JEU 4 — LE GROUPE NOMINAL (version simplifiée)
   Une phrase = un seul groupe nominal à analyser, autour d'un seul nom commun ou d'un seul pronom
   (un autre nom ne peut s'y trouver que comme complément du nom). Les boutons apparaissent l'un après l'autre :
   1. « Nom commun » et « Pronom » : on clique dans la phrase sur le nom (ou le pronom) ;
   2. « Déterminant » : on clique sur son déterminant ; puis la barre des déterminants : sa sorte exacte
      (pour un pronom : directement la barre des pronoms) ;
   3. « Adjectif qualificatif » : on clique sur l'adjectif (ou « Il n'y en a pas »), puis sa fonction :
      épithète, attribut ou apposé ;
   4. « Complément du nom » : on clique dessus (ou « Il n'y en a pas »).
   Notation des phrases : l'adjectif porte sa fonction (=epi, =att, =app) ; le nom du complément du nom porte =cdn.
   ------------------------------------------------------------ */
const PHRASES_GN = [
  /* v24 : seulement des groupes nominaux, sans verbe ; « (…) » montre que la phrase continue, mais qu'on ne
     prend que le groupe nominal. Les adjectifs n'y ont que deux fonctions : épithète ou apposé
     (l'attribut reste pour le groupe verbal). */
  'Le/D.def chien/N blanc/A=epi du/D.def=contr voisin/N=cdn (…)',
  'Le/D.def chien/N blanc/A=epi de/P mon/D.pos voisin/N=cdn proche/A=epi (…)',
  'Le/D.def jouet/N de/P la/D.def petite/A=epi fille/N=cdn (…)',
  'La/D.def voiture/N rouge/A=epi de/P mon/D.pos oncle/N=cdn (…)',
  '(…) ce/D.dem joli/A=epi chat/N noir/A=epi',
  'Mon/D.pos vélo/N rouge/A=epi (…)',
  'La/D.def maison/N de/P ma/D.pos grand-mère/N=cdn (…)',
  'Fatigué/A=app , le/D.def lion/N (…)',
  'Une/D.ind petite/A=epi souris/N grise/A=epi (…)',
  'Le/D.def jardin/N fleuri/A=epi de/P Léa/NP=cdn (…)',
  'Chaque/D.idf élève/N (…)',
  'Quel/D.int bruit/N étrange/A=epi (…)',
  'Trois/D.num petits/A=epi canards/N (…)',
  'Plusieurs/D.idf oiseaux/N du/D.def=contr jardin/N=cdn voisin/A=epi (…)',
  'Cette/D.dem robe/N de/P soie/N=cdn (…)',
  'Le/D.def cheval/N , rapide/A=app , (…)',
  'Notre/D.pos voiture/N neuve/A=epi (…)',
  'Un/D.ind verre/N de/P lait/N=cdn (…)',
  'Ces/D.dem fleurs/N fragiles/A=epi (…)',
  'Joyeux/A=app , le/D.def bébé/N (…)',
  'Quelques/D.idf feuilles/N jaunes/A=epi (…)',
  'Deux/D.num chats/N du/D.def=contr voisin/N=cdn (…)',
  '(…) la/D.def grande/A=epi tour/N de/P Paris/NP=cdn',
  'Ta/D.pos sœur/N , heureuse/A=app , (…)',
  'Leur/D.pos vieux/A=epi chien/N (…)',
  'Quelle/D.int belle/A=epi histoire/N (…)',
  'Cinq/D.num ballons/N rouges/A=epi (…)',
  /* un seul pronom */
  'Fatiguée/A=app , elle/Pr.per (…)',
  'Joyeux/A=app , il/Pr.per (…)',
  'Chacun/Pr.idf (…)',
  'Celle-ci/Pr.dem (…)',
  'Le_mien/Pr.pos (…)',
  'Les_deux/Pr.num (…)',
];
const PARSED_GN = PHRASES_GN.map(parsePhrase);
const motsDe = (q) => (q && q.tab ? TABLEAUX[q.t].map((c) => ({ texte: c.t, tag: c.nat })) : q && q.gn ? PARSED_GN[q.phrase] : q && q.gv ? PARSED_GV[q.phrase] : PARSED[q.phrase]);
/* v23 : jeu 4, d'après les consignes de Stéphane.
   Les mots gardent leur couleur. À droite, des BOUTONS CONSIGNES apparaissent l'un après l'autre (vert pour une
   question de nature, rouge pour une question de fonction). On répond en appuyant sur le mot dans la phrase, ou sur
   les cases de la consigne. Chaque réponse se pose sous le mot, dans un CARRÉ VERT (nature) ou un CARRÉ ROUGE
   (fonction) : l'adjectif garde son carré vert « adjectif qualificatif », et sa fonction (épithète…) vient dans un
   carré rouge en dessous ; le complément du nom a son carré vert (sa nature) au-dessus du carré rouge (sa fonction).
   C'est pour que l'enfant ne confonde plus nature et fonction.
   1. « Appuie sur le nom commun (ou le pronom) dans ce groupe nominal. »
   2. « Appuie maintenant sur le déterminant. » puis « Quelle est la nature précise de ce déterminant ? »
      (pour un pronom : « Quelle est la nature précise de ce pronom ? »)
   3. « Le nom est-il décrit par un adjectif qualificatif ? » oui / non ; si oui : on appuie sur l'adjectif, puis
      « Quelle est la fonction de cet adjectif qualificatif ? » (et l'on redemande s'il y en a un autre)
   4. « Y a-t-il un complément du nom ? » oui / non ; si oui : on appuie dessus, puis « Quelle est la nature du
      complément du nom ? » */
/* v26 : un groupe nominal peut en contenir un autre : dans « le chien blanc du voisin », le complément du nom
   « voisin » a lui-même son groupe (son déterminant « du », article défini contracté = de + le ; ses adjectifs ;
   son complément du nom). On analyse donc le groupe du nom principal, puis celui du nom complément.
   Chaque adjectif se rattache au nom le plus proche. */
function analyseGN(mots) {
  const estTete = (m) => m.tag === 'N' || m.tag === 'NP' || /^Pr\./.test(m.tag);
  const tetes = mots.map((m, i) => (estTete(m) ? i : -1)).filter((i) => i >= 0);
  const procheDe = (i) => tetes.reduce((best, h) => (Math.abs(h - i) < Math.abs(best - i) ? h : best), tetes[0]);
  const groupe = (h) => {
    const g = { t: h, pronom: /^Pr\./.test(mots[h].tag), d: null, dType: '', contr: false, adj: [], cdn: null };
    if (!g.pronom) {
      let k = h - 1; while (k >= 0 && mots[k].tag === 'A') k--;
      if (k >= 0 && /^D\./.test(mots[k].tag)) { g.d = k; g.dType = mots[k].tag; g.contr = mots[k].fn === 'contr'; }
    }
    mots.forEach((m, i) => { if (m.tag === 'A' && m.fn && procheDe(i) === h) g.adj.push(i); });
    return g;
  };
  const t = tetes.find((i) => mots[i].fn !== 'cdn');
  const g1 = groupe(t);
  const groupes = [g1];
  const c = tetes.find((i) => mots[i].fn === 'cdn');
  if (c !== undefined) {
    const g2 = groupe(c);
    /* le complément du nom : (de) (déterminant) (adjectifs de ce nom) nom (adjectifs de ce nom) */
    let debut = c;
    while (debut > 0 && mots[debut - 1].tag === 'A' && procheDe(debut - 1) === c) debut--;
    if (debut > 0 && /^D\./.test(mots[debut - 1].tag)) debut--;
    if (debut > 0 && mots[debut - 1].tag === 'P') debut--;
    const fin = Math.max(c, ...g2.adj);
    g1.cdn = { debut, fin, tete: c };
    groupes.push(g2);
  }
  g1.groupes = groupes;
  return g1;
}
const ADJ_FN = { epi: 'F.epi', att: 'F.att', app: 'F.app' };
const natBase = (tag) => (tag === 'N' ? 'N' : tag === 'NP' ? 'NP' : /^Pr\./.test(tag) ? 'Pr' : tag);
function buildQuestionsGN() {
  const n = PARSED_GN.map((m, i) => i);
  /* environ un pronom pour trois noms, et des phrases toutes différentes */
  const noms = shuffle(n.filter((i) => !analyseGN(PARSED_GN[i]).pronom)), prons = shuffle(n.filter((i) => analyseGN(PARSED_GN[i]).pronom));
  const nbP = Math.min(prons.length, Math.round(nbQuestions() / 4));
  const choix = shuffle(prons.slice(0, nbP).concat(noms.slice(0, nbQuestions() - nbP)));
  return choix.map((p) => ({ gn: true, phrase: p, g: analyseGN(PARSED_GN[p]) }));
}
const gnState = { etape: 'nom', essais: 0, reussies: 0, total: 0, adjFaits: new Set(), courant: null, cartes: [] };
function wordEl(i) { return document.querySelector(`#nat-sentence .w[data-i="${i}"]`); }
/* un carré de réponse sous le mot : vert (nature) ou rouge (fonction) ; « avant » le place au-dessus des autres */
function carre(i, texte, rouge, avant) {
  const el = wordEl(i); if (!el) return;
  let labs = el.querySelector('.labs');
  if (!labs) { labs = document.createElement('span'); labs.className = 'labs'; el.appendChild(labs); }
  const c = document.createElement('span'); c.className = `lab${rouge ? ' rouge' : ''}`; c.innerHTML = texte;
  if (avant) labs.prepend(c); else labs.appendChild(c);
}
function showQuestionGN() {
  const q = game.questions[game.index];
  q.gs = q.gs || q.g.groupes; q.g = q.gs[0];
  $('nat-sentence').innerHTML = phraseHtml(motsDe(q), -1);
  $('nat-character-stage').innerHTML = '';
  $('nat-correction').classList.add('hidden');
  $('nat-verdict-square').className = 'verdict-square';
  $('nat-instruction').textContent = 'Analyse le groupe nominal';
  $('nat-fn-column').classList.add('hidden'); $('nat-nature-column').classList.remove('hidden');
  $('nat-buttons-invariables').innerHTML = '';
  Object.assign(gnState, { etape: 'nom', essais: 0, reussies: 0, total: 0, adjFaits: new Set(), courant: null, cartes: [] });
  updateProgress();
  gnEtape();
}
/* Les cartes-consignes de l'étape : chaque sujet (nom, déterminant, adjectif, complément du nom) a ses cartes,
   qui s'empilent ; quand le sujet est fini, elles disparaissent et la consigne suivante arrive. */
/* v25 : les consignes et les fonctions nomment le mot précis du groupe nominal (« le nom souris »,
   « épithète du nom souris ») : la fonction de l'adjectif ou du complément se rapporte toujours à un nom. */
const motGN = (q, i) => { const m = motsDe(q)[i]; return m.tag === 'NP' ? m.texte : m.texte.toLowerCase(); };
const teteGN = (q) => `${q.g.pronom ? 'le pronom' : 'le nom'} « ${motGN(q, q.g.t)} »`;
const teteCourte = (q) => `${q.g.pronom ? 'pronom' : 'nom'} ${motGN(q, q.g.t)}`;
/* « épithète du nom souris », « apposé au nom lion », « complément du nom chien » */
const fonctionPrecise = (q, code) => (code === 'F.epi' ? `épithète du ${teteCourte(q)}` : code === 'F.app' ? `apposé au ${teteCourte(q)}` : `complément du ${teteCourte(q)}`);
const CARTES = {
  /* quand le groupe a un complément du nom, il y a deux noms : on demande le nom principal (« chien », pas « voisin ») */
  nom: (q) => ({ vert: true, texte: q.g.pronom ? 'Appuie sur le pronom dans ce groupe nominal.' : q.g.cdn ? 'Appuie sur le nom commun principal de ce groupe nominal.' : 'Appuie sur le nom commun dans ce groupe nominal.' }),
  det: (q) => ({ vert: true, texte: `Appuie maintenant sur le déterminant du nom « ${motGN(q, q.g.t)} ».` }),
  /* le groupe du nom complément : on demande d'abord s'il a un déterminant (« de lait » n'en a pas) */
  detq: (q) => ({ vert: true, texte: `Passons au groupe du nom « ${motGN(q, q.g.t)} ». Le nom « ${motGN(q, q.g.t)} » a-t-il un déterminant ?`, choix: ['oui', 'non'] }),
  detnat: (q) => ({ vert: true, texte: `Quelle est la nature précise du déterminant « ${motGN(q, q.g.d)} » ?`, choix: ['D.def', 'D.ind', 'D.pos', 'D.dem', 'D.num', 'D.idf', 'D.int'], petits: true }),
  prnat: (q) => ({ vert: true, texte: `Quelle est la nature précise du pronom « ${motGN(q, q.g.t)} » ?`, choix: ['Pr.per', 'Pr.rel', 'Pr.pos', 'Pr.dem', 'Pr.num', 'Pr.idf', 'Pr.int'], petits: true }),
  adjq: (q) => ({ vert: true, texte: `Dans ce groupe nominal, ${teteGN(q)} est-il décrit par ${gnState.adjFaits.size ? 'un autre' : 'un'} adjectif qualificatif ?`, choix: ['oui', 'non'] }),
  adj: (q) => ({ vert: true, texte: `Appuie sur l'adjectif qualificatif qui décrit ${teteGN(q)}.` }),
  adjfn: (q) => ({ vert: false, texte: `Quelle est la fonction de l'adjectif qualificatif « ${motGN(q, gnState.courant)} » ?`, choix: ['F.epi', 'F.app'] }),
  cdnq: (q) => ({ vert: false, texte: `Dans ce groupe nominal, ${teteGN(q)} est-il décrit par un mot qui a la fonction complément du nom ?`, choix: ['oui', 'non'] }),
  cdn: (q) => ({ vert: false, texte: `Appuie sur le complément du nom « ${motGN(q, q.g.t)} ».` }),
  cdnnat: (q) => ({ vert: true, texte: `Quelle est la nature du mot « ${motGN(q, q.g.cdn.tete)} », complément du nom « ${motGN(q, q.g.t)} » ?`, choix: ['N', 'NP', 'Pr'] }),
};
const LIB = { oui: 'Oui', non: 'Non', 'F.att': 'Attribut' };
function gnEtape(nouveauSujet) {
  const q = game.questions[game.index];
  if (nouveauSujet) gnState.cartes = [];
  /* la carte garde le texte qu'elle avait quand elle est apparue (« un adjectif », puis plus tard « un autre ») */
  gnState.cartes.push((isG5() ? CARTES_TAB : isG3() ? CARTES_GV : CARTES)[gnState.etape](q));
  const html = gnState.cartes.map((c, n) => {
    const actif = n === gnState.cartes.length - 1;
    const texteBouton = (code) => (c.labels && c.labels[code]) || (code === 'F.epi' || code === 'F.app' ? capitalize(fonctionPrecise(q, code)) : LIB[code] || (c.petits ? NATURE_BY_CODE[code].court : NATURE_BY_CODE[code].nom));
    const bouton = (code) => `<button type="button" class="nature-button${c.petits ? ' small' : ''}${c.vert ? '' : ' fonction-button'}" data-gn="${code}">${texteBouton(code)}</button>`;
    const choix = c.choix && actif ? (c.petits ? `<div class="nature-row nature-row-7">${c.choix.map(bouton).join('')}</div>` : `<div class="carte-choix carte-choix-${c.une ? 1 : c.choix.length}">${c.choix.map(bouton).join('')}</div>`) : '';
    return `<div class="carte ${c.vert ? 'verte' : 'rouge'}${actif ? ' active' : ' faite'}"><p>${c.texte}</p>${choix}</div>`;
  }).join('');
  $('nat-buttons-variables').innerHTML = html;
  document.querySelectorAll('[data-gn]').forEach((b) => b.addEventListener('click', () => (isG5() ? answerBoutonTab : isG3() ? answerBoutonGV : answerBoutonGN)(b.dataset.gn, b)));
}
function gnErreur(el, attendu, choisi) {
  const q = game.questions[game.index];
  if (gnState.essais === 0) game.erreurs.push(el ? { mot: choisi.texte, bonne: choisi.article, choisie: attendu, phrase: phraseTexte(motsDe(q)), etape: gnState.etape }
    : { mot: choisi.texte, bonne: attendu, choisie: choisi.article, phrase: phraseTexte(motsDe(q)), etape: gnState.etape });
  gnState.essais += 1;
  if (el && el.classList) { el.classList.remove('gn-err'); void el.offsetWidth; el.classList.add('gn-err'); }
  showCharacter('bad', null);
  return gnState.essais >= 2;
}
function gnCompte(c) {
  /* le bilan ne retient que les natures et les fonctions (pas les questions oui / non) */
  if (NATURE_BY_CODE[c]) { const pn = game.parNature[c] || (game.parNature[c] = { c: 0, p: 0 }); pn.p += 1; if (gnState.essais === 0) pn.c += 1; }
  gnState.total += 1; if (gnState.essais === 0) gnState.reussies += 1;
  gnState.essais = 0;
}
/* « meme » : la nouvelle carte s'ajoute sous les précédentes du même sujet ; sinon on repart d'une pile vide */
function gnVers(etape, meme) { gnState.etape = etape; if (etape === 'fini') (isG5() ? finishQuestionTab : isG3() ? finishQuestionGV : finishQuestionGN)(); else gnEtape(!meme); }
const natOf = (m) => NATURE_BY_CODE[m.tag] || NATURE_BY_CODE[m.tag.split('.')[0]] || { article: m.texte };
const NOM_COURT = (code) => (NATURE_BY_CODE[code].court || NATURE_BY_CODE[code].nom).replace(/&shy;/g, '').toLowerCase();
function clicMotGN(i, el) {
  if (game.fini) return;
  const q = game.questions[game.index], mots = motsDe(q), g = q.g, e = gnState.etape;
  const choisi = { texte: mots[i].texte, article: natOf(mots[i]).article };
  if (e === 'nom') {
    if (g.cdn && i >= g.cdn.debut && i <= g.cdn.fin) choisi.article += ', dans le complément du nom';
    if (i === g.t || gnErreur(el, g.pronom ? 'le pronom' : 'le nom principal du groupe nominal', choisi)) {
      gnCompte(g.pronom ? 'Pr' : 'N'); carre(g.t, g.pronom ? 'pronom' : 'nom<br>commun');
      if (g.pronom) gnVers('prnat', true); else gnVers(g.d !== null ? 'det' : 'adjq');
    }
  } else if (e === 'det') {
    if (i === g.d || gnErreur(el, 'le déterminant', choisi)) { gnCompte('D'); carre(g.d, 'déterminant'); gnVers('detnat', true); }
  } else if (e === 'adj') {
    const restants = g.adj.filter((k) => !gnState.adjFaits.has(k));
    let pris = restants.includes(i) ? i : null;
    if (pris === null && gnErreur(el, 'un adjectif qualificatif', choisi)) pris = restants[0];
    if (pris === null || pris === undefined) return;
    gnCompte('A'); gnState.adjFaits.add(pris); gnState.courant = pris; carre(pris, 'adjectif<br>qualificatif'); gnVers('adjfn', true);
  } else if (e === 'cdn') {
    if ((i >= g.cdn.debut && i <= g.cdn.fin) || gnErreur(el, 'le complément du nom', choisi)) {
      gnCompte('F.cdn'); carre(g.cdn.tete, `complément<br>du ${teteCourte(q)}`, true);
      for (let k = g.cdn.debut; k <= g.cdn.fin; k++) wordEl(k)?.classList.add('gn-groupe');
      gnVers('cdnnat', true);
    }
  } else {
    /* la réponse se donne sur les cases de la consigne */
    const a = document.querySelector('.carte.active'); if (a) { a.classList.remove('gn-flash'); void a.offsetWidth; a.classList.add('gn-flash'); }
  }
}
function answerBoutonGN(code, btn) {
  if (game.fini) return;
  const q = game.questions[game.index], mots = motsDe(q), g = q.g, e = gnState.etape;
  const faux = (attendu, choisiArticle, mot) => { btn.classList.add('wrong'); btn.disabled = true; return gnErreur(null, attendu, { texte: mot, article: choisiArticle }); };
  const montrer = (c) => document.querySelector(`.carte.active [data-gn="${c}"]`)?.classList.add('correct');
  const restants = g.adj.filter((k) => !gnState.adjFaits.has(k));
  const suite = (f) => setTimeout(f, 600);
  if (e === 'detnat' || e === 'prnat' || e === 'adjfn' || e === 'cdnnat') {
    const k = e === 'detnat' ? g.d : e === 'prnat' ? g.t : e === 'adjfn' ? gnState.courant : g.cdn.tete;
    const bon = e === 'adjfn' ? ADJ_FN[mots[k].fn] : e === 'cdnnat' ? natBase(mots[k].tag) : mots[k].tag;
    if (code !== bon && !faux(NATURE_BY_CODE[bon].article, NATURE_BY_CODE[code].article, mots[k].texte)) return;
    if (code === bon) btn.classList.add('correct'); else montrer(bon);
    gnCompte(bon);
    if (e === 'detnat') { wordEl(k).querySelector('.lab').innerHTML = `déterminant<br>${NOM_COURT(bon)}${g.contr ? '<br>contracté' : ''}`; suite(() => gnVers('adjq')); }
    else if (e === 'prnat') { wordEl(k).querySelector('.lab').innerHTML = `pronom<br>${NOM_COURT(bon)}`; suite(() => gnVers('adjq')); }
    else if (e === 'adjfn') { carre(k, fonctionPrecise(q, bon).replace(/ (du|au) /, '<br>$1 '), true); suite(() => gnVers('adjq')); }
    else { carre(k, NATURE_BY_CODE[bon].nom.toLowerCase().replace(' ', '<br>'), false, true); suite(() => finGroupe(q)); }
    return;
  }
  if (e === 'adjq') {
    const juste = (code === 'oui') === (restants.length > 0);
    if (!juste && !faux(restants.length ? 'oui, il y a un adjectif qualificatif' : 'non, il n\'y a pas d\'adjectif qualificatif', code, '—')) return;
    gnCompte('A?');
    if (restants.length) suite(() => gnVers('adj', true)); else suite(() => gnVers('cdnq'));
    return;
  }
  if (e === 'cdnq') {
    const juste = (code === 'oui') === !!g.cdn;
    if (!juste && !faux(g.cdn ? 'oui, il y a un complément du nom' : 'non, il n\'y a pas de complément du nom', code, '—')) return;
    gnCompte('F.cdn?');
    suite(() => (g.cdn ? gnVers('cdn', true) : finGroupe(q)));
    return;
  }
  if (e === 'detq') {
    const juste = (code === 'oui') === (g.d !== null);
    if (!juste && !faux(g.d !== null ? 'oui, il y a un déterminant' : 'non, il n\'y a pas de déterminant', code, '—')) return;
    gnCompte('D?');
    suite(() => (g.d !== null ? gnVers('det', true) : gnVers('adjq')));
  }
}
/* fin d'un groupe : s'il y a un groupe suivant (celui du nom complément), on l'analyse à son tour */
function finGroupe(q) {
  const tous = q.gs;
  const n = tous.indexOf(q.g);
  if (n + 1 < tous.length) { q.g = tous[n + 1]; gnState.adjFaits = new Set(); gnVers('detq'); return; }
  gnVers('fini');
}
/* v25 : le bilan de chaque groupe nominal est un petit discours qui s'enchaîne (c'est aussi ce que dit la voix) :
   « Tu as bien analysé le groupe nominal du nom souris. Le nom souris est d'abord précisé par un déterminant,
   un article indéfini, « une », qui n'a pas de fonction. Ensuite, il est décrit par deux adjectifs qualificatifs
   qui ont la fonction épithète : le premier est « petite », le second est « grise ». » */
function resumeGN(q, html) {
  const mots = motsDe(q), tous = q.gs || q.g.groupes || [q.g];
  const B = (x) => (html ? `<strong>${esc(x)}</strong>` : x);
  const mw = (i) => { const m = mots[i]; return m.tag === 'NP' ? m.texte : m.texte.toLowerCase(); };
  const mot = (i) => `« ${B(mw(i))} »`;
  const nomDe = (g) => `${g.pronom ? 'pronom' : mots[g.t].tag === 'NP' ? 'nom propre' : 'nom'} ${B(mw(g.t))}`;
  const nombres = ['', 'un', 'deux', 'trois', 'quatre'];
  const rangs = ['le premier', 'le second', 'le troisième'];
  const phr = [`Tu as bien analysé le groupe nominal du ${nomDe(tous[0])}.`];
  tous.forEach((g, n) => {
    const tete = nomDe(g);
    const debut = n === 0 ? `Le ${tete}` : `Le ${tete} a lui aussi son groupe : il`;
    let dejaSujet = false;
    if (g.pronom) { phr.push(`Le ${tete} est ${NATURE_BY_CODE[mots[g.t].tag].article}.`); dejaSujet = true; }
    else if (g.d !== null) {
      const nd = NATURE_BY_CODE[g.dType].nom.toLowerCase() + (g.contr ? ' contracté' : '');
      const det = /^déterminant/.test(nd) ? `le ${nd}` : `un déterminant, l'${nd}`;
      phr.push(`${debut} est ${n === 0 ? 'd\'abord ' : ''}précisé par ${det} ${mot(g.d)}${g.contr ? ` (${mw(g.d)} = de + le)` : ''}, qui n'a pas de fonction.`);
      dejaSujet = true;
    }
    const il = dejaSujet ? (n === 0 ? 'Ensuite, il' : 'Il') : (n === 0 ? 'Il' : `Le ${tete} n'a pas de déterminant ; il`);
    if (!g.adj.length) phr.push(`${il} n'est décrit par aucun adjectif qualificatif.`);
    else {
      const fns = [...new Set(g.adj.map((i) => mots[i].fn))];
      if (fns.length === 1) {
        const fn = NATURE_BY_CODE[ADJ_FN[fns[0]]].nom.toLowerCase(), k = g.adj.length;
        if (k === 1) phr.push(`${il} est décrit par un adjectif qualificatif qui a la fonction ${fn} : ${mot(g.adj[0])}.`);
        else phr.push(`${il} est décrit par ${nombres[k] || k} adjectifs qualificatifs qui ont la fonction ${fn} : ${g.adj.map((i, r) => `${rangs[r] || 'puis'} est ${mot(i)}`).join(', ')}.`);
      } else {
        phr.push(`${il} est décrit par ${nombres[g.adj.length]} adjectifs qualificatifs : ${g.adj.map((i) => `${mot(i)}, qui a la fonction ${NATURE_BY_CODE[ADJ_FN[mots[i].fn]].nom.toLowerCase()}`).join(', et ')}.`);
      }
    }
    if (g.cdn) phr.push(`Enfin, il est décrit par le ${NATURE_BY_CODE[mots[g.cdn.tete].tag].nom.toLowerCase()} ${mot(g.cdn.tete)}, qui a la fonction complément du ${tete}.`);
    else phr.push('Il n\'a pas de complément du nom.');
  });
  return phr.join(' ');
}
function finishQuestionGN() {
  const q = game.questions[game.index];
  gnState.etape = 'fini';
  $('nat-buttons-variables').innerHTML = '';
  const part = gnState.total ? gnState.reussies / gnState.total : 1;
  game.score = Math.round((game.score + part) * 100) / 100;
  $('nat-instruction').textContent = 'Le groupe nominal est analysé !';
  $('nat-correction-details').innerHTML = nbspFr(resumeGN(q, true));
  $('nat-correction').classList.remove('hidden');
  $('nat-verdict-square').className = `verdict-square ${part === 1 ? 'correct' : part === 0 ? 'wrong' : 'half'}`;
  $('nat-next-button').textContent = game.index + 1 < game.questions.length ? 'Suivant →' : 'Voir mon résultat →';
  $('nat-score-label').textContent = scoreLabel(game.score);
  $('nat-progress-bar').style.width = `${((game.index + 1) / game.questions.length) * 100}%`;
  showCharacter(part >= 0.5 ? 'good' : 'bad', null);
}

/* ------------------------------------------------------------
   v27 : JEU 3 — LE GROUPE VERBAL, refait comme le jeu 4.
   Une phrase simple, un seul verbe. Les consignes : le verbe et sa nature (action / état) ; « Quel est le sujet du
   verbe ? » (rouge : c'est une fonction) puis sa nature ; « Le verbe a-t-il un COD ? » (ou un attribut du sujet,
   pour un verbe d'état ; puis un COS s'il y a un COD, ou un COI s'il n'y en a pas) ; « a-t-il un complément
   circonstanciel ? », sa sorte (lieu, temps, manière, cause), puis sa nature (nom, pronom, adverbe…).
   Notation : le mot principal de chaque groupe porte sa fonction (=suj, =cod, =coi, =cos, =att, =ccl, =cct, =ccm, =ccc).
   ------------------------------------------------------------ */
const PHRASES_GV = [
  "Je/Pr.per=suj viens/VA aujourd'hui/Av=cct .",
  'Le/D.def chat/N=suj dort/VA sur/P le/D.def canapé/N=ccl .',
  'Léa/NP=suj mange/VA une/D.ind pomme/N=cod .',
  'Mon/D.pos frère/N=suj lit/VA un/D.ind livre/N=cod le/D.def soir/N=cct .',
  'Nous/Pr.per=suj parlons/VA à/P la/D.def maîtresse/N=coi .',
  'Le/D.def ciel/N=suj est/VE bleu/A=att .',
  'Paul/NP=suj semble/VE fatigué/A=att ce/D.dem matin/N=cct .',
  'Les/D.def enfants/N=suj jouent/VA dehors/Av=ccl .',
  'Le/D.def bébé/N=suj pleure/VA de/P faim/N=ccc .',
  'Elle/Pr.per=suj chante/VA joyeusement/Av=ccm .',
  'Le/D.def facteur/N=suj apporte/VA une/D.ind lettre/N=cod à/P Joseph/NP=cos .',
  'Je/Pr.per=suj le/Pr.per=cod vois/VA .',
  'Tu/Pr.per=suj lui/Pr.per=coi parles/VA souvent/Av=cct .',
  'Le/D.def lion/N=suj marche/VA avec/P prudence/N=ccm .',
  'Ma/D.pos sœur/N=suj devient/VE grande/A=att .',
  "L'/D.def éléphant/N=suj est/VE un/D.ind animal/N=att énorme/A .",
  'Les/D.def oiseaux/N=suj chantent/VA dans/P le/D.def jardin/N=ccl .',
  'Hugo/NP=suj pense/VA à/P ses/D.pos vacances/N=coi .',
  'Le/D.def chien/N=suj aboie/VA fort/Av=ccm .',
  'Nous/Pr.per=suj partirons/VA demain/Av=cct .',
  'Le/D.def vent/N=suj souffle/VA fort/Av=ccm ce/D.dem soir/N=cct .',
  'Cette/D.dem maison/N=suj paraît/VE ancienne/A=att .',
  'La/D.def maîtresse/N=suj prête/VA un/D.ind crayon/N=cod à/P Hugo/NP=cos .',
  'Il/Pr.per=suj tremble/VA de/P froid/N=ccc .',
  'Le/D.def train/N=suj arrive/VA à/P la/D.def gare/N=ccl .',
  'Le/D.def boulanger/N=suj fabrique/VA le/D.def pain/N=cod la/D.def nuit/N=cct .',
];
const PARSED_GV = PHRASES_GV.map(parsePhrase);
const INFINITIFS = { est: 'être', semble: 'sembler', devient: 'devenir', paraît: 'paraître', reste: 'rester', viens: 'venir', dort: 'dormir', mange: 'manger', lit: 'lire', parlons: 'parler', jouent: 'jouer', pleure: 'pleurer', chante: 'chanter', apporte: 'apporter', vois: 'voir', parles: 'parler', marche: 'marcher', chantent: 'chanter', pense: 'penser', aboie: 'aboyer', partirons: 'partir', souffle: 'souffler', prête: 'prêter', tremble: 'trembler', arrive: 'arriver', fabrique: 'fabriquer' };
const FN_GV = { suj: 'F.suj', cod: 'F.cod', coi: 'F.coi', cos: 'F.cos', att: 'F.att', ccl: 'F.ccl', cct: 'F.cct', ccm: 'F.ccm', ccc: 'F.ccc' };
const CC_CODES = ['F.ccl', 'F.cct', 'F.ccm', 'F.ccc'];
/* le groupe d'un mot : (petit mot) (déterminant) (adjectifs) mot (adjectifs) */
function plageGV(mots, h) {
  const m = mots[h];
  if (m.tag !== 'N' && m.tag !== 'NP') return { debut: h, fin: h };
  let d = h; while (d > 0 && mots[d - 1].tag === 'A') d--;
  if (d > 0 && /^D\./.test(mots[d - 1].tag)) d--;
  if (d > 0 && mots[d - 1].tag === 'P' && m.fn !== 'suj' && m.fn !== 'cod' && m.fn !== 'att') d--;
  let f = h; while (f + 1 < mots.length && mots[f + 1].tag === 'A' && !mots[f + 1].fn) f++;
  return { debut: d, fin: f };
}
function analyseGV(mots) {
  const v = mots.findIndex((m) => m.tag === 'VA' || m.tag === 'VE');
  const comp = (fn) => mots.map((m, i) => (m.fn === fn ? { i, fn: FN_GV[fn], ...plageGV(mots, i) } : null)).filter(Boolean);
  return {
    v, etat: mots[v].tag === 'VE', suj: comp('suj')[0], cod: comp('cod')[0] || null, coi: comp('coi')[0] || null,
    cos: comp('cos')[0] || null, att: comp('att')[0] || null,
    cc: [...comp('ccl'), ...comp('cct'), ...comp('ccm'), ...comp('ccc')].sort((a, b) => a.i - b.i),
  };
}
function buildQuestionsGV() {
  const idx = shuffle(PARSED_GV.map((m, i) => i)).slice(0, nbQuestions());
  return idx.map((p) => ({ gv: true, phrase: p, a: analyseGV(PARSED_GV[p]) }));
}
const motsGV = (q) => PARSED_GV[q.phrase];
const motV = (q, i) => { const m = motsGV(q)[i]; return m.tag === 'NP' ? m.texte : m.texte.toLowerCase(); };
const verbeV = (q) => `« ${motV(q, q.a.v)} »`;
/* le nom d'une fonction, précis : « COD du verbe mange », « attribut du sujet ciel », « CC de temps du verbe viens » */
const NOM_FN = { 'F.suj': 'sujet', 'F.cod': 'COD', 'F.coi': 'COI', 'F.cos': 'COS', 'F.att': 'attribut du sujet', 'F.ccl': 'CC de lieu', 'F.cct': 'CC de temps', 'F.ccm': 'CC de manière', 'F.ccc': 'CC de cause' };
const fnPreciseV = (q, code) => (code === 'F.att' ? `attribut du sujet ${motV(q, q.a.suj.i)}` : `${NOM_FN[code]} du verbe ${INFINITIFS[motV(q, q.a.v)] || motV(q, q.a.v)}`);
/* ------------------------------------------------------------
   v30 : consignes et bilans du jeu 3 qui montrent la méthode, appliquée à la phrase elle-même
   (« Qui est-ce qui fait l'action de marcher ? », « Où le lion marche-t-il ? »…).
   ------------------------------------------------------------ */
const VERBE3 = { venir: 'vient', dormir: 'dort', manger: 'mange', lire: 'lit', parler: 'parle', jouer: 'joue', pleurer: 'pleure', chanter: 'chante', apporter: 'apporte', voir: 'voit', marcher: 'marche', penser: 'pense', aboyer: 'aboie', partir: 'partira', souffler: 'souffle', prêter: 'prête', trembler: 'tremble', arriver: 'arrive', fabriquer: 'fabrique', être: 'est', sembler: 'semble', devenir: 'devient', paraître: 'paraît' };
const OBJET = 'l\'objet (la personne ou la chose destinataire de l\'action)';
/* les phrases de description : ce que l'attribut apporte au sujet, et ce que précise le complément circonstanciel */
const DESCRIPTIONS = {
  'Le ciel est bleu.': { caract: 'sa couleur bleue' },
  'Paul semble fatigué ce matin.': { caract: 'son aspect fatigué', cc: 'précise que cette fatigue est liée à une circonstance particulière, et qu\'elle pourra évoluer dans la journée' },
  'Ma sœur devient grande.': { caract: 'sa taille, qui grandit' },
  "L'éléphant est un animal énorme.": { caract: 'de dire ce qu\'il est, un animal' },
  'Cette maison paraît ancienne.': { caract: 'son air ancien' },
};
const infV = (q) => INFINITIFS[motV(q, q.a.v)] || motV(q, q.a.v);
/* « l'action de pleurer », « l'action d'apporter » */
const deInf = (inf) => (/^[aeiouéèêh]/i.test(inf) ? `d'${inf}` : `de ${inf}`);
const texteV = (q, c) => { const mots = motsGV(q); const x = mots.slice(c.debut, c.fin + 1).map((m) => m.texte).join(' ').replace(/' /g, "'"); return mots[c.debut].tag === 'NP' ? x : x.charAt(0).toLowerCase() + x.slice(1); };
/* les petits pronoms compléments placés devant le verbe (« lui » dans « tu lui parles ») */
const cliticsV = (q) => [q.a.cod, q.a.coi].filter((c) => c && c.i < q.a.v).map((c) => motV(q, c.i));
/* « le bébé pleure », « je viens », « tu lui parles » */
const sujetVerbe = (q) => [texteV(q, q.a.suj), ...cliticsV(q), motV(q, q.a.v)].join(' ');
const PLURIEL_DET = /^(les|des|ces|mes|tes|ses|nos|vos|leurs)$/i;
function sujetInfos(q) {
  const mots = motsGV(q), s = q.a.suj, m = mots[s.i];
  if (/^Pr\./.test(m.tag)) {
    const p = m.texte.toLowerCase();
    return { pronom: p, tonique: { je: 'moi', tu: 'toi', il: 'lui', elle: 'elle', nous: 'nous', vous: 'vous', ils: 'eux', elles: 'elles' }[p] || p, pluriel: ['nous', 'vous', 'ils', 'elles'].includes(p) };
  }
  const det = s.debut < s.i ? mots[s.debut].texte : '';
  const pluriel = PLURIEL_DET.test(det);
  const fem = /^(la|une|ma|ta|sa|cette)$/i.test(det) || ['Léa'].includes(m.texte);
  return { gn: texteV(q, s), pr: pluriel ? (fem ? 'elles' : 'ils') : fem ? 'elle' : 'il', pluriel };
}
/* « Où le lion marche-t-il ? », « Quand partirons-nous ? », « Où est-ce que je viens ? » */
function questionCirconstance(q, mot) {
  const si = sujetInfos(q), v = motV(q, q.a.v), cl = cliticsV(q).join(' ');
  const suite = q.a.att ? ` ${texteV(q, q.a.att)}` : q.a.cod && q.a.cod.i > q.a.v ? ` ${texteV(q, q.a.cod)}` : '';
  if (si.pronom === 'je') return `${mot} est-ce que ${sujetVerbe(q)}${suite} ?`;
  const t = (p) => (/[ea]$/.test(v) && /^(il|elle|on)$/.test(p) ? '-t-' : '-');
  if (si.pronom) return `${mot} ${cl ? cl + ' ' : ''}${v}${t(si.pronom)}${si.pronom}${suite} ?`;
  return `${mot} ${si.gn} ${cl ? cl + ' ' : ''}${v}${t(si.pr)}${si.pr}${suite} ?`;
}
const MOT_CC = { 'F.ccl': 'Où', 'F.cct': 'Quand', 'F.ccm': 'Comment', 'F.ccc': 'Pourquoi' };
const CARTES_GV = {
  verbe: () => ({ vert: true, texte: 'Dans cette phrase, appuie sur le verbe.' }),
  verbenat: (q) => ({ vert: true, texte: `Quelle est la nature du verbe ${verbeV(q)} ?`, choix: ['VA', 'VE'] }),
  suj: (q) => {
    const inf = infV(q);
    /* v34 : une seule question (« Qui est-ce qui marche ? »), puis « Appuie sur le mot qui a la fonction sujet. » */
    const verbe = [...cliticsV(q), VERBE3[inf] || motV(q, q.a.v)].join(' ');
    if (q.a.etat) return { vert: false, texte: `Cette phrase est une phrase de description. Quel mot a la fonction sujet du verbe « ${inf} » ? Qui est-ce qui ${verbe} ${texteV(q, q.a.att || q.a.suj)} ? Appuie sur le mot qui a la fonction sujet.` };
    return { vert: false, texte: `Cette phrase est une phrase de récit qui raconte un événement. Quel mot a la fonction sujet du verbe « ${inf} » ? Qui est-ce qui ${verbe} ? Appuie sur le mot qui a la fonction sujet.` };
  },
  objq: (q) => {
    const k = gnState.objet, inf = infV(q);
    if (k === 'F.att') return { vert: false, texte: `Le sujet « ${motV(q, q.a.suj.i)} » est-il décrit par un attribut, c'est-à-dire un mot qui lui attribue une caractéristique ?`, choix: ['oui', 'non'] };
    if (k === 'F.cod') return { vert: false, texte: `Le verbe « ${inf} » a-t-il un mot de fonction COD, qui répondrait à la question « ${inf} + quoi ? » et qui désignerait ${OBJET} sur lequel porte l'action ${deInf(inf)} ?`, choix: ['oui', 'non'] };
    if (k === 'F.coi') return { vert: false, texte: `Le verbe « ${inf} » a-t-il un mot de fonction COI, qui répondrait à la question « ${inf} + à qui ? à quoi ? de quoi ? » et qui désignerait ${OBJET} sur lequel porte l'action ${deInf(inf)}, relié au verbe par un petit mot ?`, choix: ['oui', 'non'] };
    return { vert: false, texte: `Le verbe « ${inf} » a-t-il aussi un mot de fonction COS, qui répondrait à la question « ${inf} quelque chose + à qui ? à quoi ? de qui ? de quoi ? » et qui désignerait un second objet (la personne ou la chose destinataire de l'action) ?`, choix: ['oui', 'non'] };
  },
  obj: (q) => ({ vert: false, texte: gnState.objet === 'F.att' ? `Appuie sur l'attribut du sujet « ${motV(q, q.a.suj.i)} ».` : `Appuie sur le ${NOM_FN[gnState.objet]} du verbe « ${infV(q)} ».` }),
  ccq: (q) => ({ vert: false, texte: `Dans cette phrase, donne-t-on ${gnState.ccFaits.size ? 'd\'autres circonstances' : 'les circonstances'} de ${q.a.etat ? 'cette description' : 'cet événement'} (où, quand, comment, pourquoi) ?`, choix: ['oui', 'non'] }),
  cc: () => ({ vert: false, texte: 'Appuie sur le mot qui donne cette circonstance : c\'est un complément circonstanciel.' }),
  cctype: (q) => ({
    vert: false, texte: `À quelle question répond « ${texteV(q, gnState.comp)} » ?`, choix: CC_CODES, une: true,
    labels: Object.fromEntries(CC_CODES.map((c) => [c, `${questionCirconstance(q, MOT_CC[c])} (${NOM_FN[c]})`])),
  }),
  nat: (q) => {
    const c = gnState.comp;
    const choix = c.fn === 'F.att' ? ['N', 'NP', 'Pr', 'A'] : CC_CODES.includes(c.fn) ? ['N', 'NP', 'Pr', 'Av'] : ['N', 'NP', 'Pr'];
    const texte = c.fn === 'F.suj' ? `Quelle est la nature du sujet « ${motV(q, c.i)} » ?` : `Quelle est la nature du mot « ${motV(q, c.i)} », ${fnPreciseV(q, c.fn)} ?`;
    return { vert: true, texte, choix, labels: { A: 'Adjectif qualificatif', Av: 'Adverbe' } };
  },
  prnat: (q) => ({ vert: true, texte: `Quel est le type du pronom « ${motV(q, gnState.comp.i)} » ?`, choix: ['Pr.per', 'Pr.rel', 'Pr.pos', 'Pr.dem', 'Pr.num', 'Pr.idf', 'Pr.int'], petits: true }),
};
function showQuestionGV() {
  const q = game.questions[game.index];
  $('nat-sentence').innerHTML = phraseHtml(motsGV(q), -1);
  $('nat-character-stage').innerHTML = '';
  $('nat-correction').classList.add('hidden');
  $('nat-verdict-square').className = 'verdict-square';
  $('nat-instruction').textContent = 'Analyse la phrase';
  $('nat-fn-column').classList.add('hidden'); $('nat-nature-column').classList.remove('hidden');
  $('nat-buttons-invariables').innerHTML = '';
  Object.assign(gnState, { etape: 'verbe', essais: 0, reussies: 0, total: 0, cartes: [], comp: null, objet: null, ccFaits: new Set(), objFait: false });
  updateProgress();
  gnEtape(true);
}
/* après le sujet : les objets (COD, puis COS ou COI ; ou l'attribut pour un verbe d'état), puis les compléments circonstanciels */
function apresSujetGV(q) { gnState.objet = q.a.etat ? 'F.att' : 'F.cod'; gnVers('objq'); }
function apresObjetGV(q) {
  const o = gnState.objet;
  if (o === 'F.cod') { gnState.objet = q.a.cod ? 'F.cos' : 'F.coi'; gnVers('objq'); return; }
  gnVers('ccq');
}
function objetDe(q, code) { return { 'F.cod': q.a.cod, 'F.coi': q.a.coi, 'F.cos': q.a.cos, 'F.att': q.a.att }[code]; }
function poseFonctionGV(q, c) {
  carre(c.i, fnPreciseV(q, c.fn).replace(/ (du|au) /, '<br>$1 '), true);
  for (let k = c.debut; k <= c.fin; k++) if (c.fin > c.debut) wordEl(k)?.classList.add('gn-groupe');
}
function clicMotGV(i, el) {
  if (game.fini) return;
  const q = game.questions[game.index], mots = motsGV(q), a = q.a, e = gnState.etape;
  const choisi = { texte: mots[i].texte, article: natOf(mots[i]).article };
  const dans = (c) => c && i >= c.debut && i <= c.fin;
  if (e === 'verbe') {
    if (i === a.v || gnErreur(el, 'le verbe', choisi)) { gnCompte('V'); carre(a.v, 'verbe'); gnVers('verbenat', true); }
  } else if (e === 'suj') {
    if (dans(a.suj) || gnErreur(el, 'le sujet', choisi)) { gnCompte('F.suj'); gnState.comp = a.suj; poseFonctionGV(q, a.suj); gnVers('nat', true); }
  } else if (e === 'obj') {
    const c = objetDe(q, gnState.objet);
    if (dans(c) || gnErreur(el, NOM_FN[gnState.objet], choisi)) { gnCompte(gnState.objet); gnState.comp = c; poseFonctionGV(q, c); gnVers('nat', true); }
  } else if (e === 'cc') {
    const restants = a.cc.filter((c) => !gnState.ccFaits.has(c.i));
    let c = restants.find(dans) || null;
    if (!c && gnErreur(el, 'un complément circonstanciel', choisi)) c = restants[0];
    if (!c) return;
    gnCompte('CC'); gnState.ccFaits.add(c.i); gnState.comp = c; gnVers('cctype', true);
  } else {
    const act = document.querySelector('.carte.active'); if (act) { act.classList.remove('gn-flash'); void act.offsetWidth; act.classList.add('gn-flash'); }
  }
}
function answerBoutonGV(code, btn) {
  if (game.fini) return;
  const q = game.questions[game.index], mots = motsGV(q), a = q.a, e = gnState.etape;
  const faux = (attendu, choisiArticle, mot) => { btn.classList.add('wrong'); btn.disabled = true; return gnErreur(null, attendu, { texte: mot, article: choisiArticle }); };
  const montrer = (c) => document.querySelector(`.carte.active [data-gn="${c}"]`)?.classList.add('correct');
  const suite = (f) => setTimeout(f, 600);
  const art = (c) => (NATURE_BY_CODE[c] ? NATURE_BY_CODE[c].article : c);
  if (e === 'verbenat') {
    const bon = mots[a.v].tag;
    if (code !== bon && !faux(art(bon), art(code), mots[a.v].texte)) return;
    if (code === bon) btn.classList.add('correct'); else montrer(bon);
    gnCompte(bon); wordEl(a.v).querySelector('.lab').innerHTML = bon === 'VA' ? 'verbe<br>d\'action' : 'verbe<br>d\'état';
    suite(() => gnVers('suj')); return;
  }
  if (e === 'nat' || e === 'prnat') {
    const c = gnState.comp, m = mots[c.i];
    const bon = e === 'prnat' ? m.tag : natBase(m.tag);
    if (code !== bon && !faux(art(bon), art(code), m.texte)) return;
    if (code === bon) btn.classList.add('correct'); else montrer(bon);
    gnCompte(bon);
    if (e === 'nat') carre(c.i, (NATURE_BY_CODE[bon].nom || '').toLowerCase().replace(' ', '<br>'), false, true);
    else wordEl(c.i).querySelector('.lab').innerHTML = `pronom<br>${NOM_COURT(bon)}`;
    if (e === 'nat' && bon === 'Pr') { suite(() => gnVers('prnat', true)); return; }
    suite(() => (c.fn === 'F.suj' ? apresSujetGV(q) : CC_CODES.includes(c.fn) ? gnVers('ccq') : apresObjetGV(q)));
    return;
  }
  if (e === 'cctype') {
    const c = gnState.comp, bon = c.fn;
    if (code !== bon && !faux(`un ${NOM_FN[bon]}`, `un ${NOM_FN[code]}`, mots[c.i].texte)) return;
    if (code === bon) btn.classList.add('correct'); else montrer(bon);
    gnCompte(bon); poseFonctionGV(q, c);
    suite(() => gnVers('nat', true)); return;
  }
  if (e === 'objq') {
    const c = objetDe(q, gnState.objet), juste = (code === 'oui') === !!c;
    if (!juste && !faux(c ? `oui, il y a ${NOM_FN[gnState.objet]}` : `non, pas de ${NOM_FN[gnState.objet]}`, code, '—')) return;
    gnCompte(`${gnState.objet}?`);
    suite(() => (c ? gnVers('obj', true) : apresObjetGV(q))); return;
  }
  if (e === 'ccq') {
    const restants = a.cc.filter((c) => !gnState.ccFaits.has(c.i)), juste = (code === 'oui') === (restants.length > 0);
    if (!juste && !faux(restants.length ? 'oui, il y a un complément circonstanciel' : 'non, il n\'y en a pas', code, '—')) return;
    gnCompte('CC?');
    suite(() => (restants.length ? gnVers('cc', true) : gnVers('fini')));
  }
}
/* le bilan, en petit discours : « Le verbe « viens » est un verbe d'action. Son sujet est « je », un pronom personnel… » */
/* v29 : deux sortes de bilan.
   - verbe d'état → phrase de DESCRIPTION : le sujet est ce que l'on décrit ; l'attribut lui « attribue » (lui donne)
     une qualité ;
   - verbe d'action → phrase de RÉCIT : elle raconte un événement ; le sujet en est l'acteur ; l'action porte sur un
     objet (COD, COI, COS) ; les compléments circonstanciels disent où, quand, comment, pourquoi. */
function resumeGV(q, html) {
  const mots = motsGV(q), a = q.a;
  const B = (x) => (html ? `<strong>${esc(x)}</strong>` : x);
  const g = (x) => `« ${B(x)} »`;
  const natArt = (i) => { const m = mots[i]; return (NATURE_BY_CODE[m.tag] || NATURE_BY_CODE[natBase(m.tag)]).article; };
  const natNom = (i) => { const m = mots[i]; return (NATURE_BY_CODE[m.tag] || NATURE_BY_CODE[natBase(m.tag)]).nom.toLowerCase(); };
  /* « une pomme », dont le mot principal est le nom commun « pomme » ; « aujourd'hui », un adverbe */
  const groupe = (c) => (c.fin > c.debut ? `${g(texteV(q, c))}, dont le mot principal est ${natArt(c.i).replace(/^une? /, 'le ')} ${g(motV(q, c.i))}` : `${g(texteV(q, c))}, ${natArt(c.i)}`);
  const inf = infV(q), sv = sujetVerbe(q), si = sujetInfos(q);
  const POUR = { 'F.ccl': 'où', 'F.cct': 'quand', 'F.ccm': 'comment', 'F.ccc': 'pourquoi' };
  const cap = (x) => x.charAt(0).toUpperCase() + x.slice(1);
  if (a.etat) {
    const meta = DESCRIPTIONS[phraseTexte(mots)] || {};
    const sujetGN = texteV(q, a.suj);
    const aGN = (x) => (/^le /.test(x) ? 'au ' + x.slice(3) : /^les /.test(x) ? 'aux ' + x.slice(4) : 'à ' + x);
    const d = [`Tu as bien analysé cette phrase de description. Elle permet, grâce à un verbe d'état, le verbe ${g(inf)}, de décrire ${B(sujetGN)}.`];
    if (a.att) {
      const adj = mots[a.att.i].tag === 'A';
      /* un nom attribut : on parle du nom lui-même (« animal ») ; les autres mots de son groupe seront vus au jeu 4 */
      const outil = adj ? `à l'adjectif qualificatif ${g(texteV(q, a.att))}` : `au ${natNom(a.att.i)} ${g(motV(q, a.att.i))}`;
      d.push(`Le ${natNom(a.suj.i)} ${g(motV(q, a.suj.i))} est décrit grâce ${outil}, qui permet d'attribuer une caractéristique ${aGN(sujetGN)}${meta.caract ? `, ${meta.caract}` : ''} : d'où sa fonction d'attribut du sujet.`);
      const autres = [];
      for (let k = a.att.debut; k <= a.att.fin; k++) if (k !== a.att.i) autres.push(g(motV(q, k)));
      if (!adj && autres.length) d.push(`(${autres.length > 1 ? `Les mots ${autres.slice(0, -1).join(', ')} et ${autres[autres.length - 1]} font` : `Le mot ${autres[0]} fait`} partie du groupe nominal du mot ${g(motV(q, a.att.i))} : nous verrons comment les analyser dans l'exercice suivant.)`);
    }
    a.cc.forEach((c) => d.push(`${cap(natArt(c.i).replace(/^une? /, 'le '))} ${g(motV(q, c.i))}, avec la fonction complément circonstanciel ${NOM_FN[c.fn].replace('CC ', '')}, ${meta.cc || `précise ${POUR[c.fn]} cette description est vraie`}.`));
    return d.join(' ');
  }
  const r = [`Tu as bien analysé cette phrase de récit. Elle raconte un événement. Le verbe ${g(inf)} est un verbe d'action. Il dit ce qui se passe, c'est-à-dire que quelqu'un ${VERBE3[inf] || motV(q, a.v)}.`];
  const acteur = si.pronom ? si.tonique : si.gn;
  const faire = si.pronom === 'je' || si.pronom === 'tu' ? 'fais' : si.pronom === 'nous' ? 'faisons' : si.pronom === 'vous' ? 'faites' : si.pluriel ? 'font' : 'fait';
  r.push(`Le sujet ${g(motV(q, a.suj.i))}, ${natArt(a.suj.i)}, est l'acteur de l'événement : ${si.pluriel && !si.pronom ? 'ce sont' : 'c\'est'} ${B(acteur)} qui ${faire} l'action ${deInf(inf)}.`);
  const qr = (c, mot) => (/^Pr\./.test(mots[c.i].tag) ? '' : ` : ${sv} ${mot} ? ${cap(texteV(q, c))}.`);
  if (a.cod) r.push(`Cette action ${deInf(inf)} porte sur un objet (la personne ou la chose destinataire de l'action), ${groupe(a.cod)} ; c'est le COD, le complément d'objet direct${qr(a.cod, 'quoi')}`.replace(/([^.])$/, '$1.'));
  if (a.cos) r.push(`Elle a aussi un second objet, ${groupe(a.cos)} ; c'est le COS, le complément d'objet second${qr(a.cos, `${texteV(q, a.cod)} à qui`).replace(` ${texteV(q, a.cod)} à qui`, ` ${texteV(q, a.cod)} à qui`)}`.replace(/([^.])$/, '$1.'));
  if (a.coi) {
    const lui = /^Pr\./.test(mots[a.coi.i].tag);
    r.push(`Cette action ${deInf(inf)} porte sur un objet (la personne ou la chose destinataire de l'action), ${groupe(a.coi)} ; c'est le COI, le complément d'objet indirect, ${lui ? `car ${g(motV(q, a.coi.i))} veut dire ${g('à ' + motV(q, a.coi.i))}` : 'relié au verbe par un petit mot'}.`);
  }
  if (!a.cod && !a.coi) r.push(`Ici, cette action ${deInf(inf)} ne porte sur aucun objet : il n'y a ni COD ni COI.`);
  /* « qui explique quand le boulanger fabrique le pain » */
  const svc = sv + (a.cod && a.cod.i > a.v ? ` ${texteV(q, a.cod)}` : '');
  a.cc.forEach((c, k) => r.push(`Cet événement est ${k ? 'aussi ' : ''}accompagné d'un complément circonstanciel ${NOM_FN[c.fn].replace('CC ', '')}, ${groupe(c)}, qui explique ${POUR[c.fn]} ${svc}.`));
  return r.join(' ');
}
function finishQuestionGV() {
  const q = game.questions[game.index];
  gnState.etape = 'fini';
  $('nat-buttons-variables').innerHTML = '';
  const part = gnState.total ? gnState.reussies / gnState.total : 1;
  game.score = Math.round((game.score + part) * 100) / 100;
  $('nat-instruction').textContent = 'La phrase est analysée !';
  $('nat-correction-details').innerHTML = nbspFr(resumeGV(q, true));
  $('nat-correction').classList.remove('hidden');
  $('nat-verdict-square').className = `verdict-square ${part === 1 ? 'correct' : part === 0 ? 'wrong' : 'half'}`;
  $('nat-next-button').textContent = game.index + 1 < game.questions.length ? 'Suivant →' : 'Voir mon résultat →';
  $('nat-score-label').textContent = scoreLabel(game.score);
  $('nat-progress-bar').style.width = `${((game.index + 1) / game.questions.length) * 100}%`;
  showCharacter(part >= 0.5 ? 'good' : 'bad', null);
}

/* ------------------------------------------------------------
   v32 : JEU 5 — LE BILAN : LE TABLEAU DES VINGT CASES
   On remplit le tableau en suivant la méthode : 1. les verbes (et leur nature) ; 2. le sujet de chaque verbe ;
   3. ses compléments d'objet ou son attribut ; 4. les compléments circonstanciels ; 5. les groupes nominaux
   (déterminants, adjectifs, compléments du nom) ; 6. les mots invariables. Chaque case vaut 1 point, partagé
   entre les réponses de cette case trouvées du premier coup ; le point est compté quand la case est remplie.
   Dans les données : nat = nature ; fn = fonction ; v = la case du verbe dont dépend le mot ; n = la case du nom
   dont dépend le mot (déterminant, adjectif, complément du nom) ; s = la case du sujet (attribut) ; inf = infinitif.
   ------------------------------------------------------------ */
/* v36 : vingt textes, numérotés du plus facile au plus difficile ; (v34) chacun chacun a deux phrases de récit et une phrase de description, et des compléments
   circonstanciels variés (adverbes, noms). « qui » = ce qui suit « Qui est-ce qui » dans la question du sujet ;
   contr = article défini contracté (du = de + le). */
const TABLEAUX = [
  /* texte 1 : Le petit chat noir dort sur le canapé. Mon frère caresse le chat doucement. Le grand canapé rouge est confortable. */
  [
    { t: 'Le', nat: 'D.def', n: 2 }, { t: 'petit', nat: 'A', fn: 'F.epi', n: 2 }, { t: 'chat', nat: 'N', fn: 'F.suj', v: 4 }, { t: 'noir', nat: 'A', fn: 'F.epi', n: 2 }, { t: 'dort', nat: 'VA', inf: 'dormir', qui: 'dort' },
    { t: 'sur', nat: 'P' }, { t: 'le', nat: 'D.def', n: 7 }, { t: 'canapé.', nat: 'N', fn: 'F.ccl', v: 4 }, { t: 'Mon', nat: 'D.pos', n: 9 }, { t: 'frère', nat: 'N', fn: 'F.suj', v: 10 },
    { t: 'caresse', nat: 'VA', inf: 'caresser', qui: 'caresse le chat' }, { t: 'le', nat: 'D.def', n: 12 }, { t: 'chat', nat: 'N', fn: 'F.cod', v: 10 }, { t: 'doucement.', nat: 'Av', fn: 'F.ccm', v: 10 }, { t: 'Le', nat: 'D.def', n: 16 },
    { t: 'grand', nat: 'A', fn: 'F.epi', n: 16 }, { t: 'canapé', nat: 'N', fn: 'F.suj', v: 18 }, { t: 'rouge', nat: 'A', fn: 'F.epi', n: 16 }, { t: 'est', nat: 'VE', inf: 'être', qui: 'est confortable' }, { t: 'confortable.', nat: 'A', fn: 'F.att', s: 16 },
  ],
  /* texte 2 : Ce matin, Julie mange une pomme. Elle croque le fruit lentement dans la cour. La grosse pomme rouge est sucrée. */
  [
    { t: 'Ce', nat: 'D.dem', n: 1 }, { t: 'matin,', nat: 'N', fn: 'F.cct', v: 3 }, { t: 'Julie', nat: 'NP', fn: 'F.suj', v: 3 }, { t: 'mange', nat: 'VA', inf: 'manger', qui: 'mange une pomme' }, { t: 'une', nat: 'D.ind', n: 5 },
    { t: 'pomme.', nat: 'N', fn: 'F.cod', v: 3 }, { t: 'Elle', nat: 'Pr.per', fn: 'F.suj', v: 7 }, { t: 'croque', nat: 'VA', inf: 'croquer', qui: 'croque le fruit' }, { t: 'le', nat: 'D.def', n: 9 }, { t: 'fruit', nat: 'N', fn: 'F.cod', v: 7 },
    { t: 'lentement', nat: 'Av', fn: 'F.ccm', v: 7 }, { t: 'dans', nat: 'P' }, { t: 'la', nat: 'D.def', n: 13 }, { t: 'cour.', nat: 'N', fn: 'F.ccl', v: 7 }, { t: 'La', nat: 'D.def', n: 16 },
    { t: 'grosse', nat: 'A', fn: 'F.epi', n: 16 }, { t: 'pomme', nat: 'N', fn: 'F.suj', v: 18 }, { t: 'rouge', nat: 'A', fn: 'F.epi', n: 16 }, { t: 'est', nat: 'VE', inf: 'être', qui: 'est sucrée' }, { t: 'sucrée.', nat: 'A', fn: 'F.att', s: 16 },
  ],
  /* texte 3 : Le soleil brille dans le ciel bleu. Les petits oiseaux chantent joyeusement dans les arbres. Le vieux jardin semble magnifique. */
  [
    { t: 'Le', nat: 'D.def', n: 1 }, { t: 'soleil', nat: 'N', fn: 'F.suj', v: 2 }, { t: 'brille', nat: 'VA', inf: 'briller', qui: 'brille' }, { t: 'dans', nat: 'P' }, { t: 'le', nat: 'D.def', n: 5 },
    { t: 'ciel', nat: 'N', fn: 'F.ccl', v: 2 }, { t: 'bleu.', nat: 'A', fn: 'F.epi', n: 5 }, { t: 'Les', nat: 'D.def', n: 9 }, { t: 'petits', nat: 'A', fn: 'F.epi', n: 9 }, { t: 'oiseaux', nat: 'N', fn: 'F.suj', v: 10 },
    { t: 'chantent', nat: 'VA', inf: 'chanter', qui: 'chante' }, { t: 'joyeusement', nat: 'Av', fn: 'F.ccm', v: 10 }, { t: 'dans', nat: 'P' }, { t: 'les', nat: 'D.def', n: 14 }, { t: 'arbres.', nat: 'N', fn: 'F.ccl', v: 10 },
    { t: 'Le', nat: 'D.def', n: 17 }, { t: 'vieux', nat: 'A', fn: 'F.epi', n: 17 }, { t: 'jardin', nat: 'N', fn: 'F.suj', v: 18 }, { t: 'semble', nat: 'VE', inf: 'sembler', qui: 'semble magnifique' }, { t: 'magnifique.', nat: 'A', fn: 'F.att', s: 17 },
  ],
  /* texte 4 : Aujourd'hui, Paul lance le ballon rouge. Son chien noir court vite dans le grand pré. Le petit chien semble heureux. */
  [
    { t: 'Aujourd\'hui,', nat: 'Av', fn: 'F.cct', v: 2 }, { t: 'Paul', nat: 'NP', fn: 'F.suj', v: 2 }, { t: 'lance', nat: 'VA', inf: 'lancer', qui: 'lance le ballon' }, { t: 'le', nat: 'D.def', n: 4 }, { t: 'ballon', nat: 'N', fn: 'F.cod', v: 2 },
    { t: 'rouge.', nat: 'A', fn: 'F.epi', n: 4 }, { t: 'Son', nat: 'D.pos', n: 7 }, { t: 'chien', nat: 'N', fn: 'F.suj', v: 9 }, { t: 'noir', nat: 'A', fn: 'F.epi', n: 7 }, { t: 'court', nat: 'VA', inf: 'courir', qui: 'court' },
    { t: 'vite', nat: 'Av', fn: 'F.ccm', v: 9 }, { t: 'dans', nat: 'P' }, { t: 'le', nat: 'D.def', n: 14 }, { t: 'grand', nat: 'A', fn: 'F.epi', n: 14 }, { t: 'pré.', nat: 'N', fn: 'F.ccl', v: 9 },
    { t: 'Le', nat: 'D.def', n: 17 }, { t: 'petit', nat: 'A', fn: 'F.epi', n: 17 }, { t: 'chien', nat: 'N', fn: 'F.suj', v: 18 }, { t: 'semble', nat: 'VE', inf: 'sembler', qui: 'semble heureux' }, { t: 'heureux.', nat: 'A', fn: 'F.att', s: 17 },
  ],
  /* texte 5 : Ce soir, Lucie prépare une bonne soupe. Nous mangeons la soupe tranquillement dans la cuisine. Cette soupe chaude est délicieuse. */
  [
    { t: 'Ce', nat: 'D.dem', n: 1 }, { t: 'soir,', nat: 'N', fn: 'F.cct', v: 3 }, { t: 'Lucie', nat: 'NP', fn: 'F.suj', v: 3 }, { t: 'prépare', nat: 'VA', inf: 'préparer', qui: 'prépare une soupe' }, { t: 'une', nat: 'D.ind', n: 6 },
    { t: 'bonne', nat: 'A', fn: 'F.epi', n: 6 }, { t: 'soupe.', nat: 'N', fn: 'F.cod', v: 3 }, { t: 'Nous', nat: 'Pr.per', fn: 'F.suj', v: 8 }, { t: 'mangeons', nat: 'VA', inf: 'manger', qui: 'mange la soupe' }, { t: 'la', nat: 'D.def', n: 10 },
    { t: 'soupe', nat: 'N', fn: 'F.cod', v: 8 }, { t: 'tranquillement', nat: 'Av', fn: 'F.ccm', v: 8 }, { t: 'dans', nat: 'P' }, { t: 'la', nat: 'D.def', n: 14 }, { t: 'cuisine.', nat: 'N', fn: 'F.ccl', v: 8 },
    { t: 'Cette', nat: 'D.dem', n: 16 }, { t: 'soupe', nat: 'N', fn: 'F.suj', v: 18 }, { t: 'chaude', nat: 'A', fn: 'F.epi', n: 16 }, { t: 'est', nat: 'VE', inf: 'être', qui: 'est délicieuse' }, { t: 'délicieuse.', nat: 'A', fn: 'F.att', s: 16 },
  ],
  /* texte 6 : Trois amis visitent le musée de la ville. Ils admirent longuement les tableaux anciens. Le guide du musée semble savant. */
  [
    { t: 'Trois', nat: 'D.num', n: 1 }, { t: 'amis', nat: 'N', fn: 'F.suj', v: 2 }, { t: 'visitent', nat: 'VA', inf: 'visiter', qui: 'visite le musée' }, { t: 'le', nat: 'D.def', n: 4 }, { t: 'musée', nat: 'N', fn: 'F.cod', v: 2 },
    { t: 'de', nat: 'P' }, { t: 'la', nat: 'D.def', n: 7 }, { t: 'ville.', nat: 'N', fn: 'F.cdn', n: 4 }, { t: 'Ils', nat: 'Pr.per', fn: 'F.suj', v: 9 }, { t: 'admirent', nat: 'VA', inf: 'admirer', qui: 'admire les tableaux' },
    { t: 'longuement', nat: 'Av', fn: 'F.ccm', v: 9 }, { t: 'les', nat: 'D.def', n: 12 }, { t: 'tableaux', nat: 'N', fn: 'F.cod', v: 9 }, { t: 'anciens.', nat: 'A', fn: 'F.epi', n: 12 }, { t: 'Le', nat: 'D.def', n: 15 },
    { t: 'guide', nat: 'N', fn: 'F.suj', v: 18 }, { t: 'du', nat: 'D.def', n: 17, contr: true }, { t: 'musée', nat: 'N', fn: 'F.cdn', n: 15 }, { t: 'semble', nat: 'VE', inf: 'sembler', qui: 'semble savant' }, { t: 'savant.', nat: 'A', fn: 'F.att', s: 15 },
  ],
  /* texte 7 : Hier, les enfants ont joué dans le jardin du voisin. Le ciel était bleu. Ils rentrent lentement à la petite maison. */
  [
    { t: 'Hier,', nat: 'Av', fn: 'F.cct', v: 3 }, { t: 'les', nat: 'D.def', n: 2 }, { t: 'enfants', nat: 'N', fn: 'F.suj', v: 3 }, { t: 'ont joué', nat: 'VA', inf: 'jouer', qui: 'a joué' }, { t: 'dans', nat: 'P' },
    { t: 'le', nat: 'D.def', n: 6 }, { t: 'jardin', nat: 'N', fn: 'F.ccl', v: 3 }, { t: 'du', nat: 'D.def', n: 8, contr: true }, { t: 'voisin.', nat: 'N', fn: 'F.cdn', n: 6 }, { t: 'Le', nat: 'D.def', n: 10 },
    { t: 'ciel', nat: 'N', fn: 'F.suj', v: 11 }, { t: 'était', nat: 'VE', inf: 'être', qui: 'était bleu' }, { t: 'bleu.', nat: 'A', fn: 'F.att', s: 10 }, { t: 'Ils', nat: 'Pr.per', fn: 'F.suj', v: 14 }, { t: 'rentrent', nat: 'VA', inf: 'rentrer', qui: 'rentre' },
    { t: 'lentement', nat: 'Av', fn: 'F.ccm', v: 14 }, { t: 'à', nat: 'P' }, { t: 'la', nat: 'D.def', n: 19 }, { t: 'petite', nat: 'A', fn: 'F.epi', n: 19 }, { t: 'maison.', nat: 'N', fn: 'F.ccl', v: 14 },
  ],
  /* texte 8 : Pendant la récréation, le petit Léo court vite. Ses camarades semblent fatigués. Ils regardent les beaux oiseaux du parc voisin. */
  [
    { t: 'Pendant', nat: 'P' }, { t: 'la', nat: 'D.def', n: 2 }, { t: 'récréation,', nat: 'N', fn: 'F.cct', v: 6 }, { t: 'le', nat: 'D.def', n: 5 }, { t: 'petit', nat: 'A', fn: 'F.epi', n: 5 },
    { t: 'Léo', nat: 'NP', fn: 'F.suj', v: 6 }, { t: 'court', nat: 'VA', inf: 'courir', qui: 'court' }, { t: 'vite.', nat: 'Av', fn: 'F.ccm', v: 6 }, { t: 'Ses', nat: 'D.pos', n: 9 }, { t: 'camarades', nat: 'N', fn: 'F.suj', v: 10 },
    { t: 'semblent', nat: 'VE', inf: 'sembler', qui: 'semble fatigué' }, { t: 'fatigués.', nat: 'A', fn: 'F.att', s: 9 }, { t: 'Ils', nat: 'Pr.per', fn: 'F.suj', v: 13 }, { t: 'regardent', nat: 'VA', inf: 'regarder', qui: 'regarde les oiseaux' }, { t: 'les', nat: 'D.def', n: 16 },
    { t: 'beaux', nat: 'A', fn: 'F.epi', n: 16 }, { t: 'oiseaux', nat: 'N', fn: 'F.cod', v: 13 }, { t: 'du', nat: 'D.def', n: 18, contr: true }, { t: 'parc', nat: 'N', fn: 'F.cdn', n: 16 }, { t: 'voisin.', nat: 'A', fn: 'F.epi', n: 18 },
  ],
  /* texte 9 : Ce soir, ma petite sœur prépare un gâteau énorme. Il semble délicieux. Nous le mangerons demain dans la grande cuisine. */
  [
    { t: 'Ce', nat: 'D.dem', n: 1 }, { t: 'soir,', nat: 'N', fn: 'F.cct', v: 5 }, { t: 'ma', nat: 'D.pos', n: 4 }, { t: 'petite', nat: 'A', fn: 'F.epi', n: 4 }, { t: 'sœur', nat: 'N', fn: 'F.suj', v: 5 },
    { t: 'prépare', nat: 'VA', inf: 'préparer', qui: 'prépare' }, { t: 'un', nat: 'D.ind', n: 7 }, { t: 'gâteau', nat: 'N', fn: 'F.cod', v: 5 }, { t: 'énorme.', nat: 'A', fn: 'F.epi', n: 7 }, { t: 'Il', nat: 'Pr.per', fn: 'F.suj', v: 10 },
    { t: 'semble', nat: 'VE', inf: 'sembler', qui: 'semble délicieux' }, { t: 'délicieux.', nat: 'A', fn: 'F.att', s: 9 }, { t: 'Nous', nat: 'Pr.per', fn: 'F.suj', v: 14 }, { t: 'le', nat: 'Pr.per', fn: 'F.cod', v: 14 }, { t: 'mangerons', nat: 'VA', inf: 'manger', qui: 'le mangera' },
    { t: 'demain', nat: 'Av', fn: 'F.cct', v: 14 }, { t: 'dans', nat: 'P' }, { t: 'la', nat: 'D.def', n: 19 }, { t: 'grande', nat: 'A', fn: 'F.epi', n: 19 }, { t: 'cuisine.', nat: 'N', fn: 'F.ccl', v: 14 },
  ],
  /* texte 10 : Ce matin, le facteur apporte une lettre. Il la pose sur la table de la cuisine. Cette lettre semble importante. */
  [
    { t: 'Ce', nat: 'D.dem', n: 1 }, { t: 'matin,', nat: 'N', fn: 'F.cct', v: 4 }, { t: 'le', nat: 'D.def', n: 3 }, { t: 'facteur', nat: 'N', fn: 'F.suj', v: 4 }, { t: 'apporte', nat: 'VA', inf: 'apporter', qui: 'apporte une lettre' },
    { t: 'une', nat: 'D.ind', n: 6 }, { t: 'lettre.', nat: 'N', fn: 'F.cod', v: 4 }, { t: 'Il', nat: 'Pr.per', fn: 'F.suj', v: 9 }, { t: 'la', nat: 'Pr.per', fn: 'F.cod', v: 9 }, { t: 'pose', nat: 'VA', inf: 'poser', qui: 'la pose' },
    { t: 'sur', nat: 'P' }, { t: 'la', nat: 'D.def', n: 12 }, { t: 'table', nat: 'N', fn: 'F.ccl', v: 9 }, { t: 'de', nat: 'P' }, { t: 'la', nat: 'D.def', n: 15 },
    { t: 'cuisine.', nat: 'N', fn: 'F.cdn', n: 12 }, { t: 'Cette', nat: 'D.dem', n: 17 }, { t: 'lettre', nat: 'N', fn: 'F.suj', v: 18 }, { t: 'semble', nat: 'VE', inf: 'sembler', qui: 'semble important' }, { t: 'importante.', nat: 'A', fn: 'F.att', s: 17 },
  ],
  /* texte 11 : Mon père lit le journal tranquillement dans le salon. Ce vieux journal est intéressant. Il le prête à ma mère. */
  [
    { t: 'Mon', nat: 'D.pos', n: 1 }, { t: 'père', nat: 'N', fn: 'F.suj', v: 2 }, { t: 'lit', nat: 'VA', inf: 'lire', qui: 'lit le journal' }, { t: 'le', nat: 'D.def', n: 4 }, { t: 'journal', nat: 'N', fn: 'F.cod', v: 2 },
    { t: 'tranquillement', nat: 'Av', fn: 'F.ccm', v: 2 }, { t: 'dans', nat: 'P' }, { t: 'le', nat: 'D.def', n: 8 }, { t: 'salon.', nat: 'N', fn: 'F.ccl', v: 2 }, { t: 'Ce', nat: 'D.dem', n: 11 },
    { t: 'vieux', nat: 'A', fn: 'F.epi', n: 11 }, { t: 'journal', nat: 'N', fn: 'F.suj', v: 12 }, { t: 'est', nat: 'VE', inf: 'être', qui: 'est intéressant' }, { t: 'intéressant.', nat: 'A', fn: 'F.att', s: 11 }, { t: 'Il', nat: 'Pr.per', fn: 'F.suj', v: 16 },
    { t: 'le', nat: 'Pr.per', fn: 'F.cod', v: 16 }, { t: 'prête', nat: 'VA', inf: 'prêter', qui: 'le prête' }, { t: 'à', nat: 'P' }, { t: 'ma', nat: 'D.pos', n: 19 }, { t: 'mère.', nat: 'N', fn: 'F.cos', v: 16 },
  ],
  /* texte 12 : Le bébé pleure de faim dans son lit. Sa maman pense à son biberon. Le bébé de Lucie est gourmand. */
  [
    { t: 'Le', nat: 'D.def', n: 1 }, { t: 'bébé', nat: 'N', fn: 'F.suj', v: 2 }, { t: 'pleure', nat: 'VA', inf: 'pleurer', qui: 'pleure' }, { t: 'de', nat: 'P' }, { t: 'faim', nat: 'N', fn: 'F.ccc', v: 2 },
    { t: 'dans', nat: 'P' }, { t: 'son', nat: 'D.pos', n: 7 }, { t: 'lit.', nat: 'N', fn: 'F.ccl', v: 2 }, { t: 'Sa', nat: 'D.pos', n: 9 }, { t: 'maman', nat: 'N', fn: 'F.suj', v: 10 },
    { t: 'pense', nat: 'VA', inf: 'penser', qui: 'pense à son biberon' }, { t: 'à', nat: 'P' }, { t: 'son', nat: 'D.pos', n: 13 }, { t: 'biberon.', nat: 'N', fn: 'F.coi', v: 10 }, { t: 'Le', nat: 'D.def', n: 15 },
    { t: 'bébé', nat: 'N', fn: 'F.suj', v: 18 }, { t: 'de', nat: 'P' }, { t: 'Lucie', nat: 'NP', fn: 'F.cdn', n: 15 }, { t: 'est', nat: 'VE', inf: 'être', qui: 'est gourmand' }, { t: 'gourmand.', nat: 'A', fn: 'F.att', s: 15 },
  ],
  /* texte 13 : Hier, mon oncle a offert un livre à son neveu. Le garçon veut lire ce soir. Ce gros livre semble passionnant. */
  [
    { t: 'Hier,', nat: 'Av', fn: 'F.cct', v: 3 }, { t: 'mon', nat: 'D.pos', n: 2 }, { t: 'oncle', nat: 'N', fn: 'F.suj', v: 3 }, { t: 'a offert', nat: 'VA', inf: 'offrir', qui: 'a offert un livre' }, { t: 'un', nat: 'D.ind', n: 5 },
    { t: 'livre', nat: 'N', fn: 'F.cod', v: 3 }, { t: 'à', nat: 'P' }, { t: 'son', nat: 'D.pos', n: 8 }, { t: 'neveu.', nat: 'N', fn: 'F.cos', v: 3 }, { t: 'Le', nat: 'D.def', n: 10 },
    { t: 'garçon', nat: 'N', fn: 'F.suj', v: 11 }, { t: 'veut', nat: 'VA', inf: 'vouloir', qui: 'veut lire' }, { t: 'lire', nat: 'VINF', fn: 'F.cod', v: 11, inf: 'lire' }, { t: 'ce', nat: 'D.dem', n: 14 }, { t: 'soir.', nat: 'N', fn: 'F.cct', v: 12 },
    { t: 'Ce', nat: 'D.dem', n: 17 }, { t: 'gros', nat: 'A', fn: 'F.epi', n: 17 }, { t: 'livre', nat: 'N', fn: 'F.suj', v: 18 }, { t: 'semble', nat: 'VE', inf: 'sembler', qui: 'semble passionnant' }, { t: 'passionnant.', nat: 'A', fn: 'F.att', s: 17 },
  ],
  /* texte 14 : Ce matin le professeur a organisé une discussion sur la pollution. Les élèves sont enthousiastes donc chaque élève veut participer oralement. */
  [
    { t: 'Ce', nat: 'D.dem', n: 1 }, { t: 'matin', nat: 'N', fn: 'F.cct', v: 4 }, { t: 'le', nat: 'D.def', n: 3 }, { t: 'professeur', nat: 'N', fn: 'F.suj', v: 4 }, { t: 'a organisé', nat: 'VA', inf: 'organiser', qui: 'a organisé' },
    { t: 'une', nat: 'D.ind', n: 6 }, { t: 'discussion', nat: 'N', fn: 'F.cod', v: 4 }, { t: 'sur', nat: 'P' }, { t: 'la', nat: 'D.def', n: 9 }, { t: 'pollution.', nat: 'N', fn: 'F.cdn', n: 6 },
    { t: 'Les', nat: 'D.def', n: 11 }, { t: 'élèves', nat: 'N', fn: 'F.suj', v: 12 }, { t: 'sont', nat: 'VE', inf: 'être', qui: 'est enthousiaste' }, { t: 'enthousiastes', nat: 'A', fn: 'F.att', s: 11 }, { t: 'donc', nat: 'CC' },
    { t: 'chaque', nat: 'D.idf', n: 16 }, { t: 'élève', nat: 'N', fn: 'F.suj', v: 17 }, { t: 'veut', nat: 'VA', inf: 'vouloir', qui: 'veut participer' }, { t: 'participer', nat: 'VINF', fn: 'F.cod', v: 17, inf: 'participer' }, { t: 'oralement.', nat: 'Av', fn: 'F.ccm', v: 18 },
  ],
  /* texte 15 : Dans la savane, le lion chasse une gazelle. Les lionceaux attendent leur repas. Le lion est le roi des animaux. */
  [
    { t: 'Dans', nat: 'P' }, { t: 'la', nat: 'D.def', n: 2 }, { t: 'savane,', nat: 'N', fn: 'F.ccl', v: 5 }, { t: 'le', nat: 'D.def', n: 4 }, { t: 'lion', nat: 'N', fn: 'F.suj', v: 5 },
    { t: 'chasse', nat: 'VA', inf: 'chasser', qui: 'chasse une gazelle' }, { t: 'une', nat: 'D.ind', n: 7 }, { t: 'gazelle.', nat: 'N', fn: 'F.cod', v: 5 }, { t: 'Les', nat: 'D.def', n: 9 }, { t: 'lionceaux', nat: 'N', fn: 'F.suj', v: 10 },
    { t: 'attendent', nat: 'VA', inf: 'attendre', qui: 'attend leur repas' }, { t: 'leur', nat: 'D.pos', n: 12 }, { t: 'repas.', nat: 'N', fn: 'F.cod', v: 10 }, { t: 'Le', nat: 'D.def', n: 14 }, { t: 'lion', nat: 'N', fn: 'F.suj', v: 15 },
    { t: 'est', nat: 'VE', inf: 'être', qui: 'est le roi des animaux' }, { t: 'le', nat: 'D.def', n: 17 }, { t: 'roi', nat: 'N', fn: 'F.att', s: 14 }, { t: 'des', nat: 'D.def', n: 19, contr: true }, { t: 'animaux.', nat: 'N', fn: 'F.cdn', n: 17 },
  ],
  /* texte 16 : Oh, le vent souffle fort ce soir. Fatiguée, la vieille dame ferme ses volets. Sa petite maison blanche paraît tranquille. */
  [
    { t: 'Oh,', nat: 'I' }, { t: 'le', nat: 'D.def', n: 2 }, { t: 'vent', nat: 'N', fn: 'F.suj', v: 3 }, { t: 'souffle', nat: 'VA', inf: 'souffler', qui: 'souffle' }, { t: 'fort', nat: 'Av', fn: 'F.ccm', v: 3 },
    { t: 'ce', nat: 'D.dem', n: 6 }, { t: 'soir.', nat: 'N', fn: 'F.cct', v: 3 }, { t: 'Fatiguée,', nat: 'A', fn: 'F.app', n: 10 }, { t: 'la', nat: 'D.def', n: 10 }, { t: 'vieille', nat: 'A', fn: 'F.epi', n: 10 },
    { t: 'dame', nat: 'N', fn: 'F.suj', v: 11 }, { t: 'ferme', nat: 'VA', inf: 'fermer', qui: 'ferme ses volets' }, { t: 'ses', nat: 'D.pos', n: 13 }, { t: 'volets.', nat: 'N', fn: 'F.cod', v: 11 }, { t: 'Sa', nat: 'D.pos', n: 16 },
    { t: 'petite', nat: 'A', fn: 'F.epi', n: 16 }, { t: 'maison', nat: 'N', fn: 'F.suj', v: 18 }, { t: 'blanche', nat: 'A', fn: 'F.epi', n: 16 }, { t: 'paraît', nat: 'VE', inf: 'paraître', qui: 'paraît tranquille' }, { t: 'tranquille.', nat: 'A', fn: 'F.att', s: 16 },
  ],
  /* texte 17 : Ce soir, le clown jongle sur la piste. Chacun applaudit le clown avec enthousiasme. Le costume du clown semble magnifique. */
  [
    { t: 'Ce', nat: 'D.dem', n: 1 }, { t: 'soir,', nat: 'N', fn: 'F.cct', v: 4 }, { t: 'le', nat: 'D.def', n: 3 }, { t: 'clown', nat: 'N', fn: 'F.suj', v: 4 }, { t: 'jongle', nat: 'VA', inf: 'jongler', qui: 'jongle' },
    { t: 'sur', nat: 'P' }, { t: 'la', nat: 'D.def', n: 7 }, { t: 'piste.', nat: 'N', fn: 'F.ccl', v: 4 }, { t: 'Chacun', nat: 'Pr.idf', fn: 'F.suj', v: 9 }, { t: 'applaudit', nat: 'VA', inf: 'applaudir', qui: 'applaudit le clown' },
    { t: 'le', nat: 'D.def', n: 11 }, { t: 'clown', nat: 'N', fn: 'F.cod', v: 9 }, { t: 'avec', nat: 'P' }, { t: 'enthousiasme.', nat: 'N', fn: 'F.ccm', v: 9 }, { t: 'Le', nat: 'D.def', n: 15 },
    { t: 'costume', nat: 'N', fn: 'F.suj', v: 18 }, { t: 'du', nat: 'D.def', n: 17, contr: true }, { t: 'clown', nat: 'N', fn: 'F.cdn', n: 15 }, { t: 'semble', nat: 'VE', inf: 'sembler', qui: 'semble magnifique' }, { t: 'magnifique.', nat: 'A', fn: 'F.att', s: 15 },
  ],
  /* texte 18 : Le soir, la petite Léa rejoint sa grand-mère. Elle lui raconte doucement deux histoires. Sa grand-mère est une conteuse formidable. */
  [
    { t: 'Le', nat: 'D.def', n: 1 }, { t: 'soir,', nat: 'N', fn: 'F.cct', v: 5 }, { t: 'la', nat: 'D.def', n: 4 }, { t: 'petite', nat: 'A', fn: 'F.epi', n: 4 }, { t: 'Léa', nat: 'NP', fn: 'F.suj', v: 5 },
    { t: 'rejoint', nat: 'VA', inf: 'rejoindre', qui: 'rejoint sa grand-mère' }, { t: 'sa', nat: 'D.pos', n: 7 }, { t: 'grand-mère.', nat: 'N', fn: 'F.cod', v: 5 }, { t: 'Elle', nat: 'Pr.per', fn: 'F.suj', v: 10 }, { t: 'lui', nat: 'Pr.per', fn: 'F.cos', v: 10 },
    { t: 'raconte', nat: 'VA', inf: 'raconter', qui: 'lui raconte deux histoires' }, { t: 'doucement', nat: 'Av', fn: 'F.ccm', v: 10 }, { t: 'deux', nat: 'D.num', n: 13 }, { t: 'histoires.', nat: 'N', fn: 'F.cod', v: 10 }, { t: 'Sa', nat: 'D.pos', n: 15 },
    { t: 'grand-mère', nat: 'N', fn: 'F.suj', v: 16 }, { t: 'est', nat: 'VE', inf: 'être', qui: 'est une conteuse formidable' }, { t: 'une', nat: 'D.ind', n: 18 }, { t: 'conteuse', nat: 'N', fn: 'F.att', s: 15 }, { t: 'formidable.', nat: 'A', fn: 'F.epi', n: 18 },
  ],
  /* texte 19 : Cette nuit, le chien aboie de peur. Le tonnerre gronde fort et la pluie tombe. Le pauvre animal reste terrifié. */
  [
    { t: 'Cette', nat: 'D.dem', n: 1 }, { t: 'nuit,', nat: 'N', fn: 'F.cct', v: 4 }, { t: 'le', nat: 'D.def', n: 3 }, { t: 'chien', nat: 'N', fn: 'F.suj', v: 4 }, { t: 'aboie', nat: 'VA', inf: 'aboyer', qui: 'aboie' },
    { t: 'de', nat: 'P' }, { t: 'peur.', nat: 'N', fn: 'F.ccc', v: 4 }, { t: 'Le', nat: 'D.def', n: 8 }, { t: 'tonnerre', nat: 'N', fn: 'F.suj', v: 9 }, { t: 'gronde', nat: 'VA', inf: 'gronder', qui: 'gronde' },
    { t: 'fort', nat: 'Av', fn: 'F.ccm', v: 9 }, { t: 'et', nat: 'CC' }, { t: 'la', nat: 'D.def', n: 13 }, { t: 'pluie', nat: 'N', fn: 'F.suj', v: 14 }, { t: 'tombe.', nat: 'VA', inf: 'tomber', qui: 'tombe' },
    { t: 'Le', nat: 'D.def', n: 17 }, { t: 'pauvre', nat: 'A', fn: 'F.epi', n: 17 }, { t: 'animal', nat: 'N', fn: 'F.suj', v: 18 }, { t: 'reste', nat: 'VE', inf: 'rester', qui: 'reste terrifié' }, { t: 'terrifié.', nat: 'A', fn: 'F.att', s: 17 },
  ],
  /* texte 20 : Curieux, plusieurs élèves posent des questions au maître. Celui-ci aime répondre patiemment. Leur classe est un endroit calme et joyeux. */
  [
    { t: 'Curieux,', nat: 'A', fn: 'F.app', n: 2 }, { t: 'plusieurs', nat: 'D.idf', n: 2 }, { t: 'élèves', nat: 'N', fn: 'F.suj', v: 3 }, { t: 'posent', nat: 'VA', inf: 'poser', qui: 'pose des questions' }, { t: 'des', nat: 'D.ind', n: 5 },
    { t: 'questions', nat: 'N', fn: 'F.cod', v: 3 }, { t: 'au', nat: 'D.def', n: 7, contr: true }, { t: 'maître.', nat: 'N', fn: 'F.cos', v: 3 }, { t: 'Celui-ci', nat: 'Pr.dem', fn: 'F.suj', v: 9 }, { t: 'aime', nat: 'VA', inf: 'aimer', qui: 'aime répondre' },
    { t: 'répondre', nat: 'VINF', fn: 'F.cod', v: 9, inf: 'répondre' }, { t: 'patiemment.', nat: 'Av', fn: 'F.ccm', v: 10 }, { t: 'Leur', nat: 'D.pos', n: 13 }, { t: 'classe', nat: 'N', fn: 'F.suj', v: 14 }, { t: 'est', nat: 'VE', inf: 'être', qui: 'est un endroit calme et joyeux' },
    { t: 'un', nat: 'D.ind', n: 16 }, { t: 'endroit', nat: 'N', fn: 'F.att', s: 13 }, { t: 'calme', nat: 'A', fn: 'F.epi', n: 16 }, { t: 'et', nat: 'CC' }, { t: 'joyeux.', nat: 'A', fn: 'F.epi', n: 16 },
  ],
];
const tabCases = () => TABLEAUX[game.questions[game.index].t];
const motT = (i) => { const c = tabCases()[i]; const x = c.t.replace(/[.,!?]$/, ''); return c.nat === 'NP' ? x : x.toLowerCase(); };
const infT = (i) => tabCases()[i].inf || motT(i);
const estVerbeT = (c) => c.nat === 'VA' || c.nat === 'VE';
const NAT_LIB = { VINF: 'Verbe à l\'infinitif', A: 'Adjectif qualificatif', Av: 'Adverbe', P: 'Préposition', CC: 'Conjonction de coordination', CS: 'Conjonction de subordination', I: 'Interjection' };
const natNomT = (code) => (code === 'VINF' ? 'verbe à l\'infinitif' : (NATURE_BY_CODE[code]?.nom || code).replace(/&shy;/g, '').toLowerCase());
/* « sujet du verbe organiser », « complément du nom discussion », « attribut du sujet élèves » */
function fnTab(i) {
  const c = tabCases()[i];
  if (c.fn === 'F.att') return `attribut du sujet ${motT(c.s)}`;
  if (c.fn === 'F.cdn') return `complément du nom ${motT(c.n)}`;
  if (c.fn === 'F.epi') return `épithète du nom ${motT(c.n)}`;
  if (c.fn === 'F.app') return `apposé au nom ${motT(c.n)}`;
  return `${NOM_FN[c.fn]} du verbe ${infT(c.v)}`;
}
const tabState = { faits: {}, natOk: new Set(), fnOk: new Set(), msg: '', vi: 0, verbes: [], objet: null, ni: 0, noms: [], courant: null };
function showQuestionTab() {
  const cases = tabCases();
  $('nat-sentence').innerHTML = cases.map((c, i) => `<span class="w case" data-i="${i}">${esc(c.t)}</span>`).join('');
  $('nat-character-stage').innerHTML = '';
  $('nat-correction').classList.add('hidden');
  $('nat-verdict-square').className = 'verdict-square';
  $('nat-instruction').textContent = 'Remplis le tableau';
  $('nat-fn-column').classList.add('hidden'); $('nat-nature-column').classList.remove('hidden');
  $('nat-buttons-invariables').innerHTML = '';
  Object.assign(gnState, { etape: 'tverbe', essais: 0, cartes: [] });
  Object.assign(tabState, { faits: {}, natOk: new Set(), fnOk: new Set(), msg: '', vi: 0, objet: null, ni: 0, courant: null, invDebut: false, invVu: false, ccFait: false,
    verbes: cases.map((c, i) => (estVerbeT(c) ? i : -1)).filter((i) => i >= 0),
    noms: cases.map((c, i) => (c.nat === 'N' || c.nat === 'NP' ? i : -1)).filter((i) => i >= 0) });
  $('nat-progress-label').textContent = `Texte n° ${game.questions[game.index].t + 1} (${NIVEAU_TEXTE(game.questions[game.index].t)})`;
  majScoreTab();
  gnEtape(true);
}
/* le compte des points : chaque case a ses réponses (trouver le mot, sa nature, sa fonction) ; elle rapporte
   1 point × (réponses du premier coup / réponses) quand elle est remplie */
/* v34 : chaque case vaut deux demi-points : trouver le mot (avec sa fonction s'il en a une) et donner sa nature.
   Une seule erreur dans une moitié, et cette moitié vaut zéro, même si la bonne réponse est trouvée ensuite. */
function compteTab(i, partie) {
  const f = tabState.faits[i] || (tabState.faits[i] = { a: true, b: true, fini: false });
  if (gnState.essais > 0) { if (partie === 'nat') f.b = false; else f.a = false; }
  const code = partie === 'fn' ? tabCases()[i].fn : tabCases()[i].nat;
  if (NATURE_BY_CODE[code]) { const pn = game.parNature[code] || (game.parNature[code] = { c: 0, p: 0 }); pn.p += 1; if (gnState.essais === 0) pn.c += 1; }
  gnState.essais = 0;
  if (partie === 'nat') tabState.natOk.add(i); else if (partie === 'fn') tabState.fnOk.add(i);
  const c = tabCases()[i];
  if (!f.fini && tabState.natOk.has(i) && (!c.fn || tabState.fnOk.has(i))) {
    f.fini = true;
    game.score = Math.round((game.score + (f.a ? 0.5 : 0) + (f.b ? 0.5 : 0)) * 100) / 100;
    wordEl(i)?.classList.add('remplie');
  }
  majScoreTab();
}
function majScoreTab() {
  const n = Object.values(tabState.faits).filter((f) => f.fini).length;
  $('nat-score-label').textContent = scoreLabel(game.score);
  $('nat-progress-bar').style.width = `${(n / 20) * 100}%`;
}
const pointsTab = () => `tu as déjà ${fmtPts(game.score)} point${game.score >= 2 ? 's' : ''} sur 20`;
/* les cartes-consignes du tableau */
const CARTES_TAB = {
  tverbe: () => ({ vert: true, texte: `${tabState.msg}Dans ce tableau, appuie sur ${Object.keys(tabState.faits).some((k) => estVerbeT(tabCases()[k])) ? 'un autre verbe conjugué' : 'un verbe conjugué'}.` }),
  tverbenat: () => ({ vert: true, texte: `Quelle est la nature du verbe « ${motT(tabState.courant)} » ?`, choix: ['VA', 'VE'] }),
  tsuj: () => {
    const v = tabState.verbes[tabState.vi], c = tabCases()[v];
    /* v34 : « Quel mot a la fonction sujet du verbe « organiser » ? Qui est-ce qui a organisé ? Appuie sur le mot qui a la fonction sujet. » */
    return { vert: false, texte: `${tabState.msg}Quel mot a la fonction sujet du verbe « ${infT(v)} » ? Qui est-ce qui ${c.qui || motT(v)} ? Appuie sur le mot qui a la fonction sujet.` };
  },
  tnat: () => {
    const i = tabState.courant, c = tabCases()[i];
    const choix = c.fn === 'F.att' ? ['N', 'NP', 'Pr', 'A'] : CC_CODES.includes(c.fn) ? ['N', 'NP', 'Pr', 'Av'] : c.fn === 'F.cod' ? ['N', 'NP', 'Pr', 'VINF'] : ['N', 'NP', 'Pr'];
    return { vert: true, texte: `Quelle est la nature du mot « ${motT(i)} », ${fnTab(i)} ?`, choix, labels: NAT_LIB };
  },
  tprnat: () => ({ vert: true, texte: `Quel est le type du pronom « ${motT(tabState.courant)} » ?`, choix: ['Pr.per', 'Pr.rel', 'Pr.pos', 'Pr.dem', 'Pr.num', 'Pr.idf', 'Pr.int'], petits: true }),
  tobjq: () => {
    const v = tabState.verbes[tabState.vi], inf = infT(v), k = tabState.objet;
    if (k === 'F.att') { const sj = tabCases().findIndex((x) => x.fn === 'F.suj' && x.v === v); return { vert: false, texte: `${tabState.msg}Le sujet « ${motT(sj)} » est-il décrit par un attribut, un mot qui lui attribue une caractéristique ?`, choix: ['oui', 'non'] }; }
    if (k === 'F.cod') return { vert: false, texte: `${tabState.msg}Le verbe « ${inf} » a-t-il un mot de fonction COD, qui répondrait à la question « ${inf} + quoi ? » et qui désignerait ${OBJET} sur lequel porte l'action ${deInf(inf)} ?`, choix: ['oui', 'non'] };
    if (k === 'F.coi') return { vert: false, texte: `Le verbe « ${inf} » a-t-il un mot de fonction COI, qui répondrait à la question « ${inf} + à qui ? à quoi ? de quoi ? » ?`, choix: ['oui', 'non'] };
    return { vert: false, texte: `Le verbe « ${inf} » a-t-il aussi un mot de fonction COS, qui répondrait à la question « ${inf} quelque chose + à qui ? à quoi ? de qui ? de quoi ? » ?`, choix: ['oui', 'non'] };
  },
  tobj: () => { const v = tabState.verbes[tabState.vi]; return { vert: false, texte: tabState.objet === 'F.att' ? 'Appuie sur l\'attribut du sujet.' : `Appuie sur le ${NOM_FN[tabState.objet]} du verbe « ${infT(v)} ».` }; },
  tccq: () => {
    const v = tabState.verbes[tabState.vi];
    return { vert: false, texte: `${tabState.msg}« ${groupeVerbalT(v)} » : est-ce qu'on donne ${tabState.ccFait ? 'une autre circonstance' : 'une circonstance'} ? Où ? Quand ? Comment ? Pourquoi ?`, choix: ['oui', 'non'] };
  },
  tcc: () => ({ vert: false, texte: `Appuie sur le mot qui donne cette circonstance : c'est un complément circonstanciel.` }),
  tcctype: () => {
    const gv = groupeVerbalT(tabState.verbes[tabState.vi]);
    return { vert: false, texte: `À quelle question répond « ${motT(tabState.courant)} » ?`, choix: CC_CODES, une: true,
      labels: { 'F.ccl': `${gv}… où ? (CC de lieu)`, 'F.cct': `${gv}… quand ? (CC de temps)`, 'F.ccm': `${gv}… comment ? (CC de manière)`, 'F.ccc': `${gv}… pourquoi ? (CC de cause)` } };
  },
  tdetq: () => ({ vert: true, texte: `${tabState.msg}Passons au groupe du nom « ${motT(tabState.noms[tabState.ni])} ». Le nom « ${motT(tabState.noms[tabState.ni])} » a-t-il un déterminant ?`, choix: ['oui', 'non'] }),
  tdet: () => ({ vert: true, texte: `Appuie sur le déterminant du nom « ${motT(tabState.noms[tabState.ni])} ».` }),
  tdetnat: () => ({ vert: true, texte: `Quelle est la nature précise du déterminant « ${motT(tabState.courant)} » ?`, choix: ['D.def', 'D.ind', 'D.pos', 'D.dem', 'D.num', 'D.idf', 'D.int'], petits: true }),
  tadjq: () => ({ vert: true, texte: `Dans ce groupe nominal, le nom « ${motT(tabState.noms[tabState.ni])} » est-il décrit par un adjectif qualificatif épithète ou apposé ?`, choix: ['oui', 'non'] }),
  tadj: () => ({ vert: true, texte: `Appuie sur l'adjectif qualificatif qui décrit le nom « ${motT(tabState.noms[tabState.ni])} ».` }),
  tadjfn: () => ({ vert: false, texte: `Quelle est la fonction de l'adjectif « ${motT(tabState.courant)} » ?`, choix: ['F.epi', 'F.app'], labels: { 'F.epi': `Épithète du nom ${motT(tabState.noms[tabState.ni])}`, 'F.app': `Apposé au nom ${motT(tabState.noms[tabState.ni])}` } }),
  tcdnq: () => ({ vert: false, texte: `Dans ce groupe nominal, le nom « ${motT(tabState.noms[tabState.ni])} » est-il décrit par un mot qui a la fonction complément du nom ?`, choix: ['oui', 'non'] }),
  tcdn: () => ({ vert: false, texte: `Appuie sur le complément du nom « ${motT(tabState.noms[tabState.ni])} ».` }),
  tinv: () => ({ vert: true, texte: `${tabState.msg}${tabState.invVu ? 'Appuie sur un autre mot invariable.' : 'Il reste des mots invariables, qui n\'ont pas de fonction. Appuie sur l\'un d\'eux.'}` }),
  tinvnat: () => ({ vert: true, texte: `Quelle est la nature du mot « ${motT(tabState.courant)} » ?`, choix: ['P', 'Av', 'CC', 'CS', 'I'], labels: NAT_LIB }),
};
/* v33 : les compléments circonstanciels se cherchent verbe par verbe, en repartant du groupe déjà trouvé :
   « Le professeur a organisé une discussion » : où ? quand ? comment ? pourquoi ? */
function groupeVerbalT(v) {
  const C = tabCases();
  const tetes = C.map((c, i) => i).filter((i) => i === v || (C[i].v === v && ['F.suj', 'F.cod', 'F.coi', 'F.cos'].includes(C[i].fn)) || (C[i].fn === 'F.att' && C[C[i].s].v === v));
  const avecDet = new Set(tetes);
  /* v36 : avec les déterminants et les adjectifs épithètes des mots trouvés (« La petite Léa rejoint sa grand-mère ») */
  C.forEach((c, i) => { if ((/^D\./.test(c.nat) || c.fn === 'F.epi') && tetes.includes(c.n)) avecDet.add(i); });
  /* la préposition qui introduit un COI ou un COS (« pense à son biberon », « prête à ma mère ») */
  [...avecDet].forEach((i) => { if (['F.coi', 'F.cos'].includes(C[i].fn) && C[i].v === v) { let k = i - 1; while (k >= 0 && /^D\./.test(C[k].nat)) k -= 1; if (k >= 0 && C[k].nat === 'P') avecDet.add(k); } });
  /* « calme et joyeux » : la conjonction entre deux mots gardés */
  C.forEach((c, i) => { if (c.nat === 'CC' && avecDet.has(i - 1) && avecDet.has(i + 1)) avecDet.add(i); });
  const x = [...avecDet].sort((a, b) => a - b).map((i) => { const t = C[i].t.replace(/[.,]$/, ''); return C[i].nat === 'NP' ? t : t.toLowerCase(); }).join(' ');
  return x.charAt(0).toUpperCase() + x.slice(1);
}
/* les compléments circonstanciels qui dépendent de ce verbe (ou de l'infinitif qui le complète : « veut participer oralement ») */
const ccDuVerbe = (v, j) => { const C = tabCases(), c = C[j]; return CC_CODES.includes(c.fn) && (c.v === v || (C[c.v] && C[c.v].v === v)); };
const reste = (filtre) => tabCases().map((c, i) => (filtre(c, i) ? i : -1)).filter((i) => i >= 0);
function etapeTab(e, msg, meme) { tabState.msg = msg ? `${capitalize(msg)} ` : ''; gnVers(e, meme); }
/* l'enchaînement de la méthode */
function suiteVerbes() {
  if (reste((c, i) => estVerbeT(c) && !tabState.natOk.has(i)).length) { etapeTab('tverbe'); return; }
  tabState.vi = 0;
  etapeTab('tsuj', `Bravo, tu as trouvé tous les verbes conjugués ! Les verbes conjugués n'ont pas de fonction (les verbes à l'infinitif, eux, en ont une, comme tu le verras) : ${pointsTab()}.`);
}
function suiteSujets() {
  tabState.vi += 1;
  if (tabState.vi < tabState.verbes.length) { etapeTab('tsuj'); return; }
  tabState.vi = 0; debutObjets(`Tous les sujets sont trouvés : ${pointsTab()}.`);
}
function debutObjets(msg) {
  const v = tabState.verbes[tabState.vi];
  tabState.objet = tabCases()[v].nat === 'VE' ? 'F.att' : 'F.cod';
  etapeTab('tobjq', msg || `Passons au verbe « ${infT(v)} ».`);
}
function objetT(code) { const v = tabState.verbes[tabState.vi]; return tabCases().findIndex((c) => c.fn === code && (code === 'F.att' ? tabCases()[c.s].v === v : c.v === v)); }
function suiteObjets() {
  if (tabState.objet === 'F.cod') { tabState.objet = objetT('F.cod') >= 0 ? 'F.cos' : 'F.coi'; etapeTab('tobjq'); return; }
  tabState.vi += 1;
  if (tabState.vi < tabState.verbes.length) { debutObjets(); return; }
  tabState.vi = 0; tabState.ccFait = false;
  etapeTab('tccq', `Les compléments d'objet et l'attribut sont trouvés : ${pointsTab()}. Cherchons maintenant les circonstances, verbe par verbe.`);
}
function suiteCC(msg) {
  tabState.vi += 1; tabState.ccFait = false;
  if (tabState.vi < tabState.verbes.length) { etapeTab('tccq', msg); return; }
  tabState.ni = 0; tabState.adjFaits = new Set();
  suiteGN(`Les verbes et leurs compléments sont analysés : ${pointsTab()}. Passons aux groupes nominaux.`);
}
function suiteGN(msg) {
  while (tabState.ni < tabState.noms.length) {
    etapeTab('tdetq', msg); return;
  }
  if (reste((c, i) => !c.fn && !estVerbeT(c) && !/^D\./.test(c.nat) && !tabState.natOk.has(i)).length) {
    const premier = !tabState.invDebut; tabState.invDebut = true;
    etapeTab('tinv', msg || (premier ? `Les groupes nominaux sont analysés : ${pointsTab()}.` : `${pointsTab()}.`)); return;
  }
  gnVers('fini');
}
function nomSuivant() { tabState.ni += 1; tabState.adjFaits = new Set(); suiteGN(); }
function poseTab(i, html, rouge, avant) { carre(i, html, rouge, avant); }
function clicMotTab(i, el) {
  if (game.fini) return;
  const cases = tabCases(), c = cases[i], e = gnState.etape;
  const choisi = { texte: motT(i), article: c.nat === 'VINF' ? 'un verbe à l\'infinitif' : natOf({ tag: c.nat, texte: c.t }).article };
  const prendre = (cibles, attendu) => {
    let k = cibles.includes(i) ? i : null;
    if (k === null && gnErreur(el, attendu, choisi)) k = cibles[0];
    return k;
  };
  if (e === 'tverbe') {
    const k = prendre(reste((x, j) => estVerbeT(x) && !tabState.natOk.has(j)), 'un verbe conjugué');
    if (k === null || k === undefined) return;
    tabState.courant = k; compteTab(k, 'trouve'); poseTab(k, 'verbe'); gnVers('tverbenat', true); return;
  }
  if (e === 'tsuj') {
    const v = tabState.verbes[tabState.vi];
    const k = prendre(reste((x) => x.fn === 'F.suj' && x.v === v), 'le sujet');
    if (k === null || k === undefined) return;
    tabState.courant = k; compteTab(k, 'fn'); poseTab(k, fnTab(k).replace(/ (du|au) /, '<br>$1 '), true); gnVers('tnat', true); return;
  }
  if (e === 'tobj') {
    const k = prendre([objetT(tabState.objet)], tabState.objet === 'F.att' ? 'l\'attribut du sujet' : `le ${NOM_FN[tabState.objet]}`);
    if (k === null || k === undefined) return;
    tabState.courant = k; compteTab(k, 'fn'); poseTab(k, fnTab(k).replace(/ (du|au) /, '<br>$1 '), true); gnVers('tnat', true); return;
  }
  if (e === 'tcc') {
    const k = prendre(reste((x, j) => ccDuVerbe(tabState.verbes[tabState.vi], j) && !tabState.fnOk.has(j)), 'un complément circonstanciel de ce verbe');
    if (k === null || k === undefined) return;
    tabState.courant = k; tabState.ccFait = true; gnVers('tcctype', true); return;
  }
  if (e === 'tdet') {
    const n = tabState.noms[tabState.ni];
    const k = prendre(reste((x) => /^D\./.test(x.nat) && x.n === n), 'le déterminant');
    if (k === null || k === undefined) return;
    tabState.courant = k; compteTab(k, 'trouve'); poseTab(k, 'déterminant'); gnVers('tdetnat', true); return;
  }
  if (e === 'tadj') {
    const n = tabState.noms[tabState.ni];
    const k = prendre(reste((x, j) => (x.fn === 'F.epi' || x.fn === 'F.app') && x.n === n && !tabState.fnOk.has(j)), 'un adjectif qualificatif');
    if (k === null || k === undefined) return;
    tabState.courant = k; compteTab(k, 'nat'); poseTab(k, 'adjectif<br>qualificatif'); gnVers('tadjfn', true); return;
  }
  if (e === 'tcdn') {
    const n = tabState.noms[tabState.ni];
    const k = prendre(reste((x) => x.fn === 'F.cdn' && x.n === n), 'le complément du nom');
    if (k === null || k === undefined) return;
    tabState.courant = k; compteTab(k, 'fn'); poseTab(k, fnTab(k).replace(/ (du|au) /, '<br>$1 '), true); gnVers('tnat', true); return;
  }
  if (e === 'tinv') {
    const k = prendre(reste((x, j) => !x.fn && !estVerbeT(x) && !/^D\./.test(x.nat) && !tabState.natOk.has(j)), 'un mot invariable');
    if (k === null || k === undefined) return;
    tabState.courant = k; tabState.invVu = true; compteTab(k, 'trouve'); gnVers('tinvnat', true); return;
  }
  const act = document.querySelector('.carte.active'); if (act) { act.classList.remove('gn-flash'); void act.offsetWidth; act.classList.add('gn-flash'); }
}
function answerBoutonTab(code, btn) {
  if (game.fini) return;
  const cases = tabCases(), e = gnState.etape, i = tabState.courant, c = i !== null ? cases[i] : null;
  const faux = (attendu, choisiArticle) => { btn.classList.add('wrong'); btn.disabled = true; return gnErreur(null, attendu, { texte: c ? motT(i) : '—', article: choisiArticle }); };
  const montrer = (x) => document.querySelector(`.carte.active [data-gn="${x}"]`)?.classList.add('correct');
  const art = (x) => (x === 'VINF' ? 'un verbe à l\'infinitif' : NATURE_BY_CODE[x] ? NATURE_BY_CODE[x].article : x);
  const choix = (bon, suite) => {
    if (code !== bon && !faux(art(bon), art(code))) return false;
    if (code === bon) btn.classList.add('correct'); else montrer(bon);
    setTimeout(suite, 600); return true;
  };
  if (e === 'tverbenat') { choix(c.nat, () => { compteTab(i, 'nat'); wordEl(i).querySelector('.lab').innerHTML = c.nat === 'VA' ? 'verbe<br>d\'action' : 'verbe<br>d\'état'; suiteVerbes(); }); return; }
  if (e === 'tnat') {
    const bon = c.nat === 'VINF' ? 'VINF' : natBase(c.nat);
    choix(bon, () => {
      poseTab(i, natNomT(bon).replace(' ', '<br>'), false, true);
      if (bon === 'Pr') { gnVers('tprnat', true); return; }
      compteTab(i, 'nat');
      if (c.fn === 'F.suj') suiteSujets(); else if (CC_CODES.includes(c.fn)) etapeTab('tccq', `${pointsTab()}.`); else if (c.fn === 'F.cdn') nomSuivant(); else suiteObjets();
    });
    return;
  }
  if (e === 'tprnat') { choix(c.nat, () => { compteTab(i, 'nat'); wordEl(i).querySelector('.lab').innerHTML = `pronom<br>${NOM_COURT(c.nat)}`; if (c.fn === 'F.suj') suiteSujets(); else suiteObjets(); }); return; }
  if (e === 'tcctype') { choix(c.fn, () => { compteTab(i, 'fn'); poseTab(i, fnTab(i).replace(/ (du|au) /, '<br>$1 '), true); gnVers('tnat', true); }); return; }
  if (e === 'tdetnat') { choix(c.nat, () => { compteTab(i, 'nat'); wordEl(i).querySelector('.lab').innerHTML = `déterminant<br>${NOM_COURT(c.nat)}${c.contr ? ' contracté' : ''}`; etapeTab('tadjq', '', true); }); return; }
  if (e === 'tadjfn') { choix(c.fn, () => { compteTab(i, 'fn'); poseTab(i, fnTab(i).replace(/ (du|au) /, '<br>$1 '), true); etapeTab('tadjq'); }); return; }
  if (e === 'tinvnat') { choix(c.nat, () => { compteTab(i, 'nat'); poseTab(i, natNomT(c.nat).replace(/ (de) /, '<br>$1 ')); suiteGN(); }); return; }
  /* questions oui / non */
  const n = tabState.noms[tabState.ni];
  const ouiNon = (vrai, suiteOui, suiteNon, quoi) => {
    if ((code === 'oui') !== vrai && !faux(vrai ? `oui, ${quoi}` : `non, pas de ${quoi}`, code)) return;
    gnState.essais = 0;
    setTimeout(vrai ? suiteOui : suiteNon, 500);
  };
  if (e === 'tobjq') { const k = objetT(tabState.objet); ouiNon(k >= 0, () => gnVers('tobj', true), suiteObjets, NOM_FN[tabState.objet]); return; }
  if (e === 'tccq') { ouiNon(reste((x, j) => ccDuVerbe(tabState.verbes[tabState.vi], j) && !tabState.fnOk.has(j)).length > 0, () => gnVers('tcc', true), () => suiteCC(), 'circonstance'); return; }
  if (e === 'tdetq') { ouiNon(reste((x) => /^D\./.test(x.nat) && x.n === n).length > 0, () => gnVers('tdet', true), () => etapeTab('tadjq'), 'déterminant'); return; }
  if (e === 'tadjq') { ouiNon(reste((x, j) => (x.fn === 'F.epi' || x.fn === 'F.app') && x.n === n && !tabState.fnOk.has(j)).length > 0, () => gnVers('tadj', true), () => etapeTab('tcdnq'), 'adjectif épithète ou apposé'); return; }
  if (e === 'tcdnq') { ouiNon(reste((x) => x.fn === 'F.cdn' && x.n === n).length > 0, () => gnVers('tcdn', true), nomSuivant, 'complément du nom'); }
}
function finishQuestionTab() {
  gnState.etape = 'fini';
  $('nat-buttons-variables').innerHTML = '';
  $('nat-instruction').textContent = 'Le tableau est rempli !';
  $('nat-correction-details').innerHTML = nbspFr(`Tu as rempli les vingt cases en suivant la méthode : d'abord les verbes, puis leurs sujets et leurs compléments, ensuite les groupes nominaux, et enfin les mots invariables. Tu as ${fmtPts(game.score)} point${game.score >= 2 ? 's' : ''} sur 20.`);
  $('nat-correction').classList.remove('hidden');
  $('nat-verdict-square').className = `verdict-square ${game.score >= 19.95 ? 'correct' : game.score < 10 ? 'wrong' : 'half'}`;
  $('nat-next-button').textContent = 'Voir mon résultat →';
  majScoreTab();
  showCharacter(game.score >= 10 ? 'good' : 'bad', null);
}

/* ------------------------------------------------------------
   v35 : JEU 6 — LE TABLEAU SANS GUIDE
   L'enfant appuie sur une case, choisit la nature (vert) puis la fonction (rouge) et, pour une fonction, le mot
   dont elle dépend (on appuie sur ce mot dans le tableau). Quand il a fini : « Corriger mon tableau ».
   Barème : 0,5 point pour la nature, 0,5 point pour la fonction (avec le bon mot) ; une case sans fonction
   compte sa moitié « fonction » juste si l'enfant n'en a pas donné. Une case vide vaut zéro.
   ------------------------------------------------------------ */
const NATS6 = ['N', 'NP', 'Pr', 'D', 'A', 'VA', 'VE', 'VINF', 'Av', 'P', 'CC', 'CS', 'I'];
const FNS6 = ['aucune', 'F.suj', 'F.cod', 'F.coi', 'F.cos', 'F.att', 'F.ccl', 'F.cct', 'F.ccm', 'F.ccc', 'F.epi', 'F.app', 'F.cdn'];
const LIB6 = { aucune: 'Pas de fonction', 'F.suj': 'Sujet', 'F.cod': 'COD', 'F.coi': 'COI', 'F.cos': 'COS', 'F.att': 'Attribut du sujet', 'F.ccl': 'CC de lieu', 'F.cct': 'CC de temps', 'F.ccm': 'CC de manière', 'F.ccc': 'CC de cause', 'F.epi': 'Épithète', 'F.app': 'Apposé', 'F.cdn': 'Complément du nom' };
const natLib6 = (code) => (code === 'VINF' ? 'Verbe à l\'infinitif' : code === 'D' ? 'Déterminant' : code === 'Pr' ? 'Pronom' : (NAT_LIB[code] || NATURE_BY_CODE[code]?.nom || code).replace(/&shy;/g, ''));
const lienDe = (fn) => (fn === 'F.att' ? 'sujet' : ['F.epi', 'F.app', 'F.cdn'].includes(fn) ? 'nom' : 'verbe');
const libre = { rep: {}, sel: null, attente: false, corrige: false };
function showQuestionLibre() {
  const cases = tabCases();
  $('nat-sentence').innerHTML = cases.map((c, i) => `<span class="w case" data-i="${i}">${esc(c.t)}</span>`).join('');
  $('nat-character-stage').innerHTML = '';
  $('nat-correction').classList.add('hidden');
  $('nat-verdict-square').className = 'verdict-square';
  $('nat-fn-column').classList.add('hidden'); $('nat-nature-column').classList.remove('hidden');
  $('nat-buttons-invariables').innerHTML = '';
  $('nat-progress-label').textContent = `Texte n° ${game.questions[game.index].t + 1} (${NIVEAU_TEXTE(game.questions[game.index].t)})`;
  Object.assign(libre, { rep: {}, sel: null, attente: false, corrige: false });
  game.score = 0;
  majScoreLibre();
  panneauLibre();
}
function majScoreLibre() {
  const n = Object.values(libre.rep).filter((r) => r.nat).length;
  $('nat-score-label').textContent = libre.corrige ? scoreLabel(game.score) : `${n} case${n > 1 ? 's' : ''} remplie${n > 1 ? 's' : ''} sur 20`;
  $('nat-progress-bar').style.width = `${(n / 20) * 100}%`;
}
/* le texte de la fonction choisie : « sujet du verbe organiser », « épithète du nom souris »… */
function fnLibreTexte(r) {
  if (!r.fn || r.fn === 'aucune') return '';
  if (r.lien === undefined || r.lien === null) return `${LIB6[r.fn].toLowerCase()} de… ?`;
  const C = tabCases(), l = r.lien;
  if (r.fn === 'F.att') return `attribut du sujet ${motT(l)}`;
  if (r.fn === 'F.cdn') return `complément du nom ${motT(l)}`;
  if (r.fn === 'F.epi') return `épithète du nom ${motT(l)}`;
  if (r.fn === 'F.app') return `apposé au nom ${motT(l)}`;
  return `${NOM_FN[r.fn]} du ${estVerbeT(C[l]) || C[l].nat === 'VINF' ? 'verbe' : 'mot'} ${C[l].inf || motT(l)}`;
}
function dessineCaseLibre(i) {
  const el = wordEl(i); if (!el) return;
  el.querySelector('.labs')?.remove();
  const r = libre.rep[i] || {};
  if (r.nat) carre(i, natLib6(r.nat).toLowerCase().replace(/^(\S+) /, '$1<br>'));
  const f = fnLibreTexte(r);
  if (f) carre(i, f.replace(/ (du|de|au) /, '<br>$1 '), true);
  el.classList.toggle('choisie', libre.sel === i);
}
function panneauLibre() {
  const i = libre.sel;
  if (libre.corrige) return;
  if (i === null) {
    $('nat-instruction').textContent = 'Remplis le tableau seul';
    $('nat-buttons-variables').innerHTML = `<div class="carte verte active libre"><p>Appuie sur une case du tableau pour la remplir. Tu peux commencer par où tu veux, et revenir sur une case autant de fois que tu veux.</p></div>${boutonCorriger()}`;
    brancheLibre(); return;
  }
  const r = libre.rep[i] || (libre.rep[i] = {});
  const b = (code, lib, actif, rouge, petit) => `<button type="button" class="nature-button${petit ? ' small' : ''}${rouge ? ' fonction-button' : ''}${actif ? ' correct' : ''}" data-libre="${code}">${lib}</button>`;
  const base = r.nat ? (r.nat.startsWith('D.') ? 'D' : r.nat.startsWith('Pr.') ? 'Pr' : r.nat) : null;
  let html = `<div class="carte verte active libre"><p>Case « ${esc(tabCases()[i].t.replace(/[.,]$/, ''))} » : quelle est sa nature ?</p><div class="carte-choix carte-choix-3">${NATS6.map((c) => b(`n:${c}`, natLib6(c), base === c)).join('')}</div>`;
  if (base === 'D') html += `<p class="sous">Quelle sorte de déterminant ?</p><div class="nature-row nature-row-7">${['D.def', 'D.ind', 'D.pos', 'D.dem', 'D.num', 'D.idf', 'D.int'].map((c) => b(`n:${c}`, NATURE_BY_CODE[c].court, r.nat === c, false, true)).join('')}</div>`;
  if (base === 'Pr') html += `<p class="sous">Quelle sorte de pronom ?</p><div class="nature-row nature-row-7">${['Pr.per', 'Pr.rel', 'Pr.pos', 'Pr.dem', 'Pr.num', 'Pr.idf', 'Pr.int'].map((c) => b(`n:${c}`, NATURE_BY_CODE[c].court, r.nat === c, false, true)).join('')}</div>`;
  html += '</div>';
  html += `<div class="carte rouge active libre"><p>Quelle est sa fonction ?</p><div class="carte-choix carte-choix-3">${FNS6.map((c) => b(`f:${c}`, LIB6[c], r.fn === c, true)).join('')}</div>`;
  if (r.fn && r.fn !== 'aucune') html += `<p class="sous lien">${libre.attente ? `Appuie maintenant dans le tableau sur le ${lienDe(r.fn)} dont dépend « ${esc(motT(i))} ».` : `→ ${esc(fnLibreTexte(r))} (appuie sur « Changer le mot » pour en choisir un autre)`}</p>${libre.attente ? '' : b('lien', 'Changer le mot', false, true)}`;
  html += `</div><div class="carte-choix carte-choix-2">${b('effacer', 'Effacer la case')}${b('fermer', 'Case suivante →')}</div>${boutonCorriger()}`;
  $('nat-instruction').textContent = 'Remplis le tableau seul';
  $('nat-buttons-variables').innerHTML = html;
  brancheLibre();
}
const boutonCorriger = () => `<button type="button" class="nature-button corriger" data-libre="corriger">✔ Corriger mon tableau</button>`;
function brancheLibre() {
  document.querySelectorAll('[data-libre]').forEach((btn) => btn.addEventListener('click', () => actionLibre(btn.dataset.libre)));
}
function clicCaseLibre(i) {
  if (game.fini || libre.corrige) return;
  if (libre.attente && libre.sel !== null) {
    if (i === libre.sel) return;
    libre.rep[libre.sel].lien = i; libre.attente = false;
    dessineCaseLibre(libre.sel); panneauLibre(); return;
  }
  const avant = libre.sel; libre.sel = i;
  if (avant !== null) dessineCaseLibre(avant);
  dessineCaseLibre(i); panneauLibre();
}
function actionLibre(a) {
  const i = libre.sel;
  if (a === 'corriger') { corrigerLibre(); return; }
  if (i === null) return;
  const r = libre.rep[i] || (libre.rep[i] = {});
  if (a.startsWith('n:')) { const c = a.slice(2); r.nat = (c === 'D' || c === 'Pr') && r.nat && r.nat.startsWith(c + '.') ? r.nat : c; }
  else if (a.startsWith('f:')) { r.fn = a.slice(2); r.lien = null; libre.attente = r.fn !== 'aucune'; }
  else if (a === 'lien') libre.attente = true;
  else if (a === 'effacer') { libre.rep[i] = {}; libre.attente = false; }
  else if (a === 'fermer') { libre.attente = false; libre.sel = i + 1 < 20 ? i + 1 : null; dessineCaseLibre(i); if (libre.sel !== null) dessineCaseLibre(libre.sel); panneauLibre(); majScoreLibre(); return; }
  dessineCaseLibre(i); panneauLibre(); majScoreLibre();
}
/* la correction : 0,5 pour la nature, 0,5 pour la fonction (avec le bon mot) */
function corrigerLibre() {
  const vides = 20 - Object.values(libre.rep).filter((r) => r.nat).length;
  if (vides && !confirm(`Il reste ${vides} case${vides > 1 ? 's' : ''} vide${vides > 1 ? 's' : ''}. Corriger quand même ?`)) return;
  libre.corrige = true; libre.attente = false;
  const C = tabCases(); let total = 0;
  const phrase = C.map((c) => c.t).join(' ');
  C.forEach((c, i) => {
    const r = libre.rep[i] || {};
    const natOk = !!r.nat && r.nat === c.nat;
    let fnOk;
    if (!r.nat) fnOk = false;
    else if (!c.fn) fnOk = !r.fn || r.fn === 'aucune';
    else {
      const attendu = c.fn === 'F.att' ? c.s : ['F.epi', 'F.app', 'F.cdn'].includes(c.fn) ? c.n : c.v;
      const autre = c.v !== undefined && C[c.v] && C[c.v].nat === 'VINF' ? C[c.v].v : undefined;
      fnOk = r.fn === c.fn && (r.lien === attendu || (autre !== undefined && r.lien === autre));
    }
    const pts = (natOk ? 0.5 : 0) + (fnOk ? 0.5 : 0);
    total += pts;
    const code = c.nat; if (NATURE_BY_CODE[code]) { const pn = game.parNature[code] || (game.parNature[code] = { c: 0, p: 0 }); pn.p += 1; if (natOk) pn.c += 1; }
    if (c.fn && NATURE_BY_CODE[c.fn]) { const pn = game.parNature[c.fn] || (game.parNature[c.fn] = { c: 0, p: 0 }); pn.p += 1; if (fnOk) pn.c += 1; }
    if (!natOk) game.erreurs.push({ mot: motT(i), bonne: natLib6(c.nat).toLowerCase(), choisie: r.nat ? natLib6(r.nat).toLowerCase() : 'rien', phrase });
    if (!fnOk && r.nat) game.erreurs.push({ mot: motT(i), bonne: c.fn ? fnTab(i) : 'pas de fonction', choisie: r.fn && r.fn !== 'aucune' ? fnLibreTexte(r) : 'pas de fonction', phrase });
    const el = wordEl(i);
    el.classList.remove('choisie');
    el.classList.add(pts === 1 ? 'juste' : pts === 0.5 ? 'moitie' : 'fausse');
    if (pts < 1) {
      const sol = document.createElement('span'); sol.className = 'solution';
      sol.textContent = `→ ${natLib6(c.nat).toLowerCase()}${c.contr ? ' contracté' : ''}${c.fn ? `, ${fnTab(i)}` : ''}`;
      el.appendChild(sol);
    }
  });
  game.score = Math.round(total * 100) / 100;
  majScoreLibre();
  $('nat-buttons-variables').innerHTML = '';
  $('nat-instruction').textContent = 'Ton tableau est corrigé !';
  const n1 = C.filter((c, i) => wordEl(i).classList.contains('juste')).length;
  $('nat-correction-details').innerHTML = nbspFr(`Tu as ${fmtPts(game.score)} point${game.score >= 2 ? 's' : ''} sur 20. ${n1} case${n1 > 1 ? 's sont' : ' est'} entièrement juste${n1 > 1 ? 's' : ''} (en vert). Les cases en orange ont la moitié des points ; les cases en rouge n'en ont pas. Sous chaque case incomplète, la bonne réponse est écrite.`);
  $('nat-correction').classList.remove('hidden');
  $('nat-verdict-square').className = `verdict-square ${game.score >= 19.95 ? 'correct' : game.score < 10 ? 'wrong' : 'half'}`;
  $('nat-next-button').textContent = 'Voir mon résultat →';
  showCharacter(game.score >= 10 ? 'good' : 'bad', null);
}

function finishQuestion(reussi, nature, mot) {
  /* v11 : pour le bilan, on compte chaque nature : demandée (p) et trouvée du premier coup (c). */
  const pn = game.parNature[nature.code] || (game.parNature[nature.code] = { c: 0, p: 0 });
  pn.p += 1; if (reussi && game.essais === 0) pn.c += 1;
  document.querySelectorAll('.nature-button').forEach((b) => {
    b.disabled = true;
    if (!b.classList.contains('correct') && !b.classList.contains('wrong')) b.classList.add('faded');
  });
  document.querySelectorAll('.sentence .w.target').forEach((w) => w.classList.add('found'));
  $('nat-correction-details').innerHTML = nbspFr(`« <strong>${mot.texte}</strong> » est ${nature.article}.<br>${nature.explicationHtml || esc(nature.explication)}`);
  $('nat-correction').classList.remove('hidden');
  $('nat-verdict-square').className = `verdict-square ${reussi ? 'correct' : 'wrong'}`;
  $('nat-next-button').textContent = game.index + 1 < game.questions.length ? 'Suivant →' : 'Voir mon résultat →';
  $('nat-score-label').textContent = scoreLabel(game.score);
  $('nat-progress-bar').style.width = `${((game.index + 1) / game.questions.length) * 100}%`;
}

/* ------------------------------------------------------------
   v39 : LES TEMPS ET LES MODES — EXERCICE 1
   Un texte au système du présent : vingt formes verbales, soulignées. L'enfant appuie sur une forme, choisit
   son temps (étiquette verte) et son mode (étiquette rouge). 0,5 point par temps juste, 0,5 point par mode juste,
   du premier coup : une erreur, et la moitié est perdue (la bonne réponse s'affiche alors).
   Dans le texte : {forme|temps|mode} ; les codes sont ceux de la fiche temps et modes (TPS.…, MODE.…).
   ------------------------------------------------------------ */
const TEMPS_TM = [
  { code: 'TPS.pres', nom: 'Présent' }, { code: 'TPS.imp', nom: 'Imparfait' }, { code: 'TPS.ps', nom: 'Passé simple' },
  { code: 'TPS.fut', nom: 'Futur simple' }, { code: 'TPS.pc', nom: 'Passé composé' }, { code: 'TPS.pqp', nom: 'Plus-que-parfait' },
  { code: 'TPS.pa', nom: 'Passé antérieur' }, { code: 'TPS.fa', nom: 'Futur antérieur' }, { code: 'TPS.passe', nom: 'Passé' },
];
const MODES_TM = [
  { code: 'MODE.ind', nom: 'Indicatif' }, { code: 'MODE.cond', nom: 'Conditionnel' }, { code: 'MODE.subj', nom: 'Subjonctif' },
  { code: 'MODE.imp', nom: 'Impératif' }, { code: 'MODE.inf', nom: 'Infinitif' }, { code: 'MODE.part', nom: 'Participe' }, { code: 'MODE.ger', nom: 'Gérondif' },
];
/* v42 : les valeurs du temps et du mode (exercice 3) ; « court » est ce qui s'écrit sur l'étiquette */
const VT_TM = [
  { code: 'VT.mom', nom: 'Présent d\'énonciation', court: 'présent d\'énonciation' }, { code: 'VT.hab', nom: 'Habitude', court: 'habitude' },
  { code: 'VT.desc', nom: 'Description', court: 'description' }, { code: 'VT.vg', nom: 'Vérité générale', court: 'vérité générale' },
  { code: 'VT.ant', nom: 'Antériorité', court: 'antériorité' }, { code: 'VT.post', nom: 'Postériorité', court: 'postériorité' },
  { code: 'VT.pp', nom: 'Premier plan', court: 'premier plan' }, { code: 'VT.sp', nom: 'Second plan', court: 'second plan' },
  { code: 'VT.rps', nom: 'Remplace le passé simple', court: 'remplace le passé simple' },
];
const VM_TM = [
  { code: 'VM.reel', nom: 'Réalité (fait réel ou certain)', court: 'réalité' }, { code: 'VM.souhait', nom: 'Souhait ou regret', court: 'souhait' },
  { code: 'VM.hyp', nom: 'Hypothèse', court: 'hypothèse' }, { code: 'VM.idee', nom: 'Idée, sentiment, volonté', court: 'idée, volonté' },
  { code: 'VM.ordre', nom: 'Ordre', court: 'ordre' },
];
[...VT_TM, ...VM_TM].forEach((x) => { x.article = x.nom.toLowerCase(); x.explication = ''; NATURE_BY_CODE[x.code] = x; });
[...TEMPS_TM, ...MODES_TM].forEach((x) => { x.article = x.nom.toLowerCase(); x.explication = ''; NATURE_BY_CODE[x.code] = x; });
const NOM_TM = (code) => NATURE_BY_CODE[code]?.nom || code;
const TEXTES_TM = [
  { titre: 'Champignons', systeme: 'présent',
    texte: "Aujourd'hui il {fait|pres|ind} beau et nous nous {promenons|pres|ind} dans la forêt où nous {cherchons|pres|ind} souvent des champignons. Nous {pouvons|pres|ind} y {passer|pres|inf} des heures, {marchant|pres|part} , {plaisantant|pres|part} , sans jamais nous {lasser|pres|inf} . Hier nous en {avons trouvé|pc|ind} trois kilos et nous {voudrions|pres|cond} que la cueillette {soit|pres|subj} aussi bonne aujourd'hui. Soudain ma sœur {crie|pres|ind} : « {Venez|pres|imp} ! » Alors nous {courons|pres|ind} vers elle {en espérant|pres|ger} que nous {découvrirons|fut|ind} un splendide bolet ! Mais, hélas, ce ne {sont|pres|ind} que de petits champignons et je {crains|pres|ind} bien qu'ils {soient|pres|subj} vénéneux. Nous {repartons|pres|ind} vers d'autres découvertes." },
  /* v40 : le même texte au système du passé, dans la langue du 19e siècle (passé simple, imparfait du subjonctif…) */
  { titre: 'Champignons', systeme: 'passé',
    texte: "Ce jour-là il {faisait|imp|ind} beau et nous nous {promenions|imp|ind} dans la forêt où nous {cherchions|imp|ind} souvent des champignons. Nous {pouvions|imp|ind} y {passer|pres|inf} des heures, {marchant|pres|part} , {plaisantant|pres|part} , sans jamais nous {lasser|pres|inf} . La veille nous en {avions trouvé|pqp|ind} trois kilos et nous {aurions voulu|passe|cond} que la cueillette {fût|imp|subj} aussi bonne pendant cette journée. Soudain ma sœur {cria|ps|ind} : « {Venez|pres|imp} ! » Alors nous {courûmes|ps|ind} vers elle {en espérant|pres|ger} que nous {découvririons|pres|cond} un splendide bolet ! Mais, hélas, ce n'{étaient|imp|ind} que de petits champignons et je {craignais|imp|ind} bien qu'ils {fussent|imp|subj} vénéneux. Nous {repartîmes|ps|ind} vers d'autres découvertes.",
    bilan: "Le texte se présente comme un <strong>souvenir</strong> : c'est le système du passé. Les actions qui font avancer l'histoire, à un moment précis, sont au <strong>passé simple</strong> (premier plan) : <em>cria, courûmes, repartîmes</em>. Le décor et ce qui dure sont à l'<strong>imparfait</strong> (second plan) : <em>faisait, promenions, cherchions…</em> Ce qui s'est passé avant est au <strong>plus-que-parfait</strong> : <em>avions trouvé</em>. Ce qui se passera après est au <strong>conditionnel présent</strong> : <em>découvririons</em>. Et après « que », le subjonctif est à l'<strong>imparfait</strong> : <em>fût, fussent</em>." },
];
/* v42 : exercice 3 : les dix verbes conjugués à un mode personnel ; pour chacun, temps, mode, valeur du temps, valeur du mode.
   {forme|temps|mode|valeur du temps|valeur du mode} ; plusieurs valeurs acceptées : séparées par « / ». */
TEXTES_TM.push({ titre: 'TGV', systeme: 'présent',
  texte: "Tous les ans, je {vais|pres|ind|hab|reel} passer Noël en famille en prenant le TGV. Aujourd'hui, j'{attends|pres|ind|mom|reel} mon train pour Marseille. Il y {a|pres|ind|desc|reel} beaucoup de monde sur le quai cette année mais soudain on {annonce|pres|ind|mom|reel} que le TGV {aura|fut|ind|post|reel} trois heures de retard, car il {a été bloqué|pc|ind|ant|reel} par la neige. Les voyageurs {voudraient|pres|cond|mom|souhait} que cela {change|pres|subj|mom/post|idee} , certains {crient|pres|ind|mom|reel} : « {Informez|pres|imp|mom/post|ordre} -nous au moins ! »",
  bilan: "« TGV » est un texte au <strong>système du présent</strong> : on y dit ce qui se passe au moment où l'on parle. Les dix verbes sont conjugués à un <strong>mode personnel</strong> (indicatif, conditionnel, subjonctif, impératif) : ils changent avec la personne. Chaque temps a une <strong>valeur</strong> : l'habitude (<em>tous les ans, je vais</em>), la description (<em>il y a beaucoup de monde</em>), le présent d'énonciation, qui dit ce qui se passe au moment où l'on parle (<em>j'attends, on annonce, crient</em>), l'antériorité du passé composé (<em>a été bloqué</em>), la postériorité du futur (<em>aura</em>). Chaque mode aussi : la réalité (indicatif), le souhait (<em>voudraient</em>), la volonté (<em>que cela change</em>), l'ordre (<em>Informez-nous</em>)." });
/* v45 : exercice 4 : « Bonbons », au système du passé, en français classique puis contemporain, avec les valeurs */
TEXTES_TM.push({ titre: 'Bonbons', systeme: 'passé',
  texte: "Ce jour-là le temps {était|imp|ind|desc|reel} pluvieux. D'habitude nous {allions|imp|ind|hab|reel} nous promener, mais là nous {paressions|imp|ind|sp|reel} dans le salon devant la télé. Soudain mon frère s'{écria|ps|ind|pp|reel} : « J'{ai mangé|pc|ind|ant|reel} mes derniers bonbons ! » Je lui {répondis|ps|ind|pp|reel} que nous {irions|pres|cond|post|perte} en chercher quand il ne {pleuvrait|pres|cond|post|perte} plus, et que moi, je n'{avais pas fini|pqp|ind|ant|reel} mon paquet qui {était|imp|ind|desc|reel} encore à moitié plein.",
  moderne: "Ce jour-là le temps {=0} pluvieux. D'habitude nous {=1} nous promener, mais là nous {=2} dans le salon devant la télé. Soudain mon frère s'{#0} : « J'{=4} mes derniers bonbons ! » Je lui {#1} que nous {#2} en chercher quand il ne {=7} plus, et que moi, je n'{=8} mon paquet qui {=9} encore à moitié plein.",
  suite: [
    { ancien: 'écria', t: 'est écrié', tps: 'TPS.pc', mode: 'MODE.ind', vt: ['VT.rps'], vm: ['VM.reel'], pourquoi: "en français contemporain, le <strong>passé composé remplace le passé simple</strong>." },
    { ancien: 'répondis', t: 'ai répondu', tps: 'TPS.pc', mode: 'MODE.ind', vt: ['VT.rps'], vm: ['VM.reel'], pourquoi: "le passé simple est remplacé par le <strong>passé composé</strong>." },
    { ancien: 'irions', t: 'allions aller', tps: 'TPS.imp', mode: 'MODE.ind', vt: ['VT.post'], vm: ['VM.reel'], pourquoi: "pour dire le futur dans le passé, on dit <strong>aller à l'imparfait + infinitif</strong>. Le temps et le mode sont ceux de <em>allions</em>." },
  ],
  cadres: ['En français classique', 'Le même texte en français contemporain'],
  bilan: "« Bonbons » est un texte au <strong>système du passé</strong>. Le passé simple porte le <strong>premier plan</strong>, les actions qui font avancer l'histoire (<em>s'écria, répondis</em>) ; l'imparfait le <strong>second plan</strong> (<em>paressions</em>), la <strong>description</strong> (<em>était</em>) et l'<strong>habitude</strong> (<em>allions</em>). Le plus-que-parfait marque l'<strong>antériorité</strong> par rapport au passé (<em>avais pas fini</em>) ; dans les paroles du frère, rapportées au système du présent, le passé composé aussi (<em>ai mangé</em>). Le conditionnel présent marque la <strong>postériorité</strong> : c'est le futur dans le passé (<em>irions, pleuvrait</em>). Employé ainsi comme un temps, le conditionnel a perdu sa valeur de mode : certaines grammaires le rangent d'ailleurs dans l'indicatif.",
  bilanSuite: "En <strong>français contemporain</strong>, le <strong>passé composé remplace le passé simple</strong> (<em>s'est écrié, ai répondu</em>), et le futur dans le passé se dit plutôt avec <strong>aller à l'imparfait + infinitif</strong> (<em>allions aller</em>)." });
/* v41 : la suite de l'exercice 2. Une fois le texte du 19e siècle fini, le même texte apparaît dans un second cadre,
   dans la langue d'aujourd'hui : les formes inchangées gardent les étiquettes (corrigées) du premier cadre ; les formes
   modernes apparaissent, et l'enfant donne leur temps et leur mode. Le barème s'ajoute : 20 + 6 = 26 points.
   Dans « moderne » : {=k} = la forme k du premier texte, inchangée ; {#n} = la forme moderne n de « suite ». */
TEXTES_TM[1].moderne = "Ce jour-là il {=0} beau et nous nous {=1} dans la forêt où nous {=2} souvent des champignons. Nous {=3} y {=4} des heures, {=5} , {=6} , sans jamais nous {=7} . La veille nous en {=8} trois kilos et nous {=9} que la cueillette {#0} aussi bonne pendant cette journée. Soudain ma sœur {#1} : « {=12} ! » Alors nous {#2} vers elle {=14} que nous {#3} un splendide bolet ! Mais, hélas, ce n'{=16} que de petits champignons et je {=17} bien qu'ils {#4} vénéneux. Nous {#5} vers d'autres découvertes.";
TEXTES_TM[1].suite = [
  { ancien: 'fût', t: 'soit', tps: 'TPS.pres', mode: 'MODE.subj', pourquoi: "l'imparfait du subjonctif a disparu de la langue courante : on le remplace par le <strong>subjonctif présent</strong>." },
  { ancien: 'cria', t: 'a crié', tps: 'TPS.pc', mode: 'MODE.ind', pourquoi: "on n'emploie presque plus le passé simple : on le remplace par le <strong>passé composé</strong>." },
  { ancien: 'courûmes', t: 'avons couru', tps: 'TPS.pc', mode: 'MODE.ind', pourquoi: "le passé simple est remplacé par le <strong>passé composé</strong>." },
  { ancien: 'découvririons', t: 'allions découvrir', tps: 'TPS.imp', mode: 'MODE.ind', pourquoi: "pour dire le futur dans le passé, on n'emploie plus guère le conditionnel présent : on dit <strong>aller à l'imparfait + infinitif</strong>. Le temps et le mode sont ceux de <em>allions</em>." },
  { ancien: 'fussent', t: 'soient', tps: 'TPS.pres', mode: 'MODE.subj', pourquoi: "l'imparfait du subjonctif est remplacé par le <strong>subjonctif présent</strong>." },
  { ancien: 'repartîmes', t: 'sommes repartis', tps: 'TPS.pc', mode: 'MODE.ind', pourquoi: "le passé simple est remplacé par le <strong>passé composé</strong>." },
];
TEXTES_TM[1].cadres = ['En français classique', 'Le même texte en français contemporain'];
TEXTES_TM[1].bilanSuite = "En <strong>français contemporain</strong>, le texte reste au système du passé, mais le <strong>passé simple</strong> devient un <strong>passé composé</strong> (<em>a crié, avons couru, sommes repartis</em>), l'<strong>imparfait du subjonctif</strong> devient un <strong>subjonctif présent</strong> (<em>soit, soient</em>), et le futur dans le passé se dit avec <strong>aller à l'imparfait + infinitif</strong> (<em>allions découvrir</em>). Le passé simple et l'imparfait du subjonctif restent la langue des livres.";
/* le texte découpé : des mots, et des formes verbales { t, tps, mode } */
function decoupeTM(src) {
  const mots = [], formes = []; let ph = 0;   /* v77 : le numéro de la phrase de chaque forme */
  src.replace(/\{([^}|]+)\|([^}|]+)\|([^}|]+)(?:\|([^}|]+)\|([^}|]+))?\}|([^\s{]+)/g, (m, f, tps, mode, vt, vm, w) => {
    if (f) {
      mots.push({ t: f, k: formes.length });
      const x = { t: f, tps: `TPS.${tps}`, mode: `MODE.${mode}` };
      if (vt) {
        x.vt = vt.split('/').map((v) => `VT.${v}`);
        /* v46 : « perte » : un conditionnel employé comme temps (futur dans le passé) a perdu sa valeur de mode ; on attend « réalité » */
        if (vm === 'perte') { x.vm = ['VM.reel']; x.vmTexte = 'qui a perdu ici sa valeur de mode : réalité'; } else x.vm = vm.split('/').map((v) => `VM.${v}`);
      }
      x.ph = ph; formes.push(x);
      if (/[.!?]$/.test(f)) ph += 1;
    } else { mots.push({ t: w }); if (/[.!?]$/.test(w) || /^[.!?]/.test(w)) ph += 1; }
    return m;
  });
  return { mots, formes };
}
const tm = { rep: {}, sel: null, texte: null, phase: 1 };
const isT1 = () => !!(currentGame.tm || currentGame.tf || currentGame.sx || currentGame.dr || currentGame.tv);   /* v40 : tous les exercices des temps et des modes */
/* les formes : 0…19 dans le premier cadre ; 100, 101… pour les formes modernes du second cadre */
const TM_T = () => TEXTES_TM[game.questions[game.index].t];
const formeTM = (i) => (i >= 100 ? TM_T().suite[i - 100] : tm.texte.formes[i]);
const indicesPhase = () => (tm.phase === 1 ? tm.texte.formes.map((f, k) => k) : TM_T().suite.map((f, n) => 100 + n));
const CHAMPS_TM = () => (currentGame.valeurs ? ['tps', 'mode', 'vt', 'vm'] : currentGame.sansMode ? ['tps'] : ['tps', 'mode']);
const estFaite = (i) => !!tm.rep[i] && CHAMPS_TM().every((c) => tm.rep[i][c]);
const accepte = (f, champ, code) => [].concat(f[champ]).includes(code);
const bonneTM = (f, champ) => [].concat(f[champ])[0];
/* « du présent », « de l'imparfait », « de l'indicatif » */
const duTM = (code) => { const n = NOM_TM(code).toLowerCase(); return /^[aeiouéèi]/.test(n) ? `de l'${n}` : `du ${n}`; };
const LISTE_TM = { tps: TEMPS_TM, mode: MODES_TM, vt: VT_TM, vm: VM_TM };
const etiquetteTM = (code) => (NATURE_BY_CODE[code]?.court || NOM_TM(code).toLowerCase());
/* les étiquettes d'une forme : le temps (vert) et le mode (rouge). v44 : dans l'exercice 3, la valeur ne fait pas
   une étiquette à part : elle prolonge celle du temps ou du mode (« présent d'habitude », « indicatif, mode de la réalité »).
   Chaque morceau faux est marqué ✗ et montre la bonne réponse, sur fond orange. */
const SUITE_VT = { 'VT.mom': 'd\'énonciation', 'VT.hab': 'd\'habitude', 'VT.desc': 'de description', 'VT.vg': 'de vérité générale', 'VT.ant': 'd\'antériorité', 'VT.post': 'de postériorité', 'VT.pp': 'de premier plan', 'VT.sp': 'de second plan', 'VT.rps': 'qui remplace le passé simple' };
const SUITE_VM = { 'VM.reel': 'mode de la réalité', 'VM.souhait': 'mode du souhait', 'VM.hyp': 'mode de l\'hypothèse', 'VM.idee': 'mode de l\'idée, de la volonté', 'VM.ordre': 'mode de l\'ordre' };
function poseLabelsTM(i) {
  const el = wordEl(i), f = formeTM(i), r = tm.rep[i] || {};
  el.querySelector('.labs')?.remove();
  const morceau = (c, texte) => { const juste = accepte(f, c, r[c]); return `<span class="morceau${juste ? '' : ' corrige'}">${juste ? '' : '✗ '}${texte}</span>`; };
  const aff = (c) => (accepte(f, c, r[c]) ? r[c] : bonneTM(f, c));
  [['tps', 'vt', false], ['mode', 'vm', true]].forEach(([c, v, rouge]) => {
    if (!r[c]) return;
    let html = morceau(c, etiquetteTM(aff(c)));
    if (r[v]) html += (rouge ? ', ' : ' ') + morceau(v, (rouge && f.vmTexte && accepte(f, v, r[v]) ? f.vmTexte : (rouge ? SUITE_VM : SUITE_VT)[aff(v)]) || etiquetteTM(aff(v)));
    carre(i, html, rouge);
    const lab = [...el.querySelectorAll('.labs .lab')].pop();
    if (r[v]) lab.classList.add('allonge');
    if (!r[v] && !accepte(f, c, r[c])) lab.classList.add('corrige');
  });
}
const formesFaites = () => Object.keys(tm.rep).filter((k) => estFaite(Number(k))).length;
const nbFormesTM = () => tm.texte.formes.length + (TM_T().suite ? TM_T().suite.length : 0);
/* un cadre de texte : les mots, les formes soulignées ; la ponctuation reste collée au mot */
function cadreTM(src, titre, n2) {
  const items = []; let avant = '';
  src.replace(/\{([^}|#=]+)\|([^}|]+)\|([^}|]+)(?:\|[^}|]+\|[^}|]+)?\}|\{=(\d+)\}|\{#(\d+)\}|([^\s{]+)/g, (m, f, tps, mode, eg, nv, w) => {
    if (w !== undefined) {
      if (/^-/.test(w) && items.length) { items[items.length - 1].suf += w; return m; }
      if (/^[.,;:!?»]$/.test(w) && items.length) { items[items.length - 1].suf += (/^[;:!?»]$/.test(w) ? ' ' : '') + w; return m; }
      if (w === '«') { avant += '« '; return m; }
      if (/['’]$/.test(w)) { avant += w; return m; }
      items.push({ t: w, pre: avant, suf: '' });
    } else if (f !== undefined) items.push({ t: f, k: items.filter((x) => x.k !== undefined).length, pre: avant, suf: '' });
    else if (eg !== undefined) items.push({ t: tm.texte.formes[Number(eg)].t, copie: Number(eg), pre: avant, suf: '' });
    else items.push({ t: TM_T().suite[Number(nv)].t, k: 100 + Number(nv), ancien: TM_T().suite[Number(nv)].ancien, pre: avant, suf: '' });
    avant = ''; return m;
  });
  const html = items.map((m) => {
    if (m.k !== undefined) return `<span class="w forme${m.ancien ? ' trou' : ''}" data-i="${m.k}">${m.ancien ? `<span class="ancien">${esc(m.ancien)}</span>` : ''}<span class="tx">${m.pre}<span class="f">${esc(m.t)}</span>${m.suf}</span></span>`;
    if (m.copie !== undefined) {
      const labs = wordEl(m.copie)?.querySelector('.labs');
      return `<span class="w forme fige"><span class="tx">${m.pre}<span class="f">${esc(m.t)}</span>${m.suf}</span>${labs ? labs.outerHTML : ''}</span>`;
    }
    return `<span class="w mot"><span class="tx">${m.pre}${esc(m.t)}${m.suf}</span></span>`;
  }).join('');
  return `<div class="tm-cadre${n2 ? ' tm-cadre2' : ''}">${titre ? `<h3 class="tm-titre">${esc(titre)}</h3>` : ''}<div class="tm-texte">${html}</div></div>`;
}
function showQuestionTM() {
  const T = TM_T();
  tm.texte = decoupeTM(T.texte);
  Object.assign(tm, { rep: {}, sel: null, phase: 1 });
  $('nat-sentence').innerHTML = cadreTM(T.texte, T.cadres ? T.cadres[0] : '');
  $('nat-character-stage').innerHTML = '';
  $('nat-correction').classList.add('hidden');
  $('nat-verdict-square').className = 'verdict-square';
  $('nat-fn-column').classList.add('hidden'); $('nat-nature-column').classList.remove('hidden');
  $('nat-buttons-invariables').innerHTML = '';
  $('nat-progress-label').textContent = `« ${T.titre} »`;
  game.score = 0;
  majScoreTM();
  panneauTM();
  requestAnimationFrame(ajusteArdoise);
}
function majScoreTM() {
  $('nat-score-label').textContent = scoreLabel(game.score);
  $('nat-progress-bar').style.width = `${(formesFaites() / nbFormesTM()) * 100}%`;
}
function panneauTM() {
  const i = tm.sel, idx = indicesPhase(), N = idx.length, faites = idx.filter(estFaite).length;
  $('nat-instruction').textContent = tm.phase === 1 ? (TML().instr || 'Le temps et le mode de chaque forme verbale') : 'Les formes du français contemporain';
  const O = TML().obj || (TML().mots ? ['mot', 'mots'] : ['forme', 'formes verbales', true]), fait = (k) => `fait${O[2] ? 'e' : ''}${k > 1 ? 's' : ''}`;
  if (i === null) {
    $('nat-buttons-variables').innerHTML = tm.phase === 1
      ? `<div class="carte verte active libre"><p>Dans ce texte, ${N} ${O[1]} sont ${O[2] ? 'soulignées. Appuie sur l\'une d\'elles' : 'soulignés. Appuie sur l\'un d\'eux'}, dans l'ordre que tu veux : tu donneras ${TML().donne || 'son <strong>temps</strong> (étiquette verte)'}${currentGame.sansMode || TML().deux ? '' : ' et son <strong>mode</strong> (étiquette rouge)'}.</p><p class="sous">${faites} ${faites > 1 ? O[1] : O[0]} sur ${N} déjà ${fait(faites)}.</p></div>`
      : `<div class="carte verte active libre"><p>Bravo, le premier texte est fini ! Voici <strong>le même texte en français contemporain</strong>. Les formes qui n'ont pas changé gardent leurs étiquettes. ${N} formes ont changé : la forme du français classique est barrée en petit au-dessus. Appuie sur chacune et donne son <strong>temps</strong> et son <strong>mode</strong>${currentGame.valeurs ? ', puis leurs <strong>valeurs</strong>' : ''}.</p><p class="sous">${faites} forme${faites > 1 ? 's' : ''} sur ${N} déjà faite${faites > 1 ? 's' : ''}.</p></div>`;
    return;
  }
  if (parPhraseTM()) { panneauPhraseTM(); return; }
  const f = formeTM(i), r = tm.rep[i] || (tm.rep[i] = {});
  const b = (code, rouge, champ) => {
    const rep = r[champ], fait = !!rep, cls = !fait ? '' : accepte(f, champ, code) && (code === rep || !accepte(f, champ, rep)) ? ' correct' : code === rep ? ' wrong' : ' faded';
    return `<button type="button" class="nature-button${rouge ? ' fonction-button' : ''}${cls}" data-tm="${code}" data-champ="${champ}"${fait ? ' disabled' : ''}>${NOM_TM(code)}</button>`;
  };
  const carte = (champ, rouge, question, cols) => `<div class="carte ${rouge ? 'rouge' : 'verte'} active libre${champ.startsWith('v') ? ' carte-valeur' : ''}"><p>${question}</p><div class="carte-choix carte-choix-${cols}">${(champ === 'tps' && currentGame.tmListe ? TM_LISTES[currentGame.tmListe] : champ === 'mode' && currentGame.tmListe2 ? TM_LISTES[currentGame.tmListe2] : LISTE_TM[champ]).filter((x) => !currentGame.tmChoix?.[champ] || currentGame.tmChoix[champ].includes(x.code)).map((x) => b(x.code, rouge, champ)).join('')}</div></div>`;
  let html = carte('tps', false, `« ${esc(f.t)} » : ${currentGame.tmQuestion || 'quel est son <strong>temps</strong> ?'}`, currentGame.tmListe ? (TML().cols || 3) : currentGame.sansMode ? 2 : 3) + (currentGame.sansMode ? '' : carte('mode', true, currentGame.tmQuestion2 || 'Quel est son <strong>mode</strong> ?', TML().cols2 || 3));
  /* exercice 3 : les valeurs, une fois le temps et le mode donnés */
  if (currentGame.valeurs && r.tps && r.mode) {
    html += carte('vt', false, `Pourquoi ce temps ? Quelle est la <strong>valeur</strong> ${duTM(f.tps)} ici ?`, 2);
    html += carte('vm', true, `Pourquoi ce mode ? Quelle est la <strong>valeur</strong> ${duTM(f.mode)} ici ?`, 2);
  }
  if (estFaite(i)) html += `<p class="sous tm-bilan">« ${esc(f.t)} » : ${currentGame.sansMode ? NOM_TM(f.tps).toLowerCase() : `temps ${NOM_TM(f.tps).toLowerCase()}, mode ${NOM_TM(f.mode).toLowerCase()}`}.${f.vt ? ` Valeur du temps : ${etiquetteTM(bonneTM(f, 'vt'))} ; valeur du mode : ${etiquetteTM(bonneTM(f, 'vm'))}.` : ''}${f.ancien ? ` En français classique, on écrivait « ${esc(f.ancien)} » : ${f.pourquoi}` : ''}</p>`;
  $('nat-buttons-variables').innerHTML = nbspFr(html);
  document.querySelectorAll('[data-tm]').forEach((btn) => btn.addEventListener('click', () => repondTM(btn.dataset.tm, btn.dataset.champ)));
}
/* v77 : au CE, on travaille phrase par phrase : toutes les étiquettes d'une même phrase dans le même panneau */
const parPhraseTM = () => tm.phase === 1 && !currentGame.valeurs && !TML().seul && /^(ce|cm)(-|$)/.test(currentGame.tmNiv || '');
function panneauPhraseTM() {
  const ph = formeTM(tm.sel).ph, tous = indicesPhase(), G = tous.filter((j) => formeTM(j).ph === ph);
  const phs = [...new Set(tous.map((j) => formeTM(j).ph))], O = TML().obj || (TML().mots ? ['mot', 'mots'] : ['verbe', 'verbes']);
  const liste = (currentGame.tmListe ? TM_LISTES[currentGame.tmListe] : LISTE_TM.tps).filter((x) => !currentGame.tmChoix?.tps || currentGame.tmChoix.tps.includes(x.code));
  const cols = currentGame.tmListe ? (TML().cols || 3) : 2;
  let html = `<p class="sous tf-phrase-n">Phrase ${phs.indexOf(ph) + 1} sur ${phs.length} : ${G.length} ${G.length > 1 ? O[1] : O[0]} à étiqueter, un par encart.</p>`;
  G.forEach((j) => {
    const f = formeTM(j), r = tm.rep[j] || {}, fini = estFaite(j), actif = j === tm.sel && !fini;
    const b = (code, champ) => { const rep = r[champ], cls = !rep ? '' : accepte(f, champ, code) && (code === rep || !accepte(f, champ, rep)) ? ' correct' : code === rep ? ' wrong' : ' faded'; return `<button type="button" class="nature-button${champ === 'mode' ? ' fonction-button' : ''}${cls}" data-tm="${code}" data-champ="${champ}" data-j="${j}"${rep ? ' disabled' : ''}>${NOM_TM(code)}</button>`; };
    html += `<div class="carte verte libre tf-encart${actif ? ' active' : ''}${fini ? ' faite' : ''}"><p>« ${esc(f.t)} » : ${currentGame.tmQuestion || 'quel est son <strong>temps</strong> ?'}</p><div class="carte-choix carte-choix-${cols}">${liste.map((x) => b(x.code, 'tps')).join('')}</div>`;
    if (!currentGame.sansMode) { const L2 = (currentGame.tmListe2 ? TM_LISTES[currentGame.tmListe2] : LISTE_TM.mode).filter((x) => !currentGame.tmChoix?.mode || currentGame.tmChoix.mode.includes(x.code)); html += `<p class="tm-q2">${currentGame.tmQuestion2 || 'Quel est son <strong>mode</strong> ?'}</p><div class="carte-choix carte-choix-${TML().cols2 || 3}">${L2.map((x) => b(x.code, 'mode')).join('')}</div>`; }
    html += '</div>';
  });
  $('nat-buttons-variables').innerHTML = nbspFr(html);
  document.querySelectorAll('[data-tm][data-j]').forEach((btn) => btn.addEventListener('click', () => {
    const j = Number(btn.dataset.j);
    if (tm.sel !== j) { wordEl(tm.sel)?.classList.remove('choisie'); tm.sel = j; wordEl(j)?.classList.add('choisie'); }
    repondTM(btn.dataset.tm, btn.dataset.champ);
  }));
}
function clicFormeTM(i) {
  if (game.fini || i === tm.sel || !indicesPhase().includes(i)) return;
  const avant = tm.sel; tm.sel = i;
  if (avant !== null) wordEl(avant)?.classList.remove('choisie');
  wordEl(i)?.classList.add('choisie');
  panneauTM();
  if (!estFaite(i) && !(parPhraseTM() && avant !== null && formeTM(avant)?.ph === formeTM(i).ph)) dis(TML().seul ? formeTM(i).t : phraseDe(wordEl(i)));
}
function repondTM(code, champ) {
  const i = tm.sel; if (i === null || game.fini) return;
  const f = formeTM(i), r = tm.rep[i] || (tm.rep[i] = {});
  champ = champ || (code.startsWith('TPS.') ? 'tps' : 'mode');
  if (r[champ]) return;
  r[champ] = code;
  const bon = bonneTM(f, champ), juste = accepte(f, champ, code);
  if (juste) game.score = Math.round((game.score + (currentGame.sansMode ? 1 : 0.5)) * 10) / 10;
  else game.erreurs.push({ mot: f.t, bonne: etiquetteTM(bon), choisie: etiquetteTM(code), phrase: `texte « ${TM_T().titre} »` });
  const pn = game.parNature[bon] || (game.parNature[bon] = { c: 0, p: 0 }); pn.p += 1; if (juste) pn.c += 1;
  poseLabelsTM(i);
  majScoreTM();
  panneauTM();
  if (estFaite(i)) {
    wordEl(i).classList.add('remplie');
    /* v75 : la ponctuation : une fois la réponse donnée, le bon signe s'écrit au bout de la phrase */
    if (currentGame.tmListe === 'ponct' && !wordEl(i).querySelector('.ponct-ajout')) (wordEl(i).querySelector('.tx') || wordEl(i)).insertAdjacentHTML('beforeend', `<span class="ponct-ajout">${{ 'TPS.pt': '.', 'TPS.pi': '\u00a0?', 'TPS.pe': '\u00a0!' }[bon] || ''}</span>`);
    const idx = indicesPhase();
    if (idx.every(estFaite)) {
      if (tm.phase === 1 && TM_T().suite) { setTimeout(proposeSuiteTM, 1000); return; }
      setTimeout(finTM, tm.phase === 2 ? 2500 : 900); return;
    }
    /* on passe à la forme suivante qui reste à faire */
    setTimeout(() => {
      if (tm.sel !== i) return;
      const p = idx.indexOf(i);
      for (let d = 1; d <= idx.length; d++) { const k = idx[(p + d) % idx.length]; if (!estFaite(k)) { clicFormeTM(k); return; } }
    }, tm.phase === 2 ? 2500 : 1300);
  }
}
/* v43 : à la fin du premier texte, une flèche invite à passer au français d'aujourd'hui */
function proposeSuiteTM() {
  wordEl(tm.sel)?.classList.remove('choisie'); tm.sel = null;
  const q = 'Et en français contemporain, qu\'est-ce que cela donne ?';
  $('nat-instruction').textContent = 'Le premier texte est fini !';
  $('nat-buttons-variables').innerHTML = `<div class="carte verte active libre"><p>Bravo, tu as fini le texte en français classique (${fmtPts(game.score)} point${game.score >= 2 ? 's' : ''} pour l'instant).</p><button type="button" class="primary-button suite-tm" data-suite="1">➜ ${q}</button></div>`;
  const t = $('nat-sentence').querySelector('.tm-cadre .tm-texte');
  t.insertAdjacentHTML('beforeend', `<button type="button" class="suite-tm suite-tm-texte" data-suite="1">➜ ${q}</button>`);
  document.querySelectorAll('[data-suite]').forEach((b) => b.addEventListener('click', debutSuiteTM));
}
/* la suite : le second cadre apparaît sous le premier */
function debutSuiteTM() {
  const T = TM_T();
  if (tm.phase === 2) return;
  $('nat-sentence').querySelectorAll('.suite-tm').forEach((b) => b.remove());
  wordEl(tm.sel)?.classList.remove('choisie'); tm.sel = null;
  tm.phase = 2;
  /* le premier cadre se replie (on peut le rouvrir) ; le second prend sa place */
  const c1 = $('nat-sentence').querySelector('.tm-cadre');
  c1.classList.add('replie');
  const t1 = c1.querySelector('.tm-titre');
  t1.innerHTML = `▸ ${esc(T.cadres[0])} : appuie ici pour le revoir`;
  t1.addEventListener('click', () => { const r = c1.classList.toggle('replie'); t1.innerHTML = `${r ? '▸' : '▾'} ${esc(T.cadres[0])}${r ? ' : appuie ici pour le revoir' : ''}`; });
  $('nat-sentence').insertAdjacentHTML('beforeend', cadreTM(T.moderne, T.cadres[1], true));
  window.scrollTo({ top: $('nat-sentence').getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
  majScoreTM(); panneauTM();
  requestAnimationFrame(ajusteArdoise);
}
function finTM() {
  boutonVoix(true);
  const T = TM_T();
  wordEl(tm.sel)?.classList.remove('choisie'); tm.sel = null;
  $('nat-buttons-variables').innerHTML = '';
  $('nat-instruction').textContent = TML().obj || TML().mots ? 'C\'est fini !' : 'Toutes les formes verbales sont faites !';
  const modes = [...new Set(tm.texte.formes.map((f) => NOM_TM(f.mode).toLowerCase()))];
  const pres = tm.texte.formes.filter((f) => f.tps === 'TPS.pres' && f.mode === 'MODE.ind').length, presTous = tm.texte.formes.filter((f) => f.tps === 'TPS.pres').length;
  const total = currentGame.total;
  const debut = `Tu as ${fmtPts(game.score)} point${game.score >= 2 ? 's' : ''} sur ${total}. `;
  const fin = ' Une étiquette marquée ✗ montre la bonne réponse, là où tu t\'es trompé.';
  const tps = (c) => tm.texte.formes.filter((f) => f.tps === c).length;
  if (currentGame.tmBilan) T.bilanAuto = currentGame.tmBilan;
  else if (!T.bilan && currentGame.sansMode) T.bilanAuto = `Ce texte raconte ce qui se passe <strong>aujourd'hui</strong> : la plupart des verbes sont au <strong>présent</strong> (${tps('TPS.pres')} sur ${tm.texte.formes.length}). Ce qui s'est passé avant est au <strong>passé composé</strong> (une action) ou à l'<strong>imparfait</strong> (une description, une habitude d'autrefois) ; ce qui se passera est au <strong>futur</strong>.`;
  else if (!T.bilan && currentGame.tmChoix) T.bilanAuto = `Ce texte est au <strong>système du présent</strong> : la plupart des verbes sont au <strong>présent de l'indicatif</strong>. Ce qui s'est passé avant est au <strong>passé composé</strong>, à l'<strong>imparfait</strong> ou, encore plus tôt, au <strong>plus-que-parfait</strong> ; ce qui se passera est au <strong>futur</strong>. Les modes : l'<strong>indicatif</strong> pour ce qui est réel, le <strong>conditionnel</strong> pour un souhait ou une politesse, l'<strong>impératif</strong> pour un ordre ou un conseil.`;
  else T.bilanAuto = '';
  if (T.bilanAuto) { $('nat-correction-details').innerHTML = nbspFr(`${debut}${T.bilanAuto}${fin}`); }
  else $('nat-correction-details').innerHTML = nbspFr(T.bilan
    ? `${debut}${T.bilan}${T.valeursBilan === false ? '' : ` On y trouve ${modes.length === 7 ? 'les 7 modes' : 'ces modes'} : ${modes.join(', ')}.`}${T.bilanSuite ? ` ${T.bilanSuite}` : ''}${fin}`
    : `${debut}« ${esc(T.titre)} » est un texte au <strong>système du ${T.systeme}</strong> : l'action se passe au moment où on la lit. C'est pourquoi presque toutes les formes sont au <strong>présent</strong> (${presTous} sur ${tm.texte.formes.length}), dont ${pres} au présent de l'indicatif. On y trouve aussi les ${modes.length} modes : ${modes.join(', ')}.${fin}`);
  $('nat-correction').classList.remove('hidden');
  $('nat-verdict-square').className = `verdict-square ${game.score >= total - 0.05 ? 'correct' : game.score < total / 2 ? 'wrong' : 'half'}`;
  $('nat-next-button').textContent = 'Voir mon résultat →';
  showCharacter(game.score >= total / 2 ? 'good' : 'bad', null);
}

/* ------------------------------------------------------------
   v47 : TEMPS ET MODES — EXERCICES 5 ET 6 : TRANSFORMER UN TEXTE
   Exercice 5 : un texte au système du passé, à réécrire au système du présent.
   Exercice 6 : un texte au système du présent, à réécrire au passé, en français classique ou contemporain.
   Les mots à changer (formes verbales, indicateurs de temps) sont soulignés ; l'enfant écrit la nouvelle forme.
   1 point par changement réussi (0,5 si seuls les accents sont faux).
   Dans les textes : {ancien>nouveau} ; plusieurs réponses acceptées : séparées par « ; » ;
   exercice 6 : {présent>français classique//français contemporain} (sans « // », la même réponse pour les deux).
   ------------------------------------------------------------ */
/* v61 : « Champignons » simplifié pour les plus jeunes : la même histoire, mais seulement les formes verbales
   étudiées à ce niveau. CE1 – CE2 : le temps seul (présent, imparfait, futur, passé composé ; tout est à l'indicatif).
   CM1 – CM2 : le temps et le mode, avec l'indicatif, le conditionnel présent et l'impératif présent. */
TEXTES_TM.push({ cle: 'champ-ce', niv: 'ce', titre: 'Champignons', systeme: 'présent', valeursBilan: false,
  texte: "Aujourd'hui il {fait|pres|ind} beau et nous nous {promenons|pres|ind} dans la forêt où nous {cherchons|pres|ind} souvent des champignons. Nous y {passons|pres|ind} des heures et nous ne nous {lassons|pres|ind} jamais. Hier nous en {avons trouvé|pc|ind} trois kilos : il {faisait|imp|ind} moins chaud et la terre {était|imp|ind} humide. Soudain ma sœur {crie|pres|ind} : « J'{ai vu|pc|ind} quelque chose ! » Alors nous {courons|pres|ind} vers elle. Nous {découvrirons|fut|ind} peut-être un splendide bolet ! Mais, hélas, ce ne {sont|pres|ind} que de petits champignons et je {crois|pres|ind} qu'ils {sont|pres|ind} vénéneux. Nous {repartons|pres|ind} vers d'autres découvertes. Demain, nous {reviendrons|fut|ind} avec papa.",
  bilan: "Ce texte raconte ce qui se passe <strong>aujourd'hui</strong> : la plupart des verbes sont au <strong>présent</strong> (<em>fait, promenons, crie, courons…</em>). Ce qui s'est passé <strong>hier</strong> est au <strong>passé composé</strong> quand c'est une action (<em>avons trouvé, ai vu</em>) et à l'<strong>imparfait</strong> quand c'est une description (<em>faisait, était</em>). Ce qui se passera <strong>demain</strong> est au <strong>futur</strong> (<em>découvrirons, reviendrons</em>)." });
TEXTES_TM.push({ cle: 'champ-cm', niv: 'cm', titre: 'Champignons', systeme: 'présent', valeursBilan: false,
  texte: "Aujourd'hui il {fait|pres|ind} beau et nous nous {promenons|pres|ind} dans la forêt où nous {cherchons|pres|ind} souvent des champignons. Nous {pouvons|pres|ind} y passer des heures sans jamais nous lasser. Hier il {pleuvait|imp|ind} et nous en {avons trouvé|pc|ind} trois kilos, parce que la pluie {avait mouillé|pqp|ind} la terre. Nous {voudrions|pres|cond} en trouver autant aujourd'hui. Soudain ma sœur {crie|pres|ind} : « {Venez|pres|imp} ! J'{ai vu|pc|ind} quelque chose ! » Alors nous {courons|pres|ind} vers elle : nous {découvrirons|fut|ind} peut-être un splendide bolet et le panier {sera|fut|ind} vite plein ! Mais, hélas, ce ne {sont|pres|ind} que de petits champignons et je {pense|pres|ind} qu'ils {sont|pres|ind} vénéneux. « {Regardez|pres|imp} bien avant de les toucher ! » {dit|pres|ind} maman. Nous {repartons|pres|ind} vers d'autres découvertes.",
  bilan: "Ce texte raconte ce qui se passe <strong>aujourd'hui</strong> : c'est le système du présent, et la plupart des verbes sont au <strong>présent de l'indicatif</strong>. Ce qui s'est passé avant est au <strong>passé composé</strong> (<em>avons trouvé, ai vu</em>), à l'<strong>imparfait</strong> pour la description (<em>pleuvait</em>), ou au <strong>plus-que-parfait</strong> pour ce qui s'est passé encore avant (<em>avait mouillé</em>). Ce qui se passera est au <strong>futur</strong> (<em>découvrirons, sera</em>). Trois modes : l'<strong>indicatif</strong> pour ce qui est réel, le <strong>conditionnel</strong> pour un souhait (<em>voudrions</em>), l'<strong>impératif</strong> pour un ordre (<em>Venez, Regardez</em>)." });

/* v62 : dix textes par niveau pour la reconnaissance des temps (système du présent), du plus facile au plus difficile.
   CE : indicatif seulement (présent, imparfait, futur, passé composé) ; CM : indicatif, conditionnel, impératif ;
   collège : les sept modes, comme « Champignons ». Le premier de chaque liste est « Champignons ». */
TEXTES_TM[0].niv = 'col';
TEXTES_TM.push({ niv: 'ce', titre: "Le chat", systeme: 'présent', texte: "Aujourd'hui, mon chat {dort|pres|ind} sur le lit. Il {ronronne|pres|ind} doucement. Hier, il {a attrapé|pc|ind} une souris dans le jardin. Il {était|imp|ind} très fier. Ce soir, je lui {donnerai|fut|ind} du lait. Maman {dit|pres|ind} qu'il {est|pres|ind} gourmand. Demain, nous {irons|fut|ind} chez le vétérinaire. Mon chat {déteste|pres|ind} la voiture. Il {miaulera|fut|ind} tout le long du trajet !" });
TEXTES_TM.push({ niv: 'ce', titre: "La rentrée", systeme: 'présent', texte: "Aujourd'hui, c'{est|pres|ind} la rentrée. Je {porte|pres|ind} mon nouveau cartable. Hier, maman {a acheté|pc|ind} des cahiers et des crayons. Il {faisait|imp|ind} chaud dans le magasin. Ma maîtresse {s'appelle|pres|ind} Madame Durand. Elle {sourit|pres|ind} à tous les élèves. Nous {chantons|pres|ind} une chanson. Demain, nous {commencerons|fut|ind} les leçons. Je {serai|fut|ind} sage. Mon ami Hugo {est|pres|ind} dans ma classe. Hier, il {a joué|pc|ind} avec moi au parc." });
TEXTES_TM.push({ niv: 'ce', titre: "Au parc", systeme: 'présent', texte: "Aujourd'hui, nous {allons|pres|ind} au parc avec papi. Le soleil {brille|pres|ind}. Les canards {nagent|pres|ind} sur l'étang. Les pigeons {s'envolent|pres|ind} . Je leur {lance|pres|ind} du pain. Hier, il {pleuvait|imp|ind} et nous {sommes restés|pc|ind} à la maison. Papi {a lu|pc|ind} une histoire de pirates. Tout à l'heure, nous {mangerons|fut|ind} une glace. Je {choisirai|fut|ind} la fraise. Papi {prend|pres|ind} toujours la vanille. Il {dit|pres|ind} que c'{est|pres|ind} la meilleure !" });
TEXTES_TM.push({ niv: 'ce', titre: "Le marché", systeme: 'présent', texte: "Ce matin, je {vais|pres|ind} au marché avec maman. Les marchands {crient|pres|ind} très fort. Maman {achète|pres|ind} des pommes et des carottes. Je {porte|pres|ind} le panier. Hier, nous {avons fait|pc|ind} une soupe. Elle {était|imp|ind} délicieuse. Le fromager {coupe|pres|ind} un gros morceau de comté. Il nous le {fait|pres|ind} goûter. Samedi prochain, nous {reviendrons|fut|ind} acheter des fraises. Mamie {viendra|fut|ind} avec nous. Elle {aime|pres|ind} beaucoup le marché. Avant, elle y {allait|imp|ind} tous les jours." });
TEXTES_TM.push({ niv: 'ce', titre: "Le dentiste", systeme: 'présent', texte: "Aujourd'hui, je {vais|pres|ind} chez le dentiste. J'{ai|pres|ind} un peu peur. Hier soir, j'{ai mangé|pc|ind} trop de bonbons. Ma dent me {faisait|imp|ind} mal. Le dentiste {regarde|pres|ind} dans ma bouche. Il {dit|pres|ind} : « Tu {as|pres|ind} une petite carie. » Maman me {tient|pres|ind} la main. Il {soigne|pres|ind} ma dent. Je ne {sens|pres|ind} rien ! Demain, je {mangerai|fut|ind} des fruits. Je me {brosserai|fut|ind} les dents après chaque repas. Le dentiste {a été|pc|ind} très gentil. La prochaine fois, je {serai|fut|ind} courageux." });
TEXTES_TM.push({ niv: 'ce', titre: "La neige", systeme: 'présent', texte: "Ce matin, la neige {couvre|pres|ind} le jardin. Mon frère et moi, nous {mettons|pres|ind} nos bottes. Nous {faisons|pres|ind} un bonhomme de neige. Hier, il {neigeait|imp|ind} encore et nous {avons regardé|pc|ind} les flocons par la fenêtre. Papa {prend|pres|ind} des photos. Le chat {regarde|pres|ind} par la fenêtre. Il {déteste|pres|ind} le froid. Maman nous {appelle|pres|ind} : le chocolat chaud {est|pres|ind} prêt ! Demain, le soleil {reviendra|fut|ind} et notre bonhomme {fondra|fut|ind}. Nous {serons|fut|ind} tristes. Hier soir, papi {a allumé|pc|ind} un grand feu. L'an dernier, il {a fait|pc|ind} trop doux pour la neige." });
TEXTES_TM.push({ niv: 'ce', titre: "Les vacances", systeme: 'présent', texte: "Demain, nous {partirons|fut|ind} en vacances à la mer. Aujourd'hui, je {prépare|pres|ind} ma valise. Je {mets|pres|ind} mon maillot et mon seau. Ma sœur {veut|pres|ind} emporter tous ses jouets ! Papa {dit|pres|ind} que la voiture {sera|fut|ind} trop pleine. L'été dernier, nous {sommes allés|pc|ind} à la montagne. Nous {marchions|imp|ind} beaucoup. Je {préférais|imp|ind} la piscine de l'hôtel. Cette année, nous {construirons|fut|ind} des châteaux de sable. Je {pourrai|fut|ind} aussi pêcher des crabes. Mon chien {viendra|fut|ind} aussi. Il {adore|pres|ind} courir sur la plage. L'été dernier, il {nageait|imp|ind} avec nous. Vous {viendrez|fut|ind} nous voir ?" });
TEXTES_TM.push({ niv: 'ce', titre: "Le spectacle", systeme: 'présent', texte: "Ce soir, notre classe {présente|pres|ind} un spectacle. Les parents {arrivent|pres|ind} dans la salle. Je {suis|pres|ind} un peu inquiète. Mes parents {sont|pres|ind} au premier rang. Papa {filme|pres|ind} la scène. Hier, il {a acheté|pc|ind} une nouvelle caméra. La semaine dernière, nous {avons répété|pc|ind} tous les jours. La maîtresse {était|imp|ind} contente de nous. Le rideau {s'ouvre|pres|ind}. Lucas {oublie|pres|ind} son texte ! Tout le monde {rit|pres|ind}. Mais il {reprend|pres|ind} courage et il {finit|pres|ind} sa phrase. À la fin, les parents {applaudiront|fut|ind} très fort. Nous {ferons|fut|ind} une grande fête. Jamais je n'{ai eu|pc|ind} autant de plaisir !" });
TEXTES_TM.push({ niv: 'ce', titre: "Le déménagement", systeme: 'présent', texte: "Aujourd'hui, nous {déménageons|pres|ind}. Les déménageurs {portent|pres|ind} les meubles dans le camion. Je {range|pres|ind} mes livres dans un carton. Maman {emballe|pres|ind} la vaisselle. Papa {démonte|pres|ind} mon lit. Le chat {se cache|pres|ind} sous un carton. Hier, il {miaulait|imp|ind} sans arrêt. Hier, j'{ai dit|pc|ind} au revoir à mes copains. Ils {étaient|imp|ind} tristes et moi aussi. Notre nouvelle maison {a|pres|ind} un grand jardin. Il y {aura|fut|ind} de la place pour un chien ! Papa {a promis|pc|ind} un chiot pour mon anniversaire. Je l'{appellerai|fut|ind} Caramel. Avant, nous {habitions|imp|ind} dans un petit appartement. Je {partageais|imp|ind} ma chambre avec mon frère. Désormais, chacun {aura|fut|ind} sa chambre ! Ce soir, nous {dormirons|fut|ind} dans la nouvelle maison. Je {serai|fut|ind} un peu triste." });
TEXTES_TM.push({ niv: 'ce', titre: "La sortie au château", systeme: 'présent', texte: "Aujourd'hui, notre classe {visite|pres|ind} un château fort. Nous {traversons|pres|ind} le pont-levis. Le guide nous {explique|pres|ind} que les chevaliers {vivaient|imp|ind} ici autrefois. Ils {portaient|imp|ind} de lourdes armures. Le guide {porte|pres|ind} un costume de chevalier. Il {raconte|pres|ind} des légendes. Autrefois, le seigneur {habitait|imp|ind} dans cette tour. Les soldats {gardaient|imp|ind} les portes. Hier, nous {avons lu|pc|ind} une histoire de chevaliers en classe. Maintenant, nous {montons|pres|ind} en haut de la tour. On {voit|pres|ind} toute la vallée ! Thomas {a pris|pc|ind} son appareil : il {fera|fut|ind} des photos pour le journal de l'école. Demain, nous {écrirons|fut|ind} un article. Le directeur le {lira|fut|ind} à tous les élèves. La maîtresse {a pris|pc|ind} des photos. Nous les {regarderons|fut|ind} en classe. Je {veux|pres|ind} devenir chevalier !" });
TEXTES_TM.push({ niv: 'cm', titre: "Le pique-nique", systeme: 'présent', texte: "Aujourd'hui, nous {pique-niquons|pres|ind} au bord du lac. Maman {a préparé|pc|ind} des sandwichs. {Prends|pres|imp} ton maillot ! L'eau {sera|fut|ind} froide. Hier, il {pleuvait|imp|ind} . Je {voudrais|pres|cond} pêcher. Papa {avait oublié|pqp|ind} les cannes la dernière fois. Nous {mangerons|fut|ind} sous un arbre. {Regarde|pres|imp} ce héron ! Il {attrape|pres|ind} un poisson." });
TEXTES_TM.push({ niv: 'cm', titre: "La classe verte", systeme: 'présent', texte: "Aujourd'hui, nous {partons|pres|ind} en classe verte. Le car {attend|pres|ind} devant l'école et les parents {font|pres|ind} de grands signes. « {Soyez|pres|imp} prudents ! » {crie|pres|ind} une maman. Hier, nous {avons préparé|pc|ind} nos sacs avec la liste que la maîtresse nous {avait donnée|pqp|ind} la semaine dernière. Le car {démarre|pres|ind} enfin. Pendant le trajet, nous {chantons|pres|ind}. J'{aimerais|pres|cond} dormir dans la même chambre que Jules. Le centre {se trouve|pres|ind} au bord d'un lac. Demain, nous {ferons|fut|ind} du canoë. Mon frère {est venu|pc|ind} ici l'an passé et il {a adoré|pc|ind} ce séjour. Il m'{a conseillé|pc|ind} d'emporter une lampe. « {Regardez|pres|imp} le paysage ! » dit le chauffeur. Ce soir, nous {regarderons|fut|ind} les étoiles. Je {voudrais|pres|cond} voir une étoile filante !" });
TEXTES_TM.push({ niv: 'cm', titre: "Le gâteau d'anniversaire", systeme: 'présent', texte: "Aujourd'hui, c'{est|pres|ind} l'anniversaire de papa. Ma sœur et moi, nous lui {préparons|pres|ind} un gâteau. « {Prends|pres|imp} la farine, je {casse|pres|ind} les œufs ! » {dit|pres|ind} ma sœur. Hier, nous {avons acheté|pc|ind} du chocolat avec l'argent que nous {avions économisé|pqp|ind}. Le four {chauffe|pres|ind} déjà. Je {voudrais|pres|cond} ajouter des noisettes. « {Mélangez|pres|imp} doucement ! » {conseille|pres|ind} maman. Le gâteau {cuira|fut|ind} pendant trente minutes. Papa {rentrera|fut|ind} à sept heures. Il croit que nous {avons oublié|pc|ind} sa fête. Il {sera|fut|ind} surpris ! Pour Noël, nous lui {avons offert|pc|ind} une cravate que nous {avions choisie|pqp|ind} ensemble. Il ne l'{a portée|pc|ind} qu'une fois ! Cette fois, nous {aimerions|pres|cond} lui faire vraiment plaisir." });
TEXTES_TM.push({ niv: 'cm', titre: "La visite chez le vétérinaire", systeme: 'présent', texte: "Ce matin, Caramel {boite|pres|ind}. Maman {téléphone|pres|ind} au vétérinaire. Hier, mon chien {a couru|pc|ind} dans les ronces qui {avaient envahi|pqp|ind} le fond du jardin. Il {pleurait|imp|ind} doucement toute la nuit. Le vétérinaire {examine|pres|ind} sa patte. « {Tenez|pres|imp} -le bien ! » {demande|pres|ind}-t-il. Il {trouve|pres|ind} une épine. Je {préférerais|pres|cond} ne pas regarder. Caramel a un pansement maintenant. « {Gardez|pres|imp} -le au calme pendant trois jours. » Demain, il {ira|fut|ind} déjà mieux. Nous {reviendrons|fut|ind} la semaine prochaine. Je {pourrais|pres|cond} le promener ce soir ? Le vétérinaire répond que non. Je comprends : la patte {guérira|fut|ind} plus vite." });
TEXTES_TM.push({ niv: 'cm', titre: "Le match de rugby", systeme: 'présent', texte: "Aujourd'hui, notre équipe {joue|pres|ind} contre Toulouse. Les supporters {chantent|pres|ind} dans les tribunes. L'entraîneur nous {réunit|pres|ind} : « {Jouez|pres|imp} ensemble et {restez|pres|imp} calmes ! » Le mois dernier, nous {avons perdu|pc|ind} contre cette équipe. Nous {avions mal préparé|pqp|ind} ce match. Cette fois, nous {voudrions|pres|cond} gagner. Le match {commence|pres|ind}. Bastien {attrape|pres|ind} le ballon et {court|pres|ind} vers l'en-but. Il {marque|pres|ind} un essai ! L'arbitre siffle la mi-temps. Nous menons de cinq points. Si nous tenons bon, nous {serons|fut|ind} champions. Ce soir, toute l'école {fêtera|fut|ind} notre victoire. J'{aimerais|pres|cond} que ce moment dure toujours." });
TEXTES_TM.push({ niv: 'cm', titre: "Le jardin de mamie", systeme: 'présent', texte: "Ce matin, mamie {travaille|pres|ind} dans son jardin. Elle {plante|pres|ind} des tulipes que grand-père {a achetées|pc|ind} au marché. « {Apporte|pres|imp} -moi l'arrosoir ! » me {demande|pres|ind}-t-elle. Hier, il {a gelé|pc|ind} : les salades que nous {avions plantées|pqp|ind} la semaine précédente {ont souffert|pc|ind}. Mamie {soupire|pres|ind}. Elle {aimerait|pres|cond} un jardin plus abrité. Autrefois, elle {cultivait|imp|ind} des fraises sur cette terre. Je {creuse|pres|ind} un trou pour chaque bulbe. « {Ne marche pas|pres|imp} sur les plates-bandes ! » Au printemps, les fleurs {sortiront|fut|ind} de terre. Le jardin {sera|fut|ind} magnifique. Nous {pourrions|pres|cond} aussi planter un cerisier. Mamie sourit : elle adore cette idée." });
TEXTES_TM.push({ niv: 'cm', titre: "L'exposé", systeme: 'présent', texte: "Aujourd'hui, je {présente|pres|ind} mon exposé sur les volcans. J'{ai|pres|ind} le trac. Hier soir, j'{ai répété|pc|ind} le texte que j'{avais écrit|pqp|ind} la semaine dernière. Papa m'{a posé|pc|ind} des questions difficiles. La maîtresse m'appelle au tableau. « {Parle|pres|imp} fort et {regarde|pres|imp} tes camarades ! » me conseille-t-elle. Je montre une maquette du Vésuve. Il {a détruit|pc|ind} la ville de Pompéi il y a deux mille ans. Mes camarades écoutent attentivement. Je {voudrais|pres|cond} visiter un volcan un jour. À la fin, la maîtresse {posera|fut|ind} une note dans mon cahier. Je {serais|pres|cond} content d'avoir un dix !" });
TEXTES_TM.push({ niv: 'cm', titre: "La panne d'électricité", systeme: 'présent', texte: "Ce soir, une panne {prive|pres|ind} tout le quartier d'électricité. Il {fait|pres|ind} noir. Papa {cherche|pres|ind} les bougies que nous {avons rangées|pc|ind} dans le placard. « {Apportez|pres|imp} les allumettes ! » dit-il. Le réfrigérateur ne ronronne plus. Hier, un orage {a abîmé|pc|ind} une ligne que les techniciens {avaient réparée|pqp|ind} le mois précédent. Nous dînons à la lueur des bougies. Mon petit frère {aimerait|pres|cond} que cela dure toute la semaine ! Autrefois, les gens {vivaient|imp|ind} toujours ainsi. Maman nous raconte une histoire. Demain matin, les techniciens {répareront|fut|ind} la ligne. « {Ne vous inquiétez pas|pres|imp} », dit papa. Nous {jouerons|fut|ind} aux cartes en attendant." });
TEXTES_TM.push({ niv: 'cm', titre: "La lettre de Léa", systeme: 'présent', texte: "Chère Léa, aujourd'hui je t'écris depuis la montagne. Il neige depuis ce matin. Hier, nous {avons fait|pc|ind} du ski pour la première fois. Je {tombais|imp|ind} tout le temps au début ! Le moniteur m'{avait expliqué|pqp|ind} comment freiner, mais j'{avais oublié|pqp|ind}. Maintenant, je descends les pistes vertes. Demain, nous {essaierons|fut|ind} une piste bleue. J'{aimerais|pres|cond} que tu sois là ! « {Envoie|pres|imp} une carte à ta copine », m'{a dit|pc|ind} maman. Alors {écoute|pres|imp} bien : je te {rapporterai|fut|ind} un petit chamois en peluche. Nous {rentrerons|fut|ind} samedi. {Réponds|pres|imp} -moi vite ! Je {pourrais|pres|cond} t'appeler dimanche. Je t'embrasse. Lucie." });
TEXTES_TM.push({ niv: 'cm', titre: "Le concours de cuisine", systeme: 'présent', texte: "Aujourd'hui, la classe {participe|pres|ind} à un concours de cuisine. Chaque équipe {prépare|pres|ind} un dessert. Notre chef {s'appelle|pres|ind} Nadia. La semaine dernière, elle nous {a montré|pc|ind} la recette que sa grand-mère lui {avait apprise|pqp|ind}. « {Lavez|pres|imp} -vous les mains d'abord ! » {ordonne|pres|ind} le cuisinier. Nous {battons|pres|ind} les blancs en neige. Hugo renverse le sucre ! Nous rions. Le jury {goûtera|fut|ind} les desserts à midi. Je {voudrais|pres|cond} tant que notre tarte gagne. Autrefois, mon père {participait|imp|ind} à ce concours. Il {a gagné|pc|ind} une médaille en 1998. « {Gardez|pres|imp} confiance ! » nous dit Nadia. Le jury {annoncera|fut|ind} le résultat ce soir." });
TEXTES_TM.push({ niv: 'cm', titre: "L'orage en montagne", systeme: 'présent', texte: "Ce matin, nous {grimpons|pres|ind} vers le refuge. Le ciel {s'assombrit|pres|ind}. Le guide {regarde|pres|ind} les nuages qui {arrivent|pres|ind} de l'ouest. Pourtant, la météo {a annoncé|pc|ind} du beau temps hier. « {Pressez|pres|imp} le pas ! » {crie|pres|ind}-il. Soudain, le tonnerre {gronde|pres|ind}. Nous {courons|pres|ind} vers une cabane que nous {avons repérée|pc|ind} plus bas. Je {voudrais|pres|cond} être déjà au refuge ! Autrefois, les bergers {s'abritaient|imp|ind} ici avec leurs bêtes. Il pleut à verse. « {Restez|pres|imp} loin des arbres ! » L'orage {passera|fut|ind} vite. Dans une heure, nous {repartirons|fut|ind}. Ce soir, nous {raconterons|fut|ind} notre aventure. Nos parents ne nous {croiraient|pres|cond} jamais !" });
TEXTES_TM.push({ niv: 'col', titre: "Le marché de Noël", systeme: 'présent', texte: "Aujourd'hui, nous {flânons|pres|ind} au marché de Noël, {admirant|pres|part} les chalets illuminés. Les marchands {proposent|pres|ind} du vin chaud et des marrons {grillés|passe|part} . Hier, nous {avons choisi|pc|ind} un sapin et nous {voudrions|pres|cond} maintenant le décorer. Il {faut|pres|ind} que nous {trouvions|pres|subj} des guirlandes. Soudain, ma petite sœur {s'écrie|pres|ind} : « {Regardez|pres|imp} le père Noël ! » Elle {court|pres|ind} vers lui {en riant|pres|ger} . Elle {aimerait|pres|cond} lui {parler|pres|inf} de sa liste. Je {doute|pres|ind} qu'il {puisse|pres|subj} tout lui {apporter|pres|inf} . Ce soir, nous {décorerons|fut|ind} le sapin." });
TEXTES_TM.push({ niv: 'col', titre: "La randonnée", systeme: 'présent', texte: "Ce matin, nous {partons|pres|ind} {randonner|pres|inf} dans les Pyrénées. Le guide {avance|pres|ind} lentement, {surveillant|pres|part} le ciel. Hier, il {a plu|pc|ind} et les sentiers {sont|pres|ind} glissants. « {Suivez|pres|imp} -moi de près ! » {ordonne|pres|ind}-il. Je {voudrais|pres|cond} que nous {atteignions|pres|subj} le lac avant midi. {Arrivés|passe|part} au col, nous {découvrons|pres|ind} la vallée. Mon père {sort|pres|ind} ses jumelles {en espérant|pres|ger} {apercevoir|pres|inf} un isard. Il {faudrait|pres|cond} que nous {soyons|pres|subj} silencieux. Ce soir, nous {dormirons|fut|ind} au refuge." });
TEXTES_TM.push({ niv: 'col', titre: "Le tournage", systeme: 'présent', texte: "Aujourd'hui, une équipe de cinéma {tourne|pres|ind} un film dans notre rue. Les techniciens {installent|pres|ind} les projecteurs, {criant|pres|part} des ordres. Hier, ils {ont fermé|pc|ind} la place. Le réalisateur {souhaite|pres|ind} que tout le monde {se taise|pres|subj} . « Silence ! Moteur ! » L'actrice {traverse|pres|ind} la rue {en courant|pres|ger} . Je {voudrais|pres|cond} bien {obtenir|pres|inf} un autographe. {Fatiguée|passe|part} , l'actrice {s'assoit|pres|ind} sur un banc. « {Approchez|pres|imp} , les enfants ! » {dit|pres|ind}-elle. Il {est|pres|ind} possible qu'elle {accepte|pres|subj} de {signer|pres|inf} mon cahier. Le film {sortira|fut|ind} l'an prochain." });
TEXTES_TM.push({ niv: 'col', titre: "Le concert", systeme: 'présent', texte: "Ce soir, mon frère {joue|pres|ind} du violon au conservatoire. Il {répète|pres|ind} depuis des mois, {travaillant|pres|part} chaque soir. Hier, il {a cassé|pc|ind} une corde ! Ma mère {craint|pres|ind} qu'il {soit|pres|subj} trop nerveux. « {Respire|pres|imp} profondément », lui {conseille|pres|ind}-t-elle. La salle {est|pres|ind} pleine. Mon frère {entre|pres|ind} sur scène {en souriant|pres|ger} . Je {voudrais|pres|cond} tant qu'il {réussisse|pres|subj} ! Les premières notes {s'élèvent|pres|ind} . {Émue|passe|part} , ma grand-mère {essuie|pres|ind} une larme. Après le concert, nous {irons|fut|ind} {dîner|pres|inf} au restaurant." });
TEXTES_TM.push({ niv: 'col', titre: "La fouille archéologique", systeme: 'présent', texte: "Cet été, je {participe|pres|ind} à une fouille archéologique. Les archéologues {grattent|pres|ind} la terre, {cherchant|pres|part} des traces des Gaulois. Hier, ils {ont découvert|pc|ind} une pièce de bronze. Le chef du chantier {exige|pres|ind} que nous {notions|pres|subj} chaque objet. « {Utilisez|pres|imp} le pinceau, pas la truelle ! » Je {voudrais|pres|cond} {trouver|pres|inf} un trésor. Soudain, ma truelle {heurte|pres|ind} quelque chose. {En dégageant|pres|ger} la terre, je {vois|pres|ind} apparaître un vase. Il {faut|pres|ind} qu'un spécialiste l'{examine|pres|subj} . {Brisé|passe|part} en trois morceaux, il {sera|fut|ind} restauré au musée." });
TEXTES_TM.push({ niv: 'col', titre: "La course de voile", systeme: 'présent', texte: "Aujourd'hui, notre voilier {prend|pres|ind} le départ de la régate. Le vent {souffle|pres|ind} fort, {gonflant|pres|part} les voiles. Hier, nous {avons vérifié|pc|ind} chaque cordage. Le skipper {veut|pres|ind} que nous {restions|pres|subj} attentifs. « {Bordez|pres|imp} la grand-voile ! » {crie|pres|ind}-il. Nous {dépassons|pres|ind} deux bateaux {en profitant|pres|ger} d'une rafale. Je {voudrais|pres|cond} {franchir|pres|inf} la ligne en tête. {Épuisés|passe|part} , nous {tenons|pres|ind} bon. Il {est|pres|ind} possible que nous {gagnions|pres|subj} . Ce soir, le port {fêtera|fut|ind} les vainqueurs." });
TEXTES_TM.push({ niv: 'col', titre: "La nuit au musée", systeme: 'présent', texte: "Ce soir, le musée {ouvre|pres|ind} ses portes aux enfants pour une nuit exceptionnelle. Nous {explorons|pres|ind} les salles, {tenant|pres|part} une lampe de poche. Hier, le guide nous {a raconté|pc|ind} la légende de la momie. Il {faut|pres|ind} que nous {restions|pres|subj} groupés. « {Suivez|pres|imp} la flèche verte ! » Je {voudrais|pres|cond} {voir|pres|inf} les dinosaures. Soudain, Léo {pousse|pres|ind} un cri {en apercevant|pres|ger} une ombre. Ce n'{est|pres|ind} qu'un gardien ! {Rassurés|passe|part} , nous {rions|pres|ind} . Bien que nous {soyons|pres|subj} fatigués, personne ne {veut|pres|ind} {dormir|pres|inf} . Demain, nous {raconterons|fut|ind} tout à nos parents." });
TEXTES_TM.push({ niv: 'col', titre: "Le stage de théâtre", systeme: 'présent', texte: "Cette semaine, je {suis|pres|ind} un stage de théâtre. Nous {improvisons|pres|ind} des scènes, {imitant|pres|part} des personnages célèbres. Hier, j'{ai joué|pc|ind} le rôle d'un roi colérique. Le metteur en scène {exige|pres|ind} que nous {apprenions|pres|subj} nos textes. « {Articulez|pres|imp} ! On ne vous {entend|pres|ind} pas ! » Je {préférerais|pres|cond} {jouer|pres|inf} un rôle comique. Mon amie {entre|pres|ind} en scène {en trébuchant|pres|ger} : tout le monde {rit|pres|ind} . {Vexée|passe|part} , elle {rougit|pres|ind} . Il {faut|pres|ind} pourtant qu'elle {continue|pres|subj} . Samedi, nous {présenterons|fut|ind} notre spectacle." });
TEXTES_TM.push({ niv: 'col', titre: "L'éclipse", systeme: 'présent', texte: "Aujourd'hui, une éclipse de soleil {plonge|pres|ind} la ville dans la pénombre. Les gens {sortent|pres|ind} dans la rue, {portant|pres|part} des lunettes spéciales. Hier, le professeur nous {a expliqué|pc|ind} le phénomène. Il {faut|pres|ind} qu'on ne {regarde|pres|subj} jamais le soleil à l'œil nu. « {Protégez|pres|imp} vos yeux ! » {répète|pres|ind} ma mère. La lune {cache|pres|ind} peu à peu le soleil. Les oiseaux {se taisent|pres|ind} , {croyant|pres|part} la nuit venue. J'{aimerais|pres|cond} {photographier|pres|inf} ce moment {en utilisant|pres|ger} un filtre. Bien que l'éclipse {dure|pres|subj} à peine trois minutes, nous ne l'{oublierons|fut|ind} jamais." });

const TRANSFOS = {
  /* exercice 5 : du passé au présent, du plus facile au plus difficile. v48 : chaque texte a, comme les modèles,
     habitude, second plan, premier plan, paroles rapportées (qui ne changent pas), un conditionnel, un subjonctif, un impératif. */
  passe2pres: [
    { titre: 'La neige', texte: "{Ce jour-là>Aujourd'hui}, il {neigeait>neige}. Chaque hiver, nous {construisions>construisons} un bonhomme de neige dans le jardin. Soudain, maman {ouvrit>ouvre} la fenêtre : « Mettez vos gants ! » Nous {aurions voulu>voudrions} que la neige {durât>dure} toute la semaine." },
    { titre: 'Le chat', texte: "{Ce matin-là>Ce matin}, mon chat {dormait>dort} sur le lit, comme il le {faisait>fait} tous les jours. Tout à coup, mon frère {entra>entre} en criant : « Viens voir, il y a un oiseau ! » Le chat {sauta>saute} par la fenêtre. Nous {craignions>craignons} qu'il ne {s'enfuît>s'enfuie} et nous {aurions aimé>aimerions} qu'il {revînt>revienne} vite." },
    { titre: 'La fête de l\'école', texte: "{Ce samedi-là>Ce samedi}, l'école {organisait>organise} sa fête. Chaque année, les parents {préparaient>préparent} des gâteaux. Les enfants {dansaient>dansent} sur la scène quand le micro {tomba>tombe}. Le directeur {s'écria>s'écrie} : « Ne bougez pas, je le répare ! » Tout le monde {aurait voulu>voudrait} que la musique {reprît>reprenne} aussitôt." },
    { titre: 'Le vélo', texte: "{Ce jour-là>Aujourd'hui}, Lucas {apprenait>apprend} à faire du vélo. D'habitude, son père {tenait>tient} la selle, mais {cette fois-là>cette fois} il la {lâcha>lâche}. Lucas {roulait>roule} tout seul ! « Regarde, papa, je sais faire ! » Il {avait essayé>a essayé} pendant des semaines et il {voulait>veut} que tout le monde le {vît>voie}. {Le lendemain>Demain}, il {irait>ira} à l'école à vélo." },
    { titre: 'Le poème', texte: "{Ce matin-là>Ce matin}, comme tous les lundis, la maîtresse {voulait>veut} que chaque élève {récitât>récite} un poème. Julien {tremblait>tremble} : il {avait appris>a appris} son texte {la veille>hier}, mais il {oubliait>oublie} tout. Son voisin lui {chuchota>chuchote} : « Respire et pense à ta maman ! » Alors Julien {récita>récite} sans erreur. Il {aurait aimé>aimerait} que ce moment {durât>dure} toujours." },
    { titre: 'Le grand-père', texte: "{Cette année-là>Cette année}, mon grand-père {fêta>fête} ses quatre-vingts ans. Comme chaque été, toute la famille {se réunissait>se réunit} dans sa maison. {L'année précédente>L'année dernière}, il {avait été>a été} malade, mais il {allait>va} beaucoup mieux. Il {leva>lève} son verre : « Profitez de la vie, mes enfants ! » Nous {aurions voulu>voudrions} qu'il {vécût>vive} cent ans, et il {promit>promet} qu'il {viendrait>viendra} nous voir {l'année suivante>l'année prochaine}." },
    { titre: 'Champignons', texte: "{Ce jour-là>Aujourd'hui} il {faisait>fait} beau et nous nous {promenions>promenons} dans la forêt où nous {cherchions>cherchons} souvent des champignons. Nous {pouvions>pouvons} y passer des heures, marchant, plaisantant, sans jamais nous lasser. {La veille>Hier} nous en {avions trouvé>avons trouvé} trois kilos et nous {aurions voulu>voudrions} que la cueillette {fût>soit} aussi bonne {pendant cette journée>aujourd'hui}. Soudain ma sœur {cria>crie} : « Venez ! » Alors nous {courûmes>courons} vers elle en espérant que nous {découvririons>découvrirons} un splendide bolet ! Mais, hélas, ce {n'étaient>ne sont} que de petits champignons et je {craignais>crains} bien qu'ils {fussent>soient} vénéneux. Nous {repartîmes>repartons} vers d'autres découvertes." },
    { titre: 'Le navigateur', texte: "{Ce jour-là>Aujourd'hui}, le navigateur {quittait>quitte} le port. Chaque printemps, il {partait>part} pour un long voyage. Dès qu'il {eut hissé>a hissé} les voiles, le vent {se leva>se lève}. Sa fille lui {cria>crie} depuis le quai : « Reviens vite, papa ! » Il {savait>sait} qu'il {aurait traversé>aura traversé} l'océan avant l'hiver. {Deux jours plus tard>Dans deux jours}, il {atteindrait>atteindra} les premières îles. Il {regrettait>regrette} seulement que sa fille ne {pût>puisse} pas l'accompagner." },
    { titre: 'Le théâtre', texte: "{Ce soir-là>Ce soir}, au théâtre, la salle {était>est} pleine. Comme à chaque première, les acteurs {étaient>sont} nerveux : ils {avaient répété>ont répété} pendant des semaines et ils {espéraient>espèrent} que le public {serait>sera} conquis. Quand le rideau {se leva>se lève}, la jeune actrice {murmura>murmure} : « Souhaitez-moi bonne chance ! » Elle {craignait>craint} qu'on ne l'{entendît>entende} pas, mais elle {joua>joue} merveilleusement. {Le lendemain>Demain}, les journaux {parleraient>parleront} d'elle." },
    { titre: 'L\'orage', texte: "{Ce soir-là>Ce soir}, l'orage {grondait>gronde} au-dessus du village. Chaque fois qu'il {tonnait>tonne}, le chien {se cachait>se cache} sous la table. Quand la lumière {se fut éteinte>s'est éteinte}, ma petite sœur {se mit>se met} à pleurer. « N'aie pas peur, ce n'est que le vent ! » lui {dit>dit} ma mère. Nous {aurions préféré>préférerions} que l'orage {eût cessé>ait cessé} avant la nuit. Ma mère {pensait>pense} que la tempête {serait passée>sera passée} {le lendemain matin>demain matin}." },
  ],
  /* exercice 6 : du présent au passé : {présent>classique//contemporain} ; même règle : tous les emplois, dans chaque texte */
  pres2passe: [
    { titre: 'La plage', texte: "{Aujourd'hui>Ce jour-là}, il {fait>faisait} beau. Tous les étés, nous {allons>allions} à la plage avec nos cousins. Soudain, une grosse vague {renverse>renversa//a renversé} notre château de sable. « Recommençons plus loin ! » {s'écrie>s'écria//s'est écrié} mon cousin. Nous {voudrions>aurions voulu} que la mer {reste>restât//reste} calme." },
    { titre: 'Le gâteau', texte: "{Ce matin>Ce matin-là}, maman {prépare>préparait} un gâteau. Le dimanche, elle {cuisine>cuisinait} toujours pour toute la famille. Tout à coup, le four {fait>fit//a fait} un drôle de bruit. « Ouvre la fenêtre, vite ! » me {dit>dit//a dit} papa. {Je voudrais>J'aurais voulu} que le gâteau {soit>fût//soit} sauvé, mais il {est>était} tout noir." },
    { titre: 'La médaille', texte: "{Aujourd'hui>Ce jour-là}, Tom {est>était} fier : {hier>la veille}, il {a gagné>avait gagné} la course de l'école. Comme tous les matins, il {montre>montrait} sa médaille à ses amis. Tout à coup, son grand frère {arrive>arriva//est arrivé} et lui {dit>dit//a dit} : « Prête-la-moi, s'il te plaît ! » Tom {voudrait>aurait voulu} que son frère {soit>fût//soit} aussi fier de lui." },
    { titre: 'La montagne', texte: "{Ce soir>Ce soir-là}, nous {sommes>étions} impatients car nous {partons>partions} à la montagne {demain>le lendemain}. Chaque hiver, nous {louons>louions} le même chalet. Papa {annonce>annonça//a annoncé} que nous {verrons>verrions//allions voir} de la neige. « Préparez vos bonnets ! » {ajoute>ajouta//a ajouté} maman. Ma sœur {voudrait>aurait voulu} que nous {partions>partissions//partions} tout de suite." },
    { titre: 'TGV', texte: "Tous les ans, je {vais>allais} passer Noël en famille en prenant le TGV. {Aujourd'hui>Ce jour-là}, j'{attends>attendais} mon train pour Marseille. Il y {a>avait} beaucoup de monde sur le quai {cette année>cette année-là} mais soudain on {annonce>annonça//a annoncé} que le TGV {aura>aurait//allait avoir} trois heures de retard, car il {a été bloqué>avait été bloqué} par la neige. Les voyageurs {voudraient>auraient voulu} que cela {change>changeât//change}, certains {crient>crièrent//ont crié} : « Informez-nous au moins ! »" },
    { titre: 'Autofiction', texte: "Tous les ans, le professeur {donne>donnait} un sujet d'autofiction. Les élèves de la classe {sont>étaient} contents {cette année>cette année-là} : {hier>la veille} ils {ont rempli>avaient rempli} une fiche préparatoire. {Aujourd'hui>Ce jour-là}, ils {écrivent>écrivaient} leur rédaction mais soudain une élève se {met>mit//est mise} à pleurer. « Que s'est-il passé ? Calme-toi ! » Mais l'élève {craint>craignait} que la rédaction {soit>fût//soit} trop difficile. Dans sa tête, elle {n'y arrivera jamais>n'y arriverait jamais//n'allait jamais y arriver} : elle {voudrait>aurait voulu} changer de sujet." },
    { titre: 'Le marché', texte: "{Aujourd'hui>Ce jour-là}, comme chaque samedi, ma grand-mère {va>allait} au marché. Les marchands {crient>criaient} et les clients {se pressent>se pressaient} devant les étals. Soudain, elle {aperçoit>aperçut//a aperçu} son vieil ami Pierre. « Viens boire un café avec moi ! » lui {propose>proposa//a proposé} Pierre. Elle {accepte>accepta//a accepté} bien qu'elle {soit>fût//soit} pressée : {demain>le lendemain}, ses petits-enfants {viendront>viendraient//allaient venir} déjeuner et elle {voudrait>aurait voulu} leur préparer un bon repas." },
    { titre: 'Champignons', texte: "{Aujourd'hui>Ce jour-là} il {fait>faisait} beau et nous nous {promenons>promenions} dans la forêt où nous {cherchons>cherchions} souvent des champignons. Nous {pouvons>pouvions} y passer des heures, marchant, plaisantant, sans jamais nous lasser. {Hier>La veille} nous en {avons trouvé>avions trouvé} trois kilos et nous {voudrions>aurions voulu} que la cueillette {soit>fût//soit} aussi bonne {aujourd'hui>pendant cette journée;ce jour-là}. Soudain ma sœur {crie>cria//a crié} : « Venez ! » Alors nous {courons>courûmes//avons couru} vers elle en espérant que nous {découvrirons>découvririons//allions découvrir} un splendide bolet ! Mais, hélas, ce {ne sont>n'étaient} que de petits champignons et je {crains>craignais} bien qu'ils {soient>fussent//soient} vénéneux. Nous {repartons>repartîmes//sommes repartis} vers d'autres découvertes." },
    { titre: 'Tristesse', texte: "{Aujourd'hui>Ce jour-là} mon frère {est>était} triste car son meilleur ami {est parti>était parti} {hier>la veille} et il {ne reviendra>ne reviendrait//n'allait revenir} que {dans un an>un an plus tard}. Mon frère {dort>dormait} dans sa chambre : il se {lève>levait} tous les jours à midi. Tout à coup ma mère me {dit>dit//a dit} : « Va réveiller ton frère pour que nous déjeunions ensemble ». {Je voudrais>J'aurais voulu} lui faire plaisir en lui obéissant : tous les enfants {veulent>veulent} faire plaisir à leurs parents." },
    { titre: 'Le feu d\'artifice', texte: "{Ce soir>Ce soir-là}, la ville {est>était} en fête. Chaque année, les habitants {attendent>attendaient} le feu d'artifice qu'on {tire>tirait} au-dessus du fleuve. Le maire {a promis>avait promis} qu'il {sera>serait//allait être} magnifique. Quand la première fusée {éclate>éclata//a éclaté}, un enfant {s'écrie>s'écria//s'est écrié} : « Regarde, maman, des étoiles ! » Sa mère {voudrait>aurait voulu} que la fête {dure>durât//dure} jusqu'à minuit. {Demain>Le lendemain}, tout le monde {en parlera>en parlerait//allait en parler}." },
  ],
};
/* ------------------------------------------------------------
   v65 : LES TEMPS ET LES MODES AU CE1 – CE2, EN DOUZE EXERCICES
   Dix petits exercices sur une notion (quatre textes courts chacun), puis deux bilans (douze textes chacun).
   ------------------------------------------------------------ */
/* « Trouver le verbe conjugué » : on touche les verbes ; {mots} marque un verbe conjugué (en un ou deux mots) */
const TEXTES_TV = [
  { titre: "Le petit chien", texte: "Le petit chien {court} dans le jardin. Il {aboie} très fort. Léa lui {lance} une balle. Le chien {attrape} la balle. Il la {rapporte} à Léa. Elle {rit} . Puis elle {caresse} son chien. Il {remue} la queue. Maman les {regarde} . Elle {sourit} ." },
  { titre: "À l'école", texte: "Les élèves {entrent} en classe. La maîtresse {écrit} la date au tableau. Tom {ouvre} son cahier. Nous {copions} la poésie. Ensuite, vous {lisez} une histoire. Je {range} mes crayons. La cloche {sonne} . Les enfants {sortent} dans la cour. Ils {jouent} au ballon. Lina {saute} à la corde. Moi, je {préfère} les billes. La récréation {passe} vite. Nous {remontons} en classe." },
  { titre: "La tempête", texte: "Hier, le vent {soufflait} très fort. Les arbres {bougeaient} dans tous les sens. Papa {a fermé} les volets. Nous {avions} un peu peur. Le chat {s'est caché} sous le lit. Toute la nuit, la pluie {tombait} . Ce matin, le soleil {revient} . Le jardin {est} plein de branches. Maman {ramasse} les pots de fleurs. Mon frère {veut} l'aider. Il {porte} une grosse branche. Demain, nous {ramasserons} les feuilles. Papi {viendra} avec sa remorque. Il {coupera} le vieux tronc. Nous {ferons} un grand tas de bois. Le chat {sortira} enfin !" },
  { titre: "Le pique-nique", texte: "Dimanche, nous {irons} pique-niquer au bord de la rivière. Maman {prépare} des sandwichs. Papa {gonfle} le canot. Mon frère {veut} pêcher. Il {a acheté} une canne à pêche. Moi, je {préfère} nager. L'eau {sera} froide ! Mamie {apporte} une tarte aux pommes. Elle {a fait} cette tarte ce matin. Nous {mangerons} sous un grand chêne. Les fourmis {aiment} les miettes. Après le repas, papa {fera} la sieste. Il {ronfle} toujours très fort ! Ma sœur {cueillera} des fleurs pour faire un bouquet. Le chien {court} après les canards. Ils {s'envolent} . Le soir, nous {rentrerons} fatigués. Je {pense} déjà à ce beau dimanche. Nous {aimons} tant les pique-niques ! Vous {viendrez} avec nous ?" },
];
const TROUVE_CE = {"ce-noms": [{"titre": "Au salon", "texte": "Le {chat} de {Léa} dort sur le {canapé} . Le {chien} joue dans le {jardin} . {Papa} lit le {journal} . {Maman} prépare une {tarte} . La {pluie} tombe."}, {"titre": "En classe", "texte": "Ce {matin} , la {maîtresse} raconte une {histoire} . Les {élèves} écoutent. {Tom} dessine un {dragon} sur son {cahier} . {Lina} colorie une {princesse} . La {cloche} sonne. Les {enfants} sortent dans la {cour} . Ils jouent au {ballon} ."}, {"titre": "À la ferme", "texte": "{Dimanche} , {mamie} et {papi} nous emmènent à la {ferme} . Le {fermier} nous montre ses {vaches} et ses {cochons} . Mon {frère} caresse un {agneau} . Ma {sœur} ramasse des {œufs} dans le {poulailler} . Nous buvons du {lait} frais. Le {chien} {Pirate} court après les {poules} ."}, {"titre": "À la mer", "texte": "Pendant les {vacances} , nous partons à la {mer} avec nos {cousins} . {Paul} construit un {château} de {sable} avec des {tours} et un {pont} . {Juliette} cherche des {coquillages} sur la {plage} . {Maman} lit un {livre} sous le {parasol} . {Papa} nage jusqu'à la {bouée} . Le {soleil} brille. Les {mouettes} crient au-dessus des {vagues} . Notre {chien} aboie."}], "ce-dets": [{"titre": "Des petites phrases", "texte": "{Le} chat dort. {La} souris danse. {Un} oiseau chante. {Une} fleur s'ouvre. {Les} enfants rient. {Des} nuages passent. {Le} soleil brille. {La} lune se cache. {Un} chien aboie. {Une} cloche sonne."}, {"titre": "Dans la rue", "texte": "{Mon} frère a {un} vélo rouge. {Ma} sœur préfère {sa} trottinette. {Les} voisins promènent {leur} chien. {Ce} chien porte {un} collier bleu. {Mes} amis jouent dans {la} rue. {Cette} rue est calme. {Nos} parents nous regardent par {la} fenêtre."}, {"titre": "Les graines", "texte": "{Ce} matin, {la} maîtresse apporte {une} boîte. Dans {cette} boîte, il y a {des} graines. {Les} élèves plantent {les} graines dans {des} pots. {Mon} voisin arrose {son} pot. {Ta} plante pousse vite. {Ces} feuilles sont vertes. {Notre} classe ressemble à {un} jardin. {Les} parents viendront voir {nos} plantes."}, {"titre": "Les histoires de grand-père", "texte": "{Le} soir, {mon} grand-père raconte {des} histoires. {Ses} histoires parlent de {son} enfance. {Sa} maison était dans {un} village. {Les} enfants marchaient dans {la} neige. {Leurs} chaussures étaient mouillées. {Cette} époque était dure. {Ces} enfants avaient {des} sabots. {Leur} maîtresse chauffait {la} classe avec {un} poêle. {Ma} sœur et moi écoutons {ces} récits. {Notre} chat dort sur {mes} genoux."}], "ce-adjs": [{"titre": "Des couleurs", "texte": "Le {petit} chat dort sur un coussin {rouge} . Une {grande} girafe mange des feuilles {vertes} . Le ciel est {bleu} . Mon {vieux} chien est {gentil} . Ma sœur porte une robe {jaune} . Elle a des cheveux {longs} et {bruns} ."}, {"titre": "Le loup et la chouette", "texte": "Dans la forêt {sombre} , un {jeune} loup cherche son chemin. Il a un pelage {gris} et des yeux {jaunes} . Il entend un bruit {étrange} . C'est une {vieille} chouette {blanche} . Elle est {sage} et {gentille} . Elle montre au loup un sentier {étroit} . Le loup est {content} . Il rentre dans sa {belle} tanière. Il est {fatigué} ."}, {"titre": "Le jardin de mamie", "texte": "Mamie a un jardin {magnifique} . Elle cultive des tomates {rouges} , des salades {fraîches} et des {grosses} courges {orange} . Ses roses {parfumées} attirent des abeilles {dorées} . Au fond, il y a un {vieux} puits {mystérieux} . Le chat {roux} de mamie dort sur le mur {tiède} . Les oiseaux {joyeux} chantent dans le {grand} cerisier. Mamie est {fière} de son jardin {fleuri} . C'est un endroit {paisible} ."}, {"titre": "Le petit prince", "texte": "Le {petit} prince habite un château {immense} . C'est un garçon {timide} . Les murs sont {épais} et les tours sont {hautes} . Dans la {grande} salle, il y a une table {longue} avec une nappe {blanche} . Le prince porte un manteau {rouge} et des bottes {noires} . Son cheval est {rapide} et {fougueux} . Un jour, le prince rencontre une fée {minuscule} . Elle a des ailes {transparentes} et une voix {douce} . Elle lui offre une épée {magique} . Le prince devient {courageux} . Il part pour un {long} voyage vers des pays {lointains} . Il est {heureux} ."}], "ce-prons": [{"titre": "Les amis", "texte": "{Je} m'appelle Lou. {Tu} t'appelles Tom. {Il} est mon voisin. {Elle} est ma sœur. {Nous} jouons ensemble. {Vous} venez avec nous ? {Ils} courent vite. {Elles} sautent à la corde. {On} rit beaucoup. {Tu} es mon ami."}, {"titre": "La piscine", "texte": "Ce matin, {nous} allons à la piscine. {Je} prends mon maillot. Maman dit : « {Tu} n'oublies pas ta serviette ? » Papa conduit. {Il} chante dans la voiture. Ma sœur rit. {Elle} trouve papa drôle. À la piscine, {nous} retrouvons nos cousins. {Ils} nagent déjà. « {Vous} êtes en retard ! » crie Léo. {On} se dépêche. {Je} plonge. L'eau est froide ! {Elle} me fait frissonner. {Il} faut nager vite. {Nous} sortons à midi."}, {"titre": "La fête de la classe", "texte": "Les enfants préparent une fête. {Ils} décorent la classe. Léa et Zoé gonflent des ballons. {Elles} les accrochent au plafond. Tom apporte un gâteau. {Il} l'a fait avec sa maman. « {Je} peux le goûter ? » demande Hugo. « {Tu} attendras la fête ! » répond Tom. La maîtresse arrive. {Elle} sourit. {Elle} met de la musique. « {Vous} avez bien travaillé ! {Je} suis fière de vous. » {Nous} chantons une chanson. {On} danse aussi. {Je} danse avec Léa. « {Tu} danses bien ! » dit Zoé. Les parents arrivent. {Ils} applaudissent. {Nous} mangeons le gâteau. {Il} est délicieux !"}, {"titre": "Au cirque", "texte": "Hier, {nous} sommes allés au cirque. {Je} me suis assis au premier rang. Mon père s'est assis à côté de moi. {Il} avait acheté du pop-corn. {Nous} avons attendu un peu. Puis les clowns sont arrivés. {Ils} portaient des chaussures géantes. {Ils} sont tombés plusieurs fois. {On} a beaucoup ri. Ensuite, une acrobate est entrée. {Elle} est montée sur un fil. {Elle} a marché sans tomber. « {Vous} avez peur ? » nous a demandé le présentateur. « {Nous} avons un peu peur ! » a répondu ma sœur. Les lions ont rugi. {Ils} étaient impressionnants. Ma sœur a fermé les yeux. {Je} lui ai dit : « {Tu} peux regarder ! {Ils} sont dans une cage. » {Elle} a ouvert les yeux. À la fin, {nous} avons applaudi. {Nous} sommes rentrés tard. {Je} dormais dans la voiture. {Il} faisait nuit."}], "ce-sujets": [{"titre": "Petites phrases", "texte": "{Le chat} dort. {Les oiseaux} chantent. {Maman} cuisine. {Mon frère} joue. {Le soleil} brille. {Tu} lis un livre. {Les enfants} courent dans la cour. {Papa} répare le vélo. {La pluie} tombe. {Nous} rentrons à la maison."}, {"titre": "En classe", "texte": "{La maîtresse} écrit au tableau. {Les élèves} recopient la leçon. {Léo} lève le doigt. {Il} pose une question. {Sa voisine} répond. {Le directeur} entre dans la classe. {Tout le monde} se lève. {Il} salue les élèves. {La cloche} sonne. {Les enfants} sortent. {Mon ami Tom} m'attend. {Nous} jouons aux billes. {La récréation} passe vite."}, {"titre": "À la plage", "texte": "{Le petit chien de Léa} aboie. {Les grandes vagues} frappent les rochers. Dans le ciel volent {des mouettes} . {Mes cousins} construisent un château. {Le vent} souffle fort. {Ma sœur et moi} cherchons des coquillages. {Papa} lit sous le parasol. Sur la plage courent {des enfants} . {Le marchand de glaces} passe. {Il} crie : « Glaces ! » {Maman} achète trois glaces. {Nous} les mangeons vite. {Le soleil} chauffe le sable. {Les nuages} arrivent. {L'orage} approche. {Nous} rentrons."}, {"titre": "Le jardin de grand-père", "texte": "Chaque matin, {mon grand-père} se lève tôt. {Il} boit son café. Puis {il} part au jardin. Dans le potager poussent {des salades} . {Les tomates} rougissent au soleil. {Les limaces} , la nuit, mangent les feuilles. {Grand-père} les chasse. {Ma grand-mère} cueille des fraises. {Elle} en fait de la confiture. {Le chat de la voisine} se promène. {Il} saute sur le mur. Sur le mur dorment {des lézards} . {Ils} s'enfuient. {Le chien} aboie. « {Tu} vas te taire ! » crie {grand-mère} . {Les oiseaux} s'envolent. {Nous} arrivons pour le déjeuner. {Toute la famille} se met à table. {On} mange la salade du jardin."}]};
const TROUVE_PH = {"ce-paroles": [{"titre": "Le ballon", "texte": "Léo voit un ballon dans l'arbre. {« Oh, mon ballon ! »} crie-t-il. Sa sœur arrive. {« Je vais t'aider »} , dit-elle. Elle prend une branche. {« Attention ! »} dit Léo. Le ballon tombe. {« Merci ! »} dit Léo. {« De rien »} , répond sa sœur. Ils rient. {« On joue ensemble ? »} demande Léo. {« D'accord ! »} Ils jouent jusqu'au soir. {« À table ! »} appelle maman. {« On arrive ! »} crient les enfants. {« Lavez-vous les mains »} , dit papa."}, {"titre": "Le marchand de glaces", "texte": "Le marchand de glaces arrive sur la plage. {« Glaces ! Glaces ! »} crie-t-il. Lina court vers lui. {« Bonjour, monsieur ! »} dit-elle. {« Bonjour ! Quel parfum veux-tu ? »} demande le marchand. {« Fraise, s'il vous plaît. »} Le marchand sert la glace. {« Voilà ! »} Lina donne une pièce. {« Merci beaucoup ! »} Son frère arrive en courant. {« Et moi ? »} demande-t-il. {« Tu veux quel parfum ? »} dit le marchand. {« Chocolat ! »} Lina sourit. {« Tu es gourmand ! »} dit-elle. {« Toi aussi ! »} répond son frère. Ils mangent leurs glaces au soleil. {« C'est délicieux ! »} dit Lina. {« J'en veux encore une ! »} réclame son frère."}, {"titre": "La petite poule", "texte": "La petite poule rousse trouve des grains de blé. {« Qui va m'aider à semer ce blé ? »} demande-t-elle. {« Pas moi »} , dit le chat. {« Pas moi »} , dit le chien. {« Pas moi »} , dit le canard. {« Alors je le sèmerai toute seule »} , dit la petite poule. Le blé pousse. {« Qui va m'aider à couper le blé ? »} {« Pas moi ! »} répondent les trois amis. La poule coupe le blé. Elle fait de la farine, puis un pain. {« Qui va m'aider à manger ce pain ? »} demande-t-elle. {« Moi ! »} dit le chat. {« Moi ! »} dit le chien. {« Moi aussi ! »} dit le canard. {« Non ! »} dit la poule. {« Je le mangerai avec mes poussins. »} Et elle le mange. Le chat soupire : {« La prochaine fois, je t'aiderai. »} {« Moi aussi »} , dit le chien. {« Et moi aussi ! »} promet le canard."}, {"titre": "Le loup et le chevreau", "texte": "Un petit chevreau reste seul dans la maison. Sa mère lui dit : {« N'ouvre à personne ! »} {« Promis, maman »} , répond le chevreau. Un peu plus tard, on frappe à la porte. {« Ouvre, c'est ta maman ! »} dit une grosse voix. {« Ma maman a une voix douce »} , dit le chevreau. {« Montre-moi ta patte. »} Le loup montre sa patte noire. {« Ma maman a une patte blanche ! »} crie le chevreau. {« Je n'ouvrirai pas ! »} Le loup est furieux. {« Je reviendrai ! »} grogne-t-il. Il s'en va. La mère rentre. {« C'est moi, mon petit. »} {« Montre ta patte »} , dit le chevreau. {« Voilà ma patte blanche. »} Le chevreau ouvre la porte. {« Le loup est venu ! »} dit-il. {« Tu as été très sage »} , répond sa mère. {« Je suis fière de toi. »} Le chevreau se blottit contre elle. {« J'ai eu peur »} , murmure-t-il. {« C'est fini »} , dit sa mère. {« Maintenant, nous allons manger. »} {« Qu'est-ce qu'il y a ? »} demande le chevreau. {« Une bonne soupe aux choux ! »} {« Miam ! »}"}], "ce-ccp": [{"titre": "Le matin", "texte": "{Ce matin} , je me lève {tôt} . {Dans la cuisine} , maman prépare le petit-déjeuner. Je mange {vite} . {À huit heures} , nous partons. {Dans la rue} , il fait froid. {Devant l'école} , je retrouve Tom. {Ensemble} , nous entrons {dans la cour} . La cloche sonne {bientôt} ."}, {"titre": "Le pique-nique", "texte": "{Dimanche} , nous allons pique-niquer {au bord du lac} . {Sous un grand arbre} , papa étale la nappe. {Avec soin} , maman sort les sandwichs. Nous mangeons {lentement} . {Après le repas} , mon frère joue {dans l'herbe} . {Sur le lac} , des canards nagent. Je leur donne du pain {doucement} . {Le soir} , nous rentrons {à la maison} . {Dans la voiture} , ma sœur s'endort. Nous chantons {tout bas} ."}, {"titre": "L'hiver", "texte": "{En hiver} , la neige tombe {sur le village} . {Le matin} , les enfants sortent {en courant} . {Dans le jardin} , ils font un bonhomme de neige. {Avec deux cailloux} , ils lui font des yeux. {Pendant ce temps} , papa déblaie l'allée {avec une pelle} . {Sur le lac gelé} , des enfants patinent. Ils glissent {très vite} . {Soudain} , Lina tombe. Elle se relève {aussitôt} . {À midi} , tout le monde rentre. {Près de la cheminée} , nous buvons un chocolat chaud. {Dehors} , la neige tombe {encore} ."}, {"titre": "Le voyage en train", "texte": "{Samedi matin} , nous partons {en train} . {À la gare} , il y a beaucoup de monde. Nous montons {rapidement} dans le wagon. {Par la fenêtre} , je regarde le paysage. {D'abord} , nous voyons des champs. {Puis} , le train traverse une forêt. {Dans le wagon} , un bébé pleure. Sa maman le berce {doucement} . {Vers midi} , nous mangeons nos sandwichs. {Sur la tablette} , je pose mon jus de pomme. {Tout à coup} , le train entre dans un tunnel. {Dans le noir} , ma sœur crie. {Quelques secondes plus tard} , la lumière revient. {Enfin} , nous arrivons {à Marseille} . {Sur le quai} , mamie nous attend {avec un grand sourire} . {Le soir} , nous mangeons {chez elle} ."}]};
Object.assign(TROUVE_PH, {"cm-sujet": [{"titre": "La forêt en automne", "texte": "Dans la forêt, {les feuilles des chênes} tombent. {Les écureuils} ramassent des noisettes. Au loin résonne {le cri d'un geai} . {Mon frère et moi} marchons sur le tapis de feuilles. {Le vent} souffle doucement. {Un champignon énorme} pousse au pied d'un arbre. {Nous} le photographions. Sous une souche se cache {un hérisson} . {Il} dort. {L'automne} est magnifique."}, {"titre": "Le carnaval", "texte": "{Le carnaval de la ville} commence aujourd'hui. Dans les rues défilent {des chars décorés} . {Les enfants de l'école} portent des costumes. {Ma sœur et ses amies} sont déguisées en fées. Sur le premier char danse {un dragon de papier} . {La musique des fanfares} résonne. {Les spectateurs} applaudissent. {Ils} lancent des confettis. Soudain apparaît {le roi du carnaval} . {Tout le monde} crie de joie. {Les clowns} distribuent des bonbons. Moi, {je} ramasse les confettis. {La fête} durera jusqu'au soir."}, {"titre": "Les abeilles", "texte": "{Les abeilles} vivent en colonies. Dans chaque ruche règne {une reine} . {Elle} pond des milliers d'œufs. {Les ouvrières} , infatigables, butinent les fleurs. {Le nectar qu'elles rapportent} devient du miel. {L'apiculteur} , vêtu d'une combinaison, ouvre la ruche. {Ses gestes lents} rassurent les insectes. Du cadre sortent {quelques abeilles} . {Le miel doré} coule. {Mon oncle et moi} goûtons ce miel. {Il} est délicieux. Au printemps naissent {de nouvelles reines} . {L'une d'elles} quitte la ruche. {Une partie des ouvrières} la suit. {Ce départ} s'appelle l'essaimage. {Les abeilles} sont précieuses."}, {"titre": "Le premier vol", "texte": "Le 25 juillet 1909, {Louis Blériot} décolle de Calais. {Son avion} , un fragile monoplan, s'élève au-dessus de la mer. Sous lui s'étend {la Manche} . {Le brouillard} le gêne. {Aucun bateau} ne l'accompagne. {Le moteur} chauffe. Pendant de longues minutes, {l'aviateur} ne voit plus la côte. Puis apparaissent {les falaises de Douvres} . {Blériot} cherche un endroit pour atterrir. {Un policier anglais} lui fait signe. {L'avion} se pose brutalement. {Ses roues} se brisent. {Le pilote} sort indemne. {Les journaux du monde entier} racontent l'exploit. {Il} devient célèbre. À Paris l'attendent {des milliers de personnes} . {Son avion} est aujourd'hui exposé au musée. {Les enfants} l'admirent. {Chacun} rêve de voler. {Cette traversée} a changé l'histoire de l'aviation."}]});
Object.assign(TROUVE_PH, {"cm-paroles": [{"titre": "Au téléphone", "texte": "Le téléphone sonne. Léa décroche. {— Allô ?} {— Bonjour, c'est mamie !} {— Bonjour, mamie ! Comment vas-tu ?} {— Très bien. Tu viens dimanche ?} {— Oui, avec papa.} {— Parfait. Je ferai une tarte.} {— Aux pommes ?} {— Bien sûr !} {— Merci, mamie. À dimanche !} {— À dimanche, ma chérie.} Léa raccroche en souriant."}, {"titre": "Le marchand de ballons", "texte": "Un marchand de ballons arrive dans le parc. {— Ballons ! Beaux ballons !} crie-t-il. Hugo tire sa mère par la manche. {— Maman, je peux en avoir un ?} {— Lequel veux-tu ?} demande-t-elle. {— Le rouge, celui qui a des étoiles !} Le marchand détache le ballon. {— Tiens-le bien, mon garçon} , dit-il. {— Combien vous dois-je ?} demande la maman. {— Deux euros, madame.} Elle paie. Hugo s'éloigne en courant. Soudain, le vent souffle. {— Mon ballon !} s'écrie-t-il. Le ballon s'envole au-dessus des arbres. Le marchand rit. {— Reviens, je t'en donne un autre !} {— Merci, monsieur !} {— Cette fois, attache-le à ton poignet.} {— Promis !} répond Hugo. {— Et ne lâche pas ta maman non plus !} ajoute le marchand en riant."}, {"titre": "La rencontre", "texte": "Sur le chemin de l'école, Malik rencontre un nouveau voisin. {— Salut ! Tu es nouveau ?} demande Malik. {— Oui, je m'appelle Théo. Nous sommes arrivés hier.} {— D'où viens-tu ?} {— De Marseille.} {— C'est loin ! Tu vas à l'école Jean-Moulin ?} {— Oui, en CM2.} {— Moi aussi !} s'exclame Malik. Les deux garçons marchent ensemble. {— Tu aimes le football ?} demande Théo. {— J'adore ça ! Je joue dans l'équipe du quartier.} {— Je peux venir ?} {— Bien sûr ! L'entraînement a lieu mercredi.} Devant l'école, la maîtresse les accueille. {— Bonjour, les garçons. Vous vous connaissez déjà ?} {— Depuis cinq minutes !} répond Malik en riant. La maîtresse sourit. {— Alors, vous serez voisins de table.} {— D'accord !} disent les garçons en chœur. {— On commence quand ?} demande Théo."}, {"titre": "Le trésor du pirate", "texte": "Le capitaine déplie la carte sur la table. {— Messieurs, voici la carte du trésor de Barbe-Grise.} Les pirates s'approchent. {— Où est-il caché ?} demande le second. {— Sur l'île du Crâne, au pied du grand palmier} , répond le capitaine. {— Cette île est maudite !} s'écrie un vieux marin. {— Balivernes !} grogne le capitaine. {— On dit que des serpents géants la gardent} , murmure le mousse. {— As-tu peur, petit ?} {— Un peu, capitaine.} {— Tu resteras sur le navire, alors.} Le mousse rougit. {— Non ! Je viens avec vous.} Les pirates éclatent de rire. {— Il a du courage, ce gamin !} dit le second. {— Préparez la chaloupe} , ordonne le capitaine. {— Nous partirons à l'aube.} {— Et si nous trouvons le trésor ?} demande le cuisinier. {— Chacun aura sa part.} {— Vive le capitaine !} crient les pirates. Le lendemain, la chaloupe s'éloigne vers l'île. {— Ramez plus vite !} hurle le capitaine. Une heure plus tard, la vigie s'écrie : {— Terre !} Le mousse sourit. {— Le trésor est à nous !} {— Pas encore, petit} , dit le capitaine."}]});
const TROUVE = { 'ce-verbe': TEXTES_TV, ...TROUVE_CE, ...TROUVE_PH };
/* v74 : ce que dit le panneau, pour chaque exercice où l'on touche des mots */
const PAS_SUJET = /^(me|te|se|le|la|les|lui|leur|nous|vous|moi|toi|eux|l'|m'|t'|s')$/i;
const TVCFG = {
  'ce-verbe': { instr: 'Trouve les verbes conjugués', u: ['verbe conjugué', 'verbes conjugués'], m: true, carte: 'Touche dans le texte tous les <strong>verbes conjugués</strong>.', aide: 'Un verbe conjugué change quand on change le moment : <em>aujourd\'hui il court, hier il courait, demain il courra</em>. Attention : un verbe à l\'<strong>infinitif</strong> (<em>nager, pêcher</em>) n\'est pas conjugué. Au passé composé, le verbe a deux mots (<em>a fermé</em>) : touche-le une seule fois.', ok: 'Oui, c\'est un verbe conjugué !',
    non: (w) => `Non : « ${esc(w)} » n'est pas un verbe conjugué${/(er|ir|re)$/.test(w) && w.length > 3 ? ' (si c\'est un verbe, il est à l\'infinitif)' : ''}`,
    fin: 'Pour trouver le <strong>verbe conjugué</strong>, change le moment de la phrase : le mot qui change, c\'est le verbe (<em>il court → hier il courait → demain il courra</em>). On peut aussi l\'encadrer avec « ne… pas » : <em>il ne court pas</em>. L\'<strong>infinitif</strong> (<em>nager, pêcher</em>) est le nom du verbe : il n\'est pas conjugué.' },
  'ce-noms': { instr: 'Trouve les noms', u: ['nom', 'noms'], m: true, carte: 'Touche dans le texte tous les <strong>noms</strong>.', aide: 'Un nom désigne une personne, un animal, une chose ou une idée : on peut mettre devant lui <em>le, la, un, une</em> (<em>la pluie, un dragon</em>). Les <strong>noms propres</strong> (<em>Léa, Paris</em>) commencent par une majuscule : ce sont aussi des noms.', ok: (w) => (/^(Léa|Tom|Lina|Pirate|Paul|Juliette)$/.test(w) ? `Oui, « ${esc(w)} » est un nom propre !` : `Oui, « ${esc(w)} » est un nom commun !`),
    non: (w) => `Non : « ${esc(w)} » n'est ni un nom commun, ni un nom propre${/^(le|la|les|un|une|des|mon|ma|mes|ton|ta|tes|son|sa|ses|ce|cette|ces|nos|notre|leur|leurs)$/i.test(w) ? ' : c\'est le petit mot qui l\'annonce, le déterminant' : ''}`,
    fin: 'Le <strong>nom</strong> désigne une personne, un animal, une chose ou une idée. Pour le reconnaître, on essaie de mettre <em>le, la, un</em> ou <em>une</em> devant lui. Les <strong>noms propres</strong> (prénoms, noms de villes, de pays, d\'animaux familiers) commencent par une majuscule.' },
  'ce-dets': { instr: 'Trouve les déterminants', u: ['déterminant', 'déterminants'], m: true, carte: 'Touche dans le texte tous les <strong>déterminants</strong>.', aide: 'Le déterminant est le petit mot placé <strong>devant le nom</strong> : <em>le, la, les, un, une, des, mon, ta, ses, leur, ce, cette, ces…</em> Il annonce le nom et dit s\'il est masculin ou féminin, singulier ou pluriel.', ok: 'Oui, c\'est un déterminant !',
    non: (w) => `Non : « ${esc(w)} » n'est pas un déterminant`,
    fin: 'Le <strong>déterminant</strong> est le petit mot qui se place <strong>devant le nom</strong> pour l\'annoncer : les articles (<em>le, la, les, un, une, des</em>), les possessifs (<em>mon, ta, ses, leur…</em>), les démonstratifs (<em>ce, cette, ces</em>). Il porte le genre et le nombre du nom.' },
  'ce-adjs': { instr: 'Trouve les adjectifs', u: ['adjectif', 'adjectifs'], m: true, carte: 'Touche dans le texte tous les <strong>adjectifs</strong>.', aide: 'L\'adjectif dit <strong>comment est</strong> le nom : sa couleur, sa taille, son caractère… Il est à côté du nom (<em>un chat <strong>noir</strong>, une <strong>petite</strong> souris</em>) ou après le verbe <em>être</em> (<em>le ciel est <strong>bleu</strong></em>). Il s\'accorde avec le nom.', ok: 'Oui, c\'est un adjectif !',
    non: (w) => `Non : « ${esc(w)} » n'est pas un adjectif`,
    fin: 'L\'<strong>adjectif</strong> dit <strong>comment est</strong> le nom. On peut l\'enlever sans que la phrase soit fausse (<em>un chat noir → un chat</em>), ou le mettre après <em>être</em> (<em>le chat est noir</em>). Il prend le genre et le nombre du nom : <em>des fleurs rouges</em>, <em>une grande girafe</em>.' },
  'ce-prons': { instr: 'Trouve les pronoms personnels sujets', u: ['pronom sujet', 'pronoms sujets'], m: true, carte: 'Touche dans le texte tous les <strong>pronoms personnels sujets</strong>.', aide: 'Les pronoms personnels sujets : <em>je, tu, il, elle, on, nous, vous, ils, elles</em>. Ils remplacent celui qui fait l\'action. Un pronom qui n\'est pas sujet (<em>il <strong>me</strong> regarde, je <strong>le</strong> vois</em>) ne compte pas.', ok: 'Oui, c\'est un pronom sujet !',
    non: (w) => PAS_SUJET.test(w) ? `« ${esc(w)} » est bien un pronom, mais ici il n'est pas sujet : ce n'est pas lui qui fait l'action` : `Non : « ${esc(w)} » n'est pas un pronom personnel sujet`,
    fin: 'Les <strong>pronoms personnels sujets</strong> sont <em>je, tu, il, elle, on, nous, vous, ils, elles</em>. Ils se placent en général <strong>devant le verbe</strong> et disent <strong>qui fait l\'action</strong>. <em>Il</em> remplace un nom masculin, <em>elle</em> un nom féminin, <em>ils</em> et <em>elles</em> des noms au pluriel.' },
  'ce-sujets': { instr: 'Trouve le sujet de chaque verbe', u: ['sujet', 'sujets'], m: true, carte: 'Touche le <strong>sujet</strong> de chaque verbe.', aide: 'Pose la question « <strong>Qui est-ce qui</strong>… ? » devant le verbe : <em>Qui est-ce qui dort ? Le chat</em>. Le sujet peut être un groupe de plusieurs mots (<em>le petit chien de Léa</em>) : touche-le une seule fois. Parfois il est placé <strong>après</strong> le verbe (<em>Dans le ciel volent des mouettes</em>).', ok: 'Oui, c\'est le sujet du verbe !',
    non: (w) => `Non : « ${esc(w)} » n'est pas le sujet d'un verbe. Pose la question « Qui est-ce qui… ? »`,
    fin: 'Pour trouver le <strong>sujet</strong>, on pose la question « <strong>Qui est-ce qui</strong>… ? » (ou « <strong>Qu\'est-ce qui</strong>… ? ») devant le verbe. Le sujet commande l\'accord du verbe : <em>le chat dort, les chats dorment</em>. On peut l\'encadrer avec « <strong>c\'est… qui</strong> » : <em>c\'est le chat qui dort</em>.' },
};
Object.assign(TVCFG, {
  'ce-paroles': { instr: 'Trouve les paroles des personnages', u: ['parole', 'paroles'], carte: 'Touche toutes les <strong>paroles des personnages</strong>.', aide: 'Les paroles sont écrites <strong>entre guillemets</strong> « … ». Juste à côté, de petits mots disent qui parle (<em>dit Léo, demande-t-elle</em>) : ils font partie du récit, pas des paroles.', ok: 'Oui, ce sont des paroles d\'un personnage !',
    non: (w) => `Non : « ${esc(w)} » fait partie du récit, ce n'est pas une parole entre guillemets`,
    fin: 'Quand on écrit les paroles d\'un personnage telles qu\'il les a dites, on les met <strong>entre guillemets</strong> « … » : c\'est le <strong>discours direct</strong>. Un petit groupe de mots dit souvent qui parle et comment : <em>dit-il, demande-t-elle, crie Léo</em>. Dans un dialogue, chaque nouvelle réplique change de personnage.' },
  'ce-ccp': { instr: 'Trouve les compléments de phrase', u: ['complément', 'compléments'], carte: 'Touche tous les <strong>compléments de phrase</strong>.', aide: 'Ils disent <strong>où</strong>, <strong>quand</strong> ou <strong>comment</strong> se passe l\'action. On peut les <strong>déplacer</strong> ou les <strong>supprimer</strong> : la phrase garde son sens. Un complément peut avoir plusieurs mots (<em>dans la cuisine</em>) : touche-le une seule fois.', ok: 'Oui, c\'est un complément de phrase !',
    non: (w) => `Non : « ${esc(w)} » ne fait pas partie d'un complément de phrase. Essaie de le déplacer ou de le supprimer`,
    fin: 'Les <strong>compléments de phrase</strong> disent <strong>où</strong> (<em>dans le jardin</em>), <strong>quand</strong> (<em>ce matin</em>) ou <strong>comment</strong> (<em>doucement</em>) se passe l\'action. On les reconnaît parce qu\'on peut les <strong>déplacer</strong> (<em>Ce matin, je me lève → Je me lève ce matin</em>) ou les <strong>supprimer</strong> (<em>Je me lève</em>). Placés en tête de phrase, ils sont souvent suivis d\'une virgule.' },
});
TVCFG['cm-paroles'] = { instr: 'Trouve les répliques du dialogue', u: ['réplique', 'répliques'], carte: 'Touche toutes les <strong>répliques</strong> des personnages.', aide: 'Dans un dialogue, chaque réplique commence par un <strong>tiret</strong> (—). Les petits groupes qui disent qui parle (<em>crie-t-il, demande Théo</em>) appartiennent au récit : ne les touche pas.', ok: 'Oui, c\'est une réplique !',
  non: (w) => `Non : « ${esc(w)} » fait partie du récit, pas des paroles d'un personnage`,
  fin: 'Dans un <strong>dialogue</strong>, chaque <strong>réplique</strong> commence par un tiret et va à la ligne dans les livres. Les incises (<em>dit-il, demande Théo, s\'écrie Malik</em>) disent qui parle et comment : elles font partie du récit. Le dialogue est une autre façon d\'écrire le <strong>discours direct</strong>, sans guillemets à chaque réplique.' };
TVCFG['cm-sujet'] = { ...TVCFG['ce-sujets'], aide: 'Pose la question « <strong>Qui est-ce qui</strong>… ? » devant le verbe, ou encadre avec « <strong>C\'est… qui</strong> ». Le sujet peut être loin du verbe, placé <strong>après</strong> lui (<em>Dans la ruche règne une reine</em>), ou fait de plusieurs groupes (<em>Mon frère et moi</em>). Touche-le une seule fois.' };
const tv = { trouves: {}, cibles: 0 };
const TV_T = () => TROUVE[currentGame.tv][game.questions[game.index].t];
const TVC = () => TVCFG[currentGame.tv] || TVCFG['ce-verbe'];
function showQuestionTV() {
  const T = TV_T(); let n = 0;
  const mots = [];
  T.texte.replace(/\{([^}]+)\}|([^\s{]+)/g, (m, v, w) => {
    if (v !== undefined) mots.push({ t: v, k: n++ });
    else if (/^[.,;:!?»]$/.test(w) && mots.length) mots[mots.length - 1].suf = (mots[mots.length - 1].suf || '') + (/^[;:!?»]$/.test(w) ? ' ' : '') + w;
    else mots.push({ t: w });
    return m;
  });
  Object.assign(tv, { trouves: {}, cibles: n });
  currentGame.total = n;
  $('nat-sentence').innerHTML = `<div class="tm-cadre"><h3 class="tm-titre">« ${esc(T.titre)} »</h3><div class="dr-texte tv-texte">${mots.map((m, i) => `<span class="dr-mot tv-mot" data-i="${i}"${m.k !== undefined ? ` data-k="${m.k}"` : ''}>${esc(m.t)}</span>${m.suf ? esc(m.suf) : ''}`).join(' ')}</div></div>`;
  $('nat-character-stage').innerHTML = '';
  $('nat-correction').classList.add('hidden');
  $('nat-verdict-square').className = 'verdict-square';
  $('nat-fn-column').classList.add('hidden'); $('nat-nature-column').classList.remove('hidden');
  $('nat-buttons-invariables').innerHTML = '';
  $('nat-progress-label').textContent = `Texte n° ${game.questions[game.index].t + 1} « ${T.titre} »`;
  game.score = 0;
  $('nat-sentence').onclick = (ev) => { const w = ev.target.closest('.tv-mot'); if (w && currentGame.tv && !game.fini) clicTV(w); };
  majTV(); panneauTV();
  requestAnimationFrame(ajusteArdoise);
}
function majTV() {
  $('nat-score-label').textContent = scoreLabel(Math.max(0, game.score));
  $('nat-progress-bar').style.width = `${(Object.keys(tv.trouves).length / tv.cibles) * 100}%`;
}
function panneauTV(message) {
  const C = TVC();
  $('nat-instruction').textContent = C.instr;
  const n = Object.keys(tv.trouves).length;
  $('nat-buttons-variables').innerHTML = nbspFr(`<div class="carte verte active libre"><p>${C.carte}</p><p class="sous">${C.aide}</p><p class="sous">${n} ${C.u[n > 1 ? 1 : 0]} sur ${tv.cibles} trouvé${n > 1 ? 's' : ''}.</p></div>${message ? `<p class="sous sx-aide">${message}</p>` : ''}`);
}
function clicTV(w) {
  if (w.dataset.k !== undefined) {
    if (tv.trouves[w.dataset.k]) return;
    tv.trouves[w.dataset.k] = true; w.classList.add('trouve-v');
    game.score = Math.round((game.score + 1) * 10) / 10; majTV();
    const reste = tv.cibles - Object.keys(tv.trouves).length;
    const ok = TVC().ok; panneauTV(reste ? `✔ ${typeof ok === 'function' ? ok(w.textContent) : ok}` : '✔ Tu les as tous trouvés !');
    if (!reste) setTimeout(finTV, 1200);
    return;
  }
  game.score = Math.round((game.score - 0.5) * 10) / 10;
  game.erreurs.push({ mot: w.textContent, bonne: `pas un ${TVC().u[0]}`, choisie: TVC().u[0], phrase: `texte « ${TV_T().titre} »` });
  w.classList.add('dr-faux'); setTimeout(() => w.classList.remove('dr-faux'), 900);
  majTV();
  panneauTV(`${TVC().non(w.textContent)} (– 0,5 point).`);
}
function finTV() {
  boutonVoix(true);
  game.score = Math.max(0, game.score);
  $('nat-buttons-variables').innerHTML = '';
  $('nat-instruction').textContent = 'C\'est fini !';
  const total = currentGame.total;
  $('nat-correction-details').innerHTML = nbspFr(`Tu as ${fmtPts(game.score)} point${game.score >= 2 ? 's' : ''} sur ${total}. ${TVC().fin}`);
  $('nat-correction').classList.remove('hidden');
  $('nat-verdict-square').className = `verdict-square ${game.score >= total - 0.05 ? 'correct' : game.score < total / 2 ? 'wrong' : 'half'}`;
  $('nat-next-button').textContent = 'Voir mon résultat →';
  showCharacter(game.score >= total / 2 ? 'good' : 'bad', null);
}
/* « Passé, présent ou futur ? » et « les trois groupes » : le moteur des temps, avec d'autres étiquettes */
const TM_LISTES = {
  quand: [{ code: 'TPS.qpasse', nom: 'Passé' }, { code: 'TPS.qpres', nom: 'Présent' }, { code: 'TPS.qfut', nom: 'Futur' }],
  groupes: [{ code: 'TPS.g1', nom: '1er groupe' }, { code: 'TPS.g2', nom: '2e groupe' }, { code: 'TPS.g3', nom: '3e groupe' }],
  /* v74 : les mots au CE */
  ncnp: [{ code: 'TPS.nc', nom: 'Nom commun' }, { code: 'TPS.np', nom: 'Nom propre' }],
  det3: [{ code: 'TPS.art', nom: 'Article' }, { code: 'TPS.poss', nom: 'Déterminant possessif' }, { code: 'TPS.dem', nom: 'Déterminant démonstratif' }],
  genre: [{ code: 'TPS.ms', nom: 'Masculin singulier' }, { code: 'TPS.fs', nom: 'Féminin singulier' }, { code: 'TPS.mp', nom: 'Masculin pluriel' }, { code: 'TPS.fp', nom: 'Féminin pluriel' }],
  /* v75 : la phrase au CE */
  phr: [{ code: 'TPS.ph', nom: 'Une phrase' }, { code: 'TPS.nph', nom: 'Pas une phrase' }],
  ponct: [{ code: 'TPS.pt', nom: 'Point ( . )' }, { code: 'TPS.pi', nom: 'Point d\'interrogation ( ? )' }, { code: 'TPS.pe', nom: 'Point d\'exclamation ( ! )' }],
  types: [{ code: 'TPS.decl', nom: 'Déclarative' }, { code: 'TPS.inter', nom: 'Interrogative' }, { code: 'TPS.imper', nom: 'Impérative' }],
  formes2: [{ code: 'TPS.aff', nom: 'Forme affirmative' }, { code: 'TPS.neg', nom: 'Forme négative' }],
  svc: [{ code: 'TPS.suj', nom: 'Sujet' }, { code: 'TPS.vb', nom: 'Verbe' }, { code: 'TPS.cpl', nom: 'Complément' }],
  /* v81 : la phrase au CM */
  phnv: [{ code: 'TPS.pv', nom: 'Phrase verbale' }, { code: 'TPS.pn', nom: 'Phrase nominale' }],
  formes4: [{ code: 'TPS.fa', nom: 'Affirmative' }, { code: 'TPS.fn', nom: 'Négative' }, { code: 'TPS.fae', nom: 'Affirmative et exclamative' }, { code: 'TPS.fne', nom: 'Négative et exclamative' }],
  simcomp: [{ code: 'TPS.psim', nom: 'Phrase simple' }, { code: 'TPS.pcomp', nom: 'Phrase complexe' }],
  jc: [{ code: 'TPS.jux', nom: 'Propositions juxtaposées' }, { code: 'TPS.coo', nom: 'Propositions coordonnées' }],
  disc: [{ code: 'TPS.dd', nom: 'Discours direct' }, { code: 'TPS.di', nom: 'Discours indirect' }],
  cc3: [{ code: 'TPS.cl', nom: 'Complément de lieu' }, { code: 'TPS.ct', nom: 'Complément de temps' }, { code: 'TPS.cmn', nom: 'Complément de manière' }],
  /* v80 : les temps au CM */
  imps: [{ code: 'TPS.imp', nom: 'Imparfait' }, { code: 'TPS.ps', nom: 'Passé simple' }],
  recit3: [{ code: 'TPS.imp', nom: 'Imparfait' }, { code: 'TPS.ps', nom: 'Passé simple' }, { code: 'TPS.pqp', nom: 'Plus-que-parfait' }],
  /* v79 : les mots au CM */
  inv: [{ code: 'TPS.adv', nom: 'Adverbe' }, { code: 'TPS.prep', nom: 'Préposition' }, { code: 'TPS.cc', nom: 'Conjonction de coordination' }],
  detpron: [{ code: 'TPS.poss', nom: 'Déterminant possessif' }, { code: 'TPS.dem', nom: 'Déterminant démonstratif' }, { code: 'TPS.ppos', nom: 'Pronom possessif' }, { code: 'TPS.pdem', nom: 'Pronom démonstratif' }, { code: 'TPS.pper', nom: 'Pronom personnel' }],
  cvcp: [{ code: 'TPS.cv', nom: 'Complément du verbe' }, { code: 'TPS.cp', nom: 'Complément de phrase' }],
  attcv: [{ code: 'TPS.att', nom: 'Attribut du sujet' }, { code: 'TPS.cv', nom: 'Complément du verbe' }],
  epcn: [{ code: 'TPS.epi', nom: 'Épithète' }, { code: 'TPS.cdn', nom: 'Complément du nom' }],
  natf: [{ code: 'TPS.nc', nom: 'Nom commun' }, { code: 'TPS.np', nom: 'Nom propre' }, { code: 'TPS.adj', nom: 'Adjectif' }, { code: 'TPS.pron', nom: 'Pronom' }],
  fn6: [{ code: 'MODE.suj', nom: 'Sujet' }, { code: 'MODE.cv', nom: 'Complément du verbe' }, { code: 'MODE.cp', nom: 'Complément de phrase' }, { code: 'MODE.att', nom: 'Attribut du sujet' }, { code: 'MODE.epi', nom: 'Épithète' }, { code: 'MODE.cdn', nom: 'Complément du nom' }],
  nat5: [{ code: 'TPS.nc', nom: 'Nom commun' }, { code: 'TPS.np', nom: 'Nom propre' }, { code: 'TPS.det', nom: 'Déterminant' }, { code: 'TPS.adj', nom: 'Adjectif' }, { code: 'TPS.verbe', nom: 'Verbe' }, { code: 'TPS.pron', nom: 'Pronom' }],
};
/* v74 : ce que l'on demande, et le nombre de colonnes d'étiquettes, selon la liste */
const TM_LISTE_CFG = {
  quand: { donne: '<strong>le moment de l\'action</strong>', cols: 3 }, groupes: { donne: 'son <strong>groupe</strong>', cols: 3 },
  ncnp: { donne: 's\'il est <strong>nom commun</strong> ou <strong>nom propre</strong>', cols: 2, mots: true, instr: 'Nom commun ou nom propre ?' },
  det3: { donne: 'la <strong>sorte de déterminant</strong>', cols: 1, mots: true, instr: 'Quelle sorte de déterminant ?' },
  genre: { donne: 'son <strong>genre</strong> et son <strong>nombre</strong>', cols: 2, mots: true, instr: 'Le genre et le nombre de chaque nom' },
  nat5: { donne: 'sa <strong>nature</strong>', cols: 3, mots: true, instr: 'La nature de chaque mot' },
  phnv: { donne: 'si c\'est une phrase <strong>verbale</strong> ou <strong>nominale</strong>', cols: 2, obj: ['phrase', 'phrases', true], instr: 'Phrase verbale ou nominale ?' },
  formes4: { donne: 'sa <strong>forme</strong>', cols: 2, obj: ['phrase', 'phrases', true], instr: 'La forme de chaque phrase' },
  simcomp: { donne: 'si elle est <strong>simple</strong> ou <strong>complexe</strong>', cols: 2, obj: ['phrase', 'phrases', true], instr: 'Phrase simple ou complexe ?' },
  jc: { donne: 'comment ses propositions sont reliées', cols: 1, obj: ['phrase', 'phrases', true], instr: 'Juxtaposées ou coordonnées ?' },
  disc: { donne: 'si les paroles sont au <strong>discours direct</strong> ou <strong>indirect</strong>', cols: 2, obj: ['passage', 'passages'], instr: 'Discours direct ou indirect ?' },
  cc3: { donne: 'ce que précise le complément', cols: 1, obj: ['complément', 'compléments'], instr: 'Lieu, temps ou manière ?' },
  imps: { donne: 'son <strong>temps</strong>', cols: 2, instr: 'Imparfait ou passé simple ?' },
  recit3: { donne: 'son <strong>temps</strong>', cols: 3, instr: 'Les temps du récit' },
  inv: { donne: 'sa <strong>nature</strong>', cols: 1, mots: true, instr: 'Adverbe, préposition ou conjonction ?' },
  detpron: { donne: 's\'il est <strong>déterminant</strong> ou <strong>pronom</strong>, et de quelle sorte', cols: 1, mots: true, instr: 'Déterminant ou pronom ?' },
  cvcp: { donne: 'sa <strong>fonction</strong>', cols: 2, obj: ['groupe de mots', 'groupes de mots'], instr: 'Complément du verbe ou de phrase ?' },
  attcv: { donne: 'sa <strong>fonction</strong>', cols: 2, obj: ['groupe de mots', 'groupes de mots'], instr: 'Attribut ou complément du verbe ?' },
  epcn: { donne: 'sa <strong>fonction</strong> dans le groupe nominal', cols: 2, mots: true, instr: 'Épithète ou complément du nom ?' },
  natf: { donne: 'sa <strong>nature</strong> (étiquette verte) et sa <strong>fonction</strong> (étiquette rouge)', deux: true, cols: 2, cols2: 2, mots: true, instr: 'La nature et la fonction de chaque mot' },
  phr: { donne: 'si c\'est <strong>une phrase</strong> ou non', cols: 2, obj: ['groupe de mots', 'groupes de mots'], seul: true, instr: 'Phrase ou pas phrase ?' },
  ponct: { donne: 'le <strong>point</strong> qui la termine', cols: 1, obj: ['phrase', 'phrases', true], seul: true, instr: 'Quel point à la fin de la phrase ?' },
  types: { donne: 'son <strong>type</strong>', cols: 3, obj: ['phrase', 'phrases', true], instr: 'Le type de chaque phrase' },
  formes2: { donne: 'sa <strong>forme</strong>', cols: 2, obj: ['phrase', 'phrases', true], instr: 'La forme de chaque phrase' },
  svc: { donne: 'si c\'est le <strong>sujet</strong>, le <strong>verbe</strong> ou un <strong>complément</strong>', cols: 3, obj: ['groupe de mots', 'groupes de mots'], instr: 'Sujet, verbe ou complément ?' },
};
const TML = () => TM_LISTE_CFG[currentGame.tmListe] || {};
Object.values(TM_LISTES).flat().forEach((x) => { x.article = x.nom.toLowerCase(); x.explication = ''; NATURE_BY_CODE[x.code] = x; });
[
  ["ce-quand", "Le gâteau", "Hier, maman {a fait|qpasse|ind} un gâteau. Il {sentait|qpasse|ind} bon. Aujourd'hui, nous le {mangeons|qpres|ind} . Mon frère en {veut|qpres|ind} encore. Il {tend|qpres|ind} son assiette. Demain, il n'en {restera|qfut|ind} plus ! Maman en {fera|qfut|ind} un autre. Je l'{aiderai|qfut|ind} . Hier, mon frère en {a mangé|qpasse|ind} trois parts. Il {avait|qpasse|ind} mal au ventre !"],
  ["ce-quand", "Au zoo", "La semaine dernière, nous {sommes allés|qpasse|ind} au zoo. Les singes {sautaient|qpasse|ind} partout. Un éléphant {a arrosé|qpasse|ind} les visiteurs. Aujourd'hui, je {dessine|qpres|ind} un singe. La maîtresse {regarde|qpres|ind} mon dessin. Elle le {trouve|qpres|ind} très beau. Mes camarades {colorient|qpres|ind} des lions. Demain, je le {montrerai|qfut|ind} à papa. Il l'{accrochera|qfut|ind} dans ma chambre. Bientôt, nous {retournerons|qfut|ind} au zoo. Nous {verrons|qfut|ind} les girafes. Autrefois, il n'y {avait|qpasse|ind} pas de girafes dans ce zoo. Maintenant, il y en {a|qpres|ind} trois."],
  ["ce-quand", "Mon anniversaire", "Dans une semaine, j'{aurai|qfut|ind} huit ans. Je {prépare|qpres|ind} les invitations. Ma sœur m'{aide|qpres|ind} . Nous {écrivons|qpres|ind} le nom de mes amis. L'an dernier, mes amis m'{ont offert|qpasse|ind} un ballon. Nous {avons joué|qpasse|ind} au football tout l'après-midi. Il {pleuvait|qpasse|ind} mais nous {étions|qpasse|ind} contents. Cette année, je {demande|qpres|ind} un vélo. Papa {réfléchit|qpres|ind} . Nous {jouerons|qfut|ind} dans le jardin. Maman {fera|qfut|ind} un gâteau au chocolat. Mes amis {chanteront|qfut|ind} pour moi. Je {soufflerai|qfut|ind} les bougies d'un coup ! Autrefois, papa {fêtait|qpasse|ind} son anniversaire chez sa grand-mère. Elle lui {cuisait|qpasse|ind} des crêpes."],
  ["ce-quand", "La sortie", "Ce matin, il {pleut|qpres|ind} . Les élèves {restent|qpres|ind} en classe. Hier, il {faisait|qpasse|ind} beau. Nous {sommes sortis|qpasse|ind} dans la cour. Nous {avons joué|qpasse|ind} à la marelle. La maîtresse {a sonné|qpasse|ind} la cloche trop tôt ! Aujourd'hui, je {lis|qpres|ind} un livre. Mon voisin {colorie|qpres|ind} un dessin. La pluie {tape|qpres|ind} contre les vitres. Cet après-midi, nous {resterons|qfut|ind} encore en classe. Nous {chanterons|qfut|ind} une chanson. Bientôt, le soleil {reviendra|qfut|ind} . Demain, nous {irons|qfut|ind} au gymnase. Nous {grimperons|qfut|ind} à la corde. L'année dernière, je {grimpais|qpasse|ind} très mal. Je {tombais|qpasse|ind} souvent. Maintenant, je {suis|qpres|ind} plus fort. La maîtresse {sera|qfut|ind} fière de moi. Mes parents {ont acheté|qpasse|ind} des chaussures de sport. Elles {brillent|qpres|ind} ."],
  ["ce-groupes", "Chansons et puzzles", "Je {chante|g1|ind} une chanson. Le chien {aboie|g1|ind} . Les fleurs {fleurissent|g2|ind} . Nous {finissons|g2|ind} le puzzle. Tu {prends|g3|ind} ton manteau. Ils {vont|g3|ind} à l'école. Maman {cuisine|g1|ind} . Le pain {brunit|g2|ind} dans le four. Papa {lit|g3|ind} le journal. Nous {mangeons|g1|ind} ensemble."],
  ["ce-groupes", "À la ferme", "Le soleil {brille|g1|ind} . Les enfants {jouent|g1|ind} . Le blé {mûrit|g2|ind} . Je {vois|g3|ind} un oiseau. Maman {fait|g3|ind} un gâteau. Les feuilles {jaunissent|g2|ind} . Le fermier {conduit|g3|ind} son tracteur. Les vaches {mangent|g1|ind} . Le veau {grandit|g2|ind} vite. Nous {buvons|g3|ind} du lait frais. Tu {cueilles|g3|ind} des cerises. Les abeilles {butinent|g1|ind} . Vous {ramassez|g1|ind} les œufs."],
  ["ce-groupes", "À la mer", "Papa {conduit|g3|ind} la voiture. Nous {arrivons|g1|ind} à la mer. Ma sœur {rougit|g2|ind} au soleil. Vous {dites|g3|ind} bonjour. Le bateau {part|g3|ind} . Je {choisis|g2|ind} une glace. Les mouettes {crient|g1|ind} . Mon frère {plonge|g1|ind} . Il {réussit|g2|ind} un beau saut. Maman {dort|g3|ind} sous le parasol. Tu {construis|g3|ind} un château. La mer {monte|g1|ind} . Les vagues {démolissent|g2|ind} le château. Nous {courons|g3|ind} vers la dune. Papi {sort|g3|ind} le pique-nique. Nous {applaudissons|g2|ind} ."],
  ["ce-groupes", "Au marché", "Je {vais|g3|ind} au marché. Le marchand {vend|g3|ind} des pommes. Nous {remplissons|g2|ind} le panier. Tu {cours|g3|ind} trop vite. Mamie {pèse|g1|ind} les carottes. Les poires {mûrissent|g2|ind} . Il {vient|g3|ind} avec nous. Le fromager {offre|g3|ind} un morceau de comté. Je le {goûte|g1|ind} . Les clients {attendent|g3|ind} . Une dame {choisit|g2|ind} des fleurs. Le fleuriste {sourit|g3|ind} . Nous {allons|g3|ind} à la boulangerie. Le pain {sent|g3|ind} bon. Maman {paie|g1|ind} . Le boulanger {rend|g3|ind} la monnaie. Nous {finissons|g2|ind} nos courses. Mon frère {porte|g1|ind} le sac. Il {grossit|g2|ind} à chaque achat ! Nous {rentrons|g1|ind} à pied."],
  ["ce-ncnp", "Léa et Moustache", "{Léa|np|ind} a un {chat|nc|ind} qui s'appelle {Moustache|np|ind} . Elle habite à {Paris|np|ind} , près de la {Seine|np|ind} . Son {frère|nc|ind} {Hugo|np|ind} a un {vélo|nc|ind} . Le {dimanche|nc|ind} , ils vont au {parc|nc|ind} ."],
  ["ce-ncnp", "Les vacances des Martin", "En {été|nc|ind} , la {famille|nc|ind} {Martin|np|ind} part en {Bretagne|np|ind} . Ils prennent le {train|nc|ind} à {Lyon|np|ind} . Leur {chien|nc|ind} {Rex|np|ind} voyage avec eux. À {Brest|np|ind} , ils visitent un {port|nc|ind} . {Julie|np|ind} achète une {carte|nc|ind} postale pour sa {mamie|nc|ind} ."],
  ["ce-ncnp", "Christophe Colomb", "{Christophe Colomb|np|ind} était un {marin|nc|ind} . Il est parti d'{Espagne|np|ind} avec trois {bateaux|nc|ind} . Il voulait aller en {Inde|np|ind} . Après un long {voyage|nc|ind} sur l'{océan|nc|ind} {Atlantique|np|ind} , il a découvert une {terre|nc|ind} inconnue : l'{Amérique|np|ind} . Les {habitants|nc|ind} de ces {îles|nc|ind} l'ont accueilli. Aujourd'hui, une {ville|nc|ind} des {États-Unis|np|ind} porte son {nom|nc|ind} : {Columbus|np|ind} ."],
  ["ce-ncnp", "Zoé à la bibliothèque", "Le {mercredi|nc|ind} , {Zoé|np|ind} va à la {bibliothèque|nc|ind} {Victor-Hugo|np|ind} avec sa {tante|nc|ind} {Claire|np|ind} . Elle emprunte un {livre|nc|ind} sur les {pharaons|nc|ind} de l'{Égypte|np|ind} . Elle y découvre {Toutankhamon|np|ind} , un jeune {roi|nc|ind} , et les {pyramides|nc|ind} de {Gizeh|np|ind} . Le {Nil|np|ind} traverse ce {pays|nc|ind} . Puis elle regarde une {carte|nc|ind} de la {France|np|ind} et cherche {Marseille|np|ind} . {Zoé|np|ind} rêve de {voyages|nc|ind} ."],
  ["ce-det3", "Mon voisin", "{Le|art|ind} chien de {mon|poss|ind} voisin aboie. {Cette|dem|ind} fleur est jolie. {Ma|poss|ind} sœur a {un|art|ind} lapin. {Ces|dem|ind} enfants jouent avec {des|art|ind} ballons. {Ton|poss|ind} vélo est dans {la|art|ind} cour. {Ce|dem|ind} gâteau est délicieux."],
  ["ce-det3", "Dans la rue", "{Mon|poss|ind} frère a {un|art|ind} vélo rouge. {Ma|poss|ind} sœur préfère {sa|poss|ind} trottinette. {Les|art|ind} voisins promènent {leur|poss|ind} chien. {Ce|dem|ind} chien porte {un|art|ind} collier bleu. {Mes|poss|ind} amis jouent dans {la|art|ind} rue. {Cette|dem|ind} rue est calme. {Nos|poss|ind} parents nous regardent par {la|art|ind} fenêtre."],
  ["ce-det3", "Les graines", "{Ce|dem|ind} matin, {la|art|ind} maîtresse apporte {une|art|ind} boîte. Dans {cette|dem|ind} boîte, il y a {des|art|ind} graines. {Les|art|ind} élèves plantent {les|art|ind} graines dans {des|art|ind} pots. {Mon|poss|ind} voisin arrose {son|poss|ind} pot. {Ta|poss|ind} plante pousse vite. {Ces|dem|ind} feuilles sont vertes. {Notre|poss|ind} classe ressemble à {un|art|ind} jardin. {Les|art|ind} parents viendront voir {nos|poss|ind} plantes."],
  ["ce-det3", "Les histoires de grand-père", "{Le|art|ind} soir, {mon|poss|ind} grand-père raconte {des|art|ind} histoires. {Ses|poss|ind} histoires parlent de {son|poss|ind} enfance. {Sa|poss|ind} maison était dans {un|art|ind} village. {Les|art|ind} enfants marchaient dans {la|art|ind} neige. {Leurs|poss|ind} chaussures étaient mouillées. {Cette|dem|ind} époque était dure. {Ces|dem|ind} enfants avaient {des|art|ind} sabots. {Leur|poss|ind} maîtresse chauffait {la|art|ind} classe avec {un|art|ind} poêle. {Ma|poss|ind} sœur et moi écoutons {ces|dem|ind} récits. {Notre|poss|ind} chat dort sur {mes|poss|ind} genoux."],
  ["ce-genre", "Petites phrases", "Le {chat|ms|ind} attrape une {souris|fs|ind} . Les {oiseaux|mp|ind} chantent. Les {fleurs|fp|ind} sentent bon. Un {garçon|ms|ind} lit une {histoire|fs|ind} . Mes {cousins|mp|ind} mangent des {pommes|fp|ind} . Le {soleil|ms|ind} sèche la {route|fs|ind} ."],
  ["ce-genre", "En classe", "La {maîtresse|fs|ind} distribue les {cahiers|mp|ind} . Les {filles|fp|ind} écrivent la {date|fs|ind} . Un {élève|ms|ind} range ses {crayons|mp|ind} . Les {tables|fp|ind} sont propres. Le {tableau|ms|ind} est vert. Les {garçons|mp|ind} lisent une {poésie|fs|ind} . La {cloche|fs|ind} sonne la {récréation|fs|ind} . Le {directeur|ms|ind} passe."],
  ["ce-genre", "Dans la forêt", "Dans la {forêt|fs|ind} , les {arbres|mp|ind} perdent leurs {feuilles|fp|ind} . Un {écureuil|ms|ind} ramasse des {noisettes|fp|ind} . Les {champignons|mp|ind} poussent sous la {mousse|fs|ind} . Une {biche|fs|ind} et son {faon|ms|ind} traversent le {chemin|ms|ind} . Des {souris|fp|ind} se cachent sous les {racines|fp|ind} . Le {vent|ms|ind} fait tomber les {glands|mp|ind} . Une {chouette|fs|ind} dort dans un {creux|ms|ind} ."],
  ["ce-genre", "Au zoo", "Au {zoo|ms|ind} , les {visiteurs|mp|ind} admirent les {animaux|mp|ind} . Les {lionnes|fp|ind} dorment au soleil. Un {gorille|ms|ind} mange des {bananes|fp|ind} . Les {girafes|fp|ind} tendent leur long {cou|ms|ind} vers les {branches|fp|ind} . Un {gardien|ms|ind} nourrit les {phoques|mp|ind} . Ils attrapent des {poissons|mp|ind} au vol. Une {fillette|fs|ind} applaudit. Les {perroquets|mp|ind} répètent les {mots|mp|ind} des {gens|mp|ind} . Le {crocodile|ms|ind} ouvre sa {gueule|fs|ind} . Le {soir|ms|ind} , les {portes|fp|ind} se ferment."],
  ["ce-nat5", "Le chat et ma sœur", "{Le|det|ind} {chat|nc|ind} {dort|verbe|ind} . {Il|pron|ind} {ronronne|verbe|ind} . {Ma|det|ind} {petite|adj|ind} {sœur|nc|ind} {chante|verbe|ind} . {Elle|pron|ind} est contente."],
  ["ce-nat5", "Le grand chien", "{Un|det|ind} {grand|adj|ind} {chien|nc|ind} {court|verbe|ind} dans le jardin. {Il|pron|ind} {cherche|verbe|ind} {sa|det|ind} {balle|nc|ind} {rouge|adj|ind} . {Nous|pron|ind} {jouons|verbe|ind} avec {lui|pron|ind} . {Léo|np|ind} rit."],
  ["ce-nat5", "À la ferme", "{Ce|det|ind} {matin|nc|ind} , {les|det|ind} {élèves|nc|ind} {visitent|verbe|ind} {une|det|ind} {ferme|nc|ind} . {Ils|pron|ind} {voient|verbe|ind} {des|det|ind} {vaches|nc|ind} {noires|adj|ind} . {Le|det|ind} {fermier|nc|ind} {est|verbe|ind} {gentil|adj|ind} . Il donne du lait."],
  ["ce-nat5", "Grand-père raconte", "{Mon|det|ind} {vieux|adj|ind} {grand-père|nc|ind} {raconte|verbe|ind} {des|det|ind} {histoires|nc|ind} {étonnantes|adj|ind} . {Il|pron|ind} {connaît|verbe|ind} {les|det|ind} {animaux|nc|ind} {sauvages|adj|ind} . {Nous|pron|ind} {écoutons|verbe|ind} {ses|det|ind} {aventures|nc|ind} . {Elles|pron|ind} {sont|verbe|ind} {passionnantes|adj|ind} . {Tu|pron|ind} viens ?"],
  ["ce-bilannat", "La nuit", "{La|det|ind} {lune|nc|ind} {brille|verbe|ind} . {Les|det|ind} {étoiles|nc|ind} {scintillent|verbe|ind} . {Je|pron|ind} {regarde|verbe|ind} {le|det|ind} {ciel|nc|ind} ."],
  ["ce-bilannat", "Le chat et la souris", "{Mon|det|ind} {chat|nc|ind} {noir|adj|ind} {chasse|verbe|ind} {une|det|ind} {souris|nc|ind} . {Elle|pron|ind} {se cache|verbe|ind} . {Le|det|ind} {chat|nc|ind} {attend|verbe|ind} ."],
  ["ce-bilannat", "La soupe", "{Lucas|np|ind} {prépare|verbe|ind} {une|det|ind} {soupe|nc|ind} {chaude|adj|ind} . {Nous|pron|ind} {mettons|verbe|ind} {la|det|ind} {table|nc|ind} . {Ma|det|ind} {sœur|nc|ind} {apporte|verbe|ind} le pain."],
  ["ce-bilannat", "La cabane", "{Les|det|ind} {enfants|nc|ind} {construisent|verbe|ind} {une|det|ind} {cabane|nc|ind} . {Ils|pron|ind} {utilisent|verbe|ind} {des|det|ind} {branches|nc|ind} {sèches|adj|ind} . {Leur|det|ind} {cabane|nc|ind} {est|verbe|ind} solide."],
  ["ce-bilannat", "Le bonhomme de neige", "{Ce|det|ind} {matin|nc|ind} , {la|det|ind} {neige|nc|ind} {couvre|verbe|ind} {le|det|ind} {jardin|nc|ind} . {Nous|pron|ind} {faisons|verbe|ind} {un|det|ind} {bonhomme|nc|ind} . {Il|pron|ind} a {un|det|ind} {nez|nc|ind} orange."],
  ["ce-bilannat", "Le petit âne", "{Le|det|ind} {petit|adj|ind} {âne|nc|ind} {porte|verbe|ind} {des|det|ind} {sacs|nc|ind} {lourds|adj|ind} . {Il|pron|ind} {monte|verbe|ind} {le|det|ind} {chemin|nc|ind} étroit. {Le|det|ind} {fermier|nc|ind} {le|pron|ind} {suit|verbe|ind} ."],
  ["ce-bilannat", "La tempête", "{Une|det|ind} {tempête|nc|ind} {terrible|adj|ind} {souffle|verbe|ind} . {Les|det|ind} {arbres|nc|ind} {plient|verbe|ind} . {Tu|pron|ind} {fermes|verbe|ind} {les|det|ind} {volets|nc|ind} {bleus|adj|ind} . {Le|det|ind} {chat|nc|ind} tremble. {Il|pron|ind} a peur."],
  ["ce-bilannat", "Le pull rouge", "{Ma|det|ind} {grand-mère|nc|ind} {tricote|verbe|ind} {un|det|ind} {pull|nc|ind} {rouge|adj|ind} . {Elle|pron|ind} {le|pron|ind} {donnera|verbe|ind} à {mon|det|ind} {frère|nc|ind} . {Ce|det|ind} {pull|nc|ind} {sera|verbe|ind} {chaud|adj|ind} et {doux|adj|ind} ."],
  ["ce-bilannat", "Les pompiers", "{Les|det|ind} {pompiers|nc|ind} {courageux|adj|ind} {arrivent|verbe|ind} . {Ils|pron|ind} {éteignent|verbe|ind} {le|det|ind} {feu|nc|ind} . {Un|det|ind} {voisin|nc|ind} {inquiet|adj|ind} {les|pron|ind} {remercie|verbe|ind} . {La|det|ind} {maison|nc|ind} {reste|verbe|ind} {intacte|adj|ind} ."],
  ["ce-bilannat", "Les crêpes", "{Ce|det|ind} {soir|nc|ind} , {nous|pron|ind} {regardons|verbe|ind} {un|det|ind} {film|nc|ind} {drôle|adj|ind} . {Mon|det|ind} {père|nc|ind} {rit|verbe|ind} . {Ma|det|ind} {mère|nc|ind} {prépare|verbe|ind} {des|det|ind} {crêpes|nc|ind} {sucrées|adj|ind} . {Elles|pron|ind} {sentent|verbe|ind} bon."],
  ["ce-bilannat", "Le pêcheur", "{Le|det|ind} {vieux|adj|ind} {pêcheur|nc|ind} {lance|verbe|ind} {sa|det|ind} {ligne|nc|ind} . {Un|det|ind} {gros|adj|ind} {poisson|nc|ind} {mord|verbe|ind} . {Il|pron|ind} {le|pron|ind} {tire|verbe|ind} doucement. {Ce|det|ind} {poisson|nc|ind} {est|verbe|ind} {énorme|adj|ind} et {lourd|adj|ind} . {Il|pron|ind} sourit."],
  ["ce-bilannat", "Les hirondelles", "{Les|det|ind} {premières|adj|ind} {hirondelles|nc|ind} {reviennent|verbe|ind} . {Elles|pron|ind} {construisent|verbe|ind} {leur|det|ind} {nid|nc|ind} sous {notre|det|ind} {toit|nc|ind} . {Mon|det|ind} {petit|adj|ind} {frère|nc|ind} {les|pron|ind} {observe|verbe|ind} . {Il|pron|ind} {trouve|verbe|ind} {ces|det|ind} {oiseaux|nc|ind} {magnifiques|adj|ind} ."],
  ["ce-phr", "Au jardin", "{Le chat dort sur le lit.|ph|ind} {dort chien le niche sa dans|nph|ind} {Maman lit un livre.|ph|ind} {fleurs arrose papa les|nph|ind} {Le soleil brille.|ph|ind} {mange pomme une Léo|nph|ind} {Il fait beau aujourd'hui.|ph|ind} {la neige tombe sur le toit|nph|ind} {Mon frère joue au ballon.|ph|ind} {Les oiseaux chantent.|ph|ind}"],
  ["ce-phr", "À l'école", "{La maîtresse écrit au tableau.|ph|ind} {cahier ouvre son Tom|nph|ind} {Nous lisons une histoire.|ph|ind} {les élèves dessinent un arbre|nph|ind} {La cloche sonne.|ph|ind} {cour la dans courent enfants les|nph|ind} {Lina saute à la corde.|ph|ind} {Hugo joue aux billes.|ph|ind} {récréation la vite passe|nph|ind} {Les enfants remontent en classe.|ph|ind} {mon ami me prête sa gomme|nph|ind} {Je range mes crayons.|ph|ind} {classe la sort maîtresse la|nph|ind}"],
  ["ce-phr", "La ferme", "{Le fermier se lève tôt.|ph|ind} {vaches les trait il|nph|ind} {Les poules picorent le grain.|ph|ind} {le coq chante très fort|nph|ind} {Le chien garde les moutons.|ph|ind} {cochon boue le dans se roule|nph|ind} {Ma cousine ramasse les œufs.|ph|ind} {Le cheval mange du foin.|ph|ind} {tracteur le conduit fermier le|nph|ind} {Le chat chasse les souris.|ph|ind} {les canards nagent sur la mare|nph|ind} {Nous buvons du lait frais.|ph|ind} {lapins carottes des mangent les|nph|ind} {Le veau tète sa mère.|ph|ind} {Le soir, tout le monde dort.|ph|ind} {ferme silencieuse la est|nph|ind}"],
  ["ce-phr", "La mer", "{Nous partons à la mer.|ph|ind} {voiture la dans monte papa|nph|ind} {Le voyage est long.|ph|ind} {ma sœur dort contre la vitre|nph|ind} {Enfin, nous voyons la plage.|ph|ind} {sable chaud le est|nph|ind} {Je cours vers les vagues.|ph|ind} {L'eau est froide !|ph|ind} {château un construit frère mon|nph|ind} {Maman lit sous le parasol.|ph|ind} {les mouettes crient dans le ciel|nph|ind} {Un bateau passe au loin.|ph|ind} {glace achète papa une nous|nph|ind} {Elle fond très vite.|ph|ind} {Je ramasse des coquillages.|ph|ind} {mer la monte doucement|nph|ind} {Nous rangeons nos affaires.|ph|ind} {le soleil se couche sur la mer|nph|ind} {Quelle belle journée !|ph|ind} {demain reviendrons nous|nph|ind}"],
  ["ce-ponct", "Le chien", "{Mon chien s'appelle Rex|pt|ind} {Où est-il caché|pi|ind} {Comme il court vite|pe|ind} {Il aime les os|pt|ind} {Veux-tu jouer avec lui|pi|ind} {Il remue la queue|pt|ind} {Quel gentil chien|pe|ind} {Il dort dans sa niche|pt|ind} {Est-ce qu'il a faim|pi|ind} {Il mange sa pâtée|pt|ind}"],
  ["ce-ponct", "Le goûter", "{Il est quatre heures|pt|ind} {As-tu faim|pi|ind} {Maman sort les gâteaux|pt|ind} {Comme ils sentent bon|pe|ind} {Qui veut du chocolat|pi|ind} {Mon frère lève la main|pt|ind} {Il en prend trois|pt|ind} {Quel gourmand|pe|ind} {Je bois un verre de lait|pt|ind} {Est-ce qu'il reste une part|pi|ind} {Le chat regarde la table|pt|ind} {Oh, il a volé un biscuit|pe|ind} {Tout le monde rit|pt|ind}"],
  ["ce-ponct", "La forêt", "{Nous partons en forêt|pt|ind} {Prends-tu ton panier|pi|ind} {Les arbres sont très hauts|pt|ind} {Comme il fait sombre ici|pe|ind} {Un écureuil grimpe au tronc|pt|ind} {L'as-tu vu|pi|ind} {Il porte une noisette|pt|ind} {Que la mousse est douce|pe|ind} {Papa cherche des champignons|pt|ind} {Sont-ils bons à manger|pi|ind} {Il faut faire attention|pt|ind} {Certains sont dangereux|pt|ind} {Oh, une biche|pe|ind} {Elle s'enfuit vers le ruisseau|pt|ind} {Où va-t-elle|pi|ind} {Nous rentrons à la maison|pt|ind}"],
  ["ce-ponct", "Le grand jour", "{Aujourd'hui, c'est la fête de l'école|pt|ind} {Es-tu prêt|pi|ind} {Je mets mon costume de pirate|pt|ind} {Comme il est beau|pe|ind} {Ma sœur est déguisée en fée|pt|ind} {Où est sa baguette|pi|ind} {Elle la cherche partout|pt|ind} {La voilà sous le lit|pt|ind} {Nous partons à pied|pt|ind} {Que de monde dans la cour|pe|ind} {Les parents prennent des photos|pt|ind} {Quand commence le spectacle|pi|ind} {La musique démarre|pt|ind} {Les petits dansent en rond|pt|ind} {Quelle jolie danse|pe|ind} {Puis c'est notre tour|pt|ind} {As-tu peur|pi|ind} {Un peu, mais je chante fort|pt|ind} {Bravo, les enfants|pe|ind} {Quelle belle fête|pe|ind}"],
  ["ce-types", "Le lapin", "{J'ai un petit lapin.|decl|ind} {Il s'appelle Pompon.|decl|ind} {Veux-tu le caresser ?|inter|ind} {Ouvre doucement la cage.|imper|ind} {Il aime les carottes.|decl|ind} {Donne-lui une feuille de salade.|imper|ind} {As-tu vu ses oreilles ?|inter|ind} {Elles sont très longues.|decl|ind} {Ne le serre pas trop fort.|imper|ind} {Il est content.|decl|ind}"],
  ["ce-types", "La cuisine", "{Papa prépare une soupe.|decl|ind} {Lave les poireaux.|imper|ind} {Où est le couteau ?|inter|ind} {Il est dans le tiroir.|decl|ind} {Épluche les carottes, s'il te plaît.|imper|ind} {Est-ce que l'eau bout ?|inter|ind} {Oui, elle fait des bulles.|decl|ind} {Mets les légumes dans la casserole.|imper|ind} {La soupe cuit doucement.|decl|ind} {Ça sent bon !|decl|ind} {Quand pourrons-nous manger ?|inter|ind} {Mettez la table.|imper|ind} {Nous goûtons la soupe.|decl|ind}"],
  ["ce-types", "Le musée", "{Aujourd'hui, nous visitons un musée.|decl|ind} {Restez bien en rang.|imper|ind} {Que voit-on dans cette salle ?|inter|ind} {Il y a des squelettes de dinosaures.|decl|ind} {Ne touchez pas les vitrines.|imper|ind} {Ce dinosaure était-il méchant ?|inter|ind} {Il mangeait seulement des plantes.|decl|ind} {Regardez ses grandes dents.|imper|ind} {Combien pèse-t-il ?|inter|ind} {Il pèse autant que dix éléphants.|decl|ind} {Prenez vos cahiers.|imper|ind} {Dessinez votre dinosaure préféré.|imper|ind} {Est-ce que je peux dessiner le plus grand ?|inter|ind} {Bien sûr, Léo.|decl|ind} {Le guide nous raconte une histoire.|decl|ind} {Tout le monde écoute.|decl|ind}"],
  ["ce-types", "Le voyage", "{Demain, nous partons en vacances.|decl|ind} {Prépare ta valise.|imper|ind} {As-tu mis ton pyjama ?|inter|ind} {Oui, il est sous mon pull.|decl|ind} {N'oublie pas ta brosse à dents.|imper|ind} {Où sont mes lunettes de soleil ?|inter|ind} {Elles sont sur la table.|decl|ind} {Le matin, nous nous levons tôt.|decl|ind} {Monte vite dans la voiture.|imper|ind} {Attache ta ceinture.|imper|ind} {Combien de temps dure le voyage ?|inter|ind} {Il dure cinq heures.|decl|ind} {C'est très long !|decl|ind} {Peut-on écouter de la musique ?|inter|ind} {Choisis une chanson.|imper|ind} {Nous chantons tous ensemble.|decl|ind} {Enfin, nous voyons la montagne.|decl|ind} {Est-ce que la maison est loin ?|inter|ind} {Regarde, elle est là-haut.|imper|ind} {Nous sommes arrivés.|decl|ind}"],
  ["ce-formes", "Le dragon", "{Le dragon vit dans une grotte.|aff|ind} {Il ne sort pas le jour.|neg|ind} {Il crache du feu.|aff|ind} {Il n'a pas d'amis.|neg|ind} {Les villageois ont peur de lui.|aff|ind} {Personne ne s'approche de la grotte.|neg|ind} {Un jour, une petite fille arrive.|aff|ind} {Elle n'a pas peur.|neg|ind} {Elle lui offre une fleur.|aff|ind} {Le dragon ne crache plus de feu.|neg|ind}"],
  ["ce-formes", "Le chat Minou", "{Minou est un chat paresseux.|aff|ind} {Il ne chasse jamais les souris.|neg|ind} {Il dort toute la journée.|aff|ind} {Il n'aime pas la pluie.|neg|ind} {Il aime le lait tiède.|aff|ind} {Il ne boit pas d'eau.|neg|ind} {Le soir, il réclame des caresses.|aff|ind} {Il ronronne sur mes genoux.|aff|ind} {Il ne veut plus descendre.|neg|ind} {Ma mère rit.|aff|ind} {Elle ne le gronde jamais.|neg|ind} {Ce chat a de la chance.|aff|ind} {Il ne fait rien de la journée !|neg|ind}"],
  ["ce-formes", "La sortie au parc", "{Ce matin, nous allons au parc.|aff|ind} {Il ne pleut pas.|neg|ind} {Le ciel est tout bleu.|aff|ind} {Mon petit frère ne veut pas marcher.|neg|ind} {Papa le porte sur ses épaules.|aff|ind} {Au parc, les balançoires sont libres.|aff|ind} {Personne ne joue au toboggan.|neg|ind} {Je monte tout en haut.|aff|ind} {Je n'ai pas peur.|neg|ind} {Ma sœur ne trouve plus son ballon.|neg|ind} {Il est sous un banc.|aff|ind} {Nous mangeons un sandwich.|aff|ind} {Mon frère ne mange rien.|neg|ind} {Il préfère les biscuits.|aff|ind} {Nous ne voulons pas partir.|neg|ind} {Il est déjà tard.|aff|ind}"],
  ["ce-formes", "Le robot", "{Léo a construit un robot.|aff|ind} {Il s'appelle Bip.|aff|ind} {Bip ne parle pas.|neg|ind} {Il fait des petits bruits.|aff|ind} {Il ne marche pas très vite.|neg|ind} {Il roule sur des roues.|aff|ind} {Le matin, il range la chambre.|aff|ind} {Il ne range jamais les chaussettes !|neg|ind} {Il les cache sous le lit.|aff|ind} {Maman ne le sait pas.|neg|ind} {Bip n'aime pas l'eau.|neg|ind} {Il ne sort jamais sous la pluie.|neg|ind} {Il aime le soleil.|aff|ind} {Ses piles se rechargent à la lumière.|aff|ind} {Un jour, Bip ne s'allume plus.|neg|ind} {Léo est très triste.|aff|ind} {Il ne comprend pas.|neg|ind} {Il change les piles.|aff|ind} {Bip fait à nouveau bip !|aff|ind} {Léo n'est plus triste.|neg|ind}"],
  ["ce-svc", "Le chat", "{Le chat|suj|ind} {attrape|vb|ind} {une souris|cpl|ind} . {Ma sœur|suj|ind} {chante|vb|ind} . {Papa|suj|ind} {lave|vb|ind} {la voiture|cpl|ind} . {Bébé|suj|ind} {dort|vb|ind} ."],
  ["ce-svc", "En classe", "{La maîtresse|suj|ind} {lit|vb|ind} {une histoire|cpl|ind} . {Les élèves|suj|ind} {écoutent|vb|ind} . {Tom|suj|ind} {dessine|vb|ind} {un dragon|cpl|ind} . {Nous|suj|ind} {copions|vb|ind} {la poésie|cpl|ind} . {La cloche|suj|ind} {sonne|vb|ind} ."],
  ["ce-svc", "Au jardin", "{Mon grand-père|suj|ind} {plante|vb|ind} {des tomates|cpl|ind} . {Le chien|suj|ind} {creuse|vb|ind} {un trou|cpl|ind} . {Les oiseaux|suj|ind} {mangent|vb|ind} {les cerises|cpl|ind} . {Ma grand-mère|suj|ind} {cueille|vb|ind} {des fleurs|cpl|ind} . {Le soleil|suj|ind} {brille|vb|ind} . {Je|suj|ind} {chante|vb|ind} ."],
  ["ce-svc", "Le cirque", "{Le clown|suj|ind} {fait|vb|ind} {des grimaces|cpl|ind} . {Les enfants|suj|ind} {rient|vb|ind} . {Un éléphant|suj|ind} {porte|vb|ind} {une danseuse|cpl|ind} . {Le jongleur|suj|ind} {lance|vb|ind} {cinq balles|cpl|ind} . {Nous|suj|ind} {applaudissons|vb|ind} . {Le lion|suj|ind} {rugit|vb|ind} . {Mon petit frère|suj|ind} {rit|vb|ind} . {Le dompteur|suj|ind} {salue|vb|ind} {le public|cpl|ind} ."],
  ["cm-nat", "Le vieux phare", "Sur la {falaise|nc|ind}, un {vieux|adj|ind} {phare|nc|ind} {veille|verbe|ind} sur la mer. {Il|pron|ind} {guide|verbe|ind} les {bateaux|nc|ind} de {Brest|np|ind} pendant la {nuit|nc|ind} {sombre|adj|ind}."],
  ["cm-nat", "La rentrée de Margot", "{Margot|np|ind} {entre|verbe|ind} au {collège|nc|ind} en {septembre|nc|ind}. {Elle|pron|ind} {porte|verbe|ind} un {cartable|nc|ind} neuf. Sa {mère|nc|ind} l'{accompagne|verbe|ind} jusqu'au {portail|nc|ind}. {Elle|pron|ind} {est|verbe|ind} un peu {inquiète|adj|ind}."],
  ["cm-nat", "Le marché de Provence", "Chaque {samedi|nc|ind}, le {marché|nc|ind} de {Carpentras|np|ind} {envahit|verbe|ind} les {rues|nc|ind} étroites. Les {marchands|nc|ind} {installent|verbe|ind} des {étals|nc|ind} {colorés|adj|ind}. {Ils|pron|ind} {vantent|verbe|ind} leurs {melons|nc|ind} {sucrés|adj|ind} et leurs {olives|nc|ind} noires. Les {touristes|nc|ind} {goûtent|verbe|ind} tout."],
  ["cm-nat", "L'expédition polaire", "En 1909, l'{explorateur|nc|ind} {Jean-Baptiste Charcot|np|ind} {quitte|verbe|ind} {Le Havre|np|ind} sur le {Pourquoi-Pas|np|ind}. {Il|pron|ind} {part|verbe|ind} vers l'{Antarctique|np|ind}. Le {voyage|nc|ind} {est|verbe|ind} {long|adj|ind} et {dangereux|adj|ind}. Les {marins|nc|ind} {affrontent|verbe|ind} des {tempêtes|nc|ind} {violentes|adj|ind}. {Ils|pron|ind} {découvrent|verbe|ind} des {terres|nc|ind} {inconnues|adj|ind}."],
  ["cm-inv", "Le chat curieux", "Le chat monte {lentement|adv|ind} {sur|prep|ind} le toit {et|cc|ind} regarde {vers|prep|ind} le jardin. Il miaule {doucement|adv|ind} {mais|cc|ind} personne ne vient. Il redescend {alors|adv|ind} {par|prep|ind} la gouttière. {Puis|adv|ind} il s'endort {sous|prep|ind} un arbre."],
  ["cm-inv", "La sortie scolaire", "Ce matin, nous partons {très|adv|ind} tôt {pour|prep|ind} le musée. Le car roule {vite|adv|ind} {sur|prep|ind} l'autoroute. Les élèves chantent {ou|cc|ind} dorment. {Dans|prep|ind} le musée, nous marchons {silencieusement|adv|ind}. Le guide parle {avec|prep|ind} passion, {donc|cc|ind} nous écoutons {attentivement|adv|ind}. {Ensuite|adv|ind}, nous pique-niquons {près de|prep|ind} la fontaine. Nous rentrons {tard|adv|ind}."],
  ["cm-inv", "La tempête", "{Soudain|adv|ind}, le vent souffle {violemment|adv|ind} {sur|prep|ind} la côte. Les vagues frappent {contre|prep|ind} la digue {et|cc|ind} les bateaux tanguent {dangereusement|adv|ind}. Les pêcheurs restent {prudemment|adv|ind} {dans|prep|ind} le port, {car|cc|ind} la mer est {trop|adv|ind} forte. {Pendant|prep|ind} la nuit, la tempête continue. Le matin, le calme revient {enfin|adv|ind}, {mais|cc|ind} les dégâts sont {très|adv|ind} importants. Les habitants nettoient {courageusement|adv|ind} les rues {avec|prep|ind} des pelles."],
  ["cm-inv", "Le concours de cuisine", "{Hier|adv|ind}, Lucas {et|cc|ind} sa sœur ont participé {à|prep|ind} un concours de cuisine. Ils ont travaillé {longtemps|adv|ind} {sur|prep|ind} leur recette. Lucas coupait {soigneusement|adv|ind} les légumes {et|cc|ind} sa sœur préparait la pâte. Ils n'avaient pas {beaucoup|adv|ind} de temps, {donc|cc|ind} ils se dépêchaient. {Devant|prep|ind} le jury, ils étaient {un peu|adv|ind} inquiets. Le jury a goûté {lentement|adv|ind} leur tarte {puis|adv|ind} a souri. Ils ont gagné {grâce à|prep|ind} leur dessert, {mais|cc|ind} {surtout|adv|ind} {grâce à|prep|ind} leur patience. Le soir, ils sont rentrés {très|adv|ind} fiers {mais|cc|ind} {un peu|adv|ind} fatigués."],
  ["cm-detpron", "Mon vélo, le tien", "{Mon|poss|ind} vélo est rouge ; {le tien|ppos|ind} est bleu. {Ce|dem|ind} casque est trop petit ; prends {celui-ci|pdem|ind}. {Il|pper|ind} te va bien. {Ta|poss|ind} sœur prendra {le mien|ppos|ind}. {Ton|poss|ind} frère, {lui|pper|ind}, a {le sien|ppos|ind}."],
  ["cm-detpron", "Les cahiers", "{Ces|dem|ind} cahiers sont à nous. {Les nôtres|ppos|ind} ont une couverture verte, {ceux|pdem|ind} de l'autre classe sont jaunes. {Notre|poss|ind} maîtresse {les|pper|ind} ramasse. {Elle|pper|ind} corrige {nos|poss|ind} dictées. {Cette|dem|ind} dictée était difficile ! {Celle|pdem|ind} de la semaine dernière était plus facile. {Ma|poss|ind} note est bonne ; {la tienne|ppos|ind} aussi. {Je|pper|ind} relirai {la mienne|ppos|ind} ce soir."],
  ["cm-detpron", "Les deux chiens", "{Mon|poss|ind} chien et {celui|pdem|ind} de Léo jouent dans le parc. {Le mien|ppos|ind} est un berger ; {le sien|ppos|ind} est un caniche. {Ils|pper|ind} courent après {cette|dem|ind} balle. {Leur|poss|ind} maître {les|pper|ind} appelle. {Ce|dem|ind} berger obéit toujours ; {celui-là|pdem|ind} n'écoute rien ! {Son|poss|ind} collier est rouge, {le nôtre|ppos|ind} est noir. {Nous|pper|ind} {les|pper|ind} attachons. {Ces|dem|ind} chiens sont épuisés. {Ils|pper|ind} dorment."],
  ["cm-detpron", "Le grenier de mamie", "Dans le grenier, mamie garde {ses|poss|ind} trésors. {Cette|dem|ind} malle contient {ses|poss|ind} robes de bal ; {celle-ci|pdem|ind} renferme {ses|poss|ind} lettres. « {Ces|dem|ind} photos sont {les miennes|ppos|ind} », dit-elle. {Elle|pper|ind} {nous|pper|ind} {les|pper|ind} montre. Sur {celle-là|pdem|ind}, on voit {son|poss|ind} frère. « {Ton|poss|ind} grand-père avait {ce|dem|ind} chapeau. {Le sien|ppos|ind} était plus grand que {le mien|ppos|ind}. » {Nous|pper|ind} rions. {Ce|dem|ind} grenier est un musée ! {Je|pper|ind} garderai {cette|dem|ind} lettre."],
  ["cm-cvcp", "Le jardinier", "Le jardinier arrose {les fleurs|cv|ind} {chaque matin|cp|ind}. Il taille {les rosiers|cv|ind} {avec soin|cp|ind}. {Dans la serre|cp|ind}, il sème {des tomates|cv|ind}. Il parle {à ses plantes|cv|ind} {doucement|cp|ind}. {Le soir|cp|ind}, il range {ses outils|cv|ind}."],
  ["cm-cvcp", "La bibliothèque", "{Le mercredi|cp|ind}, Inès emprunte {des romans|cv|ind} {à la bibliothèque|cp|ind}. Elle choisit {un livre d'aventures|cv|ind}. {Dans la salle de lecture|cp|ind}, elle lit {les premières pages|cv|ind}. Elle écrit {à son amie|cv|ind} {le soir même|cp|ind}. Elle lui raconte {l'histoire|cv|ind} {en détail|cp|ind}. {Avec enthousiasme|cp|ind}, elle recommande {ce livre|cv|ind}. {Le lendemain|cp|ind}, son amie l'emprunte."],
  ["cm-cvcp", "Le cuisinier", "{Depuis vingt ans|cp|ind}, Paolo prépare {des pizzas|cv|ind} {dans son petit restaurant|cp|ind}. {Chaque matin|cp|ind}, il pétrit {la pâte|cv|ind} {à la main|cp|ind}. Il achète {ses tomates|cv|ind} {au marché|cp|ind}. Il parle {à ses clients|cv|ind} {avec gentillesse|cp|ind}. Il cuit {les pizzas|cv|ind} {dans un four à bois|cp|ind}. {Le dimanche|cp|ind}, il ferme {son restaurant|cv|ind}. Il pense {à ses recettes|cv|ind} {la nuit|cp|ind}."],
  ["cm-cvcp", "Le voyage de Clara", "{L'été dernier|cp|ind}, Clara a visité {l'Italie|cv|ind} {avec ses parents|cp|ind}. {À Rome|cp|ind}, elle a admiré {le Colisée|cv|ind}. Elle a goûté {des glaces|cv|ind} {sur une petite place|cp|ind}. {À Florence|cp|ind}, elle a dessiné {des statues|cv|ind} {avec application|cp|ind}. {À Venise|cp|ind}, elle a pris {une gondole|cv|ind}. Elle a écrit {à ses grands-parents|cv|ind} {chaque soir|cp|ind}. Elle leur a envoyé {des cartes postales|cv|ind}. Elle a acheté {un masque|cv|ind} {pour son frère|cp|ind}. {Au retour|cp|ind}, elle a montré {ses photos|cv|ind} {à toute la classe|cp|ind}."],
  ["cm-attcv", "Le chaton", "Le chaton est {minuscule|att|ind}. Il boit {du lait|cv|ind}. Il semble {fatigué|att|ind}. Il cherche {sa mère|cv|ind}. Elle reste {introuvable|att|ind}. Léa prend {le chaton|cv|ind}. Il devient {calme|att|ind}. Il lèche {sa main|cv|ind}. Il paraît {heureux|att|ind}. Léa garde {le chaton|cv|ind}."],
  ["cm-attcv", "Le château", "Ce château est {immense|att|ind}. Ses murs sont {épais|att|ind}. Les visiteurs admirent {les tours|cv|ind}. Le guide ouvre {une porte secrète|cv|ind}. L'escalier paraît {interminable|att|ind}. Les enfants comptent {les marches|cv|ind}. En haut, la vue est {magnifique|att|ind}. On aperçoit {la rivière|cv|ind}. Le château devient {sombre|att|ind} le soir. Le gardien ferme {les grilles|cv|ind}. Les enfants restent {émerveillés|att|ind}. Ils dessinent {le donjon|cv|ind}. Le retour semble {court|att|ind}."],
  ["cm-attcv", "Le match", "Le stade est {plein|att|ind}. Les joueurs saluent {le public|cv|ind}. L'arbitre siffle {le début|cv|ind}. Notre équipe semble {nerveuse|att|ind}. Elle perd {le ballon|cv|ind}. Les adversaires marquent {un but|cv|ind}. Le capitaine reste {calme|att|ind}. Il encourage {ses coéquipiers|cv|ind}. Peu à peu, l'équipe devient {plus forte|att|ind}. Tom tire {un penalty|cv|ind}. Le gardien paraît {surpris|att|ind}. Le score est {égal|att|ind}. À la fin, nous marquons {le but de la victoire|cv|ind}. Les supporters sont {fous de joie|att|ind}. Ils agitent {leurs drapeaux|cv|ind}. Les joueurs sont {épuisés|att|ind}."],
  ["cm-attcv", "L'orage d'été", "L'après-midi était {chaud|att|ind}. Le ciel devint {noir|att|ind}. Le vent agita {les arbres|cv|ind}. Grand-mère ferma {les volets|cv|ind}. Elle semblait {inquiète|att|ind}. Le premier éclair illumina {la vallée|cv|ind}. Le tonnerre fut {terrible|att|ind}. Le chien resta {immobile|att|ind} sous la table. La pluie frappait {les vitres|cv|ind}. Grand-père alluma {une bougie|cv|ind}. La maison paraissait {fragile|att|ind}. Nous racontions {des histoires|cv|ind}. Peu à peu, l'orage devint {moins violent|att|ind}. Le ciel redevint {clair|att|ind}. Nous ouvrîmes {les fenêtres|cv|ind}. L'air était {frais|att|ind}. Les fleurs du jardin paraissaient {abîmées|att|ind}. Grand-mère ramassa {les branches|cv|ind}. Le soleil réchauffa {le jardin|cv|ind}. Tout le monde était {soulagé|att|ind}."],
  ["cm-epcn", "La maison de Paul", "Paul habite une {petite|epi|ind} maison {de pierre|cdn|ind}. Elle a des volets {bleus|epi|ind} et un toit {d'ardoise|cdn|ind}. Dans le jardin {de sa grand-mère|cdn|ind}, il y a un {vieux|epi|ind} puits {profond|epi|ind}. Paul aime cette maison {tranquille|epi|ind}. Ses fenêtres {étroites|epi|ind} donnent sur un champ {de blé|cdn|ind}."],
  ["cm-epcn", "La boulangerie", "La boulangerie {du village|cdn|ind} ouvre à six heures. Le pain {chaud|epi|ind} attire les clients {matinaux|epi|ind}. On y vend des croissants {au beurre|cdn|ind}, des tartes {aux pommes|cdn|ind} et de {délicieux|epi|ind} gâteaux {au chocolat|cdn|ind}. Elle porte un tablier {blanc|epi|ind}. La boulangère {souriante|epi|ind} sert une {longue|epi|ind} file {d'attente|cdn|ind}. L'odeur {du pain|cdn|ind} remplit la rue {étroite|epi|ind}."],
  ["cm-epcn", "Le musée", "Le musée {des beaux-arts|cdn|ind} présente une exposition {nouvelle|epi|ind}. Dans la {grande|epi|ind} salle, on admire des tableaux {anciens|epi|ind} et des statues {de marbre|cdn|ind}. Un portrait {de reine|cdn|ind} attire les visiteurs {curieux|epi|ind}. Ses yeux {verts|epi|ind} semblent suivre le public. Le guide {passionné|epi|ind} raconte l'histoire {du peintre|cdn|ind}. Une vitrine {de verre|cdn|ind} protège des bijoux {précieux|epi|ind}. Les élèves {de la classe|cdn|ind} prennent des notes {rapides|epi|ind}. La visite {guidée|epi|ind} dure une heure {entière|epi|ind}."],
  ["cm-epcn", "Le port de pêche", "Le port {de Concarneau|cdn|ind} s'éveille à l'aube. Les {petits|epi|ind} bateaux {de pêche|cdn|ind} rentrent au port {fatigués|epi|ind}. Les marins {bretons|epi|ind} déchargent des caisses {de poissons|cdn|ind}. Les mouettes {affamées|epi|ind} tournent au-dessus des filets {mouillés|epi|ind}. Sur le quai {de granit|cdn|ind}, les acheteurs {du marché|cdn|ind} examinent les sardines {argentées|epi|ind} et les crabes {énormes|epi|ind}. Un {vieux|epi|ind} pêcheur {à la barbe blanche|cdn|ind} raconte une histoire {de tempête|cdn|ind}. Les enfants {du village|cdn|ind} écoutent ce récit {extraordinaire|epi|ind}. Le soleil {d'hiver|cdn|ind} éclaire les maisons {colorées|epi|ind} {du quai|cdn|ind}."],
  ["cm-bilannf", "Le chien", "Le {chien|nc|suj} de {Lucas|np|cdn} est {fidèle|adj|att} . {Il|pron|suj} garde la {maison|nc|cv} . La {nuit|nc|cp} , il dort dans sa {niche|nc|cp} . Ses {oreilles|nc|suj} sont {pointues|adj|att} . {Lucas|np|suj} l'adore."],
  ["cm-bilannf", "Le potager", "Mon {grand-père|nc|suj} cultive un {potager|nc|cv} {immense|adj|epi} . Ses {tomates|nc|suj} sont {rouges|adj|att} . Au {printemps|nc|cp} , il sème des {graines|nc|cv} de {radis|nc|cdn} . Les {radis|nc|suj} poussent dans la {terre|nc|cp} {humide|adj|epi} ."],
  ["cm-bilannf", "La neige", "La {neige|nc|suj} {fraîche|adj|epi} couvre les {toits|nc|cv} du {village|nc|cdn} . Les {enfants|nc|suj} glissent sur la {pente|nc|cp} . {Ils|pron|suj} sont {heureux|adj|att} . Leurs {joues|nc|suj} deviennent {rouges|adj|att} . {Lina|np|suj} tombe. Le {soir|nc|cp} , ils rentrent ."],
  ["cm-bilannf", "Le pêcheur", "Le {vieux|adj|epi} {pêcheur|nc|suj} répare ses {filets|nc|cv} sur le {quai|nc|cp} . Son {bateau|nc|suj} de {bois|nc|cdn} paraît {fragile|adj|att} . Le {matin|nc|cp} , {il|pron|suj} part vers le {large|nc|cp} . La {mer|nc|suj} est {calme|adj|att} . Les {mouettes|nc|suj} crient."],
  ["cm-bilannf", "Le concert", "Le {concert|nc|suj} de la {chorale|nc|cdn} commence à vingt {heures|nc|cp} . Les {chanteurs|nc|suj} portent des {robes|nc|cv} {noires|adj|epi} . {Margot|np|suj} chante un {solo|nc|cv} {difficile|adj|epi} . Le {public|nc|suj} reste {silencieux|adj|att} . Les {applaudissements|nc|suj} sont {chaleureux|adj|att} . La {soirée|nc|suj} se termine."],
  ["cm-bilannf", "Le marché", "Le {samedi|nc|cp} , ma {mère|nc|suj} achète des {légumes|nc|cv} au {marché|nc|cp} . Les {fraises|nc|suj} de {Plougastel|np|cdn} sont {sucrées|adj|att} . Le {marchand|nc|suj} {bavard|adj|epi} offre une {pomme|nc|cv} à mon {frère|nc|cv} . {Il|pron|suj} est {content|adj|att} . Le {soleil|nc|suj} {printanier|adj|epi} brille."],
  ["cm-bilannf", "Le volcan", "Le {volcan|nc|suj} se réveille après des {siècles|nc|cp} de {sommeil|nc|cdn} . Une {fumée|nc|suj} {épaisse|adj|epi} s'échappe du {cratère|nc|cp} . Les {habitants|nc|suj} de la {région|nc|cdn} semblent {inquiets|adj|att} . Les {scientifiques|nc|suj} surveillent la {montagne|nc|cv} . {Ils|pron|suj} restent {prudents|adj|att} . Les {routes|nc|suj} sont {fermées|adj|att} ."],
  ["cm-bilannf", "La classe de neige", "En {janvier|nc|cp} , notre {classe|nc|suj} part dans les {Alpes|np|cp} . Le {chalet|nc|suj} de {bois|nc|cdn} est {confortable|adj|att} . Chaque {matin|nc|cp} , les {moniteurs|nc|suj} {patients|adj|epi} nous apprennent le {ski|nc|cv} . {Nous|pron|suj} descendons les {pistes|nc|cv} {bleues|adj|epi} . Le {soir|nc|cp} , nous sommes {épuisés|adj|att} . Les {chambres|nc|suj} sont petites."],
  ["cm-bilannf", "Le musée", "Le {musée|nc|suj} du {Louvre|np|cdn} accueille des {visiteurs|nc|cv} du {monde|nc|cdn} entier . La {Joconde|np|suj} attire une {foule|nc|cv} {immense|adj|epi} . Son {sourire|nc|suj} paraît {mystérieux|adj|att} . Les {gardiens|nc|suj} surveillent les {salles|nc|cv} . {Ils|pron|suj} demeurent {attentifs|adj|att} . Les {tableaux|nc|suj} {anciens|adj|epi} sont {fragiles|adj|att} . Les {touristes|nc|suj} photographient tout."],
  ["cm-bilannf", "La tempête", "Cette {nuit|nc|cp} , une {tempête|nc|suj} {violente|adj|epi} a frappé la {côte|nc|cv} {bretonne|adj|epi} . Les {vagues|nc|suj} {énormes|adj|epi} ont détruit la {digue|nc|cv} du {port|nc|cdn} . Les {pêcheurs|nc|suj} sont {inquiets|adj|att} . {Ils|pron|suj} réparent leurs {bateaux|nc|cv} . Le {maire|nc|suj} de {Douarnenez|np|cdn} reste {calme|adj|att} . Ce matin, le {ciel|nc|suj} est {gris|adj|att} ."],
  ["cm-bilannf", "Le cirque", "Le {cirque|nc|suj} Pinder s'installe sur la {place|nc|cp} du {village|nc|cdn} . Les {artistes|nc|suj} montent le {chapiteau|nc|cv} {rouge|adj|epi} . Le {dompteur|nc|suj} nourrit ses {fauves|nc|cv} . Les {lions|nc|suj} paraissent {calmes|adj|att} . Le {soir|nc|cp} , les {spectateurs|nc|suj} {émerveillés|adj|epi} applaudissent les {acrobates|nc|cv} . {Ils|pron|suj} sont {agiles|adj|att} . Les {clowns|nc|suj} {maladroits|adj|epi} amusent les {enfants|nc|cv} ."],
  ["cm-bilannf", "L'expédition", "Au {printemps|nc|cp} , une {équipe|nc|suj} de {chercheurs|nc|cdn} a exploré la {forêt|nc|cv} {amazonienne|adj|epi} . Les {arbres|nc|suj} {géants|adj|epi} cachaient la {lumière|nc|cv} du soleil. Les {insectes|nc|suj} étaient {innombrables|adj|att} . Un {guide|nc|suj} {indien|adj|epi} accompagnait les {savants|nc|cv} . {Il|pron|suj} connaissait les {plantes|nc|cv} {médicinales|adj|epi} . Le {voyage|nc|suj} fut {long|adj|att} . Les {scientifiques|nc|suj} étaient {enchantés|adj|att} ."],
  ["cm-imps", "Le chevalier", "Le chevalier {avançait|imp|ind} dans la forêt. Il {faisait|imp|ind} sombre. Soudain, il {entendit|ps|ind} un cri. Il {descendit|ps|ind} de cheval. Une jeune fille {pleurait|imp|ind} près d'un arbre. Elle {avait|imp|ind} peur. Le chevalier l'{aida|ps|ind} . Ils {partirent|ps|ind} ensemble. La lune {brillait|imp|ind} . Ils {arrivèrent|ps|ind} au château."],
  ["cm-imps", "La tempête", "La mer {était|imp|ind} calme. Les pêcheurs {réparaient|imp|ind} leurs filets. Tout à coup, le vent {se leva|ps|ind} . Le ciel {devint|ps|ind} noir. Les vagues {grossissaient|imp|ind} . Un bateau {rentra|ps|ind} au port. Les femmes {attendaient|imp|ind} sur le quai. Un éclair {déchira|ps|ind} le ciel. Les enfants {criaient|imp|ind} . Enfin, le dernier bateau {apparut|ps|ind} . Tout le monde {applaudit|ps|ind} . Les marins {étaient|imp|ind} épuisés. Ils {rentrèrent|ps|ind} chez eux."],
  ["cm-imps", "Le petit Poucet", "Le petit Poucet {était|imp|ind} le plus jeune de sept frères. Ses parents {étaient|imp|ind} très pauvres. Un soir, il {entendit|ps|ind} leur conversation. Ils {voulaient|imp|ind} perdre leurs enfants. Le lendemain, Poucet {remplit|ps|ind} ses poches de cailloux blancs. Dans la forêt, il les {sema|ps|ind} sur le chemin. Les arbres {étaient|imp|ind} immenses. Les enfants {jouaient|imp|ind} . Soudain, les parents {disparurent|ps|ind} . Les petits {pleurèrent|ps|ind} . Poucet {restait|imp|ind} calme. Il {retrouva|ps|ind} les cailloux. Ils {brillaient|imp|ind} sous la lune. Les enfants {suivirent|ps|ind} le chemin. Ils {rentrèrent|ps|ind} à la maison. Leurs parents {furent|ps|ind} soulagés."],
  ["cm-imps", "Le Titanic", "En avril 1912, le Titanic {traversait|imp|ind} l'océan Atlantique. C'{était|imp|ind} le plus grand paquebot du monde. Les passagers {dansaient|imp|ind} dans les salons. La nuit {était|imp|ind} glaciale. Les marins de veille {surveillaient|imp|ind} la mer. Vers minuit, l'un d'eux {aperçut|ps|ind} un iceberg. Il {sonna|ps|ind} l'alarme. Le navire {tourna|ps|ind} trop tard. L'iceberg {déchira|ps|ind} la coque. L'eau {envahit|ps|ind} les cales. Au début, personne ne {s'inquiétait|imp|ind} . L'orchestre {jouait|imp|ind} toujours. Puis le capitaine {fit|ps|ind} préparer les canots. Il n'y en {avait|imp|ind} pas assez. Les femmes et les enfants {montèrent|ps|ind} les premiers. Le navire {s'enfonçait|imp|ind} lentement. À deux heures, il {disparut|ps|ind} sous les flots. Un bateau {arriva|ps|ind} à l'aube. Il {recueillit|ps|ind} les survivants. Ils {tremblaient|imp|ind} de froid."],
  ["cm-recit", "Le cerf-volant", "Paul {avait reçu|pqp|ind} un cerf-volant. Le vent {soufflait|imp|ind} fort. Il {courut|ps|ind} sur la plage. Le cerf-volant {monta|ps|ind} haut. Son père l'{avait aidé|pqp|ind} à le monter. La ficelle {cassa|ps|ind} . Paul {pleura|ps|ind} . Il {avait|imp|ind} tant attendu ce jour. Un pêcheur {rapporta|ps|ind} le jouet. Il l'{avait trouvé|pqp|ind} dans les rochers."],
  ["cm-recit", "La lettre", "Quand Julie {rentra|ps|ind} , une lettre l'{attendait|imp|ind} . Sa grand-mère l'{avait écrite|pqp|ind} . Julie l'{ouvrit|ps|ind} . Mamie {racontait|imp|ind} son voyage. Elle {était partie|pqp|ind} en Italie. Elle {avait visité|pqp|ind} Rome. Julie {sourit|ps|ind} . Elle {aimait|imp|ind} ces lettres. Elle {prit|ps|ind} une feuille. Elle {répondit|ps|ind} aussitôt. Le soir, elle {posta|ps|ind} sa lettre. Elle {était|imp|ind} heureuse."],
  ["cm-recit", "Le trésor du grenier", "Ce jour-là, il {pleuvait|imp|ind} . Les enfants {montèrent|ps|ind} au grenier. Personne n'y {était venu|pqp|ind} depuis des années. La poussière {couvrait|imp|ind} les meubles. Tom {découvrit|ps|ind} une malle. Leur arrière-grand-père l'{avait rapportée|pqp|ind} d'Afrique. Elle {était|imp|ind} lourde. Les enfants l'{ouvrirent|ps|ind} . Elle {contenait|imp|ind} des masques. Leur aïeul les {avait achetés|pqp|ind} pendant ses voyages. Lina {trouva|ps|ind} un carnet. Le voyageur y {avait noté|pqp|ind} ses aventures. Les enfants {lurent|ps|ind} jusqu'au soir. Ils {rêvaient|imp|ind} de partir. Leur mère les {appela|ps|ind} . Ils {descendirent|ps|ind} à regret."],
  ["cm-recit", "Le retour d'Ulysse", "Après vingt ans d'absence, Ulysse {revint|ps|ind} à Ithaque. Il {avait combattu|pqp|ind} à Troie. Puis il {avait erré|pqp|ind} sur les mers. Les dieux l'{avaient puni|pqp|ind} . Personne ne le {reconnut|ps|ind} . Il {portait|imp|ind} des haillons. Son vieux chien Argos {dormait|imp|ind} devant le palais. Il {leva|ps|ind} la tête. Il {reconnut|ps|ind} son maître. Il {remua|ps|ind} la queue et {mourut|ps|ind} . Dans le palais, des prétendants {festoyaient|imp|ind} . Ils {avaient envahi|pqp|ind} la maison. Ils {voulaient|imp|ind} épouser Pénélope. Elle les {avait fait|pqp|ind} attendre des années. Ulysse {prit|ps|ind} son arc. Il {tendit|ps|ind} la corde. Les prétendants {tremblèrent|ps|ind} . Ulysse {avait retrouvé|pqp|ind} sa maison. Pénélope {pleurait|imp|ind} de joie."],
  ["cm-phnv", "La rentrée", "{Rentrée des classes.|pn|ind} {Les élèves arrivent dans la cour.|pv|ind} {Quel bruit !|pn|ind} {Les parents discutent devant le portail.|pv|ind} {Premier jour pour les petits.|pn|ind} {Certains pleurent.|pv|ind} {Sonnerie.|pn|ind} {Tout le monde se met en rang.|pv|ind} {Silence dans les couloirs.|pn|ind} {La maîtresse ouvre la porte.|pv|ind}"],
  ["cm-phnv", "Le match", "{Grand match ce soir !|pn|ind} {Le stade est plein.|pv|ind} {Entrée des joueurs.|pn|ind} {Les supporters chantent.|pv|ind} {Coup d'envoi à vingt heures.|pn|ind} {Notre équipe attaque.|pv|ind} {Premier but à la dixième minute !|pn|ind} {Le gardien adverse est furieux.|pv|ind} {Mi-temps.|pn|ind} {Les joueurs boivent de l'eau.|pv|ind} {Reprise difficile.|pn|ind} {Nos adversaires égalisent.|pv|ind} {Match nul.|pn|ind}"],
  ["cm-phnv", "Le marché de Noël", "{Marché de Noël sur la grand-place.|pn|ind} {Des chalets de bois brillent sous les guirlandes.|pv|ind} {Odeur de pain d'épice et de vin chaud.|pn|ind} {Les enfants regardent les jouets.|pv|ind} {Quelle merveille !|pn|ind} {Un vieil homme vend des santons.|pv|ind} {Musique de fanfare au loin.|pn|ind} {La neige commence à tomber.|pv|ind} {Rires et cris de joie.|pn|ind} {Le Père Noël arrive en traîneau.|pv|ind} {Distribution de bonbons pour tous.|pn|ind} {Les parents prennent des photos.|pv|ind} {Fermeture à minuit.|pn|ind} {Nous rentrons à pied.|pv|ind} {Belle soirée !|pn|ind} {Je m'endors heureux.|pv|ind}"],
  ["cm-phnv", "Le journal de bord", "{Lundi 3 juillet.|pn|ind} {Nous quittons le port de Brest à l'aube.|pv|ind} {Mer calme.|pn|ind} {Le capitaine salue l'équipage.|pv|ind} {Vent d'ouest, force trois.|pn|ind} {Les voiles se gonflent.|pv|ind} {Mardi 4 juillet.|pn|ind} {Un orage éclate pendant la nuit.|pv|ind} {Quelle tempête !|pn|ind} {Les vagues balaient le pont.|pv|ind} {Aucun blessé.|pn|ind} {Le mousse a eu très peur.|pv|ind} {Mercredi 5 juillet.|pn|ind} {Retour du beau temps.|pn|ind} {Des dauphins accompagnent le bateau.|pv|ind} {Spectacle magnifique.|pn|ind} {Le cuisinier prépare du poisson frais.|pv|ind} {Jeudi 6 juillet.|pn|ind} {Terre en vue !|pn|ind} {Nous accostons enfin à Lisbonne.|pv|ind}"],
  ["cm-formes4", "Le chat", "{Mon chat dort toute la journée.|fa|ind} {Il ne chasse jamais les souris.|fn|ind} {Comme il est paresseux !|fae|ind} {Il aime les caresses.|fa|ind} {Il ne sort pas sous la pluie.|fn|ind} {Qu'il est doux !|fae|ind} {Il ne veut jamais jouer !|fne|ind} {Il mange beaucoup.|fa|ind} {Il n'a pas d'amis.|fn|ind} {Quel drôle de chat !|fae|ind}"],
  ["cm-formes4", "L'anniversaire", "{C'est l'anniversaire de Lina.|fa|ind} {Ses amis arrivent.|fa|ind} {Quelle belle fête !|fae|ind} {Lina n'a pas encore ouvert ses cadeaux.|fn|ind} {Comme elle est impatiente !|fae|ind} {Elle déchire le papier.|fa|ind} {Ce n'est pas un livre !|fne|ind} {C'est un vélo !|fae|ind} {Lina n'en croit pas ses yeux.|fn|ind} {Elle remercie ses parents.|fa|ind} {Personne n'a oublié le gâteau.|fn|ind} {Que les bougies brillent !|fae|ind} {Elle ne les éteint pas du premier coup !|fne|ind}"],
  ["cm-formes4", "La randonnée", "{Nous partons en randonnée.|fa|ind} {Le chemin n'est pas facile.|fn|ind} {Que la montée est raide !|fae|ind} {Mon frère ne se plaint jamais.|fn|ind} {Il marche devant.|fa|ind} {Moi, je n'avance plus !|fne|ind} {Papa m'encourage.|fa|ind} {Le sommet n'est plus très loin.|fn|ind} {Quelle vue magnifique !|fae|ind} {On voit trois villages.|fa|ind} {Personne ne parle.|fn|ind} {Comme le silence est beau !|fae|ind} {Nous pique-niquons au soleil.|fa|ind} {Je n'ai jamais mangé un si bon sandwich !|fne|ind} {La descente est rapide.|fa|ind} {Nous ne sommes pas fatigués.|fn|ind}"],
  ["cm-formes4", "Le spectacle de magie", "{Ce soir, nous allons voir un magicien.|fa|ind} {La salle est pleine.|fa|ind} {Le rideau ne s'ouvre pas encore.|fn|ind} {Que l'attente est longue !|fae|ind} {Enfin, le magicien apparaît.|fa|ind} {Il ne dit rien.|fn|ind} {Il sort un lapin de son chapeau.|fa|ind} {Quelle surprise !|fae|ind} {Personne ne comprend le tour.|fn|ind} {Comme il est habile !|fae|ind} {Il fait disparaître une carte.|fa|ind} {Mon frère ne la voit plus !|fne|ind} {Elle est dans ma poche !|fae|ind} {Je n'ai rien senti.|fn|ind} {Le magicien salue.|fa|ind} {Les enfants applaudissent.|fa|ind} {Je ne veux pas partir !|fne|ind} {Que ce spectacle était court !|fae|ind} {Je n'oublierai jamais cette soirée.|fn|ind} {Je deviendrai magicien.|fa|ind}"],
  ["cm-simcomp", "Le jardin", "{Le jardin est fleuri.|psim|ind} {Les abeilles butinent et les papillons volent.|pcomp|ind} {Mamie arrose les roses.|psim|ind} {Le chat dort, le chien joue.|pcomp|ind} {Il fait chaud.|psim|ind} {Papi taille la haie pendant que je ramasse les feuilles.|pcomp|ind} {Nous goûtons sous le cerisier.|psim|ind} {Les cerises sont mûres, mais elles sont acides.|pcomp|ind} {Un merle chante.|psim|ind} {Le soir tombe.|psim|ind}"],
  ["cm-simcomp", "La gare", "{Le train entre en gare.|psim|ind} {Les voyageurs descendent et d'autres montent.|pcomp|ind} {Un contrôleur siffle.|psim|ind} {Je cherche ma place, car le train va partir.|pcomp|ind} {Ma valise est lourde.|psim|ind} {Un monsieur m'aide à la soulever.|psim|ind} {Le train démarre lentement.|psim|ind} {Les champs défilent, les vaches nous regardent.|pcomp|ind} {Je lis un livre que ma tante m'a offert.|pcomp|ind} {Une dame dort.|psim|ind} {Quand nous arrivons à Paris, il fait nuit.|pcomp|ind} {Mon oncle m'attend sur le quai.|psim|ind} {Il me fait de grands signes.|psim|ind}"],
  ["cm-simcomp", "L'incendie", "{Une fumée noire sort de la grange.|psim|ind} {Le fermier appelle les pompiers.|psim|ind} {Les sirènes retentissent, les camions arrivent.|pcomp|ind} {Les pompiers déroulent les tuyaux.|psim|ind} {Les flammes montent haut, mais l'eau les fait reculer.|pcomp|ind} {Les animaux sont en sécurité.|psim|ind} {Le fermier les avait sortis avant que le feu ne se propage.|pcomp|ind} {Les voisins accourent.|psim|ind} {Ils apportent des seaux d'eau.|psim|ind} {Après une heure, le feu est éteint.|psim|ind} {La grange est détruite, mais personne n'est blessé.|pcomp|ind} {Le fermier remercie les pompiers.|psim|ind} {Il reconstruira sa grange.|psim|ind} {Les enfants qui ont vu l'incendie s'en souviendront longtemps.|pcomp|ind} {Le soir, le calme revient.|psim|ind} {On entend les grillons.|psim|ind}"],
  ["cm-simcomp", "La traversée de l'Atlantique", "{En 1927, Charles Lindbergh décolle de New York.|psim|ind} {Il est seul à bord de son avion.|psim|ind} {Il veut rejoindre Paris sans escale.|psim|ind} {Personne ne l'a fait avant lui.|psim|ind} {Son avion est léger, car il a enlevé tout le superflu.|pcomp|ind} {Il n'emporte ni radio ni parachute.|psim|ind} {La nuit tombe, le froid devient intense.|pcomp|ind} {Du givre se forme sur les ailes.|psim|ind} {Lindbergh lutte contre le sommeil.|psim|ind} {Il chante pour rester éveillé.|psim|ind} {Quand le jour se lève, il aperçoit l'Irlande.|pcomp|ind} {Il survole l'Angleterre, puis la Manche.|psim|ind} {La nuit est tombée lorsqu'il arrive au-dessus de Paris.|pcomp|ind} {Des milliers de personnes l'attendent au Bourget.|psim|ind} {Il se pose après trente-trois heures de vol.|psim|ind} {La foule se précipite et elle le porte en triomphe.|pcomp|ind} {Il devient un héros.|psim|ind} {Les journaux racontent son exploit qui a passionné le monde.|pcomp|ind} {Son avion est aujourd'hui dans un musée.|psim|ind} {On peut encore l'admirer.|psim|ind}"],
  ["cm-jc", "Le goûter", "{Je bois du lait, mon frère mange une pomme.|jux|ind} {Maman prépare des crêpes et papa met la table.|coo|ind} {Le chat miaule, il a faim.|jux|ind} {Nous rions, mais ma sœur boude.|coo|ind} {Elle voulait du chocolat, il n'y en a plus.|jux|ind} {Papa sourit et il sort une tablette.|coo|ind} {Ma sœur saute de joie, elle l'embrasse.|jux|ind} {Nous partageons le chocolat et nous jouons.|coo|ind} {Le goûter est fini, la vaisselle attend.|jux|ind} {Je lave les bols et mon frère les essuie.|coo|ind}"],
  ["cm-jc", "La forêt", "{Le vent souffle, les feuilles tombent.|jux|ind} {Nous marchons doucement, car nous voulons voir des animaux.|coo|ind} {Un écureuil grimpe, il disparaît.|jux|ind} {Papa montre des traces, mais nous ne voyons rien.|coo|ind} {Soudain, une biche apparaît ; elle nous regarde.|jux|ind} {Personne ne bouge, personne ne parle.|jux|ind} {Elle s'approche et elle s'enfuit.|coo|ind} {Nous continuons et nous arrivons à la rivière.|coo|ind} {L'eau est claire, les poissons sont visibles.|jux|ind} {Mon frère veut pêcher, or il n'a pas de canne.|coo|ind} {Nous rentrons, le soleil se couche.|jux|ind} {Nous sommes fatigués, mais nous sommes heureux.|coo|ind} {Ce fut une belle journée, je m'en souviendrai.|jux|ind}"],
  ["cm-jc", "Le concours de dessin", "{Le concours commence, les élèves s'installent.|jux|ind} {Chacun prend une feuille et choisit ses couleurs.|coo|ind} {Léa dessine un cheval ; Tom préfère un dragon.|jux|ind} {Le temps passe vite, il faut se dépêcher.|jux|ind} {Inès efface son dessin, car elle n'est pas contente.|coo|ind} {Elle recommence et elle sourit.|coo|ind} {Le maître ramasse les feuilles ; le jury se réunit.|jux|ind} {Les juges hésitent longtemps, ils comparent les dessins.|jux|ind} {Le dragon est original, mais le cheval est plus beau.|coo|ind} {Léa gagne le premier prix et Tom le deuxième.|coo|ind} {Inès est déçue, elle pleure un peu.|jux|ind} {Le maître la console : son dessin sera exposé.|jux|ind} {Elle sèche ses larmes et elle sourit.|coo|ind} {Les parents applaudissent, les enfants crient.|jux|ind} {Personne n'est oublié, chacun reçoit un livre.|jux|ind} {La fête se termine, mais tout le monde reste.|coo|ind}"],
  ["cm-jc", "Le volcan d'Auvergne", "{Les volcans d'Auvergne sont endormis, ils ne sont pas éteints.|jux|ind} {Ils se sont formés il y a longtemps, et ils dessinent aujourd'hui une chaîne.|coo|ind} {Le puy de Dôme est le plus célèbre ; il domine Clermont-Ferrand.|jux|ind} {Les Romains y avaient construit un temple, mais il n'en reste que des ruines.|coo|ind} {Nous montons au sommet en train et nous marchons au bord du cratère.|coo|ind} {La vue est magnifique, on aperçoit des dizaines de cratères.|jux|ind} {Le guide parle, nous l'écoutons.|jux|ind} {La lave a coulé ici, elle a refroidi lentement.|jux|ind} {Elle a formé des roches noires, et on les utilise pour construire les maisons.|coo|ind} {Les maisons de la région sont sombres, car elles sont en pierre de lave.|coo|ind} {Il fait froid au sommet, le vent est fort.|jux|ind} {Nous mettons nos bonnets et nous continuons.|coo|ind} {Un parapentiste s'élance, il plane au-dessus de nous.|jux|ind} {Mon petit frère veut essayer, or il est trop jeune.|coo|ind} {Nous redescendons, le soleil baisse.|jux|ind} {Les volcans se colorent de rose, et ils deviennent violets.|coo|ind} {Le spectacle est superbe, personne ne veut partir.|jux|ind} {Nous reviendrons l'été prochain, et nous visiterons Vulcania.|coo|ind} {Ce parc explique les volcans ; il plaît aux enfants.|jux|ind} {J'ai hâte d'y aller, je rêve déjà de lave !|jux|ind}"],
  ["cm-disc", "Le goûter", "{« J'ai faim ! »|dd|ind} dit Tom. Sa mère répond {qu'il doit attendre quatre heures|di|ind} . {« Je peux avoir une pomme ? »|dd|ind} demande-t-il. Elle lui dit {qu'il peut en prendre une|di|ind} . Tom demande {s'il reste des biscuits|di|ind} . {« Ils sont dans le placard »|dd|ind} , dit sa mère. {« Merci, maman ! »|dd|ind} Sa sœur crie {qu'elle en veut aussi|di|ind} . {« Partagez ! »|dd|ind} dit leur mère. Tom promet {qu'il partagera|di|ind} ."],
  ["cm-disc", "La sortie", "La maîtresse annonce {que la classe ira au musée|di|ind} . {« Quand partons-nous ? »|dd|ind} demande Léa. La maîtresse répond {que le car partira à huit heures|di|ind} . {« Faut-il un pique-nique ? »|dd|ind} demande Hugo. Elle explique {que chacun doit apporter son repas|di|ind} . {« Et s'il pleut ? »|dd|ind} s'inquiète Inès. {« Nous prendrons nos parapluies »|dd|ind} , répond la maîtresse. Tom demande {si les parents peuvent venir|di|ind} . La maîtresse dit {que deux parents accompagneront la classe|di|ind} . {« Je veux venir ! »|dd|ind} s'écrie la maman de Léa. Les enfants applaudissent. {« Quelle bonne idée ! »|dd|ind} dit Hugo. Le directeur affirme {que ce sera une belle journée|di|ind} . Tom murmure {qu'il emportera son appareil photo|di|ind} ."],
  ["cm-disc", "Le vieux pêcheur", "Le vieux pêcheur nous raconte {qu'il a pêché un poisson énorme|di|ind} . {« C'était il y a trente ans »|dd|ind} , dit-il. Mon frère demande {combien il pesait|di|ind} . {« Vingt kilos ! »|dd|ind} répond le pêcheur. Je lui demande {s'il a une photo|di|ind} . Il avoue {qu'il n'en a pas|di|ind} . {« Personne ne me croit »|dd|ind} , soupire-t-il. Ma sœur lui dit {qu'elle le croit|di|ind} . {« Merci, petite »|dd|ind} , murmure-t-il. Il explique {qu'il a relâché le poisson|di|ind} . {« Pourquoi ? »|dd|ind} demandons-nous. Il répond {qu'il le trouvait trop beau|di|ind} . {« Il nage peut-être encore »|dd|ind} , ajoute-t-il en souriant. Mon frère déclare {qu'il deviendra pêcheur|di|ind} . {« Alors, bonne chance ! »|dd|ind} lance le vieil homme. Nous lui promettons {que nous reviendrons|di|ind} ."],
  ["cm-disc", "Le procès du renard", "Les animaux se réunissent. Le lion annonce {que le renard est accusé de vol|di|ind} . {« Qu'as-tu à dire ? »|dd|ind} demande-t-il. Le renard affirme {qu'il est innocent|di|ind} . {« Je dormais cette nuit-là »|dd|ind} , explique-t-il. La poule déclare {qu'elle l'a vu près du poulailler|di|ind} . {« Elle ment ! »|dd|ind} s'écrie le renard. Le hibou dit {qu'il a entendu des bruits vers minuit|di|ind} . {« Quels bruits ? »|dd|ind} demande le lion. Le hibou précise {que c'étaient des pas légers|di|ind} . Le loup ajoute {qu'il a trouvé des plumes devant le terrier du renard|di|ind} . {« Ce sont mes plumes ! »|dd|ind} gémit la poule. Le renard prétend {que le vent les a apportées|di|ind} . {« Le vent ? Cette nuit-là ? »|dd|ind} se moque le hibou. Il rappelle {qu'il n'y avait pas un souffle d'air|di|ind} . Le renard baisse la tête. {« J'avoue »|dd|ind} , murmure-t-il. Le lion décide {qu'il rendra les œufs volés|di|ind} . {« Et je serai privé de dessert ? »|dd|ind} demande le renard. {« Non, mais tu feras la vaisselle »|dd|ind} , répond le lion. Tous les animaux éclatent de rire. La poule annonce {qu'elle pardonne au renard|di|ind} . {« Merci »|dd|ind} , dit le renard, tout penaud."],
  ["cm-cc3", "Le matin", "{Ce matin|ct|ind} , je me lève {tôt|ct|ind} . Je déjeune {dans la cuisine|cl|ind} . Je mange {rapidement|cmn|ind} . {À huit heures|ct|ind} , je pars {à l'école|cl|ind} . Je marche {d'un bon pas|cmn|ind} . {Devant le portail|cl|ind} , je retrouve Léa. Nous entrons {en riant|cmn|ind} . Nous jouons {dans la cour|cl|ind} ."],
  ["cm-cc3", "La plage", "{Pendant les vacances|ct|ind} , nous allons {à la mer|cl|ind} . {Sur la plage|cl|ind} , les enfants jouent {joyeusement|cmn|ind} . Papa nage {loin du bord|cl|ind} . Maman lit {tranquillement|cmn|ind} {sous le parasol|cl|ind} . {L'après-midi|ct|ind} , nous construisons un château {avec soin|cmn|ind} . La mer monte {lentement|cmn|ind} . {Le soir|ct|ind} , nous rentrons {à l'hôtel|cl|ind} . Je m'endors {aussitôt|ct|ind} ."],
  ["cm-cc3", "Le marché", "{Chaque samedi|ct|ind} , mamie va {au marché|cl|ind} . Elle marche {sans se presser|cmn|ind} . {Sur la place|cl|ind} , les marchands crient {à pleine voix|cmn|ind} . Mamie choisit {soigneusement|cmn|ind} ses légumes. {Près de la fontaine|cl|ind} , un musicien joue {joyeusement|cmn|ind} . Les enfants dansent {autour de lui|cl|ind} . Mamie achète des fleurs {en souriant|cmn|ind} . {Vers midi|ct|ind} , elle rentre {chez elle|cl|ind} . Elle prépare le repas {avec plaisir|cmn|ind} . {L'après-midi|ct|ind} , elle se repose {dans son fauteuil|cl|ind} . Elle s'endort {très vite|cmn|ind} ."],
  ["cm-cc3", "Le tour de France", "{Chaque été|ct|ind} , le Tour de France traverse le pays. {Dans les villages|cl|ind} , les habitants attendent {avec impatience|cmn|ind} . {Depuis le matin|ct|ind} , ils sont installés {au bord de la route|cl|ind} . {Vers midi|ct|ind} , la caravane publicitaire passe {bruyamment|cmn|ind} . Les enfants ramassent {vite|cmn|ind} les cadeaux. {Une heure plus tard|ct|ind} , les coureurs arrivent {à toute vitesse|cmn|ind} . Ils passent {en un éclair|cmn|ind} . {Dans la montée|cl|ind} , les spectateurs les encouragent {en criant|cmn|ind} . Le maillot jaune grimpe {sans effort|cmn|ind} . {En haut du col|cl|ind} , il attaque {brusquement|cmn|ind} . {Le soir|ct|ind} , tout le monde regarde l'arrivée {devant la télévision|cl|ind} . {Le lendemain|ct|ind} , le Tour repart {vers les Alpes|cl|ind} ."],
  ["cm-types", "Le hamster", "{Mon hamster s'appelle Noisette.|decl|ind} {Comme il est mignon !|decl|ind} {As-tu déjà vu un hamster ?|inter|ind} {Approche doucement.|imper|ind} {Ne mets pas tes doigts dans la cage !|imper|ind} {Il dort le jour.|decl|ind} {Quand mange-t-il ?|inter|ind} {Donne-lui une graine.|imper|ind} {Qu'il est gourmand !|decl|ind} {Il remplit ses joues.|decl|ind}"],
  ["cm-types", "Le bateau", "{Le bateau quitte le port.|decl|ind} {Quel vent !|decl|ind} {Tiens bien la barre.|imper|ind} {Où allons-nous ?|inter|ind} {Nous allons vers l'île.|decl|ind} {Comme la mer est bleue !|decl|ind} {Vois-tu les dauphins ?|inter|ind} {Prends les jumelles.|imper|ind} {Ils sautent hors de l'eau !|decl|ind} {Ne te penche pas trop !|imper|ind} {Est-ce que tu as froid ?|inter|ind} {Mets ton pull.|imper|ind} {L'île approche.|decl|ind}"],
  ["cm-types", "Le concours de chant", "{Le concours commence à vingt heures.|decl|ind} {Dépêchez-vous !|imper|ind} {Qui chante en premier ?|inter|ind} {C'est Inès.|decl|ind} {Quelle belle voix elle a !|decl|ind} {Écoutez ce silence.|imper|ind} {Le jury prend des notes.|decl|ind} {Va-t-elle gagner ?|inter|ind} {Que je suis nerveux !|decl|ind} {Ne fais pas de bruit.|imper|ind} {Le deuxième candidat entre en scène.|decl|ind} {Pourquoi tremble-t-il ?|inter|ind} {Il a le trac.|decl|ind} {Encourage-le !|imper|ind} {Comme il chante bien finalement !|decl|ind} {Les résultats arrivent.|decl|ind}"],
  ["cm-types", "La visite au zoo", "{Bienvenue au zoo de Beauval !|decl|ind} {Prenez un plan à l'entrée.|imper|ind} {Où sont les pandas ?|inter|ind} {Ils sont près de la grande serre.|decl|ind} {Suivez les flèches vertes.|imper|ind} {Quelle foule devant leur enclos !|decl|ind} {Les pandas mangent du bambou.|decl|ind} {Combien en mangent-ils par jour ?|inter|ind} {Ils en mangent trente kilos.|decl|ind} {C'est énorme !|decl|ind} {Ne donnez rien aux animaux.|imper|ind} {Voulez-vous voir les lions ?|inter|ind} {Allons-y.|imper|ind} {Comme ce lion est majestueux !|decl|ind} {Il dort au soleil.|decl|ind} {Pourquoi dort-il autant ?|inter|ind} {Les lions dorment vingt heures par jour.|decl|ind} {Regarde le lionceau !|imper|ind} {Qu'il est drôle !|decl|ind} {Revenons l'an prochain.|imper|ind}"],
].forEach(([niv, titre, texte]) => TEXTES_TM.push({ niv, titre, systeme: 'présent', texte }));
TEXTES_TM.push({ niv: 'ce', titre: 'Le cirque', systeme: 'présent', texte: "Ce soir, le cirque {arrive|pres|ind} en ville. Les camions {s'installent|pres|ind} sur la place. Hier, nous {avons vu|pc|ind} les affiches. Elles {étaient|imp|ind} très colorées. Hier, maman {a acheté|pc|ind} les billets. Ils {coûtaient|imp|ind} cher. Le clown {fait|pres|ind} rire les enfants. Les acrobates {s'entraînent|pres|ind} sous le chapiteau. Le jongleur {lance|pres|ind} cinq balles. Un singe {danse|pres|ind} sur un ballon. Les lions {rugissent|pres|ind} dans leur cage. Les éléphants {lèvent|pres|ind} la trompe. Tout à l'heure, le dompteur {entrera|fut|ind} dans la cage. Je {serai|fut|ind} au premier rang. Mon petit frère {a eu|pc|ind} peur l'an dernier. Il {pleurait|imp|ind} dans les bras de maman. Cette année, il {veut|pres|ind} tout voir ! Papa {applaudira|fut|ind} très fort. Nous {mangerons|fut|ind} de la barbe à papa. Mon frère {voudra|fut|ind} rester jusqu'à la fin." });
/* les exercices à écrire : {ce qu'on voit>ce qu'on écrit ; autre réponse acceptée} */
Object.assign(TRANSFOS, {
  "ce-inf": [
    { titre: "Au jardin", texte: "Papi {plante>planter} des tomates. Il {arrose>arroser} les fleurs. Je {ramasse>ramasser} les feuilles. Le chat {dort>dormir} au soleil. Nous {mangeons>manger} des fraises. Mamie {coupe>couper} des roses. Le chien {creuse>creuser} un trou. Les oiseaux {chantent>chanter} . Tu {cueilles>cueillir} des cerises. Vous {jouez>jouer} au ballon." },
    { titre: "La journée de Lou", texte: "Lou {se lève>se lever;lever} tôt. Elle {fait>faire} sa toilette. Elle {prend>prendre} son petit-déjeuner. Puis elle {va>aller} à l'école. Elle {dit>dire} bonjour à ses amis. La maîtresse {lit>lire} une histoire. Les élèves {écoutent>écouter} . À midi, Lou {mange>manger} à la cantine. L'après-midi, elle {dessine>dessiner} . Le soir, elle {finit>finir} ses devoirs. Son papa la {voit>voir} travailler. Elle {met>mettre} son pyjama. Puis elle {dort>dormir} ." },
    { titre: "Hier soir", texte: "Hier soir, nous {avons regardé>regarder} un film. Mon frère {a ri>rire} très fort. Maman {est venue>venir} s'asseoir avec nous. Papa {a préparé>préparer} du pop-corn. Le chat {a sauté>sauter} sur le canapé. Il {a renversé>renverser} le bol. Nous {avons ramassé>ramasser} le pop-corn. Ma sœur {a pleuré>pleurer} à la fin du film. Elle {était>être} triste pour le héros. Papa {a éteint>éteindre} la télévision. Nous {avons dit>dire} bonne nuit. Je {suis allé>aller} me coucher tard. J'{avais>avoir} sommeil. Mon frère {a lu>lire} encore un peu. Maman {a fermé>fermer} la porte. Tout le monde {a dormi>dormir} ." },
    { titre: "Demain", texte: "Demain, je {serai>être} en vacances. Nous {aurons>avoir} beaucoup de temps. Tu {pourras>pouvoir} venir jouer. Mes cousins {verront>voir} la mer. Ils {voudront>vouloir} se baigner. Nous {ferons>faire} un château de sable. Papa {construira>construire} des tours. Maman {lira>lire} un roman. Le chien {courra>courir} sur la plage. Il {aboiera>aboyer} après les mouettes. Mamie {viendra>venir} nous rejoindre. Elle {apportera>apporter} des gâteaux. Nous {irons>aller} manger une glace. Je {choisirai>choisir} la fraise. Ma sœur {prendra>prendre} la vanille. Le soir, nous {regarderons>regarder} le coucher de soleil. Nous {dirons>dire} au revoir à la mer. Vous {resterez>rester} encore un peu ? Je {devrai>devoir} rentrer. Nous {reviendrons>revenir} l'été prochain." },
  ],
  "ce-pres": [
    { titre: "La classe", texte: "La maîtresse {(chanter)>chante} une chanson. Les élèves {(écouter)>écoutent} . Tu {(dessiner)>dessines} un oiseau. Nous {(colorier)>colorions} nos dessins. Vous {(jouer)>jouez} dans la cour. Je {(ranger)>range} mes affaires. Léo {(regarder)>regarde} par la fenêtre. Les filles {(parler)>parlent} doucement. Nous {(chanter)>chantons} tous ensemble. Tu {(aimer)>aimes} cette chanson ?" },
    { titre: "La ferme", texte: "Le coq {(chanter)>chante} le matin. Les vaches {(manger)>mangent} de l'herbe. Le cochon {(être)>est} dans la boue. Nous {(avoir)>avons} trois lapins. Tu {(donner)>donnes} des carottes aux lapins. Vous {(aimer)>aimez} les animaux. Le fermier {(porter)>porte} le lait. Je {(caresser)>caresse} le poney. Les poules {(picorer)>picorent} le grain. Le chien {(garder)>garde} les moutons. Nous {(être)>sommes} contents. Tu {(avoir)>as} des bottes ? Les canards {(être)>sont} sur la mare." },
    { titre: "Le mercredi", texte: "Le mercredi, je {(finir)>finis} mes devoirs. Puis nous {(aller)>allons} à la piscine. Mon frère {(faire)>fait} du judo. Tu {(choisir)>choisis} un livre à la bibliothèque. Les enfants {(grandir)>grandissent} vite. Vous {(dire)>dites} bonjour au gardien. Maman {(aller)>va} au marché. Elle {(remplir)>remplit} son panier. Les marchands {(faire)>font} des prix. Je {(dire)>dis} merci au boulanger. Nous {(faire)>faisons} un gâteau. La pâte {(brunir)>brunit} dans le four. Les gourmands {(aller)>vont} le goûter. Vous {(finir)>finissez} vos assiettes. Tu {(faire)>fais} la vaisselle. Je {(aller)>vais} au lit." },
    { titre: "La surprise", texte: "Papa {(venir)>vient} me chercher. Il {(prendre)>prend} la voiture. Je {(voir)>vois} un paquet sur le siège. Nous {(pouvoir)>pouvons} l'ouvrir ? Tu {(vouloir)>veux} savoir ce qu'il y a dedans ? Mes sœurs {(venir)>viennent} voir aussi. Elles {(prendre)>prennent} le paquet. Elles {(vouloir)>veulent} l'ouvrir les premières. Papa {(dire)>dit} non. Je {(pouvoir)>peux} défaire le ruban. Nous {(voir)>voyons} une boîte rouge. Vous {(venir)>venez} regarder ? Mamie {(vouloir)>veut} prendre une photo. Elle {(prendre)>prend} son appareil. Je {(faire)>fais} un grand sourire. Dans la boîte, il y {(avoir)>a} un petit chat ! Il {(être)>est} tout gris. Mes sœurs {(pouvoir)>peuvent} le caresser. Nous {(dire)>disons} merci à papa. Vous {(voir)>voyez} comme il est mignon ?" },
  ],
  "ce-fut": [
    { titre: "Les vacances", texte: "Cet été, nous {(partir)>partirons} en vacances. Je {(nager)>nagerai} dans la mer. Papa {(pêcher)>pêchera} des poissons. Mes sœurs {(jouer)>joueront} au ballon. Tu {(venir)>viendras} avec nous ? Vous {(manger)>mangerez} des glaces. Maman {(lire)>lira} sur la plage. Le chien {(courir)>courra} après les vagues. Nous {(rentrer)>rentrerons} bronzés. Je {(raconter)>raconterai} tout à mes amis." },
    { titre: "Plus tard", texte: "Plus tard, je {(être)>serai} pilote. Mon frère {(avoir)>aura} une ferme. Nous {(voyager)>voyagerons} dans le monde entier. Tu {(être)>seras} vétérinaire. Mes amis {(avoir)>auront} de grandes maisons. Ma sœur {(devenir)>deviendra} chanteuse. Elle {(chanter)>chantera} à Paris. Vous {(être)>serez} fiers d'elle. Mon avion {(avoir)>aura} des ailes rouges. Mes parents {(monter)>monteront} avec moi. Nous {(survoler)>survolerons} la mer. Les gens nous {(regarder)>regarderont} . Le ciel {(être)>sera} bleu." },
    { titre: "La fête de l'école", texte: "Samedi, l'école {(organiser)>organisera} une fête. Les parents {(préparer)>prépareront} des gâteaux. Nous {(chanter)>chanterons} sur la scène. Je {(finir)>finirai} par une danse. Tu {(applaudir)>applaudiras} très fort ! Le directeur {(parler)>parlera} au micro. Les petits {(danser)>danseront} en premier. Les grands {(jouer)>joueront} une pièce. Vous {(choisir)>choisirez} une place devant. Mamie {(apporter)>apportera} des crêpes. Nous {(vendre)>vendrons} des billets de tombola. Papa {(gagner)>gagnera} peut-être un vélo. La fête {(durer)>durera} jusqu'au soir. Les enfants {(courir)>courront} partout. Nous {(rentrer)>rentrerons} tard. Je {(dormir)>dormirai} comme un loir." },
    { titre: "Chez mamie", texte: "Demain, je {(aller)>irai} chez mamie. Elle {(faire)>fera} une tarte. Nous {(voir)>verrons} ses poules. Tu {(pouvoir)>pourras} venir. Mes cousins {(vouloir)>voudront} jouer dehors. Papa {(prendre)>prendra} des photos. Nous {(être)>serons} nombreux. Mamie {(avoir)>aura} beaucoup de travail. Je {(venir)>viendrai} l'aider. Nous {(aller)>irons} chercher les œufs. Les poules {(faire)>feront} du bruit. Vous {(voir)>verrez} le petit poussin. Mon cousin {(vouloir)>voudra} le prendre. Il ne {(pouvoir)>pourra} pas. Mamie {(dire)>dira} non. Nous {(faire)>ferons} une promenade. Tu {(prendre)>prendras} ton vélo. Les grands {(venir)>viendront} à pied. Le soir, nous {(être)>serons} fatigués. Je {(dormir)>dormirai} chez mamie." },
  ],
  "ce-imp": [
    { titre: "Autrefois", texte: "Autrefois, mon grand-père {(habiter)>habitait} à la campagne. Il {(garder)>gardait} les vaches. Ses frères {(travailler)>travaillaient} aux champs. Nous {(aimer)>aimions} écouter ses histoires. Vous {(jouer)>jouiez} aux billes ? Je {(rêver)>rêvais} de ce temps-là. Sa mère {(cuisiner)>cuisinait} sur un vieux poêle. Les enfants {(marcher)>marchaient} longtemps pour aller à l'école. Tu {(porter)>portais} des sabots ? Le soir, on {(chanter)>chantait} près du feu." },
    { titre: "Autrefois, à la maison", texte: "Autrefois, je {(être)>étais} très sage. Mon chien {(avoir)>avait} de longues oreilles. Nous {(avoir)>avions} une petite maison. Tu {(être)>étais} mon meilleur ami. Mes parents {(être)>étaient} jeunes. Vous {(avoir)>aviez} un chat. Le jardin {(être)>était} petit. Les voisins {(avoir)>avaient} un grand cerisier. Nous {(être)>étions} toujours dans l'arbre ! Tu {(avoir)>avais} peur de tomber. Mes genoux {(être)>étaient} écorchés. Maman {(être)>était} inquiète. Vous {(être)>étiez} très gentils avec moi." },
    { titre: "L'hiver dernier", texte: "L'hiver dernier, il {(neiger)>neigeait} souvent. Nous {(faire)>faisions} des bonshommes de neige. Les enfants {(glisser)>glissaient} sur la glace. Tu {(finir)>finissais} toujours mouillé ! Maman {(préparer)>préparait} du chocolat chaud. Papa {(allumer)>allumait} un grand feu. Le chat {(dormir)>dormait} près de la cheminée. Les oiseaux {(venir)>venaient} manger sur le balcon. Je leur {(donner)>donnais} des graines. Nous {(lancer)>lancions} des boules de neige. Vous {(rire)>riiez} très fort. Les routes {(être)>étaient} glissantes. Le bus ne {(passer)>passait} plus. Nous {(rester)>restions} à la maison. Je {(lire)>lisais} des bandes dessinées. Mon frère {(construire)>construisait} un igloo." },
    { titre: "Au Moyen Âge", texte: "Au Moyen Âge, les chevaliers {(vivre)>vivaient} dans des châteaux. Ils {(porter)>portaient} des armures. Les paysans {(cultiver)>cultivaient} la terre. Le seigneur {(prendre)>prenait} une partie des récoltes. Les enfants {(aller)>allaient} rarement à l'école. Les gens {(dire)>disaient} que le seigneur était riche. Les dames {(broder)>brodaient} des tapisseries. Le forgeron {(fabriquer)>fabriquait} des épées. Les marchands {(venir)>venaient} de très loin. Ils {(vendre)>vendaient} des épices. Les chevaux {(tirer)>tiraient} les charrettes. Les pèlerins {(faire)>faisaient} de longs voyages. On {(construire)>construisait} de grandes cathédrales. Les moines {(écrire)>écrivaient} des livres à la main. Ils {(peindre)>peignaient} de belles lettres. Le soir, les troubadours {(chanter)>chantaient} des poèmes. Le roi {(être)>était} très puissant. Il {(avoir)>avait} une grande armée. Les soldats {(défendre)>défendaient} les remparts. Personne ne {(savoir)>savait} lire au village." },
  ],
  "ce-pca": [
    { titre: "Le dessin", texte: "Hier, Paul {(dessiner)>a dessiné} un cheval. Nous {(colorier)>avons colorié} le ciel. Tu {(coller)>as collé} des étoiles. Les élèves {(admirer)>ont admiré} le dessin. Vous {(aimer)>avez aimé} ? La maîtresse {(accrocher)>a accroché} le dessin au mur. Elle {(féliciter)>a félicité} Paul. Les parents {(regarder)>ont regardé} l'exposition. Ma sœur {(chercher)>a cherché} mon dessin. Nous {(ranger)>avons rangé} les feutres." },
    { titre: "Le match", texte: "Samedi, notre équipe {(jouer)>a joué} contre l'école voisine. Les joueurs {(courir)>ont couru} très vite. Tu {(marquer)>as marqué} un but ! Nous {(gagner)>avons gagné} le match. L'entraîneur {(crier)>a crié} de joie. Le gardien {(arrêter)>a arrêté} un penalty. Les supporters {(chanter)>ont chanté} . Vous {(applaudir)>avez applaudi} très fort. Après le match, nous {(boire)>avons bu} du jus d'orange. Papa {(prendre)>a pris} une photo. L'arbitre {(siffler)>a sifflé} la fin. Les adversaires nous {(serrer)>ont serré} la main. Mon frère {(perdre)>a perdu} sa casquette." },
    { titre: "Les crêpes", texte: "Ce matin, maman {(faire)>a fait} des crêpes. Nous {(manger)>avons mangé} toutes les crêpes. Mon frère {(prendre)>a pris} la dernière. Tu {(boire)>as bu} un grand verre de lait. Papa {(dire)>a dit} : « Quel festin ! » Ma sœur {(mettre)>a mis} du sucre partout. Le chien {(lécher)>a léché} le sol. Mamie {(apporter)>a apporté} de la confiture. Nous {(goûter)>avons goûté} la confiture de fraises. Vous {(préférer)>avez préféré} le chocolat. Papa {(retourner)>a retourné} une crêpe en l'air. Il {(rater)>a raté} la poêle ! Nous {(rire)>avons ri} aux éclats. Maman {(laver)>a lavé} la poêle. Tu {(essuyer)>as essuyé} la table. Les enfants {(ranger)>ont rangé} la cuisine." },
    { titre: "L'écureuil", texte: "Dimanche, nous {(voir)>avons vu} un écureuil. Il {(grimper)>a grimpé} dans un arbre. Les enfants {(vouloir)>ont voulu} le suivre. Tu {(pouvoir)>as pu} le photographier. Papi {(mettre)>a mis} ses lunettes pour mieux voir. Il {(lire)>a lu} le nom de l'arbre sur un panneau. L'écureuil {(cacher)>a caché} une noisette dans un trou. Nous {(attendre)>avons attendu} sans bouger. Ma sœur {(faire)>a fait} un petit bruit. L'écureuil {(sauter)>a sauté} sur une autre branche. Papa {(dire)>a dit} : « Chut ! » Nous {(entendre)>avons entendu} un pic-vert. Il {(frapper)>a frappé} un tronc. Vous {(avoir)>avez eu} de la chance ! Mamie {(ouvrir)>a ouvert} le panier. Nous {(manger)>avons mangé} sous les arbres. Tu {(boire)>as bu} de la citronnade. Les oiseaux {(chanter)>ont chanté} tout l'après-midi. Le soleil {(briller)>a brillé} . Nous {(passer)>avons passé} une belle journée." },
  ],
  "ce-pce": [
    { titre: "Le voyage", texte: "Hier, Paul {(partir)>est parti} en voyage. Sa sœur {(partir)>est partie} avec lui. Ils {(arriver)>sont arrivés} le soir. Les filles {(rester)>sont restées} à la maison. Nous {(aller)>sommes allés;sommes allées} les voir. Le train {(arriver)>est arrivé} en retard. Paul {(descendre)>est descendu} le premier. Sa sœur {(tomber)>est tombée} sur le quai. Elle {(rester)>est restée} calme. Leurs grands-parents {(venir)>sont venus} les chercher." },
    { titre: "La rentrée", texte: "Ce matin, Léa {(arriver)>est arrivée} en retard. Tom {(entrer)>est entré} le premier. Les élèves {(monter)>sont montés} en classe. Les maîtresses {(venir)>sont venues} nous chercher. Tu {(tomber)>es tombé;es tombée} dans l'escalier ? Le directeur {(passer)>est passé} dans les classes. Une nouvelle élève {(arriver)>est arrivée} . Elle {(venir)>est venue} de Lyon. Ses parents {(rester)>sont restés} un moment. Puis ils {(partir)>sont partis} . À midi, nous {(aller)>sommes allés;sommes allées} à la cantine. Les filles {(sortir)>sont sorties} les premières. Nous {(rentrer)>sommes rentrés;sommes rentrées} à quatre heures." },
    { titre: "Au cinéma", texte: "Samedi, mes cousines {(venir)>sont venues} chez nous. Nous {(aller)>sommes allés;sommes allées} au cinéma. Ma tante {(venir)>est venue} aussi. Elle {(arriver)>est arrivée} en avance. Les places {(rester)>sont restées} vides au premier rang. Le héros {(tomber)>est tombé} d'une falaise. Ma cousine {(devenir)>est devenue} toute pâle. Mon frère {(mourir)>est mort} de rire ! La lumière {(revenir)>est revenue} à la fin. Mon frère {(rester)>est resté} jusqu'au bout. Vous {(sortir)>êtes sortis;êtes sorties} les derniers. Nous {(partir)>sommes partis;sommes parties} à pied. Après le film, nous {(rentrer)>sommes rentrés;sommes rentrées} . Mes cousines {(repartir)>sont reparties} le soir. Le chat {(monter)>est monté} sur mon lit. Maman {(descendre)>est descendue} fermer la porte." },
    { titre: "Les chatons", texte: "Hier, un petit chat {(naître)>est né} . Sa sœur {(naître)>est née} aussi. Ils {(rester)>sont restés} près de leur mère. Le petit chat {(tomber)>est tombé} du panier. Mamie {(venir)>est venue} le relever. Les enfants {(arriver)>sont arrivés} en courant. Ma sœur {(entrer)>est entrée} sans bruit. Mes cousins {(venir)>sont venus} voir les chatons. La chatte {(sortir)>est sortie} du panier. Elle {(aller)>est allée} boire du lait. Puis elle {(revenir)>est revenue} vers ses petits. Les chatons {(devenir)>sont devenus} très calmes. Papa {(rentrer)>est rentré} du travail. Il {(monter)>est monté} les voir. Mes cousines {(partir)>sont parties} à six heures. Nous {(rester)>sommes restés;sommes restées} près du panier. Maman {(descendre)>est descendue} à la cave. Elle {(remonter)>est remontée} avec une couverture. Les chatons {(rester)>sont restés} au chaud. Moi, je {(aller)>suis allé;suis allée} me coucher." },
  ],
  "ce-etav": [
    { titre: "Être et avoir au présent", texte: "Je {(être)>suis} en CE1. Tu {(avoir)>as} un vélo rouge. Nous {(être)>sommes} amis. Vous {(avoir)>avez} de la chance. Ils {(être)>sont} contents. Elle {(avoir)>a} un chat. Mon chat {(être)>est} noir. Nous {(avoir)>avons} un jardin. Tu {(être)>es} gentil. Mes amis {(avoir)>ont} des rollers." },
    { titre: "Être et avoir au futur", texte: "Demain, je {(être)>serai} en vacances. Tu {(avoir)>auras} ton cadeau. Nous {(être)>serons} à la plage. Ils {(avoir)>auront} chaud. Vous {(être)>serez} fatigués. Le soleil {(être)>sera} chaud. Ma sœur {(avoir)>aura} un chapeau. Nous {(avoir)>aurons} des glaces. Tu {(être)>seras} content. Mes parents {(être)>seront} détendus. Vous {(avoir)>aurez} du temps. Le chien {(avoir)>aura} soif. Les mouettes {(être)>seront} nombreuses." },
    { titre: "Être et avoir à l'imparfait", texte: "Autrefois, mon père {(être)>était} petit. Il {(avoir)>avait} un chien. Nous {(être)>étions} voisins. Ses parents {(avoir)>avaient} une ferme. Tu {(être)>étais} bébé. La ferme {(être)>était} grande. Il y {(avoir)>avait} des vaches. Les vaches {(être)>étaient} brunes. Mon père {(avoir)>avait} des bottes. Vous {(avoir)>aviez} des poules ? Nous {(avoir)>avions} des lapins. Tu {(avoir)>avais} peur du coq. Je {(être)>étais} courageux. Mes oncles {(être)>étaient} fermiers. Ils {(avoir)>avaient} un tracteur. Vous {(être)>étiez} heureux." },
    { titre: "Être et avoir au passé composé", texte: "Hier, Léo {(être)>a été} malade. Il {(avoir)>a eu} de la fièvre. Nous {(avoir)>avons eu} peur. Ses parents {(être)>ont été} inquiets. Tu {(avoir)>as eu} de ses nouvelles ? Le médecin {(être)>a été} rassurant. Léo {(avoir)>a eu} un sirop. Il {(être)>a été} sage. Sa sœur {(avoir)>a eu} une idée. Elle {(être)>a été} gentille. Les copains {(avoir)>ont eu} envie de le voir. Vous {(être)>avez été} patients. Nous {(être)>avons été} contents de le revoir. Il {(avoir)>a eu} beaucoup de cartes. Tu {(être)>as été} le premier à venir. Mon frère {(avoir)>a eu} une médaille de bon camarade. La maîtresse {(être)>a été} fière de nous. Les parents de Léo {(avoir)>ont eu} une belle surprise. Léo {(être)>a été} guéri en trois jours. Nous {(avoir)>avons eu} une belle fête." },
  ],
  "ce-bontemps": [
    { titre: "Le goûter", texte: "Aujourd'hui, je {(goûter)>goûte} chez mamie. Elle {(préparer)>prépare} des crêpes. Hier, elle {(acheter)>a acheté} de la confiture. Demain, nous {(manger)>mangerons} le reste. Maintenant, mon frère {(arriver)>arrive} . Il {(avoir)>a} très faim. Hier, il {(oublier)>a oublié} son goûter à l'école. Demain, il {(penser)>pensera} à son goûter ! Mamie {(rire)>rit} . Ce soir, papa {(venir)>viendra} nous chercher." },
    { titre: "Au parc", texte: "Hier, nous {(aller)>sommes allés;sommes allées} au parc. Il {(faire)>faisait;a fait} beau. Le ciel {(être)>était} tout bleu. Nous {(jouer)>avons joué;jouions} au ballon. Soudain, Léo {(tomber)>est tombé} . Aujourd'hui, il {(avoir)>a} un pansement. Il {(rester)>reste} à la maison. Je lui {(apporter)>apporte} une bande dessinée. Demain, il {(aller)>ira} mieux. Nous {(retourner)>retournerons} au parc. Nous {(faire)>ferons} attention !" },
    { titre: "La pluie", texte: "Ce matin, il {(pleuvoir)>pleut} . Nous {(rester)>restons} en classe. Hier, le soleil {(briller)>brillait} et la cour {(être)>était} sèche. Nous {(jouer)>avons joué;jouions} à la marelle. Lina {(gagner)>a gagné} trois parties. Maintenant, la maîtresse {(lire)>lit} une histoire. Les élèves {(écouter)>écoutent} . Demain, la pluie {(cesser)>cessera} . Nous {(sortir)>sortirons} dans la cour. Je {(prendre)>prendrai} ma corde à sauter. Lina {(être)>sera} encore la championne !" },
    { titre: "Le marché", texte: "Samedi dernier, nous {(aller)>sommes allés;sommes allées} au marché. Il y {(avoir)>avait} beaucoup de monde. Les marchands {(crier)>criaient;ont crié} leurs prix. Maman {(acheter)>a acheté;achetait} des fraises. Je {(porter)>ai porté;portais} le panier. Aujourd'hui, nous {(préparer)>préparons} une tarte. Papa {(couper)>coupe} les fraises. Ma sœur {(goûter)>goûte} la crème. Ce soir, mes cousins {(venir)>viendront} dîner. Nous {(partager)>partagerons} la tarte. Samedi prochain, nous {(retourner)>retournerons} au marché. Mamie {(venir)>viendra} avec nous. Elle {(choisir)>choisira} les meilleurs fruits." },
    { titre: "Le chat perdu", texte: "Hier soir, notre chat {(disparaître)>a disparu} . Il {(faire)>faisait} nuit et il {(pleuvoir)>pleuvait} . Nous {(appeler)>avons appelé;appelions} le chat partout. Papa {(chercher)>a cherché;cherchait} dans le jardin. Je {(pleurer)>ai pleuré;pleurais} dans mon lit. Ce matin, il {(être)>est} devant la porte ! Il {(miauler)>miaule} doucement. Il {(avoir)>a} les pattes toutes sales. Maman le {(laver)>lave} . Maintenant, il {(dormir)>dort} près du radiateur. Demain, nous lui {(acheter)>achèterons} un collier. Il {(porter)>portera} une clochette. Nous {(entendre)>entendrons} la clochette de loin." },
    { titre: "Le cirque", texte: "La semaine dernière, nous {(aller)>sommes allés;sommes allées} au cirque. Le chapiteau {(être)>était} rouge et jaune. Il {(sentir)>sentait} le pop-corn. D'abord, les clowns {(entrer)>sont entrés} en piste. Ensuite, un acrobate {(sauter)>a sauté} sur un trapèze. Tout le monde {(applaudir)>a applaudi;applaudissait} . Aujourd'hui, je {(dessiner)>dessine} un clown. Ma maîtresse {(accrocher)>accroche} mon dessin au mur. Mes amis le {(regarder)>regardent} . Ils {(vouloir)>veulent} aller au cirque eux aussi. Dimanche prochain, le cirque {(quitter)>quittera} la ville. Les camions {(partir)>partiront} très tôt. Nous {(aller)>irons} leur dire au revoir. Les éléphants {(monter)>monteront} dans un grand camion. Je {(être)>serai} un peu triste." },
    { titre: "Le potager", texte: "Autrefois, mon grand-père {(cultiver)>cultivait} un grand potager. Chaque matin, il {(arroser)>arrosait} ses salades. Il {(avoir)>avait} toujours de belles tomates. L'été dernier, il {(planter)>a planté} un cerisier. Aujourd'hui, l'arbre {(être)>est} encore petit. Grand-père {(dire)>dit} qu'il {(falloir)>faut} être patient. Je {(cueillir)>cueille} des radis avec lui. Il {(sourire)>sourit} . Dans trois ans, le cerisier {(donner)>donnera} des fruits. Nous {(manger)>mangerons} des cerises. Je {(grimper)>grimperai} dans l'arbre. Mamie {(faire)>fera} de la confiture. Hier, elle {(acheter)>a acheté} des pots. Elle {(nettoyer)>a nettoyé} la grande bassine." },
    { titre: "La tempête", texte: "Hier soir, le vent {(souffler)>soufflait;a soufflé} très fort. Les volets {(claquer)>claquaient} . Nous {(être)>étions} dans le salon. Soudain, la lumière {(s'éteindre)>s'est éteinte} . Mon petit frère {(crier)>a crié} . Papa {(allumer)>a allumé} une bougie. Ce matin, le jardin {(être)>est} plein de branches. Le vieux pommier {(avoir)>a} une branche cassée. Nous {(ramasser)>ramassons} les feuilles. Maman {(téléphoner)>téléphone} à papi. Cet après-midi, papi {(venir)>viendra} avec sa scie. Il {(couper)>coupera} la branche. Nous {(faire)>ferons} un tas de bois. L'hiver prochain, nous {(allumer)>allumerons} la cheminée avec ce bois. Le salon {(être)>sera} bien chaud. Mon frère {(être)>sera} rassuré." },
    { titre: "La nouvelle école", texte: "Le mois dernier, Léa {(habiter)>habitait} à Marseille. Elle {(avoir)>avait} beaucoup d'amis. Puis son papa {(trouver)>a trouvé} un travail à Lille. Toute la famille {(déménager)>a déménagé} . Aujourd'hui, Léa {(entrer)>entre} dans sa nouvelle école. Elle ne {(connaître)>connaît} personne. La maîtresse la {(présenter)>présente} à la classe. Les élèves lui {(sourire)>sourient} . Hier soir, elle {(préparer)>a préparé;préparait} son cartable. Elle {(être)>était} inquiète. Maintenant, elle {(se sentir)>se sent} mieux. Bientôt, elle {(avoir)>aura} de nouveaux amis. Ils {(jouer)>joueront} ensemble à la récréation. Pendant les vacances, Léa {(retourner)>retournera} à Marseille. Elle {(raconter)>racontera} tout à ses anciens amis. Ils {(être)>seront} contents de la revoir. Elle leur {(écrire)>écrira} souvent." },
    { titre: "Le spectacle", texte: "Depuis un mois, nous {(répéter)>répétons} une pièce de théâtre. Avant, je {(être)>étais} très timide. Je {(parler)>parlais} tout bas. Mais la maîtresse {(aider)>a aidé;aidait} toute la classe. Hier, nous {(faire)>avons fait} la dernière répétition. Tout {(marcher)>a marché;marchait} très bien. Ce matin, je {(se lever)>me lève} très tôt. Je {(mettre)>mets} mon costume de pirate. Maman {(prendre)>prend} une photo. Ce soir, le rideau {(s'ouvrir)>s'ouvrira} . Les parents {(applaudir)>applaudiront} . Je {(dire)>dirai} mon texte d'une voix forte. Mon père {(filmer)>filmera} la scène. Demain, nous {(regarder)>regarderons} le film tous ensemble. Mamie, qui {(habiter)>habite} loin, le {(voir)>verra} aussi. L'an dernier, elle {(venir)>est venue} au spectacle. Elle {(pleurer)>a pleuré} d'émotion !" },
    { titre: "La classe de neige", texte: "Demain, nous {(partir)>partirons} en classe de neige. Ce soir, je {(préparer)>prépare} ma valise. Je {(chercher)>cherche} mes gants. L'année dernière, je {(perdre)>ai perdu} mon bonnet. Il {(faire)>faisait} très froid et mes oreilles {(geler)>gelaient} . Cette année, maman {(acheter)>a acheté} un bonnet neuf. Il {(être)>est} rouge et chaud. Là-bas, nous {(faire)>ferons} du ski. Le moniteur nous {(apprendre)>apprendra} à freiner. Les grands {(descendre)>descendront} les pistes rouges. Moi, je {(rester)>resterai} sur la piste verte. Le soir, nous {(écrire)>écrirons} à nos parents. Mon frère, lui, {(connaître)>connaît} déjà la montagne. Il y {(aller)>est allé} l'an dernier. Il {(tomber)>tombait;est tombé} sans arrêt ! Maintenant, il {(skier)>skie} très bien. Papa {(fermer)>ferme} ma valise. Elle {(être)>est} prête !" },
    { titre: "Le grand-père marin", texte: "Mon grand-père {(avoir)>a} quatre-vingts ans aujourd'hui. Autrefois, il {(être)>était} marin. Il {(naviguer)>naviguait} sur de grands bateaux. Chaque année, il {(traverser)>traversait} l'océan. Un jour, une tempête {(éclater)>a éclaté} . Les vagues {(être)>étaient} immenses. Le bateau {(perdre)>a perdu} son mât. Grand-père {(réparer)>a réparé} le bateau avec ses amis. Maintenant, il {(habiter)>habite} une petite maison au bord de la mer. Il {(regarder)>regarde} les bateaux passer. Chaque soir, il nous {(raconter)>raconte} ses aventures. Hier, il {(offrir)>a offert} une vieille boussole à mon frère. Mon frère la {(garder)>garde} dans sa chambre. Plus tard, je {(devenir)>deviendrai} marin moi aussi. Je {(voyager)>voyagerai} jusqu'en Amérique. Grand-père {(être)>sera} fier de moi. Ce soir, toute la famille {(fêter)>fêtera} son anniversaire. Ma sœur {(faire)>a fait} un gâteau ce matin. Nous {(chanter)>chanterons} pour lui. Il {(souffler)>soufflera} ses bougies." },
  ],
});
Object.assign(TRANSFOS, {"ce-accord": [{"titre": "Petites phrases", "texte": "Les {nc::(chat)>chats} dorment. Une {adj::(petit)>petite} souris passe. Des {nc::(oiseau)>oiseaux} chantent. Mes {nc::(ami)>amis} jouent. Une robe {adj::(bleu)>bleue} sèche. Les {nc::(fleur)>fleurs} poussent. Des {adj::(grand)>grands} arbres bougent. Ma {adj::(gentil)>gentille} tante arrive. Les {nc::(enfant)>enfants} rient. Deux {nc::(chien)>chiens} aboient."}, {"titre": "Dans la cour", "texte": "Dans la cour, les {nc::(élève)>élèves} jouent. Des {adj::(petit)>petites} filles sautent à la corde. Les {nc::(garçon)>garçons} courent. Ils ont des ballons {adj::(rouge)>rouges} . Une {adj::(grand)>grande} maîtresse surveille. Elle porte des lunettes {adj::(noir)>noires} . Les {nc::(arbre)>arbres} sont {adj::(vert)>verts} . Une {adj::(jeune)>jeune} fille lit. Les {nc::(cheval)>chevaux} du manège tournent. Les {nc::(jeu)>jeux} sont {adj::(amusant)>amusants} . Deux {adj::(nouveau)>nouveaux} élèves arrivent."}, {"titre": "Chez mamie", "texte": "Mamie a des {nc::(poule)>poules} {adj::(blanc)>blanches} et des {nc::(lapin)>lapins} {adj::(gris)>gris} . Ses {nc::(chèvre)>chèvres} sont {adj::(gourmand)>gourmandes} . Dans son jardin, il y a des {nc::(rose)>roses} {adj::(parfumé)>parfumées} et de {adj::(beau)>beaux} {nc::(chou)>choux} . Les {nc::(cerise)>cerises} sont {adj::(mûr)>mûres} . Une {adj::(vieux)>vieille} brouette rouille près des {nc::(mur)>murs} . Mamie porte un chapeau {adj::(fleuri)>fleuri} et des bottes {adj::(jaune)>jaunes} ."}, {"titre": "Au marché", "texte": "Le marché est plein de {nc::(couleur)>couleurs} . Les {nc::(marchand)>marchands} vendent des {nc::(pomme)>pommes} {adj::(rouge)>rouges} , des {nc::(poire)>poires} {adj::(juteux)>juteuses} et des {nc::(melon)>melons} {adj::(sucré)>sucrés} . Une {adj::(vieux)>vieille} dame choisit des {nc::(œuf)>œufs} {adj::(frais)>frais} . Le fromager coupe de {adj::(gros)>grosses} meules. Les {nc::(poisson)>poissons} {adj::(argenté)>argentés} brillent sur la glace. Des {nc::(chien)>chiens} {adj::(curieux)>curieux} reniflent les {nc::(panier)>paniers} . Ma mère achète deux {adj::(beau)>belles} salades et des {nc::(radis)>radis} {adj::(croquant)>croquants} ."}], "ce-bilanacc": [{"titre": "Au jardin", "texte": "Les {nc::(chat)>chats} {v::(dormir)>dorment} . Mon {adj::(petit)>petit} frère {v::(jouer)>joue} . Les {nc::(fleur)>fleurs} {adj::(rouge)>rouges} {v::(pousser)>poussent} . Nous {v::(chanter)>chantons} . Une {adj::(grand)>grande} girafe {v::(manger)>mange} ."}, {"titre": "Dans les arbres", "texte": "Les {nc::(oiseau)>oiseaux} {v::(chanter)>chantent} dans les {nc::(arbre)>arbres} . Ma {adj::(gentil)>gentille} voisine {v::(arroser)>arrose} ses {nc::(rose)>roses} . Les {nc::(enfant)>enfants} {v::(jouer)>jouent} au ballon. Tu {v::(courir)>cours} vite. Vous {v::(être)>êtes} {adj::(content)>contents;contentes} ."}, {"titre": "En classe", "texte": "Ce matin, les {nc::(élève)>élèves} {v::(arriver)>arrivent} en classe. La maîtresse {v::(ouvrir)>ouvre} les {nc::(fenêtre)>fenêtres} . Des {adj::(petit)>petits} garçons {v::(ranger)>rangent} leurs {nc::(cartable)>cartables} . Nous {v::(sortir)>sortons} nos {nc::(cahier)>cahiers} . Les filles {v::(être)>sont} {adj::(attentif)>attentives} . Je {v::(lire)>lis} ."}, {"titre": "Au zoo", "texte": "Au zoo, les {nc::(lion)>lions} {v::(dormir)>dorment} au soleil. Les {nc::(singe)>singes} {v::(sauter)>sautent} de branche en branche. Une {adj::(vieux)>vieille} tortue {v::(avancer)>avance} lentement. Les {nc::(girafe)>girafes} {v::(manger)>mangent} des feuilles {adj::(vert)>vertes} . Nous {v::(regarder)>regardons} les {nc::(animal)>animaux} . Vous {v::(prendre)>prenez} des {nc::(photo)>photos} ."}, {"titre": "Dans la forêt", "texte": "Dans la forêt, les {nc::(arbre)>arbres} {v::(perdre)>perdent} leurs {nc::(feuille)>feuilles} . Les {nc::(écureuil)>écureuils} {v::(ramasser)>ramassent} des {nc::(noisette)>noisettes} . Une {adj::(petit)>petite} souris {v::(se cacher)>se cache} . Les champignons {v::(pousser)>poussent} sous la mousse {adj::(humide)>humide} . Nous {v::(marcher)>marchons} sur des feuilles {adj::(sec)>sèches} . Tu {v::(entendre)>entends} les {nc::(oiseau)>oiseaux} ?"}, {"titre": "La course", "texte": "Mes {nc::(cousin)>cousins} {v::(venir)>viennent} chez nous. Ils {v::(avoir)>ont} des {nc::(vélo)>vélos} {adj::(neuf)>neufs} . Nous {v::(faire)>faisons} une course. Ma {adj::(petit)>petite} sœur {v::(gagner)>gagne} ! Les {nc::(garçon)>garçons} {v::(être)>sont} {adj::(étonné)>étonnés} . Papa {v::(préparer)>prépare} des {nc::(crêpe)>crêpes} {adj::(sucré)>sucrées} . Vous {v::(aimer)>aimez} les crêpes ?"}, {"titre": "La nuit", "texte": "La nuit, les {nc::(étoile)>étoiles} {v::(briller)>brillent} . Les {nc::(hibou)>hiboux} {v::(chasser)>chassent} des {nc::(souris)>souris} . Une {nc::(chouette)>chouette} {adj::(blanc)>blanche} {v::(voler)>vole} sans bruit. Les {nc::(loup)>loups} {v::(hurler)>hurlent} . Je {v::(dormir)>dors} dans ma tente. Mes {nc::(ami)>amis} {v::(raconter)>racontent} des histoires {adj::(effrayant)>effrayantes} . Nous {v::(avoir)>avons} peur !"}, {"titre": "Au marché", "texte": "Au marché, les {nc::(marchand)>marchands} {v::(crier)>crient} . Ils {v::(vendre)>vendent} des {nc::(fruit)>fruits} {adj::(frais)>frais} . Une {adj::(vieux)>vieille} dame {v::(choisir)>choisit} des {nc::(tomate)>tomates} {adj::(mûr)>mûres} . Les {nc::(client)>clients} {v::(attendre)>attendent} . Nous {v::(acheter)>achetons} des {nc::(fromage)>fromages} . Tu {v::(porter)>portes} le panier. Les {nc::(chien)>chiens} {v::(aboyer)>aboient} ."}, {"titre": "À la montagne", "texte": "Pendant les vacances, nous {v::(partir)>partons} à la montagne. Les {nc::(sommet)>sommets} {v::(être)>sont} {adj::(blanc)>blancs} . Les {nc::(vache)>vaches} {v::(brouter)>broutent} l'herbe. Des {nc::(torrent)>torrents} {adj::(glacé)>glacés} {v::(descendre)>descendent} de la montagne. Mon frère {v::(grimper)>grimpe} sur les {nc::(rocher)>rochers} . Je {v::(cueillir)>cueille} des fleurs {adj::(sauvage)>sauvages} . Vous {v::(venir)>venez} avec nous ? Les {nc::(chalet)>chalets} {v::(avoir)>ont} des toits {adj::(pointu)>pointus} ."}, {"titre": "Au cirque", "texte": "Le cirque {v::(arriver)>arrive} en ville. Les {nc::(clown)>clowns} {v::(faire)>font} rire les {nc::(enfant)>enfants} . Des {nc::(acrobate)>acrobates} {adj::(agile)>agiles} {v::(sauter)>sautent} sur des {nc::(trampoline)>trampolines} . Les {nc::(éléphant)>éléphants} {v::(lever)>lèvent} leur trompe. Un dompteur {adj::(courageux)>courageux} {v::(entrer)>entre} dans la cage. Les {nc::(tigre)>tigres} {v::(rugir)>rugissent} . Nous {v::(applaudir)>applaudissons} . Les {nc::(spectateur)>spectateurs} {v::(être)>sont} {adj::(ravi)>ravis} ."}, {"titre": "L'exposition", "texte": "Dans la classe, les {nc::(élève)>élèves} {v::(préparer)>préparent} une exposition. Des {nc::(dessin)>dessins} {adj::(coloré)>colorés} {v::(couvrir)>couvrent} les murs. Les {nc::(garçon)>garçons} {v::(découper)>découpent} des {nc::(étoile)>étoiles} {adj::(doré)>dorées} . Les {nc::(fille)>filles} {v::(peindre)>peignent} des {nc::(paysage)>paysages} . Nous {v::(coller)>collons} des {nc::(photo)>photos} . Tu {v::(écrire)>écris} les titres. La maîtresse {v::(être)>est} {adj::(fier)>fière} de nous. Les parents {v::(venir)>viennent} ce soir. Ils {v::(admirer)>admirent} notre travail."}, {"titre": "Au bord de la mer", "texte": "Au bord de la mer, les {nc::(vague)>vagues} {v::(frapper)>frappent} les {nc::(rocher)>rochers} . Des {nc::(mouette)>mouettes} {adj::(blanc)>blanches} {v::(tourner)>tournent} dans le ciel. Les {nc::(pêcheur)>pêcheurs} {v::(réparer)>réparent} leurs {nc::(filet)>filets} . Une {adj::(vieux)>vieille} barque {v::(attendre)>attend} sur le sable. Les {nc::(enfant)>enfants} {v::(ramasser)>ramassent} des {nc::(coquillage)>coquillages} {adj::(nacré)>nacrés} . Nous {v::(construire)>construisons} un château. Tu {v::(creuser)>creuses} des {nc::(fossé)>fossés} . Vous {v::(être)>êtes} {adj::(heureux)>heureux;heureuses} ."}]});
Object.assign(TRANSFOS, {"ce-int": [{"titre": "Les questions de Léo", "texte": "{int::Tu viens au parc.>Est-ce que tu viens au parc ?;Viens-tu au parc ?;Tu viens au parc ?} {int::Tu aimes les glaces.>Est-ce que tu aimes les glaces ?;Aimes-tu les glaces ?;Tu aimes les glaces ?} {int::Le chat dort.>Est-ce que le chat dort ?;Le chat dort-il ?;Le chat dort ?} {int::Vous jouez au ballon.>Est-ce que vous jouez au ballon ?;Jouez-vous au ballon ?;Vous jouez au ballon ?} {int::Léa chante.>Est-ce que Léa chante ?;Léa chante-t-elle ?;Léa chante ?} {int::Tu as faim.>Est-ce que tu as faim ?;As-tu faim ?;Tu as faim ?} {int::Il pleut.>Est-ce qu'il pleut ?;Pleut-il ?;Il pleut ?} {int::Nous partons demain.>Est-ce que nous partons demain ?;Partons-nous demain ?;Nous partons demain ?} {int::Ta sœur lit un livre.>Est-ce que ta sœur lit un livre ?;Ta sœur lit-elle un livre ?;Ta sœur lit un livre ?} {int::Vous voulez du pain.>Est-ce que vous voulez du pain ?;Voulez-vous du pain ?;Vous voulez du pain ?}"}, {"titre": "À la ferme", "texte": "{int::Le fermier trait les vaches.>Est-ce que le fermier trait les vaches ?;Le fermier trait-il les vaches ?;Le fermier trait les vaches ?} {int::Tu vois le cochon.>Est-ce que tu vois le cochon ?;Vois-tu le cochon ?;Tu vois le cochon ?} {int::Les poules pondent des œufs.>Est-ce que les poules pondent des œufs ?;Les poules pondent-elles des œufs ?;Les poules pondent des œufs ?} {int::Vous aimez le lait.>Est-ce que vous aimez le lait ?;Aimez-vous le lait ?;Vous aimez le lait ?} {int::Le chien garde les moutons.>Est-ce que le chien garde les moutons ?;Le chien garde-t-il les moutons ?;Le chien garde les moutons ?} {int::Tu entends le coq.>Est-ce que tu entends le coq ?;Entends-tu le coq ?;Tu entends le coq ?} {int::Il fait beau.>Est-ce qu'il fait beau ?;Fait-il beau ?;Il fait beau ?} {int::Les canards nagent sur la mare.>Est-ce que les canards nagent sur la mare ?;Les canards nagent-ils sur la mare ?;Les canards nagent sur la mare ?} {int::La vache mange de l'herbe.>Est-ce que la vache mange de l'herbe ?;La vache mange-t-elle de l'herbe ?;La vache mange de l'herbe ?} {int::Nous rentrons bientôt.>Est-ce que nous rentrons bientôt ?;Rentrons-nous bientôt ?;Nous rentrons bientôt ?} {int::Tu veux caresser le veau.>Est-ce que tu veux caresser le veau ?;Veux-tu caresser le veau ?;Tu veux caresser le veau ?} {int::Le cheval court vite.>Est-ce que le cheval court vite ?;Le cheval court-il vite ?;Le cheval court vite ?} {int::Vous restez pour le goûter.>Est-ce que vous restez pour le goûter ?;Restez-vous pour le goûter ?;Vous restez pour le goûter ?}"}, {"titre": "Le pique-nique", "texte": "{int::Tu prends ton panier.>Est-ce que tu prends ton panier ?;Prends-tu ton panier ?;Tu prends ton panier ?} {int::Nous partons tôt.>Est-ce que nous partons tôt ?;Partons-nous tôt ?;Nous partons tôt ?} {int::Maman prépare les sandwichs.>Est-ce que maman prépare les sandwichs ?;Maman prépare-t-elle les sandwichs ?;Maman prépare les sandwichs ?} {int::Papa porte la nappe.>Est-ce que papa porte la nappe ?;Papa porte-t-il la nappe ?;Papa porte la nappe ?} {int::Tu aimes le jus de pomme.>Est-ce que tu aimes le jus de pomme ?;Aimes-tu le jus de pomme ?;Tu aimes le jus de pomme ?} {int::Vous connaissez ce lac.>Est-ce que vous connaissez ce lac ?;Connaissez-vous ce lac ?;Vous connaissez ce lac ?} {int::Les fourmis aiment les miettes.>Est-ce que les fourmis aiment les miettes ?;Les fourmis aiment-elles les miettes ?;Les fourmis aiment les miettes ?} {int::Il fait chaud.>Est-ce qu'il fait chaud ?;Fait-il chaud ?;Il fait chaud ?} {int::Ton frère pêche dans la rivière.>Est-ce que ton frère pêche dans la rivière ?;Ton frère pêche-t-il dans la rivière ?;Ton frère pêche dans la rivière ?} {int::Tu sais nager.>Est-ce que tu sais nager ?;Sais-tu nager ?;Tu sais nager ?} {int::Vous jouez aux cartes.>Est-ce que vous jouez aux cartes ?;Jouez-vous aux cartes ?;Vous jouez aux cartes ?} {int::Le soleil brille encore.>Est-ce que le soleil brille encore ?;Le soleil brille-t-il encore ?;Le soleil brille encore ?} {int::Nous mangeons sous l'arbre.>Est-ce que nous mangeons sous l'arbre ?;Mangeons-nous sous l'arbre ?;Nous mangeons sous l'arbre ?} {int::Ta sœur cueille des fleurs.>Est-ce que ta sœur cueille des fleurs ?;Ta sœur cueille-t-elle des fleurs ?;Ta sœur cueille des fleurs ?} {int::Tu veux une pomme.>Est-ce que tu veux une pomme ?;Veux-tu une pomme ?;Tu veux une pomme ?} {int::Vous rentrez ce soir.>Est-ce que vous rentrez ce soir ?;Rentrez-vous ce soir ?;Vous rentrez ce soir ?}"}, {"titre": "Le spectacle", "texte": "{int::Tu viens au spectacle.>Est-ce que tu viens au spectacle ?;Viens-tu au spectacle ?;Tu viens au spectacle ?} {int::Vous avez vos billets.>Est-ce que vous avez vos billets ?;Avez-vous vos billets ?;Vous avez vos billets ?} {int::Le rideau s'ouvre.>Est-ce que le rideau s'ouvre ?;Le rideau s'ouvre-t-il ?;Le rideau s'ouvre ?} {int::Les acteurs sont prêts.>Est-ce que les acteurs sont prêts ?;Les acteurs sont-ils prêts ?;Les acteurs sont prêts ?} {int::Tu vois la scène.>Est-ce que tu vois la scène ?;Vois-tu la scène ?;Tu vois la scène ?} {int::Nous sommes bien placés.>Est-ce que nous sommes bien placés ?;Sommes-nous bien placés ?;Nous sommes bien placés ?} {int::La musique commence.>Est-ce que la musique commence ?;La musique commence-t-elle ?;La musique commence ?} {int::Tu entends les violons.>Est-ce que tu entends les violons ?;Entends-tu les violons ?;Tu entends les violons ?} {int::Le magicien fait un tour.>Est-ce que le magicien fait un tour ?;Le magicien fait-il un tour ?;Le magicien fait un tour ?} {int::Vous croyez à la magie.>Est-ce que vous croyez à la magie ?;Croyez-vous à la magie ?;Vous croyez à la magie ?} {int::Le lapin sort du chapeau.>Est-ce que le lapin sort du chapeau ?;Le lapin sort-il du chapeau ?;Le lapin sort du chapeau ?} {int::Tu as peur du clown.>Est-ce que tu as peur du clown ?;As-tu peur du clown ?;Tu as peur du clown ?} {int::Les enfants rient.>Est-ce que les enfants rient ?;Les enfants rient-ils ?;Les enfants rient ?} {int::Nous applaudissons fort.>Est-ce que nous applaudissons fort ?;Applaudissons-nous fort ?;Nous applaudissons fort ?} {int::Tu aimes les marionnettes.>Est-ce que tu aimes les marionnettes ?;Aimes-tu les marionnettes ?;Tu aimes les marionnettes ?} {int::La danseuse tourne sur elle-même.>Est-ce que la danseuse tourne sur elle-même ?;La danseuse tourne-t-elle sur elle-même ?;La danseuse tourne sur elle-même ?} {int::Vous restez jusqu'à la fin.>Est-ce que vous restez jusqu'à la fin ?;Restez-vous jusqu'à la fin ?;Vous restez jusqu'à la fin ?} {int::Le spectacle dure longtemps.>Est-ce que le spectacle dure longtemps ?;Le spectacle dure-t-il longtemps ?;Le spectacle dure longtemps ?} {int::Tu veux revenir demain.>Est-ce que tu veux revenir demain ?;Veux-tu revenir demain ?;Tu veux revenir demain ?} {int::Nous rentrons à pied.>Est-ce que nous rentrons à pied ?;Rentrons-nous à pied ?;Nous rentrons à pied ?}"}], "ce-neg": [{"titre": "Le chat grognon", "texte": "{neg::Le chat mange.>Le chat ne mange pas.} {neg::Il dort sur le lit.>Il ne dort pas sur le lit.} {neg::J'aime les épinards.>Je n'aime pas les épinards.} {neg::Tu viens avec nous.>Tu ne viens pas avec nous.} {neg::Il pleut.>Il ne pleut pas.} {neg::Nous jouons dehors.>Nous ne jouons pas dehors.} {neg::Léo range sa chambre.>Léo ne range pas sa chambre.} {neg::Vous chantez fort.>Vous ne chantez pas fort.} {neg::Le chien aboie.>Le chien n'aboie pas.} {neg::Elle regarde la télévision.>Elle ne regarde pas la télévision.}"}, {"titre": "La journée de Lou", "texte": "{neg::Lou se lève tôt.>Lou ne se lève pas tôt.} {neg::Elle prend son bol.>Elle ne prend pas son bol.} {neg::Elle aime le lait.>Elle n'aime pas le lait.} {neg::Son frère est prêt.>Son frère n'est pas prêt.} {neg::Ils courent vers l'école.>Ils ne courent pas vers l'école.} {neg::La maîtresse arrive en retard.>La maîtresse n'arrive pas en retard.} {neg::Lou oublie son cahier.>Lou n'oublie pas son cahier.} {neg::Elle écrit la date.>Elle n'écrit pas la date.} {neg::Les élèves crient.>Les élèves ne crient pas.} {neg::Lou joue aux billes.>Lou ne joue pas aux billes.} {neg::Elle gagne.>Elle ne gagne pas.} {neg::Ils rentrent à midi.>Ils ne rentrent pas à midi.} {neg::Lou a faim.>Lou n'a pas faim.}"}, {"titre": "Au zoo", "texte": "{neg::Le lion rugit.>Le lion ne rugit pas.} {neg::Les singes dorment.>Les singes ne dorment pas.} {neg::Je vois la girafe.>Je ne vois pas la girafe.} {neg::L'ours sort de sa grotte.>L'ours ne sort pas de sa grotte.} {neg::Tu donnes à manger aux animaux.>Tu ne donnes pas à manger aux animaux.} {neg::Le gardien ouvre la cage.>Le gardien n'ouvre pas la cage.} {neg::Nous avons peur.>Nous n'avons pas peur.} {neg::Le serpent bouge.>Le serpent ne bouge pas.} {neg::Il fait froid.>Il ne fait pas froid.} {neg::Les pingouins nagent.>Les pingouins ne nagent pas.} {neg::Papa prend les photos.>Papa ne prend pas les photos.} {neg::Ma sœur aime les crocodiles.>Ma sœur n'aime pas les crocodiles.} {neg::Vous restez longtemps.>Vous ne restez pas longtemps.} {neg::Le zoo ferme tôt.>Le zoo ne ferme pas tôt.} {neg::Nous sommes fatigués.>Nous ne sommes pas fatigués.} {neg::Je veux partir.>Je ne veux pas partir.}"}, {"titre": "Un drôle de rêve", "texte": "{neg::Cette nuit, je dors bien.>Cette nuit, je ne dors pas bien.} {neg::Je suis dans mon lit.>Je ne suis pas dans mon lit.} {neg::Je vole au-dessus de la ville.>Je ne vole pas au-dessus de la ville.} {neg::Les oiseaux chantent.>Les oiseaux ne chantent pas.} {neg::Le ciel est bleu.>Le ciel n'est pas bleu.} {neg::Il fait jour.>Il ne fait pas jour.} {neg::Je vois ma maison.>Je ne vois pas ma maison.} {neg::Mon chat me suit.>Mon chat ne me suit pas.} {neg::Il miaule.>Il ne miaule pas.} {neg::Les gens me regardent.>Les gens ne me regardent pas.} {neg::Je tombe.>Je ne tombe pas.} {neg::Je glisse sur un nuage.>Je ne glisse pas sur un nuage.} {neg::Le nuage est mou.>Le nuage n'est pas mou.} {neg::J'entends le réveil.>Je n'entends pas le réveil.} {neg::Maman m'appelle.>Maman ne m'appelle pas.} {neg::J'ouvre les yeux.>Je n'ouvre pas les yeux.} {neg::Le soleil brille.>Le soleil ne brille pas.} {neg::Je veux me lever.>Je ne veux pas me lever.} {neg::Ce rêve est fini.>Ce rêve n'est pas fini.} {neg::Je raconte mon rêve.>Je ne raconte pas mon rêve.}"}], "ce-imper": [{"titre": "Avant de partir", "texte": "{imp::Tu ranges ta chambre.>Range ta chambre.} {imp::Tu mets ton manteau.>Mets ton manteau.} {imp::Tu prends ton sac.>Prends ton sac.} {imp::Vous fermez la porte.>Fermez la porte.} {imp::Nous partons vite.>Partons vite.} {imp::Tu éteins la lumière.>Éteins la lumière.} {imp::Vous attendez ici.>Attendez ici.} {imp::Tu chantes avec nous.>Chante avec nous.} {imp::Nous marchons ensemble.>Marchons ensemble.} {imp::Tu donnes la main à ta sœur.>Donne la main à ta sœur.}"}, {"titre": "En classe", "texte": "{imp::Vous sortez vos cahiers.>Sortez vos cahiers.} {imp::Tu écris la date.>Écris la date.} {imp::Tu lis la consigne.>Lis la consigne.} {imp::Vous levez le doigt.>Levez le doigt.} {imp::Nous copions la poésie.>Copions la poésie.} {imp::Tu soulignes le titre.>Souligne le titre.} {imp::Vous rangez vos crayons.>Rangez vos crayons.} {imp::Tu prêtes ta gomme à Tom.>Prête ta gomme à Tom.} {imp::Nous écoutons la maîtresse.>Écoutons la maîtresse.} {imp::Tu fais attention.>Fais attention.} {imp::Vous travaillez en silence.>Travaillez en silence.} {imp::Tu effaces le tableau.>Efface le tableau.} {imp::Nous sortons en récréation.>Sortons en récréation.}"}, {"titre": "La recette des crêpes", "texte": "{imp::Tu prends un grand saladier.>Prends un grand saladier.} {imp::Tu verses la farine.>Verse la farine.} {imp::Tu casses les œufs.>Casse les œufs.} {imp::Vous ajoutez le lait.>Ajoutez le lait.} {imp::Tu mélanges doucement.>Mélange doucement.} {imp::Nous laissons reposer la pâte.>Laissons reposer la pâte.} {imp::Vous chauffez la poêle.>Chauffez la poêle.} {imp::Tu mets un peu de beurre.>Mets un peu de beurre.} {imp::Tu verses une louche de pâte.>Verse une louche de pâte.} {imp::Vous attendez une minute.>Attendez une minute.} {imp::Tu retournes la crêpe.>Retourne la crêpe.} {imp::Nous posons la crêpe sur l'assiette.>Posons la crêpe sur l'assiette.} {imp::Tu ajoutes du sucre.>Ajoute du sucre.} {imp::Vous goûtez.>Goûtez.} {imp::Tu fais une autre crêpe.>Fais une autre crêpe.} {imp::Nous mangeons tous ensemble.>Mangeons tous ensemble.}"}, {"titre": "Le jeu de piste", "texte": "{imp::Vous formez des équipes.>Formez des équipes.} {imp::Tu prends la carte.>Prends la carte.} {imp::Tu lis le premier message.>Lis le premier message.} {imp::Nous cherchons le grand chêne.>Cherchons le grand chêne.} {imp::Vous comptez dix pas.>Comptez dix pas.} {imp::Tu tournes à gauche.>Tourne à gauche.} {imp::Tu regardes sous la pierre.>Regarde sous la pierre.} {imp::Vous ouvrez l'enveloppe.>Ouvrez l'enveloppe.} {imp::Nous suivons le ruisseau.>Suivons le ruisseau.} {imp::Tu traverses le petit pont.>Traverse le petit pont.} {imp::Vous restez groupés.>Restez groupés.} {imp::Tu cours jusqu'à la cabane.>Cours jusqu'à la cabane.} {imp::Tu frappes trois fois.>Frappe trois fois.} {imp::Nous attendons la réponse.>Attendons la réponse.} {imp::Vous entrez sans bruit.>Entrez sans bruit.} {imp::Tu cherches le coffre.>Cherche le coffre.} {imp::Tu soulèves le couvercle.>Soulève le couvercle.} {imp::Vous partagez le trésor.>Partagez le trésor.} {imp::Nous rentrons au camp.>Rentrons au camp.} {imp::Tu racontes notre aventure.>Raconte notre aventure.}"}], "ce-transfo": [{"titre": "Le matin", "texte": "{neg::Je dors.>Je ne dors pas.} {int::Tu viens avec moi.>Est-ce que tu viens avec moi ?;Viens-tu avec moi ?;Tu viens avec moi ?} {imp::Tu fermes la fenêtre.>Ferme la fenêtre.} {aff::Il ne fait pas beau.>Il fait beau.} {neg::Le café est chaud.>Le café n'est pas chaud.} {int::Papa part tôt.>Est-ce que papa part tôt ?;Papa part-il tôt ?;Papa part tôt ?} {imp::Vous mangez vite.>Mangez vite.} {aff::Je ne trouve pas mes chaussures.>Je trouve mes chaussures.} {neg::Le bus arrive.>Le bus n'arrive pas.} {int::Tu as ton sac.>Est-ce que tu as ton sac ?;As-tu ton sac ?;Tu as ton sac ?}"}, {"titre": "Le jardin", "texte": "{int::Tu arroses les fleurs.>Est-ce que tu arroses les fleurs ?;Arroses-tu les fleurs ?;Tu arroses les fleurs ?} {neg::Les tomates sont rouges.>Les tomates ne sont pas rouges.} {imp::Tu ramasses les feuilles.>Ramasse les feuilles.} {aff::Le chat ne dort pas.>Le chat dort.} {int::Les fraises poussent.>Est-ce que les fraises poussent ?;Les fraises poussent-elles ?;Les fraises poussent ?} {neg::Il pleut.>Il ne pleut pas.} {imp::Nous plantons des radis.>Plantons des radis.} {aff::Papi ne coupe pas l'herbe.>Papi coupe l'herbe.} {neg::Le chien creuse un trou.>Le chien ne creuse pas un trou.} {int::Vous aimez les carottes.>Est-ce que vous aimez les carottes ?;Aimez-vous les carottes ?;Vous aimez les carottes ?} {imp::Tu fermes le portail.>Ferme le portail.}"}, {"titre": "La piscine", "texte": "{neg::L'eau est froide.>L'eau n'est pas froide.} {int::Tu sais plonger.>Est-ce que tu sais plonger ?;Sais-tu plonger ?;Tu sais plonger ?} {imp::Tu mets ton bonnet.>Mets ton bonnet.} {aff::Je ne nage pas vite.>Je nage vite.} {int::Le maître-nageur surveille les enfants.>Est-ce que le maître-nageur surveille les enfants ?;Le maître-nageur surveille-t-il les enfants ?;Le maître-nageur surveille les enfants ?} {neg::Ma sœur a peur.>Ma sœur n'a pas peur.} {imp::Vous sautez dans l'eau.>Sautez dans l'eau.} {aff::Tom ne trouve pas ses lunettes.>Tom trouve ses lunettes.} {int::Nous restons longtemps.>Est-ce que nous restons longtemps ?;Restons-nous longtemps ?;Nous restons longtemps ?} {neg::J'aime le grand bassin.>Je n'aime pas le grand bassin.} {imp::Nous faisons la course.>Faisons la course.} {aff::Il ne fait pas chaud.>Il fait chaud.}"}, {"titre": "L'anniversaire", "texte": "{int::Tu viens à ma fête.>Est-ce que tu viens à ma fête ?;Viens-tu à ma fête ?;Tu viens à ma fête ?} {neg::Les ballons sont gonflés.>Les ballons ne sont pas gonflés.} {imp::Tu allumes les bougies.>Allume les bougies.} {aff::Lina ne souffle pas.>Lina souffle.} {int::Vous chantez avec nous.>Est-ce que vous chantez avec nous ?;Chantez-vous avec nous ?;Vous chantez avec nous ?} {neg::Le gâteau est prêt.>Le gâteau n'est pas prêt.} {imp::Vous ouvrez les cadeaux.>Ouvrez les cadeaux.} {aff::Je n'aime pas le chocolat.>J'aime le chocolat.} {int::Tu as un cadeau.>Est-ce que tu as un cadeau ?;As-tu un cadeau ?;Tu as un cadeau ?} {neg::Mes amis partent.>Mes amis ne partent pas.} {imp::Nous dansons ensemble.>Dansons ensemble.} {int::La fête est finie.>Est-ce que la fête est finie ?;La fête est-elle finie ?;La fête est finie ?} {aff::Lina n'est pas contente.>Lina est contente.}"}, {"titre": "La forêt", "texte": "{neg::Nous marchons vite.>Nous ne marchons pas vite.} {int::Tu entends le pic-vert.>Est-ce que tu entends le pic-vert ?;Entends-tu le pic-vert ?;Tu entends le pic-vert ?} {imp::Tu restes sur le sentier.>Reste sur le sentier.} {aff::Les arbres ne bougent pas.>Les arbres bougent.} {int::Le renard dort.>Est-ce que le renard dort ?;Le renard dort-il ?;Le renard dort ?} {neg::Il fait sombre.>Il ne fait pas sombre.} {imp::Vous regardez ce champignon.>Regardez ce champignon.} {aff::Je ne vois pas l'écureuil.>Je vois l'écureuil.} {neg::Le ruisseau coule vite.>Le ruisseau ne coule pas vite.} {int::Vous connaissez ce chemin.>Est-ce que vous connaissez ce chemin ?;Connaissez-vous ce chemin ?;Vous connaissez ce chemin ?} {imp::Tu ramasses des pommes de pin.>Ramasse des pommes de pin.} {aff::Papa ne trouve pas la sortie.>Papa trouve la sortie.} {int::Nous rentrons bientôt.>Est-ce que nous rentrons bientôt ?;Rentrons-nous bientôt ?;Nous rentrons bientôt ?} {neg::Je suis fatigué.>Je ne suis pas fatigué.}"}, {"titre": "À la bibliothèque", "texte": "{int::Tu aimes les livres.>Est-ce que tu aimes les livres ?;Aimes-tu les livres ?;Tu aimes les livres ?} {neg::La bibliothèque est ouverte.>La bibliothèque n'est pas ouverte.} {imp::Tu choisis un livre.>Choisis un livre.} {aff::Je ne connais pas cette histoire.>Je connais cette histoire.} {int::Zoé lit une bande dessinée.>Est-ce que Zoé lit une bande dessinée ?;Zoé lit-elle une bande dessinée ?;Zoé lit une bande dessinée ?} {neg::Mon frère parle fort.>Mon frère ne parle pas fort.} {imp::Vous parlez tout bas.>Parlez tout bas.} {aff::Le livre n'est pas abîmé.>Le livre est abîmé.} {neg::Nous restons longtemps.>Nous ne restons pas longtemps.} {int::Tu prends ta carte.>Est-ce que tu prends ta carte ?;Prends-tu ta carte ?;Tu prends ta carte ?} {imp::Tu rends les livres.>Rends les livres.} {aff::La dame ne sourit pas.>La dame sourit.} {int::Vous revenez samedi.>Est-ce que vous revenez samedi ?;Revenez-vous samedi ?;Vous revenez samedi ?} {neg::J'emprunte trois livres.>Je n'emprunte pas trois livres.} {imp::Nous rangeons les albums.>Rangeons les albums.}"}, {"titre": "Le marché", "texte": "{neg::Les fruits sont mûrs.>Les fruits ne sont pas mûrs.} {int::Tu portes le panier.>Est-ce que tu portes le panier ?;Portes-tu le panier ?;Tu portes le panier ?} {imp::Tu choisis des pêches.>Choisis des pêches.} {aff::Le marchand ne crie pas.>Le marchand crie.} {int::Les fraises coûtent cher.>Est-ce que les fraises coûtent cher ?;Les fraises coûtent-elles cher ?;Les fraises coûtent cher ?} {neg::Maman achète le poisson.>Maman n'achète pas le poisson.} {imp::Vous attendez votre tour.>Attendez votre tour.} {aff::Je n'aime pas les olives.>J'aime les olives.} {int::Tu veux du fromage.>Est-ce que tu veux du fromage ?;Veux-tu du fromage ?;Tu veux du fromage ?} {neg::Il fait froid.>Il ne fait pas froid.} {imp::Nous goûtons ce melon.>Goûtons ce melon.} {aff::Le fromager ne coupe pas le comté.>Le fromager coupe le comté.} {int::Vous payez ici.>Est-ce que vous payez ici ?;Payez-vous ici ?;Vous payez ici ?} {neg::J'oublie la monnaie.>Je n'oublie pas la monnaie.} {imp::Tu portes ce sac.>Porte ce sac.}"}, {"titre": "Le bricolage", "texte": "{int::Tu as les ciseaux.>Est-ce que tu as les ciseaux ?;As-tu les ciseaux ?;Tu as les ciseaux ?} {neg::La colle sèche vite.>La colle ne sèche pas vite.} {imp::Tu découpes le carton.>Découpe le carton.} {aff::Le pinceau n'est pas propre.>Le pinceau est propre.} {int::Papa tient la planche.>Est-ce que papa tient la planche ?;Papa tient-il la planche ?;Papa tient la planche ?} {neg::Je trouve les clous.>Je ne trouve pas les clous.} {imp::Vous peignez la boîte en bleu.>Peignez la boîte en bleu.} {aff::Mon frère ne m'aide pas.>Mon frère m'aide.} {neg::Le marteau est lourd.>Le marteau n'est pas lourd.} {int::Nous faisons une cabane.>Est-ce que nous faisons une cabane ?;Faisons-nous une cabane ?;Nous faisons une cabane ?} {imp::Tu tiens le clou.>Tiens le clou.} {aff::La porte ne ferme pas.>La porte ferme.} {int::Tu aimes le bricolage.>Est-ce que tu aimes le bricolage ?;Aimes-tu le bricolage ?;Tu aimes le bricolage ?} {neg::Le vernis brille.>Le vernis ne brille pas.} {imp::Nous rangeons les outils.>Rangeons les outils.} {aff::Je ne suis pas fier.>Je suis fier.}"}, {"titre": "Au parc", "texte": "{neg::Les balançoires sont libres.>Les balançoires ne sont pas libres.} {int::Tu joues au toboggan.>Est-ce que tu joues au toboggan ?;Joues-tu au toboggan ?;Tu joues au toboggan ?} {imp::Tu montes sur le tourniquet.>Monte sur le tourniquet.} {aff::Le parc n'est pas ouvert.>Le parc est ouvert.} {int::Les canards mangent du pain.>Est-ce que les canards mangent du pain ?;Les canards mangent-ils du pain ?;Les canards mangent du pain ?} {neg::Mon frère court vite.>Mon frère ne court pas vite.} {imp::Vous donnez à manger aux canards.>Donnez à manger aux canards.} {aff::Je ne vois pas mes amis.>Je vois mes amis.} {neg::Le marchand vend des glaces.>Le marchand ne vend pas des glaces.} {int::Vous venez souvent.>Est-ce que vous venez souvent ?;Venez-vous souvent ?;Vous venez souvent ?} {imp::Tu lances le ballon.>Lance le ballon.} {aff::Il ne fait pas soleil.>Il fait soleil.} {int::Tu as soif.>Est-ce que tu as soif ?;As-tu soif ?;Tu as soif ?} {neg::J'aime la balançoire.>Je n'aime pas la balançoire.} {imp::Nous jouons à cache-cache.>Jouons à cache-cache.} {aff::Le gardien ne ferme pas la grille.>Le gardien ferme la grille.} {int::Nous rentrons maintenant.>Est-ce que nous rentrons maintenant ?;Rentrons-nous maintenant ?;Nous rentrons maintenant ?}"}, {"titre": "La cabane", "texte": "{int::Tu construis une cabane.>Est-ce que tu construis une cabane ?;Construis-tu une cabane ?;Tu construis une cabane ?} {neg::Les planches sont lourdes.>Les planches ne sont pas lourdes.} {imp::Tu cherches des branches.>Cherche des branches.} {aff::Le toit n'est pas solide.>Le toit est solide.} {int::Ton cousin vient aussi.>Est-ce que ton cousin vient aussi ?;Ton cousin vient-il aussi ?;Ton cousin vient aussi ?} {neg::Je monte à l'échelle.>Je ne monte pas à l'échelle.} {imp::Vous attachez la corde.>Attachez la corde.} {aff::La porte ne s'ouvre pas.>La porte s'ouvre.} {neg::Il pleut.>Il ne pleut pas.} {int::Vous avez des clous.>Est-ce que vous avez des clous ?;Avez-vous des clous ?;Vous avez des clous ?} {imp::Tu passes le marteau.>Passe le marteau.} {aff::Nous n'avons pas fini.>Nous avons fini.} {int::La cabane est grande.>Est-ce que la cabane est grande ?;La cabane est-elle grande ?;La cabane est grande ?} {neg::Mon chien aboie.>Mon chien n'aboie pas.} {imp::Nous peignons la porte.>Peignons la porte.} {aff::Maman ne vient pas voir.>Maman vient voir.} {int::Tu aimes notre cabane.>Est-ce que tu aimes notre cabane ?;Aimes-tu notre cabane ?;Tu aimes notre cabane ?} {neg::Je veux dormir dedans.>Je ne veux pas dormir dedans.}"}, {"titre": "La classe verte", "texte": "{neg::Nous partons demain.>Nous ne partons pas demain.} {int::Tu as ton sac de couchage.>Est-ce que tu as ton sac de couchage ?;As-tu ton sac de couchage ?;Tu as ton sac de couchage ?} {imp::Tu prépares ta valise.>Prépare ta valise.} {aff::Je ne suis pas content.>Je suis content.} {int::Le car arrive.>Est-ce que le car arrive ?;Le car arrive-t-il ?;Le car arrive ?} {neg::La route est longue.>La route n'est pas longue.} {imp::Vous restez assis.>Restez assis.} {aff::Le chalet n'est pas grand.>Le chalet est grand.} {int::Tu dors avec Tom.>Est-ce que tu dors avec Tom ?;Dors-tu avec Tom ?;Tu dors avec Tom ?} {neg::Il neige.>Il ne neige pas.} {imp::Tu mets tes bottes.>Mets tes bottes.} {aff::Les moniteurs ne sont pas sévères.>Les moniteurs sont sévères.} {int::Nous faisons du ski.>Est-ce que nous faisons du ski ?;Faisons-nous du ski ?;Nous faisons du ski ?} {neg::Je tombe.>Je ne tombe pas.} {imp::Vous suivez le moniteur.>Suivez le moniteur.} {aff::Lina n'a pas froid.>Lina a froid.} {int::Vous écrivez à vos parents.>Est-ce que vous écrivez à vos parents ?;Écrivez-vous à vos parents ?;Vous écrivez à vos parents ?} {neg::La semaine passe vite.>La semaine ne passe pas vite.} {imp::Nous chantons au coin du feu.>Chantons au coin du feu.}"}, {"titre": "Le grand voyage", "texte": "{int::Tu pars en vacances.>Est-ce que tu pars en vacances ?;Pars-tu en vacances ?;Tu pars en vacances ?} {neg::La valise est prête.>La valise n'est pas prête.} {imp::Tu vérifies les billets.>Vérifie les billets.} {aff::Le train n'est pas en retard.>Le train est en retard.} {int::Vous prenez l'avion.>Est-ce que vous prenez l'avion ?;Prenez-vous l'avion ?;Vous prenez l'avion ?} {neg::J'aime les voyages.>Je n'aime pas les voyages.} {imp::Vous montrez vos passeports.>Montrez vos passeports.} {aff::Mon frère ne dort pas.>Mon frère dort.} {neg::L'avion décolle.>L'avion ne décolle pas.} {int::Tu vois les nuages.>Est-ce que tu vois les nuages ?;Vois-tu les nuages ?;Tu vois les nuages ?} {imp::Tu attaches ta ceinture.>Attache ta ceinture.} {aff::Je n'ai pas peur.>J'ai peur.} {int::Nous arrivons bientôt.>Est-ce que nous arrivons bientôt ?;Arrivons-nous bientôt ?;Nous arrivons bientôt ?} {neg::Il fait chaud.>Il ne fait pas chaud.} {imp::Nous descendons de l'avion.>Descendons de l'avion.} {aff::La plage n'est pas loin.>La plage est loin.} {int::Tu entends la mer.>Est-ce que tu entends la mer ?;Entends-tu la mer ?;Tu entends la mer ?} {neg::Nous sommes fatigués.>Nous ne sommes pas fatigués.} {imp::Tu ranges tes affaires.>Range tes affaires.} {aff::Les vacances ne commencent pas.>Les vacances commencent.}"}]});
Object.assign(TRANSFOS, {"cm-accsv": [{"titre": "Au gymnase", "texte": "Les élèves de la classe {v::(courir)>courent} autour du gymnase. Le professeur les {v::(encourager)>encourage} . Tom et Lina {v::(sauter)>sautent} par-dessus la poutre. Où {v::(être)>sont} les ballons ? Dans le placard {v::(dormir)>dorment} les cerceaux. Vous {v::(ranger)>rangez} les tapis. Le bruit des ballons {v::(résonner)>résonne} . Nous {v::(finir)>finissons} la séance. Les filles {v::(applaudir)>applaudissent} . Chacun {v::(rentrer)>rentre} en classe."}, {"titre": "Le zoo", "texte": "Au zoo {v::(vivre)>vivent} des animaux du monde entier. Le cri des singes {v::(attirer)>attire} les visiteurs. Les girafes et les zèbres {v::(partager)>partagent} un grand enclos. Dans l'eau {v::(nager)>nagent} les otaries. Le soigneur leur {v::(lancer)>lance} des poissons. Les enfants de l'école {v::(prendre)>prennent} des photos. Toi et moi {v::(regarder)>regardons} le lion. Il {v::(dormir)>dort} . Les visiteurs {v::(attendre)>attendent} . Que {v::(faire)>font} les ours ? Ils {v::(manger)>mangent} des fruits. Chacun de nous {v::(choisir)>choisit} son animal préféré. Vous {v::(revenir)>revenez} demain ?"}, {"titre": "La chorale", "texte": "Les voix de la chorale {v::(remplir)>remplissent} l'église. Le chef de chœur {v::(lever)>lève} les bras. Les sopranos et les altos {v::(chanter)>chantent} ensemble. Derrière eux {v::(se tenir)>se tiennent} les ténors. Le public les {v::(écouter)>écoute} en silence. Ma mère et ma tante {v::(être)>sont} au premier rang. Elles {v::(sourire)>sourient} . Toi et ton frère {v::(chanter)>chantez} juste. La partition des chanteurs {v::(tomber)>tombe} . Personne ne {v::(bouger)>bouge} . Le pianiste et la violoniste {v::(continuer)>continuent} . À la fin {v::(retentir)>retentissent} les applaudissements. Nous {v::(saluer)>saluons} le public. Les spectateurs {v::(se lever)>se lèvent} . Le concert {v::(finir)>finit} . Tout le monde {v::(rentrer)>rentre} ravi."}, {"titre": "Le village médiéval", "texte": "Au pied du château {v::(s'étendre)>s'étend} le village. Les maisons des paysans {v::(être)>sont} petites. Le forgeron et son apprenti {v::(frapper)>frappent} le fer. Dans les champs {v::(travailler)>travaillent} les serfs. Le seigneur les {v::(surveiller)>surveille} . Les murs du château {v::(protéger)>protègent} les habitants. Toi et moi {v::(imaginer)>imaginons} cette vie. Les enfants du village {v::(garder)>gardent} les moutons. Le meunier et sa femme {v::(moudre)>moulent} le grain. Que {v::(vendre)>vendent} les marchands ? Ils {v::(vendre)>vendent} des étoffes. Chaque dimanche, les villageois {v::(aller)>vont} à l'église. Le son des cloches {v::(appeler)>appelle} les fidèles. Vous {v::(entendre)>entendez} ces cloches ? Les fêtes du village {v::(réunir)>réunissent} tout le monde. Les jongleurs {v::(amuser)>amusent} la foule. Le seigneur et la dame {v::(offrir)>offrent} un banquet. Les musiciens {v::(jouer)>jouent} . Personne ne {v::(dormir)>dort} . La nuit {v::(tomber)>tombe} ."}], "cm-accatt": [{"titre": "Les vacances", "texte": "Les enfants sont {pp::(parti)>partis} en vacances. Ils sont {att::(content)>contents} . Leur maison paraît {att::(vide)>vide} . Ma sœur est {pp::(allé)>allée} chez mamie. Elle semble {att::(heureux)>heureuse} . Mes cousines sont {pp::(arrivé)>arrivées} hier. Elles sont {att::(fatigué)>fatiguées} . Les volets restent {att::(fermé)>fermés} . La rue devient {att::(calme)>calme} . Nous sommes {pp::(resté)>restés;restées} en ville."}, {"titre": "La course", "texte": "Les coureurs sont {pp::(arrivé)>arrivés} au stade. Ils semblent {att::(épuisé)>épuisés} . Léa est {pp::(tombé)>tombée} dans le dernier virage. Elle est {att::(déçu)>déçue} . Ses amies sont {pp::(venu)>venues} l'aider. La piste est {att::(glissant)>glissante} . Les juges paraissent {att::(attentif)>attentifs} . Les gagnantes sont {pp::(monté)>montées} sur le podium. Elles sont {att::(fier)>fières} . La foule est {att::(enthousiaste)>enthousiaste} . Les médailles sont {att::(doré)>dorées} . Le soir, les athlètes sont {pp::(rentré)>rentrés} chez eux. Ils sont {att::(ravi)>ravis} ."}, {"titre": "La sortie en mer", "texte": "Ce matin, Inès et Chloé sont {pp::(parti)>parties} en bateau. La mer était {att::(calme)>calme} . Le ciel paraissait {att::(clair)>clair} . Elles sont {pp::(sorti)>sorties} du port à huit heures. Les vagues sont {pp::(devenu)>devenues} plus hautes. Chloé est {pp::(resté)>restée} à la barre. Elle semblait {att::(sûr)>sûre} d'elle. Inès était {att::(inquiet)>inquiète} . Les voiles sont {pp::(tombé)>tombées} . Les deux amies sont {pp::(rentré)>rentrées} au port. Elles étaient {att::(trempé)>trempées} . Leurs parents sont {pp::(venu)>venus} les chercher. Ils paraissaient {att::(soulagé)>soulagés} . Les filles sont {pp::(allé)>allées} se changer. Elles sont {att::(heureux)>heureuses} de leur aventure. La mer est {pp::(redevenu)>redevenue} calme."}, {"titre": "Les explorateurs", "texte": "Les explorateurs sont {pp::(arrivé)>arrivés} au pied de la montagne. La route avait été {att::(long)>longue} . Les porteurs semblaient {att::(épuisé)>épuisés} . Deux guides sont {pp::(parti)>partis} en éclaireurs. La neige était {att::(profond)>profonde} . Les tentes sont {pp::(resté)>restées} au camp. La cheffe de l'expédition est {pp::(monté)>montée} la première. Elle paraissait {att::(confiant)>confiante} . Ses compagnes sont {pp::(venu)>venues} la rejoindre. Les pentes devenaient {att::(dangereux)>dangereuses} . Une avalanche est {pp::(descendu)>descendue} sur le versant nord. Les alpinistes sont {pp::(resté)>restés} {att::(immobile)>immobiles} . Enfin, ils sont {pp::(arrivé)>arrivés} au sommet. La vue était {att::(splendide)>splendide} . Les grimpeuses étaient {att::(ému)>émues} . Leurs familles sont {pp::(resté)>restées} {att::(inquiet)>inquiètes} jusqu'au retour. La descente a été {att::(facile)>facile} . Toute l'équipe est {pp::(revenu)>revenue} saine et sauve."}], "cm-bilanacc": [{"titre": "La rentrée", "texte": "Les {nc::(élève)>élèves} {v::(entrer)>entrent} en classe. Ils sont {att::(impatient)>impatients} . La maîtresse {v::(distribuer)>distribue} des cahiers {adj::(neuf)>neufs} . Les filles sont {pp::(arrivé)>arrivées} tôt. Les {adj::(nouveau)>nouveaux} {nc::(manuel)>manuels} sont {att::(lourd)>lourds} . Ils {v::(remplir)>remplissent} les cartables."}, {"titre": "Le jardin", "texte": "Dans le jardin {v::(pousser)>poussent} des {nc::(rose)>roses} {adj::(parfumé)>parfumées} . Mon père et moi {v::(arroser)>arrosons} les {nc::(salade)>salades} . Les tomates sont {att::(mûr)>mûres} . Les oiseaux sont {pp::(revenu)>revenus} . Ils {v::(chanter)>chantent} . Les {nc::(abeille)>abeilles} {v::(butiner)>butinent} les fleurs {adj::(violet)>violettes} ."}, {"titre": "La forêt", "texte": "Les {adj::(grand)>grands} {nc::(chêne)>chênes} de la forêt {v::(perdre)>perdent} leurs feuilles. Les sentiers deviennent {att::(boueux)>boueux} . Les biches sont {pp::(sorti)>sorties} du bois. Elles {v::(sembler)>semblent} {att::(craintif)>craintives} . Le bruit des chasseurs les {v::(effrayer)>effraie} . Les {nc::(champignon)>champignons} {v::(pousser)>poussent} . Les {nc::(feuille)>feuilles} sont {att::(rouge)>rouges} ."}, {"titre": "Le marché de Noël", "texte": "Sur la place {v::(briller)>brillent} des {nc::(guirlande)>guirlandes} {adj::(lumineux)>lumineuses} . Les marchands {v::(vendre)>vendent} des {nc::(jouet)>jouets} en bois. Les enfants sont {att::(émerveillé)>émerveillés} . Ma tante est {pp::(venu)>venue} avec nous. Elle {v::(acheter)>achète} des {nc::(boule)>boules} {adj::(doré)>dorées} . Le froid {v::(piquer)>pique} les joues. Les vitrines sont {att::(illuminé)>illuminées} . Nous {v::(rentrer)>rentrons} ."}, {"titre": "Le chantier", "texte": "Les ouvriers du chantier {v::(construire)>construisent} une école. Les murs sont {att::(solide)>solides} . Les {nc::(grue)>grues} {adj::(jaune)>jaunes} {v::(soulever)>soulèvent} des poutres {adj::(lourd)>lourdes} . Les camions sont {pp::(arrivé)>arrivés} ce matin. Le bruit des machines {v::(gêner)>gêne} les voisins. Ils {v::(paraître)>paraissent} {att::(agacé)>agacés} . Les travaux {v::(durer)>durent} . Les voisins sont {pp::(venu)>venus} se plaindre. Le chef de chantier les {v::(écouter)>écoute} . Il {v::(promettre)>promet} des efforts."}, {"titre": "La plage", "texte": "Sur la plage {v::(courir)>courent} des {nc::(enfant)>enfants} {adj::(joyeux)>joyeux} . Les vagues sont {att::(haut)>hautes} . Ma sœur et ma cousine {v::(construire)>construisent} un château. Elles sont {pp::(resté)>restées} au soleil. Leurs épaules {v::(devenir)>deviennent} {att::(rouge)>rouges} . Les {nc::(mouette)>mouettes} {adj::(blanc)>blanches} {v::(crier)>crient} . Les parents {v::(lire)>lisent} . Le sable est {att::(brûlant)>brûlant} . Les {nc::(serviette)>serviettes} sont {att::(mouillé)>mouillées} ."}, {"titre": "Les pompiers", "texte": "Les pompiers sont {pp::(arrivé)>arrivés} très vite. Ils {v::(dérouler)>déroulent} leurs {nc::(tuyau)>tuyaux} . Les flammes sont {att::(impressionnant)>impressionnantes} . Les habitants de l'immeuble {v::(sortir)>sortent} . Une vieille dame et son chat {v::(attendre)>attendent} sur le balcon. Les pompiers les {v::(secourir)>secourent} . Ils sont {att::(courageux)>courageux} . Les {nc::(voisin)>voisins} {adj::(inquiet)>inquiets} {v::(applaudir)>applaudissent} . La rue est {pp::(redevenu)>redevenue} calme. Les {nc::(dégât)>dégâts} sont {att::(important)>importants} . Les gendarmes {v::(bloquer)>bloquent} la rue."}, {"titre": "Le voyage en Égypte", "texte": "Les touristes sont {pp::(arrivé)>arrivés} au Caire. Ils {v::(visiter)>visitent} les {nc::(pyramide)>pyramides} . Elles sont {att::(gigantesque)>gigantesques} . Devant eux {v::(se dresser)>se dresse} le Sphinx. Les {nc::(guide)>guides} {adj::(égyptien)>égyptiens} {v::(raconter)>racontent} l'histoire des pharaons. Les tombeaux {v::(sembler)>semblent} {att::(mystérieux)>mystérieux} . Ma mère et moi {v::(prendre)>prenons} des {nc::(photo)>photos} . Les enfants sont {att::(fasciné)>fascinés} . Le soir, les touristes sont {pp::(rentré)>rentrés} à l'hôtel. Ils sont {att::(épuisé)>épuisés} . Les chambres {v::(être)>sont} fraîches."}, {"titre": "La fête du village", "texte": "La fête du village {v::(commencer)>commence} . Sur la place {v::(se dresser)>se dressent} des {nc::(manège)>manèges} {adj::(coloré)>colorés} . Les musiciens sont {pp::(arrivé)>arrivés} de la ville voisine. Ils {v::(jouer)>jouent} des {nc::(air)>airs} {adj::(joyeux)>joyeux} . Les danseuses sont {att::(élégant)>élégantes} . Les habitants {v::(danser)>dansent} . Les enfants {v::(manger)>mangent} des {nc::(barbe)>barbes} à papa. Ils sont {att::(ravi)>ravis} . Mes grands-parents sont {pp::(resté)>restés} jusqu'au feu d'artifice. Les {nc::(fusée)>fusées} {adj::(multicolore)>multicolores} {v::(éclairer)>éclairent} le ciel."}, {"titre": "Le laboratoire", "texte": "Dans le laboratoire, les {nc::(chercheur)>chercheurs} {v::(observer)>observent} des {nc::(cellule)>cellules} au microscope. Les résultats sont {att::(surprenant)>surprenants} . Une {adj::(jeune)>jeune} chercheuse et son assistant {v::(noter)>notent} chaque détail. Les éprouvettes sont {att::(fragile)>fragiles} . Les savants sont {pp::(venu)>venus} de plusieurs pays. Ils {v::(travailler)>travaillent} ensemble. Leurs découvertes {v::(paraître)>paraissent} {att::(important)>importantes} . Les {nc::(journaliste)>journalistes} {adj::(curieux)>curieux} {v::(attendre)>attendent} . La directrice est {pp::(sorti)>sortie} les accueillir. Les visiteurs sont {pp::(reparti)>repartis} le soir. Ils étaient {att::(impressionné)>impressionnés} . Le laboratoire {v::(fermer)>ferme} ."}, {"titre": "Les Jeux olympiques", "texte": "Les athlètes du monde entier {v::(se réunir)>se réunissent} au stade. Les {nc::(drapeau)>drapeaux} {adj::(multicolore)>multicolores} {v::(flotter)>flottent} . Les coureuses sont {pp::(arrivé)>arrivées} sur la piste. Elles sont {att::(concentré)>concentrées} . Le départ {v::(retentir)>retentit} . Les spectateurs {v::(crier)>crient} . Les deux premières {v::(franchir)>franchissent} la ligne ensemble. Les juges {v::(sembler)>semblent} {att::(hésitant)>hésitantes;hésitants} . Les {nc::(caméra)>caméras} {v::(revoir)>revoient} l'arrivée. Les médailles sont {att::(doré)>dorées} . Les gagnantes sont {pp::(monté)>montées} sur le podium. Elles {v::(pleurer)>pleurent} de joie. Les {nc::(photographe)>photographes} {v::(courir)>courent} vers le podium. Ils sont {att::(nombreux)>nombreux} ."}, {"titre": "Le grand incendie", "texte": "Cette nuit-là, les {nc::(flamme)>flammes} {v::(dévorer)>dévorent} la forêt. Les arbres sont {att::(sec)>secs} . Les {nc::(pompier)>pompiers} {adj::(épuisé)>épuisés} {v::(combattre)>combattent} le feu. Des avions {v::(larguer)>larguent} de l'eau. Les habitants des villages {v::(quitter)>quittent} leurs maisons. Ils sont {pp::(parti)>partis} en pleine nuit. Les routes sont {att::(bloqué)>bloquées} . Au matin, le vent {v::(tomber)>tombe} . Les {nc::(colline)>collines} {adj::(noir)>noires} {v::(fumer)>fument} encore. Les familles sont {pp::(revenu)>revenues} . Elles {v::(paraître)>paraissent} {att::(désespéré)>désespérées} . Les maires et les gendarmes {v::(organiser)>organisent} les secours. Les forêts {v::(mettre)>mettent} des années à repousser. Les gens sont {att::(triste)>tristes} ."}], "cm-accgn": [{"titre": "Le coffre", "texte": "Dans le grenier, j'ai trouvé un coffre plein de {nc::(bijou)>bijoux} {adj::(ancien)>anciens} . Il y avait des {nc::(collier)>colliers} {adj::(doré)>dorés} , une bague {adj::(blanc)>blanche} et {det::(ce)>ces} perles {adj::(précieux)>précieuses} . Mes {nc::(cousin)>cousins} étaient {att::(jaloux)>jaloux} de {det::(ce)>ce} trésor."}, {"titre": "Les travaux", "texte": "Dans notre rue, les {nc::(travail)>travaux} durent depuis des {nc::(mois)>mois} . De {adj::(gros)>grosses} machines creusent des {nc::(trou)>trous} {adj::(profond)>profonds} . {det::(ce)>Cet} engin est bruyant. Les voisins sont las de {det::(leur)>leurs} nuits {adj::(agité)>agitées} . Les {nc::(journal)>journaux} {adj::(local)>locaux} en parlent. Les {nc::(trottoir)>trottoirs} sont {att::(couvert)>couverts} de {nc::(caillou)>cailloux} ."}, {"titre": "Le marché aux fleurs", "texte": "Le marché aux fleurs ouvre ses {nc::(étal)>étals} le dimanche. On y trouve des roses {adj::(blanc)>blanches} , des tulipes {adj::(violet)>violettes} et des {nc::(lys)>lys} {adj::(parfumé)>parfumés} . {det::(tout)>Toutes} les fleuristes sont {att::(souriant)>souriantes} . {det::(ce)>Cet} arbuste a des feuilles {adj::(doux)>douces} . Les {nc::(chou)>choux} {adj::(décoratif)>décoratifs} plaisent aux {nc::(enfant)>enfants} . Une {adj::(vieux)>vieille} dame achète des {nc::(œillet)>œillets} {adj::(frais)>frais} . Les {nc::(prix)>prix} sont bas."}, {"titre": "Le carnaval de Venise", "texte": "À Venise, pendant le carnaval, les rues {adj::(étroit)>étroites} se remplissent de personnages {adj::(mystérieux)>mystérieux} . Les {nc::(costume)>costumes} sont {att::(somptueux)>somptueux} . Des femmes portent des robes {adj::(long)>longues} et des {nc::(chapeau)>chapeaux} à plumes. {det::(ce)>Cet} homme cache ses {nc::(œil)>yeux} derrière un masque {adj::(blanc)>blanc} . Les gondoles {adj::(noir)>noires} glissent sur les {nc::(canal)>canaux} . Les {nc::(touriste)>touristes} photographient tout. {det::(tout)>Tous} les visiteurs sont {att::(émerveillé)>émerveillés} . Une musique {adj::(doux)>douce} s'élève des {nc::(palais)>palais} {adj::(illuminé)>illuminés} . Les {nc::(festival)>festivals} {adj::(vénitien)>vénitiens} sont {att::(célèbre)>célèbres} dans le monde entier."}]});
Object.assign(TRANSFOS, {"cm-pres": [{"titre": "À la piscine", "texte": "Ce matin, je {(aller)>vais} à la piscine. Mes amis {(venir)>viennent} avec moi. Nous {(prendre)>prenons} le bus. Tu {(vouloir)>veux} venir ? Le maître-nageur nous {(dire)>dit} bonjour. Je {(faire)>fais} des longueurs. Vous {(pouvoir)>pouvez} plonger. Mon frère {(voir)>voit} un copain. Ils {(partir)>partent} à midi. Je {(être)>suis} fatigué."}, {"titre": "Le marché", "texte": "Le samedi, nous {(faire)>faisons} les courses. Maman {(prendre)>prend} la voiture. Nous {(aller)>allons} au marché. Les marchands {(dire)>disent} les prix à voix haute. Tu {(voir)>vois} ces fraises ? Je {(vouloir)>veux} des cerises. « Vous {(pouvoir)>pouvez} goûter », propose le fermier. Mes sœurs {(prendre)>prennent} des fleurs. Papa {(venir)>vient} nous rejoindre. Il {(devoir)>doit} acheter du pain. Nous {(partir)>partons} vers midi. Vous {(savoir)>savez} où est la voiture ? Les sacs {(être)>sont} lourds."}, {"titre": "Le spectacle de fin d'année", "texte": "Cette semaine, notre classe {(préparer)>prépare} un spectacle. Nous {(faire)>faisons} une répétition chaque jour. La maîtresse {(dire)>dit} : « Vous {(pouvoir)>pouvez} mieux faire ! » Les garçons {(prendre)>prennent} leurs costumes de pirates. Je {(vouloir)>veux} jouer le capitaine. Tu {(savoir)>sais} ton texte ? Lina {(apprendre)>apprend} une chanson. Ses parents {(venir)>viennent} au spectacle. Ils {(voir)>voient} déjà le décor. Vous {(aller)>allez} applaudir ! Nous {(devoir)>devons} saluer à la fin. Les petits {(faire)>font} une danse. Je {(partir)>pars} me changer. Tout le monde {(être)>est} prêt. Le rideau {(s'ouvrir)>s'ouvre} ."}, {"titre": "Les explorateurs", "texte": "Les explorateurs {(partir)>partent} à l'aube. Ils {(prendre)>prennent} un sentier étroit. Le guide {(dire)>dit} : « Nous {(devoir)>devons} arriver avant la nuit. » Vous {(voir)>voyez} cette montagne ? Nous y {(aller)>allons} . Je {(vouloir)>veux} photographier les aigles. Tu {(pouvoir)>peux} m'aider ? La neige {(rendre)>rend} la marche difficile. Les porteurs {(faire)>font} une pause. Un cuisinier {(servir)>sert} du thé chaud. Nous {(boire)>buvons} en silence. Le vent {(venir)>vient} du nord. Les nuages {(devenir)>deviennent} noirs. Vous {(savoir)>savez} lire une carte ? Le guide {(croire)>croit} que l'orage approche. Je {(mettre)>mets} mes gants. Nous {(repartir)>repartons} . Les sommets {(paraître)>paraissent} tout proches. Je {(être)>suis} émerveillé."}], "cm-fut": [{"titre": "Les vacances", "texte": "L'été prochain, nous {(aller)>irons} en Bretagne. Mes cousins {(venir)>viendront} avec nous. Je {(faire)>ferai} du bateau. Tu {(pouvoir)>pourras} pêcher. Papa {(voir)>verra} la mer. Nous {(être)>serons} bronzés. Vous {(avoir)>aurez} une grande tente. Ma sœur {(vouloir)>voudra} nager. Il {(falloir)>faudra} de la crème solaire. Nous {(partir)>partirons} tôt."}, {"titre": "Le futur métier", "texte": "Plus tard, je {(être)>serai} vétérinaire. Je {(soigner)>soignerai} les animaux. Tu {(devenir)>deviendras} pilote. Tu {(voir)>verras} le monde entier. Mon frère {(faire)>fera} de la musique. Il {(jouer)>jouera} dans un orchestre. Nous {(avoir)>aurons} de beaux métiers. Mes amies {(construire)>construiront} des maisons. Vous {(venir)>viendrez} les visiter. Elles {(savoir)>sauront} tout faire. Nous {(envoyer)>enverrons} des cartes. Je {(courir)>courrai} vous voir. Nous {(rire)>rirons} ensemble."}, {"titre": "La fusée", "texte": "Dans vingt ans, une fusée {(partir)>partira} pour Mars. Des astronautes {(monter)>monteront} à bord. Le voyage {(durer)>durera} six mois. Ils {(voir)>verront} la Terre s'éloigner. Ils {(devoir)>devront} faire du sport chaque jour. Nous {(pouvoir)>pourrons} suivre le voyage à la télévision. Tu {(regarder)>regarderas} le décollage. Je {(être)>serai} devant l'écran. Sur Mars, les astronautes {(faire)>feront} des expériences. Ils {(cueillir)>cueilleront} des cailloux rouges. Ils {(envoyer)>enverront} des photos. Vous {(apercevoir)>apercevrez} des montagnes. Le retour {(prendre)>prendra} du temps. Il {(falloir)>faudra} être patient. Les savants {(étudier)>étudieront} les cailloux. Nous {(savoir)>saurons} enfin la vérité."}, {"titre": "Le grand déménagement", "texte": "Samedi prochain, nous {(déménager)>déménagerons} . Un camion {(venir)>viendra} à huit heures. Les déménageurs {(porter)>porteront} les meubles. Je {(ranger)>rangerai} mes livres dans des cartons. Tu {(tenir)>tiendras} la porte. Papa {(conduire)>conduira} la voiture. Nous {(aller)>irons} à Lyon. La route {(être)>sera} longue. Mes parents {(avoir)>auront} beaucoup de travail. Je {(vouloir)>voudrai} une chambre bleue. Ma sœur {(peindre)>peindra} la sienne en jaune. Nous {(faire)>ferons} une fête. Les voisins {(pouvoir)>pourront} venir. Vous {(recevoir)>recevrez} une invitation. Nos amis {(appeler)>appelleront} souvent. Je leur {(écrire)>écrirai} . Nous les {(revoir)>reverrons} aux vacances. Tu {(courir)>courras} dans le nouveau jardin. Il {(falloir)>faudra} s'habituer. Nous {(être)>serons} heureux."}], "cm-imp": [{"titre": "Autrefois", "texte": "Autrefois, les enfants {(aller)>allaient} à l'école à pied. Ils {(marcher)>marchaient} longtemps. L'hiver, il {(faire)>faisait} très froid. Les élèves {(écrire)>écrivaient} à la plume. Le maître {(être)>était} sévère. Nous {(manger)>mangions} à la cantine. On {(commencer)>commençait} par la dictée. Vous {(avoir)>aviez} des sabots. Les filles {(porter)>portaient} des tabliers. Je {(rêver)>rêvais} de vacances."}, {"titre": "Le grand-père", "texte": "Quand mon grand-père {(être)>était} petit, il {(vivre)>vivait} à la campagne. Il {(se lever)>se levait} à l'aube. Il {(nourrir)>nourrissait} les poules. Ses frères {(conduire)>conduisaient} les vaches au pré. « Nous {(nager)>nagions} dans la rivière », racontait-il. Ils {(jouer)>jouaient} aux billes. Le soir, la famille {(dîner)>dînait} ensemble. Vous {(lancer)>lanciez} des cailloux dans l'eau ? Ma grand-mère {(coudre)>cousait} des robes. Ils ne {(voir)>voyaient} jamais la mer. Nous {(crier)>criions} de joie à Noël. Ils {(être)>étaient} heureux."}, {"titre": "Le château fort", "texte": "Au Moyen Âge, le seigneur {(habiter)>habitait} un château fort. De hautes murailles le {(protéger)>protégeaient} . Les soldats {(surveiller)>surveillaient} les alentours. Les paysans {(cultiver)>cultivaient} la terre. Ils {(payer)>payaient} des impôts. Le forgeron {(fabriquer)>fabriquait} des armes. Les enfants {(aider)>aidaient} leurs parents. Le soir, on {(partager)>partageait} le pain. Les marchands {(venir)>venaient} au château. Ils {(vendre)>vendaient} des tissus. En cas d'attaque, tout le monde {(se réfugier)>se réfugiait} au château. Les chevaliers {(défendre)>défendaient} les remparts. Vous {(entendre)>entendiez} les cloches sonner. On {(placer)>plaçait} des gardes partout. Les ennemis {(essayer)>essayaient} de franchir les douves. Ils {(échouer)>échouaient} souvent."}, {"titre": "La ferme de mon arrière-grand-mère", "texte": "Quand mon arrière-grand-mère {(avoir)>avait} dix ans, elle {(vivre)>vivait} dans une ferme. Chaque matin, elle {(se lever)>se levait} à cinq heures. Elle {(traire)>trayait} les vaches. Ses frères {(fendre)>fendaient} le bois. Sa mère {(préparer)>préparait} la soupe. Le dimanche, toute la famille {(aller)>allait} à la messe. Les enfants {(courir)>couraient} dans les prés. Ils {(connaître)>connaissaient} tous les animaux. L'été, ils {(faire)>faisaient} les foins. « Nous {(boire)>buvions} de l'eau du puits », racontait-elle. « Vous {(étudier)>étudiiez} à la lumière d'une lampe à pétrole ? » lui demandais-je. « Oui, et nous {(écrire)>écrivions} sur des ardoises. » Ses sœurs {(tricoter)>tricotaient} des chaussettes. Le chien {(dormir)>dormait} près du feu. Les hivers {(être)>étaient} rudes. On {(manger)>mangeait} des châtaignes. Le soir, son père {(lire)>lisait} le journal. Elle {(s'endormir)>s'endormait} vite. Elle ne {(se plaindre)>se plaignait} jamais."}], "cm-ps": [{"titre": "Le loup", "texte": "Le loup {(sortir)>sortit} du bois. Il {(voir)>vit} un agneau. Il {(s'approcher)>s'approcha} doucement. L'agneau {(lever)>leva} la tête. Il {(avoir)>eut} peur. Le loup {(bondir)>bondit} . Le berger {(arriver)>arriva} . Il {(chasser)>chassa} le loup. Les moutons {(rentrer)>rentrèrent} . L'agneau {(être)>fut} sauvé."}, {"titre": "Le roi et le meunier", "texte": "Un jour, le roi {(passer)>passa} devant un moulin. Il {(entendre)>entendit} le meunier chanter. Il {(descendre)>descendit} de cheval. Il {(entrer)>entra} dans le moulin. Le meunier {(faire)>fit} une révérence. Le roi lui {(demander)>demanda} pourquoi il était si joyeux. Le meunier {(répondre)>répondit} qu'il aimait son travail. Le roi {(sourire)>sourit} . Les deux hommes {(parler)>parlèrent} longtemps. Puis le roi {(prendre)>prit} congé. Ses gardes le {(suivre)>suivirent} . Il {(revenir)>revint} souvent. Ils {(devenir)>devinrent} amis."}, {"titre": "La découverte", "texte": "En 1940, quatre adolescents {(découvrir)>découvrirent} la grotte de Lascaux. Leur chien {(tomber)>tomba} dans un trou. Les garçons {(agrandir)>agrandirent} l'ouverture. Marcel {(descendre)>descendit} le premier. Il {(allumer)>alluma} sa lampe. Il {(voir)>vit} des dessins sur les murs. Ses amis le {(rejoindre)>rejoignirent} . Ils {(rester)>restèrent} muets. Des taureaux, des chevaux et des cerfs {(apparaître)>apparurent} . Les garçons {(prévenir)>prévinrent} leur instituteur. Celui-ci {(venir)>vint} aussitôt. Il {(comprendre)>comprit} l'importance de la découverte. Des savants {(étudier)>étudièrent} la grotte. Ils {(dire)>dirent} que ces peintures avaient dix-sept mille ans. La grotte {(devenir)>devint} célèbre. Le monde entier {(vouloir)>voulut} la visiter."}, {"titre": "Ulysse et le cyclope", "texte": "Ulysse et ses compagnons {(aborder)>abordèrent} une île inconnue. Ils {(trouver)>trouvèrent} une grotte immense. Ils {(entrer)>entrèrent} et {(manger)>mangèrent} les fromages du berger. Le soir, le cyclope {(revenir)>revint} avec ses moutons. Il {(fermer)>ferma} la grotte avec un énorme rocher. Il {(apercevoir)>aperçut} les marins. Il {(saisir)>saisit} deux hommes. Ulysse {(imaginer)>imagina} une ruse. Il {(offrir)>offrit} du vin au géant. Le cyclope {(boire)>but} et {(s'endormir)>s'endormit} . Les Grecs {(prendre)>prirent} un pieu. Ils le {(faire)>firent} chauffer dans le feu. Ils {(aveugler)>aveuglèrent} le monstre. Le cyclope {(pousser)>poussa} un cri terrible. Le matin, il {(ouvrir)>ouvrit} la grotte. Les marins {(sortir)>sortirent} accrochés sous les moutons. Ils {(courir)>coururent} vers leur bateau. Ulysse {(pouvoir)>put} enfin reprendre la mer."}], "cm-pc": [{"titre": "La sortie au parc", "texte": "Hier, nous {(aller)>sommes allés;sommes allées} au parc. Nous {(jouer)>avons joué} au ballon. Lina {(tomber)>est tombée} . Elle {(pleurer)>a pleuré} . Son frère l'{(consoler)>a consolée} . Les garçons {(courir)>ont couru} . Tu {(prendre)>as pris} des photos. Les filles {(partir)>sont parties} tôt. Je {(rester)>suis resté;suis restée} . Papa {(venir)>est venu} me chercher."}, {"titre": "Le gâteau", "texte": "Ce matin, ma sœur et moi {(faire)>avons fait} un gâteau. Nous {(mettre)>avons mis} un tablier. J'{(casser)>ai cassé} les œufs. Ma sœur {(verser)>a versé} la farine. Le chat {(sauter)>a sauté} sur la table. Il {(renverser)>a renversé} le lait ! Maman {(arriver)>est arrivée} . Elle {(rire)>a ri} . Nous {(nettoyer)>avons nettoyé} . Le gâteau {(cuire)>a cuit} une heure. Mes cousines {(venir)>sont venues} le goûter. Elles l'{(trouver)>ont trouvé} délicieux. Nous {(être)>avons été} fiers."}, {"titre": "La visite du musée", "texte": "La semaine dernière, notre classe {(visiter)>a visité} le musée d'histoire naturelle. Nous {(partir)>sommes partis} en car. Le guide nous {(accueillir)>a accueillis} . Il nous {(montrer)>a montré} des squelettes de dinosaures. Les élèves {(prendre)>ont pris} des notes. Tom {(poser)>a posé} beaucoup de questions. Lina {(dessiner)>a dessiné} un mammouth. Les filles {(monter)>sont montées} au premier étage. Elles {(voir)>ont vu} des papillons. Nous {(déjeuner)>avons déjeuné} dans le jardin. Vous {(lire)>avez lu} les panneaux ? Un oiseau {(voler)>a volé} notre pain ! La maîtresse {(compter)>a compté} les élèves. Nous {(revenir)>sommes revenus} à quatre heures. J'{(écrire)>ai écrit} un compte rendu. Il {(plaire)>a plu} à mes parents."}, {"titre": "Le voyage à Paris", "texte": "L'été dernier, mes parents et moi {(aller)>sommes allés} à Paris. Nous {(prendre)>avons pris} le train. Le voyage {(durer)>a duré} trois heures. Ma mère {(lire)>a lu} un roman. Mon père {(dormir)>a dormi} . Nous {(arriver)>sommes arrivés} gare de Lyon. Nous {(descendre)>sommes descendus} dans le métro. Le premier jour, nous {(visiter)>avons visité} le Louvre. J'{(voir)>ai vu} la Joconde. Elle m'{(paraître)>a paru} petite ! Le lendemain, nous {(monter)>sommes montés} à la tour Eiffel. Ma mère {(avoir)>a eu} le vertige. Elle {(rester)>est restée} au deuxième étage. Nous {(faire)>avons fait} une promenade en bateau. Les quais {(défiler)>ont défilé} sous nos yeux. Mes cousins {(arriver)>sont arrivés} le soir. Nous {(dîner)>avons dîné} ensemble. Ils {(repartir)>sont repartis} tard. J'{(adorer)>ai adoré} ce voyage. Nous {(promettre)>avons promis} de revenir."}], "cm-pqp": [{"titre": "Le gâteau disparu", "texte": "Quand maman revint, le gâteau {(disparaître)>avait disparu} . Le chien l'{(manger)>avait mangé} . Il {(sauter)>avait sauté} sur la table. Nous {(oublier)>avions oublié} de fermer la porte. Mon frère {(sortir)>était sorti} . Je {(partir)>étais parti;étais partie} jouer. Maman {(préparer)>avait préparé} ce gâteau toute la matinée. Elle {(acheter)>avait acheté} des fraises. Les invités {(arriver)>étaient arrivés} . Ils {(apporter)>avaient apporté} des fleurs."}, {"titre": "Le retour du marin", "texte": "Le vieux marin revint au village. Il {(partir)>était parti} vingt ans plus tôt. Il {(voyager)>avait voyagé} sur toutes les mers. Il {(voir)>avait vu} des tempêtes terribles. Il {(connaître)>avait connu} des pays lointains. Ses parents {(mourir)>étaient morts} . Sa maison {(tomber)>était tombée} en ruine. Ses amis {(vieillir)>avaient vieilli} . Sa fiancée {(attendre)>avait attendu} longtemps. Puis elle {(épouser)>avait épousé} le boulanger. Le marin {(rapporter)>avait rapporté} des trésors. Il les {(cacher)>avait cachés} dans son sac. Il {(garder)>avait gardé} une vieille boussole. Personne ne l'{(reconnaître)>avait reconnu} ."}, {"titre": "L'enquête", "texte": "L'inspecteur arriva au château à midi. Le vol {(avoir)>avait eu} lieu pendant la nuit. Quelqu'un {(entrer)>était entré} par la fenêtre. Il {(briser)>avait brisé} une vitre. Le voleur {(prendre)>avait pris} le collier de la duchesse. Les domestiques {(dormir)>avaient dormi} sans rien entendre. Le chien {(aboyer)>avait aboyé} vers deux heures. Le jardinier {(remarquer)>avait remarqué} des traces de pas. Elles {(conduire)>avaient conduit} jusqu'au mur du parc. La duchesse {(rentrer)>était rentrée} tard du bal. Elle {(poser)>avait posé} son collier sur la commode. Son neveu {(venir)>était venu} la voir la veille. Il {(demander)>avait demandé} de l'argent. Elle {(refuser)>avait refusé} . Le neveu {(disparaître)>avait disparu} . Les gendarmes {(fouiller)>avaient fouillé} le parc en vain. L'inspecteur sourit : il {(comprendre)>avait compris} ."}, {"titre": "Le naufrage", "texte": "Robinson ouvrit les yeux sur une plage déserte. La tempête {(durer)>avait duré} toute la nuit. Le navire {(heurter)>avait heurté} un récif. Les vagues {(emporter)>avaient emporté} les canots. Ses compagnons {(disparaître)>avaient disparu} . Lui, il {(s'accrocher)>s'était accroché} à une planche. La mer l'{(rejeter)>avait rejeté} sur le sable. Il {(perdre)>avait perdu} ses chaussures. Il {(avaler)>avait avalé} beaucoup d'eau. Il {(nager)>avait nagé} longtemps. Il {(lutter)>avait lutté} contre le courant. Le soleil {(se lever)>s'était levé} sur cette côte inconnue. Il se souvint de son départ. Il {(quitter)>avait quitté} l'Angleterre au printemps. Ses parents {(pleurer)>avaient pleuré} sur le quai. Il {(promettre)>avait promis} de revenir riche. Le capitaine {(annoncer)>avait annoncé} un voyage facile. Les marins {(chanter)>avaient chanté} toute la première semaine. Puis le ciel {(devenir)>était devenu} noir. La foudre {(tomber)>était tombée} sur le grand mât. Robinson {(prier)>avait prié} . Il {(survivre)>avait survécu} . Maintenant, il devait construire un abri."}], "cm-cond": [{"titre": "Si j'étais riche", "texte": "Si j'étais riche, j'{(acheter)>achèterais} un château. Je {(voyager)>voyagerais} partout. Tu {(venir)>viendrais} avec moi. Nous {(faire)>ferions} le tour du monde. Mes parents {(avoir)>auraient} une grande maison. Ma sœur {(vouloir)>voudrait} un cheval. Vous {(pouvoir)>pourriez} nager dans la piscine. Nous {(être)>serions} heureux. Je {(donner)>donnerais} aussi aux pauvres. Il {(falloir)>faudrait} beaucoup d'argent !"}, {"titre": "La politesse", "texte": "Je {(vouloir)>voudrais} un croissant, s'il vous plaît. Vous {(pouvoir)>pourriez} m'aider ? Tu {(devoir)>devrais} dire merci. Vous {(avoir)>auriez} l'heure ? Nous {(aimer)>aimerions} visiter le musée. Tu {(pouvoir)>pourrais} fermer la fenêtre ? Il {(falloir)>faudrait} se dépêcher. Mes amis {(souhaiter)>souhaiteraient} vous parler. Vous {(accepter)>accepteriez} notre invitation ? Je {(préférer)>préférerais} une table près de la fenêtre. Vous {(devoir)>devriez} réserver. Ce {(être)>serait} plus simple. Vous {(savoir)>sauriez} où est la gare ?"}, {"titre": "Le rêve de Léo", "texte": "Léo rêve : « Si j'avais des ailes, je {(voler)>volerais} au-dessus des nuages. Je {(voir)>verrais} les montagnes d'en haut. Les oiseaux {(devenir)>deviendraient} mes amis. Nous {(traverser)>traverserions} l'océan. Tu {(pouvoir)>pourrais} monter sur mon dos. Nous {(aller)>irions} en Afrique. Les lions {(être)>seraient} étonnés. Je {(se poser)>me poserais} sur les arbres. Mes parents {(avoir)>auraient} peur. Ils {(crier)>crieraient} : « Redescends ! » Je {(rire)>rirais} . Je {(chanter)>chanterais} avec les oiseaux. Je leur {(envoyer)>enverrais} des cartes postales. Le soir, je {(rentrer)>rentrerais} à la maison. Je {(dormir)>dormirais} dans mon lit. Ce {(être)>serait} merveilleux ! » Puis le réveil sonne."}, {"titre": "L'île déserte", "texte": "Si nous étions perdus sur une île déserte, nous {(devoir)>devrions} nous organiser. D'abord, nous {(chercher)>chercherions} de l'eau douce. Tom {(construire)>construirait} une cabane. Les filles {(pêcher)>pêcheraient} des poissons. Je {(allumer)>allumerais} un feu. Il {(falloir)>faudrait} le garder toute la nuit. Nous {(manger)>mangerions} des noix de coco. Tu {(écrire)>écrirais} un message dans une bouteille. Vous {(pouvoir)>pourriez} explorer la forêt. Nous {(découvrir)>découvririons} peut-être un trésor. Les animaux {(venir)>viendraient} nous observer. Nous {(apprendre)>apprendrions} à vivre ensemble. Les journées {(sembler)>sembleraient} longues. Nous {(raconter)>raconterions} des histoires le soir. Un jour, un bateau {(passer)>passerait} au large. Nous {(agiter)>agiterions} des branches. Le capitaine nous {(voir)>verrait} . Il {(envoyer)>enverrait} une chaloupe. Nous {(être)>serions} sauvés ! Mais nous {(regretter)>regretterions} un peu notre île."}], "cm-imper": [{"titre": "En classe", "texte": "Léo, {(ranger)>range} ta trousse ! Les enfants, {(sortir)>sortez} vos cahiers. {(Écouter)>Écoutez} bien la consigne. Lina, {(lire)>lis} la première phrase. {(Commencer)>Commençons} l'exercice. Tom, {(venir)>viens} au tableau. {(Écrire)>Écris} la date. Les filles, {(faire)>faites} moins de bruit. {(Être)>Soyez} attentifs. {(Aller)>Allons} en récréation !"}, {"titre": "La recette", "texte": "Pour faire une crêpe, {(prendre)>prends} un saladier. {(Verser)>Verse} la farine. {(Faire)>Fais} un puits au milieu. {(Casser)>Casse} trois œufs. {(Mélanger)>Mélange} doucement. Les enfants, {(ajouter)>ajoutez} le lait. {(Laisser)>Laissons} reposer la pâte. {(Faire)>Faites} chauffer la poêle. {(Attendre)>Attends} une minute. {(Retourner)>Retourne} la crêpe. {(Mettre)>Mets} du sucre. {(Être)>Sois} prudent avec le feu. {(Manger)>Mangeons} !"}, {"titre": "La randonnée", "texte": "Avant de partir, {(mettre)>mettez} vos chaussures de marche. {(Prendre)>Prenez} de l'eau. Léa, {(vérifier)>vérifie} ton sac. {(Partir)>Partons} ! {(Rester)>Restez} sur le sentier. Tom, {(avancer)>avance} moins vite. {(Attendre)>Attendons} les autres. {(Regarder)>Regardez} ce rapace ! {(Faire)>Faites} silence. {(Écouter)>Écoute} son cri, Léa. {(Avoir)>Ayez} confiance, le refuge est proche. {(Boire)>Buvez} un peu. {(Aller)>Allons} jusqu'au sommet. {(Ne pas jeter)>Ne jetez pas} vos papiers. {(Être)>Soyons} prudents dans la descente. {(Rentrer)>Rentrons} avant la nuit."}, {"titre": "Le jardin potager", "texte": "Les enfants, {(venir)>venez} au jardin ! {(Prendre)>Prenez} chacun un outil. Inès, {(choisir)>choisis} une bêche. {(Creuser)>Creuse} un sillon. Tom, {(semer)>sème} les graines de radis. {(Recouvrir)>Recouvre} les graines de terre. {(Arroser)>Arrosons} ensemble. {(Ne pas marcher)>Ne marchez pas} sur les semis ! {(Planter)>Plantez} les salades ici. {(Faire)>Faites} attention aux limaces. {(Ramasser)>Ramassons} les cailloux. Léo, {(aller)>va} chercher l'arrosoir. {(Remplir)>Remplis} l'arrosoir à la fontaine. {(Être)>Soyez} patients : tout pousse lentement. {(Revenir)>Revenons} demain. {(Observer)>Observez} les premières pousses. {(Noter)>Notez} tout dans votre cahier. {(Savoir)>Sachez} que les radis poussent en un mois. {(Avoir)>Ayons} de la patience ! Ensuite, {(laver)>lavez} bien vos mains."}], "cm-bontemps": [{"titre": "Le cerf", "texte": "Ce matin-là, le brouillard {(couvrir)>couvrait} la forêt. Les oiseaux {(se taire)>se taisaient} . Soudain, un cerf {(sortir)>sortit} du bois. Il {(regarder)>regarda} autour de lui. Puis il {(traverser)>traversa} la clairière. Les chasseurs l'{(voir)>avaient vu} la veille. Ils {(attendre)>attendaient} cachés derrière un arbre. Le cerf les {(sentir)>sentit} . Il {(s'enfuir)>s'enfuit} . Les chasseurs {(rentrer)>rentrèrent} bredouilles."}, {"titre": "La pluie", "texte": "Ce jour-là, il {(pleuvoir)>pleuvait} depuis le matin. Les enfants {(s'ennuyer)>s'ennuyaient} . Leur mère {(avoir)>eut} une idée. Elle {(sortir)>sortit} une vieille boîte. Leur grand-père l'{(fabriquer)>avait fabriquée} autrefois. Elle {(contenir)>contenait} des soldats de bois. Les enfants {(installer)>installèrent} une bataille. Ils {(jouer)>jouèrent} tout l'après-midi. Le soir, le soleil {(revenir)>revint} . Les enfants {(être)>étaient} ravis. Ils {(oublier)>avaient oublié} la pluie."}, {"titre": "Le concours", "texte": "La salle {(être)>était} pleine. Les musiciens {(attendre)>attendaient} leur tour. Clara {(trembler)>tremblait} un peu. Elle {(travailler)>avait travaillé} son morceau tout l'hiver. On l'{(appeler)>appela} enfin. Elle {(monter)>monta} sur la scène. Elle {(s'asseoir)>s'assit} au piano. Le silence {(se faire)>se fit} . Elle {(jouer)>joua} sans une erreur. Le public {(applaudir)>applaudit} longtemps. Le jury lui {(donner)>donna} le premier prix. Ses efforts {(payer)>avaient payé} ."}, {"titre": "La forêt enchantée", "texte": "Il {(être)>était} une fois une forêt enchantée. Les arbres y {(parler)>parlaient} . Les ruisseaux {(chanter)>chantaient} . Un jour, une petite fille {(se perdre)>se perdit} dans cette forêt. Elle {(quitter)>avait quitté} le sentier pour cueillir des fleurs. La nuit {(tomber)>tomba} . Un vieux chêne lui {(adresser)>adressa} la parole. La petite fille {(avoir)>eut} très peur. Mais l'arbre {(être)>était} gentil. Il lui {(montrer)>montra} le chemin. Une chouette l'{(accompagner)>accompagna} jusqu'au village. Ses parents la {(chercher)>avaient cherchée} partout. Ils la {(serrer)>serrèrent} dans leurs bras."}, {"titre": "Le premier jour", "texte": "Le premier jour de collège, Hugo {(se réveiller)>se réveilla} très tôt. Il {(préparer)>avait préparé} son sac la veille. Il {(faire)>faisait} encore nuit. Sa mère {(dormir)>dormait} . Il {(déjeuner)>déjeuna} en silence. Puis il {(partir)>partit} à pied. Les rues {(être)>étaient} désertes. Devant le collège, des élèves {(attendre)>attendaient} déjà. Hugo ne {(connaître)>connaissait} personne. Soudain, quelqu'un l'{(appeler)>appela} . C'{(être)>était} Malik, son ami d'école. Il {(arriver)>était arrivé} avant lui. Les deux garçons {(entrer)>entrèrent} ensemble. Hugo {(se sentir)>se sentit} rassuré."}, {"titre": "La panne", "texte": "La voiture {(rouler)>roulait} sur une petite route de montagne. Il {(faire)>faisait} très chaud. Les enfants {(dormir)>dormaient} à l'arrière. Soudain, le moteur {(tousser)>toussa} . La voiture {(s'arrêter)>s'arrêta} . Papa {(ouvrir)>ouvrit} le capot. Il ne {(comprendre)>comprenait} rien aux moteurs. Il {(oublier)>avait oublié} son téléphone à l'hôtel. Maman {(sortir)>sortit} la carte. Le village le plus proche {(se trouver)>se trouvait} à dix kilomètres. Heureusement, un tracteur {(arriver)>arriva} . Le fermier {(réparer)>répara} la panne en cinq minutes. Il {(être)>était} mécanicien autrefois. Les enfants {(se réveiller)>se réveillèrent} . Ils {(dormir)>avaient dormi} pendant toute la panne."}, {"titre": "Le chat perdu", "texte": "Depuis trois jours, Minou {(disparaître)>avait disparu} . Léa {(pleurer)>pleurait} chaque soir. Elle {(coller)>avait collé} des affiches dans tout le quartier. Personne ne {(appeler)>appelait} . Le quatrième jour, une voisine {(sonner)>sonna} à la porte. Elle {(entendre)>avait entendu} des miaulements dans son garage. Léa {(courir)>courut} chez elle. Le garage {(être)>était} sombre. Un petit bruit {(venir)>venait} d'une caisse. Léa {(soulever)>souleva} le couvercle. Minou {(dormir)>dormait} au milieu de quatre chatons ! Il {(s'agir)>s'agissait} donc d'une chatte. Léa {(éclater)>éclata} de rire. Elle {(rapporter)>rapporta} toute la famille à la maison. Ses parents {(accepter)>acceptèrent} de garder un chaton."}, {"titre": "Le sauvetage", "texte": "La mer {(être)>était} déchaînée. Les vagues {(frapper)>frappaient} la digue. Au loin, un voilier {(lutter)>luttait} contre le vent. Son mât {(se briser)>s'était brisé} . Le gardien du phare l'{(apercevoir)>aperçut} . Il {(alerter)>alerta} aussitôt les sauveteurs. Ceux-ci {(mettre)>mirent} leur canot à la mer. Ils {(ramer)>ramèrent} pendant une heure. Les naufragés {(s'accrocher)>s'accrochaient} à la coque. Ils {(perdre)>avaient perdu} tout espoir. Les sauveteurs les {(hisser)>hissèrent} à bord. Ils les {(ramener)>ramenèrent} au port. Toute la ville les {(attendre)>attendait} sur le quai. On les {(applaudir)>applaudit} . Les naufragés {(remercier)>remercièrent} leurs sauveteurs. Ils {(promettre)>promirent} de revenir."}, {"titre": "La fête au village", "texte": "Cette année-là, le village {(préparer)>préparait} sa grande fête depuis des semaines. Les habitants {(décorer)>avaient décoré} les rues de guirlandes. Le jour venu, il {(faire)>faisait} un temps splendide. Les musiciens {(arriver)>arrivèrent} à midi. Ils {(jouer)>jouèrent} sur la place. Les enfants {(danser)>dansaient} autour de la fontaine. Les anciens {(se souvenir)>se souvenaient} des fêtes d'autrefois. Le maire {(prononcer)>prononça} un discours. Personne ne l'{(écouter)>écoutait} vraiment. Le soir, on {(allumer)>alluma} des lampions. Un feu d'artifice {(illuminer)>illumina} le ciel. Les gens {(lever)>levaient} la tête, émerveillés. Les artificiers {(travailler)>avaient travaillé} toute la journée. Leur spectacle {(durer)>dura} une demi-heure. Tout le monde {(applaudir)>applaudit} . La fête {(se terminer)>se termina} très tard. Les enfants {(s'endormir)>s'endormirent} dans les bras de leurs parents."}, {"titre": "Le dragon de la montagne", "texte": "Autrefois, un dragon {(vivre)>vivait} dans la montagne. Il {(dormir)>dormait} sur un tas d'or. Les villageois le {(craindre)>craignaient} . Chaque année, il {(descendre)>descendait} dans la vallée. Il {(brûler)>brûlait} les récoltes. Un jour, une jeune bergère {(décider)>décida} de l'affronter. Sa grand-mère lui {(apprendre)>avait appris} un secret : les dragons aimaient la musique. La bergère {(prendre)>prit} sa flûte. Elle {(grimper)>grimpa} jusqu'à la caverne. Le dragon {(ouvrir)>ouvrit} un œil. Il {(sembler)>semblait} furieux. La bergère {(jouer)>joua} un air très doux. Le dragon {(fermer)>ferma} les yeux. Il {(s'endormir)>s'endormit} . Il ne {(se réveiller)>se réveilla} jamais plus. Les villageois {(fêter)>fêtèrent} la bergère. Ils {(attendre)>avaient attendu} ce jour depuis cent ans. La vallée {(retrouver)>retrouva} la paix."}, {"titre": "Le voyage en ballon", "texte": "Le 21 novembre 1783, une foule immense {(se presser)>se pressait} dans le jardin du château de la Muette. Les frères Montgolfier {(inventer)>avaient inventé} le ballon à air chaud. Ce jour-là, deux hommes {(aller)>allaient} voler pour la première fois. Le ballon {(être)>était} magnifique. Il {(porter)>portait} des décorations bleues et dorées. Les aéronautes {(monter)>montèrent} dans la nacelle. On {(allumer)>alluma} le feu. L'air chaud {(gonfler)>gonfla} le ballon. Il {(s'élever)>s'éleva} lentement. La foule {(pousser)>poussa} un cri. Le ballon {(survoler)>survola} Paris. Les Parisiens {(regarder)>regardaient} le ciel avec stupeur. Personne n'{(voir)>avait vu} un tel spectacle. Le vol {(durer)>dura} vingt-cinq minutes. Le ballon {(se poser)>se posa} dans un champ. Les deux hommes {(être)>étaient} sains et saufs. Ils {(réussir)>avaient réussi} leur pari. Le roi {(féliciter)>félicita} les inventeurs. La nouvelle {(faire)>fit} le tour de l'Europe."}, {"titre": "L'éruption", "texte": "En l'an 79, Pompéi {(être)>était} une ville riche. Ses habitants {(vivre)>vivaient} au pied du Vésuve. Ils ne {(se méfier)>se méfiaient} pas du volcan. Depuis des siècles, il {(dormir)>dormait} . Pourtant, quelques jours plus tôt, la terre {(trembler)>avait tremblé} . Les puits {(se tarir)>s'étaient taris} . Le 24 août, le volcan {(se réveiller)>se réveilla} . Une colonne de fumée {(monter)>monta} vers le ciel. Des pierres {(tomber)>tombèrent} sur la ville. Les habitants {(s'enfuir)>s'enfuirent} vers la mer. Certains {(rester)>restèrent} dans leurs maisons. Ils {(espérer)>espéraient} que tout s'arrêterait. Le lendemain, une nuée brûlante {(dévaler)>dévala} la montagne. Elle {(recouvrir)>recouvrit} la ville. Pompéi {(disparaître)>disparut} sous les cendres. Des siècles plus tard, des archéologues la {(retrouver)>retrouvèrent} . Les rues, les maisons et les fresques {(rester)>étaient restées} intactes. Le temps {(s'arrêter)>s'était arrêté} à Pompéi. Les savants {(étudier)>étudièrent} chaque maison. Les visiteurs {(découvrir)>découvrirent} une ville figée."}]});
Object.assign(TRANSFOS, {"cm-neg2": [{"titre": "Le chat de la voisine", "texte": "{neg::Le chat dort toujours sur le mur.>Le chat ne dort jamais sur le mur.} {neg::Il mange encore ses croquettes.>Il ne mange plus ses croquettes.} {neg::Quelqu'un le caresse.>Personne ne le caresse.} {neg::Il attrape quelque chose.>Il n'attrape rien.} {neg::Il a des amis.>Il n'a pas d'amis.} {neg::La voisine l'appelle toujours.>La voisine ne l'appelle jamais.} {neg::Il voit quelqu'un.>Il ne voit personne.} {neg::Il a encore faim.>Il n'a plus faim.} {neg::Il boit du lait.>Il ne boit pas de lait.} {neg::Il entend quelque chose.>Il n'entend rien.}"}, {"titre": "Le grenier", "texte": "{neg::Quelqu'un monte au grenier.>Personne ne monte au grenier.} {neg::On y trouve des jouets.>On n'y trouve pas de jouets.} {neg::La lumière fonctionne encore.>La lumière ne fonctionne plus.} {neg::Mon frère a toujours peur du noir.>Mon frère n'a jamais peur du noir.} {neg::Il entend quelque chose.>Il n'entend rien.} {neg::Nous voyons une araignée.>Nous ne voyons pas d'araignée.} {neg::Mamie range encore ses robes ici.>Mamie ne range plus ses robes ici.} {neg::Elle jette quelque chose.>Elle ne jette rien.} {neg::Quelqu'un ouvre la malle.>Personne n'ouvre la malle.} {neg::Elle contient des lettres.>Elle ne contient pas de lettres.} {neg::Papa monte toujours avec nous.>Papa ne monte jamais avec nous.} {neg::Nous rencontrons quelqu'un.>Nous ne rencontrons personne.} {neg::Le grenier est encore poussiéreux.>Le grenier n'est plus poussiéreux.}"}, {"titre": "La boulangerie", "texte": "{neg::Le boulanger ouvre toujours à six heures.>Le boulanger n'ouvre jamais à six heures.} {neg::Il fait encore du pain de seigle.>Il ne fait plus de pain de seigle.} {neg::Quelqu'un attend devant la porte.>Personne n'attend devant la porte.} {neg::Je veux quelque chose.>Je ne veux rien.} {neg::Il reste des croissants.>Il ne reste pas de croissants.} {neg::La boulangère sourit toujours.>La boulangère ne sourit jamais.} {neg::Elle vend des gâteaux.>Elle ne vend pas de gâteaux.} {neg::Le four chauffe encore.>Le four ne chauffe plus.} {neg::Mon frère achète quelque chose.>Mon frère n'achète rien.} {neg::Quelqu'un paie avec une carte.>Personne ne paie avec une carte.} {neg::Nous voyons quelqu'un derrière le comptoir.>Nous ne voyons personne derrière le comptoir.} {neg::Le pain est encore chaud.>Le pain n'est plus chaud.} {neg::La file est toujours longue.>La file n'est jamais longue.} {neg::Il y a une baguette pour nous.>Il n'y a pas de baguette pour nous.} {neg::Maman oublie toujours la monnaie.>Maman n'oublie jamais la monnaie.} {neg::Le boulanger dit quelque chose.>Le boulanger ne dit rien.}"}, {"titre": "La cabane abandonnée", "texte": "{neg::Quelqu'un habite cette cabane.>Personne n'habite cette cabane.} {neg::La porte ferme encore.>La porte ne ferme plus.} {neg::Le toit protège toujours de la pluie.>Le toit ne protège jamais de la pluie.} {neg::On trouve des meubles à l'intérieur.>On ne trouve pas de meubles à l'intérieur.} {neg::Le poêle chauffe encore.>Le poêle ne chauffe plus.} {neg::Nous entendons quelque chose.>Nous n'entendons rien.} {neg::Un renard vient toujours ici.>Un renard ne vient jamais ici.} {neg::Nous voyons des traces.>Nous ne voyons pas de traces.} {neg::Quelqu'un a laissé un message.>Personne n'a laissé de message.} {neg::Mon cousin a encore peur.>Mon cousin n'a plus peur.} {neg::Il touche quelque chose.>Il ne touche rien.} {neg::La fenêtre a des carreaux.>La fenêtre n'a pas de carreaux.} {neg::Nous rencontrons quelqu'un dans la forêt.>Nous ne rencontrons personne dans la forêt.} {neg::Le chemin est toujours boueux.>Le chemin n'est jamais boueux.} {neg::Il reste quelque chose dans le placard.>Il ne reste rien dans le placard.} {neg::La cabane sert encore aux chasseurs.>La cabane ne sert plus aux chasseurs.} {neg::Quelqu'un répare le toit.>Personne ne répare le toit.} {neg::Nous emportons des souvenirs.>Nous n'emportons pas de souvenirs.} {neg::Mon cousin raconte toujours des histoires de fantômes.>Mon cousin ne raconte jamais d'histoires de fantômes.} {neg::Il croit encore aux fantômes.>Il ne croit plus aux fantômes.}"}], "cm-int2": [{"titre": "Le chien", "texte": "{int::Ton chien aboie la nuit.>Est-ce que ton chien aboie la nuit ?;Ton chien aboie-t-il la nuit ?;Ton chien aboie la nuit ?} {int::Tu promènes ton chien.>Est-ce que tu promènes ton chien ?;Promènes-tu ton chien ?;Tu promènes ton chien ?} {int::Il mange des croquettes.>Est-ce qu'il mange des croquettes ?;Mange-t-il des croquettes ?;Il mange des croquettes ?} {int::Vous jouez avec lui.>Est-ce que vous jouez avec lui ?;Jouez-vous avec lui ?;Vous jouez avec lui ?} {int::Ta sœur brosse son poil.>Est-ce que ta sœur brosse son poil ?;Ta sœur brosse-t-elle son poil ?;Ta sœur brosse son poil ?} {int::Il dort dans ta chambre.>Est-ce qu'il dort dans ta chambre ?;Dort-il dans ta chambre ?;Il dort dans ta chambre ?} {int::Nous allons au parc.>Est-ce que nous allons au parc ?;Allons-nous au parc ?;Nous allons au parc ?} {int::Le vétérinaire connaît ton chien.>Est-ce que le vétérinaire connaît ton chien ?;Le vétérinaire connaît-il ton chien ?;Le vétérinaire connaît ton chien ?} {int::Tu aimes les chats.>Est-ce que tu aimes les chats ?;Aimes-tu les chats ?;Tu aimes les chats ?} {int::Il court vite.>Est-ce qu'il court vite ?;Court-il vite ?;Il court vite ?}"}, {"titre": "Le voyage", "texte": "{int::Vous partez demain.>Est-ce que vous partez demain ?;Partez-vous demain ?;Vous partez demain ?} {int::Le train arrive à midi.>Est-ce que le train arrive à midi ?;Le train arrive-t-il à midi ?;Le train arrive à midi ?} {int::Tu as ton billet.>Est-ce que tu as ton billet ?;As-tu ton billet ?;Tu as ton billet ?} {int::Les valises sont prêtes.>Est-ce que les valises sont prêtes ?;Les valises sont-elles prêtes ?;Les valises sont prêtes ?} {int::Nous prenons le métro.>Est-ce que nous prenons le métro ?;Prenons-nous le métro ?;Nous prenons le métro ?} {int::Ta mère vient avec nous.>Est-ce que ta mère vient avec nous ?;Ta mère vient-elle avec nous ?;Ta mère vient avec nous ?} {int::Il fait beau à Nice.>Est-ce qu'il fait beau à Nice ?;Fait-il beau à Nice ?;Il fait beau à Nice ?} {int::Tu connais cette ville.>Est-ce que tu connais cette ville ?;Connais-tu cette ville ?;Tu connais cette ville ?} {int::Vous aimez la mer.>Est-ce que vous aimez la mer ?;Aimez-vous la mer ?;Vous aimez la mer ?} {int::Le voyage dure longtemps.>Est-ce que le voyage dure longtemps ?;Le voyage dure-t-il longtemps ?;Le voyage dure longtemps ?} {int::On mange dans le train.>Est-ce qu'on mange dans le train ?;Mange-t-on dans le train ?;On mange dans le train ?} {int::Tes cousins attendent à la gare.>Est-ce que tes cousins attendent à la gare ?;Tes cousins attendent-ils à la gare ?;Tes cousins attendent à la gare ?} {int::Tu dors pendant le trajet.>Est-ce que tu dors pendant le trajet ?;Dors-tu pendant le trajet ?;Tu dors pendant le trajet ?}"}, {"titre": "Le musée", "texte": "{int::Le musée ouvre à dix heures.>Est-ce que le musée ouvre à dix heures ?;Le musée ouvre-t-il à dix heures ?;Le musée ouvre à dix heures ?} {int::Vous avez réservé.>Est-ce que vous avez réservé ?;Avez-vous réservé ?;Vous avez réservé ?} {int::Le guide parle anglais.>Est-ce que le guide parle anglais ?;Le guide parle-t-il anglais ?;Le guide parle anglais ?} {int::Nous pouvons prendre des photos.>Est-ce que nous pouvons prendre des photos ?;Pouvons-nous prendre des photos ?;Nous pouvons prendre des photos ?} {int::Tu vois ce tableau.>Est-ce que tu vois ce tableau ?;Vois-tu ce tableau ?;Tu vois ce tableau ?} {int::Il date du Moyen Âge.>Est-ce qu'il date du Moyen Âge ?;Date-t-il du Moyen Âge ?;Il date du Moyen Âge ?} {int::Les statues sont en marbre.>Est-ce que les statues sont en marbre ?;Les statues sont-elles en marbre ?;Les statues sont en marbre ?} {int::Tu préfères la peinture.>Est-ce que tu préfères la peinture ?;Préfères-tu la peinture ?;Tu préfères la peinture ?} {int::La visite coûte cher.>Est-ce que la visite coûte cher ?;La visite coûte-t-elle cher ?;La visite coûte cher ?} {int::On entend la musique.>Est-ce qu'on entend la musique ?;Entend-on la musique ?;On entend la musique ?} {int::Les enfants paient leur entrée.>Est-ce que les enfants paient leur entrée ?;Les enfants paient-ils leur entrée ?;Les enfants paient leur entrée ?} {int::Vous connaissez ce peintre.>Est-ce que vous connaissez ce peintre ?;Connaissez-vous ce peintre ?;Vous connaissez ce peintre ?} {int::Il a peint la Joconde.>Est-ce qu'il a peint la Joconde ?;A-t-il peint la Joconde ?;Il a peint la Joconde ?} {int::La boutique vend des cartes postales.>Est-ce que la boutique vend des cartes postales ?;La boutique vend-elle des cartes postales ?;La boutique vend des cartes postales ?} {int::Tu veux un souvenir.>Est-ce que tu veux un souvenir ?;Veux-tu un souvenir ?;Tu veux un souvenir ?} {int::Nous revenons demain.>Est-ce que nous revenons demain ?;Revenons-nous demain ?;Nous revenons demain ?}"}, {"titre": "L'expédition", "texte": "{int::Vous partez pour l'Antarctique.>Est-ce que vous partez pour l'Antarctique ?;Partez-vous pour l'Antarctique ?;Vous partez pour l'Antarctique ?} {int::Le bateau est solide.>Est-ce que le bateau est solide ?;Le bateau est-il solide ?;Le bateau est solide ?} {int::Tu emportes des vêtements chauds.>Est-ce que tu emportes des vêtements chauds ?;Emportes-tu des vêtements chauds ?;Tu emportes des vêtements chauds ?} {int::Les savants étudient les glaciers.>Est-ce que les savants étudient les glaciers ?;Les savants étudient-ils les glaciers ?;Les savants étudient les glaciers ?} {int::Il fait très froid là-bas.>Est-ce qu'il fait très froid là-bas ?;Fait-il très froid là-bas ?;Il fait très froid là-bas ?} {int::Vous verrez des manchots.>Est-ce que vous verrez des manchots ?;Verrez-vous des manchots ?;Vous verrez des manchots ?} {int::La nuit dure six mois.>Est-ce que la nuit dure six mois ?;La nuit dure-t-elle six mois ?;La nuit dure six mois ?} {int::Tu as peur du froid.>Est-ce que tu as peur du froid ?;As-tu peur du froid ?;Tu as peur du froid ?} {int::Nous pourrons te téléphoner.>Est-ce que nous pourrons te téléphoner ?;Pourrons-nous te téléphoner ?;Nous pourrons te téléphoner ?} {int::L'expédition compte vingt personnes.>Est-ce que l'expédition compte vingt personnes ?;L'expédition compte-t-elle vingt personnes ?;L'expédition compte vingt personnes ?} {int::Le cuisinier prépare des plats chauds.>Est-ce que le cuisinier prépare des plats chauds ?;Le cuisinier prépare-t-il des plats chauds ?;Le cuisinier prépare des plats chauds ?} {int::Vous dormez sous des tentes.>Est-ce que vous dormez sous des tentes ?;Dormez-vous sous des tentes ?;Vous dormez sous des tentes ?} {int::Tu tiens un journal de bord.>Est-ce que tu tiens un journal de bord ?;Tiens-tu un journal de bord ?;Tu tiens un journal de bord ?} {int::Les chiens tirent les traîneaux.>Est-ce que les chiens tirent les traîneaux ?;Les chiens tirent-ils les traîneaux ?;Les chiens tirent les traîneaux ?} {int::On trouve des phoques.>Est-ce qu'on trouve des phoques ?;Trouve-t-on des phoques ?;On trouve des phoques ?} {int::La glace fond en été.>Est-ce que la glace fond en été ?;La glace fond-elle en été ?;La glace fond en été ?} {int::Tu reviendras en mars.>Est-ce que tu reviendras en mars ?;Reviendras-tu en mars ?;Tu reviendras en mars ?} {int::Nous irons t'attendre au port.>Est-ce que nous irons t'attendre au port ?;Irons-nous t'attendre au port ?;Nous irons t'attendre au port ?} {int::Ton chef connaît la route.>Est-ce que ton chef connaît la route ?;Ton chef connaît-il la route ?;Ton chef connaît la route ?} {int::Vous avez une radio.>Est-ce que vous avez une radio ?;Avez-vous une radio ?;Vous avez une radio ?}"}], "cm-transfo": [{"titre": "Le réveil", "texte": "{neg::Je me lève toujours tôt.>Je ne me lève jamais tôt.} {int::Tu viens déjeuner.>Est-ce que tu viens déjeuner ?;Viens-tu déjeuner ?;Tu viens déjeuner ?} {imp::Tu ranges ta chambre.>Range ta chambre.} {aff::Il ne fait pas beau.>Il fait beau.} {neg::Quelqu'un frappe à la porte.>Personne ne frappe à la porte.} {int::Le facteur passe ce matin.>Est-ce que le facteur passe ce matin ?;Le facteur passe-t-il ce matin ?;Le facteur passe ce matin ?} {imp::Vous mettez vos manteaux.>Mettez vos manteaux.} {aff::Je n'ai plus faim.>J'ai encore faim.} {neg::Le bus arrive.>Le bus n'arrive pas.} {int::Vous avez vos cartables.>Est-ce que vous avez vos cartables ?;Avez-vous vos cartables ?;Vous avez vos cartables ?}"}, {"titre": "Le jardin", "texte": "{int::Tu arroses les tomates.>Est-ce que tu arroses les tomates ?;Arroses-tu les tomates ?;Tu arroses les tomates ?} {neg::Il pleut encore.>Il ne pleut plus.} {imp::Tu cueilles des fraises.>Cueille des fraises.} {aff::Le chat ne dort jamais dehors.>Le chat dort toujours dehors.} {neg::Papi taille quelque chose.>Papi ne taille rien.} {int::Les roses sentent bon.>Est-ce que les roses sentent bon ?;Les roses sentent-elles bon ?;Les roses sentent bon ?} {imp::Nous ramassons les feuilles.>Ramassons les feuilles.} {aff::Personne ne mange les cerises.>Quelqu'un mange les cerises.} {neg::Il y a des limaces.>Il n'y a pas de limaces.} {int::Mamie plante des tulipes.>Est-ce que mamie plante des tulipes ?;Mamie plante-t-elle des tulipes ?;Mamie plante des tulipes ?} {imp::Vous fermez le portail.>Fermez le portail.}"}, {"titre": "La bibliothèque", "texte": "{neg::Quelqu'un parle fort.>Personne ne parle fort.} {int::Tu empruntes ce roman.>Est-ce que tu empruntes ce roman ?;Empruntes-tu ce roman ?;Tu empruntes ce roman ?} {imp::Tu rends tes livres.>Rends tes livres.} {aff::Je ne trouve rien.>Je trouve quelque chose.} {neg::La bibliothécaire est toujours pressée.>La bibliothécaire n'est jamais pressée.} {int::Vous lisez des bandes dessinées.>Est-ce que vous lisez des bandes dessinées ?;Lisez-vous des bandes dessinées ?;Vous lisez des bandes dessinées ?} {imp::Nous cherchons un livre sur les loups.>Cherchons un livre sur les loups.} {aff::Il n'y a pas de place.>Il y a de la place.} {neg::Mon frère lit encore des albums.>Mon frère ne lit plus d'albums.} {int::La salle ferme à midi.>Est-ce que la salle ferme à midi ?;La salle ferme-t-elle à midi ?;La salle ferme à midi ?} {imp::Vous parlez tout bas.>Parlez tout bas.} {neg::J'ai une carte.>Je n'ai pas de carte.}"}, {"titre": "La piscine", "texte": "{int::Tu sais nager.>Est-ce que tu sais nager ?;Sais-tu nager ?;Tu sais nager ?} {neg::L'eau est encore froide.>L'eau n'est plus froide.} {imp::Tu mets ton bonnet.>Mets ton bonnet.} {aff::Je ne plonge jamais.>Je plonge toujours.} {neg::Quelqu'un court au bord du bassin.>Personne ne court au bord du bassin.} {int::Le maître-nageur surveille les enfants.>Est-ce que le maître-nageur surveille les enfants ?;Le maître-nageur surveille-t-il les enfants ?;Le maître-nageur surveille les enfants ?} {imp::Vous prenez une douche.>Prenez une douche.} {aff::Ma sœur n'a plus peur de l'eau.>Ma sœur a encore peur de l'eau.} {neg::Il y a des bouées.>Il n'y a pas de bouées.} {int::Nous faisons la course.>Est-ce que nous faisons la course ?;Faisons-nous la course ?;Nous faisons la course ?} {imp::Tu sors de l'eau.>Sors de l'eau.} {neg::J'oublie quelque chose.>Je n'oublie rien.} {int::Vous revenez samedi.>Est-ce que vous revenez samedi ?;Revenez-vous samedi ?;Vous revenez samedi ?}"}, {"titre": "La cuisine", "texte": "{neg::Papa cuisine toujours le dimanche.>Papa ne cuisine jamais le dimanche.} {int::Tu épluches les pommes de terre.>Est-ce que tu épluches les pommes de terre ?;Épluches-tu les pommes de terre ?;Tu épluches les pommes de terre ?} {imp::Tu laves les légumes.>Lave les légumes.} {aff::Il n'y a pas de sel.>Il y a du sel.} {neg::Quelqu'un met la table.>Personne ne met la table.} {int::La soupe est chaude.>Est-ce que la soupe est chaude ?;La soupe est-elle chaude ?;La soupe est chaude ?} {imp::Nous goûtons la sauce.>Goûtons la sauce.} {aff::Je ne sens rien.>Je sens quelque chose.} {neg::Le four chauffe encore.>Le four ne chauffe plus.} {int::Vous voulez du dessert.>Est-ce que vous voulez du dessert ?;Voulez-vous du dessert ?;Vous voulez du dessert ?} {imp::Vous lavez vos mains.>Lavez vos mains.} {neg::Mon frère mange des épinards.>Mon frère ne mange pas d'épinards.} {int::Il reste du gâteau.>Est-ce qu'il reste du gâteau ?;Reste-t-il du gâteau ?;Il reste du gâteau ?} {aff::Personne n'a faim.>Quelqu'un a faim.}"}, {"titre": "La forêt", "texte": "{int::Tu entends le pic-vert.>Est-ce que tu entends le pic-vert ?;Entends-tu le pic-vert ?;Tu entends le pic-vert ?} {neg::Le sentier est toujours boueux.>Le sentier n'est jamais boueux.} {imp::Tu restes près de moi.>Reste près de moi.} {aff::Je ne vois personne.>Je vois quelqu'un.} {neg::Quelqu'un coupe du bois.>Personne ne coupe de bois.} {int::Les champignons poussent ici.>Est-ce que les champignons poussent ici ?;Les champignons poussent-ils ici ?;Les champignons poussent ici ?} {imp::Nous suivons la rivière.>Suivons la rivière.} {aff::Il ne fait plus jour.>Il fait encore jour.} {neg::Nous trouvons des châtaignes.>Nous ne trouvons pas de châtaignes.} {int::Vous connaissez ce chemin.>Est-ce que vous connaissez ce chemin ?;Connaissez-vous ce chemin ?;Vous connaissez ce chemin ?} {imp::Vous écoutez les oiseaux.>Écoutez les oiseaux.} {neg::Le renard cache quelque chose.>Le renard ne cache rien.} {int::Papa a la carte.>Est-ce que papa a la carte ?;Papa a-t-il la carte ?;Papa a la carte ?} {aff::Je n'ai jamais froid.>J'ai toujours froid.} {neg::Les arbres ont encore leurs feuilles.>Les arbres n'ont plus leurs feuilles.}"}, {"titre": "Le spectacle", "texte": "{neg::Le rideau s'ouvre.>Le rideau ne s'ouvre pas.} {int::Tu as les billets.>Est-ce que tu as les billets ?;As-tu les billets ?;Tu as les billets ?} {imp::Tu éteins ton téléphone.>Éteins ton téléphone.} {aff::Personne n'applaudit.>Quelqu'un applaudit.} {neg::Les acteurs sont encore en coulisses.>Les acteurs ne sont plus en coulisses.} {int::La pièce dure longtemps.>Est-ce que la pièce dure longtemps ?;La pièce dure-t-elle longtemps ?;La pièce dure longtemps ?} {imp::Nous gardons le silence.>Gardons le silence.} {aff::Je ne comprends rien.>Je comprends quelque chose.} {neg::Le héros a toujours raison.>Le héros n'a jamais raison.} {int::Vous aimez le théâtre.>Est-ce que vous aimez le théâtre ?;Aimez-vous le théâtre ?;Vous aimez le théâtre ?} {imp::Vous restez assis.>Restez assis.} {neg::Il y a des places libres.>Il n'y a pas de places libres.} {int::On peut sortir à l'entracte.>Est-ce qu'on peut sortir à l'entracte ?;Peut-on sortir à l'entracte ?;On peut sortir à l'entracte ?} {aff::Ma sœur n'a plus sommeil.>Ma sœur a encore sommeil.} {neg::Quelqu'un chuchote.>Personne ne chuchote.}"}, {"titre": "Le marché", "texte": "{int::Tu portes le panier.>Est-ce que tu portes le panier ?;Portes-tu le panier ?;Tu portes le panier ?} {neg::Le marchand crie toujours ses prix.>Le marchand ne crie jamais ses prix.} {imp::Tu choisis des pêches.>Choisis des pêches.} {aff::Les fraises ne sont plus chères.>Les fraises sont encore chères.} {neg::Quelqu'un vend des fleurs.>Personne ne vend de fleurs.} {int::Vous avez de la monnaie.>Est-ce que vous avez de la monnaie ?;Avez-vous de la monnaie ?;Vous avez de la monnaie ?} {imp::Nous goûtons ce fromage.>Goûtons ce fromage.} {aff::Je n'achète rien.>J'achète quelque chose.} {neg::Il reste des melons.>Il ne reste pas de melons.} {int::Le poissonnier ouvre à huit heures.>Est-ce que le poissonnier ouvre à huit heures ?;Le poissonnier ouvre-t-il à huit heures ?;Le poissonnier ouvre à huit heures ?} {imp::Vous attendez votre tour.>Attendez votre tour.} {neg::Maman oublie quelque chose.>Maman n'oublie rien.} {int::Les tomates sont mûres.>Est-ce que les tomates sont mûres ?;Les tomates sont-elles mûres ?;Les tomates sont mûres ?} {aff::Il n'y a personne au stand.>Il y a quelqu'un au stand.} {neg::Le marché ferme encore tard.>Le marché ne ferme plus tard.} {int::Tu veux des cerises.>Est-ce que tu veux des cerises ?;Veux-tu des cerises ?;Tu veux des cerises ?}"}, {"titre": "La classe de mer", "texte": "{neg::Nous partons encore en car.>Nous ne partons plus en car.} {int::Tu as ton maillot.>Est-ce que tu as ton maillot ?;As-tu ton maillot ?;Tu as ton maillot ?} {imp::Tu prépares ta valise.>Prépare ta valise.} {aff::Je ne connais personne.>Je connais quelqu'un.} {neg::La mer est toujours calme.>La mer n'est jamais calme.} {int::Les moniteurs sont gentils.>Est-ce que les moniteurs sont gentils ?;Les moniteurs sont-ils gentils ?;Les moniteurs sont gentils ?} {imp::Vous mettez vos bottes.>Mettez vos bottes.} {aff::Il ne pleut jamais ici.>Il pleut toujours ici.} {neg::Quelqu'un a le mal de mer.>Personne n'a le mal de mer.} {int::Nous faisons du char à voile.>Est-ce que nous faisons du char à voile ?;Faisons-nous du char à voile ?;Nous faisons du char à voile ?} {imp::Nous ramassons des coquillages.>Ramassons des coquillages.} {neg::J'écris des cartes postales.>Je n'écris pas de cartes postales.} {int::Vous téléphonez à vos parents.>Est-ce que vous téléphonez à vos parents ?;Téléphonez-vous à vos parents ?;Vous téléphonez à vos parents ?} {aff::Mon voisin ne dort plus.>Mon voisin dort encore.} {neg::Le cuisinier prépare quelque chose.>Le cuisinier ne prépare rien.} {int::La semaine passe vite.>Est-ce que la semaine passe vite ?;La semaine passe-t-elle vite ?;La semaine passe vite ?} {imp::Tu ranges ta chambre.>Range ta chambre.}"}, {"titre": "Le chantier", "texte": "{int::Les ouvriers construisent une école.>Est-ce que les ouvriers construisent une école ?;Les ouvriers construisent-ils une école ?;Les ouvriers construisent une école ?} {neg::La grue fonctionne encore.>La grue ne fonctionne plus.} {imp::Tu mets ton casque.>Mets ton casque.} {aff::Personne ne travaille le samedi.>Quelqu'un travaille le samedi.} {neg::Le camion livre des briques.>Le camion ne livre pas de briques.} {int::Tu entends le marteau-piqueur.>Est-ce que tu entends le marteau-piqueur ?;Entends-tu le marteau-piqueur ?;Tu entends le marteau-piqueur ?} {imp::Nous restons derrière la barrière.>Restons derrière la barrière.} {aff::Le chef n'est jamais content.>Le chef est toujours content.} {neg::Quelqu'un surveille le chantier.>Personne ne surveille le chantier.} {int::Vous voyez les fondations.>Est-ce que vous voyez les fondations ?;Voyez-vous les fondations ?;Vous voyez les fondations ?} {imp::Vous portez des gants.>Portez des gants.} {aff::Je ne vois rien.>Je vois quelque chose.} {neg::Les voisins se plaignent toujours du bruit.>Les voisins ne se plaignent jamais du bruit.} {int::Le toit sera fini en mai.>Est-ce que le toit sera fini en mai ?;Le toit sera-t-il fini en mai ?;Le toit sera fini en mai ?} {neg::Il manque quelque chose.>Il ne manque rien.} {imp::Tu fermes la porte du chantier.>Ferme la porte du chantier.} {int::On peut visiter.>Est-ce qu'on peut visiter ?;Peut-on visiter ?;On peut visiter ?} {aff::Il n'y a plus de sable.>Il y a encore du sable.}"}, {"titre": "La fête de l'école", "texte": "{neg::Quelqu'un oublie son costume.>Personne n'oublie son costume.} {int::Tu danses avec nous.>Est-ce que tu danses avec nous ?;Danses-tu avec nous ?;Tu danses avec nous ?} {imp::Tu prends ton tambourin.>Prends ton tambourin.} {aff::La chorale ne chante jamais faux.>La chorale chante toujours faux.} {neg::Les parents sont encore dans la cour.>Les parents ne sont plus dans la cour.} {int::Le directeur fait un discours.>Est-ce que le directeur fait un discours ?;Le directeur fait-il un discours ?;Le directeur fait un discours ?} {imp::Nous chantons plus fort.>Chantons plus fort.} {aff::Je n'ai rien gagné à la tombola.>J'ai gagné quelque chose à la tombola.} {neg::Il y a des crêpes.>Il n'y a pas de crêpes.} {int::Vous aimez le spectacle.>Est-ce que vous aimez le spectacle ?;Aimez-vous le spectacle ?;Vous aimez le spectacle ?} {imp::Vous applaudissez les petits.>Applaudissez les petits.} {neg::Mon frère gagne toujours au chamboule-tout.>Mon frère ne gagne jamais au chamboule-tout.} {int::La fête finit tard.>Est-ce que la fête finit tard ?;La fête finit-elle tard ?;La fête finit tard ?} {aff::Personne ne range les chaises.>Quelqu'un range les chaises.} {neg::La maîtresse dit quelque chose.>La maîtresse ne dit rien.} {imp::Tu remercies les parents.>Remercie les parents.} {int::Nous pouvons rester.>Est-ce que nous pouvons rester ?;Pouvons-nous rester ?;Nous pouvons rester ?} {aff::Il n'y a plus de gâteaux.>Il y a encore des gâteaux.} {neg::Le soleil brille encore.>Le soleil ne brille plus.}"}, {"titre": "Le voyage en Écosse", "texte": "{int::Vous partez en Écosse.>Est-ce que vous partez en Écosse ?;Partez-vous en Écosse ?;Vous partez en Écosse ?} {neg::Il pleut toujours là-bas.>Il ne pleut jamais là-bas.} {imp::Tu prends ton imperméable.>Prends ton imperméable.} {aff::Je ne parle pas anglais.>Je parle anglais.} {neg::Quelqu'un nous attend à l'aéroport.>Personne ne nous attend à l'aéroport.} {int::Le château est hanté.>Est-ce que le château est hanté ?;Le château est-il hanté ?;Le château est hanté ?} {imp::Nous visitons Édimbourg.>Visitons Édimbourg.} {aff::Il ne fait jamais beau.>Il fait toujours beau.} {neg::On voit le monstre du loch Ness.>On ne voit pas le monstre du loch Ness.} {int::Tu crois aux monstres.>Est-ce que tu crois aux monstres ?;Crois-tu aux monstres ?;Tu crois aux monstres ?} {imp::Vous écoutez la cornemuse.>Écoutez la cornemuse.} {neg::Mon père achète quelque chose.>Mon père n'achète rien.} {int::Les moutons traversent la route.>Est-ce que les moutons traversent la route ?;Les moutons traversent-ils la route ?;Les moutons traversent la route ?} {aff::Il ne fait plus froid.>Il fait encore froid.} {neg::Le guide raconte des légendes.>Le guide ne raconte pas de légendes.} {imp::Tu goûtes ce gâteau.>Goûte ce gâteau.} {int::Nous rentrons dimanche.>Est-ce que nous rentrons dimanche ?;Rentrons-nous dimanche ?;Nous rentrons dimanche ?} {neg::Ma sœur a encore le mal de mer.>Ma sœur n'a plus le mal de mer.} {aff::Personne ne porte de kilt.>Quelqu'un porte un kilt.} {int::Vous reviendrez l'an prochain.>Est-ce que vous reviendrez l'an prochain ?;Reviendrez-vous l'an prochain ?;Vous reviendrez l'an prochain ?}"}]});
/* ce que dit le panneau, pour chacun de ces exercices à écrire */
/* v75 : la phrase : on transforme des phrases entières (interrogative, impérative, négative, affirmative) */
const OP_TF = { int: 'interrogative', imp: 'impérative', neg: 'négative', aff: 'affirmative' };
const qOpTF = (e) => ({ int: 'Transforme cette phrase en <strong>question</strong> (phrase interrogative).', imp: 'Transforme cette phrase en <strong>ordre</strong> (phrase impérative).', neg: 'Mets cette phrase à la <strong>forme négative</strong>.', aff: 'Mets cette phrase à la <strong>forme affirmative</strong>.' })[e.op] || 'Transforme cette phrase.';
/* v75 : accorder phrase par phrase : un encart par mot, qui dit sa nature et ce qu'il faut faire */
const motTF = (e) => e.src.replace(/^\(|\)$/g, '');
const qNatTF = (e) => ({ nc: `Dans le groupe nominal, accorde le nom commun « ${esc(motTF(e))} ».`, np: `Écris le nom propre « ${esc(motTF(e))} ».`, adj: `Dans le groupe nominal, accorde l'adjectif « ${esc(motTF(e))} ».`, det: `Dans le groupe nominal, accorde le déterminant « ${esc(motTF(e))} ».`, att: `Accorde l'adjectif attribut « ${esc(motTF(e))} » avec le sujet.`, pp: `Le verbe est conjugué avec l'auxiliaire être : accorde le participe passé « ${esc(motTF(e))} » avec le sujet.`, v: `Conjugue au présent et accorde avec son sujet le verbe ${esc(e.src)}.` })[e.nat] || `Écris le mot ${esc(e.src)} bien accordé.`;
const ESSAIS_PH = 'on te dit ce qui ne va pas : la ponctuation, l\'ordre des mots, la négation…';
const TFCFG = {
  'cm-pres': { parPhrase: true, instr: "Conjugue les verbes au présent", intro: "Appuie sur un verbe entre parenthèses et écris-le au <strong>présent</strong>. Ce sont souvent des verbes irréguliers : <em>aller, dire, faire, pouvoir, prendre, vouloir, voir, venir, partir…</em>", q: (e) => `Écris le verbe ${esc(e.src)} <strong>au présent</strong>.`, regles: "Au présent, les verbes irréguliers sont à connaître par cœur : <em>je vais, nous allons, ils vont ; je dis, vous dites ; je fais, vous faites, ils font ; je peux, ils peuvent ; je prends, nous prenons, ils prennent ; je veux, ils veulent ; je vois, nous voyons ; je viens, ils viennent ; je pars, nous partons</em>." },
  'cm-fut': { parPhrase: true, instr: "Conjugue les verbes au futur", intro: "Appuie sur un verbe entre parenthèses et écris-le au <strong>futur</strong>. Attention aux radicaux irréguliers.", q: (e) => `Écris le verbe ${esc(e.src)} <strong>au futur</strong>.`, regles: "Au futur, les terminaisons sont toujours <em>-ai, -as, -a, -ons, -ez, -ont</em>. Mais certains radicaux changent : <em>aller → j'irai, être → je serai, avoir → j'aurai, faire → je ferai, voir → je verrai, venir → je viendrai, pouvoir → je pourrai, vouloir → je voudrai, envoyer → j'enverrai, courir → je courrai, falloir → il faudra</em>." },
  'cm-imp': { parPhrase: true, instr: "Conjugue les verbes à l'imparfait", intro: "Appuie sur un verbe entre parenthèses et écris-le à l'<strong>imparfait</strong>.", q: (e) => `Écris le verbe ${esc(e.src)} <strong>à l'imparfait</strong>.`, regles: "À l'imparfait, tous les verbes ont les mêmes terminaisons : <em>-ais, -ais, -ait, -ions, -iez, -aient</em>. On part du radical de « nous » au présent : <em>nous finissons → je finissais</em>. Attention : <em>nous mangions, je commençais</em> ; <em>nous criions, vous étudiiez</em> (deux i)." },
  'cm-ps': { parPhrase: true, instr: "Conjugue les verbes au passé simple", intro: "Appuie sur un verbe entre parenthèses et écris-le au <strong>passé simple</strong>, le temps des actions dans les récits.", q: (e) => `Écris le verbe ${esc(e.src)} <strong>au passé simple</strong>.`, regles: "Au passé simple, à la 3e personne : les verbes en <em>-er</em> font <em>-a, -èrent</em> (<em>il chanta, ils chantèrent</em>) ; les autres <em>-it, -irent</em> (<em>il finit, il prit, ils virent</em>) ou <em>-ut, -urent</em> (<em>il fut, il eut, il put, il voulut</em>), et <em>venir, tenir</em> font <em>-int, -inrent</em> (<em>il vint, ils tinrent</em>)." },
  'cm-pc': { parPhrase: true, instr: "Conjugue les verbes au passé composé", intro: "Appuie sur un verbe entre parenthèses et écris-le au <strong>passé composé</strong> : l'auxiliaire <em>avoir</em> ou <em>être</em> au présent, puis le participe passé. Avec être, pense à l'accord.", q: (e) => `Écris le verbe ${esc(e.src)} <strong>au passé composé</strong>.`, regles: "Le <strong>passé composé</strong> : auxiliaire au présent + participe passé (<em>j'ai joué, il est tombé</em>). Avec <strong>être</strong>, le participe s'accorde avec le sujet (<em>elles sont parties</em>). Participes à connaître : <em>pris, mis, fait, dit, vu, lu, eu, été, venu, couru, ri, écrit</em>." },
  'cm-pqp': { parPhrase: true, instr: "Conjugue les verbes au plus-que-parfait", intro: "Appuie sur un verbe entre parenthèses et écris-le au <strong>plus-que-parfait</strong> : l'auxiliaire à l'<strong>imparfait</strong>, puis le participe passé. Il dit ce qui s'était passé <strong>avant</strong>.", q: (e) => `Écris le verbe ${esc(e.src)} <strong>au plus-que-parfait</strong>.`, regles: "Le <strong>plus-que-parfait</strong> se forme avec l'auxiliaire <em>avoir</em> ou <em>être</em> à l'<strong>imparfait</strong> et le participe passé : <em>il avait mangé, elle était partie</em>. Il exprime une action <strong>antérieure</strong> à une autre action passée : c'est le passé du passé." },
  'cm-cond': { parPhrase: true, instr: "Conjugue les verbes au conditionnel présent", intro: "Appuie sur un verbe entre parenthèses et écris-le au <strong>conditionnel présent</strong> : pour un souhait, une demande polie, ou ce qui arriverait si…", q: (e) => `Écris le verbe ${esc(e.src)} <strong>au conditionnel présent</strong>.`, regles: "Le <strong>conditionnel présent</strong> a le radical du <strong>futur</strong> et les terminaisons de l'<strong>imparfait</strong> : <em>je chanterais, tu viendrais, nous ferions, ils pourraient</em>. Il sert à exprimer un souhait (<em>je voudrais</em>), la politesse (<em>pourriez-vous</em>), ou une conséquence imaginée (<em>si j'étais riche, je voyagerais</em>)." },
  'cm-imper': { parPhrase: true, instr: "Conjugue les verbes à l'impératif", intro: "Appuie sur un verbe entre parenthèses et écris-le à l'<strong>impératif présent</strong>. Regarde à qui l'on parle : à une personne (tu), à plusieurs (vous), ou au groupe dont on fait partie (nous).", q: (e) => `Écris le verbe ${esc(e.src)} <strong>à l'impératif présent</strong>.`, regles: "L'<strong>impératif</strong> donne un ordre ou un conseil, sans sujet, à trois personnes : <em>range, rangeons, rangez</em>. Les verbes en <em>-er</em> n'ont pas de s à la 2e personne du singulier (<em>range, va</em>). Formes à connaître : <em>sois, soyons, soyez ; aie, ayons, ayez ; sache, sachons, sachez ; fais, faites ; dis, dites</em>." },
  'cm-bontemps': { parPhrase: true, instr: 'Conjugue chaque verbe au bon temps du récit', intro: 'Ce récit est au <strong>passé</strong>. Les verbes sont à l\'infinitif : à toi de choisir le bon temps. Une action qui fait avancer l\'histoire : le <strong>passé simple</strong>. Un décor, une description, une habitude : l\'<strong>imparfait</strong>. Ce qui s\'était passé <strong>avant</strong> : le <strong>plus-que-parfait</strong>.', q: (e) => `Écris le verbe ${esc(e.src)} <strong>au bon temps</strong> du récit.`, regles: 'Dans un récit au passé, trois temps travaillent ensemble. Le <strong>passé simple</strong> pour les actions principales, l\'une après l\'autre (<em>il sortit, il traversa</em>). L\'<strong>imparfait</strong> pour le décor, les descriptions, les actions qui durent (<em>le brouillard couvrait la forêt</em>). Le <strong>plus-que-parfait</strong> pour ce qui s\'était passé avant (<em>les chasseurs l\'avaient vu la veille</em>). Relis toujours la phrase entière : c\'est son sens qui décide du temps.' },
  'cm-accgn': { accord: true, parPhrase: true, q: qNatTF, instr: 'Accorde les mots du groupe nominal', intro: 'Les mots entre parenthèses sont écrits <strong>au masculin singulier</strong>. Écris chacun <strong>bien accordé</strong> avec le nom qu\'il accompagne. Attention aux pluriels et aux féminins <strong>irréguliers</strong>, et aux déterminants (<em>ce / cet / cette / ces, leur / leurs, tout / toute / tous / toutes</em>).', essais: 'on te dit ce qui ne va pas : le genre, le nombre, un pluriel ou un féminin irrégulier, ou l\'orthographe.', regles: 'Dans le <strong>groupe nominal</strong>, le nom commande l\'accord du déterminant et de l\'adjectif. Pluriels irréguliers : <em>-al → -aux</em> (sauf <em>bal, carnaval, chacal, festival, récital, régal</em> : -als), <em>-ail → -aux</em> pour <em>bail, corail, émail, soupirail, travail, vantail, vitrail</em>, sept mots en <em>-ou</em> prennent un x (<em>bijou, caillou, chou, genou, hibou, joujou, pou</em>), <em>un œil → des yeux</em>. Féminins : <em>blanc → blanche, doux → douce, long → longue, frais → fraîche, vieux → vieille</em>. <em>Ce</em> devient <em>cet</em> devant une voyelle.' },
  'cm-accsv': { accord: true, parPhrase: true, q: qNatTF, instr: 'Accorde chaque verbe avec son sujet', intro: 'Les verbes sont à l\'<strong>infinitif</strong>. Conjugue-les <strong>au présent</strong>, en les accordant avec leur <strong>sujet</strong>. Attention aux pièges : le sujet peut être <strong>loin</strong> du verbe, <strong>après</strong> lui, ou fait de <strong>plusieurs</strong> noms.', essais: 'on te dit ce qui ne va pas : la terminaison (l\'accord avec le sujet) ou l\'orthographe du verbe.', regles: 'Le verbe s\'accorde avec son <strong>sujet</strong>. Cherche-le avec « Qui est-ce qui… ? » : il peut être loin du verbe (<em>le cri des singes attire</em> : c\'est le cri qui attire), après lui (<em>dans l\'eau nagent les otaries</em>). Deux sujets valent un pluriel (<em>Tom et Lina sautent</em>) ; <em>toi et moi</em> = nous, <em>toi et ton frère</em> = vous. <em>Chacun</em>, <em>personne</em>, <em>tout le monde</em> sont au singulier.' },
  'cm-accatt': { accord: true, parPhrase: true, q: qNatTF, instr: 'Accorde l\'attribut et le participe passé', intro: 'Les mots entre parenthèses sont au masculin singulier. Ils sont <strong>attributs du sujet</strong> (après <em>être, paraître, sembler, devenir, rester</em>) ou <strong>participes passés</strong> conjugués avec l\'auxiliaire <strong>être</strong>. Dans les deux cas, ils s\'accordent avec le <strong>sujet</strong>.', essais: 'on te dit ce qui ne va pas : le genre, le nombre ou l\'orthographe.', regles: 'L\'<strong>attribut du sujet</strong> s\'accorde en genre et en nombre avec le sujet : <em>elles sont fatiguées</em>. Avec l\'auxiliaire <strong>être</strong>, le <strong>participe passé</strong> s\'accorde lui aussi avec le sujet : <em>ma sœur est allée, les enfants sont partis</em>. Quand le sujet est <em>nous</em>, il faut savoir qui parle : <em>nous sommes restés</em> (des garçons, ou un groupe mêlé), <em>nous sommes restées</em> (des filles).' },
  'cm-bilanacc': { accord: true, parPhrase: true, q: qNatTF, instr: 'Fais tous les accords', intro: 'Les noms et les adjectifs sont au masculin singulier, les verbes à l\'infinitif, les participes au masculin singulier. Chaque encart te dit ce qu\'il faut faire : accorder dans le groupe nominal, conjuguer au présent et accorder avec le sujet, accorder l\'attribut ou le participe passé.', essais: 'on te dit ce qui ne va pas : le genre, le nombre, la terminaison du verbe ou l\'orthographe.', regles: 'Tous les accords partent du <strong>sens de la phrase</strong> : qui fait l\'action ? de qui parle-t-on ? Dans le <strong>groupe nominal</strong>, le nom commande le déterminant et l\'adjectif. Le <strong>verbe</strong> s\'accorde avec son sujet. L\'<strong>attribut</strong> et le <strong>participe passé avec être</strong> s\'accordent avec le sujet.' },
  'cm-neg2': { phrase: true, instr: 'Mets chaque phrase à la forme négative', intro: 'Mets chaque phrase soulignée à la <strong>forme négative</strong>. Attention aux mots qui changent : <em>toujours → ne… jamais</em>, <em>encore → ne… plus</em>, <em>quelque chose → ne… rien</em>, <em>quelqu\'un → personne ne…</em> ; et après la négation, <em>un, une, des</em> deviennent <em>de</em>. Écris la phrase entière.', q: qOpTF, essais: ESSAIS_PH, regles: 'La négation a deux mots qui entourent le verbe. Le second dépend du sens : <em>pas</em> (simple négation), <em>jamais</em> (contraire de <em>toujours</em>), <em>plus</em> (contraire de <em>encore</em>), <em>rien</em> (contraire de <em>quelque chose</em>). <em>Quelqu\'un</em> devient <em>personne ne…</em>, sans <em>pas</em>. Après la négation, <em>un, une, des</em> deviennent <em>de</em> ou <em>d\'</em> : <em>il a des amis → il n\'a pas d\'amis</em>.' },
  'cm-int2': { phrase: true, instr: 'Transforme chaque phrase en question', intro: 'Transforme chaque phrase soulignée en <strong>question</strong>. Tu peux utiliser « <strong>Est-ce que</strong> » ou l\'<strong>inversion</strong> du sujet. Quand le sujet est un nom, on le reprend par un pronom : <em>Le train arrive. → Le train arrive-t-il ?</em> Écris la phrase entière.', q: qOpTF, essais: ESSAIS_PH, regles: 'Trois façons de poser une question : avec l\'intonation (<em>Tu viens ?</em>, surtout à l\'oral) ; avec <em>est-ce que</em> (<em>Est-ce que tu viens ?</em>) ; avec l\'<strong>inversion</strong> du sujet, la plus soutenue (<em>Viens-tu ?</em>). Si le sujet est un nom, il reste devant et un pronom le reprend après le verbe : <em>Le train arrive-t-il ?</em> On ajoute <em>-t-</em> entre une voyelle et <em>il, elle, on</em>.' },
  'cm-transfo': { phrase: true, instr: 'Transforme chaque phrase comme demandé', intro: 'Appuie sur une phrase soulignée : l\'encart (et la voix) te disent quoi en faire : forme <strong>négative</strong> (avec le bon mot : pas, jamais, plus, rien, personne), forme <strong>affirmative</strong>, <strong>question</strong> ou <strong>ordre</strong>. Écris la phrase entière. Ensuite, deux bandes apparaissent dessous : son <strong>type</strong> (en bleu) et sa <strong>forme</strong> (en vert).', q: qOpTF, essais: ESSAIS_PH, regles: 'Pour transformer une phrase, on part de son <strong>sens</strong>. Forme négative : <em>toujours → jamais, encore → plus, quelque chose → rien, quelqu\'un → personne</em>, et <em>des → de</em>. Forme affirmative : le contraire. Question : <em>est-ce que</em> ou l\'inversion. Ordre : l\'impératif, sans sujet.' },
  'ce-int': { phrase: true, instr: 'Transforme chaque phrase en question', intro: 'Chaque phrase soulignée donne une information. Transforme-la en <strong>question</strong> : tu peux commencer par « <strong>Est-ce que</strong> », ou <strong>inverser</strong> le verbe et le sujet (<em>Tu viens. → Viens-tu ?</em>). N\'oublie pas le <strong>point d\'interrogation</strong>. Écris la phrase entière.', q: qOpTF, essais: ESSAIS_PH, regles: 'Pour poser une question, on peut : ajouter « <strong>Est-ce que</strong> » au début (<em>Est-ce que tu viens ?</em>) ; <strong>inverser</strong> le verbe et le pronom sujet, reliés par un <strong>trait d\'union</strong> (<em>Viens-tu ?</em>), avec un <em>-t-</em> quand le verbe finit par une voyelle (<em>Chante-t-elle ?</em>) ; ou, à l\'oral surtout, faire seulement monter la voix (<em>Tu viens ?</em>). La phrase interrogative se termine toujours par un <strong>point d\'interrogation</strong>.' },
  'ce-imper': { phrase: true, instr: 'Transforme chaque phrase en ordre', intro: 'Transforme chaque phrase soulignée en <strong>ordre</strong> ou en <strong>conseil</strong> : c\'est la phrase <strong>impérative</strong>. On enlève le sujet (<em>Tu ranges ta chambre. → Range ta chambre.</em>). Écris la phrase entière.', q: qOpTF, essais: ESSAIS_PH, regles: 'La phrase <strong>impérative</strong> donne un ordre ou un conseil. Elle n\'a <strong>pas de sujet</strong> : <em>Range ta chambre. Rangeons. Rangez.</em> Attention : à l\'impératif, les verbes en <em>-er</em> n\'ont <strong>pas de s</strong> quand on parle à une seule personne (<em>tu ranges → range</em>). Elle se termine par un point ou un point d\'exclamation.' },
  'ce-neg': { phrase: true, instr: 'Mets chaque phrase à la forme négative', intro: 'Mets chaque phrase soulignée à la <strong>forme négative</strong> : entoure le verbe avec <strong>ne… pas</strong> (<em>Le chat mange. → Le chat ne mange pas.</em>). Devant une voyelle, <em>ne</em> devient <em>n\'</em>. Écris la phrase entière.', q: qOpTF, essais: ESSAIS_PH, regles: 'À la <strong>forme négative</strong>, deux mots entourent le verbe : <strong>ne</strong> avant, <strong>pas</strong> après (<em>il ne dort pas</em>). Devant une voyelle ou un h muet, <em>ne</em> devient <strong>n\'</strong> (<em>il n\'aime pas, je n\'entends pas</em>). On peut aussi dire <em>ne… plus</em>, <em>ne… jamais</em>, <em>ne… rien</em>.' },
  'ce-transfo': { phrase: true, instr: 'Transforme chaque phrase comme demandé', intro: 'Appuie sur une phrase soulignée : l\'encart (et la voix) te disent ce qu\'il faut en faire : la mettre à la forme <strong>négative</strong> ou <strong>affirmative</strong>, en faire une <strong>question</strong> (interrogative) ou un <strong>ordre</strong> (impérative). Écris la phrase entière. Une fois la phrase écrite, deux bandes apparaissent dessous : son <strong>type</strong> (en bleu) et sa <strong>forme</strong> (en vert).', q: qOpTF, essais: ESSAIS_PH, regles: 'Tu sais maintenant transformer une phrase. <strong>Négative</strong> : ne… pas autour du verbe (<em>il ne dort pas</em>). <strong>Affirmative</strong> : on enlève ne… pas. <strong>Interrogative</strong> : « est-ce que… ? » ou l\'inversion avec un trait d\'union (<em>viens-tu ?</em>). <strong>Impérative</strong> : sans sujet, et sans s pour les verbes en -er (<em>range ta chambre</em>).' },
  'ce-accord': { accord: true, parPhrase: true, q: qNatTF, instr: 'Accorde les mots du groupe nominal', intro: 'Les mots entre parenthèses sont écrits <strong>au masculin singulier</strong>, comme dans le dictionnaire. Appuie sur chacun et écris-le <strong>bien accordé</strong> avec le nom qu\'il accompagne : au <strong>féminin</strong> (souvent un <em>e</em>) ? au <strong>pluriel</strong> (souvent un <em>s</em>, parfois un <em>x</em>) ? Regarde le déterminant.', essais: 'on te dit ce qui ne va pas : le genre (masculin ou féminin), le nombre (singulier ou pluriel) ou l\'orthographe du mot.', regles: 'Dans le <strong>groupe nominal</strong>, le <strong>nom</strong> donne son genre et son nombre au <strong>déterminant</strong> et à l\'<strong>adjectif</strong>. Au <strong>féminin</strong>, on ajoute souvent un <em>e</em> (<em>petit → petite</em>), mais pas toujours : <em>vieux → vieille, blanc → blanche, gentil → gentille, beau → belle</em>. Au <strong>pluriel</strong>, on ajoute un <em>s</em> (<em>des chats</em>) ; les mots en <em>-eau</em> et <em>-eu</em> prennent un <em>x</em> (<em>des oiseaux, des jeux</em>), les mots en <em>-al</em> font <em>-aux</em> (<em>des chevaux</em>), et sept mots en <em>-ou</em> prennent un <em>x</em> : <em>bijou, caillou, chou, genou, hibou, joujou, pou</em>. Les mots terminés par <em>s</em> ou <em>x</em> ne changent pas (<em>gris, curieux</em>).' },
  'ce-bilanacc': { accord: true, parPhrase: true, q: qNatTF, instr: 'Accorde les noms, les adjectifs et les verbes', intro: 'Les mots entre parenthèses sont écrits comme dans le dictionnaire : les noms et les adjectifs <strong>au masculin singulier</strong>, les verbes <strong>à l\'infinitif</strong>. Écris chacun <strong>bien accordé</strong> : les noms et les adjectifs avec le groupe nominal, les verbes <strong>au présent</strong>, avec leur sujet.', essais: 'on te dit ce qui ne va pas : le genre, le nombre, la terminaison du verbe (l\'accord avec le sujet) ou l\'orthographe.', regles: 'Deux accords à bien connaître. <strong>Dans le groupe nominal</strong>, le nom donne son genre et son nombre au déterminant et à l\'adjectif : <em>des fleurs rouges, une vieille dame</em>. <strong>Le verbe</strong> s\'accorde avec son <strong>sujet</strong> : <em>le chat dort, les chats dorment ; nous chantons, vous chantez</em>. Pour trouver le sujet, pose la question « Qui est-ce qui… ? ».' },
  'ce-inf': { parPhrase: true, instr: 'Trouve l\'infinitif de chaque verbe', intro: 'Appuie sur un verbe souligné et écris son <strong>infinitif</strong> : son nom, comme dans le dictionnaire (<em>il mange → manger</em>).', q: (e) => `« ${esc(e.src)} » : quel est son <strong>infinitif</strong> ?`, regles: 'L\'<strong>infinitif</strong> est le nom du verbe : c\'est la forme qu\'on trouve dans le dictionnaire. Pour le trouver, on dit « il faut… » : <em>il faut manger, il faut finir, il faut prendre</em>. Au passé composé, c\'est le deuxième mot qui donne l\'infinitif : <em>nous avons regardé → regarder</em>.' },
  'ce-pres': { parPhrase: true, instr: 'Conjugue les verbes au présent', intro: 'Appuie sur un verbe entre parenthèses et écris-le au <strong>présent</strong>, avec la bonne terminaison.', q: (e) => `Écris le verbe ${esc(e.src)} au <strong>présent</strong>.`, regles: 'Au <strong>présent</strong>, les verbes en <em>-er</em> se terminent par <em>-e, -es, -e, -ons, -ez, -ent</em> (je chante, tu chantes, il chante, nous chantons, vous chantez, ils chantent). Les verbes comme <em>finir</em> : <em>-is, -is, -it, -issons, -issez, -issent</em>. <em>Aller, faire, dire, venir, prendre, voir, pouvoir, vouloir</em> sont irréguliers : il faut les apprendre par cœur.' },
  'ce-fut': { parPhrase: true, instr: 'Conjugue les verbes au futur', intro: 'Appuie sur un verbe entre parenthèses et écris-le au <strong>futur</strong>.', q: (e) => `Écris le verbe ${esc(e.src)} au <strong>futur</strong>.`, regles: 'Au <strong>futur</strong>, on garde en général l\'infinitif et on ajoute <em>-ai, -as, -a, -ons, -ez, -ont</em> : <em>je chanterai, tu finiras, nous partirons</em>. Attention aux verbes irréguliers : <em>être → je serai, avoir → j\'aurai, aller → j\'irai, faire → je ferai, venir → je viendrai, voir → je verrai, pouvoir → je pourrai, vouloir → je voudrai</em>.' },
  'ce-imp': { parPhrase: true, instr: 'Conjugue les verbes à l\'imparfait', intro: 'Appuie sur un verbe entre parenthèses et écris-le à l\'<strong>imparfait</strong>.', q: (e) => `Écris le verbe ${esc(e.src)} à l'<strong>imparfait</strong>.`, regles: 'À l\'<strong>imparfait</strong>, tous les verbes ont les mêmes terminaisons : <em>-ais, -ais, -ait, -ions, -iez, -aient</em> (je chantais, nous chantions, ils chantaient). On l\'emploie pour raconter ce qui durait ou ce qui se répétait autrefois.' },
  'ce-pca': { parPhrase: true, instr: 'Conjugue les verbes au passé composé', intro: 'Appuie sur un verbe entre parenthèses et écris-le au <strong>passé composé</strong>, avec l\'auxiliaire <strong>avoir</strong>.', q: (e) => `Écris le verbe ${esc(e.src)} au <strong>passé composé</strong> (avec avoir).`, regles: 'Le <strong>passé composé</strong> a deux mots : l\'auxiliaire <strong>avoir</strong> au présent (<em>ai, as, a, avons, avez, ont</em>) et le <strong>participe passé</strong> du verbe (<em>chanté, fini, pris, vu, fait</em>) : <em>nous avons chanté, tu as pris</em>.' },
  'ce-pce': { parPhrase: true, instr: 'Conjugue les verbes au passé composé', intro: 'Appuie sur un verbe entre parenthèses et écris-le au <strong>passé composé</strong>, avec l\'auxiliaire <strong>être</strong>. Attention à l\'accord !', q: (e) => `Écris le verbe ${esc(e.src)} au <strong>passé composé</strong> (avec être).`, regles: 'Certains verbes forment leur passé composé avec l\'auxiliaire <strong>être</strong> (<em>aller, venir, partir, arriver, rester, tomber, naître, entrer, sortir…</em>). Alors le participe passé <strong>s\'accorde avec le sujet</strong>, comme un adjectif : <em>il est parti, elle est partie, ils sont partis, elles sont parties</em>.' },
  'ce-etav': { parPhrase: true, instr: 'Conjugue être et avoir', intro: 'Le titre du texte te dit à quel temps conjuguer. Appuie sur un verbe entre parenthèses et écris-le.', q: (e) => `Écris le verbe ${esc(e.src)} au temps demandé dans le titre.`, regles: '<strong>Être</strong> : je suis, je serai, j\'étais, j\'ai été. <strong>Avoir</strong> : j\'ai, j\'aurai, j\'avais, j\'ai eu. Ce sont les deux verbes les plus utiles : ils servent aussi d\'auxiliaires pour former les temps composés.' },
  'ce-bontemps': { parPhrase: true, instr: 'Conjugue chaque verbe au bon temps', intro: 'Les verbes sont à l\'<strong>infinitif</strong>, entre parenthèses. À toi de les conjuguer <strong>au bon temps</strong> : regarde les mots qui donnent le moment (<em>hier, aujourd\'hui, demain, autrefois, maintenant, bientôt</em>) et demande-toi si la phrase <strong>raconte une action</strong> ou <strong>décrit</strong> quelque chose.', q: (e) => `Écris le verbe ${esc(e.src)} <strong>au bon temps</strong>.`, regles: 'Pour choisir le temps, on regarde <strong>quand</strong> se passe l\'action. <strong>Maintenant</strong> (aujourd\'hui, ce matin) : le <strong>présent</strong>. <strong>Plus tard</strong> (demain, bientôt, ce soir) : le <strong>futur</strong>. <strong>Avant</strong> (hier, la semaine dernière) : le <strong>passé composé</strong> pour une action qui s\'est passée une fois (<em>soudain, Léo est tombé</em>), l\'<strong>imparfait</strong> pour une description ou une habitude (<em>le ciel était bleu ; chaque matin, il arrosait ses salades</em>).' },
};

const tf = { elts: [], rep: {}, sel: null, registre: null };
const isTF = () => !!currentGame.tf;
const TF_T = () => TRANSFOS[currentGame.tf][game.questions[game.index].t];
/* comparer deux écritures : sans majuscules, apostrophes et espaces unifiés ; « sans accents » à part */
const normTF = (x) => String(x || '').toLowerCase().replace(/[’`]/g, '\'').replace(/\s+/g, ' ').replace(/^[\s«»"]+|[\s.,;:!?«»"]+$/g, '').trim();
const sansAccTF = (x) => x.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const attendusTF = (e) => (tf.registre === 'mod' ? e.mod : e.cls);
/* v70 : dire à l'élève ce qui ne va pas dans sa forme verbale : le temps est-il le bon ? la terminaison (accord avec le
   sujet) ? le radical du verbe (faute lexicale) ? l'auxiliaire, le participe passé ? Ce n'est qu'un diagnostic
   approché, fondé sur les terminaisons : il sert à orienter l'élève, pas à le noter. */
const AUX_PRES = { ai: 'avoir', as: 'avoir', a: 'avoir', avons: 'avoir', avez: 'avoir', ont: 'avoir', suis: 'être', es: 'être', est: 'être', sommes: 'être', êtes: 'être', sont: 'être' };
const AUX_IMP = { avais: 'avoir', avait: 'avoir', avions: 'avoir', aviez: 'avoir', avaient: 'avoir', étais: 'être', était: 'être', étions: 'être', étiez: 'être', étaient: 'être' };
const PRESENTS_PIEGES = ['fais', 'fait', 'vais', 'sais', 'sait', 'tais', 'tait', 'plait', 'plaît', 'rit', 'ris'];
function analyseForme(x) {
  let m = normTF(x).replace(/^(me|te|se|nous|vous) /, '').replace(/^[mts]'/, '').split(' ');
  if (m.length >= 2 && (AUX_PRES[m[0]] || AUX_IMP[m[0]])) {
    const aux = m[0], part = m[m.length - 1];
    return { temps: AUX_PRES[aux] ? 'passé composé' : 'plus-que-parfait', aux, auxVerbe: AUX_PRES[aux] || AUX_IMP[aux], part };
  }
  const v = m[m.length - 1];
  const fin = (re) => (v.match(re) || [])[0];
  let t = 'présent', e = fin(/(e|es|ent|s|x|t|d|ons|ez)$/) || '';
  if (fin(/(rais|rait|rions|riez|raient)$/)) { t = 'conditionnel présent'; e = fin(/(ais|ait|ions|iez|aient)$/); }
  else if (fin(/(ais|ait|ions|iez|aient)$/) && !PRESENTS_PIEGES.includes(v)) { t = 'imparfait'; e = fin(/(ais|ait|ions|iez|aient)$/); }
  else if (fin(/(rai|ras|ra|rons|rez|ront)$/) && v.length > 3) { t = 'futur'; e = fin(/(ai|as|a|ons|ez|ont)$/); }
  else if (fin(/(âmes|âtes|èrent|ûmes|ûtes|îmes|îtes)$/)) { t = 'passé simple'; e = fin(/(mes|tes|rent)$/); }
  else if (fin(/(ai|ait|aie)$/) && !PRESENTS_PIEGES.includes(v) && v.length > 4) { t = 'imparfait'; e = fin(/(ai|ait|aie)$/); }
  return { temps: t, fin: e, radical: v.slice(0, v.length - (e || '').length), mot: v };
}
const LE_TEMPS = (t) => ({ 'impératif présent': 'l\'impératif présent', 'présent': 'le présent', imparfait: 'l\'imparfait', futur: 'le futur', 'passé composé': 'le passé composé', 'plus-que-parfait': 'le plus-que-parfait', 'conditionnel présent': 'le conditionnel présent', 'passé simple': 'le passé simple' }[t] || t);
/* v72 : UN PETIT CONJUGUEUR, pour comprendre la réponse de l'élève : à quel temps, à quelle personne a-t-il conjugué le
   verbe ? On engendre toutes les formes du verbe (présent, imparfait, futur, conditionnel, passé simple, subjonctif
   présent, passé composé, plus-que-parfait) et on cherche la sienne, ou la plus proche. */
const PERS = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];
const T_IMP = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'], T_FUT = ['ai', 'as', 'a', 'ons', 'ez', 'ont'], T_COND = T_IMP, T_SUBJ = ['e', 'es', 'e', 'ions', 'iez', 'ent'];
const CJ_IRR = {
  /* v80 : verbes du CM */
  envoyer: { p: 'envoie envoies envoie envoyons envoyez envoient', ps: 'envoyai envoyas envoya envoyâmes envoyâtes envoyèrent', f: 'enverr', pp: 'envoyé', s: 'envoie envoies envoie envoyions envoyiez envoient' },
  apercevoir: { p: 'aperçois aperçois aperçoit apercevons apercevez aperçoivent', ps: 'aperçus aperçus aperçut aperçûmes aperçûtes aperçurent', f: 'apercevr', pp: 'aperçu', s: 'aperçoive aperçoives aperçoive apercevions aperceviez aperçoivent' },
  coudre: { p: 'couds couds coud cousons cousez cousent', ps: 'cousis cousis cousit cousîmes cousîtes cousirent', pp: 'cousu' },
  traire: { p: 'trais trais trait trayons trayez traient', ps: '- - - - - -', pp: 'trait' },
  plaindre: { p: 'plains plains plaint plaignons plaignez plaignent', ps: 'plaignis plaignis plaignit plaignîmes plaignîtes plaignirent', pp: 'plaint' },
  joindre: { p: 'joins joins joint joignons joignez joignent', ps: 'joignis joignis joignit joignîmes joignîtes joignirent', pp: 'joint' },
  cuire: { p: 'cuis cuis cuit cuisons cuisez cuisent', ps: 'cuisis cuisis cuisit cuisîmes cuisîtes cuisirent', pp: 'cuit' },
  taire: { p: 'tais tais tait taisons taisez taisent', ps: 'tus tus tut tûmes tûtes turent', pp: 'tu' },
  'être': { p: 'suis es est sommes êtes sont', ps: 'fus fus fut fûmes fûtes furent', f: 'ser', pp: 'été', imp: 'ét', s: 'sois sois soit soyons soyez soient' },
  avoir: { p: 'ai as a avons avez ont', ps: 'eus eus eut eûmes eûtes eurent', f: 'aur', pp: 'eu', s: 'aie aies ait ayons ayez aient' },
  aller: { p: 'vais vas va allons allez vont', f: 'ir', pp: 'allé', aux: 'être', s: 'aille ailles aille allions alliez aillent' },
  faire: { p: 'fais fais fait faisons faites font', ps: 'fis fis fit fîmes fîtes firent', f: 'fer', pp: 'fait', s: 'fasse fasses fasse fassions fassiez fassent' },
  dire: { p: 'dis dis dit disons dites disent', ps: 'dis dis dit dîmes dîtes dirent', pp: 'dit' },
  venir: { p: 'viens viens vient venons venez viennent', ps: 'vins vins vint vînmes vîntes vinrent', f: 'viendr', pp: 'venu', aux: 'être', s: 'vienne viennes vienne venions veniez viennent' },
  tenir: { p: 'tiens tiens tient tenons tenez tiennent', ps: 'tins tins tint tînmes tîntes tinrent', f: 'tiendr', pp: 'tenu', s: 'tienne tiennes tienne tenions teniez tiennent' },
  pouvoir: { p: 'peux peux peut pouvons pouvez peuvent', ps: 'pus pus put pûmes pûtes purent', f: 'pourr', pp: 'pu', s: 'puisse puisses puisse puissions puissiez puissent' },
  vouloir: { p: 'veux veux veut voulons voulez veulent', ps: 'voulus voulus voulut voulûmes voulûtes voulurent', f: 'voudr', pp: 'voulu', s: 'veuille veuilles veuille voulions vouliez veuillent' },
  voir: { p: 'vois vois voit voyons voyez voient', ps: 'vis vis vit vîmes vîtes virent', f: 'verr', pp: 'vu', s: 'voie voies voie voyions voyiez voient' },
  prendre: { p: 'prends prends prend prenons prenez prennent', ps: 'pris pris prit prîmes prîtes prirent', pp: 'pris', s: 'prenne prennes prenne prenions preniez prennent' },
  pleuvoir: { p: '- - pleut - - -', ps: '- - plut - - -', f: 'pleuvr', pp: 'plu', imp: 'pleuv', s: '- - pleuve - - -' },
  falloir: { p: '- - faut - - -', ps: '- - fallut - - -', f: 'faudr', pp: 'fallu', imp: 'fall', s: '- - faille - - -' },
  devoir: { p: 'dois dois doit devons devez doivent', ps: 'dus dus dut dûmes dûtes durent', f: 'devr', pp: 'dû' },
  savoir: { p: 'sais sais sait savons savez savent', ps: 'sus sus sut sûmes sûtes surent', f: 'saur', pp: 'su', s: 'sache saches sache sachions sachiez sachent' },
  mettre: { p: 'mets mets met mettons mettez mettent', ps: 'mis mis mit mîmes mîtes mirent', pp: 'mis' },
  lire: { p: 'lis lis lit lisons lisez lisent', ps: 'lus lus lut lûmes lûtes lurent', pp: 'lu' },
  'écrire': { p: 'écris écris écrit écrivons écrivez écrivent', ps: 'écrivis écrivis écrivit écrivîmes écrivîtes écrivirent', pp: 'écrit' },
  boire: { p: 'bois bois boit buvons buvez boivent', ps: 'bus bus but bûmes bûtes burent', pp: 'bu', s: 'boive boives boive buvions buviez boivent' },
  courir: { p: 'cours cours court courons courez courent', ps: 'courus courus courut courûmes courûtes coururent', f: 'courr', pp: 'couru' },
  mourir: { p: 'meurs meurs meurt mourons mourez meurent', ps: 'mourus mourus mourut mourûmes mourûtes moururent', f: 'mourr', pp: 'mort', aux: 'être' },
  dormir: { p: 'dors dors dort dormons dormez dorment', ps: 'dormis dormis dormit dormîmes dormîtes dormirent', pp: 'dormi' },
  partir: { p: 'pars pars part partons partez partent', ps: 'partis partis partit partîmes partîtes partirent', pp: 'parti', aux: 'être' },
  sortir: { p: 'sors sors sort sortons sortez sortent', ps: 'sortis sortis sortit sortîmes sortîtes sortirent', pp: 'sorti', aux: 'être' },
  sentir: { p: 'sens sens sent sentons sentez sentent', ps: 'sentis sentis sentit sentîmes sentîtes sentirent', pp: 'senti' },
  servir: { p: 'sers sers sert servons servez servent', ps: 'servis servis servit servîmes servîtes servirent', pp: 'servi' },
  rire: { p: 'ris ris rit rions riez rient', ps: 'ris ris rit rîmes rîtes rirent', pp: 'ri' },
  offrir: { p: 'offre offres offre offrons offrez offrent', ps: 'offris offris offrit offrîmes offrîtes offrirent', pp: 'offert' },
  ouvrir: { p: 'ouvre ouvres ouvre ouvrons ouvrez ouvrent', ps: 'ouvris ouvris ouvrit ouvrîmes ouvrîtes ouvrirent', pp: 'ouvert' },
  cueillir: { p: 'cueille cueilles cueille cueillons cueillez cueillent', ps: 'cueillis cueillis cueillit cueillîmes cueillîtes cueillirent', f: 'cueiller', pp: 'cueilli' },
  'connaître': { p: 'connais connais connaît connaissons connaissez connaissent', ps: 'connus connus connut connûmes connûtes connurent', pp: 'connu' },
  'naître': { p: 'nais nais naît naissons naissez naissent', ps: 'naquis naquis naquit naquîmes naquîtes naquirent', pp: 'né', aux: 'être' },
  peindre: { p: 'peins peins peint peignons peignez peignent', ps: 'peignis peignis peignit peignîmes peignîtes peignirent', pp: 'peint' },
  'éteindre': { p: 'éteins éteins éteint éteignons éteignez éteignent', ps: 'éteignis éteignis éteignit éteignîmes éteignîtes éteignirent', pp: 'éteint' },
  vivre: { p: 'vis vis vit vivons vivez vivent', ps: 'vécus vécus vécut vécûmes vécûtes vécurent', pp: 'vécu' },
  construire: { p: 'construis construis construit construisons construisez construisent', ps: 'construisis construisis construisit construisîmes construisîtes construisirent', pp: 'construit' },
  conduire: { p: 'conduis conduis conduit conduisons conduisez conduisent', ps: 'conduisis conduisis conduisit conduisîmes conduisîtes conduisirent', pp: 'conduit' },
  croire: { p: 'crois crois croit croyons croyez croient', ps: 'crus crus crut crûmes crûtes crurent', pp: 'cru', s: 'croie croies croie croyions croyiez croient' },
  suivre: { p: 'suis suis suit suivons suivez suivent', ps: 'suivis suivis suivit suivîmes suivîtes suivirent', pp: 'suivi' },
  battre: { p: 'bats bats bat battons battez battent', ps: 'battis battis battit battîmes battîtes battirent', pp: 'battu' },
  plaire: { p: 'plais plais plaît plaisons plaisez plaisent', ps: 'plus plus plut plûmes plûtes plurent', pp: 'plu' },
  craindre: { p: 'crains crains craint craignons craignez craignent', ps: 'craignis craignis craignit craignîmes craignîtes craignirent', pp: 'craint' },
  'recevoir': { p: 'reçois reçois reçoit recevons recevez reçoivent', ps: 'reçus reçus reçut reçûmes reçûtes reçurent', f: 'recevr', pp: 'reçu' },
  'asseoir': { p: 'assieds assieds assied asseyons asseyez asseyent', ps: 'assis assis assit assîmes assîtes assirent', f: 'assiér', pp: 'assis' },
  'paraître': { p: 'parais parais paraît paraissons paraissez paraissent', ps: 'parus parus parut parûmes parûtes parurent', pp: 'paru' },
  'résoudre': { p: 'résous résous résout résolvons résolvez résolvent', ps: 'résolus résolus résolut résolûmes résolûtes résolurent', pp: 'résolu' },
};
/* les composés : revenir, devenir, apprendre, comprendre, sourire, repartir… */
const CJ_PREF = [['c', 'ouvrir'], ['rec', 'ouvrir'], ['en', 'dormir'], ['pré', 'venir'], ['sur', 'vivre'], ['re', 'joindre'], ['re', 'venir'], ['de', 'venir'], ['par', 'venir'], ['sou', 'venir'], ['ap', 'prendre'], ['com', 'prendre'], ['sur', 'prendre'], ['sou', 'rire'], ['re', 'partir'], ['res', 'sortir'], ['re', 'mettre'], ['per', 'mettre'], ['pro', 'mettre'], ['ad', 'mettre'], ['dé', 'crire'], ['re', 'voir'], ['pré', 'voir'], ['dé', 'couvrir'], ['re', 'tenir'], ['ob', 'tenir'], ['con', 'tenir'], ['com', 'battre'], ['dé', 'plaire'], ['re', 'connaître'], ['ac', 'cueillir'], ['dis', 'paraître'], ['ap', 'paraître'], ['re', 'faire'], ['dé', 'faire']];
const CJ_3E_IR = ['partir', 'sortir', 'dormir', 'courir', 'venir', 'tenir', 'ouvrir', 'offrir', 'cueillir', 'mourir', 'servir', 'sentir', 'mentir', 'fuir', 'couvrir', 'souffrir', 'acquérir', 'bouillir', 'vêtir'];
function cjIrr(inf) {
  if (CJ_IRR[inf]) return CJ_IRR[inf];
  for (const [pre, base] of CJ_PREF) if (inf === pre + base && CJ_IRR[base]) {
    const B = CJ_IRR[base], add = (s) => s && s.split(' ').map((x) => (x === '-' ? x : pre + x)).join(' ');
    return { p: add(B.p), ps: add(B.ps), f: B.f && pre + B.f, pp: pre + B.pp, aux: base === 'venir' && pre !== 'sou' && pre !== 'pré' ? 'être' : B.aux, imp: B.imp && pre + B.imp, s: add(B.s) };
  }
  return null;
}
function cjListe(s) { return s ? s.split(' ') : null; }
/* toutes les formes simples d'un verbe : { forme: [[temps, personne]] } */
const CJ_ETRE = ['arriver', 'rester', 'tomber', 'entrer', 'rentrer', 'retourner', 'naître', 'mourir', 'aller', 'venir', 'devenir', 'revenir', 'partir', 'repartir', 'décéder', 'parvenir', 'survenir'];
const CJ_DEUX_AUX = ['monter', 'descendre', 'sortir', 'passer', 'rentrer', 'retourner', 'remonter', 'redescendre'];
function conjugue(inf) {
  const pron = /^(se |s')/.test(inf);
  inf = inf.replace(/^(se |s')/, '');
  const F = {}, met = (t, l) => l && l.forEach((f, k) => { if (f && f !== '-') (F[f] || (F[f] = [])).push([t, k]); });
  const I = cjIrr(inf);
  let pres, ps, futStem, pp, aux = 'avoir', impStem, subj;
  if (I) {
    pres = cjListe(I.p); ps = cjListe(I.ps); futStem = I.f || inf.replace(/e$/, ''); pp = I.pp; aux = I.aux || 'avoir';
    impStem = I.imp || (pres[3] !== '-' ? pres[3].replace(/ons$/, '') : null); subj = cjListe(I.s);
    if (!ps) { const r = inf.replace(/(er|ir|re|oir)$/, ''); ps = /er$/.test(inf) ? ['ai', 'as', 'a', 'âmes', 'âtes', 'èrent'].map((t) => r + t) : ['is', 'is', 'it', 'îmes', 'îtes', 'irent'].map((t) => r + t); }
    if (!subj && pres[5] !== '-') { const r = pres[5].replace(/ent$/, ''); subj = T_SUBJ.map((t, k) => (k === 3 || k === 4 ? impStem + t : r + t)); }
  } else if (/er$/.test(inf)) {
    const r = inf.slice(0, -2);
    /* les petites modifications du radical : manger → mangeons, lancer → lançons, appeler → appelle, lever → lève, préférer → préfère, payer → paie */
    const doux = (t) => (/^[aâo]/.test(t) ? (/g$/.test(r) ? `${r}e` : /c$/.test(r) ? `${r.slice(0, -1)}ç` : r) : r);
    let fort = r;
    if (/(appel|jet|renouvel|épel)$/.test(r)) fort = r + r.slice(-1);
    else if (/[^é]e[lmnrstv]$/.test(r) || /e(c|vr|ç)$/.test(r)) fort = r.replace(/e([^e]+)$/, 'è$1');
    else if (/é[^aeiouyé]+$/.test(r)) fort = r.replace(/é([^aeiouyé]+)$/, 'è$1');
    if (/[ou]y$/.test(r)) fort = `${r.slice(0, -1)}i`;
    if (/ay$/.test(r)) fort = r; /* payer : paye ou paie, on garde la forme régulière */
    pres = ['e', 'es', 'e', 'ons', 'ez', 'ent'].map((t, k) => (k === 3 || k === 4 ? doux(t) + t : fort + t));
    ps = ['ai', 'as', 'a', 'âmes', 'âtes', 'èrent'].map((t) => doux(t) + t);
    futStem = (/é[^aeiouyé]+$/.test(r) ? r : fort) + 'er';
    pp = `${r}é`; impStem = null; met('imparfait', T_IMP.map((t) => doux(t) + t)); subj = T_SUBJ.map((t, k) => (k === 3 || k === 4 ? r : fort) + t);
  } else if (/ir$/.test(inf) && !CJ_3E_IR.includes(inf)) {
    const r = inf.slice(0, -2);
    pres = ['is', 'is', 'it', 'issons', 'issez', 'issent'].map((t) => r + t);
    ps = ['is', 'is', 'it', 'îmes', 'îtes', 'irent'].map((t) => r + t);
    futStem = inf; pp = `${r}i`; impStem = `${r}iss`; subj = T_SUBJ.map((t) => `${r}iss${t}`);
  } else if (/dre$/.test(inf)) {
    const r = inf.slice(0, -2);
    pres = ['s', 's', '', 'ons', 'ez', 'ent'].map((t) => r + t);
    ps = ['is', 'is', 'it', 'îmes', 'îtes', 'irent'].map((t) => r + t);
    futStem = inf.slice(0, -1); pp = `${r}u`; impStem = r; subj = T_SUBJ.map((t) => r + t);
  } else return null;
  met('présent', pres); met('passé simple', ps); met('subjonctif présent', subj);
  /* v80 : l'impératif présent, seulement dans l'exercice qui le demande (pour ne pas brouiller les autres diagnostics) */
  if (/imper/.test(currentGame?.tf || '') && pres) {
    const IMPER = { 'être': 'sois soyons soyez', avoir: 'aie ayons ayez', savoir: 'sache sachons sachez', vouloir: 'veuille veuillons veuillez', aller: 'va allons allez' }[inf];
    const l = IMPER ? IMPER.split(' ') : [pres[1].replace(/es$/, 'e'), pres[3], pres[4]];
    met('impératif présent', ['-', l[0], '-', l[1], l[2], '-']);
  }
  if (impStem) met('imparfait', T_IMP.map((t) => impStem + t));
  if (futStem) { met('futur', T_FUT.map((t) => futStem + t)); met('conditionnel présent', T_COND.map((t) => futStem + t)); }
  /* les temps composés, avec l'accord du participe (e, s, es) */
  const AUXP = { avoir: cjListe(CJ_IRR.avoir.p), 'être': cjListe(CJ_IRR['être'].p) }, AUXI = { avoir: T_IMP.map((t) => `av${t}`), 'être': T_IMP.map((t) => `ét${t}`) };
  if (pron || CJ_ETRE.includes(inf)) aux = 'être';
  const auxs = CJ_DEUX_AUX.includes(inf) && !pron ? ['être', 'avoir'] : [aux];
  const pps = [pp, `${pp}e`, `${pp}s`, `${pp}es`].filter((x, k, l) => l.indexOf(x) === k);
  auxs.forEach((ax) => pps.forEach((p, a) => {
    met(`passé composé${a ? '#' + a : ''}`, AUXP[ax].map((x) => `${x} ${p}`));
    met(`plus-que-parfait${a ? '#' + a : ''}`, AUXI[ax].map((x) => `${x} ${p}`));
  }));
  return { formes: F, pp, aux, inf };
}
/* le diagnostic : la réponse de l'élève est-elle au bon temps ? à la bonne personne ? bien écrite ? */
function levenshtein(a, b) {
  const d = Array.from({ length: a.length + 1 }, (x, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
const UN_TEMPS = (t) => ({ 'impératif présent': 'à l\'impératif présent', 'présent': 'au présent', imparfait: 'à l\'imparfait', futur: 'au futur', 'conditionnel présent': 'au conditionnel présent', 'passé simple': 'au passé simple', 'subjonctif présent': 'au subjonctif présent', 'passé composé': 'au passé composé', 'plus-que-parfait': 'au plus-que-parfait' }[t] || t);
const baseT = (t) => t.split('#')[0];
function diagConjugueur(ecrit, bon, inf) {
  const C = conjugue(inf); if (!C) return null;
  const pron = /^(se |s')/.test(inf);
  const net = (x) => { let y = normTF(x); if (pron) y = y.replace(/^(me |te |se |nous |vous |m'|t'|s')/, ''); return y; };
  const s = net(ecrit), b = net(bon), I = C.inf;
  const E0 = C.formes[b]; if (!E0) return null;
  const IMPOSE = { 'ce-pres': 'présent', 'ce-fut': 'futur', 'ce-imp': 'imparfait', 'ce-pca': 'passé composé', 'ce-pce': 'passé composé', 'ce-bilanacc': 'présent', 'cm-accsv': 'présent', 'cm-bilanacc': 'présent', 'cm-pres': 'présent', 'cm-fut': 'futur', 'cm-imp': 'imparfait', 'cm-ps': 'passé simple', 'cm-pc': 'passé composé', 'cm-pqp': 'plus-que-parfait', 'cm-cond': 'conditionnel présent', 'cm-imper': 'impératif présent' }[currentGame.tf];
  /* v80 : quand un temps est imposé, on lit la bonne réponse à ce temps-là (range : impératif, pas présent) */
  const E = IMPOSE ? [...E0].sort((x, y) => (baseT(y[0]) === IMPOSE) - (baseT(x[0]) === IMPOSE)) : E0;
  const tE = baseT(E[0][0]), kE = E.map((x) => x[1]);
  const pasLogique = (t) => (IMPOSE ? `On te demande ${LE_TEMPS(IMPOSE)}.` : t === 'passé simple' ? 'Le passé simple est le temps du récit dans les livres : ici, il n\'est pas logique. Relis les mots qui disent quand se passe l\'action.' : 'Ici, ce temps n\'est pas logique : relis les mots qui disent quand se passe l\'action.');
  if (s === I) return 'Tu as recopié l\'infinitif : il faut conjuguer le verbe.';
  let S = C.formes[s];
  /* l'auxiliaire : être ou avoir ? l'infinitif à la place du participe ? */
  const mots = s.split(' ');
  if (!S && mots.length === 2 && /passé composé|plus-que-parfait/.test(tE)) {
    const AUXF = { ai: 'avoir', as: 'avoir', a: 'avoir', avons: 'avoir', avez: 'avoir', ont: 'avoir', suis: 'être', es: 'être', est: 'être', sommes: 'être', êtes: 'être', sont: 'être', avais: 'avoir', avait: 'avoir', avions: 'avoir', aviez: 'avoir', avaient: 'avoir', étais: 'être', était: 'être', étions: 'être', étiez: 'être', étaient: 'être' };
    const v = AUXF[mots[0]];
    if (v && v !== C.aux && [C.pp, `${C.pp}e`, `${C.pp}s`, `${C.pp}es`].includes(mots[1])) return `Tu as trouvé le bon temps : ${LE_TEMPS(tE)}. Mais attention à l'auxiliaire : ce verbe se conjugue avec « ${C.aux} ».`;
    if (v && (mots[1] === I || mots[1] === I.replace(/er$/, 'ez'))) return `Tu as trouvé le bon temps : ${LE_TEMPS(tE)}. Mais tu as écrit « ${mots[1]} » à la place du participe passé « ${C.pp} » : on entend le même son, mais ce n'est pas la même forme.`;
  }
  if (!S && mots.length === 1 && /passé composé|plus-que-parfait/.test(tE)) return `Il manque l'auxiliaire : ${UN_TEMPS(tE)}, le verbe s'écrit en deux mots (${C.aux === 'être' ? 'être' : 'avoir'} + participe passé).`;
  if (S) {
    const meme = S.filter((x) => baseT(x[0]) === tE);
    if (meme.length) {
      if (meme.some((x) => kE.includes(x[1]))) return `Tu as trouvé le bon temps : ${LE_TEMPS(tE)}. Mais le participe passé est mal accordé : c'est une faute d'accord. Avec l'auxiliaire être, il s'accorde avec le sujet.`;
      return `Tu as trouvé le bon temps : ${LE_TEMPS(tE)}. Mais ${/passé composé|plus-que-parfait/.test(tE) ? 'l\'auxiliaire' : 'la terminaison'} ne va pas avec le sujet : c'est une faute d'accord. Qui fait l'action ?`;
    }
    const t = baseT(S[0][0]);
    return `« ${ecrit.trim()} » est ${t === 'présent' ? 'au présent' : UN_TEMPS(t)}. ${pasLogique(t)}`;
  }
  /* la forme n'existe pas : on cherche ce que l'élève a sans doute voulu écrire */
  let best = null, bd = 99, bestT = null, bdT = 99;
  Object.keys(C.formes).forEach((f) => {
    const d = levenshtein(s, f); if (d < bd) { bd = d; best = f; }
    if (C.formes[f].some((x) => baseT(x[0]) === tE) && d < bdT) { bdT = d; bestT = f; }
  });
  /* on préfère la forme du temps attendu, si elle est presque aussi proche, ou si la terminaison est celle de ce temps */
  const finPareille = /futur|conditionnel|imparfait/.test(tE) && s.slice(-3) === b.slice(-3);
  if (bestT && (bdT <= bd + 1 || finPareille)) { best = bestT; bd = bdT; }
  if (!best || (bd > Math.max(3, Math.ceil(b.length / 2) + 1) && !finPareille)) return null;
  const B = C.formes[best], memeT = B.filter((x) => baseT(x[0]) === tE);
  if (memeT.length) {
    const memeP = memeT.some((x) => kE.includes(x[1]));
    const finJuste = s.slice(-2) === b.slice(-2);
    const irr = /futur|conditionnel/.test(tE) && cjIrr(I) && cjIrr(I).f ? ` Attention, ce verbe est irrégulier : ${LE_TEMPS(tE)} se forme sur « ${cjIrr(I).f}- ».` : '';
    if (memeP) return `Tu as trouvé le bon temps : ${LE_TEMPS(tE)}. Mais ${finJuste ? `tu as fait une faute d'orthographe dans le verbe lui-même (faute lexicale)${irr ? '.' + irr : ` : pense à l'infinitif, ${I}.`}` : 'la terminaison est mal écrite.'}${finJuste ? '' : irr}`;
    return `Tu as trouvé le bon temps : ${LE_TEMPS(tE)}. Mais tu as fait une faute d'orthographe dans le verbe lui-même (faute lexicale), et la terminaison ne va pas avec le sujet (faute d'accord).`;
  }
  const t = baseT(B[0][0]);
  return `Tu sembles avoir voulu écrire « ${best} », ${t === 'présent' ? 'au présent' : UN_TEMPS(t)}. ${pasLogique(t)}`;
}
/* v75 : comparer deux phrases : sans majuscules, mais avec la ponctuation finale */
const normPh = (x) => String(x || '').toLowerCase().replace(/[’`]/g, '\'').replace(/\s+/g, ' ').replace(/\s+([?!.;:,])/g, '$1').replace(/^[\s«"]+|[\s»"]+$/g, '').replace(/\s*-\s*/g, '-').trim();
function nuancePh(e, exact, ok) {
  if (e.op === 'int' && exact && ok.length > 2 && exact === ok[ok.length - 1]) return `C'est juste : à l'oral, on pose souvent la question seulement en faisant monter la voix. À l'écrit, on peut aussi dire « ${ok[0]} » ou « ${ok[1]} ».`;
  return '';
}
function diagPhrase(ecrit, bon, e) {
  const E = normPh(ecrit), B = normPh(bon), fin = E.slice(-1), mots = (x) => x.replace(/[.?!,]/g, ' ').replace(/\bn'/g, 'ne ').replace(/'/g, '\' ').split(/\s+/).filter(Boolean);
  const ok = attendusTF(e).map(normPh), dits = [];
  if (sansAccTF(E) === sansAccTF(B) || ok.some((x) => sansAccTF(x) === sansAccTF(E))) return 'Presque : il ne manque que les accents.';
  if (e.op === 'int') {
    if (fin !== '?') return 'Une question se termine par un point d\'interrogation ( ? ).';
    if (/est ce qu/.test(E)) return 'On écrit « est-ce que » avec deux traits d\'union.';
    if (ok.some((x) => x.replace(/-/g, ' ') === E.replace(/-/g, ' '))) return 'Quand on inverse le verbe et le sujet, on les relie par un trait d\'union : « viens-tu ? ».';
    if (ok.some((x) => x.replace(/-t-/g, '-') === E)) return 'Entre le verbe et « il », « elle » ou « on », on ajoute un « -t- » pour que ça sonne bien : « chante-t-elle ? ».';
    if (/est-ce que (il|elle|ils|elles|on)\b/.test(E)) return 'Devant il, elle ou on, « que » devient « qu\' » : « est-ce qu\'il… ».';
  }
  if (e.op === 'imp') {
    const m1 = mots(E)[0], b1 = mots(B)[0];
    if (/^(tu|nous|vous)$/.test(m1)) return 'À l\'impératif, on n\'écrit pas le sujet : on commence directement par le verbe (« Range ta chambre. »).';
    if (m1 === `${b1}s`) return 'À l\'impératif, quand on parle à une seule personne, les verbes en -er ne prennent pas de s : « range », « chante ».';
    if (fin === '?') return 'Un ordre n\'est pas une question : la phrase impérative se termine par un point ou un point d\'exclamation.';
  }
  if (e.op === 'neg' && /\b(jamais|plus|rien|personne)\b/.test(B) || e.op === 'neg' && / d(e |')/.test(` ${B} `)) {
    const W = mots(E), S = normPh(e.src);
    if (/^personne /.test(B) && !/^personne /.test(E)) return '« Quelqu\'un » devient « personne » à la forme négative : « Personne ne… ».';
    if (/^personne /.test(B) && W.includes('pas')) return 'Avec « personne », on n\'ajoute pas « pas » : « Personne ne frappe. »';
    if (/\bjamais\b/.test(B) && !W.includes('jamais')) return 'Le contraire de « toujours », c\'est « jamais » : « ne… jamais ».';
    if (/\bplus\b/.test(B) && !W.includes('plus')) return 'Le contraire de « encore », c\'est « plus » : « ne… plus ».';
    if (/\brien\b/.test(B) && !W.includes('rien')) return 'Le contraire de « quelque chose », c\'est « rien » : « ne… rien ».';
    if (/ (des|un|une|du) /.test(` ${E} `) && / d(e |')/.test(` ${B} `) && / (des|un|une|du) /.test(` ${S} `)) return 'Après la négation, « un », « une », « des » deviennent « de » (ou « d\' » devant une voyelle) : « il n\'a pas d\'amis ».';
  }
  if (e.op === 'neg') {
    const W = mots(E);
    if (!W.includes('ne') && !W.includes('n')) return 'Il manque le premier mot de la négation : « ne » (ou « n\' » devant une voyelle), juste avant le verbe.';
    if (!['pas', 'plus', 'jamais', 'rien'].some((x) => W.includes(x)) && !/^personne /.test(E)) return 'Il manque le deuxième mot de la négation : « pas » (ou « jamais », « plus », « rien »), juste après le verbe.';
    if (/\bne [aeiouyhéèêâ]/.test(E)) return 'Devant une voyelle, « ne » devient « n\' » : « il n\'aime pas ».';
    if (W.indexOf('pas') < W.indexOf('ne') || W.indexOf('pas') < W.indexOf('n')) return 'La négation entoure le verbe : « ne » avant, « pas » après.';
  }
  if (e.op === 'aff') {
    const W = mots(E);
    if (W.includes('ne') || W.includes('n') || W.includes('pas')) return 'Pour revenir à la forme affirmative, enlève les deux mots de la négation : « ne » (ou « n\' ») et « pas ».';
    if (/^je [aeiouyhéèêâ]/.test(E)) return 'Devant une voyelle, « je » devient « j\' » : « j\'aime ».';
  }
  if (!/[.?!]$/.test(E)) return 'N\'oublie pas le point à la fin de la phrase.';
  if (e.op !== 'int' && e.op !== 'imp' && fin !== B.slice(-1)) return `Attention au point à la fin de la phrase : ici, c'est « ${B.slice(-1)} ».`;
  const a = mots(E), b = mots(B), k = b.findIndex((w, j) => w !== a[j]);
  return k >= 0 ? `Regarde bien le mot « ${b[k]} » : il faut garder les mêmes mots que dans la phrase de départ${a[k] ? ` (tu as écrit « ${a[k]} »)` : ''}.` : 'Tu as écrit des mots en trop : garde seulement les mots de la phrase de départ.';
}
function diagnosticTF(ecrit, bon) {
  if (TFCFG[currentGame.tf]?.phrase) return diagPhrase(ecrit, bon, tf.elts[tf.sel]);
  if (sansAccTF(normTF(ecrit)) === sansAccTF(normTF(bon))) return 'Presque : il ne manque que les accents.';
  if (currentGame.tf === 'ce-inf') return /(er|ir|re|oir)$/.test(normTF(ecrit)) ? 'C\'est bien un infinitif, mais pas celui de ce verbe : cherche le verbe qu\'on entend dans la phrase.' : 'Ce n\'est pas un infinitif : l\'infinitif se termine par -er, -ir, -re ou -oir (dis « il faut… »).';
  /* v72 : si l'on connaît l'infinitif, le conjugueur reconnaît la forme écrite par l'élève (temps, personne) */
  const mInf = ((tf.elts[tf.sel] || {}).src || '').match(/^\((.+)\)$/);
  /* v74 : un nom ou un adjectif à accorder (le conjugueur ne reconnaît pas la bonne réponse comme une forme du verbe) */
  if (TFCFG[currentGame.tf]?.accord && mInf && !(conjugue(mInf[1])?.formes || {})[normTF(bon)]) return diagAccord(ecrit, bon, mInf[1]);
  /* v80 : l'impératif : les deux fautes les plus fréquentes */
  if (currentGame.tf === 'cm-imper') {
    if (/^(tu|nous|vous) /.test(normTF(ecrit))) return 'À l\'impératif, on n\'écrit pas le sujet : on commence directement par le verbe (« range », « rangeons », « rangez »).';
    if (normTF(ecrit) === `${normTF(bon)}s`) return 'À l\'impératif, quand on parle à une seule personne, les verbes en -er (et « aller » : va) ne prennent pas de s : « range », « chante ».';
  }
  /* v80 : le récit au passé : dire pourquoi ce temps, selon le sens de la phrase */
  if (currentGame.tf === 'cm-bontemps' && mInf) {
    const C = conjugue(mInf[1].toLowerCase()), b = normTF(bon).replace(/^(me |te |se |nous |vous |m'|t'|s')/, ''), e = normTF(ecrit).replace(/^(me |te |se |nous |vous |m'|t'|s')/, '');
    const tb = C?.formes[b] && baseT(C.formes[b][0][0]), te = C?.formes[e] && baseT(C.formes[e][0][0]);
    if (tb && te && tb !== te) return ({ 'passé simple': 'Ici, c\'est une action précise qui fait avancer l\'histoire : il faut le passé simple.', imparfait: 'Ici, on décrit le décor, ou une action qui dure (une habitude, un état) : il faut l\'imparfait.', 'plus-que-parfait': 'Cette action s\'était passée avant les autres : il faut le plus-que-parfait, le passé du passé.' })[tb] || `Ce n'est pas le bon temps : il faut ${LE_TEMPS(tb)}.`;
  }
  if (mInf) { const r = diagConjugueur(ecrit, bon, mInf[1].toLowerCase()); if (r) return r; }
  const a = analyseForme(ecrit), b = analyseForme(bon), dits = [];
  const IMPOSE = { 'ce-pres': 'présent', 'ce-fut': 'futur', 'ce-imp': 'imparfait', 'ce-pca': 'passé composé', 'ce-pce': 'passé composé', 'ce-bilanacc': 'présent', 'cm-accsv': 'présent', 'cm-bilanacc': 'présent', 'cm-pres': 'présent', 'cm-fut': 'futur', 'cm-imp': 'imparfait', 'cm-ps': 'passé simple', 'cm-pc': 'passé composé', 'cm-pqp': 'plus-que-parfait', 'cm-cond': 'conditionnel présent', 'cm-imper': 'impératif présent' }[currentGame.tf];
  if (a.temps !== b.temps && IMPOSE) return `Ce n'est pas le bon temps : on te demande ${LE_TEMPS(IMPOSE)}.`;
  if (a.temps !== b.temps) {
    return `Ce n'est pas le bon temps : tu as écrit un verbe ${a.temps === 'présent' ? 'au présent' : a.temps === 'imparfait' ? 'à l\'imparfait' : `au ${a.temps}`}. Relis les mots qui disent quand se passe l'action.`;
  }
  dits.push(`Tu as trouvé le bon temps : ${LE_TEMPS(b.temps)}.`);
  if (b.aux) {
    if (a.auxVerbe !== b.auxVerbe) dits.push(`Mais attention à l'auxiliaire : ce verbe se conjugue avec « ${b.auxVerbe} ».`);
    else if (a.aux !== b.aux) dits.push('Mais l\'auxiliaire ne s\'accorde pas avec le sujet : c\'est une faute d\'accord.');
    if (a.part !== b.part) {
      if (a.part && b.part && a.part.replace(/[es]+$/, '') === b.part.replace(/[es]+$/, '')) dits.push('Le participe passé est mal accordé : faute d\'accord.');
      else if (/(er|ir|re)$/.test(a.part || '') && /é$/.test(b.part)) dits.push(`Mais tu as écrit l'infinitif « ${a.part} » à la place du participe passé « ${b.part} » : on entend le même son, mais ce n'est pas la même forme.`);
      else dits.push('Le participe passé est mal écrit : regarde bien sa terminaison (é, i, u, is, it…) et son orthographe.');
    }
    return dits.join(' ');
  }
  const accord = a.fin !== b.fin, lexical = sansAccTF(a.radical) !== sansAccTF(b.radical);
  if (accord && lexical) dits.push('Mais tu as fait une faute d\'orthographe dans le verbe lui-même (faute lexicale), et la terminaison ne va pas avec le sujet (faute d\'accord).');
  else if (accord) dits.push('Mais la terminaison ne va pas avec le sujet : c\'est une faute d\'accord. Qui fait l\'action ?');
  else if (lexical) dits.push('Mais tu as fait une faute d\'orthographe dans le verbe lui-même (faute lexicale) : pense à l\'infinitif.');
  return dits.join(' ');
}
/* v74 : dire ce qui ne va pas dans l'accord d'un nom ou d'un adjectif : le genre ? le nombre ? l'orthographe ? */
function diagAccord(ecrit, bon, src) {
  const e = normTF(ecrit), b = normTF(bon), s = normTF(src);
  const sing = (x) => (x !== s && /[sx]$/.test(x) && !/[sx]$/.test(s) ? x.slice(0, -1) : x);
  const plB = sing(b) !== b, plE = sing(e) !== e;
  const fem = (x) => sing(x) !== s && /e$/.test(sing(x)) && !/e$/.test(s);
  const fB = fem(b), fE = fem(e), dits = [];
  if (e === s) return `Tu as recopié le mot sans l'accorder. Regarde le nom et son déterminant : ${fB ? `ici, le groupe nominal est au féminin ${plB ? 'pluriel' : 'singulier'}.` : plB ? 'ici, il y en a plusieurs : le groupe nominal est au pluriel.' : 'il faut l\'accorder.'}`;
  if (plB && !plE) dits.push(`Il manque la marque du <strong>pluriel</strong> : il y en a plusieurs, il faut ${/x$/.test(b) ? 'un x' : 'un s'}.${/x$/.test(b) ? (/al$/.test(s) ? ' Les mots en -al font leur pluriel en -aux (un cheval, des chevaux).' : /(eau|eu)$/.test(s) ? ' Les mots en -eau et en -eu prennent un x (des oiseaux, des jeux).' : /ou$/.test(s) ? ' Ce mot fait partie des sept mots en -ou qui prennent un x : bijou, caillou, chou, genou, hibou, joujou, pou.' : '') : ''}`);
  else if (!plB && plE) dits.push('Ce mot est au <strong>singulier</strong> : il n\'en faut qu\'un, pas de s.');
  else if (plB && plE && b.slice(-1) !== e.slice(-1)) dits.push(/x$/.test(b) ? `Le pluriel de ce mot ne se fait pas avec un s${/al$/.test(s) ? ' : les mots en -al font -aux (un cheval, des chevaux)' : /(eau|eu)$/.test(s) ? ' : les mots en -eau et en -eu prennent un x (des oiseaux, des jeux)' : /ou$/.test(s) ? ' : c\'est l\'un des sept mots en -ou qui prennent un x (bijou, caillou, chou, genou, hibou, joujou, pou)' : ''}.` : 'Ce mot fait son pluriel avec un s, pas avec un x.');
  if (fB && !fE) dits.push(`Ce mot doit être au <strong>féminin</strong> : il accompagne un nom féminin.${sing(b) === s + 'e' ? ' Ajoute un e.' : ' Attention, ce féminin est irrégulier : on n\'ajoute pas seulement un e (comme vieux → vieille, blanc → blanche).'}`);
  else if (!fB && fE) dits.push('Il ne faut pas ajouter de e à ce mot.');
  else if (fB && fE && sing(e) !== sing(b) && sing(e).slice(-3) === sing(b).slice(-3)) dits.push('Tu as bien mis le féminin, mais il y a une faute d\'orthographe dans le mot lui-même (faute lexicale).');
  else if (fB && fE && sing(e) !== sing(b)) dits.push('Tu as bien mis le féminin, mais ce féminin est irrégulier : on n\'ajoute pas seulement un e (comme vieux → vieille, blanc → blanche, gentil → gentille).');
  if (!dits.length) dits.push('Le genre et le nombre sont bons, mais il y a une faute d\'orthographe dans le mot lui-même (faute lexicale).');
  else if (!/^(Ce mot fait|Tu as bien)/.test(dits[0]) && sansAccTF(sing(e).replace(/e$/, '')) !== sansAccTF(sing(b).replace(/e$/, '')) && !/irrégulier|-al|-eau|-ou/.test(dits.join(''))) dits.push('Et il y a aussi une faute d\'orthographe dans le mot lui-même.');
  return dits.join(' ').replace(/<[^>]+>/g, '');
}
function decoupeTF(src) {
  const items = [], elts = []; let avant = '', phTF = 0;
  src.replace(/\{([^>}]+)>([^}]+)\}|([^\s{]+)/g, (m, a, b, w) => {
    if (w !== undefined) {
      if (/^[.!?]/.test(w) || /[.!?]$/.test(w)) phTF += 1;   /* v75 : le numéro de la phrase, pour travailler phrase par phrase */
      if (/^[.,;:!?»]$/.test(w) && items.length) { items[items.length - 1].suf += (/^[;:!?»]$/.test(w) ? ' ' : '') + w; return m; }
      if (w === '«') { avant += '« '; return m; }
      if (/['’]$/.test(w)) { avant += w; return m; }
      items.push({ t: w, pre: avant, suf: '' });
    } else {
      const [c, mo] = b.split('//');
      const mOp = a.match(/^(int|imp|neg|aff|nc|np|adj|v|det|att|pp)::(.*)$/), src = mOp ? mOp[2] : a;
      const x = { src, op: mOp && /^(int|imp|neg|aff)$/.test(mOp[1]) ? mOp[1] : undefined, nat: mOp && !/^(int|imp|neg|aff)$/.test(mOp[1]) ? mOp[1] : undefined, ph: phTF, cls: c.split(';').map((y) => y.trim()), mod: (mo || c).split(';').map((y) => y.trim()) };
      if (x.op === 'imp') x.cls = [...x.cls, ...x.cls.map((y) => y.replace(/\.$/, ' !'))];
      elts.push(x);
      items.push({ t: src, k: elts.length - 1, pre: avant, suf: '' });
    }
    avant = ''; return m;
  });
  return { items, elts };
}
function showQuestionTF() {
  const T = TF_T(), d = decoupeTF(T.texte);
  Object.assign(tf, { essais: {}, message: '', elts: d.elts, rep: {}, sel: null, registre: currentGame.tf === 'pres2passe' ? null : 'cls' });
  currentGame.total = d.elts.length;
  $('nat-sentence').innerHTML = `<div class="tm-cadre"><h3 class="tm-titre">Texte n° ${game.questions[game.index].t + 1} : « ${esc(T.titre)} »</h3><div class="tm-texte">${d.items.map((m) => (m.k !== undefined
    ? `<span class="w forme tf${d.elts[m.k].op ? ' tf-phrase' : ''}" data-i="${m.k}">${TFCFG[currentGame.tf]?.montreOp && d.elts[m.k].op ? `<span class="tf-op">${OP_TF[d.elts[m.k].op]}</span>` : ''}<span class="ancien"></span><span class="tx">${m.pre}<span class="f">${esc(m.t)}</span>${m.suf}</span></span>`
    : `<span class="w mot"><span class="tx">${m.pre}${esc(m.t)}${m.suf}</span></span>`)).join('')}</div></div>`;
  $('nat-character-stage').innerHTML = '';
  $('nat-correction').classList.add('hidden');
  $('nat-verdict-square').className = 'verdict-square';
  $('nat-fn-column').classList.add('hidden'); $('nat-nature-column').classList.remove('hidden');
  $('nat-buttons-invariables').innerHTML = '';
  $('nat-progress-label').textContent = `Texte n° ${game.questions[game.index].t + 1} (${NIVEAU_TEXTE(game.questions[game.index].t, TRANSFOS[currentGame.tf].length)})`;
  game.score = 0;
  majScoreTF(); panneauTF();
  if (tf.registre) setTimeout(() => { if (tf.sel === null && !game.fini) clicTF(0); }, 350);
  requestAnimationFrame(ajusteArdoise);
}
const tfFaits = () => Object.keys(tf.rep).length;
function majScoreTF() {
  $('nat-score-label').textContent = scoreLabel(game.score);
  $('nat-progress-bar').style.width = `${(tfFaits() / tf.elts.length) * 100}%`;
}
const versTF = () => (currentGame.tf === 'passe2pres' ? 'au système du présent' : tf.registre === 'mod' ? 'au passé, en français contemporain' : 'au passé, en français classique');
function panneauTF() {
  const N = tf.elts.length;
  const CF = TFCFG[currentGame.tf];
  $('nat-instruction').textContent = CF ? CF.instr : currentGame.tf === 'passe2pres' ? 'Réécris le texte au système du présent' : 'Réécris le texte au système du passé';
  if (!tf.registre) {
    $('nat-buttons-variables').innerHTML = `<div class="carte verte active libre"><p>Ce texte est au <strong>système du présent</strong>. Tu vas le réécrire <strong>au passé</strong>, comme un souvenir. Choisis d'abord ta langue :</p><div class="carte-choix carte-choix-2"><button type="button" class="nature-button" data-reg="cls">En français classique<br><small>(passé simple, subjonctif imparfait…)</small></button><button type="button" class="nature-button" data-reg="mod">En français contemporain<br><small>(passé composé, « aller » + infinitif…)</small></button></div></div>`;
    document.querySelectorAll('[data-reg]').forEach((b) => b.addEventListener('click', () => { tf.registre = b.dataset.reg; panneauTF(); clicTF(0); }));
    return;
  }
  if (tf.sel === null && CF) { $('nat-buttons-variables').innerHTML = nbspFr(`<div class="carte verte active libre"><p>${CF.intro}</p><p class="sous">${tfFaits()} sur ${N} déjà fait${tfFaits() > 1 ? 's' : ''}.</p></div>`); return; }
  if (tf.sel === null) {
    $('nat-buttons-variables').innerHTML = `<div class="carte verte active libre"><p>${N} mots ou groupes de mots sont soulignés : ils doivent changer pour que le texte soit ${versTF()}. Ce sont des <strong>formes verbales</strong> et des <strong>indicateurs de temps</strong> (<em>${currentGame.tf === 'passe2pres' ? 'ce jour-là → aujourd\'hui' : 'aujourd\'hui → ce jour-là'}</em>). Appuie sur l'un d'eux et écris ce qu'il devient.</p><p class="sous">${tfFaits()} sur ${N} déjà fait${tfFaits() > 1 ? 's' : ''}.</p></div>`;
    return;
  }
  if (CF?.parPhrase) { panneauPhraseTF(CF); return; }
  const e = tf.elts[tf.sel], r = tf.rep[tf.sel];
  let html = `<div class="carte verte active libre"><p>${CF ? CF.q(e) : `« <strong>${esc(e.src)}</strong> » : réécris-le ${versTF()}.`}</p>`;
  if (!r && tf.message) html += `<p class="tf-retour faux">${tf.message}</p>`;
  if (!r) html += `<form class="tf-form" autocomplete="off"><input type="text" class="tf-input" id="tf-input" autocapitalize="off" spellcheck="false" placeholder="écris ici…"><button type="submit" class="primary-button tf-ok">Valider</button></form>`;
  else html += `<p class="tf-retour ${r.pts === 1 ? 'juste' : r.pts ? 'moitie' : 'faux'}">${r.pts === 1 ? '✔ Bravo !' : r.pts ? `✔ Juste ${r.essai === 1 ? 'au deuxième essai, après une erreur' : 'au troisième essai, après deux erreurs'} : un demi-point.` : `Non : tu as écrit « ${esc(r.ecrit)} ». On écrit « ${esc(r.bon)} ».`}</p>`;
  if (r && r.nuance) html += `<p class="sous tf-nuance">${r.nuance}</p>`;
  html += '</div>';
  $('nat-buttons-variables').innerHTML = nbspFr(html);
  const f = document.querySelector('.tf-form');
  if (f) { f.addEventListener('submit', (ev) => { ev.preventDefault(); repondTF($('tf-input').value); }); setTimeout(() => $('tf-input')?.focus(), 50); }
}
const retourTF = (r) => `<p class="tf-retour ${r.pts === 1 ? 'juste' : r.pts ? 'moitie' : 'faux'}">${r.pts === 1 ? `✔ Bravo : « ${esc(r.ecrit)} » !` : r.pts ? `✔ Juste ${r.essai === 1 ? 'au deuxième essai, après une erreur' : 'au troisième essai, après deux erreurs'} : un demi-point.` : `Non : tu as écrit « ${esc(r.ecrit)} ». On écrit « ${esc(r.bon)} ».`}</p>`;
function panneauPhraseTF(CF) {
  const ph = tf.elts[tf.sel].ph, G = tf.elts.map((e, j) => j).filter((j) => tf.elts[j].ph === ph);
  const NP = new Set(tf.elts.map((e) => e.ph)).size, nPh = [...new Set(tf.elts.map((e) => e.ph))].indexOf(ph) + 1;
  let html = `<p class="sous tf-phrase-n">Phrase ${nPh} sur ${NP} : ${G.length} mot${G.length > 1 ? 's' : ''} à écrire, un par encart.</p>`;
  G.forEach((j) => {
    const e = tf.elts[j], r = tf.rep[j], actif = j === tf.sel && !r;
    html += `<div class="carte ${e.nat === 'v' ? 'rouge' : 'verte'} libre tf-encart${actif ? ' active' : ''}${r ? ' faite' : ''}" data-encart="${j}"><p>${CF.q(e)}</p>`;
    if (r) html += retourTF(r) + (r.nuance ? `<p class="sous tf-nuance">${r.nuance}</p>` : '');
    else {
      if (actif && tf.message) html += `<p class="tf-retour faux">${tf.message}</p>`;
      html += `<form class="tf-form" data-j="${j}" autocomplete="off"><input type="text" class="tf-input" data-j="${j}" autocapitalize="off" spellcheck="false" placeholder="écris ici…"><button type="submit" class="primary-button tf-ok">Valider</button></form>`;
    }
    html += '</div>';
  });
  $('nat-buttons-variables').innerHTML = nbspFr(html);
  const choisit = (j) => { if (tf.sel === j) return; wordEl(tf.sel)?.classList.remove('choisie'); tf.sel = j; wordEl(j)?.classList.add('choisie'); document.querySelectorAll('.tf-encart').forEach((c) => c.classList.toggle('active', Number(c.dataset.encart) === j)); };
  document.querySelectorAll('.tf-form').forEach((f) => {
    const j = Number(f.dataset.j), inp = f.querySelector('input');
    inp.addEventListener('focus', () => choisit(j));
    f.addEventListener('submit', (ev) => { ev.preventDefault(); choisit(j); repondTF(inp.value); });
  });
  setTimeout(() => document.querySelector(`.tf-input[data-j="${tf.sel}"]`)?.focus(), 50);
}
function clicTF(i, auto) {
  if (game.fini || !tf.registre || i === tf.sel) return;
  const avant = tf.sel; tf.sel = i;
  if (avant !== null) wordEl(avant)?.classList.remove('choisie');
  wordEl(i)?.classList.add('choisie');
  panneauTF();
  /* v69 : la voix lit la phrase, puis la consigne, et s'arrête */
  if (!tf.rep[i]) { const CF = TFCFG[currentGame.tf], e = tf.elts[i], memePh = CF?.parPhrase && avant !== null && tf.elts[avant]?.ph === e.ph; dis(memePh ? '' : phraseDe(wordEl(i)), (CF ? CF.q(e) : `Réécris ${e.src} ${versTF()}.`).replace(/<[^>]+>/g, '').replace(/\(([^)]+)\)/g, (m, x) => `: ${prononceInf(x)},`).replace(/[«»]/g, '')); }
}
/* v69 : deux chances. La voix lit la phrase avec la proposition de l'élève. Juste du premier coup : 1 point ;
   au deuxième essai : un demi-point ; sinon, la voix donne et lit la bonne réponse. */
/* v73 : quand deux temps sont possibles (imparfait ou passé composé), ce n'est pas une faute : on explique la
   différence de sens entre ce que l'élève a écrit et l'autre possibilité. */
function nuanceTF(i, ecrit, ok) {
  const compose = (x) => /^(ai|as|a|avons|avez|ont|suis|es|est|sommes|êtes|sont|s'est|me suis|se sont) /.test(normTF(x));
  const autre = ok.find((x) => x !== ecrit && compose(x) !== compose(ecrit));
  if (!autre) return '';
  const el = wordEl(i), f = el.querySelector('.f'), garde = f.textContent;
  const avec = (forme) => { f.textContent = forme; return phraseDe(el).replace(/\b([Jj])e ([aeiouyhéèêâ])/g, "$1'$2").replace(/\b([Jj])' ?([^aeiouyhéèêâ\s])/g, '$1e $2'); };
  const pEcrit = avec(ecrit), pAutre = avec(autre); f.textContent = garde;
  const imp = compose(ecrit) ? pAutre : pEcrit, pc = compose(ecrit) ? pEcrit : pAutre;
  return `Ici, deux temps sont possibles. Avec le passé composé, « ${pc} », on raconte une action précise, terminée, qui fait avancer l'histoire. Avec l'imparfait, « ${imp} », on montre l'action en train de se dérouler, comme un décor, pendant que d'autres choses se passent.`;
}
/* v79 : sous une phrase transformée, deux bandes : son type (bleu) et sa forme (vert), comme au collège */
function bandesPhraseTF(e, phrase) {
  const p = normPh(phrase), neg = /(^|\s)(ne |n')/.test(` ${p}`) && /\b(pas|plus|jamais|rien|personne)\b/.test(p);
  const type = /\?$/.test(p) ? 'interrogative' : e.op === 'imp' ? 'impérative' : 'déclarative';
  return `<span class="tf-bandes"><span class="tf-bande type">Phrase ${type}</span><span class="tf-bande forme">Forme ${neg ? 'négative' : 'affirmative'}</span></span>`;
}
function montreFormeTF(i, forme, classe) {
  const e = tf.elts[i], el = wordEl(i);
  el.querySelector('.tf-bandes')?.remove();
  if (e.op && classe !== 'essai-faux') el.insertAdjacentHTML('beforeend', bandesPhraseTF(e, forme));
  el.querySelector('.ancien').textContent = e.src;
  let f = forme;
  if (/^[A-ZÀ-Ý]/.test(e.src)) f = f.charAt(0).toUpperCase() + f.slice(1);
  el.querySelector('.f').textContent = f;
  el.classList.remove('essai-faux'); if (classe) el.classList.add(classe);
  /* l'élision : « je » devant une voyelle devient « j' » (j'ai porté, j'étais, j'irai) */
  const prec = el.previousElementSibling, tx = prec && prec.querySelector('.tx');
  if (tx && /^(je|j')$/i.test(tx.textContent.trim())) {
    const maj = /^J/.test(tx.textContent.trim()), voy = /^[aeiouyhéèêâîôû]/i.test(f);
    tx.textContent = voy ? (maj ? 'J\'' : 'j\'') : (maj ? 'Je' : 'je');
    prec.classList.toggle('elide', voy);
  }
  el.classList.add('trou');
}
function repondTF(ecrit) {
  const i = tf.sel; if (i === null || game.fini || tf.rep[i] || !normTF(ecrit)) return;
  const e = tf.elts[i], ok = attendusTF(e), PH = !!TFCFG[currentGame.tf]?.phrase, nrm = PH ? normPh : normTF, n = nrm(ecrit);
  const essai = (tf.essais || (tf.essais = {}))[i] || 0;
  let pts = 0, bon = ok[0];
  const exact = ok.find((x) => nrm(x) === n), accents = ok.find((x) => sansAccTF(nrm(x)) === sansAccTF(n));
  if (exact) { pts = essai ? 0.5 : 1; bon = exact; }
  else if (essai < 2) {
    /* v70 : une erreur : on montre la proposition dans le texte, la voix la lit, et dit précisément ce qui ne va pas.
       Trois essais en tout. */
    tf.essais[i] = essai + 1;
    montreFormeTF(i, ecrit.trim(), 'essai-faux');
    const diag = diagnosticTF(ecrit, accents || bon);
    const reste = essai === 0 ? 'Essaie encore : il te reste deux essais.' : 'Essaie encore : c\'est ton dernier essai.';
    tf.message = `${diag} ${reste}`;
    panneauTF(); tf.message = '';
    dis(phraseDe(wordEl(i)), `Ce n'est pas encore juste. ${diag} ${reste}`);
    return;
  } else if (accents) bon = accents;
  tf.rep[i] = { ecrit: ecrit.trim(), pts, bon, essai };
  game.score = Math.round((game.score + pts) * 10) / 10;
  if (pts < 1) game.erreurs.push({ mot: e.src, bonne: `« ${bon} »`, choisie: `« ${ecrit.trim()} »`, phrase: `texte « ${TF_T().titre} »` });
  /* dans le texte : l'ancienne forme barrée en petit au-dessus, la nouvelle à sa place */
  const el = wordEl(i);
  if (pts) {
    montreFormeTF(i, ecrit.trim());
    const nuance = PH ? nuancePh(e, exact, ok) : nuanceTF(i, exact, ok);
    tf.rep[i].nuance = nuance;
    dis(phraseDe(el), pts === 1 ? 'Bravo !' : `Oui, c'est juste cette fois, après ${essai === 1 ? 'une erreur' : 'deux erreurs'} : un demi-point.`, nuance && nuance.replace(/<[^>]+>/g, ''));
  }
  else {
    montreFormeTF(i, ecrit.trim(), 'essai-faux');
    const faux = phraseDe(el);
    montreFormeTF(i, bon); el.classList.add('forme-corrigee');
    dis(faux, `Ce n'est pas encore juste. La bonne réponse est : ${bon}.`, phraseDe(el));
  }
  el.classList.add('remplie');
  majScoreTF(); panneauTF();
  if (tfFaits() === tf.elts.length) { quandVoixFinie(finTF); return; }
  quandVoixFinie(() => {
    if (tf.sel !== i || game.fini) return;
    const N = tf.elts.length;
    for (let d = 1; d <= N; d++) { const k = (i + d) % N; if (!tf.rep[k]) { clicTF(k, true); return; } }
  });
}
function finTF() {
  boutonVoix(true);
  wordEl(tf.sel)?.classList.remove('choisie'); tf.sel = null;
  $('nat-buttons-variables').innerHTML = '';
  $('nat-instruction').textContent = TFCFG[currentGame.tf] ? 'C\'est fini !' : 'Le texte est réécrit !';
  const total = tf.elts.length;
  const regles = TFCFG[currentGame.tf] ? TFCFG[currentGame.tf].regles : currentGame.tf === 'passe2pres'
    ? 'Pour passer du système du passé au <strong>système du présent</strong> : l\'imparfait et le passé simple deviennent des <strong>présents</strong> ; le plus-que-parfait et le passé antérieur deviennent des <strong>passés composés</strong> ; le conditionnel qui dit le futur dans le passé devient un <strong>futur</strong> ; le subjonctif imparfait devient un <strong>subjonctif présent</strong>. Les indicateurs de temps changent aussi : <em>ce jour-là → aujourd\'hui, la veille → hier, le lendemain → demain</em>. Les paroles rapportées entre guillemets, elles, ne changent pas.'
    : tf.registre === 'mod'
      ? 'Pour passer au <strong>système du passé en français contemporain</strong> : le présent devient un <strong>imparfait</strong> (décor, habitude, second plan) ou un <strong>passé composé</strong> (actions du premier plan) ; le passé composé devient un <strong>plus-que-parfait</strong> ; le futur devient <strong>aller à l\'imparfait + infinitif</strong> ; le subjonctif présent ne change pas. Les indicateurs de temps changent : <em>aujourd\'hui → ce jour-là, hier → la veille, demain → le lendemain</em>. Une vérité générale reste au présent.'
      : 'Pour passer au <strong>système du passé en français classique</strong> : le présent devient un <strong>imparfait</strong> (décor, habitude, second plan) ou un <strong>passé simple</strong> (actions du premier plan) ; le passé composé devient un <strong>plus-que-parfait</strong> ; le futur devient un <strong>conditionnel présent</strong> ; le subjonctif présent devient un <strong>subjonctif imparfait</strong>. Les indicateurs de temps changent : <em>aujourd\'hui → ce jour-là, hier → la veille, demain → le lendemain</em>. Une vérité générale reste au présent.';
  $('nat-correction-details').innerHTML = nbspFr(`Tu as ${fmtPts(game.score)} point${game.score >= 2 ? 's' : ''} sur ${total}. ${regles} Les formes en orange montrent la bonne réponse, là où tu t'es trompé.`);
  $('nat-correction').classList.remove('hidden');
  $('nat-verdict-square').className = `verdict-square ${game.score >= total - 0.05 ? 'correct' : game.score < total / 2 ? 'wrong' : 'half'}`;
  $('nat-next-button').textContent = 'Voir mon résultat →';
  showCharacter(game.score >= total / 2 ? 'good' : 'bad', null);
}

/* ------------------------------------------------------------
   v50 : LA PHRASE — EXERCICE 1 : SYNTAXE DE LA PHRASE
   Sous le texte, des bandes de couleur qu'on étire sous les mots : en bleu, la syntaxe de chaque phrase
   (nominale, verbale simple, verbale complexe) ; en vert, la nature de chaque proposition. (Le rouge, pour les
   fonctions des propositions, viendra dans un autre exercice.) 1 point par bande posée juste, du premier au dernier mot.
   Deux erreurs sur la même phrase ou la même proposition : la bonne bande s'affiche, sans point.
   Dans le texte : [N] [S] [C] ouvrent une phrase nominale, verbale simple, verbale complexe ;
   {code|mots} est une proposition (code : I, P, R, CC complétive = K, circonstancielle = C, Q, INF, PART ; « - » : pas de
   proposition) ; les mots hors accolades (« et ») peuvent être compris dans une bande ou non.
   ------------------------------------------------------------ */
/* v53 : sur les bandes, le nom complet (« phrase nominale », « proposition indépendante ») : la proposition est une partie de la phrase */
const BANDES = {
  syn: [{ code: 'PH.nom', k: 'N', nom: 'Phrase nominale', court: 'Phrase nominale' }, { code: 'PH.simple', k: 'S', nom: 'Phrase verbale simple', court: 'Phrase verbale simple' }, { code: 'PH.complexe', k: 'C', nom: 'Phrase verbale complexe', court: 'Phrase verbale complexe' }],
  /* v51 : dans cet exercice, on distingue seulement indépendante, principale et subordonnée (le détail des subordonnées viendra plus tard) */
  nat: [
    { code: 'PR.ind', k: 'I', nom: 'Proposition indépendante', court: 'Proposition indépendante' }, { code: 'PR.princ', k: 'P', nom: 'Proposition principale', court: 'Proposition principale' },
    { code: 'PR.sub', k: 'SUB', nom: 'Proposition subordonnée', court: 'Proposition subordonnée' },
  ],
};
/* v54 : exercice 2 : la nature précise des propositions (vert) et la fonction des subordonnées (rouge) */
BANDES.natFin = [
  { code: 'PR.ind', k: 'I', nom: 'Proposition indépendante' }, { code: 'PR.princ', k: 'P', nom: 'Proposition principale' },
  { code: 'PR.rel', k: 'R', nom: 'Proposition subordonnée relative' }, { code: 'PR.compl', k: 'K', nom: 'Proposition subordonnée conjonctive complétive' },
  { code: 'PR.circ', k: 'C', nom: 'Proposition subordonnée conjonctive circonstancielle' }, { code: 'PR.interr', k: 'Q', nom: 'Proposition subordonnée interrogative indirecte' },
  { code: 'PR.inf', k: 'INF', nom: 'Proposition subordonnée infinitive' }, { code: 'PR.part', k: 'PART', nom: 'Proposition subordonnée participiale' },
].map((x) => ({ ...x, court: x.nom }));
BANDES.fn = [
  { code: 'FP.ant', k: 'ant', nom: 'Complément de l\'antécédent', court: 'Complément de l\'antécédent' },
  { code: 'FP.cod', k: 'cod', nom: 'COD du verbe de la principale', court: 'COD du verbe' },
  { code: 'FP.suj', k: 'suj', nom: 'Sujet du verbe de la principale', court: 'Sujet du verbe' },
  { code: 'FP.cct', k: 'cct', nom: 'CC de temps', court: 'CC de temps du verbe' }, { code: 'FP.ccc', k: 'ccc', nom: 'CC de cause', court: 'CC de cause du verbe' },
  { code: 'FP.cco', k: 'cco', nom: 'CC d\'opposition', court: 'CC d\'opposition du verbe' }, { code: 'FP.ccq', k: 'ccq', nom: 'CC de conséquence', court: 'CC de conséquence du verbe' },
  { code: 'FP.ccb', k: 'ccb', nom: 'CC de but', court: 'CC de but du verbe' }, { code: 'FP.cch', k: 'cch', nom: 'CC d\'hypothèse', court: 'CC d\'hypothèse du verbe' },
  { code: 'FP.ccm', k: 'ccm', nom: 'CC de manière', court: 'CC de manière du verbe' },
];
[...BANDES.syn, ...BANDES.nat, ...BANDES.natFin, ...BANDES.fn].forEach((x) => { x.article = x.nom.toLowerCase(); x.explication = ''; NATURE_BY_CODE[x.code] = x; });
/* v62 : types et formes de phrases : en bleu le type (par phrase), en vert la forme (par proposition),
   en rouge, au collège, la forme active ou passive (autrefois : la voix) */
BANDES.type = [
  { code: 'TY.decl', k: 'd', nom: 'Phrase déclarative' }, { code: 'TY.interr', k: 'q', nom: 'Phrase interrogative' }, { code: 'TY.imp', k: 'i', nom: 'Phrase impérative' },
].map((x) => ({ ...x, court: x.nom }));
BANDES.forme = [
  { code: 'FO.aff', k: 'a', nom: 'Forme affirmative' }, { code: 'FO.neg', k: 'n', nom: 'Forme négative' },
  { code: 'FO.affex', k: 'ae', nom: 'Forme affirmative et exclamative' }, { code: 'FO.negex', k: 'ne', nom: 'Forme négative et exclamative' },
].map((x) => ({ ...x, court: x.nom }));
BANDES.voix = [
  { code: 'FO.act', k: 'act', nom: 'Forme active (autrefois : voix active)', court: 'Forme active' },
  { code: 'FO.pass', k: 'pass', nom: 'Forme passive (autrefois : voix passive)', court: 'Forme passive' },
];
[...BANDES.type, ...BANDES.forme, ...BANDES.voix].forEach((x) => { x.article = x.nom.toLowerCase(); x.explication = ''; NATURE_BY_CODE[x.code] = x; });
const LISTE_SX = (lane) => (currentGame.sxTF ? (lane === 'syn' ? BANDES.type : lane === 'fn' ? BANDES.voix : BANDES.forme)
  : lane === 'syn' ? BANDES.syn : lane === 'fn' ? BANDES.fn : currentGame.sxFn ? BANDES.natFin : BANDES.nat);
/* v62 : les textes des types et formes, dix par niveau, du plus facile au plus difficile.
   [d] [q] [i] ouvrent une phrase déclarative, interrogative, impérative ; {forme|mots} est une proposition :
   a affirmative, n négative, ae affirmative et exclamative, ne négative et exclamative ; au collège, « /act » ou
   « /pass » : forme active ou passive. À l'école, seulement des phrases verbales simples (une proposition par phrase) :
   les propositions ne sont étudiées qu'à partir de la 6e. Un ordre qui finit par « ! » n'est pas pour autant exclamatif. */
const TEXTES_TF = {
  ce: [
    { titre: 'Le chat', texte: "[d] {a|Mon chat s'appelle Moustache.} [d] {a|Il dort toute la journée.} [q] {a|Dort-il encore ?} [d] {n|Il ne mange pas ses croquettes.} [i] {a|Viens ici, Moustache.} [d] {ae|Comme il est paresseux !}" },
    { titre: 'La récréation', texte: "[d] {a|La cloche sonne.} [d] {a|Les enfants sortent dans la cour.} [q] {a|Joues-tu au ballon ?} [d] {n|Léo ne joue pas.} [d] {a|Il range ses billes.} [i] {a|Courez vite.} [d] {ae|Que cette récréation est belle !}" },
    { titre: 'Au zoo', texte: "[d] {a|Nous visitons le zoo.} [q] {a|Vois-tu la girafe ?} [d] {ae|Comme elle est grande !} [d] {n|Le lion ne bouge pas.} [i] {n|Ne tape pas sur la vitre.} [i] {a|Regarde les singes.} [d] {ae|Ils sont vraiment drôles !}" },
    { titre: 'Le gâteau', texte: "[d] {a|Maman prépare un gâteau au chocolat.} [i] {a|Casse les œufs.} [q] {a|As-tu le sucre ?} [d] {n|Je ne trouve pas la farine.} [d] {a|Elle est dans le placard.} [i] {n|Ne mange pas la pâte.} [d] {ae|Que ce gâteau sent bon !}" },
    { titre: 'Le vélo', texte: "[d] {a|Papa m'apprend à faire du vélo.} [i] {a|Tiens bien le guidon.} [i] {n|Ne regarde pas tes pieds.} [q] {a|Est-ce que tu me tiens ?} [d] {n|Papa ne me tient plus.} [d] {ae|Je roule tout seul !} [d] {ae|Que je suis fier !}" },
    { titre: 'La plage', texte: "[d] {a|Nous partons à la mer.} [q] {a|As-tu pris ton maillot ?} [d] {n|Je ne trouve plus ma serviette.} [i] {a|Cherche dans ton sac.} [d] {ae|Comme l'eau est froide !} [d] {n|Ma sœur n'aime pas les vagues.} [q] {a|Qui veut construire un château de sable ?}" },
    { titre: 'La pluie', texte: "[d] {a|Il pleut depuis ce matin.} [d] {n|Nous ne sortons pas.} [q] {a|Veux-tu jouer aux cartes ?} [i] {a|Prends le jeu sur l'étagère.} [d] {ne|Je ne gagne jamais !} [d] {ae|Comme tu as de la chance !} [q] {n|Ne veux-tu pas une revanche ?}" },
    { titre: 'Le marché', texte: "[d] {a|Grand-père va au marché.} [q] {a|Que vas-tu acheter ?} [d] {n|Je n'achète rien aujourd'hui.} [i] {a|Choisis des pommes bien rouges.} [d] {ae|Que ces fraises sont belles !} [d] {n|Personne n'attend devant l'étal.} [i] {n|N'oublie pas la monnaie.}" },
    { titre: 'L\'anniversaire', texte: "[d] {a|C'est l'anniversaire de Lina.} [q] {a|Combien de bougies y a-t-il ?} [d] {a|Lina souffle très fort.} [d] {ne|Elle n'en laisse aucune !} [i] {a|Ouvre vite tes cadeaux.} [q] {n|N'est-ce pas une jolie poupée ?} [d] {ae|Quelle chance elle a !}" },
    { titre: 'La classe de mer', texte: "[d] {a|Lundi, nous partons en classe de mer.} [q] {a|As-tu préparé ton sac ?} [i] {a|Mets ton bonnet dans ta valise.} [d] {n|Je ne trouve pas mes bottes.} [d] {ae|Comme la mer est grande !} [i] {n|Ne cours pas sur les rochers.} [q] {n|N'as-tu pas froid ?} [d] {a|Nous ramassons des crabes.} [d] {ae|Quelle belle semaine !}" },
    { titre: 'Le cirque', texte: "[d] {a|Le cirque arrive en ville.} [q] {a|Veux-tu venir avec nous ?} [d] {ae|Comme le chapiteau est grand !} [i] {a|Assieds-toi au premier rang.} [d] {n|Le lion ne rugit pas.} [d] {a|Les clowns font des grimaces.} [i] {n|Ne lance pas de pop-corn.} [q] {a|Où est passé le magicien ?} [d] {ne|Je n'ai jamais vu un spectacle pareil !} [d] {ae|Quelle soirée magnifique !}" },
    { titre: 'La forêt la nuit', texte: "[d] {a|La nuit tombe sur la forêt.} [q] {a|Entends-tu ce bruit ?} [d] {n|Je ne vois rien.} [i] {n|N'aie pas peur.} [d] {a|C'est seulement une chouette.} [d] {ae|Comme ses yeux brillent !} [q] {n|Ne rentrons-nous pas à la maison ?} [i] {a|Allume la lampe.}" },
  ],
  cm: [
    { titre: 'Le hérisson', texte: "[d] {a|Un hérisson traverse le jardin.} [q] {a|Le vois-tu ?} [d] {ae|Comme il est petit !} [i] {n|Ne le touche pas.} [d] {n|Il n'aime pas le bruit.}" },
    { titre: 'La montgolfière', texte: "[d] {a|Ce matin, nous montons dans une montgolfière.} [d] {ae|Quel grand ballon !} [i] {a|Monte dans la nacelle.} [q] {a|As-tu le vertige ?} [d] {n|Je n'ai jamais volé.} [d] {a|Le pilote allume le brûleur.} [d] {ae|Comme nous montons vite !} [q] {n|Ne vois-tu pas le château ?} [i] {n|Ne te penche pas trop.} [d] {ne|Je n'oublierai jamais ce voyage !}" },
    { titre: 'Au musée', texte: "[d] {a|Notre classe visite le musée du Louvre.} [i] {n|Ne touchez pas les tableaux !} [q] {a|Qui a peint ce portrait ?} [d] {a|Léonard de Vinci l'a peint il y a cinq siècles.} [d] {ae|Comme elle sourit mystérieusement !} [d] {n|Personne ne connaît son secret.}" },
    { titre: 'Le potager', texte: "[d] {a|Mamie cultive un grand potager.} [q] {a|Est-ce que les tomates sont mûres ?} [d] {n|Elles ne sont pas encore rouges.} [i] {a|Arrose les salades ce soir !} [d] {ne|Les limaces n'ont rien laissé !} [d] {ae|Quelles énormes courgettes elle récolte !}" },
    { titre: 'La finale', texte: "[d] {a|Notre équipe joue la finale aujourd'hui.} [q] {a|Où se trouve le stade ?} [d] {ae|Que les supporters sont nombreux !} [d] {n|Le gardien n'a encaissé aucun but.} [i] {a|Passe-moi le ballon !} [d] {a|Tom marque à la dernière minute.} [d] {ae|Quel but magnifique il a marqué !}" },
    { titre: 'La tempête', texte: "[d] {a|Une violente tempête souffle sur la côte.} [i] {n|Ne sortez pas de chez vous !} [q] {a|Avez-vous fermé les volets ?} [d] {n|Les bateaux ne quittent plus le port.} [d] {ae|Comme le vent hurle !} [d] {n|Rien ne résiste à ses rafales.} [q] {a|Quand la tempête se calmera-t-elle ?}" },
    { titre: 'La bibliothèque', texte: "[d] {a|Je passe le mercredi à la bibliothèque.} [q] {a|Quel livre me conseilles-tu ?} [i] {a|Lis donc ce roman d'aventures.} [d] {n|Je n'ai jamais lu d'histoire de pirates.} [d] {ae|Quelle histoire passionnante tu me proposes !} [i] {n|Ne fais pas de bruit !} [q] {n|N'as-tu pas oublié ta carte ?}" },
    { titre: 'Le cirque', texte: "[d] {a|Le cirque s'installe sur la place du village.} [q] {a|Est-ce que tu as vu les éléphants ?} [d] {ae|Comme le clown est maladroit !} [d] {n|Le dompteur ne craint point les lions.} [i] {a|Applaudissez les acrobates !} [d] {ne|Je n'ai jamais vu un spectacle aussi beau !} [q] {n|Ne reviendront-ils pas l'année prochaine ?} [i] {n|Ne t'approche pas de la cage.}" },
    { titre: 'Le déménagement', texte: "[d] {a|Nous déménageons à Lyon cet été.} [q] {a|Pourquoi quittons-nous notre maison ?} [d] {a|Papa a trouvé un nouveau travail.} [d] {n|Je ne connais personne là-bas.} [i] {a|Emballe tes jouets dans ce carton !} [d] {ae|Que ma chambre paraît vide maintenant !} [d] {n|Mes amis ne m'oublieront pas.} [q] {n|Ne m'écriras-tu pas chaque semaine ?}" },
    { titre: 'Le volcan', texte: "[d] {a|Le Piton de la Fournaise se réveille.} [q] {a|Le volcan est-il dangereux ?} [d] {n|La lave ne menace aucune maison.} [d] {ae|Quel spectacle grandiose nous offre la nature !} [i] {n|Ne franchissez pas les barrières !} [i] {a|Observez les coulées depuis le belvédère.} [d] {ne|Les scientifiques n'avaient rien prévu !} [q] {n|N'est-il pas temps de redescendre ?}" },
    { titre: 'Le château fort', texte: "[d] {a|Le chevalier défend le château fort.} [q] {a|Combien d'ennemis attaquent les remparts ?} [d] {n|Les assaillants ne franchiront jamais les douves.} [i] {a|Levez le pont-levis !} [d] {ae|Que ces tours sont hautes !} [i] {n|Ne gaspillez point les flèches.} [q] {n|Le roi n'enverra-t-il pas des renforts ?} [d] {ne|Personne ne passera !}" },
    { titre: 'L\'expédition polaire', texte: "[d] {a|L'expédition avance lentement sur la banquise.} [q] {a|Les chiens tiendront-ils jusqu'au camp ?} [d] {n|Le blizzard ne faiblit guère.} [i] {a|Montez la tente avant la nuit !} [d] {ae|Comme le froid est mordant !} [d] {n|Nul ne parle.} [q] {n|Ne voyez-vous pas ces ours blancs ?} [i] {n|Ne bougez plus.} [d] {ne|Jamais je n'ai eu aussi peur !}" },
  ],
  65: [
    { titre: 'Le nouveau', texte: "[d] {a|Un nouvel élève arrive dans la classe.} [q] {a|D'où vient-il ?} [d] {a|Il s'appelle Samir} et {n|il ne connaît personne.} [d] {ae|Comme il paraît timide !} [i] {a|Viens t'asseoir à côté de moi} {n|si tu ne trouves pas de place.} [d] {a|Je crois} {n|qu'il ne regrettera pas son choix.}" },
    { titre: 'La panne', texte: "[d] {a|La voiture s'arrête brusquement} {a|alors que nous roulons sur l'autoroute.} [q] {a|Que se passe-t-il ?} [d] {n|Le moteur ne démarre plus.} [i] {n|Ne descendez pas de la voiture} {n|tant que la dépanneuse n'est pas arrivée.} [d] {ae|Quelle malchance nous avons !} [d] {a|Papa téléphone au garage} mais {n|personne ne répond.}" },
    { titre: 'Le concours de dessin', texte: "[d] {a|Ma sœur participe au concours de dessin} {a|qui a lieu à la mairie.} [q] {n|Ne crois-tu pas} {a|qu'elle va gagner ?} [d] {a|Elle a dessiné un dragon} {n|qui ne crache pas de feu.} [d] {ae|Que ses couleurs sont vives !} [i] {a|Regarde bien les détails.} [d] {n|Le jury n'a pas encore choisi le gagnant.}" },
    { titre: 'Le spectacle', texte: "[d] {a|Nous répétons la pièce depuis trois semaines.} [q] {a|Sais-tu ton texte} {a|maintenant que la première approche ?} [d] {n|Je ne m'en souviens pas toujours} {a|quand je suis sur scène.} [i] {n|N'aie pas peur} et {a|parle fort.} [d] {ae|Comme la salle est pleine !} [d] {a|Le rideau se lève} et {n|plus personne ne bavarde.}" },
    { titre: 'La sortie en mer', texte: "[d] {a|Le bateau quitte le port} {a|dès que le jour se lève.} [q] {a|Verrons-nous des dauphins ?} [d] {n|Le capitaine ne promet rien} {n|parce qu'il n'est jamais sûr de les trouver.} [d] {ae|Comme la mer est calme !} [i] {a|Mettez vos gilets} et {n|ne vous penchez pas par-dessus bord.} [d] {a|Soudain, un dauphin saute devant la proue.}" },
    { titre: 'Le cambriolage', texte: "[d] {a/pass|La bijouterie a été cambriolée cette nuit.} [q] {a/act|Qui a prévenu la police ?} [d] {a/act|Le gardien a entendu un bruit} mais {n/act|il n'a vu personne.} [d] {n/pass|Les voleurs n'ont pas été arrêtés.} [i] {n/act|Ne touchez à rien} {n/pass|tant que les empreintes ne sont pas relevées.} [d] {ae/act|Quel culot ils ont !}" },
    { titre: 'Le tableau retrouvé', texte: "[d] {a/pass|Le célèbre tableau a été retrouvé dans un grenier.} [q] {a/act|Comment est-il arrivé là ?} [d] {a/act|Un antiquaire l'avait acheté} {a/act|sans qu'il connaisse sa valeur.} [d] {ae/act|Comme cet antiquaire a eu de la chance !} [d] {n/pass|Le tableau n'avait jamais été restauré.} [i] {a/act|Admirez ses couleurs} {a/pass|qui ont été si bien conservées.}" },
    { titre: 'Le tournoi', texte: "[d] {a/pass|Le tournoi est organisé par le club de la ville.} [q] {a/act|Combien d'équipes participent ?} [d] {a/act|Notre équipe a gagné le premier match} mais {a/pass|elle a été battue en demi-finale.} [d] {n/pass|L'arbitre n'a pas été respecté par les joueurs.} [i] {n/act|Ne vous découragez pas !} [d] {ae/act|Que nous avons bien joué !}" },
    { titre: 'L\'incendie', texte: "[d] {a/pass|Les pompiers ont été appelés à minuit.} [q] {a/act|Comment le feu a-t-il pris ?} [d] {a/act|Une bougie était restée allumée.} [d] {n/pass|Personne n'a été blessé} {a/act|parce que les habitants sont sortis à temps.} [d] {ae/act|Comme les pompiers ont été rapides !} [i] {a/act|Vérifiez toujours vos bougies avant de vous coucher.}" },
    { titre: 'La lettre', texte: "[d] {a/pass|Cette lettre a été écrite par mon arrière-grand-père} {a/act|quand il était soldat.} [q] {n/act|Ne trouves-tu pas} {a/act|que son écriture est belle ?} [d] {a/act|Il raconte} {a/pass|que les tranchées étaient envahies par la boue.} [d] {n/pass|Ses lettres n'ont jamais été publiées.} [i] {a/act|Garde-la précieusement.} [d] {ae/act|Quel courage il fallait !}" },
  ],
  43: [
    { titre: 'Le message mystérieux', texte: "[d] {a/pass|Un message a été glissé sous ma porte} {a/act|pendant que je dormais.} [q] {a/act|Qui a pu l'écrire ?} [d] {n/act|Je ne reconnais pas l'écriture} et {n/pass|la lettre n'est pas signée.} [i] {n/act|Ne parle de cela à personne} {n/act|tant que nous ne savons rien.} [d] {ae/act|Comme cette histoire est étrange !}" },
    { titre: 'L\'orage', texte: "[d] {a/act|L'orage éclate} {a/act|au moment où nous arrivons au refuge.} [d] {a/pass|Le ciel est déchiré par les éclairs.} [q] {n/act|N'avez-vous pas entendu la foudre} {a/act|qui est tombée sur le sapin ?} [d] {n/pass|Heureusement, personne n'a été touché.} [i] {a/act|Fermez la porte} et {a/act|approchez-vous du feu.} [d] {ae/act|Comme la montagne est belle sous l'orage !}" },
    { titre: 'Le procès', texte: "[d] {a/pass|L'accusé est défendu par un avocat célèbre.} [q] {a/act|Les jurés croiront-ils} {a/act|qu'il est innocent ?} [d] {a/act|Le témoin affirme} {n/act|qu'il n'a rien vu.} [d] {n/pass|Aucune preuve n'a été présentée par l'accusation.} [i] {n/act|Ne jugez pas trop vite.} [d] {a/pass|Le verdict sera rendu demain} {a/act|si les débats se terminent ce soir.}" },
    { titre: 'La grotte', texte: "[d] {a/pass|Une grotte ornée a été découverte par trois spéléologues.} [q] {a/act|Savez-vous} {a/act|depuis combien de temps elle était fermée ?} [d] {a/act|Les chercheurs pensent} {n/pass|qu'elle n'avait pas été visitée depuis vingt mille ans.} [d] {ae/act|Que ces peintures sont émouvantes !} [i] {n/act|Ne touchez jamais les parois} {a/act|car elles sont fragiles.} [d] {n/pass|Elle ne sera pas ouverte au public.}" },
    { titre: 'Le naufrage', texte: "[d] {a/act|Le navire heurta un récif} {a/act|alors que la tempête faisait rage.} [d] {a/pass|Les passagers furent réveillés par le choc.} [q] {a/act|Combien de canots restait-il ?} [d] {n/act|Le capitaine ne quitta pas son poste} {n/pass|tant que tous les passagers n'étaient pas sauvés.} [i] {a/act|Embarquez d'abord les enfants !} [d] {ne/act|Jamais on n'avait vu un tel courage !}" },
    { titre: 'L\'élection', texte: "[d] {a/pass|Le délégué de classe sera élu vendredi.} [q] {a/act|Pour qui vas-tu voter ?} [d] {n/act|Je n'ai pas encore décidé} {a/act|parce que les deux candidats me plaisent.} [d] {a/act|Inès promet} {a/pass|que la cour sera embellie par des plantes.} [d] {ae/act|Que cette campagne est animée !} [d] {a/pass|Les bulletins seront comptés par le professeur} {a/act|dès que tout le monde aura voté.}" },
    { titre: 'Le robot', texte: "[d] {a/pass|Ce robot a été conçu par des élèves de troisième.} [q] {a/act|Que sait-il faire ?} [d] {a/act|Il trie les déchets} {a/pass|qui sont déposés dans la cantine.} [d] {n/act|Il ne se trompe presque jamais.} [i] {a/act|Observez} {a/act|comme il saisit délicatement les bouteilles.} [d] {n/pass|Son programme n'a pas encore été terminé.} [d] {ae/act|Quelle invention géniale ils ont faite !}" },
    { titre: 'Le marathon', texte: "[d] {a/act|Des milliers de coureurs s'élancent} {a/pass|dès que le départ est donné.} [d] {a/pass|Ils sont encouragés par la foule.} [q] {n/act|Ne vois-tu pas ce coureur} {a/act|qui boite ?} [d] {n/act|Il n'abandonnera pas} {a/act|même s'il souffre.} [i] {a/act|Tiens bon} et {n/act|ne t'arrête pas !} [d] {ae/act|Comme l'arrivée est encore loin !} [d] {a/pass|Le vainqueur sera récompensé par le maire.}" },
    { titre: 'Le manuscrit', texte: "[d] {a/pass|Ce manuscrit fut copié par un moine du douzième siècle.} [q] {a/act|Comment a-t-il traversé les siècles} {a/act|alors que tant de livres ont disparu ?} [d] {a/pass|Il était conservé dans une abbaye} {a/act|que les révolutionnaires épargnèrent.} [d] {n/pass|Ses enluminures n'ont jamais été retouchées.} [i] {n/act|Ne l'exposez pas à la lumière} {a/act|car l'encre pâlirait.} [d] {ae/act|Que ces couleurs sont fraîches !}" },
    { titre: 'Le vote de la loi', texte: "[d] {a/pass|La loi a été votée par l'Assemblée après un débat} {a/act|qui a duré trois jours.} [q] {n/act|Les opposants n'avaient-ils pas promis} {n/pass|qu'elle ne serait jamais adoptée ?} [d] {a/act|Le ministre remercie les députés} {a/act|qui l'ont soutenu.} [d] {n/pass|Les amendements n'ont pas tous été retenus.} [i] {a/act|Lisez le texte avant de le critiquer.} [d] {ae/act|Comme cette séance fut longue !}" },
  ],
};
/* v75 : au CE, les textes du bilan vont du plus court au plus long */
['ce', 'cm'].forEach((n) => TEXTES_TF[n].sort((x, y) => (x.texte.match(/\{/g) || []).length - (y.texte.match(/\{/g) || []).length));
const avecFnSX = () => !!(currentGame.sxFn || (currentGame.sxTF && sx.props.some((p) => p.fn)));
/* v56 : dix textes et plus par exercice, du plus facile au plus difficile. Exercice 1 (« syn ») : syntaxe et nature
   simple (indépendante, principale, subordonnée) ; exercice 2 (« fn ») : nature précise et fonction des subordonnées.
   Codes de fonction : ant (complément de l'antécédent), cod, suj, cct, ccc, cco, ccq, ccb, cch, ccm ; puis le mot complété. */
const TEXTES_SX = {
  syn: [
    { titre: 'Au parc', texte: "[N] {-|Quel beau jour !} [S] {I|Le soleil brille.} [S] {I|Les enfants jouent dans le parc.} [N] {-|Quelle joie !} [C] {I|Paul court,} {I|sa sœur saute à la corde.} [S] {I|Leur maman lit sur un banc.}" },
    { titre: 'Le goûter', texte: "[S] {I|Il est quatre heures.} [N] {-|L'heure du goûter !} [S] {I|Léa prend une pomme.} [C] {I|Tom préfère le chocolat} et {I|il le mange vite.} [N] {-|Quel gourmand !} [S] {I|Maman rit.}" },
    { titre: 'La pluie', texte: "[N] {-|Encore de la pluie !} [C] {I|Il pleut depuis ce matin} et {I|nous restons à la maison.} [S] {I|Mon frère dessine un bateau.} [C] {I|Je lis un livre,} {I|le chat dort près du feu.} [C] {P|Nous sortirons} {C/cct/sortirons|quand la pluie s'arrêtera.}" },
    { titre: 'Le marché', texte: "[N] {-|Samedi matin, jour de marché.} [C] {I|Les marchands crient} mais {I|personne ne les écoute.} [S] {I|Grand-mère achète des tomates.} [C] {P|Elle choisit les plus rouges} {C/ccc/choisit|parce qu'elle veut faire une sauce.} [N] {-|Quelle bonne odeur !} [C] {P|Je porte le panier} {C/cct/porte|pendant qu'elle paie.}" },
    { titre: 'Le chiot', texte: "[C] {P|Hier, nous avons adopté un chiot} {R/ant/chiot|qui s'appelle Filou.} [N] {-|Quelle boule de poils !} [S] {I|Il dort dans un panier.} [C] {C/cct/aboie|Quand il a faim,} {P|il aboie très fort.} [C] {P|Papa dit} {K/cod/dit|qu'il faudra l'éduquer.} [S] {I|Je l'aime déjà !}" },
    { titre: 'Attention à la marche', texte: "[N] {-|Attention !} [S] {I|Tu ne vois pas la marche ?} [C] {P|Vraiment, il y a des moments} {R/ant/moments|où on se demande} {Q/cod/demande|si tu n'as pas la tête dans les nuages !} [C] {C/cct/regarde|Quand on marche,} {P|on regarde devant soi.} [S] {I|Tu as compris ?} [C] {I|Ce n'est pas la peine de faire la tête,} {I|cela ne changera rien !} [N] {-|Courage !} [C] {I|Nous sommes presque arrivés,} et {C/cch/serons arrivés|si tu accélères,} {P|nous serons arrivés avant midi.}" },
    { titre: 'La rentrée', texte: "[N] {-|Lundi, la rentrée !} [C] {P|Je suis un peu inquiet} {C/ccc/suis|parce que je change d'école.} [C] {P|Ma mère m'a acheté un cartable} {R/ant/cartable|qui brille dans le noir.} [S] {I|Devant la grille, je cherche mes amis.} [C] {C/cct/découvre|Dès que j'entre dans la cour,} {P|je découvre Lucas.} [N] {-|Quel soulagement !} [C] {I|Nous nous asseyons ensemble} et {I|la maîtresse commence l'appel.}" },
    { titre: 'Le gâteau', texte: "[C] {P|Pour l'anniversaire de papa, maman veut} {K/cod/veut|que nous préparions un gâteau.} [S] {I|Je casse les œufs.} [C] {I|Ma sœur verse la farine,} {I|mon frère mélange.} [C] {C/cct/fond|Pendant que le four chauffe,} {P|le chocolat fond doucement.} [N] {-|Quelle odeur délicieuse !} [C] {P|Papa se demande} {Q/cod/demande|ce que nous cachons dans la cuisine.} [C] {C/cct/crions|Quand il entre,} {P|nous crions de joie.}" },
    { titre: 'L\'orage en montagne', texte: "[N] {-|Un ciel noir au-dessus des sommets.} [C] {P|Le guide nous annonce} {K/cod/annonce|qu'un orage approche.} [C] {P|Nous devons rejoindre le refuge} {C/cct/devons|avant que la pluie ne tombe.} [C] {I|Le vent souffle,} {I|les premiers éclairs déchirent le ciel} et {I|nous accélérons.} [C] {C/cct/offre|Lorsque nous arrivons enfin,} {P|le gardien nous offre une soupe} {R/ant/soupe|qui nous réchauffe.} [N] {-|Quel soulagement !}" },
    { titre: 'Le spectacle', texte: "[C] {P|Ce soir, la classe présente le spectacle} {R/ant/spectacle|qu'elle répète depuis un mois.} [C] {C/cct/tremblent|Quand le rideau se lève,} {P|les enfants tremblent un peu.} [C] {I|Julie oublie une phrase,} mais {P|son voisin la lui souffle} {C/ccm/souffle|sans que personne ne s'en aperçoive.} [N] {-|Quel talent !} [C] {P|Les parents applaudissent si fort} {C/ccq/applaudissent|que la salle tremble.} [C] {I|Le directeur est fier} et {P|il promet} {K/cod/promet|que la fête recommencera l'an prochain.}" },
    { titre: 'Le voyage en train', texte: "[C] {C/cct/s'endort|Dès que le train quitte la gare,} {P|ma petite sœur s'endort.} [C] {P|Moi, je regarde les paysages} {R/ant/paysages|qui défilent à toute vitesse.} [C] {I|Des vaches paissent dans les prés,} {I|un village apparaît,} puis {I|une rivière brille au soleil.} [N] {-|Quel spectacle !} [C] {P|Maman me demande} {Q/cod/demande|si j'ai faim.} [C] {C/cco/réponds|Bien que mon ventre gargouille,} {P|je réponds} {K/cod/réponds|que je préfère attendre.} [C] {C/cct/serons|Quand nous arriverons,} {P|nous serons chez grand-père} {R/ant/grand-père|qui nous attend sur le quai.}" },
  ],
  fn: [
    { titre: 'Le chat', texte: "[C] {P|J'ai un chat} {R/ant/chat|qui s'appelle Moustache.} [S] {I|Il adore dormir au soleil.} [N] {-|Quel paresseux !} [C] {I|Il mange beaucoup} et {I|il grossit.} [C] {C/cct/miaule|Quand il a faim,} {P|il miaule devant la porte.} [C] {P|Il aime les souris} {R/ant/souris|que mon frère lui donne en peluche.} [C] {I|Il est vieux,} mais {P|il saute encore sur l'armoire} {C/cct/saute|quand il veut se cacher.} [S] {I|Le soir, il dort sur mon lit.}" },
    { titre: 'La boulangerie', texte: "[C] {P|Chaque matin, je vais à la boulangerie} {R/ant/boulangerie|qui se trouve au coin de la rue.} [C] {C/cct/sens|Dès que j'ouvre la porte,} {P|je sens l'odeur du pain chaud.} [C] {P|La boulangère me sourit} {C/ccc/sourit|parce qu'elle me connaît bien.} [S] {I|J'achète deux croissants.} [C] {I|Je paie,} {I|je dis merci} et {I|je repars.} [C] {I|Il fait froid dehors,} mais {P|je mange un croissant} {R/ant/croissant|qui me réchauffe.} [N] {-|Quel délice !} [C] {P|Maman dit} {K/cod/dit|que je suis gourmand.}" },
    { titre: 'Le match', texte: "[N] {-|Dimanche, grand match de football !} [S] {I|Le stade est plein.} [C] {I|Les supporters chantent,} {I|les drapeaux flottent.} [C] {P|Notre équipe espère} {K/cod/espère|qu'elle gagnera la coupe.} [C] {C/cct/s'élancent|Lorsque l'arbitre siffle,} {P|les joueurs s'élancent.} [C] {P|Notre capitaine marque un but} {R/ant/but|que tout le monde applaudit.} [C] {I|Les adversaires égalisent} mais {P|nous gagnons} {C/ccc/gagnons|parce que notre gardien arrête un penalty.}" },
    { titre: 'La lettre', texte: "[C] {P|Ce matin, le facteur a apporté une lettre} {R/ant/lettre|que j'attendais depuis longtemps.} [S] {I|Elle vient de mon correspondant anglais.} [C] {P|Il m'écrit} {K/cod/écrit|qu'il viendra en France cet été.} [C] {P|Je lui répondrai ce soir} {C/ccb/répondrai|pour qu'il reçoive ma lettre avant son départ.} [C] {C/cch/visiterons|S'il fait beau,} {P|nous visiterons Paris ensemble.} [C] {I|Il aime le football,} donc {P|je lui montrerai le stade} {R/ant/stade|où joue mon équipe préférée.} [N] {-|Quelle bonne nouvelle !} [C] {I|Je relis sa lettre} et {I|je souris.}" },
    { titre: 'Le perroquet', texte: "[C] {P|Ma tante a un perroquet} {R/ant/perroquet|dont les plumes sont rouges et vertes.} [S] {I|Il s'appelle Coco.} [C] {I|Il mange des graines,} {I|il boit de l'eau fraîche} et {I|il siffle toute la journée.} [C] {P|Il répète les mots} {R/ant/mots|qu'il entend.} [C] {P|Un jour, il a crié si fort} {C/ccq/a crié|que le voisin a sursauté.} [N] {-|Quelle frayeur !} [C] {P|Le voisin s'est demandé} {Q/cod/s'est demandé|qui l'appelait.} [C] {C/cco/rions|Bien que ma tante soit gênée,} {P|nous rions encore de cette histoire.} [C] {I|Ma tante l'adore} et {P|elle dit} {K/cod/dit|qu'il est son meilleur ami.}" },
    { titre: 'Le jardin de grand-père', texte: "[N] {-|Quel bonheur, ce jardin !} [C] {P|Grand-père cultive un jardin} {R/ant/jardin|où poussent des légumes de toutes sortes.} [S] {I|Les oiseaux picorent les cerises.} [C] {C/cct/arrose|Avant que le soleil se couche,} {P|il arrose ses salades chaque soir.} [C] {P|Il m'explique} {Q/cod/explique|pourquoi les tomates ont besoin de soleil.} [C] {P|Il veut} {K/cod/veut|que je l'aide à cueillir les haricots.} [C] {C/cch/viendrai|Si j'ai le temps,} {P|je viendrai demain} {C/ccb/viendrai|pour que nous plantions des fraises.} [C] {I|Je bêche,} {I|grand-père sème.} [C] {I|Le soir tombe} et {P|nous rentrons} {C/ccc/rentrons|parce que les moustiques arrivent.}" },
    { titre: 'Le concert', texte: "[N] {-|Quelle soirée magique !} [S] {I|Le théâtre était plein.} [C] {P|Hier soir, j'ai entendu} {INF/cod/ai entendu|les musiciens accorder leurs instruments.} [C] {I|Les lumières se sont éteintes,} {I|le silence s'est fait.} [C] {C/cct/s'est tue|Dès que le chef d'orchestre est entré,} {P|la salle s'est tue.} [C] {P|La musique était si belle} {C/ccq/était|que certains spectateurs pleuraient.} [C] {P|Mon père m'a demandé} {Q/cod/a demandé|quel morceau je préférais.} [C] {P|Je lui ai répondu} {K/cod/ai répondu|que j'aimais surtout le violon} {R/ant/violon|qui jouait la mélodie.} [C] {I|Le violoniste a salué,} puis {P|il a joué un air} {R/ant/air|que je connaissais.}" },
    { titre: 'La tempête', texte: "[N] {-|Quelle nuit terrible !} [C] {PART/cct/rentrèrent|La nuit tombant,} {P|les pêcheurs rentrèrent au port.} [S] {I|La mer grondait.} [C] {I|Les vagues frappaient les rochers,} {I|la pluie tombait à verse.} [C] {P|Le vent soufflait si fort} {C/ccq/soufflait|que les vagues dépassaient la jetée.} [C] {C/cco/restait|Bien que la tempête fût terrible,} {P|un bateau restait en mer.} [C] {P|Sur le quai, les familles se demandaient} {Q/cod/se demandaient|s'il reviendrait.} [C] {C/cct/éclata|Lorsqu'enfin il apparut,} {P|une immense joie éclata.} [C] {I|Le marin était épuisé,} mais {P|il sourit} {C/ccc/sourit|parce qu'il était enfin chez lui.}" },
    { titre: 'Vacances de Pâques', texte: "[C] {C/cco/suis|Bien que j'aime les vacances de Pâques,} {P|chaque année je ne suis pas content} {C/ccc/suis|parce que je suis obligé d'aller pendant trois jours chez mes cousins} {R/ant/cousins|qui habitent en pleine campagne.} [S] {I|L'endroit est désolé.} [C] {P|Il n'y a pas de route} {R/ant/route|qui relie leur maison au village.} [S] {I|Il faut deux heures de marche pour y arriver.} [C] {C/cct/faut|Quand l'orage éclate,} {P|il en faut quelquefois le double.} [N] {-|Quel ennui !} [C] {I|Le village est pratiquement désert,} {I|tous les habitants sont partis en ville.} [S] {I|Il ne reste que les personnes âgées.} [C] {I|Il n'y a pas d'enfants} donc {I|je m'ennuie toute la journée.} [C] {I|Mes cousins sont gentils} mais {P|ils ne comprennent pas} {K/cod/comprennent|qu'un petit de la ville ne s'intéresse pas à la vie de la campagne.} [C] {P|Ils me disent} {K/cod/disent|que cela n'est pas normal.}" },
    { titre: 'Le déménagement', texte: "[N] {-|Quelle tristesse !} [C] {P|Nous déménageons la semaine prochaine} {C/ccc/déménageons|parce que mon père a trouvé un travail} {R/ant/travail|qui lui plaît à Lyon.} [C] {C/cco/suis|Même si je suis content pour lui,} {P|je suis triste de quitter mes amis.} [S] {I|Les cartons s'empilent dans le salon.} [C] {P|Ma meilleure amie m'a promis} {K/cod/a promis|qu'elle m'écrirait chaque semaine.} [C] {P|J'ai vu} {INF/cod/ai vu|les déménageurs emporter nos meubles.} [C] {PART/cct/est partie|Le camion une fois chargé,} {P|la voiture est partie} {C/ccb/est partie|pour que nous arrivions avant la nuit.} [C] {I|Papa ferme les portes,} {I|maman vérifie les fenêtres.} [C] {I|Lyon est loin,} mais {P|nous reviendrons} {C/cct/reviendrons|quand les vacances commenceront.}" },
    { titre: 'Le secret', texte: "[C] {P|Ma grand-mère m'a confié un secret} {R/ant/secret|que personne ne connaît.} [C] {C/cct/cachait|Quand elle était enfant,} {P|elle cachait ses trésors dans un vieux coffre} {R/ant/coffre|qui se trouvait au grenier.} [S] {I|Ce coffre m'intrigue.} [C] {P|Elle se demande} {Q/cod/se demande|si ce coffre existe encore.} [C] {C/cch/monterons|Si mes parents le permettent,} {P|nous monterons au grenier dimanche} {C/ccb/monterons|afin que je découvre enfin ses trésors.} [N] {-|Quelle aventure !} [C] {C/cco/espère|Bien que ce soit peut-être une légende,} {P|j'espère} {K/cod/espère|qu'il est toujours là.} [C] {I|Je ferme les yeux} et {I|j'imagine des bijoux anciens.} [C] {I|Grand-mère sourit,} mais {P|elle ne dit pas} {Q/cod/dit|ce que contient le coffre.}" },
  ],
};
/* les subordonnées du texte (relative, circonstancielle…) comptent toutes comme « subordonnée » */
const natSX = (k) => (currentGame.sxFn || currentGame.sxTF || k === 'I' || k === 'P' ? k : 'SUB');
const sx = { mots: [], phrases: [], props: [], sel: null, cibles: {} };
const SX_T = () => (currentGame.sxTF ? TEXTES_TF[currentGame.tfNiv] : TEXTES_SX[currentGame.sxFn ? 'fn' : 'syn'])[game.questions[game.index].t];
function decoupeSX(src) {
  const mots = [], phrases = [], props = [];
  const ajoute = (txt, p) => txt.split(/\s+/).filter(Boolean).forEach((w) => {
    if (/^[.,;:!?»]$/.test(w) && mots.length) { mots[mots.length - 1].t += (/^[;:!?»]$/.test(w) ? ' ' : '') + w; return; }
    mots.push({ t: w, s: phrases.length - 1, p });
  });
  src.replace(/\[([NSCdqi])\]|\{([^|}]+)\|([^}]*)\}|([^\s[{]+)/g, (m, ph, code, txt, w) => {
    if (ph) { phrases.push({ k: ph, a: mots.length, b: mots.length }); return m; }
    if (code !== undefined) {
      const a = mots.length;
      /* v54 : « R/ant/cousins » : nature / fonction / mot complété (antécédent ou verbe de la principale) */
      const [k, fn, ref] = code.split('/');
      ajoute(txt, k === '-' ? -1 : props.length);
      if (k !== '-') props.push({ k, fn, ref, a, b: mots.length - 1, s: phrases.length - 1 });
    } else ajoute(w, -1);
    phrases[phrases.length - 1].b = mots.length - 1;
    return m;
  });
  return { mots, phrases, props };
}
/* une bande de la proposition peut englober ou non les mots « libres » (et, mais…) qui la bordent */
function bornesSouples(pr) {
  const libre = (i) => i >= 0 && i < sx.mots.length && sx.mots[i].p === -1 && sx.mots[i].s === pr.s;
  const debuts = [pr.a], fins = [pr.b];
  for (let i = pr.a - 1; libre(i); i--) debuts.push(i);
  for (let i = pr.b + 1; libre(i); i++) fins.push(i);
  return { debuts, fins };
}
/* v52 : les bandes sont déjà tracées, vierges, sous chaque phrase (bleu) et chaque proposition (vert).
   L'enfant touche une bande vierge, puis choisit à droite ce qu'elle est. Un seul essai : 1 point si c'est juste ;
   sinon la bonne réponse s'écrit sur la bande, en hachuré, marquée ✗. */
const ciblesSX = () => {
  const l = [];
  sx.phrases.forEach((ph, s) => {
    l.push({ cle: `syn${s}`, lane: 'syn', a: ph.a, b: ph.b, k: ph.k });
    sx.props.forEach((pr, k) => { if (pr.s === s) l.push({ cle: `nat${k}`, lane: 'nat', a: pr.a, b: pr.b, k: natSX(pr.k) }); });
    if (avecFnSX()) sx.props.forEach((pr, k) => { if (pr.s === s && pr.fn) l.push({ cle: `fn${k}`, lane: 'fn', a: pr.a, b: pr.b, k: pr.fn, ref: pr.ref }); });
  });
  return l;
};
function showQuestionSX() {
  const d = decoupeSX(SX_T().texte);
  Object.assign(sx, d, { sel: null, cibles: {} });
  $('nat-sentence').innerHTML = `<div class="tm-cadre"><h3 class="tm-titre">« ${esc(SX_T().titre)} »</h3><div class="tm-texte sx-texte">${d.mots.map((m, i) => `<span class="w sx-mot" data-i="${i}"><span class="tx">${esc(m.t)}</span><span class="sx-lanes"><span class="sx-lane syn"></span><span class="sx-lane nat"></span>${avecFnSX() ? '<span class="sx-lane fn"></span>' : ''}</span></span>`).join('')}</div></div>`;
  ciblesSX().forEach((c) => { sx.cibles[c.cle] = { ...c, fait: false }; peintSX(c.lane, c.a, c.b, `vide ${COUL_SX[c.lane]}`, ''); marqueCibleSX(c); });
  currentGame.total = Object.keys(sx.cibles).length;
  $('nat-character-stage').innerHTML = '';
  $('nat-correction').classList.add('hidden');
  $('nat-verdict-square').className = 'verdict-square';
  $('nat-fn-column').classList.add('hidden'); $('nat-nature-column').classList.remove('hidden');
  $('nat-buttons-invariables').innerHTML = '';
  $('nat-progress-label').textContent = `Texte n° ${game.questions[game.index].t + 1} « ${SX_T().titre} » (${NIVEAU_TEXTE(game.questions[game.index].t, listeTextes().length)})`;
  game.score = 0;
  $('nat-sentence').onclick = (ev) => {
    const l = ev.target.closest('.sx-lane[data-cle]');
    if (!l || !isSX() || game.fini) return;
    choisitCibleSX(l.dataset.cle);
  };
  majScoreSX(); panneauSX();
  choisitCibleSX(ciblesSX()[0].cle);
  requestAnimationFrame(ajusteArdoise);
}
/* dessiner une bande : les mots a…b, dans la rangée bleue (syn) ou verte (nat) ; l'étiquette au début de la bande
   et de nouveau au début de chaque ligne quand la bande continue */
function peintSX(lane, a, b, classe, texte) {
  /* v53 : la bande est coupée en morceaux, un par ligne ; l'étiquette va sur chaque morceau assez long pour elle,
     ou, s'il n'y en a aucun, sur le plus long (elle déborde alors, sur un fond de sa couleur) */
  const morceaux = [];
  for (let i = a; i <= b; i++) {
    const w = wordEl(i), l = w?.querySelector(`.sx-lane.${lane}`);
    if (!l) continue;
    l.className = `sx-lane ${lane} ${classe}${i === a ? ' debut' : ''}${i === b ? ' fin' : ''}`;
    l.innerHTML = '';
    const der = morceaux[morceaux.length - 1];
    if (der && Math.abs(w.offsetTop - der.haut) < 6) { der.l.push(l); der.larg += w.offsetWidth; } else morceaux.push({ haut: w.offsetTop, l: [l], larg: w.offsetWidth });
  }
  if (!texte || !morceaux.length) return;
  const besoin = texte.length * 7.5 + 14;
  let ou = morceaux.filter((m) => m.larg >= besoin);
  if (!ou.length) ou = [morceaux.reduce((x, y) => (y.larg > x.larg ? y : x))];
  /* v55 : l'étiquette est centrée dans son morceau de bande ; trop longue, elle passe sur deux lignes plus petites,
     et seulement si cela ne suffit pas, elle déborde (centrée, sur un fond de sa couleur) */
  ou.forEach((m) => {
    m.l[0].innerHTML = `<span class="sx-etq">${texte}</span>`;
    const e = m.l[0].firstChild, larg = m.l.reduce((t, l) => t + l.offsetWidth, 0);
    if (e.offsetWidth > larg - 8) { e.classList.add('serre'); e.style.width = `${Math.max(40, larg - 8)}px`; }
    if (e.scrollHeight > m.l[0].offsetHeight + 2) { e.classList.remove('serre'); e.style.width = ''; e.classList.add('deborde'); }
    e.style.left = `${Math.round((larg - e.offsetWidth) / 2)}px`;
  });
}
/* chaque morceau d'une bande connaît sa cible, pour qu'on puisse la toucher n'importe où */
function marqueCibleSX(c) { for (let i = c.a; i <= c.b; i++) { const l = wordEl(i)?.querySelector(`.sx-lane.${c.lane}`); if (l) l.dataset.cle = c.cle; } }
function choisitCibleSX(cle) {
  const c = sx.cibles[cle]; if (!c || c.fait) return;
  document.querySelectorAll('.sx-lane.choisie').forEach((l) => l.classList.remove('choisie'));
  for (let i = c.a; i <= c.b; i++) wordEl(i)?.querySelector(`.sx-lane.${c.lane}`)?.classList.add('choisie');
  sx.sel = cle;
  panneauSX();
  /* la bande choisie reste visible dans le texte */
  wordEl(c.a)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}
const sxFaits = () => Object.values(sx.cibles).filter((c) => c.fait).length;
const COUL_SX = { syn: 'bleu', nat: 'vert', fn: 'rouge' };
/* l'étiquette de fonction nomme le mot complété : « Complément de l'antécédent « cousins » », « CC de cause du verbe « suis » » */
const etqFnSX = (item, c) => (item.k === 'ant' ? `${item.court} « ${c.ref} »` : `${item.court} « ${c.ref} »`);
function majScoreSX() {
  $('nat-score-label').textContent = scoreLabel(game.score);
  $('nat-progress-bar').style.width = `${(sxFaits() / currentGame.total) * 100}%`;
}
function panneauSX(message) {
  if (currentGame.sxTF) { panneauTFX(message); return; }
  $('nat-instruction').textContent = currentGame.sxFn ? 'Syntaxe, nature et fonction des propositions' : 'La syntaxe des phrases et la nature des propositions';
  const c = sx.sel ? sx.cibles[sx.sel] : null;
  const bouton = (lane, x) => `<button type="button" class="sx-bande-btn ${lane}" data-bande="${x.code}"${!c || c.lane !== lane ? ' disabled' : ''}>${x.nom}</button>`;
  const morceau = c ? sx.mots.slice(c.a, c.b + 1).map((m) => m.t).join(' ') : '';
  const q = !c ? '' : c.lane === 'syn' ? 'Quelle est la <strong>syntaxe</strong> de cette phrase ?' : c.lane === 'nat' ? 'Quelle est la <strong>nature</strong> de cette proposition ?' : 'Quelle est la <strong>fonction</strong> de cette subordonnée ?';
  $('nat-buttons-variables').innerHTML = nbspFr(`${c ? `<p class="sx-question">${q}<br><em>« ${esc(morceau)} »</em></p>` : ''}
    <div class="carte sx-carte bleue libre${c && c.lane === 'syn' ? ' active' : ' eteinte'}"><p><strong>La phrase</strong> : quelle est sa syntaxe ?</p><div class="sx-palette">${BANDES.syn.map((x) => bouton('syn', x)).join('')}</div></div>
    <div class="carte sx-carte verte libre${c && c.lane === 'nat' ? ' active' : ' eteinte'}"><p><strong>Les propositions</strong> : quelle est leur nature ?</p><div class="sx-palette">${LISTE_SX('nat').map((x) => bouton('nat', x)).join('')}</div></div>
    ${currentGame.sxFn ? `<div class="carte sx-carte rouge libre${c && c.lane === 'fn' ? ' active' : ' eteinte'}"><p><strong>Les subordonnées</strong> : quelle est leur fonction ?</p><div class="sx-palette">${BANDES.fn.map((x) => bouton('fn', x)).join('')}</div></div>` : ''}
    <p class="sous sx-aide">${message || `Touche une bande vierge sous le texte (en bleu : une phrase ; en vert : une proposition${currentGame.sxFn ? ' ; en rouge : la fonction d\'une subordonnée' : ''}), puis choisis ce qu'elle est.`}</p>
    <p class="sous">${sxFaits()} bande${sxFaits() > 1 ? 's' : ''} sur ${currentGame.total} remplie${sxFaits() > 1 ? 's' : ''}.</p>`);
  document.querySelectorAll('[data-bande]').forEach((b) => b.addEventListener('click', () => repondSX(b.dataset.bande)));
}
function repondSX(code) {
  const c = sx.sel ? sx.cibles[sx.sel] : null; if (!c || c.fait || game.fini) return;
  const item = NATURE_BY_CODE[code], bonne = LISTE_SX(c.lane).find((x) => x.k === c.k);
  const juste = item.k === c.k, coul = COUL_SX[c.lane];
  const etq = (x) => (c.lane === 'fn' && !currentGame.sxTF ? etqFnSX(x, c) : x.court);
  c.fait = true;
  let msg;
  if (juste) {
    game.score = Math.round((game.score + 1) * 10) / 10;
    peintSX(c.lane, c.a, c.b, `ok ${coul}`, etq(item));
    msg = `✔ Juste : ${c.lane === 'fn' && !currentGame.sxTF ? etq(item) : item.nom.toLowerCase()}.`;
  } else {
    const fnx = c.lane === 'fn' && !currentGame.sxTF;
    game.erreurs.push({ mot: sx.mots.slice(c.a, c.b + 1).map((m) => m.t).join(' '), bonne: (fnx ? etqFnSX(bonne, c) : bonne.nom).toLowerCase(), choisie: (fnx ? etqFnSX(item, c) : item.nom).toLowerCase(), phrase: `texte « ${SX_T().titre} »` });
    peintSX(c.lane, c.a, c.b, `revele ${coul}`, `✗ ${etq(bonne)}`);
    const pourquoi = {
      N: 'Elle n\'a pas de verbe.', S: 'Elle n\'a qu\'un verbe conjugué.', SUB: 'Elle porte en tête un mot subordonnant (qui, que, où, quand, si…).',
      P: 'Une subordonnée dépend d\'elle.', I: 'Elle peut être isolée par un point.',
      R: 'Elle est introduite par un pronom relatif (qui, que, dont, où…) et complète un nom, son antécédent.',
      K: 'Elle est introduite par « que » et complète le verbe de la principale.',
      Q: 'Elle rapporte une question au discours indirect (si, pourquoi, quel…).',
      INF: 'Son verbe est à l\'infinitif, avec son propre sujet.', PART: 'Son verbe est au participe, avec son propre sujet.',
      ant: `Elle complète le nom « ${c.ref} », son antécédent.`, cod: `Elle complète le verbe « ${c.ref} » : ${c.ref} quoi ?`, suj: `Elle est le sujet du verbe « ${c.ref} ».`,
    };
    const exp = currentGame.sxTF ? pourquoiTF(c) : c.lane === 'syn' && c.k === 'C' ? 'Elle a plusieurs verbes conjugués.' : c.lane === 'nat' && c.k === 'C' ? 'Elle est introduite par une conjonction de subordination (quand, parce que, bien que, si…) et précise une circonstance.' : c.lane === 'fn' && /^cc/.test(c.k) ? `Elle précise une circonstance du verbe « ${c.ref} ».` : (pourquoi[c.k] || '');
    msg = `Non : c'est ${fnx ? `« ${etq(bonne)} »` : `une ${bonne.nom.toLowerCase()}`}. ${exp}`;
  }
  sx.sel = null;
  majScoreSX(); panneauSX(msg);
  if (sxFaits() === currentGame.total) { setTimeout(finSX, 1500); return; }
  /* la bande vierge suivante */
  const l = ciblesSX(), p = l.findIndex((x) => x.cle === c.cle);
  for (let d = 1; d <= l.length; d++) { const n = l[(p + d) % l.length]; if (!sx.cibles[n.cle].fait) { setTimeout(() => { if (!sx.sel) { choisitCibleSX(n.cle); panneauSX(msg); } }, juste ? 700 : 1800); break; } }
}
function finSX() {
  boutonVoix(true);
  sx.sel = null;
  if (currentGame.sxTF) { finTFX(); return; }
  $('nat-buttons-variables').innerHTML = '';
  $('nat-instruction').textContent = 'Toutes les bandes sont posées !';
  const total = currentGame.total;
  $('nat-correction-details').innerHTML = nbspFr(`Tu as ${fmtPts(game.score)} point${game.score >= 2 ? 's' : ''} sur ${total}. Une phrase sans verbe est une <strong>phrase nominale</strong> ; avec un seul verbe conjugué, c'est une <strong>phrase verbale simple</strong>, qui forme une proposition indépendante ; avec plusieurs verbes, une <strong>phrase verbale complexe</strong> : elle a autant de propositions que de verbes conjugués. Ces propositions peuvent être <strong>indépendantes</strong> (juxtaposées ou coordonnées), ou former des couples <strong>principale + subordonnée</strong> : la subordonnée porte un mot subordonnant en tête (<em>qui, que, où, quand, si, parce que…</em>). ${currentGame.sxFn ? ' Chaque subordonnée a une <strong>fonction</strong> : la relative est <strong>complément de son antécédent</strong> ; la conjonctive complétive est en général <strong>COD du verbe de la principale</strong> ; la conjonctive circonstancielle est <strong>complément circonstanciel</strong> (de temps, de cause, d\'opposition…) du verbe de la principale.' : ''} Les bandes hachurées marquées ✗ montrent la bonne réponse, là où tu t'es trompé.`);
  $('nat-correction').classList.remove('hidden');
  $('nat-verdict-square').className = `verdict-square ${game.score >= total - 0.05 ? 'correct' : game.score < total / 2 ? 'wrong' : 'half'}`;
  $('nat-next-button').textContent = 'Voir mon résultat →';
  showCharacter(game.score >= total / 2 ? 'good' : 'bad', null);
}
const isSX = () => !!(currentGame && currentGame.sx);
function panneauTFX(message) {
  $('nat-instruction').textContent = 'Le type et la forme des phrases';
  const c = sx.sel ? sx.cibles[sx.sel] : null, fn = avecFnSX(), complexe = sx.props.length > sx.phrases.length;
  const bouton = (lane, x) => `<button type="button" class="sx-bande-btn ${lane}" data-bande="${x.code}"${!c || c.lane !== lane ? ' disabled' : ''}>${x.nom}</button>`;
  const morceau = c ? sx.mots.slice(c.a, c.b + 1).map((m) => m.t).join(' ') : '';
  const unite = complexe ? 'cette proposition' : 'cette phrase';
  const q = !c ? '' : c.lane === 'syn' ? 'Quel est le <strong>type</strong> de cette phrase ?' : c.lane === 'nat' ? `Quelle est la <strong>forme</strong> de ${unite} ?` : `${unite.charAt(0).toUpperCase() + unite.slice(1)} est-elle à la <strong>forme active ou passive</strong> ?`;
  $('nat-buttons-variables').innerHTML = nbspFr(`${c ? `<p class="sx-question">${q}<br><em>« ${esc(morceau)} »</em></p>` : ''}
    <div class="carte sx-carte bleue libre${c && c.lane === 'syn' ? ' active' : ' eteinte'}"><p><strong>Le type</strong> : pourquoi parle-t-on ?</p><div class="sx-palette">${BANDES.type.map((x) => bouton('syn', x)).join('')}</div></div>
    <div class="carte sx-carte verte libre${c && c.lane === 'nat' ? ' active' : ' eteinte'}"><p><strong>La forme</strong> : affirmative ou négative ? exclamative ?</p><div class="sx-palette">${BANDES.forme.map((x) => bouton('nat', x)).join('')}</div></div>
    ${fn ? `<div class="carte sx-carte rouge libre${c && c.lane === 'fn' ? ' active' : ' eteinte'}"><p><strong>La forme active ou passive</strong> (autrefois : la voix)</p><div class="sx-palette">${BANDES.voix.map((x) => bouton('fn', x)).join('')}</div></div>` : ''}
    <p class="sous sx-aide">${message || `Touche une bande vierge sous le texte (en bleu : le type de la phrase ; en vert : sa forme${complexe ? ', proposition par proposition' : ''}${fn ? ' ; en rouge : forme active ou passive' : ''}), puis choisis ce qu'elle est.`}</p>
    <p class="sous">${sxFaits()} bande${sxFaits() > 1 ? 's' : ''} sur ${currentGame.total} remplie${sxFaits() > 1 ? 's' : ''}.</p>`);
  document.querySelectorAll('[data-bande]').forEach((b) => b.addEventListener('click', () => repondSX(b.dataset.bande)));
}
function pourquoiTF(c) {
  if (c.lane === 'syn') return { d: 'Elle donne une information. Elle se termine par un point, ou par un point d\'exclamation quand elle exprime un sentiment.', q: 'Elle pose une question : elle se termine par un point d\'interrogation.', i: 'Elle donne un ordre ou un conseil : son verbe est à l\'impératif, sans sujet.' }[c.k];
  if (c.lane === 'fn') return c.k === 'pass' ? 'Le sujet subit l\'action : le verbe est construit avec l\'auxiliaire être et le participe passé ; on peut ajouter (ou on trouve) un complément d\'agent introduit par « par ».' : 'Le sujet fait l\'action, ou bien le verbe décrit un état. Attention : « être » suivi d\'un adjectif, ou un passé composé avec être (il est arrivé), ce n\'est pas la forme passive.';
  return { a: 'Elle n\'a pas de négation.', n: 'Elle contient une négation en deux mots : ne… pas, ne… plus, ne… jamais, ne… rien, ne… personne…', ae: 'Elle n\'a pas de négation, et elle exprime un sentiment, avec un point d\'exclamation (souvent après comme, que, quel).', ne: 'Elle contient une négation, et elle exprime un sentiment, avec un point d\'exclamation.' }[c.k] + (c.k === 'a' || c.k === 'n' ? ' Attention : un ordre peut finir par un point d\'exclamation sans être exclamatif : il ne dit pas un sentiment.' : '');
}
function finTFX() {
  $('nat-buttons-variables').innerHTML = '';
  $('nat-instruction').textContent = 'Toutes les bandes sont posées !';
  const total = currentGame.total, fn = avecFnSX();
  $('nat-correction-details').innerHTML = nbspFr(`Tu as ${fmtPts(game.score)} point${game.score >= 2 ? 's' : ''} sur ${total}. Le <strong>type</strong> d'une phrase dit pourquoi on parle : pour informer (<strong>déclarative</strong>), pour questionner (<strong>interrogative</strong>), pour ordonner (<strong>impérative</strong>). Chaque phrase a aussi une <strong>forme</strong> : <strong>affirmative</strong> ou <strong>négative</strong> (ne… pas, ne… jamais…), et parfois <strong>exclamative</strong> quand elle exprime un sentiment (autrefois, on parlait de « type exclamatif »).${fn ? ' Elle est enfin à la <strong>forme active</strong> ou à la <strong>forme passive</strong> (autrefois : la voix active ou passive) : à la forme passive, le sujet subit l\'action, avec l\'auxiliaire être et le participe passé.' : ''}${sx.props.length > sx.phrases.length ? ' Dans une phrase complexe, chaque proposition a sa forme : l\'une peut être affirmative, l\'autre négative.' : ''} Les bandes hachurées marquées ✗ montrent la bonne réponse, là où tu t'es trompé.`);
  $('nat-correction').classList.remove('hidden');
  $('nat-verdict-square').className = `verdict-square ${game.score >= total - 0.05 ? 'correct' : game.score < total / 2 ? 'wrong' : 'half'}`;
  $('nat-next-button').textContent = 'Voir mon résultat →';
  showCharacter(game.score >= total / 2 ? 'good' : 'bad', null);
}
/* ------------------------------------------------------------
   v58 : LA PHRASE — EXERCICE 3 : TRANSFORMER LES PAROLES RAPPORTÉES
   Quatre étapes : 1. trouver les paroles au discours direct ; 2. les mettre au discours indirect ;
   3. trouver les paroles au discours indirect ; 4. les mettre au discours direct.
   Trouver un passage : 1 point (une erreur de passage : –0,5). Le transformer : 1 point (un seul essai, parmi trois propositions).
   Dans le texte : [[k|début ((paroles))fin]] ; k = numéro du passage dans « passages » ; « (( )) » entoure les paroles
   elles-mêmes (ce qu'on touche pour les trouver) ; tout le segment entre [[ ]] est remplacé par la transformation.
   ------------------------------------------------------------ */
const TEXTES_DR = [
  { titre: 'Le gendarme',
    texte: "Le terrible gendarme approcha de la voiture qu'il avait arrêtée au carrefour et [[0|dit au chauffeur : ((« Avez-vous vos papiers ? »))]] Le chauffeur se mit à rougir parce qu'il les avait oubliés chez lui. [[1|Il demanda au gendarme ((s'il pourrait les apporter le lendemain.))]] Mais [[2|le gendarme lui dit : ((« Cela n'est pas possible, vous devez toujours les avoir sur vous ! »))]] Bien que le gendarme fût aimable, il donna à l'automobiliste une contravention de cinquante euros parce qu'il n'avait pas ses papiers sur lui, et [[3|il lui dit ((qu'il devrait les présenter à la gendarmerie.))]] [[4|((« Très bien, cela sera fait ! »)) dit le chauffeur.]] [[5|Le gendarme lui répondit ((qu'il y comptait sans faute.))]]",
    passages: [
      { type: 'D', bon: "demanda au chauffeur s'il avait ses papiers.", faux: ["demanda au chauffeur s'il a ses papiers.", "demanda au chauffeur si vous aviez vos papiers."],
        pourquoi: "La question devient une subordonnée interrogative indirecte introduite par « si » ; « vous » devient « il », et le présent devient un imparfait." },
      { type: 'I', bon: "Il demanda au gendarme : « Pourrai-je les apporter demain ? »", faux: ["Il demanda au gendarme : « Pourrait-il les apporter le lendemain ? »", "Il demanda au gendarme : « Pourrai-je les apporter le lendemain ? »"],
        pourquoi: "Au discours direct, le chauffeur parle lui-même : « il » devient « je », le conditionnel redevient un futur, et « le lendemain » redevient « demain »." },
      { type: 'D', bon: "le gendarme lui dit que cela n'était pas possible et qu'il devait toujours les avoir sur lui.", faux: ["le gendarme lui dit que cela n'est pas possible et qu'il doit toujours les avoir sur lui.", "le gendarme lui dit que cela n'était pas possible et que vous deviez toujours les avoir sur vous."],
        pourquoi: "Les paroles deviennent des subordonnées complétives introduites par « que » ; les présents deviennent des imparfaits, « vous » devient « il »." },
      { type: 'I', bon: "il lui dit : « Vous devrez les présenter à la gendarmerie. »", faux: ["il lui dit : « Il devrait les présenter à la gendarmerie. »", "il lui dit : « Vous devriez les présenter à la gendarmerie. »"],
        pourquoi: "Le gendarme s'adresse au chauffeur : « il » devient « vous », et le conditionnel (futur dans le passé) redevient un futur." },
      { type: 'D', bon: "Le chauffeur dit que c'était très bien et que cela serait fait.", faux: ["Le chauffeur dit que c'est très bien et que cela sera fait.", "Le chauffeur dit : très bien, que cela serait fait."],
        pourquoi: "Le verbe de parole passe devant ; les paroles deviennent deux complétives introduites par « que » ; le présent devient un imparfait et le futur un conditionnel (le futur dans le passé)." },
      { type: 'I', bon: "Le gendarme lui répondit : « J'y compte sans faute ! »", faux: ["Le gendarme lui répondit : « Il y comptait sans faute ! »", "Le gendarme lui répondit : « J'y comptais sans faute ! »"],
        pourquoi: "Le gendarme parle lui-même : « il » devient « je », et l'imparfait redevient un présent." },
    ] },
];
const dr = { etape: 0, sel: null, trouves: {}, faits: {}, ordre: {} };
const ETAPES_DR = [
  { type: 'D', quoi: 'trouver', titre: 'Trouve les paroles au discours direct' },
  { type: 'D', quoi: 'transformer', titre: 'Mets-les au discours indirect' },
  { type: 'I', quoi: 'trouver', titre: 'Trouve les paroles au discours indirect' },
  { type: 'I', quoi: 'transformer', titre: 'Mets-les au discours direct' },
];
/* v60 : selon le niveau, on ne garde que certaines étapes */
const ETAPES_ACTIVES = () => (currentGame.drMode === 'direct' ? [0] : currentGame.drMode === 'reperage' ? [0, 2] : [0, 1, 2, 3]);
const totalDR = (T) => T.passages.filter((p) => currentGame.drMode !== 'direct' || p.type === 'D').length * (currentGame.drMode === 'complet' ? 2 : 1);
const DR_T = () => TEXTES_DR[game.questions[game.index].t];
const isDR = () => !!(currentGame && currentGame.dr);
function decoupeDR(src) {
  /* morceaux : texte libre (mots) ou passage { k, avant, paroles, apres } */
  const morceaux = [];
  src.replace(/\[\[(\d+)\|([^\]]*?)\(\(([^)]*?)\)\)([^\]]*?)\]\]|([^[]+)/g, (m, k, av, par, ap, libre) => {
    if (libre !== undefined) morceaux.push({ libre });
    else morceaux.push({ k: Number(k), avant: av, paroles: par, apres: ap });
    return m;
  });
  return morceaux;
}
function showQuestionDR() {
  const T = DR_T();
  Object.assign(dr, { etape: 0, sel: null, trouves: {}, faits: {}, ordre: {} });
  T.passages.forEach((p, k) => { dr.ordre[k] = shuffle([p.bon, ...p.faux]); });
  currentGame.total = totalDR(T);
  const mots = (txt) => txt.split(/(\s+)/).map((w) => (/^\s+$/.test(w) || !w ? w : `<span class="dr-mot">${esc(w)}</span>`)).join('');
  $('nat-sentence').innerHTML = `<div class="tm-cadre"><h3 class="tm-titre">« ${esc(T.titre)} »</h3><div class="dr-texte">${decoupeDR(T.texte).map((m) => (m.libre !== undefined
    ? mots(m.libre)
    : `<span class="dr-seg" data-k="${m.k}"><span class="dr-ancien">${mots(m.avant)}<span class="dr-paroles">${mots(m.paroles)}</span>${mots(m.apres)}</span><span class="dr-nouveau"></span></span>`)).join('')}</div></div>`;
  $('nat-character-stage').innerHTML = '';
  $('nat-correction').classList.add('hidden');
  $('nat-verdict-square').className = 'verdict-square';
  $('nat-fn-column').classList.add('hidden'); $('nat-nature-column').classList.remove('hidden');
  $('nat-buttons-invariables').innerHTML = '';
  $('nat-progress-label').textContent = `« ${T.titre} »`;
  game.score = 0;
  $('nat-sentence').onclick = (ev) => { if (isDR() && !game.fini) clicDR(ev.target.closest('.dr-seg'), ev.target.closest('.dr-mot')); };
  majScoreDR(); panneauDR();
  requestAnimationFrame(ajusteArdoise);
}
const passagesDR = (type) => DR_T().passages.map((p, k) => ({ ...p, k })).filter((p) => p.type === type);
function majScoreDR() {
  $('nat-score-label').textContent = scoreLabel(Math.max(0, game.score));
  const fait = Object.keys(dr.trouves).length + Object.keys(dr.faits).length;
  $('nat-progress-bar').style.width = `${(fait / currentGame.total) * 100}%`;
}
const segDR = (k) => document.querySelector(`#nat-sentence .dr-seg[data-k="${k}"]`);
function panneauDR(message) {
  const E = ETAPES_DR[dr.etape], L = passagesDR(E.type);
  const EA = ETAPES_ACTIVES();
  $('nat-instruction').textContent = EA.length > 1 ? `Étape ${EA.indexOf(dr.etape) + 1} sur ${EA.length} : ${E.titre.toLowerCase()}` : E.titre;
  const nom = E.type === 'D' ? 'discours direct' : 'discours indirect';
  const vers = E.type === 'D' ? 'discours indirect' : 'discours direct';
  let html = '';
  if (E.quoi === 'trouver') {
    const n = L.filter((p) => dr.trouves[p.k]).length;
    html = `<div class="carte ${E.type === 'D' ? 'dr-d' : 'dr-i'} active libre"><p><strong>${E.titre}</strong> : touche-les dans le texte.</p><p class="sous">${E.type === 'D'
      ? 'Au discours direct, les paroles sont citées telles qu\'elles ont été prononcées, <strong>entre guillemets</strong>, souvent après deux-points.'
      : 'Au discours indirect, les paroles sont rapportées dans une <strong>proposition subordonnée</strong> (introduite par <em>que</em>, <em>si</em>…), après un verbe de parole, sans guillemets.'}</p><p class="sous">${n} passage${n > 1 ? 's' : ''} sur ${L.length} trouvé${n > 1 ? 's' : ''}.</p></div>`;
  } else if (dr.sel === null) {
    html = `<div class="carte ${E.type === 'D' ? 'dr-d' : 'dr-i'} active libre"><p><strong>${E.titre}</strong> : touche un passage ${E.type === 'D' ? 'au discours direct' : 'au discours indirect'}, puis choisis sa transformation.</p></div>`;
  } else {
    const p = DR_T().passages[dr.sel], r = dr.faits[dr.sel];
    html = `<div class="carte ${E.type === 'D' ? 'dr-d' : 'dr-i'} active libre"><p>Comment écrire ce passage au <strong>${vers}</strong> ?</p><div class="dr-choix">${dr.ordre[dr.sel].map((o, j) => `<button type="button" class="nature-button dr-option${!r ? '' : o === p.bon ? ' correct' : o === r ? ' wrong' : ' faded'}" data-opt="${j}"${r ? ' disabled' : ''}>${esc(o)}</button>`).join('')}</div>${r ? `<p class="sous tm-bilan">${r === p.bon ? '✔ Bravo !' : 'Non.'} ${p.pourquoi}</p>` : ''}</div>`;
  }
  $('nat-buttons-variables').innerHTML = nbspFr(`${html}${message ? `<p class="sous sx-aide">${message}</p>` : ''}<p class="sous dr-rappel">${nom === 'discours direct' ? '🟠 discours direct' : '🔵 discours indirect'}</p>`);
  document.querySelectorAll('[data-opt]').forEach((b) => b.addEventListener('click', () => transformeDR(dr.ordre[dr.sel][Number(b.dataset.opt)])));
}
function clicDR(seg, mot) {
  const E = ETAPES_DR[dr.etape];
  if (E.quoi === 'trouver') {
    const k = seg ? Number(seg.dataset.k) : null, p = k !== null ? DR_T().passages[k] : null;
    if (p && dr.faits[k]) { panneauDR('Ce passage est déjà transformé.'); return; }
    if (p && p.type === E.type) {
      if (dr.trouves[k]) { panneauDR('Tu l\'as déjà trouvé.'); return; }
      dr.trouves[k] = true; game.score = Math.round((game.score + 1) * 10) / 10;
      seg.classList.add(E.type === 'D' ? 'trouve-d' : 'trouve-i');
      majScoreDR();
      const reste = passagesDR(E.type).filter((x) => !dr.trouves[x.k]).length;
      panneauDR(reste ? '✔ Oui, en voici un !' : '✔ Tu les as tous trouvés !');
      if (!reste) setTimeout(etapeSuivanteDR, 1200);
      return;
    }
    if (!mot) return;
    game.score = Math.round((game.score - 0.5) * 10) / 10;   /* le score peut passer un moment sous zéro ; on l'arrête à zéro à la fin */
    game.erreurs.push({ mot: (seg || mot).textContent.trim().slice(0, 60), bonne: E.type === 'D' ? 'pas de discours direct ici' : 'pas de discours indirect ici', choisie: E.type === 'D' ? 'discours direct' : 'discours indirect', phrase: `texte « ${DR_T().titre} »` });
    (seg || mot).classList.add('dr-faux'); setTimeout(() => (seg || mot).classList.remove('dr-faux'), 900);
    majScoreDR();
    panneauDR(p && currentGame.drMode === 'direct' ? 'Non : ici, il n\'y a pas de guillemets. Ce sont bien des paroles, mais racontées par le narrateur (– 0,5 point).' : p ? (p.type === 'D' ? 'Non : ces paroles sont entre guillemets, c\'est du discours direct (– 0,5 point).' : 'Non : ces paroles sont dans une subordonnée, sans guillemets : c\'est du discours indirect (– 0,5 point).') : 'Non : ce n\'est pas une parole rapportée, c\'est le récit (– 0,5 point).');
    return;
  }
  /* transformer : on touche un passage du bon type, pas encore transformé */
  if (!seg) return;
  const k = Number(seg.dataset.k), p = DR_T().passages[k];
  if (p.type !== E.type || dr.faits[k]) return;
  document.querySelectorAll('.dr-seg.choisi').forEach((s) => s.classList.remove('choisi'));
  seg.classList.add('choisi'); dr.sel = k; panneauDR();
}
function transformeDR(o) {
  const k = dr.sel; if (k === null || dr.faits[k]) return;
  const p = DR_T().passages[k], juste = o === p.bon;
  dr.faits[k] = o;
  if (juste) game.score = Math.round((game.score + 1) * 10) / 10;
  else game.erreurs.push({ mot: segDR(k).querySelector('.dr-ancien').textContent.trim().slice(0, 60), bonne: `« ${p.bon} »`, choisie: `« ${o} »`, phrase: `texte « ${DR_T().titre} »` });
  /* dans le texte : l'ancien passage barré en petit, la transformation à sa place */
  const s = segDR(k);
  s.classList.remove('choisi', 'trouve-d', 'trouve-i'); s.classList.add('transforme', juste ? 'juste' : 'corrige');
  s.querySelector('.dr-nouveau').textContent = p.bon;
  setTimeout(() => lisPhraseDe(s), 50);
  majScoreDR(); panneauDR();
  const reste = passagesDR(ETAPES_DR[dr.etape].type).filter((x) => !dr.faits[x.k]);
  setTimeout(() => {
    if (!reste.length) { etapeSuivanteDR(); return; }
    dr.sel = null; clicDR(segDR(reste[0].k), null);
  }, juste ? 1600 : 3200);
}
function etapeSuivanteDR() {
  dr.sel = null; document.querySelectorAll('.dr-seg.choisi').forEach((s) => s.classList.remove('choisi'));
  /* une étape sans passage (aucun discours indirect, par exemple) est sautée */
  do { dr.etape += 1; } while (dr.etape < 4 && (!ETAPES_ACTIVES().includes(dr.etape) || !passagesDR(ETAPES_DR[dr.etape].type).length));
  if (dr.etape >= 4) { finDR(); return; }
  const E = ETAPES_DR[dr.etape];
  panneauDR(E.quoi === 'transformer' ? 'À toi de les transformer !' : '');
  if (E.quoi === 'transformer') { const l = passagesDR(E.type); clicDR(segDR(l[0].k), null); }
}
function finDR() {
  boutonVoix(true);
  $('nat-buttons-variables').innerHTML = '';
  $('nat-instruction').textContent = currentGame.drMode === 'complet' ? 'Toutes les paroles sont transformées !' : 'Tu as trouvé toutes les paroles !';
  game.score = Math.max(0, game.score);
  const total = currentGame.total;
  if (currentGame.drMode !== 'complet') {
    $('nat-correction-details').innerHTML = nbspFr(`Tu as ${fmtPts(game.score)} point${game.score >= 2 ? 's' : ''} sur ${total}. ${currentGame.drMode === 'direct'
      ? 'Les paroles des personnages, citées telles qu\'ils les ont dites, sont <strong>entre guillemets</strong> « … » : c\'est le <strong>discours direct</strong>. On les trouve souvent après un verbe de parole (<em>dit, demanda, répondit…</em>) et deux-points.'
      : 'Au <strong>discours direct</strong>, les paroles sont <strong>entre guillemets</strong>, telles qu\'elles ont été prononcées. Au <strong>discours indirect</strong>, elles sont rapportées dans une <strong>subordonnée</strong> introduite par <em>que</em> ou <em>si</em>, après un verbe de parole, et les personnes et les temps changent. Plus tard, tu apprendras à passer de l\'un à l\'autre.'}`);
  } else $('nat-correction-details').innerHTML = nbspFr(`Tu as ${fmtPts(game.score)} point${game.score >= 2 ? 's' : ''} sur ${total}. Pour passer du <strong>discours direct</strong> au <strong>discours indirect</strong>, les paroles deviennent une <strong>subordonnée</strong> : complétive introduite par <em>que</em> pour une déclaration, interrogative indirecte introduite par <em>si</em> (ou <em>qui, quand, pourquoi…</em>) pour une question. On enlève les guillemets ; les personnes changent (<em>je, vous → il</em>) ; dans un récit au passé, les temps changent (<em>présent → imparfait, passé composé → plus-que-parfait, futur → conditionnel</em>) ; et les indicateurs de temps aussi (<em>aujourd'hui → ce jour-là, hier → la veille, demain → le lendemain</em>). Pour revenir au discours direct, on fait l'inverse. Dans le texte, l'ancien passage est barré et la transformation écrite à sa place : en vert quand tu as trouvé, en rouge quand c'est la correction.`);
  $('nat-correction').classList.remove('hidden');
  $('nat-verdict-square').className = `verdict-square ${game.score >= total - 0.05 ? 'correct' : game.score < total / 2 ? 'wrong' : 'half'}`;
  $('nat-next-button').textContent = 'Voir mon résultat →';
  showCharacter(game.score >= total / 2 ? 'good' : 'bad', null);
}



function nextQuestion() {
  if (game.index + 1 < game.questions.length) { game.index += 1; showQuestion(); }
  else showResults();
}

function showResults() {
  game.fini = true;
  const n = currentGame.total || game.questions.length, s = Math.round(game.score * 10) / 10;
  const content = s >= Math.ceil(n * 0.6);
  const id = content ? pick(['bonaccord', 'virgule']) : pick(['rature', 'gribouille']);
  const pe = playerProfile?.enfant?.photo;
  $('results-character').innerHTML = characterSvg(id) + (pe ? `<img class="results-photo" src="${pe}" alt="" />` : '');
  $('results-title').textContent = isG3() || isG4() || isG5() || isG6() || isT1() ? `${fmtPts(s)} point${s >= 2 ? 's' : ''} sur ${n}` : `${s} bonne${s > 1 ? 's' : ''} réponse${s > 1 ? 's' : ''} sur ${n}`;
  const E = playerProfile?.enfant?.prenom;
  const adultes = (playerProfile?.adultes || []).filter((a) => a.lien);
  const a = adultes.length ? pick(adultes) : null;
  const famille = a ? ` ${fillMessage('{Adulte} sera très {fier} de toi !', null, a)}` : '';
  const parole = s === n ? (E ? `Un sans-faute, ${E} ! Tu es un génie de la grammaire !${famille}` : 'Un sans-faute ! Tu es un grand sorcier de la grammaire !')
    : content ? (E ? `Très bien, ${E} ! Encore une partie, et tu les connaîtras toutes par cœur.${famille}` : 'Très bien ! Encore une partie, et tu les connaîtras toutes par cœur.')
    : (E ? `Hum… Ce n'est pas encore ça, ${E}. Mais si tu rejoues, je suis sûr que tu feras mieux !` : 'Hum… Ce n\'est pas encore ça. Mais si tu rejoues, je suis sûr que tu feras mieux !');
  const sorciers = optSorciers(playerProfile);
  if (!sorciers) $('results-character').innerHTML = pe ? `<img class="results-photo" src="${pe}" alt="" />` : '';
  const texte = sorciers ? `${CHARACTERS[id].nom} : « ${parole} »` : (s === n ? 'Un sans-faute : bravo !' : content ? 'Très bien : encore une partie, et vous les connaîtrez toutes.' : 'Rejouez : chaque partie aide à mieux les reconnaître.');
  $('results-text').textContent = texte;
  lastResult = { jeu: currentGame.type, niveau: currentGame.niveau || 1, score: s, total: n, erreurs: game.erreurs.slice(), parNature: game.parNature, date: new Date().toISOString() };
  saveScore(lastResult);
  renderSendBox();
  showPanel('results');
  if (sorciers) speak(texte.replace(/^[^:]+: /, '').replace(/[«»]/g, ''), CHARACTERS[id].voix, content ? 'good' : 'bad');
}

/* ------------------------------------------------------------
   SCORES : enregistrés dans le compte, et envoyés par e-mail à la famille
   Pourquoi « par la messagerie de l'appareil » : le site est une simple page (pas de serveur à nous),
   il ne peut donc pas expédier un e-mail tout seul. Le bouton ouvre la messagerie de l'ordinateur ou
   du téléphone avec le message déjà écrit et les adresses déjà remplies : il ne reste qu'à appuyer sur
   « Envoyer ». Sur téléphone, le bouton « Partager » permet aussi de passer par SMS, WhatsApp, etc.
   ------------------------------------------------------------ */
let lastResult = null;
async function saveScore(r) {
  if (!currentUser || !db) return;
  const id = `score-${Date.now()}`;
  try {
    await db.collection('users').doc(currentUser.uid).collection('mnemogram').doc(id)
      .set({ type: 'score', ...r, creeLe: firebase.firestore.FieldValue.serverTimestamp() });
  } catch (e) { console.warn('Enregistrement du score', e); }
}
async function loadScores() {
  if (!currentUser || !db) return [];
  try {
    const snap = await db.collection('users').doc(currentUser.uid).collection('mnemogram').where('type', '==', 'score').get();
    return snap.docs.map((d) => ({ ...d.data(), _id: d.id })).sort((a, b) => String(b.date).localeCompare(String(a.date)));
  } catch (e) { console.warn('Lecture des scores', e); return []; }
}
function scoreMessage(r) {
  const E = playerProfile?.enfant?.prenom || '';
  const lignes = [
    `J'ai fait l'exercice « ${r.jeu} » sur MNEMOGRAM.`,
    niveauOf(r) >= 17 ? `Mon score : ${fmtPts(r.score)} point${r.score >= 2 ? 's' : ''} sur ${r.total}.`
      : niveauOf(r) === 16 ? `Mon score : ${fmtPts(r.score)} point${r.score >= 2 ? 's' : ''} sur ${r.total} (1 point par bande juste : le type et la forme de chaque phrase).`
      : niveauOf(r) === 15 ? `Mon score : ${fmtPts(r.score)} point${r.score >= 2 ? 's' : ''} sur ${r.total} (1 point par passage trouvé, 1 point par transformation réussie : discours direct et discours indirect).`
      : niveauOf(r) === 14 ? `Mon score : ${fmtPts(r.score)} point${r.score >= 2 ? 's' : ''} sur ${r.total} (1 point par bande juste : syntaxe des phrases, nature et fonction des propositions).`
      : niveauOf(r) === 13 ? `Mon score : ${fmtPts(r.score)} point${r.score >= 2 ? 's' : ''} sur ${r.total} (1 point par bande juste : la syntaxe de chaque phrase, la nature de chaque proposition).`
      : niveauOf(r) >= 11 ? `Mon score : ${fmtPts(r.score)} point${r.score >= 2 ? 's' : ''} sur ${r.total} (1 point par changement réussi : formes verbales et indicateurs de temps).`
      : niveauOf(r) === 10 ? `Mon score : ${fmtPts(r.score)} point${r.score >= 2 ? 's' : ''} sur 26 (10 verbes en français classique, puis 3 en français contemporain : 0,5 point pour le temps, le mode et leurs valeurs).`
      : niveauOf(r) === 9 ? `Mon score : ${fmtPts(r.score)} point${r.score >= 2 ? 's' : ''} sur 20 (10 verbes : 0,5 point pour le temps, le mode, la valeur du temps et la valeur du mode de chacun).`
      : niveauOf(r) === 8 ? `Mon score : ${fmtPts(r.score)} point${r.score >= 2 ? 's' : ''} sur 26 (20 formes en français classique, puis 6 formes en français contemporain : 0,5 point pour le temps et 0,5 point pour le mode de chacune).`
      : niveauOf(r) === 7 ? `Mon score : ${fmtPts(r.score)} point${r.score >= 2 ? 's' : ''} sur 20 (20 formes verbales : 0,5 point pour le temps et 0,5 point pour le mode de chacune).`
      : niveauOf(r) === 6 ? `Mon score : ${fmtPts(r.score)} point${r.score >= 2 ? 's' : ''} sur 20 (tableau rempli seul, sans guide : 0,5 point pour la nature et 0,5 point pour la fonction de chaque case).`
      : niveauOf(r) === 5 ? `Mon score : ${fmtPts(r.score)} point${r.score >= 2 ? 's' : ''} sur 20 (1 point par case du tableau bien remplie).`
      : niveauOf(r) === 4 ? `Mon score : ${fmtPts(r.score)} point${r.score >= 2 ? 's' : ''} sur ${r.total} (1 point par phrase, partagé entre le nom, le déterminant, l'adjectif et le complément du nom trouvés du premier coup).`
      : niveauOf(r) === 3 ? `Mon score : ${fmtPts(r.score)} point${r.score >= 2 ? 's' : ''} sur ${r.total} (1 point par phrase, partagé entre le verbe, le sujet et les compléments trouvés du premier coup).`
      : `Mon score : ${r.score} bonne${r.score > 1 ? 's' : ''} réponse${r.score > 1 ? 's' : ''} du premier coup sur ${r.total}.`,
  ];
  if (r.erreurs.length) {
    lignes.push('', 'Mes erreurs :');
    r.erreurs.forEach((e) => lignes.push(`- « ${e.mot} » (${e.phrase}) : c'était ${e.bonne}, et j'avais répondu ${e.choisie}.`));
  } else lignes.push('', 'Aucune erreur !');
  lignes.push('', E ? `${E}` : '', 'https://stassi-tech.github.io/mnemogram/');
  return lignes.join('\n');
}
function renderSendBox() {
  const box = $('results-send');
  if (!currentUser) { box.innerHTML = '<p class="send-hint">Avec un compte, tu pourras envoyer ton score à ta famille.</p>'; return; }
  if (!optEnvoi(playerProfile)) { box.innerHTML = ''; return; }
  box.innerHTML = sendBoxHtml('esend', 'Envoyer mon score à :').replace('dans ta fiche (ci-dessus)', 'dans « Mon compte » 👤');
  const E = playerProfile?.enfant?.prenom;
  wireSendBox('esend', () => `${E ? E + ' : ' : ''}mon score sur MNEMOGRAM (${fmtPts(lastResult.score)}/${lastResult.total})`, async () => scoreMessage(lastResult));
}

/* ------------------------------------------------------------
   FICHE DES NATURES (bouton 📖)
   ------------------------------------------------------------ */
/* v7 : la fiche est un fichier à part, fiche.html, que Stéphane modifie librement. Elle s'affiche dans la
   fenêtre 📖, et le jeu y lit les explications (lignes « explication ») : ce qui est écrit dans la fiche est ce
   qui s'affiche sous les boutons et ce que dit la voix. Si la fiche ne peut pas être lue (fichier ouvert
   directement sur l'ordinateur, réseau coupé), le jeu garde ses explications de départ. */
/* v17 : deux fiches, dont les noms de fichiers suivent les titres : « Fiche nature des mots » = fiche-nature.html,
   « Fiche fonction des mots » = fiche-fonction.html (avec la formule de chaque fonction). Le jeu lit les deux.
   Tant que les nouveaux fichiers ne sont pas sur GitHub, il se rabat sur les anciens noms. */
const FICHE_ANCIEN_NOM = { 'fiche-nature.html': 'fiche.html', 'fiche-fonction.html': 'fiche-fonctions.html' };
async function loadFiche() { await Promise.all(['fiche-nature.html', 'fiche-fonction.html', 'fiche-temps.html', 'fiche-phrase.html', 'fiche-transformations.html'].map(loadUneFiche)); }
async function loadUneFiche(nom) {
  try {
    let r = await fetch(`${nom}?v=${Date.now()}`, { cache: 'no-store' });
    if (!r.ok && FICHE_ANCIEN_NOM[nom]) r = await fetch(`${FICHE_ANCIEN_NOM[nom]}?v=${Date.now()}`, { cache: 'no-store' });
    if (!r.ok) return;
    const doc = new DOMParser().parseFromString(await r.text(), 'text/html');
    doc.querySelectorAll('[data-code]').forEach((sec) => {
      const n = NATURE_BY_CODE[sec.dataset.code]; if (!n) return;
      const exEl = sec.querySelector('.explication');
      const ex = exEl?.textContent.replace(/\s+/g, ' ').trim();
      /* v8 : les mots en italique de la fiche (<em>) restent en italique sous les boutons ; la voix lit le texte seul.
         v37 : le gras de la fiche (<strong>, venu du Word) reste aussi en gras. */
      if (exEl) n.explicationHtml = exEl.innerHTML.replace(/<(?!\/?(em|strong)>)[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      const exs = sec.querySelector('.exemples')?.textContent.replace(/\s+/g, ' ').trim();
      if (ex) n.explication = ex;
      if (exs) n.exemples = exs;
    });
  } catch (e) { /* on garde les explications intégrées */ }
}
function showFiche(nom) {
  $('fiche-frame').src = `${nom}?v=${Date.now()}`;
  document.querySelectorAll('.fiche-tab').forEach((b) => b.classList.toggle('on', b.dataset.fiche === nom));
}
function openFiche() {
  /* pendant le jeu des fonctions, la fiche des fonctions s'ouvre d'abord ; l'autre reste à un clic */
  const enJeu3 = isG3() && !$('natures-panel').classList.contains('hidden');
  const enTemps = currentGame?.partie === 'temps' && $('welcome-panel').classList.contains('hidden');
  const enPhrase = currentGame?.partie === 'phrase' && $('welcome-panel').classList.contains('hidden');
  showFiche(enPhrase && currentGame.dr ? 'fiche-transformations.html' : enPhrase ? 'fiche-phrase.html' : enTemps ? 'fiche-temps.html' : enJeu3 ? 'fiche-fonction.html' : 'fiche-nature.html');
  $('fiche-modal').classList.remove('hidden');
}
document.querySelectorAll('.fiche-tab').forEach((b) => b.addEventListener('click', () => showFiche(b.dataset.fiche)));

/* ------------------------------------------------------------
   COMPTES (Firebase, le même service que Mnemart)
   Pourquoi le même : la connexion par e-mail fonctionne déjà pour Mnemart, il n'y a rien de nouveau
   à configurer. Les données de MNEMOGRAM sont rangées à part, dans
   users/{identifiant}/mnemogram/profil : elles ne se mélangent pas aux scores de Mnemart.
   Le compte est créé par un adulte (son e-mail), pour un enfant : la fiche contient le prénom et le nom
   de l'enfant, et un ou deux adultes (lien, prénom, nom) dont les prénoms servent aux encouragements.
   Une copie de la fiche est gardée dans le navigateur, au cas où le service serait momentanément injoignable.
   ------------------------------------------------------------ */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCIc15-0fy_OziKdcOHAv-CYxOku9iFX94",
  authDomain: "quiz-art-7378d.firebaseapp.com",
  projectId: "quiz-art-7378d",
  storageBucket: "quiz-art-7378d.firebasestorage.app",
  messagingSenderId: "489975323244",
  appId: "1:489975323244:web:d7070100f3a0e63cec9649",
};
/* Lien de l'adulte avec l'enfant : « ton / ta » et accord de « fier / fière ». */
const LIENS = {
  papa: { label: 'Papa', ton: 'ton papa', f: false },
  maman: { label: 'Maman', ton: 'ta maman', f: true },
  papi: { label: 'Papi', ton: 'ton papi', f: false },
  mamie: { label: 'Mamie', ton: 'ta mamie', f: true },
  grandpere: { label: 'Grand-père', ton: 'ton grand-père', f: false },
  grandmere: { label: 'Grand-mère', ton: 'ta grand-mère', f: true },
  parrain: { label: 'Parrain', ton: 'ton parrain', f: false },
  marraine: { label: 'Marraine', ton: 'ta marraine', f: true },
  tonton: { label: 'Tonton', ton: 'ton tonton', f: false },
  tata: { label: 'Tata', ton: 'ta tata', f: true },
  oncle: { label: 'Oncle', ton: 'ton oncle', f: false },
  tante: { label: 'Tante', ton: 'ta tante', f: true },
  frere: { label: 'Frère', ton: 'ton frère', f: false },
  soeur: { label: 'Sœur', ton: 'ta sœur', f: true },
  cousin: { label: 'Cousin', ton: 'ton cousin', f: false },
  cousine: { label: 'Cousine', ton: 'ta cousine', f: true },
  ami: { label: 'Ami', ton: 'ton ami', f: false },
  amie: { label: 'Amie', ton: 'ton amie', f: true },
};
let auth = null, db = null, currentUser = null, playerProfile = null, accountMode = 'login';
const firebaseReady = typeof firebase !== 'undefined';
if (firebaseReady) {
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    auth = firebase.auth();
    db = firebase.firestore();
    try { db.settings({ experimentalAutoDetectLongPolling: true }); } catch (e) {}
  } catch (e) { console.warn('Firebase', e); }
}

/* Champs de la fiche (servent à l'inscription ET à « Mon compte ») */
function lienOptions(sel) {
  return '<option value="">— lien —</option>' + Object.entries(LIENS).map(([k, l]) => `<option value="${k}"${k === sel ? ' selected' : ''}>${l.label}</option>`).join('');
}
const esc = (t) => String(t || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
/* v5 : la famille est une liste ouverte. Chaque proche a un lien, un prénom, un nom et, s'il le veut,
   une adresse e-mail : c'est à ces adresses que l'enfant peut envoyer ses scores. */
/* v7 : une photo par personne (le joueur et chacun de ses proches). La photo est réduite sur l'appareil
   (carré de 240 pixels) avant d'être rangée dans la fiche du compte : elle reste privée, visible seulement
   quand on est connecté à ce compte. */
function photoSlotHtml(photo) {
  return `<div class="photo-slot">
      <span class="photo-thumb">${photo ? `<img src="${photo}" alt="" />` : '<span class="photo-empty">🙂</span>'}</span>
      <input type="hidden" class="f-photo" value="${photo ? esc(photo) : ''}" />
      <label class="photo-pick secondary-button">📷 ${photo ? 'Changer la photo' : 'Ajouter une photo'}<input type="file" accept="image/*" class="f-photo-file" /></label>
      <button type="button" class="photo-del link-label${photo ? '' : ' hidden'}">Retirer</button>
    </div>`;
}
function resizePhoto(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const T = 240, c = document.createElement('canvas'); c.width = T; c.height = T;
      const side = Math.min(img.width, img.height);
      c.getContext('2d').drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, T, T);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('image')); };
    img.src = url;
  });
}
/* Boutons photo d'un formulaire (inscription ou Mon compte), branchés une fois sur le conteneur. */
function wirePhotos(container) {
  if (container.dataset.photosWired) return;
  container.dataset.photosWired = '1';
  container.addEventListener('change', async (e) => {
    const input = e.target.closest('.f-photo-file'); if (!input || !input.files[0]) return;
    const slot = input.closest('.photo-slot');
    try {
      const data = await resizePhoto(input.files[0]);
      slot.querySelector('.f-photo').value = data;
      slot.querySelector('.photo-thumb').innerHTML = `<img src="${data}" alt="" />`;
      slot.querySelector('.photo-pick').firstChild.textContent = '📷 Changer la photo';
      slot.querySelector('.photo-del').classList.remove('hidden');
    } catch (ex) { alert('Cette image ne peut pas être lue. Essayez une photo au format JPEG ou PNG.'); }
    input.value = '';
  });
  container.addEventListener('click', (e) => {
    const del = e.target.closest('.photo-del'); if (!del) return;
    const slot = del.closest('.photo-slot');
    slot.querySelector('.f-photo').value = '';
    slot.querySelector('.photo-thumb').innerHTML = '<span class="photo-empty">🙂</span>';
    slot.querySelector('.photo-pick').firstChild.textContent = '📷 Ajouter une photo';
    del.classList.add('hidden');
  });
}
function adulteRowHtml(a, n) {
  return `
    <fieldset class="account-fieldset adulte-row" data-adulte-row>
      <legend>${n === 1 ? 'Un parent ou un proche (facultatif)' : 'Un autre proche'}</legend>
      <button type="button" class="adulte-remove" title="Retirer ce proche" aria-label="Retirer ce proche">✕</button>
      ${photoSlotHtml(a?.photo)}
      <div class="account-row-3">
        <label>Lien<select class="f-lien">${lienOptions(a?.lien)}</select></label>
        <label>Prénom (facultatif)<input type="text" class="f-prenom" value="${esc(a?.prenom)}" autocomplete="off" /></label>
        <label>Nom<input type="text" class="f-nom" value="${esc(a?.nom)}" autocomplete="off" /></label>
      </div>
      <label class="f-email-label">E-mail (pour recevoir les résultats, facultatif)<input type="email" class="f-email" value="${esc(a?.email)}" autocomplete="off" /></label>
    </fieldset>`;
}
function profileFieldsHtml(prefix, p, withConsent) {
  const adultes = (p?.adultes && p.adultes.length) ? p.adultes : [null];
  return `
    <fieldset class="account-fieldset" id="${prefix}-enfant-box">
      <legend>Le joueur</legend>
      ${photoSlotHtml(p?.enfant?.photo)}
      <div class="account-row">
        <label>Prénom<input type="text" id="${prefix}-enfant-prenom" value="${esc(p?.enfant?.prenom)}" autocomplete="off" required /></label>
        <label>Nom<input type="text" id="${prefix}-enfant-nom" value="${esc(p?.enfant?.nom)}" autocomplete="off" /></label>
      </div>
    </fieldset>
    <div class="adultes-list" id="${prefix}-adultes">${adultes.map((a, i) => adulteRowHtml(a, i + 1)).join('')}</div>
    <button type="button" class="secondary-button add-adulte" id="${prefix}-add-adulte">+ Ajouter un proche (papi, mamie, tonton…)</button>
    <!-- v12 : deux options à cocher -->
    <label class="account-option"><input type="checkbox" id="${prefix}-opt-sorciers"${optSorciers(p) ? ' checked' : ''} />
      <span><b>Les sorciers encouragent le joueur</b> (option plutôt réservée aux enfants).<br>Après chaque réponse, un sorcier apparaît ; les prénoms servent à personnaliser ses encouragements (« Joseph, tu es un génie de la grammaire ! », « Ton papa Marc sera fier de toi ! »).</span></label>
    <label class="account-option"><input type="checkbox" id="${prefix}-opt-envoi"${optEnvoi(p) ? ' checked' : ''} />
      <span><b>Envoyer les résultats par e-mail</b>.<br>Les adresses e-mail des proches servent seulement à leur envoyer les scores et le bilan de progression.</span></label>
    ${withConsent ? `<label class="account-consent"><input type="checkbox" id="${prefix}-consent" required /><span>Je suis le parent ou l'adulte responsable de cet enfant, et je crée ce compte pour lui.</span></label>` : ''}`;
}
/* v12 : options du compte. Sans compte, ou pour une fiche plus ancienne, les deux sont actives. */
function optSorciers(p) { return p?.options?.sorciers !== false; }
function optEnvoi(p) { return p?.options?.envoi !== false; }
/* Boutons « + Ajouter un proche » et « ✕ » (au moins un proche reste toujours). */
function wireAdultes(prefix) {
  const list = $(`${prefix}-adultes`);
  /* v12 : sans l'option « Envoyer les résultats par e-mail », les cases e-mail des proches sont masquées. */
  const opt = $(`${prefix}-opt-envoi`);
  const syncMail = () => list.classList.toggle('no-envoi', !!opt && !opt.checked);
  opt?.addEventListener('change', syncMail); syncMail();
  const renumber = () => list.querySelectorAll('[data-adulte-row]').forEach((row, i) => {
    row.querySelector('legend').textContent = i === 0 ? 'Un parent ou un proche (facultatif)' : 'Un autre proche';
    row.querySelector('.adulte-remove').classList.toggle('hidden', list.children.length === 1);
  });
  $(`${prefix}-add-adulte`).addEventListener('click', () => {
    list.insertAdjacentHTML('beforeend', adulteRowHtml(null, 2));
    renumber();
    list.lastElementChild.querySelector('.f-lien').focus();
  });
  list.addEventListener('click', (e) => {
    const b = e.target.closest('.adulte-remove'); if (!b) return;
    if (list.children.length > 1) b.closest('[data-adulte-row]').remove();
    renumber();
  });
  renumber();
}
function readProfileFields(prefix) {
  const v = (id) => ($(`${prefix}-${id}`)?.value || '').trim();
  const adultes = [...$(`${prefix}-adultes`).querySelectorAll('[data-adulte-row]')].map((row) => ({
    lien: row.querySelector('.f-lien').value,
    prenom: row.querySelector('.f-prenom').value.trim(),
    nom: row.querySelector('.f-nom').value.trim(),
    email: row.querySelector('.f-email').value.trim(),
    photo: row.querySelector('.f-photo').value || '',
  })).filter((a) => a.prenom || a.lien || a.email);
  const photoEnfant = $(`${prefix}-enfant-box`)?.querySelector('.f-photo').value || '';
  return { enfant: { prenom: v('enfant-prenom'), nom: v('enfant-nom'), photo: photoEnfant }, adultes,
    options: { sorciers: !!$(`${prefix}-opt-sorciers`)?.checked, envoi: !!$(`${prefix}-opt-envoi`)?.checked } };
}
function checkProfile(p) {
  if (!p.enfant.prenom) return 'Indiquez le prénom du joueur.';
  /* v8 : les proches sont facultatifs, leur prénom aussi (« Ton papa sera fier de toi » marche sans prénom). */
  if (p.adultes.some((a) => a.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email))) return 'Une des adresses e-mail n\'est pas valide.';
  return '';
}

const localKey = (uid) => `mnemogram-profil-${uid}`;
async function loadProfile(uid) {
  let p = null;
  try { const snap = await db.collection('users').doc(uid).collection('mnemogram').doc('profil').get(); if (snap.exists) p = snap.data(); } catch (e) { console.warn('Lecture de la fiche', e); }
  if (!p) { try { p = JSON.parse(localStorage.getItem(localKey(uid)) || 'null'); } catch (e) {} }
  return p;
}
async function saveProfile(uid, p) {
  try { localStorage.setItem(localKey(uid), JSON.stringify(p)); } catch (e) {}
  await db.collection('users').doc(uid).collection('mnemogram').doc('profil')
    .set({ ...p, misAJour: firebase.firestore.FieldValue.serverTimestamp() });
}

function updateAccountBar() {
  const slot = $('home-account-slot'), label = $('home-account-label'), mail = $('home-account-email'), sw = $('home-account-switch');
  if (!auth) {
    label.textContent = 'Comptes indisponibles pour l\'instant';
    slot.classList.add('is-disabled'); sw.classList.add('hidden'); mail.classList.add('hidden');
    return;
  }
  slot.classList.remove('is-disabled'); sw.classList.remove('hidden');
  if (currentUser) {
    label.textContent = playerProfile?.enfant?.prenom ? `Compte de ${playerProfile.enfant.prenom}` : 'Mon compte';
    const ph = playerProfile?.enfant?.photo;
    $('home-account-photo').innerHTML = ph ? `<img src="${ph}" alt="" />` : '';
    $('home-account-photo').classList.toggle('hidden', !ph);
    mail.textContent = currentUser.email; mail.classList.remove('hidden');
    sw.classList.add('is-connected'); sw.setAttribute('aria-checked', 'true'); sw.title = 'Se déconnecter';
  } else {
    label.textContent = 'Se connecter / Créer un compte';
    $('home-account-photo').classList.add('hidden');
    mail.classList.add('hidden');
    sw.classList.remove('is-connected'); sw.setAttribute('aria-checked', 'false'); sw.title = 'Se connecter';
  }
}

function setAccountMode(mode) {
  accountMode = mode;
  $('account-modal-title').textContent = mode === 'login' ? 'Se connecter' : 'Créer un compte';
  $('account-submit-button').textContent = mode === 'login' ? 'Se connecter' : 'Créer le compte';
  $('account-toggle-mode').textContent = mode === 'login' ? 'Pas encore de compte ? Créez-en un' : 'Déjà un compte ? Connectez-vous';
  $('account-forgot-row').classList.toggle('hidden', mode !== 'login');
  $('account-password').setAttribute('autocomplete', mode === 'login' ? 'current-password' : 'new-password');
  const reg = $('account-register-fields');
  if (mode === 'register') { reg.innerHTML = profileFieldsHtml('reg', null, true); reg.classList.remove('hidden'); reg.style.display = 'grid'; reg.style.gap = '12px'; wireAdultes('reg'); wirePhotos(reg); }
  else { reg.innerHTML = ''; reg.classList.add('hidden'); }
  $('account-error').classList.add('hidden'); $('account-notice').classList.add('hidden');
}
function openAccount() {
  if (!auth) return;
  if (currentUser) openProfile(false);
  else { setAccountMode('login'); $('account-modal').classList.remove('hidden'); }
}
/* « Mon compte » : la fiche de l'enfant, modifiable. first = true juste après une connexion sans fiche
   (par exemple un parent qui avait déjà un compte Mnemart avec la même adresse). */
function openProfile(first) {
  $('profile-modal-title').textContent = first ? 'La fiche du joueur' : 'Mon compte';
  $('profile-intro').textContent = first ? 'Votre compte est prêt. Complétez la fiche du joueur pour que les sorciers puissent l\'encourager par son prénom.' : '';
  $('profile-intro').classList.toggle('hidden', !first);
  $('profile-fields').innerHTML = profileFieldsHtml('pro', playerProfile, false);
  $('profile-fields').style.display = 'grid'; $('profile-fields').style.gap = '12px';
  wireAdultes('pro');
  wirePhotos($('profile-fields'));
  renderScoreHistory();
  $('profile-email-row').textContent = currentUser ? `Connecté avec l'adresse ${currentUser.email}` : '';
  $('profile-error').classList.add('hidden'); $('profile-notice').classList.add('hidden');
  $('profile-modal').classList.remove('hidden');
}

/* v10 : nom du type d'exercice ; les scores enregistrés avant la v10 portaient d'autres noms. */
function scoreType(jeu) {
  if (/niveau (1[0-4]|[1-9])/.test(jeu || '')) return jeu;
  if (/ 2$/.test(jeu || '')) return 'Reconnaissance des natures, niveau 2';
  return 'Reconnaissance des natures, niveau 1';
}
/* « Mes derniers scores », dans la fenêtre Mon compte */
async function renderScoreHistory() {
  const box = $('profile-scores');
  if (!box) return;
  box.innerHTML = '';
  const scores = await loadScores();
  if (!scores.length) { box.innerHTML = '<p class="send-hint">Pas encore de score enregistré.</p>'; $('profile-send').innerHTML = ''; return; }
  /* v12 : bilan de progression, puis (si l'option est cochée) deux envois bien distincts :
     l'envoi des scores (la liste des dernières parties) et l'envoi du bilan de progression (le résumé). */
  const avecMail = (playerProfile?.adultes || []).filter((a) => a.email);
  let h = `<div class="send-block"><p class="send-title">🏅 Bilan de progression</p><button type="button" class="primary-button bilan-button" id="open-bilan">Voir mon bilan de progression</button></div>`;
  if (optEnvoi(playerProfile)) {
    h += !avecMail.length ? '<p class="send-hint">Pour envoyer tes résultats, ajoute l\'adresse e-mail d\'un proche dans ta fiche (ci-dessus).</p>' : `
      <div class="send-block"><p class="send-title">✉️ Envoi par e-mail à :</p>
        <p class="send-hint send-howto">Le message s'ouvre déjà écrit, avec les adresses : il ne reste qu'à cliquer sur « Envoyer ».</p>
        <div class="send-list" id="psend-list">${avecMail.map((a) => `<label class="send-person"><input type="checkbox" value="${esc(a.email)}" checked />${a.photo ? `<img class="send-photo" src="${a.photo}" alt="" />` : ''}<span>${esc(LIENS[a.lien]?.label || a.email)}${a.prenom ? ' ' + esc(a.prenom) : ''}</span></label>`).join('')}</div>
        <div class="send-row"><span>Envoi des scores</span><button type="button" class="primary-button" id="pscore-gmail">✉️ Gmail</button><button type="button" class="secondary-button" id="pscore-mail">Autre messagerie</button></div>
        <div class="send-row"><span>Envoi du bilan de progression</span><button type="button" class="primary-button" id="pbilan-gmail">✉️ Gmail</button><button type="button" class="secondary-button" id="pbilan-mail">Autre messagerie</button></div>
      </div>`;
  }
  $('profile-send').innerHTML = h;
  $('open-bilan').addEventListener('click', openBilan);
  if (optEnvoi(playerProfile) && avecMail.length) {
    const E = playerProfile?.enfant?.prenom;
    wireSendButtons('psend-list', 'pscore', () => `${E ? E + ' : ' : ''}mes scores sur MNEMOGRAM`, async () => scoresMessage(await loadScores()));
    wireSendButtons('psend-list', 'pbilan', bilanSubject, async () => bilanMessage(await loadScores()));
  }
  box.innerHTML = '<p class="send-title">Derniers scores</p><ul class="score-list">' + scores.slice(0, 10).map((r) => {
    const d = new Date(r.date);
    const quand = isNaN(d) ? '' : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }) + ', ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return `<li><span>${esc(scoreType(r.jeu))}</span><span>${quand}</span><strong>${fmtPts(r.score)} / ${r.total}</strong><button type="button" class="score-del" data-id="${esc(r._id)}" title="Effacer ce score" aria-label="Effacer ce score">✕</button></li>`;
  }).join('') + '</ul>';
  /* v8 : chaque score peut être effacé (après confirmation). */
  box.querySelectorAll('.score-del').forEach((b) => b.addEventListener('click', async () => {
    if (!confirm('Effacer ce score ?')) return;
    try { await db.collection('users').doc(currentUser.uid).collection('mnemogram').doc(b.dataset.id).delete(); }
    catch (e) { alert('Le score n\'a pas pu être effacé. Réessayez.'); return; }
    renderScoreHistory();
  }));
}

/* ------------------------------------------------------------
   v11 : BILAN DE PROGRESSION (le « diplôme », comme dans Mnemart) et envoi des scores depuis « Mon compte »
   ------------------------------------------------------------ */
const niveauOf = (r) => r.niveau || (/niveau (1[7-9]|[2-8]\d)/.test(r.jeu || '') ? Number(/niveau (\d+)/.exec(r.jeu)[1]) : /niveau 16/.test(r.jeu || '') ? 16 : /niveau 15/.test(r.jeu || '') ? 15 : /niveau 14/.test(r.jeu || '') ? 14 : /niveau 13/.test(r.jeu || '') ? 13 : /niveau 12/.test(r.jeu || '') ? 12 : /niveau 11/.test(r.jeu || '') ? 11 : /niveau 10/.test(r.jeu || '') ? 10 : /niveau 9/.test(r.jeu || '') ? 9 : /niveau 8/.test(r.jeu || '') ? 8 : /niveau 7/.test(r.jeu || '') ? 7 : /niveau 6/.test(r.jeu || '') ? 6 : /niveau 5/.test(r.jeu || '') ? 5 : /niveau 4/.test(r.jeu || '') ? 4 : /niveau 3/.test(r.jeu || '') ? 3 : /niveau 2|natures 2/.test(r.jeu || '') ? 2 : 1);
const pctOf = (r) => (r.total ? (r.score / r.total) * 100 : 0);
const avg = (l) => (l.length ? l.reduce((t, r) => t + pctOf(r), 0) / l.length : 0);
const fmtDate = (d) => d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
function bilanEmblem() {
  const leaves = [];
  for (let i = 0; i < 10; i++) {
    const th = 105 + i * (150 / 9), rad = th * Math.PI / 180;
    const x = 60 + 45 * Math.cos(rad), y = 60 + 45 * Math.sin(rad), rot = th + (i % 2 ? 28 : -28);
    leaves.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="3" ry="7.5" transform="rotate(${rot.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="url(#rpg)"/>`);
    leaves.push(`<ellipse cx="${(120 - x).toFixed(1)}" cy="${y.toFixed(1)}" rx="3" ry="7.5" transform="rotate(${(-rot).toFixed(0)} ${(120 - x).toFixed(1)} ${y.toFixed(1)})" fill="url(#rpg)"/>`);
  }
  return `<svg class="rp-emblem" viewBox="0 0 120 120" aria-hidden="true">
    <defs><linearGradient id="rpg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6c978"/><stop offset=".5" stop-color="#b08d4c"/><stop offset="1" stop-color="#7a5c35"/></linearGradient></defs>
    ${leaves.join('')}
    <circle cx="60" cy="60" r="31" fill="#fffaf0" stroke="url(#rpg)" stroke-width="3"/>
    <circle cx="60" cy="60" r="26" fill="none" stroke="#c9a85c" stroke-width=".8"/>
    <text x="60" y="70" text-anchor="middle" font-family="Georgia,serif" font-size="28" font-weight="700" fill="#7a5c35">M</text>
  </svg>`;
}
function bilanCorners() {
  const c = `<svg viewBox="0 0 60 60" aria-hidden="true"><path d="M2 58 V2 H58" fill="none" stroke="#b08d4c" stroke-width="2.2"/><path d="M9 58 V9 H58" fill="none" stroke="#d9c08a" stroke-width="1"/><path d="M2 2 C20 6 28 14 30 30 C14 28 6 20 2 2 Z" fill="#b08d4c" opacity=".85"/><circle cx="36" cy="36" r="2.4" fill="#b08d4c"/></svg>`;
  return ['tl', 'tr', 'bl', 'br'].map((p) => `<span class="rp-corner rp-${p}">${c}</span>`).join('');
}
function bilanSeal() {
  return `<svg class="rp-seal" viewBox="0 0 80 80" aria-hidden="true">
    <defs><radialGradient id="rps" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#f0d98f"/><stop offset=".6" stop-color="#b08d4c"/><stop offset="1" stop-color="#7a5c35"/></radialGradient></defs>
    <path d="M26 56 L18 78 L30 72 L36 78 L40 58 Z" fill="#8a5449"/><path d="M54 56 L62 78 L50 72 L44 78 L40 58 Z" fill="#a8665a"/>
    <path d="M40 4 l5 5 7-2 3 7 7 2-1 7 6 4-4 6 3 7-7 3-1 7-7-1-5 6-5-5-7 1-1-7-7-3 3-7-4-6 6-4-1-7 7-2 3-7 7 2z" fill="url(#rps)" transform="translate(0,2)"/>
    <circle cx="40" cy="38" r="19" fill="none" stroke="#fff3cf" stroke-width="1.2" opacity=".8"/>
    <text x="40" y="46" text-anchor="middle" font-family="Georgia,serif" font-size="24" font-weight="700" fill="#fff3cf">M</text>
  </svg>`;
}
/* Analyse des scores : réussite par niveau (et progrès), par nature, confusions les plus fréquentes. */
function analyseScores(scores) {
  const list = scores.slice().sort((a, b) => String(a.date).localeCompare(String(b.date)));
  const dates = list.map((r) => new Date(r.date)).filter((d) => !isNaN(d));
  const niveaux = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84].map((n) => {
    const l = list.filter((r) => niveauOf(r) === n);
    if (!l.length) return null;
    const res = { n, count: l.length, avg: Math.round(avg(l)) };
    if (l.length >= 4) { const k = Math.min(5, Math.floor(l.length / 2)); res.early = Math.round(avg(l.slice(0, k))); res.recent = Math.round(avg(l.slice(-k))); res.diff = res.recent - res.early; }
    return res;
  }).filter(Boolean);
  const nat = {};
  list.forEach((r) => Object.entries(r.parNature || {}).forEach(([code, v]) => { const t = nat[code] || (nat[code] = { c: 0, p: 0 }); t.c += v.c || 0; t.p += v.p || 0; }));
  const parNature = Object.entries(nat).filter(([, v]) => v.p >= 2).map(([code, v]) => ({ code, nom: NATURE_BY_CODE[code]?.nom || code, pct: Math.round((v.c / v.p) * 100), p: v.p })).sort((a, b) => b.pct - a.pct);
  const conf = {};
  list.forEach((r) => (r.erreurs || []).forEach((e) => { const k = `${e.bonne}|${e.choisie}`; conf[k] = (conf[k] || 0) + 1; }));
  const confusions = Object.entries(conf).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k, n]) => { const [bonne, choisie] = k.split('|'); return { bonne, choisie, n }; });
  return {
    list, niveaux, parNature, confusions,
    first: dates[0], last: dates[dates.length - 1],
    jours: new Set(dates.map((d) => d.toDateString())).size,
    questions: list.reduce((t, r) => t + (r.total || 0), 0),
    bonnes: list.reduce((t, r) => t + (r.score || 0), 0),
  };
}
const NIVEAU_TITRE = { 1: 'Exercice 1 : reconnaissance des natures de mots, niveau 1', 2: 'Exercice 2 : reconnaissance des natures de mots, niveau 2', 3: 'Exercice 3 : reconnaissance des natures et fonctions des mots dans le groupe verbal', 4: 'Exercice 4 : reconnaissance des natures et fonctions des mots dans le groupe nominal', 5: 'Exercice 5 : bilan, le tableau des 20 cases avec guide', 6: 'Exercice 6 : bilan, le tableau des 20 cases sans guide', 7: 'Temps et modes, exercice 1 : un texte au système du présent', 8: 'Temps et modes, exercice 2 : un texte au système du passé', 9: 'Temps et modes, exercice 3 : analyse des temps et des modes personnels (système du présent)', 10: 'Temps et modes, exercice 4 : analyse des temps et des modes personnels (système du passé)', 11: 'Temps et modes, exercice 5 : du passé au présent', 12: 'Temps et modes, exercice 6 : du présent au passé', 13: 'La phrase, exercice 1 : syntaxe de la phrase', 14: 'La phrase, exercice 2 : nature et fonction des propositions', 15: 'La phrase, exercice 3 : discours direct et discours indirect', 16: 'La phrase : types et formes de phrases', 17: 'CE : trouver le verbe conjugué', 18: 'CE : trouver l\'infinitif', 19: 'CE : passé, présent ou futur', 20: 'CE : le présent', 21: 'CE : le futur', 22: 'CE : l\'imparfait', 23: 'CE : le passé composé avec avoir', 24: 'CE : le passé composé avec être', 25: 'CE : être et avoir', 26: 'CE : les trois groupes', 27: 'CE : écrire les verbes au bon temps', 28: "CE : trouver les noms", 29: "CE : nom commun ou nom propre", 30: "CE : trouver les déterminants", 31: "CE : les sortes de déterminants", 32: "CE : trouver les adjectifs", 33: "CE : le genre et le nombre des noms", 34: "CE : accorder dans le groupe nominal", 35: "CE : les pronoms personnels sujets", 36: "CE : trouver le sujet du verbe", 37: "CE : nom commun, nom propre, déterminant, adjectif, verbe ou pronom", 38: "CE : reconnaître la nature des mots", 39: "CE : accorder le groupe nominal et le verbe", 40: "CE : phrase ou pas phrase ?", 41: "CE : la ponctuation de fin de phrase", 42: "CE : les trois types de phrases", 43: "CE : transformer en phrase interrogative", 44: "CE : transformer en phrase impérative", 45: "CE : forme affirmative ou forme négative", 46: "CE : transformer à la forme négative", 47: "CE : les paroles des personnages", 48: "CE : sujet, verbe, complément", 49: "CE : les compléments de phrase", 50: "CE : transformer les phrases", 51: "CM : les natures des mots variables", 52: "CM : les mots invariables", 53: "CM : déterminant ou pronom ?", 54: "CM : trouver le sujet du verbe", 55: "CM : complément du verbe ou complément de phrase ?", 56: "CM : attribut du sujet ou complément du verbe ?", 57: "CM : épithète ou complément du nom ?", 58: "CM : accorder dans le groupe nominal", 59: "CM : accorder le verbe avec son sujet", 60: "CM : accorder l'attribut et le participe passé", 61: "CM : nature et fonction des mots", 62: "CM : tous les accords", 63: "CM : le présent des verbes irréguliers", 64: "CM : le futur", 65: "CM : l'imparfait", 66: "CM : le passé simple", 67: "CM : imparfait ou passé simple ?", 68: "CM : le passé composé", 69: "CM : le plus-que-parfait", 70: "CM : le conditionnel présent", 71: "CM : l'impératif présent", 72: "CM : les temps du récit au passé", 73: "CM : écrire un récit au passé", 74: "CM : phrase verbale ou phrase nominale ?", 75: "CM : les trois types de phrases", 76: "CM : les formes de phrases", 77: "CM : les mots de la négation", 78: "CM : poser une question", 79: "CM : phrase simple ou phrase complexe ?", 80: "CM : propositions juxtaposées ou coordonnées ?", 81: "CM : le dialogue", 82: "CM : discours direct ou discours indirect ?", 83: "CM : les compléments de lieu, de temps, de manière", 84: "CM : transformer les phrases" };
/* « au lieu d'un adverbe », « au lieu du sujet », « au lieu de la fonction… » */
const auLieuDe = (t) => (/^le /.test(t) ? 'du ' + t.slice(3) : /^les /.test(t) ? 'des ' + t.slice(4) : /^[aeiouéèêh]/i.test(t) ? "d'" + t : 'de ' + t);
function buildBilan(scores) {
  const A = analyseScores(scores);
  const E = playerProfile?.enfant || {};
  const nom = [E.prenom, E.nom].filter(Boolean).join(' ');
  const taux = A.questions ? Math.round((A.bonnes / A.questions) * 100) : 0;
  const bar = (pct) => `<span class="rp-bar"><span style="width:${Math.max(2, Math.min(100, pct))}%"></span></span>`;
  const line = (label, pct) => `<div class="rp-line"><span class="rp-line-label">${esc(label)}</span>${bar(pct)}<span class="rp-line-pct">${pct} %</span></div>`;
  const cards = A.niveaux.map((r) => `
    <div class="rp-card">
      <div class="rp-card-title">${esc(NIVEAU_TITRE[r.n])}</div>
      <div class="rp-card-big">${r.avg} %</div>
      <div class="rp-card-sub">moyenne sur ${r.count} partie${r.count > 1 ? 's' : ''}</div>
      ${r.diff !== undefined ? `<div class="rp-card-trend ${r.diff > 0 ? 'up' : r.diff < 0 ? 'down' : ''}">${r.diff > 0 ? '▲ +' + r.diff : r.diff < 0 ? '▼ ' + r.diff : '= stable'} pts<br><span>${r.early} % au début → ${r.recent} % récemment</span></div>` : ''}
    </div>`).join('');
  const reussies = A.parNature.filter((x) => x.pct >= 75);
  const aRevoir = A.parNature.filter((x) => x.pct < 75).sort((a, b) => a.pct - b.pct);
  const defis = [];
  aRevoir.slice(0, 2).forEach((x) => defis.push(`Revoir ${NATURE_BY_CODE[x.code]?.article || x.nom} (${x.pct} %) : relis sa définition dans la fiche 📖, puis rejoue.`));
  A.confusions.slice(0, 2).forEach((c) => defis.push(`Ne pas confondre ${c.bonne} et ${c.choisie} (${c.n} fois).`));
  if (!defis.length && A.niveaux.some((r) => r.n === 2) && !A.niveaux.some((r) => r.n === 3)) defis.push('Essayer le jeu des fonctions : trouver la nature, puis la fonction des mots dans le groupe verbal !');
  if (!defis.length) defis.push(A.niveaux.some((r) => r.n === 2) ? 'Continuer à jouer au niveau 2 pour connaître par cœur toutes les sortes de déterminants et de pronoms.' : 'Essayer le niveau 2 : les sept sortes de déterminants et les sept sortes de pronoms t\'attendent !');
  const intro = taux >= 80 ? `Bravo ! Tu as trouvé ${taux} % des réponses du premier coup : tu connais très bien les natures des mots.`
    : taux >= 60 ? `Tu as trouvé ${taux} % des réponses du premier coup : c'est un beau travail. Continue, les natures deviennent de plus en plus faciles à reconnaître.`
    : `Tu as trouvé ${taux} % des réponses du premier coup. Chaque partie t'aide à mieux reconnaître les mots : l'important est de continuer.`;
  const natHtml = A.parNature.length ? `<div class="rp-cols">
      <div class="rp-col"><h3>Ce que tu connais bien</h3>${reussies.length ? reussies.slice(0, 8).map((x) => line(x.nom, x.pct)).join('') : '<p class="rp-empty">Bientôt !</p>'}</div>
      <div class="rp-col"><h3>Ce qu'il faut revoir</h3>${aRevoir.length ? aRevoir.slice(0, 8).map((x) => line(x.nom, x.pct)).join('') : '<p class="rp-empty">Aucune : bravo !</p>'}</div>
    </div>` : '';
  const confHtml = A.confusions.length ? `<section class="rp-section"><h3>Les confusions les plus fréquentes</h3><ul class="rp-list">${A.confusions.map((c) => `<li>Réponse « ${esc(c.choisie)} » au lieu de « ${esc(c.bonne)} » : ${c.n} fois</li>`).join('')}</ul></section>` : '';
  return `${bilanCorners()}
    <div class="rp-frame"></div>
    <div class="rp-inner">
      <div class="rp-header">
        ${bilanEmblem()}
        <div class="rp-eyebrow">MNEMOGRAM</div>
        <h2>Bilan de progression</h2>
        <div class="rp-decor"><span></span><i>❖</i><span></span></div>
        <div class="rp-award">${nom ? 'est décerné avec félicitations à' : 'est décerné avec félicitations'}</div>
        ${nom ? `<div class="rp-name">${esc(nom)}</div>` : ''}
        ${A.first ? `<div class="rp-period">${fmtDate(A.first) === fmtDate(A.last) ? 'le ' + esc(fmtDate(A.first)) : `du ${esc(fmtDate(A.first))} au ${esc(fmtDate(A.last))}`}</div>` : ''}
      </div>
      <p class="rp-intro">${esc(intro)}</p>
      <div class="rp-figures">
        <div><strong>${A.list.length}</strong><span>partie${A.list.length > 1 ? 's' : ''}</span></div>
        <div><strong>${A.jours}</strong><span>jour${A.jours > 1 ? 's' : ''} de pratique</span></div>
        <div><strong>${A.questions}</strong><span>mots reconnus</span></div>
        <div><strong>${taux} %</strong><span>trouvés du premier coup</span></div>
      </div>
      <div class="rp-cards">${cards}</div>
      ${natHtml}
      ${confHtml}
      <section class="rp-section rp-next"><h3>Ton prochain défi</h3><ul class="rp-list">${defis.slice(0, 3).map((x) => `<li>${esc(x)}</li>`).join('')}</ul></section>
      <p class="rp-closing">${E.prenom ? esc(E.prenom) + ', continue' : 'Continue'} à lire, à observer et à nommer les mots : chaque partie rend ta mémoire plus forte.</p>
      <div class="rp-bottom">
        <span class="rp-foot">Établi le ${esc(fmtDate(new Date()))}<br>d'après les scores de ton compte</span>
        ${bilanSeal()}
        <span class="rp-foot rp-sign">La grammaire à travers la mémoire<br><strong>MNEMOGRAM</strong></span>
      </div>
    </div>`;
}
/* Texte du bilan pour l'e-mail (le PDF du diplôme, lui, s'enregistre avec « Imprimer / Enregistrer en PDF »). */
function bilanMessage(scores) {
  const A = analyseScores(scores);
  const E = playerProfile?.enfant?.prenom || '';
  const taux = A.questions ? Math.round((A.bonnes / A.questions) * 100) : 0;
  const l = [`Mon bilan sur MNEMOGRAM : ${A.list.length} partie${A.list.length > 1 ? 's' : ''}, ${taux} % des mots trouvés du premier coup.`, ''];
  A.niveaux.forEach((r) => l.push(`- ${NIVEAU_TITRE[r.n]} : ${r.avg} % en moyenne sur ${r.count} partie${r.count > 1 ? 's' : ''}${r.diff !== undefined ? ` (${r.early} % au début, ${r.recent} % récemment)` : ''}.`));
  const aRevoir = A.parNature.filter((x) => x.pct < 75).sort((a, b) => a.pct - b.pct).slice(0, 4);
  if (aRevoir.length) { l.push('', 'À revoir :'); aRevoir.forEach((x) => l.push(`- ${x.nom} : ${x.pct} %`)); }
  if (A.confusions.length) { l.push('', 'Mes confusions les plus fréquentes :'); A.confusions.forEach((c) => l.push(`- j'ai répondu ${c.choisie} au lieu ${auLieuDe(c.bonne)} (${c.n} fois)`)); }
  l.push('', 'Mes dernières parties :');
  A.list.slice(-10).reverse().forEach((r) => { const d = new Date(r.date); l.push(`- ${isNaN(d) ? '' : d.toLocaleDateString('fr-FR') + ' : '}${scoreType(r.jeu)}, ${fmtPts(r.score)} / ${r.total}`); });
  l.push('', E, 'https://stassi-tech.github.io/mnemogram/');
  return l.join('\n');
}
/* Les boutons d'envoi (Gmail / autre messagerie) servent à la fin d'une partie, dans Mon compte et dans le bilan. */
function sendBoxHtml(idPrefix, intro) {
  const avecMail = (playerProfile?.adultes || []).filter((a) => a.email);
  if (!avecMail.length) return '<p class="send-hint">Pour envoyer tes scores, ajoute l\'adresse e-mail d\'un proche dans ta fiche (ci-dessus).</p>';
  return `<p class="send-title">${intro}</p>
    <p class="send-hint send-howto">Le message s'ouvre déjà écrit, avec les adresses : il ne reste qu'à cliquer sur « Envoyer ».</p>
    <div class="send-list" id="${idPrefix}-list">${avecMail.map((a) => `<label class="send-person"><input type="checkbox" value="${esc(a.email)}" checked />${a.photo ? `<img class="send-photo" src="${a.photo}" alt="" />` : ''}<span>${esc(LIENS[a.lien]?.label || a.email)}${a.prenom ? ' ' + esc(a.prenom) : ''}</span></label>`).join('')}</div>
    <div class="send-buttons">
      <button type="button" class="primary-button" id="${idPrefix}-gmail">✉️ Envoyer avec Gmail</button>
      <button type="button" class="secondary-button" id="${idPrefix}-mail">Autre messagerie</button>
    </div>`;
}
/* Texte de l'« envoi des scores » : les dernières parties, avec les erreurs de la plus récente. */
function scoresMessage(scores) {
  const E = playerProfile?.enfant?.prenom || '';
  const list = scores.slice(0, 10);
  const l = ['Mes derniers scores sur MNEMOGRAM :', ''];
  list.forEach((r) => { const d = new Date(r.date); l.push(`- ${isNaN(d) ? '' : d.toLocaleDateString('fr-FR') + ' : '}${scoreType(r.jeu)}, ${niveauOf(r) >= 3 ? `${fmtPts(r.score)} point${r.score >= 2 ? 's' : ''} sur ${r.total}` : `${r.score} bonne${r.score > 1 ? 's' : ''} réponse${r.score > 1 ? 's' : ''} du premier coup sur ${r.total}`}`); });
  const last = list[0];
  if (last && (last.erreurs || []).length) {
    l.push('', 'Mes erreurs à la dernière partie :');
    last.erreurs.forEach((e) => l.push(`- « ${e.mot} » (${e.phrase}) : c'était ${e.bonne}, et j'avais répondu ${e.choisie}.`));
  }
  l.push('', E, 'https://stassi-tech.github.io/mnemogram/');
  return l.join('\n');
}
function wireSendButtons(listId, idPrefix, getSubject, getBody) {
  const to = () => [...document.querySelectorAll(`#${listId} input:checked`)].map((c) => c.value);
  $(`${idPrefix}-gmail`)?.addEventListener('click', async () => {
    const t = to(); if (!t.length) return;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(t.join(','))}&su=${encodeURIComponent(getSubject())}&body=${encodeURIComponent(await getBody())}`, '_blank', 'noopener');
  });
  $(`${idPrefix}-mail`)?.addEventListener('click', async () => {
    const t = to(); if (!t.length) return;
    location.href = `mailto:${t.join(',')}?subject=${encodeURIComponent(getSubject())}&body=${encodeURIComponent(await getBody())}`;
  });
}
function wireSendBox(idPrefix, getSubject, getBody) {
  const to = () => [...document.querySelectorAll(`#${idPrefix}-list input:checked`)].map((c) => c.value);
  $(`${idPrefix}-gmail`)?.addEventListener('click', async () => {
    const t = to(); if (!t.length) return;
    const body = await getBody();
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(t.join(','))}&su=${encodeURIComponent(getSubject())}&body=${encodeURIComponent(body)}`, '_blank', 'noopener');
  });
  $(`${idPrefix}-mail`)?.addEventListener('click', async () => {
    const t = to(); if (!t.length) return;
    const body = await getBody();
    location.href = `mailto:${t.join(',')}?subject=${encodeURIComponent(getSubject())}&body=${encodeURIComponent(body)}`;
  });
}
const bilanSubject = () => `${playerProfile?.enfant?.prenom ? playerProfile.enfant.prenom + ' : ' : ''}mon bilan sur MNEMOGRAM`;
async function openBilan() {
  const overlay = $('report-overlay'), sheet = $('report-sheet');
  sheet.innerHTML = '<p class="rp-loading">Préparation de ton bilan…</p>';
  $('report-send').innerHTML = '';
  overlay.classList.remove('hidden');
  const scores = await loadScores();
  if (!scores.length) { sheet.innerHTML = '<p class="rp-loading">Pas encore de score enregistré : termine une partie, et ton bilan apparaîtra ici.</p>'; return; }
  sheet.innerHTML = buildBilan(scores);
  if (optEnvoi(playerProfile)) {
    $('report-send').innerHTML = sendBoxHtml('rsend', 'Envoi du bilan de progression à :');
    wireSendBox('rsend', bilanSubject, async () => bilanMessage(scores));
  }
}

/* ------------------------------------------------------------
   v13 : « MES DONNÉES » — chacun efface lui-même ses scores, ses données MNEMOGRAM, ou son compte entier,
   sans avoir à écrire au contact.
   Le compte est commun avec MNEMART (même service Firebase) : le supprimer efface aussi les données MNEMART
   (scores et atelier) et l'accès aux deux sites. Par sécurité, Firebase demande alors le mot de passe.
   ------------------------------------------------------------ */
async function deleteCollection(name, filtre) {
  const snap = await db.collection('users').doc(currentUser.uid).collection(name).get();
  const docs = filtre ? snap.docs.filter((d) => filtre(d.data(), d.id)) : snap.docs;
  for (const d of docs) await d.ref.delete();
  return docs.length;
}
function setDataMsg(kind, t) { const el = $('data-msg'); el.className = kind === 'ok' ? 'account-notice' : 'account-error'; el.textContent = t; el.classList.remove('hidden'); }
function wireMesDonnees() {
  $('data-del-scores').addEventListener('click', async () => {
    if (!currentUser || !confirm('Effacer tous les scores MNEMOGRAM de ce compte ? Le bilan de progression repartira de zéro.')) return;
    try { const n = await deleteCollection('mnemogram', (d) => d.type === 'score'); setDataMsg('ok', `${n} score${n > 1 ? 's' : ''} effacé${n > 1 ? 's' : ''}.`); renderScoreHistory(); }
    catch (e) { setDataMsg('err', 'Les scores n\'ont pas pu être effacés. Réessayez.'); }
  });
  $('data-del-mnemogram').addEventListener('click', async () => {
    if (!currentUser || !confirm('Effacer toutes vos données MNEMOGRAM : la fiche du joueur, les photos, les proches et tous les scores ?\n\nLe compte lui-même est gardé (vous pourrez toujours vous connecter, ici et sur MNEMART).')) return;
    try {
      await deleteCollection('mnemogram');
      try { localStorage.removeItem(localKey(currentUser.uid)); } catch (e) {}
      playerProfile = null; updateAccountBar();
      $('profile-modal').classList.add('hidden');
      openProfile(true);
    } catch (e) { setDataMsg('err', 'Les données n\'ont pas pu être effacées. Réessayez.'); }
  });
  $('data-del-account').addEventListener('click', () => { $('data-del-account-box').classList.toggle('hidden'); $('data-password').focus(); });
  $('data-del-account-confirm').addEventListener('click', async () => {
    const pw = $('data-password').value;
    if (!pw) { setDataMsg('err', 'Écrivez votre mot de passe pour confirmer.'); return; }
    if (!confirm('Dernière vérification : supprimer définitivement ce compte, pour MNEMOGRAM ET pour MNEMART ? Cette action ne peut pas être annulée.')) return;
    try {
      const cred = firebase.auth.EmailAuthProvider.credential(currentUser.email, pw);
      await currentUser.reauthenticateWithCredential(cred);
      for (const c of ['mnemogram', 'scores', 'atelier']) { try { await deleteCollection(c); } catch (e) { console.warn('Effacement', c, e); } }
      try { localStorage.removeItem(localKey(currentUser.uid)); } catch (e) {}
      await currentUser.delete();
      $('profile-modal').classList.add('hidden');
      alert('Votre compte a été supprimé. Merci d\'avoir joué avec MNEMOGRAM !');
    } catch (e) {
      setDataMsg('err', e?.code === 'auth/wrong-password' || e?.code === 'auth/invalid-credential' ? 'Mot de passe incorrect : le compte n\'a pas été supprimé.' : 'Le compte n\'a pas pu être supprimé. Réessayez.');
    }
  });
}

function authErrorMessage(error) {
  const map = {
    'auth/email-already-in-use': 'Un compte existe déjà avec cette adresse e-mail (peut-être un compte Mnemart : c\'est le même). Connectez-vous avec, puis complétez la fiche du joueur.',
    'auth/invalid-email': 'Adresse e-mail invalide.',
    'auth/weak-password': 'Le mot de passe doit contenir au moins 6 caractères.',
    'auth/user-not-found': 'Aucun compte ne correspond à cette adresse e-mail.',
    'auth/wrong-password': 'Mot de passe incorrect.',
    'auth/invalid-credential': 'E-mail ou mot de passe incorrect.',
    'auth/operation-not-supported-in-this-environment': 'Les comptes ne fonctionnent que sur le site en ligne (pas en ouvrant le fichier directement sur l\'ordinateur).',
    'auth/network-request-failed': 'Pas de connexion à Internet. Réessayez.',
  };
  return map[error?.code] || 'Une erreur est survenue. Réessayez.';
}

function wireAccount() {
  $('home-account-slot').addEventListener('click', openAccount);
  $('home-account-slot').addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAccount(); } });
  $('global-account-button').addEventListener('click', openAccount);
  $('home-account-switch').addEventListener('click', (e) => {
    e.stopPropagation();
    if (!auth) return;
    if (currentUser) auth.signOut(); else openAccount();
  });
  document.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => $(b.dataset.close).classList.add('hidden')));
  $('account-toggle-mode').addEventListener('click', () => setAccountMode(accountMode === 'login' ? 'register' : 'login'));
  $('account-forgot-button').addEventListener('click', async () => {
    const email = $('account-email').value.trim();
    const err = $('account-error'), ok = $('account-notice');
    err.classList.add('hidden'); ok.classList.add('hidden');
    if (!email) { err.textContent = 'Écrivez d\'abord votre adresse e-mail ci-dessus, puis recliquez sur « Mot de passe oublié ? ».'; err.classList.remove('hidden'); return; }
    try { await auth.sendPasswordResetEmail(email); ok.textContent = `Un e-mail de réinitialisation a été envoyé à ${email} (pensez à regarder dans les spams).`; ok.classList.remove('hidden'); }
    catch (e) { err.textContent = authErrorMessage(e); err.classList.remove('hidden'); }
  });
  $('account-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const err = $('account-error');
    err.classList.add('hidden');
    const email = $('account-email').value.trim(), password = $('account-password').value;
    try {
      if (accountMode === 'login') {
        await auth.signInWithEmailAndPassword(email, password);
      } else {
        const p = readProfileFields('reg');
        const pb = checkProfile(p); if (pb) { err.textContent = pb; err.classList.remove('hidden'); return; }
        pendingProfile = p;   /* enregistrée dès que la connexion est établie (voir onAuthStateChanged) */
        await auth.createUserWithEmailAndPassword(email, password);
      }
      $('account-modal').classList.add('hidden');
      $('account-form').reset();
    } catch (ex) { pendingProfile = null; err.textContent = authErrorMessage(ex); err.classList.remove('hidden'); }
  });
  $('profile-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const err = $('profile-error'), ok = $('profile-notice');
    err.classList.add('hidden'); ok.classList.add('hidden');
    const p = readProfileFields('pro');
    const pb = checkProfile(p); if (pb) { err.textContent = pb; err.classList.remove('hidden'); return; }
    playerProfile = p; updateAccountBar();
    try { await saveProfile(currentUser.uid, p); ok.textContent = 'Fiche enregistrée.'; ok.classList.remove('hidden'); setTimeout(() => $('profile-modal').classList.add('hidden'), 900); }
    catch (ex) { console.warn(ex); ok.textContent = 'Fiche gardée sur cet appareil (l\'enregistrement en ligne a échoué, il sera retenté à la prochaine modification).'; ok.classList.remove('hidden'); }
  });
  $('profile-logout-button').addEventListener('click', () => { $('profile-modal').classList.add('hidden'); auth.signOut(); });
  wireMesDonnees();
  auth.onAuthStateChanged(async (user) => {
    currentUser = user;
    playerProfile = null;
    if (user) {
      if (pendingProfile) {
        playerProfile = pendingProfile; pendingProfile = null;
        try { await saveProfile(user.uid, playerProfile); } catch (ex) { console.warn('Enregistrement de la fiche', ex); }
      } else {
        playerProfile = await loadProfile(user.uid);
        if (!playerProfile) openProfile(true);
      }
    }
    updateAccountBar();
  });
}
let pendingProfile = null;

/* ------------------------------------------------------------
   DÉMARRAGE
   ------------------------------------------------------------ */
/* v76 : les textes des exercices peuvent venir de fichiers « textes-….js », fabriqués par l'atelier à partir des
   fichiers Word de Stéphane. Ils remplacent les textes écrits ici, exercice par exercice. */
function appliqueTextes() {
  const X = window.MNEMO_TEXTES || {};
  Object.entries(X).forEach(([cle, v]) => {
    const L = (v && v.textes || []).filter((t) => t && t.texte); if (!L.length) return;
    if (v.moteur === 'tv') TROUVE[cle] = L;
    else if (v.moteur === 'tf') TRANSFOS[cle] = L;
    else if (v.moteur === 'sx') TEXTES_TF[cle.replace(/^formes-/, '')] = L.slice().sort((x, y) => (x.texte.match(/\{/g) || []).length - (y.texte.match(/\{/g) || []).length);
    else if (v.moteur === 'tm') {
      const niv = cle.replace(/^temps1-/, ''), anciens = TEXTES_TM.filter((x) => x.niv === niv);
      for (let k = TEXTES_TM.length - 1; k >= 0; k -= 1) if (TEXTES_TM[k].niv === niv) TEXTES_TM.splice(k, 1);
      L.forEach((t) => TEXTES_TM.push({ ...(anciens.find((x) => x.titre === t.titre) || { systeme: 'présent' }), niv, titre: t.titre, texte: t.texte }));
    }
  });
}
try { appliqueTextes(); } catch (e) { console.warn('Textes des fichiers Word non appliqués :', e); }
$('global-version-badge').textContent = APP_VERSION;
initMosaic();
buildNatureButtons();
loadFiche();

$('nat-sentence').addEventListener('click', (e) => { const w = e.target.closest('.w'); if (w && isG4()) clicMotGN(Number(w.dataset.i), w); else if (w && isG3()) clicMotGV(Number(w.dataset.i), w); else if (w && isG5()) clicMotTab(Number(w.dataset.i), w); else if (w && isG6()) clicCaseLibre(Number(w.dataset.i)); else if (w && isT1() && !currentGame.sx && !currentGame.dr && !currentGame.tv && w.dataset.i !== undefined) (currentGame.tf ? clicTF : clicFormeTM)(Number(w.dataset.i)); });
$('nat-start-button').addEventListener('click', startGame);
$('nat-next-button').addEventListener('click', nextQuestion);
/* v68 : la voix lit le texte tel qu'il est sur l'ardoise, avec les réponses déjà données : l'élève entend sa phrase,
   et peut ainsi repérer à l'oral une incohérence qu'il ne voit pas à l'écrit. */
/* v70 : la voix prononce mal l'infinitif en -er au milieu d'une phrase (« il traverser » s'entend comme « il traversait ») :
   on lui fait dire « traversé », précédé et suivi d'une pause. */
const prononceInf = (s) => (/^(fier|cher|hiver|mer|fer|ver|amer|hier|super)$/i.test(s.trim()) ? s : s.replace(/er\b/g, 'é'));
function texteArdoise(racine) {
  const c = (racine || $('nat-sentence')).cloneNode(true);
  c.querySelectorAll('.tm-titre, .labs, .lab, .ancien, .sx-lanes, .fit-tmp, .suite-tm, .gloses').forEach((x) => x.remove());
  c.querySelectorAll('.dr-seg.transforme .dr-ancien').forEach((x) => x.remove());
  c.querySelectorAll('.tm-cadre.replie').forEach((x) => x.remove());
  c.querySelectorAll('.f').forEach((f) => { const m = f.textContent.trim().match(/^\((.+)\)$/); if (m) f.textContent = `, ${prononceInf(m[1])},`; });
  c.querySelectorAll('.w, .dr-mot, .tv-mot').forEach((x) => x.append(' '));
  return c.textContent.replace(/[()*]/g, '').replace(/\s+/g, ' ').replace(/ ([.,])/g, '$1').replace(/,\s*([.!?])/g, '$1').replace(/,,/g, ',').replace(/\b([A-Za-z]') /g, '$1').trim();
}
/* v69 : la phrase autour d'un élément, telle qu'elle est écrite maintenant sur l'ardoise */
function phraseDe(el) {
  if (!el) return '';
  const box = el.closest('.tm-texte, .dr-texte'); if (!box) return '';
  const items = [...box.childNodes];
  const k = items.findIndex((n) => n === el || (n.contains && n.contains(el))); if (k < 0) return '';
  const txt = (n) => { if (n.nodeType === 3) return n.textContent; const d = document.createElement('div'); d.appendChild(n.cloneNode(true)); return texteArdoise(d); };
  const T = items.map(txt), fin = (s) => /[.!?»]\s*$/.test(s.trim());
  let deb = k; while (deb > 0 && !fin(T[deb - 1])) deb -= 1;
  let der = k; while (der < T.length - 1 && !fin(T[der])) der += 1;
  return T.slice(deb, der + 1).join(' ').replace(/\s+/g, ' ').replace(/ ([.,!?])/g, '$1').replace(/,\s*([.!?])/g, '$1').replace(/\b([A-Za-z]') /g, '$1').trim();
}
function lisPhraseDe(el) { if (el && volumeLevel) speak(phraseDe(el), 'femme', 'phrase'); }
/* la voix dit plusieurs choses à la suite, sans se couper elle-même */
function dis(...morceaux) { morceaux.filter(Boolean).forEach((m, k) => speak(m, 'femme', 'phrase', k > 0)); }
/* attendre que la voix ait fini avant de passer à la suite (au plus 20 secondes) */
function quandVoixFinie(cb) {
  const debut = Date.now();
  const t = () => { if (!('speechSynthesis' in window) || !volumeLevel || (!speechSynthesis.speaking && !speechSynthesis.pending) || Date.now() - debut > 20000) setTimeout(cb, 500); else setTimeout(t, 250); };
  setTimeout(t, 400);
}
/* le bouton de la voix : pendant l'exercice, « Relire la phrase » ; à la fin, « Relire tout le texte » */
function boutonVoix(fini) { $('nat-listen-button').textContent = fini ? '🔊 Relire tout le texte' : '🔊 Relire la phrase'; game.texteFini = !!fini; }
function elementCourant() {
  if (!currentGame) return null;
  if (currentGame.tf) return tf.sel !== null ? wordEl(tf.sel) : null;
  if (currentGame.tm) return tm.sel !== null ? wordEl(tm.sel) : null;
  if (currentGame.dr) return document.querySelector('#nat-sentence .dr-seg.choisi') || null;
  return null;
}
$('nat-listen-button').addEventListener('click', () => {
  if (currentGame && (currentGame.tf || currentGame.tm || currentGame.dr || currentGame.tv || currentGame.sx)) {
    const prev = volumeLevel; if (!volumeLevel) volumeLevel = 3;
    let el = game.texteFini ? null : elementCourant();
    /* v71 : rien n'est choisi : la voix ne lit pas tout le texte, elle va à la première phrase qui reste à faire */
    if (!el && !game.texteFini && currentGame.tf && tf.registre) { const k = tf.elts.findIndex((x, j) => !tf.rep[j]); if (k >= 0) { clicTF(k); volumeLevel = prev; return; } }
    if (!el && !game.texteFini && currentGame.tm) { const k = indicesPhase().find((j) => !estFaite(j)); if (k !== undefined) { clicFormeTM(k); volumeLevel = prev; return; } }
    speak(el ? phraseDe(el) : texteArdoise(), 'femme', 'phrase'); volumeLevel = prev; return;
  }
  const q = game.questions[game.index]; if (!q) return;
  const prev = volumeLevel; if (!volumeLevel) { volumeLevel = 3; }
  if (q.dr) { speak(TEXTES_DR[q.t].texte.replace(/\[\[\d+\||\]\]|\(\(|\)\)/g, ''), 'femme', 'phrase'); volumeLevel = prev; return; }
  if (q.sx) { speak(SX_T().texte.replace(/\[[NSCdqi]\]/g, '').replace(/\{[^|}]+\|([^}]*)\}/g, '$1').replace(/\s+/g, ' '), 'femme', 'phrase'); volumeLevel = prev; return; }
  if (q.tf) { speak(TRANSFOS[currentGame.tf][q.t].texte.replace(/\{([^>}]+)>[^}]*\}/g, '$1').replace(/ ([.,])/g, '$1'), 'femme', 'phrase'); volumeLevel = prev; return; }
  if (q.tm) { speak(TEXTES_TM[q.t].texte.replace(/\{([^}|]+)\|[^}]*\}/g, '$1').replace(/ ([.,])/g, '$1'), 'femme', 'phrase'); volumeLevel = prev; return; }
  speak(phraseTexte(q.gv ? motsGV(q) : motsDe(q)).replace(/(\S)\.(\S)/g, '$1. $2').replace(/\(…\)/g, '').trim(), 'femme', 'phrase');
  volumeLevel = prev;
});
$('results-replay').addEventListener('click', startGame);
$('results-home').addEventListener('click', () => showPanel('welcome'));
/* v19 : la flèche ← du bandeau revient à la page précédente : elle ferme d'abord une fenêtre ouverte (fiche,
   compte, bilan, aide…) ; sinon résultats → accueil, partie en cours → écran « Démarrer le jeu » de ce jeu,
   écran « Démarrer le jeu » → accueil. */
function goBack() {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (!$('report-overlay').classList.contains('hidden')) { $('report-overlay').classList.add('hidden'); return; }
  if (!$('ambiance-picker').classList.contains('hidden')) { $('ambiance-picker').classList.add('hidden'); return; }
  const ouvertes = [...document.querySelectorAll('.modal-backdrop:not(.hidden)')];
  if (ouvertes.length) { ouvertes[ouvertes.length - 1].classList.add('hidden'); return; }
  if (!$('natures-panel').classList.contains('hidden') && $('nat-ready-screen').classList.contains('hidden')) {
    openGame(Object.keys(GAMES).find((k) => GAMES[k] === currentGame)); return;
  }
  if (!$('welcome-panel').classList.contains('hidden') && partieAccueil) { montrePartie(''); return; }
  showPanel('welcome');
  /* d'un exercice, on revient à la page de sa partie */
  if (currentGame && !partieAccueil) montrePartie(currentGame.partie || 'mots');
}
$('global-back-button').addEventListener('click', goBack);
/* hauteur réelle du bandeau (il peut passer sur deux lignes sur un petit écran) */
function majHauteurBandeau() { const t = document.querySelector('.topbar-banner'); if (t) document.documentElement.style.setProperty('--topbar-h', `${t.offsetHeight}px`); }
window.addEventListener('resize', majHauteurBandeau); majHauteurBandeau();
$('global-home-button').addEventListener('click', () => { if ('speechSynthesis' in window) speechSynthesis.cancel(); showPanel('welcome'); montrePartie(''); });
$('global-fullscreen-button').addEventListener('click', () => {
  if (document.fullscreenElement) document.exitFullscreen?.(); else document.documentElement.requestFullscreen?.();
});
$('global-fiche-button').addEventListener('click', openFiche);
$('report-close').addEventListener('click', () => $('report-overlay').classList.add('hidden'));
/* v12 : mentions légales et contact (comme sur Mnemart) */
$('open-mentions-legales').addEventListener('click', () => $('mentions-modal').classList.remove('hidden'));
$('open-contact').addEventListener('click', () => $('contact-modal').classList.remove('hidden'));
/* v14 : aide, contact et sortie de la session dans le bandeau (comme dans Mnemart) */
$('global-info-button').addEventListener('click', () => $('info-modal').classList.remove('hidden'));
$('global-contact-button').addEventListener('click', () => $('contact-modal').classList.remove('hidden'));
$('global-quit-button').addEventListener('click', () => {
  if (!confirm(currentUser ? 'Quitter la session ? La partie en cours s\'arrête et le compte se déconnecte.' : 'Quitter la session ? La partie en cours s\'arrête.')) return;
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  game.fini = true;
  if (auth && currentUser) auth.signOut();
  showPanel('welcome'); montrePartie('');
});
/* v14 : les ambiances de Mnemart (les couleurs et décors du site), gardées sur l'appareil */
function applyAmbiance(v) { if (v) document.body.setAttribute('data-ambiance', v); else document.body.removeAttribute('data-ambiance'); }
let ambiance = ''; try { ambiance = localStorage.getItem('mnemogram-ambiance') || ''; } catch (e) {}
applyAmbiance(ambiance);
$('global-ambiance-button').addEventListener('click', (e) => {
  e.stopPropagation();
  const p = $('ambiance-picker');
  if (p.classList.contains('hidden')) { const r = document.querySelector(`input[name="ambiance"][value="${ambiance}"]`); if (r) r.checked = true; }
  p.classList.toggle('hidden');
});
document.querySelectorAll('input[name="ambiance"]').forEach((r) => r.addEventListener('change', () => {
  if (!r.checked) return;
  ambiance = r.value; applyAmbiance(ambiance);
  try { localStorage.setItem('mnemogram-ambiance', ambiance); } catch (e) {}
}));
document.addEventListener('click', (e) => { const p = $('ambiance-picker'); if (!p.classList.contains('hidden') && !p.contains(e.target) && e.target.id !== 'global-ambiance-button') p.classList.add('hidden'); });
['mentions-modal', 'contact-modal', 'info-modal'].forEach((id) => {
  $(id).addEventListener('click', (e) => { if (e.target.id === id || e.target.closest('[data-close]')) $(id).classList.add('hidden'); });
});
$('report-print').addEventListener('click', () => window.print());
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $('report-overlay').classList.add('hidden'); });
$('fiche-close').addEventListener('click', () => $('fiche-modal').classList.add('hidden'));
$('fiche-modal').addEventListener('click', (e) => { if (e.target.id === 'fiche-modal') $('fiche-modal').classList.add('hidden'); });
if (auth) wireAccount(); else { $('global-account-button').addEventListener('click', () => {}); }
updateAccountBar();
showPanel('welcome');
