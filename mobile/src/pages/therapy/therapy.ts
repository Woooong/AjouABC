import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';

import { DiaryPage } from '../diary/diary';

/**
 * Generated class for the TherapyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-therapy',
  templateUrl: 'therapy.html',
})
export class TherapyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TherapyPage');
  }
  goToDiary() {
      let toast = this.toastCtrl.create({
          message: '이우람 같군요~~~~~~~~~~~~~~',
          duration: 2000
      });

      toast.present(toast);
      location.replace('/AudioRecorder/index.html')
      // this.navCtrl.push(TherapyPage);
  }

}
