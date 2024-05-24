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
import { isGranted } from 'src/app/utils/securityUtils';
import { ModalController } from '@ionic/angular/standalone';
import { ChargeServiceFormComponent } from 'src/app/components/charge-service-form/charge-service-form.component';
import { addIcons } from 'ionicons';
import { removeCircleOutline, star } from 'ionicons/icons';
import { ServicesService } from 'src/app/services/services.service';
import { ServicePreview, ServicePreviewPage } from 'src/app/interfaces/servicePreview';
import { ListsServicesModalComponent } from 'src/app/components/list-services-modal/list-services-modal.component';
import { PromotionService } from 'src/app/services/promotion.service';
import { Promotion, PromotionResponsePage } from 'src/app/interfaces/promotionResponsePage';
import { ResponseApiMessage } from 'src/app/interfaces/responseApiMessage';
import { EquipmentCardImageComponent } from 'src/app/components/equipment-card-image/equipment-card-image.component';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.page.html',
  styleUrls: ['./request-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule,ChargeServiceFormComponent,
    ListsServicesModalComponent, EquipmentCardImageComponent]
})
export class RequestFormPage implements OnInit {


  requestCategoryId = 0;
  isOpenModalServices = false
  presentingElement: Element | null = null;
  form!: FormGroup;
  equipments: Equipment[] = []
  searchedEquipment = false
  term: string = ""
  isReparationInAddress = false
  idEquipmentIsNull = false;
  idRequest: number = 0;
  routeSub!: Subscription;
  showModalCancel = false;
  viewMode = false;
  isAlertOpen= false
  requestStatus = "";
  newStatusRequest = "";
  bottonRedTitle = "ERROR TEXT"
  isBudgedActive = false;
  servicesInRequest : ServicePreview[] = []
  promotions: Promotion[] = []
  totalToPay = 0
  discount = 0
  subTotal = 0
  isAlertConfirmBudget = false
  request!: RequestResponse;
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
        this.resetPage();
      },
    },
  ];

  alertButtonsCancel = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        console.log('Cancelar');
        this.isAlertOpen = false
      },
    },
    {
      text: 'Si',
      role: 'confirm',
      handler: () => {
        console.log('Continuar');
        this.isAlertOpen = false
        this.cancelRequest()
      },
    },
  ];

  buttonsConfirmSaveBudget = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        this.isAlertConfirmBudget = false
        console.log('Cancelar');
      },
    },
    {
      text: 'Si',
      role: 'confirm',
      handler: () => {
        console.log('Continuar');
        this.isAlertConfirmBudget = false
        this.saveBudget()
      },
    },
  ];


  constructor(private equipmentService: EquipmentService,
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private promotionService: PromotionService) {
      addIcons({ removeCircleOutline })
      this.buildForm()
    }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params: Params) => {
        this.idRequest = params['id']
    })

    if(this.idRequest && this.idRequest !== 0){
      this.viewMode = true
      this.getRequestById()
    }else{
      this.viewMode = false
    }
    this.presentingElement = document.querySelector('.ion-page');
  }
  getRequestById() {
    this.requestService.getRequestById(this.idRequest)
      .subscribe((request:RequestResponse)=> {
        console.log(request);
        this.request = request
        this.requestStatus = request.status
        this.requestCategoryId = request.equipmentIdCategory
        this.setTextButtonRed()
        this.form.setValue({
          idEquipmentPreliminary: request.idEquipmentPreliminary,
          description: request.description,
          equipmentSelectedName: request.equipmentName,
          address: request.address,
          equipmentImage: request.equipmentImagen
        })
        if (request.address && request.address !== "") {
          this.isReparationInAddress = true
        }
        this.servicesInRequest = request.services
        this.isBudgedActive = request.status === 'ACCEPTED'
        this.servicesInRequest.forEach((service:ServicePreview)=> {
          service.promotions.forEach((promotion:Promotion)=> {
            this.discount += service.cost * (promotion.discount / 100)
          })
          this.subTotal += service.cost
          this.promotions = [...this.promotions,...service.promotions]
        })
      })
  }


  buildForm() {
    this.form = this.formBuilder.group({
      idEquipmentPreliminary: ['',[Validators.required]],
      description: ['',[Validators.required]],
      equipmentSelectedName: ['',Validators.required],
      address: ['',],
      equipmentImage:['']
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
      this.resetPage()
      this.toastService.presentToast('Solicitud creada exitosamente!',5000,'bottom','success')

    })
  }

  validFieldRequired(field :string): boolean{
    return this.form?.get(field)?.errors?.['required'] && this.form.get(field)?.touched
  }

  generateRequestForm(): RequestFormSave {
    return {
      idEquipmentPreliminary: this.form.value.idEquipmentPreliminary,
      description: this.form.value.description,
      address: !this.form.value.address || this.form.value.address === ""  ? 'En el local' : this.form.value.address,
    }
  }

  setResult(ev:any) {
    if(ev.detail.role === "confirm"){
      const currentUrl = this.router.url;
      this.resetPage()
    }
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  cancelar() {
    this.showModalCancel = true
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  cancelRequest() {
    this.requestService.updateRequestStatus(this.idRequest,this.newStatusRequest).subscribe((resp:boolean)=> {
      console.log(resp);
      this.resetPage()
      this.toastService.presentToast('La solicitud ha sido cancelada!',5000,'bottom')
    })
  }

  isGranted(authorities: string[]): boolean{
    return isGranted(authorities)
  }

  setTextButtonRed(): void {
    if(this.requestStatus === 'PENDING'){
      if (isGranted(['CANCELAR_SOLICITUD'])) {
        this.bottonRedTitle =  "Cancelar la solicitud"
        this.newStatusRequest = 'CANCELLED'
        return
      }else if (isGranted(['RECHAZAR_SOLICITUD'])) {
        this.bottonRedTitle =  "Rechazar la solicitud"
        this.newStatusRequest = 'REJECTED'
        return
      }
    }

    if(this.requestStatus === 'ACCEPTED' || this.requestStatus === 'REVIEWED'){
      if (isGranted(['RECHAZAR_SOLICITUD'])) {
        this.bottonRedTitle =  "Rechazar la solicitud"
        this.newStatusRequest = 'REJECTED'
        return
      }else if (isGranted(['ABORTAR_SOLICITUD'])) {
        this.bottonRedTitle =  "Abortar la solicitud"
        this.newStatusRequest = 'ABORTED'
        return
      }
    }

    if(this.requestStatus === 'RECHECKED'){
      this.bottonRedTitle =  "Abortar la solicitud"
      this.newStatusRequest = 'ABORTED'
      return
    }
    this.bottonRedTitle =  "RENDERING ERROR"
  }

  createBudget(){
    this.isBudgedActive = true
    this.servicesService.getDefaultServices(this.requestCategoryId).subscribe((defaultServices:ServicePreview[]) =>{
      this.servicesInRequest = defaultServices
      this.subTotal = defaultServices.reduce((sum, service) => sum + Number(service.cost), 0);
      console.log(defaultServices);
      const idServicesDefault = defaultServices.map(service=> service.id)
      this.getPromotionsByService(idServicesDefault)
    })
  }

  addServices(servicesToAdd: ServicePreview[]) {
    this.isOpenModalServices = false
    this.servicesInRequest = [...this.servicesInRequest,...servicesToAdd]
    this.subTotal = this.servicesInRequest.reduce((sum, service) => sum + Number(service.cost), 0);
    const idServicesDefault = this.servicesInRequest.map(service=> service.id)
    this.getPromotionsByService(idServicesDefault)

  }

  openModalServices() {
    this.isOpenModalServices = true

  }

  closeModalServices(){
    this.isOpenModalServices = false
  }

  removeService(idService: number) {
   const serviceToRemove = this.servicesInRequest.find((service:ServicePreview)=> service.id == idService)
   const promotionToRemove = this.promotions.find((promotion:Promotion) => promotion.serviceId == idService)
   if (serviceToRemove) {
    this.subTotal -= serviceToRemove.cost
    if (promotionToRemove) {
      this.discount -= serviceToRemove.cost * (promotionToRemove.discount /100)
    }
   }
   this.servicesInRequest = this.servicesInRequest.filter((service:ServicePreview)=> service.id !== idService)
   this.promotions = this.promotions.filter((promotion:Promotion) => promotion.serviceId !== idService)
  }

  getPromotionsByService(serviceIds:number[]){
    this.promotionService.getPromotionsByService(serviceIds).subscribe((promotionResponsePage:PromotionResponsePage)=>{
      this.promotions = promotionResponsePage.content
      this.discount = 0
      this.promotions.forEach((promotion:Promotion)=>{
        const service = this.servicesInRequest.find((service:ServicePreview)=> service.id === promotion.serviceId)
        if (service) {
          this.discount += service.cost * (promotion.discount / 100)
        }
      })
    })
  }

  aproveBudget() {
    if (this.servicesInRequest.length === 0) {
      this.toastService.presentToast('Por favor agregue al menos 1 servicio',5000,'bottom','warning')
      return
    }

    this.isAlertConfirmBudget = true
  }

  saveBudget() {
    const budget = {
      requestId :this.idRequest,
      services: this.servicesInRequest,
      promotions: this.promotions
    }
    console.log("PRESUPUESTO GUARDADO");
    console.log(budget);
    this.requestService.createBudget(budget).subscribe( (response:ResponseApiMessage) => {
      this.toastService.presentToast(response.message,5000,'bottom','success')
      this.resetPage()
    })
  }

  resetPage(){
    this.idRequest = 0
    this.form.reset()
    this.isBudgedActive = false
    this.servicesInRequest = []
    this.promotions = []
    this.subTotal = 0
    this.discount = 0
    this.form.reset()
    this.router.navigate(['/request'],{ replaceUrl: true });
  }

  aceptBudget() {
    console.log("ACEPTAR SOLICITUD");

  }
}
