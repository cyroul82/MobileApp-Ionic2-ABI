import { Injectable, EventEmitter } from '@angular/core';
import { Collaborateur } from '../model/Collaborateur';
import 'rxjs/Rx';
import { Storage } from '@ionic/storage';

@Injectable()
export class CollaborateurService {

  private collaborateurs: Collaborateur[];

  collaborateurUpdated = new EventEmitter<Collaborateur>();
  collaborateurAdded = new EventEmitter<string>();

  constructor(private storage: Storage){
    // this.getMyWebCollabo().subscribe(collaborateurs => {
    //   this.collaborateurs = collaborateurs;
    // });
  }



  // saveCollaborateurs(){
  //   //this.storage.set('places': collaborateurs);
  //   const headers = new Headers({
  //     'Content-Type': 'application/json'
  //   });
  //   // return this.http_.post('https://mobileapp-ionic.firebaseio.com/data.json', collaborateurs, {headers: headers} );
  //    this.http_.put('https://mobileapp-ionic.firebaseio.com/data.json', this.collaborateurs, {headers: headers})
  //    .subscribe((response:Response) => {
  //      this.collaborateurs = response.json();
  //    });;
  // }

  // getMyWebCollabo(){
  //   //Firebase realTime DB
  //   return this.http_.get('https://mobileapp-ionic.firebaseio.com/data.json')
  //     .map((response: Response) => {
  //       return response.json();
  //     })
  //     .catch( (err) => {
  //       console.log("Erreur getting collaborateurs : ", err);
  //       return Observable.throw(err);
  //     });
  // }

  getCollaborateurs(){
    return this.storage.get('collaborateurs')
    .then( (data) => {
      this.collaborateurs = data ==null ? [] : data;
      return this.collaborateurs;
    });
  }

  // getMyWebCollabo(){
  //   return this.http_.get('http://bip14:10000/Service1.svc/rest/collabos')
  //   .map( (resp: Response) => {
  //     return resp.json();
  //   })
  //   .catch((err) => {
  //      return Observable.throw(err);
  //   });
  //
  // }

  addCollaborateur(collaborateur: Collaborateur) {
    collaborateur.Id = 1005;
    this.collaborateurs.push(collaborateur);
    this.storage.set('collaborateurs', this.collaborateurs);
    //this.saveCollaborateurs();
  }

  updateCollaborateur(collaborateur: Collaborateur){
    console.log('updating collabo : ', collaborateur);

  }
}
