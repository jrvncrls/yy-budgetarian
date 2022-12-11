import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AddExpensePayload,
  ExpenseService
} from '../services/expense/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  @Input() userId!: number;
  @Output() newBalance = new EventEmitter();

  addExpenseForm!: FormGroup;

  constructor(
    protected fb: FormBuilder,
    private dialogRef: MatDialogRef<AddExpenseComponent>,
    private snackBar: MatSnackBar,
    private expenseService: ExpenseService
  ) {
    this.addExpenseForm = this.fb.group({
      amount: [null, Validators.required],
      method: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  addExpense(): void {
    let payload: AddExpensePayload = {
      amount: +this.addExpenseForm.get('amount')?.value,
      description: this.addExpenseForm.get('description')?.value,
      method: this.addExpenseForm.get('method')?.value,
      userId: this.userId,
    };
    this.expenseService.addExpense(payload).subscribe((result) => {
      this.newBalance.emit(result.newBalance);
      this.dialogRef.close();
      this.snackBar.open(result.message, '', {
        duration: 3000,
        verticalPosition: 'top',
      });
    });
  }
}
