import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonCard } from '@ionic/angular/standalone';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.page.html',
  styleUrls: ['./registry.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, ]
})
export class RegistryPage {

  EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private formBuilder: FormBuilder ,private router: Router) { }

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
    dni: ['', [Validators.required,Validators.minLength(8)], Validators.pattern("^[0-9]+$"),]
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
    console.log(this.form);
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
  }


}
