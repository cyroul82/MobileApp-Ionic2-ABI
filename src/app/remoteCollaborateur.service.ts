import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RemoteCollaborateurService {

  private collaborateurs: any[];

  constructor(private http_: Http){

  }

  getRemoteCollabo(){
    return this.http_.get('http://192.168.42.109:10000/Service1.svc/rest/collabos')
    .map( (resp: Response) => {
      this.collaborateurs = resp == null ? [] : resp.json(); 
      return this.collaborateurs;
    })
    .catch((err) => {
       return Observable.throw(err);
    });

  }
}
