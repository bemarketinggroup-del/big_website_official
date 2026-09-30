(() => {
  "use strict";

  const header = document.querySelector("[data-header]");
  let previousY = window.scrollY;
  let ticking = false;

  const updateHeaderContrast = () => {
    if (!header) return;
    const sampleY = Math.min(70, window.innerHeight - 1);
    const surface = document.elementsFromPoint(window.innerWidth / 2, sampleY)
      .map((element) => element.closest?.("[data-header-contrast]"))
      .find(Boolean);
    header.classList.toggle("is-on-light", surface?.dataset.headerContrast === "dark");
  };

  const updateHeader = () => {
    const currentY = window.scrollY;
    const goingDown = currentY > previousY + 6;
    const goingUp = currentY < previousY - 6;

    if (header) {
      if (goingDown && currentY > 120) header.classList.add("is-hidden");
      if (goingUp || currentY < 80) header.classList.remove("is-hidden");
      updateHeaderContrast();
    }

    previousY = Math.max(currentY, 0);
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener("resize", updateHeaderContrast);
  updateHeaderContrast();

  const rotatingWord = document.querySelector("[data-rotating-word]");
  const words = ["scelto.", "raccontato.", "ricordato."];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (rotatingWord && !reduceMotion) {
    let index = 0;
    window.setInterval(() => {
      rotatingWord.classList.add("is-changing");
      window.setTimeout(() => {
        index = (index + 1) % words.length;
        rotatingWord.textContent = words[index];
        rotatingWord.classList.remove("is-changing");
      }, 260);
    }, 2800);
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });

    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add("is-visible"));
  }

  const showcaseTrack = document.querySelector("[data-showcase-track]");
  const showcaseItems = Array.from(document.querySelectorAll("[data-showcase-full]"));
  const showcaseProgress = document.querySelector("[data-showcase-progress]");
  const showcasePrevious = document.querySelector("[data-showcase-prev]");
  const showcaseNext = document.querySelector("[data-showcase-next]");
  const showcaseLightbox = document.querySelector("[data-showcase-lightbox]");

  if (showcaseTrack && showcaseItems.length) {
    const updateShowcase = () => {
      const maximum = showcaseTrack.scrollWidth - showcaseTrack.clientWidth;
      const visibleShare = Math.min(1, showcaseTrack.clientWidth / showcaseTrack.scrollWidth);
      const position = maximum > 0 ? showcaseTrack.scrollLeft / maximum : 1;
      if (showcaseProgress) showcaseProgress.style.width = `${Math.max(visibleShare, position * (1 - visibleShare) + visibleShare) * 100}%`;
      if (showcasePrevious) showcasePrevious.disabled = showcaseTrack.scrollLeft < 4;
      if (showcaseNext) showcaseNext.disabled = showcaseTrack.scrollLeft > maximum - 4;
    };

    const moveShowcase = (direction) => {
      const firstCard = showcaseItems[0];
      const gap = parseFloat(getComputedStyle(showcaseTrack).gap) || 0;
      showcaseTrack.scrollBy({ left: direction * (firstCard.getBoundingClientRect().width + gap), behavior: "smooth" });
    };

    showcasePrevious?.addEventListener("click", () => moveShowcase(-1));
    showcaseNext?.addEventListener("click", () => moveShowcase(1));
    showcaseTrack.addEventListener("scroll", updateShowcase, { passive: true });
    window.addEventListener("resize", updateShowcase);
    updateShowcase();
  }

  if (showcaseLightbox && showcaseItems.length) {
    const lightboxImage = showcaseLightbox.querySelector("[data-showcase-image]");
    const lightboxCaption = showcaseLightbox.querySelector("[data-showcase-caption]");
    const lightboxCounter = showcaseLightbox.querySelector("[data-showcase-counter]");
    const lightboxStage = showcaseLightbox.querySelector("[data-showcase-stage]");
    const closeButton = showcaseLightbox.querySelector("[data-showcase-close]");
    let lightboxIndex = 0;
    let touchStartX = 0;
    let closing = false;

    const updateLightbox = (index, animate = true) => {
      lightboxIndex = (index + showcaseItems.length) % showcaseItems.length;
      const item = showcaseItems[lightboxIndex];
      if (animate) lightboxImage.classList.add("is-changing");
      window.setTimeout(() => {
        lightboxImage.src = item.dataset.showcaseFull;
        lightboxImage.alt = item.querySelector("img")?.alt || "Fotografia del progetto";
        lightboxCaption.textContent = item.dataset.showcaseCaption || "";
        lightboxCounter.textContent = `${String(lightboxIndex + 1).padStart(2, "0")} / ${String(showcaseItems.length).padStart(2, "0")}`;
        lightboxImage.classList.remove("is-changing");
      }, animate ? 140 : 0);
    };

    const openLightbox = (index) => {
      updateLightbox(index, false);
      showcaseLightbox.showModal();
      document.body.classList.add("showcase-lightbox-open");
      if (!reduceMotion) lightboxStage.animate([{ transform: "translateY(70px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }], { duration: 560, easing: "cubic-bezier(.22,1,.36,1)" });
      closeButton?.focus();
    };

    const closeLightbox = () => {
      if (!showcaseLightbox.open || closing) return;
      closing = true;
      const finish = () => {
        showcaseLightbox.close();
        document.body.classList.remove("showcase-lightbox-open");
        closing = false;
        showcaseItems[lightboxIndex].focus();
      };
      if (reduceMotion) return finish();
      lightboxStage.animate([{ transform: "translateY(0)", opacity: 1 }, { transform: "translateY(70px)", opacity: 0 }], { duration: 300, easing: "ease-in", fill: "forwards" }).finished.finally(finish);
    };

    showcaseItems.forEach((item, index) => item.addEventListener("click", () => openLightbox(index)));
    closeButton?.addEventListener("click", closeLightbox);
    showcaseLightbox.querySelector("[data-showcase-lightbox-prev]")?.addEventListener("click", () => updateLightbox(lightboxIndex - 1));
    showcaseLightbox.querySelector("[data-showcase-lightbox-next]")?.addEventListener("click", () => updateLightbox(lightboxIndex + 1));
    showcaseLightbox.addEventListener("click", (event) => { if (event.target === showcaseLightbox) closeLightbox(); });
    showcaseLightbox.addEventListener("cancel", (event) => { event.preventDefault(); closeLightbox(); });
    showcaseLightbox.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") updateLightbox(lightboxIndex - 1);
      if (event.key === "ArrowRight") updateLightbox(lightboxIndex + 1);
    });
    lightboxStage?.addEventListener("touchstart", (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
    lightboxStage?.addEventListener("touchend", (event) => {
      const distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) > 45) updateLightbox(lightboxIndex + (distance < 0 ? 1 : -1));
    }, { passive: true });
  }

  const contactForm = document.querySelector("[data-contact-form]");
  const formStatus = document.querySelector("[data-form-status]");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitButton = contactForm.querySelector("button[type='submit']");
      const formData = new FormData(contactForm);
      const payload = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        service: String(formData.get("service") || "Primo confronto").trim(),
        message: String(formData.get("message") || "").trim(),
        metadata: {
          page: window.location.href,
          form: "bmg_contact",
        },
      };

      submitButton.disabled = true;
      formStatus.textContent = "Invio in corso…";

      try {
        const response = await fetch("https://bmg-hub.vercel.app/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Lead endpoint unavailable");

        contactForm.reset();
        formStatus.textContent = "Richiesta inviata. Ti risponderemo appena possibile.";
      } catch (error) {
        formStatus.innerHTML = "Non siamo riusciti a inviare la richiesta. Puoi scriverci a <a href='mailto:info@bemarketinggroup.it'>info@bemarketinggroup.it</a>.";
      } finally {
        submitButton.disabled = false;
      }
    });
  }
})();
