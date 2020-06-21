import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { UserService } from 'src/app/api/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  timeLeft = 65;
  tick = 1000;
  flagInput = false;
  submitted = false;
  returnUrl: string;
  interval;
  btnLogin = 'دریافت رمز عبور';
  countDown: Subscription;
  phoneNumber = '';
  isDisable = false;
  error = '';

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  startTimer() {
    this.flagInput = true;
    // this.interval = setInterval(() => {
    //   if (this.timeLeft > 0) {
    //     this.timeLeft = this.timeLeft - 1;
    //     this.isDisable = true;
    //   } else {
    //     this.refereshTimer();
    //   }
    // }, 1000);
    // clearInterval(this.interval);
    this.countDown = timer(0, this.tick).subscribe(() => {
      this.timeLeft > 0 ? this.timeLeft-- : this.refereshTimer();
    });

    this.userService.autheticationNumber(this.phoneNumber);
    this.isDisable = true;
  }

  refereshTimer() {
    this.countDown.unsubscribe();
    this.timeLeft = 65;
    this.flagInput = false;
    this.btnLogin = 'باز نشانی رمز عبور';
  }

  getValue($event) {
    this.phoneNumber = $event.target.value;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.userService
    .login(this.phoneNumber, this.f.password.value)
    .pipe(first())
    .subscribe(
      (data) => {
        this.countDown = null;
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        console.log(error.statusCode);
        this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.countDown = null;
  }
}
