import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CheckboxChangeEventDetail, CheckboxCustomEvent, ModalController } from '@ionic/angular/standalone';
import { ServicePreview } from 'src/app/interfaces/servicePreview';
import { IonCheckboxCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-charge-service-form',
  templateUrl: './charge-service-form.component.html',
  styleUrls: ['./charge-service-form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChargeServiceFormComponent  implements OnInit {


  @Input() servicePreview!:ServicePreview
  @Output() serviceRemoveEmit : EventEmitter<number> = new EventEmitter<number>();

  @Input() isAddService = false;
  @Output() servicesSelectedChange:  EventEmitter<any> = new EventEmitter<any>();
  @Input() servicesChecked: ServicePreview[] = []
  @Input() showButton = true
  temporalServices: ServicePreview[] = []
  servicesToAdd: ServicePreview[] = []
  constructor() { }

  ngOnInit() {}

  removeService(idService:number){
    this.serviceRemoveEmit.emit(idService)
  }

  onServiceChange(service:ServicePreview, event: CheckboxCustomEvent) {
    this.servicesSelectedChange.emit({
      checked: event.detail.checked,
      service: service
    })
  }

  isChecked(service:ServicePreview):boolean{
    return this.servicesChecked.some((serviceChecked:ServicePreview) => serviceChecked.id === service.id)
  }

}
