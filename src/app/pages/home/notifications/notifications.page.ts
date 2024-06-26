import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { getRequestStatus, getRequestStatusColor } from 'src/app/utils/requestUtil';
import { addIcons } from 'ionicons';
import { mailOpenOutline, mailUnreadOutline } from 'ionicons/icons';
import { NotificationsService } from 'src/app/services/notifications.service';
import { isGranted } from 'src/app/utils/securityUtils';
import { NotificationPage } from 'src/app/interfaces/notificationPage';
import { Notification as AppNotification } from 'src/app/interfaces/notificationPage';
import { catchError, finalize } from 'rxjs';
import { IonInfiniteScrollCustomEvent, IonRefresherCustomEvent, RefresherEventDetail } from '@ionic/core';
import { Router } from '@angular/router';
import { ResponseApiMessage } from 'src/app/interfaces/responseApiMessage';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NotificationsPage implements OnInit {

  private router = inject(Router)
  isLoading = false
  error = null;
  notifications: AppNotification[] = []
  enableInfiniteScroll = true
  currentPage = 0;
  constructor(private notificationService: NotificationsService) {
    addIcons({ mailUnreadOutline, mailOpenOutline})
   }

  ngOnInit() {
    this.getNotifications()
  }

  getStatus(status: string): string {
    return getRequestStatus(status)?.toString() ?? 'Error'
  }

  getStatusColor(status:string): string{
    return getRequestStatusColor(status)?.toString() ?? 'danger'
  }

  getNotifications(event?: any,pull:boolean  = false) {


    this.error = null;

    // Only show loading indicator on initial load
    if (!event || pull) {
      this.isLoading = true;
      this.currentPage = 0
    }else{
      this.currentPage ++
    }
    this.notificationService.getAllNotificationRequest(this.currentPage)
    .pipe(
      finalize(() => {
        this.isLoading = false;
      }),
      catchError((err: any) => {
        this.error = err.error.message;
        return [];
      })
    )
    .subscribe((resp:NotificationPage) => {
      console.log(resp);
      this.notifications.push(...resp.content)
      if (!resp.last) {
        this.currentPage++
      }
      if(event){
        event.target.complete();
        if(resp.content.length === 0 ){
          this.enableInfiniteScroll = false;
        }
      }
    })

  }

  reload(event: IonRefresherCustomEvent<RefresherEventDetail>) {
    this.getNotifications(event,true);
    this.enableInfiniteScroll = true;
    this.notifications = [];
  }

  redirectTo(requestId:number,notificationId:number) {
    this.router.navigate([`/request-form/${requestId}`,{fromNotification:true}],{ replaceUrl: true })
    this.notificationService.markAsRead(notificationId).subscribe((resp:ResponseApiMessage)=>console.log(resp))
  }

}
