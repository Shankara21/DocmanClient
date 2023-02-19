import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.css']
})
export class CreateDocumentComponent implements OnInit {
  form!: FormGroup;
  constructor(private router: Router, private ControlService: ControlService) { }
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
  ngOnInit(): void {
    this.ControlService.getCategory().subscribe((res: any) => {
      this.categories = res;

    });
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      noDoc: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      linkDoc: new FormControl('', [Validators.required]),
      noRev: new FormControl('', [Validators.required]),
      date: new FormControl(this.now, [Validators.required]),
    });
  }

  onChange(event: any) {
    this.linkDoc = event.target.files[0];
  }

  params: any;
  submit() {

    this.form.value.categoryId = Number(this.form.value.categoryId);
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


    this.ControlService.createDocument(formData).subscribe((res: any) => {
      this.router.navigate([`/${this.params}`]);
    });
  }
}
