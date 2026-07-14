(() => {
  const endpoint = "https://bmg-hub.vercel.app/api/public-site-content";

  function projectSlug() {
    const file = location.pathname.split("/").pop() || "";
    return file.replace(/\.html$/i, "");
  }

  function normalize(rows) {
    return rows.reduce((content, row) => {
      content[row.slug] = { title: row.title || "", ...(row.payload || {}) };
      return content;
    }, {});
  }

  function text(element, value) {
    if (element && value) element.textContent = value;
  }

  function parts(value, separator = /\n|\|/) {
    return String(value || "").split(separator).map((item) => item.trim()).filter(Boolean);
  }

  function projectAsset(url) {
    if (!url || /^(?:https?:|data:|\/)/i.test(url)) return url;
    return /^(?:assets|projects)\//.test(url) ? `../${url}` : url;
  }

  function renderTags(container, value) {
    if (!container || !value) return;
    container.replaceChildren(...parts(value).map((label) => {
      const item = document.createElement("span");
      item.className = "tag";
      item.textContent = label;
      return item;
    }));
  }

  function renderStats(container, value) {
    if (!container || !value) return;
    const stats = parts(value, /\n/).map((line) => line.split("::").map((item) => item.trim())).filter(([key, label]) => key && label);
    if (!stats.length) return;
    container.replaceChildren(...stats.map(([key, label]) => {
      const item = document.createElement("div");
      item.className = "stat";
      const number = document.createElement("div");
      number.className = "stat-k";
      number.textContent = key;
      const caption = document.createElement("div");
      caption.className = "stat-v mono";
      caption.textContent = label;
      item.append(number, caption);
      return item;
    }));
  }

  function hydrateProject(cms) {
    const slug = projectSlug();
    if (!slug) return;

    const hero = cms[`project.${slug}.hero`] || {};
    const meta = cms[`project.${slug}.meta`] || {};
    const story = cms[`project.${slug}.story`] || {};
    const services = cms[`project.${slug}.services`] || {};
    const cta = cms[`project.${slug}.cta`] || {};

    text(document.querySelector("h1"), hero.title);
    text(document.querySelector(".eyebrow .mono"), hero.subtitle);
    text(document.querySelector(".lead"), hero.body);
    text(document.querySelector(".bio"), story.subtitle);
    text(document.querySelector(".grid-2 > .reveal:nth-child(2) p"), story.body);

    const metaItems = document.querySelectorAll(".meta span");
    text(metaItems[0], meta.title);
    text(metaItems[1], meta.subtitle);
    text(metaItems[2], meta.body);
    if (meta.subtitle) text(document.querySelector(".crumb"), `Case study · ${meta.subtitle.replace(/^Anno\s+/i, "")}`);

    renderTags(document.querySelector(".tags"), services.subtitle);
    renderStats(document.querySelector(".stats"), services.body);

    for (let index = 1; index <= 5; index += 1) {
      const image = cms[`project.${slug}.gallery.${index}`] || {};
      const slot = document.querySelector(`image-slot[id$="-g${index}"]`);
      if (!slot) continue;
      if (image.image_url) slot.setAttribute("src", projectAsset(image.image_url));
      if (image.image_alt) slot.setAttribute("aria-label", image.image_alt);
    }

    const ctaHeading = document.querySelector(".cta h2");
    const ctaPrimary = document.querySelector(".cta .btn-primary");
    text(ctaHeading, cta.title);
    if (ctaPrimary) {
      if (cta.cta_url) ctaPrimary.href = projectAsset(cta.cta_url);
      if (cta.cta_label) ctaPrimary.firstChild.textContent = `${cta.cta_label} `;
    }

    if (hero.title) document.title = `${hero.title} — Case study · BMG`;
  }

  document.querySelectorAll('a[href^="index.html#"]').forEach((link) => {
    link.href = `../${link.getAttribute("href")}`;
  });

  fetch(endpoint)
    .then((response) => response.ok ? response.json() : [])
    .then((rows) => hydrateProject(normalize(Array.isArray(rows) ? rows : [])))
    .catch(() => {});
})();
