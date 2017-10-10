import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Collaborateur } from '../../model/Collaborateur';

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
})
export class NewCollaborateurPage {
  collaborateur = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCollaborateurPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  savingCollaborateur() {
    console.log("Collaborateur object : ", this.collaborateur);
  }

}
