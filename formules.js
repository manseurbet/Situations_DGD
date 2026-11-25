/* ===== Formules et tarifs (Entreprise) : seul fichier à modifier pour changer un prix, une règle ou un contenu ===== */
const FORMULES=[
  {id:"convention",nom:"Convention",prix:2000,unite:"fichier",regle:"Paiement pour chaque fichier",populaire:false,
   inclus:["1 attachement","1 décompte","1 situation"]},
  {id:"marche",nom:"Marché",prix:5000,unite:"projet",regle:"Paiement pour chaque projet",populaire:true,
   inclus:["4 attachements","4 décomptes","4 situations","Avenants","Récapitulatif"]},
  {id:"personnalise",nom:"Personnalisé",prix:50000,unite:"projet",regle:"Paiement pour chaque projet, avec avenant de clôture et accompagnement",populaire:false,
   inclus:["Tous les attachements","Tous les décomptes","Toutes les situations","Avenant de clôture","Accompagnement personnalisé"]}
];
