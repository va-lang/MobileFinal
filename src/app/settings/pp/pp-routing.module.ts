import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PpPage } from './pp.page';

const routes: Routes = [
  {
    path: '',
    component: PpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpPageRoutingModule {}
