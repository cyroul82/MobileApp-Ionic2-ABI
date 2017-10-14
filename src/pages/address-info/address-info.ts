import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Collaborateur } from '../../model/Collaborateur';
import * as _ from 'underscore';

declare var google;

@IonicPage()
@Component({
  selector: 'page-address-info',
  templateUrl: 'address-info.html',
})
export class AddressInfoPage {
  map: any;
  longitude: string;
  latitude: string;
  weather: any;
  collaborateur: Collaborateur;

  @ViewChild('map') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps : GoogleMaps) {
    this.weather = navParams.get('weather');
    this.collaborateur = navParams.get('collaborateur');
    this.latitude = navParams.get('latitude');
    this.longitude = navParams.get('longitude');    
  }

  ionViewDidLoad() {
    this.loadMap();
    console.log(_);
  }

  loadMap() {

    let latLng = new google.maps.LatLng(this.latitude, this.longitude);
    
       let mapOptions = {
         center: latLng,
         zoom: 18,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }
    
       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
       this.addMarker();

    // let mapOptions: GoogleMapOptions = {
    //   camera: {
    //     target: {
    //       lat: 43.0741904,
    //       lng: -89.3809802
    //     },
    //     zoom: 18,
    //     tilt: 30
    //   }
    // };

    // this.map = this.googleMaps.create(this.mapElement, mapOptions);
    
    //     // Wait the MAP_READY before using any methods.
    //     this.map.one(GoogleMapsEvent.MAP_READY)
    //       .then(() => {
    //         console.log('Map is ready!');
    
    //         // Now you can use all methods safely.
    //         this.map.addMarker({
    //             title: 'Ionic',
    //             icon: 'blue',
    //             animation: 'DROP',
    //             position: {
    //               lat: 43.0741904,
    //               lng: -89.3809802
    //             }
    //           })
    //           .then(marker => {
    //             marker.on(GoogleMapsEvent.MARKER_CLICK)
    //               .subscribe(() => {
    //                 alert('clicked');
    //               });
    //           });
    
    //       });
      }

      addMarker(){
        
         let marker = new google.maps.Marker({
           map: this.map,
           animation: google.maps.Animation.DROP,
           position: this.map.getCenter()
         });
        
         let content = `<h4>${this.collaborateur.Name} ${this.collaborateur.Firstname}</h4>`;         
        
         this.addInfoWindow(marker, content);
        
       }

       addInfoWindow(marker, content){
        
         let infoWindow = new google.maps.InfoWindow({
           content: content
         });
        
         google.maps.event.addListener(marker, 'click', () => {
           infoWindow.open(this.map, marker);
         });
        
       }

}
