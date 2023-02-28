import { CookieService } from 'ngx-cookie-service';
import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css']
})
export class IndexUserComponent implements OnInit {

  constructor(public ControlService: ControlService, private cookieService: CookieService, private router: Router, private route: ActivatedRoute) { }
  data: any[] = [];
  term: any
  p: number = 1;
  itemsPerPage: number = 15;
  totalProduct: any;
  refreshToken: any;
  decoded: any;
  id: any;
  routee: string = this.router.url.substring(1);
  request: any;
  ngOnInit(): void {
    this.ControlService.getUser().subscribe((res: any) => {
      this.data = res;
    })

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
      if (this.routee == "users" && this.ControlService.userLevel == "User") {
        this.router.navigate(['/forbidden']);
      }
    });
    if (this.ControlService.userLevel == "User") {
      this.router.navigate(['/']);
    }
  }
  delete(id: any) {

  }

}
