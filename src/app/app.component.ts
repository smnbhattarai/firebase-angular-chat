import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  items: Observable<any[]>;
  msg: string = '';
  editMsg: boolean = false;
  editId: number;

  constructor(private af: AngularFireDatabase) {
    this.items = af.list('messages').snapshotChanges();
  }

  send(chatMsg: string) {
    this.af.list('messages').push({ message: chatMsg });
    this.msg = '';
  }

  delete(key: string) {
    this.af.list('messages').remove(key);
  }

  edit(key: string, message: string) {
    this.af.list('messages').update(key, { message: message });
    this.editMsg = false;
  }

}
