import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  // Base url
  private port3000 = 'http://localhost:3000/';
  private port3124 = 'http://192.168.9.47/'

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

  public path: any;

  public data: any;


  //////////////////////
  //?/ Http Methods ///
  ////////////////////

  // Category
  getCategory() {
    return this.HttpClient.get(this.port3124 + 'categories')
      .pipe(catchError(this.errorHttpHandler))
  }
  getByName(params: any) {
    return this.HttpClient.get(this.port3124 + `categories/filterName/${params}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  getById(params: any) {
    return this.HttpClient.get(this.port3124 + `categories/${params}`)
      .pipe(catchError(this.errorHttpHandler))
  }

  // Document
  getDocument(params: any) {
    // alert(params);
    return this.HttpClient.get(this.port3124 + `documents/${params}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  createDocument(params: any) {
    return this.HttpClient.post(this.port3124 + 'documents', params)
      .pipe(catchError(this.errorHttpHandler))
  }
  countDocument() {
    return this.HttpClient.get(this.port3124 + 'documents/count/document')
      .pipe(catchError(this.errorHttpHandler))
  }
  selectExp(params: any) {
    return this.HttpClient.post(this.port3124 + 'documents/selectExp', params)
      .pipe(catchError(this.errorHttpHandler))
  }
  showDocument(params: any) {
    return this.HttpClient.get(this.port3124 + `documents/show/${params}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  deleteDocument(id: any) {
    return this.HttpClient.delete(this.port3124 + `documents/${id}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  updateDocument(id: any, params: any) {
    return this.HttpClient.put(this.port3124 + `documents/${id}`, params)
      .pipe(catchError(this.errorHttpHandler))
  }

  // Auth
  login(params: any) {
    return this.HttpClient.post(this.port3124 + 'users/login', params)
  }
  register(params: any) {
    return this.HttpClient.post(this.port3124 + 'users/register', params)
  }
  logout(params: any) {
    return this.HttpClient.delete(this.port3124 + `users/logout/${params}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  refreshToken(params: any) {
    return this.HttpClient.post(this.port3124 + `users/refreshToken`, params)
      .pipe(catchError(this.errorHttpHandler))
  }

  // User
  getUser() {
    return this.HttpClient.get(this.port3124 + 'users')
      .pipe(catchError(this.errorHttpHandler))
  }
  findUser(id: any) {
    return this.HttpClient.get(this.port3124 + `users/${id}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  deleteUser(id: any) {
    return this.HttpClient.delete(this.port3124 + `users/${id}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  updateUser(id: any, params: any) {
    return this.HttpClient.put(this.port3124 + `users/${id}`, params)
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
