/* ============================================================
   MNEMOGRAM — LES BILANS DE COURS (v115) : des quiz pour apprendre le cours par cœur.
   Trois quiz par partie : facile (on choisit), moyen (on choisit ou on écrit), difficile (on écrit
   presque tout, et toutes les notions de la partie sont interrogées). Les questions sont tirées au hasard
   dans une réserve, et les exemples changent d'une fois sur l'autre.
   Une question : { t: 'qcm', q, choix, bon, expl } ; { t: 'ecr', q, rep: [réponses acceptées], expl, contient } ;
   { t: 'liste', q, rep: [[synonymes], …] ou pool: [...], n, labels, expl }.
   ------------------------------------------------------------ */
(function () {
  const H = (a) => a[Math.floor(Math.random() * a.length)];
  const melange = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const qcm = (q, bon, autres, expl) => ({ t: 'qcm', q, bon, choix: melange([bon, ...melange(autres).slice(0, 3)]), expl });
  const ecr = (q, rep, expl, o = {}) => ({ t: 'ecr', q, rep: [].concat(rep), expl, ...o });
  const liste = (q, rep, expl, o = {}) => ({ t: 'liste', q, rep, n: o.n || rep.length, expl, ...o });
  const g = (x) => `« ${x} »`;

  /* ---------- CE1 – CE2 · les mots ---------- */
  const NAT = {
    'nom commun': ['chat', 'maison', 'école', 'jardin', 'pomme', 'livre', 'oiseau', 'table', 'voiture', 'fleur', 'cartable', 'soleil'],
    'nom propre': ['Paris', 'Léo', 'Lina', 'Marseille', 'Médor', 'Zoé', 'France', 'Hugo'],
    'déterminant': ['le', 'la', 'les', 'un', 'une', 'des', 'mon', 'ta', 'ses', 'notre', 'leur', 'ce', 'cette', 'ces'],
    'adjectif qualificatif': ['petit', 'rouge', 'gentil', 'grande', 'joli', 'noir', 'heureuse', 'rapide'],
    'verbe': ['court', 'chante', 'mange', 'dort', 'joue', 'regarde', 'finit', 'prend'],
    'pronom': ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'on'],
  };
  /* chaque mot dans un petit contexte : « la » est un déterminant dans « la voiture », un pronom dans « je la vois » */
  const CTX = {
    chat: 'Le <u>chat</u> dort.', maison: 'Ma <u>maison</u> est grande.', école: 'Je vais à l\'<u>école</u>.', jardin: 'Le <u>jardin</u> est fleuri.', pomme: 'Je mange une <u>pomme</u>.', livre: 'Ce <u>livre</u> est beau.', oiseau: 'Un <u>oiseau</u> chante.', table: 'La <u>table</u> est mise.', voiture: 'La <u>voiture</u> roule.', fleur: 'Cette <u>fleur</u> sent bon.', cartable: 'Mon <u>cartable</u> est lourd.', soleil: 'Le <u>soleil</u> brille.',
    Paris: 'Nous visitons <u>Paris</u>.', Léo: '<u>Léo</u> joue.', Lina: '<u>Lina</u> rit.', Marseille: 'Il habite à <u>Marseille</u>.', Médor: '<u>Médor</u> aboie.', Zoé: '<u>Zoé</u> chante.', France: 'La <u>France</u> est belle.', Hugo: '<u>Hugo</u> lit.',
    le: '<u>le</u> chat', la: '<u>la</u> voiture', les: '<u>les</u> fleurs', un: '<u>un</u> livre', une: '<u>une</u> pomme', des: '<u>des</u> oiseaux', mon: '<u>mon</u> cartable', ta: '<u>ta</u> maison', ses: '<u>ses</u> jouets', notre: '<u>notre</u> école', leur: '<u>leur</u> jardin', ce: '<u>ce</u> chien', cette: '<u>cette</u> table', ces: '<u>ces</u> enfants',
    petit: 'un <u>petit</u> chat', rouge: 'une fleur <u>rouge</u>', gentil: 'un chien <u>gentil</u>', grande: 'une <u>grande</u> maison', joli: 'un <u>joli</u> jardin', noir: 'un chat <u>noir</u>', heureuse: 'une fille <u>heureuse</u>', rapide: 'un train <u>rapide</u>',
    court: 'Léo <u>court</u> vite.', chante: 'L\'oiseau <u>chante</u>.', mange: 'Le chat <u>mange</u>.', dort: 'Le bébé <u>dort</u>.', joue: 'Lina <u>joue</u> dehors.', regarde: 'Papa <u>regarde</u> la mer.', finit: 'Il <u>finit</u> son dessin.', prend: 'Elle <u>prend</u> le bus.',
    je: '<u>Je</u> chante.', tu: '<u>Tu</u> joues.', il: '<u>Il</u> dort.', elle: '<u>Elle</u> lit.', nous: '<u>Nous</u> partons.', vous: '<u>Vous</u> riez.', ils: '<u>Ils</u> courent.', elles: '<u>Elles</u> dansent.', on: '<u>On</u> mange.',
    vite: 'Il court <u>vite</u>.', souvent: 'Je lis <u>souvent</u>.', lentement: 'Il marche <u>lentement</u>.', toujours: 'Elle rit <u>toujours</u>.', très: 'Il est <u>très</u> grand.', dans: 'Le chat est <u>dans</u> le jardin.', pour: 'Un cadeau <u>pour</u> toi.', avec: 'Je joue <u>avec</u> Léo.', sans: 'Il part <u>sans</u> parapluie.', sous: 'Le chat dort <u>sous</u> la table.', chez: 'Je vais <u>chez</u> mamie.',
    mais: 'Il pleut, <u>mais</u> je sors.', ou: 'Du thé <u>ou</u> du café ?', et: 'Léo <u>et</u> Lina jouent.', donc: 'Il pleut, <u>donc</u> je reste.', or: 'Il voulait sortir ; <u>or</u> il pleuvait.', ni: 'Je n\'aime <u>ni</u> le thé <u>ni</u> le café.', car: 'Je reste, <u>car</u> il pleut.',
    hélas: '<u>Hélas</u> ! il est parti.', bravo: '<u>Bravo</u> ! tu as gagné.', aïe: '<u>Aïe</u> ! je me suis fait mal.', ouf: '<u>Ouf</u> ! nous sommes arrivés.',
  };
  const enCtx = (m) => (CTX[m] ? `Dans ${g(CTX[m])}, le mot souligné` : g(m));
  const DET = { le: 'article défini', la: 'article défini', les: 'article défini', un: 'article indéfini', une: 'article indéfini', des: 'article indéfini', mon: 'déterminant possessif', ta: 'déterminant possessif', ses: 'déterminant possessif', notre: 'déterminant possessif', leur: 'déterminant possessif', ce: 'déterminant démonstratif', cette: 'déterminant démonstratif', ces: 'déterminant démonstratif' };
  const EXPL_NAT = { 'nom commun': 'on peut mettre un déterminant devant lui (le, un…)', 'nom propre': 'il désigne une personne ou un lieu unique et commence par une majuscule', 'déterminant': 'c\'est le petit mot placé devant le nom', 'adjectif qualificatif': 'il dit comment est le nom', 'verbe': 'il change si l\'on dit « hier » ou « demain »', 'pronom': 'il remplace un nom' };
  const PHR_SV = [
    { s: 'Le petit chat dort.', v: 'dort', inf: 'dormir', suj: 'chat', n: 'nom commun' }, { s: 'Ma sœur chante une chanson.', v: 'chante', inf: 'chanter', suj: 'sœur', n: 'nom commun' },
    { s: 'Dans le jardin, Léo joue.', v: 'joue', inf: 'jouer', suj: 'Léo', n: 'nom propre' }, { s: 'Nous mangeons des crêpes.', v: 'mangeons', inf: 'manger', suj: 'nous', n: 'pronom personnel' },
    { s: 'Les oiseaux volent haut.', v: 'volent', inf: 'voler', suj: 'oiseaux', n: 'nom commun' }, { s: 'Le soir, papa lit une histoire.', v: 'lit', inf: 'lire', suj: 'papa', n: 'nom commun' },
    { s: 'Lina regarde la mer.', v: 'regarde', inf: 'regarder', suj: 'Lina', n: 'nom propre' }, { s: 'Le vieux chien aboie.', v: 'aboie', inf: 'aboyer', suj: 'chien', n: 'nom commun' },
    { s: 'Ils jouent au ballon.', v: 'jouent', inf: 'jouer', suj: 'ils', n: 'pronom personnel' }];
  const GN_GN = [['une fleur', 'féminin', 'singulier'], ['les chats', 'masculin', 'pluriel'], ['des oiseaux', 'masculin', 'pluriel'], ['le cartable', 'masculin', 'singulier'], ['ces pommes', 'féminin', 'pluriel'], ['ma maison', 'féminin', 'singulier'], ['mon livre', 'masculin', 'singulier'], ['des voitures', 'féminin', 'pluriel']];
  const ce_mots = [
    { n: 'nature', qcm: () => { const nat = H(Object.keys(NAT)), m = H(NAT[nat]); return qcm(`${enCtx(m)} est…`, nat === 'pronom' ? 'un pronom' : nat === 'adjectif qualificatif' ? 'un adjectif qualificatif' : `un ${nat}`, Object.keys(NAT).filter((x) => x !== nat).map((x) => (x === 'pronom' ? 'un pronom' : `un ${x}`)), `${g(m)} : ${EXPL_NAT[nat]}.`); },
      ecr: () => { const nat = H(Object.keys(NAT)), m = H(NAT[nat]); return ecr(CTX[m] ? `Dans ${g(CTX[m])}, quelle est la nature du mot souligné ?` : `Quelle est la nature de ${g(m)} ?`, nat === 'déterminant' ? ['déterminant', DET[m]] : nat === 'pronom' ? ['pronom', 'pronom personnel'] : [nat], `${g(m)} est un ${nat === 'déterminant' ? DET[m] : nat === 'pronom' ? 'pronom personnel' : nat} : ${EXPL_NAT[nat]}.`); } },
    { n: 'déterminants', qcm: () => { const m = H(Object.keys(DET)); return qcm(`${enCtx(m)} est…`, `un ${DET[m]}`, ['un article défini', 'un article indéfini', 'un déterminant possessif', 'un déterminant démonstratif'].filter((x) => x !== `un ${DET[m]}`), `${g(m)} est un ${DET[m]}.`); },
      ecr: () => { const m = H(Object.keys(DET)); return ecr(`Dans ${g(CTX[m])}, quelle est la nature exacte du déterminant souligné ?`, [DET[m]], `${g(m)} est un ${DET[m]}. Articles définis : le, la, les ; indéfinis : un, une, des ; possessifs : mon, ta, ses… ; démonstratifs : ce, cette, ces.`); },
      liste: () => H([liste('Cite les trois articles définis.', [['le'], ['la', 'l\''], ['les']], 'Les articles définis : le, la, l\', les.'), liste('Cite les trois articles indéfinis.', [['un'], ['une'], ['des']], 'Les articles indéfinis : un, une, des.'), liste('Cite trois déterminants possessifs.', null, 'Les déterminants possessifs disent à qui est la chose : mon, ton, son, ma, ta, sa, mes, tes, ses, notre, votre, leur, nos, vos, leurs.', { pool: ['mon', 'ton', 'son', 'ma', 'ta', 'sa', 'mes', 'tes', 'ses', 'notre', 'votre', 'leur', 'nos', 'vos', 'leurs'], n: 3 }), liste('Cite les trois déterminants démonstratifs.', [['ce', 'cet'], ['cette'], ['ces']], 'Les déterminants démonstratifs montrent : ce (cet), cette, ces.')]) },
    { n: 'natures', qcm: () => ({ ...qcm('Parmi ces quatre mots, lequel n\'est <strong>pas</strong> une nature ?', 'sujet', ['nom commun', 'verbe', 'déterminant', 'adjectif qualificatif', 'pronom'], '« Sujet » est une fonction, pas une nature : la nature dit ce qu\'est un mot, la fonction dit le rôle qu\'il joue dans la phrase.'), bonRouge: true }),
      liste: () => liste('Cite les six natures de mots que tu as apprises.', [['nom commun'], ['nom propre'], ['déterminant'], ['adjectif qualificatif', 'adjectif'], ['verbe'], ['pronom', 'pronom personnel']], 'Les six natures : nom commun, nom propre, déterminant, adjectif qualificatif, verbe, pronom.') },
    { n: 'nom propre', qcm: () => H([qcm('Un nom propre commence toujours par…', 'une majuscule', ['une minuscule', 'un déterminant', 'un point'], 'Un nom propre (Léo, Paris) commence toujours par une majuscule.'), (() => { const np = H(NAT['nom propre']); return qcm('Lequel de ces quatre mots est un nom propre ?', np, melange(NAT['nom commun']).slice(0, 3), `${g(np)} commence par une majuscule : il désigne une personne ou un lieu unique.`); })()]),
      ecr: () => ecr('Par quelle sorte de lettre commence toujours un nom propre ?', ['majuscule', 'une majuscule', 'par une majuscule'], 'Un nom propre commence toujours par une majuscule.') },
    { n: 'adjectif', qcm: () => qcm('L\'adjectif qualificatif…', 'décrit un nom', ['dit ce que fait le sujet', 'dit où se passe l\'action', 'dit quand se passe l\'action'], 'L\'adjectif qualificatif décrit un nom : un chat noir, une grande maison.'),
      ecr: () => ecr('Avec quel mot l\'adjectif qualificatif s\'accorde-t-il ?', ['le nom', 'nom', 'avec le nom', 'le nom commun', 'nom commun'], 'L\'adjectif qualificatif s\'accorde en genre et en nombre avec le nom : des fleurs rouges.') },
    { n: 'genre et nombre', qcm: () => H([qcm('Masculin ou féminin, c\'est…', 'le genre', ['le nombre', 'le temps', 'la nature'], 'Le genre : masculin ou féminin. Le nombre : singulier ou pluriel.'), qcm('Singulier ou pluriel, c\'est…', 'le nombre', ['le genre', 'le temps', 'la nature'], 'Le nombre : singulier (un seul) ou pluriel (plusieurs).'), (() => { const x = H(GN_GN); return qcm(`${g(x[0])} est au…`, x[2], [x[2] === 'singulier' ? 'pluriel' : 'singulier'], `${g(x[0])} : ${x[1]} ${x[2]}.`); })()]),
      ecr: () => { const x = H(GN_GN); return ecr(`${g(x[0])} : le nom est-il au singulier ou au pluriel ?`, [x[2]], `${g(x[0])} est au ${x[2]} : regarde le déterminant.`); },
      liste: () => H([liste('Quels sont les deux genres ?', [['masculin'], ['féminin']], 'Les deux genres : masculin et féminin.'), liste('Quels sont les deux nombres ?', [['singulier'], ['pluriel']], 'Les deux nombres : singulier et pluriel.')]) },
    { n: 'pronoms', qcm: () => qcm('Le pronom personnel remplace…', 'un nom', ['un verbe', 'un adjectif', 'une phrase'], 'Le pronom remplace un nom : Léo dort → il dort.'),
      liste: () => H([liste('Cite les pronoms personnels sujets du singulier.', [['je', 'j\''], ['tu'], ['il'], ['elle'], ['on']], 'Au singulier : je, tu, il, elle, on.'), liste('Cite les pronoms personnels sujets du pluriel.', [['nous'], ['vous'], ['ils'], ['elles']], 'Au pluriel : nous, vous, ils, elles.')]) },
    { n: 'sujet', qcm: () => H([qcm('Pour trouver le sujet, on pose devant le verbe la question…', '« Qui est-ce qui… ? »', ['« Où… ? »', '« Quand… ? »', '« Comment… ? »'], 'Pour trouver le sujet : « Qui est-ce qui » + verbe ? (ou « Qu\'est-ce qui » + verbe ?).'), (() => { const p = H(PHR_SV), mots = p.s.replace(/[.,]/g, '').split(' ').filter((w) => w !== p.suj && w !== p.v && w.length > 2); return qcm(`${g(p.s)} : quel est le sujet du verbe ${g(p.v)} ?`, p.suj, melange(mots).slice(0, 2).concat([p.v]), `Qui est-ce qui ${p.v} ? ${p.suj.charAt(0).toUpperCase() + p.suj.slice(1)} : c'est le sujet (${p.n}).`); })()]),
      ecr: () => H([ecr('Quelle question pose-t-on devant le verbe pour trouver le sujet ?', ['qui est-ce qui', 'qu\'est-ce qui'], 'On pose la question « Qui est-ce qui » (ou « Qu\'est-ce qui ») + verbe.', { contient: true }), (() => { const p = H(PHR_SV); return ecr(`${g(p.s)} : écris le sujet du verbe ${g(p.v)} (un seul mot).`, [p.suj], `Qui est-ce qui ${p.v} ? ${p.suj} : c'est le sujet (${p.n}).`); })()]) },
    { n: 'verbe', qcm: () => qcm('Pour reconnaître le verbe, on change le moment : on dit…', '« hier » ou « demain »', ['« vite » ou « lentement »', '« ici » ou « là-bas »', '« oui » ou « non »'], 'Le verbe change quand on dit « hier » ou « demain » : il chante → hier, il chantait ; demain, il chantera.'),
      ecr: () => { const p = H(PHR_SV); return ecr(`${g(p.s)} : relève le verbe, tel qu'il est conjugué dans la phrase ou à l'infinitif.`, [p.v, p.inf], `${g(p.v)} (infinitif : ${p.inf}) est le verbe : il change si l'on dit « hier » ou « demain ».`); } },
    { n: 'complément de phrase', qcm: () => qcm('Un complément de phrase, on peut…', 'le déplacer ou le supprimer', ['seulement le supprimer', 'ni le déplacer ni le supprimer', 'le mettre au pluriel'], 'Ce matin, je me lève → Je me lève ce matin → Je me lève : on peut le déplacer ou le supprimer.'),
      liste: () => liste('Les deux tests du complément de phrase : on peut le…', [['déplacer'], ['supprimer', 'enlever', 'effacer']], 'On peut le déplacer et le supprimer : la phrase garde son sens.') },
  ];

  /* ---------- CE1 – CE2 · les temps et les modes ---------- */
  const INF = [['mange', 'manger', '1er'], ['finit', 'finir', '2e'], ['prend', 'prendre', '3e'], ['va', 'aller', '3e'], ['sont', 'être', '3e'], ['avons', 'avoir', '3e'], ['dort', 'dormir', '3e'], ['fait', 'faire', '3e'], ['lisent', 'lire', '3e'], ['chantons', 'chanter', '1er'], ['voit', 'voir', '3e'], ['grandissent', 'grandir', '2e'], ['joue', 'jouer', '1er'], ['peut', 'pouvoir', '3e']];
  const TPS = [['je chantais', 'imparfait'], ['tu chantes', 'présent'], ['nous chanterons', 'futur'], ['il a chanté', 'passé composé'], ['elles finissaient', 'imparfait'], ['vous irez', 'futur'], ['je suis allé', 'passé composé'], ['ils jouent', 'présent'], ['tu seras', 'futur'], ['nous avions', 'imparfait'], ['elle est partie', 'passé composé'], ['je fais', 'présent']];
  const GRP = { '1er': ['1er groupe', 'premier groupe', '1er', 'premier', '1'], '2e': ['2e groupe', 'deuxième groupe', '2e', 'deuxième', '2', 'second groupe'], '3e': ['3e groupe', 'troisième groupe', '3e', 'troisième', '3'] };
  const PERS = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];
  const term = (L) => L.map((x) => [x, x.replace(/^-/, '')]);
  const ce_temps = [
    { n: 'infinitif', qcm: () => { const x = H(INF), autres = melange(INF.filter((y) => y[1] !== x[1])).slice(0, 3).map((y) => y[1]); return qcm(`Quel est l'infinitif de ${g(x[0])} ?`, x[1], autres, `${g(x[0])} : il faut ${x[1]}. L'infinitif, c'est le nom du verbe, celui du dictionnaire.`); },
      ecr: () => { const x = H(INF); return ecr(`Quel est l'infinitif de ${g(x[0])} ?`, [x[1]], `${g(x[0])} : il faut ${x[1]}. L'infinitif, c'est le nom du verbe, celui du dictionnaire.`); } },
    { n: 'trouver l\'infinitif', qcm: () => qcm('Pour trouver l\'infinitif d\'un verbe, on dit…', '« il faut… »', ['« hier… »', '« qui est-ce qui… »', '« demain… »'], 'On dit « il faut… » : il mange → il faut manger.') },
    { n: 'temps', qcm: () => { const x = H(TPS); return qcm(`${g(x[0])} : quel est le temps de ce verbe ?`, x[1], ['présent', 'imparfait', 'futur', 'passé composé'].filter((y) => y !== x[1]), `${g(x[0])} est au ${x[1]}.`); },
      ecr: () => { const x = H(TPS); return ecr(`${g(x[0])} : quel est le temps de ce verbe ?`, [x[1], x[1] === 'futur' ? 'futur simple' : x[1]], `${g(x[0])} est au ${x[1]}.`); } },
    { n: 'groupes', qcm: () => { const x = H(INF.filter((y) => y[1] !== 'être' && y[1] !== 'avoir')); return qcm(`${g(x[1])} est un verbe du…`, `${x[2]} groupe`, ['1er groupe', '2e groupe', '3e groupe'].filter((y) => y !== `${x[2]} groupe`), `${g(x[1])} : ${x[2] === '1er' ? 'les verbes en -er (sauf aller) sont du 1er groupe' : x[2] === '2e' ? 'les verbes en -ir qui font -issons avec « nous » sont du 2e groupe' : 'tous les autres verbes sont du 3e groupe'}.`); },
      ecr: () => H([(() => { const x = H(INF.filter((y) => y[1] !== 'être' && y[1] !== 'avoir')); return ecr(`À quel groupe appartient le verbe ${g(x[1])} ?`, GRP[x[2]], `${g(x[1])} est un verbe du ${x[2]} groupe.`); })(), ecr('Quel verbe en -er n\'est pas du 1er groupe ?', ['aller'], '« Aller » se termine par -er, mais il est du 3e groupe.'), ecr('Par quelles lettres se terminent les verbes du 1er groupe ?', ['-er', 'er'], 'Les verbes du 1er groupe se terminent par -er : chanter, jouer.')]) },
    { n: 'passé composé', qcm: () => qcm('Le passé composé se forme avec…', 'un auxiliaire et un participe passé', ['un seul mot', 'l\'infinitif et un nom', 'deux infinitifs'], 'Le passé composé a deux mots : l\'auxiliaire (être ou avoir) au présent et le participe passé : j\'ai chanté, je suis allé.'),
      liste: () => liste('Quels sont les deux auxiliaires ?', [['être'], ['avoir']], 'Les deux auxiliaires : être et avoir (je suis allé, j\'ai chanté).') },
    { n: 'terminaisons', qcm: () => H([qcm('À l\'imparfait, avec « ils », la terminaison est…', '-aient', ['-ent', '-ont', '-ais'], 'Imparfait : -ais, -ais, -ait, -ions, -iez, -aient.'), qcm('Au futur, avec « nous », la terminaison est…', '-ons', ['-ions', '-ez', '-ont'], 'Futur : -ai, -as, -a, -ons, -ez, -ont, après l\'infinitif : nous chanterons.'), qcm('Au présent, un verbe du 1er groupe avec « tu » se termine par…', '-es', ['-s', '-e', '-x'], 'Présent du 1er groupe : -e, -es, -e, -ons, -ez, -ent.')]),
      liste: () => H([liste('Écris les terminaisons du futur, de « je » à « ils ».', term(['-ai', '-as', '-a', '-ons', '-ez', '-ont']), 'Futur : -ai, -as, -a, -ons, -ez, -ont.', { labels: PERS, ordre: true }), liste('Écris les terminaisons de l\'imparfait, de « je » à « ils ».', term(['-ais', '-ais', '-ait', '-ions', '-iez', '-aient']), 'Imparfait : -ais, -ais, -ait, -ions, -iez, -aient.', { labels: PERS, ordre: true }), liste('Écris les terminaisons du présent des verbes du 1er groupe, de « je » à « ils ».', term(['-e', '-es', '-e', '-ons', '-ez', '-ent']), 'Présent du 1er groupe : -e, -es, -e, -ons, -ez, -ent.', { labels: PERS, ordre: true })]) },
    { n: 'être et avoir', qcm: () => H([qcm('« nous … » : le verbe être au présent ?', 'sommes', ['êtes', 'sont', 'avons'], 'Être au présent : je suis, tu es, il est, nous sommes, vous êtes, ils sont.'), qcm('« ils … » : le verbe avoir au présent ?', 'ont', ['sont', 'avons', 'avez'], 'Avoir au présent : j\'ai, tu as, il a, nous avons, vous avez, ils ont.')]),
      liste: () => H([liste('Conjugue le verbe être au présent, de « je » à « ils ».', [['suis'], ['es'], ['est'], ['sommes'], ['êtes'], ['sont']], 'Je suis, tu es, il est, nous sommes, vous êtes, ils sont.', { labels: ['je', 'tu', 'il', 'nous', 'vous', 'ils'], ordre: true }), liste('Conjugue le verbe avoir au présent, de « j\' » à « ils ».', [['ai'], ['as'], ['a'], ['avons'], ['avez'], ['ont']], 'J\'ai, tu as, il a, nous avons, vous avez, ils ont.', { labels: ['j\'', 'tu', 'il', 'nous', 'vous', 'ils'], ordre: true })]) },
    { n: 'passé, présent, futur', qcm: () => H([qcm('Lequel de ces quatre mots annonce le passé ?', 'hier', ['demain', 'maintenant', 'bientôt'], '« Hier » annonce le passé ; « demain », le futur ; « maintenant », le présent.'), qcm('Lequel de ces quatre mots annonce le futur ?', 'demain', ['hier', 'autrefois', 'maintenant'], '« Demain » annonce le futur.')]) },
  ];

  /* ---------- CE1 – CE2 · la phrase ---------- */
  const TYPES = [['Range ta chambre.', 'impérative'], ['Où vas-tu ?', 'interrogative'], ['Le chat dort sur le lit.', 'déclarative'], ['Est-ce que tu viens ?', 'interrogative'], ['Ferme la porte, s\'il te plaît.', 'impérative'], ['Nous partons demain.', 'déclarative'], ['Viens-tu jouer ?', 'interrogative'], ['Mange ta soupe.', 'impérative']];
  const FORMES = [['Il pleut.', 'affirmative'], ['Il ne pleut pas.', 'négative'], ['Comme il fait beau !', 'affirmative et exclamative'], ['Ce n\'est pas juste !', 'négative et exclamative'], ['Léo ne mange jamais de soupe.', 'négative'], ['Lina aime les crêpes.', 'affirmative'], ['Quelle belle journée !', 'affirmative et exclamative'], ['Je n\'ai plus faim !', 'négative et exclamative']];
  const ce_phrase = [
    { n: 'la phrase', qcm: () => qcm('Une phrase commence par…', 'une majuscule', ['une minuscule', 'un verbe', 'un point'], 'Une phrase commence par une majuscule et se termine par un point ( . ? ! … ).'),
      liste: () => liste('Une phrase commence par une … et se termine par un …', [['majuscule'], ['point']], 'Une phrase commence par une majuscule et se termine par un point ( . ? ! … ).', { labels: ['commence par une', 'se termine par un'], ordre: true }) },
    { n: 'types', qcm: () => { const x = H(TYPES); return qcm(`${g(x[0])} : de quel type est cette phrase ?`, x[1], ['déclarative', 'interrogative', 'impérative'].filter((y) => y !== x[1]), `${g(x[0])} : phrase ${x[1]}.`); },
      ecr: () => { const x = H(TYPES); return ecr(`${g(x[0])} : de quel type est cette phrase ?`, [x[1], `phrase ${x[1]}`, `type ${x[1]}`], `${g(x[0])} : phrase ${x[1]}.`); },
      liste: () => liste('Cite les trois types de phrases.', [['déclarative'], ['interrogative'], ['impérative']], 'Les trois types : déclarative (on informe), interrogative (on pose une question), impérative (on donne un ordre ou un conseil).') },
    { n: 'ponctuation', qcm: () => qcm('Une phrase interrogative se termine par…', 'un point d\'interrogation', ['un point', 'une virgule', 'deux points'], 'Elle pose une question : elle se termine par un point d\'interrogation ( ? ).'),
      ecr: () => ecr('Quel signe termine une phrase interrogative ?', ['point d\'interrogation', 'un point d\'interrogation', '?'], 'Le point d\'interrogation ( ? ).') },
    { n: 'impérative', qcm: () => H([qcm('Une phrase impérative sert à…', 'donner un ordre ou un conseil', ['poser une question', 'raconter ce qui se passe', 'exprimer la surprise'], 'Phrase impérative : un ordre ou un conseil (Range ta chambre.).'), qcm('Une phrase impérative a-t-elle un sujet ?', 'non', ['oui'], 'Non : le verbe est à l\'impératif, sans sujet : Ferme la porte.')]) },
    { n: 'formes', qcm: () => { const x = H(FORMES); return qcm(`${g(x[0])} : quelle est la forme de cette phrase ?`, x[1], ['affirmative', 'négative', 'affirmative et exclamative', 'négative et exclamative'].filter((y) => y !== x[1]), `${g(x[0])} : forme ${x[1]}.`); },
      ecr: () => { const x = H(FORMES); return ecr(`${g(x[0])} : quelle est la forme de cette phrase ?`, [x[1], `forme ${x[1]}`], `${g(x[0])} : forme ${x[1]}.`); },
      liste: () => liste('Cite les trois formes de phrases.', [['affirmative'], ['négative'], ['exclamative']], 'Une phrase est affirmative ou négative, et elle peut être en plus exclamative.') },
    { n: 'négation', qcm: () => qcm('Les deux mots de la négation : « ne… »', 'pas', ['très', 'aussi', 'bien'], 'La négation entoure le verbe : ne… pas, ne… plus, ne… jamais, ne… rien.'),
      liste: () => liste('Cite trois négations différentes.', null, 'Ne… pas, ne… plus, ne… jamais, ne… rien, personne ne…', { pool: ['ne pas', 'ne plus', 'ne jamais', 'ne rien', 'personne ne', 'ne personne', 'n pas', 'n plus', 'n jamais', 'n rien'], n: 3 }) },
    { n: 'exclamative', qcm: () => qcm('Une phrase exclamative exprime…', 'un sentiment fort', ['une question', 'un ordre', 'une information sans émotion'], 'La phrase exclamative exprime un sentiment fort (joie, surprise, colère) et se termine par un point d\'exclamation.') },
    { n: 'paroles', qcm: () => qcm('Les paroles d\'un personnage s\'écrivent entre…', 'guillemets', ['parenthèses', 'virgules', 'points'], 'On les met entre guillemets « … » : c\'est le discours direct.'),
      ecr: () => ecr('Comment s\'appellent les signes « … » qui entourent les paroles ?', ['guillemets', 'les guillemets', 'des guillemets'], 'Ce sont les guillemets : « … ».') },
    { n: 'dialogue', qcm: () => H([qcm('Dans un dialogue, chaque réplique commence par…', 'un tiret', ['une virgule', 'un point', 'une parenthèse'], 'Chaque réplique commence par un tiret (—).'), qcm('Dans un dialogue, un nouveau tiret annonce que…', 'l\'autre personnage répond', ['la phrase est finie', 'le récit reprend', 'on pose une question'], 'Chaque nouveau tiret : l\'autre personnage prend la parole.')]),
      ecr: () => ecr('Dans un dialogue, par quel signe commence chaque réplique ?', ['tiret', 'un tiret', '—', '-'], 'Par un tiret (—).') },
  ];

  /* =========================== CM1 – CM2 =========================== */
  const INVAR = {
    'adverbe': ['vite', 'souvent', 'hier', 'très', 'lentement', 'toujours', 'ici', 'bien', 'jamais', 'demain'],
    'préposition': ['à', 'de', 'dans', 'pour', 'sur', 'avec', 'sans', 'sous', 'par', 'chez', 'vers', 'en', 'entre', 'contre', 'avant', 'après', 'pendant', 'derrière', 'devant'],
    'conjonction de coordination': ['mais', 'ou', 'et', 'donc', 'or', 'ni', 'car'],
    'conjonction de subordination': ['que', 'quand', 'parce que', 'si', 'comme', 'lorsque', 'puisque', 'quoique', 'afin que', 'bien que', 'pour que'],
    'interjection': ['oh', 'ah', 'hélas', 'bravo', 'aïe', 'zut', 'chut', 'ouf', 'hé', 'eh', 'bah', 'hourra', 'oups'],
  };
  const NAT_CM = { 'nom commun': NAT['nom commun'], 'nom propre': NAT['nom propre'], 'verbe': NAT.verbe, 'adjectif qualificatif': NAT['adjectif qualificatif'], 'adverbe': ['vite', 'souvent', 'lentement', 'toujours', 'très'], 'préposition': ['dans', 'pour', 'avec', 'sans', 'sous', 'chez'], 'conjonction de coordination': INVAR['conjonction de coordination'], 'interjection': ['hélas', 'bravo', 'aïe', 'ouf'] };
  const unNat = (n) => (/^[aeiouyéèh]/.test(n) ? `un ${n}` : n === 'préposition' || n === 'conjonction de coordination' || n === 'conjonction de subordination' || n === 'interjection' ? `une ${n}` : `un ${n}`);
  const EXPL_INV = { 'adverbe': 'il précise un verbe, un adjectif ou un autre adverbe ; il ne change jamais', 'préposition': 'elle introduit un complément (à, de, dans, pour, sur, avec…) ; elle ne change jamais', 'conjonction de coordination': 'elle relie deux mots ou deux propositions de même fonction : mais, ou, et, donc, or, ni, car', 'conjonction de subordination': 'elle introduit une proposition subordonnée (que, quand, parce que, si…)', 'interjection': 'elle exprime un sentiment, souvent suivie d\'un point d\'exclamation' };
  const VERBES_ETAT = ['être', 'paraître', 'sembler', 'devenir', 'demeurer', 'rester', 'avoir l\'air', 'passer pour'];
  const DETPRON = [['Je <u>le</u> vois.', 'pronom personnel', 'il remplace un nom et se place devant le verbe'], ['<u>Le</u> chat dort.', 'article défini', 'il est devant un nom'], ['<u>Leur</u> maison est grande.', 'déterminant possessif', 'il est devant le nom « maison »'], ['Je <u>leur</u> parle.', 'pronom personnel', 'il est devant le verbe : il remplace « à eux »'], ['<u>Ce</u> livre est à moi.', 'déterminant démonstratif', 'il est devant le nom « livre »'], ['<u>Celui-ci</u> est à moi.', 'pronom démonstratif', 'il remplace un nom'], ['<u>Les</u> enfants jouent.', 'article défini', 'il est devant un nom'], ['Je <u>les</u> appelle.', 'pronom personnel', 'il est devant le verbe et remplace un nom']];
  const SUJ_CM = [{ s: 'Dans la forêt vivent des loups.', v: 'vivent', suj: 'loups' }, { s: 'Où vont les enfants ?', v: 'vont', suj: 'enfants' }, { s: '« Viens ! » crie maman.', v: 'crie', suj: 'maman' }, { s: 'Le chien de mes voisins aboie.', v: 'aboie', suj: 'chien' }, { s: 'Les élèves de la classe chantent.', v: 'chantent', suj: 'élèves' }, { s: 'Sur la colline se dresse un château.', v: 'se dresse', suj: 'château' }];
  const cm_mots = [
    { n: 'natures variables', qcm: () => qcm('Laquelle de ces natures est <strong>variable</strong> ?', 'le pronom', ['l\'adverbe', 'la préposition', 'l\'interjection'], 'Les cinq natures variables : nom, déterminant, adjectif qualificatif, pronom, verbe.'),
      liste: () => liste('Cite les cinq natures de mots variables.', [['nom', 'nom commun', 'nom propre'], ['déterminant'], ['adjectif qualificatif', 'adjectif'], ['pronom'], ['verbe']], 'Les natures variables : nom, déterminant, adjectif qualificatif, pronom, verbe. Elles changent selon le genre, le nombre, la personne ou le temps.') },
    { n: 'natures invariables', qcm: () => qcm('Laquelle de ces natures est <strong>invariable</strong> ?', 'la préposition', ['le nom', 'l\'adjectif qualificatif', 'le déterminant'], 'Les cinq natures invariables : adverbe, préposition, conjonction de coordination, conjonction de subordination, interjection.'),
      liste: () => H([liste('Cite les cinq natures de mots invariables.', [['adverbe'], ['préposition'], ['conjonction de coordination'], ['conjonction de subordination'], ['interjection']], 'Les natures invariables : adverbe, préposition, conjonction de coordination, conjonction de subordination, interjection. Elles ne changent jamais.'),
        liste('Donne un exemple de chaque nature de mot invariable.', Object.values(INVAR), 'Par exemple : vite (adverbe), dans (préposition), mais (conjonction de coordination), quand (conjonction de subordination), hélas (interjection).', { labels: Object.keys(INVAR), ordre: true })]) },
    { n: 'conjonctions de coordination', qcm: () => qcm('Lequel de ces quatre mots est une conjonction de coordination ?', H(INVAR['conjonction de coordination']), ['quand', 'dans', 'très', 'parce que'], 'Les conjonctions de coordination : mais, ou, et, donc, or, ni, car.'),
      liste: () => liste('Cite les sept conjonctions de coordination.', [['mais'], ['ou'], ['et'], ['donc'], ['or'], ['ni'], ['car']], 'Mais, ou, et, donc, or, ni, car (« Mais où est donc Ornicar ? »).') },
    { n: 'nature', qcm: () => { const nat = H(Object.keys(NAT_CM)), m = H(NAT_CM[nat]); return qcm(`${enCtx(m)} est…`, unNat(nat), Object.keys(NAT_CM).filter((x) => x !== nat).map(unNat), `${g(m)} est ${unNat(nat)}${EXPL_INV[nat] ? ` : ${EXPL_INV[nat]}` : ''}.`); },
      ecr: () => { const nat = H(Object.keys(NAT_CM)), m = H(NAT_CM[nat]); return ecr(CTX[m] ? `Dans ${g(CTX[m])}, quelle est la nature du mot souligné ?` : `Quelle est la nature de ${g(m)} ?`, [nat], `${g(m)} est ${unNat(nat)}${EXPL_INV[nat] ? ` : ${EXPL_INV[nat]}` : ''}.`); } },
    { n: 'déterminant ou pronom', qcm: () => { const x = H(DETPRON); return qcm(`${x[0]} Le mot souligné est…`, x[1], ['article défini', 'pronom personnel', 'déterminant possessif', 'déterminant démonstratif', 'pronom démonstratif'].filter((y) => y !== x[1]), `C'est ${unNat(x[1])} : ${x[2]}.`); },
      ecr: () => H([ecr('Le déterminant accompagne un nom. Et le pronom ?', ['remplace un nom', 'il remplace un nom', 'remplace le nom', 'il remplace le nom'], 'Le déterminant accompagne le nom ; le pronom le remplace.', { contient: true }), (() => { const x = H(DETPRON); return ecr(`${x[0]} Quelle est la nature du mot souligné ?`, [x[1]], `C'est ${unNat(x[1])} : ${x[2]}.`); })()]) },
    { n: 'sujet', qcm: () => H([qcm('Le sujet est-il toujours placé avant le verbe ?', 'non, il peut être après', ['oui, toujours'], 'Non : « Où vont les enfants ? », « Dans la forêt vivent des loups » : le sujet est après le verbe (sujet inversé).'), (() => { const p = H(SUJ_CM), mots = p.s.replace(/[«».,!?]/g, '').split(' ').filter((w) => w.length > 2 && w !== p.suj && !p.v.includes(w)); return qcm(`${g(p.s)} : quel est le sujet du verbe ${g(p.v)} ?`, p.suj, melange(mots).slice(0, 3), `Qui est-ce qui ${p.v} ? ${p.suj} : c'est le sujet${p.s.indexOf(p.suj) > p.s.indexOf(p.v) ? ', placé après le verbe' : ''}.`); })()]),
      ecr: () => H([ecr('Quelle question pose-t-on pour trouver le sujet ?', ['qui est-ce qui', 'qu\'est-ce qui'], '« Qui est-ce qui » (ou « Qu\'est-ce qui ») + verbe ?', { contient: true }), (() => { const p = H(SUJ_CM); return ecr(`${g(p.s)} : écris le sujet du verbe ${g(p.v)} (le nom ou le pronom noyau).`, [p.suj], `Qui est-ce qui ${p.v} ? ${p.suj}.`); })()]) },
    { n: 'accords', qcm: () => H([qcm('Le verbe s\'accorde avec…', 'son sujet', ['son complément', 'le nom le plus proche', 'l\'adverbe'], 'Le verbe s\'accorde en personne et en nombre avec son sujet.'), qcm('L\'adjectif attribut du sujet s\'accorde avec…', 'le sujet', ['le verbe', 'le complément', 'rien : il est invariable'], 'Les fleurs sont belles : « belles » s\'accorde avec le sujet « fleurs ».'), qcm('Le participe passé employé avec l\'auxiliaire être s\'accorde avec…', 'le sujet', ['le complément', 'rien', 'l\'auxiliaire'], 'Elles sont parties : avec être, le participe passé s\'accorde avec le sujet.'), qcm('Avec l\'auxiliaire avoir, le participe passé s\'accorde-t-il avec le sujet ?', 'non, jamais', ['oui, toujours', 'oui, au pluriel seulement'], 'Elles ont chanté : avec avoir, jamais d\'accord avec le sujet.')]),
      ecr: () => H([ecr('Avec quel mot le verbe s\'accorde-t-il ?', ['sujet', 'son sujet', 'avec son sujet', 'avec le sujet'], 'Le verbe s\'accorde avec son sujet.'), ecr('Avec l\'auxiliaire être, avec quel mot le participe passé s\'accorde-t-il ?', ['sujet', 'avec le sujet', 'son sujet'], 'Avec être, le participe passé s\'accorde avec le sujet : elles sont parties.')]) },
    { n: 'verbes d\'état', qcm: () => qcm('Lequel de ces quatre verbes est un verbe d\'état ?', H(['sembler', 'paraître', 'devenir', 'rester']), ['manger', 'courir', 'regarder'], 'Les verbes d\'état : être, paraître, sembler, devenir, demeurer, rester, avoir l\'air… Ils introduisent un attribut du sujet.'),
      liste: () => liste('Cite quatre verbes d\'état.', null, 'Être, paraître, sembler, devenir, demeurer, rester, avoir l\'air, passer pour.', { pool: VERBES_ETAT, n: 4 }) },
    { n: 'attribut', qcm: () => qcm('L\'attribut du sujet se trouve après…', 'un verbe d\'état', ['un verbe d\'action', 'une préposition', 'un déterminant'], 'Le ciel devient gris : « gris » est attribut du sujet, après le verbe d\'état « devenir ».') },
  ];
  const TPS_CM = [['nous chantâmes', 'passé simple'], ['il finit (hier)', 'passé simple'], ['ils prirent', 'passé simple'], ['j\'avais chanté', 'plus-que-parfait'], ['elles étaient parties', 'plus-que-parfait'], ['tu chanterais', 'conditionnel présent'], ['nous viendrions', 'conditionnel présent'], ['chantons !', 'impératif présent'], ['je chantais', 'imparfait'], ['vous ferez', 'futur'], ['il a pris', 'passé composé'], ['nous allons', 'présent']];
  const TERM = {
    'futur': [['-ai', '-as', '-a', '-ons', '-ez', '-ont'], 'Futur : -ai, -as, -a, -ons, -ez, -ont, après l\'infinitif (je chanterai).'],
    'imparfait': [['-ais', '-ais', '-ait', '-ions', '-iez', '-aient'], 'Imparfait : -ais, -ais, -ait, -ions, -iez, -aient.'],
    'conditionnel présent': [['-rais', '-rais', '-rait', '-rions', '-riez', '-raient'], 'Conditionnel présent : le r du futur, et les terminaisons de l\'imparfait : -rais, -rais, -rait, -rions, -riez, -raient.'],
    'passé simple du 1er groupe': [['-ai', '-as', '-a', '-âmes', '-âtes', '-èrent'], 'Passé simple du 1er groupe : -ai, -as, -a, -âmes, -âtes, -èrent.'],
    'passé simple en -i (2e groupe et beaucoup du 3e)': [['-is', '-is', '-it', '-îmes', '-îtes', '-irent'], 'Passé simple en i : -is, -is, -it, -îmes, -îtes, -irent.'],
  };
  const lTerm = (nom) => liste(`Écris les terminaisons ${nom.startsWith('passé') ? 'du ' : nom === 'imparfait' ? 'de l\'' : 'du '}${nom}, de « je » à « ils ».`, TERM[nom][0].map((x) => [x, x.replace(/^-/, '')]), TERM[nom][1], { labels: PERS, ordre: true });
  const cm_temps = [
    { n: 'temps', qcm: () => { const x = H(TPS_CM); return qcm(`${g(x[0])} : quel est le temps de ce verbe ?`, x[1], ['passé simple', 'imparfait', 'plus-que-parfait', 'conditionnel présent', 'passé composé', 'futur'].filter((y) => y !== x[1]), `${g(x[0])} : ${x[1]}.`); },
      ecr: () => { const x = H(TPS_CM); return ecr(`${g(x[0])} : quel est le temps de ce verbe ?`, [x[1], x[1].replace(' présent', ''), x[1] === 'futur' ? 'futur simple' : x[1]], `${g(x[0])} : ${x[1]}.`); } },
    { n: 'terminaisons', qcm: () => H([qcm('Au passé simple, avec « ils », un verbe du 1er groupe se termine par…', '-èrent', ['-irent', '-aient', '-ent'], 'Ils chantèrent : -ai, -as, -a, -âmes, -âtes, -èrent.'), qcm('Au conditionnel présent, avec « je », la terminaison est…', '-rais', ['-rai', '-ais', '-ras'], 'Je chanterais : conditionnel = r du futur + terminaison de l\'imparfait.'), qcm('Au passé simple, avec « nous », on écrit…', 'nous chantâmes', ['nous chantames', 'nous chantions', 'nous chanterons'], 'Un accent circonflexe aux deux premières personnes du pluriel : nous chantâmes, vous chantâtes.')]),
      liste: () => lTerm(H(Object.keys(TERM))) },
    { n: 'temps composés', qcm: () => H([qcm('Le plus-que-parfait se forme avec…', 'l\'auxiliaire à l\'imparfait et le participe passé', ['l\'auxiliaire au présent et le participe passé', 'l\'infinitif et la terminaison de l\'imparfait', 'l\'auxiliaire au futur et le participe passé'], 'J\'avais chanté, elle était partie : auxiliaire à l\'imparfait + participe passé.'), qcm('Le passé composé se forme avec…', 'l\'auxiliaire au présent et le participe passé', ['l\'auxiliaire à l\'imparfait et le participe passé', 'un seul mot', 'l\'infinitif'], 'J\'ai chanté, je suis parti : auxiliaire au présent + participe passé.')]),
      liste: () => liste('Le plus-que-parfait se forme avec l\'auxiliaire à l\'… et le …', [['imparfait'], ['participe passé', 'participe']], 'Auxiliaire à l\'imparfait + participe passé : j\'avais chanté.', { labels: ['auxiliaire à l\'', 'et le'], ordre: true }) },
    { n: 'conditionnel', qcm: () => qcm('Le conditionnel présent se forme avec…', 'le radical du futur et les terminaisons de l\'imparfait', ['le radical du présent et les terminaisons du futur', 'l\'auxiliaire et le participe passé'], 'Je chanter-ais : le r du futur, les terminaisons de l\'imparfait.'),
      ecr: () => ecr('Le conditionnel présent prend les terminaisons de quel temps ?', ['imparfait', 'l\'imparfait', 'de l\'imparfait'], 'Les terminaisons de l\'imparfait (-ais, -ait…), après le r du futur.') },
    { n: 'impératif', qcm: () => H([qcm('L\'impératif se conjugue à combien de personnes ?', '3', ['6', '2', '1'], 'Trois personnes, sans sujet : chante, chantons, chantez.'), qcm('À l\'impératif, « chanter » à la 2e personne du singulier s\'écrit…', 'chante', ['chantes', 'chantent', 'chantez'], 'Pas de s à la 2e personne du singulier des verbes en -er : chante !')]),
      liste: () => liste('Conjugue « chanter » à l\'impératif présent.', [['chante'], ['chantons'], ['chantez']], 'Chante, chantons, chantez : trois personnes, sans sujet.', { labels: ['2e sing.', '1re plur.', '2e plur.'], ordre: true }) },
    { n: 'récit au passé', qcm: () => H([qcm('Dans un récit au passé, le passé simple sert à raconter…', 'les actions de premier plan, qui font avancer l\'histoire', ['le décor et les descriptions', 'les habitudes', 'ce qui va arriver'], 'Passé simple : les actions brèves, de premier plan. Imparfait : le décor, les descriptions, les habitudes, l\'arrière-plan.'), qcm('Dans un récit au passé, l\'imparfait sert à…', 'décrire le décor et les habitudes', ['raconter les actions brèves', 'donner un ordre', 'annoncer l\'avenir'], 'Imparfait : l\'arrière-plan (décor, descriptions, habitudes). Passé simple : le premier plan.')]),
      ecr: () => ecr('Dans un récit au passé, quel temps emploie-t-on pour le décor et les descriptions ?', ['imparfait', 'l\'imparfait'], 'L\'imparfait, temps de l\'arrière-plan.') },
    { n: 'modes', qcm: () => qcm('Lequel de ces quatre mots n\'est <strong>pas</strong> un mode ?', 'le passé simple', ['l\'indicatif', 'l\'impératif', 'le conditionnel'], 'Le passé simple est un temps du mode indicatif.'),
      liste: () => liste('Cite les quatre modes personnels.', [['indicatif'], ['subjonctif'], ['conditionnel'], ['impératif']], 'Indicatif, subjonctif, conditionnel, impératif (ils se conjuguent avec des personnes).') },
    { n: 'groupes', qcm: () => qcm('« aller » est un verbe du…', '3e groupe', ['1er groupe', '2e groupe'], '« Aller » se termine par -er mais il est du 3e groupe.'),
      ecr: () => ecr('Comment reconnaît-on un verbe du 2e groupe ?', ['issons', '-issons', 'en -ir'], 'Il se termine par -ir et fait -issons avec « nous » : finir, nous finissons.', { contient: true }) },
  ];
  const cm_phrase = [
    { n: 'phrase verbale ou nominale', qcm: () => H([qcm('« Quelle belle journée ! » est une phrase…', 'nominale', ['verbale'], 'Pas de verbe conjugué : phrase nominale.'), qcm('Une phrase nominale est une phrase…', 'sans verbe conjugué', ['sans nom', 'avec un seul verbe', 'sans point'], 'Défense de fumer. Quelle chance ! : pas de verbe conjugué.')]),
      ecr: () => ecr('Comment appelle-t-on une phrase sans verbe conjugué ?', ['phrase nominale', 'nominale', 'une phrase nominale'], 'Une phrase nominale.') },
    { n: 'types', qcm: () => { const x = H(TYPES); return qcm(`${g(x[0])} : de quel type est cette phrase ?`, x[1], ['déclarative', 'interrogative', 'impérative'].filter((y) => y !== x[1]), `${g(x[0])} : phrase ${x[1]}.`); },
      liste: () => liste('Cite les trois types de phrases.', [['déclarative'], ['interrogative'], ['impérative', 'injonctive']], 'Déclarative, interrogative, impérative.') },
    { n: 'formes', qcm: () => { const x = H(FORMES); return qcm(`${g(x[0])} : quelle est la forme de cette phrase ?`, x[1], ['affirmative', 'négative', 'affirmative et exclamative', 'négative et exclamative'].filter((y) => y !== x[1]), `${g(x[0])} : forme ${x[1]}.`); },
      liste: () => liste('Cite les trois formes de phrases.', [['affirmative'], ['négative'], ['exclamative']], 'Affirmative ou négative, et parfois en plus exclamative.') },
    { n: 'négation', qcm: () => qcm('Dans « Je n\'ai vu personne », les mots de la négation sont…', 'ne… personne', ['ne… pas', 'vu… personne', 'je… ne'], 'La négation a deux mots : ne… personne.'),
      liste: () => liste('Cite quatre négations différentes.', null, 'Ne… pas, ne… plus, ne… jamais, ne… rien, ne… personne, ne… guère, ne… point, ne… aucun.', { pool: ['ne pas', 'ne plus', 'ne jamais', 'ne rien', 'ne personne', 'personne ne', 'ne guère', 'ne point', 'ne aucun', 'aucun ne', 'ne nulle part', 'rien ne'], n: 4 }) },
    { n: 'interrogation', qcm: () => H([qcm('« Viens-tu ? » : on pose la question par…', 'l\'inversion du sujet', ['« est-ce que »', 'l\'intonation seule'], 'Le sujet passe après le verbe, avec un trait d\'union.'), qcm('Laquelle de ces trois questions est la plus soutenue ?', 'Viens-tu ?', ['Tu viens ?', 'Est-ce que tu viens ?'], 'L\'inversion du sujet appartient à la langue soutenue.')]),
      liste: () => liste('Cite les trois façons de poser une question.', [['intonation', 'point d\'interrogation', 'ton de la voix', 'la voix'], ['est-ce que'], ['inversion', 'inversion du sujet', 'sujet inversé']], 'L\'intonation (Tu viens ?), « est-ce que » (Est-ce que tu viens ?), l\'inversion du sujet (Viens-tu ?).') },
    { n: 'phrase simple ou complexe', qcm: () => qcm('Une phrase complexe contient…', 'plusieurs verbes conjugués', ['un seul verbe conjugué', 'aucun verbe', 'beaucoup de mots'], 'Autant de verbes conjugués, autant de propositions : une phrase complexe en a plusieurs.'),
      ecr: () => ecr('Comment compte-t-on les propositions d\'une phrase ?', ['verbes conjugués', 'verbe conjugué', 'les verbes'], 'On compte les verbes conjugués : un verbe conjugué = une proposition.', { contient: true }) },
    { n: 'juxtaposées ou coordonnées', qcm: () => H([qcm('Des propositions juxtaposées sont reliées par…', 'une virgule, un point-virgule ou deux-points', ['une conjonction de coordination', 'un pronom relatif'], 'Il pleut, je reste : propositions juxtaposées.'), qcm('Des propositions coordonnées sont reliées par…', 'une conjonction de coordination', ['une virgule', 'un point'], 'Il pleut, donc je reste : propositions coordonnées par « donc ».')]),
      ecr: () => ecr('« Il pleut mais je sors. » : les deux propositions sont-elles juxtaposées ou coordonnées ?', ['coordonnées'], 'Coordonnées par « mais », une conjonction de coordination.') },
    { n: 'dialogue', qcm: () => qcm('Dans un dialogue, un tiret annonce…', 'qu\'un autre personnage parle', ['la fin du dialogue', 'une question'], 'Chaque tiret : changement de personnage.'),
      liste: () => liste('Quels signes de ponctuation trouve-t-on dans un dialogue ?', [['guillemets'], ['tiret', 'tirets']], 'Les guillemets ouvrent et ferment le dialogue ; un tiret annonce chaque changement de personnage.') },
    { n: 'discours direct ou indirect', qcm: () => H([qcm('« Il dit qu\'il viendra. » : c\'est du discours…', 'indirect', ['direct'], 'Pas de guillemets, les paroles sont rapportées dans une subordonnée introduite par « que ».'), qcm('Au discours direct, les paroles sont…', 'entre guillemets, telles qu\'elles ont été dites', ['rapportées après « que »', 'résumées'], 'Discours direct : les paroles exactes, entre guillemets.')]),
      ecr: () => ecr('Comment appelle-t-on les paroles rapportées exactement, entre guillemets ?', ['discours direct', 'le discours direct', 'direct'], 'Le discours direct.') },
  ];

  /* =========================== 6e – 5e =========================== */
  const c65_mots = [
    { n: 'accord du verbe', qcm: () => H([qcm('« C\'est moi qui … » (chanter, présent)', 'chante', ['chantes', 'chantent', 'chantons'], 'Le pronom relatif « qui » prend la personne de son antécédent « moi » : c\'est moi qui chante.'), qcm('« Léo et Lina … » (jouer, présent)', 'jouent', ['joue', 'jouons'], 'Deux sujets au singulier = un verbe au pluriel.'), qcm('« Toi et moi … » (partir, futur)', 'partirons', ['partirez', 'partiront'], 'Toi et moi = nous : nous partirons.'), qcm('« Les enfants, le maître les … » (appeler, présent)', 'appelle', ['appellent', 'appelles'], 'Le sujet est « le maître », pas « les » ni « les enfants » : il appelle.')]),
      ecr: () => ecr('Quand un verbe a deux sujets au singulier, à quel nombre se met-il ?', ['pluriel', 'au pluriel'], 'Au pluriel : Léo et Lina jouent.') },
    { n: 'participe passé', qcm: () => H([qcm('Avec être, le participe passé s\'accorde avec…', 'le sujet', ['le COD', 'rien'], 'Elles sont venues.'), qcm('Avec avoir, le participe passé s\'accorde avec…', 'le COD, s\'il est placé avant le verbe', ['le sujet', 'le COD, toujours', 'rien, jamais'], 'Les fleurs que j\'ai cueillies : le COD « que » (= les fleurs) est placé avant.'), qcm('« Les pommes qu\'il a … » (manger)', 'mangées', ['mangé', 'mangés', 'manger'], 'COD « qu\' » (= les pommes, féminin pluriel) placé avant : mangées.')]),
      liste: () => liste('Le participe passé employé avec avoir s\'accorde avec le … s\'il est placé … le verbe.', [['COD', 'complément d\'objet direct', 'cod'], ['avant']], 'Avec le COD placé avant le verbe : les lettres que j\'ai écrites.', { labels: ['avec le', 'placé'], ordre: true }) },
    { n: 'accord de l\'adjectif', qcm: () => H([qcm('« des robes … » (orange)', 'orange', ['oranges'], 'Un adjectif de couleur qui vient d\'un nom (orange, marron, cerise) reste invariable.'), qcm('« des yeux … » (bleu clair)', 'bleu clair', ['bleus clairs', 'bleus clair'], 'Un adjectif de couleur composé reste invariable.'), qcm('« une … heure » (demi)', 'demi-', ['demie'], 'Devant le nom, « demi » est invariable et suivi d\'un trait d\'union : une demi-heure.')]),
      ecr: () => ecr('Un adjectif de couleur qui vient d\'un nom (orange, marron) s\'accorde-t-il ?', ['non'], 'Non : il reste invariable (des chaussures marron).') },
    ...cm_mots.filter((e) => ['natures variables', 'natures invariables', 'sujet', 'verbes d\'état'].includes(e.n)),
  ];
  const c65_temps = [
    { n: 'futur antérieur', qcm: () => H([qcm('Le futur antérieur se forme avec…', 'l\'auxiliaire au futur et le participe passé', ['l\'auxiliaire au présent et le participe passé', 'le radical du futur et les terminaisons de l\'imparfait'], 'J\'aurai fini, elle sera partie.'), qcm('Le futur antérieur exprime une action…', 'terminée avant une autre action future', ['qui dure dans le passé', 'qui se passe maintenant'], 'Quand tu auras fini, tu sortiras : « auras fini » a lieu avant « sortiras ».')]),
      ecr: () => ecr('« Quand j\'aurai fini » : à quel temps est ce verbe ?', ['futur antérieur'], 'Auxiliaire au futur + participe passé : futur antérieur.') },
    { n: 'subjonctif', qcm: () => H([qcm('Après « il faut que », on emploie…', 'le subjonctif', ['l\'indicatif', 'le conditionnel', 'l\'impératif'], 'Il faut que tu viennes.'), qcm('« Il faut que nous … » (chanter)', 'chantions', ['chantons', 'chanterons'], 'Subjonctif présent : -e, -es, -e, -ions, -iez, -ent.')]),
      liste: () => liste('Écris les terminaisons du subjonctif présent, de « je » à « ils ».', term(['-e', '-es', '-e', '-ions', '-iez', '-ent']), 'Subjonctif présent : -e, -es, -e, -ions, -iez, -ent (que je chante, que nous chantions).', { labels: PERS, ordre: true }) },
    { n: 'conditionnel', qcm: () => qcm('« Pourriez-vous m\'aider ? » : le conditionnel exprime ici…', 'la politesse', ['l\'hypothèse', 'un ordre', 'le futur'], 'Le conditionnel sert à la politesse, à l\'hypothèse (Si j\'avais le temps, je viendrais), au souhait, et au futur dans le passé (Il disait qu\'il viendrait).'),
      liste: () => liste('Cite deux emplois du conditionnel.', null, 'Hypothèse, politesse, souhait, information incertaine, futur dans le passé.', { pool: ['hypothèse', 'politesse', 'souhait', 'désir', 'information incertaine', 'incertitude', 'futur dans le passé', 'condition', 'imaginaire', 'conseil'], n: 2 }) },
    { n: 'passé simple', qcm: () => qcm('« Ils … » (venir, passé simple)', 'vinrent', ['venirent', 'venèrent', 'venaient'], 'Venir au passé simple : je vins, ils vinrent (passé simple en -in).'),
      liste: () => lTerm(H(['passé simple du 1er groupe', 'passé simple en -i (2e groupe et beaucoup du 3e)'])) },
    { n: 'modes', liste: () => H([liste('Cite les quatre modes personnels.', [['indicatif'], ['subjonctif'], ['conditionnel'], ['impératif']], 'Indicatif, subjonctif, conditionnel, impératif.'), liste('Cite les modes impersonnels (qui ne se conjuguent pas avec des personnes).', [['infinitif'], ['participe'], ['gérondif']], 'Infinitif, participe, gérondif.')]),
      qcm: () => qcm('« En chantant » est au…', 'gérondif', ['participe passé', 'infinitif', 'présent'], 'En + participe présent : le gérondif.') },
    ...cm_temps.filter((e) => ['temps', 'temps composés', 'récit au passé'].includes(e.n)),
  ];
  const c65_phrase = [
    { n: 'discours indirect', qcm: () => H([qcm('Au discours indirect, « Je viendrai demain », dit-il, devient…', 'Il dit qu\'il viendra le lendemain.', ['Il dit qu\'il viendrai demain.', 'Il dit : je viendrai demain.'], 'Il dit QU\'il viendra : le pronom, le temps et l\'adverbe changent ; dans un récit au passé : il dit qu\'il viendrait le lendemain.'), qcm('« Viens-tu ? » demande-t-il. → Il demande…', 'si je viens.', ['que je viens.', 'viens-tu.'], 'Une question totale rapportée commence par « si ».')]),
      liste: () => liste('Dans un récit au passé, au discours indirect, le présent devient l\'… et le futur devient le …', [['imparfait'], ['conditionnel', 'conditionnel présent']], 'Il dit : « Je pars. » → Il dit qu\'il partait ; « Je partirai » → qu\'il partirait.', { labels: ['présent →', 'futur →'], ordre: true }) },
    { n: 'verbes introducteurs', qcm: () => qcm('Lequel de ces quatre verbes introduit des paroles ?', H(['murmurer', 'répondre', 'demander', 's\'écrier']), ['courir', 'manger', 'dormir'], 'Dire, demander, répondre, s\'écrier, murmurer… introduisent les paroles.'),
      liste: () => liste('Cite quatre verbes de parole (qui introduisent un dialogue).', null, 'Dire, demander, répondre, s\'écrier, murmurer, crier, ajouter, répliquer, chuchoter, déclarer, affirmer, s\'exclamer, questionner…', { pool: ['dire', 'demander', 'répondre', 's\'écrier', 'murmurer', 'crier', 'ajouter', 'répliquer', 'chuchoter', 'déclarer', 'affirmer', 's\'exclamer', 'questionner', 'hurler', 'expliquer', 'raconter', 'annoncer', 'interroger', 'rétorquer', 'bégayer', 'soupirer', 'ordonner', 'supplier'], n: 4 }) },
    ...cm_phrase.filter((e) => ['types', 'formes', 'interrogation', 'négation', 'phrase simple ou complexe', 'discours direct ou indirect'].includes(e.n)),
  ];

  /* =========================== 4e – 3e =========================== */
  const FCT = [['Le chat <u>mange</u> une souris.', 'mange'], ['Le chat mange <u>une souris</u>.', 'COD'], ['Je parle <u>à mon frère</u>.', 'COI'], ['Je donne un livre <u>à Léo</u>.', 'COS'], ['Le ciel devient <u>gris</u>.', 'attribut du sujet'], ['<u>Demain</u>, nous partirons.', 'complément circonstanciel de temps'], ['Il travaille <u>dans le jardin</u>.', 'complément circonstanciel de lieu'], ['La maison <u>de mon oncle</u> est grande.', 'complément du nom'], ['Un <u>petit</u> chat dort.', 'épithète'], ['<u>Fatigué</u>, Léo s\'endort.', 'apposé'], ['Il marche <u>lentement</u>.', 'complément circonstanciel de manière'], ['La souris est mangée <u>par le chat</u>.', 'complément d\'agent']].filter((x) => x[1] !== 'mange');
  const c43_mots = [
    { n: 'fonctions', qcm: () => { const x = H(FCT); return qcm(`${x[0]} Quelle est la fonction du groupe souligné ?`, x[1], ['COD', 'COI', 'COS', 'attribut du sujet', 'complément du nom', 'épithète', 'complément circonstanciel de lieu', 'complément d\'agent'].filter((y) => y !== x[1]), `Fonction : ${x[1]}.`); },
      ecr: () => { const x = H(FCT); return ecr(`${x[0]} Quelle est la fonction du groupe souligné ?`, [x[1], x[1].replace('complément d\'objet ', ''), x[1] === 'COD' ? 'complément d\'objet direct' : x[1] === 'COI' ? 'complément d\'objet indirect' : x[1] === 'COS' ? 'complément d\'objet second' : x[1]], `Fonction : ${x[1]}.`); } },
    { n: 'trouver les fonctions', qcm: () => H([qcm('Pour trouver le COD, on pose après le verbe la question…', '« qui ? » ou « quoi ? »', ['« à qui ? » ou « à quoi ? »', '« où ? »', '« qui est-ce qui ? »'], 'Il mange quoi ? une souris : COD.'), qcm('Pour trouver le COI, on pose la question…', '« à qui ? », « à quoi ? », « de qui ? », « de quoi ? »', ['« qui ? » ou « quoi ? »', '« quand ? »'], 'Je parle à qui ? à mon frère : COI.'), qcm('Un complément circonstanciel, en général, on peut…', 'le déplacer ou le supprimer', ['ni le déplacer ni le supprimer', 'seulement le déplacer'], 'Les compléments circonstanciels sont souvent déplaçables et supprimables, contrairement aux COD et COI.')]),
      liste: () => liste('Quelles questions pose-t-on pour trouver chacune de ces fonctions ?', [['qui est-ce qui', 'qu\'est-ce qui'], ['qui', 'quoi', 'qui quoi', 'qui ou quoi'], ['à qui', 'à quoi', 'de qui', 'de quoi', 'à qui à quoi', 'à qui ou à quoi']], 'Sujet : « qui est-ce qui + verbe ? » ; COD : « verbe + qui ? quoi ? » ; COI : « verbe + à qui ? à quoi ? de qui ? de quoi ? ».', { labels: ['sujet', 'COD', 'COI'], ordre: true, contient: true }) },
    { n: 'compléments circonstanciels', liste: () => liste('Cite quatre sortes de compléments circonstanciels.', null, 'Lieu, temps, manière, cause, but, conséquence, moyen, accompagnement, condition, opposition…', { pool: ['lieu', 'temps', 'manière', 'cause', 'but', 'conséquence', 'moyen', 'accompagnement', 'condition', 'opposition', 'concession', 'comparaison', 'instrument'], n: 4 }),
      qcm: () => qcm('« Il est resté chez lui à cause de la pluie. » : « à cause de la pluie » est complément circonstanciel de…', 'cause', ['but', 'lieu', 'manière'], 'Pourquoi ? à cause de la pluie : cause.') },
    { n: 'déterminants', liste: () => liste('Cite les sortes de déterminants.', [['article défini'], ['article indéfini'], ['déterminant possessif', 'possessif'], ['déterminant démonstratif', 'démonstratif'], ['déterminant numéral', 'numéral', 'cardinal'], ['déterminant indéfini', 'indéfini'], ['déterminant interrogatif', 'interrogatif', 'exclamatif', 'interrogatif exclamatif']], 'Articles défini et indéfini (et partitif), déterminants possessif, démonstratif, numéral, indéfini, interrogatif ou exclamatif.'),
      qcm: () => qcm('« Chaque élève a son livre. » : « chaque » est…', 'un déterminant indéfini', ['un article indéfini', 'un pronom indéfini', 'un déterminant numéral'], 'Chaque, plusieurs, quelques, aucun… devant un nom : déterminants indéfinis.') },
    { n: 'pronoms', liste: () => liste('Cite les sortes de pronoms.', [['pronom personnel', 'personnel'], ['pronom possessif', 'possessif'], ['pronom démonstratif', 'démonstratif'], ['pronom indéfini', 'indéfini'], ['pronom interrogatif', 'interrogatif'], ['pronom relatif', 'relatif']], 'Pronoms personnel, possessif (le mien), démonstratif (celui-ci), indéfini (chacun), interrogatif (qui ?), relatif (qui, que, dont, où).'),
      qcm: () => qcm('« Le livre dont je parle » : « dont » est…', 'un pronom relatif', ['une conjonction de subordination', 'un pronom interrogatif', 'une préposition'], 'Qui, que, quoi, dont, où, lequel… : pronoms relatifs, ils reprennent un antécédent (le livre).') },
    ...cm_mots.filter((e) => ['natures variables', 'natures invariables', 'conjonctions de coordination', 'verbes d\'état'].includes(e.n)),
  ];
  const c43_temps = [
    { n: 'valeurs du présent', qcm: () => H([qcm('« La Terre tourne autour du Soleil. » : présent…', 'de vérité générale', ['d\'énonciation', 'de narration', 'd\'habitude'], 'Ce qui est vrai tout le temps : présent de vérité générale.'), qcm('« Tous les matins, je me lève à sept heures. » : présent…', 'd\'habitude', ['de vérité générale', 'de narration', 'd\'énonciation'], 'Une action qui se répète : présent d\'habitude.'), qcm('« En 1515, François Ier remporte la bataille de Marignan. » : présent…', 'de narration', ['d\'énonciation', 'd\'habitude', 'de vérité générale'], 'Un fait passé raconté au présent pour le rendre vivant : présent de narration.')]),
      liste: () => liste('Cite quatre valeurs du présent de l\'indicatif.', null, 'Présent d\'énonciation (ce qui se passe au moment où l\'on parle), de vérité générale, d\'habitude, de narration, et présent à valeur de passé proche ou de futur proche.', { pool: ['énonciation', 'vérité générale', 'habitude', 'narration', 'passé proche', 'futur proche', 'répétition', 'actuel', 'description'], n: 4 }) },
    { n: 'système du passé', qcm: () => qcm('Dans un récit au système du passé, quel temps remplace le futur pour une action à venir ?', 'le conditionnel présent', ['le futur antérieur', 'le passé simple', 'l\'imparfait'], 'Il savait qu\'il reviendrait : futur dans le passé, au conditionnel.'),
      liste: () => liste('Dans un récit au système du passé, quels sont les deux temps principaux ?', [['passé simple'], ['imparfait']], 'Le passé simple (premier plan) et l\'imparfait (arrière-plan) ; le plus-que-parfait marque l\'antériorité.') },
    { n: 'antériorité', qcm: () => qcm('Au système du passé, une action antérieure se met au…', 'plus-que-parfait', ['futur antérieur', 'passé composé', 'présent'], 'Il retrouva la montre qu\'il avait perdue : l\'action « avait perdue » a eu lieu avant.'),
      ecr: () => ecr('Quel temps composé correspond à l\'imparfait (auxiliaire à l\'imparfait) ?', ['plus-que-parfait'], 'Auxiliaire à l\'imparfait + participe passé = plus-que-parfait.') },
    { n: 'temps composés', liste: () => liste('À chaque temps simple correspond un temps composé. Donne le temps composé correspondant.', [['passé composé'], ['plus-que-parfait'], ['passé antérieur'], ['futur antérieur'], ['conditionnel passé', 'passé du conditionnel']], 'Présent → passé composé ; imparfait → plus-que-parfait ; passé simple → passé antérieur ; futur → futur antérieur ; conditionnel présent → conditionnel passé.', { labels: ['présent →', 'imparfait →', 'passé simple →', 'futur →', 'conditionnel présent →'], ordre: true }),
      qcm: () => qcm('« Quand il eut fini, il sortit. » : « eut fini » est au…', 'passé antérieur', ['plus-que-parfait', 'passé composé', 'futur antérieur'], 'Auxiliaire au passé simple + participe passé : passé antérieur.') },
    ...c65_temps.filter((e) => ['modes', 'subjonctif', 'conditionnel'].includes(e.n)),
  ];
  const c43_phrase = [
    { n: 'propositions', qcm: () => H([qcm('Une proposition subordonnée…', 'dépend d\'une proposition principale', ['peut toujours être seule', 'n\'a jamais de verbe'], 'Je sais que tu viendras : « que tu viendras » dépend de « je sais ».'), qcm('« Le livre que je lis est passionnant. » : « que je lis » est une proposition subordonnée…', 'relative', ['conjonctive complétive', 'circonstancielle', 'indépendante'], 'Introduite par le pronom relatif « que », elle complète le nom « livre ».')]),
      liste: () => liste('Cite les trois façons de relier des propositions.', [['juxtaposition', 'juxtaposées'], ['coordination', 'coordonnées'], ['subordination', 'subordonnées']], 'Juxtaposition (ponctuation), coordination (conjonction de coordination), subordination (une proposition dépend d\'une autre).') },
    { n: 'subordonnées', liste: () => liste('Cite les trois sortes de propositions subordonnées.', [['relative'], ['conjonctive', 'complétive', 'conjonctive complétive'], ['circonstancielle', 'conjonctive circonstancielle']], 'Relative (introduite par un pronom relatif), conjonctive complétive (introduite par « que »), circonstancielle (quand, parce que, pour que…).'),
      qcm: () => qcm('« Je sortirai quand il fera beau. » : « quand il fera beau » est une subordonnée…', 'circonstancielle de temps', ['relative', 'complétive', 'circonstancielle de cause'], 'Introduite par la conjonction de subordination « quand » : complément circonstanciel de temps.') },
    { n: 'voix passive', qcm: () => H([qcm('« La souris est mangée par le chat. » : la phrase est à la voix…', 'passive', ['active'], 'Le sujet « la souris » subit l\'action ; « par le chat » est complément d\'agent.'), qcm('À la voix passive, le sujet de la phrase active devient…', 'complément d\'agent', ['COD', 'attribut du sujet', 'complément circonstanciel'], 'Le chat mange la souris → La souris est mangée par le chat.')]),
      ecr: () => ecr('Quelle est la fonction de « par le chat » dans « La souris est mangée par le chat » ?', ['complément d\'agent'], 'Complément d\'agent (il fait l\'action).') },
    { n: 'transformations', qcm: () => qcm('Transformer une phrase active en phrase passive : le COD devient…', 'le sujet', ['le complément d\'agent', 'l\'attribut'], 'Le chat mange la souris → La souris (sujet) est mangée par le chat.') },
    ...c65_phrase.filter((e) => ['discours indirect', 'types', 'formes', 'interrogation', 'négation'].includes(e.n)),
  ];

  const BANQUES = { 'ce-mots': ce_mots, 'ce-temps': ce_temps, 'ce-phrase': ce_phrase, 'cm-mots': cm_mots, 'cm-temps': cm_temps, 'cm-phrase': cm_phrase, '65-mots': c65_mots, '65-temps': c65_temps, '65-phrase': c65_phrase, '43-mots': c43_mots, '43-temps': c43_temps, '43-phrase': c43_phrase };
  const NB = [8, 12, 20];

  /* le tirage : on prend chaque notion à tour de rôle, dans un ordre au hasard, et la forme de la question selon le niveau */
  function tirage(cle, niv) {
    const B = BANQUES[cle] || [], N = NB[niv], out = [], vus = new Set();
    const forme = (e) => {
      const f = niv === 0 ? ['qcm'] : niv === 1 ? (Math.random() < 0.5 ? ['ecr', 'qcm', 'liste'] : ['qcm', 'liste', 'ecr']) : ['liste', 'ecr', 'qcm'];
      if (niv === 1 && e.liste && Math.random() < 0.3) return e.liste;
      if (niv === 2 && e.liste && e.ecr && Math.random() < 0.5) return e.ecr;
      for (const k of f) if (e[k]) return e[k];
      return e.qcm || e.ecr || e.liste;
    };
    for (let tour = 0; out.length < N && tour < 20; tour++) {
      for (const e of melange(B)) {
        if (out.length >= N) break;
        if (niv === 0 && !e.qcm) continue;
        const autres = ['liste', 'ecr', 'qcm'].filter((k) => e[k] && (niv > 0 || k === 'qcm'));
        for (let essai = 0; essai < 12; essai++) { const it = (essai < 4 ? forme(e) : e[autres[essai % autres.length]])(); if (!vus.has(it.q)) { vus.add(it.q); out.push({ ...it, notion: e.n }); break; } }
      }
    }
    return out;
  }

  /* ---------- la comparaison des réponses écrites ---------- */
  const sansAccents = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  const norme = (s) => String(s || '').toLowerCase().replace(/[’`]/g, '\'').replace(/[«»"“”.!?;:,…()—–]/g, ' ').replace(/^\s*-\s*/, '-').replace(/\s+/g, ' ').trim()
    .replace(/^(un|une|le|la|l'|les|des|c'est|c est|ce sont|il faut|par)\s+/, '').replace(/^(un|une|le|la|l'|les|des)\s+/, '').trim();
  /* l'ancienne terminologie reste acceptée : adjectif possessif, article possessif, adjectif démonstratif, adjectif indéfini */
  const ANCIENS = { 'déterminant possessif': ['adjectif possessif', 'article possessif'], 'déterminant démonstratif': ['adjectif démonstratif'], 'déterminant indéfini': ['adjectif indéfini'], 'possessif': ['adjectif possessif', 'article possessif'], 'démonstratif': ['adjectif démonstratif'], 'indéfini': ['adjectif indéfini'] };
  function compare(ecrit, rep, contient) {
    const a = norme(ecrit), L = [...new Set(rep.flatMap((r) => [r, ...(ANCIENS[r] || [])]))].map(norme);
    if (!a) return 0;
    if (L.includes(a) || (contient && L.some((r) => a.includes(r)))) return 2;
    if (L.map(sansAccents).includes(sansAccents(a)) || (contient && L.some((r) => sansAccents(a).includes(sansAccents(r))))) return 1;   /* juste, mais attention aux accents */
    return 0;
  }

  /* ---------- le jeu ---------- */
  const qz = { items: [], i: 0, rep: null };
  window.QZ_TEXTES = (cle) => ['facile', 'moyen', 'difficile'].map((n, k) => ({ titre: `Quiz ${n}`, texte: '', niv: k, nb: NB[k], cle }));
  const QZ = () => qz.items[qz.i];
  window.showQuestionQZ = function () {
    const L = window.QZ_TEXTES(currentGame.qz), T = L[game.questions[0].t];
    if (!qz.items.length || qz.cle !== `${currentGame.qz}|${T.niv}|${game.questions[0].nonce}`) { qz.items = tirage(currentGame.qz, T.niv); qz.i = 0; qz.cle = `${currentGame.qz}|${T.niv}|${game.questions[0].nonce}`; }
    currentGame.total = qz.items.length;
    game.score = game.score || 0;
    $('nat-progress-label').textContent = `${T.titre} — question ${qz.i + 1} sur ${qz.items.length}`;
    $('nat-score-label').textContent = scoreLabel(game.score);
    $('nat-progress-bar').style.width = `${(qz.i / qz.items.length) * 100}%`;
    $('nat-character-stage').innerHTML = '';
    $('nat-correction').classList.add('hidden');
    $('nat-verdict-square').className = 'verdict-square';
    $('nat-buttons-invariables').innerHTML = '';
    qz.rep = null;
    const it = QZ();
    $('nat-sentence').innerHTML = `<div class="tm-cadre qz-cadre"><h3 class="tm-titre">${esc(T.titre)} · question ${qz.i + 1}</h3><div class="qz-q">${nbspFr(it.q)}</div></div>`;
    $('nat-listen-button').textContent = '🔊 Relire la question';
    panneauQZ();
    dis(it.q.replace(/<[^>]+>/g, '').replace(/…/g, ', '));
  };
  function panneauQZ() {
    const it = QZ(), r = qz.rep;
    $('nat-instruction').textContent = it.t === 'qcm' ? 'Choisis la bonne réponse' : it.t === 'ecr' ? 'Écris ta réponse' : `Écris ${it.n} réponse${it.n > 1 ? 's' : ''}`;
    let h = '';
    if (it.t === 'qcm') h = `<div class="carte verte active libre"><div class="carte-choix carte-choix-${it.choix.length > 2 ? 2 : 2}">${it.choix.map((c) => `<button type="button" class="nature-button qz-choix${r ? (c === it.bon ? ` correct${it.bonRouge ? ' rouge' : ''}` : c === r.ecrit ? ' wrong' : ' faded') : ''}" data-c="${esc(c)}"${r ? ' disabled' : ''}>${esc(c)}</button>`).join('')}</div></div>`;
    else if (it.t === 'ecr') h = `<div class="carte verte active libre"><form class="tf-form qz-form" autocomplete="off"><input type="text" class="tf-input" id="qz-in" autocapitalize="off" spellcheck="false" placeholder="écris ici…"${r ? ` value="${esc(r.ecrit)}" disabled` : ''}>${r ? '' : '<button type="submit" class="primary-button tf-ok">Valider</button>'}</form></div>`;
    else h = `<div class="carte verte active libre"><form class="qz-form qz-liste" autocomplete="off">${Array.from({ length: it.n }, (x, k) => `<label class="qz-ligne">${it.labels ? `<span class="qz-lab">${esc(it.labels[k])}</span>` : `<span class="qz-lab">${k + 1}.</span>`}<input type="text" class="tf-input qz-in" data-k="${k}" autocapitalize="off" spellcheck="false"${r ? ` value="${esc(r.ecrits[k] || '')}" disabled` : ''}>${r ? `<span class="qz-ok ${r.ok[k] ? 'oui' : 'non'}">${r.ok[k] ? '✔' : '✗'}</span>` : ''}</label>`).join('')}${r ? '' : '<button type="submit" class="primary-button tf-ok">Valider</button>'}</form></div>`;
    if (r) {
      const pts = Math.round(r.pts * 100) / 100;
      h += `<p class="tf-retour ${pts === 1 ? 'juste' : pts ? 'moitie' : 'faux'}">${pts === 1 ? '✔ C\'est juste !' : pts ? `Une partie seulement est juste : ${fmtPts(pts)} point.` : 'Ce n\'est pas juste.'}${r.accents ? ' Attention aux accents.' : ''}</p>`;
      if (pts < 1 && it.t !== 'liste') h += `<p class="sous">La bonne réponse : <strong>${esc(it.t === 'qcm' ? it.bon : it.rep[0])}</strong></p>`;
      h += `<p class="sous tf-nuance">${nbspFr(it.expl)}</p><button type="button" class="primary-button qz-suite">${qz.i + 1 < qz.items.length ? 'Question suivante →' : 'Voir mon bilan →'}</button>`;
    }
    $('nat-buttons-variables').innerHTML = nbspFr(h);
    document.querySelectorAll('.qz-choix').forEach((b) => b.addEventListener('click', () => repondQZ(b.dataset.c)));
    const f = document.querySelector('.qz-form');
    if (f && !r) { f.addEventListener('submit', (ev) => { ev.preventDefault(); repondQZ(it.t === 'liste' ? [...f.querySelectorAll('.qz-in')].map((x) => x.value) : $('qz-in').value); }); setTimeout(() => f.querySelector('input')?.focus(), 60); }
    document.querySelector('.qz-suite')?.addEventListener('click', suiteQZ);
  }
  function repondQZ(v) {
    const it = QZ(); if (qz.rep) return;
    let pts = 0, accents = false, r;
    if (it.t === 'qcm') { pts = v === it.bon ? 1 : 0; r = { ecrit: v }; }
    else if (it.t === 'ecr') { const c = compare(v, it.rep, it.contient); pts = c ? 1 : 0; accents = c === 1; r = { ecrit: v }; }
    else {
      const ok = [], pris = new Set();
      v.forEach((x, k) => {
        let c = 0;
        if (it.pool) { const a = norme(x); if (a && !pris.has(sansAccents(a)) && it.pool.map((p) => sansAccents(norme(p))).includes(sansAccents(a))) { c = 1; pris.add(sansAccents(a)); } }
        else if (it.ordre) c = compare(x, it.rep[k]);
        else { const j = it.rep.findIndex((syn, jj) => !pris.has(jj) && compare(x, syn)); if (j >= 0) { c = compare(x, it.rep[j]); pris.add(j); } }
        if (c === 1) accents = true;
        ok.push(!!c);
      });
      pts = ok.filter(Boolean).length / it.n; r = { ecrits: v, ok };
    }
    qz.rep = { ...r, pts, accents };
    game.score = Math.round((game.score + pts) * 100) / 100;
    if (pts < 1) game.erreurs.push({ mot: it.notion, bonne: it.t === 'qcm' ? it.bon : it.t === 'ecr' ? it.rep[0] : it.expl, choisie: Array.isArray(v) ? v.filter(Boolean).join(', ') || '(rien)' : v || '(rien)', phrase: it.q.replace(/<[^>]+>/g, '') });
    const pn = game.parNature[it.notion] || (game.parNature[it.notion] = { c: 0, p: 0 }); pn.p += 1; if (pts === 1) pn.c += 1;
    $('nat-score-label').textContent = scoreLabel(game.score);
    $('nat-verdict-square').className = `verdict-square ${pts === 1 ? 'correct' : pts ? 'half' : 'wrong'}`;
    panneauQZ();
    dis(pts === 1 ? 'C\'est juste !' : pts ? 'Une partie seulement est juste.' : 'Ce n\'est pas juste.', it.expl.replace(/<[^>]+>/g, ''));
  }
  function suiteQZ() {
    if (qz.i + 1 < qz.items.length) { qz.i += 1; showQuestionQZ(); return; }
    finQZ();
  }
  function finQZ() {
    boutonVoix(true);
    $('nat-progress-bar').style.width = '100%';
    $('nat-buttons-variables').innerHTML = '';
    $('nat-instruction').textContent = 'C\'est fini !';
    const total = qz.items.length, s = game.score;
    const rates = [...new Set(game.erreurs.map((e) => e.mot))];
    $('nat-correction-details').innerHTML = nbspFr(`Tu as ${fmtPts(s)} point${s >= 2 ? 's' : ''} sur ${total}. ${rates.length ? `À revoir dans ta leçon : <strong>${rates.map(esc).join('</strong>, <strong>')}</strong>. Refais le quiz : les questions changent à chaque fois.` : 'Tu connais ton cours par cœur. Bravo !'}`);
    const T = window.QZ_TEXTES(currentGame.qz)[game.questions[0].t];
    $('nat-sentence').innerHTML = `<div class="tm-cadre qz-cadre"><h3 class="tm-titre">${esc(T.titre)} : c'est fini !</h3><div class="qz-q">${fmtPts(s)} point${s >= 2 ? 's' : ''} sur ${total}${rates.length ? `<br><span class="qz-revoir">À revoir : ${rates.map(esc).join(', ')}</span>` : ''}</div></div>`;
    $('nat-listen-button').textContent = '🔊 Relire';
    $('nat-correction').classList.remove('hidden');
    $('nat-verdict-square').className = `verdict-square ${s >= total - 0.05 ? 'correct' : s < total / 2 ? 'wrong' : 'half'}`;
    $('nat-next-button').textContent = 'Voir mon résultat →';
    showCharacter(s >= total / 2 ? 'good' : 'bad', null);
  }
  window.MNEMO_QUIZ = { tirage, BANQUES, compare };
})();
