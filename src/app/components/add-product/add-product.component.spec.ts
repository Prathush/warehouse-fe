import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { WarehouseService } from 'src/app/services/warehouse.service';

import { AddProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  const router: Router = { navigateByUrl: {} } as Router;
  const warehouseService = { addProduct: {}, retrieveBoxDetails: {} } as WarehouseService;

  beforeEach(() => {
    spyOn(warehouseService, 'retrieveBoxDetails').and.returnValue(of([]));
    component = new AddProductComponent(router, warehouseService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update name on change', () => {
    const product = new Product();
    component.onChange({ target: { value: 'test' } }, product, 'name');
    expect(product.name).toEqual('test');
  });

  it('should save box details', () => {
    spyOn(warehouseService, 'addProduct').and.returnValue(of({ warehouseSearchProductList: { status: 'ok' } }));
    spyOn(router, 'navigateByUrl');
    const product = new Product();
    component.onChange({ target: { value: 'test' } }, product, 'name');
    component.onChange({ target: { value: '1' } }, product, 'boxName');
    component.saveProductDetails(product);
    expect(warehouseService.addProduct).toHaveBeenCalledTimes(1);
    expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
  });
});
