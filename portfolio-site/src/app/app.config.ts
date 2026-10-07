import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  type ActivatedRouteSnapshot,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';

function isCaseStudyRoute(route: ActivatedRouteSnapshot): boolean {
  return (
    route.routeConfig?.path === 'work/:slug' ||
    route.children.some((child) => isCaseStudyRoute(child))
  );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withViewTransitions({
        onViewTransitionCreated: ({ transition, from, to }) => {
          if (!isCaseStudyRoute(from) || !isCaseStudyRoute(to)) {
            transition.skipTransition();
          }
        },
      }),
      withInMemoryScrolling({ anchorScrolling: 'disabled', scrollPositionRestoration: 'enabled' }),
    ),
  ],
};
