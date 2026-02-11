import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Coffee } from '../types/coffees';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  
  httpClient = inject(HttpClient);

  getCoffees() {
    return this.httpClient.get<Coffee[]>('http://localhost:3000/coffees');
  }
}
