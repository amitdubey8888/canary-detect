import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  formName: any = 'User Registration';

  generatedFormData: any = [];

  inputTypes: any = [
    { type: "button" },
    { type: "checkbox" },
    { type: "date" },
    { type: "datetime-local" },
    { type: "email" },
    { type: "file" },
    { type: "hidden" },
    { type: "image" },
    { type: "month" },
    { type: "number" },
    { type: "password" },
    { type: "radio" },
    { type: "range" },
    { type: "reset" },
    { type: "search" },
    { type: "submit" },
    { type: "tel" },
    { type: "text" },
    { type: "time" },
    { type: "url" },
    { type: "week" }
  ];

  builderData: any = [] = [new FormBuilder()];

  constructor(public router: Router, public apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchForm();
  }

  fetchForm() {
    this.apiService.get(`form/fetch?form_name=`).subscribe((res: any) => {
      this.generatedFormData = res['data'];
      this.buildForm();
    }, (err) => {
      console.log(err);
      Swal.fire({
        title: 'Error',
        text: 'Oops, something went wrong!',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    });
  }

  buildForm() {
    console.log(this.generatedFormData);
  }

  addField() {
    this.builderData.push(new FormBuilder());
  }

  removeField(index: Number) {
    this.builderData.splice(index, 1);
  }

  saveForm() {
    const finalData = JSON.parse(JSON.stringify(this.builderData));
    finalData.forEach((element: any) => {
      if (finalData[0]['form_name'] && element.label_name && element.input_name) {
        element.form_name = finalData[0]['form_name'];
        element.form_id = (finalData[0]['form_name']).replace(/[^a-zA-Z\s]/g, '').toLowerCase().split(' ').join('_');
        element.form_class = (finalData[0]['form_name']).replace(/[^a-zA-Z\s]/g, '').toLowerCase().split(' ').join('_');
        element.label_for = (element.label_name).replace(/[^a-zA-Z\s]/g, '').toLowerCase().split(' ').join('_');
        element.label_class = (element.label_name).replace(/[^a-zA-Z\s]/g, '').toLowerCase().split(' ').join('_');
        element.input_name = (element.input_name).replace(/[^a-zA-Z\s]/g, '').toLowerCase().split(' ').join('_');
        element.input_id = (element.input_name).replace(/[^a-zA-Z\s]/g, '').toLowerCase().split(' ').join('_');
        element.input_class = (element.input_name).replace(/[^a-zA-Z\s]/g, '').toLowerCase().split(' ').join('_');
        element.field_id = 'form-group';
        element.field_class = 'form-group';
      }
    });
    console.log(finalData);
    this.apiService.post(`form/add`, finalData).subscribe((res: any) => {
      console.log(res);
      Swal.fire({
        title: 'Success',
        text: res.message,
        icon: 'success',
        confirmButtonText: 'Okay'
      }).then((res) => {
        this.fetchForm();
        this.builderData = [new FormBuilder()];
      });
    }, (err) => {
      console.log(err);
      Swal.fire({
        title: 'Error',
        text: 'Oops, something went wrong!',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    });
  }
}

class FormBuilder {
  form_name = null;
  form_id = null;
  form_class = null;
  field_id = null;
  field_class = null;
  label_for = null;
  label_name = null;
  label_class = null;
  input_type = null;
  input_name = null;
  input_id = null;
  input_class = null;
  input_value = null;
  input_placeholder = null;
  input_required = false;
  input_disabled = false;
  input_reaonly = false;
}
