import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';

export const routes: Routes = [
  {
    path: 'user-list',
    loadComponent: () =>
      import('./user/user-list/user-list.component').then(
        (c) => c.UserListComponent
      ),
  },
  {
    path: 'test',
    loadComponent: () => import('./testing/testing.component').then(
      c => c.TestingComponent
    )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
