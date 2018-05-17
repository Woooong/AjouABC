import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastController } from 'ionic-angular';
import { NavController, AlertController } from 'ionic-angular';

import { SelectionPage} from '../selection/selection';

import { HTTP } from '@ionic-native/http';
import {delay} from 'rxjs/operator/delay';

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
            targetWidth: 500,
            targetHeight: 500,
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
            // this.http.post('https://sheltered-caverns-21060.herokuapp.com/camera',
            //     {'image' : this.img},
            //     {})
            //     .then(data => {
            //         console.log(data.status);
            //         console.log(data.data); // data received by server
            //         console.log(data.headers);
            //         let toast = this.toastCtrl.create({
            //             message: '너의 기분은 어떻군요~~~~~~~~~~~~~',
            //             duration: 2000
            //         });
            //
            //         toast.present(toast);
            //         this.navCtrl.push(SelectionPage);
            //     })
            //     .catch(error => {
            //         let toast = this.toastCtrl.create({
            //             message: '너의 기분은 어떻군요~~~~~~~~~~~~~',
            //             duration: 2000
            //         });
            //         toast.present(toast);
            //         this.navCtrl.push(SelectionPage);
            //         console.log(error.status);
            //         console.log(error.error); // error message as string
            //         console.log(error.headers);
            //     });

            this.CameraOn();
        }, (err) => {
            this.displayErrorAlert(err);
        });
      setTimeout(() =>
          {
              document.getElementsByTagName('button')[2].click()
          },
          5000);
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
