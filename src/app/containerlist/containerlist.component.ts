import { Component, Input, OnInit } from '@angular/core';
import { ImglistdataService } from '../imglistdata.service'
import { ImgService } from '../img.service';

@Component({
  selector: 'app-containerlist',
  templateUrl: './containerlist.component.html',
  styleUrls: ['./containerlist.component.css']
})
export class ContainerlistComponent implements OnInit {
  @Input() images;
  @Input() type;
  @Input() detImage;
  count: number;
  borders = {};

  packs;
  categories;

  constructor(
      public list: ImglistdataService,
      public imgService: ImgService
    ) { 
    this.count = Math.floor(100/this.list.amount*1000000)/1000000
  }

  ngOnInit(): void {
    if(this.imgService.images) {
      switch(this.type) {
        case 'cat':
          this.images = this.imgService.categories
          break;
        case 'pack':
          this.images = this.imgService.packs
          break;
      }
      this.borderize()
    }
    else {
      if(!this.type)
        this.type = 'cat'
      this.imgService.getEverythingSub().subscribe(
        (res) => {
          switch(this.type) {
            case 'cat':
              this.images = res['categories']
              break;
            case 'pack':
              this.images = res['packs']
              break;
          }
          this.borderize()
        }
      )
    }
    

  }

  borderize() {
    for(let img of this.images) {
      this.borders[img.id] = this.checkIfContains(img.images, this.detImage.id)
    }
  }

  elementClick(id: string) {
    if(id != 'nope')
      this.imgService.memberupdate(this.list.detailsId, this.type, id)
    else
      this.imgService.memberupdate(this.list.detailsId, this.type)
  }

  checkIfContains(list, imageid): boolean {
    for(let image of list)
      if(image.id == imageid)
        return true
    return false
  }

  updateCount(arg) {
    if(arg <= 10 && arg >= 1) {
      this.list.amount = arg
    }
    this.count = Math.floor(100/this.list.amount*1000000)/1000000
  }

}
