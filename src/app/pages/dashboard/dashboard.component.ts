import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CookieService } from "ngx-cookie-service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private elementRef: ElementRef, public ControlService: ControlService, private router: Router, private cookieService: CookieService) { }

  isp: any;
  wi: any;
  form: any;
  others: any;
  halal: any;

  test: any;

  // notif
  data: any;
  title: any;
  category: any;
  fullname: any;
  expDate: any;
  noDoc: any;
  diffDate: any;

  isShow = true;

  // bismillah
  result: any;
  decoded: any;

  id: any
  // username: any;
  // email: any;
  // fullnameData: any;
  // userLevel: any

  select!: FormGroup

  refreshToken!: FormGroup;


  userFound: any;
  dataDocument: any[] = [];
  ngOnInit(): void {

    // Logout otomatis dalam 1 menit
    // setInterval(() => {
    //   this.cookieService.delete('docmanToken');
    // }, 60000);

    const token = this.cookieService.get('docmanToken');

    if (!this.cookieService.get('docmanToken')) {
      this.router.navigate(['/login']);
    }

    this.refreshToken = new FormGroup({
      refreshToken: new FormControl(token)
    })

    // mengecek apakah ada yang login
    this.ControlService.refreshToken(this.refreshToken.value).subscribe((res: any) => {
      this.decoded = jwt_decode(res.accessToken);
      this.ControlService.username = this.decoded.username;
      this.ControlService.email = this.decoded.email;
      this.ControlService.fullname = this.decoded.fullname;
      this.ControlService.userLevel = this.decoded.userLevel;
      this.ControlService.id = this.decoded.id;
      this.id = this.decoded.id;


      this.ControlService.data = {
        username: this.decoded.username,
        email: this.decoded.email,
        fullname: this.decoded.fullname,
        userLevel: this.decoded.userLevel
      }

      this.select = new FormGroup({
        userId: new FormControl(this.id)
      })

      // TODO REVISI
      this.ControlService.selectExp(this.select.value).subscribe((res: any) => {
        this.userFound = res.userFound.fullname
        this.dataDocument = res.exp;

        for (let i = 0; i < this.dataDocument.length; i++) {
          this.dataDocument[i].diffDate = Math.floor((Date.parse(this.dataDocument[i].expDate) - Date.now()) / 86400000);
        }
      });

    });
    this.ControlService.countDocument().subscribe((res: any) => {
      this.isp = res.isp;
      this.wi = res.wi;
      this.form = res.form;
      this.others = res.others;
      this.halal = res.halal;
    });




    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);


  }
  show() {
    this.isShow = !this.isShow;
  }

}
