import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TOKEN } from '../const/localStorageConst';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicePreview, ServicePreviewPage } from '../interfaces/servicePreview';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private URLBACK : string =  environment.URLBACK;

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` ,
  });
  constructor(private http: HttpClient) { }

  getDefaultServices(categoryId:number): Observable<ServicePreview[]>{
    return this.http.get<ServicePreview[]>(`${this.URLBACK}/service/default/${categoryId}?p=${0}&limit=${100}`)
  }

  getServicesByCriteria(categoryId:number, term?:string):Observable<ServicePreviewPage>{
    return this.http.get<ServicePreviewPage>(`${this.URLBACK}/service/all?p=${0}&limit=${100}&categoryId=${categoryId}&term=${term}`)
  }
}
