import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TcPage } from './tc.page';

const routes: Routes = [
  {
    path: '',
    component: TcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TcPageRoutingModule {}
