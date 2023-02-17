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

  // Category
  getCategory() {
    return this.HttpClient.get(this.port3000 + 'categories')
      .pipe(catchError(this.errorHttpHandler))
  }
  getByName(params: any) {
    return this.HttpClient.get(this.port3000 + `categories/${params}`)
      .pipe(catchError(this.errorHttpHandler))
  }

  // Document
  getDocument(params: any) {
    // alert(params);
    return this.HttpClient.get(this.port3000 + `documents/${params}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  createDocument(params: any) {
    return this.HttpClient.post(this.port3000 + 'documents', params)
      .pipe(catchError(this.errorHttpHandler))
  }

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
