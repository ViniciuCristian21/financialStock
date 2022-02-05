import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products-form',
    loadChildren: () => import('./pages/products-form/products-form.module').then( m => m.ProductsFormPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products-form/edit/:id',
    loadChildren: () => import('./pages/products-form/products-form.module').then( m => m.ProductsFormPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products-form/new',
    loadChildren: () => import('./pages/products-form/products-form.module').then( m => m.ProductsFormPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sales',
    loadChildren: () => import('./pages/sales/sales.module').then( m => m.SalesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sales-history',
    loadChildren: () => import('./pages/sales-history/sales-history.module').then( m => m.SalesHistoryPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users-form',
    loadChildren: () => import('./pages/users-form/users-form.module').then( m => m.UsersFormPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users-form/edit/:id',
    loadChildren: () => import('./pages/users-form/users-form.module').then( m => m.UsersFormPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users-form/new',
    loadChildren: () => import('./pages/users-form/users-form.module').then( m => m.UsersFormPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'accounting',
    loadChildren: () => import('./pages/accounting/accounting.module').then( m => m.AccountingPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
