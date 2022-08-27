import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ImagesCar } from '../model/ImagesCar';

@Injectable({
  providedIn: 'root'
})
export class CarImagesService {

  constructor(private http: HttpClient) { }


  private _url="https://localhost:7254/api/CarImags/";


  getCarImags(id:number):Observable<ImagesCar[]>{
    return this.http.get<ImagesCar[]>(this._url + "GetAllImagesCarById/"+id).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'Internal Server Error');
    })
    );
  }
}
