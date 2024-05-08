import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxCustomEvent, IonModal, IonicModule } from '@ionic/angular';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonHeader, IonItem, IonLabel, IonList, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTextarea, IonThumbnail, IonTitle, IonToggle, IonToolbar, SearchbarInputEventDetail } from '@ionic/angular/standalone';
import { IonSearchbarCustomEvent } from '@ionic/core';
import { Equipment } from 'src/app/interfaces/equipment';
import { RequestFormSave } from 'src/app/interfaces/requestFormSave';
import { RequestPreview } from 'src/app/interfaces/requestPreview';
import { EquipmentService } from 'src/app/services/equipment.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule ,IonContent,IonItem,IonHeader, IonToolbar, IonTitle,
    IonButtons,IonButton,IonCard,IonCardContent, IonSearchbar,IonList,IonLabel,
  IonThumbnail,IonTextarea,IonToggle, IonRow, IonCol]
})
export class CreateRequestComponent  implements OnInit {


  @Input() modal!: IonModal;

  @Output() dismissChange = new EventEmitter<boolean>();
  @Output() requestChange = new EventEmitter<RequestPreview>()
  form!: FormGroup;
  equipments: Equipment[] = []
  searchedEquipment = false
  term: string = ""
  isReparationInAddress = false
  idEquipmentIsNull = false;

  constructor(private equipmentService: EquipmentService,
    private formBuilder: FormBuilder,
    private requestService: RequestService) { }

  ngOnInit() {
    this.buildForm()
  }

  buildForm() {
    this.form = this.formBuilder.group({
      idEquipmentPreliminary: ['',[Validators.required]],
      description: ['',[Validators.required]],
      equipmentSelectedName: ['',Validators.required],
      address: ['',],
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
    }else{
      this.form.get('equipmentSelectedName')?.setValue("")
    }
  }

  setEquipment(equipmentSelected: Equipment) {
    this.term = ""
    this.searchedEquipment = false
    this.form.get('equipmentSelectedName')?.setValue(equipmentSelected.type + " " + equipmentSelected.brand + " " + equipmentSelected.model)
    this.form.get('idEquipmentPreliminary')?.setValue(equipmentSelected.id)
  }

  changePlaceRepair() {
    this.isReparationInAddress = !this.isReparationInAddress
    if (this.isReparationInAddress) {
      this.form.get('address')?.setValidators([Validators.required]);
      this.form.get('address')?.updateValueAndValidity();
    }else{
      this.form.get('address')?.clearValidators(); // 6. Clear All Validators
      this.form.get('address')?.updateValueAndValidity();
    }
  }

  create() {
    if(this.form.invalid || this.idEquipmentIsNull){
      this.form.markAllAsTouched();
      return;
    }
    this.requestService.createRequest(this.generateRequestForm()).subscribe((request:RequestPreview) => {
      this.requestChange.emit(request)
      this.dismissChange.emit(true);
      this.modal.dismiss(null, 'confirm');
    })
  }

  validFieldRequired(field :string): boolean{
    return this.form.get(field)?.errors?.['required'] && this.form.get(field)?.touched
  }

  generateRequestForm(): RequestFormSave {
    return {
      idEquipmentPreliminary: this.form.value.idEquipmentPreliminary,
      description: this.form.value.description,
      address: this.form.value.address === "" ? 'En el local' : this.form.value.address,
    }
  }

}
