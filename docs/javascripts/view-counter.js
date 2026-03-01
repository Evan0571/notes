(() => {
  const COUNTER_ID = "notes-view-counter";

  function mountCounter() {
    const article =
      document.querySelector("article.md-content__inner") ||
      document.querySelector(".md-content__inner.md-typeset");
    if (!article) return;

    const old = document.getElementById(COUNTER_ID);
    if (old) old.remove();

    const wrap = document.createElement("section");
    wrap.id = COUNTER_ID;
    wrap.className = "notes-view-counter";
    wrap.innerHTML = `
      <span id="busuanzi_container_site_uv">Visitors: <span id="busuanzi_value_site_uv"></span></span>
      <span id="busuanzi_container_site_pv">Views: <span id="busuanzi_value_site_pv"></span></span>
      <span id="busuanzi_container_page_pv">Page Views: <span id="busuanzi_value_page_pv"></span></span>
    `;

    article.appendChild(wrap);
  }

  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(() => mountCounter());
  } else {
    document.addEventListener("DOMContentLoaded", mountCounter);
  }
})();
