import { Component, OnInit } from '@angular/core';
import { CallService } from '../../../services/call.service';

@Component({
  selector: 'app-call-list',
  templateUrl: './call-list.component.html',
  styleUrls: ['./call-list.component.css']
})
export class CallListComponent implements OnInit {

  constructor(
    public callService: CallService
  ) { }

  ngOnInit() {
    this.callService.get();
  }

}
