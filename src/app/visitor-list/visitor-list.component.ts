import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css']
})
export class VisitorListComponent implements OnInit {
  customers: any[] = [];
  filteredCustomers: any[] = [];
  pagedCustomers: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  searchTerm: string = '';

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (data: any[]) => {
        this.customers = data;
        this.filteredCustomers = data;
        this.totalItems = data.length;
        this.updatePagedCustomers();
      },
      error => {
        console.error('Error fetching customer data', error);
      }
    );
  }

  updatePagedCustomers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedCustomers = this.filteredCustomers.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagedCustomers();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }


  onSearchChange(): void {
    this.filteredCustomers = this.customers.filter(customer =>
      Object.values(customer).some(value =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
    this.totalItems = this.filteredCustomers.length;
    this.currentPage = 1;
    this.updatePagedCustomers();
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
