import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../validators/custom-validators";
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../../core/services/current-user.service";

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrl: './register-view.component.scss'
})
export class RegisterViewComponent {

  public loading: boolean = false;

  public registerFormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, CustomValidators.emailPatternValidator()]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])

  })

  constructor(private _authService: AuthService,
              private _router: Router,
              private _currentUserService: CurrentUserService,) {
  }

  onRegister() {
    this.loading = true;
    this._authService.register({...this.registerFormGroup.value}).subscribe(rs => {
      if (rs) {
        this.loading = false;
        localStorage.setItem('eToken', JSON.stringify(rs.token));
        localStorage.setItem('eUser', JSON.stringify(rs.user));
        this._currentUserService.user$.next(rs.user);
        this._router.navigate(['/notes/list']);
      }
    }, (error) => {
      this.loading = false;
    });
  }

  public get firstNameControl() {
    return this.registerFormGroup.get('firstName') as FormControl;
  }

  public get lastNameControl() {
    return this.registerFormGroup.get('lastName') as FormControl;
  }

  public get emailControl() {
    return this.registerFormGroup.get('email') as FormControl;
  }

  public get passwordControl() {
    return this.registerFormGroup.get('password') as FormControl;
  }

  onRedirectToLoginView() {
    this._router.navigate(['/auth/login'])
  }


}
