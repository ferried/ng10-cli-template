/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-12-09 11:48:48
 * @LastEditTime: 2020-12-09 16:05:20
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /yunzai-charts/projects/yunzai-g2-charts/src/lib/yunzai-g2-charts.component.ts
 * @LICENSE: Apache-2.0
 */
import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import { PieInterface } from './pipe.interface';
import { Chart } from '@antv/g2'
import { URL_VALUE } from './url.token';

@Component({
  selector: 'lib-yunzai-g2-charts',
  template: `
  <div id={{id}}></div>
  `,
  styles: [
  ]
})
export class YunzaiG2ChartsComponent implements AfterViewInit {

  constructor(
    @Inject(URL_VALUE) private uv: any,
  ) { }
  ngAfterViewInit(): void {
    alert(this.uv.url)
    if (document.getElementById(this.id)) {

      let lastItem: any;
      function updateAnnotation(data: any) {
        if (data.item !== lastItem) {
          chart.annotation().clear(true);
          chart
            .annotation()
            .text({
              position: ['50%', '50%'],
              content: data.item,
              style: {
                fontSize: 20,
                fill: '#8c8c8c',
                textAlign: 'center',
              },
              offsetY: -20,
            })
            .text({
              position: ['50%', '50%'],
              content: data.count,
              style: {
                fontSize: 28,
                fill: '#8c8c8c',
                textAlign: 'center',
              },
              offsetX: -10,
              offsetY: 20,
            })
            .text({
              position: ['50%', '50%'],
              content: '台',
              style: {
                fontSize: 20,
                fill: '#8c8c8c',
                textAlign: 'center',
              },
              offsetY: 20,
              offsetX: 20,
            });
          chart.render(true);
          lastItem = data.item;
        }
      }

      // 清空 annotation
      function clearAnnotation() {
        chart.annotation().clear(true);
        chart.render(true);
        lastItem = null;
      }
      const chart = new Chart({
        container: this.id,
        autoFit: true,
        height: 500,
      });
      chart.coordinate('theta', {
        radius: 0.75,
        innerRadius: 0.5,
      });

      chart.data(this.data);

      chart.scale('percent', {
        formatter: val => {
          val = val * 100 + '%';
          return val;
        },
      });

      chart.tooltip(false);

      // 声明需要进行自定义图例字段： 'item'
      chart.legend('item', {
        position: 'right',                                  // 配置图例显示位置
        custom: true,                                       // 关键字段，告诉 G2，要使用自定义的图例
        items: this.data.map((obj, index) => {
          return {
            name: obj.item,                                 // 对应 itemName
            value: obj.percent,                             // 对应 itemValue
            marker: {
              symbol: 'square',                             // marker 的形状
              style: {
                r: 5,                                       // marker 图形半径
                fill: chart.getTheme().colors10[index],     // marker 颜色，使用默认颜色，同图形对应
              },
            },                                              // marker 配置
          };
        }),
        itemValue: {
          style: {
            fill: '#999',
          },                                               // 配置 itemValue 样式
          formatter: (val: any) => `${val * 100}%`                // 格式化 itemValue 内容
        },
      });

      chart
        .interval()
        .adjust('stack')
        .position('percent')
        .color('item')
        .style({
          fillOpacity: 1,
        })
        .state({
          active: {
            style: element => {
              const shape = element.shape;
              return {
                lineWidth: 10,
                stroke: shape.attr('fill'),
                strokeOpacity: shape.attr('fillOpacity'),
              };
            },
          },
        });

      // 移除图例点击过滤交互
      chart.removeInteraction('legend-filter');
      chart.interaction('element-active');

      chart.render();

      // 监听 element 上状态的变化来动态更新 Annotation 信息
      chart.on('element:statechange', (ev: any) => {
        const { state, stateStatus, element } = ev.gEvent.originalEvent;

        // 本示例只需要监听 active 的状态变化
        if (state === 'active') {
          const data = element.getData();
          if (stateStatus) {
            // 更新 Annotation
            updateAnnotation(data);
          } else {
            // 隐藏 Annotation
            clearAnnotation();
          }
        }
      });
    }
  }

  @Input()
  id: string = "simpleId";

  @Input()
  data: Array<PieInterface> = []

  ngOnInit(): void {
    console.log(this.id)
    console.log(this.data)
  }

}
