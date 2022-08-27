import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Brand } from '../model/Brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private http: HttpClient) { }


  private _url="https://localhost:7254/api/Brand/";



  GetAllBrands():Observable<Brand[]>{
    return this.http.get<Brand[]>(this._url + "GetAllBrands").pipe(catchError((err) => {
      return throwError(() => err.message || 'Internal Server Error');
    })
    );
  }

}
