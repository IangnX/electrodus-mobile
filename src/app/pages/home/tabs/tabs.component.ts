import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons'; // Import this
import { settingsOutline, fitnessOutline, homeOutline, walletOutline, notificationsOutline} from 'ionicons/icons';
import { IonIcon, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { AUTHORITIES } from 'src/app/const/localStorageConst';
import { Authorities } from 'src/app/interfaces/authorities';
import { NotificationsService } from 'src/app/services/notifications.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [IonTabs,IonTabBar, IonTabButton,IonIcon]
})
export class TabsComponent  implements OnInit {

  constructor(private notificationService: NotificationsService) {
    addIcons({ settingsOutline, walletOutline, homeOutline, notificationsOutline });
  }

  authorities: Authorities[] = []

  ngOnInit() {
    const storedAuthorities = localStorage.getItem(AUTHORITIES);
    this.authorities = storedAuthorities ? JSON.parse(storedAuthorities) : [];
    this.notificationService.initListeners()
  }

  isGranted(authority: string):boolean{
    return  this.authorities.find((auth:Authorities)=> auth.authority === authority) !== undefined;
  }
}
