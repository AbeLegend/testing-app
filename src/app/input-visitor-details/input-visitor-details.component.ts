import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-input-visitor-details',
  templateUrl: './input-visitor-details.component.html',
  styleUrls: ['./input-visitor-details.component.css']
})
export class InputVisitorDetailsComponent {
  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.customerForm = this.fb.group({
      salesmanId: ['', Validators.required],
      customerName: ['', Validators.required],
      pic: ['', Validators.required],
      city: ['', Validators.required],
      remark: ['', Validators.required],
      npwp: ['', Validators.required],
      customerPriceCategory: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      contactNo: ['', Validators.required],
      region: ['', Validators.required],
      province: ['', Validators.required],
      kuota: [0, Validators.required],
      preferredExpedition: ['', Validators.required],
    });
  }

  addCustomer() {
    if (this.customerForm.valid) {
      this.customerService.addCustomer(this.customerForm.value).subscribe(
        response => {
          console.log('Customer added successfully', response);
          this.customerForm.reset();
          this.router.navigate(['/']);
        },
        error => {
          console.error('Error adding customer', error);
        }
      );
    } else {
      this.customerForm.markAllAsTouched();
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
