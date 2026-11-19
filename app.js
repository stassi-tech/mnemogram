/* ============================================================
   MNEMOGRAM — programme de l'application
   Jeu 1 : Reconnaissance des natures.
   ============================================================ */
'use strict';

/* Numéro de version affiché à l'écran (bandeau du haut) : à augmenter à chaque modification. */
const APP_VERSION = 'v29';

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
  natures: { titre: 'Reconnaissance des natures de mots 1', type: 'Reconnaissance des natures, niveau 1', rows: BUTTON_ROWS,
    priorite: NATURES.map((n) => n.code), reste: NATURES.map((n) => n.code),
    reponse: (tag) => tag.split('.')[0] },
  natures2: { titre: 'Reconnaissance des natures de mots 2', type: 'Reconnaissance des natures, niveau 2', rows: BUTTON_ROWS_2,
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
  fonctions: { titre: 'Natures et fonctions des mots dans le groupe verbal', type: 'Natures et fonctions (groupe verbal), niveau 3', rows: BUTTON_ROWS,
    reponse: (tag) => tag.split('.')[0], niveau: 3,
    /* les 20 questions se répartissent entre les fonctions (au moins une fois chacune), puis au hasard */
    priorite: ['suj', 'suj', 'suj', 'cod', 'cod', 'cod', 'ccl', 'ccl', 'cct', 'cct', 'ccm', 'ccm', 'mod', 'mod', 'coi', 'cos', 'att', 'ccc'],
    reste: ['suj', 'cod', 'ccl', 'cct', 'ccm', 'coi', 'cos'],
    cle: (m) => m.fn || null, gv: true, nb: 10 },
  /* v18 : jeu 4. Les boutons clignotent, et c'est dans la phrase que l'on clique : le nom, puis son déterminant
     (et la sorte exacte de déterminant, sur les boutons), son adjectif s'il y en a, son complément du nom s'il y en a. */
  gn: { titre: 'Natures et fonctions des mots dans le groupe nominal', type: 'Natures et fonctions (groupe nominal), niveau 4', rows: BUTTON_ROWS_4,
    reponse: (tag) => tag, niveau: 4, nb: 10, gn: true },
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
    html += `<span class="w${cibles.includes(i) ? ' target' : ''}" data-i="${i}">${m.texte}</span>`;
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

function openGame(id) {
  currentGame = GAMES[id];
  $('natures-panel').classList.toggle('game2', id === 'natures2');
  $('natures-panel').classList.toggle('game3', id === 'fonctions' || id === 'gn');
  /* v27 : le jeu 3 marche maintenant comme le jeu 4 (consignes, carrés verts et rouges sous les mots) */
  $('natures-panel').classList.toggle('game4', id === 'gn' || id === 'fonctions');
  $('nat-ready-explanation').innerHTML = id === 'fonctions'
    ? 'Des <strong>consignes</strong> apparaissent à droite, l\'une après l\'autre : <strong>vertes</strong> pour la nature, <strong>rouges</strong> pour la fonction. Trouve d\'abord le <strong>verbe</strong> et sa nature, puis son <strong>sujet</strong>, puis ses <strong>compléments</strong> (COD, COI, COS, attribut, compléments circonstanciels). Tu réponds en appuyant sur le bon mot de la phrase, ou sur les cases de la consigne. Ta réponse se pose sous le mot : dans un <strong>carré vert</strong> pour une nature, dans un <strong>carré rouge</strong> pour une fonction.'
    : id === 'gn' ? 'Cette fois, des <strong>consignes</strong> apparaissent à droite, l\'une après l\'autre : <strong>vertes</strong> pour la nature, <strong>rouges</strong> pour la fonction. Tu réponds en appuyant sur le bon mot de la phrase, ou sur les cases de la consigne. Les petits points « (…) » montrent que la phrase continue : on ne garde que le groupe nominal. Ta réponse se pose sous le mot : dans un <strong>carré vert</strong> si c\'est une nature (nom commun, déterminant, adjectif qualificatif…), dans un <strong>carré rouge</strong> si c\'est une fonction (épithète, complément du nom…).'
    : 'Dans chaque phrase, un mot clignote. Trouve sa <strong>nature</strong> parmi les boutons verts. Si tu te trompes, tu as droit à un deuxième essai.';
  buildNatureButtons();
  $('nat-game-title').textContent = currentGame.titre;
  showPanel('natures');
  $('nat-ready-screen').classList.remove('hidden');
  $('nat-quiz-grid').classList.add('hidden');
  $('nat-progress-label').textContent = `Question 1 / ${nbQuestions()}`;
  $('nat-score-label').textContent = scoreLabel(0);
  $('nat-progress-bar').style.width = '0';
}
/* v15 : les points du jeu 3 vont de 0,5 en 0,5 : on les écrit avec une virgule (14,5). */
const fmtPts = (n) => String(Math.round((n || 0) * 10) / 10).replace('.', ',');
const isG3 = () => currentGame === GAMES.fonctions;
const isG4 = () => currentGame === GAMES.gn;
function scoreLabel(n) {
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
const motsDe = (q) => (q && q.gn ? PARSED_GN[q.phrase] : q && q.gv ? PARSED_GV[q.phrase] : PARSED[q.phrase]);
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
  gnState.cartes.push((isG3() ? CARTES_GV : CARTES)[gnState.etape](q));
  const html = gnState.cartes.map((c, n) => {
    const actif = n === gnState.cartes.length - 1;
    const texteBouton = (code) => (c.labels && c.labels[code]) || (code === 'F.epi' || code === 'F.app' ? capitalize(fonctionPrecise(q, code)) : LIB[code] || (c.petits ? NATURE_BY_CODE[code].court : NATURE_BY_CODE[code].nom));
    const bouton = (code) => `<button type="button" class="nature-button${c.petits ? ' small' : ''}${c.vert ? '' : ' fonction-button'}" data-gn="${code}">${texteBouton(code)}</button>`;
    const choix = c.choix && actif ? (c.petits ? `<div class="nature-row nature-row-7">${c.choix.map(bouton).join('')}</div>` : `<div class="carte-choix carte-choix-${c.choix.length}">${c.choix.map(bouton).join('')}</div>`) : '';
    return `<div class="carte ${c.vert ? 'verte' : 'rouge'}${actif ? ' active' : ' faite'}"><p>${c.texte}</p>${choix}</div>`;
  }).join('');
  $('nat-buttons-variables').innerHTML = html;
  document.querySelectorAll('[data-gn]').forEach((b) => b.addEventListener('click', () => (isG3() ? answerBoutonGV : answerBoutonGN)(b.dataset.gn, b)));
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
function gnVers(etape, meme) { gnState.etape = etape; if (etape === 'fini') (isG3() ? finishQuestionGV : finishQuestionGN)(); else gnEtape(!meme); }
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
const fnPreciseV = (q, code) => (code === 'F.att' ? `attribut du sujet ${motV(q, q.a.suj.i)}` : `${NOM_FN[code]} du verbe ${motV(q, q.a.v)}`);
const CARTES_GV = {
  verbe: () => ({ vert: true, texte: 'Dans cette phrase, appuie sur le verbe.' }),
  verbenat: (q) => ({ vert: true, texte: `Quelle est la nature du verbe ${verbeV(q)} ?`, choix: ['VA', 'VE'] }),
  suj: (q) => ({ vert: false, texte: `Quel mot a la fonction sujet du verbe ${verbeV(q)} ? Appuie dessus.` }),
  objq: (q) => {
    const k = gnState.objet;
    const quoi = { 'F.cod': 'un COD', 'F.coi': 'un COI', 'F.cos': 'un COS', 'F.att': 'un attribut du sujet' }[k];
    /* verbe d'état : c'est le sujet qui est décrit par un attribut (« Le sujet « Paul » est-il décrit par un attribut ? ») */
    if (k === 'F.att') return { vert: false, texte: `Le sujet « ${motV(q, q.a.suj.i)} » est-il décrit par un attribut ?`, choix: ['oui', 'non'] };
    return { vert: false, texte: `Le verbe ${verbeV(q)} a-t-il ${k === 'F.cos' ? 'aussi ' : ''}${quoi} ?`, choix: ['oui', 'non'] };
  },
  obj: (q) => ({ vert: false, texte: gnState.objet === 'F.att' ? `Appuie sur l'attribut du sujet « ${motV(q, q.a.suj.i)} ».` : `Appuie sur le ${NOM_FN[gnState.objet]} du verbe ${verbeV(q)}.` }),
  ccq: (q) => ({ vert: false, texte: `Le verbe ${verbeV(q)} a-t-il ${gnState.ccFaits.size ? 'un autre' : 'un'} complément circonstanciel ?`, choix: ['oui', 'non'] }),
  cc: (q) => ({ vert: false, texte: `Appuie sur le complément circonstanciel du verbe ${verbeV(q)}.` }),
  cctype: (q) => ({ vert: false, texte: `Quelle sorte de complément circonstanciel est « ${motV(q, gnState.comp.i)} » ?`, choix: CC_CODES, labels: { 'F.ccl': 'De lieu', 'F.cct': 'De temps', 'F.ccm': 'De manière', 'F.ccc': 'De cause' } }),
  nat: (q) => {
    const c = gnState.comp, m = motsGV(q)[c.i];
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
  const t = (c) => g(mots.slice(c.debut, c.fin + 1).map((m) => m.texte).join(' ').replace(/' /g, "'").replace(/^./, (x) => (mots[c.debut].tag === 'NP' ? x : x.toLowerCase())));
  const natArt = (i) => { const m = mots[i]; return (NATURE_BY_CODE[m.tag] || NATURE_BY_CODE[natBase(m.tag)]).article; };
  /* « une pomme », dont le mot principal est le nom commun « pomme » ; « aujourd'hui », un adverbe */
  const groupe = (c) => (c.fin > c.debut ? `${t(c)}, dont le mot principal est ${natArt(c.i).replace(/^une? /, 'le ')} ${g(motV(q, c.i))}` : `${t(c)}, ${natArt(c.i)}`);
  const inf = INFINITIFS[motV(q, a.v)] || motV(q, a.v);
  const sujet = `le sujet ${g(motV(q, a.suj.i))}, ${natArt(a.suj.i)}`;
  const POUR = { 'F.ccl': 'où', 'F.cct': 'quand', 'F.ccm': 'comment', 'F.ccc': 'pourquoi' };
  const ccs = (quoi) => (a.cc.length ? [`${quoi} est accompagné${quoi === 'Cette description' ? 'e' : ''} ${a.cc.map((c) => `d'un complément circonstanciel ${NOM_FN[c.fn].replace('CC ', '')}, ${groupe(c)}, qui dit ${POUR[c.fn]} cela se passe`).join(', et ')}.`] : []);
  if (a.etat) {
    const d = [`Tu as bien analysé cette phrase de description. Le verbe ${g(inf)} est un verbe d'état : il ne raconte pas une action, il sert à décrire.`];
    d.push(`Le sujet ${g(motV(q, a.suj.i))}, ${natArt(a.suj.i)}, est ce que l'on décrit.`);
    if (a.att) {
      const adj = mots[a.att.i].tag === 'A';
      d.push(`Il est décrit par un attribut, ${adj ? `l'adjectif qualificatif ${t(a.att)}` : groupe(a.att)} : attribuer, c'est donner ; l'attribut donne une qualité au sujet.`);
    }
    return d.concat(ccs('Cette description')).join(' ');
  }
  const r = [`Tu as bien analysé cette phrase de récit : elle raconte un événement. Le verbe ${g(inf)} est un verbe d'action : il dit ce qui se passe.`];
  r.push(`${capitalize(sujet)}, est l'acteur de l'événement : c'est lui qui fait l'action.`);
  if (a.cod) r.push(`L'action porte sur un objet, ${groupe(a.cod)} : c'est le COD, le complément d'objet direct, relié au verbe sans petit mot.`);
  if (a.cos) r.push(`Elle a aussi un objet second, ${groupe(a.cos)} : c'est le COS, le complément d'objet second, relié au verbe par un petit mot.`);
  /* un pronom COI (« lui ») contient déjà le petit mot : « lui » veut dire « à lui » */
  if (a.coi) r.push(`L'action porte sur un objet, ${groupe(a.coi)} : c'est le COI, le complément d'objet indirect, ${/^Pr\./.test(mots[a.coi.i].tag) ? `car ${g(motV(q, a.coi.i))} veut dire ${g('à ' + motV(q, a.coi.i))}` : 'relié au verbe par un petit mot'}.`);
  if (!a.cod && !a.coi) r.push('Ici, l\'action ne porte sur aucun objet : il n\'y a ni COD ni COI.');
  return r.concat(ccs('Cet événement')).join(' ');
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

function nextQuestion() {
  if (game.index + 1 < game.questions.length) { game.index += 1; showQuestion(); }
  else showResults();
}

function showResults() {
  game.fini = true;
  const n = game.questions.length, s = Math.round(game.score * 10) / 10;
  const content = s >= Math.ceil(n * 0.6);
  const id = content ? pick(['bonaccord', 'virgule']) : pick(['rature', 'gribouille']);
  const pe = playerProfile?.enfant?.photo;
  $('results-character').innerHTML = characterSvg(id) + (pe ? `<img class="results-photo" src="${pe}" alt="" />` : '');
  $('results-title').textContent = isG3() || isG4() ? `${fmtPts(s)} point${s >= 2 ? 's' : ''} sur ${n}` : `${s} bonne${s > 1 ? 's' : ''} réponse${s > 1 ? 's' : ''} sur ${n}`;
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
    niveauOf(r) === 4 ? `Mon score : ${fmtPts(r.score)} point${r.score >= 2 ? 's' : ''} sur ${r.total} (1 point par phrase, partagé entre le nom, le déterminant, l'adjectif et le complément du nom trouvés du premier coup).`
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
async function loadFiche() { await Promise.all(['fiche-nature.html', 'fiche-fonction.html'].map(loadUneFiche)); }
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
      /* v8 : les mots en italique de la fiche (<em>) restent en italique sous les boutons ; la voix lit le texte seul. */
      if (exEl) n.explicationHtml = exEl.innerHTML.replace(/<(?!\/?em>)[^>]*>/g, '').replace(/\s+/g, ' ').trim();
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
  showFiche(enJeu3 ? 'fiche-fonction.html' : 'fiche-nature.html');
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
  if (/niveau [1234]/.test(jeu || '')) return jeu;
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
const niveauOf = (r) => r.niveau || (/niveau 4/.test(r.jeu || '') ? 4 : /niveau 3/.test(r.jeu || '') ? 3 : /niveau 2|natures 2/.test(r.jeu || '') ? 2 : 1);
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
  const niveaux = [1, 2, 3, 4].map((n) => {
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
const NIVEAU_TITRE = { 1: 'Reconnaissance des natures, niveau 1', 2: 'Reconnaissance des natures, niveau 2', 3: 'Natures et fonctions (groupe verbal), niveau 3', 4: 'Natures et fonctions (groupe nominal), niveau 4' };
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
$('nat-sentence').addEventListener('click', (e) => { const w = e.target.closest('.w'); if (w && isG4()) clicMotGN(Number(w.dataset.i), w); else if (w && isG3()) clicMotGV(Number(w.dataset.i), w); });
$('nat-start-button').addEventListener('click', startGame);
$('nat-next-button').addEventListener('click', nextQuestion);
$('nat-listen-button').addEventListener('click', () => {
  const q = game.questions[game.index]; if (!q) return;
  const prev = volumeLevel; if (!volumeLevel) { volumeLevel = 3; }
  speak(phraseTexte(q.gv ? motsGV(q) : motsDe(q)).replace(/\(…\)/g, '').trim(), 'femme', 'phrase');
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
  showPanel('welcome');
}
$('global-back-button').addEventListener('click', goBack);
/* hauteur réelle du bandeau (il peut passer sur deux lignes sur un petit écran) */
function majHauteurBandeau() { const t = document.querySelector('.topbar-banner'); if (t) document.documentElement.style.setProperty('--topbar-h', `${t.offsetHeight}px`); }
window.addEventListener('resize', majHauteurBandeau); majHauteurBandeau();
$('global-home-button').addEventListener('click', () => { if ('speechSynthesis' in window) speechSynthesis.cancel(); showPanel('welcome'); });
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
  showPanel('welcome');
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
