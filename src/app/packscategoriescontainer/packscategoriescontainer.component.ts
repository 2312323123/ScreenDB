import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImglistdataService } from '../imglistdata.service'
import { ReloadService } from '../reload.service'
import { ImgService } from '../img.service'
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Server } from '../server'



@Component({
  selector: 'app-packscategoriescontainer',
  templateUrl: './packscategoriescontainer.component.html',
  styleUrls: ['./packscategoriescontainer.component.css']
})
export class PackscategoriescontainerComponent implements OnInit {
  public route: String
  public urlValue: string = '';
  public cat: string = 'cat';
  public pack: string = 'pack';
  @ViewChild('url') urlInputField;
  @ViewChild('fileform') fileForm;
  public element;
  public form;

  constructor(
    private activatedRoute: ActivatedRoute,
    public imglistdataService: ImglistdataService,
    public reload: ReloadService,
    public imgService: ImgService,
    private http: HttpClient,
    public router: Router,
    public location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.url
      .subscribe(url => this.route = url.toString())
    this.imglistdataService.search = ''
  }
  ngAfterViewInit() {
    this.element = this.urlInputField.nativeElement
    this.form = this.fileForm.nativeElement
  }

  urlInput() {
    if(this.imgService.string) {
      let res  = prompt('enter the url: ')
      this.urlValue = res
      setTimeout(() => {
        if(Boolean(res)) {
          res = res.trim()
          if(res) {
            let heh = new XMLHttpRequest()
            heh.onreadystatechange = () => {
              if(heh.readyState == 4 && heh.status == 200) {
                  this.imgService.getEverything()
              }
            }
            // heh.open("POST", `${Server.basepath}api/multiplefiles2`, true)
            heh.open("POST", `${Server.basepath}api/v1/multiplefiles2`, true)
            heh.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            heh.send(`url=${this.element.value}&string=${this.imgService.string}`); 
          }
        }
      }, 0)
    }
  }

  getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  multipleFileSubmit() {
    if(this.imgService.string) {
      let heh = new XMLHttpRequest()
      let ojej = new FormData(this.form)
      ojej.append('string', this.imgService.string);
      heh.onreadystatechange = () => {
        if(heh.readyState == 4 && heh.status == 200) {
          this.imgService.getEverything()
        }
      }
      // heh.open("POST", `${Server.basepath}api/multiplefiles2`, true)
      heh.open("POST", `${Server.basepath}api/v1/multiplefiles2`, true)
      heh.send(ojej);
    }
  }

  packClick() {
    this.router.navigate(['packs']);
    this.location.replaceState('packs');
  }

  catClick() {
    this.router.navigate(['categories']);
    this.location.replaceState('categories');
  }

  random() {
    var randomURL = this.imgService.images[Math.floor(Math.random()*this.imgService.images.length)].id;
    this.router.navigate([`details/${randomURL}`]);
  }

}
