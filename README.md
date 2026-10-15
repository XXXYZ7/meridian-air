# Charter and flight school website

Plain HTML, CSS and JavaScript. No build step.

| File | Purpose |
|---|---|
| `config.js` | **The only file you edit.** Name, contact details, rates, aircraft, colors, form and analytics IDs |
| `index.html` | Home page |
| `privacy.html`, `terms.html` | Legal pages (template, needs legal review) |
| `dashboard.html` | Pilot management dashboard prototype (sample data) |
| `assets/` | Logo and photos |

## 1. Replace the placeholders
Open `config.js` and change every line marked `CHANGE ME`: company name, legal name, address, phone, email,
home-base airport, fleet (name, seats, speed, range, hourly rate), airports, school prices and the cancellation policy.
Everything on the pages, including the estimator and program prices, updates from that file.

## 2. Logo, photos and brand colors
1. Add the logo and photos to `assets/` (see `assets/README.txt`).
2. In `config.js` set `company.logo`, `brand.heroImage` and each aircraft `photo`.
3. Set `brand.accent`, `brand.accentOnDark` and `brand.hero` to the client's colors. Button text color is chosen automatically.
4. Set `hero.showBoard` to `false`. The departures board shows sample data.

## 3. Make the contact form deliver
1. Create a free account at formspree.io and click **New form**. Enter the email address that should receive enquiries.
2. Copy the form URL, for example `https://formspree.io/f/abcdwxyz`.
3. Paste it into `form.endpoint` in `config.js`, publish, then send a test message and confirm it arrives.
Until the endpoint is set, the form tells visitors to email or call instead. Spam is reduced by a hidden honeypot field.

## 4. Analytics
- **Plausible (recommended):** add the site at plausible.io, then set `analytics.plausibleDomain` to the domain. No cookies, no banner.
- **Google Analytics:** set `analytics.gaId` (G-XXXXXXXXXX). A consent banner appears and analytics load only after the visitor accepts.
Events recorded: `Quote Requested` and `Contact Form Sent`.

## 5. Privacy and Terms
Both pages fill in the company details automatically. They are templates, not legal advice. Have an attorney review them,
adjust the operator, cancellation and liability language to the client's real policies, then set `legal.review` to `false`
to remove the draft banner.

## 6. Publish
GitHub Pages: push these files to a repo, then **Settings > Pages > Deploy from a branch > main / root**.
Netlify, Vercel or Cloudflare Pages also work: connect the repo and leave the build command empty.
Custom domain: add it in the host's settings and create the DNS records it shows. HTTPS is automatic.

## Before launch checklist
- [ ] Every `CHANGE ME` replaced, sample departures hidden
- [ ] Rates, segment fee and excise tax confirmed by the client
- [ ] Test form message received
- [ ] Analytics showing a visit
- [ ] Privacy and Terms approved by a lawyer
- [ ] Checked on a phone
