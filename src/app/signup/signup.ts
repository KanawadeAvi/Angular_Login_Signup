import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, MatFormField, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      date: ['', Validators.required]
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      const { name } = this.signupForm.value;
      this.auth.checkUserExists(name).subscribe(users => {
        if (users.length > 0) {
          alert('User already exists!');
        } else {
          this.auth.signup(this.signupForm.value).subscribe(() => {
            alert('Signup successful!');
            this.router.navigate(['/login']);
          });
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
