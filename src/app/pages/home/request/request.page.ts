import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular/standalone';
import { CreateRequestComponent } from './create-request/create-request.component';
import { addIcons } from 'ionicons'; // Import this
import { eyeOutline, heart, trashBinOutline } from 'ionicons/icons';
import { RequestPreview } from 'src/app/interfaces/requestPreview';


@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CreateRequestComponent]
})
export class RequestPage implements OnInit {

  presentingElement: Element | null = null;

  private canDismissOverride = false;

  constructor(private actionSheetCtrl: ActionSheetController) {
    addIcons({ trashBinOutline, eyeOutline})
   }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
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

  updateRequestList(request: RequestPreview) {
    console.log(request);

  }

}
