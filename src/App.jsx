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

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

const drawWrappedText = (context, text, x, startY, maxWidth, lineHeight) => {
  const characters = text.split('');
  let line = '';
  let y = startY;

  characters.forEach((character) => {
    const testLine = `${line}${character}`;
    const metrics = context.measureText(testLine);

    if (metrics.width > maxWidth && line) {
      context.fillText(line, x, y);
      line = character;
      y += lineHeight;
    } else {
      line = testLine;
    }
  });

  if (line) {
    context.fillText(line, x, y);
  }

  return y;
};

const generateShareCard = async (result) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1240;
  canvas.height = 1754;

  const context = canvas.getContext('2d');

  if (!context) {
    return '';
  }

  const portrait = await loadImage(result.personality.image);

  context.fillStyle = '#fff7ef';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = '#111111';
  context.fillRect(56, 56, canvas.width - 112, canvas.height - 112);

  context.fillStyle = '#fff7ef';
  context.fillRect(94, 94, canvas.width - 188, canvas.height - 188);

  context.fillStyle = '#111111';
  context.font = '700 36px Fredoka, sans-serif';
  context.fillText('LOVE-TI', 132, 156);

  context.fillStyle = '#5d534d';
  context.font = '700 22px Nunito, sans-serif';
  context.fillText('恋爱人格测试分享卡', 132, 194);

  const imageSize = 430;
  const imageX = (canvas.width - imageSize) / 2;
  const imageY = 246;

  context.fillStyle = '#ffe6f3';
  context.fillRect(imageX - 18, imageY - 18, imageSize + 36, imageSize + 36);
  context.drawImage(portrait, imageX, imageY, imageSize, imageSize);

  context.fillStyle = '#111111';
  context.textAlign = 'center';
  context.font = '700 90px Fredoka, sans-serif';
  context.fillText(result.personality.code, canvas.width / 2, 780);

  context.font = '700 54px Nunito, sans-serif';
  context.fillText(result.personality.name, canvas.width / 2, 848);

  context.fillStyle = '#ff4fa3';
  context.font = '800 28px Nunito, sans-serif';
  drawWrappedText(
    context,
    result.personality.description,
    140,
    908,
    canvas.width - 280,
    42,
  );

  context.textAlign = 'left';
  context.fillStyle = '#111111';
  context.font = '800 26px Nunito, sans-serif';
  context.fillText('一句话总结', 132, 1024);

  context.font = '400 28px Nunito, sans-serif';
  let currentY = drawWrappedText(
    context,
    result.personality.detail,
    132,
    1072,
    canvas.width - 264,
    44,
  );

  currentY += 90;
  context.font = '800 26px Nunito, sans-serif';
  context.fillText('关键维度', 132, currentY);

  currentY += 26;
  result.topDimensions.forEach((dimension, index) => {
    const x = 132 + index * 308;
    context.fillStyle = '#111111';
    context.fillRect(x, currentY + 16, 260, 84);
    context.fillStyle = '#fff7ef';
    context.font = '800 22px Nunito, sans-serif';
    context.fillText(dimension.label, x + 20, currentY + 48);
    context.font = '700 30px Fredoka, sans-serif';
    context.fillText(`${dimension.value}%`, x + 20, currentY + 82);
  });

  currentY += 164;
  context.fillStyle = '#111111';
  context.font = '800 26px Nunito, sans-serif';
  context.fillText('主导模型', 132, currentY);
  context.font = '400 28px Nunito, sans-serif';
  context.fillText(
    result.topModels.map((model) => model.name).join(' / '),
    132,
    currentY + 48,
  );

  currentY += 132;
  context.strokeStyle = 'rgba(17,17,17,0.18)';
  context.beginPath();
  context.moveTo(132, currentY);
  context.lineTo(canvas.width - 132, currentY);
  context.stroke();

  context.fillStyle = '#5d534d';
  context.font = '400 20px Nunito, sans-serif';
  context.fillText('作者（公众号）：RollingLog 滑行日志', 132, currentY + 54);
  context.fillText('https://love-ti-2.netlify.app/', 132, currentY + 86);

  return canvas.toDataURL('image/png');
};

function App() {
  const [page, setPage] = useState('home');
  const [questionOrder, setQuestionOrder] = useState(() => buildQuestionOrder());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [logicOpen, setLogicOpen] = useState(false);
  const [shareImage, setShareImage] = useState('');

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
    setShareImage('');
    setPage('result');
  };

  const handleStart = () => {
    setQuestionOrder(buildQuestionOrder());
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
    setLogicOpen(false);
    setShareImage('');
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
    setShareImage('');
  };

  const handleGenerateShare = async () => {
    if (!result) {
      return;
    }

    const image = await generateShareCard(result);
    setShareImage(image);
  };

  const handleCloseShare = () => {
    setShareImage('');
  };

  return (
    <main className="app-shell">
      <div className="app-frame">
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
            onGenerateShare={handleGenerateShare}
            shareImage={shareImage}
            onCloseShare={handleCloseShare}
          />
        ) : null}

        <footer className="site-footer">
          <span>作者（公众号）：RollingLog 滑行日志</span>
          <a href="https://love-ti-2.netlify.app/" target="_blank" rel="noreferrer">
            https://love-ti-2.netlify.app/
          </a>
        </footer>
      </div>
    </main>
  );
}

export default App;
