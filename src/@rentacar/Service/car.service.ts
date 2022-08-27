import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Brand } from '../model/Brand';
import { Car } from '../model/Car';
import { Model } from '../model/Model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }


  private _url="https://localhost:7254/api/Car/";

  GetAllCars():Observable<Car[]>{
    return this.http.get<Car[]>(this._url + "GetAllCars").pipe(catchError((err) => {
      return throwError(() => err.message || 'Internal Server Error');
    })
    );
  }

  getAllCarsByIdModel(id:number):Observable<Car[]>{
    return this.http.get<Car[]>(this._url + "getAllCarsByIdModel/"+id).pipe(catchError((err) => {
      return throwError(() => err.message || 'Internal Server Error');
    })
    );
}


getAllCarsByIdBrand(id:number):Observable<Car[]>{
  return this.http.get<Car[]>(this._url + "getAllCarsByIdBrand/"+id).pipe(catchError((err) => {
    return throwError(() => err.message || 'Internal Server Error');
  })
  );
}






}
