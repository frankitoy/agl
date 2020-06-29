import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  Routes,
  RouterModule,
} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () => (await import('./pages/home/home.module')).HomeModule,
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
