import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { mergeMap, shareReplay, takeUntil } from 'rxjs/operators';
import { Box } from 'src/app/models/box';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-add-box',
  templateUrl: './add-box.component.html',
})
export class AddBoxComponent {

  initiaBoxDetails$: Observable<Box> = of(new Box()).pipe(shareReplay(1));

  private _unsubscribe$: Subject<void> = new Subject();
  private _addBoxSubject: Subject<Box> = new Subject<Box>();

  private _addBoxSubscription: Subscription = this._addBoxSubject.asObservable().pipe(
    mergeMap((box: Box) => this.warehouseService.addBox(box)), takeUntil(this._unsubscribe$))
    .subscribe(() => {
      window.alert('Box added to warehouse successfully');
      this.router.navigateByUrl('/');
    }, err => {
      window.alert(err.error.message);
    });

  constructor(
    private router: Router,
    private warehouseService: WarehouseService
  ) { }

  onChange(event, box: Box, fieldName: string): void {
    if (!!event && !!event.target && !!event.target.value) {
      box[fieldName] = event.target.value;
    }
  }

  saveBoxDetails(box: Box): void {
    if (box.name && box.capacity) {
      this._addBoxSubject.next(box);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
