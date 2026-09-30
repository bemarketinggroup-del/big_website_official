(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector("[data-header]");
  const progress = document.querySelector("[data-progress]");
  let previousY = window.scrollY;
  let ticking = false;

  const headerSurfaces = [
    [".case-hero", "split"],
    [".case-intro, .case-details", "dark"],
    [".case-gallery, .case-next, .case-footer", "light"],
  ];

  headerSurfaces.forEach(([selector, contrast]) => {
    document.querySelectorAll(selector).forEach((element) => { element.dataset.headerContrast = contrast; });
  });

  const updateHeaderContrast = () => {
    if (!header) return;
    const sampleY = Math.min(65, window.innerHeight - 1);
    const surface = document.elementsFromPoint(window.innerWidth / 2, sampleY)
      .map((element) => element.closest?.("[data-header-contrast]"))
      .find(Boolean);
    const contrast = surface?.dataset.headerContrast;
    header.classList.toggle("is-on-light", contrast === "dark");
    header.classList.toggle("is-split", contrast === "split");
  };

  const updateScroll = () => {
    const currentY = window.scrollY;
    const maximum = document.documentElement.scrollHeight - window.innerHeight;

    if (progress) progress.style.transform = `scaleX(${maximum > 0 ? currentY / maximum : 0})`;
    if (header) {
      if (currentY > previousY + 6 && currentY > 120) header.classList.add("is-hidden");
      if (currentY < previousY - 6 || currentY < 80) header.classList.remove("is-hidden");
      updateHeaderContrast();
    }

    previousY = Math.max(currentY, 0);
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener("resize", updateHeaderContrast);
  updateHeaderContrast();

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .1, rootMargin: "0px 0px -7%" });
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add("is-visible"));
  }

  const galleryGrid = document.querySelector(".media-grid");
  if (galleryGrid) {
    const galleryItems = Array.from(galleryGrid.querySelectorAll("[data-gallery-src]"));

    galleryItems.forEach((item) => {
      if (item.querySelector(".gallery-caption")) return;
      const caption = document.createElement("span");
      caption.className = "gallery-caption";
      caption.textContent = item.dataset.galleryAlt || "Fotografia del progetto";
      item.append(caption);
    });

    if (galleryItems.length > 1) {
      const featured = galleryItems[0];
      const carouselItems = galleryItems.slice(1);
      const carousel = document.createElement("div");
      const track = document.createElement("div");
      const progressBar = document.createElement("div");
      const progressValue = document.createElement("span");
      const tools = document.createElement("div");
      const carouselLabel = document.createElement("span");
      const controls = document.createElement("div");
      const counter = document.createElement("span");
      const previous = document.createElement("button");
      const next = document.createElement("button");

      featured.classList.add("gallery-feature");
      carousel.className = "gallery-carousel";
      track.className = "gallery-track";
      track.setAttribute("aria-label", "Altre fotografie del progetto");
      progressBar.className = "gallery-progress";
      progressBar.setAttribute("aria-hidden", "true");
      progressBar.append(progressValue);
      carouselItems.forEach((item) => track.append(item));
      tools.className = "gallery-tools";
      carouselLabel.className = "mono";
      carouselLabel.textContent = "Altre immagini";
      controls.className = "gallery-controls";
      controls.setAttribute("aria-label", "Controlli della galleria");
      counter.className = "gallery-counter mono";
      previous.type = "button";
      previous.setAttribute("aria-label", "Fotografia precedente");
      previous.innerHTML = '<i class="ph ph-arrow-left" aria-hidden="true"></i>';
      next.type = "button";
      next.setAttribute("aria-label", "Fotografia successiva");
      next.innerHTML = '<i class="ph ph-arrow-right" aria-hidden="true"></i>';
      controls.append(counter, previous, next);
      tools.append(carouselLabel, controls);
      carousel.append(tools, track, progressBar);

      galleryGrid.classList.add("is-carousel");
      galleryGrid.replaceChildren(featured, carousel);

      let activeIndex = 0;
      let galleryFrame = 0;

      const itemLeft = (item) => item.offsetLeft - (parseFloat(getComputedStyle(track).paddingLeft) || 0);
      const updateCarousel = () => {
        activeIndex = carouselItems.reduce((closest, item, index) => (
          Math.abs(itemLeft(item) - track.scrollLeft) < Math.abs(itemLeft(carouselItems[closest]) - track.scrollLeft)
            ? index
            : closest
        ), 0);
        counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(carouselItems.length).padStart(2, "0")}`;
        progressValue.style.transform = `scaleX(${(activeIndex + 1) / carouselItems.length})`;
        previous.disabled = activeIndex === 0;
        next.disabled = activeIndex === carouselItems.length - 1;
        galleryFrame = 0;
      };

      const moveCarousel = (direction) => {
        const targetIndex = Math.max(0, Math.min(carouselItems.length - 1, activeIndex + direction));
        track.scrollTo({ left: itemLeft(carouselItems[targetIndex]), behavior: reduceMotion ? "auto" : "smooth" });
      };

      previous.addEventListener("click", () => moveCarousel(-1));
      next.addEventListener("click", () => moveCarousel(1));
      track.addEventListener("scroll", () => {
        if (galleryFrame) return;
        galleryFrame = requestAnimationFrame(updateCarousel);
      }, { passive: true });
      window.addEventListener("resize", updateCarousel);
      requestAnimationFrame(updateCarousel);
    }
  }

  const galleryButtons = Array.from(document.querySelectorAll("[data-gallery-src]"));
  if (!galleryButtons.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Galleria fotografica");
  lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Chiudi"><i class="ph ph-x"></i></button>
    <button class="lightbox-prev" type="button" aria-label="Foto precedente"><i class="ph ph-arrow-left"></i></button>
    <img alt="">
    <button class="lightbox-next" type="button" aria-label="Foto successiva"><i class="ph ph-arrow-right"></i></button>
    <span class="lightbox-count mono"></span>`;
  document.body.append(lightbox);

  const image = lightbox.querySelector("img");
  const count = lightbox.querySelector(".lightbox-count");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const previousButton = lightbox.querySelector(".lightbox-prev");
  const nextButton = lightbox.querySelector(".lightbox-next");
  let currentIndex = 0;
  let touchStartY = 0;

  const render = () => {
    const item = galleryButtons[currentIndex];
    image.src = item.dataset.gallerySrc;
    image.alt = item.dataset.galleryAlt || "Fotografia del progetto";
    count.textContent = `${currentIndex + 1} / ${galleryButtons.length}`;
    previousButton.hidden = galleryButtons.length < 2;
    nextButton.hidden = galleryButtons.length < 2;
  };

  const open = (index) => {
    currentIndex = index;
    render();
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      lightbox.style.transition = reduceMotion ? "none" : "opacity .35s ease";
      lightbox.style.opacity = "1";
      image.animate(reduceMotion ? [{ opacity: 1 }, { opacity: 1 }] : [{ transform: "translateY(70px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }], { duration: 520, easing: "cubic-bezier(.22,1,.36,1)" });
    });
    closeButton.focus();
  };

  const close = () => {
    const animation = image.animate(reduceMotion ? [{ opacity: 1 }, { opacity: 1 }] : [{ transform: "translateY(0)", opacity: 1 }, { transform: "translateY(70px)", opacity: 0 }], { duration: 300, easing: "ease-in", fill: "forwards" });
    animation.finished.finally(() => {
      lightbox.style.opacity = "0";
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      galleryButtons[currentIndex].focus();
    });
  };

  const move = (direction) => {
    currentIndex = (currentIndex + direction + galleryButtons.length) % galleryButtons.length;
    render();
  };

  galleryButtons.forEach((button, index) => button.addEventListener("click", () => open(index)));
  closeButton.addEventListener("click", close);
  previousButton.addEventListener("click", () => move(-1));
  nextButton.addEventListener("click", () => move(1));
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox) close(); });
  lightbox.addEventListener("touchstart", (event) => { touchStartY = event.changedTouches[0].clientY; }, { passive: true });
  lightbox.addEventListener("touchend", (event) => { if (event.changedTouches[0].clientY - touchStartY > 80) close(); }, { passive: true });
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft" && galleryButtons.length > 1) move(-1);
    if (event.key === "ArrowRight" && galleryButtons.length > 1) move(1);
  });
})();
