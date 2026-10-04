// 首页：渲染景点卡片 + 区域筛选 + 关键词搜索
(function () {
  const grid = document.getElementById("card-grid");
  const empty = document.getElementById("empty");
  const tabs = document.getElementById("region-tabs");
  const searchInput = document.getElementById("search-input");
  const statCount = document.getElementById("stat-count");

  let activeRegion = "全部";
  let keyword = "";

  function getCover(a) {
    return a.gradient || "linear-gradient(135deg,#1e8449,#2471a3)";
  }

  function cardHTML(a) {
    const tags = a.tags.map((t) => `<span class="tag">${t}</span>`).join("");
    return `
      <article class="card">
        <a href="attraction.html?id=${a.id}" style="text-decoration:none;color:inherit;display:block">
          <div class="cover" style="background:${getCover(a)}">
            <span>${a.emoji}</span>
            <span class="city">${a.city}</span>
          </div>
          <div class="body">
            <h3>${a.name}</h3>
            <div class="tags">${tags}</div>
            <p class="desc">${a.intro}</p>
            <span class="more">查看攻略 →</span>
          </div>
        </a>
      </article>`;
  }

  function render() {
    const kw = keyword.trim().toLowerCase();
    const list = ATTRACTIONS.filter((a) => {
      const okRegion = activeRegion === "全部" || a.region === activeRegion;
      const okKw =
        !kw ||
        a.name.toLowerCase().includes(kw) ||
        a.city.toLowerCase().includes(kw) ||
        a.tags.join("").toLowerCase().includes(kw);
      return okRegion && okKw;
    });
    grid.innerHTML = list.map(cardHTML).join("");
    empty.style.display = list.length ? "none" : "block";
    statCount.textContent = ATTRACTIONS.length;
  }

  function renderTabs() {
    tabs.innerHTML = REGIONS.map(
      (r) =>
        `<button class="chip ${r === activeRegion ? "active" : ""}" data-region="${r}">${r}</button>`
    ).join("");
    tabs.querySelectorAll(".chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeRegion = btn.dataset.region;
        renderTabs();
        render();
      });
    });
  }

  searchInput.addEventListener("input", (e) => {
    keyword = e.target.value;
    render();
  });

  renderTabs();
  render();
})();
