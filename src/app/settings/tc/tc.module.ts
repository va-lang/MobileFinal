import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TcPageRoutingModule } from './tc-routing.module';

import { TcPage } from './tc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TcPageRoutingModule
  ],
  declarations: [TcPage]
})
export class TcPageModule {}
