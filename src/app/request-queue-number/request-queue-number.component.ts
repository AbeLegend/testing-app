import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';



interface Customer {
  _id: string;
  customerName: string;
  updatedAt: string;
}
@Component({
  selector: 'app-request-queue-number',
  templateUrl: './request-queue-number.component.html',
  styleUrls: ['./request-queue-number.component.css']
})
export class RequestQueueNumberComponent implements OnInit {
  customer: Customer | null = null;
  queueNumber: string | null = null

  constructor(private route: ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit(): void {
    const customerId = this.route.snapshot.paramMap.get('id');
    this.queueNumber = this.route.snapshot.queryParamMap.get('queueNumber');
    if (customerId) {
      this.customerService.getCustomerById(customerId).subscribe((customer) => {
        this.customer = customer;
      });
    }
  }
}
