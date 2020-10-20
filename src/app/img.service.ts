import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ImgInfo } from './imginterface';
import { ReloadService } from './reload.service'
import { Server } from './server'

import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ImgService {
  // baseUrl = `${Server.basepath}api`;
  // imageUrl = `${Server.basepath}api/images`;
  baseUrl = `${Server.basepath}api/v1`;
  imageUrl = `${Server.basepath}api/v1/images`;
  public images: ImgInfo[];
  public categories;
  public packs;
  public string: string;
                  
  constructor(private http: HttpClient,
    private reloadService: ReloadService,
    private router: Router,
    private location: Location) { 
    this.getEverything()
  }
                  
  getEverything(): void {
    this.GetAll().subscribe(
      (res) => {
        this.images = res['images']
        this.categories = res['categories']
        this.packs = res['packs']
        this.reloadService.reload()
      }
    )
  }

  getEverythingSub(): Observable<any> {
    return this.GetAll()
  }

  GetAll() {
    return this.http.get(`${this.baseUrl}/getEverything`).pipe(
      map((res) => {
        let tmp = res
        tmp['images'] = tmp['images'].map(x => this.replaceUrl(x))
        tmp['categories'] = tmp['categories'].map(x => this.replaceUrl(x))
        tmp['categories'] = tmp['categories'].map(x => {
          let y = x
          y['images'] = y.images.map(x => this.replaceUrl(x))
          return y
        })
        tmp['packs'] = tmp['packs'].map(x => this.replaceUrl(x))
        tmp['packs'] = tmp['packs'].map(x => {
          let y = x
          y['images'] = y.images.map(x => this.replaceUrl(x))
          return y
        })
        this.images = tmp['images']
        this.categories = tmp['categories']
        this.packs = tmp['packs']
        return res
    }),
    catchError(this.handleError));
  }

  replaceUrl(obj: ImgInfo) {
    let y = obj
    y.url = `${this.imageUrl}/${obj.url}`
    return y
  }

  add(id: string, name: string, isPack: boolean) {
    if(this.string) {
      let obj
      if(isPack)
        obj = { string: this.string, pack: id, name: name }
      else
        obj = { string: this.string, cat: id, name: name }
      this.http.put(`${this.baseUrl}/add`, obj).subscribe(
        () => {
          this.getEverything()
        })
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    return throwError('Error! something went wrong.');
  }

  edit(id: string, type: string, name?: string, newid?: string) {
    if(this.string) {
      let obj = {
        ...({string: this.string}),
        ...({id: id}),
        ...(type == 'image' && {image: true}),
        ...(type == 'category' && {cat: true}),
        ...(type == 'pack' && {pack: true}),
        ...(Boolean(name) && {name: name}),
        ...(Boolean(newid) && {newid: newid})
      }
      this.http.post(`${this.baseUrl}/edit`, obj).subscribe(
        () => {
          this.getEverything()
          if(newid)
            this.reloadService.changeRoute(`/${type}/${newid}`)
        })
      }
  }

  delete(id: string, type: string) {
    if(this.string) {
      let obj = {
        ...({string: this.string}),
        ...({id: id}),
        ...(type == 'image' && {image: true}),
        ...(type == 'cat' && {cat: true}),
        ...(type == 'pack' && {pack: true})
      }
      this.http.post(`${this.baseUrl}/delete`, obj).subscribe(
        () => {
          this.getEverything()
        })
    }
  }

  memberupdate(id: string, type: string, parentid?: string) {
    if(this.string) {
      let obj = {
        ...({string: this.string}),
        ...({id: id}),
        ...(type == 'cat' && {cat: true}),
        ...(type == 'pack' && {pack: true}),
        ...(Boolean(parentid) && {parentid: parentid})
      }
      this.http.post(`${this.baseUrl}/memberupdate`, obj).subscribe(
        () => {
          this.getEverything()
        })
    }
  }

  access(p: string) {
    this.string = p+'41220cb4326079f231ac3ca5a0389da3'
    let obj = {
      ...({string: p+'41220cb4326079f231ac3ca5a0389da3'})
    }
    this.http.post(`${this.baseUrl}/makestuffaccessible`, obj).subscribe(
      res => {
        // alert(res['response'])
        if(res['response'] == "correct password, feel free to do stuff") {
          this.router.navigate(['packs']);
          this.location.replaceState('packs');
        }
      })
  }
}