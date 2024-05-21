import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonChip } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { exitOutline, chevronForwardOutline} from 'ionicons/icons';
import { Router } from '@angular/router';
import { UserProfilePage } from './user-profile/user-profile.page';



@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, IonChip]
})
export class ConfigPage implements OnInit {

  showLogoutModal = false
  component = UserProfilePage

  logoutButtons = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        console.log('Cancelar');
        this.showLogoutModal = false
      },
    },
    {
      text: 'Si',
      role: 'confirm',
      handler: () => {
        localStorage.clear()
        this.showLogoutModal = false
        this.router.navigate(['/login']);
      },
    },
  ];

  constructor(private router: Router) {
    addIcons({ exitOutline, chevronForwardOutline });
  }

  ngOnInit() {
  }

  goToUserProfile() {
    this.router.navigate(['user-profile']);
  }

  confirmLogoutModal(){
    this.showLogoutModal = true
  }

  logout() {
    console.log("logout");

  }

}
