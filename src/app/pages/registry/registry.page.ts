import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';
import { Router } from '@angular/router';
import { UserSave } from 'src/app/interfaces/userSave';
import { AuthService } from 'src/app/services/auth.service';
import { ResponseApiMessage } from 'src/app/interfaces/responseApiMessage';
import { ToastService } from 'src/app/services/toast.service';

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
    private toastService: ToastService) {}

  goToLogin() {
    this.router.navigate(['/login'])
  }

  registryUser(user: UserSave) {
    this.authService.saveUser(user).subscribe( (resp:ResponseApiMessage) => {
      this.toastService.presentToast(resp.message,5000,'bottom','success')
      this.goToLogin()
    },
    error => {
      if (error.error.messages?.length > 0) {
        console.log(error.error.messages);

        this.toastService.presentToast(error.error.message,5000,'bottom','danger')

      }else{
        this.toastService.presentToast(error.error.message,5000,'bottom')

      }
    })
  }


}
