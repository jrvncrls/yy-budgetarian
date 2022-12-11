import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
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
  userId$ = new BehaviorSubject<number>(0);

  currentBalance$!: Observable<string>;

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
        console.log('params', params['id']);
        this.userId$.next(+params['id']);
        this.userService
          .getUserById(params['id'])
          .subscribe((user: UserResponse | null) => {
            this.userName$.next(user?.username);
          });
      });

    this.currentBalance$ = this.balanceService.getBalanceByUserId(
      this.userId$.value
    );
  }

  openAddExpenseModal(): void {
    const dialogRef = this.dialog.open(AddExpenseComponent);

    dialogRef.componentInstance.userId = this.userId$.value;

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddPaymentModal(): void {
    const dialogRef = this.dialog.open(AddPaymentComponent);

    dialogRef.componentInstance.userId = this.userId$.value;

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
