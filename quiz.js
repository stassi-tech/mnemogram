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
  const DET = { le: 'article défini', la: 'article défini', les: 'article défini', un: 'article indéfini', une: 'article indéfini', des: 'article indéfini', mon: 'déterminant possessif', ta: 'déterminant possessif', ses: 'déterminant possessif', notre: 'déterminant possessif', leur: 'déterminant possessif', ce: 'déterminant démonstratif', cette: 'déterminant démonstratif', ces: 'déterminant démonstratif' };
  const EXPL_NAT = { 'nom commun': 'on peut mettre un déterminant devant lui (le, un…)', 'nom propre': 'il désigne une personne ou un lieu unique et commence par une majuscule', 'déterminant': 'c\'est le petit mot placé devant le nom', 'adjectif qualificatif': 'il dit comment est le nom', 'verbe': 'il change si l\'on dit « hier » ou « demain »', 'pronom': 'il remplace un nom' };
  const PHR_SV = [
    { s: 'Le petit chat dort.', v: 'dort', suj: 'chat', n: 'nom commun' }, { s: 'Ma sœur chante une chanson.', v: 'chante', suj: 'sœur', n: 'nom commun' },
    { s: 'Dans le jardin, Léo joue.', v: 'joue', suj: 'Léo', n: 'nom propre' }, { s: 'Nous mangeons des crêpes.', v: 'mangeons', suj: 'nous', n: 'pronom personnel' },
    { s: 'Les oiseaux volent haut.', v: 'volent', suj: 'oiseaux', n: 'nom commun' }, { s: 'Le soir, papa lit une histoire.', v: 'lit', suj: 'papa', n: 'nom commun' },
    { s: 'Lina regarde la mer.', v: 'regarde', suj: 'Lina', n: 'nom propre' }, { s: 'Le vieux chien aboie.', v: 'aboie', suj: 'chien', n: 'nom commun' },
    { s: 'Ils jouent au ballon.', v: 'jouent', suj: 'ils', n: 'pronom personnel' }];
  const GN_GN = [['une fleur', 'féminin', 'singulier'], ['les chats', 'masculin', 'pluriel'], ['des oiseaux', 'masculin', 'pluriel'], ['le cartable', 'masculin', 'singulier'], ['ces pommes', 'féminin', 'pluriel'], ['ma maison', 'féminin', 'singulier'], ['mon livre', 'masculin', 'singulier'], ['des voitures', 'féminin', 'pluriel']];
  const ce_mots = [
    { n: 'nature', qcm: () => { const nat = H(Object.keys(NAT)), m = H(NAT[nat]); return qcm(`${g(m)} est…`, nat === 'pronom' ? 'un pronom' : nat === 'adjectif qualificatif' ? 'un adjectif qualificatif' : `un ${nat}`, Object.keys(NAT).filter((x) => x !== nat).map((x) => (x === 'pronom' ? 'un pronom' : `un ${x}`)), `${g(m)} : ${EXPL_NAT[nat]}.`); },
      ecr: () => { const nat = H(Object.keys(NAT)), m = H(NAT[nat]); return ecr(`Quelle est la nature de ${g(m)} ?`, nat === 'déterminant' ? ['déterminant', DET[m]] : nat === 'pronom' ? ['pronom', 'pronom personnel'] : [nat], `${g(m)} est un ${nat === 'déterminant' ? DET[m] : nat === 'pronom' ? 'pronom personnel' : nat} : ${EXPL_NAT[nat]}.`); } },
    { n: 'déterminants', qcm: () => { const m = H(Object.keys(DET)); return qcm(`${g(m)} est…`, `un ${DET[m]}`, ['un article défini', 'un article indéfini', 'un déterminant possessif', 'un déterminant démonstratif'].filter((x) => x !== `un ${DET[m]}`), `${g(m)} est un ${DET[m]}.`); },
      ecr: () => { const m = H(Object.keys(DET)); return ecr(`Quelle est la nature exacte du déterminant ${g(m)} ?`, [DET[m]], `${g(m)} est un ${DET[m]}. Articles définis : le, la, les ; indéfinis : un, une, des ; possessifs : mon, ta, ses… ; démonstratifs : ce, cette, ces.`); },
      liste: () => H([liste('Cite les trois articles définis.', [['le'], ['la', 'l\''], ['les']], 'Les articles définis : le, la, l\', les.'), liste('Cite les trois articles indéfinis.', [['un'], ['une'], ['des']], 'Les articles indéfinis : un, une, des.'), liste('Cite trois déterminants possessifs.', null, 'Les déterminants possessifs disent à qui est la chose : mon, ton, son, ma, ta, sa, mes, tes, ses, notre, votre, leur, nos, vos, leurs.', { pool: ['mon', 'ton', 'son', 'ma', 'ta', 'sa', 'mes', 'tes', 'ses', 'notre', 'votre', 'leur', 'nos', 'vos', 'leurs'], n: 3 }), liste('Cite les trois déterminants démonstratifs.', [['ce', 'cet'], ['cette'], ['ces']], 'Les déterminants démonstratifs montrent : ce (cet), cette, ces.')]) },
    { n: 'natures', qcm: () => qcm('Lequel n\'est <strong>pas</strong> une nature de mot ?', 'sujet', ['nom commun', 'verbe', 'déterminant', 'adjectif qualificatif', 'pronom'], '« Sujet » est une fonction, pas une nature : la nature dit ce qu\'est un mot, la fonction dit le rôle qu\'il joue dans la phrase.'),
      liste: () => liste('Cite les six natures de mots que tu as apprises.', [['nom commun'], ['nom propre'], ['déterminant'], ['adjectif qualificatif', 'adjectif'], ['verbe'], ['pronom', 'pronom personnel']], 'Les six natures : nom commun, nom propre, déterminant, adjectif qualificatif, verbe, pronom.') },
    { n: 'nom propre', qcm: () => H([qcm('Un nom propre commence toujours par…', 'une majuscule', ['une minuscule', 'un déterminant', 'un point'], 'Un nom propre (Léo, Paris) commence toujours par une majuscule.'), (() => { const np = H(NAT['nom propre']); return qcm('Lequel est un nom propre ?', np, melange(NAT['nom commun']).slice(0, 3), `${g(np)} commence par une majuscule : il désigne une personne ou un lieu unique.`); })()]),
      ecr: () => ecr('Par quelle sorte de lettre commence toujours un nom propre ?', ['majuscule', 'une majuscule', 'par une majuscule'], 'Un nom propre commence toujours par une majuscule.') },
    { n: 'adjectif', qcm: () => qcm('L\'adjectif qualificatif dit…', 'comment est le nom', ['ce que fait le sujet', 'où se passe l\'action', 'quand se passe l\'action'], 'L\'adjectif qualificatif dit comment est le nom : un chat noir, une grande maison.'),
      ecr: () => ecr('Avec quel mot l\'adjectif qualificatif s\'accorde-t-il ?', ['le nom', 'nom', 'avec le nom', 'le nom commun', 'nom commun'], 'L\'adjectif qualificatif s\'accorde en genre et en nombre avec le nom : des fleurs rouges.') },
    { n: 'genre et nombre', qcm: () => H([qcm('Masculin ou féminin, c\'est…', 'le genre', ['le nombre', 'le temps', 'la nature'], 'Le genre : masculin ou féminin. Le nombre : singulier ou pluriel.'), qcm('Singulier ou pluriel, c\'est…', 'le nombre', ['le genre', 'le temps', 'la nature'], 'Le nombre : singulier (un seul) ou pluriel (plusieurs).'), (() => { const x = H(GN_GN); return qcm(`${g(x[0])} est au…`, x[2], [x[2] === 'singulier' ? 'pluriel' : 'singulier'], `${g(x[0])} : ${x[1]} ${x[2]}.`); })()]),
      ecr: () => { const x = H(GN_GN); return ecr(`${g(x[0])} : le nom est-il au singulier ou au pluriel ?`, [x[2]], `${g(x[0])} est au ${x[2]} : regarde le déterminant.`); },
      liste: () => H([liste('Quels sont les deux genres ?', [['masculin'], ['féminin']], 'Les deux genres : masculin et féminin.'), liste('Quels sont les deux nombres ?', [['singulier'], ['pluriel']], 'Les deux nombres : singulier et pluriel.')]) },
    { n: 'pronoms', qcm: () => qcm('Le pronom personnel remplace…', 'un nom', ['un verbe', 'un adjectif', 'une phrase'], 'Le pronom remplace un nom : Léo dort → il dort.'),
      liste: () => H([liste('Cite les pronoms personnels sujets du singulier.', [['je', 'j\''], ['tu'], ['il'], ['elle'], ['on']], 'Au singulier : je, tu, il, elle, on.'), liste('Cite les pronoms personnels sujets du pluriel.', [['nous'], ['vous'], ['ils'], ['elles']], 'Au pluriel : nous, vous, ils, elles.')]) },
    { n: 'sujet', qcm: () => H([qcm('Pour trouver le sujet, on pose devant le verbe la question…', '« Qui est-ce qui… ? »', ['« Où… ? »', '« Quand… ? »', '« Comment… ? »'], 'Pour trouver le sujet : « Qui est-ce qui » + verbe ? (ou « Qu\'est-ce qui » + verbe ?).'), (() => { const p = H(PHR_SV), mots = p.s.replace(/[.,]/g, '').split(' ').filter((w) => w !== p.suj && w !== p.v && w.length > 2); return qcm(`${g(p.s)} : quel est le sujet du verbe ${g(p.v)} ?`, p.suj, melange(mots).slice(0, 2).concat([p.v]), `Qui est-ce qui ${p.v} ? ${p.suj.charAt(0).toUpperCase() + p.suj.slice(1)} : c'est le sujet (${p.n}).`); })()]),
      ecr: () => H([ecr('Quelle question pose-t-on devant le verbe pour trouver le sujet ?', ['qui est-ce qui', 'qu\'est-ce qui'], 'On pose la question « Qui est-ce qui » (ou « Qu\'est-ce qui ») + verbe.', { contient: true }), (() => { const p = H(PHR_SV); return ecr(`${g(p.s)} : écris le sujet du verbe ${g(p.v)} (un seul mot).`, [p.suj], `Qui est-ce qui ${p.v} ? ${p.suj} : c'est le sujet (${p.n}).`); })()]) },
    { n: 'verbe', qcm: () => qcm('Pour reconnaître le verbe, on change le moment : on dit…', '« hier » ou « demain »', ['« vite » ou « lentement »', '« ici » ou « là-bas »', '« oui » ou « non »'], 'Le verbe change quand on dit « hier » ou « demain » : il chante → hier, il chantait ; demain, il chantera.'),
      ecr: () => { const p = H(PHR_SV); return ecr(`${g(p.s)} : quel est le verbe ?`, [p.v], `${g(p.v)} est le verbe : il change si l'on dit « hier » ou « demain ».`); } },
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
    { n: 'passé, présent, futur', qcm: () => H([qcm('Quel mot annonce le passé ?', 'hier', ['demain', 'maintenant', 'bientôt'], '« Hier » annonce le passé ; « demain », le futur ; « maintenant », le présent.'), qcm('Quel mot annonce le futur ?', 'demain', ['hier', 'autrefois', 'maintenant'], '« Demain » annonce le futur.')]) },
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

  const BANQUES = { 'ce-mots': ce_mots, 'ce-temps': ce_temps, 'ce-phrase': ce_phrase };
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
    for (let tour = 0; out.length < N && tour < 12; tour++) {
      for (const e of melange(B)) {
        if (out.length >= N) break;
        if (niv === 0 && !e.qcm) continue;
        for (let essai = 0; essai < 6; essai++) { const it = forme(e)(); if (!vus.has(it.q)) { vus.add(it.q); out.push({ ...it, notion: e.n }); break; } }
      }
    }
    return out;
  }

  /* ---------- la comparaison des réponses écrites ---------- */
  const sansAccents = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  const norme = (s) => String(s || '').toLowerCase().replace(/[’`]/g, '\'').replace(/[«»"“”.!?;:,…()—–]/g, ' ').replace(/^\s*-\s*/, '-').replace(/\s+/g, ' ').trim()
    .replace(/^(un|une|le|la|l'|les|des|c'est|c est|ce sont|il faut|par)\s+/, '').replace(/^(un|une|le|la|l'|les|des)\s+/, '').trim();
  function compare(ecrit, rep, contient) {
    const a = norme(ecrit), L = rep.map(norme);
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
    if (it.t === 'qcm') h = `<div class="carte verte active libre"><div class="carte-choix carte-choix-${it.choix.length > 2 ? 2 : 2}">${it.choix.map((c) => `<button type="button" class="nature-button qz-choix${r ? (c === it.bon ? ' correct' : c === r.ecrit ? ' wrong' : ' faded') : ''}" data-c="${esc(c)}"${r ? ' disabled' : ''}>${esc(c)}</button>`).join('')}</div></div>`;
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
