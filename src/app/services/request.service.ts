import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestFormSave } from '../interfaces/requestFormSave';
import { Observable } from 'rxjs';
import { RequestResponse } from '../interfaces/requetResponse';
import { RequestPreview } from '../interfaces/requestPreview';
import { RequestPreviewPage } from '../interfaces/RequestPreviewPage';
import { TOKEN } from '../const/localStorageConst';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private URLBACK : string =  environment.URLBACK;
  page:number=-1;

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` ,
  });
  constructor(private http: HttpClient) { }

  createRequest(request: RequestFormSave): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(this.URLBACK + '/request/save', request, {headers: this.headers});
  }

  getMyRequest(pageNumber: number): Observable<RequestPreviewPage> {
    return this.http.get<RequestPreviewPage>(`${this.URLBACK}/request/allRequest?p=${pageNumber}&limit=10`,{headers: this.headers})
  }

  getRequestById(requestId:number) : Observable<RequestResponse>{
    return this.http.get<RequestResponse>(`${this.URLBACK}/request/${requestId}`,{headers: this.headers})
  }

  updateRequestStatus(requestId:number,status:string): Observable<boolean>{
    return this.http.put<boolean>(`${this.URLBACK}/request/${requestId}/${status}`,null,{headers: this.headers})
  }

}
