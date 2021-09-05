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

  formData = [];

  constructor(public router: Router, public apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchForm();
  }

  fetchForm() {
    this.apiService.get('form/fetch?name=User Registration').subscribe((res: any) => {
      console.log(res);
      this.formData = res['data'];
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
