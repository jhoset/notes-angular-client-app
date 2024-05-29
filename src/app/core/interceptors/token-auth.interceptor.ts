import {HttpInterceptorFn} from '@angular/common/http';

export const tokenAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('eToken');

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    });
    console.log(JSON.parse(token))
    return next(clonedReq);
  }

  return next(req);
};
