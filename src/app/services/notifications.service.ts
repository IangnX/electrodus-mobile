import { Injectable, inject } from '@angular/core';
import {CancelOptions, Channel, LocalNotifications, ScheduleOptions} from '@capacitor/local-notifications'
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { NotificationPush } from '../interfaces/notificationPush';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TOKEN } from '../const/localStorageConst';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationPage } from '../interfaces/notificationPage';
import { ResponseApiMessage } from '../interfaces/responseApiMessage';
import { isGranted } from '../utils/securityUtils';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private URLBACK : string =  environment.URLBACK;
  private router = inject(Router)


  constructor(private http: HttpClient) { }

  unregister(){
    PushNotifications.unregister()
    console.log("Unregister");
    this.deleteTokenFirebase().subscribe(data => console.log(data))
  }

  initListeners(){
    PushNotifications.requestPermissions().then((result:any) => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    //Obtener token del usuario
    PushNotifications.addListener('registration',
    (token: Token) => {
      console.log("NUEVO TOKEN");
      console.log(token);


      localStorage.setItem('firebase-token',token.value)
      this.saveToken(token.value).subscribe(resp => console.log(resp)
      )
    }
  );

  // Some issue with our setup and push will not work
  PushNotifications.addListener('registrationError',
    (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    }
  );

  // Show us the notification payload if the app is open on our device
  PushNotifications.addListener('pushNotificationReceived',
    (notification: PushNotificationSchema) => {
      console.log("Notificacion recibida en primer plano");

      const notificationPush = JSON.parse(JSON.stringify(notification)) as NotificationPush;
      let options: ScheduleOptions = {
        notifications:[
          {
            id: 222,
            title: notificationPush.data.notificationType,
            body: notificationPush.data.body,
            largeBody: notificationPush.data.largeBody,
          }
        ]
     }
     this.displayNotification(options)
    }
  );

  // Method called when tapping on a notification
  PushNotifications.addListener('pushNotificationActionPerformed',
    (notification: ActionPerformed) => {
      console.log("Notificacion recibida en segundo plano");
      //alert(notification.notification.data.destinationUserId)
      //alert('Push action performed: ' + JSON.stringify(notification));
      this.router.navigate([notification.notification.data.redirectTo],{ replaceUrl: true })

    }
  );
  }

  async displayNotification(options:ScheduleOptions) {
    try{
      await LocalNotifications.schedule(options)
     }catch(ex){
      alert(JSON.stringify(ex))
     }
    }

    async cancelNotification(){
      let options: CancelOptions = {
        notifications: [{id:111}]
      }
      await LocalNotifications.cancel(options)
    }

    async removeAllDeliveredNotifications(){
      await LocalNotifications.removeAllDeliveredNotifications()
    }

    async getAllDeliveredNotifications(){
      LocalNotifications.getDeliveredNotifications().then((res:any) =>{
        alert(JSON.stringify(res))
      })
    }

    async createChannel(){
      let channel1: Channel = {
        id: "channel1",
        description: "first channel",
        name: "Channel 1",
        visibility: 1
      }

      let channel2: Channel = {
        id: "channel2",
        description: "second channel",
        name: "Channel 2",
        visibility: 1
      }

      try{
        await LocalNotifications.createChannel(channel1)
        await LocalNotifications.createChannel(channel2)
      }catch(ex){
        alert(ex)
      }
    }

    saveToken(token: string): Observable<boolean> {
      const tokenDTO = {
        "token": token
      }
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` ,
        'Access-Control-Allow-Origin': '*'
      });
      return this.http.post<boolean>(this.URLBACK + '/notifications/save-token-notification', tokenDTO, {headers: headers});
    }

    getAllNotificationRequest(pageNumber:number): Observable<NotificationPage>{
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` ,
        'Access-Control-Allow-Origin': '*'
      });
      return this.http.get<NotificationPage>(`${this.URLBACK}/notifications/all-notifications-request?p=${pageNumber}&limit=10`,{headers})
    }

    markAsRead(notificationId:number): Observable<ResponseApiMessage>{
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` ,
        'Access-Control-Allow-Origin': '*'
      });
      return this.http.put<ResponseApiMessage>(`${this.URLBACK}/notifications/mark-as-read/${notificationId}`,{},{headers})
    }

    deleteTokenFirebase():Observable<any>{
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` ,
        'Access-Control-Allow-Origin': '*'
      });
      return this.http.delete<any>(`${this.URLBACK}/notifications/delete`,{headers})
    }
}
