import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseApiMessage } from '../interfaces/responseApiMessage';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserUpdate } from '../interfaces/userUpdate';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URLBACK : string =  environment.URLBACK;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(private http: HttpClient) { }

  update(id: number,user:UserUpdate):Observable<ResponseApiMessage>{
    return this.http.put<ResponseApiMessage>(this.URLBACK + `/users/${id}`,user,{headers: this.headers})
  }
}
