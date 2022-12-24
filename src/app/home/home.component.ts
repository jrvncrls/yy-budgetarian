import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { BalanceService } from '../services/balance/balance.service';
import { UserResponse, UserService } from '../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  userName$ = new BehaviorSubject<string | undefined>('');
  userId$ = new BehaviorSubject<string>('');

  currentBalance$ = new BehaviorSubject<string>('');

  private readonly unsubscribe$ = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private balanceService: BalanceService,
    private userService: UserService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: Params) => {
        this.userId$.next(params['id']);
        this.userService
          .getUserById(params['id'])
          .subscribe((user: UserResponse | null) => {
            this.userName$.next(user?.username);
          });
      });

    this.balanceService
      .getBalanceByUserId(this.userId$.value)
      .subscribe((balance) => {
        this.currentBalance$.next(balance);
      });
  }

  openAddExpenseModal(): void {
    const dialogRef = this.dialog.open(AddExpenseComponent);

    dialogRef.componentInstance.userId = this.userId$.value;

    dialogRef.componentInstance.newBalance.subscribe((bal) => {
      this.currentBalance$.next(bal);
    });
  }

  openAddPaymentModal(): void {
    const dialogRef = this.dialog.open(AddPaymentComponent);

    dialogRef.componentInstance.userId = this.userId$.value;

    dialogRef.componentInstance.newBalance.subscribe((bal) => {
      this.currentBalance$.next(bal);
    });
  }
}
