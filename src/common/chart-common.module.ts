import { NgModule } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

import { ChartComponent } from './charts/chart.component';
import { LegendComponent } from './legend/legend.component';
import { ScaleLegendComponent } from './legend/scale-legend.component';
import { LegendEntryComponent } from './legend/legend-entry.component';
import { AdvancedLegendComponent } from './legend/advanced-legend.component';

import { BaseChartComponent } from './base-chart.component';
import { AxesModule } from './axes/axes.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { CircleSeriesComponent } from './circle-series.component';
import { CircleComponent } from './circle.component';
import { GridPanelComponent } from './grid-panel.component';
import { GridPanelSeriesComponent } from './grid-panel-series.component';
import { SvgLinearGradientComponent } from './svg-linear-gradient.component';
import { SvgRadialGradientComponent } from './svg-radial-gradient.component';
import { Timeline } from './timeline/timeline.component';
import { CommonModule } from '@angular/common';
import { AreaComponent } from './area.component';
import { AreaTooltip } from './area-tooltip.component';
import { CountUpDirective } from './count/count.directive';

const COMPONENTS = [  
  AreaComponent,
  BaseChartComponent,
  CountUpDirective,
  AreaTooltip,
  ChartComponent,
  LegendComponent,
  LegendEntryComponent,
  ScaleLegendComponent,
  CircleComponent,
  CircleSeriesComponent,
  GridPanelComponent,
  GridPanelSeriesComponent,
  SvgLinearGradientComponent,
  SvgRadialGradientComponent,
  Timeline,
  AdvancedLegendComponent
];

@NgModule({
  providers: [
    Location, 
    {
      provide: LocationStrategy, 
      useClass: PathLocationStrategy
    }
  ],
  imports: [
    CommonModule,
    AxesModule,
    TooltipModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    CommonModule,
    AxesModule,
    TooltipModule,
    ...COMPONENTS
  ]
})
export class ChartCommonModule { }
