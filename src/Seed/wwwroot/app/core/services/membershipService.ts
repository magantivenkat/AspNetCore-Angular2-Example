﻿import { Http, Response, Request } from '@angular/http';
import { Injectable } from '@angular/core';
import { DataService } from './dataService';
import { Registration } from '../domain/registration';
import { User } from '../domain/user';

//A class to manage user authentication
//uses local storage to save user authentication cookies

@Injectable()
export class MembershipService {

    private accountRegisterAPI: string = 'api/account/register/';
    private accountLoginAPI: string = 'api/account/authenticate/';
    private accountLogoutAPI: string = 'api/account/logout/';

    //inject data service
    constructor(public accountService: DataService) { }

    register(newUser: Registration) {

        this.accountService.set(this.accountRegisterAPI);
        
        return this.accountService.post(JSON.stringify(newUser));
    }

    login(creds: User) {
        this.accountService.set(this.accountLoginAPI);
        return this.accountService.post(JSON.stringify(creds));
    }

    logout() {
        this.accountService.set(this.accountLogoutAPI);
        return this.accountService.post(null, false);
    }

    isUserAuthenticated(): boolean {
        var user: User = localStorage.getItem('user');
        if (user != null)
            return true;
        else
            return false;
    }

    getLoggedInUser(): User {
        var user: User;

        if (this.isUserAuthenticated()) {
            var userData = JSON.parse(localStorage.getItem('user'));
            user = new User(userData.Username, userData.Password);
        }

        return user;
    }
}