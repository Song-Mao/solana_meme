import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection, PublicKey, Commitment, ConnectionConfig } from '@solana/web3.js';  // 添加 Commitment 和 ConnectionConfig
import { TOKEN_PROGRAM_ID, getMint } from '@solana/spl-token';
import { Monitor } from './entities/monitor.entity';
import { Wallet } from './wallet/entities/wallet.entity';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { MonitorListItemDto } from './dto/monitor-list-item.dto';
import { MonitorDetailDto } from './dto/monitor-detail.dto';
@Injectable()
export class MonitorService {
  private solanaConnection: Connection;
  private balanceCache: Map<string, { balance: string, timestamp: number }> = new Map();
  private readonly CACHE_TTL = 60000;

  constructor(
    @InjectRepository(Monitor)
    private monitorRepo: Repository<Monitor>,
    @InjectRepository(Wallet)
    private walletRepo: Repository<Wallet>,
  ) {
    const rpcUrl = process.env.SOLANA_RPC_URL;
    if (!rpcUrl) {
      throw new Error('SOLANA_RPC_URL environment variable is not set');
    }

    console.log('当前使用的 RPC 节点:', rpcUrl);

    const connectionConfig = {
      commitment: 'confirmed' as Commitment,
      confirmTransactionInitialTimeout: 60000,
    };

    this.solanaConnection = new Connection(rpcUrl, connectionConfig);
    this.testConnection();
  }

  private async testConnection() {
    try {
      const slot = await this.solanaConnection.getSlot();
      console.log('Solana 连接成功，当前 slot:', slot);

      // 测试代币信息
      const tokenAddress = '8vCAUbxejdtaxn6jnX5uaQTyTZLmXALg9u1bvFCAjtx7';
      try {
        // 使用基础的账户信息查询
        const accountInfo = await this.solanaConnection.getAccountInfo(
          new PublicKey(tokenAddress)
        );
        console.log('代币账户是否存在:', accountInfo !== null);
        
        if (accountInfo) {
          console.log('代币账户数据大小:', accountInfo.data.length);
        }

        // 测试代币余额查询
        const testWallet = '4QyhWuE1WKSqmbBcG1XrW9NH25MURNLzFB8r5A1GNaiM';
        console.log('开始查询钱包余额...');
        
        const walletPubkey = new PublicKey(testWallet);
        const tokenPubkey = new PublicKey(tokenAddress);

        // 获取所有代币账户
        const tokenAccounts = await this.solanaConnection.getTokenAccountsByOwner(
          walletPubkey,
          {
            mint: tokenPubkey,
          }
        );

        console.log('找到的代币账户数量:', tokenAccounts.value.length);

        if (tokenAccounts.value.length > 0) {
          const balance = await this.solanaConnection.getTokenAccountBalance(
            tokenAccounts.value[0].pubkey
          );
          console.log('代币余额:', balance.value.amount);
        } else {
          console.log('未找到代币账户');
        }

      } catch (error) {
        console.error('代币查询失败:', {
          message: error.message,
          stack: error.stack
        });
      }

    } catch (error) {
      console.error('Solana 连接测试失败:', error.message);
    }
  }

  async create(createMonitorDto: CreateMonitorDto) {
    try {
      console.log('开始创建监控任务...');
      
      // 输入验证
      if (!createMonitorDto.tokenAddress) {
        throw new Error('代币地址不能为空');
      }
      if (!createMonitorDto.wallets?.length) {
        throw new Error('钱包列表不能为空');
      }

      // 获取代币信息
      console.log('正在获取代币信息...');
      const tokenInfo = await this.getTokenInfo(createMonitorDto.tokenAddress);
      console.log('代币信息获取成功:', tokenInfo);

      // 创建 Monitor
      const monitor = new Monitor();
      monitor.tokenAddress = createMonitorDto.tokenAddress;
      monitor.tokenName = tokenInfo.name;
      monitor.tokenSymbol = tokenInfo.symbol;
      monitor.tokenIcon = tokenInfo.icon;
      
      console.log('正在保存监控任务...');
      const savedMonitor = await this.monitorRepo.save(monitor);
      console.log('监控任务保存成功');

      // 创建并保存钱包记录
      console.log('开始保存钱包列表...');
      const walletPromises = createMonitorDto.wallets.map(async walletInput => {
        const wallet = new Wallet();
        wallet.address = walletInput.address;
        wallet.note = walletInput.note;
        wallet.monitor = savedMonitor;
        
        // 初始化额字段为 0
        wallet.tokenBalance = '0';
        wallet.lastTokenBalance = '0';
        wallet.tokenBalanceChange = '0';
        wallet.solBalance = '0';
        wallet.solValueInUsdt = '0';
        wallet.usdtBalance = '0';
        wallet.usdcBalance = '0';

        return this.walletRepo.save(wallet);
      });

      await Promise.all(walletPromises);
      console.log('钱包列表保存成功');

      // 返回创建的监控任务
      return this.monitorRepo.findOne({
        where: { id: savedMonitor.id },
        relations: ['wallets']
      });
    } catch (error) {
      console.error('创建监控任务失败:', error);
      throw new Error(`创建监控任务失败: ${error.message}`);
    }
  }

  private async getTokenInfo(tokenAddress: string) {
    try {
      const mintInfo = await getMint(
        this.solanaConnection,
        new PublicKey(tokenAddress)
      );

      return {
        name: 'Unknown Token',
        symbol: 'UNKNOWN',
        icon: '',
        decimals: mintInfo.decimals
      };
    } catch (error) {
      console.error('获取代币信息失败:', error);
      return {
        name: 'Unknown Token',
        symbol: 'UNKNOWN',
        icon: '',
        decimals: 9
      };
    }
  }

  async findAll(): Promise<MonitorListItemDto[]> {
    try {
      const monitors = await this.monitorRepo.find({
        relations: ['wallets']
      });

      return monitors.map(monitor => ({
        id: monitor.id,
        tokenAddress: monitor.tokenAddress,
        walletsCount: monitor.wallets.length,
        createdAt: monitor.createdAt
      }));
    } catch (error) {
      throw new Error(`Failed to fetch monitor tasks: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<MonitorDetailDto> {
    try {
      const monitor = await this.monitorRepo.findOne({
        where: { id },
        relations: ['wallets']
      });

      if (!monitor) {
        throw new NotFoundException('未找到该监控任务');
      }

      // 验证代币地址
      console.log('监控的代币地址:', monitor.tokenAddress);
      try {
        new PublicKey(monitor.tokenAddress);
      } catch (error) {
        throw new Error(`存储的代币地址无效: ${monitor.tokenAddress}`);
      }

      const walletsWithBalance = [];
      for (const wallet of monitor.wallets) {
        try {
          // 使用表单中存储的代币地址查询余额
          const tokenBalance = await this.getCachedTokenBalance(
            wallet.address,
            monitor.tokenAddress
          );

          // 查询基础代币余额
          const solBalance = await this.getCachedSolBalance(wallet.address);
          const solValueInUsdt = (
            parseFloat(solBalance) * await this.getSolPrice()
          ).toFixed(6);

          // 查询 USDT 和 USDC 余额
          const usdtBalance = await this.getCachedTokenBalance(
            wallet.address,
            monitor.usdtAddress  // 从表单中获取 USDT 地址
          );
          const usdcBalance = await this.getCachedTokenBalance(
            wallet.address,
            monitor.usdcAddress  // 从表单中获取 USDC 地址
          );

          const lastTokenBalance = wallet.lastTokenBalance || '0';
          const tokenBalanceChange = (
            BigInt(tokenBalance) - BigInt(lastTokenBalance)
          ).toString();

          await this.walletRepo.update(wallet.id, {
            lastTokenBalance: wallet.lastTokenBalance,
            tokenBalance,
            tokenBalanceChange,
            solBalance,
            solValueInUsdt,
            usdtBalance,
            usdcBalance
          });

          walletsWithBalance.push({
            id: wallet.id,
            address: wallet.address,
            note: wallet.note,
            tokenBalance,
            lastTokenBalance: wallet.lastTokenBalance,
            tokenBalanceChange,
            solBalance,
            solValueInUsdt,
            usdtBalance,
            usdcBalance
          });

          await this.delay(1000);

        } catch (error) {
          console.error(`处理钱包 ${wallet.address} 时出错:`, error);
          walletsWithBalance.push({
            id: wallet.id,
            address: wallet.address,
            note: wallet.note,
            tokenBalance: '0',
            lastTokenBalance: wallet.lastTokenBalance || '0',
            tokenBalanceChange: '0',
            solBalance: '0',
            solValueInUsdt: '0',
            usdtBalance: '0',
            usdcBalance: '0'
          });
        }
      }

      return {
        id: monitor.id,
        tokenAddress: monitor.tokenAddress,
        tokenName: monitor.tokenName,
        tokenSymbol: monitor.tokenSymbol,
        tokenIcon: monitor.tokenIcon,
        wallets: walletsWithBalance
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`获取监控任务失败: ${error.message}`);
    }
  }

  private async getCachedTokenBalance(walletAddress: string, tokenAddress: string): Promise<string> {
    const cacheKey = `${walletAddress}-${tokenAddress}`;
    const cached = this.balanceCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.balance;
    }

    const balance = await this.getTokenBalance(walletAddress, tokenAddress);
    this.balanceCache.set(cacheKey, {
      balance,
      timestamp: Date.now()
    });

    return balance;
  }

  private async getCachedSolBalance(walletAddress: string): Promise<string> {
    const cacheKey = `${walletAddress}-SOL`;
    const cached = this.balanceCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.balance;
    }

    const balance = await this.getSolBalance(walletAddress);
    this.balanceCache.set(cacheKey, {
      balance,
      timestamp: Date.now()
    });

    return balance;
  }

  private async getTokenBalance(walletAddress: string, tokenAddress: string): Promise<string> {
    try {
      // 添加地址格式���证
      if (!PublicKey.isOnCurve(tokenAddress)) {
        console.error(`无效的代币地址: ${tokenAddress}`);
        return '0';
      }

      const walletPubkey = new PublicKey(walletAddress);
      const tokenPubkey = new PublicKey(tokenAddress);
      
      // 先验证 mint 是否存在
      const mintInfo = await this.solanaConnection.getAccountInfo(tokenPubkey);
      if (!mintInfo) {
        console.error(`代币 mint 不存在: ${tokenAddress}`);
        return '0';
      }

      const tokenAccounts = await this.solanaConnection.getTokenAccountsByOwner(
        walletPubkey,
        { mint: tokenPubkey }
      );

      if (tokenAccounts.value.length === 0) {
        console.log(`钱包 ${walletAddress} 没有该代币账户`);
        return '0';
      }

      const balance = await this.solanaConnection.getTokenAccountBalance(
        tokenAccounts.value[0].pubkey
      );

      return balance.value.amount;
    } catch (error) {
      console.error(`获取代币余额失败 (${walletAddress}, ${tokenAddress}):`, error.message);
      return '0';
    }
  }

  private async getSolBalance(walletAddress: string): Promise<string> {
    try {
      const balance = await this.solanaConnection.getBalance(
        new PublicKey(walletAddress)
      );
      return (balance / 1e9).toString(); // 转���为 SOL
    } catch (error) {
      console.error(`获取 SOL 余额失败: ${error.message}`);
      return '0';
    }
  }

  private async getSolPrice(): Promise<number> {
    // 这里应该实现获取 SOL 价格的逻辑
    // 可以调用价格 API 或其他数据源
    return 100; // 临时返回固定值
  }

  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}


