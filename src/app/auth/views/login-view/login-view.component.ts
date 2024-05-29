import {Component} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CurrentUserService} from "../../../core/services/current-user.service";
import {CustomValidators} from "../../validators/custom-validators";
import {Router} from "@angular/router";
import {load} from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-loader/loader-hooks";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss'
})
export class LoginViewComponent {
  public loading: boolean = false;

  public loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, CustomValidators.emailPatternValidator()]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private _authService: AuthService,
              private _currentUserService: CurrentUserService,
              private _router: Router) {

    if ( localStorage.getItem("eToken") ) {
      _router
    }
  }

  public get emailControl(): FormControl {
    return this.loginFormGroup.get('email') as FormControl;
  }

  public get passwordControl(): FormControl {
    return this.loginFormGroup.get('password') as FormControl;
  }

  onLogin() {
    this.loading = true;
    this._authService.login({...this.loginFormGroup.value}).subscribe(rs => {
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

  onRedirectToRegisterView() {
    this._router.navigate(['/auth/register'])
  }

}
