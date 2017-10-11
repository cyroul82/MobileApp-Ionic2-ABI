import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

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
  private collaborateurForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, private collaborateurService: CollaborateurService,
              private formBuilder: FormBuilder) {

      this.collaborateurForm = this.formBuilder.group({
        Name: ['', Validators.required],
        Firstname: ['', Validators.required],
        Fonction: [''],
        Address: [''],
        ZipCode: [''],
        Town: [''],
        Email: [''],
        Tel: [''],
        Picture: [''],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCollaborateurPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  savingCollaborateur() {
    let collaborateur = this.collaborateurForm.value as Collaborateur;
    this.collaborateurService.addCollaborateur(collaborateur);
    this.collaborateurService.collaborateurAdded.emit("new collabo");
    this.dismiss();
  }

}
