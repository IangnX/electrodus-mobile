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
    'Access-Control-Allow-Origin': '*'
  });

  constructor(private http: HttpClient) { }

  public getEquipments(): Observable<Equipment[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` ,
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.get<Equipment[]>(`${this.URLBACK}/equipment/all`,{headers})
  }

  public getEquipmentsByTerm(term:string,pages:number,limit:number): Observable<Equipment[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` ,
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.get<Equipment[]>(`${this.URLBACK}/equipment?p=${pages}&limit=${limit}&term=${term}`,{headers})
  }
}
