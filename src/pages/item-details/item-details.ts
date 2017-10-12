import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { Contacts, Contact, ContactField, ContactFieldType, ContactName, ContactFindOptions } from '@ionic-native/contacts';

import { ModalController, NavController, NavParams, AlertController } from 'ionic-angular';

import { Collaborateur } from '../../model/Collaborateur';
import { EditCollaborateurPage } from '../edit-collaborateur/edit-collaborateur';
import { CollaborateurService } from '../../app/collaborateur.service';
import { HttpClient } from '@angular/common/http';

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
              private sms: SMS,
              public alertCtrl: AlertController,
              private http: HttpClient) {
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
      this.displayError(error);
    });
  }

  sendSMS(collaborateur: Collaborateur){
    const alert = this.alertCtrl.create({
      title: 'Message',
      inputs: [
        {
          name: 'message',
          placeholder: 'message'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            this.getMap()
              .then(data => {console.log(data)})
              .catch(error => console.log(error));
          }
        },
        {
          text: 'Envoyer',
          handler: data => {
            if(data.messsage !== ""){
              let options = {
                replaceLineBreaks: false, // true to replace \n by a new line, false by default
                android: {
                  intent: '' // send SMS with the native android SMS messaging
                    //intent: '' // send SMS without open any other app
                    //intent: 'INTENT' // send SMS inside a default SMS app
                }
              };
              this.sms.send(collaborateur.Tel, data.message, options).catch(error => {
                this.displayError(error);
              });
            }else return false;
            
          }
        }
      ]
    });
    alert.present();
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

  displayError(error: string){
    const alert = this.alertCtrl.create({
      title: 'Erreur',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  getMap(){
    return new Promise(resolve => {
      this.http.get('https://api.darksky.net/forecast/85c4c283eaeb586607091e57f0b1c1d6/43.7035391,7.2582122?lang=fr&units=auto').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }



}
