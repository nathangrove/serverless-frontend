import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { PackageService } from '../../../services/package.service';
import { Pkg } from '../../../classes/package';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.css']
})
export class PackageDetailComponent implements OnInit {

  pkg: Pkg;
  subs: any = [];

  constructor(
    private snackBar: MdSnackBar,
    private packageService: PackageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    // wait for a route param and the packageservice to be ready
    this.subs.push(Observable.combineLatest(
      this.route.params,
      this.packageService.dataChange,
      (p,d) => p
    ).subscribe( params => {
      if (!params) return;
      let id = params.id;
      if (id == 'new') this.pkg = new Pkg('new');
      else this.pkg = this.packageService.data.find( c => c._id == id );
      if (!this.pkg) this.router.navigate(['/admin/packages']); 
    }));

  }

  ngOnDestroy(){
    this.subs.forEach( sub => sub.unsubscribe() );
  }


  save(){
    this.packageService.save(this.pkg).subscribe( (pkg) => {
      this.router.navigate(['/packages']);
      this.snackBar.open('The package has been saved.','Done');
    }, (err) => {
      this.snackBar.open(err._body,'Fix it');
    });

  }

}
