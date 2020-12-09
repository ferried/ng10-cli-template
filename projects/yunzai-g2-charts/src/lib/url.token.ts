/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-12-09 14:14:12
 * @LastEditTime: 2020-12-09 14:14:34
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /yunzai-charts/projects/yunzai-g2-charts/src/lib/url.token.ts
 * @LICENSE: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

export const URL_VALUE = new InjectionToken<{ url: string }>('URL_VALUE')