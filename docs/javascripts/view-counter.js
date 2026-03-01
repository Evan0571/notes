(() => {
  const META_ID = "notes-meta-line";
  const BSZ_SCRIPT_ID = "busuanzi-script";

  function formatDate(input) {
    const d = new Date(input);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  }

  function estimateReadTime(article) {
    const text = (article?.innerText || "").trim();
    const words = text ? text.split(/\s+/).length : 0;
    return Math.max(1, Math.round(words / 220));
  }

  function reloadBusuanzi() {
    const old = document.getElementById(BSZ_SCRIPT_ID);
    if (old) old.remove();
    const script = document.createElement("script");
    script.id = BSZ_SCRIPT_ID;
    script.async = true;
    script.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
    document.body.appendChild(script);
  }

  function mountMetaLine() {
    const article =
      document.querySelector("article.md-content__inner") ||
      document.querySelector(".md-content__inner.md-typeset");
    if (!article) return;

    const title = article.querySelector("h1");
    if (!title) return;

    const old = article.querySelector(`#${META_ID}`);
    if (old) old.remove();

    const meta = document.createElement("p");
    meta.id = META_ID;
    meta.className = "notes-meta-line";

    const date = formatDate(document.lastModified);
    const read = `${estimateReadTime(article)} min`;
    meta.innerHTML = `
      <span>${date}</span>
      <span>&middot;</span>
      <span>${read}</span>
      <span>&middot;</span>
      <span id="busuanzi_container_page_pv">Views: <span id="busuanzi_value_page_pv"></span></span>
    `;

    title.insertAdjacentElement("afterend", meta);
    reloadBusuanzi();
  }

  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(() => mountMetaLine());
  } else {
    document.addEventListener("DOMContentLoaded", mountMetaLine);
  }
})();

