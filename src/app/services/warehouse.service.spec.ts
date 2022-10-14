import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Box } from '../models/box';
import { Product } from '../models/product';

import { WarehouseService } from './warehouse.service';

describe('WarehouseService', () => {
  const httpClient: HttpClient = { get: {}, post: {}, put: {} } as unknown as HttpClient;
  let service: WarehouseService;

  beforeEach(() => {
    service = new WarehouseService(httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products list', (done) => {
    spyOn(httpClient, 'get').and.returnValue(of([]));
    service.retrieveProductsList('abcd').subscribe(response => {
      expect(response).toEqual([]);
      expect(httpClient.get).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should add box', (done) => {
    spyOn(httpClient, 'post').and.returnValue(of({}));
    service.addBox(new Box()).subscribe((response) => {
      expect(response).toEqual({});
      expect(httpClient.post).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should add product', (done) => {
    spyOn(httpClient, 'put').and.returnValue(of({}));
    service.addProduct(new Product()).subscribe((response) => {
      expect(response).toEqual({});
      expect(httpClient.put).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should retrieve box details', (done) => {
    spyOn(httpClient, 'get').and.returnValue(of([]));
    service.retrieveBoxDetails().subscribe((response) => {
      expect(response).toEqual([]);
      expect(httpClient.get).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should emit search string', (done) => {
    service.search$.subscribe((response) => {
      expect(response).toEqual('test');
      done();
    });
    service.emitSearch('test');
  });
});
