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
    theme: "preferred_color_scheme",
    lang: "zh-CN",
  };

  const CONTAINER_ID = "giscus-comments";

  function mountGiscus() {
    const article = document.querySelector(".md-content__inner .md-content");
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
    script.setAttribute("data-theme", GISCUS_CONFIG.theme);
    script.setAttribute("data-lang", GISCUS_CONFIG.lang);

    container.appendChild(script);
    article.appendChild(container);
  }

  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(() => mountGiscus());
  } else {
    document.addEventListener("DOMContentLoaded", mountGiscus);
  }
})();
