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

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;
exports.MonitorService = void 0;

var common_1 = require("@nestjs/common");

var typeorm_1 = require("@nestjs/typeorm");

var web3_js_1 = require("@solana/web3.js");

var spl_token_1 = require("@solana/spl-token");

var monitor_entity_1 = require("./entities/monitor.entity");

var wallet_entity_1 = require("./entities/wallet.entity");

var MonitorService =
/** @class */
function () {
  function MonitorService(monitorRepo, walletRepo) {
    this.monitorRepo = monitorRepo;
    this.walletRepo = walletRepo;
    this.USDT_ADDRESS = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB';
    this.USDC_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
    var rpcUrl = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
    console.log(rpcUrl, 'rpcUrl');
    this.solanaConnection = new web3_js_1.Connection(rpcUrl); // 测试连接

    this.testConnection();
  }

  MonitorService.prototype.testConnection = function () {
    return __awaiter(this, void 0, void 0, function () {
      var slot, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]);

            return [4
            /*yield*/
            , this.solanaConnection.getSlot()];

          case 1:
            slot = _a.sent();
            console.log('Solana 连接成功，当前 slot:', slot);
            return [3
            /*break*/
            , 3];

          case 2:
            error_1 = _a.sent();
            console.error('Solana 连接失败:', error_1.message);
            return [3
            /*break*/
            , 3];

          case 3:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  MonitorService.prototype.create = function (createMonitorDto) {
    var _a;

    return __awaiter(this, void 0, void 0, function () {
      var tokenInfo, monitor, savedMonitor_1, walletPromises, error_2;

      var _this = this;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 4,, 5]); // 输入验证


            if (!createMonitorDto.tokenAddress) {
              throw new Error('代币地址不能为空');
            }

            if (!((_a = createMonitorDto.wallets) === null || _a === void 0 ? void 0 : _a.length)) {
              throw new Error('钱包列表不能为空');
            }

            return [4
            /*yield*/
            , this.getTokenInfo(createMonitorDto.tokenAddress)];

          case 1:
            tokenInfo = _b.sent();
            monitor = new monitor_entity_1.Monitor();
            monitor.tokenAddress = createMonitorDto.tokenAddress;
            monitor.tokenName = tokenInfo.name;
            monitor.tokenSymbol = tokenInfo.symbol;
            monitor.tokenIcon = tokenInfo.icon;
            return [4
            /*yield*/
            , this.monitorRepo.save(monitor)];

          case 2:
            savedMonitor_1 = _b.sent();
            walletPromises = createMonitorDto.wallets.map(function (walletInput) {
              return __awaiter(_this, void 0, void 0, function () {
                var wallet, _a, tokenBalance, solBalance, usdtBalance, usdcBalance, _b, _c;

                return __generator(this, function (_d) {
                  switch (_d.label) {
                    case 0:
                      wallet = new wallet_entity_1.Wallet();
                      wallet.address = walletInput.address;
                      wallet.note = walletInput.note;
                      wallet.monitor = savedMonitor_1;
                      return [4
                      /*yield*/
                      , Promise.all([this.getTokenBalance(walletInput.address, createMonitorDto.tokenAddress), this.getSolBalance(walletInput.address), this.getTokenBalance(walletInput.address, this.USDT_ADDRESS), this.getTokenBalance(walletInput.address, this.USDC_ADDRESS)])];

                    case 1:
                      _a = _d.sent(), tokenBalance = _a[0], solBalance = _a[1], usdtBalance = _a[2], usdcBalance = _a[3];
                      wallet.tokenBalance = tokenBalance;
                      wallet.lastTokenBalance = tokenBalance;
                      wallet.tokenBalanceChange = '0';
                      wallet.solBalance = solBalance;
                      _b = wallet;
                      _c = Number(solBalance);
                      return [4
                      /*yield*/
                      , this.getSolPrice()];

                    case 2:
                      _b.solValueInUsdt = (_c * _d.sent()).toString();
                      wallet.usdtBalance = usdtBalance;
                      wallet.usdcBalance = usdcBalance;
                      return [2
                      /*return*/
                      , this.walletRepo.save(wallet)];
                  }
                });
              });
            });
            return [4
            /*yield*/
            , Promise.all(walletPromises)];

          case 3:
            _b.sent();

            return [2
            /*return*/
            , this.monitorRepo.findOne({
              where: {
                id: savedMonitor_1.id
              },
              relations: ['wallets']
            })];

          case 4:
            error_2 = _b.sent();
            throw new Error("\u521B\u5EFA\u76D1\u63A7\u4EFB\u52A1\u5931\u8D25: " + error_2.message);

          case 5:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  MonitorService.prototype.getTokenInfo = function (tokenAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var mintInfo, error_3;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]);

            return [4
            /*yield*/
            , spl_token_1.getMint(this.solanaConnection, new web3_js_1.PublicKey(tokenAddress))];

          case 1:
            mintInfo = _a.sent(); // 这里需要调用 token metadata program 获取更多信息
            // 临时返回基础信息

            return [2
            /*return*/
            , {
              name: 'Unknown Token',
              symbol: 'UNKNOWN',
              icon: '',
              decimals: mintInfo.decimals
            }];

          case 2:
            error_3 = _a.sent();
            console.error("\u83B7\u53D6\u4EE3\u5E01\u4FE1\u606F\u5931\u8D25: " + error_3.message);
            return [2
            /*return*/
            , {
              name: 'Unknown Token',
              symbol: 'UNKNOWN',
              icon: '',
              decimals: 9
            }];

          case 3:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  MonitorService.prototype.findAll = function () {
    return __awaiter(this, void 0, Promise, function () {
      var monitors, error_4;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]);

            return [4
            /*yield*/
            , this.monitorRepo.find({
              relations: ['wallets']
            })];

          case 1:
            monitors = _a.sent();
            return [2
            /*return*/
            , monitors.map(function (monitor) {
              return {
                id: monitor.id,
                tokenAddress: monitor.tokenAddress,
                walletsCount: monitor.wallets.length,
                createdAt: monitor.createdAt
              };
            })];

          case 2:
            error_4 = _a.sent();
            throw new Error("Failed to fetch monitor tasks: " + error_4.message);

          case 3:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  MonitorService.prototype.findOne = function (id) {
    return __awaiter(this, void 0, Promise, function () {
      var monitor_1, walletsWithBalance, error_5;

      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 3,, 4]);

            return [4
            /*yield*/
            , this.monitorRepo.findOne({
              where: {
                id: id
              },
              relations: ['wallets']
            })];

          case 1:
            monitor_1 = _a.sent();

            if (!monitor_1) {
              throw new common_1.NotFoundException('未找到该监控任务');
            }

            return [4
            /*yield*/
            , Promise.all(monitor_1.wallets.map(function (wallet) {
              return __awaiter(_this, void 0, void 0, function () {
                var _a, tokenBalance, solBalance, usdtBalance, usdcBalance, tokenBalanceChange, solValueInUsdt, _b;

                return __generator(this, function (_c) {
                  switch (_c.label) {
                    case 0:
                      return [4
                      /*yield*/
                      , Promise.all([this.getTokenBalance(wallet.address, monitor_1.tokenAddress), this.getSolBalance(wallet.address), this.getTokenBalance(wallet.address, this.USDT_ADDRESS), this.getTokenBalance(wallet.address, this.USDC_ADDRESS)])];

                    case 1:
                      _a = _c.sent(), tokenBalance = _a[0], solBalance = _a[1], usdtBalance = _a[2], usdcBalance = _a[3];
                      tokenBalanceChange = (Number(tokenBalance) - Number(wallet.tokenBalance)).toString();
                      _b = Number(solBalance);
                      return [4
                      /*yield*/
                      , this.getSolPrice()];

                    case 2:
                      solValueInUsdt = (_b * _c.sent()).toString(); // 更新钱包信息

                      return [4
                      /*yield*/
                      , this.walletRepo.update(wallet.id, {
                        lastTokenBalance: wallet.tokenBalance,
                        tokenBalance: tokenBalance,
                        tokenBalanceChange: tokenBalanceChange,
                        solBalance: solBalance,
                        solValueInUsdt: solValueInUsdt,
                        usdtBalance: usdtBalance,
                        usdcBalance: usdcBalance
                      })];

                    case 3:
                      // 更新钱包信息
                      _c.sent();

                      return [2
                      /*return*/
                      , {
                        id: wallet.id,
                        address: wallet.address,
                        note: wallet.note,
                        tokenBalance: tokenBalance,
                        lastTokenBalance: wallet.lastTokenBalance,
                        tokenBalanceChange: tokenBalanceChange,
                        solBalance: solBalance,
                        solValueInUsdt: solValueInUsdt,
                        usdtBalance: usdtBalance,
                        usdcBalance: usdcBalance
                      }];
                  }
                });
              });
            }))];

          case 2:
            walletsWithBalance = _a.sent();
            return [2
            /*return*/
            , {
              id: monitor_1.id,
              tokenAddress: monitor_1.tokenAddress,
              tokenName: monitor_1.tokenName,
              tokenSymbol: monitor_1.tokenSymbol,
              tokenIcon: monitor_1.tokenIcon,
              wallets: walletsWithBalance
            }];

          case 3:
            error_5 = _a.sent();

            if (error_5 instanceof common_1.NotFoundException) {
              throw error_5;
            }

            throw new Error("\u83B7\u53D6\u76D1\u63A7\u4EFB\u52A1\u5931\u8D25: " + error_5.message);

          case 4:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  MonitorService.prototype.getTokenBalance = function (walletAddress, tokenAddress) {
    return __awaiter(this, void 0, Promise, function () {
      var walletPubkey, tokenPubkey, tokenAccounts, balance, error_6;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 3,, 4]);

            walletPubkey = new web3_js_1.PublicKey(walletAddress);
            tokenPubkey = new web3_js_1.PublicKey(tokenAddress);
            return [4
            /*yield*/
            , this.solanaConnection.getTokenAccountsByOwner(walletPubkey, {
              mint: tokenPubkey
            })];

          case 1:
            tokenAccounts = _a.sent();

            if (tokenAccounts.value.length === 0) {
              return [2
              /*return*/
              , '0'];
            }

            return [4
            /*yield*/
            , this.solanaConnection.getTokenAccountBalance(tokenAccounts.value[0].pubkey)];

          case 2:
            balance = _a.sent();
            return [2
            /*return*/
            , balance.value.amount];

          case 3:
            error_6 = _a.sent();
            console.error("\u83B7\u53D6\u4EE3\u5E01\u4F59\u989D\u5931\u8D25: " + error_6.message);
            return [2
            /*return*/
            , '0'];

          case 4:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  MonitorService.prototype.getSolBalance = function (walletAddress) {
    return __awaiter(this, void 0, Promise, function () {
      var balance, error_7;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]);

            return [4
            /*yield*/
            , this.solanaConnection.getBalance(new web3_js_1.PublicKey(walletAddress))];

          case 1:
            balance = _a.sent();
            return [2
            /*return*/
            , (balance / 1e9).toString()];
          // 转换为 SOL

          case 2:
            error_7 = _a.sent();
            console.error("\u83B7\u53D6 SOL \u4F59\u989D\u5931\u8D25: " + error_7.message);
            return [2
            /*return*/
            , '0'];

          case 3:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  MonitorService.prototype.getSolPrice = function () {
    return __awaiter(this, void 0, Promise, function () {
      return __generator(this, function (_a) {
        // 这里应该实现获取 SOL 价格的逻辑
        // 可以调用价格 API 或其他数据源
        return [2
        /*return*/
        , 100]; // 临时返回固定值
      });
    });
  };

  MonitorService = __decorate([common_1.Injectable(), __param(0, typeorm_1.InjectRepository(monitor_entity_1.Monitor)), __param(1, typeorm_1.InjectRepository(wallet_entity_1.Wallet))], MonitorService);
  return MonitorService;
}();

exports.MonitorService = MonitorService;