import { Component, OnInit } from '@angular/core';
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
export class ListPage implements OnInit {
  icons: string[];
  collaborateurs: Collaborateur[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController, private collaborateurService: CollaborateurService) {
    this.collaborateurService.collaborateurAdded.subscribe( (c:string) => console.log(c));
  }

  ngOnInit(){
    this.collaborateurs = this.collaborateurService.collaborateurs;
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

  saveCollaborateurs(){
    this.collaborateurService.saveCollaborateurs(this.collaborateurs)
      .subscribe( response => console.log(response),
      error => console.log(error));
  }

  getCollaborateurs(){
    this.collaborateurService.getCollaborateurs()
      .subscribe( (collaborateurs: Collaborateur[]) => {
      // const data = response.json();
      this.collaborateurs = collaborateurs;
    },
    error => console.log(error));
  }

}
