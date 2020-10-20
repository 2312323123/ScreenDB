import { Component, OnInit } from '@angular/core';
import { ImglistdataService } from '../imglistdata.service'
import { ImgService } from '../img.service'

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-allunspecifiedview',
  templateUrl: './allunspecifiedview.component.html',
  styleUrls: ['./allunspecifiedview.component.css']
})
export class AllunspecifiedviewComponent implements OnInit {
  path: string;

  nope

  constructor(
    public imglistdataService: ImglistdataService,
    private location: Location,
    public imgService: ImgService
  ) { }

  ngOnInit(): void {
    this.path = window.location.pathname.substr(1)
    if(this.path == 'unspecified')
      this.nope = this.imgService.categories.find(x => x.id === 'nope')
  }

  back(): void {
    this.location.back();
  }
}
