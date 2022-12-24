import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AddPaymentPayload,
  PaymentService
} from '../services/payment/payment.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
})
export class AddPaymentComponent implements OnInit {
  @Input() userId!: string;
  @Output() newBalance = new EventEmitter();

  addPaymentForm!: FormGroup;

  constructor(
    protected fb: FormBuilder,
    private paymentService: PaymentService,
    private dialogRef: MatDialogRef<AddPaymentComponent>,
    private snackBar: MatSnackBar
  ) {
    this.addPaymentForm = this.fb.group({
      paymentAmount: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  addPayment(): void {
    let payload: AddPaymentPayload = {
      amount: +this.addPaymentForm.get('paymentAmount')?.value,
      userId: this.userId,
    };
    this.paymentService.addPayment(payload).subscribe((result) => {
      this.newBalance.emit(result.newBalance);
      this.dialogRef.close();
      this.snackBar.open(result.message, '', {
        duration: 3000,
        verticalPosition: 'top',
      });
    });
  }
}
