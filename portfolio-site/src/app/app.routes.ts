import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		title: 'Bigya Maharjan — Backend Software Developer',
		data: { description: 'Backend software developer in Kathmandu, Nepal. Building and improving .NET systems across banking, telecom, government, and SaaS.' },
		loadComponent: () => import('./home-page').then((module) => module.HomePage)
	},
	{
		path: 'work/:slug',
		title: 'Case study — Bigya Maharjan',
		data: { description: 'Backend engineering case study by Bigya Maharjan.' },
		loadComponent: () => import('./case-study-page').then((module) => module.CaseStudyPage)
	},
	{
		path: 'resume',
		title: 'Résumé — Bigya Maharjan',
		data: { description: 'Résumé for Bigya Maharjan, Backend Software Developer.' },
		loadComponent: () => import('./resume-page').then((module) => module.ResumePage)
	},
	{
		path: '**',
		title: 'Page not found — Bigya Maharjan',
		data: { description: 'The requested page could not be found.' },
		loadComponent: () => import('./not-found-page').then((module) => module.NotFoundPage)
	}
];
