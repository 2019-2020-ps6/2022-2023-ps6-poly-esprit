export const gameQuestionAnswerMock = [
  {
    startDate: new Date("December 17, 2020 13:24:00"),
    submissionDate: new Date("December 17, 2020 13:26:00"),
    questionId: '1',
    answerIds: '1',
  },
  {
    startDate: new Date("December 17, 2020 13:26:00"),
    submissionDate: new Date("December 17, 2020 13:33:00"),
    questionId: '2',
    answerIds: '3',
  },
  {
    startDate: new Date("December 17, 2020 13:33:00"),
    submissionDate: new Date("December 17, 2020 13:40:00"),
    questionId: '3',
    answerIds: '2',
  }
];
export const GameInstanceMock = [
  {
    Id: '1',
    quizId: '1',
    gameQuestionsAnswers: [gameQuestionAnswerMock[0], gameQuestionAnswerMock[1], gameQuestionAnswerMock[2]],
    startTime: new Date("December 17, 2020 13:24:00"),
    endTime: new Date("December 17, 2020 13:40:00"),
    score: 2
  }
];



