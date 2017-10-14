import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { weatherApiKey } from '../../app/apiKey';


@Injectable()
export class WeatherProvider {

  constructor(public http: Http) {
 }

  getWeather(latitude: string, longitude: string){
    return this.http.get(`/weather/${weatherApiKey}/${latitude},${longitude}?units=ca&lang=fr`)
     .map(data => {
       return data.json();
     })
     .catch((err) => {
        return Observable.throw(err);
     });
  }

}
