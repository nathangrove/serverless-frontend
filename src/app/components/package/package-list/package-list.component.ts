import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../../services/package.service';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {

  constructor(
    public packageService: PackageService
  ) { }

  ngOnInit() {
    this.packageService.get();
  }

}
