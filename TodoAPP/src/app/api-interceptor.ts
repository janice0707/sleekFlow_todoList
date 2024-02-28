import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    
    constructor(
        @Inject('BASE_API_URL') private baseUrl: string) {
    }
    
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('Request URL: ' + req.url);

    const apiReq = req.clone({ 
      headers: req.headers.set("Content-Type", "application/json; charset=utf-8"),
                          // .set("ngsw-bypass", "true"),
      url: `${this.baseUrl}${req.url}` 
    });
    return handler.handle(apiReq);
  }
}