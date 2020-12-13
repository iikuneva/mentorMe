import {Injectable} from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpParams
} from '@angular/common/http';
import {take, exhaustMap} from 'rxjs/operators';
import { DataStorageService } from '../../shared/data-storage.service';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private dataStorageService: DataStorageService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        return this.dataStorageService.getUser().pipe(
            take(1),
            exhaustMap(user => {
                if(!user){
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.idToken)
                });
                return next.handle(modifiedReq);
            })
        );
    }
}