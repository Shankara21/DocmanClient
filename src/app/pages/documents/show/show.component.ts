import { Router } from '@angular/router';
import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  constructor(public ControlService: ControlService, private router: Router) { }
  data: any;
  url = this.router.url.substring(6);
  path: any;
  ext = '.pdf';
  ngOnInit(): void {
    this.ControlService.showDocument(this.url).subscribe((res: any) => {
      this.data = res;
      this.path = 'http://192.168.9.47:3124/' + this.data.linkDoc;

      this.ControlService.path = this.path;

    })
  }

}
