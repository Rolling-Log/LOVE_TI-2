import { useMemo, useState } from 'react';
import Home from './pages/Home.jsx';
import Quiz from './pages/Quiz.jsx';
import Result from './pages/Result.jsx';
import { questions, QUESTIONS_BY_ID, TOTAL_QUESTIONS } from './data/questions.js';
import { createEmptyScores, getFullResult, sumScores } from './utils/calculateResult.js';

const shuffle = (items) => {
  const list = [...items];

  for (let index = list.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [list[index], list[swapIndex]] = [list[swapIndex], list[index]];
  }

  return list;
};

const buildQuestionOrder = () => shuffle(questions.map((question) => question.id));

const buildScoresFromAnswers = (answers) =>
  questions.reduce((scores, question) => {
    const optionIndex = answers[question.id];

    if (optionIndex === undefined) {
      return scores;
    }

    return sumScores(scores, question.options[optionIndex].score);
  }, createEmptyScores());

function App() {
  const [page, setPage] = useState('home');
  const [questionOrder, setQuestionOrder] = useState(() => buildQuestionOrder());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [logicOpen, setLogicOpen] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const remainingCount = TOTAL_QUESTIONS - answeredCount;
  const currentQuestionId = questionOrder[currentIndex];
  const currentQuestion = QUESTIONS_BY_ID[currentQuestionId];

  const orderedQuestions = useMemo(
    () => questionOrder.map((questionId) => QUESTIONS_BY_ID[questionId]),
    [questionOrder],
  );

  const finishQuiz = (nextAnswers) => {
    const scores = buildScoresFromAnswers(nextAnswers);
    const nextResult = getFullResult(scores);

    setResult({
      ...nextResult,
      scores,
      answers: nextAnswers,
      questionOrder,
    });
    setPage('result');
  };

  const handleStart = () => {
    setQuestionOrder(buildQuestionOrder());
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
    setLogicOpen(false);
    setPage('quiz');
  };

  const jumpToFirstUnanswered = (nextAnswers = answers) => {
    const unansweredIndex = questionOrder.findIndex((questionId) => nextAnswers[questionId] === undefined);

    if (unansweredIndex >= 0) {
      setCurrentIndex(unansweredIndex);
    }
  };

  const handleSelectOption = (questionId, optionIndex) => {
    const nextAnswers = {
      ...answers,
      [questionId]: optionIndex,
    };

    setAnswers(nextAnswers);

    const nextAnsweredCount = Object.keys(nextAnswers).length;
    const isLastQuestion = currentIndex === TOTAL_QUESTIONS - 1;

    if (isLastQuestion && nextAnsweredCount === TOTAL_QUESTIONS) {
      finishQuiz(nextAnswers);
      return;
    }

    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex((previous) => previous + 1);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((previous) => Math.max(0, previous - 1));
  };

  const handleNext = () => {
    if (currentIndex === TOTAL_QUESTIONS - 1) {
      if (remainingCount === 0) {
        finishQuiz(answers);
        return;
      }

      jumpToFirstUnanswered();
      return;
    }

    setCurrentIndex((previous) => Math.min(TOTAL_QUESTIONS - 1, previous + 1));
  };

  const handleJump = (index) => {
    setCurrentIndex(index);
  };

  const handleRestart = () => {
    setPage('home');
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
    setLogicOpen(false);
  };

  return (
    <main className="app-shell">
      {page === 'home' ? (
        <Home
          onStart={handleStart}
          logicOpen={logicOpen}
          onOpenLogic={() => setLogicOpen(true)}
          onCloseLogic={() => setLogicOpen(false)}
        />
      ) : null}

      {page === 'quiz' && currentQuestion ? (
        <Quiz
          currentQuestion={currentQuestion}
          currentIndex={currentIndex}
          orderedQuestions={orderedQuestions}
          answers={answers}
          remainingCount={remainingCount}
          onSelectOption={handleSelectOption}
          onPrev={handlePrev}
          onNext={handleNext}
          onJump={handleJump}
          onFinish={() => finishQuiz(answers)}
        />
      ) : null}

      {page === 'result' && result ? (
        <Result
          result={result}
          orderedQuestions={orderedQuestions}
          onRestart={handleRestart}
          onRetake={handleStart}
        />
      ) : null}
    </main>
  );
}

export default App;
