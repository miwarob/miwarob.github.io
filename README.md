# Flow State Healing & Massage (GitHub Pages)

Static multi-page site that mirrors the Square website structure:

- `index.html` (Home)
- `services.html`
- `store.html`
- `about.html`
- `connect.html`

`contact.html` is kept as a compatibility redirect to `connect.html`.

## Square links

Booking and store URLs are centralized in `assets/scripts.js`:

- `bookingUrl` -> `https://flow-state-healing-and-massage.square.site/book`
- `storeUrl` -> `https://flow-state-healing-and-massage.square.site/s/shop`

Any link with `data-booking-link` or `data-store-link` is automatically updated.

## GitHub Pages

1. Push this repo to GitHub.
2. In GitHub, go to Settings -> Pages.
3. Set Source to the `main` branch and `/ (root)` folder.
4. Save and wait for the Pages build to finish.
