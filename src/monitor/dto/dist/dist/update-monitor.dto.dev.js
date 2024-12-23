"use strict";

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

exports.__esModule = true;
exports.UpdateMonitorDto = void 0;

var mapped_types_1 = require("@nestjs/mapped-types");

var create_monitor_dto_1 = require("./create-monitor.dto");

var UpdateMonitorDto =
/** @class */
function (_super) {
  __extends(UpdateMonitorDto, _super);

  function UpdateMonitorDto() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return UpdateMonitorDto;
}(mapped_types_1.PartialType(create_monitor_dto_1.CreateMonitorDto));

exports.UpdateMonitorDto = UpdateMonitorDto;