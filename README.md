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

Update the typed profile in [profile.data.ts](portfolio-site/src/app/data/profile.data.ts), capability groups in [capabilities.data.ts](portfolio-site/src/app/data/capabilities.data.ts), career details in [experience.data.ts](portfolio-site/src/app/data/experience.data.ts), and project records in [projects.data.ts](portfolio-site/src/app/data/projects.data.ts). Their contracts are in [portfolio.models.ts](portfolio-site/src/app/data/portfolio.models.ts). Current roles, education, and five project summaries are transcribed from the supplied résumé. Only role-level metrics are listed because no project-specific outcomes, timeframes, or detailed trade-offs were provided. Review project confidentiality notes before publishing. Route-level pages live in the `home-page`, `case-study-page`, `resume-page`, and `not-found-page` files; theme and motion preferences are in `src/app/core`.

The supplied résumé is published from `src/files/Bigya-Maharjan-Resume.pdf`. Ncell Modular and GIBL have Google Play and App Store placeholders in [projects.data.ts](portfolio-site/src/app/data/projects.data.ts); add each store listing URL to its `storeLinks` entry when ready. Replace `YOUR_DOMAIN_HERE` in `public/robots.txt` and `public/sitemap.xml` before deployment so crawlers receive a valid production sitemap.
