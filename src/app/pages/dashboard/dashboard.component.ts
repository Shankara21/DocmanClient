import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CookieService } from "ngx-cookie-service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private elementRef: ElementRef, private ControlService: ControlService, private router: Router, private cookieService: CookieService) { }

  isp: any;
  wi: any;
  form: any;

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

  username: any;
  email: any;
  fullnameData: any;
  userLevel:any
  ngOnInit(): void {

    if (localStorage.getItem('refreshToken') == null) {
      this.router.navigate(['/login']);
    }
    this.ControlService.selectExp().subscribe((res: any) => {

      this.data = res;
      this.title = res[0].title;
      this.category = res[0].Category.name;
      this.fullname = res[0].User.fullname;
      this.expDate = res[0].expDate;
      this.noDoc = res[0].noDoc;

      // perbedaan antara tanggal sekarang dan tanggal expired
      this.diffDate = Math.floor((Date.parse(this.expDate) - Date.now()) / 86400000);
    });

    const token = this.cookieService.get('refreshToken');
    // mengecek apakah ada yang login
    this.ControlService.refreshToken(token).subscribe((res: any) => {
      console.log(res);
      this.decoded = jwt_decode(res.accessToken);
      console.log('HASIL DECODED');

      console.log(this.decoded);
      this.username = this.decoded.username;
      this.email = this.decoded.email;
      this.fullnameData = this.decoded.fullname;
      this.userLevel = this.decoded.userLevel;
    });

    this.ControlService.countDocument().subscribe((res: any) => {
      this.isp = res.isp;
      this.wi = res.wi;
      this.form = res.form;
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
