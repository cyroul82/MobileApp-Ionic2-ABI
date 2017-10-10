import { Injectable, EventEmitter } from '@angular/core';
import { Collaborateur } from '../model/Collaborateur';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CollaborateurService {

  collaborateurs: Collaborateur[];

  collaborateurUpdated = new EventEmitter<Collaborateur>();
  collaborateurAdded = new EventEmitter<string>();

  constructor(private http: HttpClient){
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

  addCollaborateur(collaborateur: Collaborateur) {
    console.log('add new collabo : ', collaborateur);
    collaborateur.Id = 1005;
    this.collaborateurs.push(collaborateur);
  }

  updateCollaborateur(collaborateur: Collaborateur){
    console.log('updating collabo : ', collaborateur);

  }
}
