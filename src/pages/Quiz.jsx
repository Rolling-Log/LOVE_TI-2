function Quiz({
  currentQuestion,
  currentIndex,
  orderedQuestions,
  answers,
  remainingCount,
  onSelectOption,
  onPrev,
  onNext,
  onJump,
  onFinish,
}) {
  const isLastQuestion = currentIndex === orderedQuestions.length - 1;
  const currentAnswer = answers[currentQuestion.id];
  const finishDisabled = remainingCount > 0;

  return (
    <section className="view">
      <div className="panel quiz-panel">
        <div className="quiz-headline">
          <div>
            <p className="eyebrow">QUESTION {String(currentIndex + 1).padStart(2, '0')}</p>
            <h2 className="quiz-question">{currentQuestion.question}</h2>
          </div>
          <div className="quiz-status">
            <strong>{orderedQuestions.length - remainingCount} / 30</strong>
            <span>{remainingCount === 0 ? '已全部答完，可直接看结果' : `还有 ${remainingCount} 题待补`}</span>
          </div>
        </div>

        <div className="dot-progress" aria-label="题目进度">
          {orderedQuestions.map((question, index) => {
            const answered = answers[question.id] !== undefined;
            const current = index === currentIndex;

            return (
              <button
                key={question.id}
                type="button"
                className={`dot-button${answered ? ' is-answered' : ''}${current ? ' is-current' : ''}`}
                onClick={() => onJump(index)}
                aria-label={`跳转到第 ${index + 1} 题`}
                aria-current={current ? 'step' : undefined}
              />
            );
          })}
        </div>

        <div className="quiz-card">
          <div className="option-list">
            {currentQuestion.options.map((option, index) => (
              <button
                key={option.text}
                type="button"
                className={`option-button${currentAnswer === index ? ' is-selected' : ''}`}
                onClick={() => onSelectOption(currentQuestion.id, index)}
              >
                <span className="option-index">{String.fromCharCode(65 + index)}</span>
                <span>{option.text}</span>
              </button>
            ))}
          </div>

          <div className="quiz-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onPrev}
              disabled={currentIndex === 0}
            >
              上一题
            </button>

            {isLastQuestion ? (
              <button
                type="button"
                className="primary-button"
                onClick={finishDisabled ? onNext : onFinish}
              >
                {finishDisabled ? '去补漏题' : '查看结果'}
              </button>
            ) : (
              <button type="button" className="primary-button" onClick={onNext}>
                下一题
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Quiz;
