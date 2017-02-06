import { ElementRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
export declare class PieGridComponent extends BaseChartComponent {
    dims: ViewDimensions;
    data: any[];
    transform: string;
    series: any[];
    domain: any[];
    colorScale: ColorHelper;
    margin: number[];
    constructor(chartElement: ElementRef, zone: NgZone, cd: ChangeDetectorRef, location: Location);
    update(): void;
    getTooltipText(label: any, val: any): string;
    getDomain(): any[];
    getSeries(): any[];
    getTotal(): any;
    onClick(data: any): void;
    setColors(): void;
}
