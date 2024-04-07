import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckboxCustomEvent, IonModal, IonicModule } from '@ionic/angular';
import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonItem, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Equipment } from 'src/app/interfaces/equipment';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss'],
  standalone: true,
  imports: [CommonModule,IonContent,IonItem,IonHeader, IonToolbar, IonTitle,
    IonButtons,IonButton,IonCard,IonCardContent,IonSelect,IonSelectOption]
})
export class CreateRequestComponent  implements OnInit {


  @Input() modal!: IonModal;

  @Output() dismissChange = new EventEmitter<boolean>();

  equipments: Equipment[] = []

  constructor(private equipmentService: EquipmentService) { }

  ngOnInit() {
    this.equipmentService.getEquipments().subscribe( (equipments: Equipment[]) => this.equipments = equipments)
  }

  checkboxChanged(event: any) {
    const ev = event as CheckboxCustomEvent;
    const checked = ev.detail.checked;

    this.dismissChange.emit(checked);
  }

}
