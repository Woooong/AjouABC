import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
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
    public gender;
    public q_text;
    public q_id;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public toastCtrl: ToastController,
              private http: HTTP) {
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
      setTimeout(() =>
          {
              this.http.get('/api/getQuestion/uram/1', {}, {})
              .then(data => {
                  // console.log(data.status);
                  console.log(JSON.parse(data.data)['data']['q_text']); // data received by server
                  this.q_text = JSON.parse(data.data)['data']['q_text'];
                  this.q_id = JSON.parse(data.data)['data']['q_id'];
                  // console.log(data.headers);
                  location.replace('/static/AudioRecorder/index.html?q_id='+this.q_id+'&q_text='+this.q_text)
              })
              .catch(error => {
                  // console.log(error.status);
                  // console.log(error.error); // error message as string
                  // console.log(error.headers);
                  // alert("잠시 후 다시 시도해 주세요.");

              });
          },
          5000);

  }

    selectEmotion(emo) {
        // location.replace('/AudioRecorder/index.html');
        this.http.get('/api/getQuestion/uram/1', {}, {})
          .then(data => {
              // console.log(data.status);
              //
              // console.log(data.headers);
              // location.replace('/AudioRecorder/index.html')
          })
          .catch(error => {
              // console.log(error.status);
              // console.log(error.error); // error message as string
              // console.log(error.headers);
              // alert("잠시 후 다시 시도해 주세요.");

          });


    }

    emotion_cehck(chk){
      if(chk == 'Y'){
        location.replace('/AudioRecorder/index.html')
      }else{
        document.getElementById('step1').style.display= "none";
        document.getElementById('step2').style.display= "inline-block";
      }
    }
}
