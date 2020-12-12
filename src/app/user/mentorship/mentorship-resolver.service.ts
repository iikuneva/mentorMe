import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';


@Injectable({providedIn: "root"})
export class MentorshipResolver implements Resolve<any>{

    constructor(private dataStorageService: DataStorageService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
            return this.dataStorageService.fetchMentorshipProfiles();
    }
}