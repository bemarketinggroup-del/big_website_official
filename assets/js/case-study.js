(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector("[data-header]");
  const progress = document.querySelector("[data-progress]");
  let previousY = window.scrollY;
  let ticking = false;

  const updateScroll = () => {
    const currentY = window.scrollY;
    const maximum = document.documentElement.scrollHeight - window.innerHeight;

    if (progress) progress.style.transform = `scaleX(${maximum > 0 ? currentY / maximum : 0})`;
    if (header) {
      if (currentY > previousY + 6 && currentY > 120) header.classList.add("is-hidden");
      if (currentY < previousY - 6 || currentY < 80) header.classList.remove("is-hidden");
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
