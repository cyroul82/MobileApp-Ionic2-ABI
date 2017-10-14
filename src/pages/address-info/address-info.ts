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
  icon: string;
  date: string;

  @ViewChild('map') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps : GoogleMaps) {
    this.weather = navParams.get('weather');
    let d = new Date(this.weather.currently.time * 1000);
    this.date = d.toLocaleString();
    this.icon = this.getWeatherIcon(this.weather.currently.icon);
    this.collaborateur = navParams.get('collaborateur');
    this.latitude = navParams.get('latitude');
    this.longitude = navParams.get('longitude');    
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    let latLng = new google.maps.LatLng(this.latitude, this.longitude);
    
       let mapOptions = {
         center: latLng,
         zoom: 10,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }
    
       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
       this.addMarker();
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

       getWeatherIcon(iconName: string){
         let r: string;
         switch(iconName){
           case "clear-day":
              r = "wi wi-day-sunny";
              break;
            case "clear-night":
              r = "wi wi-night-clear";
              break;
            case "partly-cloudy-day":
              r = "wi wi-day-cloudy";
              break;
            case "partly-cloudy-night":
              r = "wi wi-night-alt-cloudy";
              break;
            case "cloudy":
              r = "wi wi-cloudy";
              break;
            case "rain":
              r = "wi wi-rain";
              break;
            case "sleet":
              r = "wi day-sleet";
              break;
             case "snow":
              r = "wi wi-snow";
              break;
            case "wind":
              r = "wi wi-wind";
              break;
            case "fog":
              r = "wi wi-fog";
              break;
            default:
              r= "wi wi-alien";
         }
         return r;
      }
       
}
