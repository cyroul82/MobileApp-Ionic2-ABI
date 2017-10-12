import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { Contacts, Contact, ContactField, ContactFieldType, ContactName, ContactFindOptions } from '@ionic-native/contacts';

import { ModalController, NavController, NavParams, AlertController } from 'ionic-angular';

import { Collaborateur } from '../../model/Collaborateur';
import { EditCollaborateurPage } from '../edit-collaborateur/edit-collaborateur';
import { CollaborateurService } from '../../app/collaborateur.service';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  collaborateur: Collaborateur;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController, 
              private contacts: Contacts, 
              private colService: CollaborateurService,
              private callNumber: CallNumber,
              public alertCtrl: AlertController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.collaborateur = navParams.get('collaborateur');

  }

  editCollabo(collaborateur: Collaborateur){
    let modal = this.modalCtrl.create(EditCollaborateurPage);
    modal.present();
  }

  addCollaboToAppli(collaborateur: Collaborateur) {
    this.colService.addCollaborateur(collaborateur);
  }

  callContact(tel: string) {
    this.callNumber.callNumber(tel, true)
    .then(() => console.log('Launched dialer!'))
    .catch((error) => {
      const alert = this.alertCtrl.create({
        title: 'Error launching dialer',
        subTitle: error,
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }

  addCollaboToContact(collaborateur: Collaborateur){
    // let fields:ContactFieldType[] = ['addresses', 'birthday', 'categories', 'country', 'department',
    //                                   'displayName', 'emails', 'familyName', 'formatted', 'givenName',
    //                                   'honorificPrefix', 'honorificSuffix', 'id', 'ims', 'locality',
    //                                   'middleName', 'name', 'nickname', 'note', 'organizations',
    //                                   'phoneNumbers', 'photos', 'postalCode', 'region', 'streetAddress', 'title', 'urls'];

    // let fields:ContactFieldType[] = ['name'];
    
    // const options = new ContactFindOptions();
    // options.filter = collaborateur.Name, collaborateur.Firstname;
    // options.multiple = true;
    // options.hasPhoneNumber = true;
    
    // this.contacts.find(fields, options).then( contacts => {
    //   contacts.forEach(c => {
    //     console.log(c);
    //   });
    // });
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
