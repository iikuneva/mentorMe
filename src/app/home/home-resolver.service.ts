import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import IProfile from '../user/profile.model';


@Injectable({providedIn: "root"})
export class HomeResolverService implements Resolve<IProfile[]>{

    constructor(private dataStorageService: DataStorageService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProfile[]> | Promise<IProfile[]> | IProfile[] {
            return this.dataStorageService.fetchAllProfiles();
    }
}