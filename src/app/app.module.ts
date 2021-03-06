import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {  HttpClientModule } from '@angular/common/http';
import {  HttpModule } from '@angular/http';
import { SQLite } from '@ionic-native/sqlite';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { Contacts } from '@ionic-native/contacts';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { Network } from '@ionic-native/network';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { EditCollaborateurPage } from '../pages/edit-collaborateur/edit-collaborateur';
import { NewCollaborateurPage } from   '../pages/new-collaborateur/new-collaborateur';
import { RemoteCollaborateurPage } from '../pages/remote-collaborateur/remote-collaborateur';
import { FingerprintsPage } from '../pages/fingerprints/fingerprints';
import { AddressInfoPage } from '../pages/address-info/address-info';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DbProvider } from '../providers/db/db';
import { CollaborateurService } from './collaborateur.service';
import { RemoteCollaborateurService } from './remoteCollaborateur.service';
import { MapService } from './map.service';
import { WeatherProvider } from '../providers/weather/weather';
import { GoogleMaps } from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    EditCollaborateurPage,
    NewCollaborateurPage,
    RemoteCollaborateurPage,
    FingerprintsPage,
    AddressInfoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__ABI',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    EditCollaborateurPage,
    NewCollaborateurPage,
    RemoteCollaborateurPage,
    FingerprintsPage,
    AddressInfoPage
    ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    CollaborateurService,
    RemoteCollaborateurService,
    MapService,
    FingerprintAIO,
    Contacts,
    CallNumber,
    SMS,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbProvider,
    WeatherProvider,
    Network
  ]
})
export class AppModule {}
