import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Equipment } from '../interfaces/equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private URLBACK : string =  environment.URLBACK;

  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.coockieService.get('token')}` ,
  });

  constructor(private http: HttpClient,
    private coockieService: CookieService) { }

  public getEquipments(): Observable<Equipment[]>{
    return this.http.get<Equipment[]>(`${this.URLBACK}/equipment/all`)
  }
}
