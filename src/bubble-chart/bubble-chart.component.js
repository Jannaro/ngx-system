"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var base_chart_component_1 = require("../common/base-chart.component");
var d3_1 = require("../d3");
var view_dimensions_helper_1 = require("../common/view-dimensions.helper");
var color_helper_1 = require("../common/color.helper");
var BubbleChartComponent = (function (_super) {
    __extends(BubbleChartComponent, _super);
    function BubbleChartComponent(chartElement, zone, cd, location) {
        var _this = _super.call(this, chartElement, zone, cd, location) || this;
        _this.view = [400, 400];
        _this.showGridLines = true;
        _this.legend = false;
        _this.xAxis = true;
        _this.yAxis = true;
        _this.roundDomains = false;
        _this.maxRadius = 10;
        _this.minRadius = 3;
        _this.schemeType = 'ordinal';
        _this.activate = new core_1.EventEmitter();
        _this.deactivate = new core_1.EventEmitter();
        _this.scaleType = 'linear';
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.activeEntries = [];
        return _this;
    }
    BubbleChartComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showXAxis: _this.xAxis,
                showYAxis: _this.yAxis,
                xAxisHeight: _this.xAxisHeight,
                yAxisWidth: _this.yAxisWidth,
                showXLabel: _this.showXAxisLabel,
                showYLabel: _this.showYAxisLabel,
                showLegend: _this.legend,
                legendType: _this.schemeType
            });
            _this.seriesDomain = _this.results.map(function (d) { return d.name; });
            _this.rDomain = _this.getRDomain();
            _this.xDomain = _this.getXDomain();
            _this.yDomain = _this.getYDomain();
            _this.transform = "translate(" + _this.dims.xOffset + "," + _this.margin[0] + ")";
            var colorDomain = _this.schemeType === 'ordinal' ? _this.seriesDomain : _this.rDomain;
            _this.colors = new color_helper_1.ColorHelper(_this.scheme, _this.schemeType, colorDomain, _this.customColors);
            _this.data = _this.results;
            _this.rScale = _this.getRScale(_this.rDomain, [_this.minRadius, _this.maxRadius]);
            _this.xScale = _this.getXScale(_this.xDomain, _this.dims.width);
            _this.yScale = _this.getYScale(_this.yDomain, _this.dims.height);
            _this.legendOptions = _this.getLegendOptions();
        });
    };
    BubbleChartComponent.prototype.hideCircles = function () {
        this.deactivateAll();
    };
    BubbleChartComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    BubbleChartComponent.prototype.getYScale = function (domain, height) {
        var padding = (domain[1] - domain[0]) / height * this.maxRadius; // padding to keep bubbles inside range
        return getScale(domain, [height, 0], this.yScaleType, padding, this.roundDomains);
    };
    BubbleChartComponent.prototype.getXScale = function (domain, width) {
        var padding = (domain[1] - domain[0]) / width * this.maxRadius; // padding to keep bubbles inside range
        return getScale(domain, [0, width], this.xScaleType, padding, this.roundDomains);
    };
    BubbleChartComponent.prototype.getRScale = function (domain, range) {
        var scale = d3_1.default.scaleLinear()
            .range(range)
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BubbleChartComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: []
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
        }
        else {
            opts.domain = this.rDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BubbleChartComponent.prototype.getXDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.x)) {
                    values.push(d.x);
                }
            }
        }
        this.xScaleType = getScaleType(values);
        return getDomain(values, this.xScaleType, this.autoScale);
    };
    BubbleChartComponent.prototype.getYDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.y)) {
                    values.push(d.y);
                }
            }
        }
        this.yScaleType = getScaleType(values);
        return getDomain(values, this.yScaleType, this.autoScale);
    };
    BubbleChartComponent.prototype.getRDomain = function () {
        var min = Infinity;
        var max = -Infinity;
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                var value = Number(d.r) || 1;
                min = Math.min(min, value);
                max = Math.max(max, value);
            }
        }
        return [min, max];
    };
    BubbleChartComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BubbleChartComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BubbleChartComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BubbleChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    BubbleChartComponent.prototype.deactivateAll = function () {
        this.activeEntries = this.activeEntries.slice();
        for (var _i = 0, _a = this.activeEntries; _i < _a.length; _i++) {
            var entry = _a[_i];
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    };
    return BubbleChartComponent;
}(base_chart_component_1.BaseChartComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], BubbleChartComponent.prototype, "view", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "results", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BubbleChartComponent.prototype, "showGridLines", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "legend", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BubbleChartComponent.prototype, "xAxis", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BubbleChartComponent.prototype, "yAxis", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BubbleChartComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BubbleChartComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], BubbleChartComponent.prototype, "xAxisLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], BubbleChartComponent.prototype, "yAxisLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BubbleChartComponent.prototype, "roundDomains", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "maxRadius", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "minRadius", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BubbleChartComponent.prototype, "autoScale", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "schemeType", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], BubbleChartComponent.prototype, "activate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], BubbleChartComponent.prototype, "deactivate", void 0);
__decorate([
    core_1.HostListener('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BubbleChartComponent.prototype, "hideCircles", null);
BubbleChartComponent = __decorate([
    core_1.Component({
        selector: 'ngx-charts-bubble-chart',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [activeEntries]=\"activeEntries\"\n      [legendOptions]=\"legendOptions\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n\n      <svg:g [attr.transform]=\"transform\" class=\"bubble-chart chart\">\n      \n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [showGridLines]=\"showGridLines\"\n          [dims]=\"dims\"\n          [xScale]=\"xScale\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"/>\n          \n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [showGridLines]=\"showGridLines\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"/>\n \n        <svg:rect\n          class=\"bubble-chart-area\"\n          x=\"0\"\n          y=\"0\"\n          [attr.width]=\"dims.width\"\n          [attr.height]=\"dims.height\"\n          style=\"fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';\"\n          (mouseenter)=\"deactivateAll()\"\n        />\n\n        <svg:g *ngFor=\"let series of data\">\n          <svg:g ngx-charts-bubble-series\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [rScale]=\"rScale\"\n            [xScaleType]=\"xScaleType\"\n            [yScaleType]=\"yScaleType\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [activeEntries]=\"activeEntries\"\n            (select)=\"onClick($event, series)\"\n            (activate)=\"onActivate($event)\"\n            (deactivate)=\"onDeactivate($event)\" />\n        </svg:g>\n        \n      </svg:g>\n    </ngx-charts-chart>"
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.NgZone, core_1.ChangeDetectorRef, common_1.Location])
], BubbleChartComponent);
exports.BubbleChartComponent = BubbleChartComponent;
// TODO: move to utilities?
function getScaleType(values) {
    var date = true;
    var num = true;
    for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
        var value = values_1[_i];
        if (!isDate(value)) {
            date = false;
        }
        if (typeof value !== 'number') {
            num = false;
        }
    }
    if (date)
        return 'time';
    if (num)
        return 'linear';
    return 'ordinal';
}
function isDate(value) {
    if (value instanceof Date) {
        return true;
    }
    return false;
}
function getDomain(values, scaleType, autoScale) {
    var domain = [];
    if (scaleType === 'time') {
        var min = Math.min.apply(Math, values);
        var max = Math.max.apply(Math, values);
        domain = [min, max];
    }
    else if (scaleType === 'linear') {
        values = values.map(function (v) { return Number(v); });
        var min = Math.min.apply(Math, values);
        var max = Math.max.apply(Math, values);
        if (!autoScale) {
            min = Math.min(0, min);
        }
        domain = [min, max];
    }
    else {
        domain = values;
    }
    return domain;
}
function getScale(domain, range, scaleType, padding, roundDomains) {
    var scale;
    if (scaleType === 'time') {
        scale = d3_1.default.scaleTime()
            .range(range)
            .domain(domain);
    }
    else if (scaleType === 'linear') {
        scale = d3_1.default.scaleLinear()
            .range(range)
            .domain([domain[0] - padding, domain[1] + padding]);
    }
    else if (scaleType === 'ordinal') {
        scale = d3_1.default.scalePoint()
            .range(range)
            .padding(0.1)
            .domain(domain);
    }
    return roundDomains ? scale.nice() : scale;
}
//# sourceMappingURL=bubble-chart.component.js.map