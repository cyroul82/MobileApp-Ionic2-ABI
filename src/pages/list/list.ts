import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { Collaborateur } from '../../model/Collaborateur';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  collaborateurs: Collaborateur[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {

    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];

    this.http.get('http://griffin:10000/Service1.svc/rest/collabos').subscribe(data => {

      this.collaborateurs = [];
      var d = data as Collaborateur[];
      d.forEach( c => {
        this.collaborateurs.push(c);
      });

    },
    err => {
      console.log("Error getting Collabo : ", err);
    });


  }

  selectedCollaborateur(event, collaborateur: Collaborateur) {
    this.navCtrl.push(ItemDetailsPage, {
      collaborateur: collaborateur
    });
  }

  addCollaborateur(){
    
  }
}
