import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressInfoPage } from './address-info';

@NgModule({
  declarations: [
    AddressInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressInfoPage),
  ],
})
export class AddressInfoPageModule {}
