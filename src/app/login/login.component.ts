import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, LoginPayload } from '../services/auth/auth.service';

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
    private router: Router,
    private authService: AuthService
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

    let payload: LoginPayload = {
      username: this.loginForm.get('username')?.value.toLowerCase(),
      password: this.loginForm.get('password')?.value,
    };

    this.authService.login(payload).subscribe((isAuthorized) => {
      if (isAuthorized) {
        this.router.navigate([
          `home/${this.loginForm.get('username')?.value.toLowerCase()}`,
        ]);
      } else {
        this.openNoAccessSnackbar();
      }
    });
  }

  private openNoAccessSnackbar(): void {
    this.snackBar.open('You do not have access!', '', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
