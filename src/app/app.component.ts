import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';


import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { RemoteCollaborateurPage } from '../pages/remote-collaborateur/remote-collaborateur';
import { FingerprintsPage } from '../pages/fingerprints/fingerprints';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Accueil', component: HelloIonicPage },
      { title: 'Collaborateurs', component: ListPage },
      { title: 'Collaborateurs distants', component: RemoteCollaborateurPage },
      { title: 'Fingerprints', component: FingerprintsPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this.sqlite.create({
      //   name: 'abi.db',
      //   location: 'default'
      // }).then((db: SQLiteObject) => {
      //   db.executeSql('create table collaborateur(id integer primary key, name text, firstname text, fonction text, statut int, address text, zipcode text, town text, tel text, email text, picture text)', {})
      //     .then(() => {
      //       console.log("Table Created");
      //     })
      //     .catch( err => {
      //       console.log("Error creating table : ", err)
      //     });
      // })
      // .catch (err => {
      //   console.log("Error sqlite create : ", err);
      // });

    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
