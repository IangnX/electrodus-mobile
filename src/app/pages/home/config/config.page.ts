import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonChip } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { exitOutline, chevronForwardOutline} from 'ionicons/icons';



@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, IonChip]
})
export class ConfigPage implements OnInit {

  constructor() {
    addIcons({ exitOutline, chevronForwardOutline });
  }

  ngOnInit() {
  }

}
