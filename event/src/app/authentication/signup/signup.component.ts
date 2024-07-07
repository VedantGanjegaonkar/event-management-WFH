import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

   registrationForm!: FormGroup;
  roles: string[] = ['admin', 'user'];


  constructor(private formBuilder: FormBuilder,private dataService:UserService, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['user', Validators.required]  // Default value is 'user'
    }, {
      validator: this.passwordMatchValidator
    });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Function to handle form submission
  onSubmit() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);

      this.dataService.register(this.registrationForm.value).subscribe(
        response => {
          this.router.navigate(["/login"])
          alert("registered successfully!")
          // window.location.reload(); // Consider using more Angular-friendly ways to refresh the data.
        },
        error => {
          console.error('Error registering  user!', error);
        }
      )
    }
  }

}
