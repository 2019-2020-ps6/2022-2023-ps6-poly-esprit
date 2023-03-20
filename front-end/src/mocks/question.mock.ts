export const Answer = [
  {
    type: 'Histoire',
    value: '1880',
    isCorrect: false,
  },
  {
    type: "Histoire",
    value: "1980",
    isCorrect: false,
  },
  {
    type: "Histoire",
    value: "1889",
    isCorrect: false,
  },
  {
    type: "Histoire",
    value: "1789",
    isCorrect: true,
  },
  {
    type: "Histoire",
    value: "Couronnement de Charlemagne",
    isCorrect: false,
  },{
    type: "Histoire",
    value: "Fin de la Seconde Guerre Mondiale",
    isCorrect: true,
  },{
    type: "Histoire",
    value: "Date de la prise de la Bastille",
    isCorrect: false,
  },{
    type: "Histoire",
    value: "Armistice de la Première Guerre Mondiale",
    isCorrect: false,
  },
];
export const Question = [
  {
    id: '1',
    label: 'A quelle date il y a eu la révolution française',
    answers: [Answer[0],Answer[1],Answer[2], Answer[3]]
  },
  {
    id: '2',
    label: 'A quoi correspond la date du 8 mai dans l’histoire de France ?',
    answers: [Answer[4],Answer[5],Answer[6], Answer[7]]
  },
];


