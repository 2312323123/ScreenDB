import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImglistdataService {
  public amount: number = 3;
  public defined: boolean = false;
  public search: string = '';
  public showingPacks: boolean = true;
  public detailsId: string;
  public copiedId: string;

  constructor() { }
}
