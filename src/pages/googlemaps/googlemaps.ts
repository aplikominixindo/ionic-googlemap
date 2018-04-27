import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng }
 from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-googlemaps',
  templateUrl: 'googlemaps.html',
})
export class GooglemapsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GooglemapsPage');
  }

}
