"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var chart_common_module_1 = require("../common/chart-common.module");
var bubble_chart_component_1 = require("./bubble-chart.component");
exports.BubbleChartComponent = bubble_chart_component_1.BubbleChartComponent;
var bubble_series_component_1 = require("./bubble-series.component");
exports.BubbleSeriesComponent = bubble_series_component_1.BubbleSeriesComponent;
var BubbleChartModule = (function () {
    function BubbleChartModule() {
    }
    return BubbleChartModule;
}());
BubbleChartModule = __decorate([
    core_1.NgModule({
        imports: [chart_common_module_1.ChartCommonModule],
        declarations: [
            bubble_chart_component_1.BubbleChartComponent,
            bubble_series_component_1.BubbleSeriesComponent
        ],
        exports: [
            bubble_chart_component_1.BubbleChartComponent,
            bubble_series_component_1.BubbleSeriesComponent
        ]
    })
], BubbleChartModule);
exports.BubbleChartModule = BubbleChartModule;
//# sourceMappingURL=bubble-chart.module.js.map