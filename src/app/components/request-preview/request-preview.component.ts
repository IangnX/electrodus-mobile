import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RequestPreview } from 'src/app/interfaces/requestPreview';
import { getRequestStatus, getRequestStatusColor } from 'src/app/utils/requestUtil';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';

@Component({
  selector: 'app-request-preview',
  templateUrl: './request-preview.component.html',
  styleUrls: ['./request-preview.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,RouterModule]
})
export class RequestPreviewComponent  implements OnInit {

  @Input()requestPreview!: RequestPreview

  constructor() {
    addIcons({ chevronForward})
   }

  ngOnInit() {}

  getStatus(status: string): string {
    return getRequestStatus(status)?.toString() ?? 'Error'
  }

  getStatusColor(status:string): string{
    return getRequestStatusColor(status)?.toString() ?? 'danger'
  }

}
