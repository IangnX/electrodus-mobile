import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CheckboxCustomEvent, IonModal, IonicModule } from '@ionic/angular';
import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonItem, IonLabel, IonList, IonSearchbar, IonSelect, IonSelectOption, IonThumbnail, IonTitle, IonToolbar, SearchbarInputEventDetail } from '@ionic/angular/standalone';
import { IonSearchbarCustomEvent } from '@ionic/core';
import { Equipment } from 'src/app/interfaces/equipment';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule ,IonContent,IonItem,IonHeader, IonToolbar, IonTitle,
    IonButtons,IonButton,IonCard,IonCardContent, IonSearchbar,IonList,IonLabel,
  IonThumbnail]
})
export class CreateRequestComponent  implements OnInit {
  @Input() modal!: IonModal;

  @Output() dismissChange = new EventEmitter<boolean>();
  form!: FormGroup;
  equipments: Equipment[] = []
  searchedEquipment = false
  term: string = ""
  equipmentSelectedName : string = ""



  constructor(private equipmentService: EquipmentService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {}

  buildForm() {
    this.form = this.formBuilder.group({
      idEquipmentPreliminary: ['',[Validators.required]],
      description: ['',[Validators.required]],
      address: ['',[Validators.required]],
    });
  }

  checkboxChanged(event: any) {
    const ev = event as CheckboxCustomEvent;
    const checked = ev.detail.checked;

    this.dismissChange.emit(checked);
  }

  searchEquipment(event: IonSearchbarCustomEvent<SearchbarInputEventDetail>) {
    this.term =event.detail.value as string
    this.searchedEquipment = true
    if(this.term !== ""){
      this.equipmentService.getEquipmentsByTerm(this.term,0,5).subscribe((data:any) => {
        this.equipments = data.content
      })
    }
  }

  setEquipment(equipmentSelected: Equipment) {
    this.term = ""
    this.searchedEquipment = false
    this.equipmentSelectedName = equipmentSelected.type + " " + equipmentSelected.brand + " " + equipmentSelected.model
    this.form.get('idEquipmentPreliminary')?.setValue(equipmentSelected.id)
  }

}
