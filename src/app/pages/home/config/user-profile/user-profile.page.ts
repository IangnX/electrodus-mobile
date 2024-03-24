import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from '../../tabs/tabs.component';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/interfaces/user';
import { IonDatetime, IonDatetimeButton, IonModal, SelectChangeEventDetail } from '@ionic/angular/standalone';
import { DatetimeChangeEventDetail, IonDatetimeCustomEvent, IonSelectCustomEvent } from '@ionic/core';
import { UserService } from 'src/app/services/user.service';
import { UserUpdate } from 'src/app/interfaces/userUpdate';
import { ResponseApiMessage } from 'src/app/interfaces/responseApiMessage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class UserProfilePage implements OnInit {



  component = TabsComponent;
  user: any
  form!: FormGroup;
  disabledField = true

  date ="2024-03-20T00:00:00"


  constructor(private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(this.cookieService.get('user'));
    console.log(this.user);

    this.date = this.user.birthday ? `${this.user.birthday}T00:00:00` : this.date

    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: [this.user.name,[Validators.required, Validators.minLength(4)]],
      lastName: [this.user.lastName,[Validators.required, Validators.minLength(4)]],
      email: [this.user.email, ],
      dni: [this.user.dni],
      phoneNumber: [this.user.phoneNumber],
      birthday: [this.user.birthday],
      gender: [this.user.gender],
      city: [this.user.city],
      state: [this.user.state],
    });
  }

  handleChange(value: IonSelectCustomEvent<SelectChangeEventDetail<any>>) {
    this.form.get('gender')?.setValue(value.detail.value);
  }

  doSomething(value: IonDatetimeCustomEvent<DatetimeChangeEventDetail>) {
   this.form.get('birthday')?.setValue(value.detail.value?.slice(0,10))
  }

  update() {
    this.userService.update(this.user.id,this.formToUser()).subscribe((resp:ResponseApiMessage) => {
      const user: UserUpdate = resp.data;
      this.user.name = user.name
      this.user.lastName = user.lastName
      this.user.state = user.state
      this.user.city = user.city
      this.user.phoneNumber = user.phoneNumber
      this.user.gender = user.gender
      this.user.birthday = user.birthday
      this.cookieService.set('user', JSON.stringify(this.user));
      this.router.navigate(['/configuration'])
    })
  }

  formToUser(): UserUpdate{
    return {
      name: this.form.get('name')?.value || '',
      lastName: this.form.get('lastName')?.value || '',
      state: this.form.get('state')?.value || '',
      city: this.form.get('city')?.value || '',
      phoneNumber: this.form.get('phoneNumber')?.value || '',
      gender: this.form.get('gender')?.value || '',
      birthday: this.form.get('birthday')?.value || '',
    }
  }

}
