import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { UserService } from '../../../services/user.service';
import { User } from '../../../classes/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User;
  subs: any = [];

  constructor(
    private snackBar: MdSnackBar,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    // wait for a route param and the userservice to be ready
    this.subs.push(Observable.combineLatest(
      this.route.params,
      this.userService.dataChange,
      (p,d) => d.length > 0 ? p : false
    ).subscribe( params => {
      if (!params) return;
      let id = params.id;
      if (id == 'new') this.user = new User('new','',true);
      else this.user = this.userService.data.find( c => c._id == id );
      if (!this.user) this.router.navigate(['/admin/users']); 
    }));

  }

  ngOnDestroy(){
    this.subs.forEach( sub => sub.unsubscribe() );
  }


  save(){
    this.userService.save(this.user).subscribe( (user) => {
      this.router.navigate(['/admin/users']);
      this.snackBar.open('The user has been saved.','Done');
    }, (err) => {
      this.snackBar.open(err._body,'Fix it');
    });

  }

}
