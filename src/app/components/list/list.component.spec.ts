import { Subject } from 'rxjs';
import { WarehouseService } from 'src/app/services/warehouse.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  const searchSubject: Subject<string> = new Subject<string>();
  const warehouseService = { search$: searchSubject.asObservable(), retrieveProductsList: {} } as WarehouseService;
  beforeEach(() => {
    component = new ListComponent(warehouseService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
