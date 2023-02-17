import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.css']
})
export class CreateDocumentComponent implements OnInit {
  form!: FormGroup;
  constructor(private router: Router, private ControlService: ControlService) { }
  name: string = this.router.url.substring(1);

  // category
  categories: any[] = [];
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
      date: new FormControl('', [Validators.required]),
    });
  }
  image: any;
  onChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }

  }

  params: any;
  submit() {
    let formData = new FormData();
      console.log("INI IMAGE");
      console.log(this.image);
    formData.append('linkDoc', this.image);
  //  formData dimasukkan ke dalam form linkDoc
    this.form.value.linkDoc = formData;
    console.log("INI FORM");
    var options = { content: formData };

    console.log(this.form.value);
    this.form.value.categoryId = Number(this.form.value.categoryId);
    this.ControlService.createDocument(this.form.value).subscribe((res: any) => {
      this.router.navigate(['/']);
    });
  }
}
