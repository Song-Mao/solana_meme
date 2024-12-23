"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.AppModule = void 0; // src/app.module.ts

var common_1 = require("@nestjs/common");

var typeorm_1 = require("@nestjs/typeorm");

var config_1 = require("@nestjs/config");

var monitor_module_1 = require("./monitor/monitor.module");

var AppModule =
/** @class */
function () {
  function AppModule() {}

  AppModule = __decorate([common_1.Module({
    imports: [config_1.ConfigModule.forRoot(), typeorm_1.TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Songmao468',
      database: 'solana_meme',
      synchronize: true,
      autoLoadEntities: true
    }), monitor_module_1.MonitorModule]
  })], AppModule);
  return AppModule;
}();

exports.AppModule = AppModule;