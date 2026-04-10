function Home({ onStart }) {
  return (
    <section className="view view-home">
      <div className="brand-mark">ENTERTAINMENT PERSONALITY TEST</div>
      <div className="panel hero-panel">
        <p className="eyebrow">LOVE-TI</p>
        <h1>恋爱人格测试</h1>
        <p className="hero-subtitle">测测你在恋爱里有多离谱</p>
        <p className="hero-description">
          30 道单选题，5 条恋爱维度，1 张适合发朋友圈的社死成绩单。
        </p>
        <button type="button" className="primary-button" onClick={onStart}>
          开始测试
        </button>
      </div>
    </section>
  );
}

export default Home;

