import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestFormSave } from '../interfaces/requestFormSave';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private URLBACK : string =  environment.URLBACK;

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}` ,
  });
  constructor(private http: HttpClient) { }

  createRequest(request: RequestFormSave): Observable<any> {
    return this.http.post<any>(this.URLBACK + '/request/save', request, {headers: this.headers});
  }

}
