import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';


@IonicPage()
@Component({
  selector: 'page-fingerprints',
  templateUrl: 'fingerprints.html',
})
export class FingerprintsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private faio: FingerprintAIO, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.faio.show({
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password', //Only necessary for Android
      disableBackup: true,  //Only for Android(optional)
      localizedFallbackTitle: 'Use Pin', //Only for iOS
      localizedReason: 'Please authenticate' //Only for iOS
    })
      .then((result: any) => {
        const alert = this.alertCtrl.create({
          title: 'Fingerprints',
          subTitle: result,
          buttons: ['Dismiss']
        });
        alert.present();
      })
      .catch((error: any) => {
        const alert = this.alertCtrl.create({
          title: 'Fingerprints',
          subTitle: error,
          buttons: ['Dismiss']
        });
        alert.present();
      });
  }

}
