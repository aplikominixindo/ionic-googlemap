import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GooglemapsPage } from './googlemaps';

@NgModule({
  declarations: [
    GooglemapsPage,
  ],
  imports: [
    IonicPageModule.forChild(GooglemapsPage),
  ],
})
export class GooglemapsPageModule {}
