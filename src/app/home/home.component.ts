import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { AddPaymentComponent } from '../add-payment/add-payment.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  user$ = new BehaviorSubject<string>('');

  currentBalance = 3256;

  private readonly unsubscribe$ = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: Params) => {
        console.log('params', params['id']);
        this.user$.next(params['id']);
      });
  }

  openAddExpenseModal(): void {
    const dialogRef = this.dialog.open(AddExpenseComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddPaymentModal(): void {
    const dialogRef = this.dialog.open(AddPaymentComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
