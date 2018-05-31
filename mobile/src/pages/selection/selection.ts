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

    public emotion_data;
    public emotion_code;
    public emotion;
    public age;
    public gender

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public toastCtrl: ToastController) {
      this.emotion_data = navParams.get("emotion_data");
      console.log(this.emotion_data['represent_emotion']);
      console.log(this.emotion_data['represent_age']);
      console.log(this.emotion_data['represent_gender']);
      this.emotion_code = this.emotion_data['represent_emotion'];
      this.emotion = null;
      if(this.emotion_code == "anger") {
          this.emotion = "화난";
      }
      else if(this.emotion_code == "contempt"){
          this.emotion = "경멸하는";
      }else if(this.emotion_code == "disgust"){
          this.emotion = "역겨워하는";
      }else if(this.emotion_code == "fear"){
          this.emotion = "두려워하는";
      }else if(this.emotion_code == "happiness"){
          this.emotion = "행복한";
      }
      else if(this.emotion_code == "sadness"){
          this.emotion = "슬픈";
      }
      else if(this.emotion_code == "surprise"){
          this.emotion = "놀란";
      }

      if(this.emotion_data['represent_gender'] == 'male') {
          this.gender = '남자';
      }else{
          this.gender = '여자';
      }

      this.age = parseInt(this.emotion_data['represent_age'])
  }

    selectEmotion(emo) {
      //서버에 전송하여 노래 or 테라피 진행
      //   let toast = this.toastCtrl.create({
      //       message: '제가 분석한 당신은 '+this.emotion+' 기분입니다. 맞습니까?',
      //       duration: 2000
      //   });
      //
      //   toast.present(toast);
        if(emo == 'angry' || emo == 'sad'){
            this.navCtrl.push(TherapyPage);
        }else{
            location.replace('/AudioRecorder/index.html')
        }

    }

    emotion_cehck(chk){
      if(chk == 'Y'){
        location.replace('/AudioRecorder/index.html')
        //   if(emo == 'angry' || emo == 'sad'){
        //     this.navCtrl.push(TherapyPage);
        // }else{
        //     location.replace('/AudioRecorder/index.html')
        // }
      }else{
        document.getElementById('step1').style.display= "none";
        document.getElementById('step2').style.display= "inline-block";
      }
    }
}
