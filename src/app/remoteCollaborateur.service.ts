import { Injectable, EventEmitter } from '@angular/core';
import { Collaborateur } from '../model/Collaborateur';
import { HttpClient } from '@angular/common/http';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RemoteCollaborateurService {

  private collaborateurs: any[];

  constructor(private http: HttpClient, private http_: Http){

  }

  getRemoteCollabo(){
    return this.http_.get('http://172.16.0.81:10000/Service1.svc/rest/collabos')
    .map( (resp: Response) => {
      this.collaborateurs = resp == null ? [] : resp.json(); 
      return this.collaborateurs;
    })
    .catch((err) => {
       return Observable.throw(err);
    });

  }
}
