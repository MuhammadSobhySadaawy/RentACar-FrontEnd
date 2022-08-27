import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Model } from '../model/Model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  constructor(private http: HttpClient) { }


  private _url="https://localhost:7254/api/Model/";


  GetAllModelsByIDBrand(id:number):Observable<Model[]>{
    return this.http.get<Model[]>(this._url + "GetAllModelsByIDBrand/"+id).pipe(catchError((err) => {
      return throwError(() => err.message || 'Internal Server Error');
    })
    );
  }
}
