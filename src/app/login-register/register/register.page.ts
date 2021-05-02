import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { LoadingController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string;
  email: string;
  password: string;
  passwordAgain: string;
  phone:string;
 
   constructor(
     private afs: AngularFirestore,
     public afAuth: AngularFireAuth,
     private router: Router,
     private loadingCtrl: LoadingController,
     private toastCtrl: ToastController
   ) { }
 
   ngOnInit() {
   }
 async register(){

   if(this.name && this.email && this.phone && this.password && this.passwordAgain && this.password == this.passwordAgain) {
     const loading = await this.loadingCtrl.create({
       message: 'Creating account..',
       spinner: 'crescent',
       showBackdrop: true
     });
     
     loading.present();
     this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
     .then((data) =>{
       this.afs.collection('users').doc(data.user.uid).set({
         'userId': data.user.uid,
         'userName': this.name,
         'userEmail': this.email,
         'userPhone': this.phone,
         'userPassword' : this.password,
         'createdAt': Date.now()
       })

       data.user.updateProfile({
        displayName: this.name,
        photoURL: ''
      })
       
       .then(() =>{
         loading.dismiss();
         this.toast('Account Created! Please login to confirm details!', 'success');
         this.router.navigate(['/loginaftersignup']);
       })
       
       .catch(error=>{
         loading.dismiss();
         console.log(error.message, 'danger');
       })
     })
     
     .catch(error=>{
       loading.dismiss();
       this.toast(error.message, 'danger');
     })
   
     }
     
     else {
       this.toast('Please complete the empty slots', 'warning')
     }
   }
   
   async toast(message,status){
     const toast = await this.toastCtrl.create({
       message: message,
       color:status,
       position: 'top',
       duration: 2000
     });
     toast.present()
   }

   goToLogin() {
    this.router.navigate(['/login']);
  }

  // username: string = ""
  // password: string = ""
  // passwordAgain: string = ""

  // constructor(public afAuth: AngularFireAuth, public alert: AlertController, public router: Router, private afs: AngularFirestore) { }

  // ngOnInit() {
  // }

  // async register() {
  //   const {username, password, passwordAgain} = this
  //   if (password !== passwordAgain){
  //     this.showAlert("Error", "Passwords don't match")
  //     return console.error("Passwords don't match")
  //   }

  //   try{
  //     const credential = await this.afAuth.createUserWithEmailAndPassword(username, password)
  //     console.log(credential)
  //     this.router.navigate(['/login'])
  //     const uid = credential.user.uid;
  //     return this.afs.doc(
  //       `users/${uid}`
  //     ).set({
  //       uid,
  //       email: credential.user.email,
  //     })
  //   } catch(error){
  //     console.dir(error)
  //     this.showAlert("Error", error.message)
  //   }

  // }

  // async showAlert(header: string, message: string) {
  //   const alert = await this.alert.create({
  //     header,
  //     message,
  //     buttons: ["Ok"]
  //   })

  //   await alert.present()
  // }
}
