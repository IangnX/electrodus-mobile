import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { token } from './token';
import { Observable } from 'rxjs';
import { Cities, States } from '../interfaces/address';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });


  private URLBACK : string =  environment.URLBACK;

  constructor(private http: HttpClient) { }

  getStates(): Observable<States[]>{
    return this.http.get<States[]>(`${this.URLBACK}/states/all`,{headers: this.headers})
  }

  getCities(stateId: number): Observable<Cities[]>{
    return this.http.get<Cities[]>(`${this.URLBACK}/states/cities/${stateId}`,{headers: this.headers})

  }
}
