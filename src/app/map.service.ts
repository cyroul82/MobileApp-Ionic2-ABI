import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { mapApiKey } from './apiKey';


@Injectable()
export class Map {

    constructor(private http: Http) {

    }

    getMap(address: string){
        return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${mapApiKey}&address=${address}`)
        .map(data => {
          var t = data['results'];
          return t[0];
        })
        .catch((err) => {
           return Observable.throw(err);
        });
    
      }
}