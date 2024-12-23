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
exports.Monitor = void 0;

var typeorm_1 = require("typeorm");

var wallet_entity_1 = require("./wallet.entity");

var Monitor =
/** @class */
function () {
  function Monitor() {}

  __decorate([typeorm_1.PrimaryGeneratedColumn('uuid')], Monitor.prototype, "id");

  __decorate([typeorm_1.Column()], Monitor.prototype, "tokenAddress");

  __decorate([typeorm_1.Column({
    nullable: true
  })], Monitor.prototype, "tokenName");

  __decorate([typeorm_1.Column({
    nullable: true
  })], Monitor.prototype, "tokenSymbol");

  __decorate([typeorm_1.Column({
    nullable: true
  })], Monitor.prototype, "tokenIcon");

  __decorate([typeorm_1.CreateDateColumn()], Monitor.prototype, "createdAt");

  __decorate([typeorm_1.OneToMany(function () {
    return wallet_entity_1.Wallet;
  }, function (wallet) {
    return wallet.monitor;
  })], Monitor.prototype, "wallets");

  Monitor = __decorate([typeorm_1.Entity()], Monitor);
  return Monitor;
}();

exports.Monitor = Monitor;