(() => {
  "use strict";

  const header = document.querySelector("[data-header]");
  let previousY = window.scrollY;
  let ticking = false;

  const updateHeader = () => {
    const currentY = window.scrollY;
    const goingDown = currentY > previousY + 6;
    const goingUp = currentY < previousY - 6;

    if (header) {
      if (goingDown && currentY > 120) header.classList.add("is-hidden");
      if (goingUp || currentY < 80) header.classList.remove("is-hidden");
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
