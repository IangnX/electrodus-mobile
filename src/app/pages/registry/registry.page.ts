import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonCard } from '@ionic/angular/standalone';
import { UserSave } from 'src/app/interfaces/userSave';
import { AuthService } from 'src/app/services/auth.service';
import { ResponseApiMessage } from 'src/app/interfaces/responseApiMessage';
import { addIcons } from 'ionicons'; // Import this
import { calendarOutline, callOutline, earthOutline, homeOutline, keyOutline, mailOutline, personCircleOutline, personOutline, transgenderOutline} from 'ionicons/icons';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.page.html',
  styleUrls: ['./registry.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, ]
})
export class RegistryPage {

  EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private formBuilder: FormBuilder ,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController) {
      addIcons({ personOutline, personCircleOutline, mailOutline, keyOutline, calendarOutline,
      transgenderOutline, earthOutline, homeOutline, callOutline });
    }

  form = this.formBuilder.group({
    name: ['',[Validators.required, Validators.minLength(4)]],
    lastName: ['',[Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.pattern(this.EMAIL_REGEXP)]],
    password: ['', [Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(50),
                   ]
              ],
    confirmPassword: ['', [Validators.required,
                           Validators.minLength(8),
                           Validators.maxLength(50)
                          ]
                      ],
    dni: ['', [Validators.required,Validators.minLength(8)]]
  });


  goToLogin() {
    this.router.navigate(['/login'])
  }

  validFieldRequired(field :string): boolean{
    return this.form.get(field)?.errors?.['required'] && this.form.get(field)?.touched
  }

  validFieldMinLength(field :string): boolean{
    return (this.form.get(field)?.errors?.['minlength']?.actualLength != this.form.get(field)?.errors?.['minlength']?.requiredLength
    && this.form.get(field)?.touched) || false;
  }

  validFieldPattern(field :string):boolean{
    return this.form.get(field)?.errors?.['pattern'] && this.form.get(field)?.touched
  }

  validFieldPassword(): boolean{
    return  this.form.controls.confirmPassword.touched && this.form.value.password != this.form.value.confirmPassword
             && !this.validFieldMinLength('confirmPassword') && !this.validFieldRequired('confirmPassword')
              && this.form.get('password')?.value !== ''
  }

  registry() {
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const userSave = this.formToUser()
    this.authService.saveUser(userSave).subscribe( (resp:ResponseApiMessage) => {
      this.presentToast(resp.message,5000,'bottom')
      this.goToLogin()
    },
    error => {
      this.presentToast(error.error.message,5000,'bottom')
    })

  }

  formToUser(): UserSave{
    return {
      name: this.form.get('name')?.value || '',
      lastName: this.form.get('lastName')?.value || '',
      email: this.form.get('email')?.value || '',
      password: this.form.get('password')?.value || '',
      dni: this.form.get('dni')?.value || ''
    }
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
