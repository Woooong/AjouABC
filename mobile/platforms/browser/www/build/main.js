webpackJsonp([4],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(155);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, toastCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.username = 'uram';
        this.password = '201221002';
        // if(localStorage.getItem("username") != ''){
        //     this.navCtrl.push(HomePage);
        // }
    }
    LoginPage.prototype.user_login = function () {
        var _this = this;
        document.getElementById('login_btn').setAttribute('disabled', 'disabled');
        this.http.post('/login', { 'username': this.username, 'password': this.password, 'rtype': 'json' }, {})
            .then(function (data) {
            // console.log(data.status);
            // console.log(data.data); // data received by server
            // console.log(data.headers);
            _this.login_data = JSON.parse(data.data);
            if (_this.login_data['status_code'] == 200) {
                localStorage.setItem("username", _this.login_data['user']);
                var toast = _this.toastCtrl.create({
                    message: '로그인 되었습니다.',
                    duration: 2000
                });
                toast.present(toast);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: '아이디 또는 비밀번호가 잘못 되었습니다.',
                    duration: 2000
                });
                document.getElementById('login_btn').removeAttribute('disabled');
                toast.present(toast);
            }
        })
            .catch(function (error) {
            document.getElementById('login_btn').removeAttribute('disabled');
            var toast = _this.toastCtrl.create({
                message: '아이디 또는 비밀번호가 잘못 되었습니다.',
                duration: 2000
            });
            toast.present(toast);
            // console.log(error.status);
            // console.log(error.error); // error message as string
            // console.log(error.headers);
            // alert("잠시 후 다시 시도해 주세요.");
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/woong/Documents/WCD2018/AjouABC/mobile/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n\n    <ion-item>\n      <ion-label fixed>Username</ion-label>\n      <ion-input type="text" [(ngModel)]="username"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label fixed>Password</ion-label>\n      <ion-input type="password" [(ngModel)]="password"></ion-input>\n    </ion-item>\n\n  </ion-list>\n\n  <div padding>\n    <button id="login_btn" ion-button color="primary" block (click)="user_login()">Sign In</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/woong/Documents/WCD2018/AjouABC/mobile/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SelectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SelectionPage = /** @class */ (function () {
    function SelectionPage(navCtrl, navParams, toastCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.comment_list = [];
        this.tts_list = [];
        this.comment = '';
        this.emotion_data = navParams.get("emotion_data");
        console.log(this.emotion_data['represent_emotion']);
        console.log(this.emotion_data['represent_age']);
        console.log(this.emotion_data['represent_gender']);
        this.emotion_code = this.emotion_data['represent_emotion'];
        this.emotion = null;
        if (this.emotion_code == "anger") {
            this.emotion = "화난";
        }
        else if (this.emotion_code == "contempt") {
            this.emotion = "경멸하는";
        }
        else if (this.emotion_code == "disgust") {
            this.emotion = "역겨워하는";
        }
        else if (this.emotion_code == "fear") {
            this.emotion = "두려워하는";
        }
        else if (this.emotion_code == "happiness") {
            this.emotion = "행복한";
        }
        else if (this.emotion_code == "sadness") {
            this.emotion = "슬픈";
        }
        else if (this.emotion_code == "surprise") {
            this.emotion = "놀란";
        }
        else if (this.emotion_code == "neutral") {
            this.emotion = "무표정한";
        }
        if (this.emotion_data['represent_gender'] == 'male') {
            this.gender = '남자';
        }
        else {
            this.gender = '여자';
        }
        this.age = parseInt(this.emotion_data['represent_age']);
        this.ment = this.emotion_data['ment'];
    }
    SelectionPage.prototype.ngOnInit = function () {
        var _this = this;
        this.comment_list.push("오늘 당신은 " + this.age + "세 " + this.gender + "의 " + this.emotion + "얼굴을 가지고 있군요.");
        this.comment_list.push("제가 분석한 감정이 맞나요?");
        document.getElementById('comment').innerHTML = "<h1>" + this.comment_list[0] + "</h1>";
        this.comment = this.comment_list.join(', ');
        this.http.post('https://dev.ryuneeee.com:5000/api/getVoice', { "text": this.comment }, {})
            .then(function (tts) {
            document.getElementById('mp3audio').setAttribute('src', JSON.parse(tts.data)['url']);
        })
            .catch(function (error) {
        });
        document.getElementById('bgmvolume').click();
        document.getElementById('bgmaudio').setAttribute('src', 'https://s3.ap-northeast-2.amazonaws.com/ryun.capstone/sadness.mp3');
        var count = 1;
        var interval = setInterval(function () {
            if (!_this.comment_list[count]) {
                document.getElementById("YNbuttons").style.display = "block";
                clearInterval(interval);
            }
            else {
                document.getElementById('comment').innerHTML = "<h1>" + _this.comment_list[count] + "</h1>";
                count++;
            }
        }, 4300);
    };
    SelectionPage.prototype.select = function (sel) {
        var _this = this;
        if (sel == 'Y') {
            document.getElementById("YNbuttons").style.display = "none";
            this.http.post('https://dev.ryuneeee.com:5000/api/getVoice', { "text": this.ment }, {})
                .then(function (tts) {
                document.getElementById('comment').innerHTML = "<h1>" + _this.ment + "</h1>";
                document.getElementById('mp3audio').setAttribute('src', JSON.parse(tts.data)['url']);
                setTimeout(function () {
                    _this.http.get('/api/getQuestion/' + localStorage.getItem('username') + '/1', {}, {})
                        .then(function (data) {
                        _this.q_text = JSON.parse(data.data)['data']['q_text'];
                        _this.q_id = JSON.parse(data.data)['data']['q_id'];
                        _this.http.post('https://dev.ryuneeee.com:5000/api/getVoice', { "text": _this.q_text }, {})
                            .then(function (tts) {
                            location.replace('/static/AudioRecorder/index.html?q_id=' + _this.q_id + '&q_text=' + _this.q_text + '&tts=' + JSON.parse(tts.data)['url']);
                        })
                            .catch(function (error) {
                        });
                    })
                        .catch(function (error) {
                    });
                }, 4300);
            })
                .catch(function (error) {
            });
        }
        else {
            this.http.post('https://dev.ryuneeee.com:5000/api/getVoice', { "text": "당신은 지금 어떤 기분이신가요?" }, {})
                .then(function (tts) {
                document.getElementById('mp3audio').setAttribute('src', JSON.parse(tts.data)['url']);
                document.getElementById('comment').innerHTML = "<h1>당신은 지금 어떤 기분이신가요?</h1>";
                document.getElementById("YNbuttons").style.display = "none";
                document.getElementById("step2").style.display = "block";
            })
                .catch(function (error) {
            });
        }
    };
    SelectionPage.prototype.selectEmotion = function (emotion) {
        var _this = this;
        console.log(123);
        this.http.post('/api/setEmotion/' + localStorage.getItem('username') + '/111', { "change_emotion": emotion }, {})
            .then(function (data) {
            console.log(JSON.parse(data.data));
            document.getElementById('mp3audio').setAttribute('src', JSON.parse(data.data)['tts']);
            document.getElementById('comment').innerHTML = "<h1>" + JSON.parse(data.data)['ment'] + "</h1>";
            setTimeout(function () {
                _this.http.get('/api/getQuestion/' + localStorage.getItem('username') + '/1', {}, {})
                    .then(function (data) {
                    _this.q_text = JSON.parse(data.data)['data']['q_text'];
                    _this.q_id = JSON.parse(data.data)['data']['q_id'];
                    _this.http.post('https://dev.ryuneeee.com:5000/api/getVoice', { "text": _this.q_text }, {})
                        .then(function (tts) {
                        location.replace('/static/AudioRecorder/index.html?q_id=' + _this.q_id + '&q_text=' + _this.q_text + '&tts=' + JSON.parse(tts.data)['url']);
                    })
                        .catch(function (error) {
                    });
                })
                    .catch(function (error) {
                });
            }, 4300);
        })
            .catch(function (error) {
        });
    };
    SelectionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-selection',template:/*ion-inline-start:"/Users/woong/Documents/WCD2018/AjouABC/mobile/src/pages/selection/selection.html"*/'<!--\n  Generated template for the SelectionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content>\n\n  <div id="comment" style="margin: 20px; padding: 10px;\n    text-align: center;\n    background: #1CA4FC !important; font-weight: bold;">\n  </div>\n  <div id="YNbuttons" style="margin: 20px; padding: 10px;\n    text-align: center; display: none;">\n    <button ion-button round style="background: #1CA4FC !important; font-weight: bold;" (click)="select(\'Y\')">맞아요!</button>\n    <button ion-button round style="background: #1CA4FC !important; font-weight: bold;" (click)="select(\'N\')">아닙니다!</button>\n  </div>\n  <audio style="display: none;" id="mp3audio" src="" controls="" autoplay="autoplay" preload="auto"></audio>\n  <audio style="display: none;" id="bgmaudio" src="" controls="" autoplay="autoplay" preload="auto" loop="loop"></audio>\n  <button style="display: none;" id="bgmvolume" onclick="document.getElementById(\'bgmaudio\').volume=0.1">Volume Down</button>\n\n  <div id="step2" style="display: none;">\n    <div>\n      <img width="150" height="150" src="assets/imgs/angry.gif" (click)="selectEmotion(\'angry\')">\n      <img width="150" height="150" src="assets/imgs/happy.gif" (click)="selectEmotion(\'happy\')">\n      <img width="150" height="150" src="assets/imgs/sad.gif" (click)="selectEmotion(\'sad\')">\n      <img width="150" height="150" src="assets/imgs/surprise.gif" (click)="selectEmotion(\'surprise\')">\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/woong/Documents/WCD2018/AjouABC/mobile/src/pages/selection/selection.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */]])
    ], SelectionPage);
    return SelectionPage;
}());

//# sourceMappingURL=selection.js.map

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/diary/diary.module": [
		276,
		3
	],
	"../pages/login/login.module": [
		277,
		2
	],
	"../pages/selection/selection.module": [
		279,
		1
	],
	"../pages/therapy/therapy.module": [
		278,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 153;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__selection_selection__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_http__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, camera, alertCtrl, toastCtrl, domSanitizer, http) {
        // this.CameraOn()
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.domSanitizer = domSanitizer;
        this.http = http;
    }
    HomePage.prototype.ngAfterViewInit = function () {
        this.CameraOn();
    };
    HomePage.prototype.CameraOn = function () {
        var _this = this;
        var options = {
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
        this.camera.getPicture(options).then(function (imageData) {
            _this.img = 'data:image/jpeg;base64,' + imageData;
            // 얼굴인식 안됬을 경우 this.CameraOn(); 입력해줘야함 결과값에 따라 다름
            _this.http.post('/api/getEmotion/' + localStorage.getItem('username') + '/123', { 'image': _this.img }, {})
                .then(function (data) {
                console.log(data.data);
                _this.emotion_code = JSON.parse(data.data)['represent_emotion'];
                _this.emotion = null;
                if (_this.emotion_code == "anger") {
                    _this.emotion = "화난";
                }
                else if (_this.emotion_code == "contempt") {
                    _this.emotion = "경멸하는";
                }
                else if (_this.emotion_code == "disgust") {
                    _this.emotion = "역겨워하는";
                }
                else if (_this.emotion_code == "fear") {
                    _this.emotion = "두려워하는";
                }
                else if (_this.emotion_code == "happiness") {
                    _this.emotion = "행복한";
                }
                else if (_this.emotion_code == "sadness") {
                    _this.emotion = "슬픈";
                }
                else if (_this.emotion_code == "surprise") {
                    _this.emotion = "놀란";
                }
                else if (_this.emotion_code == "neutral") {
                    _this.emotion = "무표정한";
                }
                if (_this.emotion == null) {
                    _this.CameraOn();
                    return null;
                }
                var toast = _this.toastCtrl.create({
                    message: _this.emotion,
                    duration: 2000
                });
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__selection_selection__["a" /* SelectionPage */], { 'emotion_data': JSON.parse(data.data) });
            })
                .catch(function (error) {
                console.log(error.status);
                console.log(error.error); // error message as string
                console.log(error.headers);
                _this.CameraOn();
            });
        }, function (err) {
            _this.CameraOn();
            _this.displayErrorAlert(err);
        });
        setTimeout(function () {
            document.getElementsByTagName('button')[2].click();
        }, 3000);
    };
    HomePage.prototype.displayErrorAlert = function (err) {
        console.log(err);
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Error while trying to capture picture',
            buttons: ['OK']
        });
        alert.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/woong/Documents/WCD2018/AjouABC/mobile/src/pages/home/home.html"*/'<script>\n    console.log(123);\n</script>\n<ion-content>\n  <ion-card style="display: none;">\n      <img *ngIf="img"\n           [src]="domSanitizer.bypassSecurityTrustUrl(this.img)" />\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/woong/Documents/WCD2018/AjouABC/mobile/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_http__["a" /* HTTP */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiaryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { HomePage } from '../home/home';
/**
 * Generated class for the DiaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DiaryPage = /** @class */ (function () {
    function DiaryPage(navCtrl, navParams, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
    }
    DiaryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DiaryPage');
    };
    DiaryPage.prototype.CloseVoiceRecord = function () {
        var toast = this.toastCtrl.create({
            message: '시나리오 끝',
            duration: 2000
        });
        toast.present(toast);
        this.navCtrl.popAll();
    };
    DiaryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-diary',template:/*ion-inline-start:"/Users/woong/Documents/WCD2018/AjouABC/mobile/src/pages/diary/diary.html"*/'<!--\n  Generated template for the DiaryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n  <h1>세월을 정통으로 맞으신 기분을 한마디로 표현하세요.</h1>\n  <button (click)="CloseVoiceRecord()"> 녹음끝~~~ </button>\n</ion-content>\n'/*ion-inline-end:"/Users/woong/Documents/WCD2018/AjouABC/mobile/src/pages/diary/diary.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]])
    ], DiaryPage);
    return DiaryPage;
}());

//# sourceMappingURL=diary.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TherapyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the TherapyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TherapyPage = /** @class */ (function () {
    function TherapyPage(navCtrl, navParams, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
    }
    TherapyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TherapyPage');
    };
    TherapyPage.prototype.goToDiary = function () {
        var toast = this.toastCtrl.create({
            message: '이우람 같군요~~~~~~~~~~~~~~',
            duration: 2000
        });
        toast.present(toast);
        location.replace('/AudioRecorder/index.html');
        // this.navCtrl.push(TherapyPage);
    };
    TherapyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-therapy',template:/*ion-inline-start:"/Users/woong/Documents/WCD2018/AjouABC/mobile/src/pages/therapy/therapy.html"*/'<!--\n  Generated template for the TherapyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n <div>테라피다 정신병원가자</div>\n <button (click)="goToDiary()">다이어리</button>\n</ion-content>\n'/*ion-inline-end:"/Users/woong/Documents/WCD2018/AjouABC/mobile/src/pages/therapy/therapy.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]])
    ], TherapyPage);
    return TherapyPage;
}());

//# sourceMappingURL=therapy.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(223);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera_preview__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_selection_selection__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_diary_diary__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_therapy_therapy__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_selection_selection__["a" /* SelectionPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_diary_diary__["a" /* DiaryPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_therapy_therapy__["a" /* TherapyPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/diary/diary.module#DiaryPageModule', name: 'DiaryPage', segment: 'diary', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/therapy/therapy.module#TherapyPageModule', name: 'TherapyPage', segment: 'therapy', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/selection/selection.module#SelectionPageModule', name: 'SelectionPage', segment: 'selection', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_selection_selection__["a" /* SelectionPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_diary_diary__["a" /* DiaryPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_therapy_therapy__["a" /* TherapyPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera_preview__["a" /* CameraPreview */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_http__["a" /* HTTP */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/woong/Documents/WCD2018/AjouABC/mobile/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/woong/Documents/WCD2018/AjouABC/mobile/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[200]);
//# sourceMappingURL=main.js.map