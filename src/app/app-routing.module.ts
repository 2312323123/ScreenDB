import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackCategoryViewComponent } from './pack-category-view/pack-category-view.component';
import { EmptyComponentComponent } from './empty-component/empty-component.component';
import { DetailsComponent } from './details/details.component';
import { PackscategoriescontainerComponent } from './packscategoriescontainer/packscategoriescontainer.component';
import { AllunspecifiedviewComponent } from './allunspecifiedview/allunspecifiedview.component'
import { LoginpageComponent } from './loginpage/loginpage.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginpageComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: ':id1/:id2', component: PackCategoryViewComponent },
  { path: 'categories', component: PackscategoriescontainerComponent },
  { path: 'packs', component: PackscategoriescontainerComponent },
  { path: 'nothing', component: EmptyComponentComponent},
  { path: 'all', component: AllunspecifiedviewComponent},
  { path: 'unspecified', component: AllunspecifiedviewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }