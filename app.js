/* ============================================================
   MNEMOGRAM — programme de l'application
   Jeu 1 : Reconnaissance des natures.
   ============================================================ */
'use strict';

/* Numéro de version affiché à l'écran (bandeau du haut) : à augmenter à chaque modification. */
const APP_VERSION = 'v47';

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
/* v38 : l'accueil a trois parties (les mots, les temps et les modes, la phrase) ; chacune a sa page d'exercices */
let partieAccueil = '';
function montrePartie(p) {
  partieAccueil = p || '';
  $('home-parties').classList.toggle('hidden', !!partieAccueil);
  ['mots', 'temps', 'phrase'].forEach((k) => $(`home-${k}`).classList.toggle('hidden', partieAccueil !== k));
  window.scrollTo(0, partieAccueil ? $('home-mots').parentElement.offsetTop - 80 : 0);
}
document.querySelectorAll('[data-partie]').forEach((b) => b.addEventListener('click', () => montrePartie(b.dataset.partie)));
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
  if (currentGame.tf) { marqueTexte(texteChoisi); return [{ tf: true, t: texteChoisi }]; }
  if (currentGame.tm) return [{ tm: true, t: currentGame.texte || 0 }];
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
const cleTextes = () => `mnemogram-textes-${currentGame === GAMES.libre ? 'libre' : currentGame.tf ? currentGame.tf : 'tableau'}`;
/* v47 : la liste des textes au choix : les tableaux (exercices 5 et 6 des mots) ou les textes à transformer */
const listeTextes = () => (currentGame.tab ? TABLEAUX : currentGame.tf ? TRANSFOS[currentGame.tf] : null);
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
    box.innerHTML = `<p class="texte-titre">Choisis ton texte : le <strong>texte n° ${texteChoisi + 1}</strong>${L[texteChoisi].titre ? ` « ${esc(L[texteChoisi].titre)} »` : ''} (${NIV(texteChoisi)}) t'attend. Les textes déjà faits sont cochés.</p><div class="texte-grille">${groupes}</div>`;
    box.querySelectorAll('[data-texte]').forEach((b) => b.addEventListener('click', () => { texteChoisi = Number(b.dataset.texte); dessine(); }));
  };
  box.classList.remove('hidden');
  dessine();
}
function openGame(id) {
  currentGame = GAMES[id];
  $('natures-panel').classList.toggle('game2', id === 'natures2');
  $('natures-panel').classList.toggle('game3', id === 'fonctions' || id === 'gn' || id === 'tableau' || id === 'libre');
  /* v27 : le jeu 3 marche maintenant comme le jeu 4 (consignes, carrés verts et rouges sous les mots) */
  $('natures-panel').classList.toggle('game4', id === 'gn' || id === 'fonctions' || id === 'tableau' || id === 'libre');
  $('natures-panel').classList.toggle('game5', id === 'tableau' || id === 'libre');
  ['game3', 'game4'].forEach((c) => { if (GAMES[id].tm || GAMES[id].tf) $('natures-panel').classList.add(c); });
  $('natures-panel').classList.toggle('game7', !!(GAMES[id].tm || GAMES[id].tf));
  $('natures-panel').classList.toggle('game7v', !!GAMES[id].valeurs);
  $('nat-ready-explanation').innerHTML = id === 'temps5'
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
  $('nat-game-title').textContent = currentGame.titre;
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
  /* v7 : on coupe la voix (bulle + explication) dès qu'on passe au mot suivant, pour qu'elle ne déborde pas. */
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (isG4()) { showQuestionGN(); return; }
  if (isG3()) { showQuestionGV(); return; }
  if (isG5()) { showQuestionTab(); return; }
  if (isG6()) { showQuestionLibre(); return; }
  if (isT1()) { (currentGame.tf ? showQuestionTF : showQuestionTM)(); return; }
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
  const mots = [], formes = [];
  src.replace(/\{([^}|]+)\|([^}|]+)\|([^}|]+)(?:\|([^}|]+)\|([^}|]+))?\}|([^\s{]+)/g, (m, f, tps, mode, vt, vm, w) => {
    if (f) {
      mots.push({ t: f, k: formes.length });
      const x = { t: f, tps: `TPS.${tps}`, mode: `MODE.${mode}` };
      if (vt) {
        x.vt = vt.split('/').map((v) => `VT.${v}`);
        /* v46 : « perte » : un conditionnel employé comme temps (futur dans le passé) a perdu sa valeur de mode ; on attend « réalité » */
        if (vm === 'perte') { x.vm = ['VM.reel']; x.vmTexte = 'qui a perdu ici sa valeur de mode : réalité'; } else x.vm = vm.split('/').map((v) => `VM.${v}`);
      }
      formes.push(x);
    } else mots.push({ t: w });
    return m;
  });
  return { mots, formes };
}
const tm = { rep: {}, sel: null, texte: null, phase: 1 };
const isT1 = () => !!(currentGame.tm || currentGame.tf);   /* v40 : tous les exercices des temps et des modes */
/* les formes : 0…19 dans le premier cadre ; 100, 101… pour les formes modernes du second cadre */
const TM_T = () => TEXTES_TM[game.questions[game.index].t];
const formeTM = (i) => (i >= 100 ? TM_T().suite[i - 100] : tm.texte.formes[i]);
const indicesPhase = () => (tm.phase === 1 ? tm.texte.formes.map((f, k) => k) : TM_T().suite.map((f, n) => 100 + n));
const CHAMPS_TM = () => (currentGame.valeurs ? ['tps', 'mode', 'vt', 'vm'] : ['tps', 'mode']);
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
}
function majScoreTM() {
  $('nat-score-label').textContent = scoreLabel(game.score);
  $('nat-progress-bar').style.width = `${(formesFaites() / nbFormesTM()) * 100}%`;
}
function panneauTM() {
  const i = tm.sel, idx = indicesPhase(), N = idx.length, faites = idx.filter(estFaite).length;
  $('nat-instruction').textContent = tm.phase === 1 ? 'Le temps et le mode de chaque forme verbale' : 'Les formes du français contemporain';
  if (i === null) {
    $('nat-buttons-variables').innerHTML = tm.phase === 1
      ? `<div class="carte verte active libre"><p>Dans ce texte, ${N} formes verbales sont soulignées. Appuie sur l'une d'elles, dans l'ordre que tu veux : tu donneras son <strong>temps</strong> (étiquette verte) et son <strong>mode</strong> (étiquette rouge).</p><p class="sous">${faites} forme${faites > 1 ? 's' : ''} sur ${N} déjà faite${faites > 1 ? 's' : ''}.</p></div>`
      : `<div class="carte verte active libre"><p>Bravo, le premier texte est fini ! Voici <strong>le même texte en français contemporain</strong>. Les formes qui n'ont pas changé gardent leurs étiquettes. ${N} formes ont changé : la forme du français classique est barrée en petit au-dessus. Appuie sur chacune et donne son <strong>temps</strong> et son <strong>mode</strong>${currentGame.valeurs ? ', puis leurs <strong>valeurs</strong>' : ''}.</p><p class="sous">${faites} forme${faites > 1 ? 's' : ''} sur ${N} déjà faite${faites > 1 ? 's' : ''}.</p></div>`;
    return;
  }
  const f = formeTM(i), r = tm.rep[i] || (tm.rep[i] = {});
  const b = (code, rouge, champ) => {
    const rep = r[champ], fait = !!rep, cls = !fait ? '' : accepte(f, champ, code) && (code === rep || !accepte(f, champ, rep)) ? ' correct' : code === rep ? ' wrong' : ' faded';
    return `<button type="button" class="nature-button${rouge ? ' fonction-button' : ''}${cls}" data-tm="${code}" data-champ="${champ}"${fait ? ' disabled' : ''}>${NOM_TM(code)}</button>`;
  };
  const carte = (champ, rouge, question, cols) => `<div class="carte ${rouge ? 'rouge' : 'verte'} active libre${champ.startsWith('v') ? ' carte-valeur' : ''}"><p>${question}</p><div class="carte-choix carte-choix-${cols}">${LISTE_TM[champ].map((x) => b(x.code, rouge, champ)).join('')}</div></div>`;
  let html = carte('tps', false, `« ${esc(f.t)} » : quel est son <strong>temps</strong> ?`, 3) + carte('mode', true, 'Quel est son <strong>mode</strong> ?', 3);
  /* exercice 3 : les valeurs, une fois le temps et le mode donnés */
  if (currentGame.valeurs && r.tps && r.mode) {
    html += carte('vt', false, `Pourquoi ce temps ? Quelle est la <strong>valeur</strong> ${duTM(f.tps)} ici ?`, 2);
    html += carte('vm', true, `Pourquoi ce mode ? Quelle est la <strong>valeur</strong> ${duTM(f.mode)} ici ?`, 2);
  }
  if (estFaite(i)) html += `<p class="sous tm-bilan">« ${esc(f.t)} » : temps ${NOM_TM(f.tps).toLowerCase()}, mode ${NOM_TM(f.mode).toLowerCase()}.${f.vt ? ` Valeur du temps : ${etiquetteTM(bonneTM(f, 'vt'))} ; valeur du mode : ${etiquetteTM(bonneTM(f, 'vm'))}.` : ''}${f.ancien ? ` En français classique, on écrivait « ${esc(f.ancien)} » : ${f.pourquoi}` : ''}</p>`;
  $('nat-buttons-variables').innerHTML = nbspFr(html);
  document.querySelectorAll('[data-tm]').forEach((btn) => btn.addEventListener('click', () => repondTM(btn.dataset.tm, btn.dataset.champ)));
}
function clicFormeTM(i) {
  if (game.fini || i === tm.sel || !indicesPhase().includes(i)) return;
  const avant = tm.sel; tm.sel = i;
  if (avant !== null) wordEl(avant)?.classList.remove('choisie');
  wordEl(i)?.classList.add('choisie');
  panneauTM();
}
function repondTM(code, champ) {
  const i = tm.sel; if (i === null || game.fini) return;
  const f = formeTM(i), r = tm.rep[i] || (tm.rep[i] = {});
  champ = champ || (code.startsWith('TPS.') ? 'tps' : 'mode');
  if (r[champ]) return;
  r[champ] = code;
  const bon = bonneTM(f, champ), juste = accepte(f, champ, code);
  if (juste) game.score = Math.round((game.score + 0.5) * 10) / 10;
  else game.erreurs.push({ mot: f.t, bonne: etiquetteTM(bon), choisie: etiquetteTM(code), phrase: `texte « ${TM_T().titre} »` });
  const pn = game.parNature[bon] || (game.parNature[bon] = { c: 0, p: 0 }); pn.p += 1; if (juste) pn.c += 1;
  poseLabelsTM(i);
  majScoreTM();
  panneauTM();
  if (estFaite(i)) {
    wordEl(i).classList.add('remplie');
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
}
function finTM() {
  const T = TM_T();
  wordEl(tm.sel)?.classList.remove('choisie'); tm.sel = null;
  $('nat-buttons-variables').innerHTML = '';
  $('nat-instruction').textContent = 'Toutes les formes verbales sont faites !';
  const modes = [...new Set(tm.texte.formes.map((f) => NOM_TM(f.mode).toLowerCase()))];
  const pres = tm.texte.formes.filter((f) => f.tps === 'TPS.pres' && f.mode === 'MODE.ind').length, presTous = tm.texte.formes.filter((f) => f.tps === 'TPS.pres').length;
  const total = currentGame.total;
  const debut = `Tu as ${fmtPts(game.score)} point${game.score >= 2 ? 's' : ''} sur ${total}. `;
  const fin = ' Une étiquette marquée ✗ montre la bonne réponse, là où tu t\'es trompé.';
  $('nat-correction-details').innerHTML = nbspFr(T.bilan
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
const TRANSFOS = {
  /* exercice 5 : du passé au présent, du plus facile au plus difficile */
  passe2pres: [
    { titre: 'Le jardin', texte: "{Ce jour-là>Aujourd'hui}, il {faisait>fait} chaud. Les enfants {jouaient>jouent} dans le jardin et leur chien {courait>court} après le ballon. Il y {avait>a} des fleurs partout. Leur mère les {regardait>regarde} depuis la fenêtre." },
    { titre: 'Le bus', texte: "{Ce matin-là>Ce matin}, Paul {attendait>attend} le bus sous la pluie. Il {avait>a} froid et il {regardait>regarde} sa montre. Soudain, le bus {arriva>arrive}. Paul {monta>monte} et {s'assit>s'assoit;s'assied} près de la fenêtre." },
    { titre: 'Pompon', texte: "{Ce jour-là>Aujourd'hui}, Léa {était>est} heureuse : {la veille>hier}, elle {avait reçu>a reçu} un petit chat. Elle le {caressait>caresse} doucement quand sa sœur {entra>entre} dans la chambre. « Il s'appelle Pompon ! » {dit>dit} Léa." },
    { titre: 'Les valises', texte: "{Ce soir-là>Ce soir}, nous {préparions>préparons} nos valises car nous {partions>partons} en vacances {le lendemain>demain}. Papa {pensait>pense} que nous {arriverions>arriverons} à la mer avant midi. Maman {vérifiait>vérifie} les billets et mon petit frère {dormait>dort} déjà." },
    { titre: 'Le grand-père', texte: "{Cette année-là>Cette année}, mon grand-père {fêta>fête} ses quatre-vingts ans. Toute la famille {était>est} réunie dans sa maison. {L'année précédente>L'année dernière}, il {avait été>a été} malade, mais il {allait>va} beaucoup mieux. Il nous {raconta>raconte} des souvenirs de son enfance et nous {riions>rions} tous. Il {promit>promet} qu'il {viendrait>viendra} nous voir {l'année suivante>l'année prochaine}." },
    { titre: 'Bonbons', texte: "{Ce jour-là>Aujourd'hui} le temps {était>est} pluvieux. D'habitude nous {allions>allons} nous promener, mais là nous {paressions>paressons} dans le salon devant la télé. Soudain mon frère s'{écria>écrie} : « J'ai mangé mes derniers bonbons ! » Je lui {répondis>réponds} que nous {irions>irons} en chercher quand il ne {pleuvrait>pleuvra} plus, et que moi, je n'{avais>ai} pas fini mon paquet qui {était>est} encore à moitié plein." },
    { titre: 'Le poème', texte: "{Ce matin-là>Ce matin}, la maîtresse {voulait>veut} que chaque élève {lût>lise} un poème. Julien {tremblait>tremble} : il {craignait>craint} qu'on ne se {moquât>moque} de lui. Il {avait appris>a appris} son texte {la veille>hier}, mais il {oubliait>oublie} tout. Finalement, il {récita>récite} sans erreur et tout le monde l'{applaudit>applaudit}." },
    { titre: 'Champignons', texte: "{Ce jour-là>Aujourd'hui} il {faisait>fait} beau et nous nous {promenions>promenons} dans la forêt où nous {cherchions>cherchons} souvent des champignons. Nous {pouvions>pouvons} y passer des heures, marchant, plaisantant, sans jamais nous lasser. {La veille>Hier} nous en {avions trouvé>avons trouvé} trois kilos et nous {aurions voulu>voudrions} que la cueillette {fût>soit} aussi bonne {pendant cette journée>aujourd'hui}. Soudain ma sœur {cria>crie} : « Venez ! » Alors nous {courûmes>courons} vers elle en espérant que nous {découvririons>découvrirons} un splendide bolet ! Mais, hélas, ce {n'étaient>ne sont} que de petits champignons et je {craignais>crains} bien qu'ils {fussent>soient} vénéneux. Nous {repartîmes>repartons} vers d'autres découvertes." },
    { titre: 'Le navigateur', texte: "{Ce jour-là>Aujourd'hui}, le navigateur {quittait>quitte} le port. Dès qu'il {eut hissé>a hissé} les voiles, le vent {se leva>se lève}. Il {savait>sait} qu'il {aurait traversé>aura traversé} l'océan avant l'hiver. {Deux jours plus tard>Dans deux jours}, il {atteindrait>atteindra} les premières îles. Il {regrettait>regrette} seulement que sa fille ne {pût>puisse} pas l'accompagner." },
    { titre: 'Le théâtre', texte: "{Ce soir-là>Ce soir}, au théâtre, la salle {était>est} pleine. Les acteurs {avaient répété>ont répété} pendant des semaines et ils {espéraient>espèrent} que le public {serait>sera} conquis. Quand le rideau {se leva>se lève}, un silence {s'installa>s'installe}. « Je n'ai jamais eu aussi peur ! » {murmura>murmure} la jeune actrice. Elle {craignait>craint} d'oublier son texte, mais elle {joua>joue} merveilleusement. {Le lendemain>Demain}, les journaux {parleraient>parleront} d'elle." },
  ],
  /* exercice 6 : du présent au passé : {présent>classique//contemporain} */
  pres2passe: [
    { titre: 'La pluie', texte: "{Aujourd'hui>Ce jour-là}, il {pleut>pleuvait}. Les enfants {restent>restaient} à la maison. Ils {dessinent>dessinaient} et leur chat {dort>dormait} sur le canapé. Leur père {lit>lisait} le journal." },
    { titre: 'Le petit chien', texte: "{Ce matin>Ce matin-là}, Marie {marche>marchait} vers l'école. Il {fait>faisait} froid et elle {porte>portait} son bonnet rouge. Soudain, elle {voit>vit//a vu} un petit chien perdu. Elle {s'approche>s'approcha//s'est approchée} et le {caresse>caressa//a caressé}." },
    { titre: 'La médaille', texte: "{Aujourd'hui>Ce jour-là}, Tom {est>était} fier : {hier>la veille}, il {a gagné>avait gagné} la course de l'école. Il {montre>montrait} sa médaille à tout le monde. Tout à coup, son grand frère {arrive>arriva//est arrivé} et le {félicite>félicita//a félicité}." },
    { titre: 'La montagne', texte: "{Ce soir>Ce soir-là}, nous {sommes>étions} impatients car nous {partons>partions} à la montagne {demain>le lendemain}. Papa {dit>dit//a dit} que nous {verrons>verrions//allions voir} de la neige. Ma sœur {range>rangeait} ses gants et moi, je {cherche>cherchais} mon bonnet." },
    { titre: 'Bonbons', texte: "{Aujourd'hui>Ce jour-là} le temps {est>était} pluvieux. D'habitude nous {allons>allions} nous promener, mais là nous {paressons>paressions} dans le salon devant la télé. Soudain mon frère s'{écrie>écria//est écrié} : « J'ai mangé mes derniers bonbons ! » Je lui {réponds>répondis//ai répondu} que nous {irons>irions//allions aller} en chercher quand il ne {pleuvra>pleuvrait} plus, et que moi, je n'{ai>avais} pas fini mon paquet qui {est>était} encore à moitié plein." },
    { titre: 'TGV', texte: "Tous les ans, je {vais>allais} passer Noël en famille en prenant le TGV. {Aujourd'hui>Ce jour-là}, j'{attends>attendais} mon train pour Marseille. Il y {a>avait} beaucoup de monde sur le quai {cette année>cette année-là} mais soudain on {annonce>annonça//a annoncé} que le TGV {aura>aurait//allait avoir} trois heures de retard, car il {a été bloqué>avait été bloqué} par la neige. Les voyageurs {voudraient>auraient voulu} que cela {change>changeât//change}, certains {crient>crièrent//ont crié} : « Informez-nous au moins ! »" },
    { titre: 'Autofiction', texte: "Tous les ans, le professeur {donne>donnait} un sujet d'autofiction. Les élèves de la classe {sont>étaient} contents {cette année>cette année-là} : {hier>la veille} ils {ont rempli>avaient rempli} une fiche préparatoire. {Aujourd'hui>Ce jour-là}, ils {écrivent>écrivaient} leur rédaction mais soudain une élève se {met>mit//est mise} à pleurer. « Que s'est-il passé ? Calme-toi ! » Mais l'élève {craint>craignait} que la rédaction {soit>fût//soit} trop difficile. Dans sa tête, elle {n'y arrivera jamais>n'y arriverait jamais//n'allait jamais y arriver} !" },
    { titre: 'Champignons', texte: "{Aujourd'hui>Ce jour-là} il {fait>faisait} beau et nous nous {promenons>promenions} dans la forêt où nous {cherchons>cherchions} souvent des champignons. Nous {pouvons>pouvions} y passer des heures, marchant, plaisantant, sans jamais nous lasser. {Hier>La veille} nous en {avons trouvé>avions trouvé} trois kilos et nous {voudrions>aurions voulu} que la cueillette {soit>fût//soit} aussi bonne {aujourd'hui>pendant cette journée;ce jour-là}. Soudain ma sœur {crie>cria//a crié} : « Venez ! » Alors nous {courons>courûmes//avons couru} vers elle en espérant que nous {découvrirons>découvririons//allions découvrir} un splendide bolet ! Mais, hélas, ce {ne sont>n'étaient} que de petits champignons et je {crains>craignais} bien qu'ils {soient>fussent//soient} vénéneux. Nous {repartons>repartîmes//sommes repartis} vers d'autres découvertes." },
    { titre: 'Tristesse', texte: "{Aujourd'hui>Ce jour-là} mon frère {est>était} triste car son meilleur ami {est parti>était parti} {hier>la veille} et il {ne reviendra>ne reviendrait//n'allait revenir} que {dans un an>un an plus tard}. Mon frère {dort>dormait} dans sa chambre : il se {lève>levait} tous les jours à midi. Tout à coup ma mère me {dit>dit//a dit} : « Va réveiller ton frère pour que nous déjeunions ensemble ». {Je voudrais>J'aurais voulu} lui faire plaisir en lui obéissant : tous les enfants {veulent>veulent} faire plaisir à leurs parents." },
    { titre: 'Le feu d\'artifice', texte: "{Ce soir>Ce soir-là}, la ville {est>était} en fête. Les habitants {attendent>attendaient} le feu d'artifice qu'on {tirera>tirerait//allait tirer} au-dessus du fleuve. Le maire {a promis>avait promis} qu'il {sera>serait//allait être} magnifique. Quand la première fusée {éclate>éclata//a éclaté}, les enfants {crient>crièrent//ont crié} de joie. Il {faut>fallait} que la fête {dure>durât//dure} jusqu'à minuit ! {Demain>Le lendemain}, tout le monde {en parlera>en parlerait//allait en parler}." },
  ],
};
const tf = { elts: [], rep: {}, sel: null, registre: null };
const isTF = () => !!currentGame.tf;
const TF_T = () => TRANSFOS[currentGame.tf][game.questions[game.index].t];
/* comparer deux écritures : sans majuscules, apostrophes et espaces unifiés ; « sans accents » à part */
const normTF = (x) => String(x || '').toLowerCase().replace(/[’`]/g, '\'').replace(/\s+/g, ' ').replace(/^[\s«»"]+|[\s.,;:!?«»"]+$/g, '').trim();
const sansAccTF = (x) => x.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const attendusTF = (e) => (tf.registre === 'mod' ? e.mod : e.cls);
function decoupeTF(src) {
  const items = [], elts = []; let avant = '';
  src.replace(/\{([^>}]+)>([^}]+)\}|([^\s{]+)/g, (m, a, b, w) => {
    if (w !== undefined) {
      if (/^[.,;:!?»]$/.test(w) && items.length) { items[items.length - 1].suf += (/^[;:!?»]$/.test(w) ? ' ' : '') + w; return m; }
      if (w === '«') { avant += '« '; return m; }
      if (/['’]$/.test(w)) { avant += w; return m; }
      items.push({ t: w, pre: avant, suf: '' });
    } else {
      const [c, mo] = b.split('//');
      elts.push({ src: a, cls: c.split(';').map((x) => x.trim()), mod: (mo || c).split(';').map((x) => x.trim()) });
      items.push({ t: a, k: elts.length - 1, pre: avant, suf: '' });
    }
    avant = ''; return m;
  });
  return { items, elts };
}
function showQuestionTF() {
  const T = TF_T(), d = decoupeTF(T.texte);
  Object.assign(tf, { elts: d.elts, rep: {}, sel: null, registre: currentGame.tf === 'pres2passe' ? null : 'cls' });
  currentGame.total = d.elts.length;
  $('nat-sentence').innerHTML = `<div class="tm-cadre"><h3 class="tm-titre">Texte n° ${game.questions[game.index].t + 1} : « ${esc(T.titre)} »</h3><div class="tm-texte">${d.items.map((m) => (m.k !== undefined
    ? `<span class="w forme tf" data-i="${m.k}"><span class="ancien"></span><span class="tx">${m.pre}<span class="f">${esc(m.t)}</span>${m.suf}</span></span>`
    : `<span class="w mot"><span class="tx">${m.pre}${esc(m.t)}${m.suf}</span></span>`)).join('')}</div></div>`;
  $('nat-character-stage').innerHTML = '';
  $('nat-correction').classList.add('hidden');
  $('nat-verdict-square').className = 'verdict-square';
  $('nat-fn-column').classList.add('hidden'); $('nat-nature-column').classList.remove('hidden');
  $('nat-buttons-invariables').innerHTML = '';
  $('nat-progress-label').textContent = `Texte n° ${game.questions[game.index].t + 1} (${NIVEAU_TEXTE(game.questions[game.index].t, TRANSFOS[currentGame.tf].length)})`;
  game.score = 0;
  majScoreTF(); panneauTF();
}
const tfFaits = () => Object.keys(tf.rep).length;
function majScoreTF() {
  $('nat-score-label').textContent = scoreLabel(game.score);
  $('nat-progress-bar').style.width = `${(tfFaits() / tf.elts.length) * 100}%`;
}
const versTF = () => (currentGame.tf === 'passe2pres' ? 'au système du présent' : tf.registre === 'mod' ? 'au passé, en français contemporain' : 'au passé, en français classique');
function panneauTF() {
  const N = tf.elts.length;
  $('nat-instruction').textContent = currentGame.tf === 'passe2pres' ? 'Réécris le texte au système du présent' : 'Réécris le texte au système du passé';
  if (!tf.registre) {
    $('nat-buttons-variables').innerHTML = `<div class="carte verte active libre"><p>Ce texte est au <strong>système du présent</strong>. Tu vas le réécrire <strong>au passé</strong>, comme un souvenir. Choisis d'abord ta langue :</p><div class="carte-choix carte-choix-2"><button type="button" class="nature-button" data-reg="cls">En français classique<br><small>(passé simple, subjonctif imparfait…)</small></button><button type="button" class="nature-button" data-reg="mod">En français contemporain<br><small>(passé composé, « aller » + infinitif…)</small></button></div></div>`;
    document.querySelectorAll('[data-reg]').forEach((b) => b.addEventListener('click', () => { tf.registre = b.dataset.reg; panneauTF(); }));
    return;
  }
  if (tf.sel === null) {
    $('nat-buttons-variables').innerHTML = `<div class="carte verte active libre"><p>${N} mots ou groupes de mots sont soulignés : ils doivent changer pour que le texte soit ${versTF()}. Ce sont des <strong>formes verbales</strong> et des <strong>indicateurs de temps</strong> (<em>${currentGame.tf === 'passe2pres' ? 'ce jour-là → aujourd\'hui' : 'aujourd\'hui → ce jour-là'}</em>). Appuie sur l'un d'eux et écris ce qu'il devient.</p><p class="sous">${tfFaits()} sur ${N} déjà fait${tfFaits() > 1 ? 's' : ''}.</p></div>`;
    return;
  }
  const e = tf.elts[tf.sel], r = tf.rep[tf.sel];
  let html = `<div class="carte verte active libre"><p>« <strong>${esc(e.src)}</strong> » : réécris-le ${versTF()}.</p>`;
  if (!r) html += `<form class="tf-form" autocomplete="off"><input type="text" class="tf-input" id="tf-input" autocapitalize="off" spellcheck="false" placeholder="écris ici…"><button type="submit" class="primary-button tf-ok">Valider</button></form>`;
  else html += `<p class="tf-retour ${r.pts === 1 ? 'juste' : r.pts ? 'moitie' : 'faux'}">${r.pts === 1 ? '✔ Bravo !' : r.pts ? `Presque : attention aux accents. On écrit « ${esc(r.bon)} ».` : `Non : tu as écrit « ${esc(r.ecrit)} ». On écrit « ${esc(r.bon)} ».`}</p>`;
  html += '</div>';
  $('nat-buttons-variables').innerHTML = nbspFr(html);
  const f = document.querySelector('.tf-form');
  if (f) { f.addEventListener('submit', (ev) => { ev.preventDefault(); repondTF($('tf-input').value); }); setTimeout(() => $('tf-input')?.focus(), 50); }
}
function clicTF(i) {
  if (game.fini || !tf.registre || i === tf.sel) return;
  const avant = tf.sel; tf.sel = i;
  if (avant !== null) wordEl(avant)?.classList.remove('choisie');
  wordEl(i)?.classList.add('choisie');
  panneauTF();
}
function repondTF(ecrit) {
  const i = tf.sel; if (i === null || game.fini || tf.rep[i] || !normTF(ecrit)) return;
  const e = tf.elts[i], ok = attendusTF(e), n = normTF(ecrit);
  let pts = 0, bon = ok[0];
  const exact = ok.find((x) => normTF(x) === n), accents = ok.find((x) => sansAccTF(normTF(x)) === sansAccTF(n));
  if (exact) { pts = 1; bon = exact; } else if (accents) { pts = 0.5; bon = accents; }
  tf.rep[i] = { ecrit: ecrit.trim(), pts, bon };
  game.score = Math.round((game.score + pts) * 10) / 10;
  if (pts < 1) game.erreurs.push({ mot: e.src, bonne: `« ${bon} »`, choisie: `« ${ecrit.trim()} »`, phrase: `texte « ${TF_T().titre} »` });
  /* dans le texte : l'ancienne forme barrée en petit au-dessus, la nouvelle à sa place */
  const el = wordEl(i);
  el.querySelector('.ancien').textContent = e.src;
  let nouveau = pts === 1 ? ecrit.trim() : bon;
  if (/^[A-ZÀ-Ý]/.test(e.src)) nouveau = nouveau.charAt(0).toUpperCase() + nouveau.slice(1);
  el.querySelector('.f').textContent = nouveau;
  el.classList.add('remplie', 'trou');
  if (pts < 1) el.classList.add('forme-corrigee');
  majScoreTF(); panneauTF();
  if (tfFaits() === tf.elts.length) { setTimeout(finTF, pts === 1 ? 1200 : 2600); return; }
  setTimeout(() => {
    if (tf.sel !== i) return;
    const N = tf.elts.length;
    for (let d = 1; d <= N; d++) { const k = (i + d) % N; if (!tf.rep[k]) { clicTF(k); return; } }
  }, pts === 1 ? 1100 : 2600);
}
function finTF() {
  wordEl(tf.sel)?.classList.remove('choisie'); tf.sel = null;
  $('nat-buttons-variables').innerHTML = '';
  $('nat-instruction').textContent = 'Le texte est réécrit !';
  const total = tf.elts.length;
  const regles = currentGame.tf === 'passe2pres'
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
    niveauOf(r) >= 11 ? `Mon score : ${fmtPts(r.score)} point${r.score >= 2 ? 's' : ''} sur ${r.total} (1 point par changement réussi : formes verbales et indicateurs de temps).`
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
async function loadFiche() { await Promise.all(['fiche-nature.html', 'fiche-fonction.html', 'fiche-temps.html'].map(loadUneFiche)); }
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
  showFiche(enTemps ? 'fiche-temps.html' : enJeu3 ? 'fiche-fonction.html' : 'fiche-nature.html');
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
  if (/niveau (1[0-2]|[1-9])/.test(jeu || '')) return jeu;
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
const niveauOf = (r) => r.niveau || (/niveau 12/.test(r.jeu || '') ? 12 : /niveau 11/.test(r.jeu || '') ? 11 : /niveau 10/.test(r.jeu || '') ? 10 : /niveau 9/.test(r.jeu || '') ? 9 : /niveau 8/.test(r.jeu || '') ? 8 : /niveau 7/.test(r.jeu || '') ? 7 : /niveau 6/.test(r.jeu || '') ? 6 : /niveau 5/.test(r.jeu || '') ? 5 : /niveau 4/.test(r.jeu || '') ? 4 : /niveau 3/.test(r.jeu || '') ? 3 : /niveau 2|natures 2/.test(r.jeu || '') ? 2 : 1);
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
  const niveaux = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => {
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
const NIVEAU_TITRE = { 1: 'Exercice 1 : reconnaissance des natures de mots, niveau 1', 2: 'Exercice 2 : reconnaissance des natures de mots, niveau 2', 3: 'Exercice 3 : reconnaissance des natures et fonctions des mots dans le groupe verbal', 4: 'Exercice 4 : reconnaissance des natures et fonctions des mots dans le groupe nominal', 5: 'Exercice 5 : bilan, le tableau des 20 cases avec guide', 6: 'Exercice 6 : bilan, le tableau des 20 cases sans guide', 7: 'Temps et modes, exercice 1 : un texte au système du présent', 8: 'Temps et modes, exercice 2 : un texte au système du passé', 9: 'Temps et modes, exercice 3 : analyse des temps et des modes personnels (système du présent)', 10: 'Temps et modes, exercice 4 : analyse des temps et des modes personnels (système du passé)', 11: 'Temps et modes, exercice 5 : du passé au présent', 12: 'Temps et modes, exercice 6 : du présent au passé' };
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
$('global-version-badge').textContent = APP_VERSION;
initMosaic();
buildNatureButtons();
loadFiche();

$('open-natures').addEventListener('click', () => openGame('natures'));
$('open-natures2').addEventListener('click', () => openGame('natures2'));
$('open-fonctions').addEventListener('click', () => openGame('fonctions'));
$('open-gn').addEventListener('click', () => openGame('gn'));
$('open-tableau').addEventListener('click', () => openGame('tableau'));
$('open-libre').addEventListener('click', () => openGame('libre'));
$('open-temps1').addEventListener('click', () => openGame('temps1'));
$('open-temps2').addEventListener('click', () => openGame('temps2'));
$('open-temps3').addEventListener('click', () => openGame('temps3'));
$('open-temps4').addEventListener('click', () => openGame('temps4'));
$('open-temps5').addEventListener('click', () => openGame('temps5'));
$('open-temps6').addEventListener('click', () => openGame('temps6'));
$('nat-sentence').addEventListener('click', (e) => { const w = e.target.closest('.w'); if (w && isG4()) clicMotGN(Number(w.dataset.i), w); else if (w && isG3()) clicMotGV(Number(w.dataset.i), w); else if (w && isG5()) clicMotTab(Number(w.dataset.i), w); else if (w && isG6()) clicCaseLibre(Number(w.dataset.i)); else if (w && isT1() && w.dataset.i !== undefined) (currentGame.tf ? clicTF : clicFormeTM)(Number(w.dataset.i)); });
$('nat-start-button').addEventListener('click', startGame);
$('nat-next-button').addEventListener('click', nextQuestion);
$('nat-listen-button').addEventListener('click', () => {
  const q = game.questions[game.index]; if (!q) return;
  const prev = volumeLevel; if (!volumeLevel) { volumeLevel = 3; }
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
