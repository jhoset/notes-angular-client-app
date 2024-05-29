import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, throwError} from "rxjs";
import {ErrorSnackBarComponent} from "../components/error-snack-bar/error-snack-bar.component";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const snackBar = inject(MatSnackBar);

  const displayNotification = (message: string, error: string, errorNumber?: number) => {
    snackBar.openFromComponent(ErrorSnackBarComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 7000,
      data: {
        errorNumber,
        error,
        message
      },
    });
  }

  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          displayNotification('Unauthorized', 'Invalid Credentials',401);
          localStorage.removeItem('eToken')
          localStorage.removeItem('eUser');
        } else if (err.status === 500) {
          displayNotification('Internal Server Error', 'Something went wrong', 500)
        } else {
          displayNotification('Http Error', `${err.error.error} - ${err.error.message}`);
        }
      }
      //? Re-throw the error
      return throwError(() => err)
    })
  );
};
