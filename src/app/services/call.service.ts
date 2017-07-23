import { Injectable } from '@angular/core';
import { HttpClient } from '../services/http-client.service';
import { Call } from '../classes/call';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CallService {

  // data
  data: Call[] = [];
  dataChange: BehaviorSubject<Call[]> = new BehaviorSubject<Call[]>([]);

  constructor(
    private http: HttpClient
  ) { 
    this.get();
  }


  // implement the connect method for cdk
  public connect(): Observable<Call[]> {  return this.dataChange; }
  // implement disconnect for cdk - no-op
  public disconnect(): void { return; }

  public get() {
    this.http.get(`${localStorage.api}/mycalls`).subscribe( res => {
      console.log(res.json());
      let calls = res.json().map( c => new Call(c._id,c.runs,c.crashes,c.last,c.created,c.active,c.name)).sort( (a,b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      this.data = calls;
      this.dataChange.next(calls);
    })
  }


  public save(call: any){
    if (call._id == 'new'){
      return this.http.post(`${localStorage.api}/mycalls`,call.toSaveObject());
    } else {
      return this.http.put(`${localStorage.api}/mycalls/${call._id}`,call.toSaveObject());
    }
  }

  public delete(_id: string){
    this.http.delete(`${localStorage.api}/mycalls/${_id}`).subscribe( () => this.get() );
  }


}
