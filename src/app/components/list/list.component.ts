import { Component } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, mergeMap, shareReplay } from 'rxjs/operators';
import { ProductSearchResponse } from 'src/app/models/product-search-response';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  productsWithLocationList: ProductSearchResponse[] = [];

  private _productsWithLocationListSubject: Subject<string> = new Subject<string>();

  productsWithLocationList$: Observable<ProductSearchResponse[]> = this._productsWithLocationListSubject.asObservable().pipe(mergeMap((searchString) => this.warehouseService.retrieveProductsList(searchString)), catchError(() => of([])), shareReplay(1));

  constructor(private warehouseService: WarehouseService) {
    this.warehouseService.search$.subscribe(searchString => {
      this._productsWithLocationListSubject.next(searchString);
    });
  }
}
