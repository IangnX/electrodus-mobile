import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RefresherEventDetail } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; // Import this
import { eyeOutline, heart, trashBinOutline } from 'ionicons/icons';
import { RequestPreview } from 'src/app/interfaces/requestPreview';
import { RequestService } from 'src/app/services/request.service';
import { getRequestStatus, getRequestStatusColor } from 'src/app/utils/requestUtil';
import { IonRefresherCustomEvent } from '@ionic/core';
import { RequestPreviewPage } from 'src/app/interfaces/RequestPreviewPage';
import { catchError, finalize } from 'rxjs';
import { RequestPreviewComponent } from 'src/app/components/request-preview/request-preview.component';
import { Navigation, Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RequestPreviewComponent,RouterModule]
})
export class RequestPage implements OnInit {

  enableInfiniteScroll = true
  requestPreviewList: RequestPreview[] = []
  isLoading = true;
  error = null;
  currentPage: number =0

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
      this.currentPage = 0
    }

    this.requestService.getMyRequest(this.currentPage,pull)
    .pipe(
      finalize(() => {
        this.isLoading = false;
      }),
      catchError((err: any) => {
        this.error = err.error.message;
        return [];
      })
    )
    .subscribe((requestPreviewPage:RequestPreviewPage)=> {
      this.requestPreviewList.push( ...requestPreviewPage.content )
      if (!requestPreviewPage.last) {
        this.currentPage++
      }
      if(event){
        event.target.complete();
        if(requestPreviewPage.content.length === 0 ){
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
