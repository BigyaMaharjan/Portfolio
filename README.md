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

Update the typed profile, capability groups, experience, and project records in [profile.data.ts](portfolio-site/src/app/data/profile.data.ts). Project and experience arrays are intentionally empty until shareable details are added; the home page renders honest empty states instead of invented employers or metrics. Route-level pages live in the `home-page`, `case-study-page`, `resume-page`, and `not-found-page` files; theme and motion preferences are in `src/app/core`.

The supplied résumé is published from `src/files/Bigya-Maharjan-Resume.pdf`. Replace `YOUR_DOMAIN_HERE` in `public/robots.txt` and `public/sitemap.xml` before deployment so crawlers receive a valid production sitemap.
