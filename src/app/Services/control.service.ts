import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, Subject, throwError } from 'rxjs';

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

  // private node: Subject<Node> = new BehaviorSubject<Node>([]);
  public id: any;
  public username: any;
  public fullname: any;
  public email: any;
  public userLevel: any;

  public data: any;


  //////////////////////
  //?/ Http Methods ///
  ////////////////////

  // Category
  getCategory() {
    return this.HttpClient.get(this.port3000 + 'categories')
      .pipe(catchError(this.errorHttpHandler))
  }
  getByName(params: any) {
    return this.HttpClient.get(this.port3000 + `categories/filterName/${params}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  getById(params: any) {
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
  countDocument() {
    return this.HttpClient.get(this.port3000 + 'documents/count/document')
      .pipe(catchError(this.errorHttpHandler))
  }
  selectExp(params:any) {
    return this.HttpClient.post(this.port3000 + 'documents/selectExp', params)
      .pipe(catchError(this.errorHttpHandler))
  }

  // Auth
  login(params: any) {
    return this.HttpClient.post(this.port3000 + 'users/login', params)
  }
  register(params: any) {
    return this.HttpClient.post(this.port3000 + 'users/register', params)
  }
  // make async function
  // async register(params: any) {
  //   try {
  //     await this.HttpClient.post(this.port3000 + 'users/register', params)
  //   } catch (error) {

  //   }
  // }
  logout(params: any) {
    return this.HttpClient.delete(this.port3000 + `users/logout/${params}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  refreshToken(params: any) {
    return this.HttpClient.get(this.port3000 + `users/refreshToken/${params}`)
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
