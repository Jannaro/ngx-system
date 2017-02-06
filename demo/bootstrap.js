"use strict";
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app.module");
document.addEventListener('DOMContentLoaded', function () {
    platform_browser_dynamic_1.platformBrowserDynamic()
        .bootstrapModule(app_module_1.AppModule)
        .catch(function (err) { return console.error(err); });
});
//# sourceMappingURL=bootstrap.js.map