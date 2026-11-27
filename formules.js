/* ===== Formules et tarifs (Entreprise) : seul fichier à modifier pour changer un prix, une règle ou un contenu ===== */
const FORMULES=[
  {id:"convention",nom:"Convention",prix:3000,unite:"fichier",regle:"Paiement pour chaque fichier",populaire:false,
   inclus:["1 attachement","1 décompte","1 situation"]},
  {id:"marche",nom:"Marché",prix:10000,unite:"projet",regle:"Paiement pour chaque projet",populaire:true,
   inclus:["jusqu'a 4 attachements","Jusqu'a 4 décomptes","Jusqu'a 4 situations","Avenants","Récapitulatif"]},
  {id:"personnalise",nom:"Personnalisé",prix:50000,unite:"projet",regle:"Paiement pour chaque projet, avec avenant de clôture et accompagnement",populaire:false,
   inclus:["Tous les attachements","Tous les décomptes","Toutes les situations","Avenant de clôture","Accompagnement personnalisé"]}
];
