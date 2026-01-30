const bookingUrl = "https://flow-state-healing-and-massage.square.site";

document.querySelectorAll("[data-booking-link]").forEach((link) => {
  link.setAttribute("href", bookingUrl);
});

