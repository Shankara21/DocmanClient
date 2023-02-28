import { CookieService } from 'ngx-cookie-service';
import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(public ControlService: ControlService, private router: Router, private cookieService: CookieService) { }
  decoded: any;
  id: any;
  refreshToken: any;
  params = this.router.url.substring(10);
  form!: FormGroup;
  data: any;

  // ngModel
  username: any;
  email: any;
  fullname: any;
  userLevel: any;
  route: string = this.router.url.substring(1);
  paramsId = this.router.url.substring(10);
  compare: any;
  ngOnInit(): void {

    this.compare = `editUser/${this.paramsId}`;
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      fullname: new FormControl('', [Validators.required]),
      userLevel: new FormControl('', [Validators.required])
    })
    const token = this.cookieService.get('docmanToken');
    if (!this.cookieService.get('docmanToken')) {
      this.router.navigate(['/login']);
    }
    this.refreshToken = new FormGroup({
      refreshToken: new FormControl(token)
    })
    console.log(token);

    // mengecek apakah ada yang login
    this.ControlService.refreshToken(this.refreshToken.value).subscribe((res: any) => {

      this.decoded = jwt_decode(res.accessToken);
      // console.log(this.decoded);
      this.ControlService.username = this.decoded.username;
      this.ControlService.email = this.decoded.email;
      this.ControlService.fullname = this.decoded.fullname;
      this.ControlService.userLevel = this.decoded.userLevel;
      this.ControlService.id = this.decoded.id;
      this.id = this.decoded.id;

      if (this.route == this.compare && this.ControlService.userLevel == "User") {
        this.router.navigate(['/forbidden']);
      }
    });



    this.ControlService.findUser(this.params).subscribe((res: any) => {
      this.username = res.username;
      this.email = res.email;
      this.fullname = res.fullname;
      this.userLevel = res.userLevel;
    })

  }

  submit() {
    console.log(this.form.value);
    this.ControlService.updateUser(this.params, this.form.value).subscribe((res: any) => {
      this.router.navigate(['/users']);
    })
  }

}
