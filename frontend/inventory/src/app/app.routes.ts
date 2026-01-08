import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
	{
		path: 'login',
		loadComponent: () => import('./components/auth/login/login')
		.then(m => m.LoginComponent)
  	},
	{
		path: 'dashboard',
		canActivate: [authGuard],
		loadComponent: () => import('./components/dashboard/dashboard')
			.then(m => m.DashboardComponent)
	},
  {
    path: '',  // Default route
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
