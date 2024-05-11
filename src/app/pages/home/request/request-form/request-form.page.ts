import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSearchbarCustomEvent } from '@ionic/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxCustomEvent, IonModal, IonicModule, SearchbarInputEventDetail } from '@ionic/angular';
import { RequestFormSave } from 'src/app/interfaces/requestFormSave';
import { Equipment } from 'src/app/interfaces/equipment';
import { ToastService } from 'src/app/services/toast.service';
import { RequestService } from 'src/app/services/request.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { RequestResponse } from 'src/app/interfaces/requetResponse';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.page.html',
  styleUrls: ['./request-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RequestFormPage implements OnInit {


  @Input() modal!: IonModal;

  @Output() dismissChange = new EventEmitter<boolean>();
  @Output() requestChange = new EventEmitter<boolean>()
  form!: FormGroup;
  equipments: Equipment[] = []
  searchedEquipment = false
  term: string = ""
  isReparationInAddress = false
  idEquipmentIsNull = false;

  constructor(private equipmentService: EquipmentService,
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private toastService: ToastService) { }

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
    this.requestService.createRequest(this.generateRequestForm()).subscribe((request:RequestResponse) => {
      this.requestChange.emit(true)
      this.dismissChange.emit(true);
      this.modal.dismiss(null, 'confirm');
      this.toastService.presentToast('Solicitud creada exitosamente!',5000,'bottom')
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
