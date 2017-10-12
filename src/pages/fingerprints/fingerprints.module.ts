import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FingerprintsPage } from './fingerprints';

@NgModule({
  declarations: [
    FingerprintsPage,
  ],
  imports: [
    IonicPageModule.forChild(FingerprintsPage),
  ],
})
export class FingerprintsPageModule {}
