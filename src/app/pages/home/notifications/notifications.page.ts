import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { getRequestStatus, getRequestStatusColor } from 'src/app/utils/requestUtil';
import { addIcons } from 'ionicons';
import { mailOpenOutline, mailUnreadOutline } from 'ionicons/icons';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NotificationsPage implements OnInit {
  isLoading = false
  error = null;

  constructor() {
    addIcons({ mailUnreadOutline, mailOpenOutline})
   }

  ngOnInit() {
  }

  getStatus(status: string): string {
    return getRequestStatus(status)?.toString() ?? 'Error'
  }

  getStatusColor(status:string): string{
    return getRequestStatusColor(status)?.toString() ?? 'danger'
  }

}
