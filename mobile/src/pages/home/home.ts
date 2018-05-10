import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ToastController } from 'ionic-angular';
import { NavController, AlertController } from 'ionic-angular';

import { SelectionPage} from '../selection/selection';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private image: string;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    public alertCtrl: AlertController,
    private domSanitizer: DomSanitizer,
    public toastCtrl: ToastController) {
      this.CameraOn()
  }

  CameraOn(){
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            saveToPhotoAlbum: true,
            mediaType: this.camera.MediaType.PICTURE
        }
        // http 통신 후
        this.camera.getPicture(options).then((imageData) => {
            console.log(imageData)
            this.image = 'data:image/jpeg;base64,' + imageData;
            let toast = this.toastCtrl.create({
                message: '너의 기분은 어떻군요~~~~~~~~~~~~~',
                duration: 2000
            });

            toast.present(toast);
            this.navCtrl.push(SelectionPage);
            // this.CameraOn()
        }, (err) => {
            this.displayErrorAlert(err);
        });
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
