import { Component, OnInit } from '@angular/core';
import { Details, DetailsService } from '../../details/details.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

interface Loc{
  id: number,
}

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  details: Details ={
  name: " ",
  age: " ",
  gender:" ",
  description:" ",
  }

  constructor(private activatedRoute: ActivatedRoute, private detailsService: DetailsService,
    private toastCtrl: ToastController, private router: Router) { 
   
    
  }
    ngOnInit() {
    
    }
    ionViewWillEnter() {
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.detailsService.getDetail(id).subscribe(details => {
          this.details = details;
        });
      }
    }
    addDetail() {
      this.detailsService.addDetail(this.details).then(() => {
        this.router.navigateByUrl('connect');
        this.showToast('details Added, you would be redirected to a chat which matches you');
      }, err => {
        this.showToast('There was a problem adding your Details :(');
      });
    }

    showToast(msg) {
      this.toastCtrl.create({
        message: msg,
        duration: 2000
      }).then(toast => toast.present());
    }
    
    


}
