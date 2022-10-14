
import { WarehouseService } from 'src/app/services/warehouse.service';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;

  const warehouseService = { emitSearch: {} } as WarehouseService;

  beforeEach(() => {
    component = new SearchComponent(warehouseService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update search string', () => {
    spyOn(warehouseService, 'emitSearch');
    component.updateSearchString('test');
    component.onSearchClicked();
    expect(warehouseService.emitSearch).toHaveBeenCalledTimes(1);
  });
});
