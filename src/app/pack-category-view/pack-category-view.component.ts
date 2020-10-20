import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ImgService } from '../img.service';
import { ImglistdataService } from '../imglistdata.service'
import { ReloadService } from '../reload.service'

@Component({
  selector: 'app-pack-category-view',
  templateUrl: './pack-category-view.component.html',
  styleUrls: ['./pack-category-view.component.css']
})
export class PackCategoryViewComponent implements OnInit {
  public container;
  public id: string;
  public type;
  private pluralType;

  constructor(
    private route: ActivatedRoute,
    private imgService: ImgService,
    private location: Location,
    public imglistdataService: ImglistdataService,
    private reloadService: ReloadService
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('id1')
    if(this.type == 'category')
      this.pluralType = 'categories'
    else
      this.pluralType = 'packs'
    this.id = this.route.snapshot.paramMap.get('id2');

    if(this.imgService.categories) {
      this.container = this.imgService[this.pluralType].find(x => x.id === this.id)
      setTimeout(() => window.scrollTo(0, this.reloadService.y), 0);
    }
    else {
      this.imgService.getEverythingSub().subscribe(
        (res) => {
          this.container = res[this.pluralType].find(x => x.id === this.id)
          setTimeout(() => window.scrollTo(0, this.reloadService.y), 0);
        }
      )
    }
  }

  goBack(): void {
    this.location.back();
  }

  changeImage(): void {
    let id = this.imglistdataService.copiedId
    if(id = (prompt('Enter new image id:', id ? id : '')))
      this.imgService.edit(this.container.id, this.type, undefined, id)
  }

  delete(): void {
    if(confirm(`Are you SURE you want to delete ${this.type} "${this.container.name}"?`)) {
      this.imgService.delete(this.container.id, this.type == 'category' ? 'cat' : 'pack')
      this.goBack()
    }
  }

  save() {
    this.imgService.edit(this.container.id, this.type, this.container.name)
  }

}