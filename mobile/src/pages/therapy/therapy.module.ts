import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TherapyPage } from './therapy';

@NgModule({
  declarations: [
    TherapyPage,
  ],
  imports: [
    IonicPageModule.forChild(TherapyPage),
  ],
})
export class TherapyPageModule {}
