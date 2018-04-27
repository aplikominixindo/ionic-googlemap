import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMaps }
  from '@ionic-native/google-maps';
import { ViewChild, ElementRef } from '@angular/core';
import {
  CameraPosition,
  LatLng,
  GoogleMapsEvent,
  Marker, MarkerOptions
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { mapStyle } from '../home/mapStyle';

@IonicPage()
@Component({
  selector: 'page-googlemaps',
  templateUrl: 'googlemaps.html',
})
export class GooglemapsPage {
  @ViewChild('map') mapElement: ElementRef;
  private map: GoogleMap;
  private location: LatLng;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform) {
    //this.loadMap();
    this.location = new LatLng(-7.3221912, 112.7449952);
  }

  /*loadMap() {
    let location = new LatLng(-7.3221912, 112.7449952);
  }*/

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      console.log('ionViewDidLoad GooglemapsPage');

      let element = this.mapElement.nativeElement;
      this.map = GoogleMaps.create(element);

      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        let options = {
          target: this.location,
          zoom: 15
        };
        
        this.map.moveCamera(options);
        setTimeout(() => {
          this.addMarker()
        }, 3000);
      });
    });

  }

  addMarker() {
    this.map.addMarker({
      title: 'Lokasiku',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.location.lat,
        lng: this.location.lng
      }
    })
      .then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          alert('Lokasiku diklik!');
        });
      });
  }

}
