import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiKey = 'vRcrZ4R0waV2sAOyp4lOIlQhSrsYhwCCOmjDF-08mSFQYnouweMwMTBZQTz27R8B';
    const newRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });
    return next.handle(newRequest);
  }
}
