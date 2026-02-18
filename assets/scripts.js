const bookingUrl = "https://flow-state-healing-and-massage.square.site/book";

document.querySelectorAll("[data-booking-link]").forEach((link) => {
  link.setAttribute("href", bookingUrl);
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
