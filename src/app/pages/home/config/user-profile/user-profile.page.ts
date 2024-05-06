import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from '../../tabs/tabs.component';
import { User } from 'src/app/interfaces/user';
import { IonDatetime, IonDatetimeButton, IonModal, SelectChangeEventDetail } from '@ionic/angular/standalone';
import { DatetimeChangeEventDetail, IonDatetimeCustomEvent, IonSelectCustomEvent } from '@ionic/core';
import { UserService } from 'src/app/services/user.service';
import { UserUpdate } from 'src/app/interfaces/userUpdate';
import { ResponseApiMessage } from 'src/app/interfaces/responseApiMessage';
import { Router } from '@angular/router';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';
import { ToastService } from 'src/app/services/toast.service';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule, UserFormComponent]
})
export class UserProfilePage implements OnInit {
  image: any;
  user: any
  constructor(private userService: UserService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    console.log(this.user);

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
      localStorage.setItem('user',JSON.stringify(this.user))
      this.toastService.presentToast(resp.message,3000,'bottom')
      this.router.navigate(['/home/configuration'])
    })
  }

  async loadImage() {
    try {
      if(Capacitor.getPlatform() != 'web') await Camera.requestPermissions();
      const image = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Prompt,
        allowEditing: true,
        resultType: CameraResultType.DataUrl
      });
      const blob = this.dataUrlToBlob(image.dataUrl);
      const formData = new FormData();
      formData.append('file', blob);
      this.userService.updateImageProfile(formData).subscribe((resp: ResponseApiMessage) => {
        console.log(resp);
        this.user.urlImage = resp.data
        localStorage.setItem('user',JSON.stringify(this.user))
        this.toastService.presentToast(resp.message,3000,'bottom')

      },
      (error) => {
        this.toastService.presentToast('Error al subir la imagen',3000,'bottom')
      })
    } catch (error) {
      console.log(error);
    }
  }

  dataUrlToBlob(dataUrl: any) {
    let arr = dataUrl.split(',');
    let mime = arr[0].match(/:(.*?);/)?.[1] ?? 'image/png';
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }
}



