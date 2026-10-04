// 详情页：根据 ?id= 渲染对应景点攻略（13 个标准模块）
(function () {
  const root = document.getElementById("detail-root");
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const a = ATTRACTIONS.find((x) => x.id === id);

  if (!a) {
    root.innerHTML = `<main class="container"><div class="empty">未找到该景点。<a href="index.html">返回首页</a></div></main>`;
    return;
  }

  const cover = a.gradient || "linear-gradient(135deg,#1e8449,#2471a3)";
  const tags = a.tags.map((t) => `<span class="tag">${t}</span>`).join("");
  const highlights = a.highlights.map((h) => `<li>${h}</li>`).join("");
  const routes = a.routes
    .map((r) => `<div class="route"><b>${r.title}</b><br/>${r.desc}</div>`)
    .join("");

  const related = (a.related || [])
    .map((rid) => ATTRACTIONS.find((x) => x.id === rid))
    .filter(Boolean)
    .map(
      (r) => `
      <a class="related-card" href="attraction.html?id=${r.id}" style="text-decoration:none;color:inherit">
        <div class="cover" style="background:${r.gradient}">${r.emoji}</div>
        <div class="body">${r.name}<br/><span style="color:#5d6d7e;font-weight:400">${r.city}</span></div>
      </a>`
    )
    .join("");

  const TOC = [
    ["intro", "景点简介"],
    ["highlights", "亮点看点"],
    ["best", "最佳旅行时间"],
    ["transport", "交通指南"],
    ["ticket", "门票信息"],
    ["duration", "推荐游玩时长"],
    ["routes", "行程路线"],
    ["lodging", "住宿建议"],
    ["food", "美食推荐"],
    ["tips", "避坑指南"],
    ["practical", "实用贴士"],
    ["related", "相关推荐"]
  ];

  const tocHTML = TOC.map(
    ([k, label]) => `<a href="#sec-${k}">${label}</a>`
  ).join("");

  root.innerHTML = `
    <section class="detail-hero" style="background:${cover}">
      <div class="container">
        <div class="emoji">${a.emoji}</div>
        <h1>${a.name}</h1>
        <div class="meta">📍 ${a.city} · ${a.region} · 最后更新 ${a.updated}</div>
        <div class="tags">${tags}</div>
      </div>
    </section>

    <div class="container">
      <div class="layout">
        <aside class="toc">
          <h4>本页导航</h4>
          ${tocHTML}
        </aside>
        <main>
          <section class="section" id="sec-intro">
            <h2>景点简介</h2><p>${a.intro}</p>
          </section>
          <section class="section" id="sec-highlights">
            <h2>亮点看点</h2><ul>${highlights}</ul>
          </section>
          <section class="section" id="sec-best">
            <h2>最佳旅行时间</h2><p>${a.bestTime}</p>
          </section>
          <section class="section" id="sec-transport">
            <h2>交通指南</h2><p>${a.transport}</p>
          </section>
          <section class="section" id="sec-ticket">
            <h2>门票信息</h2><p>${a.ticket}</p>
          </section>
          <section class="section" id="sec-duration">
            <h2>推荐游玩时长</h2><p>${a.duration}</p>
          </section>
          <section class="section" id="sec-routes">
            <h2>行程路线</h2>${routes}
          </section>
          <section class="section" id="sec-lodging">
            <h2>住宿建议</h2><p>${a.lodging}</p>
          </section>
          <section class="section" id="sec-food">
            <h2>美食推荐</h2><p>${a.food}</p>
          </section>
          <section class="section" id="sec-tips">
            <h2>避坑指南</h2><p>${a.tips}</p>
          </section>
          <section class="section" id="sec-practical">
            <h2>实用贴士</h2><p>${a.practical}</p>
          </section>
          <section class="section" id="sec-related">
            <h2>相关推荐</h2>
            <div class="related-grid">${related}</div>
            <a class="back-top" href="index.html#attractions">← 返回全部景点</a>
          </section>
        </main>
      </div>
    </div>`;

  document.title = `${a.name} 旅行攻略 · 旅行攻略`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", `${a.name}（${a.city}）深度旅行攻略：${a.intro.slice(0, 40)}…`);
})();
