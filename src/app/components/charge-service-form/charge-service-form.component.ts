import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { ServicePreview } from 'src/app/interfaces/servicePreview';

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
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  removeService(idService:number){
    this.serviceRemoveEmit.emit(idService)
  }

}
