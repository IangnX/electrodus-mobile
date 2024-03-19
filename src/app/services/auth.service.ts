import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserSave } from '../interfaces/userSave';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URLBACK : string =  environment.URLBACK;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(private http: HttpClient) { }

  saveUser(user:UserSave):Observable<any>{
    return this.http.post<any>(this.URLBACK + '/users',user,{headers: this.headers})
  }
}
