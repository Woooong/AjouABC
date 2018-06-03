import { Component, OnInit } from '@angular/core';
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
export class SelectionPage implements OnInit{

    private emotion_data;
    private emotion_code;
    private emotion;
    private age;
    private gender;
    private q_text;
    private q_id;
    private ment;
    private comment_list = [];
    private tts_list=[];


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
      else if(this.emotion_code == "neutral"){
          this.emotion = "무표정한";
      }

      if(this.emotion_data['represent_gender'] == 'male') {
          this.gender = '남자';
      }else{
          this.gender = '여자';
      }

      this.age = parseInt(this.emotion_data['represent_age'])
      this.ment = this.emotion_data['ment']

  }

  ngOnInit() {
      this.comment_list.push("오늘 당신은 "+this.age+"세 "+this.gender+"의 "+this.emotion+"얼굴을 가지고 있군요.");
      this.comment_list.push(this.ment);
      this.comment_list.push("오늘도 다이어리를 작성해 볼까요?");

      document.getElementById('comment').innerHTML="<h1>"+this.comment_list[0]+"</h1>";
      this.http.post('https://dev.ryuneeee.com:5000/api/getVoice', {"text": this.comment_list.join(', ')}, {})
      .then(data => {
          // console.log(data.status);
          console.log(JSON.parse(data.data)); // data received by server
          document.getElementById('mp3audio').setAttribute('src',JSON.parse(data.data)['url'])
          // console.log(data.headers);
      })
      .catch(error => {

      });
      // for(let index=0; this.comment_list.length>index; index++){
      //
      // }
      let count = 1
      setInterval(()=> {
          if(!this.comment_list[count]){
              this.http.get('/api/getQuestion/'+localStorage.getItem('username')+'/1', {}, {})
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
          }else{
              document.getElementById('comment').innerHTML="<h1>"+this.comment_list[count]+"</h1>";
              count++;
          }
      }, 4300)
  }
}
