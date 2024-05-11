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
import { catchError, finalize } from 'rxjs';
import { RequestPreviewComponent } from 'src/app/components/request-preview/request-preview.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CreateRequestComponent,RequestPreviewComponent,RouterModule]
})
export class RequestPage implements OnInit {

  enableInfiniteScroll = true
  requestPreviewList: RequestPreview[] = []
  isLoading = true;
  error = null;

  constructor(private requestService: RequestService) {
    addIcons({ trashBinOutline, eyeOutline})
  }

  ngOnInit() {
    this.getRequestList();
  }


  updateRequestList(request: boolean) {
    this.getRequestList()
  }

  getRequestList(event?: any,pull:boolean  = false): void {

    this.error = null;

    // Only show loading indicator on initial load
    if (!event || pull) {
      this.isLoading = true;
    }

    this.requestService.getMyRequest(pull)
    .pipe(
      finalize(() => {
        this.isLoading = false;
      }),
      catchError((err: any) => {
        this.error = err.error.message;
        return [];
      })
    )
    .subscribe((RequestPreviewPage:RequestPreviewPage)=> {
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
