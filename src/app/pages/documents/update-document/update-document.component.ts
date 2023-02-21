import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.css']
})
export class UpdateDocumentComponent implements OnInit {

  constructor(private router: Router, private cookieService : CookieService) { }

  ngOnInit(): void {
    const token = this.cookieService.get('refreshToken');

    if (!this.cookieService.get('refreshToken')) {
      this.router.navigate(['/login']);
    }
  }

}
