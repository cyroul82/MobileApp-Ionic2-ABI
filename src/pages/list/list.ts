import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { Collaborateur } from '../../model/Collaborateur';
import { NewCollaborateurPage } from '../new-collaborateur/new-collaborateur';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  collaborateurs: Collaborateur[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public modalCtrl: ModalController) {

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
      let modal = this.modalCtrl.create(NewCollaborateurPage);
      modal.present();
  }

}
