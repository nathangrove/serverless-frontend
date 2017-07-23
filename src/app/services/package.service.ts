import { Injectable } from '@angular/core';
import { HttpClient } from '../services/http-client.service';
import { Pkg } from '../classes/package';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PackageService {

  // data
  data: Pkg[] = [];
  dataChange: BehaviorSubject<Pkg[]> = new BehaviorSubject<Pkg[]>([]);

  constructor(
    private http: HttpClient
  ) { 
    this.get();
  }

  // implement the connect method for cdk
  public connect(): Observable<Pkg[]> {  return this.dataChange; }
  // implement disconnect for cdk - no-op
  public disconnect(): void { return; }

  public get() {
    this.http.get(`${localStorage.api}/packages`).subscribe( res => {
      let packages = res.json().map( pkg => new Pkg(pkg._id,pkg.name,pkg.version,pkg.created)).sort( (a,b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      this.data = packages;
      this.dataChange.next(packages);
    })
  }


  public save(pkg: any){
    let saveable = pkg.toSaveObject();
    if (pkg._id == 'new'){
      return this.http.post(`${localStorage.api}/packages`,saveable);
    } else {
      return this.http.put(`${localStorage.api}/packages/${pkg._id}`,saveable);
    }
  }

  public delete(_id: string){
    this.http.delete(`${localStorage.api}/packages/${_id}`).subscribe( () => this.get() );
  }


}
