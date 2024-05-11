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
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.page.html',
  styleUrls: ['./request-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RequestFormPage implements OnInit {


  form!: FormGroup;
  equipments: Equipment[] = []
  searchedEquipment = false
  term: string = ""
  isReparationInAddress = false
  idEquipmentIsNull = false;
  idRequest: number = 0;
  routeSub!: Subscription;
  showModalCancel = false;

  alertButtons = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        console.log('Cancelar');
        this.showModalCancel = false
      },
    },
    {
      text: 'Si',
      role: 'confirm',
      handler: () => {
        console.log('Continuar');
        this.showModalCancel = false
        this.router.navigate(['/request']);
      },
    },
  ];

  constructor(private equipmentService: EquipmentService,
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute) {
      this.buildForm()
    }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params: Params) => {
        this.idRequest = params['id']
    })

    if(this.idRequest !== 0){
      this.getRequestById()
    }
  }
  getRequestById() {
    this.requestService.getRequestById(this.idRequest)
      .subscribe((request:RequestResponse)=> {
        console.log(this.form);
        console.log(request);
        this.form.setValue({
          idEquipmentPreliminary: request.idEquipmentPreliminary,
          description: request.description,
          equipmentSelectedName: request.equipmentName,
          address: request.address
        })
        if (request.address && request.address !== "") {
          this.isReparationInAddress = true
        }
      })
  }


  buildForm() {
    this.form = this.formBuilder.group({
      idEquipmentPreliminary: ['',[Validators.required]],
      description: ['',[Validators.required]],
      equipmentSelectedName: ['',Validators.required],
      address: ['',],
    });
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
      this.router.navigate(['/request']);
      this.toastService.presentToast('Solicitud creada exitosamente!',5000,'bottom')
      this.form.reset()
    })
  }

  validFieldRequired(field :string): boolean{
    return this.form?.get(field)?.errors?.['required'] && this.form.get(field)?.touched
  }

  generateRequestForm(): RequestFormSave {
    return {
      idEquipmentPreliminary: this.form.value.idEquipmentPreliminary,
      description: this.form.value.description,
      address: this.form.value.address === "" ? 'En el local' : this.form.value.address,
    }
  }

  setResult(ev:any) {
    if(ev.detail.role === "confirm"){
      const currentUrl = this.router.url;
      this.router.navigate(['/request']);
    }
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  cancelar() {
    this.showModalCancel = true
  }

}
