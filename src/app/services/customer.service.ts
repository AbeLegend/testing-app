import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://127.0.0.1:3000/api/customers';

  constructor(private http: HttpClient) { }

  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, customer);
  }

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCustomerById(customerId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${customerId}`);
  }

  getLatestUnprintedCustomer(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/latest-unprinted`);
  }

  printCustomer(customerId: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${customerId}/print`, { printed: true });
  }

  getPrintedCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count-printed`);
  }

  getUnprintedCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count-unprinted`);
  }
}
