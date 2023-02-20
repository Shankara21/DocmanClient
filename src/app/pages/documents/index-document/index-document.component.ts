import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-index-document',
  templateUrl: './index-document.component.html',
  styleUrls: ['./index-document.component.css']
})
export class IndexDocumentComponent implements OnInit {

  constructor(private router: Router, private ControlService: ControlService) { }



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
  name: string = this.router.url.substring(1);
  ngOnInit(): void {
    if (localStorage.getItem('refreshToken') == null) {
      this.router.navigate(['/login']);
    }
    this.ControlService.getByName(this.name).subscribe((res: any) => {
      this.category = res;
      this.idCategory = this.category[0].id;
      this.ControlService.getDocument(this.idCategory).subscribe((res: any) => {
        this.data = res;
      })
    })




    this.startYear = new Date().getFullYear() - 3;
    for (let i = this.startYear; i <= new Date().getFullYear() + 5; i++) {
      this.years.push(i);
    }
  }
  reload() {
    window.location.reload();
  }
  delete(id: any) {
    // this.ControlService.deleteDocument(id).subscribe((res: any) => {
    //   this.router.navigate([this.name]);
    //   window.location.reload();
    // });
  }
  filter() {
    // console.log(this.filterYear.value);

    // this.ControlService.filterByYear(this.filterYear.value).subscribe((res: any) => {
    //   this.data = res;
    //   console.log(res);

    // });
  }
}
