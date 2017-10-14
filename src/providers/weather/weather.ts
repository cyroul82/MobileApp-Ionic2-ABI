import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { weatherApiKey } from '../../app/apiKey';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class WeatherProvider {

  constructor(public http: Http) {
 }

  getWeather(latitude: string, longitude: string){
    console.log('dans get weather provider');
    return this.http.get(`/weather/${weatherApiKey}/${latitude},${longitude}?units=auto&lang=fr`)
     .map(data => {
       return data.json();
     })
     .catch((err) => {
        return Observable.throw(err);
     });
  }

}
