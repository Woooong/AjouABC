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

    public emotion;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public toastCtrl: ToastController) {
      this.emotion = navParams.get("emotion");
      console.log(this.emotion);
  }

    selectEmotion(emo) {
      //서버에 전송하여 노래 or 테라피 진행
        let toast = this.toastCtrl.create({
            message: '이우람 같군요~~~~~~~~~~~~~~',
            duration: 2000
        });

        toast.present(toast);
        if(emo == 'angry' || emo == 'sad'){
            this.navCtrl.push(TherapyPage);
        }else{
            this.navCtrl.push(DiaryPage);
        }

    }
}
