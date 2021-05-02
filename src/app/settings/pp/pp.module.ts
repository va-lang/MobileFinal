import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PpPageRoutingModule } from './pp-routing.module';

import { PpPage } from './pp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PpPageRoutingModule
  ],
  declarations: [PpPage]
})
export class PpPageModule {}
