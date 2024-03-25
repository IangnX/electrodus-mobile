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
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule, UserFormComponent]
})
export class UserProfilePage implements OnInit {
  user: any
  constructor(private cookieService: CookieService,
    private userService: UserService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit() {
    this.user = JSON.parse(this.cookieService.get('user'));
  }

  update(user: UserUpdate) {
    this.userService.update(this.user.id,user).subscribe((resp:ResponseApiMessage) => {
      const user: UserUpdate = resp.data;
      this.user.name = user.name
      this.user.lastName = user.lastName
      this.user.state = user.state
      this.user.city = user.city
      this.user.phoneNumber = user.phoneNumber
      this.user.gender = user.gender
      this.user.birthday = user.birthday
      this.cookieService.set('user', JSON.stringify(this.user));
      this.toastService.presentToast(resp.message,3000,'bottom')
      this.router.navigate(['/home/configuration'])
    })
  }


}
