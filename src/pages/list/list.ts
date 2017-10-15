import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { Collaborateur } from '../../model/Collaborateur';
import { NewCollaborateurPage } from '../new-collaborateur/new-collaborateur';
import { CollaborateurService } from '../../app/collaborateur.service';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: []
})
export class ListPage {
  icons: string[];
  collaborateurs: Collaborateur[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController, private collaborateurService: CollaborateurService) {
    this.collaborateurService.collaborateurAdded.subscribe( (c:string) => console.log(c));
  }

  ionViewWillEnter(){
    this.collaborateurService.getCollaborateurs()
    .then( (data) => {
      this.collaborateurs = data;
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
