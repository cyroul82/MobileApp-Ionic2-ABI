import { Injectable, EventEmitter } from '@angular/core';
import { Collaborateur } from '../model/Collaborateur';
import { HttpClient } from '@angular/common/http';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CollaborateurService {

  collaborateurs: Collaborateur[];

  collaborateurUpdated = new EventEmitter<Collaborateur>();
  collaborateurAdded = new EventEmitter<string>();

  constructor(private http: HttpClient, private http_: Http){
    this.collaborateurs = [];
    this.http.get('http://192.168.100.50:10000/Service1.svc/rest/collabos').subscribe(data => {

      var d = data as Collaborateur[];
      d.forEach( c => {
        this.collaborateurs.push(c);
      });

    },
    err => {
      console.log("Error getting Collabo : ", err);
    });
  }

  logStatusChange(status: string){
    console.log('Collaborateur changed : ', status);
  }
  saveCollaborateurs(collaborateurs: any[]){
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    // return this.http_.post('https://mobileapp-ionic.firebaseio.com/data.json', collaborateurs, {headers: headers} );
    return this.http_.put('https://mobileapp-ionic.firebaseio.com/data.json', collaborateurs, {headers: headers});
  }
  getCollaborateurs(){
    return this.http_.get('https://mobileapp-ionic.firebaseio.com/data.json')
      .map((response: Response) => {
        const data = response.json();
        console.log("dans get collabo : ", data);
        return data as Collaborateur[];
      });
  }

  addCollaborateur(collaborateur: Collaborateur) {
    collaborateur.Id = 1005;
    this.collaborateurs.push(collaborateur);
    console.log(collaborateur);
  }

  updateCollaborateur(collaborateur: Collaborateur){
    console.log('updating collabo : ', collaborateur);

  }
}
