import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';
import { CollaborateurService } from '../../app/collaborateur.service';
/**
 * Generated class for the EditCollaborateurPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-collaborateur',
  templateUrl: 'edit-collaborateur.html',
  providers: []
})
export class EditCollaborateurPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private collaborateurService: CollaborateurService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCollaborateurPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
