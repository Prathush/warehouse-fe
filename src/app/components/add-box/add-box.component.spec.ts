import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Box } from 'src/app/models/box';
import { WarehouseService } from 'src/app/services/warehouse.service';

import { AddBoxComponent } from './add-box.component';

describe('AddBoxComponent', () => {
  let component: AddBoxComponent;
  const router: Router = { navigateByUrl: {} } as Router;
  const warehouseService = { addBox: {} } as WarehouseService;

  beforeEach(() => {
    component = new AddBoxComponent(router, warehouseService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update name on change', () => {
    const box = new Box();
    component.onChange({ target: { value: 'test' } }, box, 'name');
    expect(box.name).toEqual('test');
  });

  it('should save box details', () => {
    spyOn(warehouseService, 'addBox').and.returnValue(of({}));
    spyOn(router, 'navigateByUrl');
    const box = new Box();
    component.onChange({ target: { value: 'test' } }, box, 'name');
    component.onChange({ target: { value: 1 } }, box, 'capacity');
    component.saveBoxDetails(box);
    expect(warehouseService.addBox).toHaveBeenCalledTimes(1);
    expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
  });
});
