import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {  HttpClientModule } from '@angular/common/http';
import { SQLite } from '@ionic-native/sqlite';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { EditCollaborateurPage } from '../pages/edit-collaborateur/edit-collaborateur';
import { NewCollaborateurPage } from '../pages/new-collaborateur/new-collaborateur';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DbProvider } from '../providers/db/db';
import { CollaborateurService } from './collaborateur.service';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    EditCollaborateurPage,
    NewCollaborateurPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    NewCollaborateurPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    CollaborateurService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbProvider
  ]
})
export class AppModule {}
