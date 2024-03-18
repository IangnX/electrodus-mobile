import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonButton, IonFooter, IonCardContent, IonLabel, IonInput, IonItem, IonIcon, IonText, IonCol, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ IonContent, IonCard, IonButton, IonCardContent ,
     IonCardTitle, IonInput, IonItem, IonLabel, IonIcon,IonText,
    IonCol,IonRow, IonCardContent],
})
export class HomePage {
  constructor() {}
}
