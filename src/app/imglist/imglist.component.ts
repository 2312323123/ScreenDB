import { Component, Input, OnInit } from '@angular/core';
import { ImglistdataService } from '../imglistdata.service'

@Component({
  selector: 'app-imglist',
  templateUrl: './imglist.component.html',
  styleUrls: ['./imglist.component.css']
})
export class ImglistComponent implements OnInit {
  @Input() images;
  @Input() type;
  count: number;

  constructor(public list: ImglistdataService) { 
    this.count = Math.floor(100/this.list.amount*1000000)/1000000
  }

  ngOnInit(): void {
  }

  updateCount(arg) {
    if(arg <= 10 && arg >= 1) {
      this.list.amount = arg
    }
    this.count = Math.floor(100/this.list.amount*1000000)/1000000
  }

}
