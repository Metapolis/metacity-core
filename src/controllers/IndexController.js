"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
/**
 * / route
 *
 * @class User
 */
var IndexController = (function () {
    function IndexController() {
    }
    IndexController.prototype.index = function (req, res, next) {
        return this.fooService.get(req.query.id);
    };
    return IndexController;
}());
__decorate([
    inversify_express_utils_1.Get("/")
], IndexController.prototype, "index", null);
IndexController = __decorate([
    inversify_express_utils_1.Controller("/foo"),
    inversify_1.injectable()
], IndexController);
exports.IndexController = IndexController;
