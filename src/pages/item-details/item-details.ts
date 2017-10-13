import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { Contacts, Contact, ContactField, ContactFieldType, ContactName, ContactFindOptions } from '@ionic-native/contacts';

import { ModalController, NavController, NavParams, AlertController } from 'ionic-angular';

import { Collaborateur } from '../../model/Collaborateur';
import { EditCollaborateurPage } from '../edit-collaborateur/edit-collaborateur';
import { AddressInfoPage } from '../address-info/address-info';
import { CollaborateurService } from '../../app/collaborateur.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { mapApiKey, weatherApiKey } from '../../app/apiKey';


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

  getInfo(collaborateur: Collaborateur) {
    var address: string = collaborateur.Address + " " + collaborateur.ZipCode + " " + collaborateur.Town;
    this.getMap(address).subscribe( data => {
      let latitude = data.geometry.location.lat;
      let longitude = data.geometry.location.lng
      this.getWeather(latitude, longitude).subscribe(data => {
        console.log(data);
        this.navCtrl.push(AddressInfoPage, {weather: data, collaborateur: collaborateur, latitude: latitude, longitude: longitude});
      })
    }, (error: HttpErrorResponse) => {
      this.displayError(error.message);
    })

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

  getMap(address: string){
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${mapApiKey}&address=${address}`)
    .map(data => {
      var t = data['results'];
      return t[0];
    })
    .catch((err) => {
       return Observable.throw(err);
    });

  }

  getWeather(latitude: string, longitude: string){
    const h = new HttpHeaders().set('Access-Control-Allow-Origin', "*");
    return this.http.get(`/weather/${weatherApiKey}/${latitude},${longitude}?units=auto&lang=fr`, {headers: h})
     .map(data => {
       return data['currently'];
     })
     .catch((err) => {
        return Observable.throw(err);
     });
  }



}
