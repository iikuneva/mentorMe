import IProfile from './profile.model';

import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {from, Observable} from 'rxjs';
import {DataStorageService} from '../shared/data-storage.service';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ProfileResolverService implements Resolve<IProfile> {

    constructor(private dataStorageService: DataStorageService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProfile> | Promise<IProfile> | IProfile {
            return this.dataStorageService.fetchProfileById(route.params.id);   
    }
}