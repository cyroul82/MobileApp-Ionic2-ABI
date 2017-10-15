import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RemoteCollaborateurService } from '../../app/remoteCollaborateur.service';
import { ItemDetailsPage } from '../item-details/item-details';
import { Collaborateur } from '../../model/Collaborateur';


@IonicPage()
@Component({
  selector: 'page-remote-collaborateur',
  templateUrl: 'remote-collaborateur.html',
})
export class RemoteCollaborateurPage {
  collaborateurs: any[];
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private remoteCol : RemoteCollaborateurService) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    this.remoteCol.getRemoteCollabo()
    .subscribe( (data) => {
      this.collaborateurs = data;
    });
  }

  selectedCollaborateur(event, collaborateur: Collaborateur) {
    this.navCtrl.push(ItemDetailsPage, {
      collaborateur: collaborateur
    });
  }

}
