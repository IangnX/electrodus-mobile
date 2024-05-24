import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { token } from './token';
import { Observable } from 'rxjs';
import { Cities, States } from '../interfaces/address';
import { environment } from 'src/environments/environment';
import { TOKEN } from '../const/localStorageConst';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  private URLBACK : string =  environment.URLBACK;

  constructor(private http: HttpClient) { }

  getStates(): Observable<States[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` ,
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.get<States[]>(`${this.URLBACK}/states/all`,{headers: headers})
  }

  getCities(stateId: number): Observable<Cities[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` ,
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.get<Cities[]>(`${this.URLBACK}/states/cities/${stateId}`,{headers: headers})

  }
}
