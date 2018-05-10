import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { DiaryPage } from '../diary/diary';
import { TherapyPage } from '../therapy/therapy';

/**
 * Generated class for the SelectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selection',
  templateUrl: 'selection.html',
})
export class SelectionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectionPage');
  }

  goToDiary() {
      let toast = this.toastCtrl.create({
          message: '이우람 같군요~~~~~~~~~~~~~~',
          duration: 2000
      });

      toast.present(toast);
      this.navCtrl.push(DiaryPage);
      // this.navCtrl.push(TherapyPage);
  }

    goToTherapy() {
        let toast = this.toastCtrl.create({
            message: '이우람 같군요~~~~~~~~~~~~~~',
            duration: 2000
        });

        toast.present(toast);
        this.navCtrl.push(TherapyPage);
    }
}
