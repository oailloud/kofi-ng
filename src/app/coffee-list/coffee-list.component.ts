import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { CatalogService } from '../services/catalog';
import { Coffee } from '../types/coffees';
import { UpdateForm } from '../update-form/update-form';

@Component({
  selector: 'app-coffee-list',
  imports: [UpdateForm],
  templateUrl: './coffee-list.component.html',
  styleUrl: './coffee-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoffeeListComponent {

  protected coffees = computed(() => ([
    ...this.backendCoffees(),
    {
      id: '4',
      name: this.extraCoffee(),
      description: 'Coffee 4 description',
      origin: 'Coffee 4 origin',
      price: 4.0,
    }
  ]));
  protected backendCoffees = signal<Coffee[]>([]);
  protected extraCoffee = signal('Washed bourbon');

  protected catalog = inject(CatalogService);

  constructor() {
    effect(() => {
      console.log(this.backendCoffees());
    });
  }

  ngOnInit() {
    this.catalog.getCoffees().subscribe((coffees) => {
      this.backendCoffees.set(coffees);
    });
  }

  updateName(newValue: string) {
    this.extraCoffee.set(newValue);
  }
}
