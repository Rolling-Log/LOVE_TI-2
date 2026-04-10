import { PSYCHOLOGY_MODELS, DIMENSIONS } from '../data/framework.js';
import { personalities } from '../data/personality.js';
import { questions } from '../data/questions.js';

const stats = [
  { label: '测试题', value: '30' },
  { label: '心理模型', value: '5' },
  { label: '评估维度', value: '15' },
  { label: '人格原型', value: '28' },
];

const questionGroups = PSYCHOLOGY_MODELS.map((model) => ({
  ...model,
  items: questions.filter((question) => question.model === model.id),
}));

const personalityGroups = PSYCHOLOGY_MODELS.map((model) => ({
  ...model,
  items: personalities.filter((personality) => personality.primaryModel === model.id),
}));

function LogicModal({ onClose }) {
  return (
    <div className="logic-modal" role="dialog" aria-modal="true" aria-label="测试逻辑图">
      <div className="logic-sheet">
        <div className="logic-sheet-header">
          <div>
            <p className="eyebrow">HOW IT WORKS</p>
            <h2>这套测试不是抽卡，而是四层映射</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="关闭逻辑图">
            ×
          </button>
        </div>

        <div className="logic-legend">
          <span>每道题只记自己的题目 ID 权重</span>
          <span>随机的是出题顺序，不随机的是记分逻辑</span>
          <span>结果来自 15 维画像与 28 原型的匹配度</span>
        </div>

        <div className="logic-pipeline">
          <section className="logic-column">
            <div className="logic-column-title">30 道题</div>
            {questionGroups.map((group) => (
              <article key={group.id} className="logic-card">
                <div className="logic-card-top">
                  <span className="logic-dot" style={{ backgroundColor: group.color }} />
                  <strong>{group.name}</strong>
                </div>
                <div className="logic-chip-grid">
                  {group.items.map((question) => (
                    <span key={question.id} className="logic-chip">
                      Q{String(question.id).padStart(2, '0')}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <div className="logic-arrow" aria-hidden="true">
            <span>→</span>
          </div>

          <section className="logic-column">
            <div className="logic-column-title">5 大心理模型</div>
            {PSYCHOLOGY_MODELS.map((model) => (
              <article key={model.id} className="logic-card logic-model-card">
                <div className="logic-card-top">
                  <span className="logic-dot" style={{ backgroundColor: model.color }} />
                  <strong>{model.name}</strong>
                </div>
                <p>{model.summary}</p>
              </article>
            ))}
          </section>

          <div className="logic-arrow" aria-hidden="true">
            <span>→</span>
          </div>

          <section className="logic-column">
            <div className="logic-column-title">15 个评估维度</div>
            {PSYCHOLOGY_MODELS.map((model) => (
              <article key={model.id} className="logic-card">
                <div className="logic-card-top">
                  <span className="logic-dot" style={{ backgroundColor: model.color }} />
                  <strong>{model.name}</strong>
                </div>
                <div className="logic-chip-grid">
                  {DIMENSIONS.filter((dimension) => dimension.model === model.id).map((dimension) => (
                    <span key={dimension.id} className="logic-chip logic-chip-detail">
                      {dimension.label}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <div className="logic-arrow" aria-hidden="true">
            <span>→</span>
          </div>

          <section className="logic-column">
            <div className="logic-column-title">28 种人格原型</div>
            {personalityGroups.map((group) => (
              <article key={group.id} className="logic-card">
                <div className="logic-card-top">
                  <span className="logic-dot" style={{ backgroundColor: group.color }} />
                  <strong>{group.name}主导型</strong>
                </div>
                <div className="logic-chip-grid">
                  {group.items.map((personality) => (
                    <span key={personality.id} className="logic-chip logic-chip-detail">
                      {personality.code}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </section>
        </div>

        <div className="logic-footnote">
          <div className="logic-mini-panel">
            <strong>判定原则</strong>
            <p>先算 15 维百分比，再汇总 5 模型，最后和 28 个原型的高维、低维、中位特征做匹配。</p>
          </div>
          <div className="logic-mini-panel">
            <strong>为什么有效</strong>
            <p>同一题无论排第几题都只记自己的维度权重，所以随机顺序不会让结果随机漂移。</p>
          </div>
          <div className="logic-mini-panel">
            <strong>边界说明</strong>
            <p>这是行为风格建模，不是医学诊断；它追求可解释、可复盘，而不是玄学抽签。</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home({ onStart, logicOpen, onOpenLogic, onCloseLogic }) {
  return (
    <section className="view view-home">
      <div className="home-grid">
        <div className="panel hero-panel">
          <p className="eyebrow">LOVE-TI / RELATIONSHIP ARCHETYPE TEST</p>
          <h1>LOVE-TI恋爱人格测试</h1>
          <p className="hero-kicker">不靠瞎猜，靠可解释的权重结构。</p>
          <p className="hero-subtitle">
            30 道有梗题，把你的恋爱脑拆成 5 大心理模型、15 个评估维度，再映射到 28 种人格原型。
          </p>

          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={onStart}>
              开始测试
            </button>
            <button type="button" className="secondary-button" onClick={onOpenLogic}>
              查看内在逻辑图
            </button>
          </div>

          <div className="stat-row">
            {stats.map((item) => (
              <div key={item.label} className="stat-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="panel home-side-panel">
          <p className="eyebrow">NOT RANDOM</p>
          <h2>你看到的是题目随机，系统记的是维度稳定。</h2>
          <ul className="home-points">
            <li>每次打开页面，30 题顺序都会重新洗牌。</li>
            <li>每道题的分数固定绑定题目 ID，不会因为顺序变化而改结果。</li>
            <li>结果页会给出人格画像、5 大模型强弱和 15 维细分解释。</li>
          </ul>
        </div>
      </div>

      {logicOpen ? <LogicModal onClose={onCloseLogic} /> : null}
    </section>
  );
}

export default Home;
