import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActionSheetController, IonInfiniteScroll, IonInfiniteScrollContent, RefresherEventDetail } from '@ionic/angular/standalone';
import { CreateRequestComponent } from './create-request/create-request.component';
import { addIcons } from 'ionicons'; // Import this
import { eyeOutline, heart, trashBinOutline } from 'ionicons/icons';
import { RequestPreview } from 'src/app/interfaces/requestPreview';
import { RequestService } from 'src/app/services/request.service';
import { getRequestStatus, getRequestStatusColor } from 'src/app/utils/requestUtil';
import { IonRefresherCustomEvent } from '@ionic/core';
import { RequestPreviewPage } from 'src/app/interfaces/RequestPreviewPage';


@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CreateRequestComponent]
})
export class RequestPage implements OnInit {



  enableInfiniteScroll = true
  presentingElement: Element | null = null;

  requestPreviewList: RequestPreview[] = []
  private canDismissOverride = false;

  constructor(private actionSheetCtrl: ActionSheetController,
    private requestService: RequestService) {
    addIcons({ trashBinOutline, eyeOutline})
  }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.getRequestList();
  }

  onDismissChange(canDismiss: boolean) {
    // Allows the modal to be dismissed based on the state of the checkbox
    this.canDismissOverride = canDismiss;
  }

  onWillPresent() {
    // Resets the override when the modal is presented
    this.canDismissOverride = false;
  }

  canDismiss = async (value:any) => {
    if (this.canDismissOverride) {
      // Checks for the override flag to return early if we can dismiss the overlay immediately
      return true;
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: '¿Seguro que desea salir?',
      buttons: [
        {
          text: 'Si',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };

  updateRequestList(request: boolean) {
    this.getRequestList()
  }

  getRequestList(event?: any,pull:boolean  = false): void {
    this.requestService.getMyRequest(pull).subscribe((RequestPreviewPage:RequestPreviewPage)=> {
      console.log(RequestPreviewPage)

      this.requestPreviewList.push( ...RequestPreviewPage.content )
      if(event){
        event.target.complete();
        if(RequestPreviewPage.content.length === 0 ){
          this.enableInfiniteScroll = false;
        }
      }
    })
  }

  getStatus(status: string): string {
    return getRequestStatus(status)?.toString() ?? 'Error'
  }

  getStatusColor(status:string): string{
    return getRequestStatusColor(status)?.toString() ?? 'danger'
  }

  reload(event: IonRefresherCustomEvent<RefresherEventDetail>) {
    this.getRequestList(event,true);
    this.enableInfiniteScroll = true;
    this.requestPreviewList = [];
  }


}
