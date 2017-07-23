import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(
    private router: Router
  ) { 
  }

  getProfile(){
     let profile = localStorage.getItem('profile');
     if (profile) profile = JSON.parse(profile);
     return profile;
  }
  
  isLoggedIn(){
    return this.getProfile() ? true : false;
  }

  isAdmin(){
    let profile = this.getProfile();
    return (profile && profile['admin']) ? true : false;
  }

  logout(){
    delete localStorage['profile'];
    this.router.navigate(['login']);
  }

}
