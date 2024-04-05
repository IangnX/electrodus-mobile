import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonButton, IonFooter, IonCardContent, IonLabel, IonInput, IonItem, IonIcon, IonText, IonCol, IonRow, IonCardHeader, ToastController } from '@ionic/angular/standalone';
import { CookieService } from 'ngx-cookie-service';
import { LoginResponse } from 'src/app/interfaces/loginResponse';
import { UserLogin } from 'src/app/interfaces/userLogin';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [ IonContent, IonCard, IonButton, IonCardContent ,
     IonCardTitle, IonInput, IonItem, IonLabel, IonIcon,IonText,
    IonCol,IonRow, IonCardContent, IonCardHeader, ReactiveFormsModule,
    CommonModule],
})
export class LoginPage {

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private cookieService: CookieService) {}

    EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


    form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.EMAIL_REGEXP)]],
      password: ['', [Validators.required,
                      Validators.minLength(8),
                      Validators.maxLength(50),
                     ]
                ],
    });
  goToRegistry(){
    this.router.navigate(['/crear-cuenta'])
  }

  login() {
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    this.authService.login(this.getUserLogin()).subscribe( (resp:LoginResponse) => {
      this.cookieService.set('token',resp.jwt)
      this.cookieService.set('user', JSON.stringify(resp.user))
      this.router.navigate(['/home'])
    },
    error => {
      this.presentToast(error.error.apiMessage,5000,'bottom')
    })

  }

  getUserLogin():UserLogin {
    return {
      email: this.form.get('email')?.value || '',
      password: this.form.get('password')?.value || ''
    }
  }

  validFieldPattern(field :string):boolean{
    return this.form.get(field)?.errors?.['pattern'] && this.form.get(field)?.touched
  }

  validFieldRequired(field :string): boolean{
    return this.form.get(field)?.errors?.['required'] && this.form.get(field)?.touched

  }

  validFieldMinLength(field :string): boolean{
    return this.form.get(field)?.touched &&
        (this.form.get(field)?.errors?.['minlength']?.actualLength != this.form.get(field)?.errors?.['minlength']?.requiredLength)
        || false
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
