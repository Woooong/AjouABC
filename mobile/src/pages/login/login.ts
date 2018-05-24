import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';


import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    username: string;
    password: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private http: HTTP
              ) {
      this.username ='';
      this.password ='';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  user_login() {
      this.http.post('/login',
          {'username' : this.username, 'password' : this.password, 'rtype' : 'json'},
          {})
          .then(data => {

              console.log(data.status);
              console.log(data.data); // data received by server
              console.log(data.headers);
              let toast = this.toastCtrl.create({
                  message: '로그인 되었습니다.',
                  duration: 2000
              });

              toast.present(toast);
              this.navCtrl.push(HomePage);

          })
          .catch(error => {
              let toast = this.toastCtrl.create({
                  message: '로그인 되었습니다.',
                  duration: 2000
              });

              toast.present(toast);
              this.navCtrl.push(HomePage);
              console.log(error.status);
              console.log(error.error); // error message as string
              console.log(error.headers);
              // alert("잠시 후 다시 시도해 주세요.");

          });

      // let toast = this.toastCtrl.create({
      //     message: '로그인 되었습니다.',
      //     duration: 2000
      // });
      //
      // toast.present(toast);
      // this.navCtrl.push(HomePage);
  }

}
