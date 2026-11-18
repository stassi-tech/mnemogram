/* ============================================================
   MNEMOGRAM — programme de l'application
   Jeu 1 : Reconnaissance des natures.
   ============================================================ */
'use strict';

/* Numéro de version affiché à l'écran (bandeau du haut) : à augmenter à chaque modification. */
const APP_VERSION = 'v14';

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
const NATURE_BY_CODE = Object.fromEntries([...NATURES, ...NATURES_DETAIL].map((n) => [n.code, n]));
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
};
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
  'Le/D.def chat/N de/P mon/D.pos voisin/N dort/VA tranquillement/Av sur/P la/D.def terrasse/N .',
  'La/D.def petite/A fille/N mange/VA une/D.ind pomme/N rouge/A .',
  'Mon/D.pos frère/N et/CC ma/D.pos sœur/N jouent/VA dans/P le/D.def jardin/N .',
  'Oh/I ! Le/D.def gâteau/N est/VE très/Av bon/A .',
  'Quand/CS il/Pr.per pleut/VA , nous/Pr.per jouons/VA à/P la/D.def maison/N .',
  'Le/D.def chien/N aboie/VA car/CC il/Pr.per entend/VA un/D.ind bruit/N .',
  'Aïe/I ! Cette/D.dem porte/N est/VE lourde/A .',
  'Le/D.def soleil/N brille/VA dans/P le/D.def ciel/N bleu/A .',
  'Mon/D.pos papa/N prépare/VA une/D.ind soupe/N chaude/A .',
  'Les/D.def oiseaux/N chantent/VA joyeusement/Av le/D.def matin/N .',
  'Tu/Pr.per lis/VA un/D.ind livre/N ou/CC tu/Pr.per dessines/VA ?',
  'Elle/Pr.per porte/VA une/D.ind jolie/A robe/N verte/A .',
  'Le/D.def bébé/N pleure/VA car/CC il/Pr.per veut/VA son/D.pos biberon/N .',
  'Nous/Pr.per allons/VA à/P l\'/D.def école/N avec/P nos/D.pos amis/N .',
  'Bravo/I ! Tu/Pr.per gagnes/VA la/D.def course/N .',
  'Le/D.def lapin/N mange/VA une/D.ind carotte/N et/CC une/D.ind salade/N .',
  'Ce/D.dem gros/A camion/N roule/VA lentement/Av .',
  'Si/CS tu/Pr.per veux/VA , nous/Pr.per jouerons/VA ensemble/Av .',
  'Lorsque/CS la/D.def cloche/N sonne/VA , les/D.def élèves/N sortent/VA .',
  'Ma/D.pos grand-mère/N tricote/VA une/D.ind écharpe/N pour/P moi/Pr.per .',
  'Le/D.def poisson/N nage/VA vite/Av dans/P l\'/D.def eau/N froide/A .',
  'Hourra/I ! Les/D.def vacances/N commencent/VA demain/Av .',
  'Le/D.def ciel/N est/VE gris/A mais/CC il/Pr.per ne/Av pleut/VA pas/Av .',
  'Je/Pr.per cherche/VA mon/D.pos ballon/N sous/P le/D.def lit/N .',
  'La/D.def maîtresse/N raconte/VA une/D.ind belle/A histoire/N .',
  'Comme/CS la/D.def nuit/N tombe/VA , j\'/Pr.per allume/VA la/D.def lampe/N .',
  'Mon/D.pos chat/N noir/A dort/VA souvent/Av sur/P le/D.def canapé/N .',
  'Nous/Pr.per mangeons/VA des/D.ind fraises/N sucrées/A avec/P Léa/NP .',
  'Le/D.def cheval/N galope/VA dans/P la/D.def prairie/N verte/A .',
  'Chut/I ! Le/D.def bébé/N dort/VA .',
  'Paul/NP ouvre/VA la/D.def fenêtre/N et/CC regarde/VA le/D.def jardin/N .',
  'Elle/Pr.per sourit/VA quand/CS elle/Pr.per voit/VA son/D.pos ami/N .',
  'Les/D.def enfants/N courent/VA dans/P la/D.def cour/N .',
  'Ce/D.dem petit/A garçon/N est/VE gentil/A .',
  'Le/D.def train/N arrive/VA bientôt/Av à/P la/D.def gare/N .',
  'Je/Pr.per mets/VA mes/D.pos bottes/N car/CC il/Pr.per pleut/VA .',
  'Ouf/I ! Nous/Pr.per arrivons/VA enfin/Av .',
  'La/D.def souris/N se/Pr.per cache/VA derrière/P le/D.def placard/N .',
  'Mon/D.pos ami/N habite/VA une/D.ind grande/A maison/N blanche/A .',
  'Le/D.def vent/N souffle/VA fort/Av cette/D.dem nuit/N .',
  'Puisque/CS tu/Pr.per es/VE sage/A , tu/Pr.per choisis/VA un/D.ind bonbon/N .',
  'La/D.def lune/N éclaire/VA doucement/Av la/D.def forêt/N .',
  'Je/Pr.per bois/VA un/D.ind grand/A verre/N de/P lait/N .',
  'Ils/Pr.per jouent/VA avec/P un/D.ind ballon/N jaune/A .',
  'Hé/I ! Tu/Pr.per oublies/VA ton/D.pos cartable/N .',
  'Ma/D.pos tante/N arrive/VA ce/D.dem soir/N avec/P son/D.pos chien/N .',
  'L\'/D.def éléphant/N est/VE un/D.ind animal/N énorme/A .',
  'Nous/Pr.per partons/VA maintenant/Av ou/CC nous/Pr.per attendons/VA Léa/NP ?',
  'Lorsque/CS le/D.def chat/N dort/VA , la/D.def souris/N danse/VA .',
  'Je/Pr.per ne/Av trouve/VA pas/Av mes/D.pos lunettes/N .',
  'Il/Pr.per pleut/VA , donc/CC je/Pr.per prends/VA mon/D.pos parapluie/N .',
  'Quand/CS la/D.def nuit/N tombe/VA , les/D.def étoiles/N brillent/VA .',
  'Le/D.def boulanger/N fabrique/VA le/D.def pain/N très/Av tôt/Av .',
  'Ma/D.pos sœur/N chante/VA une/D.ind chanson/N avec/P moi/Pr.per .',
  'Boum/O ! Le/D.def vase/N tombe/VA par/P terre/N .',
  /* Verbes d'état */
  'Le/D.def chat/N semble/VE fatigué/A .',
  'Ma/D.pos sœur/N devient/VE très/Av grande/A .',
  'Tu/Pr.per parais/VE content/A aujourd\'hui/Av .',
  'Les/D.def fleurs/N restent/VE fraîches/A .',
  'Le/D.def lion/N paraît/VE calme/A dans/P sa/D.pos cage/N .',
  /* Noms propres */
  'Paris/NP est/VE une/D.ind grande/A ville/N .',
  'Marie/NP lit/VA un/D.ind livre/N avec/P Hugo/NP .',
  'Le/D.def chien/N de/P Lucie/NP est/VE noir/A .',
  'La/D.def Loire/NP traverse/VA la/D.def ville/N de/P Tours/NP .',
  /* Onomatopées */
  'Crac/O ! La/D.def branche/N casse/VA .',
  'Miaou/O ! Le/D.def chat/N réclame/VA son/D.pos lait/N .',
  'Tic-tac/O ! L\'/D.def horloge/N sonne/VA midi/N .',
  'Atchoum/O ! Mon/D.pos frère/N est/VE malade/A .',
  'Ouaf/O ! Le/D.def chien/N court/VA vers/P la/D.def porte/N .',
  'Ding-dong/O ! Mon/D.pos ami/N sonne/VA à/P la/D.def porte/N .',

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
];

/* Découpe une phrase en mots : { texte, tag } (tag vide pour la ponctuation). */
function parsePhrase(src) {
  return src.split(' ').map((tok) => {
    const i = tok.lastIndexOf('/');
    if (i <= 0) return { texte: tok, tag: '' };
    return { texte: tok.slice(0, i).replace(/_/g, ' '), tag: tok.slice(i + 1) };
  });
}
const PARSED = PHRASES.map(parsePhrase);

/* Écrit la phrase en HTML, avec les espaces à la française (espace insécable avant ! et ?). */
function phraseHtml(mots, cible) {
  let html = '';
  mots.forEach((m, i) => {
    if (i > 0) {
      const prev = mots[i - 1].texte;
      if (m.texte === ',' || m.texte === '.') html += '';
      else if (m.texte === '!' || m.texte === '?') html += '&nbsp;';
      else if (!/'$/.test(prev) && !/^-/.test(m.texte)) html += ' ';
    }
    if (!m.tag) { html += m.texte; return; }
    html += `<span class="w${i === cible ? ' target' : ''}" data-i="${i}">${m.texte}</span>`;
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
  const natures = buildNatureSequence();
  const used = new Set();
  return natures.map((code) => {
    let candidats = PARSED.map((mots, p) => ({ p, idx: mots.map((m, i) => (answerCodeOf(m.tag) === code ? i : -1)).filter((i) => i >= 0) }))
      .filter((c) => c.idx.length);
    const libres = candidats.filter((c) => !used.has(c.p));
    if (libres.length) candidats = libres;
    /* v9 : dans le jeu 2, une phrase « piège » (où l'on trouve aussi la nature qu'on confond avec celle-ci :
       mon / le mien, ce / celui-ci, le article / le pronom…) a trois fois plus de chances d'être choisie. */
    const piege = currentGame.pieges && currentGame.pieges[code];
    if (piege) candidats = candidats.flatMap((c) => (PARSED[c.p].some((m) => piege.includes(m.tag)) ? [c, c, c] : [c]));
    const c = pick(candidats);
    used.add(c.p);
    return { phrase: c.p, mot: pick(c.idx), code };
  });
}

function buildNatureButtons() {
  const btn = (code, small) => `<button type="button" class="nature-button${small ? ' small' : ''}" data-code="${code}">${small ? NATURE_BY_CODE[code].court : NATURE_BY_CODE[code].nom}</button>`;
  const html = (groupe) => currentGame.rows[groupe].map((row) => Array.isArray(row)
    ? `<div class="nature-row nature-row-${row.length}">` + row.map((c) => btn(c, false)).join('') + '</div>'
    : `<div class="nature-subgroup"><span class="nature-subtitle">${row.titre}</span><div class="nature-row nature-row-7">` + row.codes.map((c) => btn(c, true)).join('') + '</div></div>').join('');
  $('nat-buttons-variables').innerHTML = html('variables');
  $('nat-buttons-invariables').innerHTML = html('invariables');
  document.querySelectorAll('.nature-button').forEach((b) => b.addEventListener('click', () => answer(b.dataset.code, b)));
}

function openGame(id) {
  currentGame = GAMES[id];
  $('natures-panel').classList.toggle('game2', id === 'natures2');
  buildNatureButtons();
  $('nat-game-title').textContent = currentGame.titre;
  showPanel('natures');
  $('nat-ready-screen').classList.remove('hidden');
  $('nat-quiz-grid').classList.add('hidden');
  $('nat-progress-label').textContent = `Question 1 / ${NB_QUESTIONS}`;
  $('nat-score-label').textContent = '0 bonne réponse';
  $('nat-progress-bar').style.width = '0';
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
  $('nat-score-label').textContent = `${game.score} bonne${game.score > 1 ? 's' : ''} réponse${game.score > 1 ? 's' : ''}`;
  $('nat-progress-bar').style.width = `${(game.index / game.questions.length) * 100}%`;
}

function showQuestion() {
  /* v7 : on coupe la voix (bulle + explication) dès qu'on passe au mot suivant, pour qu'elle ne déborde pas. */
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  const q = game.questions[game.index];
  game.essais = 0;
  $('nat-sentence').innerHTML = phraseHtml(PARSED[q.phrase], q.mot);
  $('nat-character-stage').innerHTML = '';
  $('nat-correction').classList.add('hidden');
  $('nat-verdict-square').className = 'verdict-square';
  document.querySelectorAll('.nature-button').forEach((b) => { b.disabled = false; b.classList.remove('wrong', 'correct', 'faded'); });
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
  const n = NATURE_BY_CODE[q.code];
  return `${PARSED[q.phrase][q.mot].texte} est ${n.article}. ${n.explication}`;
}

function answer(code, btn) {
  if (game.fini) return;
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

function finishQuestion(reussi, nature, mot) {
  /* v11 : pour le bilan, on compte chaque nature : demandée (p) et trouvée du premier coup (c). */
  const pn = game.parNature[nature.code] || (game.parNature[nature.code] = { c: 0, p: 0 });
  pn.p += 1; if (reussi && game.essais === 0) pn.c += 1;
  document.querySelectorAll('.nature-button').forEach((b) => {
    b.disabled = true;
    if (!b.classList.contains('correct') && !b.classList.contains('wrong')) b.classList.add('faded');
  });
  document.querySelector('.sentence .w.target')?.classList.add('found');
  $('nat-correction-details').innerHTML = nbspFr(`« <strong>${mot.texte}</strong> » est ${nature.article}.<br>${nature.explicationHtml || esc(nature.explication)}`);
  $('nat-correction').classList.remove('hidden');
  $('nat-verdict-square').className = `verdict-square ${reussi ? 'correct' : 'wrong'}`;
  $('nat-next-button').textContent = game.index + 1 < game.questions.length ? 'Suivant →' : 'Voir mon résultat →';
  $('nat-score-label').textContent = `${game.score} bonne${game.score > 1 ? 's' : ''} réponse${game.score > 1 ? 's' : ''}`;
  $('nat-progress-bar').style.width = `${((game.index + 1) / game.questions.length) * 100}%`;
}

function nextQuestion() {
  if (game.index + 1 < game.questions.length) { game.index += 1; showQuestion(); }
  else showResults();
}

function showResults() {
  game.fini = true;
  const n = game.questions.length, s = game.score;
  const content = s >= Math.ceil(n * 0.6);
  const id = content ? pick(['bonaccord', 'virgule']) : pick(['rature', 'gribouille']);
  const pe = playerProfile?.enfant?.photo;
  $('results-character').innerHTML = characterSvg(id) + (pe ? `<img class="results-photo" src="${pe}" alt="" />` : '');
  $('results-title').textContent = `${s} bonne${s > 1 ? 's' : ''} réponse${s > 1 ? 's' : ''} sur ${n}`;
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
  lastResult = { jeu: currentGame.type, niveau: currentGame === GAMES.natures2 ? 2 : 1, score: s, total: n, erreurs: game.erreurs.slice(), parNature: game.parNature, date: new Date().toISOString() };
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
    `Mon score : ${r.score} bonne${r.score > 1 ? 's' : ''} réponse${r.score > 1 ? 's' : ''} du premier coup sur ${r.total}.`,
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
  wireSendBox('esend', () => `${E ? E + ' : ' : ''}mon score sur MNEMOGRAM (${lastResult.score}/${lastResult.total})`, async () => scoreMessage(lastResult));
}

/* ------------------------------------------------------------
   FICHE DES NATURES (bouton 📖)
   ------------------------------------------------------------ */
/* v7 : la fiche est un fichier à part, fiche.html, que Stéphane modifie librement. Elle s'affiche dans la
   fenêtre 📖, et le jeu y lit les explications (lignes « explication ») : ce qui est écrit dans la fiche est ce
   qui s'affiche sous les boutons et ce que dit la voix. Si la fiche ne peut pas être lue (fichier ouvert
   directement sur l'ordinateur, réseau coupé), le jeu garde ses explications de départ. */
async function loadFiche() {
  try {
    const r = await fetch(`fiche.html?v=${Date.now()}`, { cache: 'no-store' });
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
function openFiche() {
  const f = $('fiche-frame');
  f.src = `fiche.html?v=${Date.now()}`;
  $('fiche-modal').classList.remove('hidden');
}

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
  if (/niveau [12]/.test(jeu || '')) return jeu;
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
    return `<li><span>${esc(scoreType(r.jeu))}</span><span>${quand}</span><strong>${r.score} / ${r.total}</strong><button type="button" class="score-del" data-id="${esc(r._id)}" title="Effacer ce score" aria-label="Effacer ce score">✕</button></li>`;
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
const niveauOf = (r) => r.niveau || (/niveau 2|natures 2/.test(r.jeu || '') ? 2 : 1);
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
  const niveaux = [1, 2].map((n) => {
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
function buildBilan(scores) {
  const A = analyseScores(scores);
  const E = playerProfile?.enfant || {};
  const nom = [E.prenom, E.nom].filter(Boolean).join(' ');
  const taux = A.questions ? Math.round((A.bonnes / A.questions) * 100) : 0;
  const bar = (pct) => `<span class="rp-bar"><span style="width:${Math.max(2, Math.min(100, pct))}%"></span></span>`;
  const line = (label, pct) => `<div class="rp-line"><span class="rp-line-label">${esc(label)}</span>${bar(pct)}<span class="rp-line-pct">${pct} %</span></div>`;
  const cards = A.niveaux.map((r) => `
    <div class="rp-card">
      <div class="rp-card-title">Reconnaissance des natures, niveau ${r.n}</div>
      <div class="rp-card-big">${r.avg} %</div>
      <div class="rp-card-sub">moyenne sur ${r.count} partie${r.count > 1 ? 's' : ''}</div>
      ${r.diff !== undefined ? `<div class="rp-card-trend ${r.diff > 0 ? 'up' : r.diff < 0 ? 'down' : ''}">${r.diff > 0 ? '▲ +' + r.diff : r.diff < 0 ? '▼ ' + r.diff : '= stable'} pts<br><span>${r.early} % au début → ${r.recent} % récemment</span></div>` : ''}
    </div>`).join('');
  const reussies = A.parNature.filter((x) => x.pct >= 75);
  const aRevoir = A.parNature.filter((x) => x.pct < 75).sort((a, b) => a.pct - b.pct);
  const defis = [];
  aRevoir.slice(0, 2).forEach((x) => defis.push(`Revoir ${NATURE_BY_CODE[x.code]?.article || x.nom} (${x.pct} %) : relis sa définition dans la fiche 📖, puis rejoue.`));
  A.confusions.slice(0, 2).forEach((c) => defis.push(`Ne pas confondre ${c.bonne} et ${c.choisie} (${c.n} fois).`));
  if (!defis.length) defis.push(A.niveaux.some((r) => r.n === 2) ? 'Continuer à jouer au niveau 2 pour connaître par cœur toutes les sortes de déterminants et de pronoms.' : 'Essayer le niveau 2 : les sept sortes de déterminants et les sept sortes de pronoms t\'attendent !');
  const intro = taux >= 80 ? `Bravo ! Tu as trouvé ${taux} % des réponses du premier coup : tu connais très bien les natures des mots.`
    : taux >= 60 ? `Tu as trouvé ${taux} % des réponses du premier coup : c'est un beau travail. Continue, les natures deviennent de plus en plus faciles à reconnaître.`
    : `Tu as trouvé ${taux} % des réponses du premier coup. Chaque partie t'aide à mieux reconnaître les mots : l'important est de continuer.`;
  const natHtml = A.parNature.length ? `<div class="rp-cols">
      <div class="rp-col"><h3>Les natures bien connues</h3>${reussies.length ? reussies.slice(0, 8).map((x) => line(x.nom, x.pct)).join('') : '<p class="rp-empty">Bientôt !</p>'}</div>
      <div class="rp-col"><h3>Les natures à revoir</h3>${aRevoir.length ? aRevoir.slice(0, 8).map((x) => line(x.nom, x.pct)).join('') : '<p class="rp-empty">Aucune : bravo !</p>'}</div>
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
  A.niveaux.forEach((r) => l.push(`- Reconnaissance des natures, niveau ${r.n} : ${r.avg} % en moyenne sur ${r.count} partie${r.count > 1 ? 's' : ''}${r.diff !== undefined ? ` (${r.early} % au début, ${r.recent} % récemment)` : ''}.`));
  const aRevoir = A.parNature.filter((x) => x.pct < 75).sort((a, b) => a.pct - b.pct).slice(0, 4);
  if (aRevoir.length) { l.push('', 'À revoir :'); aRevoir.forEach((x) => l.push(`- ${x.nom} : ${x.pct} %`)); }
  if (A.confusions.length) { l.push('', 'Mes confusions les plus fréquentes :'); A.confusions.forEach((c) => l.push(`- j'ai répondu ${c.choisie} au lieu d'${c.bonne} (${c.n} fois)`)); }
  l.push('', 'Mes dernières parties :');
  A.list.slice(-10).reverse().forEach((r) => { const d = new Date(r.date); l.push(`- ${isNaN(d) ? '' : d.toLocaleDateString('fr-FR') + ' : '}${scoreType(r.jeu)}, ${r.score} / ${r.total}`); });
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
  list.forEach((r) => { const d = new Date(r.date); l.push(`- ${isNaN(d) ? '' : d.toLocaleDateString('fr-FR') + ' : '}${scoreType(r.jeu)}, ${r.score} bonne${r.score > 1 ? 's' : ''} réponse${r.score > 1 ? 's' : ''} du premier coup sur ${r.total}`); });
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
$('nat-start-button').addEventListener('click', startGame);
$('nat-next-button').addEventListener('click', nextQuestion);
$('nat-listen-button').addEventListener('click', () => {
  const q = game.questions[game.index]; if (!q) return;
  const prev = volumeLevel; if (!volumeLevel) { volumeLevel = 3; }
  speak(phraseTexte(PARSED[q.phrase]), 'femme', 'phrase');
  volumeLevel = prev;
});
$('results-replay').addEventListener('click', startGame);
$('results-home').addEventListener('click', () => showPanel('welcome'));
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
