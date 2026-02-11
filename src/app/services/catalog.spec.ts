import { TestBed } from '@angular/core/testing';

import { CatalogService } from './catalog';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Coffee } from '../types/coffees';

describe('Catalog', () => {
  let service: CatalogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    service = TestBed.inject(CatalogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get coffees', () => {
    const mockCoffees: Coffee[] = [
      {
        id: '1',
        name: 'Espresso',
        description: 'Strong shot',
        origin: 'Italy',
        price: 2.5,
      },
    ];

    service.getCoffees().subscribe((coffees) => {
      expect(coffees).toBeTruthy();
      expect(coffees.length).toBeGreaterThan(0);
      expect(coffees[0].name).toBe('Espresso');
    });

    const req = httpMock.expectOne('http://localhost:3000/coffees');
    expect(req.request.method).toBe('GET');
    req.flush(mockCoffees);
  });
});
