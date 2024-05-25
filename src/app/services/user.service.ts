import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseApiMessage } from '../interfaces/responseApiMessage';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserUpdate } from '../interfaces/userUpdate';
import { TOKEN } from '../const/localStorageConst';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URLBACK : string =  environment.URLBACK;

  constructor(private http: HttpClient) { }

  update(id: number,user:UserUpdate):Observable<ResponseApiMessage>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` ,
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.put<ResponseApiMessage>(this.URLBACK + `/users/${id}`,user,{headers})
  }

  updateImageProfile(formdata: FormData):Observable<ResponseApiMessage>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` ,
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post<ResponseApiMessage>(this.URLBACK + `/users/profile/pic`,formdata,{headers})
  }

  findByAuthority(authority:string):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` ,
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.get<any>(this.URLBACK + `/users/by-authority?authority=${authority}&page=0&size=1000&sort=asc`,{headers})
  }

}
