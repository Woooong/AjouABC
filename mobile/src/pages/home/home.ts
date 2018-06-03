import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastController } from 'ionic-angular';
import { NavController, AlertController } from 'ionic-angular';

import { SelectionPage} from '../selection/selection';

import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  private img: string;
  public emotion: string;
  public emotion_code: string;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private domSanitizer: DomSanitizer,
    private http: HTTP) {
      // this.CameraOn()

  }

  ngAfterViewInit() {
      this.CameraOn();
  }

  CameraOn(){
        const options: CameraOptions = {
            targetWidth: 640,
            targetHeight: 640,
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            saveToPhotoAlbum: false,
            mediaType: this.camera.MediaType.PICTURE,
            cameraDirection: 1,
            allowEdit: false
        };

        // http 통신 후
        this.camera.getPicture(options).then((imageData) => {
            this.img = 'data:image/jpeg;base64,' + imageData;
            // 얼굴인식 안됬을 경우 this.CameraOn(); 입력해줘야함 결과값에 따라 다름
            this.http.post('/api/getEmotion/'+localStorage.getItem('username')+'/123',
                {'image' : this.img},
                {})
                .then(data => {
                    console.log(data.data);
                    this.emotion_code = JSON.parse(data.data)['represent_emotion'];
                    this.emotion = null;
                    if(this.emotion_code == "anger") {
                        this.emotion = "화난"
                    }
                    else if(this.emotion_code == "contempt"){
                        this.emotion = "경멸하는"
                    }else if(this.emotion_code == "disgust"){
                        this.emotion = "역겨워하는"
                    }else if(this.emotion_code == "fear"){
                        this.emotion = "두려워하는"
                    }else if(this.emotion_code == "happiness"){
                        this.emotion = "행복한"
                    }
                    else if(this.emotion_code == "sadness"){
                        this.emotion = "슬픈"
                    }
                    else if(this.emotion_code == "surprise"){
                        this.emotion = "놀란"
                    }
                    else if(this.emotion_code == "neutral"){
                        this.emotion = "무표정한"
                    }
                    if(this.emotion == null){
                        this.CameraOn();
                        return null
                    }
                    let toast = this.toastCtrl.create({
                        message: this.emotion,
                        duration: 2000
                    });

                    this.navCtrl.push(SelectionPage, {'emotion_data' : JSON.parse(data.data)});
                })
                .catch(error => {
                    console.log(error.status);
                    console.log(error.error); // error message as string
                    console.log(error.headers);
                    this.CameraOn();
                });


        }, (err) => {
            this.CameraOn();
            this.displayErrorAlert(err);
        });
      setTimeout(() =>
          {
              document.getElementsByTagName('button')[2].click()
          },
          3000);
    }

  displayErrorAlert(err){
    console.log(err);
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Error while trying to capture picture',
      buttons: ['OK']
    });
    alert.present();
  }

}
