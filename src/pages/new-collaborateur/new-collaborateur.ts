import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Collaborateur } from '../../model/Collaborateur';
import { CollaborateurService } from '../../app/collaborateur.service';

/**
 * Generated class for the NewCollaborateurPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-collaborateur',
  templateUrl: 'new-collaborateur.html',
  providers: []
})
export class NewCollaborateurPage {
  collaborateur = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private collaborateurService: CollaborateurService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCollaborateurPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  savingCollaborateur() {
    this.collaborateurService.logStatusChange("collaborateur saved");
    this.collaborateurService.collaborateurAdded.emit("new collabo");
  }

}
