import { CookieService } from 'ngx-cookie-service';
import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-index-document',
  templateUrl: './index-document.component.html',
  styleUrls: ['./index-document.component.css']
})
export class IndexDocumentComponent implements OnInit {

  constructor(private router: Router, private ControlService: ControlService, private cookieService: CookieService) { }



  data: any[] = [];
  category: any[] = [];
  idCategory: any;

  // pagination
  p: number = 1;
  itemsPerPage: number = 15;
  totalProduct: any;

  // search
  term: any;

  // array of year
  years: any[] = [];
  startYear: any;

  filterYear!: FormGroup;
  categoryId: number = 0;

  refreshToken: any;
  decoded: any;
  id: any;
  name: string = this.router.url.substring(1);
  ngOnInit(): void {
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
    });
    this.ControlService.getByName(this.name).subscribe((res: any) => {
      this.category = res;
      this.idCategory = this.category[0].id;
      this.ControlService.getDocument(this.idCategory).subscribe((res: any) => {
        this.data = res;
      })
    })

    if (this.ControlService.userLevel == "User" && this.name == "wi" || this.ControlService.userLevel == "User" && this.name == "form") {
      this.router.navigate(['/forbidden']);
    }

    this.startYear = new Date().getFullYear() - 3;
    for (let i = this.startYear; i <= new Date().getFullYear() + 5; i++) {
      this.years.push(i);
    }
  }
  reload() {
    window.location.reload();
  }
  delete(id: any) {
    this.ControlService.deleteDocument(id).subscribe((res: any) => {
      this.ControlService.getByName(this.name).subscribe((res: any) => {
        this.category = res;
        this.idCategory = this.category[0].id;
        this.ControlService.getDocument(this.idCategory).subscribe((res: any) => {
          this.data = res;
        })
      })
    })
  }
  filter() {
    // console.log(this.filterYear.value);

    // this.ControlService.filterByYear(this.filterYear.value).subscribe((res: any) => {
    //   this.data = res;
    //   console.log(res);

    // });
  }
}
