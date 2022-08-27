import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Order } from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }


  private _url="https://localhost:7254/api/Order/";


  InsertOrder(order:Order):Observable<any>{
    return this.http.post(this._url + "InsertOrder",order).pipe(catchError((err) => {
      return throwError(() => err.message || 'Internal Server Error');
    })
    );
  }


}
