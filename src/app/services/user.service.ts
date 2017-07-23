import { Injectable } from '@angular/core';
import { HttpClient } from '../services/http-client.service';
import { User } from '../classes/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {

  // data
  data: User[] = [];
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(
    private http: HttpClient
  ) { 
    this.get();
  }

  // implement the connect method for cdk
  public connect(): Observable<User[]> {  return this.dataChange; }
  // implement disconnect for cdk - no-op
  public disconnect(): void { return; }

  public get() {
    this.http.get(`${localStorage.api}/users`).subscribe( res => {
      let users = res.json().map( user => new User(user._id,user.username,user.active,user.created,user.admin)).sort( (a,b) => {
        if (a.username < b.username) return -1;
        if (a.username > b.username) return 1;
        return 0;
      });
      this.data = users;
      this.dataChange.next(users);
    })
  }


  public save(user: any){
    let saveable = user.toSaveObject();
    if (user._id == 'new'){
      return this.http.post(`${localStorage.api}/users`,saveable);
    } else {
      return this.http.put(`${localStorage.api}/users/${user._id}`,saveable);
    }
  }

  public delete(_id: string){
    this.http.delete(`${localStorage.api}/users/${_id}`).subscribe( () => this.get() );
  }


}
