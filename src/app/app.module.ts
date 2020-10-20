import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ImglistComponent } from './imglist/imglist.component';
import { AppRoutingModule } from './app-routing.module';
import { DetailsComponent } from './details/details.component';
import { PackscategoriescontainerComponent } from './packscategoriescontainer/packscategoriescontainer.component';
import { SizeButtonsComponent } from './size-buttons/size-buttons.component';
import { EmptyComponentComponent } from './empty-component/empty-component.component';
import { ContainerlistComponent } from './containerlist/containerlist.component';
import { AllunspecifiedviewComponent } from './allunspecifiedview/allunspecifiedview.component';
import { PackCategoryViewComponent } from './pack-category-view/pack-category-view.component';
import { LoginpageComponent } from './loginpage/loginpage.component';

@NgModule({
  declarations: [
    AppComponent,
    ImglistComponent,
    DetailsComponent,
    PackscategoriescontainerComponent,
    SizeButtonsComponent,
    EmptyComponentComponent,
    ContainerlistComponent,
    AllunspecifiedviewComponent,
    PackCategoryViewComponent,
    LoginpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
