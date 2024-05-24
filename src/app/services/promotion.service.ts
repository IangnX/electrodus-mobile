import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TOKEN } from '../const/localStorageConst';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PromotionResponsePage } from '../interfaces/promotionResponsePage';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private URLBACK : string =  environment.URLBACK;


  constructor(private http: HttpClient) { }

  getPromotionsByService(serviceIds:number[]):Observable<PromotionResponsePage> {
    const request ={
      ids : serviceIds
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` ,
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post<PromotionResponsePage>(this.URLBACK + '/promotion/by-service-in', request, {headers: headers});
  }


}
