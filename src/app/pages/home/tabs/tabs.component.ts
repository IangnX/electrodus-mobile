import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons'; // Import this
import { settingsOutline, fitnessOutline, homeOutline, walletOutline} from 'ionicons/icons';
import { IonIcon, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';


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

  ngOnInit() {}

}
