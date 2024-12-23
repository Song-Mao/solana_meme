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
exports.BalanceRecord = void 0; // 新建这个文件用于记录余额历史

var typeorm_1 = require("typeorm");

var BalanceRecord =
/** @class */
function () {
  function BalanceRecord() {}

  __decorate([typeorm_1.PrimaryGeneratedColumn()], BalanceRecord.prototype, "id");

  __decorate([typeorm_1.Column()], BalanceRecord.prototype, "taskId");

  __decorate([typeorm_1.Column()], BalanceRecord.prototype, "walletAddress");

  __decorate([typeorm_1.Column()], BalanceRecord.prototype, "balance");

  __decorate([typeorm_1.Column()], BalanceRecord.prototype, "previousBalance");

  __decorate([typeorm_1.Column()], BalanceRecord.prototype, "change");

  __decorate([typeorm_1.Column()], BalanceRecord.prototype, "solBalance");

  __decorate([typeorm_1.Column()], BalanceRecord.prototype, "usdtBalance");

  __decorate([typeorm_1.Column()], BalanceRecord.prototype, "usdcBalance");

  __decorate([typeorm_1.Column()], BalanceRecord.prototype, "updatedAt");

  BalanceRecord = __decorate([typeorm_1.Entity()], BalanceRecord);
  return BalanceRecord;
}();

exports.BalanceRecord = BalanceRecord;