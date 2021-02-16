import { Component, OnInit } from '@angular/core';
import { FormControl, Validator, Validators, FormGroup, FormGroupDirective} from '@angular/forms';
import { Observable, of } from "rxjs";
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  
  userFormValues;
  usernameRegx: any = '[a-zA-Z][a-zA-Z0-9\s]*';
  passwordRegx: any = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?^&])[A-Za-z\\d@$!%*#?^&]{8,}$';
  minDate: Date;
  maxDate: Date;
  userForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required])
  },{ validators: this.passwordMatchValidator.bind(this) });

  constructor(public localStorageService: LocalStorageService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 15, 0, 0);
    this.maxDate = new Date();
  }

  ngOnInit(): void {

  }

  getEmailErrorMessage() {
    if (this.userForm.controls.email.hasError('required')) {
      return '';
    }
    return this.userForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  onFormSubmit(formDirective: FormGroupDirective){
    if (this.userForm.invalid) {
      return;
    }
    this.userFormValues = this.userForm.value;
    formDirective.resetForm();
    this.userForm.reset();
    this.localStorageService.setUserLocalData(this.userFormValues);
  }

  /* Shorthands for form controls (used from within template) */
  get password() { return this.userForm.get('password'); }
  get confirmPassword() { return this.userForm.get('confirm_password'); }

  /* Called on each input in either password field */
  onPasswordInput() {
    if (this.userForm.hasError('passwordMismatch'))
      this.confirmPassword.setErrors([{'passwordMismatch': true}]);
    else
      this.confirmPassword.setErrors(null);
  }

  passwordMatchValidator(formGroup: FormGroup){
    if (formGroup.controls.password.value === formGroup.controls.confirm_password.value)
      return null;
    else
      return {passwordMismatch: true};
  };

}

interface UserVM {
  firstname: string;
  lastname: string;
  gender: string;
  email: string;
  dob: Date;
}