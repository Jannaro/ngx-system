"use strict";
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
var d3_1 = require("../src/d3");
var color_sets_1 = require("../src/utils/color-sets");
var data_1 = require("./data");
var chartTypes_1 = require("./chartTypes");
var AppComponent = (function () {
    function AppComponent() {
        this.version = APP_VERSION;
        this.theme = 'dark';
        this.chartType = 'bar-vertical';
        this.realTimeData = false;
        this.linearScale = false;
        this.range = false;
        this.width = 700;
        this.height = 300;
        this.fitContainer = false;
        // options
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = true;
        this.showXAxisLabel = true;
        this.xAxisLabel = 'Country';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'GDP Per Capita';
        this.showGridLines = true;
        this.innerPadding = 8;
        this.barPadding = 8;
        this.groupPadding = 16;
        this.roundDomains = false;
        // line interpolation
        this.curveType = 'Linear';
        this.curve = d3_1.default.shape.curveLinear;
        this.interpolationTypes = [
            'Basis', 'Bundle', 'Cardinal', 'Catmull Rom', 'Linear', 'Monotone X',
            'Monotone Y', 'Natural', 'Step', 'Step After', 'Step Before'
        ];
        this.schemeType = 'ordinal';
        this.rangeFillOpacity = 0.15;
        // pie
        this.showLabels = true;
        this.explodeSlices = false;
        this.doughnut = false;
        this.arcWidth = 0.25;
        // line, area
        this.autoScale = true;
        this.timeline = false;
        // margin
        this.margin = false;
        this.marginTop = 40;
        this.marginRight = 40;
        this.marginBottom = 40;
        this.marginLeft = 40;
        // gauge
        this.gaugeMin = 0;
        this.gaugeMax = 100;
        this.gaugeLargeSegments = 10;
        this.gaugeSmallSegments = 5;
        this.gaugeUnits = 'alerts';
        this.gaugeAngleSpan = 240;
        this.gaugeStartAngle = -120;
        this.gaugeShowAxis = true;
        this.gaugeValue = 50; // linear gauge value
        this.gaugePreviousValue = 70;
        Object.assign(this, {
            single: data_1.single,
            multi: data_1.multi,
            countries: data_1.countries,
            chartGroups: chartTypes_1.default,
            colorSets: color_sets_1.colorSets,
            graph: data_1.generateGraph(50),
            bubble: data_1.bubble
        });
        this.dateData = data_1.generateData(5, false);
        this.dateDataWithRange = data_1.generateData(2, true);
        this.setColorScheme('cool');
    }
    Object.defineProperty(AppComponent.prototype, "dateDataWithOrWithoutRange", {
        get: function () {
            if (this.range) {
                return this.dateDataWithRange;
            }
            else {
                return this.dateData;
            }
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.ngOnInit = function () {
        this.selectChart(this.chartType);
        setInterval(this.updateData.bind(this), 1000);
        if (!this.fitContainer) {
            this.applyDimensions();
        }
    };
    AppComponent.prototype.updateData = function () {
        if (!this.realTimeData) {
            return;
        }
        this.gaugeValue = this.gaugeMin + Math.floor(Math.random() * (this.gaugeMax - this.gaugeMin));
        var country = this.countries[Math.floor(Math.random() * this.countries.length)];
        var add = Math.random() < 0.7;
        var remove = Math.random() < 0.5;
        if (remove) {
            if (this.single.length > 1) {
                var index = Math.floor(Math.random() * this.single.length);
                this.single.splice(index, 1);
                this.single = this.single.slice();
            }
            if (this.multi.length > 1) {
                var index = Math.floor(Math.random() * this.multi.length);
                this.multi.splice(index, 1);
                this.multi = this.multi.slice();
            }
            if (this.bubble.length > 1) {
                var index = Math.floor(Math.random() * this.bubble.length);
                this.bubble.splice(index, 1);
                this.bubble = this.bubble.slice();
            }
            if (this.graph.nodes.length > 1) {
                var index = Math.floor(Math.random() * this.graph.nodes.length);
                var value_1 = this.graph.nodes[index].value;
                this.graph.nodes.splice(index, 1);
                var nodes = this.graph.nodes.slice();
                var links = this.graph.links.filter(function (link) {
                    return link.source !== value_1 && link.source.value !== value_1 &&
                        link.target !== value_1 && link.target.value !== value_1;
                });
                this.graph = { links: links, nodes: nodes };
            }
        }
        if (add) {
            // single
            var entry = {
                name: country,
                value: Math.floor(10000 + Math.random() * 50000)
            };
            this.single = this.single.concat([entry]);
            // multi
            var multiEntry = {
                name: country,
                series: [{
                        name: '2010',
                        value: Math.floor(1000000 + Math.random() * 20000000)
                    }, {
                        name: '2011',
                        value: Math.floor(1000000 + Math.random() * 20000000)
                    }]
            };
            this.multi = this.multi.concat([multiEntry]);
            // graph
            var node = { value: country };
            var nodes = this.graph.nodes.concat([node]);
            var link = {
                source: country,
                target: nodes[Math.floor(Math.random() * (nodes.length - 1))].value,
            };
            var links = this.graph.links.concat([link]);
            this.graph = { links: links, nodes: nodes };
            // bubble
            var bubbleEntry = {
                name: country,
                series: [{
                        name: '2010',
                        x: Math.floor(10000 + Math.random() * 20000),
                        y: Math.floor(30 + Math.random() * 70),
                        r: Math.floor(30 + Math.random() * 20),
                    }, {
                        name: '2011',
                        x: Math.floor(10000 + Math.random() * 20000),
                        y: Math.floor(30 + Math.random() * 70),
                        r: Math.floor(30 + Math.random() * 20),
                    }]
            };
            this.bubble = this.bubble.concat([bubbleEntry]);
        }
    };
    AppComponent.prototype.applyDimensions = function () {
        this.view = [this.width, this.height];
    };
    AppComponent.prototype.toggleFitContainer = function (event) {
        this.fitContainer = event;
        if (this.fitContainer) {
            this.view = undefined;
        }
        else {
            this.applyDimensions();
        }
    };
    AppComponent.prototype.selectChart = function (chartSelector) {
        this.chartType = chartSelector;
        this.linearScale = this.chartType === 'line-chart' ||
            this.chartType === 'line-chart-with-ranges' ||
            this.chartType === 'area-chart' ||
            this.chartType === 'area-chart-normalized' ||
            this.chartType === 'area-chart-stacked';
        if (this.chartType === 'bubble-chart') {
            this.xAxisLabel = 'GDP Per Capita';
            this.yAxisLabel = 'Life expectancy [years]';
        }
        else {
            this.yAxisLabel = 'GDP Per Capita';
            this.xAxisLabel = 'Country';
        }
        for (var _i = 0, _a = this.chartGroups; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.charts; _b < _c.length; _b++) {
                var chart = _c[_b];
                if (chart.selector === chartSelector) {
                    this.chart = chart;
                    return;
                }
            }
        }
    };
    AppComponent.prototype.select = function (data) {
        console.log('Item clicked', data);
    };
    AppComponent.prototype.setInterpolationType = function (curveType) {
        this.curveType = curveType;
        if (curveType === 'Basis') {
            this.curve = d3_1.default.shape.curveBasis;
        }
        if (curveType === 'Bundle') {
            this.curve = d3_1.default.shape.curveBundle.beta(1);
        }
        if (curveType === 'Cardinal') {
            this.curve = d3_1.default.shape.curveCardinal;
        }
        if (curveType === 'Catmull Rom') {
            this.curve = d3_1.default.shape.curveCatmullRom;
        }
        if (curveType === 'Linear') {
            this.curve = d3_1.default.shape.curveLinear;
        }
        if (curveType === 'Monotone X') {
            this.curve = d3_1.default.shape.curveMonotoneX;
        }
        if (curveType === 'Monotone Y') {
            this.curve = d3_1.default.shape.curveMonotoneY;
        }
        if (curveType === 'Natural') {
            this.curve = d3_1.default.shape.curveNatural;
        }
        if (curveType === 'Step') {
            this.curve = d3_1.default.shape.curveStep;
        }
        if (curveType === 'Step After') {
            this.curve = d3_1.default.shape.curveStepAfter;
        }
        if (curveType === 'Step Before') {
            this.curve = d3_1.default.shape.curveStepBefore;
        }
    };
    AppComponent.prototype.setColorScheme = function (name) {
        this.selectedColorScheme = name;
        this.colorScheme = this.colorSets.find(function (s) { return s.name === name; });
    };
    AppComponent.prototype.onLegendLabelClick = function (entry) {
        console.log('Legend clicked', entry);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app',
        encapsulation: core_1.ViewEncapsulation.None,
        styleUrls: ['./app.component.scss'],
        templateUrl: './app.component.html',
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map