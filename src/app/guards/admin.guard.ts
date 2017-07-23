/*
* @Author: Nathan Grove
* @Date:   2017-07-13 21:43:08
* @Last Modified by:   Nathan Grove
* @Last Modified time: 2017-07-13 22:42:35
*/

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) {}

  canActivate() {
    return this.authService.isLoggedIn() && this.authService.isAdmin();
  }
}