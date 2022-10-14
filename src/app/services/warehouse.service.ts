import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Box } from '../models/box';
import { Product } from '../models/product';
import { ProductSearchResponse } from '../models/product-search-response';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private _url: string = "http://localhost:8080/warehouse/v1/";

  private _searchSubject: Subject<string> = new Subject<string>();

  search$: Observable<string> = this._searchSubject.asObservable();

  private headers_object = new HttpHeaders().append('Content-Type', 'application/json').append("Authorization", "Basic " + btoa("Demo:Demo123"));

  private httpOptions = {
    headers: this.headers_object
  };

  constructor(
    private httpClient: HttpClient,
  ) { }

  emitSearch(value: string): void {
    this._searchSubject.next(value);
  }

  retrieveProductsList(productName: string): Observable<ProductSearchResponse[]> {
    const params = new HttpParams().set('productName', productName);
    return this.httpClient.get<any>(this._url + 'product/getProducts', { ...this.httpOptions, params: params }).pipe(map(data => Object.assign([], data.warehouseSearchProductList)));
  }

  addBox(box: Box): Observable<any> {
    return this.httpClient.post<any>(this._url + 'box/createBox', box, this.httpOptions);
  }

  addProduct(product: Product): Observable<any> {
    return this.httpClient.put<any>(this._url + 'product/addProduct', product, this.httpOptions);
  }

  retrieveBoxDetails(): Observable<string[]> {
    return this.httpClient.get<any>(this._url + 'box/getAvailableBox', this.httpOptions).pipe(map(data => Object.assign([], data.warehouseAvailableBoxList)));
  }
}
