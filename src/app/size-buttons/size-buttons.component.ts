import { Component, OnInit } from '@angular/core';
import { ImglistdataService } from '../imglistdata.service'
import { ActivatedRoute } from '@angular/router';
import { ReloadService } from '../reload.service'

@Component({
  selector: 'app-size-buttons',
  templateUrl: './size-buttons.component.html',
  styleUrls: ['./size-buttons.component.css']
})
export class SizeButtonsComponent implements OnInit {
  count: number
  path: string

  constructor(
    public list: ImglistdataService,
    private route: ActivatedRoute,
    private reload: ReloadService
    ) { 
    this.count = Math.floor(100/this.list.amount*1000000)/1000000
  }

  ngOnInit(): void {
    setTimeout(() => window.scrollTo(0, this.reload.y), 0);
    if(!this.list.defined)
      this.list.amount = Math.trunc(window.innerWidth / 200) + 1
    this.list.defined = true
  }

  updateCount(arg) {
    if(arg <= 20 && arg >= 1) {
      this.list.amount = arg
    }
    this.count = Math.floor(100/this.list.amount*1000000)/1000000

    this.route.url
      .subscribe( url => this.path = url.toString() )
      
    this.reload.reload(true)
  }

}
