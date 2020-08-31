import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./features/core/guards/auth.guard";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'editor',
    pathMatch: 'full'
  },
  {
    path: 'editor',
    loadChildren: () => import('./features/editor/editor.module').then(m => m.EditorModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'editor'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
