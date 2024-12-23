"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.MonitorService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var web3_js_1 = require("@solana/web3.js");
var monitor_entity_1 = require("./entities/monitor.entity");
var balance_record_entity_1 = require("./entities/balance-record.entity");
var MonitorService = /** @class */ (function () {
    function MonitorService(monitorRepo, balanceRecordRepo) {
        this.monitorRepo = monitorRepo;
        this.balanceRecordRepo = balanceRecordRepo;
        this.solanaConnection = new web3_js_1.Connection(process.env.SOLANA_RPC_URL);
    }
    MonitorService.prototype.create = function (createMonitorDto) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenInfo, monitor, savedMonitor, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getTokenInfo(createMonitorDto.tokenAddress)];
                    case 1:
                        tokenInfo = _a.sent();
                        monitor = this.monitorRepo.create({
                            tokenAddress: createMonitorDto.tokenAddress,
                            tokenSymbol: tokenInfo.symbol,
                            tokenName: tokenInfo.name,
                            wallets: createMonitorDto.wallets,
                            createdAt: new Date(),
                            isActive: true
                        });
                        return [4 /*yield*/, this.monitorRepo.save(monitor)];
                    case 2:
                        savedMonitor = _a.sent();
                        // 4. 初始化所有钱包的余额记录
                        return [4 /*yield*/, this.initializeBalanceRecords(savedMonitor)];
                    case 3:
                        // 4. 初始化所有钱包的余额记录
                        _a.sent();
                        return [2 /*return*/, savedMonitor];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error("Failed to create monitor task: " + error_1.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MonitorService.prototype.findAll = function () {
        return __awaiter(this, void 0, Promise, function () {
            var monitors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.monitorRepo.find()];
                    case 1:
                        monitors = _a.sent();
                        return [2 /*return*/, monitors.map(function (monitor) { return ({
                                id: monitor.id.toString(),
                                tokenAddress: monitor.tokenAddress,
                                tokenSymbol: monitor.tokenSymbol,
                                tokenName: monitor.tokenName,
                                walletsCount: monitor.wallets.length,
                                createdAt: monitor.createdAt
                            }); })];
                }
            });
        });
    };
    MonitorService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var monitor, balances, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.monitorRepo.findOne({
                            where: { _id: id }
                        })];
                    case 1:
                        monitor = _b.sent();
                        if (!monitor) {
                            throw new common_1.NotFoundException('Monitor task not found');
                        }
                        return [4 /*yield*/, this.balanceRecordRepo.find({
                                where: { taskId: monitor.id },
                                order: { updatedAt: 'DESC' }
                            })];
                    case 2:
                        balances = _b.sent();
                        _a = {
                            id: monitor.id.toString(),
                            tokenAddress: monitor.tokenAddress,
                            tokenSymbol: monitor.tokenSymbol,
                            tokenName: monitor.tokenName
                        };
                        return [4 /*yield*/, Promise.all(monitor.wallets.map(function (wallet) { return __awaiter(_this, void 0, void 0, function () {
                                var balance;
                                return __generator(this, function (_a) {
                                    balance = balances.find(function (b) { return b.walletAddress === wallet.address; });
                                    return [2 /*return*/, {
                                            address: wallet.address,
                                            memo: wallet.memo,
                                            currentBalance: (balance === null || balance === void 0 ? void 0 : balance.balance) || '0',
                                            previousBalance: (balance === null || balance === void 0 ? void 0 : balance.previousBalance) || '0',
                                            change: (balance === null || balance === void 0 ? void 0 : balance.change) || '0',
                                            solBalance: (balance === null || balance === void 0 ? void 0 : balance.solBalance) || 0,
                                            usdtBalance: (balance === null || balance === void 0 ? void 0 : balance.usdtBalance) || 0,
                                            usdcBalance: (balance === null || balance === void 0 ? void 0 : balance.usdcBalance) || 0,
                                            lastUpdatedAt: (balance === null || balance === void 0 ? void 0 : balance.updatedAt) || monitor.createdAt
                                        }];
                                });
                            }); }))];
                    case 3: return [2 /*return*/, (_a.walletDetails = _b.sent(),
                            _a)];
                }
            });
        });
    };
    MonitorService.prototype.getTokenInfo = function (tokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // TODO: 实现获取Solana token信息的逻辑
                // 这里需要调用Solana API获取token信息
                return [2 /*return*/, {
                        symbol: 'TEST',
                        name: 'Test Token'
                    }];
            });
        });
    };
    MonitorService.prototype.initializeBalanceRecords = function (monitor) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    MonitorService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(monitor_entity_1.Monitor)),
        __param(1, typeorm_1.InjectRepository(balance_record_entity_1.BalanceRecord))
    ], MonitorService);
    return MonitorService;
}());
exports.MonitorService = MonitorService;
