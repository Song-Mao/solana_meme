import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from '@solana/web3.js';
import { Monitor } from './entities/monitor.entity';
import { BalanceRecord } from './entities/balance-record.entity';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { MonitorListItemDto, MonitorDetailDto } from './dto/monitor-response.dto';

@Injectable()
export class MonitorService {
  private solanaConnection: Connection;

  constructor(
    @InjectRepository(Monitor)
    private monitorRepo: Repository<Monitor>,
    @InjectRepository(BalanceRecord)
    private balanceRecordRepo: Repository<BalanceRecord>,
  ) {
    this.solanaConnection = new Connection(process.env.SOLANA_RPC_URL);
  }

  async create(createMonitorDto: CreateMonitorDto) {
    try {
      // 1. 获取Token信息
      const tokenInfo = await this.getTokenInfo(createMonitorDto.tokenAddress);

      // 2. 创建监控任务
      const monitor = this.monitorRepo.create({
        tokenAddress: createMonitorDto.tokenAddress,
        tokenSymbol: tokenInfo.symbol,
        tokenName: tokenInfo.name,
        wallets: createMonitorDto.wallets,
        createdAt: new Date(),
        isActive: true,
      });

      // 3. 保存任务
      const savedMonitor = await this.monitorRepo.save(monitor);

      // 4. 初始化所有钱包的余额记录
      await this.initializeBalanceRecords(savedMonitor);

      return savedMonitor;
    } catch (error) {
      throw new Error(`Failed to create monitor task: ${error.message}`);
    }
  }

  async findAll(): Promise<MonitorListItemDto[]> {
    const monitors = await this.monitorRepo.find();
    
    return monitors.map(monitor => ({
      id: monitor.id.toString(),
      tokenAddress: monitor.tokenAddress,
      tokenSymbol: monitor.tokenSymbol,
      tokenName: monitor.tokenName,
      walletsCount: monitor.wallets.length,
      createdAt: monitor.createdAt
    }));
  }

  async findOne(id: string): Promise<MonitorDetailDto> {
    const monitor = await this.monitorRepo.findOne({
      where: { _id: id }
    });
    
    if (!monitor) {
      throw new NotFoundException('Monitor task not found');
    }

    const balances = await this.balanceRecordRepo.find({
      where: { taskId: monitor.id },
      order: { updatedAt: 'DESC' }
    });

    return {
      id: monitor.id.toString(),
      tokenAddress: monitor.tokenAddress,
      tokenSymbol: monitor.tokenSymbol,
      tokenName: monitor.tokenName,
      walletDetails: await Promise.all(monitor.wallets.map(async wallet => {
        const balance = balances.find(b => b.walletAddress === wallet.address);
        return {
          address: wallet.address,
          memo: wallet.memo,
          currentBalance: balance?.balance || '0',
          previousBalance: balance?.previousBalance || '0',
          change: balance?.change || '0',
          solBalance: balance?.solBalance || 0,
          usdtBalance: balance?.usdtBalance || 0,
          usdcBalance: balance?.usdcBalance || 0,
          lastUpdatedAt: balance?.updatedAt || monitor.createdAt
        };
      }))
    };
  }

  private async getTokenInfo(tokenAddress: string) {
    // TODO: 实现获取Solana token信息的逻辑
    // 这里需要调用Solana API获取token信息
    return {
      symbol: 'TEST',
      name: 'Test Token'
    };
  }

  private async initializeBalanceRecords(monitor: Monitor) {
    // TODO: 实现初始化钱包余额记录的逻辑
    // 这里需要调用Solana API获取初始余额
  }
}