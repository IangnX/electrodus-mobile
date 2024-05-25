import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxChangeEventDetail, IonicModule } from '@ionic/angular';
import { IonCheckboxCustomEvent } from '@ionic/core';
import { User } from 'src/app/interfaces/user';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-list-technician',
  templateUrl: './list-technician.component.html',
  styleUrls: ['./list-technician.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]

})
export class ListTechnicianComponent  implements OnInit {

  users:User[] = []
  userSelected :User[] = []
  @Output()userSelectedChange: EventEmitter<User> = new EventEmitter<User>();

  constructor(private userService: UserService,
    private toastService:ToastService) { }

  ngOnInit() {
    this.userService.findByAuthority('EJECUTAR_REPARACION').subscribe((resp:any) => {
      console.log(resp);
      this.users = resp.content as User[]
    })
  }

  onServiceChange(userChecked: User,event: IonCheckboxCustomEvent<CheckboxChangeEventDetail<any>>) {
    console.log(userChecked);
    console.log(event);
    if (event.detail.checked) {
      this.userSelected.push(userChecked)
    }else{
      this.userSelected = [...this.userSelected.filter((user:User) => user !== userChecked)]
    }
    console.log(this.userSelected);
  }

  emitUser() {
    if (this.userSelected.length > 1) {
      this.toastService.presentToast('Solo se puede seleccionar 1 técnico',5000,'bottom','warning')
      return
    }
    this.userSelectedChange.emit(this.userSelected[0])
  }

}
