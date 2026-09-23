/**
 * Project dialogs and the screenshot lightbox.
 *
 * Markup contract:
 *   - A button with data-opens="<dialog id>" opens that dialog.
 *   - Any element with data-close closes the dialog it sits in.
 *   - Links inside a .gallery open in the lightbox; their href is the full-size image.
 * Without JavaScript, gallery links still open the full-size image directly.
 */
(() => {
  "use strict";

  const SWIPE_THRESHOLD_PX = 50;

  // ---- Dialogs -----------------------------------------------------------

  document.querySelectorAll("[data-opens]").forEach((button) => {
    const dialog = document.getElementById(button.dataset.opens);
    button.addEventListener("click", () => dialog.showModal());
  });

  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      // The dialog element itself has no padding, so a click whose target is
      // the dialog landed on the backdrop area outside the content.
      if (event.target === dialog || event.target.closest("[data-close]")) {
        dialog.close();
      }
    });
  });

  // ---- Lightbox ----------------------------------------------------------

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = lightbox.querySelector(".lightbox__image");

  let slides = [];
  let currentIndex = 0;

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    const link = slides[currentIndex];
    lightboxImage.src = link.href;
    lightboxImage.alt = link.querySelector("img").alt;
  }

  function openLightbox(links, index) {
    slides = links;
    showSlide(index);
    lightbox.showModal();
  }

  document.querySelectorAll(".gallery").forEach((gallery) => {
    const links = Array.from(gallery.querySelectorAll("a"));
    links.forEach((link, index) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        openLightbox(links, index);
      });
    });
  });

  lightbox.querySelectorAll("[data-step]").forEach((button) => {
    button.addEventListener("click", () => {
      showSlide(currentIndex + Number(button.dataset.step));
    });
  });

  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showSlide(currentIndex - 1);
    if (event.key === "ArrowRight") showSlide(currentIndex + 1);
  });

  // Swipe left/right on touch screens.
  let touchStartX = null;

  lightbox.addEventListener("touchstart", (event) => {
    touchStartX = event.touches.length === 1 ? event.touches[0].clientX : null;
  }, { passive: true });

  lightbox.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(deltaX) >= SWIPE_THRESHOLD_PX) {
      showSlide(currentIndex + (deltaX < 0 ? 1 : -1));
    }
  });

  lightbox.addEventListener("close", () => {
    lightboxImage.src = "data:,";
  });
})();
