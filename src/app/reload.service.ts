import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ReloadService {
  count: number
  path: string
  public y: number;
  
  private goingBack: boolean = false;
  private iterations: number;
  private previousUrls: string[] = [];

  constructor(
    private router: Router,
    // private route: ActivatedRoute,
    private location: Location
    ) { }

  reload(sizeReload = false) {
    this.path = this.location.path()
    this.y = window.scrollY
    this.router.navigateByUrl('/nothing', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${this.path}`]);
    });
  }

  changeRoute(route) {
    this.router.navigate([route]);
    this.location.replaceState(route);
  }
}
