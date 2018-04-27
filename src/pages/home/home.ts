import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoogleMaps, GoogleMap } from '@ionic-native/google-maps';
import { ViewChild, ElementRef } from '@angular/core';
import {
  CameraPosition,
  LatLng,
  GoogleMapsEvent,
  Marker, MarkerOptions
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { mapStyle } from './mapStyle';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;

  constructor(public navCtrl: NavController,
    private _googleMaps: GoogleMaps,
    private _geoLoc: Geolocation) {
  }

  // buka map setelah tampilan diinisialisasi
  ngAfterViewInit() {
    let loc: LatLng;
    // inisialisasi map
    this.initMap();

    // jika map sudah siap dengan sempurna
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      // mengambil lokasi saat ini berada
      this.getLocation().then(res => {
        // jika lokasi saat ini sudah didapatkan
        // kirim ke camera position
        loc = new LatLng(
          res.coords.latitude, res.coords.longitude
        );
        this.moveCamera(loc);

        // buat marker location
        this.createMarker(loc, "My Location.")
          .then((marker: Marker) => {
            marker.showInfoWindow();
          })
          .catch(err => {
            console.log('Marker error: ', err);
          });
      })
        .catch(err => {
          console.log('Camera position error: ', err);
        });
    });

    // geolocation
    this.getLocation().then(res => {
      // lokasi disimpan dalam res
      console.log('latitude: ', res.coords.latitude);
      console.log('longitude: ', res.coords.longitude);
    })
      .catch(err => {
        console.log('Geolocation error: ', err);
      });

  }

  // membuat marker google map
  createMarker(loc: LatLng, keterangan: string) {
    let markerOptions: MarkerOptions = {
      position: loc,
      title: keterangan
    };
    return this.map.addMarker(markerOptions);
  }

  // memindah camera location
  moveCamera(loc: LatLng) {
    let cameraOptions: CameraPosition<any> = {
      // spesifikasi map yg dibuka
      target: loc,
      zoom: 15,
      tilt: 10
    }
    this.map.moveCamera(cameraOptions);
  }

  // mengambil lokasi saat ini berada
  getLocation() {
    return this._geoLoc.getCurrentPosition();
  }

  // membuka map
  initMap() {
    let element = this.mapElement.nativeElement;
    let time = new Date().getHours();
    let style = [];

    // ubah style menjadi mode malam diantara pk. 19 sampai pk. 5
    if (this.isNight()) {
      style = mapStyle;
    }

    //this.map = this._googleMaps.create(element);// deprecated
    this.map = GoogleMaps.create(element, { styles: [] });
  }

  // jika mode malam
  isNight() {
    let time = new Date().getHours();
    return (time > 5 && time < 19) ? false : true;
  }

}