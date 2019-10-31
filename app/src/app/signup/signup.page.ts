import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SIGNUP } from '../constants/formValidationMessage';
import { HelperService } from '../providers/helper.service';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../providers/firebase-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  email: FormControl;
  password: FormControl;
  formError: any = {
    email: '',
    password: ''
  };
  validationMessage: any = SIGNUP;
  constructor(private helperService: HelperService, private router: Router, private firebaseService: FirebaseAuthService) { }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }
  createFormControl() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  }

  createForm() {
    this.signupForm = new FormGroup({
      email: this.email,
      password: this.password
    });
    this.signupForm.valueChanges.subscribe(data => this.onFormValueChanged(data));
  }

  onFormValueChanged(data) {
   // console.log('data', data);
   // console.log('form', this.signupForm);
    this.formError = this.helperService.prepareValidationMessage(this.signupForm, this.validationMessage, this.formError);
 // console.log(this.formError);
  }
  goToLoginPage() {
    this.router.navigate(['/login']);
  }
  async signup() {
    try {
     const result = await  this.firebaseService.resgisterWithWmailPassword(this.email.value, this.password.value);
     console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}
