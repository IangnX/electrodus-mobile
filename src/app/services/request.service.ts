import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestFormSave } from '../interfaces/requestFormSave';
import { Observable } from 'rxjs';
import { RequestResponse } from '../interfaces/requetResponse';
import { RequestPreview } from '../interfaces/requestPreview';
import { RequestPreviewPage } from '../interfaces/RequestPreviewPage';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private URLBACK : string =  environment.URLBACK;
  page:number=-1;

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}` ,
  });
  constructor(private http: HttpClient) { }

  createRequest(request: RequestFormSave): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(this.URLBACK + '/request/save', request, {headers: this.headers});
  }

  getMyRequest(pull:boolean = false): Observable<RequestPreviewPage> {
    if(pull){
      this.page = -1
    }
    this.page ++;
    return this.http.get<RequestPreviewPage>(`${this.URLBACK}/request?p=${this.page}&limit=10s`,{headers: this.headers})
  }

}
