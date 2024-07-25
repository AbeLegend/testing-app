import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../services/customer.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isPrintDisabled = false;


  constructor(
    private http: HttpClient, private router: Router, private customerService: CustomerService,
  ) { }



  changePage(path) {
    this.router.navigate(['/' + path]);
  }

  checkUnprintedCustomers() {
    this.customerService.getUnprintedCount().subscribe((response: { count: number }) => {
      this.isPrintDisabled = response.count === 0;
    });
  }

  printQueueNumber() {
    this.customerService.getLatestUnprintedCustomer().subscribe((customer: any) => {
      if (customer) {
        this.customerService.getPrintedCount().subscribe((response: { count: number }) => {
          const queueNumber = this.generateQueueNumber(response.count);
          this.customerService.printCustomer(customer._id).subscribe(() => {
            this.router.navigate(['/request-queue-number', customer._id], { queryParams: { queueNumber } });
            this.checkUnprintedCustomers();
          });
        });
      } else {
        alert('No unprinted customers found.');
      }
    });
  }

  generateQueueNumber(count: number): string {
    const nextNumber = count + 1;
    return 'A' + nextNumber.toString().padStart(3, '0');
  }
  ngOnInit(): void {
    this.checkUnprintedCustomers()
  }
}
