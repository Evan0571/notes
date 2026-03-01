(() => {
  const GISCUS_CONFIG = {
    repo: "Evan0571/notes",
    repoId: "R_kgDORbXC0w",
    category: "Announcements",
    categoryId: "DIC_kwDORbXC084C3cgv",
    mapping: "pathname",
    strict: "0",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    theme: "light",
    lang: "zh-CN",
  };

  const CONTAINER_ID = "giscus-comments";

  function currentTheme() {
    const scheme = document.body.getAttribute("data-md-color-scheme");
    return scheme === "slate" ? "dark" : "light";
  }

  function syncGiscusTheme() {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: currentTheme() } } },
      "https://giscus.app"
    );
  }

  function mountGiscus() {
    const article =
      document.querySelector("article.md-content__inner") ||
      document.querySelector(".md-content__inner.md-typeset");
    if (!article) return;

    const existing = document.getElementById(CONTAINER_ID);
    if (existing) existing.remove();

    const container = document.createElement("section");
    container.id = CONTAINER_ID;
    container.style.marginTop = "2rem";
    container.style.paddingTop = "1rem";
    container.style.borderTop = "1px solid var(--doc-line, #e6e2df)";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", GISCUS_CONFIG.repo);
    script.setAttribute("data-repo-id", GISCUS_CONFIG.repoId);
    script.setAttribute("data-category", GISCUS_CONFIG.category);
    script.setAttribute("data-category-id", GISCUS_CONFIG.categoryId);
    script.setAttribute("data-mapping", GISCUS_CONFIG.mapping);
    script.setAttribute("data-strict", GISCUS_CONFIG.strict);
    script.setAttribute("data-reactions-enabled", GISCUS_CONFIG.reactionsEnabled);
    script.setAttribute("data-emit-metadata", GISCUS_CONFIG.emitMetadata);
    script.setAttribute("data-input-position", GISCUS_CONFIG.inputPosition);
    script.setAttribute("data-theme", currentTheme());
    script.setAttribute("data-lang", GISCUS_CONFIG.lang);

    container.appendChild(script);
    article.appendChild(container);
    setTimeout(syncGiscusTheme, 300);
  }

  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(() => mountGiscus());
  } else {
    document.addEventListener("DOMContentLoaded", mountGiscus);
  }

  const observer = new MutationObserver(syncGiscusTheme);
  observer.observe(document.body, { attributes: true, attributeFilter: ["data-md-color-scheme"] });
})();
