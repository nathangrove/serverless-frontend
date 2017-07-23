import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  server: string = localStorage.api;
  error: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: Http
  ) { 
    if (this.authService.isLoggedIn()) this.router.navigate(['/']);
  }

  ngOnInit() {
  }

  login(){
    localStorage['api'] = this.server;
    this.http.post(`${localStorage.api}/login`,{ username: this.username, password: this.password }).subscribe( response => {
      let result = response.json();
      if (!result.token) this.error = response.toString();
      else {
        this.error = '';
        localStorage.setItem('token',result.token);
        localStorage.setItem('profile',atob(result.token.split('.')[1]));
        this.router.navigate(['/']);
      }
    })
  }

}
