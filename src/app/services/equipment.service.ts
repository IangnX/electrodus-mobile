import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Equipment } from '../interfaces/equipment';
import { TOKEN } from '../const/localStorageConst';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private URLBACK : string =  environment.URLBACK;

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` ,
  });

  constructor(private http: HttpClient) { }

  public getEquipments(): Observable<Equipment[]>{
    return this.http.get<Equipment[]>(`${this.URLBACK}/equipment/all`)
  }

  public getEquipmentsByTerm(term:string,pages:number,limit:number): Observable<Equipment[]>{
    return this.http.get<Equipment[]>(`${this.URLBACK}/equipment?p=${pages}&limit=${limit}&term=${term}`)
  }
}
