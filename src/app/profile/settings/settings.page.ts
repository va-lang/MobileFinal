import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef } from '@angular/core'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  
  user: any;

  constructor(public afAuth: AngularFireAuth,  public router: Router, private platform: Platform, private speechRecognition: SpeechRecognition, private cd: ChangeDetectorRef) { }

  ngOnInit() {

  }
  ionViewDidEnter() {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    })
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);
    })
  }


}
