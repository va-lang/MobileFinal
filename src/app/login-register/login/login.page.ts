import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  email: string;
  password: string;


  constructor(public afAuth: AngularFireAuth, private toastr: ToastController, private router: Router) { }
 
  ngOnInit() {
  }

  async login() {
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      this.router.navigate(['/settings']);
    } catch(err){
        console.dir(err)
        if(err.code == "auth/user-not-found"){
          console.log("User not found")
          this.toast('Invalid username or password', 'warning')
        } else{
          this.toast('Error: ', err.message)
        }
    }
  }

  async toast(message,status){
    const toast = await this.toastr.create({
    message: message,
    color: status,
    position: 'top',
    duration: 2000
    });
    toast.present(); 
  }

  forgot() {
    this.router.navigate(['forgot-password']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  // username: string = ""
  // password: string = ""

  // constructor(public alert: AlertController, public afAuth: AngularFireAuth, public router: Router) { }

  // ngOnInit() {
  // }

  // async login(){
    // const {username, password} = this
    // try{
    //   const res = await this.afAuth.signInWithEmailAndPassword(username, password)
    //   this.router.navigate(['/home-list']);

    // }catch(err){
    //     console.dir(err)
    //     if(err.code == "auth/user-not-found"){
    //       console.log("User not found")
    //       this.showAlert("Try Again", "Invalid username or password")
    //     } else{
    //       this.showAlert("Error", err.message)
    //     }
    // }
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
