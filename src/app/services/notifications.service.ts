import { Injectable } from '@angular/core';
import {CancelOptions, Channel, LocalNotifications, ScheduleOptions} from '@capacitor/local-notifications'


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  async displayNotification() {
    this.createChannel()
     let options: ScheduleOptions = {
        notifications:[
          {
            id:111,
            title: "TEST LOCAL NOTIFICATIONS",
            body: "primera prueba desde ionic",
            largeBody: "xDDDDDDDDDDDD",
            summaryText: "SUMMARY TEXT",
            channelId: "channel1"
          },
          {
            id:222,
            title: "Notificacion electrodus",
            body: "Nueva notificación",
            largeBody: "Nueva solicitud de presupuesto",
            summaryText: "Responda esclavo",
            channelId: "channel2"
          }
        ]
     }

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
}
