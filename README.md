# Portfolio

An Angular 21 portfolio for Bigya Maharjan, a backend software developer focused on C# and .NET. Built with TypeScript and Anime.js.

## Run locally

```powershell
cd portfolio-site
npm install
npm start
```

Open `http://localhost:4200` in your browser.

## Personalize

Update the typed profile in [profile.data.ts](portfolio-site/src/app/data/profile.data.ts), capability groups in [capabilities.data.ts](portfolio-site/src/app/data/capabilities.data.ts), career details in [experience.data.ts](portfolio-site/src/app/data/experience.data.ts), and project records in [projects.data.ts](portfolio-site/src/app/data/projects.data.ts). Their contracts are in [portfolio.models.ts](portfolio-site/src/app/data/portfolio.models.ts). Project and employer-specific experience arrays are intentionally empty until shareable details are added; the site omits unverified claims. Route-level pages live in the `home-page`, `case-study-page`, `resume-page`, and `not-found-page` files; theme and motion preferences are in `src/app/core`.

The supplied résumé is published from `src/files/Bigya-Maharjan-Resume.pdf`. Replace `YOUR_DOMAIN_HERE` in `public/robots.txt` and `public/sitemap.xml` before deployment so crawlers receive a valid production sitemap.
