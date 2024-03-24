import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { token } from './token';
import { Observable } from 'rxjs';
import { Cities, States } from '../interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'authorization': token
  });

  constructor(private http: HttpClient) { }

  getStates(): Observable<States[]>{
    return this.http.get<States[]>(`https://www.universal-tutorial.com/api/states/Venezuela`,{headers: this.headers})
  }

  getCities(state: string): Observable<Cities[]>{
    return this.http.get<Cities[]>(`https://www.universal-tutorial.com/api/cities/${state}`,{headers: this.headers})

  }
}
