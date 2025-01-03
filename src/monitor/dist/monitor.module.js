"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MonitorModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var monitor_controller_1 = require("./monitor.controller");
var monitor_service_1 = require("./monitor.service");
var monitor_entity_1 = require("./entities/monitor.entity");
var wallet_entity_1 = require("./entities/wallet.entity");
var MonitorModule = /** @class */ (function () {
    function MonitorModule() {
    }
    MonitorModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([monitor_entity_1.Monitor, wallet_entity_1.Wallet])
            ],
            controllers: [monitor_controller_1.MonitorController],
            providers: [monitor_service_1.MonitorService]
        })
    ], MonitorModule);
    return MonitorModule;
}());
exports.MonitorModule = MonitorModule;
