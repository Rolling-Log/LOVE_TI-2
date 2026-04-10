const dimensionLabels = {
  ATTACH: '依恋',
  CONTROL: '控制',
  INPUT: '投入',
  RESPONSE: '情绪',
  STRATEGY: '策略',
};

function Result({ result, onRestart, onGenerateShare, shareImage, onCloseShare }) {
  const { personality, percents } = result;

  return (
    <section className="view">
      <div className="panel result-panel">
        <p className="eyebrow">YOUR LOVE-TI TYPE</p>
        <h1 className="result-code">{personality.code}</h1>
        <h2 className="result-name">{personality.name}</h2>
        <p className="result-description">{personality.description}</p>

        <div className="result-copy">
          <p>{personality.detail}</p>
          <p className="result-advice">建议：{personality.advice}</p>
        </div>

        <div className="dimension-grid">
          {Object.entries(percents).map(([dimension, value]) => (
            <div key={dimension} className="dimension-row">
              <div className="dimension-header">
                <span>{dimensionLabels[dimension]}</span>
                <span>{value}%</span>
              </div>
              <div className="dimension-track" aria-hidden="true">
                <div className="dimension-fill" style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="action-row">
          <button type="button" className="primary-button" onClick={onGenerateShare}>
            生成分享图
          </button>
          <button type="button" className="secondary-button" onClick={onRestart}>
            重新测试
          </button>
        </div>
      </div>

      {shareImage ? (
        <div className="share-modal" role="dialog" aria-modal="true" aria-label="分享卡片预览">
          <div className="share-card">
            <div className="share-header">
              <div>
                <p className="eyebrow">PREVIEW</p>
                <h3>分享卡片已生成</h3>
              </div>
              <button type="button" className="icon-button" onClick={onCloseShare} aria-label="关闭">
                ×
              </button>
            </div>
            <img src={shareImage} alt={`${personality.code} 分享卡片`} className="share-preview" />
            <div className="action-row modal-actions">
              <a className="primary-button" href={shareImage} download={`love-ti-${personality.code}.png`}>
                下载 PNG
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
