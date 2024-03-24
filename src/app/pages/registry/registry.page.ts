import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';
import { Router } from '@angular/router';
import { UserSave } from 'src/app/interfaces/userSave';
import { AuthService } from 'src/app/services/auth.service';
import { ResponseApiMessage } from 'src/app/interfaces/responseApiMessage';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.page.html',
  styleUrls: ['./registry.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, UserFormComponent]
})
export class RegistryPage  {


  constructor(private router: Router,
    private authService: AuthService,
    private toastController: ToastController,) {}

  goToLogin() {
    this.router.navigate(['/login'])
  }

  registryUser(user: UserSave) {
    this.authService.saveUser(user).subscribe( (resp:ResponseApiMessage) => {
      this.presentToast(resp.message,5000,'bottom')
      this.goToLogin()
    },
    error => {
      this.presentToast(error.error.message,5000,'bottom')
    })
  }

  async presentToast(message:string,duration:number, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      cssClass: 'custom-toast',
      position: position,
    });

    await toast.present();
  }

}
