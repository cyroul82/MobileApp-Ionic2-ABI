import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Collaborateur } from '../../model/Collaborateur';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  collaborateur: Collaborateur;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.collaborateur = navParams.get('collaborateur');

  }
}
