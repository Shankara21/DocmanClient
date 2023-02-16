import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  // Base url
  private port3000 = 'http://localhost:3000/';

  constructor(private HttpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  //////////////////////
  //?/ Http Methods ///
  ////////////////////



  //////////////////////
  //!/ Http Methods ///
  ////////////////////


  
  // Error handling
  errorHttpHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error ${error.error.message}`
    }
    else {
      errorMessage = `Error code : ${error.status}\n${error.message}`
    }
    return throwError(errorMessage)
  }
}
