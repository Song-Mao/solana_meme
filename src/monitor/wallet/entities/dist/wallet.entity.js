"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Wallet = void 0;
var typeorm_1 = require("typeorm");
var monitor_entity_1 = require("../../entities/monitor.entity");
var Wallet = /** @class */ (function () {
    function Wallet() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid')
    ], Wallet.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], Wallet.prototype, "address");
    __decorate([
        typeorm_1.Column()
    ], Wallet.prototype, "note");
    __decorate([
        typeorm_1.Column('text', { "default": '0' })
    ], Wallet.prototype, "tokenBalance");
    __decorate([
        typeorm_1.Column('text', { "default": '0' })
    ], Wallet.prototype, "lastTokenBalance");
    __decorate([
        typeorm_1.Column('text', { "default": '0' })
    ], Wallet.prototype, "tokenBalanceChange");
    __decorate([
        typeorm_1.Column('text', { "default": '0' })
    ], Wallet.prototype, "solBalance");
    __decorate([
        typeorm_1.Column('text', { "default": '0' })
    ], Wallet.prototype, "solValueInUsdt");
    __decorate([
        typeorm_1.Column('text', { "default": '0' })
    ], Wallet.prototype, "usdtBalance");
    __decorate([
        typeorm_1.Column('text', { "default": '0' })
    ], Wallet.prototype, "usdcBalance");
    __decorate([
        typeorm_1.ManyToOne(function () { return monitor_entity_1.Monitor; }, function (monitor) { return monitor.wallets; })
    ], Wallet.prototype, "monitor");
    Wallet = __decorate([
        typeorm_1.Entity()
    ], Wallet);
    return Wallet;
}());
exports.Wallet = Wallet;
