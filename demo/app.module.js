"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var app_component_1 = require("./app.component");
var src_1 = require("../src");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        providers: [
            {
                provide: common_1.APP_BASE_HREF,
                useFactory: getBaseLocation
            }
        ],
        imports: [src_1.NgxChartsModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
        declarations: [app_component_1.AppComponent],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
function getBaseLocation() {
    var paths = location.pathname.split('/').splice(1, 1);
    var basePath = (paths && paths[0]) || '';
    return '/' + basePath;
}
exports.getBaseLocation = getBaseLocation;
//# sourceMappingURL=app.module.js.map