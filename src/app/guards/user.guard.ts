/*
* @Author: Nathan Grove
* @Date:   2017-07-13 21:43:08
* @Last Modified by:   Nathan Grove
* @Last Modified time: 2017-07-13 23:38:05
*/

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
    console.log("user authservice");
    if (this.authService.isLoggedIn()){
      return true;
    } else {
      this.router.navigate(['login']);
    }
  }

  canDeactivate(){
    return this.authService.isLoggedIn();
  }
}