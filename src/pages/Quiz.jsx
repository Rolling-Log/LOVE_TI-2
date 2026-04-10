function Quiz({ currentQuestion, currentIndex, totalQuestions, onAnswer }) {
  const progress = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <section className="view">
      <div className="panel quiz-panel">
        <div className="quiz-meta">
          <span className="progress-copy">
            {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="progress-copy">别慌，你已经比恋爱脑清醒一点了</span>
        </div>
        <div className="progress-track" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <p className="eyebrow">QUESTION {String(currentIndex + 1).padStart(2, '0')}</p>
        <h2 className="quiz-question">{currentQuestion.question}</h2>

        <div className="option-list">
          {currentQuestion.options.map((option) => (
            <button
              key={option.text}
              type="button"
              className="option-button"
              onClick={() => onAnswer(option.score)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Quiz;
