function Result({ result, onRestart, onRetake, onGenerateShare, shareImage, onCloseShare }) {
  const { personality, topDimensions, lowDimensions, topModels, modelCards, explainers } = result;

  return (
    <section className="view">
      <div className="panel result-panel">
        <div className="result-hero">
          <div className="result-copy-block">
            <p className="eyebrow">YOUR LOVE-TI TYPE</p>
            <h1 className="result-code">{personality.code}</h1>
            <h2 className="result-name">{personality.name}</h2>
            <p className="result-description">{personality.description}</p>
            <div className="result-copy">
              <p>{personality.detail}</p>
              <p className="result-advice">建议：{personality.advice}</p>
            </div>
          </div>

          <div className="portrait-card">
            <img src={personality.image} alt={personality.name} className="portrait-image" />
          </div>
        </div>

        <div className="result-summary-grid">
          <article className="summary-panel">
            <span className="summary-label">主导模型</span>
            <strong>{topModels.map((model) => model.name).join(' / ')}</strong>
            <p>你最明显的驱动力来自这两套系统，它们决定了你在关系里最常用的默认打法。</p>
          </article>
          <article className="summary-panel">
            <span className="summary-label">最高维度</span>
            <strong>{topDimensions.map((dimension) => dimension.label).join(' / ')}</strong>
            <p>这些维度是你结果被判到当前人格原型的关键抓手，不是凭空抽中的形容词。</p>
          </article>
          <article className="summary-panel">
            <span className="summary-label">低位维度</span>
            <strong>{lowDimensions.map((dimension) => dimension.label).join(' / ')}</strong>
            <p>这些地方相对不主导你，也让你和相似人格之间拉开了差别。</p>
          </article>
        </div>

        <section className="trace-panel">
          <div className="trace-header">
            <div>
              <p className="eyebrow">RESULT TRACE</p>
              <h3>你的结果怎么来的</h3>
            </div>
          </div>
          <div className="trace-steps">
            {explainers.map((line) => (
              <div key={line} className="trace-step">
                <span className="trace-badge" />
                <p>{line}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="model-board">
          {modelCards.map((model) => (
            <article key={model.id} className="model-panel">
              <div className="model-panel-header">
                <div>
                  <p className="model-name">{model.name}</p>
                  <p className="model-summary">{model.summary}</p>
                </div>
                <strong style={{ color: model.color }}>{model.value}%</strong>
              </div>

              <div className="dimension-grid">
                {model.dimensions.map((dimension) => (
                  <div key={dimension.id} className="dimension-row">
                    <div className="dimension-header">
                      <span>{dimension.label}</span>
                      <span>{dimension.value}%</span>
                    </div>
                    <div className="dimension-track" aria-hidden="true">
                      <div
                        className="dimension-fill"
                        style={{ width: `${dimension.value}%`, background: model.color }}
                      />
                    </div>
                    <p className="dimension-note">{dimension.description}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="action-row">
          <button type="button" className="primary-button" onClick={onGenerateShare}>
            分享我的恋爱人格
          </button>
          <button type="button" className="secondary-button" onClick={onRetake}>
            再测一次
          </button>
          <button type="button" className="secondary-button" onClick={onRestart}>
            返回首页
          </button>
        </div>
      </div>

      {shareImage ? (
        <div className="share-modal" role="dialog" aria-modal="true" aria-label="分享卡片预览">
          <div className="share-card">
            <div className="share-header">
              <div>
                <p className="eyebrow">SHARE CARD</p>
                <h3>可下载的竖版 A4 分享卡</h3>
              </div>
              <button type="button" className="icon-button" onClick={onCloseShare} aria-label="关闭预览">
                ×
              </button>
            </div>

            <img src={shareImage} alt={`${personality.name}分享卡`} className="share-preview" />

            <div className="action-row">
              <a className="primary-button" href={shareImage} download={`love-ti-${personality.code}.png`}>
                下载图片
              </a>
              <button type="button" className="secondary-button" onClick={onCloseShare}>
                关闭预览
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default Result;
