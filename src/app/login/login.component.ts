import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    protected fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    if (
      (this.loginForm.get('username')?.value.toLowerCase() === 'yobab' ||
        this.loginForm.get('username')?.value.toLowerCase() === 'yobu') &&
      this.loginForm.get('password')?.value === 'YobabYobuForevs123!'
    ) {
      this.router.navigate([
        `home/${this.loginForm
          .get('username')
          ?.value.toLowerCase()}`,
      ]);
    } else {
      this.openNoAccessSnackbar();
    }
  }

  private openNoAccessSnackbar(): void {
    this.snackBar.open('You do not have access!', '', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
