const bookingUrl = "https://flow-state-healing-and-massage.square.site";

document.querySelectorAll("[data-booking-link]").forEach((link) => {
  link.setAttribute("href", bookingUrl);
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
});

const navToggle = document.querySelector("[data-nav-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");

if (navToggle && navPanel) {
  navToggle.addEventListener("click", () => {
    const isOpen = navPanel.getAttribute("data-open") === "true";
    navPanel.setAttribute("data-open", String(!isOpen));
    navToggle.setAttribute("aria-expanded", String(!isOpen));
  });

  navPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navPanel.setAttribute("data-open", "false");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("[data-current-year]").forEach((slot) => {
  slot.textContent = String(new Date().getFullYear());
});

/* ---- Testimonial Carousel ---- */

document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
  var slides = carousel.querySelectorAll(".carousel-slide");
  var prevBtn = carousel.querySelector("[data-carousel-prev]");
  var nextBtn = carousel.querySelector("[data-carousel-next]");
  var dotsContainer = carousel.querySelector("[data-carousel-dots]");
  var current = 0;

  // Build dots
  slides.forEach(function (_, i) {
    var dot = document.createElement("button");
    dot.className = "carousel-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
    dot.addEventListener("click", function () {
      goTo(i);
    });
    dotsContainer.appendChild(dot);
  });

  var dots = dotsContainer.querySelectorAll(".carousel-dot");

  function goTo(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  prevBtn.addEventListener("click", function () {
    goTo(current - 1);
  });

  nextBtn.addEventListener("click", function () {
    goTo(current + 1);
  });
});

/* ---- Retreat Gallery Lightbox ---- */

(function () {
  var galleryImages = document.querySelectorAll(".retreat-gallery-item img");
  if (galleryImages.length === 0) return;

  var lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.innerHTML =
    '<button class="lightbox-close" aria-label="Close">\u00D7</button>' +
    '<button class="lightbox-arrow lightbox-arrow--prev" aria-label="Previous image">\u2039</button>' +
    '<button class="lightbox-arrow lightbox-arrow--next" aria-label="Next image">\u203A</button>' +
    '<img class="lightbox-image" alt="" />';
  document.body.appendChild(lightbox);

  var lbImage = lightbox.querySelector(".lightbox-image");
  var closeBtn = lightbox.querySelector(".lightbox-close");
  var prevBtn = lightbox.querySelector(".lightbox-arrow--prev");
  var nextBtn = lightbox.querySelector(".lightbox-arrow--next");
  var current = 0;

  function open(index) {
    current = index;
    var img = galleryImages[current];
    lbImage.src = img.src;
    lbImage.alt = img.alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function next() {
    open((current + 1) % galleryImages.length);
  }

  function prev() {
    open((current - 1 + galleryImages.length) % galleryImages.length);
  }

  galleryImages.forEach(function (img, i) {
    img.addEventListener("click", function () { open(i); });
  });

  closeBtn.addEventListener("click", close);
  nextBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    next();
  });
  prevBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    prev();
  });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  });
})();

/* ---- Retreat Inquiry Form ---- */

(function () {
  var form = document.querySelector("[data-inquiry]");
  if (!form) return;

  var typeSelect = form.querySelector("[data-inquiry-type-select]");
  var conditionalFields = form.querySelectorAll("[data-inquiry-only]");

  // Thank-you message after successful submission (Formspree redirects back with ?sent=1)
  if (window.location.search.indexOf("sent=1") !== -1) {
    var thanks = document.querySelector("[data-inquiry-thanks]");
    var intro = document.querySelector(".inquiry-form-intro");
    if (thanks) thanks.hidden = false;
    if (intro) intro.hidden = true;
    form.hidden = true;
    var thanksTarget = thanks || form;
    if (thanksTarget && thanksTarget.scrollIntoView) {
      thanksTarget.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function syncFields() {
    var selected = typeSelect.value;
    conditionalFields.forEach(function (field) {
      var matches = field.getAttribute("data-inquiry-only") === selected;
      field.style.display = matches ? "" : "none";
      field.querySelectorAll("input, select, textarea").forEach(function (input) {
        if (matches) {
          input.removeAttribute("disabled");
        } else {
          input.setAttribute("disabled", "disabled");
        }
      });
    });
  }

  typeSelect.addEventListener("change", syncFields);
  syncFields();

  document.querySelectorAll("[data-inquiry-type]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var type = btn.getAttribute("data-inquiry-type");
      if (type) {
        typeSelect.value = type;
        syncFields();
      }
    });
  });
})();
