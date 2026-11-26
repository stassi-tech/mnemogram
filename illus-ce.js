/* ============================================================
   MNEMOGRAM — SCÈNES DU CE1-CE2 (v110) : une fiche par texte.
   Clé : « exercice|titre du texte ». Chaque scène a 1 à 3 moments, lus de gauche à droite.
   Un élément : [nom, x en % de la largeur du moment, y (vide = sur le sol), échelle, options].
   Narrateurs du CE : Léo et Lina, à tour de rôle.
   ------------------------------------------------------------ */
window.MNEMO_SCENES = Object.assign(window.MNEMO_SCENES || {}, {
  /* ---------- Exercice 1 : phrase ou pas phrase ---------- */
  'ce-phr|Au jardin': { alt: 'Le jardin : le chat dort, Maman lit, Léo joue au ballon, les oiseaux chantent', moments: [
    { decor: 'jardin', el: [['soleil', 85, 34, .8], ['niche', 18], ['chien', 18, 204, .7, { c: '#c8874b' }], ['zzz', 26, 160], ['banc', 55], ['maman', 55, null, 1, { bras: 'tend' }], ['livreOuvert', 66, 140]] },
    { decor: 'jardin', el: [['arbre', 30], ['oiseau', 22, 104], ['oiseau', 40, 96, 1, { c: '#e74c3c' }], ['notes', 50, 90], ['leo', 70, null, 1, { bras: 'tend', visage: 'rit' }], ['ballon', 88, 175], ['fleurs', 14]] }] },
  'ce-phr|À l\'école': { alt: 'L\'école : la maîtresse écrit au tableau, Lina saute à la corde dans la cour, la cloche sonne', moments: [
    { decor: 'classe', el: [['tableau', 50], ['maitresse', 22, null, 1, { bras: 'leve' }], ['pupitre', 75], ['tom', 75, null, .9], ['livreOuvert', 75, 172]] },
    { decor: 'parc', el: [['cloche', 85, 40], ['lina', 30, null, 1, { bras: 'deux', visage: 'rit' }], ['corde', 30, 196], ['hugo', 70, null, 1, { bras: 'tend' }], ['billes', 80, 198]] }] },
  'ce-phr|La ferme': { alt: 'La ferme : le fermier, les poules, le coq, la vache, le cheval, le tracteur, la mare aux canards', moments: [
    { decor: 'ferme', el: [['soleil', 15, 30, .7], ['grange', 30], ['coq', 70, 150], ['fermier', 62, null, 1, { bras: 'tend' }], ['poule', 85], ['poule', 92, 210, .8, { c: '#f5e6c8' }]] },
    { decor: 'ferme', el: [['cheval', 30], ['foin', 58], ['tracteur', 80, null, .8], ['mouton', 18, 214, .7]] },
    { decor: 'ferme', el: [['mare', 50, 206], ['canard', 40, 206], ['canard', 62, 210], ['cochon', 20], ['lina', 80, null, .9, { bras: 'tend' }], ['oeufs', 92, 198]] }] },
  'ce-phr|La mer': { alt: 'Le voyage vers la mer : la voiture, la plage et le château de sable, la mouette et le bateau', moments: [
    { decor: 'route', el: [['voiture', 50], ['zzz', 58, 140], ['soleil', 85, 36, .7]] },
    { decor: 'plage', el: [['parasol', 25], ['maman', 25, null, .9], ['leo', 72, null, 1, { bras: 'haut', visage: 'rit' }], ['oiseau', 50, 50, 1, { c: '#ecf0f1' }]] },
    { decor: 'plage', el: [['chateauSable', 40], ['frere', 62, null, 1, { bras: 'tend' }], ['seau', 78], ['bateau', 50, 120, .6]] }] },
  /* ---------- Exercice 2 : la ponctuation ---------- */
  'ce-ponct|Le chien': { alt: 'Rex le chien : il se cache, il court, il dort dans sa niche, il mange sa pâtée', moments: [
    { decor: 'jardin', el: [['buisson', 40], ['chien', 70, null, 1, { c: '#c8874b' }], ['mouvement', 52, 180], ['bulle', 70, 140, 1, { t: '?' }]] },
    { decor: 'jardin', el: [['niche', 40], ['chien', 40, 212, .8], ['zzz', 50, 150], ['os', 80, 200]] },
    { decor: 'maison', el: [['gamelle', 50], ['chien', 30], ['lina', 80, null, 1, { visage: 'rit' }]] }] },
  'ce-ponct|Le goûter': { alt: 'Le goûter : Maman sort les gâteaux, le frère en prend trois, le chat vole un biscuit, tout le monde rit', moments: [
    { decor: 'cuisine', el: [['texte', 18, 40, 1, { t: '4 h', taille: 20 }], ['table', 50], ['assiette', 50, 164], ['biscuit', 46, 160], ['biscuit', 54, 160], ['maman', 22, null, 1, { bras: 'tend' }], ['frere', 80, null, 1, { bras: 'leve' }]] },
    { decor: 'cuisine', el: [['table', 50], ['verre', 40, 164], ['leo', 25, null, 1], ['chat', 65, 164], ['biscuit', 82, 140], ['bulle', 30, 100, 1, { t: '!' }]] },
    { decor: 'cuisine', el: [['maman', 25, null, 1, { visage: 'rit' }], ['frere', 55, null, 1, { visage: 'rit' }], ['leo', 80, null, 1, { visage: 'rit', bras: 'haut' }], ['texte', 50, 50, 1, { t: 'ha ha !', taille: 18 }]] }] },
  'ce-ponct|La forêt': { alt: 'La forêt : le panier, l\'écureuil et sa noisette, Papa cherche des champignons, une biche s\'enfuit', moments: [
    { decor: 'foret', el: [['lina', 35, null, 1, { bras: 'tend' }], ['panier', 50, 178], ['ecureuil', 75, 150]] },
    { decor: 'foret', el: [['papa', 40, null, 1, { bras: 'tend' }], ['champignon', 62], ['champignon', 75, 202, .8], ['bulle', 40, 80, 1, { t: '?' }]] },
    { decor: 'foret', el: [['biche', 55], ['mouvement', 30, 176], ['bulle', 70, 110, 1, { t: 'Oh !' }]] }] },
  'ce-ponct|Le grand jour': { alt: 'La fête de l\'école : costume de pirate, la sœur déguisée en fée cherche sa baguette, les parents prennent des photos', moments: [
    { decor: 'maison', el: [['leo', 30, null, 1, { acc: ['chapeau'], chapeau: '#2b2118', haut: '#e74c3c' }], ['soeur', 70, null, 1, { haut: '#ff9ff3', acc: ['couronne'] }]] },
    { decor: 'maison', el: [['lit', 50], ['baguette', 62, 196], ['soeur', 25, null, 1, { haut: '#ff9ff3', visage: 'rit', bras: 'tend' }]] },
    { decor: 'parc', el: [['papa', 25, null, 1, { bras: 'tend' }], ['appareilPhoto', 40, 128], ['maman', 75, null, 1], ['texte', 50, 50, 1, { t: 'Fête !', taille: 20, c: '#c0392b' }]] }] },
  /* ---------- Exercice 3 : les trois types de phrases ---------- */
  'ce-types|Le lapin': { alt: 'Le lapin Pompon : la cage, la carotte, la feuille de salade, ses longues oreilles', moments: [
    { decor: 'jardin', el: [['cage', 40], ['lapin', 40], ['leo', 80, null, 1, { bras: 'tend' }]] },
    { decor: 'jardin', el: [['lapin', 40, null, 1.3], ['lina', 75, null, 1, { bras: 'tend', visage: 'rit' }], ['coeur', 58, 120]] }] },
  'ce-types|La cuisine': { alt: 'La soupe : on lave les poireaux, on épluche les carottes, la soupe cuit, on met la table', moments: [
    { decor: 'cuisine', el: [['papa', 30, null, 1, { acc: ['tablier'], bras: 'tend' }], ['table', 70], ['radis', 66, 164], ['lina', 85, null, .9]] },
    { decor: 'cuisine', el: [['casserole', 45, 180], ['table', 45], ['bulles', 45, 150], ['bulle', 75, 100, 1, { t: '?' }], ['leo', 75]] },
    { decor: 'cuisine', el: [['table', 50], ['assiette', 36, 164], ['assiette', 64, 164], ['bol', 50, 160], ['leo', 18, null, 1, { visage: 'rit' }], ['lina', 85, null, 1, { visage: 'rit' }]] }] },
  'ce-types|Le musée': { alt: 'Le musée : la maîtresse, le squelette de dinosaure, les vitrines, les enfants dessinent', moments: [
    { decor: 'musee', el: [['maitresse', 25, null, 1, { bras: 'leve' }], ['leo', 55], ['lina', 72], ['tom', 88]] },
    { decor: 'musee', el: [['squelette', 50, null, .9], ['vitrine', 85], ['bulle', 20, 80, 1, { t: '?' }], ['tom', 18, null, .9]] },
    { decor: 'musee', el: [['lina', 30, null, 1, { bras: 'tend' }], ['livreOuvert', 42, 140], ['leo', 70, null, 1, { bras: 'tend' }], ['livreOuvert', 82, 140]] }] },
  'ce-types|Le voyage': { alt: 'Le voyage : la valise et le pyjama, Papa cherche ses lunettes, la voiture vers la maison des vacances', moments: [
    { decor: 'maison', el: [['valise', 35], ['lina', 65, null, 1, { bras: 'tend' }], ['maman', 85, null, 1, { bras: 'leve' }]] },
    { decor: 'maison', el: [['table', 70], ['lunettesSoleil', 70, 162], ['papa', 30, null, 1, { bras: 'deux' }], ['bulle', 30, 70, 1, { t: '?' }]] },
    { decor: 'route', el: [['maison', 82, 150, .5], ['voiture', 40], ['notes', 50, 120]] }] },
  /* ---------- Exercice 4 : transformer en phrase interrogative ---------- */
  'ce-int|Les questions de Léo': { alt: 'Léo pose plein de questions : le parc, les glaces, le chat, le ballon, la pluie', moments: [
    { decor: 'parc', el: [['leo', 30, null, 1, { bras: 'leve' }], ['bulle', 30, 76, 1, { t: '?' }], ['glace', 55, 150], ['ballon', 75], ['chat', 88, 206, .7]] },
    { decor: 'maison', el: [['soeur', 30, null, 1], ['livreOuvert', 42, 140], ['fenetre', 72], ['pluie', 72], ['bulle', 80, 120, 1, { t: '?' }]] }] },
  'ce-int|À la ferme': { alt: 'À la ferme : le fermier trait les vaches, les poules, les canards sur la mare, le cheval qui court', moments: [
    { decor: 'ferme', el: [['vache', 40], ['fermier', 75, null, 1, { bras: 'tend' }], ['seau', 60]] },
    { decor: 'ferme', el: [['poule', 25], ['oeufs', 40], ['cochon', 70], ['lina', 90, null, .9, { bras: 'tend' }]] },
    { decor: 'ferme', el: [['mare', 40, 206], ['canard', 35, 206], ['cheval', 75], ['mouvement', 55, 176]] }] },
  'ce-int|Le pique-nique': { alt: 'Le pique-nique : le panier, la nappe, les sandwichs, les fourmis, la pêche dans la rivière', moments: [
    { decor: 'parc', el: [['maman', 25, null, 1, { bras: 'tend' }], ['panier', 42, 180], ['papa', 70, null, 1, { bras: 'tend' }]] },
    { decor: 'parc', el: [['nappe', 50], ['assiette', 40, 186], ['fourmi', 70], ['fourmi', 76, 200], ['leo', 18, null, .9]] },
    { decor: 'lac', el: [['frere', 30, 168, 1, { bras: 'tend' }], ['poisson', 70, 172]] }] },
  'ce-int|Le spectacle': { alt: 'Le spectacle : le rideau, les violons, le magicien et son lapin, le clown, les enfants applaudissent', moments: [
    { decor: 'theatre', el: [['magicien', 40, 180, 1, { bras: 'leve' }], ['chapeauMagique', 65, 180], ['lapin', 65, 160, .8], ['notes', 80, 80]] },
    { decor: 'theatre', el: [['clown', 50, 180, 1, { visage: 'rit', bras: 'haut' }]] },
    { decor: 'maison', el: [['leo', 30, null, 1, { bras: 'haut', visage: 'rit' }], ['lina', 70, null, 1, { bras: 'haut', visage: 'rit' }], ['texte', 50, 60, 1, { t: 'Bravo !', taille: 18, c: '#c0392b' }]] }] },
  /* ---------- Exercice 5 : transformer en phrase impérative ---------- */
  'ce-imper|Avant de partir': { alt: 'Avant de partir : ranger la chambre, mettre le manteau, prendre le sac, fermer la porte', moments: [
    { decor: 'maison', el: [['lit', 35], ['leo', 75, null, 1, { bras: 'tend' }], ['livre', 55, 198]] },
    { decor: 'maison', el: [['leo', 35, null, 1, { haut: '#c0392b' }], ['sac', 60]] },
    { decor: 'rue', el: [['porte', 18, 186], ['maman', 45], ['leo', 65], ['soeur', 82, null, .9]] }] },
  'ce-imper|En classe': { alt: 'En classe : les cahiers, la date, la poésie, la gomme prêtée à Tom, la récréation', moments: [
    { decor: 'classe', el: [['tableau', 50], ['maitresse', 20, null, 1, { bras: 'leve' }], ['pupitre', 75], ['lina', 75, null, .9, { bras: 'leve' }]] },
    { decor: 'classe', el: [['pupitre', 35], ['lina', 35, null, .9], ['pupitre', 75], ['tom', 75, null, .9], ['bulle', 55, 110, 1, { t: 'Merci !' }]] },
    { decor: 'parc', el: [['cloche', 80, 40], ['tom', 30, null, 1, { bras: 'haut', visage: 'rit' }], ['lina', 65, null, 1, { bras: 'haut', visage: 'rit' }]] }] },
  'ce-imper|La recette des crêpes': { alt: 'Les crêpes : la farine et les œufs dans le saladier, la pâte, la poêle, on retourne la crêpe', moments: [
    { decor: 'cuisine', el: [['table', 50], ['saladier', 50, 164], ['oeufs', 70, 164], ['lina', 20, null, 1, { bras: 'tend' }]] },
    { decor: 'cuisine', el: [['poele', 45, 150], ['crepe', 45, 120], ['papa', 70, null, 1, { bras: 'leve', acc: ['tablier'] }]] },
    { decor: 'cuisine', el: [['table', 50], ['assiette', 50, 164], ['crepe', 50, 190], ['leo', 25, null, 1, { visage: 'rit' }], ['lina', 78, null, 1, { visage: 'rit' }]] }] },
  'ce-imper|Le jeu de piste': { alt: 'Le jeu de piste : la carte, le grand chêne, l\'enveloppe sous la pierre, le petit pont sur le ruisseau, la cabane', moments: [
    { decor: 'foret', el: [['carte', 50, 160], ['leo', 30], ['lina', 70]] },
    { decor: 'parc', el: [['arbre', 30], ['rocher', 70], ['enveloppe', 70, 168], ['tom', 88, null, .9]] },
    { decor: 'foret', el: [['ruisseau', 40, 210], ['pont', 40, 206], ['cabane', 82], ['lina', 40, 186, .8]] }] },
  /* ---------- Exercice 6 : forme affirmative ou négative ---------- */
  'ce-formes|Le dragon': { alt: 'Le dragon dans sa grotte crache du feu, les villageois ont peur, une petite fille lui offre une fleur', moments: [
    { decor: 'grotte', el: [['grotte', 40], ['dragon', 50, 200, .7], ['feu', 78, 170]] },
    { decor: 'rue', el: [['papa', 30, null, 1, { visage: 'peur', bras: 'haut' }], ['maman', 65, null, 1, { visage: 'peur', bras: 'haut' }]] },
    { decor: 'grotte', el: [['dragon', 40, null, .7], ['lina', 80, null, 1, { bras: 'tend' }], ['fleur', 70, 160], ['coeur', 60, 90]] }] },
  'ce-formes|Le chat Minou': { alt: 'Minou le chat paresseux dort toute la journée, boit du lait tiède et ronronne sur les genoux', moments: [
    { decor: 'maison', el: [['lit', 50], ['chat', 50, 170, 1, { c: '#95a5a6' }], ['zzz', 60, 130], ['souris', 85]] },
    { decor: 'maison', el: [['bol', 40], ['chat', 65, null, 1, { c: '#95a5a6' }], ['fenetre', 50], ['pluie', 50]] },
    { decor: 'maison', el: [['lina', 50, null, 1, { visage: 'rit' }], ['chat', 52, 158, .8, { c: '#95a5a6' }], ['maman', 82, null, 1, { visage: 'rit' }]] }] },
  'ce-formes|La sortie au parc': { alt: 'Au parc : le ciel bleu, Papa porte le petit frère, le toboggan, le ballon sous le banc', moments: [
    { decor: 'parc', el: [['soleil', 80, 34, .8], ['papa', 40], ['frere', 40, 104, .7, { bras: 'haut' }]] },
    { decor: 'parc', el: [['toboggan', 50], ['leo', 48, 142, .9, { bras: 'haut', visage: 'rit' }]] },
    { decor: 'parc', el: [['banc', 50], ['ballon', 50, 196, .8], ['soeur', 82, null, 1, { bras: 'deux' }]] }] },
  'ce-formes|Le robot': { alt: 'Bip le robot de Léo : il roule, il range la chambre mais cache les chaussettes sous le lit', moments: [
    { decor: 'maison', el: [['robot', 40], ['leo', 75, null, 1, { visage: 'rit', bras: 'tend' }]] },
    { decor: 'maison', el: [['lit', 50], ['robot', 20], ['chaussures', 50, 198]] },
    { decor: 'maison', el: [['fenetre', 50], ['pluie', 50], ['robot', 40], ['bulle', 50, 120, 1, { t: 'bip ?' }]] }] },
  /* ---------- Exercice 7 : transformer à la forme négative ---------- */
  'ce-neg|Le chat grognon': { alt: 'Le chat grognon ne veut rien : il ne mange pas, il ne dort pas', moments: [
    { decor: 'maison', el: [['gamelle', 30], ['chat', 60, null, 1.2, { c: '#7f8c8d' }], ['bulle', 70, 130, 1, { t: 'Non !' }]] },
    { decor: 'maison', el: [['lit', 50], ['chat', 80, null, 1, { c: '#7f8c8d' }], ['leo', 20, null, 1, { visage: 'triste' }]] }] },
  'ce-neg|La journée de Lou': { alt: 'La journée de Lou : le bol de lait le matin, l\'école, les billes à la récréation', moments: [
    { decor: 'cuisine', el: [['reveil', 80, 120], ['table', 45], ['bol', 45, 164], ['fille', 20, null, 1]] },
    { decor: 'classe', el: [['tableau', 50], ['maitresse', 25], ['fille', 75, null, .9, { bras: 'leve' }]] },
    { decor: 'parc', el: [['billes', 50], ['fille', 30, null, 1, { visage: 'rit', bras: 'haut' }], ['garcon', 75, null, 1]] }] },
  'ce-neg|Au zoo': { alt: 'Au zoo : le lion rugit, les singes, la girafe, l\'ours, les pingouins qui nagent, Papa prend des photos', moments: [
    { decor: 'zoo', el: [['girafe', 30], ['lion', 72], ['bulle', 80, 120, 1, { t: 'Roaar !' }]] },
    { decor: 'zoo', el: [['ours', 40], ['singe', 80, 140], ['cage', 80]] },
    { decor: 'piscine', el: [['pingouin', 25, 160], ['pingouin', 45, 150], ['papa', 78, null, 1, { bras: 'tend' }], ['appareilPhoto', 66, 130]] }] },
  'ce-neg|Un drôle de rêve': { alt: 'Le rêve : Léo vole au-dessus de la ville, il glisse sur un nuage, le réveil sonne', moments: [
    { decor: 'nuit', el: [['lune', 80, 40], ['lit', 50], ['leo', 45, 172, .8, { visage: 'dort' }], ['zzz', 60, 120]] },
    { decor: 'reve', el: [['ville', 50, 240, .8], ['leo', 45, 130, 1, { bras: 'deux', visage: 'rit' }], ['chat', 75, 110, .8]] },
    { decor: 'maison', el: [['reveil', 30, 170], ['texte', 30, 120, 1, { t: 'Dring !', taille: 16 }], ['lit', 60], ['maman', 85]] }] },
  /* ---------- Exercice 8 : les paroles des personnages ---------- */
  'ce-paroles|Le ballon': { alt: 'Le ballon coincé dans l\'arbre : la sœur prend une branche, le ballon tombe, ils jouent ensemble', moments: [
    { decor: 'parc', el: [['arbre', 50], ['ballon', 52, 110], ['leo', 82, null, 1, { bras: 'haut', visage: 'crie' }], ['bulle', 80, 80, 1, { t: 'Oh !' }]] },
    { decor: 'parc', el: [['arbre', 40], ['soeur', 65, null, 1, { bras: 'leve' }], ['ballon', 45, 170], ['mouvement', 48, 140]] },
    { decor: 'parc', el: [['leo', 30, null, 1, { visage: 'rit', bras: 'tend' }], ['ballon', 50, 160], ['soeur', 72, null, 1, { visage: 'rit' }], ['bulle', 50, 80, 1, { t: 'Merci !' }]] }] },
  'ce-paroles|Le marchand de glaces': { alt: 'Le marchand de glaces sur la plage : Lina choisit fraise, son frère chocolat', moments: [
    { decor: 'plage', el: [['chariotGlaces', 40], ['marchand', 72], ['bulle', 72, 80, 1, { t: 'Glaces !' }]] },
    { decor: 'plage', el: [['lina', 40, null, 1, { bras: 'tend' }], ['glace', 52, 140, 1, { c: '#ff6b81' }], ['marchand', 80]] },
    { decor: 'plage', el: [['frere', 40, null, 1, { visage: 'rit' }], ['glace', 52, 150, 1, { c: '#8b4513' }], ['bulle', 40, 100, 1, { t: 'Et moi ?' }]] }] },
  'ce-paroles|La petite poule': { alt: 'La petite poule rousse : personne ne veut l\'aider à semer ni à couper le blé, elle fait seule le pain', moments: [
    { decor: 'ferme', el: [['poule', 25], ['chat', 52], ['chien', 70], ['canard', 90], ['bulle', 55, 140, 1, { t: 'Pas moi !' }]] },
    { decor: 'ferme', el: [['ble', 40], ['ble', 60], ['poule', 80]] },
    { decor: 'cuisine', el: [['table', 45], ['pain', 45, 164], ['poule', 80], ['chat', 15, 204, .8], ['bulle', 25, 140, 1, { t: 'Moi !' }]] }] },
  'ce-paroles|Le loup et le chevreau': { alt: 'Le chevreau seul à la maison, le loup frappe à la porte et montre sa patte noire, le chevreau n\'ouvre pas', moments: [
    { decor: 'jardin', el: [['maison', 40], ['chevreau', 45, null, .8], ['chevreau', 78, null, 1.2]] },
    { decor: 'jardin', el: [['porte', 30, 198], ['loup', 70], ['bulle', 70, 120, 1, { t: 'Ouvre !' }]] },
    { decor: 'maison', el: [['porte', 70], ['chevreau', 35], ['bulle', 30, 130, 1, { t: 'Non !' }]] }] },
  /* ---------- Exercice 9 : sujet, verbe, complément ---------- */
  'ce-svc|Le chat': { alt: 'Le chat attrape une souris, la sœur chante, Papa lave la voiture, bébé dort', moments: [
    { decor: 'jardin', el: [['chat', 40], ['souris', 75]] },
    { decor: 'jardin', el: [['soeur', 30, null, 1, { visage: 'rit' }], ['notes', 42, 110], ['voiture', 75, null, .7], ['papa', 90, null, .8]] },
    { decor: 'maison', el: [['lit', 50], ['bebe', 40, 172, 1, { visage: 'dort' }], ['zzz', 55, 120]] }] },
  'ce-svc|En classe': { alt: 'En classe : la maîtresse lit une histoire, Tom dessine un dragon, la cloche sonne', moments: [
    { decor: 'classe', el: [['maitresse', 35, null, 1, { bras: 'tend' }], ['livreOuvert', 50, 130], ['leo', 75], ['lina', 90, null, .9]] },
    { decor: 'classe', el: [['pupitre', 45], ['tom', 45, null, .9], ['dragon', 80, 130, .35], ['cloche', 85, 40]] }] },
  'ce-svc|Au jardin': { alt: 'Au jardin : le grand-père plante des tomates, le chien creuse un trou, les oiseaux mangent les cerises, la grand-mère cueille des fleurs', moments: [
    { decor: 'jardin', el: [['papi', 30, null, 1, { bras: 'tend' }], ['tomates', 55], ['chien', 82]] },
    { decor: 'jardin', el: [['pommier', 35], ['oiseau', 30, 120, 1, { c: '#e74c3c' }], ['mamie', 72, null, 1, { bras: 'tend' }], ['fleurs', 88], ['soleil', 85, 34, .7], ['notes', 50, 60]] }] },
  'ce-svc|Le cirque': { alt: 'Le cirque : le clown, l\'éléphant qui porte une danseuse, le jongleur, le lion et le dompteur', moments: [
    { decor: 'cirque', el: [['clown', 50, null, 1, { visage: 'rit' }], ['leo', 20, null, .8, { visage: 'rit' }]] },
    { decor: 'cirque', el: [['elephant', 50, null, .9], ['lina', 48, 156, .7, { bras: 'haut', haut: '#ff9ff3' }]] },
    { decor: 'cirque', el: [['lion', 40], ['gardien', 80, null, 1, { bras: 'leve', haut: '#c0392b', chapeau: '#2b2118' }]] }] },
  /* ---------- Exercice 10 : les compléments de phrase ---------- */
  'ce-ccp|Le matin': { alt: 'Le matin : le petit-déjeuner dans la cuisine, la rue froide, la cour de l\'école', moments: [
    { decor: 'cuisine', el: [['reveil', 85, 100], ['table', 45], ['bol', 45, 164], ['maman', 18], ['leo', 70]] },
    { decor: 'rue', el: [['leo', 40, null, 1, { acc: ['bonnet'] }], ['maman', 65], ['texte', 85, 30, 1, { t: '8 h', taille: 18 }]] },
    { decor: 'parc', el: [['leo', 30], ['tom', 60, null, 1, { bras: 'leve' }], ['cloche', 85, 40]] }] },
  'ce-ccp|Le pique-nique': { alt: 'Le pique-nique au bord du lac : la nappe sous le grand arbre, les sandwichs, les canards, le retour le soir', moments: [
    { decor: 'lac', el: [['arbre', 20, 150], ['nappe', 28, 166, .8], ['papa', 52, 150]] },
    { decor: 'lac', el: [['canard', 50, 172], ['canard', 70, 170], ['lina', 20, 160, 1, { bras: 'tend' }]] },
    { decor: 'nuit', el: [['lune', 80, 40], ['voiture', 45], ['maison', 85, null, .6]] }] },
  'ce-ccp|L\'hiver': { alt: 'L\'hiver : la neige sur le village, le bonhomme de neige, Papa déblaie l\'allée, les enfants patinent sur le lac gelé', moments: [
    { decor: 'neige', el: [['chalet', 40, 184, .8], ['bonhommeNeige', 78, 190]] },
    { decor: 'neige', el: [['papa', 40, 188, 1, { acc: ['bonnet'] }], ['pelle', 55, 170], ['leo', 80, 188, 1, { acc: ['bonnet'] }]] },
    { decor: 'neige', el: [['lacGele', 50, 200], ['lina', 35, 190, 1, { bras: 'deux', acc: ['bonnet'] }], ['tom', 70, 196, .9, { acc: ['bonnet'], visage: 'rit' }]] }] },
  'ce-ccp|Le voyage en train': { alt: 'Le voyage en train : la gare, le paysage par la fenêtre, les champs puis la forêt, le bébé qui pleure', moments: [
    { decor: 'gare', el: [['gare', 50, 188, .9], ['valise', 15], ['papa', 28]] },
    { decor: 'route', el: [['rails', 50, 196], ['train', 50, 196, .8], ['sapin', 85, 150, .6]] },
    { decor: 'maison', el: [['fenetre', 50], ['maman', 25, null, 1, { bras: 'tend' }], ['bebe', 34, 160, 1, { visage: 'crie' }], ['lina', 78]] }] },
  /* ---------- Bilan 1 : type et forme ---------- */
  'formes-ce|Le chat': { alt: 'Moustache le chat dort toute la journée et ne mange pas ses croquettes', moments: [
    { decor: 'maison', el: [['lit', 40], ['chat', 40, 170, 1, { c: '#f39c12' }], ['zzz', 52, 130], ['gamelle', 80]] },
    { decor: 'maison', el: [['lina', 40, null, 1, { bras: 'tend' }], ['bulle', 40, 90, 1, { t: 'Viens !' }], ['chat', 80, null, 1, { c: '#f39c12' }]] }] },
  'formes-ce|La récréation': { alt: 'La récréation : la cloche sonne, les enfants courent, Léo range ses billes', moments: [
    { decor: 'parc', el: [['cloche', 80, 40], ['tom', 30, null, 1, { bras: 'haut', visage: 'rit' }], ['ballon', 55], ['lina', 75, null, 1, { bras: 'deux' }]] },
    { decor: 'parc', el: [['leo', 40, null, 1, { bras: 'tend' }], ['billes', 60]] }] },
  'formes-ce|Au zoo': { alt: 'Au zoo : la girafe immense, le lion immobile, les singes drôles', moments: [
    { decor: 'zoo', el: [['girafe', 40], ['leo', 80, null, 1, { bras: 'haut' }]] },
    { decor: 'zoo', el: [['cage', 50], ['lion', 50, null, .9], ['zzz', 60, 130]] },
    { decor: 'zoo', el: [['arbre', 50], ['singe', 40, 130], ['singe', 62, 150], ['lina', 85, null, 1, { visage: 'rit' }]] }] },
  'formes-ce|Le gâteau': { alt: 'Le gâteau au chocolat : on casse les œufs, la farine dans le placard, le gâteau qui sent bon', moments: [
    { decor: 'cuisine', el: [['table', 50], ['saladier', 50, 164], ['oeufs', 68, 164], ['maman', 20, null, 1, { bras: 'tend', acc: ['tablier'] }]] },
    { decor: 'cuisine', el: [['etagere', 50, 160, .6], ['leo', 80, null, 1, { bras: 'leve' }], ['bulle', 80, 80, 1, { t: '?' }]] },
    { decor: 'cuisine', el: [['table', 50], ['gateau', 50, 164, 1, { n: 0 }], ['leo', 85, null, 1, { visage: 'rit' }]] }] },
  'formes-ce|Le vélo': { alt: 'Papa apprend le vélo à Lina : il tient le vélo, puis il le lâche, elle roule toute seule', moments: [
    { decor: 'parc', el: [['velo', 45], ['lina', 45, 160, .8], ['papa', 78, null, 1, { bras: 'tend' }]] },
    { decor: 'parc', el: [['velo', 60], ['lina', 60, 160, .8, { visage: 'rit', bras: 'haut' }], ['mouvement', 30, 170], ['papa', 15, null, 1, { bras: 'haut' }]] }] },
  'formes-ce|La plage': { alt: 'À la mer : la serviette dans le sac, l\'eau froide, les vagues, le château de sable', moments: [
    { decor: 'plage', el: [['sac', 40], ['leo', 70, null, 1, { bras: 'tend' }], ['bulle', 70, 90, 1, { t: '?' }]] },
    { decor: 'mer', el: [['lina', 50, 196, 1, { visage: 'peur', bras: 'haut' }], ['bulle', 70, 100, 1, { t: 'Brr !' }]] },
    { decor: 'plage', el: [['chateauSable', 50], ['seau', 75], ['leo', 25, null, 1, { visage: 'rit' }]] }] },
  'formes-ce|La pluie': { alt: 'Il pleut : on joue aux cartes à la maison, le petit frère gagne toujours', moments: [
    { decor: 'maison', el: [['fenetre', 50], ['pluie', 50], ['leo', 30, null, 1, { visage: 'triste' }]] },
    { decor: 'maison', el: [['table', 50], ['cartes', 50, 164], ['leo', 18], ['frere', 82, null, 1, { visage: 'rit', bras: 'haut' }]] }] },
  'formes-ce|Le marché': { alt: 'Grand-père au marché : les pommes rouges, les fraises, la monnaie', moments: [
    { decor: 'marche', el: [['etal', 50], ['marchand', 50, 168, .8], ['papi', 85]] },
    { decor: 'marche', el: [['papi', 30, null, 1, { bras: 'tend' }], ['panier', 50, 196], ['lina', 75, null, 1, { bras: 'tend' }]] }] },
  'formes-ce|L\'anniversaire': { alt: 'L\'anniversaire de Lina : elle souffle les bougies, ouvre ses cadeaux, une jolie poupée', moments: [
    { decor: 'maison', el: [['table', 50], ['gateau', 50, 164, 1, { n: 7 }], ['lina', 20, null, 1, { visage: 'crie' }], ['ballonFete', 85, 100], ['ballonFete', 92, 110, 1, { c: '#3498db' }]] },
    { decor: 'maison', el: [['cadeau', 30], ['cadeau', 45, null, .8, { c: '#e67e22' }], ['lina', 70, null, 1, { visage: 'rit', bras: 'tend' }], ['poupee', 82, 150]] }] },
  'formes-ce|La forêt la nuit': { alt: 'La forêt la nuit : un bruit, une chouette aux yeux brillants, on allume la lampe', moments: [
    { decor: 'nuit', el: [['sapin', 50, null, 1.2], ['leo', 25, null, 1, { visage: 'peur' }], ['bulle', 25, 90, 1, { t: '?' }]] },
    { decor: 'nuit', el: [['arbre', 50, null, 1, { c: '#1e5631' }], ['chouette', 52, 120]] },
    { decor: 'nuit', el: [['papa', 30], ['lampe', 45, 150], ['lina', 85, null, 1, { visage: 'rit' }]] }] },
  'formes-ce|La classe de mer': { alt: 'La classe de mer : le sac et le bonnet, la mer immense, les rochers, on ramasse des crabes', moments: [
    { decor: 'maison', el: [['valise', 40], ['leo', 70, null, 1, { acc: ['bonnet'] }]] },
    { decor: 'mer', el: [['rocher', 40, 210], ['lina', 70, 204, 1, { bras: 'haut' }]] },
    { decor: 'plage', el: [['crabe', 40], ['crabe', 60, 206, .8], ['tom', 80, null, 1, { visage: 'rit', bras: 'tend' }], ['seau', 25]] }] },
  'formes-ce|Le cirque': { alt: 'Le cirque arrive : le grand chapiteau, le lion qui ne rugit pas, les clowns, le magicien disparu', moments: [
    { decor: 'parc', el: [['chapiteau', 50, null, .9], ['lina', 88, null, .8]] },
    { decor: 'cirque', el: [['lion', 35], ['clown', 75, null, 1, { visage: 'rit' }]] },
    { decor: 'cirque', el: [['chapeauMagique', 50], ['bulle', 50, 140, 1, { t: '?' }], ['leo', 82, null, 1, { visage: 'rit', bras: 'haut' }]] }] },
  /* ---------- Bilan 2 : transformer les phrases ---------- */
  'ce-transfo|Le matin': { alt: 'Le matin : on dort, la fenêtre, le café chaud, les chaussures, l\'autobus', moments: [
    { decor: 'maison', el: [['lit', 50], ['leo', 45, 172, .8, { visage: 'dort' }], ['zzz', 60, 120]] },
    { decor: 'cuisine', el: [['table', 45], ['tasse', 45, 164], ['papa', 80], ['chaussures', 20]] },
    { decor: 'rue', el: [['autobus', 50, null, .8], ['leo', 88, null, .8, { bras: 'leve' }]] }] },
  'ce-transfo|Le jardin': { alt: 'Le jardin : on arrose les fleurs, les tomates rouges, on plante des radis, le chien creuse un trou', moments: [
    { decor: 'jardin', el: [['fleurs', 30], ['lina', 65, null, 1, { bras: 'tend' }], ['seau', 80]] },
    { decor: 'jardin', el: [['tomates', 30], ['radis', 55], ['papi', 80]] },
    { decor: 'jardin', el: [['chien', 40], ['feuilles', 70], ['portail', 85, null, .6]] }] },
  'ce-transfo|La piscine': { alt: 'La piscine : le bonnet, le plongeoir, le maître-nageur surveille, la course dans le grand bassin', moments: [
    { decor: 'piscine', el: [['plongeoir', 30, 150], ['leo', 45, 112, .8, { acc: ['bonnet'], bras: 'haut' }]] },
    { decor: 'piscine', el: [['gardien', 80, 150, 1, { haut: '#e74c3c' }], ['soeur', 40, 186, .9, { visage: 'peur' }]] },
    { decor: 'piscine', el: [['tom', 35, 196, .9, { bras: 'deux', acc: ['bonnet'] }], ['lina', 70, 196, .9, { bras: 'deux', acc: ['bonnet'] }]] }] },
  'ce-transfo|L\'anniversaire': { alt: 'La fête : les ballons, les bougies, le gâteau, les cadeaux, on danse', moments: [
    { decor: 'maison', el: [['ballonFete', 20, 100], ['ballonFete', 30, 110, 1, { c: '#2ecc71' }], ['table', 60], ['gateau', 60, 164, 1, { n: 5 }], ['lina', 88, null, 1, { visage: 'triste' }]] },
    { decor: 'maison', el: [['cadeau', 40], ['tom', 70, null, 1, { bras: 'tend' }]] },
    { decor: 'maison', el: [['leo', 30, null, 1, { bras: 'haut', visage: 'rit' }], ['lina', 65, null, 1, { bras: 'haut', visage: 'rit' }], ['notes', 50, 70]] }] },
  'ce-transfo|La forêt': { alt: 'La forêt : le sentier, le pic-vert, le renard qui dort, le champignon, le ruisseau', moments: [
    { decor: 'foret', el: [['leo', 30], ['papa', 60], ['oiseau', 80, 100, 1, { c: '#27ae60' }]] },
    { decor: 'foret', el: [['renard', 40], ['zzz', 55, 160], ['champignon', 80]] },
    { decor: 'foret', el: [['ruisseau', 50, 210], ['pommeDePin', 30], ['papa', 75, null, 1, { bras: 'deux' }], ['bulle', 75, 80, 1, { t: '?' }]] }] },
  'ce-transfo|À la bibliothèque': { alt: 'La bibliothèque : on choisit un livre, Zoé lit une bande dessinée, on parle tout bas', moments: [
    { decor: 'bibliotheque', el: [['leo', 50, null, 1, { bras: 'tend' }], ['livre', 62, 138]] },
    { decor: 'bibliotheque', el: [['zoe', 40], ['livreOuvert', 52, 140], ['texte', 80, 80, 1, { t: 'chut !', taille: 16 }]] }] },
  'ce-transfo|Le marché': { alt: 'Le marché : les fruits mûrs, le panier, le poisson, le fromage, les olives', moments: [
    { decor: 'marche', el: [['etal', 45], ['marchand', 45, 168, .8], ['maman', 85]] },
    { decor: 'marche', el: [['fromage', 30, 160], ['olives', 55, 160], ['table', 42], ['lina', 85, null, 1, { visage: 'triste' }]] },
    { decor: 'marche', el: [['panier', 40], ['poisson', 40, 170], ['leo', 70, null, 1, { bras: 'tend' }]] }] },
  'ce-transfo|Le bricolage': { alt: 'Le bricolage : les ciseaux, la colle, Papa tient la planche, on peint la boîte en bleu, une cabane', moments: [
    { decor: 'maison', el: [['table', 50], ['ciseaux', 40, 164], ['pinceau', 60, 164], ['boite', 75, 164, .7]] },
    { decor: 'jardin', el: [['planche', 50, 150], ['papa', 25, null, 1, { bras: 'tend' }], ['marteau', 75, 150], ['leo', 85]] },
    { decor: 'jardin', el: [['cabane', 50], ['leo', 85, null, 1, { visage: 'rit' }]] }] },
  'ce-transfo|Au parc': { alt: 'Au parc : les balançoires, le toboggan, le tourniquet, les canards, le marchand de glaces', moments: [
    { decor: 'parc', el: [['balancoire', 35], ['toboggan', 75]] },
    { decor: 'parc', el: [['tourniquet', 40], ['canard', 75], ['canard', 88, 204, .8], ['frere', 20, null, 1, { bras: 'deux' }]] },
    { decor: 'parc', el: [['chariotGlaces', 45], ['marchand', 78], ['ballon', 20]] }] },
  'ce-transfo|La cabane': { alt: 'La cabane : les planches lourdes, les branches, l\'échelle, la corde, le marteau', moments: [
    { decor: 'foret', el: [['planche', 45, 186], ['leo', 25, null, 1, { bras: 'deux' }], ['frere', 70, null, 1, { bras: 'deux' }]] },
    { decor: 'foret', el: [['echelle', 40], ['leo', 40, 160, .8], ['marteau', 70]] },
    { decor: 'foret', el: [['cabane', 50], ['chien', 85]] }] },
  'ce-transfo|La classe verte': { alt: 'La classe verte : le sac de couchage, le car, le chalet, la neige, le ski', moments: [
    { decor: 'maison', el: [['valise', 35], ['sac', 60], ['leo', 82]] },
    { decor: 'route', el: [['autobus', 50, null, .8]] },
    { decor: 'montagne', el: [['chalet', 30, 196, .7], ['skis', 70], ['tom', 70, 196, .9, { acc: ['bonnet'], bras: 'deux' }]] }] },
  'ce-transfo|Le grand voyage': { alt: 'Le grand voyage : la valise, les billets, l\'avion décolle, les nuages', moments: [
    { decor: 'gare', el: [['valise', 30], ['lina', 55], ['papa', 80, null, 1, { bras: 'tend' }]] },
    { decor: 'ciel', el: [['nuage', 25, 60], ['avion', 55, 130], ['nuage', 80, 190]] },
    { decor: 'plage', el: [['soleil', 80, 34, .8], ['lina', 40, null, 1, { visage: 'rit', bras: 'haut' }], ['leo', 65, null, 1, { visage: 'rit' }]] }] },

  /* ---------- v114 · Exercice 9 : placer les guillemets ---------- */
  'ce-guill|Le goûter': { alt: 'Le goûter : Léo rentre affamé, maman montre les crêpes, Léo et Lina mangent', moments: [
    { decor: 'maison', el: [['porte', 25], ['leo', 55, null, 1, { bras: 'haut', visage: 'crie' }], ['sac', 68, 190, .8], ['bulle', 55, 80, 1, { gauche: true, t: 'J\'ai faim !' }]] },
    { decor: 'cuisine', el: [['maman', 40, null, 1, { bras: 'tend', visage: 'rit' }], ['table', 70], ['assiette', 70, 172], ['crepe', 70, 168]] },
    { decor: 'cuisine', el: [['leo', 25, null, 1, { visage: 'rit' }], ['table', 50], ['crepe', 44, 168], ['crepe', 56, 168], ['lina', 75, null, 1, { visage: 'rit', bras: 'tend' }], ['bulle', 50, 70, 1, { gauche: true, t: 'Merci !' }]] }] },
  'ce-guill|La cabane': { alt: 'La cabane : Léo passe la planche, papa aide, la cabane est finie', moments: [
    { decor: 'jardin', el: [['arbre', 15], ['leo', 40, null, 1, { bras: 'tend' }], ['planche', 55, 160], ['lina', 72, null, 1, { bras: 'deux' }], ['bulle', 72, 80, 1, { gauche: true, t: 'Trop lourd !' }]] },
    { decor: 'jardin', el: [['papa', 35, null, 1, { bras: 'leve' }], ['planche', 50, 130], ['leo', 70, null, .9], ['marteau', 78, 150]] },
    { decor: 'jardin', el: [['cabane', 50], ['papa', 82, null, 1, { visage: 'rit' }], ['bulle', 82, 80, 1, { gauche: true, t: 'Magnifique !' }]] }] },
  'ce-guill|Au marché': { alt: 'Au marché : le marchand crie, Lina regarde les fraises, grand-mère achète des pommes pour une tarte', moments: [
    { decor: 'marche', el: [['etal', 50], ['marchand', 50, null, 1, { bras: 'haut' }], ['bulle', 22, 70, 1, { t: 'Belles pommes !' }]] },
    { decor: 'marche', el: [['mamie', 18], ['lina', 40, null, .9, { bras: 'tend' }], ['etal', 82], ['bulle', 40, 90, 1, { t: 'Oh oui !' }]] },
    { decor: 'cuisine', el: [['mamie', 30, null, 1, { visage: 'rit' }], ['panier', 55, 175], ['lina', 78, null, .9, { visage: 'rit', bras: 'haut' }], ['bulle', 78, 90, 1, { gauche: true, t: 'Une tarte !' }]] }] },
  'ce-guill|Le chien perdu': { alt: 'Le chien perdu : Léo trouve un petit chien, Lina écrit une affiche, la dame retrouve son chien Biscuit', moments: [
    { decor: 'rue', el: [['leo', 40, null, 1, { bras: 'tend' }], ['chien', 66, 204, .7, { c: '#c8874b' }], ['bulle', 40, 80, 1, { t: 'Tu es perdu ?' }]] },
    { decor: 'maison', el: [['lina', 35, null, 1, { bras: 'leve' }], ['carte', 62, 130, 1.2], ['leo', 82, null, .9, { visage: 'rit' }]] },
    { decor: 'rue', el: [['maman', 40, null, 1, { bras: 'deux', visage: 'rit' }], ['chien', 42, 150, .6, { c: '#c8874b' }], ['coeur', 42, 90], ['leo', 75, null, .9], ['bulle', 75, 80, 1, { gauche: true, t: 'Au revoir !' }]] }] },
  /* ---------- v114 · Exercice 10 : le dialogue avec des tirets ---------- */
  'ce-tirets|Au parc': { alt: 'Au parc : Léo pousse Lina sur la balançoire, puis c\'est le tour de Léo', moments: [
    { decor: 'parc', el: [['balancoire', 50], ['lina', 50, 150, .8, { visage: 'rit', bras: 'haut' }], ['leo', 78, null, 1, { bras: 'tend' }], ['bulle', 50, 60, 1, { gauche: true, t: '— Plus haut !' }]] },
    { decor: 'parc', el: [['balancoire', 50], ['leo', 50, 150, .8, { visage: 'rit' }], ['lina', 22, null, 1, { bras: 'tend', visage: 'rit' }], ['bulle', 22, 70, 1, { t: '— À ton tour !' }]] }] },
  'ce-tirets|Le gâteau': { alt: 'Le gâteau : Léo prépare un gâteau pour maman, Lina casse les œufs', moments: [
    { decor: 'cuisine', el: [['table', 50], ['saladier', 50, 168], ['leo', 30, null, 1, { bras: 'tend' }], ['lina', 78, null, 1], ['bulle', 78, 70, 1, { gauche: true, t: '— Je peux t\'aider ?' }]] },
    { decor: 'cuisine', el: [['table', 50], ['oeufs', 44, 168], ['saladier', 58, 168], ['lina', 30, null, 1, { visage: 'peur', bras: 'tend' }], ['bulle', 30, 70, 1, { t: '— Oh non !' }], ['leo', 80, null, 1, { visage: 'rit' }]] }] },
  'ce-tirets|La pluie': { alt: 'La pluie : Léo s\'ennuie à la fenêtre, le puzzle est incomplet, le chat a caché les pièces', moments: [
    { decor: 'maison', el: [['fenetre', 50], ['pluie', 50], ['leo', 25, null, 1, { visage: 'triste' }], ['bulle', 25, 70, 1, { t: '— Je m\'ennuie…' }]] },
    { decor: 'maison', el: [['boite', 40, 190], ['leo', 25, null, 1, { visage: 'rit', bras: 'tend' }], ['lina', 75, null, 1, { bras: 'deux' }], ['chat', 55, 204, .6, { c: '#555' }], ['bulle', 75, 70, 1, { gauche: true, t: '— C\'est le chat !' }]] }] },
  'ce-tirets|La lettre': { alt: 'La lettre de mamie : Lina la lit à Léo, mamie les invite à la mer avec son chien Pirate', moments: [
    { decor: 'maison', el: [['lina', 35, null, 1, { bras: 'tend', visage: 'rit' }], ['enveloppe', 50, 140], ['leo', 70, null, 1], ['bulle', 70, 70, 1, { gauche: true, t: '— Qu\'est-ce qu\'elle dit ?' }]] },
    { decor: 'plage', el: [['mamie', 25], ['chien', 42, 204, .7, { c: '#333' }], ['leo', 65, null, .9, { visage: 'rit', bras: 'haut' }], ['lina', 85, null, .9, { visage: 'rit' }], ['crabe', 55, 210, .6], ['bulle', 75, 70, 1, { gauche: true, t: '— Vivement l\'été !' }]] }] },
  /* ==================== v116 · CE · les mots ==================== */
  'ce-noms|Au salon': { alt: 'Au salon : le chat dort, papa lit, maman prépare une tarte ; dehors, la pluie tombe et le chien joue', moments: [
    { decor: 'maison', el: [['fenetre', 50], ['pluie', 50], ['papa', 25, null, 1, { bras: 'tend' }], ['livre', 33, 150, .8], ['chat', 70, 204, .6, { c: '#555' }]] },
    { decor: 'cuisine', el: [['maman', 40, null, 1, { acc: ['tablier'], bras: 'tend' }], ['table', 68], ['saladier', 68, 168, .8]] },
    { decor: 'jardin', el: [['nuage', 40, 40], ['pluie', 40], ['chien', 55, 204, .8], ['ballon', 75, 210, .7]] }] },
  'ce-noms|En classe': { alt: 'En classe : la maîtresse raconte une histoire, Tom dessine un dragon, puis la récréation dans la cour', moments: [
    { decor: 'classe', el: [['tableauNoir', 50, 90], ['maitresse', 30, null, 1, { bras: 'tend' }], ['livreOuvert', 30, 150, .7], ['tom', 72, null, .9]] },
    { decor: 'classe', el: [['pupitre', 45], ['tom', 45, null, .9], ['dragon', 72, 140, .45], ['lina', 85, null, .9]] },
    { decor: 'rue', el: [['cloche', 20, 60], ['leo', 45, null, .9, { bras: 'haut', visage: 'rit' }], ['ballon', 62, 200], ['lina', 80, null, .9, { visage: 'rit' }]] }] },
  'ce-noms|À la ferme': { alt: 'À la ferme : le fermier montre ses vaches et ses cochons, ma sœur ramasse des œufs, le chien Pirate court après les poules', moments: [
    { decor: 'ferme', el: [['mamie', 15], ['fermier', 35, null, 1, { bras: 'tend' }], ['vache', 60, 204, .8], ['cochon', 85, 210, .7]] },
    { decor: 'ferme', el: [['soeur', 35, null, .9], ['panier', 50, 190, .8], ['oeufs', 50, 182, .6], ['poule', 70, 210, .7]] },
    { decor: 'ferme', el: [['chien', 35, 204, .8, { c: '#333' }], ['poule', 60, 210, .7], ['poule', 78, 210, .7], ['coq', 90, 205, .7]] }] },
  'ce-noms|À la mer': { alt: 'À la mer : Paul construit un château de sable, Juliette cherche des coquillages, maman lit sous le parasol', moments: [
    { decor: 'plage', el: [['soleil', 85, 40], ['garcon', 30, null, .9, { bras: 'tend' }], ['chateauSable', 52, 205], ['seau', 66, 210, .7]] },
    { decor: 'plage', el: [['fille', 35, null, .9, { bras: 'tend' }], ['crabe', 55, 212, .6], ['parasol', 75], ['maman', 78, null, .9]] },
    { decor: 'mer', el: [['papa', 50, 170, .8, { bras: 'haut' }], ['oiseau', 30, 50, .6], ['oiseau', 70, 40, .5]] }] },
  'ce-ncnp|Léa et Moustache': { alt: 'Léa et son chat Moustache, à Paris près de la Seine ; son frère Hugo à vélo au parc', moments: [
    { decor: 'maison', el: [['lina', 40, null, 1, { bras: 'tend', visage: 'rit' }], ['chat', 60, 204, .7, { c: '#c8874b' }]] },
    { decor: 'parc', el: [['pont', 50, 160], ['hugo', 30, null, .9], ['velo', 70, 195, .8], ['lina', 85, null, .9]] }] },
  'ce-ncnp|Les vacances des Martin': { alt: 'La famille Martin prend le train à Lyon avec le chien Rex, puis visite le port de Brest', moments: [
    { decor: 'gare', el: [['train', 50, 170], ['papa', 20], ['valise', 30, 205, .7], ['chien', 40, 210, .6]] },
    { decor: 'mer', el: [['bateau', 40, 150], ['fille', 75, null, .9, { bras: 'tend' }], ['carte', 82, 150, .8]] }] },
  'ce-ncnp|Christophe Colomb': { alt: 'Christophe Colomb part d\'Espagne avec trois bateaux et découvre l\'Amérique', moments: [
    { decor: 'mer', el: [['caravelle', 25, 150, .8], ['caravelle', 50, 160, .7], ['caravelle', 75, 150, .8]] },
    { decor: 'plage', el: [['caravelle', 20, 150, .6], ['papi', 50, null, 1, { acc: ['chapeau', 'barbe'], bras: 'haut' }], ['arbre', 80]] }] },
  'ce-ncnp|Zoé à la bibliothèque': { alt: 'Zoé à la bibliothèque avec sa tante : un livre sur l\'Égypte, puis la carte de France', moments: [
    { decor: 'bibliotheque', el: [['zoe', 35, null, 1, { bras: 'tend' }], ['livreOuvert', 50, 150, .8], ['maman', 75, null, 1, { acc: ['lunettes'] }]] },
    { decor: 'bibliotheque', el: [['carte', 50, 110, 1.4], ['zoe', 30, null, 1, { visage: 'rit' }]] }] },
  'ce-dets|Des petites phrases': { alt: 'Le chat dort, la souris danse, un oiseau chante, les enfants rient, la lune se cache', moments: [
    { decor: 'jardin', el: [['soleil', 80, 40], ['chat', 25, 204, .7], ['souris', 50, 212, .6], ['oiseau', 70, 100, .6], ['fleur', 85]] },
    { decor: 'nuit', el: [['lune', 30, 50], ['nuage', 45, 55], ['chien', 70, 204, .7], ['cloche', 85, 70, .7]] }] },
  'ce-dets|Dans la rue': { alt: 'Dans la rue : mon frère a un vélo rouge, les voisins promènent leur chien, nos parents nous regardent par la fenêtre', moments: [
    { decor: 'rue', el: [['frere', 30, null, .9], ['velo', 45, 195, .8], ['soeur', 75, null, .9]] },
    { decor: 'rue', el: [['papi', 30], ['chien', 50, 210, .6], ['maison', 80, null, .8]] }] },
  'ce-dets|Les graines': { alt: 'La maîtresse apporte une boîte de graines, les élèves plantent les graines, la classe ressemble à un jardin', moments: [
    { decor: 'classe', el: [['maitresse', 30, null, 1, { bras: 'tend' }], ['boite', 45, 150, .7], ['leo', 70, null, .9]] },
    { decor: 'classe', el: [['table', 50], ['fleurs', 40, 160, .6], ['fleurs', 60, 160, .6], ['lina', 80, null, .9, { bras: 'tend' }]] }] },
  'ce-dets|Les histoires de grand-père': { alt: 'Le soir, grand-père raconte son enfance au village, les enfants marchaient dans la neige', moments: [
    { decor: 'maison', el: [['lampe', 20, 140], ['papi', 40, null, 1, { bras: 'tend' }], ['leo', 65, null, .8], ['lina', 82, null, .8]] },
    { decor: 'neige', el: [['maison', 75, 130, .7], ['garcon', 30, null, .8, { acc: ['bonnet'] }], ['fille', 48, null, .8, { acc: ['bonnet'] }]] }] },
  'ce-det3|Mon voisin': { alt: 'La chienne du voisin aboie, ma sœur a un lapin, mon chat est dans la cour', moments: [
    { decor: 'jardin', el: [['papi', 25], ['chien', 45, 205, .8], ['soeur', 70, null, .9, { bras: 'tend' }], ['lapin', 82, 210, .6]] },
    { decor: 'jardin', el: [['chat', 50, 204, .8, { c: '#888' }], ['lina', 25, null, .9, { visage: 'rit' }]] }] },
  'ce-det3|Dans la rue': { alt: 'Dans la rue : mon frère a un vélo rouge, ma sœur une trottinette, les voisins promènent leur chien', moments: [
    { decor: 'rue', el: [['frere', 30, null, .9], ['velo', 45, 195, .8], ['soeur', 75, null, .9]] },
    { decor: 'rue', el: [['voiture', 40, 190], ['chien', 40, 150, .5], ['maison', 80, null, .8]] }] },
  'ce-det3|Les graines': { alt: 'La maîtresse apporte une boîte de graines, les élèves plantent les graines dans des pots', moments: [
    { decor: 'classe', el: [['maitresse', 30, null, 1, { bras: 'tend' }], ['boite', 45, 150, .7], ['lina', 70, null, .9]] },
    { decor: 'classe', el: [['table', 50], ['fleurs', 40, 160, .6], ['fleurs', 60, 160, .6], ['leo', 80, null, .9, { bras: 'tend' }]] }] },
  'ce-det3|Les histoires de grand-père': { alt: 'Grand-père raconte son enfance : la maison au village, la neige, les sabots', moments: [
    { decor: 'maison', el: [['lampe', 20, 140], ['papi', 40, null, 1, { bras: 'tend' }], ['lina', 65, null, .8], ['leo', 82, null, .8]] },
    { decor: 'neige', el: [['maison', 75, 130, .7], ['garcon', 30, null, .8, { acc: ['bonnet'] }], ['fille', 48, null, .8, { acc: ['bonnet'] }]] }] },
  'ce-adjs|Des couleurs': { alt: 'Le petit chat sur un coussin rouge, une grande girafe mange des feuilles vertes, ma sœur en robe jaune', moments: [
    { decor: 'maison', el: [['chat', 40, 204, .6], ['soeur', 70, null, 1, { visage: 'rit' }]] },
    { decor: 'zoo', el: [['arbre', 70], ['girafe', 45, null, 1]] }] },
  'ce-adjs|Le loup et la chouette': { alt: 'Dans la forêt sombre, un jeune loup perdu rencontre une vieille chouette blanche qui lui montre le sentier', moments: [
    { decor: 'foret', el: [['loup', 40, 204, .8], ['arbre', 15], ['sapin', 80]] },
    { decor: 'foret', el: [['arbre', 70], ['chouette', 70, 90, .7, { c: '#eee' }], ['loup', 35, 204, .8]] },
    { decor: 'foret', el: [['loup', 60, 204, .8], ['sapin', 20], ['lune', 80, 45]] }] },
  'ce-adjs|Le jardin de mamie': { alt: 'Le jardin magnifique de mamie : tomates rouges, roses parfumées, le vieux puits, le chat roux sur le mur', moments: [
    { decor: 'jardin', el: [['mamie', 25, null, 1, { acc: ['chapeau'] }], ['tomates', 50, 200], ['fleurs', 72], ['oiseau', 80, 60, .5]] },
    { decor: 'jardin', el: [['seau', 35, 205], ['chat', 65, 204, .6, { c: '#d9822b' }], ['fleurs', 85]] }] },
  'ce-adjs|Le petit prince': { alt: 'Le petit prince timide dans son château immense, avec son manteau rouge et son cheval rapide', moments: [
    { decor: 'parc', el: [['chateauSable', 62, 205, 2], ['garcon', 25, null, 1, { acc: ['chapeau'] }]] },
    { decor: 'parc', el: [['garcon', 35, null, .9], ['cheval', 65, 200, .9]] }] },
  'ce-genre|Petites phrases': { alt: 'Le chat attrape une souris, les oiseaux chantent, un garçon lit une histoire, mes cousins mangent des pommes', moments: [
    { decor: 'jardin', el: [['chat', 35, 204, .7], ['souris', 55, 212, .5], ['oiseau', 75, 80, .6], ['fleurs', 88]] },
    { decor: 'maison', el: [['garcon', 30, null, .9], ['livreOuvert', 42, 150, .6], ['leo', 70, null, .9], ['panier', 82, 200, .6]] }] },
  'ce-genre|En classe': { alt: 'En classe : la maîtresse distribue les cahiers, les élèves écrivent, puis la cloche sonne la récréation', moments: [
    { decor: 'classe', el: [['tableauNoir', 50, 90], ['maitresse', 30, null, 1, { bras: 'tend' }], ['livre', 40, 150, .6], ['lina', 72, null, .9]] },
    { decor: 'classe', el: [['cloche', 70, 60], ['leo', 35, null, .9, { bras: 'haut', visage: 'rit' }]] }] },
  'ce-genre|Dans la forêt': { alt: 'Dans la forêt : un écureuil ramasse des noisettes, une biche et son faon traversent le chemin, une chouette dort', moments: [
    { decor: 'foret', el: [['arbre', 20], ['ecureuil', 45, 205, .7], ['champignon', 65, 212], ['feuilles', 80, 210]] },
    { decor: 'foret', el: [['biche', 40, 200, .9], ['biche', 60, 210, .6], ['arbre', 85], ['chouette', 85, 90, .5]] }] },
  'ce-genre|Au zoo': { alt: 'Au zoo : les lionnes dorment, un gorille mange des bananes, les girafes tendent le cou, le gardien nourrit les phoques', moments: [
    { decor: 'zoo', el: [['lion', 30, 204, .8], ['singe', 70, 200, .8]] },
    { decor: 'zoo', el: [['girafe', 30, null, .9], ['gardien', 60, null, .9], ['poisson', 75, 150, .5], ['fille', 88, null, .8, { bras: 'haut' }]] }] },
  'ce-accord|Petites phrases': { alt: 'Les chats dorment, une petite souris passe, des oiseaux chantent, deux chiens aboient', moments: [
    { decor: 'jardin', el: [['chat', 25, 204, .6], ['chat', 40, 204, .6, { c: '#555' }], ['souris', 60, 212, .5], ['oiseau', 75, 80, .5], ['oiseau', 88, 70, .5]] },
    { decor: 'jardin', el: [['chien', 35, 204, .7], ['chien', 60, 204, .7, { c: '#333' }], ['fleurs', 85]] }] },
  'ce-accord|Dans la cour': { alt: 'Dans la cour, les élèves jouent : des petites filles sautent à la corde, les garçons courent avec des ballons rouges', moments: [
    { decor: 'rue', el: [['fille', 30, null, .9, { bras: 'haut' }], ['corde', 30, 180], ['fille', 55, null, .9]] },
    { decor: 'rue', el: [['garcon', 30, null, .9, { bras: 'haut' }], ['ballon', 50, 200], ['maitresse', 80, null, 1, { acc: ['lunettes'] }]] }] },
  'ce-accord|Chez mamie': { alt: 'Chez mamie : des poules blanches, des lapins gris, des roses parfumées, des cerises mûres', moments: [
    { decor: 'ferme', el: [['mamie', 20, null, 1, { acc: ['chapeau'] }], ['poule', 45, 210, .7], ['lapin', 65, 210, .6, { c: '#999' }], ['chevreau', 85, 205, .6]] },
    { decor: 'jardin', el: [['fleurs', 30], ['pommier', 65], ['mamie', 85, null, 1, { bras: 'tend' }]] }] },
  'ce-accord|Au marché': { alt: 'Au marché : pommes rouges, poires juteuses, une vieille dame choisit des œufs frais, les poissons argentés', moments: [
    { decor: 'marche', el: [['etal', 50], ['marchand', 50, null, 1, { bras: 'tend' }], ['mamie', 85]] },
    { decor: 'marche', el: [['etal', 40], ['poisson', 40, 150, .6], ['fromage', 60, 160], ['chien', 85, 210, .6]] }] },
  'ce-prons|Les amis': { alt: 'Les amis : Lou et Tom jouent ensemble, les filles sautent à la corde, on rit beaucoup', moments: [
    { decor: 'parc', el: [['fille', 30, null, .9, { visage: 'rit' }], ['tom', 55, null, .9, { visage: 'rit' }], ['ballon', 75, 205]] },
    { decor: 'parc', el: [['lina', 30, null, .9, { bras: 'haut' }], ['corde', 45, 180], ['fille', 60, null, .9], ['leo', 85, null, .9, { visage: 'rit' }]] }] },
  'ce-prons|La piscine': { alt: 'La piscine : papa chante dans la voiture, ma sœur rit, les cousins nagent déjà', moments: [
    { decor: 'rue', el: [['papa', 20, null, .9, { visage: 'rit' }], ['voiture', 50, 190], ['soeur', 85, null, .9, { visage: 'rit' }]] },
    { decor: 'piscine', el: [['plongeoir', 25], ['leo', 55, 180, .8, { bras: 'haut' }], ['lina', 78, 180, .8]] }] },
  'ce-prons|La fête de la classe': { alt: 'La fête de la classe : Léa et Zoé accrochent des ballons, Tom apporte un gâteau, Hugo voudrait le goûter', moments: [
    { decor: 'classe', el: [['ballonFete', 30, 60], ['ballonFete', 55, 50], ['zoe', 30, null, .9, { bras: 'haut' }], ['lina', 60, null, .9, { bras: 'haut' }]] },
    { decor: 'classe', el: [['tom', 30, null, .9, { bras: 'tend' }], ['gateau', 45, 150, .7], ['hugo', 72, null, .9, { visage: 'rit' }]] }] },
  'ce-prons|Au cirque': { alt: 'Au cirque : assis au premier rang avec papa et ses bonbons, les clowns arrivent avec des chaussures géantes et tombent', moments: [
    { decor: 'cirque', el: [['leo', 40, null, .8], ['papa', 62, null, .9, { bras: 'tend' }]] },
    { decor: 'cirque', el: [['clown', 35, null, 1, { bras: 'haut' }], ['clown', 70, null, 1, { visage: 'rit', bras: 'deux' }]] }] },
  'ce-sujets|Petites phrases': { alt: 'Le chat dort, les oiseaux chantent, maman cuisine, papa répare le vélo, la pluie tombe', moments: [
    { decor: 'jardin', el: [['soleil', 80, 40], ['chat', 25, 204, .7], ['oiseau', 55, 80, .5], ['papa', 70, null, .9], ['velo', 85, 200, .6]] },
    { decor: 'cuisine', el: [['maman', 30, null, 1, { acc: ['tablier'] }], ['table', 55], ['casserole', 55, 165, .7], ['fenetre', 82], ['pluie', 82]] }] },
  'ce-sujets|En classe': { alt: 'En classe : la maîtresse écrit au tableau, Léo lève le doigt, le directeur entre, la cloche sonne', moments: [
    { decor: 'classe', el: [['tableauNoir', 40, 90], ['maitresse', 25, null, 1, { bras: 'haut' }], ['leo', 75, null, .9, { bras: 'haut' }]] },
    { decor: 'classe', el: [['porte', 20], ['papi', 30, null, 1, { acc: ['lunettes'] }], ['lina', 65, null, .9], ['leo', 82, null, .9]] }] },
  'ce-sujets|À la plage': { alt: 'À la plage : le petit chien de Léa aboie, les vagues frappent les rochers, les mouettes volent, papa lit sous le parasol', moments: [
    { decor: 'plage', el: [['chien', 30, 210, .6], ['rocher', 75, 200], ['oiseau', 60, 50, .5], ['oiseau', 80, 40, .5]] },
    { decor: 'plage', el: [['chateauSable', 30, 205], ['lina', 50, null, .9, { bras: 'tend' }], ['parasol', 78], ['papa', 80, null, .9]] }] },
  'ce-sujets|Le jardin de grand-père': { alt: 'Le jardin de grand-père : il boit son café, les salades et les tomates poussent, grand-mère cueille des fraises', moments: [
    { decor: 'maison', el: [['papi', 40, null, 1], ['tasse', 55, 150, .7], ['table', 60]] },
    { decor: 'jardin', el: [['radis', 25, 210], ['tomates', 50, 200], ['papi', 70, null, 1, { bras: 'tend' }], ['mamie', 88, null, .9]] }] },
  'ce-nat5|Le chat et ma sœur': { alt: 'Le chat dort et ronronne, ma petite sœur chante, contente', moments: [
    { decor: 'maison', el: [['chat', 35, 204, .7, { visage: 'dort' }], ['soeur', 70, null, .9, { visage: 'rit', bras: 'haut' }]] }] },
  'ce-nat5|Le grand chien': { alt: 'Un grand chien court dans le jardin et cherche sa balle rouge, Léo rit', moments: [
    { decor: 'jardin', el: [['chien', 40, 200, 1], ['ballon', 70, 210, .6]] },
    { decor: 'jardin', el: [['leo', 40, null, 1, { visage: 'rit', bras: 'haut' }], ['chien', 70, 204, .8]] }] },
  'ce-nat5|À la ferme': { alt: 'Les élèves visitent une ferme, voient des vaches noires, le fermier leur donne du lait', moments: [
    { decor: 'ferme', el: [['leo', 20, null, .8], ['lina', 35, null, .8], ['vache', 70, 204, .9, { c: '#222' }]] },
    { decor: 'ferme', el: [['fermier', 40, null, 1, { bras: 'tend' }], ['seau', 55, 205, .7], ['lina', 75, null, .9, { visage: 'rit' }]] }] },
  'ce-nat5|Grand-père raconte': { alt: 'Le vieux grand-père raconte des histoires d\'animaux sauvages, nous l\'écoutons', moments: [
    { decor: 'maison', el: [['papi', 35, null, 1, { bras: 'tend', acc: ['barbe'] }], ['leo', 65, null, .8], ['lina', 82, null, .8]] },
    { decor: 'reve', el: [['lion', 35, 200, .8], ['elephant', 70, 195, .7]] }] },
  'ce-bilannat|La nuit': { alt: 'La lune brille, les étoiles scintillent, je regarde le ciel', moments: [
    { decor: 'nuit', el: [['lune', 70, 50], ['leo', 30, null, 1, { bras: 'tend' }]] }] },
  'ce-bilannat|Le chat et la souris': { alt: 'Mon chat noir chasse une souris, elle se cache, le chat attend', moments: [
    { decor: 'maison', el: [['chat', 30, 204, .8, { c: '#222' }], ['souris', 60, 212, .6]] },
    { decor: 'maison', el: [['boite', 70, 200], ['chat', 35, 204, .8, { c: '#222' }]] }] },
  'ce-bilannat|La soupe': { alt: 'Lucas prépare une soupe chaude, nous mettons la table, ma sœur apporte le pain', moments: [
    { decor: 'cuisine', el: [['garcon', 30, null, 1], ['table', 58], ['casserole', 58, 165, .8]] },
    { decor: 'cuisine', el: [['table', 45], ['bol', 40, 168, .6], ['bol', 52, 168, .6], ['soeur', 78, null, .9, { bras: 'tend' }], ['pain', 85, 140, .6]] }] },
  'ce-bilannat|La cabane': { alt: 'Les enfants construisent une cabane solide avec des branches sèches', moments: [
    { decor: 'foret', el: [['leo', 30, null, .9, { bras: 'tend' }], ['planche', 45, 170], ['lina', 65, null, .9]] },
    { decor: 'foret', el: [['cabane', 50], ['leo', 80, null, .8, { visage: 'rit' }]] }] },
  'ce-bilannat|Le bonhomme de neige': { alt: 'La neige couvre le jardin, nous faisons un bonhomme au nez orange', moments: [
    { decor: 'neige', el: [['bonhommeNeige', 50], ['leo', 25, null, .9, { acc: ['bonnet'], visage: 'rit' }], ['lina', 78, null, .9, { acc: ['bonnet'] }]] }] },
  'ce-bilannat|Le petit âne': { alt: 'Le petit âne porte des sacs lourds sur le chemin étroit, le fermier le suit', moments: [
    { decor: 'montagne', el: [['cheval', 45, 200, .7, { c: '#888' }], ['sac', 45, 186, .55], ['fermier', 75, null, .9]] }] },
  'ce-bilannat|Le pull rouge': { alt: 'Grand-mère tricote un pull rouge pour mon frère', moments: [
    { decor: 'maison', el: [['mamie', 40, null, 1, { acc: ['lunettes'] }], ['manteau', 55, 160, .7]] },
    { decor: 'maison', el: [['frere', 50, null, 1, { visage: 'rit' }], ['mamie', 25, null, .9]] }] },
  'ce-bilannat|La tempête': { alt: 'Une tempête terrible : les arbres plient, tu fermes les volets bleus, le chat a peur', moments: [
    { decor: 'jardin', el: [['nuage', 25, 40], ['nuage', 75, 50], ['pluie', 25], ['pluie', 75], ['arbre', 50]] },
    { decor: 'maison', el: [['fenetre', 50], ['lina', 30, null, 1, { bras: 'tend' }], ['chat', 70, 204, .6, { visage: 'peur' }]] }] },
  'ce-bilannat|Les pompiers': { alt: 'Les pompiers courageux éteignent le feu, un voisin inquiet les remercie', moments: [
    { decor: 'rue', el: [['maison', 60, null], ['echelle', 40, 150], ['papa', 30, null, 1, { acc: ['casquette'], bras: 'haut' }]] },
    { decor: 'rue', el: [['papi', 30, null, 1, { visage: 'rit' }], ['papa', 60, null, 1, { acc: ['casquette'] }], ['maison', 85, null, .7]] }] },
  'ce-bilannat|Les crêpes': { alt: 'Nous regardons un film drôle, papa rit, maman prépare des crêpes sucrées', moments: [
    { decor: 'maison', el: [['tele', 30, 150], ['papa', 60, null, 1, { visage: 'rit' }], ['leo', 82, null, .8, { visage: 'rit' }]] },
    { decor: 'cuisine', el: [['maman', 40, null, 1, { acc: ['tablier'] }], ['poele', 55, 165], ['crepe', 70, 168]] }] },
  'ce-bilannat|Le pêcheur': { alt: 'Le vieux pêcheur lance sa ligne, un gros poisson mord, il sourit', moments: [
    { decor: 'lac', el: [['papi', 30, null, 1, { acc: ['chapeau', 'barbe'], bras: 'tend' }], ['poisson', 70, 188, .7]] },
    { decor: 'lac', el: [['papi', 40, null, 1, { acc: ['chapeau', 'barbe'], visage: 'rit', bras: 'haut' }], ['poisson', 55, 120, 1.1]] }] },
  'ce-bilannat|Les hirondelles': { alt: 'Les hirondelles reviennent et construisent leur nid sous le toit, mon petit frère les observe', moments: [
    { decor: 'jardin', el: [['oiseau', 25, 60, .6], ['oiseau', 40, 45, .6], ['maison', 70, 130, .8], ['nid', 67, 80, .7]] },
    { decor: 'jardin', el: [['frere', 40, null, .9, { bras: 'tend' }], ['maison', 75, 130, .8], ['nid', 72, 80, .7]] }] },
  'ce-bilanacc|Au jardin': { alt: 'Au jardin : les chats dorment, mon petit frère joue, les fleurs rouges poussent, une grande girafe mange', moments: [
    { decor: 'jardin', el: [['chat', 25, 204, .6], ['chat', 40, 204, .6, { c: '#555' }], ['frere', 65, null, .8], ['ballon', 80, 210, .6]] },
    { decor: 'zoo', el: [['fleurs', 25], ['leo', 45, null, .9, { visage: 'rit', bras: 'haut' }], ['girafe', 75, null, .9]] }] },
  'ce-bilanacc|Dans les arbres': { alt: 'Les oiseaux chantent dans les arbres, ma gentille voisine arrose ses roses, les enfants jouent au ballon', moments: [
    { decor: 'jardin', el: [['arbre', 30], ['oiseau', 30, 70, .5], ['oiseau', 45, 60, .5], ['mamie', 65], ['fleurs', 82]] },
    { decor: 'parc', el: [['leo', 30, null, .9, { bras: 'haut' }], ['ballon', 50, 180], ['lina', 72, null, .9, { visage: 'rit' }]] }] },
  'ce-bilanacc|En classe': { alt: 'En classe : la maîtresse ouvre les fenêtres, les garçons rangent leurs cartables, je lis', moments: [
    { decor: 'classe', el: [['fenetre', 30], ['maitresse', 30, null, 1, { bras: 'haut' }], ['sac', 65, 205, .7], ['garcon', 80, null, .9]] },
    { decor: 'classe', el: [['pupitre', 50], ['lina', 50, null, .9], ['livreOuvert', 50, 150, .6]] }] },
  'ce-bilanacc|Au zoo': { alt: 'Au zoo : les lions dorment, les singes sautent, une vieille tortue avance, vous prenez des photos', moments: [
    { decor: 'zoo', el: [['lion', 30, 204, .8], ['arbre', 70], ['singe', 70, 120, .7]] },
    { decor: 'zoo', el: [['girafe', 30, null, .8], ['leo', 60, null, .9], ['appareilPhoto', 70, 140, .6], ['lina', 85, null, .9]] }] },
  'ce-bilanacc|Dans la forêt': { alt: 'Dans la forêt, les arbres perdent leurs feuilles, les écureuils ramassent des noisettes, une petite souris se cache', moments: [
    { decor: 'foret', el: [['arbre', 25], ['feuilles', 45, 210], ['ecureuil', 65, 205, .7], ['ecureuil', 80, 205, .6]] },
    { decor: 'foret', el: [['champignon', 30, 212], ['souris', 50, 212, .5], ['leo', 75, null, .9]] }] },
  'ce-bilanacc|La course': { alt: 'Mes cousins ont des vélos neufs, nous faisons une course, ma petite sœur gagne, papa prépare des crêpes', moments: [
    { decor: 'route', el: [['soeur', 30, 190, .7, { bras: 'haut', visage: 'rit' }], ['velo', 30, 195, .8], ['garcon', 65, 190, .7], ['velo', 65, 195, .8]] },
    { decor: 'cuisine', el: [['papa', 30, null, 1, { acc: ['tablier'] }], ['table', 60], ['assiette', 60, 172], ['crepe', 60, 171]] }] },
  'ce-bilanacc|La nuit': { alt: 'La nuit, les étoiles brillent, une chouette blanche vole, les loups hurlent, je dors dans ma tente', moments: [
    { decor: 'nuit', el: [['lune', 80, 40], ['chouette', 40, 80, .6, { c: '#eee' }], ['loup', 70, 204, .7]] },
    { decor: 'nuit', el: [['cabane', 50], ['leo', 30, null, .8, { visage: 'peur' }], ['lina', 72, null, .8, { visage: 'peur' }]] }] },
  'ce-bilanacc|Au marché': { alt: 'Au marché, les marchands crient, une vieille dame choisit des tomates mûres, tu portes le panier', moments: [
    { decor: 'marche', el: [['etal', 50], ['marchand', 50, null, 1, { bras: 'haut' }], ['mamie', 85]] },
    { decor: 'marche', el: [['tomates', 30, 200], ['lina', 55, null, .9], ['panier', 65, 190, .7], ['chien', 85, 210, .6]] }] },
  'ce-bilanacc|À la montagne': { alt: 'À la montagne : les sommets blancs, les vaches broutent, mon frère grimpe sur les rochers', moments: [
    { decor: 'montagne', el: [['vache', 35, 204, .8], ['vache', 65, 208, .7]] },
    { decor: 'montagne', el: [['rocher', 50, 200, 1.3], ['frere', 50, 180, .7, { bras: 'haut' }], ['fleurs', 85]] }] },
  'ce-bilanacc|Au cirque': { alt: 'Au cirque : les clowns font rire les enfants, les acrobates sautent, les éléphants lèvent leur trompe', moments: [
    { decor: 'cirque', el: [['clown', 35, null, 1, { bras: 'haut' }], ['leo', 75, null, .8, { visage: 'rit' }]] },
    { decor: 'cirque', el: [['elephant', 35, 195, .8], ['lion', 70, 204, .7]] }] },
  'ce-bilanacc|L\'exposition': { alt: 'Les élèves préparent une exposition : dessins colorés, étoiles dorées, la maîtresse est fière', moments: [
    { decor: 'classe', el: [['carte', 30, 100, 1.2], ['carte', 70, 100, 1.2], ['lina', 50, null, .9, { bras: 'tend' }]] },
    { decor: 'musee', el: [['tableau', 50, 90], ['maitresse', 30, null, 1, { visage: 'rit' }], ['leo', 75, null, .9]] }] },
  'ce-bilanacc|Au bord de la mer': { alt: 'Au bord de la mer : les vagues, les mouettes blanches, les pêcheurs réparent leurs filets, nous construisons un château', moments: [
    { decor: 'mer', el: [['bateau', 40, 160, .8], ['oiseau', 60, 50, .5], ['oiseau', 75, 40, .5]] },
    { decor: 'plage', el: [['chateauSable', 40, 205], ['leo', 20, null, .9], ['lina', 65, null, .9, { bras: 'tend' }], ['crabe', 85, 212, .5]] }] },
  /* ==================== v116 · CE · les temps et les modes ==================== */
  'ce-verbe|Le petit chien': { alt: 'Le petit chien court, Léa lui lance une balle, il la rapporte, maman sourit', moments: [
    { decor: 'jardin', el: [['lina', 30, null, 1, { bras: 'haut' }], ['ballon', 55, 120, .6], ['chien', 75, 204, .7]] },
    { decor: 'jardin', el: [['lina', 40, null, 1, { visage: 'rit', bras: 'tend' }], ['chien', 60, 204, .7], ['maman', 85, null, 1, { visage: 'rit' }]] }] },
  'ce-verbe|À l\'école': { alt: 'Les élèves entrent en classe, la maîtresse écrit la date, puis la cloche sonne et les enfants sortent', moments: [
    { decor: 'classe', el: [['tableauNoir', 40, 90], ['maitresse', 25, null, 1, { bras: 'haut' }], ['tom', 70, null, .9], ['livreOuvert', 80, 150, .6]] },
    { decor: 'rue', el: [['cloche', 20, 60], ['leo', 45, null, .9, { bras: 'haut', visage: 'rit' }], ['lina', 70, null, .9, { visage: 'rit' }]] }] },
  'ce-verbe|La tempête': { alt: 'Hier, la tempête : le vent, la pluie, le chat caché sous le lit ; ce matin, le soleil revient', moments: [
    { decor: 'jardin', el: [['nuage', 30, 40], ['nuage', 70, 45], ['pluie', 30], ['pluie', 70], ['arbre', 50]] },
    { decor: 'maison', el: [['lit', 50], ['chat', 50, 212, .5, { visage: 'peur' }], ['papa', 20, null, 1]] },
    { decor: 'jardin', el: [['soleil', 75, 40], ['arbre', 40], ['feuilles', 60, 210]] }] },
  'ce-verbe|Le pique-nique': { alt: 'Dimanche, pique-nique au bord de la rivière : papa gonfle le canot, mon frère pêche, je nage', moments: [
    { decor: 'cuisine', el: [['maman', 40, null, 1, { acc: ['tablier'] }], ['table', 62], ['pain', 62, 165, .7]] },
    { decor: 'lac', el: [['frere', 25, null, .9, { bras: 'tend' }], ['bateau', 60, 185, .6], ['lina', 80, 180, .7, { bras: 'haut' }]] },
    { decor: 'parc', el: [['nappe', 50, 205], ['mamie', 25], ['pain', 50, 200, .6], ['papa', 78, null, 1, { visage: 'rit' }]] }] },
  'ce-inf|Au jardin': { alt: 'Au jardin : papi plante des tomates et arrose les fleurs, le chat dort au soleil, mamie coupe des roses', moments: [
    { decor: 'jardin', el: [['papi', 30, null, 1, { bras: 'tend' }], ['seau', 45, 205, .7], ['tomates', 60, 200], ['fleurs', 80]] },
    { decor: 'jardin', el: [['soleil', 80, 40], ['chat', 30, 204, .6, { visage: 'dort' }], ['mamie', 60, null, 1, { acc: ['chapeau'] }], ['fleurs', 78]] }] },
  'ce-inf|La journée de Lou': { alt: 'La journée de Lou : elle se lève, va à l\'école, la maîtresse lit une histoire, elle mange à la cantine', moments: [
    { decor: 'maison', el: [['reveil', 70, 150], ['lit', 50], ['fille', 30, null, .9, { bras: 'haut' }]] },
    { decor: 'classe', el: [['maitresse', 30, null, 1], ['livreOuvert', 40, 150, .7], ['fille', 70, null, .9], ['lina', 85, null, .9]] },
    { decor: 'cuisine', el: [['table', 50], ['assiette', 50, 172], ['fille', 75, null, .9, { visage: 'rit' }]] }] },
  'ce-inf|Hier soir': { alt: 'Hier soir, un film en famille : papa a préparé des biscuits, le chat a renversé le bol', moments: [
    { decor: 'maison', el: [['tele', 25, 150], ['frere', 55, null, .9, { visage: 'rit' }], ['maman', 78, null, 1]] },
    { decor: 'maison', el: [['papa', 30, null, 1, { bras: 'tend' }], ['bol', 55, 212, .6], ['biscuit', 62, 215, .5], ['chat', 75, 204, .6]] }] },
  'ce-inf|Demain': { alt: 'Demain, les vacances : un château de sable, papa construit des tours, maman lit un roman', moments: [
    { decor: 'plage', el: [['soleil', 80, 40], ['leo', 25, null, .9, { bras: 'haut' }], ['chateauSable', 50, 205], ['papa', 70, null, 1, { bras: 'tend' }]] },
    { decor: 'plage', el: [['parasol', 40], ['maman', 42, null, .9], ['livre', 52, 150, .6], ['chien', 75, 210, .6]] }] },
  'ce-quand|Le gâteau': { alt: 'Hier, maman a fait un gâteau ; aujourd\'hui nous le mangeons ; demain, il n\'en restera plus', moments: [
    { decor: 'cuisine', el: [['maman', 35, null, 1, { acc: ['tablier'] }], ['table', 62], ['gateau', 62, 165, .7]] },
    { decor: 'cuisine', el: [['table', 50], ['assiette', 40, 172], ['assiette', 60, 172], ['frere', 25, null, .9, { bras: 'tend' }], ['lina', 80, null, .9, { visage: 'rit' }]] },
    { decor: 'cuisine', el: [['table', 50], ['assiette', 50, 172], ['frere', 75, null, .9, { visage: 'triste' }]] }] },
  'ce-quand|Au zoo': { alt: 'La semaine dernière, au zoo, les singes sautaient et un éléphant a arrosé les visiteurs ; aujourd\'hui, je dessine un singe', moments: [
    { decor: 'zoo', el: [['arbre', 25], ['singe', 25, 120, .6], ['elephant', 65, 195, .8]] },
    { decor: 'classe', el: [['pupitre', 45], ['leo', 45, null, .9], ['carte', 68, 110, 1.1], ['maitresse', 85, null, 1, { visage: 'rit' }]] }] },
  'ce-quand|Mon anniversaire': { alt: 'Je prépare les invitations de mon anniversaire ; l\'an dernier, mes amis m\'ont offert un ballon', moments: [
    { decor: 'maison', el: [['table', 50], ['enveloppe', 45, 165, .6], ['enveloppe', 55, 165, .6], ['lina', 25, null, .9], ['soeur', 80, null, .9]] },
    { decor: 'parc', el: [['pluie', 50], ['leo', 30, null, .9, { bras: 'haut' }], ['ballon', 55, 200], ['garcon', 75, null, .9]] },
    { decor: 'maison', el: [['gateau', 50, 200], ['ballonFete', 30, 60], ['lina', 75, null, .9, { visage: 'rit', bras: 'haut' }]] }] },
  'ce-quand|La sortie': { alt: 'Hier, il faisait beau et nous avons joué à la marelle ; ce matin, il pleut et je lis un livre', moments: [
    { decor: 'rue', el: [['soleil', 80, 40], ['leo', 30, null, .9, { bras: 'haut' }], ['lina', 60, null, .9], ['cloche', 20, 60]] },
    { decor: 'classe', el: [['fenetre', 75], ['pluie', 75], ['lina', 35, null, .9], ['livreOuvert', 45, 150, .6]] }] },
  'ce-pres|La classe': { alt: 'La maîtresse chante une chanson, les élèves écoutent, Léo regarde par la fenêtre', moments: [
    { decor: 'classe', el: [['maitresse', 30, null, 1, { visage: 'rit', bras: 'deux' }], ['lina', 60, null, .9], ['tom', 80, null, .9]] },
    { decor: 'classe', el: [['fenetre', 60], ['leo', 45, null, .9], ['oiseau', 64, 90, .4]] }] },
  'ce-pres|La ferme': { alt: 'Le coq chante le matin, les vaches mangent, le cochon est dans la boue, tu donnes des carottes aux lapins', moments: [
    { decor: 'ferme', el: [['soleil', 80, 40], ['coq', 30, 200, .9], ['vache', 65, 204, .8]] },
    { decor: 'ferme', el: [['mare', 30, 210], ['cochon', 30, 205, .7], ['lina', 60, null, .9, { bras: 'tend' }], ['lapin', 78, 210, .6]] }] },
  'ce-pres|Le mercredi': { alt: 'Le mercredi : je finis mes devoirs, nous allons à la piscine, tu choisis un livre à la bibliothèque', moments: [
    { decor: 'maison', el: [['table', 50], ['livre', 50, 165, .6], ['leo', 30, null, .9]] },
    { decor: 'piscine', el: [['plongeoir', 25], ['leo', 55, 180, .8, { bras: 'haut' }]] },
    { decor: 'bibliotheque', el: [['lina', 40, null, .9, { bras: 'tend' }], ['livre', 52, 150, .6]] }] },
  'ce-pres|La surprise': { alt: 'Papa vient me chercher, un paquet sur le siège de la voiture, mes sœurs veulent l\'ouvrir', moments: [
    { decor: 'rue', el: [['papa', 25], ['voiture', 60, 190], ['cadeau', 60, 150, .6]] },
    { decor: 'maison', el: [['cadeau', 50, 205], ['soeur', 30, null, .9, { bras: 'tend' }], ['lina', 72, null, .9, { visage: 'rit', bras: 'haut' }]] }] },
  'ce-fut|Les vacances': { alt: 'Cet été, en vacances : je nagerai, papa pêchera, le chien courra après les vagues', moments: [
    { decor: 'mer', el: [['soleil', 80, 40], ['leo', 40, 170, .8, { bras: 'haut' }], ['bateau', 70, 160, .6]] },
    { decor: 'plage', el: [['soeur', 25, null, .9], ['ballon', 40, 190], ['glace', 60, 160, .7], ['chien', 80, 210, .6]] }] },
  'ce-fut|Plus tard': { alt: 'Plus tard : je serai pilote, mon frère aura une ferme, ma sœur deviendra chanteuse', moments: [
    { decor: 'ciel', el: [['avion', 50, 100]] },
    { decor: 'ferme', el: [['frere', 30, null, 1, { acc: ['casquette'] }], ['tracteur', 65, 195]] },
    { decor: 'theatre', el: [['soeur', 50, null, 1, { bras: 'haut', visage: 'rit' }]] }] },
  'ce-fut|La fête de l\'école': { alt: 'Samedi, la fête de l\'école : les parents prépareront des gâteaux, nous chanterons sur la scène', moments: [
    { decor: 'cuisine', el: [['maman', 35, null, 1, { acc: ['tablier'] }], ['table', 62], ['gateau', 62, 165, .7]] },
    { decor: 'theatre', el: [['leo', 30, null, .9, { visage: 'rit', bras: 'haut' }], ['lina', 55, null, .9, { visage: 'rit', bras: 'haut' }], ['tom', 78, null, .9]] }] },
  'ce-fut|Chez mamie': { alt: 'Demain, chez mamie : elle fera une tarte, nous verrons ses poules, papa prendra des photos', moments: [
    { decor: 'cuisine', el: [['mamie', 35, null, 1, { acc: ['tablier'] }], ['table', 62], ['saladier', 62, 168, .8]] },
    { decor: 'ferme', el: [['poule', 30, 210, .7], ['poule', 45, 210, .7], ['leo', 65, null, .9], ['papa', 85, null, 1, { bras: 'tend' }], ['appareilPhoto', 78, 140, .5]] }] },
  'ce-imp|Autrefois': { alt: 'Autrefois, grand-père habitait à la campagne et gardait les vaches ; aujourd\'hui, il nous raconte', moments: [
    { decor: 'ferme', el: [['garcon', 35, null, .9, { acc: ['casquette'] }], ['vache', 65, 204, .8]] },
    { decor: 'maison', el: [['papi', 35, null, 1, { bras: 'tend' }], ['leo', 65, null, .8], ['lina', 82, null, .8], ['billes', 52, 215]] }] },
  'ce-imp|Autrefois, à la maison': { alt: 'Autrefois : une petite maison, un chien aux longues oreilles, un petit jardin', moments: [
    { decor: 'jardin', el: [['maison', 65], ['chien', 30, 204, .7], ['garcon', 45, null, .8]] }] },
  'ce-imp|L\'hiver dernier': { alt: 'L\'hiver dernier, il neigeait : bonhomme de neige, glissades ; le soir, chocolat chaud et grand feu', moments: [
    { decor: 'neige', el: [['bonhommeNeige', 40], ['leo', 70, null, .9, { acc: ['bonnet'], visage: 'rit' }]] },
    { decor: 'maison', el: [['maman', 30, null, 1], ['tasse', 45, 150, .6], ['chat', 70, 204, .6, { visage: 'dort' }]] }] },
  'ce-imp|Au Moyen Âge': { alt: 'Au Moyen Âge, les chevaliers vivaient dans des châteaux, les paysans cultivaient la terre', moments: [
    { decor: 'parc', el: [['chateauSable', 62, 205, 2], ['cheval', 25, 200, .8]] },
    { decor: 'ferme', el: [['ble', 40, 205], ['fermier', 60, null, 1, { acc: ['chapeau'] }], ['ble', 80, 205]] }] },
  'ce-pca|Le dessin': { alt: 'Hier, Paul a dessiné un cheval, nous avons colorié le ciel, la maîtresse a accroché le dessin au mur', moments: [
    { decor: 'classe', el: [['pupitre', 40], ['garcon', 40, null, .9], ['pinceau', 55, 150, .6], ['lina', 78, null, .9]] },
    { decor: 'classe', el: [['carte', 50, 100, 1.4], ['maitresse', 30, null, 1, { bras: 'haut', visage: 'rit' }], ['garcon', 75, null, .9, { visage: 'rit' }]] }] },
  'ce-pca|Le match': { alt: 'Samedi, le match : tu as marqué un but, le gardien a arrêté un penalty, nous avons gagné', moments: [
    { decor: 'parc', el: [['leo', 30, null, .9, { bras: 'tend' }], ['ballon', 55, 200], ['garcon', 80, null, .9, { bras: 'deux' }]] },
    { decor: 'parc', el: [['leo', 30, null, .9, { bras: 'haut', visage: 'rit' }], ['lina', 55, null, .9, { bras: 'haut', visage: 'rit' }], ['tom', 80, null, .9, { bras: 'haut' }]] }] },
  'ce-pca|Les crêpes': { alt: 'Ce matin, maman a fait des crêpes, nous les avons toutes mangées, le chien a léché le sol', moments: [
    { decor: 'cuisine', el: [['maman', 35, null, 1, { acc: ['tablier'] }], ['poele', 52, 165], ['crepe', 70, 168]] },
    { decor: 'cuisine', el: [['table', 45], ['assiette', 45, 172], ['frere', 25, null, .9, { visage: 'rit' }], ['chien', 75, 210, .6]] }] },
  'ce-pca|L\'écureuil': { alt: 'Dimanche, nous avons vu un écureuil grimper dans un arbre, papi a mis ses lunettes', moments: [
    { decor: 'foret', el: [['arbre', 55], ['ecureuil', 58, 100, .6], ['leo', 25, null, .9, { bras: 'tend' }]] },
    { decor: 'foret', el: [['papi', 35, null, 1, { acc: ['lunettes'] }], ['appareilPhoto', 55, 140, .6], ['lina', 72, null, .9]] }] },
  'ce-pce|Le voyage': { alt: 'Hier, Paul et sa sœur sont partis en voyage, le train est arrivé en retard', moments: [
    { decor: 'gare', el: [['garcon', 25, null, .9], ['valise', 35, 205, .6], ['fille', 45, null, .9]] },
    { decor: 'gare', el: [['train', 55, 170], ['reveil', 20, 80, .7]] }] },
  'ce-pce|La rentrée': { alt: 'Ce matin, Léa est arrivée en retard, les élèves sont montés en classe, une nouvelle élève est arrivée', moments: [
    { decor: 'rue', el: [['lina', 30, null, .9, { bras: 'deux' }], ['sac', 40, 200, .6], ['porte', 70]] },
    { decor: 'classe', el: [['maitresse', 25, null, 1], ['zoe', 55, null, .9], ['tom', 80, null, .9, { visage: 'rit' }]] }] },
  'ce-pce|Au cinéma': { alt: 'Samedi, nous sommes allés au cinéma avec mes cousines, ma cousine est devenue toute pâle', moments: [
    { decor: 'theatre', el: [['fille', 30, null, .9], ['lina', 55, null, .9], ['maman', 80, null, 1]] },
    { decor: 'theatre', el: [['fille', 40, null, .9, { visage: 'peur' }], ['lina', 65, null, .9, { visage: 'peur' }]] }] },
  'ce-pce|Les chatons': { alt: 'Hier, deux chatons sont nés, l\'un est tombé du panier, mamie est venue le relever', moments: [
    { decor: 'maison', el: [['panier', 50, 200], ['chat', 40, 204, .7], ['chat', 55, 212, .35], ['chat', 62, 212, .35, { c: '#555' }]] },
    { decor: 'maison', el: [['mamie', 35, null, 1, { bras: 'tend' }], ['chat', 52, 212, .35], ['soeur', 78, null, .9]] }] },
  'ce-etav|Être et avoir au présent': { alt: 'Je suis en CE1, tu as un vélo rouge, nous sommes amis, elle a un chat noir', moments: [
    { decor: 'parc', el: [['leo', 30, null, .9, { visage: 'rit' }], ['velo', 50, 195, .8], ['lina', 72, null, .9], ['chat', 85, 210, .5, { c: '#222' }]] }] },
  'ce-etav|Être et avoir au futur': { alt: 'Demain, je serai en vacances, nous serons à la plage, nous aurons des glaces', moments: [
    { decor: 'plage', el: [['soleil', 80, 40], ['leo', 35, null, .9, { visage: 'rit' }], ['glace', 48, 150, .6], ['soeur', 70, null, .9, { acc: ['chapeau'] }]] }] },
  'ce-etav|Être et avoir à l\'imparfait': { alt: 'Autrefois, mon père était petit, il avait un chien, ses parents avaient une ferme avec des vaches brunes', moments: [
    { decor: 'ferme', el: [['garcon', 30, null, .8], ['chien', 45, 210, .6], ['vache', 72, 204, .8, { c: '#8b5a2b' }]] }] },
  'ce-etav|Être et avoir au passé composé': { alt: 'Hier, Léo a été malade, il a eu de la fièvre, le médecin a été rassurant', moments: [
    { decor: 'maison', el: [['lit', 50], ['leo', 50, 180, .7, { visage: 'triste' }], ['maman', 80, null, 1]] },
    { decor: 'maison', el: [['papi', 30, null, 1, { acc: ['lunettes'] }], ['bouteille', 45, 150, .5], ['leo', 70, null, .9, { visage: 'rit' }]] }] },
  'ce-groupes|Chansons et puzzles': { alt: 'Je chante une chanson, nous finissons le puzzle, le pain brunit dans le four, papa lit le journal', moments: [
    { decor: 'maison', el: [['lina', 30, null, .9, { visage: 'rit', bras: 'deux' }], ['table', 62], ['boite', 62, 165, .6], ['leo', 85, null, .9]] },
    { decor: 'cuisine', el: [['pain', 40, 165, .8], ['table', 40], ['maman', 70, null, 1, { acc: ['tablier'] }]] }] },
  'ce-groupes|À la ferme': { alt: 'À la ferme : le blé mûrit, le fermier conduit son tracteur, le veau grandit, nous buvons du lait', moments: [
    { decor: 'ferme', el: [['soleil', 80, 40], ['ble', 30, 205], ['tracteur', 65, 195]] },
    { decor: 'ferme', el: [['vache', 35, 204, .8], ['vache', 55, 210, .5], ['lina', 80, null, .9], ['verre', 85, 150, .5]] }] },
  'ce-groupes|À la mer': { alt: 'À la mer : le bateau part, je choisis une glace, mon frère plonge, maman dort sous le parasol', moments: [
    { decor: 'mer', el: [['bateau', 50, 160], ['oiseau', 30, 50, .5], ['oiseau', 75, 45, .5]] },
    { decor: 'plage', el: [['chariotGlaces', 30], ['lina', 50, null, .9], ['parasol', 78], ['maman', 80, null, .9, { visage: 'dort' }]] }] },
  'ce-groupes|Au marché': { alt: 'Je vais au marché, le marchand vend des pommes, mamie pèse les carottes, le fromager offre du comté', moments: [
    { decor: 'marche', el: [['etal', 45], ['marchand', 45, null, 1, { bras: 'tend' }], ['leo', 80, null, .9], ['panier', 88, 195, .6]] },
    { decor: 'marche', el: [['mamie', 30], ['fromage', 60, 205], ['marchand', 75, null, 1, { acc: ['toque'] }]] }] },
  'ce|Le chat': { alt: 'Aujourd\'hui, mon chat dort ; hier, il a attrapé une souris ; demain, nous irons chez le vétérinaire', moments: [
    { decor: 'jardin', el: [['chat', 40, 204, .8], ['souris', 65, 212, .5]] },
    { decor: 'maison', el: [['lit', 50], ['chat', 50, 175, .6, { visage: 'dort' }]] },
    { decor: 'rue', el: [['lina', 40, null, .9], ['cage', 55, 200, .6], ['maison', 80]] }] },
  'ce|La rentrée': { alt: 'Hier, maman a acheté des cahiers ; aujourd\'hui, c\'est la rentrée avec mon nouveau cartable', moments: [
    { decor: 'marche', el: [['maman', 35], ['livre', 50, 160, .6], ['leo', 65, null, .9]] },
    { decor: 'classe', el: [['leo', 30, null, .9, { visage: 'rit' }], ['sac', 40, 200, .6], ['maitresse', 70, null, 1, { visage: 'rit' }]] }] },
  'ce|Le marché': { alt: 'Hier, nous avons fait une soupe ; ce matin, au marché, je porte le panier, le fromager coupe du comté', moments: [
    { decor: 'cuisine', el: [['table', 50], ['casserole', 50, 165, .8], ['maman', 25, null, 1]] },
    { decor: 'marche', el: [['etal', 50], ['marchand', 50, null, 1, { bras: 'haut' }], ['lina', 80, null, .9], ['panier', 88, 195, .6]] },
    { decor: 'marche', el: [['fromage', 40, 205], ['marchand', 60, null, 1, { acc: ['toque'] }]] }] },
  'ce|Au parc': { alt: 'Hier, il pleuvait et papi a lu une histoire de pirates ; aujourd\'hui, au parc, les canards nagent', moments: [
    { decor: 'maison', el: [['fenetre', 70], ['pluie', 70], ['papi', 30, null, 1], ['livreOuvert', 42, 150, .6]] },
    { decor: 'parc', el: [['soleil', 80, 40], ['mare', 55, 210], ['canard', 55, 205, .6], ['leo', 25, null, .9, { bras: 'tend' }], ['papi', 85]] }] },
  'ce|Le dentiste': { alt: 'Hier, trop de bonbons ; aujourd\'hui, chez le dentiste, maman me tient la main', moments: [
    { decor: 'maison', el: [['leo', 40, null, .9, { visage: 'rit' }], ['boite', 60, 200, .6]] },
    { decor: 'maison', el: [['leo', 40, null, .9, { visage: 'peur' }], ['maman', 20, null, 1, { bras: 'tend' }], ['papi', 70, null, 1, { acc: ['lunettes'] }]] }] },
  'ce|La neige': { alt: 'Hier, il neigeait et nous regardions par la fenêtre ; ce matin, nous faisons un bonhomme de neige', moments: [
    { decor: 'maison', el: [['fenetre', 50], ['frere', 35, null, .9], ['lina', 65, null, .9]] },
    { decor: 'neige', el: [['bonhommeNeige', 50], ['frere', 25, null, .9, { acc: ['bonnet'] }], ['papa', 80, null, 1, { bras: 'tend' }], ['appareilPhoto', 73, 140, .5]] }] },
  'ce|Les vacances': { alt: 'L\'été dernier à la mer ; aujourd\'hui, je prépare ma valise ; demain, nous partirons', moments: [
    { decor: 'plage', el: [['chateauSable', 50, 205], ['lina', 30, null, .9]] },
    { decor: 'maison', el: [['valise', 50, 205], ['seau', 62, 210, .6], ['lina', 30, null, .9, { bras: 'tend' }], ['soeur', 80, null, .9]] },
    { decor: 'route', el: [['voiture', 50, 190]] }] },
  'ce|Le spectacle': { alt: 'La semaine dernière, nous avons répété ; ce soir, notre classe présente un spectacle et papa filme', moments: [
    { decor: 'classe', el: [['maitresse', 30, null, 1], ['lina', 60, null, .9, { bras: 'deux' }], ['leo', 80, null, .9]] },
    { decor: 'theatre', el: [['lina', 40, null, .9, { bras: 'haut', visage: 'rit' }], ['papa', 80, null, 1], ['appareilPhoto', 73, 140, .5]] }] },
  'ce|Champignons': { alt: 'Nous nous promenons dans la forêt et nous cherchons des champignons', moments: [
    { decor: 'foret', el: [['papi', 25, null, 1], ['panier', 35, 195, .6], ['champignon', 55, 212], ['champignon', 65, 214, .8], ['lina', 82, null, .9, { bras: 'tend' }]] }] },
  'ce|Le déménagement': { alt: 'Hier, le chat miaulait ; aujourd\'hui, nous déménageons : les cartons, le camion, le chat sous un carton', moments: [
    { decor: 'maison', el: [['boite', 30, 205], ['boite', 45, 205], ['chat', 65, 210, .6], ['maman', 85, null, 1]] },
    { decor: 'rue', el: [['autobus', 50, 180], ['papa', 85, null, 1, { bras: 'tend' }]] }] },
  'ce|La sortie au château': { alt: 'Aujourd\'hui, notre classe visite un château fort ; autrefois, des chevaliers en armure y vivaient', moments: [
    { decor: 'parc', el: [['chateauSable', 60, 205, 2], ['maitresse', 20, null, .9]] },
    { decor: 'musee', el: [['papa', 35, null, 1, { acc: ['chapeau'] }], ['leo', 65, null, .9], ['lina', 82, null, .9]] }] },
  'ce|Le cirque': { alt: 'Hier, nous avons vu les affiches ; ce soir, le cirque arrive : le clown fait rire les enfants', moments: [
    { decor: 'rue', el: [['carte', 50, 110, 1.4], ['leo', 30, null, .9, { bras: 'tend' }]] },
    { decor: 'parc', el: [['chapiteau', 50], ['clown', 22, null, 1, { bras: 'haut' }], ['lina', 85, null, .9, { visage: 'rit' }]] }] },
  'ce-bontemps|Le goûter': { alt: 'Aujourd\'hui, je goûte chez mamie : elle prépare des crêpes, mon frère arrive, il a très faim', moments: [
    { decor: 'cuisine', el: [['mamie', 35, null, 1, { acc: ['tablier'] }], ['poele', 52, 165], ['crepe', 70, 168]] },
    { decor: 'cuisine', el: [['table', 50], ['assiette', 50, 172], ['lina', 25, null, .9, { visage: 'rit' }], ['frere', 78, null, .9, { bras: 'tend' }]] }] },
  'ce-bontemps|Au parc': { alt: 'Hier, au parc, Léo est tombé ; aujourd\'hui, il a un pansement, je lui apporte une bande dessinée', moments: [
    { decor: 'parc', el: [['soleil', 80, 40], ['ballon', 40, 200], ['leo', 60, null, .9, { visage: 'peur', bras: 'haut' }]] },
    { decor: 'maison', el: [['leo', 35, null, .9, { visage: 'triste' }], ['lina', 65, null, .9, { bras: 'tend' }], ['livre', 52, 150, .6]] }] },
  'ce-bontemps|La pluie': { alt: 'Hier, le soleil brillait et nous jouions à la marelle ; ce matin, il pleut et la maîtresse lit une histoire', moments: [
    { decor: 'rue', el: [['soleil', 80, 40], ['lina', 35, null, .9, { bras: 'haut', visage: 'rit' }], ['leo', 60, null, .9]] },
    { decor: 'classe', el: [['fenetre', 80], ['pluie', 80], ['maitresse', 30, null, 1], ['livreOuvert', 42, 150, .6], ['leo', 62, null, .9]] }] },
  'ce-bontemps|Le marché': { alt: 'Samedi dernier, au marché, maman a acheté des fraises ; aujourd\'hui, nous préparons une tarte', moments: [
    { decor: 'marche', el: [['etal', 50], ['marchand', 50, null, 1, { bras: 'haut' }], ['maman', 80], ['panier', 88, 195, .6]] },
    { decor: 'cuisine', el: [['papa', 30, null, 1, { acc: ['tablier'] }], ['table', 58], ['saladier', 58, 168], ['soeur', 82, null, .9]] }] },
  'ce-bontemps|Le chat perdu': { alt: 'Hier soir, notre chat a disparu sous la pluie ; ce matin, il était devant la porte', moments: [
    { decor: 'nuit', el: [['pluie', 50], ['papa', 35, null, 1, { bras: 'tend' }], ['lampe', 45, 140, .6]] },
    { decor: 'jardin', el: [['porte', 50], ['chat', 50, 212, .6], ['lina', 75, null, .9, { visage: 'rit', bras: 'haut' }]] }] },
  'ce-bontemps|Le cirque': { alt: 'La semaine dernière, au cirque : les clowns sont entrés en piste, un acrobate a sauté sur un trapèze', moments: [
    { decor: 'cirque', el: [['clown', 35, null, 1, { bras: 'haut' }], ['clown', 65, null, 1, { visage: 'rit' }]] },
    { decor: 'cirque', el: [['garcon', 50, 110, .8, { bras: 'haut' }], ['leo', 25, null, .8, { visage: 'rit' }], ['lina', 80, null, .8, { visage: 'rit' }]] }] },
  'ce-bontemps|Le potager': { alt: 'Autrefois, grand-père cultivait un grand potager ; l\'été dernier, il a planté un cerisier, encore petit aujourd\'hui', moments: [
    { decor: 'jardin', el: [['papi', 30, null, 1, { bras: 'tend' }], ['seau', 45, 205, .7], ['radis', 60, 210], ['tomates', 78, 200]] },
    { decor: 'jardin', el: [['pommier', 55, null, .5], ['papi', 30, null, 1, { visage: 'rit' }], ['leo', 80, null, .9]] }] },
  'ce-bontemps|La tempête': { alt: 'Hier soir, la tempête : les volets claquaient, la lumière s\'est éteinte, papa a allumé une bougie ; ce matin, des branches partout', moments: [
    { decor: 'nuit', el: [['nuage', 40, 50], ['pluie', 40], ['maison', 70]] },
    { decor: 'maison', el: [['bougie', 50, 150], ['papa', 30, null, 1], ['frere', 70, null, .9, { visage: 'peur' }]] },
    { decor: 'jardin', el: [['feuilles', 40, 210], ['feuilles', 60, 212], ['arbre', 80]] }] },
  'ce-bontemps|La nouvelle école': { alt: 'Léa habitait à Marseille ; sa famille a déménagé à Lille ; aujourd\'hui, elle entre dans sa nouvelle école', moments: [
    { decor: 'plage', el: [['lina', 35, null, .9, { visage: 'rit' }], ['fille', 60, null, .9]] },
    { decor: 'route', el: [['voiture', 50, 190]] },
    { decor: 'classe', el: [['lina', 40, null, .9, { visage: 'triste' }], ['maitresse', 70, null, 1, { visage: 'rit' }]] }] },
  'ce-bontemps|Le spectacle': { alt: 'Depuis un mois, nous répétions une pièce ; j\'étais timide ; ce matin, le spectacle', moments: [
    { decor: 'classe', el: [['maitresse', 30, null, 1, { bras: 'tend' }], ['lina', 60, null, .9, { visage: 'triste' }]] },
    { decor: 'theatre', el: [['rideau', 50], ['lina', 50, null, .9, { bras: 'haut', visage: 'rit' }]] }] },
  'ce-bontemps|La classe de neige': { alt: 'L\'année dernière, j\'avais perdu mon bonnet ; ce soir, je prépare ma valise ; demain, la classe de neige', moments: [
    { decor: 'neige', el: [['leo', 50, null, .9, { visage: 'triste' }]] },
    { decor: 'maison', el: [['valise', 55, 205], ['leo', 30, null, .9, { acc: ['bonnet'] }]] },
    { decor: 'neige', el: [['chalet', 60], ['skis', 30, 210], ['leo', 40, null, .9, { acc: ['bonnet'], visage: 'rit' }]] }] },
  'ce-bontemps|Le grand-père marin': { alt: 'Autrefois, grand-père était marin et traversait l\'océan ; aujourd\'hui, il a quatre-vingts ans', moments: [
    { decor: 'mer', el: [['bateau', 50, 150, 1.2], ['nuage', 30, 40], ['pluie', 30]] },
    { decor: 'maison', el: [['papi', 40, null, 1, { acc: ['barbe', 'casquette'], visage: 'rit' }], ['gateau', 65, 200, .7], ['lina', 85, null, .8]] }] },
});
