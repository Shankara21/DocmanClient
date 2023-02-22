import { CookieService } from 'ngx-cookie-service';
import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.css']
})
export class CreateDocumentComponent implements OnInit {
  form!: FormGroup;
  constructor(private router: Router, public ControlService: ControlService, private cookieService: CookieService) { }
  name: string = this.router.url.substring(1);

  title!: String;
  noDoc!: String;
  categoryId!: String;
  linkDoc!: File;
  noRev!: String;
  date!: Date;

  // category
  categories: any[] = [];

  // mengambil tanggal sekarang menggunakan moment
  now = moment().format('YYYY-MM-DD');
  id: any;
  refreshToken: any;
  decoded: any;

  ngOnInit(): void {

    const token = this.cookieService.get('refreshToken');

    if (!this.cookieService.get('refreshToken')) {
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
    this.ControlService.getCategory().subscribe((res: any) => {
      this.categories = res;


    });
    console.log(this.ControlService.id);

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      noDoc: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      linkDoc: new FormControl('', [Validators.required]),
      noRev: new FormControl('', [Validators.required]),
      date: new FormControl(this.now, [Validators.required]),
      userId: new FormControl(this.ControlService.id, [Validators.required])
    });
  }

  onChange(event: any) {
    this.linkDoc = event.target.files[0];
  }

  params: any;
  submit() {
    this.form.value.categoryId = Number(this.form.value.categoryId);

    if (this.ControlService.userLevel == "User" && this.form.value.categoryId == 2 || this.ControlService.userLevel == "User" && this.form.value.categoryId == 3) {
      this.router.navigate(['/forbidden']);
    } else {
      this.ControlService.getById(this.form.value.categoryId).subscribe((res: any) => {
        this.params = res.name;
        this.params = this.params.toLowerCase();
      })
      const formData = new FormData();
      formData.append('title', this.form.value.title);
      formData.append('noDoc', this.form.value.noDoc);
      formData.append('categoryId', this.form.value.categoryId);
      formData.append('linkDoc', this.linkDoc, this.linkDoc.name);
      formData.append('noRev', this.form.value.noRev);
      formData.append('date', this.form.value.date);
      formData.append('userId', this.ControlService.id);


      this.ControlService.createDocument(formData).subscribe((res: any) => {
        this.router.navigate([`/${this.params}`]);
      });
    }


  }
}
