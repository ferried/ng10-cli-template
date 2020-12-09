/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-12-09 11:48:48
 * @LastEditTime: 2020-12-09 16:05:59
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /yunzai-charts/projects/yunzai-g2-charts/src/lib/yunzai-g2-charts.module.ts
 * @LICENSE: Apache-2.0
 */
/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-12-09 11:48:48
 * @LastEditTime: 2020-12-09 13:18:43
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /yunzai-charts/projects/yunzai-g2-charts/src/lib/yunzai-g2-charts.module.ts
 * @LICENSE: Apache-2.0
 */
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { URL_VALUE } from './url.token';
import { YunzaiG2ChartsComponent } from './yunzai-g2-charts.component';



@NgModule({
  declarations: [YunzaiG2ChartsComponent],
  imports: [],
  exports: [YunzaiG2ChartsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YunzaiG2ChartsModule {
  public static forRoot(p: any) {
    return {
      ngModule: YunzaiG2ChartsModule,
      providers: [
        { provide: URL_VALUE, useValue: p }
      ]
    }
  }
}
