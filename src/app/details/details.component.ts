import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ImgService } from '../img.service';
import { ImgInfo } from '../imginterface';
import { ImglistdataService } from '../imglistdata.service';
import { ReloadService } from '../reload.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public id: string;
  public image: ImgInfo;
  public name: string;

  constructor(
    private route: ActivatedRoute,
    public imgService: ImgService,
    private location: Location,
    public imglistdataService: ImglistdataService,
    public reload: ReloadService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.imgService.images) {
      this.image = this.imgService.images.find(x => x.id === this.id)
      setTimeout(() => window.scrollTo(0, this.reload.y), 0);
      this.imglistdataService.detailsId = this.image.id
    }
    else {
      this.imgService.getEverythingSub().subscribe(
        (res) => {
          this.image = res['images'].find(x => x.id === this.id)
          setTimeout(() => window.scrollTo(0, this.reload.y), 0);
          this.imglistdataService.detailsId = this.image.id
        }
      )
    }
  }
  
  goBack(): void {
    this.location.back();
  }

  add(isPack: boolean): void {
    let name = prompt(`enter ${isPack ? 'pack' : 'category'} name:`, '')
    if(name !== null) {
      if(!name)
        name = 'not set yet'
      if(!(name = name.trim()))
        name = 'not set yet'
      this.imgService.add(this.image.id, name, isPack)
    }
  }

  save() {
    this.imgService.edit(this.image.id, 'image', this.image.name)
  }

  copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.imglistdataService.copiedId = str
  };

  delete(): void {
    if(confirm(`Are you SURE you want to delete image "${this.image.name}"?`)) {
      this.imgService.delete(this.image.id, 'image')
      this.goBack()
    }
  }
}
