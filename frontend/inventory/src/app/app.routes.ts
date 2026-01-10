import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
	{
		path: 'login',
		loadComponent: () => import('./components/auth/login/login')
		.then(m => m.LoginComponent)
  	},
	{
		path: 'update-password',
		loadComponent: () => import('./components/auth/password-update/password-update')
		.then(m => m.PasswordUpdateComponent)
	},
	{
		path: 'dashboard',
		canActivate: [authGuard],
		loadComponent: () => import('./components/dashboard/dashboard')
			.then(m => m.DashboardComponent),
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'stocks' // Default fallback, handled by dashboard component
			},
			{
				path: 'stocks',
				loadComponent: () => import('./components/stocks/stocks')
					.then(m => m.StocksComponent)
			},
			{
				path: 'sales',
				loadComponent: () => import('./components/sales/sales')
					.then(m => m.SalesComponent)
			},
			{
				path: 'users',
				loadComponent: () => import('./components/users/user-list/user-list')
					.then(m => m.UserListComponent)
			}
		]
	},
  {
    path: '',  // Default route
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
