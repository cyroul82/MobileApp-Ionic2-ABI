import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(private sqlite: SQLite) {
    this.sqlite.create({
      name: 'abi.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('create table collaborateur(id integer primary key, name text, firstname text, fonction text, statut int, address text, zipcode text, town text, tel text, email text, picture text)', {})
        .then(() => {
          console.log("Table Created");
        })
        .catch( err => {
          console.log("Error creating table : ", err)
        });
    })
    .catch (err => {
      console.log("Error sqlite create : ", err);
    })
  }

}
