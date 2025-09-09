import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast-service';
import { Navigation, NavigationExtras, Router } from '@angular/router';
import { model } from '@angular/core';
import { asapScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';
import { NgZone } from '@angular/core';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);
  const zone = inject(NgZone);

  return next(req).pipe(
    catchError(error => {
      if (error) {
        switch (error.status) {
          case 400:
            // toast.error(error.error?.message || 'Bad Request');
            if (error.error?.errors) {
              const modelStateErrors =[];
              for (const key in error.error.errors) {
                if (error.error.errors(key)) {
                  modelStateErrors.push(...error.error.errors(key));
                }
              }
              throw modelStateErrors.flat();
            } else{
              toast.error(error.error || 'Bad Request');
            }
            break;
          case 401:
            toast.error(error.error?.message || 'Unauthorized');
            break;
          case 404:
            // toast.error(error.error?.message || 'Not Found');
            // router.navigateByUrl('/not-found');
              if (error.status === 404) {
                  // delay navigation until after current tick
                  Promise.resolve().then(() => router.navigateByUrl('/not-found'));
              }
              return throwError(() => error);
            break;
          case 500:
            // toast.error(error.error?.message || 'Server Error');
            const navigationExtras: NavigationExtras = {
              state: { error: error.error }
            };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            console.error('Unknown Error:', error.message);
            break;
        }
      }
      return throwError(() => error);
    })
  );
};
