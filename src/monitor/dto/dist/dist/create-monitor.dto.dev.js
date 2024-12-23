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
exports.CreateMonitorDto = void 0;

var class_validator_1 = require("class-validator");

var class_transformer_1 = require("class-transformer");

var WalletInput =
/** @class */
function () {
  function WalletInput() {}

  __decorate([class_validator_1.IsString(), class_validator_1.IsNotEmpty()], WalletInput.prototype, "address");

  __decorate([class_validator_1.IsString()], WalletInput.prototype, "note");

  return WalletInput;
}();

var CreateMonitorDto =
/** @class */
function () {
  function CreateMonitorDto() {}

  __decorate([class_validator_1.IsString(), class_validator_1.IsNotEmpty()], CreateMonitorDto.prototype, "tokenAddress");

  __decorate([class_validator_1.IsArray(), class_validator_1.ValidateNested({
    each: true
  }), class_transformer_1.Type(function () {
    return WalletInput;
  })], CreateMonitorDto.prototype, "wallets");

  return CreateMonitorDto;
}();

exports.CreateMonitorDto = CreateMonitorDto;