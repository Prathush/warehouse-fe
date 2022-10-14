import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { mergeMap, shareReplay, takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
})
export class AddProductComponent implements OnDestroy {

  initialProduct$: Observable<Product> = of(new Product()).pipe(shareReplay(1));

  boxList$: Observable<string[]> = this.warehouseService.retrieveBoxDetails().pipe(shareReplay(1));

  private _unsubscribe$: Subject<void> = new Subject();

  private _addProductSubject: Subject<Product> = new Subject<Product>();

  private _addProductSubscription: Subscription = this._addProductSubject.asObservable().pipe(
    mergeMap((product: Product) => this.warehouseService.addProduct(product)), takeUntil(this._unsubscribe$))
    .subscribe((data) => {
      if (data && data.warehouseSearchProductList && data.warehouseSearchProductList.status && data.warehouseSearchProductList.status === 'ok') {
        window.alert('Product added to box successfully');
        this.router.navigateByUrl('/');
      }
    }, error => { window.alert(error.error.message); });

  constructor(
    private router: Router,
    private warehouseService: WarehouseService
  ) {

  }

  onChange(event, product: Product, fieldName: string) {
    if (!!event && !!event.target && !!event.target.value) {
      product[fieldName] = event.target.value;
    }
  }

  saveProductDetails(product: Product) {
    if (product.name && product.boxName) {
      this._addProductSubject.next(product);
    }
  }

  hasNoBoxesAvaliable(boxList: string[]) {
    return !boxList || !boxList.length;
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}

