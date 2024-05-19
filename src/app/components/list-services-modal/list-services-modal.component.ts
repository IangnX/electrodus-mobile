import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServicePreview, ServicePreviewPage } from 'src/app/interfaces/servicePreview';
import { ServicesService } from 'src/app/services/services.service';
import { ChargeServiceFormComponent } from '../charge-service-form/charge-service-form.component';

@Component({
  selector: 'app-list-services-modal',
  templateUrl: './list-services-modal.component.html',
  styleUrls: ['./list-services-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ChargeServiceFormComponent]
})
export class ListsServicesModalComponent  implements OnInit {


  @Input() servicesChecked: ServicePreview[] = []
  @Input() requestCategoryId: number = 0
  @Output() servicesSelectedCompleted:  EventEmitter<ServicePreview[]> = new EventEmitter<ServicePreview[]>();
  temporalServices: ServicePreview[] = []
  servicesToIncludeInRequest : ServicePreview[] = []
  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
    this.servicesService.getServicesByCriteria(this.requestCategoryId, "").subscribe((servicesPage:ServicePreviewPage)=>{
      this.servicesToIncludeInRequest = servicesPage.content;
    })
  }

  updateServicesList(event: any) {
    if (event.checked) {
      this.temporalServices.push(event.service)
    }else{
      this.temporalServices = [...this.temporalServices.filter((serviceTemp:ServicePreview) => serviceTemp !== event.service)]
    }
    console.log(this.temporalServices);
  }

  addServices() {
    this.servicesSelectedCompleted.emit(this.temporalServices)
  }

}
