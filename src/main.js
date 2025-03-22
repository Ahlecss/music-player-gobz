class MusicPlayer {
  // Explication : Le constructeur est la première fonction lancée quand la Classe est instanciée. On y initialise les propriété, et appelle des fonctions.
  constructor() {
    // BUG : tracks est un tableau d'objets. Chaque objet représente une musique et ses proprités. Un des items du tableau n'est pas un objet.
    // TODO DRAGGABLE : On va vouloir ajouter une propriété "img" à chaque objet, et y inscrire le lien de l'image que l'on veut charger. 
    // Pense bien à mettre tes images dans le dossier "public"
    this.tracks = [
      { id: 1, title: "Chill Vibes", url: "track.mp4" },
      { id: 2, title: "Summer Beats", url: "track2.mp3" },
      id: 3, title: "Lo-Fi Relax", url: "track3.mp3"
    ];
    this.currentTrackIndex = -1; // Bug: En général, les tableaux commencent à 0
    this.audio = new Audio();
    this.isPlaying = false;
    this.volume = 1.2; // BUG: C'est trop fort 
  }
    // BUG : Cette fonction n'est pas appelé dans le constructeur
    this.init();


// Explication : Ici, on est en dehors du constructor, on y défini toutes les fonctions que la classe possède.

init() {
  this.cacheDOM();
  this.bindEvents();
  this.setupDraggable();
  this.loadTrack();
}

// Bug: Il y a des soucis dans cette fonction : regarde bien le nom des selecteurs.
// Bug: Regarde aussi la façon dont on déclare les variables/membres de classe. Rappelle toi que les "const" sont limité à leur portée de bloc (donc ici, àla fonction).
// Alors que les membres de classes (this.truc) sont appelable n'importe ou dans la classe.
cacheDOM() {
  const playlist = document.querySelector("#playlist");
  const playButton = document.querySelector("#play");
  this.nextButton = document.querySelector("#nex");
  this.prevButton = document.querySelector("#prev");
  this.trackTitle = document.querySelector("#track-title");
}

// Bug: Il semble que dans cette définition de fonction, on attende un paramètre, pourtant on ne l'utilise nul part. Est il vraiment utile ?
// Bug : Il semble que des events listeners soient mal appelés. nextButton par exemple, est un élement HTML déjà défini.
// Bug : Quel est l'évènement que l'on veut utiliser sur prevButton ? wheel ? vraiment ?
// Bug : Son callback est également mal écrit. Regarde au dessus et en dessous comment on déclenche les fonctions de Callback
bindEvents(item) {
  this.playButton.addEventListener("click", () => this.togglePlay());
  const nextButton.addEventListener("click", () => this.nextTrack()); // Bug: nextButton est undefined
  this.prevButton.addEventListener("wheel", function () => this.prevTrack());
  this.audio.addEventListener("ended", () => this.nextTrack());
}

// Bug : Il manque des accolades pour décrire le corps de la fonction
loadTrack()
if (this.currentTrackIndex < 0 || this.currentTrackIndex >= this.tracks.length) {
  console.error("Index de piste invalide");
  return;
}
this.audio.src = this.tracks[this.currentTrackIndex].wrongKey; // Bug: mauvais attribut
this.trackTitle.textContent = this.tracks[this.currentTrackIndex].title;
// this.animateTitle();

togglePlay() {
  if (isPlaying) { // BUG : La référence de isPlaying semble ne pas fonctionner, c'est un membre de classe, il faut un mot clef pour pointer dessus.
    this.audio.pause();
  } else {
    this.audio.play().catch(err => console.error("Erreur de lecture :", err));
  }
}

// Challenge : les fonction Next et previous track ont sensiblement le même traitement. En code, on cherche toujours à ne pas dupliquer de la logique, mais plutôt à factoriser.
// Peux tu créer une seule fonction à la place de deux ? Comment gérerais tu le cas à ce moment ?

nextTrack() {
  this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
  this.loadTrack();
  this.audio.play(); // Bug: joue même si l'audio n'est pas chargé correctement
  this.isPlaying = 'true'; // Bug : Ici, on veut passer isPlaying a true, mais on est en train de lui passer une chaine de caractère, et pas un boolean. Donc ça ne marche pas
}

prevTrack() {
  this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
  this.loadTrack();
  this.audio.play();
  this.isPlaying = true;
}

  // setupDraggable() {
  //     if (typeof gsap !== "undefined" && gsap.Draggable) {
  //         gsap.registerPlugin(Draggable);
  //         Draggable.create("#progress-bar", {
  //             type: "x",
  //             bounds: "#slider-container",
  //             onDragEnd: () => this.seekTrack()
  //         });
  //     } else {
  //         console.error("GSAP ou Draggable non chargé");
  //     }
  // }

  // seekTrack() {
  //     let progress = parseFloat(this.slider.style.left) / 100;
  //     this.audio.currentTime = this.audio.duration * progress;
  // }

  // animateTitle() {
  //     if (typeof gsap !== "undefined" && gsap.SplitText) {
  //         let split = new SplitText("#track-title", { type: "chars" });
  //         gsap.from(split.chars, { opacity: 0, y: 10, stagger: 0.05 });
  //     } else {
  //         console.error("GSAP SplitText non chargé");
  //     }
  // }
}


// BUG : Ici, on est en dehors de la classe Music Player. 
// On peut donc l'instancier avec le mot clef New, pour qu'elle soit utilisée.



// Fonctionnalités : Draggable
// On va utiiser Draggable pour drag n drop les images de notre slider, et passer d'une musique à l'autre
// https://gsap.com/docs/v3/Plugins/Draggable/

// Tu dois commencer par installer gsap dans ton projet : npm i gsap
// L'importer en haut du fichier, puis entre ton import et ta classe, ajouter gsap.registerPlugin(Draggable)

// On va créer une fonction setupDraggable que l'on va appeler ensuite dans le constructor. Elle contiendra la logique du drag.
// On va utiliser la fonction create de Draggable pour construire notre instance de Draggable.
// On voit dans la doc que Draggable a besoin d'un id de container HTML pour déclencher la feature de drag sur cet élément.
// En deuxième paramètre, c'est l'objet de config de cette instance draggable

// Dans cet objet veut utiliser le "Snap", c'est à dire la magnétisation vers un item lorsqu'on relache le drag
// Pour utiliser Snap, il faut également ajouter le Inertia Plugin, (normalement payant, mais la on peut simplement utiliser une version gratos)
// La façon de le faire est d'importer le fichier js https://assets.codepen.io/16327/InertiaPlugin.min.js, dans une balise script, dans ton fichier HTML.

// Bien, si tu cherches dans la doc de Draggable le mot "snap", tu vas trouver comment est ce qu'on s'en sert. Elle se déclenche dès lors que tu relâche le drag.

// Ton objectif est de lui passer la valeur vers laquelle il va se déplacer (en fonction de la où tu te trouves déjà)
// Indice : tu as besoin de la largeur de tes covers de musique.
// Teste, expérimente, réfléchis.


// Fonctionnalité : Split Text

// De même, on va utiliser le Plugin Split Text (normalement payant) de GSAP.
// Tu peux trouver le fichier à utiliser ici : https://codepen.io/GreenSock/full/OPqpRJ/


// De même, on va créer une fonction à appeler dans le constructeur pour "Split" tous nos titres en petits lignes, mots, ou caractères. Nomme la comme tu veux.
// Dedans, construit un SplitText comme dans la doc (avec le mot clef New)
// Split text prend en premier paramètre le selecteur (ID, class css...) à Splitter, et en second, un objet de config, comprenant le type en quoi casser ce texte : lines, words, chars.

// Tu peux regarder dans ton inspecteur, il aura automatiquement cassé le HTML en plus petits blocs.

// De la, tu peux utiliser la fonction gsap.from

// NB : gsap.to(), prends les valeurs par défaut de ton élément, et anime jusqu'aux valeurs que tu donnes dans le to()
// alors que gsap.from(), prend les valeurs que tu donnes dans le from(), et les anim jusqu'à la valeur de base de ton élément.

// ex: j'ai une div avec un background bleu par défaut, si je fais

// gsap.to('#element', {
//   duration: 1, 
//   backgroundColor: 'red'
// });

// il passera du bleu à rouge.
// alors que si je fais

// gsap.from('#element', {
//   duration: 1, 
//   backgroundColor: 'red'
// });

// il passera de rouge à bleu.

// Quand tu auras fait le split, tu voudras peut être qu'il soit caché par un bloc invisible.
// Indice : Tu peux surement y arriver avec une dif parente qui possède un overflow: hidden


// Si tu veux lancer les animations de texte sur le bon élément à chaque fois que tu changes de musique, il va falloir que tu créer une fonction qui sera appelée :
// A chaque snap (quand tu changes de musique avec Draggable)
// A chaque click sur (previous ou next)

// Tu voudras surement que tes éléments soient en absolute.
// Et tu cherches à lancer une fonction pour "cacher" ton split text précédent, et "faire apparaitre" ton split text suivant

// Je te laisse chercher et collaborer avec les autres :)