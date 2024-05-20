import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RequestResponse } from 'src/app/interfaces/requetResponse';

@Component({
  selector: 'app-equipment-card-image',
  templateUrl: './equipment-card-image.component.html',
  styleUrls: ['./equipment-card-image.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class EquipmentCardImageComponent  implements OnInit {

  @Input()image: string = ""
  @Input()name: string = ""
  constructor() { }

  ngOnInit() {}

}
