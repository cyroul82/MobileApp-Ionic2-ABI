import { Component } from '@angular/core';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

import { ModalController, NavController, NavParams } from 'ionic-angular';

import { Collaborateur } from '../../model/Collaborateur';
import { EditCollaborateurPage } from '../edit-collaborateur/edit-collaborateur';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  collaborateur: Collaborateur;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private contacts: Contacts) {
    // If we navigated to this page, we will have an item available as a nav param
    this.collaborateur = navParams.get('collaborateur');

  }

  editCollabo(collaborateur: Collaborateur){
    let modal = this.modalCtrl.create(EditCollaborateurPage);
    modal.present();
  }

  addCollaboToContact(collaborateur: Collaborateur){
    console.log(collaborateur);
    let contact: Contact = this.contacts.create();
    contact.name = new ContactName(null, collaborateur.Name, collaborateur.Firstname);
    contact.phoneNumbers = [new ContactField('mobile', collaborateur.Tel)];
    contact.emails = [new ContactField('email', collaborateur.Email)];
    contact.save()
      .then( () => {
        console.log('Contact saved !', contact);
      },
      (error: any) => {
        console.error('Error Saving contact !', error);
      });
  }

}
