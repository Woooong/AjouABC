import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';


import { HomePage } from '../home/home';
import { DiaryPage } from "../diary/diary";

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
    login_data: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private http: HTTP
              ) {
      this.username ='uram';
      this.password ='201221002';
      // if(localStorage.getItem("username") != ''){
      //     this.navCtrl.push(HomePage);
      // }
  }

  user_login() {
      this.http.post('/login',
          {'username' : this.username, 'password' : this.password, 'rtype' : 'json'},
          {})
          .then(data => {

              // console.log(data.status);
              // console.log(data.data); // data received by server
              // console.log(data.headers);
              this.login_data = JSON.parse(data.data)
              if(this.login_data['status_code'] == 200) {
                  localStorage.setItem("username", this.login_data['user']);
                  let toast = this.toastCtrl.create({
                      message: '로그인 되었습니다.',
                      duration: 2000
                  });
                  toast.present(toast);
                  this.navCtrl.push(HomePage);
              }
              else{
                  let toast = this.toastCtrl.create({
                      message: '아이디 또는 비밀번호가 잘못 되었습니다.',
                      duration: 2000
                  });
                  toast.present(toast);
              }
          })
          .catch(error => {
              let toast = this.toastCtrl.create({
                  message: '아이디 또는 비밀번호가 잘못 되었습니다.',
                  duration: 2000
              });

              toast.present(toast);
              // console.log(error.status);
              // console.log(error.error); // error message as string
              // console.log(error.headers);
              // alert("잠시 후 다시 시도해 주세요.");

          });
  }

}
