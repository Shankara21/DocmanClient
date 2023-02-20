import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document, public ControlService: ControlService, private CookieService: CookieService, private route: Router) { }
  dateNow = new Date();
  token: any;

  // Auth
  username: any;
  fullname: any;
  email: any;
  userLevel: any;
  ngOnInit(): void {
    setInterval(() => {
      this.dateNow = new Date();
    }, 1000);
    this.token = this.CookieService.get('refreshToken');

    // console.log(this.ControlService.username);


  }
  logout() {
    this.ControlService.logout(this.token).subscribe((res: any) => {
      this.CookieService.delete('refreshToken');
      localStorage.removeItem('refreshToken');
      localStorage.clear();
      this.route.navigate(['/login']);
    })
  }







  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
}
