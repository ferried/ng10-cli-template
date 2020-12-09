/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-12-09 15:29:17
 * @LastEditTime: 2020-12-09 15:30:32
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /yunzai-charts/projects/yunzai-g2-charts/src/schematics/ng-add/files/app/app.module.ts
 * @LICENSE: Apache-2.0
 */
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YunzaiG2ChartsModule } from 'yunzai-g2-charts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YunzaiG2ChartsModule.forRoot({ url: <%= "'"+url+"'" %> })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
