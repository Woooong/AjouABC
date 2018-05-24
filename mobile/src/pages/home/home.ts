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
            console.log(imageData)
            // image file 저장 아니면 어쩔지 정해야함
            // 얼굴인식 안됬을 경우 this.CameraOn(); 입력해줘야함 결과값에 따라 다름
            this.http.post('http://127.0.0.1:5000/api/getEmotion/uram/1',
                {'image' : this.img},
                {})
                .then(data => {
                    console.log(data.status);
                    console.log(data.data); // data received by server
                    console.log(data.headers);
                    let toast = this.toastCtrl.create({
                        message: '너의 기분은 어떻군요~~~~~~~~~~~~~',
                        duration: 2000
                    });

                    toast.present(toast);
                    // this.navCtrl.push(SelectionPage, {'emotion' : '이러함'});
                })
                .catch(error => {
                    let toast = this.toastCtrl.create({
                        message: '너의 기분은 어떻군요~~~~~~~~~~~~~',
                        duration: 2000
                    });
                    toast.present(toast);
                    // this.navCtrl.push(SelectionPage, {'emotion' : '이러함'});
                    console.log(error.status);
                    console.log(error.error); // error message as string
                    console.log(error.headers);
                });


        }, (err) => {
            this.displayErrorAlert(err);
        });
      setTimeout(() =>
          {
              document.getElementsByTagName('button')[2].click()
          },
          2000);
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
