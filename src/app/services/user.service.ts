import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseApiMessage } from '../interfaces/responseApiMessage';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserUpdate } from '../interfaces/userUpdate';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URLBACK : string =  environment.URLBACK;

  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.coockieService.get('token')}` ,
  });

  constructor(private http: HttpClient,
    private coockieService: CookieService) { }

  update(id: number,user:UserUpdate):Observable<ResponseApiMessage>{
    return this.http.put<ResponseApiMessage>(this.URLBACK + `/users/${id}`,user,{headers: this.headers})
  }

  updateImageProfile(formdata: FormData):Observable<ResponseApiMessage>{
    return this.http.post<ResponseApiMessage>(this.URLBACK + `/users/profile/pic`,formdata,{headers: this.headers})
  }

}
