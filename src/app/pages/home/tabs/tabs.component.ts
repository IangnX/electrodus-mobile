import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons'; // Import this
import { settingsOutline, fitnessOutline, homeOutline, walletOutline} from 'ionicons/icons';
import { IonIcon, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { AUTHORITIES } from 'src/app/const/localStorageConst';
import { Authorities } from 'src/app/interfaces/authorities';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [IonTabs,IonTabBar, IonTabButton,IonIcon]
})
export class TabsComponent  implements OnInit {

  constructor() {
    addIcons({ settingsOutline, walletOutline, homeOutline });
  }

  authorities: Authorities[] = []

  ngOnInit() {
    const storedAuthorities = localStorage.getItem(AUTHORITIES);
    this.authorities = storedAuthorities ? JSON.parse(storedAuthorities) : [];
  }

  isGranted(authority: string):boolean{
    const permit = this.authorities.find((auth:Authorities)=> auth.authority === authority) !== undefined;
    console.log(permit);

    return permit
  }

}
