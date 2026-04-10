import { useState } from 'react';
import Home from './pages/Home.jsx';
import Quiz from './pages/Quiz.jsx';
import Result from './pages/Result.jsx';
import { DIMENSIONS, EMPTY_SCORES, TOTAL_QUESTIONS, questions } from './data/questions.js';
import { getDimensionPercents, getResultType } from './utils/calculateResult.js';

const createEmptyScores = () => ({ ...EMPTY_SCORES });

const mergeScores = (baseScores, optionScores) =>
  DIMENSIONS.reduce((result, dimension) => {
    result[dimension] = (baseScores[dimension] ?? 0) + (optionScores[dimension] ?? 0);
    return result;
  }, {});

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
};

const generateShareCard = (personality) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;

  const context = canvas.getContext('2d');

  if (!context) {
    return '';
  }

  context.fillStyle = '#f5f1e8';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = 'rgba(15, 15, 15, 0.1)';
  context.lineWidth = 1;

  for (let x = 80; x < canvas.width; x += 110) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }

  for (let y = 90; y < canvas.height; y += 110) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
  }

  context.fillStyle = '#111111';
  context.fillRect(70, 70, canvas.width - 140, canvas.height - 140);

  context.strokeStyle = '#f5f1e8';
  context.lineWidth = 2;
  context.strokeRect(110, 110, canvas.width - 220, canvas.height - 220);

  context.fillStyle = '#f5f1e8';
  context.font = '700 34px "Space Grotesk", "Arial Narrow", sans-serif';
  context.fillText('LOVE-TI', 150, 180);

  context.font = '400 24px "Space Grotesk", "Noto Sans SC", sans-serif';
  context.fillText('ENTERTAINMENT RELATIONSHIP PERSONALITY', 150, 220);

  context.font = '700 128px "Space Grotesk", Impact, sans-serif';
  context.fillText(personality.code, 150, 430);

  context.font = '700 44px "Noto Sans SC", sans-serif';
  context.fillText(personality.name, 150, 510);

  context.font = '400 52px "Noto Sans SC", sans-serif';
  drawWrappedText(context, personality.description, 150, 650, 770, 76);

  context.font = '400 28px "Noto Sans SC", sans-serif';
  drawWrappedText(context, personality.advice, 150, 890, 760, 44);

  context.fillRect(150, 1030, 770, 2);

  context.font = '400 24px "Space Grotesk", "Noto Sans SC", sans-serif';
  context.fillText('find out how absurd you get in love', 150, 1085);
  context.fillText('love-ti / made for screenshots and public embarrassment', 150, 1135);

  return canvas.toDataURL('image/png');
};

function App() {
  const [page, setPage] = useState('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState(createEmptyScores);
  const [result, setResult] = useState(null);
  const [shareImage, setShareImage] = useState('');

  const handleStart = () => {
    setScores(createEmptyScores());
    setCurrentQuestionIndex(0);
    setResult(null);
    setShareImage('');
    setPage('quiz');
  };

  const handleAnswer = (optionScore) => {
    const nextScores = mergeScores(scores, optionScore);

    if (currentQuestionIndex === TOTAL_QUESTIONS - 1) {
      const personality = getResultType(nextScores);
      const percents = getDimensionPercents(nextScores);

      setScores(nextScores);
      setResult({
        personality,
        percents,
        scores: nextScores,
      });
      setPage('result');
      setCurrentQuestionIndex(TOTAL_QUESTIONS);
      return;
    }

    setScores(nextScores);
    setCurrentQuestionIndex((previous) => previous + 1);
  };

  const handleRestart = () => {
    setScores(createEmptyScores());
    setCurrentQuestionIndex(0);
    setResult(null);
    setShareImage('');
    setPage('home');
  };

  const handleGenerateShare = () => {
    if (!result) {
      return;
    }

    const image = generateShareCard(result.personality);
    setShareImage(image);
  };

  const closeShareImage = () => {
    setShareImage('');
  };

  return (
    <main className="app-shell">
      {page === 'home' ? <Home onStart={handleStart} /> : null}

      {page === 'quiz' ? (
        <Quiz
          currentQuestion={questions[currentQuestionIndex]}
          currentIndex={currentQuestionIndex}
          totalQuestions={TOTAL_QUESTIONS}
          onAnswer={handleAnswer}
        />
      ) : null}

      {page === 'result' && result ? (
        <Result
          result={result}
          onRestart={handleRestart}
          onGenerateShare={handleGenerateShare}
          shareImage={shareImage}
          onCloseShare={closeShareImage}
        />
      ) : null}
    </main>
  );
}

export default App;
