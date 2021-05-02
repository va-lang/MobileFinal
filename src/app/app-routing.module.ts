import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/']);
 
// Automatically log in users
const redirectLoggedInToHome = () => redirectLoggedInTo(['/settings']);

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
 
  {
    path: 'login',
    loadChildren: () => import('./login-register/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'loginaftersignup',
    loadChildren: () => import('./login-register/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./login-register/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'tc',
    loadChildren: () => import('./settings/tc/tc.module').then( m => m.TcPageModule)
  },
  {
    path: 'press',
    loadChildren: () => import('./settings/press/press.module').then( m => m.PressPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./settings/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'pp',
    loadChildren: () => import('./settings/pp/pp.module').then( m => m.PpPageModule)
  },
  {
    path: 'settings',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./profile/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./preference/details/details.module').then( m => m.DetailsPageModule)
  },
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
