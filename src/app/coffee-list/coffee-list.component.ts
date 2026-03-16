import { Component, computed, effect, inject, signal } from '@angular/core';
import { CatalogService } from '../services/catalog';
import { Coffee } from '../types/coffees';
import { MOCK_COFFEES } from '../mock/coffee-mock-data';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-coffee-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './coffee-list.component.html',
  styleUrl: './coffee-list.component.scss'
})
export class CoffeeListComponent {

  // flag to enable/disable the mocked data
  protected useMockDataOnly = signal(true);

  protected backendCoffees = signal<Coffee[]>([]);

  protected searchTerm = signal('');
  protected selectedOrigin = signal<string | 'all'>('all');
  protected sortBy = signal<'price-asc' | 'price-desc' | 'name'>('price-asc');

  private backendSubscription: Subscription | null = null;

  protected baseCoffees = computed<Coffee[]>(() => {
    const backend = this.backendCoffees();
    if (this.useMockDataOnly()) {
      return MOCK_COFFEES;
    }
    if (!backend.length) {
      return MOCK_COFFEES;
    }
    return [...backend];
  });

  protected origins = computed<string[]>(() =>
    [...new Set(this.baseCoffees().map((c) => c.origin))].sort()
  );

  protected coffees = computed<Coffee[]>(() => {
    let list = [...this.baseCoffees()];

    const term = this.searchTerm().toLowerCase().trim();
    const origin = this.selectedOrigin();
    const sortBy = this.sortBy();

    if (term) {
      list = list.filter((coffee) => {
        const name = coffee.name.toLowerCase();
        const roaster = (coffee.roaster ?? '').toLowerCase();
        return name.includes(term) || roaster.includes(term);
      });
    }

    if (origin && origin !== 'all') {
      list = list.filter((coffee) => coffee.origin === origin);
    }

    list = list.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }

      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }

      return 0;
    });

    return list;
  });

  catalog = inject(CatalogService);

  ngOnInit() {
    this.backendSubscription = this.catalog.getCoffees().subscribe((coffees) => {
      this.backendCoffees.set(coffees);
    });
  }

  protected onSearchChange(value: string) {
    this.searchTerm.set(value);
  }

  protected onOriginChange(value: string) {
    this.selectedOrigin.set(value as string | 'all');
  }

  protected onSortChange(value: string) {
    this.sortBy.set(value as 'price-asc' | 'price-desc' | 'name');
  }

  ngOnDestroy() {
    this.backendSubscription?.unsubscribe()
  }
}
