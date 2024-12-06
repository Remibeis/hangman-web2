// Liste de mots par difficulté
const mots = {
    facile: ['chat', 'chien', 'maison', 'voiture', 'arbre'],
    moyen: ['ordinateur', 'bicyclettes', 'panorama', 'astronaute'],
    difficile: ['anticonstitutionnellement', 'hippopotomonstrosesquipedaliophobie', 'pneumonoultramicroscopicsilicovolcanoconiosis']
  };
  
  // Bonhomme du pendu (représentation par texte)
  const pendu = [
    `
     _______
    |/      |
    |      
    |      
    |      
    |      
    |      
    |______
    `,
    `
     _______
    |/      |
    |      (_)
    |      
    |      
    |      
    |      
    |______
    `,
    `
     _______
    |/      |
    |      (_)
    |      |
    |      
    |      
    |      
    |______
    `,
    `
     _______
    |/      |
    |      (_)
    |     /|
    |      
    |      
    |      
    |______
    `,
    `
     _______
    |/      |
    |      (_)
    |     /|\\
    |      
    |      
    |      
    |______
    `,
    `
     _______
    |/      |
    |      (_)
    |     /|\\
    |     / 
    |      
    |      
    |______
    `,
    `
     _______
    |/      |
    |      (_)
    |     /|\\
    |     / \\
    |      
    |      
    |______
    `
  ];
  
  // Initialisation du jeu
  const pseudo = localStorage.getItem('pseudo');
  const difficulte = localStorage.getItem('difficulte');
  document.getElementById('pseudoJoueur').innerText = `Pseudo: ${pseudo}`;
  document.getElementById('difficulteChoisie').innerText = `Difficulté: ${difficulte}`;
  
  // Choisir un mot en fonction de la difficulté
  let motSecret = choisirMot(difficulte);
  let motAffiche = Array(motSecret.length).fill('_');
  let erreurs = 0;
  
  function choisirMot(difficulte) {
    const listeMots = mots[difficulte];
    const randomIndex = Math.floor(Math.random() * listeMots.length);
    return listeMots[randomIndex];
  }
  
  // Afficher le mot sous forme de _ 
  function afficherMot() {
    document.getElementById('motAffiche').innerText = 'Mot: ' + motAffiche.join(' ');
  }
  
  // Afficher le bonhomme du pendu
  function afficherPendu() {
    document.getElementById('pendu').innerText = pendu[erreurs];
  }
  
  // Gestion des essais
  document.getElementById('essayerBtn').addEventListener('click', function() {
    const inputLettre = document.getElementById('inputLettre').value.toLowerCase();
  
    if (inputLettre === motSecret) {
      document.getElementById('message').innerText = 'Félicitations, vous avez trouvé le mot!';
      return;
    }
  
    if (inputLettre.length === 1 && motSecret.includes(inputLettre)) {
      for (let i = 0; i < motSecret.length; i++) {
        if (motSecret[i] === inputLettre) {
          motAffiche[i] = inputLettre;
        }
      }
    } else {
      erreurs++;
      document.getElementById('erreursCount').innerText = erreurs;
    }
  
    afficherMot();
    afficherPendu(); // Met à jour le bonhomme
  
    if (motAffiche.join('') === motSecret) {
      document.getElementById('message').innerText = 'Vous avez trouvé le mot! Bravo!';
    }
  
    if (erreurs >= 6) {
      document.getElementById('message').innerText = 'Vous avez perdu! Le mot était: ' + motSecret;
    }
  
    document.getElementById('inputLettre').value = '';
  });
  
  // Initialisation
  afficherMot();
  afficherPendu(); // Affiche l'état initial du bonhomme
  
  