import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { CallService } from '../../../services/call.service';
import { Call } from '../../../classes/call';

@Component({
  selector: 'app-call-detail',
  templateUrl: './call-detail.component.html',
  styleUrls: ['./call-detail.component.css']
})
export class CallDetailComponent implements OnInit {

  call: Call;
  code: string = 'module.exports = function(request,response){\n  \/\/Implement call response here.\n};';
  subs: any = [];

  codemirrorconfig: any = {
    mode: "javascript",
    theme: "monokai",
    lineNumbers: true,
    tabSize: 2
  };

  constructor(
    private snackBar: MdSnackBar,
    private callService: CallService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    // wait for a route param and the callservice to be ready
    this.subs.push(Observable.combineLatest(
      this.route.params,
      this.callService.dataChange,
      (p,d) => p
    ).subscribe( params => {
      if (!params) return;
      let id = params.id;
      if (id == 'new') this.call = new Call('new');
      else this.call = this.callService.data.find( c => c._id == id );
      if (!this.call) this.router.navigate(['/calls']); 
    }));

  }

  ngOnDestroy(){
    this.subs.forEach( sub => sub.unsubscribe() );
  }


  save(){
    if (this.call._id == 'new') this.call.code = this.code;

    this.callService.save(this.call).subscribe( (encryptedCode) => {
      if (encryptedCode.text() !== '') this.call.encryptedCode = encryptedCode.text();
      else this.router.navigate(['/calls']);
      this.snackBar.open('The call has been saved.','Done');
    }, (err) => {
      this.snackBar.open(err._body,'Fix it');
    });

  }

}
