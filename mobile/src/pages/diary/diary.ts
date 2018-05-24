import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
// import { HomePage } from '../home/home';

/**
 * Generated class for the DiaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html',
})
export class DiaryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiaryPage');
  }

  CloseVoiceRecord() {
      let toast = this.toastCtrl.create({
          message: '시나리오 끝',
          duration: 2000
      });

      toast.present(toast);
      this.navCtrl.popAll()
  }

}
