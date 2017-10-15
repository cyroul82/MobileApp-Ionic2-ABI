import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { mapApiKey } from './apiKey';


@Injectable()
export class MapService {

    constructor(private http: Http) {
    }

    getMap(address: string){
      return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${mapApiKey}&address=${address}`)
      .map((response) => {
        var t = response.json();
        return t.results;
      })
      .catch((err) => {
         return Observable.throw(err);
      });
  
    }
}